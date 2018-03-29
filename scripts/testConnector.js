var testConnector={
"url" : "http://124.124.218.136/rlife2/mowblyserver/serverscriptTest/rellife/prod/RlifeAssist",
	"getAddress" : function(arr,callBack){		
		$m.post(testConnector.url,{"data":arr}, function(response){
			if(response.code == 200){
				// Success
				var result = response.result;
				callBack.call(this,result);
			}else{
				// Error
				var errMsg = response.error.message;
			}
		});
	}
}

