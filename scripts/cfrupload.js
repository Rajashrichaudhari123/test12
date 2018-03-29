/**
 * cfrupload.js
 * @author CloudPact Technologies
 * @description : This script is used for uploading cfr documents.
 **/

$m.juci.addDataset("cfraddressproof",[]);
$m.juci.addDataset("photoidproof",[]);
$m.juci.addDataset("Ageproof",[]);
$m.juci.addDataset("Identityproof",[]);
$m.juci.addDataset("Incomeproof",[]);
$m.juci.addDataset("date","");
$m.juci.addDataset("status","");
$m.juci.addDataset("CfrDescription","");

$m.juci.addDataset("documentsPending", []);
$m.juci.addDataset("bopDescription", {});
$m.juci.dataset("applicationDetails", {"ApplicationNumber":"","CfrCategory":"","CfrCount":"","CfrSource":"","ApplicantCfrDeadLine":"","ApplicantCfrOpenDate":"","ApplicantCfrStatus":"","ClientID":"","CustomerName":"","FirstPremiumAmount":"","ProductCode":"","ProductName":"","EmailID":"","MobileNumber":"","iscompleted":"","issync":""});

$m.juci.addDataset("bopDescription",{"ApplicationNumber":"","BopAmount":"","CfrCode":"","DeadLine":"","OpenDate":"","CfrDocumentCategory":"","CfrDescription":"","CfrComments":"","CfrCommentCode":"","Status":"","UniqueID":"","iscompleted":"","issync":""});
var documentTypes = [{"Type":"Address Proof","LA_CODE":"AADHAR","Description":"Aadhar Card-not provisionl(LR)"},{"Type":"Address Proof","LA_CODE":"BANK CER","Description":"Banker's Certification"},{"Type":"Address Proof","LA_CODE":"BANK STM","Description":"Bank Acct Statement"},{"Type":"Address Proof","LA_CODE":"BIHAR","Description":"Bihar St. ParichayPatra (LR)"},{"Type":"Address Proof","LA_CODE":"CCSTMT","Description":"Credit Card Stmt 3 Mth(LR/ HR)"}];

var x2js = new X2JS();
var proof= {
		"CfrDescription":"",
		"CfrComments":"",
		"cfraddrsproof":"",
		"uploadeddocument":[],
		"currenttime":getDateFormatted(new Date().getTime())
};
$m.juci.addDataset("addressproof",proof);


var photo = {
	"CfrDescription":"",
	"CfrComments":"",
	"cfraddrsproof":"",
	"uploadeddocument":[],
	"cfrid":"",
	"currenttime":getDateFormatted(new Date().getTime())
};

$m.juci.addDataset("photoid",photo);


var age = {
	"CfrDescription":"",
	"CfrComments":"",
	"cfraddrsproof":"",
	"uploadeddocument":[],
	"cfrid":"",
	"currenttime":getDateFormatted(new Date().getTime())
};

$m.juci.addDataset("agedproof",age);

var identity = {
	"CfrDescription":"",
	"CfrComments":"",
	"cfraddrsproof":"",
	"uploadeddocument":[],
	"cfrid":"",
	"currenttime":getDateFormatted(new Date().getTime())
};

$m.juci.addDataset("identityproof",identity);

var income = {
	"CfrDescription":"",
	"CfrComments":"",
	"cfraddrsproof":"",
	"uploadeddocument":[],
	"cfrid":"",
	"currenttime":getDateFormatted(new Date().getTime())
};

$m.juci.addDataset("incomeproof",income);


var cfrCode;
var comments = {
	"CfrDescription":"",
	"CfrComments":""
};
$m.juci.addDataset("cfrcomm",comments);

var customerDetails = {
	"CustomerName":"",
	"ClientID":"",
	"ApplicantCfrOpenDate":"",
	"ProductName":"",
	"ApplicantCfrDeadLine":"",
	"ApplicationNumber":"",
	"FirstPremiumAmount":"",
	"MobileNumber" : "",
	"EmailID" : "",
	"Status":""
};

