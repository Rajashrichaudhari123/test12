/**
 * paymentoptions.js
 * @author CloudPact Technologies
 * @description : This script is used showing paymentoptions.
 **/

var x2js = new X2JS();
var disableDoc;

var serverlink = Constants.publicIP+"/";

var payment = {
    "InstallmentPremium_ST": "0",
    "Premium_Frequency": "0",
    "PremiumPayingTerm": "0",
    "Installment_Premium": "0",
    "Premium_Term": "0"
};

var cashpayment = {
    "InstallmentPremium_ST": "0",
    "Premium_Frequency": "0",
    "PremiumPayingTerm": "0",
    "Amount_added": parseInt(0),
    "Remaining_Amount": parseInt(0)
};
var link = {
    "emailid": "",
    "mobileno": ""
};

var bankTransferObj = {
	"Payment_Type": "",
    "Transaction_Payment_No":""
};

var paymentobj = {
    "Payment_Type": "",
    "Amount_Paid": "",
    "Cheque_No": "",
    "Cheque_Date": "",
    "Bank_Name": "",
    "Bank_Branch": ""
};

$m.juci.addDataset("paymentbycc", paymentobj);
$m.juci.addDataset("onlinepayment", payment);
$m.juci.addDataset("cashpayment", cashpayment);
$m.juci.addDataset("bankTransfer", bankTransferObj);
$m.juci.addDataset("offlinePayment", []);
$m.juci.addDataset("modesOfPayment", ["Cash","Cheque", "DD"]);
$m.juci.addDataset("sendlink", link);
$m.juci.addDataset("typeOfDocumentRef","");
$m.juci.addDataset("typeOfDocument",["PANCARD","FORM60"]);
$m.juci.addDataset("instPremium","");

// payment options
function showPaymentDetails() {
	document.getElementById("tab-payment").className = 'tab';
	document.getElementById("tab-cheque").className = 'tab';
	document.getElementById("tab-sendlink").className = 'tab';
	document.getElementById("tab-sendbank").className = 'tab';
	$m.juci.dataset("cashpayment", cashpayment);
	var customerDetails = $m.getPref("planDetails_"+ applicationNumber);
    var plandetails = $m.getPref("planDetails_" + applicationNumber);
    $m.juci.dataset("onlinepayment", plandetails);
    $m.juci.dataset("cashpayment", plandetails);
    juci.dataset("remainingAmount", 0);
    $m.juci.dataset("offlinePayment", []);
    paymentoption = [];
    juci.getControl("payment-type").value(null);
	juci.getControl("installment-premium").value(null);
	juci.getControl("cheque-no").value(null);
	juci.getControl("cheque-date").value(null);
	juci.getControl("bank-name").value(null);
	juci.getControl("branch-name").value(null);
	$m.juci.dataset("instPremium",customerDetails.InstallmentPremium_ST);
	$m.juci.dataset("typeOfDocumentRef","");
}

