$m.juci.addDataset("Aadharno","");
$m.juci.addDataset("Aadhar", {"Name":"","DateofBirth":"","Gender":"","Gender":"","EmailID":"","Address":""});
$m.juci.addDataset("aadhar_section", false)
$m.juci.addDataset("getAadharNo", true)
$m.juci.addDataset("headerName", "Biometric Consent");
var ConsentForm ={
	"time":"1",
	"date":"2",
	"year":"3",
	"name":"4",
	"name1":"5",
	"location":"r",
	"empName":"3",
	"sapcode":"2",
	"mobileNo":"4",
	"post":"",
	"branchCode":"6",
	"deviceCode":"7",
	"officelocation":"9"
}
$m.juci.addDataset("ConsentForm", ConsentForm);
var x2js = new X2JS();

$m.onResume(function(eventObject) {
$m.juci.addDataset("aadhar_section", false)
$m.juci.addDataset("getAadharNo", true)
});

/** Check the aadhar number is valid or not and open dialog box if the aadhar is valid**/
function openauthentication() {
	var aadhar = $m.juci.dataset("Aadharno");
	$m.juci.dataset("Aadharno", aadhar);
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

/** Call the biometric services*/
function callBiometricService(res) {
	utils.ShowProgress("Fetching Aadhaar Details...");
	$m.logInfo("Fetching Aadhaar details..");
	var pidData = res;
	if(pidData){
		$m.logInfo("pidData.." + pidData);
		var resultData = res.data;
		$m.logInfo("resultData.." + resultData);
		var result = x2js.xml_str2json(resultData);
		var Adhar_data = result.Envelope.Body.Production_EkycThroughBiometricForRegisteredDeviceResponse.Production_EkycThroughBiometricForRegisteredDeviceResult.KeyValueOfstringstring;
		$m.logInfo("Adhar_data.." + Adhar_data);
		if (Adhar_data.Value) {
			console.log(JSON.stringify(Adhar_data))
			var validation = checkValidation(Adhar_data,"");
				if(!validation){
					$m.alert("Aadhar Data is not proper");
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
			var aadharData = assignAadhardata(aadharObject, resultData,"Biometric");
			utils.HideDialog("dialog-fingerprint");
			setAadhaarValues(aadharData);
			$m.hideProgress();
		} else {
			$m.hideProgress();
			$m.alert("Your Aadhar No is Invalid");
			return;
		}
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
			$m.juci.dataset("getAadharNo", false);
}

/** Assign the aadhar details to an object**/
function assignAadhardata(objects, ekyc,authenticateBy) {
	var aadharObj = {};
	//	aadharObj.Lead_ID = Lead_Id;
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
//		aadharObj.Device_SN = morphoSerialNo;
//		aadharObj.Device_PN = morphoPnNo;
		aadharObj.SAPCode = utils.GetLoginCode();
		aadharObj.issync = 0;
		aadharObj.iscompleted = 1;
	return aadharObj;
}

/** Open the biometric if user has chosen the biometric for aadhar**/
function openBiometric(){
	var aadharNo = $m.juci.dataset("Aadharno");
	var ValidateBiometricCallback = function(res) {
		callBiometricService(res);
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

function closeAuthenticate(){
	utils.HideDialog('authentication');
}

/** Formating the date for life planner**/
function ChangeFormatofDate(date) {
	var date1 = date;
	date1 = date1.split("-");
	currdate = date1[1] + "/" + date1[0] + "/" + date1[2];
	return currdate;
}