$m.juci.addDataset("customerDetails",customerDetails);

//Fetching server data and storing in to local db
$m.onData(function(eventObject){
	// Code to execute when a data is received from parent page
	var data = eventObject.data;
	var cfrobj = data.data;
	$m.juci.dataset("applicationDetails",cfrobj);
	$m.juci.addDataset("cfraddressproof",[]);
	$m.juci.addDataset("photoidproof",[]);
	$m.juci.addDataset("Ageproof",[]);
	$m.juci.addDataset("Identityproof",[]);
	$m.juci.addDataset("Incomeproof",[]);
	new window.DB(CONSTANTS.DBName, function(dbHelper) {
		window.dbHelper = dbHelper;
		$m.juci.dataset("customerDetails",cfrobj);
		$m.juci.dataset("date",cfrobj.ApplicantCfrOpenDate);
		$m.juci.dataset("status",cfrobj.ApplicantCfrStatus);
		juci.dataset("document",cfrobj.CfrCount);
		PendingCfrDetail.SelectWithFilterAppNo(cfrobj.ApplicationNumber,function(success_response){
			var response = success_response.rows;
			PendingCfrNotifications.SelectWithFilterAppNo(cfrobj.ApplicationNumber,function(success_response){
				$m.juci.dataset("documentsPending",[]);
				if(response[0] && response[0]["BopAmount"]){
					$m.juci.dataset("bopDescription", response[0]);
				}else{
					getCfrDocs(cfrobj.ApplicationNumber, function(existingDocs){
						for(var i=0;i<response.length;i++){
							response[i]["optionsforaddressproof"] = documentTypes;
							response[i]["uploadeddocs"] = [];
							response[i]["id"] = i;
							response[i]["uploadDocType"] = "";
							response[i]["CurrStatus"] = "1";
						}
						$m.hideProgress();
						for(var pendingDoc in response){
							for(var existingDoc in existingDocs){
								if(response[pendingDoc].CfrCode === existingDocs[existingDoc].Extended_Attributes && response[pendingDoc].Status === existingDocs[existingDoc].Status){
									response[pendingDoc].uploadeddocs.push(getDocType(response[pendingDoc], existingDocs[existingDoc]));
									response[pendingDoc].CurrStatus = "2";
								}
							};
						};	
						$m.juci.dataset("documentsPending", response);
						$m.juci.find(".tab .juci_thinbar").forEach(function(el, idx){
							tabs.push(false);
							el.onClick(getToggleHandler(idx));
						});
					});
				}
			},function(failure_response){
				$m.logError("Failed select in cfr documents. Reason - " + JSON.stringify(failure_response));
				$m.alert("Failed while fetching the documents");
			});
		},function(failure_response){
			$m.logError("Failed select in cfr documents. Reason - " + JSON.stringify(failure_response));
			$m.alert("Failed while fetching the documents");
		});
	//	cfrCode = cfrobj.CfrCode;
	//	$m.juci.dataset("cfrcomm",cfrobj);
	}, function(error) {
        $m.logError("Unable to open database due to -- " + JSON.stringify(error));
        $m.alert("Error while opening database");
    });
});

$m.onReady(function(){
	juci.dataset("headerName","CFR Upload");
	//juci.getControl("uploadList").addListItemClick(deleteCfrdocs, this, ".doc_action.del");
	juci.dataset("headerName","Upload CfR");
	var head = document.getElementsByClassName("juci_panel_title");
	juci.viewModel.applyBinding(head[0]);
	$m.juci.dataset("alertcount","3");
});

function saveDocument1(){
	var cfrlist = juci.dataset("cfraddressproof");
	saveDocuments(cfrlist);
}

function saveDocument2(){
	var cfrlist = juci.dataset("photoidproof");
	saveDocuments(cfrlist);
}

function saveDocument3(){
	var cfrlist = juci.dataset("Ageproof");
	saveDocuments(cfrlist);
}

function saveDocument4(){
	var cfrlist = juci.dataset("Identityproof");
	saveDocuments(cfrlist);
}

