/**
 * PIVCPage.js
 * @author CloudPact Technologies
 * @description : This script is for recording selfie video,taking screenshots and saving data in local database.
 **/

var flag = false;
var frontCameraAvailable = true;
var PIVC_Medical_Qs_Ans_Flag;
var lstCustomer = [];
var lstLifeStyle = [];
var lstPlan = [];
var selectedApplicationData = {};
var customerData ={};
var videoImageArray = [];
var lifeassuredetails = {
	"LA_Name":"",
	"LA_DOB":"",
	"LA_AddressLine1":"",
	"LA_Mobileno":"",
	"LA_EmailId":"",
	"LA_Occupation":"",
	"LA_AddressLine3":"",
	"LA_AddressLine2":""
};

$m.juci.addDataset("IstScreen","");
$m.juci.addDataset("SndScreen","");
$m.juci.addDataset("trdScreen","");
$m.juci.addDataset("FthScreen","");
$m.onData(function(eventObject){
	var data = eventObject.data;
	selectedApplicationData = data;
	customerData = data;
	lifeassuredetails.LA_Name = data.customerName;
	lifeassuredetails.LA_DOB = data.DOB;
	lifeassuredetails.LA_AddressLine1 = data.LA_AddressLine1+",";
	lifeassuredetails.LA_AddressLine3 = data.LA_AddressLine3+".";
	lifeassuredetails.LA_AddressLine2 = data.LA_AddressLine2+",";
	lifeassuredetails.LA_Mobileno = data.mobile;	
	lifeassuredetails.LA_EmailId = data.emailID;	
	lifeassuredetails.LA_Occupation = data.Occupation;	
//	$m.juci.dataset("lifeassuredetails",lifeassuredetails);
	initResume();
});

$m.onResume(function(){
	videoImageArray = [];
	utils.RemovePref("payment");
	$m.juci.dataset("selfieEmpData",true);
	var callback = function(r){
	console.log(r);
	};
	utils.GetDbhelper(callback);
});

var planDetail={};
// initializing frontcamera available api 
function initResume(){
		var plandetails= {
			"ProductName":selectedApplicationData.ProductName,
			"sumassured":selectedApplicationData.sumassured,
			"PolicyTerm":selectedApplicationData.policyterm,
			"InstallmentPremium_W_ST":selectedApplicationData.InstallmentPremium_W_ST,
			"PremiumPayingTerm":selectedApplicationData.PremiumPayingTerm,
			"Premium_Frequency": selectedApplicationData.Premium_Frequency
		};
		planDetail=plandetails;
	$m.isfrontCameraAvailable(frontCameraAvailableCallback);
	$m.getVersionInfo(getVersionInfoCallback);
	callOnResume();
}

// callback for frontcamera available and initializing screen recorder api
var frontCameraAvailableCallback = function(response){
	if(response.code == 1){
		var appno = selectedApplicationData.ApplicationNo;
		$m.screenRecorder(appno+"-"+"SelfieVideo.mp4",screenRecoderCallback);
	} else {
		frontCameraAvailable = false;
//		var appno = selectedApplicationData[0];
		$m.screenRecorder(appno+"-"+"SelfieVideo.mp4",screenRecoderCallback);
	}
};

var getVersionInfoCallback = function(response){
	var deviceCallback = function(){
		$m.close();
	};
	if(response.result.osVersion < 5.0){
		$m.alert("Selfie video works on above 5.0 Android devices only..","Alert",deviceCallback);
	}
};

function callOnResume(){
//	var selfieEmpData = selectedApplicationData[0];
	var selfieEmpData = lifeassuredetails;
	$m.juci.dataset("lifeassuredetails",selfieEmpData);
	var englishValue = $m.juci.dataset("languagesArray")[0];
	$m.juci.dataset("languages",englishValue);
	LanguageSettings.EnglishLanguageChange();
}

//1sr screen
//initializing screenshotfromrecording api
function onAgreeClick(){
	$m.toast("You clicked on Yes");
	onFirstScreenData("Y");
}

function onFirstScreenData(flagStatus){
	var appno = selectedApplicationData.ApplicationNo;
	var screenShotsCallback = function(res){
		if(res.code == 1){
			utils.HideProgress();
			videoImagesUpload(res.result,"PIVC_screen1");
			$m.juci.dataset("selfieEmpData",false);
			$m.juci.dataset("questions",true);
			$m.juci.dataset("IstScreen",flagStatus);
			var questionaries = selectedApplicationData;
			var questionariesData = $m.juci.dataset("questionaries");
			questionariesData.medicationAnswer = questionaries.medicine;
			questionariesData.alignmentAnswer = questionaries.medical_ailments;
			questionariesData.surgeryAnswer = questionaries.surgery;
			$m.juci.dataset("questionaries",questionariesData);
		} else {
			utils.HideProgress();
			$m.logError("Take Screenshot failed due to " + JSON.stringify(res));
		}
	};
	utils.ShowProgress("Please wait..");
	$m.takeScreenShot("PIVC_screen1_"+ appno,screenShotsCallback);	
}

