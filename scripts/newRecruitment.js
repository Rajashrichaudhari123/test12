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
$m.juci.addDataset("panCardData",{"CustomerName":"","DOB":"","MobileNo":"","address":"","email":"","Address1":"","Address2":"","Address3":"","email":"","state":"","City":"","Pincode":""});
$m.juci.addDataset("saveDeviceData",{"AlternateNumber":"","Address1":"","Address2":"","Address3":"","email":"","state":"","City":"","Pincode":""});
$m.juci.addDataset("isPancard",false);
$m.juci.addDataset("aadharNumber",true);
$m.juci.addDataset("panNumber",true);
$m.juci.addDataset("commonOr",true);
$m.juci.addDataset("isconfirm",false);
$m.juci.addDataset("deviceDataVisible",false);
$m.juci.addDataset("addressEnable1",false);
$m.juci.addDataset("addressEnable2",false);
$m.juci.addDataset("addressEnable3",false);
$m.juci.addDataset("stateEnable1",true);
$m.juci.addDataset("cityEnable1",true);
$m.juci.addDataset("pinCodeEnable1",true);
$m.juci.addDataset("aadharNumberEnable",false);
$m.juci.addDataset("panNumberEnable",false);
$m.juci.addDataset("devciespeciphication",true);
$m.juci.addDataset("displayDeviceDataPan",false);
$m.juci.addDataset("device_section_pan",false);
$m.juci.dataset("isaadharPageAgain",false);
var confirm = 0;
var x2js = new X2JS(); 

$m.onReady(function(){
	$m.juci.addDataset("stateEnable1",true);
	$m.juci.addDataset("cityEnable1",true);
	$m.juci.addDataset("pinCodeEnable1",true);
	$m.juci.findById("confirm").hide();
	$m.juci.dataset("displayDeviceData",false);
	initReady();
});

$m.onResume(function(){
	$m.juci.dataset("commonOr",true);
	$m.juci.dataset("aadharNumber",true);
	$m.juci.dataset("panNumber",true);
	$m.juci.findById("authenticate").hide();
	$m.juci.dataset("deviceDataVisible",true);
	$m.juci.dataset("deviceDataVisible",false);
	$m.juci.dataset("aadhar_section",false);
		$m.juci.dataset("displayDeviceData",false);
	$m.juci.findById("authenticate").show();
	checkAadhaarEligibility();
	onResumePage();
});
function onResumePage(){
	 var isaadharPageAgain = $m.juci.dataset("isaadharPageAgain");
	confirm = 0;
	$m.juci.findById("confirm").hide();
	$m.juci.getControl("confirm-checkbox").value(null);
	$m.juci.getControl("checkAadhar").value(null);
	$m.juci.dataset("stateEnable1",true);
	$m.juci.dataset("cityEnable1",true);
	$m.juci.dataset("pinCodeEnable1",true);
	$m.juci.dataset("device_section_pan",false);
	$m.juci.dataset("deviceDataVisible",true);
	$m.juci.dataset("aadhar_section", false);
//	$m.juci.findById("authenticate").hide();
//	$m.juci.dataset("displayDeviceData",true);
	
	$m.juci.dataset("panCardData",{"CustomerName":"","DOB":"","MobileNo":"","address":"","EmailID":"","Address1":"","Address2":"","Address3":"","email":"","state":"","City":"","Pincode":""});
	$m.juci.dataset("saveDeviceData",{"AlternateNumber":"","Address1":"","Address2":"","Address3":"","email":"","state":"","City":"","Pincode":""});
/*	var aadhar = $m.juci.dataset("Aadharno");
	if(!aadhar) {
		var panCardNumber = $m.juci.dataset("panCardNo");
		validatePanNumber(panCardNumber);
		$m.juci.dataset("panNumber",true);
		$m.juci.dataset("aadharNumber",false);
		$m.juci.addDataset("aadharNumberEnable",false);
		$m.juci.addDataset("panNumberEnable",true);
		$m.juci.dataset("commonOr",false);
		$m.juci.dataset("displayDeviceDataPan",true);
		$m.juci.findById("authenticate").hide();
		$m.juci.findById("validate-device-pan").show();
	} 
	else{
			$m.juci.findById("authenticate").show();
			$m.juci.findById("validate-device-pan").hide();
	}*/
	if(isaadharPageAgain == true)
	{
		var oldAadharData=	$m.getPref("oldAadharData");
		$m.juci.dataset("saveDeviceData",oldAadharData[0]);
		$m.juci.dataset("Aadharno",oldAadharData[1]);
		$m.juci.findById("authenticate").hide();
		$m.juci.dataset("deviceDataVisible",true);
		$m.juci.dataset("aadhar_section", true);
		$m.juci.findById("authenticate").hide();
		$m.juci.dataset("displayDeviceData",true);
		$m.juci.dataset("device_section",false);
		$m.juci.dataset("isSumitOrEmail",true);
		$m.juci.dataset("alternateNumber",true);
	}
	
		$m.juci.findById("authenticate").hide();
	$m.juci.dataset("deviceDataVisible",true);
	$m.juci.dataset("deviceDataVisible",false);
	$m.juci.dataset("aadhar_section",false);
	$m.juci.dataset("displayDeviceData",false);
	$m.juci.dataset("isSumitOrEmail",false);
}

