/**
 * BiHomepage.js
 * @author CloudPact Technologies
 * @description : This script is for opening benifit illustration child browers.
 **/

var x2js = new X2JS();
var policyId = "";
var advisorId = "";
var advisorCode = "";
var advisorName = "";
var Plan_Code = "";
var logincode = "";
var password = "";
var credentials = "";

$m.onReady(function(){
	logincode = $m.getUserAccount().customProperties.Login_Code;
    password = $m.getUserAccount().customProperties.Login_Pwd;
});

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};

function generateUUID() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
	});
	return advisorCode + "-" + uuid;
}

//checking network bandwidth
var checkingNetworkSpeedCallback = function(res){
	utils.HideProgress();
	openProductsBi();
};
var message = "Your Network bandwidth is below 250 kbps.It will take some time to sync the data.Do you want to Proceed?";
utils.CheckingNetworkSpeed(message,checkingNetworkSpeedCallback);

//checking roles for calling service
function callService(data) {
	var hierarchydata;
    utils.RemovePref("AadhaarLead_ID");
    utils.RemovePref("Lead_ID");
	if(gettype() !=='ADV' && gettype() !=='TPADV' && gettype() !=='AGADV' && gettype() !=='FLS' && gettype() !=='CNADV' && gettype() !=='PRADV' && gettype() !=='ENADV'){
	   	if(gettype() =='TPPR'){
	    	hierarchydata = $m.juci.getControl("tppar").value();
	   	}else if(gettype() =='TPSM'){
	   		hierarchydata = $m.juci.getControl("tpsm").value();
	   	}else if(gettype() =='AGSM'){
	   		hierarchydata = $m.juci.getControl("agsm").value();
	   	}else if(gettype() =='PRSM'){
	   		hierarchydata = $m.juci.getControl("prsm").value();
	   	}else if(gettype() =='CNSM'){
	   		hierarchydata = $m.juci.getControl("cnsm").value();
	   	}else if(gettype() =='AGPS'){
	   		hierarchydata = $m.juci.getControl("agps").value();
	   	}else if(gettype() =='TPBOM'){
	   		hierarchydata = $m.juci.getControl("tpbom").value();
	   	}
	   	else{
	   		hierarchydata = $m.juci.getControl("ad").value();
	   	}
	if(!hierarchydata){	
		$m.alert("Please Select Advisor");
		return;
	}
		hidebox();
	}
	if ($m.getPref("productCode")) {
		var productCode = $m.getPref("productCode");
		Plan_Code = productCode;
	} else {
		Plan_Code = data.PLanCode;
	}
	if (!Plan_Code) {
		return false;
	}
	
	if ($m.getPref("useAs")) {
		advisorCode = $m.getPref("useAs").LA_Business_LoginCode;
		advisorName = $m.getPref("useAs").Adv_Emp_Name;
	} else {
		advisorCode = $m.getUserAccount().customProperties.LA_Business_LoginCode;
		advisorName = $m.getUserAccount().customProperties.Login_Name;
	}
	
	//checking network bandwidth
	if($m.networkConnected()){
		$m.showProgress("Checking network bandwidth");
		utils.NetworkUtils();
	}else{
			$m.alert(messages.NoNetworkConnectivity,"Network Alert",function(){
			$m.hideProgress();
		});
	}
}

