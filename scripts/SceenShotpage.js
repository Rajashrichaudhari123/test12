var isFrontCameraAvailable = true;
var videoImageArray = [];
var flag = false;
//var frontCameraAvailable = true;
var PIVC_Medical_Qs_Ans_Flag;
 var selfieEmpData = {"LA_Name": "Rajashri Chaudhari","LA_DOB":"16/04/1995","LA_AddressLine1":"dfdgg vill","LA_EMPLOYEECODE":"","LA_Mobileno":"9404188948","LA_EmailId":"rajashri@gmail.com","LA_Occupation":"salaired","name":"-","dob":"-","address":"-","mobile":"-","emailid":"-","occupation":"-"}
var questionaries = {"medication":"ddsgdfhghyjk","medicalAlignments":"dvffhhhhjhjkj","surgery":"dsfdghuom,kll","medicationAnswer":"vfddfffgdhj","alignmentAnswer":"hjjhkhjk","surgeryAnswer":"cdfbngb"};
var customerDetails = {"PLanCode": "114","Login_Code":"12324","Login_Name":"rghhjj","name":"rajashri"}
 
$m.onResume(function(){
	videoImageArray = [];
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

// callback for frontcamera available and initializing screen recorder api
 var frontCameraAvailableCallback = function (res){
	if(res.code != 1){
		isFrontCameraAvailable = false;
	}
	var appno = $m.getPref("selectedApplication");
	$m.screenRecorder(appno+"-"+"SelfieVideo.mp4",screenRecoderCallback);
}

// callback for screen recorder api and storing in local db
var screenRecoderCallback = function(r){
	if(r.code == "1"){
		if(flag == true){
			return;
		}
		$m.juci.dataset("videoPath",r.result);
		utils.PutPref("selfieVideoPath",r.result);
		if(isFrontCameraAvailable == false){
			savingData("N");	
		} else {
			savingData("Y");	
		}
	} else if(r.code == "0") {
		$m.toast("Video Recording started");
	} else {
		$m.close();
	}
};

//call customerDetailsUpdate and compressVideo
function savingData(selfieAvailable){
	var videoPath = utils.GetPref("selfieVideoPath");
	var appno = $m.getPref("selectedApplication");
	customerDetailsUpdate();
	compressVideo(videoPath,appno+"-"+"SelfieVideo",selfieAvailable);
}

//save customer details
function customerDetailsUpdate(){
	var appno = $m.getPref("selectedApplication");
	var appfilter = new DB.Filter.equal("Application_Number", "'" + appno + "'");
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

//compress the video
function compressVideo(compressedVideoPath,fileName,selfieAvailable) {
	var videoPath = utils.GetPref("selfieVideoPath");
	var compressionCallback = function(r) {
		if(r.code == 1) {
			var appno = $m.getPref("selectedApplication");
			var compressedPath = r.result.CompressedFilePath;
			utils.PutPref("selfiePath",compressedPath);
			var videoObj = {
				"Txn_ID":planObj.Txn_Id,
				"Application_Number":appno,
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
		/*	var videoDetails = new PDC_Video_Details(videoObj);
				var videoInsertSuccessCallback = function(res){
					$m.toast("Video recorded successfully");
				};
				var videoInsertFailureCalback = function(response){
					utils.HideProgress();
					$m.alert("Error while inserting into database");
					$m.logError("Failed to insert into PDC_Video_Details--- " + JSON.stringify(response));
				};
				videoDetails.update(videoInsertSuccessCallback,videoInsertFailureCalback);*/
		} else if(r.code == 0) {
			$m.logError("Compression Failed due to "+ r.error.message);
		}
	};
	var selfiePath = videoPath.substring(8);
	$m.compressVideo(selfiePath,fileName,compressionCallback);
}
/*----------------*-----------------------------------------*/
var getVersionInfoCallback = function(response){
	var deviceCallback = function(){
		$m.close();
	};
	if(response.result.osVersion < 5.0){
		$m.alert("Selfie video works on above 5.0 Android devices only..","Alert",deviceCallback);
	}
};

//set the language and selfi data
function callOnResume(){
	$m.juci.dataset("lifeassuredetails",selfieEmpData);
	var englishValue = $m.juci.dataset("languagesArray")[0];
	$m.juci.dataset("languages",englishValue);
	LanguageSettings.EnglishLanguageChange();
}

//1st screen
//initializing screenshotfromrecording api 
function onAgreeClick(){
	$m.toast("You clicked on yes");
	var appno = $m.getPref("selectedApplication");
	var screenShotsCallback = function(res){
		if(res.code == 1){
			utils.HideProgress();
			videoImagesUpload(res.result,"PIVC_screen1");
			$m.juci.dataset("selfieEmpData",false);
			$m.juci.dataset("questions",true);
			var questionariesData = $m.juci.dataset("questionaries");
			questionariesData.medicationAnswer = questionaries.medicationAnswer;
			questionariesData.alignmentAnswer = questionaries.alignmentAnswer;
			questionariesData.surgeryAnswer = questionaries.surgeryAnswer;
			$m.juci.dataset("questionaries",questionariesData);
		}
	};
	utils.ShowProgress("Please wait..");
	$m.screenShotfromRecording("PIVC_screen1_"+ appno,screenShotsCallback);
}

// create video object and push it to array
function videoImagesUpload(videopath,documentType){
	var txn_id = Math.floor(100000 + Math.random() * 900000);
	var appno = $m.getPref("selectedApplication");
	var videoImageObj = {
		"Application_Number":appno,
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
//
function onFirstScreenDisagreeClick(){
	flag = true;
	//$m.stopscreenRecorder();
	utils.ShowDialog("dialog-firstScreenContent");
}

//2nd screen
function onQuestionariesAgreeClick(){
	PIVC_Medical_Qs_Ans_Flag = "Y";
	$m.toast("You clicked on yes");
	var appno = $m.getPref("selectedApplication")
	var screenShotSuccessCallback = function(res){
		if(res.code == 1){
			utils.HideProgress();
			videoImagesUpload(res.result,"PIVC_screen2");
			$m.juci.dataset("questions",false);
			$m.juci.dataset("selfieEmpData",false);
			$m.juci.dataset("planContent",true);
		}
	};
	utils.ShowProgress("Please wait..");
	$m.screenShotfromRecording("PIVC_screen2_"+ appno,screenShotSuccessCallback);
}

function onNoClick(){
	PIVC_Medical_Qs_Ans_Flag = "N";
	var appno = $m.getPref("selectedApplication");
	$m.toast("You clicked on No");
	$m.juci.dataset("questions",false);
	$m.juci.dataset("selfieEmpData",false);
	$m.juci.dataset("planContent",true);
	var screenShotSuccessCallback = function(res){
		if(res.code == 1){
			videoImagesUpload(res.result,"PIVC_screen2");
		}
	};
	$m.screenShotfromRecording("PIVC_screen2_"+ appno,screenShotSuccessCallback);
}

//3rd screen
function onPlanContentAgreeClick(){
	$m.toast("You clicked on yes");
	var appno = $m.getPref("selectedApplication");
	var screenShotCallback = function(res){
		if(res.code == 1){
			utils.HideProgress();
			videoImagesUpload(res.result,"PIVC_screen3");
			$m.juci.dataset("questions",false);
			$m.juci.dataset("selfieEmpData",false);
			$m.juci.dataset("planContent",false);
			$m.juci.dataset("finalContent",true);
		}
	};
	utils.ShowProgress("Please wait..");
	$m.screenShotfromRecording("PIVC_screen3_"+ appno,screenShotCallback);
}

function onNoPlanContentClick(){
	flag = true;
	$m.stopscreenRecorder();
	utils.ShowDialog("dialog-planContent");
}

//4th final screen
// initializing stopcamera api
function onFinalContentAgreeClick(){
	utils.ShowProgress("Saving Selfie Video...");
	var appno = $m.getPref("selectedApplication");
	var screenShotCallback = function(res){
		if(res.code == 1){
			utils.HideProgress();
			videoImagesUpload(res.result,"PIVC_screen4");
			var dbhelpercallback = function(res){
				var appno = $m.getPref("selectedApplication");
				var applicationNo = appno;

				var selectSuccessCallback = function (response){
					utils.ShowProgress("Saving Images...");
					var response = response.rows;
					if(response.length == 0){
						var imageDetailsSuccessCallback = function(response) {
							//$m.logInfo("Image details inserted successfully");
							$m.toast("You clicked on yes");
							$m.stopscreenRecorder(); 
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
			$m.alert("Error while creating selfi video, please try again.");
			$m.logError("Error while creating PIVC_screen4 screenshot--- " + JSON.stringify(response));
		}
	};
		utils.ShowProgress("Please wait..");
	$m.screenShotfromRecording("PIVC_screen4_"+ appno,screenShotCallback);
}

function onNoFinalContentClick(){
	flag = true;
	$m.stopscreenRecorder();
	utils.ShowDialog("dialog-finalContent");
}

/*------------*/
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

function onClickOk(){
	utils.HideDialog("dialog-planContent");
	var appno = $m.getPref("selectedApplication");
//	var customProperties = $m.getUserAccount().customProperties;
	var dob = new Date(planDetails.dob).toString("dd/MM/yyyy");
	var url ="http://biuat.reliancenipponlife.com/Plan"+customerDetails.PLanCode+".html?UniqueID=undefined&DeviceID=TAB&AdvisorCode="+customerDetails.Login_Code+"&AdvisorName="+customerDetails.Login_Name+"&AssuredName="+customerDetails.name+"&Planno="+customerDetails.PLanCode+"&DOB="+dob+"&Term=undefined&SA=undefined&Mode=undefined&GENDER=male&ANNUAL_INCOME=undefined&PURCHASE_MODE=undefined&UTM_SOURCE=undefined&LEAD_ID=undefined";
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
 
 $m.onClose(function(){
	var closePage = utils.GetPref("payment");
	if(!closePage){
		event.preventDefault();	
	} 
});
