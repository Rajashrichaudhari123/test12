var counter = 0;
var videoCount=0;
function SaveToUploadVideo(){
	if($m.networkConnected()){
		$m.showProgress("Loading Video...");
		new window.DB(CONSTANTS.DBName, function(dbHelper) {
			window.dbHelper = dbHelper;
			//var currUser = $m.getUsername();
			var tableObj = window["PDC_Video_Details"];
			tableObj.selectCompleteDataToSync(function(response){
				if(response.length == 0){
					$m.hideProgress();
					$m.alert("No Videos found");
				}
				if(response){
					for(var i= 0; i<response.length;i++){
						videoCount++;
						var currentDocument = response[i];
						var service = new ServiceLibrary();						
						var videoCallBack = function(resp){
							var result = JSON.stringify(resp.result.data);
							if(resp){
								$m.hideProgress();
								$m.alert("Video Uploaded successfully");
							}
						};
						service.doSyncVideoFiles(videoCallBack,currentDocument);			
					}
				}
			}, function(error){
				$m.hideProgress();
				$m.logError("Failed to fetch data for sync. reason ----"+JSON.stringify(error));
				$m.alert("Failed to fetch data for sync. reason ----"+JSON.stringify(error));
			});
		}, function(error) {
			$m.hideProgress();
			$m.logError("Unable to open database due to -- " + JSON.stringify(error));
			$m.alert("Unable to open database");		
		});
	}
	else{
		$m.hideProgress();
		$m.alert("No network connectivity!");
	}
}

function GetApplicationNo(){
	$m.juci.findById("acceptApplicatioNumber").show();
	$m.juci.findById("uploadDoc").show();
	$m.juci.findById("uploadDocsAndVideo").hide();
}

$m.onResume(function(eventObject) {
	$m.juci.findById("acceptApplicatioNumber").hide();
	$m.juci.findById("uploadDoc").hide();
	$m.juci.findById("uploadDocsAndVideo").show();
	videoImageArray=[];
});

//get the data form local host and call uploadImages
function SaveToUplodImages(){
	var AppNo = $m.juci.getControl("ApplicationNo").value();
	if($m.networkConnected()){
		
		var imageDetailsSuccessCallback = function(response) {
			if(response.rows.length == 0){
				$m.alert("No Data found");	
			}
			else{
				var res = JSON.stringify(response);
				for(var i= 0;i< response.rows.length;i++)
				{
					var doc=response.rows[i].DocumentTypeCode;
					if(doc.includes("PIVC_screen")){
						videoImageArray.push(new PDC_Image_Details(response.rows[i]));
					}
				}
				uploadImages();
			}
				
		};
		var imageDetailsFailureCallback = function(response){
			
			$m.logError("Read failed -- " + JSON.stringify(response));
			$m.alert("Error while fetching from database");	
		};
		PDC_Image_Details.SelectWithFilter(AppNo,imageDetailsSuccessCallback,imageDetailsFailureCallback);
	}
	else{
		$m.hideProgress();
		$m.alert("No network connectivity!");
	}
}

function getDocumentResponse(docItr){
	return function(response){
		docItr.step();
	};
}

var ServiceLibrary = function() {
	this.doSyncVideoFiles = function(res,currentDocument){
			if($m.networkConnected()){
			var request = $m.httpRequest({url: "http://124.124.218.136/rlife2/mowblyserver/videoUpload/rellife/prod/RlifeAssist","type": "POST"});
			request.addPart("TABLE", "PDC_Video_Details", "text/plain");
			request.addPart("Application_Number", currentDocument.Application_Number, "text/plain");
			request.addPart("Txn_ID", currentDocument.Txn_ID, "text/plain");
			if(currentDocument.Selfi_Video_Status != ""){
				request.addPart("Selfi_Video_Status", currentDocument.Selfi_Video_Status, "text/plain");
			}
			request.addPart("Personal_Video_Status", currentDocument.Personal_Video_Status, "text/plain");
			if(currentDocument.Selfi_Video_SyncStatus != ""){
				request.addPart("Selfi_Video_SyncStatus", currentDocument.Selfi_Video_SyncStatus, "text/plain");
			}
			request.addPart("Selfie_Camera_Available", currentDocument.Selfie_Camera_Available, "text/plain");
			if(currentDocument.Personal_Video_SyncStatus != ""){
				request.addPart("Personal_Video_SyncStatus", currentDocument.Personal_Video_SyncStatus, "text/plain");	
			}
			if(currentDocument.Cust_Salutation != ""){
				request.addPart("Cust_Salutation", currentDocument.Cust_Salutation, "text/plain");	
			}
			if(currentDocument.Cust_Name != ""){
				request.addPart("Cust_Name", currentDocument.Cust_Name, "text/plain");	
			}
			if(currentDocument.Cust_Email_ID != ""){
				request.addPart("Cust_Email_ID", currentDocument.Cust_Email_ID, "text/plain");	
			}
			if(currentDocument.Cust_Mobile_Number != ""){
				request.addPart("Cust_Mobile_Number", currentDocument.Cust_Mobile_Number, "text/plain");	
			}
			if(currentDocument.Scheduled_Date != ""){
				request.addPart("Scheduled_Date", currentDocument.Scheduled_Date, "text/plain");	
			}
			if(currentDocument.PIVC_Medical_Qs_Ans_Flag != ""){
				request.addPart("PIVC_Medical_Qs_Ans_Flag", currentDocument.PIVC_Medical_Qs_Ans_Flag, "text/plain");
			}
			request.addPart("Added_By", currentDocument.Added_By, "text/plain");
			currentDocument.Personal_Video_Path = currentDocument.Personal_Video_Path ? currentDocument.Personal_Video_Path : "";
			if(currentDocument.Personal_Video_Path != ""){
				request.addPart("Personal_Video", new $m.file(currentDocument.Personal_Video_Path,{level: $m.STORAGE_LEVEL}), "video/mp4", "personalVideoPath");	
			}
			if(currentDocument.Selfi_Video_Path != ""){
				request.addPart("Selfi_Video", new $m.file(currentDocument.Selfi_Video_Path,{level: $m.STORAGE_LEVEL}), "video/mp4", "selfiVideoPath");
			}
			request.send(res);
		} else{
			$m.alert("Network disconnected in between. Please try later.");
		}
	};

};

function gettype(){
	var currentUser = "";
		try{
			currentUser = {"code":$m.getUsername(),"name":$m.getUserAccount().customProperties.Login_Name,"usertype":$m.getUserAccount().customProperties.User_Type};	
		}catch(e){
			currentUser = {
				"usertype" : ""
			}
		}
	
	return currentUser.usertype;
}

//call saveImageDetails after sccess callback of privious  saveImageDetails
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
									console.log("uploadImages1");
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
															$m.toast("Data saved successfuly");
														}
													}
												} else {
													utils.HideProgress();
													$m.toast("Data saved successfuly");
													$m.close();
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
										$m.close();
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
								$m.close();
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
					$m.close();
				}
		} else {
			utils.HideProgress();
			$m.logError("Image details failed due to :"+ JSON.stringify(r));
		}
	};
	utils.ShowProgress("Saving Data please wait..");
    saveImageDetails(fp_callback,videoImageArray[0]);
}

//save the ImageDetails to server 
function saveImageDetails(res, currentDocument) {
	console.log("saveImageDetails");
	currentDocument.Txn_Id = '"'+currentDocument.Txn_Id+'"';
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
		 $m.logError("Network failed");
		$m.alert("Network disconnected in between. Please try later.");
	}
}