$m.onData(function(eventObject){
	var data = eventObject.data;
	$m.juci.findById("authenticate").show();
	$m.juci.dataset("deviceDataVisible",false);
	$m.juci.dataset("displayDeviceDataPan",false);
});

/** Setting the header name on page load**/
function initReady(){
	$m.juci.dataset("headerName","New Recruitment");
	var dbcallback = function(dbhelper) {
		dbHelper = dbhelper;
	};
	utils.GetDbhelper(dbcallback);
} 

/** Check the aadhar number is valid or not and open dialog box if the aadhar is valid**/
function openauthentication() {
	var aadhar = $m.juci.dataset("Aadharno");
	if(!aadhar) {
		var panCardNumber = $m.juci.dataset("panCardNo");
		validatePanNumber(panCardNumber);
		$m.juci.dataset("panNumber",true);
		$m.juci.dataset("aadharNumber",false);
		$m.juci.addDataset("aadharNumberEnable",false);
		$m.juci.addDataset("panNumberEnable",true);
		$m.juci.dataset("commonOr",false);
		$m.juci.dataset("displayDeviceDataPan",true);
	} else {
		$m.juci.dataset("aadharno", aadhar);
		$m.juci.dataset("panNumber",false);
		$m.juci.addDataset("panNumberEnable",false);
		$m.juci.addDataset("aadharNumberEnable",true);
		$m.juci.dataset("aadharNumber",true);
		$m.juci.dataset("commonOr",false);
		utils.ShowDialog('authentication');
		$m.juci.dataset("isaadharPageAgain",true);
	}
}


function checkAadhaarEligibility() {
	var getUserAccountDetails = utils.GetUserAccount();
	var login_code = getUserAccountDetails.Login_Code;
	if(getUserAccountDetails.Login_Code_Email_ID) {
		$m.juci.dataset("aadharNumber",true);
		$m.juci.dataset("panNumber",false);
		$m.juci.dataset("commonOr",false);
		$m.juci.dataset("panNumberEnable",false);
		$m.juci.addDataset("aadharNumberEnable",true);
		$m.juci.dataset("Aadharno",getUserAccountDetails.Login_Code_Email_ID);
	} else {
		$m.juci.dataset("aadharNumber",false);
		$m.juci.dataset("panNumberEnable",true);
		$m.juci.addDataset("aadharNumberEnable",false);
		$m.juci.dataset("panNumber",true);
		$m.juci.dataset("commonOr",false);
		$m.juci.dataset("panCardNo",login_code);
	}
}