// online payment
function payPremium(e) {
    var customerName = "";
    var typeOfDocument = $m.juci.dataset("typeOfDocumentRef");
	var instPrem = $m.juci.dataset("instPremium")
	if(!typeOfDocument && (instPrem > 50000)) {
		$m.alert("Please select type of document");
		return
	}
    var customerDetails = $m.getPref("customerDetails")
    var planDetails = $m.getPref("planDetails_" + customerDetails.Application_Number);
	var options = {
		"timeout": 10000
	};
    if (customerDetails.IS_LA_PR_SAME != 'Y') {
        customerName = customerDetails.PR_Name;
    } else {
        customerName = customerDetails.LA_Name;
    }
    var dataObj = {
        sApp: "TABAPP",
        portalTeam: customerName,
        dAmount: 11, //(planDetails.Total_InstPremium_ST == null ? planDetails.InstallmentPremium_ST : planDetails.Total_InstPremium_ST),
        sTrxnCode: customerDetails.Application_Number,
        sAddInfo1: getDateFormatted(new Date()),
        sAddInfo2: getDateFormatted(new Date()),
        sAddInfo3: '',
        sAddInfo4: '',
        sAddInfo5: ''
    };

    var dataString = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:ipay='http://PaymentGWM/IPaymentGW'><soapenv:Header/><soapenv:Body><ipay:generateKey><parameters><!--Optional:--><sGatewayCode/><!--Optional:--><sApplication>[sApplication]</sApplication><!--Optional:--><sCustomerName>[Portal Team]</sCustomerName><!--Optional:--><dAmount>[dAmount]</dAmount><!--Optional:--><sTrxnCode>[sTrxnCode]</sTrxnCode><!--Optional:--><sAddInfo1>[sAddInfo1]</sAddInfo1><!--Optional:--><sAddInfo2>[sAddInfo2]</sAddInfo2><!--Optional:--><sAddInfo3></sAddInfo3><!--Optional:--><sAddInfo4></sAddInfo4><!--Optional:--><sAddInfo5>[sAddInfo5]</sAddInfo5></parameters></ipay:generateKey></soapenv:Body></soapenv:Envelope>";

    dataString = dataString.replace('[sApplication]', dataObj.sApp);
    dataString = dataString.replace('[Portal Team]', dataObj.portalTeam);
    dataString = dataString.replace('[dAmount]', dataObj.dAmount);
    dataString = dataString.replace('[sTrxnCode]', dataObj.sTrxnCode);
    dataString = dataString.replace('[sAddInfo1]', dataObj.sAddInfo1);
    dataString = dataString.replace('[sAddInfo2]', dataObj.sAddInfo2);
    dataString = dataString.replace('[sAddInfo3]', dataObj.sAddInfo3);
    dataString = dataString.replace('[sAddInfo4]', dataObj.sAddInfo4);
    dataString = dataString.replace('[sAddInfo5]', dataObj.sAddInfo5);
    $m.post("http://rservicesuat.reliancelife.com/OnlinePaymentIntgMWeb/sca/IPaymentGWExport1", dataString, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "SOAPAction": "\"\""
        }
    }, function(response) {
        if (response.code == 200) {
            // Success
            var result = response.result;
            var obj = x2js.xml_str2json(result.data);
            var url = obj.Envelope.Body.generateKeyResponse.url;
           // $m.logInfo("URL:" + url);
            var keyData = url.slice(url.indexOf("?") + 1);
            var key = keyData.slice(keyData.indexOf("=") + 1);
            $m.openChildBrowser("Payment Gateway", url, {
                "navigation": true,
                "address": [],
                "delay":30000,
                "patterns": [{
                    "pattern": "/OnlinePaymentIntg/GatewayResponseHandler",
                    "callback": function(match) {
                    	setTimeout(function(){ 
	                        if ($m.isWeb()) {
	                            serverlink = "http://localhost/rlife/";
	                        }
	                        $m.get(serverlink + "mowblyserver/smpaymentgateway/rellife/prod/RlifeAssist?key="+key, function(response) {
	                            if (response.code == 200) {
	                                //Success
	                                var result = response.result;
	                                var data = JSON.parse(result.data);
	                                var paymentDetails = $m.juci.addDataset("paymentDetails", bindingObject.PDC_Payment_Details);
	                                var customerDetails = $m.getPref("customerDetails");
	                                var planDetails = $m.getPref("planDetails_" + customerDetails.Application_Number);
	                                var dataObjtoUD = {
	                                    "data": {
	                                        "Txn_Id": customerDetails.Txn_Id,
	                                        "Application_Number": planDetails.Application_Number,
	                                        "LA_Name": customerDetails.LA_Name,
	                                        "LA_Mobileno": customerDetails.LA_Mobileno,
	                                        "IS_LA_PR_SAME": customerDetails.IS_LA_PR_SAME,
	                                        "Payment_Type": "Online",
	                                        "InstallmentPremium": (planDetails.Total_InstPremium_ST == null ? planDetails.InstallmentPremium_ST : planDetails.Total_InstPremium_ST),
	                                        "Payment_Cash_DD": "N"
	                                    },
	                                    "page": "Payment"
	                                };
	                                var paymentDbArray = [];
	                                var currentObject = paymentDetails;
	                                currentObject.Application_Number = applicationNumber;
	                                //currentObject.iscompleted = '1';
	                                if (currentObject.Payment_Type != 'Offline' && currentObject.Cheque_Date)
	                                    currentObject.Cheque_Date = currentObject.Cheque_Date.getTime();
	                                currentObject.Amount_Paid = dataObj.dAmount;
	                                currentObject.Payment_Type = "Online";
	                                currentObject.PAYMENTDATE = dataObj.sAddInfo1;
	                                currentObject.PAYMENTSTATUS = data.Txn_Status;
	                                currentObject.Row_No = 1;
	                                currentObject.Txn_Id = customerDetails.Txn_Id;
	                                currentObject.WEBTOKENNO = dataObj.sTrxnCode;
	                                currentObject.RECEIPTNUMBER = key;
	                                var typeOFDocName = $m.juci.dataset("typeOfDocumentRef");
	                                currentObject.DocumentType = typeOFDocName;
	                                paymentDbArray.push(new PDC_Payment_Details(currentObject));
	                                var filter = new window.DB.Filter.equal("Application_Number", "'" + applicationNumber + "'");
	                                if (data.Txn_Status == "0") {
	                                    PDC_Payment_Details.multipleInsert(paymentDbArray, function(success_response) {
	                                        $m.alert("Your Payment is Invalid. Please try again.");
	                                    }, function(res) {
	                                        $m.logError("Failed to insert payment details--- " + JSON.stringify(res));
	                                        $m.alert("Error while inserting to database");
	                                    });
	                                } else if (data.Txn_Status == "1") {
	                                    PDC_Payment_Details.multipleInsert(paymentDbArray, function(success_response) {
	                                       $m.alert("Your Payment of Rs." + data.Txn_Amt_Paid + " is successful.", "Payment", function() {
                                               // $m.logInfo("Completed Details updated successfully");
                                                $m.alert("Payment successful","",function(){
                                                	openDocumentUpload();
                                                });
                                            });
	                                    }, function(res) {
	                                        $m.logError("Failed to insert payment details--- " + JSON.stringify(res));
	                                        $m.alert("Error while updating database");
	                                    });
	                                } else if (data.Txn_Status == "2") {
	                                    PDC_Payment_Details.multipleInsert(paymentDbArray, function(success_response) {
	                                        $m.alert("Your Payment has been failed. Please try again later.");
	                                    }, function(res) {
	                                        $m.logError("Failed to insert payment details--- " + JSON.stringify(res));
	                                        $m.alert("Error while inserting to database");
	                                    });
	                                }
	                            } else {
	                                // Error
	                                var errMsg = response.error.message;
	                            }
	                       });
	                            
                    	}, 30000);  
	                }
                },{
                	 "pattern": "/OnlinePaymentIntg/HDFCRedirectServlet",
                    "callback": function(match) {
                    	setTimeout(function(){ 
	                        if ($m.isWeb()) {
	                            serverlink = "http://localhost/rlife/";
	                        }
	                        $m.get(serverlink + "mowblyserver/smpaymentgateway/rellife/prod/RlifeAssist?key="+key, function(response) {
	                            if (response.code == 200) {
	                                //Success
	                                var result = response.result;
	                                var data = JSON.parse(result.data);
	                                var paymentDetails = $m.juci.addDataset("paymentDetails", bindingObject.PDC_Payment_Details);
	                                var customerDetails = $m.getPref("customerDetails");
	                                var planDetails = $m.getPref("planDetails_" + customerDetails.Application_Number);
	                                var dataObjtoUD = {
	                                    "data": {
	                                        "Txn_Id": customerDetails.Txn_Id,
	                                        "Application_Number": planDetails.Application_Number,
	                                        "LA_Name": customerDetails.LA_Name,
	                                        "LA_Mobileno": customerDetails.LA_Mobileno,
	                                        "IS_LA_PR_SAME": customerDetails.IS_LA_PR_SAME,
	                                        "Payment_Type": "Online",
	                                        "InstallmentPremium": (planDetails.Total_InstPremium_ST == null ? planDetails.InstallmentPremium_ST : planDetails.Total_InstPremium_ST),
	                                        "Payment_Cash_DD": "N"
	                                    },
	                                    "page": "Payment"
	                                };
	                                var paymentDbArray = [];
	                                var currentObject = paymentDetails;
	                                currentObject.Application_Number = applicationNumber;
	                                //currentObject.iscompleted = '1';
	                                if (currentObject.Payment_Type != 'Offline' && currentObject.Cheque_Date)
	                                    currentObject.Cheque_Date = currentObject.Cheque_Date.getTime();
	                                currentObject.Amount_Paid = dataObj.dAmount;
	                                currentObject.Payment_Type = "Online";
	                                currentObject.PAYMENTDATE = dataObj.sAddInfo1;
	                                currentObject.PAYMENTSTATUS = data.Txn_Status;
	                                currentObject.Row_No = 1;
	                                currentObject.Txn_Id = customerDetails.Txn_Id;
	                                currentObject.WEBTOKENNO = dataObj.sTrxnCode;
	                                currentObject.RECEIPTNUMBER = key;
	                                var typeOFDocName = $m.juci.dataset("typeOfDocumentRef");
	                                currentObject.DocumentType = typeOFDocName;
	                                paymentDbArray.push(new PDC_Payment_Details(currentObject));
	                                var filter = new window.DB.Filter.equal("Application_Number", "'" + applicationNumber + "'");
	                                if (data.Txn_Status == "0") {
	                                    PDC_Payment_Details.multipleInsert(paymentDbArray, function(success_response) {
	                                        $m.alert("Your Payment is Invalid. Please try again.");
	                                    }, function(res) {
	                                        $m.logError("Failed to insert payment details--- " + JSON.stringify(res));
	                                        $m.alert("Error while inserting to database");
	                                    });
	                                } else if (data.Txn_Status == "1") {
	                                    PDC_Payment_Details.multipleInsert(paymentDbArray, function(success_response) {
	                                        $m.alert("Your Payment of Rs." + data.Txn_Amt_Paid + " is successful.", "Payment", function() {
                                                //$m.logInfo("Completed Details updated successfully");
                                                $m.alert("Payment successful","",function(){
                                                	openDocumentUpload();
                                                });
                                            });
	                                    }, function(res) {
	                                        $m.logError("Failed to insert payment details--- " + JSON.stringify(res));
	                                        $m.alert("Error while updating database");
	                                    });
	                                } else if (data.Txn_Status == "2") {
	                                    PDC_Payment_Details.multipleInsert(paymentDbArray, function(success_response) {
	                                        $m.alert("Your Payment has been failed. Please try again later.");
	                                    }, function(res) {
	                                        $m.logError("Failed to insert payment details--- " + JSON.stringify(res));
	                                        $m.alert("Error while inserting to database");
	                                    });
	                                }
	                            } else {
	                                // Error
	                                var errMsg = response.error.message;
	                            }
	                       });
	                            
                    	}, 30000);  
	                }
                },{
					 "pattern": "/OnlinePaymentIntg/FSSGatewaySResponseHandler",
                    "callback": function(match) {
                    	setTimeout(function(){ 
	                        if ($m.isWeb()) {
	                            serverlink = "http://localhost/rlife/";
	                        }
	                        $m.get(serverlink + "mowblyserver/smpaymentgateway/rellife/prod/RlifeAssist?key="+key, function(response) {
	                            if (response.code == 200) {
	                                //Success
	                                var result = response.result;
	                                var data = JSON.parse(result.data);
	                                var paymentDetails = $m.juci.addDataset("paymentDetails", bindingObject.PDC_Payment_Details);
	                                var customerDetails = $m.getPref("customerDetails");
	                                var planDetails = $m.getPref("planDetails_" + customerDetails.Application_Number);
	                                var dataObjtoUD = {
	                                    "data": {
	                                        "Txn_Id": customerDetails.Txn_Id,
	                                        "Application_Number": planDetails.Application_Number,
	                                        "LA_Name": customerDetails.LA_Name,
	                                        "LA_Mobileno": customerDetails.LA_Mobileno,
	                                        "IS_LA_PR_SAME": customerDetails.IS_LA_PR_SAME,
	                                        "Payment_Type": "Online",
	                                        "InstallmentPremium": (planDetails.Total_InstPremium_ST == null ? planDetails.InstallmentPremium_ST : planDetails.Total_InstPremium_ST),
	                                        "Payment_Cash_DD": "N"
	                                    },
	                                    "page": "Payment"
	                                };
	                                var paymentDbArray = [];
	                                var currentObject = paymentDetails;
	                                currentObject.Application_Number = applicationNumber;
	                                //currentObject.iscompleted = '1';
	                                if (currentObject.Payment_Type != 'Offline' && currentObject.Cheque_Date)
	                                    currentObject.Cheque_Date = currentObject.Cheque_Date.getTime();
	                                currentObject.Amount_Paid = dataObj.dAmount;
	                                currentObject.Payment_Type = "Online";
	                                currentObject.PAYMENTDATE = dataObj.sAddInfo1;
	                                currentObject.PAYMENTSTATUS = data.Txn_Status;
	                                currentObject.Row_No = 1;
	                                currentObject.Txn_Id = customerDetails.Txn_Id;
	                                currentObject.WEBTOKENNO = dataObj.sTrxnCode;
	                                currentObject.RECEIPTNUMBER = key;
	                                var typeOFDocName = $m.juci.dataset("typeOfDocumentRef");
	                                currentObject.DocumentType = typeOFDocName;
	                                paymentDbArray.push(new PDC_Payment_Details(currentObject));
	                                var filter = new window.DB.Filter.equal("Application_Number", "'" + applicationNumber + "'");
	                                if (data.Txn_Status == "0") {
	                                    PDC_Payment_Details.multipleInsert(paymentDbArray, function(success_response) {
	                                        $m.alert("Your Payment is Invalid. Please try again.");
	                                    }, function(res) {
	                                        $m.logError("Failed to insert payment details--- " + JSON.stringify(res));
	                                        $m.alert("Error while inserting to database");
	                                    });
	                                } else if (data.Txn_Status == "1") {
	                                    PDC_Payment_Details.multipleInsert(paymentDbArray, function(success_response) {
	                                       $m.alert("Your Payment of Rs." + data.Txn_Amt_Paid + " is successful.", "Payment", function() {
                                              //  $m.logInfo("Completed Details updated successfully");
                                                $m.alert("Payment successful","",function(){
                                                	openDocumentUpload();
                                                });
                                            });
	                                    }, function(res) {
	                                        $m.logError("Failed to insert payment details--- " + JSON.stringify(res));
	                                        $m.alert("Error while updating database");
	                                    });
	                                } else if (data.Txn_Status == "2") {
	                                    PDC_Payment_Details.multipleInsert(paymentDbArray, function(success_response) {
	                                        $m.alert("Your Payment has been failed. Please try again later.");
	                                    }, function(res) {
	                                        $m.logError("Failed to insert payment details--- " + JSON.stringify(res));
	                                        $m.alert("Error while inserting to database");
	                                    });
	                                }
	                            } else {
	                                // Error
	                                var errMsg = response.error.message;
	                            }
	                       });
	                            
                    	}, 30000);  
	                }	
                }]
            });
        } else {
            // Error
            var errMsg = response;
        }
    });
}

