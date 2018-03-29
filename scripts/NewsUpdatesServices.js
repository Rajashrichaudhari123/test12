var NewsUpdatesServices = {
	"_url" : "http://lifelineuat.reliancelife.com/SalesAssist/NewsUpdates/wsNewUpdates.svc/",
	"_actions" : {
		"GetNewsUpdates" : "GetNewsUpdates",
		"GetNewsDetails" : "GetPressDetails"
	},
	"GetNewsUpdates" : function(callback){
		var username = $m.getUsername();
		if(!username){
			username = "20000226";
		}
		var requesturl = this._url + this._actions.GetNewsUpdates + "/" + username;		
		this._fireReuqest(requesturl,"",callback);
	},
	"GetNewsDetails" : function(pressid, callback){
		var username = $m.getUsername();
		if(!username){
			username = "20000226";
		}
		var requesturl = this._url + this._actions.GetNewsDetails + "/" + username + "/" + pressid;		
		this._fireReuqest(requesturl,"",callback);
	},
	"_fireReuqest" : function(requestUrl,requestData ,callback){
		if ($m.networkConnected()) {
			$m.get(requestUrl, function(callback) {
                return function(response) {
                    if (response.code === 200) {
                        var result = response.result;
                        results = JSON.parse(result.data);
                        callback.call(this, results);
                    } else {
                        $m.alert(messages.ServerError);
                        var errMsg = response;
                        $m.logError(JSON.stringify(response));
                    }
                };
            }(callback));
        } else {
            $m.alert(messages.NoNetworkConnectivity);
        }
	}
}