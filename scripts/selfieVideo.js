/**
 * SelfieVideo.js
 * @author CloudPact Technologies
 * @description : This script is for recording selfie video,taking screenshots and saving data in local database.
 **/

var flag = false;
var frontCameraAvailable = true;
var PIVC_Medical_Qs_Ans_Flag;


$m.onResume(function(){
	videoImageArray = [];
	utils.RemovePref("payment");
	initResume();
	var callback = function(r){
	console.log(r);
	};
	utils.GetDbhelper(callback);
});

// initializing frontcamera available api 
function initResume(){
	$m.isfrontCameraAvailable(frontCameraAvailableCallback);
	$m.getVersionInfo(getVersionInfoCallback);
	callOnResume();
}

var getVersionInfoCallback = function(response){
	var deviceCallback = function(){
		$m.close();
	};
	if(response.result.osVersion < 5.0){
		$m.alert("Selfie video works on above 5.0 Android devices only..","Alert",deviceCallback);
	}
};

// callback for frontcamera available and initializing screen recorder api
var frontCameraAvailableCallback = function(response){
	if(response.code == 1){
		var appno = utils.GetPref("plandetails");
		$m.screenRecorder(appno.Application_Number+"-"+"SelfieVideo.mp4",screenRecoderCallback);
	} else {
		frontCameraAvailable = false;
		var appno = utils.GetPref("plandetails");
		$m.screenRecorder(appno.Application_Number+"-"+"SelfieVideo.mp4",screenRecoderCallback);
	}
};

//initializing screenshotfromrecording api
function onAgreeClick(){
	$m.toast("You clicked on yes");
	var appno = utils.GetPref("plandetails");
	var screenShotsCallback = function(res){
		if(res.code == 1){
			utils.HideProgress();
			videoImagesUpload(res.result,"PIVC_screen1");
			$m.juci.dataset("selfieEmpData",false);
			$m.juci.dataset("questions",true);
			var questionaries = utils.GetPref("Questionaries");
			var questionariesData = $m.juci.dataset("questionaries");
			questionariesData.medicationAnswer = questionaries.QsLS_30_Medication_Drug_YN;
			questionariesData.alignmentAnswer = questionaries.QsLS_32_MedicalAilgment_YN;
			questionariesData.surgeryAnswer = questionaries.QsLS_33_SurgeryPlanned_YN;
			$m.juci.dataset("questionaries",questionariesData);
		} else {
			utils.HideProgress();
			$m.alert("Something went wrong, please try again"+ JSON.stringify(res));
			$m.logError("Error while creating PIVC_screen1 screenshot--- " + JSON.stringify(res));
		}
	};
	utils.ShowProgress("Please wait..");
	$m.takeScreenShot("PIVC_screen1_"+ appno.Application_Number,screenShotsCallback);
}


function onQuestionariesAgreeClick(){
	PIVC_Medical_Qs_Ans_Flag = "Y";
	$m.toast("You clicked on yes");
	var appno = utils.GetPref("plandetails");
	var screenShotSuccessCallback = function(res){
		if(res.code == 1){
			utils.HideProgress();
			videoImagesUpload(res.result,"PIVC_screen2");
			$m.juci.dataset("questions",false);
			$m.juci.dataset("selfieEmpData",false);
			$m.juci.dataset("planContent",true);
		}else {
			utils.HideProgress();
			$m.alert("Something went wrong, please try again"+ JSON.stringify(res));
			$m.logError("Error while creating PIVC_screen2 screenshot--- " + JSON.stringify(res));
		}
	};
	utils.ShowProgress("Please wait..");
	$m.takeScreenShot("PIVC_screen2_"+ appno.Application_Number,screenShotSuccessCallback);
}

function onPlanContentAgreeClick(){
	$m.toast("You clicked on yes");
	var appno = utils.GetPref("plandetails");
	var screenShotCallback = function(res){
		if(res.code == 1){
			utils.HideProgress();
			videoImagesUpload(res.result,"PIVC_screen3");
			$m.juci.dataset("questions",false);
			$m.juci.dataset("selfieEmpData",false);
			$m.juci.dataset("planContent",false);
			$m.juci.dataset("finalContent",true);
		}else {
			utils.HideProgress();
			$m.alert("Something went wrong, please try again"+ JSON.stringify(res));
			$m.logError("Error while creating PIVC_screen3 screenshot--- " + JSON.stringify(res));
		}
	};
	utils.ShowProgress("Please wait..");
	$m.takeScreenShot("PIVC_screen3_"+ appno.Application_Number,screenShotCallback);
}

