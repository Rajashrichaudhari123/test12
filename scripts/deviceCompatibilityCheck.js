$m.juci.addDataset("Aadharno","");
$m.juci.addDataset("fingerPrint","");
$m.juci.addDataset("aadhar_section", false);
$m.juci.addDataset("hasAuthenticated",false);
$m.juci.addDataset("aadharSection",true);
$m.juci.addDataset("Aadhar", "");
$m.juci.addDataset("displayDeviceData",false);
$m.juci.addDataset("otp","");
$m.juci.addDataset("deviceData","");
$m.juci.addDataset("device_section",false);
$m.juci.addDataset("isSumitOrEmail",false);
$m.juci.addDataset("alternateMobileNumber","");
$m.juci.addDataset("alternateNumber",false);
$m.juci.addDataset("emailVisible",false);
$m.juci.addDataset("email","");
var deviceInfoDataset = {};
$m.juci.addDataset("panCardNo","");
$m.juci.addDataset("panCardData",{"DOB":"","mobileNumber":"","address":"","emailID":""});
$m.juci.addDataset("isPancard",false);


var x2js = new X2JS();

/** Check the aadhar number is valid or not and open dialog box if the aadhar is valid**/
function openauthentication() {
	var aadhar = $m.juci.dataset("Aadharno");
	if(!aadhar) {
		var panCard = $m.juci.dataset("panCardNo");
		$m.juci.dataset("isPancard",true);
	}
	$m.juci.dataset("aadharno", aadhar);
//	if (aadhar) {
//		if(aadhar.length < 12){
//			$m.alert("Please enter valid Aadhaar number");
//			return;
//	}
		utils.ShowDialog('authentication');
//	} else {
//		$m.alert("Please enter Aadhar number");
//	}
}

/** Open the otp pop-up when user has chosen as otp in aadhar**/
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

/** Open the biometric if user has chosen the biometric for aadhar**/
function openBiometric(){
	var aadharNo = $m.juci.dataset("Aadharno");
	var ValidateBiometricCallback = function(res) {
		callBiometricService(res);
		//$m.alert(res);
	};
	var fingerPrintCallback = function(res) {
		if(res.code == 1){
			var finalData = x2js.xml_str2json(res.result.PID_DATA);
			utils.PutPref("FingerprintData",finalData);
			var morphoInfo = utils.GetPref("MorphoDeviceInfo");
			utils.ShowProgress("Fetching Aadhaar Data..");
			AadharServices.ValidateBiometric(morphoInfo,finalData,ValidateBiometricCallback);
		} else {
			$m.alert(res.result);
			$m.logError("finger print callback failed due to : "+res);
		}	
	};
	var getMorphoDeviceCallback = function(res) {
		if(res.code == 1){
			utils.HideProgress();
			var finalRes = x2js.xml_str2json(res.result.DeviceInfo);
			utils.PutPref("MorphoDeviceInfo",finalRes);
			$m.initFingerCaptureInput(fingerPrintCallback);
		} else {
			utils.HideProgress();
			$m.alert(res.result);
			$m.logError("morpho device callback failed due to : "+res);
		}
	};
	var registerMorphoCallback = function () {
		utils.HideProgress();
		utils.ShowProgress("Capturing device data..");
		$m.getMorphoDeviceInfo(getMorphoDeviceCallback);
	};
	AadharServices.RegisterMorphoDevice(aadharNo,registerMorphoCallback);
}

/** Call the biometric services*/
function callBiometricService(res) {
	utils.ShowProgress("Fetching Aadhaar Details...");
	var pidData = res;
	var resultform = $m.juci.dataset("newResultForm");
	if(res){
		//var aadhaarCallback = function(response) {
			var resultData = res.data;
			var result = x2js.xml_str2json(resultData);
			console.log(result);
			var Adhar_data = result.Envelope.Body.Production_EkycThroughBiometricForRegisteredDeviceResponse.Production_EkycThroughBiometricForRegisteredDeviceResult.KeyValueOfstringstring;
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
					$m.alert("Since Aadhaar with DoB as 01/01/"+aadharDate.getFullYear()+ "is a non-standard age proof, eKYC document will not be stored","Alert",function(){
						openLifePlannerPage(datasetData);
					});
				}
				var aadharData = assignAadhardata(aadharObject, resultData,"Biometric");
				utils.HideDialog("dialog-fingerprint");
				setAadhaarValues(aadharData);
				$m.hideProgress();
			} else {
				$m.hideProgress();
				$m.alert("Your Aadhar No is Invalid");
				return;
			}
		//}
		//AadharServices.ValidateBiometric(pidData, aadhaarCallback);
	}
	else{
		$m.alert("Please do biometric authentication");
		return;
	}
}