//opeing Bi page using child brower
function openProductsBi(){
	clearSelectBox();
	$m.openChildBrowser("Proposal BI", "http://biuat.reliancenipponlife.com/Plan"+Plan_Code+".html?UniqueID=undefined&DeviceID=TAB&AdvisorCode="+advisorCode+"&AdvisorName="+advisorName+"&AssuredName=undefined&Planno="+Plan_Code+"&DOB=undefined&Term=undefined&SA=undefined&Mode=undefined&GENDER=undefined&ANNUAL_INCOME=undefined&PURCHASE_MODE=undefined&UTM_SOURCE=undefined&LEAD_ID=undefined&Activity_Result_Id=undefined&Expert_call=false", {
		"navigation": true,
		"address": [],
		"patterns": [{
			"pattern": "Plan" + Plan_Code + ".html?fname",
			"callback": function(match) {
				var fname = "";
				var fromRegenerate = false;
				if (match.url.indexOf("&") == -1) {
					fname = match.url.substring(match.url.indexOf("fname") + 6, match.url.length);
				} else {
					fname = match.url.substring(match.url.indexOf("fname") + 6, match.url.indexOf("&"));
				}
				if (fname == "" || fromRegenerate) {
					$m.alert("Unexpected Response from BI");
					return;
				} else {
					try {
						var url = "http://lifelineuat.reliancelife.com/RassistServices/wsPDCDetails.svc/GetBIDetail";
						var data = {
							"SID":fname,
							"SapCode":$m.getUsername()
						}
						data = JSON.stringify(data);
						 if ($m.isWeb()) {
			            	credentials = Base64.encode("70268271:70268271");	
		    			} else {
		    				credentials = Base64.encode(logincode +":" + password);	
		    			}
						$m.post(url,data,{
					        "headers": {
					            "Content-Type": "application/json",
					            "Authorization":"Basic "+ credentials
					        }
					    }, function(response) {
							if (response.code === 200) {
								var result = response.result;
								var resulData = JSON.parse(result.data);
								if (resulData) {
									if(resulData.Status == "N") {
										$m.alert("BI request failed due to : " + JSON.stringify(result.data.Message));
										$m.logError("BI request failed due to : " + JSON.stringify(result.data.Message));
										return;
									}
									var bidata = resulData.objBIXMLValuesData;
									var advisor_code = bidata.Advisor_Code ? bidata.Advisor_Code : "";
									var passingData = {
										"data": bidata,
										"PLanCode": bidata.PLanCode,
										"Advisor_Code": advisor_code,
										"name":bidata.Name,
										"dob":bidata.DOB,
										"sex":bidata.Sex,
										"Mode_Deposit":bidata.Mode_Deposit,
										"Premium_Frequency":bidata.Mode_Deposit,
										"InstallmentPremium_ST":bidata.InstallmentPremium_ST,
										"Total_InstPremium_ST":null,
										"EED":bidata.Eligible_for_EmpDiscount ? bidata.Eligible_for_EmpDiscount : "",
										"Advisor_Name":bidata.Advisor_Name,
										"PremiumPayingTerm":bidata.PremiumPayingTerm,
										"PolicyTerm":bidata.PolicyTerm,
										"Txn_Date":bidata.Txn_Date,
										"Child_Name":bidata.Child_Name,
										"Child_Gender":bidata.Child_Gender,
										"AGE_Proof":bidata.AGE_Proof,
										"Application_Dt":bidata.Application_Dt,
										"Child_DOB":bidata.Child_DOB,
										"NOM_LA_Relationship":bidata.NOM_LA_Relationship,
										"SumAssured":bidata.SumAssured,
										"AGE":bidata.AGE,
										"Base_Annualised_Premium":bidata.Base_Annualised_Premium ? bidata.Base_Annualised_Premium : "",
										"ECS_NonECS":bidata.ECS_NonECS ? bidata.ECS_NonECS : "",
										"Child_Proposar_Relation":bidata.Child_Proposar_Relation ? bidata.Child_Proposar_Relation : ""
									};
									passingData.fname = fname;
									if (passingData.name && passingData.dob) {
										$m.removePref("useAs");
										$m.removePref("id_Value");
										utils.PutPref("FromProducts",true);
										$m.putPref("isProductsPage",true);
										$m.savePref();
										$m.open("Proposals", "/Applications/proposal.html", passingData);
										
									} else {
										$m.logError("Kindly check your network connectivity!! - " + JSON.stringify(response));
										$m.logDebug("Kindly check your network connectivity!! - " + JSON.stringify(passingData));
										$m.alert("Kindly check your network connectivity!!");
									}
								} else {
									$m.logError("Request Failed. Please try later" + JSON.stringify(response));
									$m.alert("Request Failed. Please try later");
								}
							} else {
								$m.logError("Request Failed. Please try later" + JSON.stringify(response));
								$m.alert("Request Failed. Please try later");
							}
						});
					} catch (e) {
						$m.alert("Kindly upgrade to latest version from force update option for application no generation!!");
						$m.logError("Request Failed. Please try later. Reason - " + e);
					}
				}
			}
		}, {
			"pattern": "/biwebservice/pdf.aspx",
			"callback": function(match) {
				var fname = "";
				var fromRegenerate = false;
				if (match.url.indexOf("url1") != -1) {
					match.url = match.url.substring(match.url.indexOf("url1") + 5, match.url.indexOf("&"));
					fromRegenerate = false;
				} else {
					fromRegenerate = true;
				}
				if (match.url.indexOf("&") == -1) {
					fname = match.url.substring(match.url.indexOf("fname") + 6, match.url.length);
				} else {
					fname = match.url.substring(match.url.indexOf("fname") + 6, match.url.indexOf("&"));
				}
				if (fname == "" || fromRegenerate) {
					$m.alert("Unexpected Response from BI");
				} else {
					try {
						$m.get(Constants.publicIP + "/mowblyserver/smbiintegrateservice/rellife/prod/RlifeAssist?fname=" + fname, function(response) {
							if (response.code == 200) {
								var result = response.result;
								policyId = result.data;
								policyId = policyId.trim();
								$m.get(Constants.publicIP + "/mowblyserver/smbiproductcode/rellife/prod/RlifeAssist?policyId=" + policyId + "&appversion=" + $m.getPref("version"), function(response) {
									if (response.code == 200) {
										if (response.result.data.trim()) {
											var result = response.result;
											var data = JSON.parse(result.data);
											var Product_Code = data.ProductCode;
											var CombinationOFProducts = data.CombinationOFProducts;
											//alert("Product Code:"+Product_Code+"Combi:"+CombinationOFProducts);
											$m.get("http://lifelineuat.reliancelife.com/BIwebservice/UL/HTML/" + fname + "demo.xml", function(response) {
												if (response.code === 200) {
													var result = response.result;
													if (result.data) {
														var obj = x2js.xml_str2json(result.data);
														var passingData = proccessBIData({
															"data": obj.DocumentElement.Table,
															"policyId": policyId,
															"BI_XML": result.data,
															"Product_Code": Product_Code,
															"CombinationOFProducts": CombinationOFProducts,
															"Advisor_Code": advisorCode
														});
														passingData.fname = fname;
														//alert(JSON.stringify(passingData));
														if (passingData.name && passingData.dob) {
															$m.open("Proposal", "/Proposals/proposal.html", passingData);
														} else {
															$m.logError("Kindly check your network connectivity!! - " + JSON.stringify(response));
															$m.logDebug("Kindly check your network connectivity!! - " + JSON.stringify(passingData));
															$m.alert("Kindly check your network connectivity!!");
														}
													} else {
														$m.logError("Request Failed. Please try later" + JSON.stringify(response));
														$m.alert("Request Failed. Please try later");
													}
												} else {
													$m.logError("Request Failed. Please try later" + JSON.stringify(response));
													$m.alert("Request Failed. Please try later");
												}
											});
										} else {
											$m.alert("Kindly upgrade to latest version from force update option for application no generation!!");
										}
									} else {
										$m.logError("Request Failed. Please try later" + JSON.stringify(response));
										$m.alert("Request Failed. Please try later");
									}
								});
							} else {
								$m.logError("Request Failed. Please try later" + JSON.stringify(response));
								$m.alert("Request Failed. Please try later");
							}
						});
					} catch (e) {
						$m.alert("Kindly upgrade to latest version from force update option for application no generation!!");
						$m.logError("Request Failed. Please try later. Reason - " + e);
					}
				}
			}
		}]
	});
}

function jsonObject(x) {
	var jsonString = "";
	var objectData = {};
	var xmlString = ["_x0020_DOB", "Age", "Term", "PPT", "SA", "Mode", "Sex", "txtName", "QuotationNo", "txtDate", "txtAdvisor", "txtAdvisor_Code", "AgeProof", "IP", "IPST1", "IPST2", "AP", "Frequency", "IXP", "IXPST", "IXPST2", "BIP", "BIPST1", "BIPST2", "QNO", "PlanNo", "DATETIMENOW"];
	for (var i = 0; i < xmlString.length; i++) {
		var index = x.indexOf(xmlString[i]);
		console.log("index" + index);
		x = x.slice(index, x.length);
		index2 = xmlString[i].length;
		name = xmlString[i];
		value = x.substring(index2 + 1, x.search("</"));
		objectData[name] = value;
		jsonString += "\"" + name + "\":\"" + value + "\",";
	}
	return objectData;
}

function clearSelectBox(){
	var id_value = $m.getPref("id_Value");
	if(id_value != undefined){
		$m.juci.getControl(id_value).value(null);		
	}
}