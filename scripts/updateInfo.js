/**
 * updateInfo.js
 * @author CloudPact Technologies
 * @description : This script is used for version information details
 **/
$m.juci.addDataset("packInfo",[],true);
$m.juci.addDataset("updateStatus",true);
$m.juci.addDataset("versionInfo",{
  "systemVersion": "87.0",
  "systemUpdatedOn": 0,
  "appName": "SalesAssist",
  "appVersion": "2.0",
  "appUpdate" : 0,
  "systemBuild": 1,
  "systemUpdate" : 0,
  "frameworkName": "Mowbly",
  "frameworkVersion": "4.1",
  "appEmail": "support@cloudpact.com",
  "errorEmail": "team@cloudpact.com",
  "appDescription": "Custom Enterprise Mobile Platform",
  "systemInstalledOn": 1469604992287,
  "device_id":"",
}, true);

$m.juci.addDataset("showUpdate", false);
	
	
$m.onReady(function(){
	// Code to execute when the page is ready
	juci.dataset("headerName","Update Info");
 	$m.juci.dataset("alertcount", "3");
});


$m.onData(function(){
	$m.juci.dataset("packInfo",[],true);
	getForceUpdate();
	__mowbly__.Shell.AccountManager.getPackInfo(function(response){		
		if (response.code){
		var packs=[];
		for(var i=0;i<response.result.length;i++){
			response.result[i]["updateAvaliable"] = 0;
			packs.push(response.result[i]);
		}
		juci.dataset("packInfo",packs,true);				
		checkUpdates();
		} else {
			$m.alert(response.error.message);	
		}
	});
	$m.getVersionInfo(function(response){
		var versionInfo = response.result;
		versionInfo.appUpdate = 0;
		versionInfo.systemUpdate = 0;
		versionInfo.device_id = "";
		$m.juci.dataset("versionInfo",versionInfo, true);
	});
	$m.getDeviceId(function(response){
		var deviceId = response.result;	
		var versionInfo = $m.juci.dataset("versionInfo");
		versionInfo.device_id = deviceId;
		$m.juci.dataset("versionInfo",versionInfo, true);
	});
});

function getDate(timestamp){
	return new Date(timestamp).toString("dd/MM/yyyy hh:mm:ss tt");
}


function getCurrentVersion(callback){
	var url = Constants.publicIP+"/mowblyserver/getupdateinfo/rellife/prod/RlifeAssist";
	$m.get(url, function(response){
		if(response.code === 200){
			var result = response.result.data;
			result = JSON.parse(result);
			callback(result);
		} else{
			var errMsg = response.error.message;
			callback(false);
		}
	});
}

function checkUpdates(){
	$m.juci.dataset("showUpdate", false);
	var getCurrentUpdatesCallback = function(response){
		if(!response){
			return;	
		}
		var oldPackInfo = $m.juci.dataset("packInfo");
		var newPackInfo = response.Packs;
		newPackInfo = newPackInfo.replace(/'/g, "\"");
		newPackInfo = JSON.parse(newPackInfo);
		for(var i=0;i<oldPackInfo.length;i++){
			var oldPack = oldPackInfo[i];
			var newPack = newPackInfo[oldPack._eid];
			if((oldPack._modifiedon != newPack._modifiedon) || oldPack.status != 1){
				oldPackInfo[i].updateAvaliable = 1;
				$m.juci.dataset("showUpdate", true);
//				$m.alert("Please do pack Update", "Update", function(){
//					updatePacks();
//				});
			}else{
				oldPackInfo[i].updateAvaliable = 0;
			}
		}
		$m.juci.dataset("packInfo", oldPackInfo, true);
		
		//System & App
		var versionInfo = $m.juci.dataset("versionInfo");
		if(versionInfo.systemVersion != response.System.version){
			versionInfo.systemUpdate = 1;
		}else{
			versionInfo.systemUpdate = 0;
		}
		
		if(versionInfo.appVersion != response.App.version){
			versionInfo.appUpdate = 1;
		}else{
			versionInfo.appUpdate = 0;
		}
		$m.juci.dataset("versionInfo", versionInfo, true);
	}
	getCurrentVersion(getCurrentUpdatesCallback);
}

function updatePacks(){
	$m.open("com.cloudpact.mowbly.home","/system/home.html","ForceUpdate");
}

function setForceUpdate(event){
	var doForceUpdate = event.value;
	$m.putPref("com.mowbly.system.getupdates", doForceUpdate);	
}

function getForceUpdate(){
	var prefStatus = $m.getPref("com.mowbly.system.getupdates");
	$m.juci.dataset("updateStatus",prefStatus);
}