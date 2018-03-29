 var x2js = new X2JS();
 
 (function() {
 	
 	function openBiometric(aadharNo,callback){
		var ValidateBiometricCallback = function(res) {
			callback(res);
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
 	
 	/**Common utils**/
	window.callAadhaarService = {
		"CallBiometric":openBiometric
	};
 	
 })();