function paymentObject() {
    this.Txn_Id = "",
        this.Application_Number = "",
        this.Row_No = "",
        this.PAYMENTDATE = "",
        this.PAYMENTSTATUS = "",
        this.WEBTOKENNO = "",
        this.BANKCODE = "",
        this.RECEIPTNUMBER = "",
        this.Txn_Date = "",
        this.Payment_Type = "";
    this.Amount_Paid = '';
    this.Cheque_No = '';
    this.Cheque_Date = null;
    this.Bank_Name = "";
    this.Bank_Branch = "";
}

function addAmount() {
    $m.juci.getControl("offline-split").createItem(new paymentObject(), false, -1);
}


var paymentoption = [];
var flag = 0;

function getValueLength(e){
	var planData = $m.getPref("planDetails_" + applicationNumber);
	if (planData.PLanCode == "122" || planData.PLanCode == "128" || planData.PLanCode == "129" || planData.PLanCode == "123" || planData.PLanCode == "127" || planData.PLanCode == "141") {
		juci.findById("installment-premium").el.children[2].maxLength = 20;
	}else{
		juci.findById("installment-premium").el.children[2].maxLength = 8;
	}
}

// offline payment
function doSubmit(e) {
    var data = e.data;
    var premiumdata = $m.juci.dataset("cashpayment");

    var Premium = premiumdata.InstallmentPremium_ST;
    if (data.Payment_Type != 'Cash' && checkChequeDate(data.Cheque_Date)) {
	       // event.preventDefault();
	        $m.alert("Cheque/DD date should not be lesser than previous 90 days and shouldn't be greater than 90 days from today.");
	        juci.getControl("cheque-date").value(null);
	        return;
    }
    var planData = $m.getPref("planDetails_" + applicationNumber);
    if (planData.PLanCode == "122" || planData.PLanCode == "128" || planData.PLanCode == "129" || planData.PLanCode == "123" || planData.PLanCode == "127" || planData.PLanCode == "141") {
        if (data.Payment_Type === "Cash" || data.Payment_Type === "Cheque" || data.Payment_Type === "DD") {
	        var inst_pre = juci.getControl("installment-premium").value();
			if(inst_pre != Premium && flag == 0){
					$m.alert("Payment should allow it once,Please enter valid amount");
					juci.getControl("installment-premium").value(null);
					return;
			}else if(inst_pre == Premium){
				flag++;
			}else{
				for (var i = 0; i < paymentoption.length; i++) {
		            if (paymentoption[i].Payment_Type === "Cash" || paymentoption[i].Payment_Type === "Cheque" || paymentoption[i].Payment_Type === "DD"  ){ 		
		                $m.alert("Payment is allowed only once");
		                return false;
		            }
	        	}
			}
			
        }

    }else{
		//juci.findById("installment-premium").el.children[2].maxLength = 8;
	    var newAmount = parseInt(data.Amount_Paid, 10);
	    var premium = parseInt(Premium, 10);
	
	    premiumdata.Amount_added = parseInt(newAmount + premiumdata.Amount_added);
	    premiumdata.Remaining_Amount = premium - parseInt(premiumdata.Amount_added);
	    juci.dataset("remainingAmount", premiumdata.Remaining_Amount);
	    if (premiumdata.Amount_added > premium) {
	        $m.alert("Amount exceeding the Premium!");
	        return false;
	    }
	
	    if (newAmount > premium) {
	        event.preventDefault();
	        $m.alert("Amount exceeding the Premium!");
	        return false;
	    }
	
	    if (data.Payment_Type === "Cash") {
	        for (var i = 0; i < paymentoption.length; i++) {
	            if (paymentoption[i].Payment_Type === "Cash") {
	                $m.alert("Cash payment is allowed only once");
	                return false;
	            }
	        }
	    }
    
    }
    paymentoption.push(data);
    $m.juci.dataset("cashpayment", premiumdata);
    $m.juci.dataset("offlinePayment", paymentoption);
    $m.juci.dataset("paymentbycc", paymentobj);
}

