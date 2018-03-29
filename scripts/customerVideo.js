/**
 * CustomerVideo.js
 * @author CloudPact Technologies
 * @description : This script is used for recording personalized video.
 **/
 var PersonalCompressedPath = "";

$m.onResume(function(){
	initResume();
});

// initializing frontCameraAvailable api
function initResume(){
	var oneMinute = 60 * 1,
    display = document.querySelector('#time');
    $m.isfrontCameraAvailable(frontCameraAvailableCallback);
}

// front camera api callback
var frontCameraAvailableCallback = function(response){
	if(response.code == 1){
		var appno = utils.GetPref("plandetails");
		$m.screenRecorder(appno.Application_Number+"-"+"PersonalVideo.mp4",screenRecoderSuccessCallback);
	} else {
		var deviceCallback = function(){
			$m.open("com.cloudpact.mowbly.home", "/system/home.html", null);
		};
		$m.alert("Selfie video works on above 5.0 Android devices only..","Alert",deviceCallback);
	}
};

var timeCallback = function(response){
	utils.StopTimer();
	display = document.querySelector('#time');
	display.textContent = "00:00"
	$m.stopscreenRecorder();
};

//initializing screenshot recording api
var screenRecoderSuccessCallback = function(res){
	if(res.code == "1"){
		utils.PutPref("videoPath",res.result);
		var yesCallback = function(res){
			var openVideoCallback = function(r){
				if(r.code == 0){
					savingsData();
				} else if(r.code == 1){
					utils.StopTimer();
					var onYesClickCallback = function(res){
						var appno = utils.GetPref("plandetails");
						$m.screenRecorder(appno.Application_Number+"-"+"PersonalVideo.mp4",screenRecoderSuccessCallback);
						var oneMinute = 60 * 1;
						utils.StopTimer(oneMinute);
					};	
					var onNoClickCallback = function(res){
						savingsData();
					};
					utils.ConfirmBox("Your video deleted successfully do you want to record new video?",onYesClickCallback,onNoClickCallback);
				}	
			};
			$m.openVideo(openVideoCallback);
		};
		var noCallback = function(res){
			savingsData();
		};
		utils.ConfirmBox("Do you want to preview your video?",yesCallback,noCallback);
	} else if(res.code == "0"){
		var oneMinute = 60 * 1;
		display = document.querySelector('#time');
		utils.StartTimer(oneMinute, display,timeCallback);
	} else {
		$m.open("com.cloudpact.mowbly.home", "/system/home.html", null);
	}
};

// stop recorder api
function onSubmitClick(){
	utils.StopTimer();
	display = document.querySelector('#time');
	display.textContent = "00:00"
	$m.stopscreenRecorder();
}

// saving data into local db
function savingsData(){
	var videoPath = utils.GetPref("videoPath");
	var planObj = utils.GetPref("plandetails");
	var selfieMedicalQues = utils.GetPref("SelfieVideoDetails");
	var selfieVideoPath = utils.GetPref("selfieVideoPath");
	utils.ShowProgress("Compressing Video please wait..");
	var dbhelpercallback = function(response){
		var personalCompressionCallback = function(r) {
			if(r.code == 1) {
				PersonalCompressedPath = r.result.CompressedFilePath;
				utils.PutPref("personalCompressedPath",PersonalCompressedPath);
				//var getSelfiePath = utils.GetPref("selfiePath");
				var customerObj = {	
					"Personal_Video_Path":PersonalCompressedPath,
					"Personal_Video_Status":"Y",
					"Application_Number":planObj.Application_Number,
					"Added_By":$m.getUsername(),
					"Added_On":new Date().getTime(),
					"Txn_ID":planObj.Txn_Id,
					"Selfi_Video_Path":"",
					"Personal_Video_SyncStatus":"Y",
					"Selfi_Video_SyncStatus":"",
					"Selfi_Video_Status":"",
					"Selfie_Camera_Available":"Y",
					"PIVC_Medical_Qs_Ans_Flag":"",
					"iscompleted":"1"
				};
				var customerDetails = new PDC_Video_Details(customerObj);
				var videoInsertSuccessCallback = function(res){
					utils.HideProgress();
					$m.open("messageSchedular", "/Applications/messageSchedular.html",planObj);
					$m.toast("video recorded successfully");
				};
				var videoInsertFailureCallback = function(response){
					utils.HideProgress();
					$m.alert("Error while inserting to database");
					$m.logError("Failed to insert into PDC_Video_Details--- " + JSON.stringify(response));
				};
				customerDetails.update(videoInsertSuccessCallback,videoInsertFailureCallback);
				
			}else if(r.code == 0) {
				utils.HideProgress();
				$m.logError("Compression Failed due to "+ r.error.message);
			}
		};
		var personalVideoPath = videoPath.substring(8);
		$m.compressVideo(personalVideoPath,planObj.Application_Number+"-"+"PersonalVideo",personalCompressionCallback);
	};
	utils.GetDbhelper(dbhelpercallback);
}
