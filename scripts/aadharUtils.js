/**
 * aadharUtils.js
 * @author CloudPact Technologies
 * @description : This script is used for checking the common validation for aadhar details
 **/
function checkAddress(dialogid,aadharObject,otpid){
		if (!aadharObject["Landmark"] && !aadharObject["House"] && !aadharObject["Locality"] && !aadharObject["City"] && !aadharObject["Street"] && !aadharObject["State"]) {
			$m.hideProgress();
			if(otpid){
				juci.getControl(otpid).value(null);
			}
			juci.hideDialog(dialogid);
			$m.alert("Aadhar Address fields are empty.Please fill your application without Aadhar ");
			return;
		}
		return true;
	}

function checkValidation(Adhar_data,id,dialogid){
	$m.hideProgress();
	if(id){
		juci.getControl(id).value(null);	
		}
	if (Adhar_data.Value.__text == "Error During Generation Of signature or Console application Not Running" ||
		Adhar_data.Value.__text == "Some Exception Occured Check Log For More Details") {
		$m.alert("Server is not responding.Please try again later");
		return;
		}
	else if (Adhar_data.Value.__text == "Unknown error") {
		$m.alert("Unknown error.Please try again later");
		return;
	} 
	else{
		$m.alert(Adhar_data.Value.__text);
		return;
	}
	if(dialogid){
		utils.HideDialog(dialogid);
	}
	return true;
}

function setValues(Adhar_data){
	var aadharObject ={};
	for (var i = 0; i < Adhar_data.length; i++) {
		aadharObject[Adhar_data[i].Key.__text] = Adhar_data[i].Value.__text ? Adhar_data[i].Value.__text :"";
	}
	aadharObject["Gender"] = aadharObject["Gender"] == "M" ? "Male" : (aadharObject["Gender"] == "F" ? "Female" : "");
	return aadharObject;
}

function setAadhaarData(Lead_id){
	var aadharcallback = function(res){
		var aadharrows = res.rows[0];
		if(!aadharrows){
			return;
		}
		$m.juci.dataset("hasAuthenticated",true);
        setAadhaarValues(aadharrows);
	};
	utils.PojoSelectWithFilter("Customer_Aadhar_Details",aadharcallback,Lead_id);
}

function captureBiometric(aadharNo){
	var isFingerPrintConnected = function(resp){
		console.log(JSON.stringify(resp));
		if(resp.result.deviceinfo.status){
	        utils.HideDialog('authentication');
			utils.ShowDialog("dialog-fingerprint");
			console.log(res);
		} 
		else {
			$m.alert("Please connect Morpho Fingerprint scanner", "Device Error", function(){
				return;
			});
		}
	};			
	var fingerPrintCallback = function(res){
			if (res.code == 1) {
				$m.hideProgress();
				console.log(res);
				$m.fingerprintDeviceInfo(function(res){
					console.log("info" +res);
					isFingerPrintConnected(res);
				});
			} else if (res.code === 0) {
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
	
	AadharServices.CaptureBiometric(aadharNo,fingerPrintCallback,scanCallback);	
}

function getOtp(aadhar,Otpcallback) {
	var callback = function(response) {
		var result = x2js.xml_str2json(response.data);
		if(result.Envelope.Body.Production_GetOTP_KUA_RDserviceResponse.Production_GetOTP_KUA_RDserviceResult.KeyValueOfstringstring.Value) {
			$m.alert(result.Envelope.Body.Production_GetOTP_KUA_RDserviceResponse.Production_GetOTP_KUA_RDserviceResult.KeyValueOfstringstring.Value.__text);
			utils.HideProgress();
			return;
		}
		var Adhar_data = result.Envelope.Body.Production_GetOTP_KUA_RDserviceResponse.Production_GetOTP_KUA_RDserviceResult.KeyValueOfstringstring[0];
		var transationId = result.Envelope.Body.Production_GetOTP_KUA_RDserviceResponse.Production_GetOTP_KUA_RDserviceResult.KeyValueOfstringstring[1];
		if(transationId){
			utils.PutPref("TransactionId",transationId.Value);
			if (Adhar_data.Value) {
				$m.hideProgress();
				if (Adhar_data.Value.__text == "OTP Sent") {
					$m.toast("OTP Sent Sucessfully");
	                Otpcallback();
				} else if (Adhar_data.Value.__text == "Error During Generation Of signature or Console application Not Running" ||
					Adhar_data.Value.__text == "Audit Logging in DB is failed for request." ||
					Adhar_data.Value.__text == "Some Exception Occured Check Log For More Details"
					) {
					$m.alert("Server is not responding.Please try again later");
				} else if (	Adhar_data.Value.__text == "OTP XSD Validation Failed.") {
					$m.alert("Invalid Aadhaar Number");
				} 
				else{
					$m.alert(Adhar_data.Value.__text);
					return;
				}
			}
		}else{
			$m.alert('Invalid data - please try again');
		}
	}
	AadharServices.GetOtp(aadhar, callback);
}