// Email Functionality
function sendEmail(e) {
	var typeOfDocument = $m.juci.dataset("typeOfDocumentRef");
	var instPrem = $m.juci.dataset("instPremium")
	if(!typeOfDocument && (instPrem > 50000)) {
		$m.alert("Please select type of document");
		return
	}
    if ($m.networkConnected()) {
        var customerDetails = $m.getPref("customerDetails");
        var planDetails = $m.getPref("planDetails");
        sendLinkDataObj = {
            "data": {
                "Txn_Id": customerDetails.Txn_Id,
                "Application_Number": planDetails.Application_Number,
                "LA_Name": customerDetails.LA_Name,
                "LA_Mobileno": customerDetails.LA_Mobileno,
                "IS_LA_PR_SAME": customerDetails.IS_LA_PR_SAME,
                "Payment_Type": "Send Link",
                "InstallmentPremium": (planDetails.Total_InstPremium_ST == null ? planDetails.InstallmentPremium_ST : planDetails.Total_InstPremium_ST),
                "Payment_Cash_DD": "N"
            },
            "page": "Payment"
        };
       			 $m.showProgress("Sending E-mail...");
                var data= $m.getPref("planDetails_" + applicationNumber)
                var planName = data.PlanName;
                var emailId = juci.dataset("sendlink").emailid;
                var mailMessage = getMessageTemplate(customerDetails.LA_Name, data.ProductCode, customerDetails.Application_Date, customerDetails.Application_Number, (data.Total_InstPremium_ST == null ? data.InstallmentPremium_ST : data.Total_InstPremium_ST), planName);
                var emailSubject = "Payment Link for your application no " + customerDetails.Application_Number + " with Reliance Life Insurance";
                var url = Constants.publicIP + "/mowblyserver/smemailsender/rellife/prod/RlifeAssist";
                $m.post(url, {
                    "mailreceiver": emailId,
                    "mailbody": mailMessage,
                    "mailsubject": emailSubject
                }, function(response) {
                    $m.hideProgress();
                    if (response.code == 200) {
                        // Success
                        var result = response.result;
                        if (result.data) {
                            var paymentDbArray = [];
                            var paymentObject = {
                                "Txn_Id": customerDetails.Txn_Id,
                                "Application_Number": "",
                                "Row_No": "",
                                "PAYMENTDATE": "",
                                "PAYMENTSTATUS": "",
                                "WEBTOKENNO": "",
                                "BANKCODE": "",
                                "RECEIPTNUMBER": "",
                                "Txn_Date": "",
                                "Payment_Type": "",
                                "Amount_Paid": '',
                                "Cheque_No": '',
                                "Cheque_Date": null,
                                "Bank_Name": "",
                                "Bank_Branch": ""
                            };
                            paymentObject.Application_Number = applicationNumber;
                            paymentObject.Payment_Type = "Send Link , " + emailId;
                            //paymentObject.iscompleted = '1';
                            paymentObject.Row_No = 1;
                            paymentObject.Amount_Paid = data.InstallmentPremium_ST;
                            var typeOFDocName = $m.juci.dataset("typeOfDocumentRef");
	                        paymentObject.DocumentType = typeOFDocName;
                            paymentDbArray.push(new PDC_Payment_Details(paymentObject));
                            PDC_Payment_Details.multipleInsert(paymentDbArray, function(success_response) {
                               // $m.logInfo("Completed Details updated successfully");
                                $m.alert("Payment link send successfully","",function(){
                                	$m.juci.dataset("sendlink", link);
									openDocumentUpload();
                                });
                            }, function(res) {
                                $m.logError("Failed to insert payment details--- " + JSON.stringify(res));
                                $m.alert("Error while updating database");
                            });
                        } else {
                            $m.alert("Mail not sent. Please try again later.");
                        }
                    } else {
                        // Error
                        $m.hideProgress();
                        var errMsg = response.error.message;
                        $m.logError("Email error - " + errMsg);
                        $m.alert("Email failed");
                    }
                });
          
       
    } else {
        $m.alert("No internet connection");
    }
}