function onFirstScreenDisagreeClick(){
	$m.toast("You clicked on No");
	onFirstScreenData("N");
}

//2nd screen
function onQuestionariesAgreeClick(){
	PIVC_Medical_Qs_Ans_Flag = "Y";
	$m.juci.dataset("SndScreen","Y");
	$m.toast("You clicked on yes");
	var appno = selectedApplicationData.ApplicationNo;
	var screenShotSuccessCallback = function(res){
		if(res.code == 1){
			utils.HideProgress();
			videoImagesUpload(res.result,"PIVC_screen2");
			$m.juci.dataset("questions",false);
			$m.juci.dataset("selfieEmpData",false);		
			$m.juci.dataset("planContent",true);
		//	var plansContent="I have opted for Plan Name"+selectedApplicationData.planeName+ " for Sum Assured "+selectedApplicationData.sumAssured+" with policy term of "+selectedApplicationData.policy_Term+". I agree to pay the premium of "+selectedApplicationData.primium+".";
	//			$m.juci.dataset("plansContent",plansContent);
		
		}else {
			utils.HideProgress();
			$m.logError("Take Screenshot failed due to " + JSON.stringify(res));
		}
	};
	utils.ShowProgress("Please wait..");
	$m.takeScreenShot("PIVC_screen2_"+ appno,screenShotSuccessCallback);
}

function onNoClick(){
	PIVC_Medical_Qs_Ans_Flag = "N";
	var appno = selectedApplicationData.ApplicationNo;
	$m.toast("You clicked on No");
	$m.juci.dataset("questions",false);
	$m.juci.dataset("selfieEmpData",false);
	$m.juci.dataset("SndScreen","N");
	$m.juci.dataset("planContent",true);
/*	var plansContent="I have opted for Plan Name"+selectedApplicationData.planeName+ " for Sum Assured "+selectedApplicationData.sumAssured+" with policy term of "+selectedApplicationData.policy_Term+". I agree to pay the premium of "+selectedApplicationData.primium+".";
	$m.juci.dataset("plansContent",plansContent);*/
	var screenShotSuccessCallback = function(res){
		if(res.code == 1){
			videoImagesUpload(res.result,"PIVC_screen2");
		}
	};
	$m.takeScreenShot("PIVC_screen2_"+ appno,screenShotSuccessCallback);
}

//3rd screen
function onPlanContentAgreeClick(){
	$m.toast("You clicked on yes");
	onPlanContentAgreeData("Y")
}

function onNoPlanContentClick(){
	onPlanContentAgreeData("N")
}

function onPlanContentAgreeData(flagStatus){
	$m.juci.dataset("trdScreen",flagStatus);
	var appno = selectedApplicationData.ApplicationNo;
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
			$m.logError("Take Screenshot failed due to " + JSON.stringify(res));
		}
	};
	utils.ShowProgress("Please wait..");
	$m.takeScreenShot("PIVC_screen3_"+ appno,screenShotCallback);
}


// initializing stopcamera api
function onFinalContentAgreeClick(){
	onFinalContentData("Y");
}