function saveDocument5(){
	var cfrlist = juci.dataset("Incomeproof");
	saveDocuments(cfrlist);
}
$m.juci.addDataset("optionsforaddressproof",[{
        "Type": "Address Proof",
        "LA_CODE": "AADHAR",
        "Description": "Aadhar Card-not provisionl(LR)"
    },
    {
        "Type": "Address Proof",
        "LA_CODE": "BANK CER",
        "Description": "Banker's Certification"
    },
    {
        "Type": "Address Proof",
        "LA_CODE": "BANK STM",
        "Description": "Bank Acct Statement"
    },
    {
        "Type": "Address Proof",
        "LA_CODE": "BIHAR",
        "Description": "Bihar St. ParichayPatra (LR)"
    },
    {
        "Type": "Address Proof",
        "LA_CODE": "CCSTMT",
        "Description": "Credit Card Stmt 3 Mth(LR/ HR)"
    }]);
    



//$m.juci.addDataset("addressproof",proof);

function deleteDetails(event){
	event.preventDefault();
	$m.confirm({"title":"Confirm",
				"message": "Are you sure you want to delete?", 
				"buttons": [{"label": "Yes"},
							{"label": "No"}]
				}, function(index){
		// Code to execute when the confirm dialog dismisses
		if(index == 0) {
			// Yes
			event.control.removeItemAt(event.index);
		} else if(index == 1) {
			// No
		}
	});
}

function getdoc(doc){
	return doc().Description();
}

function hide(){
	$m.juci.findById("pop").hide();
}

function exit(){
	juci.hideDialog("cfrdialog");
}

function opencfr() 
{
	juci.showDialog("cfrdialog");
}

d = new Date();
var cfr = [{
	"OpenDate":"27/03/2016",
	"cfrtime":{"hour":d.getHours(), "minute": d.getMinutes(), "meridian": "PM"},
	"cfrid":"AFR12012",
	"udate":"01/01/2016 | 10:16f",
	"CfrComments":"CFR raised for Address Proof - X88C181"
	
	},
	{
	"OpenDate":"27/03/2016",
	"cfrtime":{"hour":d.getHours() , "minute": d.getMinutes() , "meridian": "PM"},
	"cfrid":"AFR12012",
	"udate":"01/01/2016 | 10:16f",
	"CfrComments":"CFR raised for Age Proof Not Submitted - X85C09"
	}
];
$m.juci.addDataset("cfr",cfr);
$m.juci.addDataset("option1",[{"value":"Adhar card-not Provisional(LR) "},{"value":"Credit card stmt 3 Mth(LR/HR)"},{"value":"Bihar St. ParichayPPatra(LR/HR )"}]);


function toggleAttachment(data,eventType){
	data = ko.toJS(data);
	data["uploadDocType"] = data.CfrDocumentCategory;
	var type = "capture";
	var classes = eventType.target.classList;
	var id = eventType.target.parentElement.id;
	if(!classes.contains(type)){
		type = "choose";
	}
	switch(type){
		case "capture":
			opencamera(data,id);
			break;
		case "choose":
			opengallery(data,id);
			break;
	}
}

AddressAttachment = "";
PhotoAttachment = "";
AgeAttachment = "";
IdentityAttachment = "";
IncomeAttachment = "";

function opencamera(data,id){
	$m.capturePic(function(response){
		if(response.code == 1){
			var imagePath = response.result.path;
			data.uploadeddocument = imagePath;
			data.currenttime = getDateFormatted(new Date().getTime());
			var documentsPending = $m.juci.getDataset("documentsPending");
			var addedDocs = [];
			for(var i=0;i<documentsPending().length;i++){
				if(data.id === documentsPending()[i]["id"]()){
					var existingDocs = documentsPending()[i].uploadeddocs();
					existingDocs.push(data);
					documentsPending()[i].uploadeddocs(existingDocs);
					break;
				}
			}
		} else{
			// Error
			var errMsg = response.error.message;
		}
	});
}