function openDocumentUpload() {
	disableDoc = true;
    navigateTo("docupload");
}

function onPaymentModeChange(event) {
   var premiumCheck = $m.juci.dataset("instPremium");
   if (event.value == 'Cash') {
        $m.juci.getControl("cheque-no").clearValidation();
        $m.juci.getControl("cheque-date").clearValidation();
        $m.juci.getControl("bank-name").clearValidation();
        $m.juci.getControl("branch-name").clearValidation();
        if(premiumCheck > 50000) {
        	$m.juci.dataset("typeOfDocumentRef","PANCARD");	
        } else {
        	$m.juci.dataset("typeOfDocumentRef","");	
        }
    } else {
    	if(premiumCheck > 50000) {
    		$m.juci.dataset("typeOfDocumentRef","PANCARD");	
    	} else {
    		$m.juci.dataset("typeOfDocumentRef","");
    	}
    }
}

function daysBetween(startDate, endDate) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (endDate - startDate) / millisecondsPerDay;
}

function checkChequeDate(date) {
    var todayDate = new Date();
    todayDate.setHours(0);
    todayDate.setMinutes(0);
    todayDate.setSeconds(0);
    var chequeDate = new Date(date);
    chequeDate.setHours(0);
    chequeDate.setMinutes(0);
    chequeDate.setSeconds(0);
    if (todayDate > chequeDate) {
        if (Math.round(daysBetween(chequeDate, todayDate)) >= 91) {
            return true;
        } else {
            return false;
        }
    } else if (todayDate < chequeDate) {
        if (Math.round(daysBetween(todayDate, chequeDate)) >= 91) {
            return true;
        } else {
            return false;
        }
    }
}