function onFinalContentData(flagStatus){
	$m.juci.dataset("FthScreen",flagStatus);
	utils.ShowProgress("Saving Selfie Video...");
	var appno = selectedApplicationData.ApplicationNo;
	var screenShotCallback = function(res){
		if(res.code == 1){
			utils.HideProgress();
			videoImagesUpload(res.result,"PIVC_screen4");
			var dbhelpercallback = function(res){
//				var planDetails = selectedApplicationData[0];
				var applicationNo = selectedApplicationData.ApplicationNo;
				var selectSuccessCallback = function (response){
					utils.ShowProgress("Saving Images...");
					var response = response.rows;
					if(response.length == 0){
						var imageDetailsSuccessCallback = function(response) {
							//$m.logInfo("Image details inserted successfully");
							saveFormData();
							$m.toast("You clicked on yes");
							if(flag == true){
								return;
							}
							if(frontCameraAvailable == false){
								savingData("N");	
							} else {
								savingData("Y");	
							}
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
								saveFormData();
								if(flag == true){
									return;
								}
								if(frontCameraAvailable == false){
									savingData("N");	
								} else {
									savingData("Y");	
								}
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
			//$m.alert("Error while creating selfi video, please try again.");
			$m.logError("Error while creating PIVC_screen4 screenshot--- " + JSON.stringify(res));
		}
	};
	utils.ShowProgress("Please wait..");
	$m.takeScreenShot("PIVC_screen4_"+ appno,screenShotCallback);
}

// callback for screen recorder api and storing in local db
var screenRecoderCallback = function(r){
	
};

function customerDetailsUpdate(){
	var appno = selectedApplicationData.ApplicationNo;
	var appfilter = new DB.Filter.equal("Application_Number", "'" + appno + "'");
	var data = {
		"PIVC_Video_YN" : "Y"
	};
	PDC_Customer_Details.updateSync(data, appfilter, function(){
		utils.HideProgress();
		$m.setResult("payment");	
		utils.PutPref("payment",true);
	//	uploadImages();
//		$m.close();
	});
}

function savingData(selfieAvailable){
	var videoPath = utils.GetPref("selfieVideoPath");
	customerDetailsUpdate();
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

function onClickNo(){
	utils.HideDialog("dialog-planContent");
}

function onClickOk(){
	utils.HideDialog("dialog-planContent");
//	var planDetails = utils.GetPref("plandetails");
//	var customProperties = $m.getUserAccount().customProperties;
//	var dob = new Date(planDetails.dob).toString("dd/MM/yyyy");
//	var url ="http://biuat.reliancenipponlife.com/Plan"+planDetails.PLanCode+".html?UniqueID=undefined&DeviceID=TAB&AdvisorCode="+customProperties.Login_Code+"&AdvisorName="+customProperties.Login_Name+"&AssuredName="+planDetails.name+"&Planno="+planDetails.PLanCode+"&DOB="+dob+"&Term=undefined&SA=undefined&Mode=undefined&GENDER=male&ANNUAL_INCOME=undefined&PURCHASE_MODE=undefined&UTM_SOURCE=undefined&LEAD_ID=undefined";
//	$m.openChildBrowser("BI", url, {"navigation": true, "address": [],"patterns": []});
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
	onFinalContentData("N");
}


function videoImagesUpload(videopath,documentType){
	var txn_id = Math.floor(100000 + Math.random() * 900000);
//	var planDetails = selectedApplicationData[0];
		var appno = selectedApplicationData.ApplicationNo;
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

function uploadImages(){
	var fp_callback = function (r) {
		var responseData = JSON.parse(r.result.data);
		if(responseData.Status == "Y") {
			videoImageArray.splice(0,1);
			if(videoImageArray.length){
				var fp_callback = function (r) {
					var responseData = JSON.parse(r.result.data);
					if(responseData.Status == "Y") { 
						videoImageArray.splice(0,1);
						if(videoImageArray.length){	
							var fp_callback = function (r) {
								var responseData = JSON.parse(r.result.data);
								if(responseData.Status == "Y") { 
									videoImageArray.splice(0,1);
									if(videoImageArray.length) {
										var fp_callback = function (r) {
											var responseData = JSON.parse(r.result.data);
											if(responseData.Status == "Y") {	
												videoImageArray.splice(0,1);
												if(videoImageArray.length) {
													var fp_callback = function (r) {
														var responseData = JSON.parse(r.result.data);
														if(responseData.Status == "Y") {
													//		$m.toast("Data saved successfuly");
														}
													}
												} else {
													utils.HideProgress();
													$m.toast("Data saved successfuly");
												//	$m.close();
												}
											} else {
												utils.HideProgress();
												$m.logError("Image details failed due to :"+ JSON.stringify(r));
											}
										}
										saveImageDetails(fp_callback,videoImageArray[0]);
									} else {
										utils.HideProgress();
										$m.toast("Data saved successfuly");
									//	$m.close();
									}
									
								}else {
									utils.HideProgress();
									$m.logError("Image details failed due to :"+ JSON.stringify(r));
								}
							};
							saveImageDetails(fp_callback,videoImageArray[0]);
						} else {
								utils.HideProgress();
								$m.toast("Data saved successfuly");
							//	$m.close();
							}	
					} else {
						utils.HideProgress();
						$m.logError("Image details failed due to :"+ JSON.stringify(r));
					}
					
				};
				saveImageDetails(fp_callback,videoImageArray[0]);
			} else {
					utils.HideProgress();
					$m.toast("Data saved successfuly");
				//	$m.close();
				}
		} else {
			utils.HideProgress();
			$m.logError("Image details failed due to :"+ JSON.stringify(r));
		}
	};
	utils.ShowProgress("Saving Data please wait..");
    saveImageDetails(fp_callback,videoImageArray[0]);
}

function saveImageDetails(res, currentDocument) {
	if($m.networkConnected()){
		if(!currentDocument.Extended_Attributes){
			currentDocument.Extended_Attributes = "LA";
		}
		var r = $m.httpRequest({
			url: "http://lifelineuat.reliancelife.com/RassistServices/wsUploadImage.svc/SaveImageDetails"
		}).addPart(
			"documenttypecode", currentDocument.DocumentTypeCode, "text/plain"
		).addPart(
			"imagename", currentDocument.ImageName, "text/plain"
		).addPart(
			"application_number", currentDocument.Application_Number, "text/plain"
		).addPart(
			"Source_From", "TAB", "text/plain"
		).addPart(
			"Add_Param1",currentDocument.AadharImage, "text/plain"
		).addPart(
			"Add_Param2", currentDocument.Txn_Id, "text/plain"
		).addPart(
			"Add_Param3","4", "text/plain"
		).addPart(
			"Add_Param4", "", "text/plain"
		).addPart(
			"type", currentDocument.Extended_Attributes, "text/plain"
		).setType("POST");
		
		if(currentDocument.AadharImage){
		 r.addPart(
			"ImageDoc", "", "text/plain"
		);
		}
		else{
		r.addPart(
			"ImageDoc", new $m.file(currentDocument.ImagePath, {level: $m.STORAGE_LEVEL}), "image/png", "ImageDoc"
		);
		}
		
		r.send(res);
	}else{
		 $m.juci.getControl("syncallb").enable();
		$m.alert("Network disconnected in between. Please try later.");
	}
}
function saveFormData(){
	var customerForm = selectedApplicationData;
	var RequestData = {};
	var IstScreen = $m.juci.dataset("IstScreen");
	var SndScreen = $m.juci.dataset("SndScreen");
	var trdScreen =  $m.juci.dataset("trdScreen");
	var FthScreen = $m.juci.dataset("FthScreen");
	RequestData.PIVCScreen1_YN = IstScreen;
	RequestData.PIVCScreen2_YN = SndScreen;
	RequestData.PIVCScreen3_YN = trdScreen;
	RequestData.PIVCScreen4_YN = FthScreen;
	RequestData.Added_By = $m.getUsername();
	RequestData.Application_Number = customerForm.ApplicationNo;
	RequestData.Installmentpremium = customerForm.InstallmentPremium_W_ST;
	RequestData.LA_AddressLine1 = customerForm.LA_AddressLine1;
	RequestData.LA_AddressLine2 = customerForm.LA_AddressLine2;
	RequestData.LA_AddressLine3 = customerForm.LA_AddressLine3;
	RequestData.LA_City = customerForm.LA_City;
	RequestData.LA_State = customerForm.LA_State;
	RequestData.LA_Pincode = customerForm.LA_Pincode;
	RequestData.LA_DOB = new Date(customerForm.DOB).getTime();
	RequestData.LA_EmailId = customerForm.emailID;
	RequestData.LA_Mobileno = customerForm.mobile;
	RequestData.LA_Name = customerForm.customerName;
	RequestData.Login_SAPCode = customerForm.sapCode;
	RequestData.PlanName = customerForm.ProductName;
	RequestData.PolicyTerm = customerForm.policyterm;
	RequestData.PremiumFrequency = customerForm.PremiumFrequency;
	RequestData.QsLS_30_Medication_Drug_YN = customerForm.medicine;
	RequestData.QsLS_32_MedicalAilgment_YN = customerForm.medical_ailments;
	RequestData.QsLS_33_SurgeryPlanned_YN = customerForm.surgery;
	RequestData.Sumassured = customerForm.sumassured;
	RequestData.Total_InstPremium_ST = customerForm.InstallmentPremium_W_ST;
	RequestData.PremiumPayingTerm = customerForm.PremiumPayingTerm;
	RequestData.LA_Occupation = customerForm.Occupation;
	console.log(RequestData);
	
		if($m.networkConnected()){
			var service = new ServiceLibrary();
			utils.ShowProgress("Saving customer data..");
			var SavePIVCScreenINFOcallback = function (r){
				utils.HideProgress();
					if(r.Status == "Y") {
						uploadImages();
					//	$m.toast(r.Message);
						$m.alert("Customer Data is saved successfully we are redirecting you to the home page","Alert",function(){
							$m.open("com.cloudpact.mowbly.home", "/system/home.html", null);
						});
					} else {
						$m.alert("save customer data failed due to : "+ JSON.stringify(r));
						$m.logError("save customer data failed due to : "+ JSON.stringify(r));
					}
		
				}
			service.getSavePIVCScreenINFO(SavePIVCScreenINFOcallback, RequestData);
		}
}

$m.onClose(function(){
	var closePage = utils.GetPref("payment");
	if(!closePage){
	//	event.preventDefault();	
	} 
});