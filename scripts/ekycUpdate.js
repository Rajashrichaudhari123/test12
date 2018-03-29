$m.juci.addDataset("client_no","");
$m.juci.addDataset("DOB","");
$m.juci.addDataset("clientDetails",{"address":"","dob":"","clientNumber":"","gender":"","Name":"","maritalStatus":"","policyNumber":"","nationality":""});
$m.juci.addDataset("isValidate",false);
$m.juci.addDataset("Aadharno","");
$m.juci.addDataset("VerifyAadharno","");
$m.juci.addDataset("isAadhaarValidate",false);
$m.juci.addDataset("otp","");
$m.juci.addDataset("authenticateType", "");
$m.juci.addDataset("ekyc_xml", "");
$m.juci.addDataset("isAadhar", false);
$m.juci.addDataset("customerQuestion",["Yes","No"]);
$m.juci.addDataset("isOptionSelected", false);
$m.juci.addDataset("isValidated",true);
var data;

$m.onResume(function(){
	initResume();
	$m.juci.dataset("headerName","EKYC Update");
	$m.juci.dataset("isAadhar", false);
	$m.juci.dataset("isValidated",true);
	//$m.juci.getControl("otpNo").value(null);
});

function initResume() {
	$m.juci.dataset("isValidate",false);
	$m.juci.dataset("client_no","");
	$m.juci.dataset("DOB","");
	$m.juci.dataset("isAadhaarValidate",false);
	$m.juci.dataset("Aadharno","");
	$m.juci.dataset("VerifyAadharno","");
	$m.juci.getControl("submit").hide();
	//utils.HideDialog("dialog-otp");
	$m.juci.dataset("otp","");
}

/** on Validate Click **/
function onValidate() {
	$m.juci.dataset("isAadhar", false);
	$m.juci.getControl("submit").hide();
	var dob = $m.juci.dataset("DOB");
	var clientNo = juci.dataset("client_no");
	if(!dob || !clientNo) {
		$m.alert("Please enter details..");
		return;
	}
//	$m.juci.getControl("get_OTP").show();
	$m.juci.getControl("Biometric").show();
	$m.juci.getControl("submit").hide();
	$m.juci.dataset("Aadharno","");
	$m.juci.dataset("VerifyAadharno","");
	var requestData = {
		"Added_By": $m.getUsername(),
		"DOB":dob.toString("dd/MM/yyyy"),
		"PolicyClientNumber":clientNo
	};
	if($m.networkConnected()){
		utils.ShowProgress("Fetching Client details please wait..");
		var service = new ServiceLibrary();
		var deviceResponseCallback = function (r) {
			utils.HideProgress();
			if(r.Status == "Y") {
				data = r.objClientDetails;
				var obj = {
					"Name":data.LAST_NM,
					"dob":data.BIRTH_DT,
					"gender":data.GENDER_CD,
					"maritalStatus":data.MARITAL_STATUS_CD,
					"address":data.ADRESS,
					"nationality":(data.X_NATIONALITY).trim()
				};
				var splitAddress = obj.address.split(" ");
				var add = splitAddress[0] + ' ' + 	splitAddress[1];
				obj.address = add;
				$m.juci.dataset("clientDetails",obj);
				$m.juci.dataset("isValidate",true);
				$m.juci.dataset("isAadhaarValidate",true);
				$m.juci.dataset("isValidated",false);
			} else {
				$m.juci.dataset("isValidate",false);
				$m.juci.dataset("isAadhaarValidate",false);
				$m.alert(r.Message);
				return;
				$m.logError("Fetching Client details failed due to : "+ JSON.stringify(r));
			}
		};
		service.getClientDetails(deviceResponseCallback,requestData);
	} else {
		$m.alert(messages.NoNetworkConnectivity);
  	};
};