// saving payment data into local db
function onNext9(event) {
	var premium = $m.juci.dataset("instPremium");
	var paymentMode = $m.juci.dataset("offlinePayment");
	if(paymentMode.length) {
		if(premium > 50000 && paymentMode[0].Payment_Type == 'Cash') {
			$m.juci.dataset("typeOfDocumentRef","PANCARD");
			$m.juci.getControl("type_doc").disable();
		} else {
			$m.juci.getControl("type_doc").enable();
		}
	} else {
		$m.juci.getControl("type_doc").enable();
	}
    var remainingAmount = juci.dataset("remainingAmount");
    if (remainingAmount > 0) {
        $m.alert("Please pay total amount to move on.");
    } else {
        var datasetData = $m.juci.dataset('offlinePayment');
     
        
        var customerDetails = $m.getPref("customerDetails");
           $m.putPref("paymentdata_"+customerDetails.Application_Number,datasetData);
        $m.savePref();
        var planDetails = $m.getPref("planDetails_" + customerDetails.Application_Number);
        var dataObjtoUD = {
            "data": {
                "Txn_Id": customerDetails.Txn_Id,
                "Application_Number": planDetails.Application_Number,
                "LA_Name": customerDetails.LA_Name,
                "LA_Mobileno": customerDetails.LA_Mobileno,
                "IS_LA_PR_SAME": customerDetails.IS_LA_PR_SAME,
                "Payment_Type": "Offline",
                "InstallmentPremium": (planDetails.Total_InstPremium_ST == null ? planDetails.InstallmentPremium_ST : planDetails.Total_InstPremium_ST),
                "Payment_Cash_DD": "N"
            },
            "page": "Payment"
        };
        var paymentDbArray = [];
        for (var j = 0; j < datasetData.length; j++) {
            var currentObject = datasetData[j];
            currentObject.Application_Number = applicationNumber;
            //currentObject.iscompleted = '1';
            currentObject.Row_No = j + 1;
            if (currentObject.Payment_Type != 'Offline' && currentObject.Cheque_Date) {
                currentObject.Cheque_Date = currentObject.Cheque_Date.getTime();
                dataObjtoUD.data.Payment_Cash_DD = 'Y';
            }
            if (currentObject.Payment_Type == 'Cash')
                currentObject.Cheque_Date = "";
                currentObject.Txn_Id = customerDetails.Txn_Id
                var typeOFDocName = $m.juci.dataset("typeOfDocumentRef");
	            currentObject.DocumentType = typeOFDocName;
            paymentDbArray.push(new PDC_Payment_Details(currentObject));
        }
        if (!paymentDbArray.length) {
            $m.alert("Please complete payment!");
            return;
        }
        var filter = new window.DB.Filter.equal("Application_Number", "'" + applicationNumber + "'");
        PDC_Payment_Details.multipleInsert(paymentDbArray, function(success_response) {
          //  $m.logInfo("Completed Details updated successfully");
            navigateTo("docupload");
        }, function(res) {
            $m.logError("Failed to insert payment details--- " + JSON.stringify(res));
            $m.alert("Error while updating database");
        });
    }
}

