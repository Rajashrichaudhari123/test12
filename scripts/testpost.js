
$m.onReady(function(){
	// Code to execute when the page is ready
	var data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"><soapenv:Header/><soapenv:Body><tem:Production_GetOTP_KUA><!--Optional:--><tem:strAadhaarNo>417111065601</tem:strAadhaarNo><!--Optional:--><tem:UserDetailId>30077</tem:UserDetailId></tem:Production_GetOTP_KUA></soapenv:Body></soapenv:Envelope>';

	//data = JSON.stringify(data);
	var url="https://ekyc.reliancelife.com/HttpsProductionEkycService/EKYCTrasactionMultitaskingService.svc";
	$m.post(url, data, {
                "headers": {
                    "Content-Type": "text/xml;charset=UTF-8",
                    "SOAPAction": "http://tempuri.org/IService1/Production_GetOTP_KUA"
                }
            }, function(response){
	if(response.code == 200){
		// Success
		var result = response.result;
		result = JSON.parse(response.result.data);
		result_data = result.entities;
		
		if(result.code == "103"){
			console.log(result);
		
		}else{
			$m.alert("Unexpected server response.plz try later");
		}
	} else{
		// Error
		var errMsg = response.error.message;
	}
});

});