// initializing stopcamera api
function onFinalContentAgreeClick(){
	utils.ShowProgress("Saving Selfie Video...");
	var appno = utils.GetPref("plandetails");
	var screenShotCallback = function(res){
		if(res.code == 1){
			utils.HideProgress();
			videoImagesUpload(res.result,"PIVC_screen4");
			var dbhelpercallback = function(res){
				var planDetails = utils.GetPref("plandetails");
				var applicationNo = planDetails.Application_Number;
				var selectSuccessCallback = function (response){
					utils.ShowProgress("Saving Images...");
					var response = response.rows;
					if(response.length == 0){
						var imageDetailsSuccessCallback = function(response) {
							//$m.logInfo("Image details inserted successfully");
							$m.toast("You clicked on yes");
							$m.stopscreenRecorder(); 
							if(flag == true){
								return;
							}
							if(frontCameraAvailable == false){
								savingData("N");	
							} else {
								savingData("Y");	
							}
						};
						var imageDetailsFailureCallback = function(response){
							$m.hideProgress();
							$m.logError("Read failed -- " + JSON.stringify(response));
							$m.alert("Error while fetching from database");	
						};
						PDC_Image_Details.multipleInsert(videoImageArray,imageDetailsSuccessCallback,imageDetailsFailureCallback);
					} else {
						PDC_Image_Details.removeAll(applicationNo,function(success_callback){
							var imageDetailsSuccessCallback = function(response) {
								//$m.logInfo("Image details inserted successfully");
								$m.toast("You clicked on yes");
								$m.stopscreenRecorder(); 
								if(flag == true){
									return;
								}
								if(frontCameraAvailable == false){
									savingData("N");	
								} else {
									savingData("Y");	
								}
							};
							var imageDetailsFailureCallback = function(response){
								$m.hideProgress();
								$m.logError("Read failed -- " + JSON.stringify(response));
								$m.alert("Error while fetching from database");	
							};
							PDC_Image_Details.multipleInsert(videoImageArray,imageDetailsSuccessCallback,imageDetailsFailureCallback);
						}, function(failure_callback){
							utils.HideProgress();
							$m.alert("Error while remove to database");
							$m.logError("Failed to remove into PDC_Image_Details--- " + JSON.stringify(response));
						});
					}
				};
				var selectFailureCallback = function(response){
					utils.HideProgress();
					$m.alert("Error while inserting to database");
					$m.logError("Failed to insert into PDC_Image_Details--- " + JSON.stringify(response));
				};
				PDC_Image_Details.SelectWithFilter(applicationNo,selectSuccessCallback,selectFailureCallback);
			};
			utils.GetDbhelper(dbhelpercallback);
		}else{
			utils.HideProgress();
			$m.alert("Error while creating PIVC_screen4 screenshot--- " + JSON.stringify(res));
			$m.logError("Error while creating PIVC_screen4 screenshot--- " + JSON.stringify(res));
		}
	};
	utils.ShowProgress("Please wait..");
	$m.takeScreenShot("PIVC_screen4_"+ appno.Application_Number,screenShotCallback);
}

// callback for screen recorder api and storing in local db
var screenRecoderCallback = function(){
//	if(r.code == "1"){
//		if(flag == true){
//			return;
//		}
//		//$m.juci.dataset("videoPath",r.result);
//		//utils.PutPref("selfieVideoPath",r.result);
//		if(frontCameraAvailable == false){
//			savingData("N");	
//		} else {
//			savingData("Y");	
//		}
//	} else if(r.code == "0") {
//		$m.toast("Video Recording started");
//	} else {
//		$m.close();
//	}
};

function customerDetailsUpdate(){
	var appno = utils.GetPref("plandetails");
	var appfilter = new DB.Filter.equal("Application_Number", "'" + appno.Application_Number + "'");
	var data = {
		"PIVC_Video_YN" : "Y"
	};
	PDC_Customer_Details.updateSync(data, appfilter, function(){
		utils.HideProgress();
		$m.setResult("payment");	
		utils.PutPref("payment",true);
		$m.close();
	});
}

function savingData(selfieAvailable){
	var videoPath = utils.GetPref("selfieVideoPath");
	var planObj = utils.GetPref("plandetails");
	customerDetailsUpdate();
	//compressVideo(videoPath,planObj.Application_Number+"-"+"SelfieVideo",selfieAvailable);
}