function sendBankTransfer(event){
	var typeOfDocument = $m.juci.dataset("typeOfDocumentRef");
	var instPrem = $m.juci.dataset("instPremium")
	if(!typeOfDocument && (instPrem > 50000)) {
		$m.alert("Please select type of document");
		return
	}
	
	var bankDataset = $m.juci.dataset("bankTransfer");
	var customerDetails = $m.getPref("customerDetails");
	var planDetails = $m.getPref("planDetails_" + customerDetails.Application_Number);	
	//var planDetails = $m.juci.dataset("onlinepayment");
	var applicationNumber = customerDetails.Application_Number;
	sendBankDataObj = {
		    "data": {
		        "Txn_Id": customerDetails.Txn_Id,
		        "Application_Number": planDetails.Application_Number,
		        "LA_Name": customerDetails.LA_Name,
		        "LA_Mobileno": customerDetails.LA_Mobileno,
		        "IS_LA_PR_SAME": customerDetails.IS_LA_PR_SAME,
		        "Payment_Type": "Bank Transfer",
		        "InstallmentPremium": (planDetails.Total_InstPremium_ST == null ? planDetails.InstallmentPremium_ST : planDetails.Total_InstPremium_ST),
		        "Payment_Cash_DD": "N"
		    },
		    "page": "Payment"
		};
   		// $m.showProgress("Sending E-mail...");
   		var paymentDbArray = [];
        var data= $m.getPref("planDetails_" + applicationNumber)
        paymentObject.Application_Number = applicationNumber;
        paymentObject.Payment_Type = "Bank Transfer";
        //paymentObject.iscompleted = '1';
        paymentObject.Row_No = 1;
        paymentObject.Transaction_Payment_No = bankDataset.Transaction_Payment_No;
        paymentObject.Amount_Paid = data.InstallmentPremium_ST;
        paymentDbArray.push(new PDC_Payment_Details(paymentObject));
        PDC_Payment_Details.multipleInsert(paymentDbArray, function(success_response) {
           // $m.logInfo("Completed Details updated successfully");
            $m.alert("Transaction Id stored successfully","",function(){
            	//$m.juci.dataset("sendlink", link);
				openDocumentUpload();
            });
        }, function(res) {
            $m.logError("Failed to insert payment details--- " + JSON.stringify(res));
            $m.alert("Error while updating database");
        });
}