function validatePanNumber(panNumber) {
	var validatePanCallback = function (res){
		var result = x2js.xml_str2json(res.data);
		var panCardData = $m.juci.dataset("panCardData");
		utils.HideProgress();
		var validateResult = result.Envelope.Body.validatePANResponse.Response;
		if(validateResult.errorMessage != "SUCCESS") {
			$m.alert("Your pannumber not validated..");
		} else {
		//	$m.juci.dataset("isPancard",true);	
			$m.juci.findById("authenticate").hide();
			panCardData.CustomerName = (validateResult.firstName) ? validateResult.firstName : (validateResult.lastName) ? validateResult.lastName : validateResult.middleName;
		}
		$m.juci.dataset("panCardData",panCardData);
	};
	utils.ShowProgress("Validating Pan..");
	validatePan.ValidatePanNumber(panNumber, validatePanCallback);
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
	    console.log(aadharrows);
		var Aadhar_data = {};
		var address_data = {};
		    Aadhar_data.Name = aadharrows.Customer_Name;
			Aadhar_data.DateofBirth = utils.GetDate(utils.GetDateByTimeStamp(aadharrows.DOB));
			Aadhar_data.Gender = aadharrows.Gender;
			Aadhar_data.Phone = aadharrows.Contact_No;
			Aadhar_data.EmailID = aadharrows.Email_ID;
			if (aadharrows.House_Identifier || aadharrows.Locality) {
				Aadhar_data.Address1 = aadharrows.House_Identifier + " " + aadharrows.Locality;
				var ad1 = aadharrows.House_Identifier + " " + aadharrows.Locality;
				var ad1length = ad1.length;
				var address1 = "";
				if (Aadhar_data.Address1.length > 30) {
					Aadhar_data.Address1 = Aadhar_data.Address1.slice(0, 30);
					address1 = ad1.slice(30, ad1length);
				}
				Aadhar_data.Address1 = Aadhar_data.Address1.trim();
			}
			if (aadharrows.Street_Name || aadharrows.District || aadharrows.Sub_District) {
				var ad2 = address1 + "" + aadharrows.Street_Name + " " + aadharrows.District + " " + aadharrows.Sub_District;
				var ad2length = ad2.length;

				Aadhar_data.Address2 = address1 + "" + aadharrows.Street_Name + " " + aadharrows.District + " " + aadharrows.Sub_District;
				var AddressLine2;
				if (Aadhar_data.Address2.length > 30) {
					Aadhar_data.Address2 = Aadhar_data.Address2.slice(0, 30);
				    AddressLine2 = ad2.slice(30, ad2length);
				}
				Aadhar_data.Address2 = Aadhar_data.Address2.trim();
			}
			if (aadharrows.Landmark) {
				Aadhar_data.Address3 = aadharrows.Landmark;
				if (Aadhar_data.Address3.length > 30) {
					Aadhar_data.Address3 = Aadhar_data.Address3.slice(0, 30);
				}
				Aadhar_data.Address3 = Aadhar_data.Address3.trim();
			}
			if (!Aadhar_data.Address3 && aadharrows.Sub_District) {
				Aadhar_data.Address3 = aadharrows.Sub_District;
			}
			if (!Aadhar_data.Address2 && aadharrows.Locality) {
				Aadhar_data.Address2 = aadharrows.Locality;
			}
			if (!Aadhar_data.Address1 && aadharrows.Sub_District) {
				Aadhar_data.Address1 = aadharrows.Sub_District;
			}
			if ((!Aadhar_data.Address1) && (!Aadhar_data.Address2) && (aadharrows.Landmark)) {
				Aadhar_data.Address2 = aadharrows.Landmark;
				Aadhar_data.Address1 = aadharrows.Landmark;
			}
			if ((!Aadhar_data.Address2) && (!Aadhar_data.Address3) && (aadharrows.Locality)) {
				Aadhar_data.Address2 = aadharrows.Locality;
				Aadhar_data.Address3 = aadharrows.Locality;
			}
			if ((!Aadhar_data.Address1) && (!Aadhar_data.Address3) && (aadharrows.Sub_District)) {
				Aadhar_data.Address1 = aadharrows.Sub_District;
				Aadhar_data.Address3 = aadharrows.District;
			}
			var AddressLine1 = addressCheck(Aadhar_data.Address1);
			var AddressLine2 = addressCheck(Aadhar_data.Address2);
			var AddressLine3 = Aadhar_data.Address3 == ""? "" :addressCheck(Aadhar_data.Address3);
			Aadhar_data.Address1 = AddressLine1;
			Aadhar_data.Address2 = AddressLine2;
			Aadhar_data.Address3 = AddressLine3;
			Aadhar_data.Address = aadharrows.House_Identifier + " " + aadharrows.Landmark+ " " + aadharrows.Locality + " " + aadharrows.Street_Name + " " + aadharrows.District + " " + aadharrows.Pincode;
			if (!Aadhar_data.Address1) {
				$m.juci.dataset("addressEnable1",false);
			}else{
				$m.juci.dataset("addressEnable1",true);
			}
			if (!Aadhar_data.Address2) {
				$m.juci.dataset("addressEnable2",false);
			}else{
				$m.juci.dataset("addressEnable2",true);
			}
			if (!Aadhar_data.Address3) {
				$m.juci.dataset("addressEnable3",false);
			}else{
				$m.juci.dataset("addressEnable3",true);	
			}
			
			$m.juci.dataset("Aadharno", aadharrows.Aadhar_Number);
			$m.juci.dataset("Aadhar", Aadhar_data);
			address_data.Address1 = Aadhar_data.Address1;
			address_data.Address2 = Aadhar_data.Address2;
			address_data.Address3 = Aadhar_data.Address3;
			address_data.state = aadharrows.State;
			address_data.City = aadharrows.City;
			address_data.Pincode = aadharrows.Pincode;
			address_data.Address1 = getFieldsWithoutSpecialChar(address_data.Address1);
			address_data.Address2 = getFieldsWithoutSpecialChar(address_data.Address2);
			address_data.Address3 = getFieldsWithoutSpecialChar(address_data.Address3);
			address_data.state = getFieldsWithoutSpecialChar(address_data.state);
			address_data.City = getFieldsWithoutSpecialChar(address_data.City);
			address_data.Pincode = getFieldsWithoutSpecialChar(address_data.Pincode);
			$m.juci.dataset("saveDeviceData", address_data);
			$m.putPref("oldAadharData", [address_data,aadharrows.Aadhar_Number]);
			$m.savePref();
			$m.juci.dataset("aadhar_section", true);
			$m.juci.findById("authenticate").hide();
			$m.juci.dataset("displayDeviceData",true);
			$m.juci.dataset("device_section",false);
			$m.juci.dataset("isSumitOrEmail",false);
			$m.juci.dataset("alternateNumber",true);
}

