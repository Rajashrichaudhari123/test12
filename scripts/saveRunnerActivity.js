/**
 * saveLeadPojo.js
 * @author CloudPact Technologies
 * @description : This script is used for storing runner activity data into local db and server.
 **/
$m.juci.addDataset("saveRunnerForm", bindingObject.saveRunnerActivity);
var meeting_status = {
Meeting:[{
			"LA_CODE": "DONE",
			"Description":"Met"
		},{
			"LA_CODE": "POST",
			"Description":"Not Met"
		}
		]
};
$m.juci.addDataset("disabledField", true);
$m.juci.addDataset("otp", "");
$m.juci.addDataset("Aadhar", "");
$m.juci.addDataset("Aadharno", "");
$m.juci.addDataset("meeting_status", meeting_status.Meeting);
$m.juci.addDataset("aadhar_section", false);
$m.juci.addDataset("fingerPrint","");
$m.juci.addDataset("status", true);
$m.juci.addDataset("hasAuthenticated",false);
var data = {};
var x2js = new X2JS();
var dbHelper;
var datasetData ={};

$m.onReady(function(){
	initReady();
	$m.juci.findById("aadhar-details").hide();
});

function initReady(){
	service = new ServiceLibrary();
	$m.juci.dataset("headerName","Runner Activity");
	var dbcallback = function(dbhelper) {
		dbHelper = dbhelper;
	};
	utils.GetDbhelper(dbcallback);
}

$m.onResume(function(){
	$m.removePref("AadhaarData");
});

$m.onData(function(eventObject){
	initData(eventObject);
});

$m.onClose(function() {
	setClose();
});

/** Clearing the form**/
function setClose() {
	$m.juci.dataset("saveRunnerForm", bindingObject.saveRunnerActivity);
	var runnerForm = utils.GetControl("runnerForm");
	$m.removePref("AadhaarData");
	runnerForm.clearValidation();
}

/** Checking the network**/
var checkingNetworkSpeedCallback = function(res){
	utils.HideProgress();
	saveForm(datasetData);
};

var message = "Your Network bandwidth is below 250 kbps.It will take some time to sync the data.Do you want to Proceed?";
utils.CheckingNetworkSpeed(message,checkingNetworkSpeedCallback);

/** Fetching the runner activity details from list page**/
function initData(eventObject){
	$m.juci.dataset("disabledField", true);
	$m.juci.dataset("aadhar_section", false);
	$m.juci.findById("aadhar-details").hide();
	$m.juci.getControl("meeting-status").value(null);
	data = eventObject.data;
	datasetData = $m.juci.dataset("saveRunnerForm");
	datasetData.Customer_Name = data.ClientName;
	datasetData.DOB = ChangeFormat(data.DateOfBirth);
	datasetData.Renewal_Premium = data.RenewalAmount;
	datasetData.Policy_Status = data.PolicyStatus;
	datasetData.Policy_Number = data.PolicyNo;
	datasetData.ClientID = data.ClientId;
	$m.juci.dataset("saveRunnerForm",datasetData);
	$m.juci.dataset("Aadharno", "");
	$m.juci.dataset("hasAuthenticated",false);
}

