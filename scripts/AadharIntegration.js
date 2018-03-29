/**
 * AadharIntegration.js
 * @author CloudPact Technologies
 * @description : This script is used for setting the SOAP template with aadhar service
 **/
var AadharServices = {
	"_serviceUrl" :	"http://ekyc.reliancelife.com/Ekyc_Prod/EKYCTrasactionMultitaskingService.svc",
	
	"_actions" : {
		"GetOtp" : "Production_GetOTP_KUA_RDservice",
		"VerifyOtp" : "Production_EkycThroughOTP_RDservice",
		"Biometric" : "Production_EkycThroughBiometricForRegisteredDevice",
	},
	"_templates" : {
		"GetOtp" : '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"><soapenv:Header/><soapenv:Body><tem:Production_GetOTP_KUA_RDservice><tem:strAadhaarNo>?AadhaarNo?</tem:strAadhaarNo><tem:UserDetailId>30077</tem:UserDetailId></tem:Production_GetOTP_KUA_RDservice></soapenv:Body></soapenv:Envelope>',
		"VerifyOtp" : '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"><soapenv:Header/><soapenv:Body><tem:Production_EkycThroughOTP_RDservice><tem:strOTP>?OTP?</tem:strOTP><tem:strAadhaarNumber>?AadhaarNo?</tem:strAadhaarNumber><tem:UserDetailId>30077</tem:UserDetailId><tem:TransactionId>?transactionId?</tem:TransactionId></tem:Production_EkycThroughOTP_RDservice></soapenv:Body></soapenv:Envelope>',
		"Biometric" : '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"><soapenv:Header/><soapenv:Body><tem:Production_EkycThroughBiometricForRegisteredDevice><tem:strAadhaarNumber>?AadhaarNo?</tem:strAadhaarNumber><tem:strEncryptedSKey>?EncryptedSkey?</tem:strEncryptedSKey><tem:encryptedPID>?encryptedPID?</tem:encryptedPID><tem:sha256ofPidXML>?pidxml?</tem:sha256ofPidXML><tem:rdsId>?rdsId?</tem:rdsId><tem:rdsVer>?rdsVer?</tem:rdsVer><tem:mi>?mi?</tem:mi><tem:mc>?mc?</tem:mc><tem:dpId>?dpId?</tem:dpId><tem:dc>?dc?</tem:dc><tem:ci>?ci?</tem:ci><tem:strTerminalId>?TerminalId?</tem:strTerminalId><tem:ts>?ts?</tem:ts><tem:strTransactionId>?TransactionId?</tem:strTransactionId><tem:UserDetailId>30077</tem:UserDetailId><tem:IPAddress>192.168.0.1</tem:IPAddress><tem:BiometricType>FINGERPRINT</tem:BiometricType></tem:Production_EkycThroughBiometricForRegisteredDevice></soapenv:Body></soapenv:Envelope>'
	},
	"GetOtp" : function(aadharNumber, callback){
		var url = this._serviceUrl;
		var requestTemplate = this._templates.GetOtp;
		requestTemplate = requestTemplate.replace("?AadhaarNo?", aadharNumber);
		this._fireRequest(url,this._actions.GetOtp,requestTemplate,callback);
	},
	"VerifyOtp" : function(otp,aadharNumber, callback){
		var url = this._serviceUrl;
		var transactionId = utils.GetPref("TransactionId");
		var requestTemplate = this._templates.VerifyOtp;
		requestTemplate = requestTemplate.replace("?AadhaarNo?", aadharNumber);
		requestTemplate = requestTemplate.replace("?OTP?", otp);
		requestTemplate = requestTemplate.replace("?transactionId?",transactionId.__text);
		this._fireRequest(url,this._actions.VerifyOtp, requestTemplate,callback);
},
   "ValidateBiometric" : function(morphoData,FigerPrintData,callback){
   	    var url = this._serviceUrl;
		var requestTemplate = this._templates.Biometric;
		var Aadhar = $m.juci.dataset("Aadharno");
		if(!Aadhar) {
			Aadhar = $m.juci.getControl("LA_aadhar").value() ? $m.juci.getControl("LA_aadhar").value() : $m.juci.getControl("PR_aadhar").value();
		}
		requestTemplate = requestTemplate.replace("?AadhaarNo?", Aadhar);
		requestTemplate = requestTemplate.replace("?EncryptedSkey?", FigerPrintData.PidData.Skey.__text);
		requestTemplate = requestTemplate.replace("?encryptedPID?", FigerPrintData.PidData.Data.__text);
		requestTemplate = requestTemplate.replace("?pidxml?", FigerPrintData.PidData.Hmac);
		requestTemplate = requestTemplate.replace("?TerminalId?", "293633765");
		requestTemplate = requestTemplate.replace("?ts?", utils.GetTimeStamp());
		requestTemplate = requestTemplate.replace("?TransactionId?", utils.GenerateId());
		requestTemplate = requestTemplate.replace("?userDetailId?", utils.GetLoginCode());
		requestTemplate = requestTemplate.replace("?ci?",FigerPrintData.PidData.Skey._ci);
		requestTemplate = requestTemplate.replace("?dc?",morphoData.DeviceInfo._dc);
		requestTemplate = requestTemplate.replace("?dpId?",morphoData.DeviceInfo._dpId);
		requestTemplate = requestTemplate.replace("?mc?",morphoData.DeviceInfo._mc);
		requestTemplate = requestTemplate.replace("?mi?",morphoData.DeviceInfo._mi);
		requestTemplate = requestTemplate.replace("?rdsVer?",morphoData.DeviceInfo._rdsVer);
		requestTemplate = requestTemplate.replace("?rdsId?",morphoData.DeviceInfo._rdsId);
		this._fireRequest(url,this._actions.Biometric, requestTemplate,callback);
},
	"CaptureBiometric" : function(aadharNo,fingerPrintCallback,scanCompleteCallback){
		$m.showProgress("Capturing FingerPrint data");
		var options = {
			"piddata": {
				"appId": "DEMO",
				"action": "KYC",
				"uid": aadharNo,
				"terminalId": "293633765",
				"fdc": "MPHCE2EMB",
				"idc": "NC",
				"lot": "P",
				"lov": "560092",
				"udc": "MBL_IRI000000001",
				"timeout": 10000
			}
		}
		$m.fingerprintScanner(options, function(res) {
			fingerPrintCallback(res);
		});
		
		$m.onScanCompleted(function(res) {
			$m.hideProgress();
		 	scanCompleteCallback(res);
		});
	},
	
	"RegisterMorphoDevice" : function(aadharNo,registerMorphoCallback){
		var rdAppCallback = function(r) {
			if(r.code == 1){
				$m.showProgress("Registering morpho device..");
				var options = {
					"piddata": {
						"appId": "DEMO",
						"action": "KYC",
						"uid": aadharNo,
						"terminalId": "293633765",
						"fdc": "MPHCE2EMB",
						"idc": "NC",
						"lot": "P",
						"lov": "560092",
						"udc": "MBL_IRI000000001",
						"timeout": 10000
					}
				};
				$m.setMorphoDeviceConfig(options,function(res){
					registerMorphoCallback("Y");
				});
			} else {
				$m.toast("Kindly install this app for aadhaar authentication..");
			}
		};
		$m.isRDAppInstalled(rdAppCallback);
	},
	"_fireRequest" : function(url,action, data, callback){
        if ($m.networkConnected()) {
        	//var messagedigest = md5(data, Constants.mdkey);
            $m.post(url, data, {
                "headers": {
                    "Content-Type": "text/xml;charset=UTF-8",
                    "SOAPAction": "http://tempuri.org/IService1/"+action,
                    //"content-md5" : messagedigest
                }
            }, function(callback) {
                return function(response) {
                    if (response.code == 200) {
                        // Success
                        var result = response.result;
                        callback.call(this, result);
                    } else {
                        // Error
                  		 $m.alert(messages.ServerError,"Server Error",function(){
                        	$m.hideProgress();
                        });
                        var errMsg = response;
                        $m.logError(JSON.stringify(response));
                    }
                };
            }(callback));
        } else {
            $m.alert(messages.NoNetworkConnectivity,"Network Alert",function(){
            	$m.hideProgress();
            });
        }
	}
};