function getFieldsWithoutSpecialChar(addressString){
	var format = /[~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
	if(format.test(addressString)){
		var arr = addressString.split(format);
		var add ="";
		for(var i= 0;i< arr.length;i++){
	  		add = add+" "+arr[i];
		}
		addressString = add.trim();
	}
			return addressString;
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
				$m.alert("Since Aadhaar with DoB as 01/01/"+aadharDate.getFullYear()+ " is a non-standard age proof, eKYC document will not be stored","Alert",function(){
					openLifePlannerPage(datasetData);
				});
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

function displayDeviceDataPan() {
	$m.juci.dataset("device_section_pan",true);
	$m.juci.dataset("isPancard",true);
//	$m.juci.dataset("emailVisible",true);
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

function displayDeviceData() {
	$m.juci.dataset("device_section",true);
	$m.juci.dataset("deviceDataVisible",true);
	$m.juci.dataset("emailVisible",true);
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
		$m.juci.dataset("devciespeciphication",false);
	}
	
	if(deviceInfoObject.OTG_Option == true) {
		$m.juci.findById("otg").el.src = "images/tick-right.png";
	} else {
		$m.juci.findById("otg").el.src = "images/tick-wrong.png";
		$m.juci.dataset("devciespeciphication",false);
	}
	
	if(deviceInfoDataset.Selfie_Camera != "Y") {
		$m.juci.findById("selfie").el.src = "images/tick-wrong.png";
		$m.juci.dataset("devciespeciphication",false);
	} else {
		$m.juci.findById("selfie").el.src = "images/tick-right.png";
	}
	
	if(deviceInfoDataset.Android_Version < "5.0") {
		$m.juci.findById("android-version").el.src = "images/tick-wrong.png";
		$m.juci.dataset("devciespeciphication",false);
	} else {
		$m.juci.findById("android-version").el.src = "images/tick-right.png";
	}
	
	if(deviceInfoDataset.RAM.search("G") != -1) {
		var parseRam = parseInt(deviceInfoDataset.RAM) * 1024;	
		if(parseRam < 1024) {
			$m.juci.findById("ram").el.src = "images/tick-wrong.png";
			$m.juci.dataset("devciespeciphication",false);
		} else {
			$m.juci.findById("ram").el.src = "images/tick-right.png";
		}
	} else {
		$m.juci.findById("ram").el.src = "images/tick-wrong.png";
		$m.juci.dataset("devciespeciphication",false);
	}
	
	if(deviceInfoDataset.Free_Space.search("G") != -1) {
		var parseFreeSpace = parseInt(deviceInfoDataset.Free_Space) * 1024;
		if(parseFreeSpace < 1024) {
			$m.juci.findById("free-space").el.src = "images/tick-wrong.png";
			$m.juci.dataset("devciespeciphication",false);
	
		} else {
			$m.juci.findById("free-space").el.src = "images/tick-right.png";
		}
	} else {
		$m.juci.findById("free-space").el.src = "images/tick-wrong.png";
		$m.juci.dataset("devciespeciphication",false);
	}
}

function onSaveDeviceCompatibilityInfo(event) {
	var isSamePersonBYBM = 0;
	var AadhaarData = utils.GetPref("AadhaarData");
	if(($m.getUsername()!= AadhaarData.Customer_Name)){
		$m.juci.findById("confirm").show();
		isSamePersonBYBM++;
		if($m.juci.getControl("confirm-checkbox").value()==false){
			if(confirm >= 1){
				$m.alert("Please select the  declaration");
			}
			confirm++;
			return;
		}

	}
		var requestData = {};
		var datasetcustomerData = $m.juci.dataset("saveDeviceData");
		$m.juci.dataset("addressEnable",true);
		var deviceData = utils.GetPref("DeviceInfomation");
		var aadhar_address_data = $m.juci.dataset("Aadhar");
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
		if(	$m.juci.dataset("devciespeciphication")){
			requestData.Compatibility_Flag = "Y";
		}
		else{
			requestData.Compatibility_Flag = "N";
		}
		requestData.Aadhar_Number = AadhaarData.Aadhar_Number;
		requestData.Added_By = $m.getUsername();
		requestData.Authenticate_By = AadhaarData.Authenticate_By;
		requestData.Android_Version = deviceData.Android_Version;
		requestData.CPU_Details = deviceData.CPU_Details;
		requestData.Care_Of_Person = AadhaarData.Care_Of_Person;
	//	requestData.City = AadhaarData.City;
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
		requestData.Device_Date = "";
		requestData.District = AadhaarData.District;
		requestData.EKYC_XML = AadhaarData.EKYC_XML;
		requestData.Email_ID = datasetcustomerData.email;
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
	//	requestData.Pincode = parseInt(AadhaarData.Pincode);
		requestData.PostOffice_Name = AadhaarData.PostOffice_Name;
		requestData.RAM = deviceData.RAM;
		requestData.Record_status = "";
		requestData.SAPCode = $m.getUsername();
		requestData.Selfie_Camera = deviceData.Selfie_Camera;
		requestData.Source_From = AadhaarData.Source_From;
		requestData.State = AadhaarData.State;
		requestData.Street_Name = AadhaarData.Street_Name;
		requestData.Sub_District = AadhaarData.Sub_District;
		requestData.CaseID = $m.getUsername();
		//var alternateMobileNumber = $m.juci.dataset("alternateMobileNumber");
		requestData.Address1 = datasetcustomerData.Address1;
		requestData.Address2 = datasetcustomerData.Address2;
		requestData.Address3 = datasetcustomerData.Address3;
		requestData.state = datasetcustomerData.state;
		requestData.Pincode = parseInt(datasetcustomerData.Pincode);
		//requestData.PinCode = parseInt(datasetcustomerData.Pincode);
		requestData.City = datasetcustomerData.City;
	//	requestData.state = datasetcustomerData.state;
		requestData.AlternateNumber = datasetcustomerData.AlternateNumber;
		console.log("SaveDeviceCompatiblityInfo="+JSON.stringify(requestData));
		
		
		var ekycRequestData = {};
		ekycRequestData.Added_By = $m.getUsername();
	//	ekycRequestData.State = AadhaarData.State;
		ekycRequestData.Street = AadhaarData.Street_Name;
		ekycRequestData.Subdistrict = AadhaarData.Sub_District;
		ekycRequestData.CareOfPerson = AadhaarData.Care_Of_Person;
		ekycRequestData.Added_Date = new Date().getTime();
	//	ekycRequestData.City = AadhaarData.City;
	//	ekycRequestData.PinCode = parseInt(AadhaarData.Pincode);
		ekycRequestData.PostOfficeName = AadhaarData.PostOffice_Name;
		ekycRequestData.Photo = AadhaarData.Customer_Photo;
		ekycRequestData.Landmark = AadhaarData.Landmark;
		ekycRequestData.Locality = AadhaarData.Locality;
		ekycRequestData.Gender = AadhaarData.Gender;
		ekycRequestData.House = AadhaarData.House_Identifier;
		ekycRequestData.District = AadhaarData.District;
		ekycRequestData.AadharNo = AadhaarData.Aadhar_Number;
		ekycRequestData.CustomerName = AadhaarData.Customer_Name;
		ekycRequestData.Casenumber = "";
		ekycRequestData.AadharPrint = "";
		ekycRequestData.Country = "";
		ekycRequestData.DBStatus = "";
		ekycRequestData.EmailID = datasetcustomerData.email;
		ekycRequestData.MobileNo = "";
		ekycRequestData.DOB = AadhaarData.email;
		ekycRequestData.Condional_Operator = "EkycAuthentication";
		ekycRequestData.Candidate_Name = AadhaarData.Customer_Name;
		ekycRequestData.Aadhar_City = AadhaarData.City;
		ekycRequestData.Aadhar_State = AadhaarData.State;
		ekycRequestData.Aadhar_PinCode = parseInt(AadhaarData.Pincode);
		ekycRequestData.isEKYCAddress_same = "";
		ekycRequestData.Candidate_Name = "";
		ekycRequestData.authenticationMode = "";
		ekycRequestData.Record_status = "";
		ekycRequestData.Network_Provider = "";
		ekycRequestData.CPU_Details = deviceData.CPU_Details;
		ekycRequestData.Latitude = "";
		ekycRequestData.Longitude = "";
		ekycRequestData.Device_ModelName = deviceData.Device_Model;
		ekycRequestData.Device_ModelNo = deviceData.Model_Number;
		ekycRequestData.Device_PN = AadhaarData.Device_PN;
		ekycRequestData.Device_SN = AadhaarData.Device_SN;
		ekycRequestData.Free_Space = deviceData.Free_Space;
		ekycRequestData.Device_Date = "";
		ekycRequestData.Selfie_Camera = deviceData.Selfie_Camera;
		ekycRequestData.OTG_Option = otgOption;
		ekycRequestData.GPS_Option = gpsOption;
		ekycRequestData.RAM = deviceData.RAM;
		ekycRequestData.Connectivity_3G4G = "";
		ekycRequestData.Model_Number = "";
		ekycRequestData.Address_1 = datasetcustomerData.Address1;
		ekycRequestData.Address_2 = datasetcustomerData.Address2;
		ekycRequestData.Address_3 = datasetcustomerData.Address3;
		ekycRequestData.State = datasetcustomerData.state;
		ekycRequestData.PinCode = parseInt(datasetcustomerData.Pincode);
		ekycRequestData.City = datasetcustomerData.City;
		ekycRequestData.Android_Version = deviceData.Android_Version;
		ekycRequestData.DOB = AadhaarData.DOB;
		ekycRequestData.LandlineNo = "";
			if(isSamePersonBYBM != 0){
			ekycRequestData.IsSamePersonBYBM = "Y";
		}
		else{
				ekycRequestData.IsSamePersonBYBM = "R";
		}
		
		var panNumber = $m.juci.dataset("panCardNo");
		ekycRequestData.Pan_Number = utils.GetLoginCode();
		if(	$m.juci.dataset("devciespeciphication")){
			ekycRequestData.Compatibility_Flag = "Y";
		}
		else{
				ekycRequestData.Compatibility_Flag = "N";
		}
		console.log("Candidate_EKYC_Insert_Data"+JSON.stringify(ekycRequestData));
		
		
		
		if($m.networkConnected()){
			utils.ShowProgress("Saving device compatibility data..");
			var service = new ServiceLibrary();
			var deviceResponseCallback = function (r) {
				utils.HideProgress();
				if(r.Status == "Y") {
					$m.toast(r.Message);
					//$m.close();
					var saveCandidateEKYCCallback = function (r) {
					utils.HideProgress();
					if(r.Status == "Y") {
						$m.toast(r.Message);
						$m.close();
					} else {
						$m.alert("save compatibility failed due to : "+ JSON.stringify(r));
						$m.logError("save compatibility failed due to : "+ JSON.stringify(r));
					}
				};
				service.saveCandidateEKYCData(saveCandidateEKYCCallback, ekycRequestData);
				} else {
					$m.alert("save compatibility failed due to : "+ JSON.stringify(r));
					$m.logError("save compatibility failed due to : "+JSON.stringify(r));
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
	var validateEmail;
		var aadhar = $m.juci.dataset("Aadharno");
	if(!aadhar) {
		validateEmail =$m.juci.dataset("panCardData");
	}
	else{
	 	validateEmail = $m.juci.dataset("saveDeviceData");
	}
	if(validateEmail.email == "") {
		$m.alert("Enter Your Email Id");
		return;
	}
	$m.showProgress("Sending E-mail...");
	var adhaarData =  $m.juci.dataset("Aadhar"); //utils.GetPref("AadhaarData");
	var deviceData = utils.GetPref("DeviceInfomation"); 
	var emailId = validateEmail.email;
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
//	bodyTemplate = bodyTemplate + "Mobile Number : "+ deviceData.Model_Number + "<br>";
	bodyTemplate = bodyTemplate + "Name : " + adhaarData.Name + "<br>";
	bodyTemplate = bodyTemplate + "Date Of Birth : " + adhaarData.DateofBirth + "<br>";
//	bodyTemplate = bodyTemplate + "Email : " + adhaarData.EmailID + "<br>";
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
	$m.juci.dataset("isPancard",false);
	$m.juci.dataset("panCardNo","");
	$m.juci.dataset("deviceDataVisible",false);
		var aadhar = $m.juci.dataset("Aadharno");
	if(aadhar) {
		$m.removePref("oldAadharData");
	}
	
});

function onClose(){
	$m.close();
}

function SavePANDetails(event){
	var datasetData = $m.juci.dataset("panCardData");
	var deviceData = utils.GetPref("DeviceInfomation");
	datasetData.DOB = datasetData.DOB instanceof Date ? datasetData.DOB.getTime() : new Date(datasetData.DOB).getTime();
	var dob = datasetData.DOB;
	datasetData.AadharNo = "";
	datasetData.AadharPrint = "";
	datasetData.Added_By = $m.getUsername();
	datasetData.Added_Date = new Date().getTime();
	datasetData.CareOfPerson = "";
	datasetData.Casenumber = "";
	datasetData.City = datasetData.City;
	datasetData.Country = "";
	datasetData.DBStatus = "";
	datasetData.District = "";
	datasetData.Gender = "";
	datasetData.House = "";
	datasetData.Landmark = "";
	datasetData.Locality = "";
	datasetData.Photo = "";
	datasetData.PinCode = parseInt(datasetData.Pincode);
	datasetData.PostOfficeName = "";
	datasetData.ReferenceNo = "";
	datasetData.State = datasetData.state;
	datasetData.Street = "";
	datasetData.Subdistrict = "";
	datasetData.Condional_Operator = "PanAuthentication";
	datasetData.Candidate_Name =event.data.CustomerName;
	datasetData.Aadhar_City = "";
	datasetData.Aadhar_State = "";
	datasetData.Aadhar_PinCode = null ;
	datasetData.isEKYCAddress_same = "";
	datasetData.Candidate_Name = "";
	datasetData.authenticationMode = "";
	datasetData.Record_status = "";
	datasetData.Network_Provider = "";
	datasetData.CPU_Details = deviceData.CPU_Details;
	datasetData.Latitude = "";
	datasetData.Longitude = "";
	datasetData.Device_ModelName = deviceData.Device_Model;
	datasetData.Device_ModelNo = deviceData.Model_Number;
	datasetData.Device_PN = "";
	datasetData.Device_SN = "";
	datasetData.Free_Space = deviceData.Free_Space;
	datasetData.Device_Date = "";
	datasetData.Selfie_Camera = deviceData.Selfie_Camera;
	datasetData.OTG_Option = otgOption;
	datasetData.GPS_Option = gpsOption;
	datasetData.RAM = "";
	datasetData.Connectivity_3G4G = "";
	datasetData.Model_Number = "";
	datasetData.Address_1 = datasetData.Address1;
	datasetData.Address_2 = datasetData.Address2;
	datasetData.Address_3 = datasetData.Address3;
	var panNumber = $m.juci.dataset("panCardNo");
	datasetData.Pan_Number = panNumber;
	datasetData.Android_Version = deviceData.Android_Version;
	datasetData.DOB = dob;
	datasetData.LandlineNo = "";
	delete datasetData.address;
	console.log(JSON.stringify(datasetData));
	var requestData = {};
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
	var panNumber = $m.juci.dataset("panCardNo");
	requestData.PANNumber = panNumber;
	requestData.Aadhar_Number = "";
	requestData.Authenticate_By = "";
	requestData.Care_Of_Person = "";
	requestData.Contact_No = "";
	requestData.Device_Date = "";
	requestData.Added_By = $m.getUsername();
	requestData.Android_Version = deviceData.Android_Version;
	requestData.CPU_Details = deviceData.CPU_Details;
	requestData.Connectivity_3G4G = "";
//	requestData.Contact_No = "";
	requestData.Customer_Name = datasetData.Customer_Name;
	requestData.Customer_Photo = "";
	requestData.DOB = dob;
	requestData.Details_Approved = "";
	requestData.Device_ModelName = deviceData.Device_Model;
	requestData.Device_ModelNo = deviceData.Model_Number;
	requestData.Device_PN = "";
	requestData.Device_SN = "";
	requestData.District = "";
	requestData.EKYC_XML = "";
	requestData.Entry_Stage = "";
	requestData.Free_Space = deviceData.Free_Space;
	requestData.GPS_Option = gpsOption;
	requestData.Gender = "";
	requestData.House_Identifier = "";
	requestData.Landmark = "";
	requestData.Locality = "";
	requestData.Model_Number = deviceData.Model_Number;
	requestData.Network_Provider = "";
	requestData.OTG_Option = otgOption; 
	requestData.Pincode = datasetData.PinCode;
	requestData.PostOffice_Name = "";
	requestData.RAM = deviceData.RAM;
	requestData.Record_status = "";
	requestData.SAPCode = $m.getUsername();
	requestData.Selfie_Camera = deviceData.Selfie_Camera;
	requestData.Source_From = "TAB";
	requestData.State = datasetData.state;
	requestData.Street_Name = "";
	requestData.Sub_District = "";
	requestData.CaseID = $m.getUsername();
	requestData.AlternateNumber = "";
	requestData.City = datasetData.City;
	requestData.Address1 = datasetData.Address1;
	requestData.Address2 = datasetData.Address2;
	requestData.Address3 = datasetData.Address3;
	requestData.Email_ID = datasetData.EmailID;
	if(	$m.juci.dataset("devciespeciphication")){
			requestData.Compatibility_Flag = "Y";
			datasetData.Compatibility_Flag = "Y";
		}
		else{
				requestData.Compatibility_Flag = "N";
				datasetData.Compatibility_Flag = "N";
		}
	console.log(JSON.stringify(requestData));
	if($m.networkConnected()){
		utils.ShowProgress("Saving device compatibility data..");
		var service = new ServiceLibrary();
		var deviceResponseCallback = function (r) {
			utils.HideProgress();
			if(r.Status == "Y") {
					var saveCandidateEKYCCallback = function (r) {
					utils.HideProgress();
						if(r.Status == "Y") {
							$m.alert("Record inserted successfully to server");
							$m.close();
						} else {
							$m.alert("save compatibility failed due to : "+ JSON.stringify(r));
							$m.logError("save compatibility failed due to : "+ JSON.stringify(r));
						}
					};
					service.saveCandidateEKYCData(saveCandidateEKYCCallback, datasetData);
			} else {
					$m.alert("save compatibility failed due to : "+ JSON.stringify(r));
				$m.logError("save compatibility failed due to : "+ JSON.stringify(r));
			}
		};
		service.saveDeviceCompatibilityDetails(deviceResponseCallback,requestData);
	} else {
		$m.alert(messages.NoNetworkConnectivity);
  	}
}

function assigndate(){
	var dob = $m.juci.dataset("panCardData").DOB;
	var newdob = new Date(dob).toDateString();
	var currentDate =  new Date().toDateString();
	if(dob > new Date()){
		$m.juci.getDataset("panCardData")().DOB('');
		$m.alert("Date of birth should not be greater than Today's Date");
	}
	else if(newdob == currentDate){
		$m.juci.getDataset("panCardData")().DOB('');
		$m.alert("Date of birth should not be current date");	
	}
}
function addressCheck(str){
	var checkstatus = /^[A-Za-z0-9][A-Za-z0-9\'-( )&#,%./\-]*$/.test(str);
	personalDataAdd = str;
	if(checkstatus == false){
		personalDataAdd = str.substring(1);
		addressCheck(personalDataAdd);
	}
	return personalDataAdd;
}

function checkAadhaarValidation(){
	var checkAadhar = $m.juci.getControl("checkAadhar").value();
	if(checkAadhar){
		$m.juci.dataset("addressEnable1",false);
		$m.juci.dataset("addressEnable2",false);
		$m.juci.dataset("addressEnable3",false);
		$m.juci.addDataset("stateEnable1",false);
		$m.juci.addDataset("cityEnable1",false);
		$m.juci.addDataset("pinCodeEnable1",false);
	}else{
		$m.juci.dataset("addressEnable1",true);
		$m.juci.dataset("addressEnable2",true);
		$m.juci.dataset("addressEnable3",true);
		$m.juci.addDataset("stateEnable1",true);
		$m.juci.addDataset("cityEnable1",true);
		$m.juci.addDataset("pinCodeEnable1",true);
	}
}