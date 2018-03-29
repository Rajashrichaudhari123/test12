$m.juci.addDataset("appNumber","");
var selfiePath;
var personalPath;
var compressedPatharr = [];
var mowblyArr = [];

$m.onResume(function(){
	compressedPatharr = [];
	mowblyArr = [];
	$m.juci.dataset("headerName","Video Retrieveal");
});

function retriveVideoFromSd() {
	utils.ShowProgress("Retrieving videos..");
	compressedPatharr = [];
	var appNo = $m.juci.dataset("appNumber");
	var compressedFolderPath = "/Compressor/Compressed Videos";
	var responseCallback = function (res) {
		if(res.code == 1){
			$m.hideProgress();
			var responseData = res.result;
			for(var i=0;i<responseData.length;i++) {
				if(responseData[i].path.search(appNo) != -1){
					compressedPatharr.push(responseData[i]);
				}
			}
			console.log("compressedPatharr" + JSON.stringify(compressedPatharr));
			retrivePathFromMowblyFolder(compressedPatharr);
		} else {
			$m.hideProgress();
			$m.alert(res.error.message);
		}
	};
	appNo = appNo.toUpperCase();
	$m.getFilesFromSD(compressedFolderPath,responseCallback);
}

var compressVideoCallback = function (r){
	console.log(r);	
	var compressedPath = {
		"path":r
	};
	compressedPatharr.push(compressedPath);
	console.log("compression : "+ JSON.stringify(compressedPatharr));
	console.log("1 push server");
	pushVideoToServer(compressedPatharr);
};

function retrivePathFromMowblyFolder(videoPathArray) {
	mowblyArr = [];
	var appNo = $m.juci.dataset("appNumber");
	var mowblyFolderPath = "/mowbly";
	var responseCallback = function (res) {
		if(res.code == 1){
			$m.hideProgress();
			var responseData = res.result;
			for(var i=0;i<responseData.length;i++) {
				if(responseData[i].path.search(appNo) != -1){
					mowblyArr.push(responseData[i]);
				}
			}
			console.log("mowblyArr" + JSON.stringify(mowblyArr));
			for(var k=0;k<mowblyArr.length;k++){
				if(mowblyArr[k].path.search("PersonalVideo") != -1) {
					var CompressPath = mowblyArr[k].path.substring(1);
					console.log("Compression Path " + JSON.stringify(CompressPath));
					compressVideos(CompressPath,appNo+"-"+"PersonalVideo",compressVideoCallback);		
				} else {
					console.log("2 push server");	
					pushVideoToServer(compressedPatharr);
				}
			}
			if(mowblyArr.length == 0) {
				console.log("3 push server");
				pushVideoToServer(compressedPatharr);
			}
			
		} else {
			$m.hideProgress();
			$m.alert(res.error.message);
		}
	};
	utils.ShowProgress("Retrieving videos..");
	appNo = appNo.toUpperCase();
	$m.getFilesFromSD(mowblyFolderPath,responseCallback);
}

function compressVideos(path,filename,callback) {
	var compressionCallback = function (r) {
		if(r.code == 1) {
			utils.HideProgress();
			var compressedPath = r.result.CompressedFilePath;
			callback(compressedPath);
		}else if(r.code == 0) {
			$m.hideProgress();
			$m.alert("Compression Failed due to "+ r.error.message);
			$m.logError("Compression Failed due to "+ r.error.message);
		}
	};
	utils.ShowProgress("Compressing Videos, please wait.");
	$m.compressVideo(path,filename,compressionCallback);
}

function pushVideoToServer(arr){
	if(arr.length == 0){
		$m.alert("No Video Found..");
		return;
	}
	var currentDocument = {};
	var appNo = $m.juci.dataset("appNumber");
	currentDocument.Application_Number = appNo;
	currentDocument.Txn_ID = (utils.GetRandomNum()).toString();
	if(arr[0]) {
		currentDocument.Selfi_Video_Status = "Y";
		currentDocument.Selfi_Video_Path = arr[0].path ? arr[0].path : "" ;
	} else {
		currentDocument.Selfi_Video_Status = "N";	
	}
	if(arr[1]) {
		currentDocument.Personal_Video_Status = "Y";
		currentDocument.Personal_Video_SyncStatus = "Y";
		currentDocument.Personal_Video_Path = arr[1].path ? arr[1].path : "" ;
	} else {
		currentDocument.Personal_Video_Status = "N";
		currentDocument.Personal_Video_SyncStatus = "N";
	}
	currentDocument.Selfi_Video_SyncStatus = "Y" ;
	currentDocument.Selfie_Camera_Available = "Y" ;
	currentDocument.Added_By = $m.getUsername();
	console.log("Current Documents " + JSON.stringify(currentDocument));
	
	var service = new ServiceLibrary();	
	utils.ShowProgress("Pushing videos to server");
		var videoCallBack = function(resp){
			if(resp.result.data) {
				var result = JSON.stringify(resp.result.data);
				if(resp){
					console.log("Final Response " + JSON.stringify(resp));
					$m.hideProgress();
					$m.alert("Video Uploaded successfully");
				}	
			} else {
				$m.alert("Video Insert Failed due to :" + JSON.stringify(resp));
			}
		};
	service.doSyncVideoFiles(videoCallBack,currentDocument);
}

var ServiceLibrary = function() {
	this.doSyncVideoFiles = function(res,currentDocument){
		if($m.networkConnected()){
			var request = $m.httpRequest({url: Constants.publicIP+"/mowblyserver/videoUpload/rellife/prod/RlifeAssist","type": "POST"});
			request.addPart("TABLE", "PDC_Video_Details", "text/plain");
			request.addPart("Application_Number", currentDocument.Application_Number, "text/plain");
			request.addPart("Txn_ID", currentDocument.Txn_ID, "text/plain");
			request.addPart("Selfi_Video_Status", currentDocument.Selfi_Video_Status, "text/plain");
			request.addPart("Personal_Video_Status", currentDocument.Personal_Video_Status, "text/plain");
			request.addPart("Selfi_Video_SyncStatus", currentDocument.Selfi_Video_SyncStatus, "text/plain");
			request.addPart("Selfie_Camera_Available", currentDocument.Selfie_Camera_Available, "text/plain");
			if(currentDocument.Personal_Video_SyncStatus != ""){
				request.addPart("Personal_Video_SyncStatus", currentDocument.Personal_Video_SyncStatus, "text/plain");	
			}
			request.addPart("Added_By", currentDocument.Added_By, "text/plain");
			currentDocument.Personal_Video_Path = currentDocument.Personal_Video_Path ? currentDocument.Personal_Video_Path : "";
			if(currentDocument.Personal_Video_Path != ""){
				request.addPart("Personal_Video", new $m.file(currentDocument.Personal_Video_Path,{level: $m.STORAGE_LEVEL}), "video/mp4", "personalVideoPath");	
			}
			if(currentDocument.Selfi_Video_Path != ""){
				request.addPart("Selfi_Video", new $m.file(currentDocument.Selfi_Video_Path,{level: $m.STORAGE_LEVEL}), "video/mp4", "selfiVideoPath");
			} else {
				$m.alert("No Video Found");
				return;
			}
			request.send(res);
		}else{
			$m.toast("Network got disconnected while uploading the document!");
		}	
	};

};

function onReset() {
	$m.juci.dataset("appNumber","");
}