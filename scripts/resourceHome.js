$m.juci.addDataset("resourceList",[{}]);
$m.juci.addDataset("resourceSubList","");
var serviceUrl = "http://124.124.218.136/rlife2/mowblyserver/sResourceList/rellife/prod/RlifeAssist";

$m.onReady(function(){
	$m.juci.dataset('headerName',"Knowledge Corner");
});

function showlistitem(event){
	var listItem = event.target.textContent;
	if(listItem == "Sales StoriesSee how lives are changing" || listItem == "See how lives are changing"){
		$m.open("Testimonials","/Resources/testimonial.html");
	}else if(listItem == "Training VideosDevelop yourself" || listItem == "Develop yourself"){
		$m.openChildBrowser("Training Videos","http://lifelineuat.reliancelife.com/Resources/Resoures.aspx?Input=Training",{"navigation": true,"address": [],	"patterns": [{}]});
	}else if(listItem == "FAQ"){
		$m.open("FAQ","/Products/helpdesk.html","FAQ");
	}else if(listItem == "Tools and Calculators"){
		$m.open("My Dream My Income Calculator","/Resources/myDreamMyIncomeCalculator.html");
	} else if(listItem == "Product Corner") {
		__mowbly__.Shell.UEX.pauseRecording(function(res){console.log(JSON.stringify(res))});
		$m.openChildBrowser("Product Corner","http://lifelineuat.reliancelife.com/Resources/Resoures.aspx",{"navigation": true,"address": [],	"patterns": [{}]});
	} else if(listItem == "Videos") {
		//$m.openChildBrowser("Videos","http://lifelineuat.reliancelife.com/Resources/Videos.aspx",{"navigation": true,"address": [],	"patterns": [{}]});
		$m.open("Videos","http://lifelineuat.reliancelife.com/Resources/Videos.aspx");
	}
}

var resourceConnector = {
	"getResourceList":function(callBack){	
		$m.get(serviceUrl, function(response) {
            if (response.code === 200) {
                // Successs
                var result = response.result;
                var res = JSON.parse(result.data);
                callBack.call(this, res);
            } else {
                // Error
               $m.hideProgress();
                $m.alert(messages.ServiceMessage);
                var errMsg = response;
                $m.logError(JSON.stringify(response));
            }
    });
	}
}

function initResume(){
	var getDeviceIdCallback = function(serverResponse) {
			var response = serverResponse.resourceList;
			var response_List = serverResponse.resourceSubList;
			$m.juci.dataset("resourceList",response);
			$m.juci.dataset("resourceSubList",response);
	};
	resourceConnector.getResourceList(getDeviceIdCallback);
}

$m.onResume(function(res){
	__mowbly__.Shell.UEX.resumeRecording(function(res){console.log(JSON.stringify(res))});
});