/** Aadhaar biometric call**/
function callBiometric() {
	var aadhaarNumber = $m.juci.dataset("Aadharno");
	var verifyAadhaarNumber = $m.juci.dataset("VerifyAadharno");
	if(!aadhaarNumber || !verifyAadhaarNumber) {
		$m.alert("Please enter aadhar number..");
		return;
	}
	if(aadhaarNumber != verifyAadhaarNumber) {
		$m.alert("Aadhar number and verify aadhar number is incorrect");
		return;
	}
	var aadhaarNumber = $m.juci.getControl("Aadhar").value();
	var biometricCallback = function (r) {
		callBiometricService(r);
	};
	callAadhaarService.CallBiometric(aadhaarNumber,biometricCallback);
}

/** Call the biometric services*/
function callBiometricService(res) {
	utils.ShowProgress("Fetching Aadhaar Details...");
	var pidData = res;
	var resultform = $m.juci.dataset("newResultForm");
	if(res){
		var resultData = res.data;
		var result = x2js.xml_str2json(resultData);
		if(!result) {
			utils.HideProgress();
		}
		$m.juci.dataset("authenticateType","Biometric");
		$m.juci.dataset("ekyc_xml",resultData);
		//saveData(resultData,"Biometric");
		utils.ShowProgress("Prepopulating Aadhaar Details...");
		showData(result);
	}
	else{
		$m.alert("Please do biometric authentication");
		return;
	}
}

/** Aadhaar OTP call**/
function callotp() {
	var aadhaarNumber = $m.juci.dataset("Aadharno");
	var verifyAadhaarNumber = $m.juci.dataset("VerifyAadharno");
	if(!aadhaarNumber || !verifyAadhaarNumber) {
		$m.alert("Please enter aadhar number..");
		return;
	}
	if(aadhaarNumber != verifyAadhaarNumber) {
		$m.alert("Aadhar number and verify aadhar number is incorrect");
		return;
	}
	openOtp();
}

/** Open the otp pop-up when user has chosen as otp in aadhar**/
function openOtp() {
	$m.showProgress("Loading OTP...");
	var callback = function(){
		$m.juci.dataset("otp","");
		utils.ShowDialog("dialog-otp");
	};
	var aadhar = $m.juci.dataset("Aadharno");
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
		if(result.Envelope.Body.Production_EkycThroughOTP_RDserviceResponse.Production_EkycThroughOTP_RDserviceResult.KeyValueOfstringstring.Value) {
			utils.HideProgress();
			$m.alert("Given otp is invalid input");
			return;
		}
		if(!result) {
			utils.HideProgress();
		}
		utils.HideDialog("dialog-otp");
		$m.juci.dataset("authenticateType","OTP");
		$m.juci.dataset("ekyc_xml",aadhar_result);
		//saveData(aadhar_result,"OTP");
		utils.ShowProgress("Prepopulating Aadhaar Details...");
		showData(result);
	}
	AadharServices.VerifyOtp(Otp, aadhar, callback);
}