function compressVideo(compressedVideoPath,fileName,selfieAvailable) {
	var videoPath = utils.GetPref("selfieVideoPath");
	var compressionCallback = function(r) {
		if(r.code == 1) {
			var planObj = utils.GetPref("plandetails");
			var compressedPath = r.result.CompressedFilePath;
			utils.PutPref("selfiePath",compressedPath);
			var videoObj = {
				"Txn_ID":planObj.Txn_Id,
				"Application_Number":planObj.Application_Number,
				"Selfi_Video_Path":compressedPath,
				"Selfi_Video_Status":"Y",
				"Added_By":$m.getUsername(),
				"Selfi_Video_SyncStatus":"Y",
				"Selfie_Camera_Available":selfieAvailable,
				"iscompleted":"1"
			};
			if(PIVC_Medical_Qs_Ans_Flag == "Y"){
				videoObj.PIVC_Medical_Qs_Ans_Flag = "Y";	
			} else {
				videoObj.PIVC_Medical_Qs_Ans_Flag = "N";	
			}
			utils.PutPref("SelfieVideoDetails",videoObj);
			var videoDetails = new PDC_Video_Details(videoObj);
				var videoInsertSuccessCallback = function(res){
					$m.toast("Video recorded successfully");
				};
				var videoInsertFailureCalback = function(response){
					utils.HideProgress();
					$m.alert("Error while inserting into database");
					$m.logError("Failed to insert into PDC_Video_Details--- " + JSON.stringify(response));
				};
				videoDetails.update(videoInsertSuccessCallback,videoInsertFailureCalback);
		} else if(r.code == 0) {
			$m.logError("Compression Failed due to "+ r.error.message);
		}
	};
	var selfiePath = videoPath.substring(8);
	$m.compressVideo(selfiePath,fileName,compressionCallback);
}

// language change settings
function onLanguageChange(event){
	var value = event.value;
	if(value == "English"){
		LanguageSettings.EnglishLanguageChange();
	} else if(value == "Hindi"){
		LanguageSettings.HindiLanguageChange();
	} else if(value == "Tamil"){
		LanguageSettings.TamilLanguageChange();
	} else if(value == "Marathi"){
		LanguageSettings.MarathiLanguageChange();
	} else if(value == "Telugu"){
		LanguageSettings.TeluguLanguageChange();
	}
}

function onNoClick(){
	PIVC_Medical_Qs_Ans_Flag = "N";
	var appno = utils.GetPref("plandetails");
	$m.toast("You clicked on No");
	$m.juci.dataset("questions",false);
	$m.juci.dataset("selfieEmpData",false);
	$m.juci.dataset("planContent",true);
	var screenShotSuccessCallback = function(res){
		if(res.code == 1){
			videoImagesUpload(res.result,"PIVC_screen2");
		}
	};
	$m.takeScreenShot("PIVC_screen2_"+ appno.Application_Number,screenShotSuccessCallback);
}

function onClickNo(){
	utils.HideDialog("dialog-planContent");
}

function onFirstScreenDisagreeClick(){
	flag = true;
	//$m.stopscreenRecorder();
	utils.ShowDialog("dialog-firstScreenContent");
}

function onNoPlanContentClick(){
	flag = true;
	$m.stopscreenRecorder();
	utils.ShowDialog("dialog-planContent");
}

function onClickOk(){
	utils.HideDialog("dialog-planContent");
	var planDetails = utils.GetPref("plandetails");
	var customProperties = $m.getUserAccount().customProperties;
	var dob = new Date(planDetails.dob).toString("dd/MM/yyyy");
	var url ="http://biuat.reliancenipponlife.com/Plan"+planDetails.PLanCode+".html?UniqueID=undefined&DeviceID=TAB&AdvisorCode="+customProperties.Login_Code+"&AdvisorName="+customProperties.Login_Name+"&AssuredName="+planDetails.name+"&Planno="+planDetails.PLanCode+"&DOB="+dob+"&Term=undefined&SA=undefined&Mode=undefined&GENDER=male&ANNUAL_INCOME=undefined&PURCHASE_MODE=undefined&UTM_SOURCE=undefined&LEAD_ID=undefined";
	$m.openChildBrowser("BI", url, {"navigation": true, "address": [],"patterns": []});
}

 function onSelectOk(){
	utils.HideDialog("dialog-finalContent");
	$m.close();
 }
 
 function onSelectFirstScreenOk(){
 	utils.HideDialog("dialog-firstScreenContent");
	$m.close();
 }

function onNoFinalContentClick(){
	flag = true;
	$m.stopscreenRecorder();
	utils.ShowDialog("dialog-finalContent");
}

function callOnResume(){
	var selfieEmpData = utils.GetPref("selfieData");
	$m.juci.dataset("lifeassuredetails",selfieEmpData);
	var englishValue = $m.juci.dataset("languagesArray")[0];
	$m.juci.dataset("languages",englishValue);
	LanguageSettings.EnglishLanguageChange();
}

var videoImageArray = [];
function videoImagesUpload(videopath,documentType){
	var txn_id = Math.floor(100000 + Math.random() * 900000);
	var planDetails = utils.GetPref("plandetails");
	var videoImageObj = {
		"Application_Number":planDetails.Application_Number,
		"DocumentTypeCode":documentType,
		"ImageName":documentType,
		"ImagePath":videopath,
		"Row_No":1,
		"Status":"1",
		"Txn_Id":txn_id.toString(),
		"UploadDate":utils.GetDateFormatted(new Date().getTime()),
		"iscompleted":"1"
	};
	videoImageArray.push(new PDC_Image_Details(videoImageObj));
}


$m.onClose(function(){
	var closePage = utils.GetPref("payment");
	if(!closePage){
		event.preventDefault();	
	} 
});