/** Save the details**/
function onSearchDetailsClick(e){
		var locationCallback = function(lat, long) {
			datasetData = $m.juci.dataset("saveRunnerForm");
			datasetData.Latitude = lat;
			datasetData.Longitude = long;
			var aadharData = utils.GetPref("AadhaarData");
			if(aadharData){
				datasetData.Aadhar_YN = "Y";
				datasetData.Aadhar_Number = aadharData.Aadhar_Number;
				datasetData.Authenticate_By = aadharData.Authenticate_By;
				datasetData.Care_Of_Person = aadharData.Care_Of_Person;
				datasetData.City = aadharData.City;
				datasetData.Contact_No = aadharData.Contact_No;
				datasetData.Customer_Name = aadharData.Customer_Name;
				datasetData.Customer_Photo = aadharData.Customer_Photo;
				datasetData.DOB = aadharData.DOB;
				datasetData.Details_Approved = aadharData.Details_Approved;
				datasetData.Device_PN = aadharData.Device_PN;
				datasetData.Device_SN = aadharData.Device_SN;
				datasetData.District = aadharData.District;
				datasetData.EKYC_XML = aadharData.EKYC_XML;
				datasetData.Email_ID =aadharData.Email_ID;
				datasetData.Entry_Stage = aadharData.Entry_Stage;
				datasetData.Gender = aadharData.Gender;
				datasetData.House_Identifier = aadharData.House_Identifier;
				datasetData.Landmark = aadharData.Landmark;
				datasetData.Locality = aadharData.Locality;
				datasetData.Pincode = aadharData.Pincode;
				datasetData.PostOffice_Name = aadharData.PostOffice_Name;
				datasetData.Runner_Sapcode =  aadharData.SAPCode;
				datasetData.Source_From = aadharData.Source_From;
				datasetData.State = aadharData.State;
				datasetData.Street_Name = aadharData.Street_Name;
				datasetData.Sub_District = aadharData.Sub_District;
			}else{
				datasetData.Aadhar_YN = "N";
				datasetData.DOB = new Date(datasetData.DOB).getTime();
				datasetData.Source_From = "TAB";
			}
			datasetData.Met_NotMet = datasetData.Met_NotMet.Description;
			if(datasetData.Met_NotMet == "Met"){
				if(!aadharData){
					$m.toast("Please enter all the fields");
					return;
				}
			}
			datasetData.Address = "";
			datasetData.Added_By = utils.GetLoginCode();
			datasetData.iscompleted = "1";
			if (dbHelper) {
				var Obj = new saveRunnerActivity(datasetData);
				var insertCallback = function() {
						//$m.logInfo("Successfully inserted!");
						if ($m.networkConnected()) {
							$m.showProgress("Checking your network bandwidth please wait...");
							utils.NetworkUtils();
						} else {
							$m.alert(messages.NoNetworkConnectivity, "Network Alert", function() {
								$m.hideProgress();
							});
						}
				};
				utils.PojoInsert("SaveRunnerActivity", insertCallback, Obj);
			} else {
				$m.alert("Error while opening database");
			}
		};
		utils.GetLocation(2000, true,locationCallback);
}

/** Open otp dialog box**/
function openOtp(value) {
	$m.showProgress("Loading OTP...");
	var callback = function(){
		utils.HideDialog("authentication");			
		utils.ShowDialog("dialog-otp");
	};
	var aadhar = $m.juci.getControl("Aadhar").value();
	$m.juci.dataset("aadharno", aadhar);
	if (aadhar) {
		getOtp(aadhar,callback);
	} else {
		$m.hideProgress();
		$m.alert("Please enter Aadhar number");
	}
}

/** Resend the otp**/
function resendOtp() {
	$m.showProgress("Loading OTP...");
	var callback = function(){
		utils.HideDialog("dialog-otp");
		utils.ShowDialog("dialog-otp");
	};
	var aadhar = $m.juci.getControl("Aadhar").value();
	$m.juci.dataset("aadharno", aadhar);
	if (aadhar) {
		getOtp(aadhar,callback);
	} else {
		$m.hideProgress();
		$m.alert("Please enter Aadhar number");
	}
}

/** Send the otp**/
function sendOtp(event) {
	var aadharObject = {};
	var resultform = $m.juci.dataset("saveRunnerForm");
	var aadhar = $m.juci.dataset("Aadharno");
	var Otp = juci.getControl("otpNo").value();
	if (!Otp) {
		$m.alert("Please enter Otp");
		return;
	}
	$m.showProgress("Fetching Aadhaar Details...");
	var callback = function(response) {
		var aadhar_result = response.data;
		var result = x2js.xml_str2json(aadhar_result);
		var Adhar_data = result.Envelope.Body.Production_EkycThroughOTP_RDserviceResponse.Production_EkycThroughOTP_RDserviceResult.KeyValueOfstringstring;
		if (Adhar_data.Value) {
			var validation = checkValidation(Adhar_data,"otpNo","dialog-otp");
				if(!validation){	
					return;
				}
			}
	   aadharObject = setValues(Adhar_data);
	   var Address = checkAddress("dialog-otp",aadharObject,"otpNo");
	   	   if(!Address){
				return;
			}
		if (aadharObject["Name"]) {
			var aadharDate = new Date(ChangeFormatofDate(aadharObject.DOB));
			if(aadharDate.getDate() == "01" && aadharDate.getMonth() == "0"){
				$m.alert("Invalid Aadhaar Number");
				return;
			}
			var aadharData = assignAadhardata(aadharObject,resultform.Lead_Id, aadhar_result,"OTP");
			setAadhaarValues(aadharData);
			juci.hideDialog("dialog-otp");
			$m.hideProgress();
		} else {
			$m.hideProgress();
			juci.getControl("otpNo").value(null);
			$m.alert("Your Aadhar No is Invalid");
			return;
		}
		juci.getControl("otpNo").value(null);
	}
	AadharServices.VerifyOtp(Otp, aadhar, callback);
}

