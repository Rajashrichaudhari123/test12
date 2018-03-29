/**
 * ExpertCall.js
 * @author CloudPact Technologies
 * @description : This script is used for expertcall.
 **/

var Ip = {
	"publicIp":Constants.publicIP+"/mowblyserver/"
};

// uploadimages callback
var uploadImagesCallback = function(res){
	//$m.logInfo("Upload Documents response..."+res);
	$m.hideProgress();
	currentUser = {"code":$m.getUsername(),"name":$m.getUserAccount().customProperties.Login_Name,"usertype":$m.getUserAccount().customProperties.User_Type};
	if(currentUser.usertype != 'ADV' && currentUser.usertype != 'TPPR' && currentUser.usertype != 'TPADV' && currentUser.usertype != 'AGADV' && currentUser.usertype != 'FLS' && currentUser.usertype !=='CNADV' && currentUser.usertype !=='PRADV' && currentUser.usertype !=='ENADV'){
		if(!window.dbHelper)
			initDB();
		else
			checkData();
			$m.juci.dataset("name","");
			juci.showDialog("dialog-teamlogin");
	} else if(currentUser.usertype == 'TPPR'){
		if(!window.dbHelper)
			initDB();
		else
			checkData();
			initNav();
			$m.juci.dataset("name","");
			juci.showDialog("dialog-teamlogin");	
	}else {
		openBIUrl();
	}
};

// saving data into local db
function  synctoServer(){
	var activity_id = productObj.ACTIVITY_ID;
	var dbHelperCallback = function(response){
		var successcallback = function(response){
			$m.showProgress("Please wait syncing expert call data...");
			utils.PutPref("ExpertCallData",response);
			if(response.length == 0){
				$m.hideProgress();
				$m.alert("No data found to sync expert call"+ response);	
			}
			uploadExportCallImages(uploadImagesCallback,response[0]);
		};
		var failurecalback = function(response){
			$m.hideProgress();
			$m.alert("Error while inserting to database");
			$m.logError("Failed to select into Expert_To_Call--- " + JSON.stringify(response));
		};
		Expert_To_Call.selectDataToInsert(activity_id,successcallback,failurecalback);	
	};
	utils.GetDbhelper(dbHelperCallback);
}

// syncing localdata into server
  function uploadExportCallImages(res,currentDocument) {
		if($m.networkConnected()){
			var request = $m.httpRequest({url: Ip.publicIp+"expertCallImagesUpload/rellife/prod/RlifeAssist","type": "POST"});
			request.addPart("TABLE", "Expert_To_Call", "text/plain");
			request.addPart("Lead_Id", currentDocument.Lead_Id, "text/plain");
			request.addPart("Activity_ID", currentDocument.Activity_ID, "text/plain");
			request.addPart("Activity_Result_Id", currentDocument.Activity_Result_Id, "text/plain");
			request.addPart("Updated_By", "122345", "text/plain");
			request.addPart("Marital_Status", currentDocument.Marital_Status, "text/plain");
			request.addPart("Mobile", currentDocument.Mobile, "text/plain");
			request.addPart("Name", currentDocument.Name, "text/plain");
			request.addPart("Income", currentDocument.Income, "text/plain");
			request.addPart("Gender", currentDocument.Gender, "text/plain");
			request.addPart("City", currentDocument.City, "text/plain");
			request.addPart("Added_By", currentDocument.Added_By, "text/plain");
			if(currentDocument.LifePlanner_Image1 != ""){
				request.addPart("LifePlanner_Image1", new $m.file(currentDocument.LifePlanner_Image1,{level: $m.STORAGE_LEVEL}), "image/png", "LifePlannerImage1");	
			}
			if(currentDocument.LifePlanner_Image2 != ""){
				request.addPart("LifePlanner_Image2", new $m.file(currentDocument.LifePlanner_Image2,{level: $m.STORAGE_LEVEL}), "image/png", "LifePlannerImage2");
			}
			if(currentDocument.LifePlanner_Image3 != ""){
				request.addPart("LifePlanner_Image3", new $m.file(currentDocument.LifePlanner_Image3,{level: $m.STORAGE_LEVEL}), "image/png", "LifePlannerImage3");
			}
			request.addPart("LifePlanner_Image4", new $m.file(currentDocument.LifePlanner_Image4,{level: $m.STORAGE_LEVEL}), "image/png", "LifePlannerImage4");
			request.addPart("LifePlanner_Image5", new $m.file(currentDocument.LifePlanner_Image5,{level: $m.STORAGE_LEVEL}), "image/png", "LifePlannerImage5");
			request.send(res);
		} else{
			$m.alert("Network disconnected in between. Please try later.");
		}
    }