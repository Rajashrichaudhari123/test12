$m.juci.addDataset("deviceInfo",{
	"Android_Version":"",
	"getotgInfo" :"",
	"getGpsInfo":"",
	"Selfie_Camera":"",
	"Device_ID":"",
	"RAM":"",
	"Free_Space":"",
	"deviceModel":"",
	"modelNumber":"",
	"SAPCode":"",
	"lat":"",
	"long":"",
	"cpuDetails":"",
	"serviceprovider":"",
	"versionName":""
});
var deviceInfoObj = {};
$m.juci.addDataset("sapcode","");

$m.onReady(function(){
	juci.dataset("headerName","Device Information");
	$m.juci.dataset("alertcount", "3");
	var deviceInfoObject = utils.GetPref("DeviceInfomation");
	$m.juci.dataset("sapcode","Device Information --- "+ deviceInfoObject.SAPCode);
});

$m.onResume(function(){
	initResume();
});

function initResume() {
	var deviceInfoObject = utils.GetPref("DeviceInfomation");
	if(deviceInfoObject == undefined) {
		utils.HideProgress();
	}
	var deviceInfoDataset = $m.juci.dataset("deviceInfo");
	deviceInfoDataset.Android_Version = deviceInfoObject.Android_Version;
	deviceInfoDataset.Selfie_Camera = deviceInfoObject.Selfie_Camera;
	deviceInfoDataset.cpuDetails = deviceInfoObject.CPU_Details;
	deviceInfoDataset.serviceprovider = deviceInfoObject.getActiveDataSimOperator;
	
	if(deviceInfoObject.OTG_Option == true) {
		deviceInfoDataset.getotgInfo = "Y";
		$m.juci.findById("otg").el.src = "images/tick-right.png";
	} else {
		$m.juci.findById("otg").el.src = "images/tick-wrong.png";
		deviceInfoDataset.getotgInfo = "N";
	}
	
	if(deviceInfoObject.GPS_Option == true) {
		deviceInfoDataset.getGpsInfo = "Y";	
		$m.juci.findById("get-gps").el.src = "images/tick-right.png";
	} else {
		$m.juci.findById("get-gps").el.src = "images/tick-wrong.png";
		deviceInfoDataset.getGpsInfo = "N";
	}
	
	if(deviceInfoDataset.Selfie_Camera != "Y") {
		$m.juci.findById("selfie").el.src = "images/tick-wrong.png";
	} else {
		$m.juci.findById("selfie").el.src = "images/tick-right.png";
	}
	
	if(deviceInfoDataset.Android_Version < "5.0") {
		$m.juci.findById("android-version").el.src = "images/tick-wrong.png";
	} else {
		$m.juci.findById("android-version").el.src = "images/tick-right.png";
	}
	deviceInfoDataset.RAM = deviceInfoObject.RAM;
	deviceInfoDataset.Free_Space = deviceInfoObject.Free_Space;
	
	if(deviceInfoDataset.RAM.search("G") != -1) {
		var parseRam = parseInt(deviceInfoDataset.RAM) * 1024;	
		if(parseRam < 1024) {
			$m.juci.findById("ram").el.src = "images/tick-wrong.png";	
		} else {
			$m.juci.findById("ram").el.src = "images/tick-right.png";
		}
	} else {
		$m.juci.findById("ram").el.src = "images/tick-wrong.png";	
	}
	
	if(deviceInfoDataset.Free_Space.search("G") != -1) {
		var parseFreeSpace = parseInt(deviceInfoDataset.Free_Space) * 1024;
		if(parseFreeSpace < 1024) {
			$m.juci.findById("free-space").el.src = "images/tick-wrong.png";
		} else {
			$m.juci.findById("free-space").el.src = "images/tick-right.png";
		}
	} else {
		$m.juci.findById("free-space").el.src = "images/tick-wrong.png";
	}
	
	deviceInfoDataset.Device_ID = deviceInfoObject.Device_ID;
	deviceInfoDataset.lat = deviceInfoObject.Latitude;
	deviceInfoDataset.long = deviceInfoObject.Longitude;
	deviceInfoDataset.deviceModel = deviceInfoObject.Device_Model;
	deviceInfoDataset.modelNumber = deviceInfoObject.Model_Number;
	$m.juci.dataset("deviceInfo",deviceInfoDataset);
	getMemoryData();
}

function getMemoryData() {
	var callback = function(resp) {
		if(resp.code == 0) {
			var deviceInfoDataset = $m.juci.dataset("deviceInfo");
			deviceInfoDataset.versionName = resp.result.androidVersionName + '-' + resp.result.androidVersionNumber;
			$m.juci.dataset("deviceInfo", deviceInfoDataset);
		}	
	};
	$m.getMemStat(callback);
}

function gettype(){
		currentUser = {"code":$m.getUsername(),"name":$m.getUserAccount().customProperties.Login_Name,"usertype":$m.getUserAccount().customProperties.User_Type};
	
	return currentUser.usertype;
}