/** Close the dialog box**/
function closebox() {
	juci.hideDialog("dialog-otp");
	juci.getControl("otpNo").value(null);
}

/** Checking the aadhar number**/
function openauthentication() {
	var aadhar = $m.juci.dataset("Aadharno");
	$m.juci.dataset("aadharno", aadhar);
	if (aadhar) {
		if(aadhar.length < 12){
			$m.alert("Please enter valid Aadhaar number");
			return;
	}
		utils.ShowDialog('authentication');
	} else {
		$m.alert("Please enter Aadhar number");
	}
}

function closeadhar() {
	utils.HideDialog('authentication');
}

/** Assigning the aadhar data**/
function assignAadhardata(objects, Lead_Id, ekyc,authenticateBy) {
	var aadharMorphoInfo = utils.GetPref("aadharMorphoInfo");
	var morphoSerialNo,morphoPnNo;
	if(aadharMorphoInfo != undefined){
		var morphoSplit = aadharMorphoInfo.result.model.split("-");
		morphoSerialNo = morphoSplit[1];
		morphoPnNo = morphoSplit[0];	
	}else{
		morphoSerialNo = "";
		morphoPnNo = "";
	}
	var aadharObj = {};
		aadharObj.Lead_ID = Lead_Id;
		aadharObj.Aadhar_Number = objects.AadhaarNumber;
		aadharObj.Authenticate_By = authenticateBy;
		aadharObj.Details_Approved = "Y";
		aadharObj.Customer_Name = objects.Name;
		aadharObj.DOB = utils.GetTimeStampByDate(ChangeFormatofDate(objects.DOB));
		aadharObj.Gender = objects.Gender;
		aadharObj.Contact_No = objects.Phone;
		aadharObj.Email_ID = objects.Email;
		aadharObj.Care_Of_Person = objects.CareOfPerson;
		aadharObj.House_Identifier = objects.House;
		aadharObj.Street_Name = objects.Street;
		aadharObj.Landmark = objects.Landmark;
		aadharObj.Customer_Photo = objects.Photo;
		aadharObj.Locality = objects.Locality;
		aadharObj.City = objects.city;
		aadharObj.Sub_District = objects.SubDistrict;
		aadharObj.District = objects.District;
		aadharObj.State = objects.State;
		aadharObj.Pincode = objects.PinCode;
		aadharObj.PostOffice_Name = objects.PostOfficeName;
		aadharObj.EKYC_XML = ekyc;  //.replace(/"/g, '\\"')
		aadharObj.Added_By = utils.GetLoginCode();
		aadharObj.Source_From = "TAB";
		aadharObj.Entry_Stage = "string";
		aadharObj.Device_SN = morphoSerialNo;
		aadharObj.Device_PN = morphoPnNo;
		aadharObj.SAPCode = utils.GetLoginCode();
		aadharObj.issync = 0;
		aadharObj.iscompleted = 1;
	return aadharObj;
}


function ChangeFormatofDate(date) {
	var date1 = date;
	date1 = date1.split("-");
	currdate = date1[1] + "/" + date1[0] + "/" + date1[2];
	return currdate;
}

function openBiometric(){
	var aadharNo = $m.juci.dataset("Aadharno");
	var isFingerPrintConnected = function(resp){
		console.log(JSON.stringify(resp));
	};
	
	var fingerPrintCallback = function(res){
			if (res.code == 1) {
				$m.hideProgress();
				 utils.HideDialog('authentication');
        		 utils.ShowDialog("dialog-fingerprint");
				console.log(res);
				/*$m.fingerprintDeviceInfo(function(res){
					console.log("info" +res);
					isFingerPrintConnected(res);
				});*/
			}
			if (res.code === 0) {
				$m.hideProgress();
				$m.alert(res.error.message, "Finger Print Scan Error", function() {});
			}
	};
	var scanCallback = function(res){
		if (res.data.status === 0) {
			utils.HideDialog("dialog-fingerprint");
			$m.juci.dataset("fingerPrint", null);
			$m.alert(res.data.error, "Finger Print Scan Error", function() {});
		} else if (res.data.status == 1) {
			var result = res.data.result;
			var pidblock = x2js.xml_str2json(result);
			console.log(JSON.stringify(pidblock));
			utils.PutPref("PIDData", pidblock);
		} else if (res.data.status == 2) {
			$m.hideProgress();
			console.log(res.data.status);
			var img = "data:image/png;base64,"+res.data.result;
			if(img){
			$m.juci.dataset("fingerPrint", img);
			}
		}
	};
	
	var fingerPrintDeviceInfoCallback = function(res){
		utils.PutPref("aadharMorphoInfo",res);
	};
	
	AadharServices.CaptureBiometric(aadharNo,fingerPrintCallback,scanCallback);
	$m.fingerprintDeviceInfo(fingerPrintDeviceInfoCallback);
}