function showData(aadhar_result){
	var adhar_data;
	var authenticateType = $m.juci.dataset("authenticateType");
	if(aadhar_result.Envelope.Body.Production_EkycThroughBiometricForRegisteredDeviceResponse) {
		adhar_data=aadhar_result.Envelope.Body.Production_EkycThroughBiometricForRegisteredDeviceResponse.Production_EkycThroughBiometricForRegisteredDeviceResult.KeyValueOfstringstring;	
	} else {
		adhar_data = aadhar_result.Envelope.Body.Production_EkycThroughOTP_RDserviceResponse.Production_EkycThroughOTP_RDserviceResult.KeyValueOfstringstring;
	}
	utils.HideProgress();
	var aadharDetails={};
	if(authenticateType =="Biometric"){
		aadharDetails.Name = adhar_data[2].Value.__text;
		aadharDetails.dob = adhar_data[3].Value.__text;
		aadharDetails.gender = adhar_data[4].Value.__text;
		aadharDetails.address = adhar_data[8].Value.__text+", "+adhar_data[11].Value.__text;
		aadharDetails.aadharPhoto = "data:image/png;base64,"+adhar_data[18].Value.__text;
	}
	else if(authenticateType =="OTP"){
		aadharDetails.Name = adhar_data[1].Value.__text;
		aadharDetails.dob = adhar_data[2].Value.__text;
		aadharDetails.gender = adhar_data[3].Value.__text;
		aadharDetails.address = adhar_data[7].Value.__text+", "+adhar_data[10].Value.__text;
		aadharDetails.aadharPhoto = "data:image/png;base64,"+adhar_data[17].Value.__text;
	}
	$m.juci.addDataset("aadharDetails", aadharDetails);
	console.log(adhar_data);
//	$m.juci.getControl("get_OTP").hide();
	$m.juci.getControl("Biometric").hide();
	$m.juci.getControl("submit").show();
	$m.juci.dataset("isAadhar", true);
	$m.juci.getControl("yes_checkbox").value(null);
	$m.juci.getControl("no_checkbox").value(null);
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

function showSubmitButtonYes(e){
		$m.juci.dataset("isOptionSelected", true);	
			$m.juci.getControl("no_checkbox").value(false);
}
function showSubmitButtonNo(e){
		$m.juci.dataset("isOptionSelected", true);	
			$m.juci.getControl("yes_checkbox").value(false);
}

/*function showSubmitButton(event) {
	$m.juci.dataset("isOptionSelected", true);	
	
	if($m.juci.getControl("no_checkbox").value() == true) {
		//$m.alert("Customer Name in Aadhaar mismatch with Policy details, hence couldn’t update the same");
		$m.juci.getControl("yes_checkbox").value(false);
		$m.juci.getControl("no_checkbox").value(true);
	} else if($m.juci.getControl("yes_checkbox").value() == true){
		$m.juci.getControl("no_checkbox").value(false);
		$m.juci.getControl("yes_checkbox").value(true);	
	}
	
}*/
// aadhaar data pushing to server
function saveData() {
	var ekyc_xml=	$m.juci.dataset("ekyc_xml");
	var authenticateType=	$m.juci.dataset("authenticateType");
	var requestData = {};
	var aadhar = $m.juci.getControl("Aadhar").value();
	var clientNo = juci.dataset("client_no");
	requestData.AadharNumber = aadhar;
	requestData.AuthenticationType = authenticateType;
	requestData.ClientNumber = data.ClientNumber;
	requestData.AadharXML = ekyc_xml;
	requestData.PolicyNumber = data.PolicyNumber;
	requestData.AddedBy = $m.getUsername();
	var checkValue = $m.juci.getControl("yes_checkbox").value();
	var noCheckValue = $m.juci.getControl("no_checkbox").value();
	if(checkValue== false && noCheckValue == false){
		$m.alert("Please select Is Customer name match with our policy details");
		return;
	}
	else{
		if(checkValue == true) {
			requestData.AadharVerified_YN = "Y";	
		} else {
			requestData.AadharVerified_YN = "N";	
		}
	}
	
	
	if($m.networkConnected()){
		utils.ShowProgress("Submitting data please wait..");
		var service = new ServiceLibrary();
		var aadhaarResponseCallback = function (r) {
			utils.HideProgress();
			if(r.Status == "Y") {
				$m.alert(r.Message,"Alert",function(){
					$m.open("com.cloudpact.mowbly.home", "/system/home.html", null); 
				});
			} else {
				$m.alert(r.Message,"Alert",function(){
					$m.open("com.cloudpact.mowbly.home", "/system/home.html", null); 
				});
			}
		};
		service.submitAadhaarDetails(aadhaarResponseCallback,requestData);
	} else {
		$m.alert(messages.NoNetworkConnectivity);
  	};
}


function onClose() {
	varisOptionSelected = $m.juci.dataset("isOptionSelected");
	if(varisOptionSelected){
		$m.juci.closeAll();	
	}
}

function closebox() {
	utils.HideDialog("dialog-otp");
}

$m.onClose(function(){
	
	//utils.HideDialog("dialog-otp");
});