// gallery api
function opengallery(data,id){
	$m.choosePic(function(response){
		if(response.code == 1){
			var imagePath = response.result.path;
			data.uploadeddocument = imagePath;
			data.currenttime = new Date();
			var documentsPending = $m.juci.getDataset("documentsPending");
			var addedDocs = [];
			for(var i=0;i<documentsPending().length;i++){
				if(data.id === documentsPending()[i]["id"]()){
					var existingDocs = documentsPending()[i].uploadeddocs();
					existingDocs.push(data);
					documentsPending()[i].uploadeddocs(existingDocs);
					break;
				}
			}
		} else{
			// Error
			var errMsg = response.error.message;
		}
	});
}

/* Address Proof */
var addressArray = [];
function addAdressProof(data,imagePath){
	data.uploadeddocument = imagePath;
	addressArray.push(data);
	$m.juci.dataset("cfraddressproof",addressArray);
}

/* Photo ID */
var photoArray = [];
function addphotoid(data,imagePath){
	data.uploadeddocument = imagePath;
	photoArray.push(data);
	$m.juci.dataset("photoidproof",photoArray);	
}

/* Age Proof */
var ageArray = [];
function addageproof(data,imagePath){
	data.uploadeddocument = imagePath;
	ageArray.push(data);
	$m.juci.dataset("Ageproof",ageArray);	
}


/* Identity Proof */
var identityArray = [];
function addidentityproof(data,imagePath){
	data.uploadeddocument = imagePath;
	identityArray.push(data);
	$m.juci.dataset("Identityproof",identityArray);	
}

/* Income Proof */

var incomeArray = [];
function addincomeproof(data,imagePath){
	data.uploadeddocument = imagePath;
	incomeArray.push(data);
	$m.juci.dataset("Incomeproof",incomeArray);	
}


function getDateFormatted(dateinput){
	var date = new Date(dateinput);
	var dateString, month = "", dt = "";
	if(date.getMonth() < 9)
		month = '0' + (date.getMonth()+1);
	else
		month = date.getMonth()+1;
	if(date.getDate() <= 9)
		dt = '0' + (date.getDate());
	else
		dt = date.getDate();
	dateString =  date.getFullYear() + "-" + month + '-' + dt;
	return dateString;
}

function gettime(time){
	return time().hour() +':'+ time().minute();
}

function callCustomer(e){
	var number = e.wrappedData.MobileNumber();
	$m.callContact(number);
}

function emailCustomer(e){
	var email = e.wrappedData.EmailID();
	$m.email([email], '' , '');
}

function smsCustomer(e){
	var sendsms = e.wrappedData.MobileNumber();
	$m.sms([sendsms], '');
}



function saveDocuments(data){
	var currentData = data;
	currentData.CurrStatus("2");
	data = ko.toJS(data);
	var uploadedDocuments = data.uploadeddocs;
	var insertArray = [];
	var proofObj = {};
	for(var i=0;i<uploadedDocuments.length;i++){
		proofObj.Row_No = (i+1);
		proofObj.Txn_Id = "";
		proofObj.Application_Number = data.ApplicationNumber;
		proofObj.UploadDate = getDateFormatted(new Date().getTime());
		proofObj.Status = uploadedDocuments[i]["Status"];
		proofObj.issync = "0";
		proofObj.iscompleted = "1";
		proofObj.DocumentTypeCode =uploadedDocuments[i]["uploadDocType"];
		proofObj.ImagePath = uploadedDocuments[i]["uploadeddocument"];
		proofObj.ImageName =  "CFR_DOCS";
		proofObj.Extended_Attributes =  uploadedDocuments[i]["CfrCode"];
		insertArray.push(new PDC_Image_Details(proofObj));
	}
	if(!insertArray.length){
		currentData.CurrStatus("1");
		$m.alert("Please add document!");
		return;
	}
	new window.DB(CONSTANTS.DBName, function(dbHelper) {
		window.dbHelper = dbHelper;
		PDC_Image_Details.multipleInsert(insertArray, function() {
			//$m.logInfo("Image details inserted successfully");
			$m.hideProgress();
			$m.alert("The required documents have been submitted");
		}, function(res) {
			$m.logError("Failed to insert image details--- " + JSON.stringify(res));
			$m.alert("Error while inserting to database");
			$m.hideProgress();
		}); 
	});	
}

