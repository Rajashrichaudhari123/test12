var validatePan = {
	"_ServiceUrl":"https://rservicesuat.reliancenipponlife.com:443/NSDLServiceWeb/sca/WS",
	"_action": "_validatePan",
	"_template":'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:nsd="http://NSDLService/NSDLService_IF"><soapenv:Header/><soapenv:Body><nsd:validatePAN><panNo>?PanNumber?</panNo></nsd:validatePAN></soapenv:Body></soapenv:Envelope>',
	"ValidatePanNumber" : function (panNumber, callback) {
		var url = this._ServiceUrl;
		var requestTemplate = this._template;
		requestTemplate = requestTemplate.replace("?PanNumber?", panNumber);
		this._fireRequest(url,this._action,requestTemplate,callback);
	},
	
	"_fireRequest" : function(url,action, data, callback){
        if ($m.networkConnected()) {
        	var messagedigest = md5(data, Constants.mdkey);
            $m.post(url, data, {
                "headers": {
                    "Content-Type": "text/xml;charset=UTF-8",
                    "SOAPAction": "http://tempuri.org/IService1/"+action,
                    "content-md5" : messagedigest
                }
            }, function(callback) {
                return function(response) {
                    if (response.code == 200) {
                        // Success
                        var result = response.result;
                        console.log(result);
                        callback.call(this, result);
                    } else {
                        // Error
                  		 $m.alert(messages.ServerError,"Server Error",function(){
                        	$m.hideProgress();
                        });
                        var errMsg = response;
                        console.log(JSON.stringify(response));
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