/** Assign the aadhar details on the local table**/
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
			$m.juci.dataset("displayDeviceData",true);
			$m.juci.dataset("device_section",false);
			$m.juci.dataset("isSumitOrEmail",false);
			$m.juci.dataset("alternateNumber",true);
}

/** Assign the aadhar details to an object**/
function assignAadhardata(objects, ekyc,authenticateBy) {
	console.log(objects);
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
		//aadharObj.Lead_ID = Lead_Id;
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

/** Formating the date **/
function ChangeFormatofDate(date) {
	var date1 = date;
	date1 = date1.split("-");
	currdate = date1[1] + "/" + date1[0] + "/" + date1[2];
	return currdate;
}

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

/** Send the otp when user has chosen as otp in aadhar**/
function sendOtp(event) {
	var aadharObject = {};
	var resultform = $m.juci.dataset("newResultForm");
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
				$m.alert("Since Aadhaar with DoB as 01/01/"+aadharDate.getFullYear()+ " is a non-standard age proof","Alert");
			}
			var aadharData = assignAadhardata(aadharObject, aadhar_result,"OTP");
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

function displayDeviceData() {
	$m.juci.dataset("device_section",true);
	var deviceInfoObject = utils.GetPref("DeviceInfomation");
	var callback = function(resp) {
		if(resp.code == 0) {
			deviceInfoDataset.Android_Version = deviceInfoObject.Android_Version;
			deviceInfoDataset.Selfie_Camera = deviceInfoObject.Selfie_Camera;
			deviceInfoDataset.cpuDetails = deviceInfoObject.CPU_Details;
			deviceInfoDataset.serviceprovider = deviceInfoObject.getActiveDataSimOperator;
			deviceInfoDataset.RAM = deviceInfoObject.RAM;
			deviceInfoDataset.Free_Space = deviceInfoObject.Free_Space;
			deviceInfoDataset.Device_ID = deviceInfoObject.Device_ID;
			deviceInfoDataset.lat = deviceInfoObject.Latitude;
			deviceInfoDataset.long = deviceInfoObject.Longitude;
			deviceInfoDataset.deviceModel = deviceInfoObject.Device_Model;
			deviceInfoDataset.modelNumber = deviceInfoObject.Model_Number;
			deviceInfoDataset.sapCode = deviceInfoObject.SAPCode;
			deviceInfoDataset.versionName = resp.result.androidVersionName + '-' + resp.result.androidVersionNumber;
			if(deviceInfoObject.OTG_Option == true) {
				deviceInfoDataset.getotgInfo = "Y";
			} else {
				deviceInfoDataset.getotgInfo = "N";
			}
			if(deviceInfoObject.GPS_Option == true) {
				deviceInfoDataset.getGpsInfo = "Y";	
			} else {
				deviceInfoDataset.getGpsInfo = "N";
			}
			
			$m.juci.dataset("deviceData", deviceInfoDataset);
			$m.juci.dataset("isSumitOrEmail",true);
			checkDeviceSpecification(deviceInfoDataset,deviceInfoObject);
		}	
	};
	$m.getMemStat(callback);
}

function checkDeviceSpecification(deviceInfoDataset,deviceInfoObject) {
	if(deviceInfoObject.GPS_Option == true) {
		$m.juci.findById("get-gps").el.src = "images/tick-right.png";
	} else {
		$m.juci.findById("get-gps").el.src = "images/tick-wrong.png";
	}
	
	if(deviceInfoObject.OTG_Option == true) {
		$m.juci.findById("otg").el.src = "images/tick-right.png";
	} else {
		$m.juci.findById("otg").el.src = "images/tick-wrong.png";
	}
	
	if(deviceInfoDataset.Selfie_Camera != "Y") {
		$m.juci.findById("selfie").el.src = "images/tick-wrong.png";
	} else {
		$m.juci.findById("selfie").el.src = "images/tick-right.png";
	}
	
	if(deviceInfoDataset.Android_Version < "5.0") {
		$m.juci.findById("android-version").el.src = "images/tick-wrong.png";
	} else {
		$m.juci.findById("android-version").el.src = "images/tick-right.png";
	}
	
	if(deviceInfoDataset.RAM.search("G") != -1) {
		var parseRam = parseInt(deviceInfoDataset.RAM) * 1024;	
		if(parseRam < 1024) {
			$m.juci.findById("ram").el.src = "images/tick-wrong.png";	
		} else {
			$m.juci.findById("ram").el.src = "images/tick-right.png";
		}
	} else {
		$m.juci.findById("ram").el.src = "images/tick-wrong.png";	
	}
	
	if(deviceInfoDataset.Free_Space.search("G") != -1) {
		var parseFreeSpace = parseInt(deviceInfoDataset.Free_Space) * 1024;
		if(parseFreeSpace < 1024) {
			$m.juci.findById("free-space").el.src = "images/tick-wrong.png";
		} else {
			$m.juci.findById("free-space").el.src = "images/tick-right.png";
		}
	} else {
		$m.juci.findById("free-space").el.src = "images/tick-wrong.png";
	}
}

function onSaveDeviceCompatibilityInfo() {
	var requestData = {};
	var AadhaarData = utils.GetPref("AadhaarData");
	var deviceData = utils.GetPref("DeviceInfomation");
	var otgOption;
	var gpsOption;
	if(deviceData.OTG_Option == true) {
		otgOption = "Y";
	} else {
		otgOption = "N";
	}
	
	if(deviceData.GPS_Option == true ){
		gpsOption = "Y";
	} else {
		gpsOption = "N";
	}
	
	requestData.Aadhar_Number = AadhaarData.Aadhar_Number;
	requestData.Added_By = $m.getUsername();
	requestData.Authenticate_By = AadhaarData.Authenticate_By;
	requestData.Android_Version = deviceData.Android_Version;
	requestData.CPU_Details = deviceData.CPU_Details;
	requestData.Care_Of_Person = AadhaarData.Care_Of_Person;
	requestData.City = AadhaarData.City;
	requestData.Connectivity_3G4G = "";
	requestData.Contact_No = AadhaarData.Contact_No;
	requestData.Customer_Name = AadhaarData.Customer_Name;
	requestData.Customer_Photo = AadhaarData.Customer_Photo;
	requestData.DOB = AadhaarData.DOB;
	requestData.Details_Approved = AadhaarData.Details_Approved;
	requestData.Device_ModelName = deviceData.Device_Model;
	requestData.Device_ModelNo = deviceData.Model_Number;
	requestData.Device_PN = AadhaarData.Device_PN;
	requestData.Device_SN = AadhaarData.Device_SN;
	requestData.District = AadhaarData.District;
	requestData.EKYC_XML = AadhaarData.EKYC_XML;
	requestData.Email_ID = AadhaarData.Email_ID;
	requestData.Entry_Stage = AadhaarData.Entry_Stage;
	requestData.Free_Space = deviceData.Free_Space;
	requestData.GPS_Option = gpsOption;
	requestData.Gender = AadhaarData.Gender;
	requestData.House_Identifier = AadhaarData.House_Identifier;
	requestData.Landmark = AadhaarData.Landmark;
	requestData.Locality = AadhaarData.Locality;
	requestData.Model_Number = deviceData.Model_Number;
	requestData.Network_Provider = "";
	requestData.OTG_Option = otgOption; 
	requestData.Pincode = parseInt(AadhaarData.Pincode);
	requestData.PostOffice_Name = AadhaarData.PostOffice_Name;
	requestData.RAM = deviceData.RAM;
	requestData.Record_status = "";
	requestData.SAPCode = $m.getUsername();
	requestData.Selfie_Camera = deviceData.Selfie_Camera;
	requestData.Source_From = AadhaarData.Source_From;
	requestData.State = AadhaarData.State;
	requestData.Street_Name = AadhaarData.Street_Name;
	requestData.Sub_District = AadhaarData.Sub_District;
	console.log(requestData);
	var alternateMobileNumber = $m.juci.dataset("alternateMobileNumber");
	requestData.AlternateNumber = alternateMobileNumber;
	
	
	if($m.networkConnected()){
		utils.ShowProgress("Saving device compatibility data..");
		var service = new ServiceLibrary();
		var deviceResponseCallback = function (r) {
			utils.HideProgress();
			if(r.Status == "Y") {
				$m.toast(r.Message);
			} else {
				$m.logError("save compatibility failed due to : "+ r);
			}
		};
		service.saveDeviceCompatibilityDetails(deviceResponseCallback,requestData);
	} else {
		$m.alert(messages.NoNetworkConnectivity);
  	}
}

function onEmailTrigger() {
	$m.juci.dataset("emailVisible",true);
}

function onSendEmail() {
	var validateEmail = $m.juci.dataset("email");
	if(validateEmail == "") {
		$m.alert("Enter Your Email Id");
		return;
	}
	$m.showProgress("Sending E-mail...");
	var adhaarData =  $m.juci.dataset("Aadhar"); //utils.GetPref("AadhaarData");
	var deviceData = utils.GetPref("DeviceInfomation"); 
	var emailId = $m.juci.dataset("email");
	var mailMessage = getMessageTemplate(adhaarData,deviceData);
	var emailSubject = " Device Compatibility Data - " + $m.getUsername();
	var url = Constants.publicIP + "/mowblyserver/smemailsender/rellife/prod/RlifeAssist";
	if($m.networkConnected()){
		$m.post(url, {
			"mailreceiver": emailId,
			"mailbody": mailMessage,
			"mailsubject": emailSubject
			}, function(response) {
				if (response.code == 200) {
					utils.HideProgress();
					var result = response.result;
					$m.toast("Email sent successfully");
				} else {
					utils.HideProgress();
					var errMsg = response.error.message;
					$m.logError("Email error - " + errMsg);
				}
		});
	} else {
		$m.alert(messages.NoNetworkConnectivity);
  	}
}

function getMessageTemplate(adhaarData,deviceData){
	var bodyTemplate = "<html><body>";
	bodyTemplate = bodyTemplate + "Hi, Please find the Device Compatibility Data, <br><br>";
	bodyTemplate = bodyTemplate + "Aadhaar Data : <br><br>";
	bodyTemplate = bodyTemplate + "Sap Code : "+ deviceData.SAPCode + "<br>";
	bodyTemplate = bodyTemplate + "Mobile Number : "+ deviceData.Model_Number + "<br>";
	bodyTemplate = bodyTemplate + "Name : " + adhaarData.Name + "<br>";
	bodyTemplate = bodyTemplate + "Date Of Birth : " + adhaarData.DateofBirth + "<br>";
	bodyTemplate = bodyTemplate + "Email : " + adhaarData.EmailID + "<br>";
	bodyTemplate = bodyTemplate + "Gender : " + adhaarData.Gender + "<br>";
	bodyTemplate = bodyTemplate + "Address : " + adhaarData.Address + "<br><br>";
	bodyTemplate = bodyTemplate + "Device Information Data : <br><br>";
	bodyTemplate = bodyTemplate + "Device_Model : " + deviceData.Device_Model + "<br>";
	bodyTemplate = bodyTemplate + "Android_Version : " + deviceData.Android_Version + "<br>";
	bodyTemplate = bodyTemplate + "Model_Number : " + deviceData.Model_Number + "<br>";
	bodyTemplate = bodyTemplate + "RAM : " + deviceData.RAM + "<br>";
	bodyTemplate = bodyTemplate + "CPU_Details : " + deviceData.CPU_Details + "<br>";
	bodyTemplate = bodyTemplate + "Selfie_Camera : " + deviceData.Selfie_Camera + "<br>";
	bodyTemplate = bodyTemplate + "Device_ID : " + deviceData.Device_ID + "<br>";
	bodyTemplate = bodyTemplate + "GPS_Option : " + deviceData.GPS_Option + "<br>";
	bodyTemplate = bodyTemplate + "Free_Space : " + deviceData.Free_Space + "<br>";
	bodyTemplate = bodyTemplate + "OTG_Option : " + deviceData.OTG_Option + "<br>";
	bodyTemplate = bodyTemplate + "</body></html>";
	
	return bodyTemplate;
}

function closeAuthenticate(id) {
	utils.HideDialog(id);
}

function closebox() {
	juci.hideDialog("dialog-otp");
	juci.getControl("otpNo").value(null);
}

$m.onClose(function(){
	$m.juci.dataset("aadhar_section",false);
	$m.juci.dataset("displayDeviceData",false);
	$m.juci.dataset("device_section",false);
	$m.juci.dataset("isSumitOrEmail",false);
	$m.juci.dataset("Aadharno","");
	$m.juci.dataset("alternateMobileNumber","");
	$m.juci.dataset("email","");
	$m.juci.dataset("alternateNumber",false);
});

function onClose(){
	$m.close();
}