function updateCFRStatus(Application_Number){
	
}


function showDetails(customerDetails, type){
	customerDetails = ko.toJS(customerDetails);
	if(customerDetails.CfrCategory === type){
		return true;
	}
	return false;
	
}


function showStatus(customerDetails, status){
	customerDetails = ko.toJS(customerDetails);
	if(customerDetails.ApplicantCfrStatus != status){
		return true;
	}
	return false;
	
}

function showTerms(){
	$m.juci.showDialog("dialog-box-terms");
}

function hideTerms(){
	$m.juci.hideDialog("dialog-box-terms");
}

function payPremium(e) {
    var customerName = "";
    var customerDetails = $m.juci.dataset("customerDetails");
    if (customerDetails.IS_LA_PR_SAME != 'Y') {
        customerName = customerDetails.PR_Name;
    } else {
        customerName = customerDetails.LA_Name;
    }
    var dataObj = {
        sApp: "TABAPP",
        portalTeam: customerDetails.customerName,
        dAmount: 11, //(planDetails.Total_InstPremium_ST == null ? planDetails.InstallmentPremium_ST : planDetails.Total_InstPremium_ST),
        sTrxnCode: generateTransactionCode(customerDetails.Application_Number),
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
            //$m.logInfo("URL:" + url);
            var keyData = url.slice(url.indexOf("?") + 1);
            var key = keyData.slice(keyData.indexOf("=") + 1);
            $m.openChildBrowser("Payment Gateway", url, {
                "navigation": true,
                "address": [],
                "patterns": [{
                    "pattern": "/OnlinePaymentIntg/GatewayResponseHandler",
                    "callback": function(match) {
                        if ($m.isWeb()) {
                            serverlink = "http://localhost/rlife/";
                        }
                        $m.get(serverlink + "mowblyserver/smpaymentgateway/rellife/prod/ProposalForm?appNo=" + dataObj.sTrxnCode, function(response) {
                            if (response.code == 200) {
                                //Success
                                var result = response.result;
                                var data = JSON.parse(result.data);
                                //var paymentDetails = $m.juci.dataset("paymentDetails", bindingObject.PDC_Payment_Details);
                                var customerDetails = $m.juci.dataset("customerDetails");
                                var bopDescription= $m.juci.dataset("bopDescription");
                                var dataObjtoUD = {
                                    "data": {
                                        "Txn_Id": customerDetails.Txn_Id,
                                        "Application_Number": planDetails.bopDescription,
                                        "LA_Name": customerDetails.LA_Name,
                                        "LA_Mobileno": customerDetails.LA_Mobileno,
                                        "IS_LA_PR_SAME": customerDetails.IS_LA_PR_SAME,
                                        "Payment_Type": "Online",
                                        "InstallmentPremium": bopDescription.BopAmount,
                                        "Payment_Cash_DD": "N"
                                    },
                                    "page": "Payment"
                                };
                                var paymentDbArray = [];
                                var currentObject = paymentDetails;
                                currentObject.Application_Number = applicationNumber;
                                currentObject.iscompleted = '1';
                                if (currentObject.Payment_Type != 'Offline' && currentObject.Cheque_Date)
                                    currentObject.Cheque_Date = currentObject.Cheque_Date.getTime();
                                currentObject.Amount_Paid = dataObj.dAmount;
                                currentObject.Payment_Type = "Online";
                                currentObject.PAYMENTDATE = dataObj.sAddInfo1;
                                currentObject.PAYMENTSTATUS = data.Txn_Status;
                                currentObject.Row_No = 1;
                                currentObject.WEBTOKENNO = dataObj.sTrxnCode;
                                currentObject.RECEIPTNUMBER = key;
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
                                        PDC_LifeStyle_Details.updateIsCompleted({
                                            'iscompleted': '1'
                                        }, filter, function(success_response) {
                                            PDC_Plan_Details.updateIsCompleted({
                                                'iscompleted': '1'
                                            }, filter, function(success_response) {
                                                PDC_Customer_Details.updateIsCompleted({
                                                    'iscompleted': '1'
                                                }, filter, function(success_response) {
                                                    PDC_EXISITINGPOLICIES_Details.updateIsCompleted({
                                                        'iscompleted': '1'
                                                    }, filter, function(success_response) {
                                                        PDC_FAMILYHISTORY_Details.updateIsCompleted({
                                                            'iscompleted': '1'
                                                        }, filter, function(success_response) {
                                                            $m.alert("Your Payment of Rs." + data.Txn_Amt_Paid + " is successful.", "Payment", function() {
                                                                //$m.logInfo("Completed Details updated successfully");
                                                                Utils.open(Pages.uploadDocuments, dataObjtoUD);
                                                            });
                                                        }, function(res) {
                                                            $m.logError("Failed to update family details iscompleted--- " + JSON.stringify(res));
                                                            $m.alert("Error while updating database");
                                                        });
                                                    }, function(res) {
                                                        $m.logError("Failed to update policies iscompleted--- " + JSON.stringify(res));
                                                        $m.alert("Error while updating database");
                                                    });
                                                }, function(res) {
                                                    $m.logError("Failed to update customer details iscompleted--- " + JSON.stringify(res));
                                                    $m.alert("Error while updating database");
                                                });
                                            }, function(res) {
                                                $m.logError("Failed to update plan details iscompleted--- " + JSON.stringify(res));
                                                $m.alert("Error while updating database");
                                            });
                                        }, function(res) {
                                            $m.logError("Failed to update lifestyle details iscompleted--- " + JSON.stringify(res));
                                            $m.alert("Error while updating database");
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
                    }
                }]
            });
        } else {
            // Error
            var errMsg = response;
        }
    });
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
}function generateTransactionCode(AppNo) {
    var d = new Date().getTime();
    // xxxx-xxx-4xxx-yxx-xxxxxx
    var uuid = 'xxxxxx-x4xxxy-xxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    return AppNo + "-" + uuid;
}
		function collapasible(){
										$m.juci.find(".tab .juci_thinbar").forEach(function(el, idx){
	                    	tabs.push(false);
		                 el.onClick(getToggleHandler(idx));
										
	});
			}
				
function getAddedArray(documents){
	documents = ko.toJS(documents);
	return documents;
}


function getCfrDocs(applicationNumber, callback){
	new window.DB(CONSTANTS.DBName, function(dbHelper) {
		window.dbHelper = dbHelper;
		PDC_Image_Details.SelectWithFilter(applicationNumber, function(response) {
			callback(response.rows);
		}, function(res) {
			callback([]);
		}); 
	});	
}

function getDocType(cfrObj, existingDoc){
	cfrObj = JSON.parse(JSON.stringify(cfrObj));
	cfrObj["uploadDocType"] = cfrObj.CfrDocumentCategory;
	cfrObj.uploadeddocument = existingDoc.ImagePath;
	cfrObj.currenttime = existingDoc.UploadDate;	
	return cfrObj;
}


function getCurrentStatus(iscompleted,issync){
	if(typeof iscompleted === "function"){
		iscompleted = iscompleted();
	}
	
	if(typeof issync === "function"){
		issync = issync();
	}
	
	if(issync === "1"){
		return "Synced";
	}
	if(iscompleted === "1"){
		return "Completed";
	}
	return "Pending";
	
}

function onDelClick(e, ele){
	//ToDO
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
         var data =  juci.getDataset("documentsPending");
             for(var i=0;i<data().length;i++){
         	if(data()[i]["id"]()==e.id){
         	data()[i]["uploadeddocs"]().splice(ele.target.id,1);
         		//return;
         	}
         	juci.dataset("documentsPending",data());
         }    
        } else if (index == 1) {
            // No
        }
   });
}