function closeAuthenticate(){
	utils.HideDialog('authentication');
}

function saveToServer(aadharData){
		customer_aadhar = new Customer_Aadhar_Details(aadharData);
		var updatecallback = function(res) {
			//$m.logInfo("Aadhar Details inserted successfully");
			if($m.networkConnected()) {
					var ekyccallback = function(res) {
						if (res.Status == "Y") {
						//	$m.logInfo("Aadhar Details inserted successfully");
							var serverAlertCallback = function(){
								var appfilter = new DB.Filter.equal("Lead_ID",aadharData.Lead_ID);
								Customer_Aadhar_Details.updateSync({
									"issync": "1"
								}, appfilter, function() {
									saveActivityForm();
								});
							}
							$m.alert("Aadhaar Record inserted successfully to server","Alert",serverAlertCallback);
						} else {
								$m.logError("Failed to insert Aadhar Details response is" + ' ' + res.Status);
								$m.alert("Failed to insert Aadhar Details response is" + ' ' + res.Status, "Failed to Insert", function() {
									$m.close();
								});		
						}
					};
					service.saveEKYC(ekyccallback, aadharData);
			}
			else{
				$m.alert(messages.NoNetworkConnectivity, "Network Alert", function() {
					saveActivityForm();
				});
			}
		};
		utils.PojoUpdate("Customer_Aadhar_Details", updatecallback, customer_aadhar);
	}

function callBiometricService() {
	utils.ShowProgress("Fetching Aadhaar Details...");
	var pidData = utils.GetPref("PIDData");
	var resultform = $m.juci.dataset("saveRunnerForm");
	if(pidData){
		pidData = pidData.ECSUidaiRequestData;
		var aadhaarCallback = function(response) {
			var resultData = response.data;
			var result = x2js.xml_str2json(resultData);
			var Adhar_data =  result.Envelope.Body.Production_EkycThroughBiometricForRegisteredDeviceResponse.Production_EkycThroughBiometricForRegisteredDeviceResult.KeyValueOfstringstring;
			if (Adhar_data.Value) {
				var validation = checkValidation(Adhar_data,"");
					if(!validation){
						$m.juci.dataset("aadhar_section", false);
						return;
					}
			}
			aadharObject = setValues(Adhar_data);
			var Address = checkAddress("dialog-fingerprint",aadharObject,"");
		    if(!Address){
		    	return;
			}	
			if (aadharObject["Name"]) {
				var aadharDate = new Date(ChangeFormatofDate(aadharObject.DOB));
				if(aadharDate.getDate() == "01" && aadharDate.getMonth() == "0"){
					$m.alert("Invalid Aadhaar Number");
					return;
				}
				var aadharData = assignAadhardata(aadharObject,resultform.Lead_Id, resultData,"Biometric");
				utils.HideDialog("dialog-fingerprint");
				setAadhaarValues(aadharData);
				$m.hideProgress();
			} else {
				$m.hideProgress();
				$m.alert("Your Aadhar No is Invalid");
				return;
			}
		}
		AadharServices.ValidateBiometric(pidData, aadhaarCallback);
	}
	else{
		$m.alert("Please do biometric authentication");
		return;
	}
}
		
