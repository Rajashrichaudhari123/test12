/**
 * versioncheck.js
 * @author CloudPact Technologies
 * @description : This script is used for changing the version number when pack update is happening
 **/
$m.onResume(function(eventObject){
	// Code to execute when the page is ready
	if($m.networkConnected() && $m.getPref("version")){
		eventObject.hideProgress = false;
		//$m.showProgress("verifying application version...");
		var currentVersion = $m.getPref("version");
		var uname = $m.getPref("useAs") ? $m.getPref("useAs").LA_Business_LoginCode :$m.getUserAccount().customProperties.Login_Code;
		$m.get(Constants.publicIP+"/mowblyserver/versionServerscript/rellife/prod/RlifeAssist?uname=" + uname + "&currentversion=" + currentVersion,function(response){
			//$m.logInfo("version check response : " + JSON.stringify(response));
			$m.hideProgress();
			if(response.code === 200){
				// Success
				var resultData = JSON.parse(response.result.data);
				if(!resultData.res){
					if(resultData.mandatory){
						$m.alert("New version is available. Kindly update now.", "Version", function(){
							// Code to execute when the alert dialog dismisses
							$m.open("com.cloudpact.mowbly.home", "/system/home.html", "ForceUpdate", {"showProgress":false});
						});
					}else{
						$m.confirm({"title":"Confirm",
									"message": "New version is available. Do you want to update now?", 
									"buttons": [{"label": "Yes"},
												{"label": "No"}]
									}, function(index){
							// Code to execute when the confirm dialog dismisses
							if(index == 0) {
								// Yes
								$m.open("com.cloudpact.mowbly.home", "/system/home.html", "ForceUpdate", {"showProgress":false});
							} else if(index == 1) {
								// No
							}
						});
					}
				}
			} else{
				// Error
				var errMsg = response.error.message;
				$m.logError("version check failed. Reason : " + errMsg);
			}
		});
	}
});