function daysBetween(startDate, endDate) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (endDate - startDate) / millisecondsPerDay;
}

function checkChequeDate(date) {
    var todayDate = new Date();
    todayDate.setHours(0);
    todayDate.setMinutes(0);
    todayDate.setSeconds(0);
    var chequeDate = new Date(date);
    chequeDate.setHours(0);
    chequeDate.setMinutes(0);
    chequeDate.setSeconds(0);
    if (todayDate > chequeDate) {
        if (Math.round(daysBetween(chequeDate, todayDate)) >= 91) {
            return true;
        } else {
            return false;
        }
    } else if (todayDate < chequeDate) {
        if (Math.round(daysBetween(todayDate, chequeDate)) >= 91) {
            return true;
        } else {
            return false;
        }
    }
}

// Email Template
function getMessageTemplate(customerName, productName, planDate, applicationNumber, premiumAmount, planName) {

    var template = "<html><body>";
    template = template + "Dear CUSTOMER_NAME, <br><br>";
    template = template + "Thank you for choosing Reliance Nippon Life as your Life Insurance partner. <br><br>";
    template = template + "Please click on the secure link below and complete the payment towards Reliance Life PRODUCT_NAME with application no. APPLICATION_NUMBER applied for on PLAN_DATE. <br><br>";
    template = template + "Premium Amount (inclusive of taxes in Rs.) to be paid : PREMIUM_AMOUNT <br><br>";
    template = template + "<a href='http://lifelineuat.reliancelife.com/pdcpayment/'>Click here to proceed to payment</a><br><br>";
    //template = template+ "Application number : APPLICATION_NUMBER <br><br>";
    template = template + "In case of any further information or assistance, Please get in touch with us at our toll free no. 1800-2677-227. Our customer service executives would be glad to assist you. <br><br><br>";
    template = template + "Yours sincerely,<br>";
    template = template + "Customer Care,";
    template = template + "Reliance Nippon Life Insurance";
    template = template + "</body></html>";

    template = template.replace("CUSTOMER_NAME", customerName);
    template = template.replace("PRODUCT_NAME", planName);
    template = template.replace("PLAN_DATE", new Date(planDate).toString('dd-MM-yyyy'));
    template = template.replace("APPLICATION_NUMBER", applicationNumber);
    template = template.replace("PREMIUM_AMOUNT", premiumAmount);

    return template;
}

function generateTransactionCode(AppNo) {
    var d = new Date().getTime();
    // xxxx-xxx-4xxx-yxx-xxxxxx
    var uuid = 'xxxxxx-x4xxxy-xxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    return AppNo + "-" + uuid;
}

function deleteOfflineDetails(event) {

    event.preventDefault();
    $m.confirm({
        "title": "Confirm",
        "message": "Are you sure you want to delete?",
        "buttons": [{
            "label": "Yes"
        }, {
            "label": "No"
        }]
    }, function(index) {
        // Code to execute when the confirm dialog dismisses
        if (index == 0) {
            // Yes

            data = event.data;
            Amount_Paid = data.Amount_Paid;
            var premiumdata = $m.juci.dataset("cashpayment");
            premiumdata.Amount_added = parseInt(premiumdata.Amount_added - parseInt(Amount_Paid));
            premiumdata.Remaining_Amount = parseInt(premiumdata.Remaining_Amount + parseInt(Amount_Paid));
            juci.dataset("remainingAmount", premiumdata.Remaining_Amount);
            $m.juci.dataset("cashpayment", premiumdata);
            event.control.removeItemAt(event.index);



            paymentoption.splice(event.index, 1);

        } else if (index == 1) {
            // No
        }
    });
}