function checkAadhaarValidation(){
	var displaytText;
	var checkAadhaar = utils.GetControl("checkAadhar").value();
	var aadharData = utils.GetPref("AadhaarData");
	if(aadharData){
		if(checkAadhaar){
			var resultform  = $m.juci.dataset("newResultForm");
		    var aadhar_DOB = utils.GetDate(aadharData.DOB);
		    var leaddob = new Date(resultform.DOB).toString("dd/MM/yyyy");
		    	displaytText = "Your Aadhaar Name or Date of Birth doesn't match with Lead data.Would you like to update lead data with Aadhaar Details";
				var yesCallback = function() {
					var serviceCallback = function(){
						$m.toast("Lead Details updated successfully");
					};
					var data = {};
					data.Name = aadharData.Customer_Name;
					data.DOB  = aadharData.DOB;
					data.Gender = aadharData.Gender;
					data.Lead_Id = resultform.Lead_Id;
					data.Activity_Id = aadharData.Activity_Id;
					data.Pin_Code = aadharData.Pincode;
					//data.City = aadharData.City;
					data.Sync_Txn_Id = utils.GetTimeStamp();
					service.updateLeadInformation(serviceCallback,data);	
				};
				var noCallback = function(){
					$m.juci.dataset("aadhar_section",false);
					utils.GetControl("checkAadhar").value(false);
					utils.RemovePref("AadhaarData");
				};
			if((resultform.Name.toUpperCase() == aadharData.Customer_Name.toUpperCase()) && ( aadhar_DOB == leaddob) ){
			}
			else{
				utils.ConfirmBox(displaytText,yesCallback,noCallback);
			}
		}
		else{
		}
	}
	else{
		utils.GetControl("checkAadhar").value(false);
		$m.alert("No Aadhaar Data found");
		}
}

function setAadhaarValues(aadharrows){
	    utils.PutPref("AadhaarData",aadharrows);
		var Aadhar_data = {};
		    Aadhar_data.Name = aadharrows.Customer_Name;
			Aadhar_data.DateofBirth = utils.GetDate(utils.GetDateByTimeStamp(aadharrows.DOB));
			Aadhar_data.Gender = aadharrows.Gender;
			Aadhar_data.Phone = aadharrows.Contact_No;
			Aadhar_data.EmailID = aadharrows.Email_ID;
			Aadhar_data.Address = aadharrows.House_Identifier + " " + aadharrows.Landmark+ " " + aadharrows.Locality + " " + aadharrows.Street_Name + " " + aadharrows.District + " " + aadharrows.Pincode;
			$m.juci.dataset("Aadharno", aadharrows.Aadhar_Number);
			$m.juci.dataset("Aadhar", Aadhar_data);
			$m.juci.dataset("aadhar_section", true);
}




function checkAadhar(event){
	var meeting_status = event.value.Description();
	if(meeting_status == "Met"){
		$m.juci.findById("aadhar-details").show();
	}else{
		$m.juci.findById("aadhar-details").hide();
	}
}

function fireRequestInput(action, data, callback){
		var url = Constants.publicIP+"/mowblyserver/slocationscript/rellife/prod/RlifeAssist";
         if ($m.networkConnected()) {
        	data = JSON.stringify(data);
            $m.post(url, {"action":action,"data":data}, function(callback) {
                return function(response) {
                    if (response.code == 200) {
                        var result = response.result;
                        result = JSON.parse(JSON.parse(result.data).data);
                        //$m.logInfo("Input management : "  + action + "  "+ JSON.stringify(result));
                        callback.call(this, result);
                    } else {
                        $m.alert(messages.ServerMessage,"Server Message",function(){
                        	$m.hideProgress();
            				$m.close();
                        });
                        var errMsg = response;
                        $m.logError(JSON.stringify(response));
                    }
                };
            }(callback));
        } else {
            $m.alert(messages.NoNetworkConnectivity,"Network Error",function(){
            	$m.hideProgress();
            	$m.close();
            });
        }
	}
	
function ChangeFormat(dateNew){
	dateNew = dateNew.split("-");
	currdate=dateNew[2]+"-"+dateNew[1]+"-"+dateNew[0];
	return currdate;
}

function saveForm(datasetData){
	$m.showProgress("Syncing data...");
	var callback = function(res) {
		if (res.Status == "Y") {
			var serverAlertCallback = function(){
				//$m.logInfo("Runner activity inserted successfully");
				var filterData = new DB.Filter.equal("Policy_Number", "'" + datasetData.Policy_Number + "'"); 
				var data = {
					"issync" : "1"
				}
				saveRunnerActivity.updateSync(data, filterData, function(){
					$m.hideProgress();
					setClose();
					$m.open("com.cloudpact.mowbly.home","/system/home.html");
				});
			};
			$m.alert("Record inserted successfully to server","Alert",serverAlertCallback);
		} else {
			$m.logError("Failed to insert Runner Activity response is" + ' ' + res.Status);
			$m.alert("Failed to insert Runner Activity response is" + ' ' + res.Status, "Failed to Insert", function() {
				utils.HideProgress();
				utils.ClosePage();
			});
		}
	};
//	fireRequestInput("SaveRunner", datasetData, callback);
	service.saveRunnerActivityDetails(callback,datasetData);
}