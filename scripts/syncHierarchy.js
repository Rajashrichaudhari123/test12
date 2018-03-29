/**
 * synchierarchy.js
 * @author CloudPact Technologies
 * @description : This script is used for storing the advisor data into local db
 **/
$m.juci.addDataset("syncTeam","");
var currentUser;

$m.onResume(function(){
	currentUser = {"code":$m.getUsername(),"name":$m.getUserAccount().customProperties.Login_Name,"usertype":$m.getUserAccount().customProperties.User_Type};
});

function syncHierarchy(){
	if(gettype()!=='ADV' && gettype()!=='TPPR' && gettype()!=='TPADV'){
    	//TODO
    }else if(gettype() == 'TPPR'){
    	syncTpparHierarchy();
    }
	$m.showProgress("Syncing Sales Hierarchy...");
	var url = Constants.publicIP +"/mowblyserver/sshdatasvc/rellife/prod/RlifeAssist";
	var data = {
	     "code":currentUser.code,
		"codeCol":getColumnByUserType(currentUser.usertype),
		"action":"count"
	};
	$m.post(url,data,function(response){
		if(response.code === 200){
			// Success
			var result = response.result;
			result = JSON.parse(response.result.data);
			
			if(result.code == "103"){
					sync();
/*				var countlength = result.entities[0].count;	
				var ttm = countlength*TTOI;
				var tts = ttm/1000;
				var ttmn;
				if(tts > 60){
					ttmn = tts/60;
				}
				var msg;
				if(ttmn){
					msg = "Estimated Time for Sync is :" +ttmn+" minute(s)";
				}else{
					msg = "Estimated Time for Sync is :" +tts+" second(s)";
				}*/
			/*	$m.confirm({"title":"Time for sync",
							"message":"This might take a few moments. Do you wish to continue?", 
							"buttons": [{"label": "Yes"},
										{"label": "No"}]
							}, function(index){
					// Code to execute when the confirm dialog dismisses
					if(index == 0) {
						sync();
					} else if(index == 1) {
						$m.close();
					}
				});*/
			}else{
				var error = result.msg;
				$m.hideProgress();
					$m.alert("Unexpected server response.plz try later");
			}
			
		} else{
			// Error
			var errMsg = response.error.message;
			$m.hideProgress();
			$m.alert("Errror in request.please try later");
		}
	});	
}


function getColumnByUserType(usertype){
	switch(usertype){
		case "ZM":
			return "ZM_Code";
			break;
			
		case "RM":
			return "RM_Code";
			break;
			
		case "BM":
			return "BM_Code";
			break;
			
		case "SM":
			return "SM_Code";
			break;
			
		case "ADV":
			return "Adv_Emp_Code";
			break;
		
		case "AM":
			return "AM_Code";
			break;
			
		case "TM":
			return "BM_Code";
			break;
		
		case "CDASM":
			return "SM_Code";
			break;
		case "CDAADV":
			return "SM_Code";
			break;
		case "AGSM":
			return "SM_Code";
			break;
		case "AGPS":
			return "SM_Code";
			break;
			
	} 
}

function getData(){
url = Constants.publicIP +"/mowblyserver/sshdatasvc/rellife/prod/RlifeAssist";
var data = {
	     "code":currentUser.code,
		"codeCol":getColumnByUserType(currentUser.usertype),
		"action":"get"
	};
$m.post(url, data, function(response){
	if(response.code == 200){
		// Success
		var result = response.result;
		result = JSON.parse(response.result.data);
		shRows = result.entities;
		
		if(result.code == "103"){
			$m.juci.dataset("Sales_manager");
			processSHData();
		}else{
			$m.hideProgress();
			$m.alert("Unexpected server response.plz try later");
		}
	} else{
		// Error
		var errMsg = response.error.message;
		$m.hideProgress();
		$m.alert("Errror in request.please try later");
	}
});
}

function sync() {
	if(!$m.networkConnected()){
		$m.logError("Sync failed: No internet connection");
		$m.alert("No internet connection");
		return false;
	}
	//$m.logInfo("Inside sync");	
	getData();
}

function processSHData(){
	SHData.multiReplace(shRows,function(data){
		$m.hideProgress();
		syncTeam();
		 $m.toast("Synced  Hierarchy successfully!");
		 

		},function(error){
	
		//	$m.alert("Sync  Hierarchy is failed");
		console.log(error);
		});
	
}

function syncClose(){
	//$m.logInfo("outside sync");
	$m.alert("Records synched in your device sucessfully", "Sales Heirarchy", function(){
		$m.close();	
	});
}


	function syncTeam(){
		
		var time= new Date().getTime();
 
          time = new Date(time);
 
     var sync = time.toString("dd MMM yy hh:mm tt");
   $m.putPref("syncTeam",sync,true);
    $m.savePref();
    var Sync = $m.getPref("syncTeam");
    juci.dataset("syncTeam",Sync);
  
	}
	
function syncTpparHierarchy(){
	$m.showProgress("Syncing TPPR Hierarchy...");
	var url = Constants.publicIP +"/mowblyserver/sshtpddata/rellife/prod/RlifeAssist";
	var data = {
		"code":currentUser.code,
		"codeCol":getColumnByUserType(currentUser.usertype),
		"action":"count"
	};
	$m.post(url,data,function(response){
		if(response.code === 200){
			// Success
			var result = response.result;
			result = JSON.parse(response.result.data);
			
			if(result.code == "103"){
					syncTpd();
/*				var countlength = result.entities[0].count;	
				var ttm = countlength*TTOI;
				var tts = ttm/1000;
				var ttmn;
				if(tts > 60){
					ttmn = tts/60;
				}
				var msg;
				if(ttmn){
					msg = "Estimated Time for Sync is :" +ttmn+" minute(s)";
				}else{
					msg = "Estimated Time for Sync is :" +tts+" second(s)";
				}*/
			/*	$m.confirm({"title":"Time for sync",
							"message":"This might take a few moments. Do you wish to continue?", 
							"buttons": [{"label": "Yes"},
										{"label": "No"}]
							}, function(index){
					// Code to execute when the confirm dialog dismisses
					if(index == 0) {
						sync();
					} else if(index == 1) {
						$m.close();
					}
				});*/
			}else{
				var error = result.msg;
							$m.hideProgress();
			$m.alert("Unexpected server response.Please try later");
			}
			
		} else{
			// Error
			var errMsg = response.error.message;
				$m.hideProgress();
				$m.alert("Error in request.Please try later");
		}
	});	
}


function getColumnByUserType(usertype){
	switch(usertype){
		case "ZM":
			return "ZM_Code";
			break;
			
		case "RM":
			return "RM_Code";
			break;
			
		case "BM":
			return "BM_Code";
			break;
			
		case "SM":
			return "SM_Code";
			break;
			
		case "ADV":
			return "Adv_Emp_Code";
			break;
		
		case "AM":
			return "AM_Code";
			break;
			
		case "TM":
			return "BM_Code";
			break;
		
		case "CDASM":
			return "SM_Code";
			break;
		case "CDAADV":
			return "SM_Code";
			break;
		case "TPSM":
			return "SM_Code";
			break;
		case "TPPR":
			return "SM_Code";
			break;	
		case "TPADV":
			return "Adv_Emp_Code";
			break;
	} 
}

function getTpdData(){
url = Constants.publicIP +"/mowblyserver/sshtpddata/rellife/prod/RlifeAssist";
var data = {
			"code":currentUser.code,
		"codeCol":getColumnByUserType(currentUser.usertype),
		"action":"get"
	};
$m.post(url, data, function(response){
	if(response.code == 200){
		// Success
		var result = response.result;
		result = JSON.parse(response.result.data);
		shRows = result.entities;
		
		if(result.code == "103"){
			$m.juci.dataset("Sales_manager");
			processSHTpdData();
		}else{
				$m.hideProgress();
			$m.alert("Unexpected server response.Please try later");
		}
	} else{
		
		// Error
		var errMsg = response.error.message;
			$m.hideProgress();
				$m.alert("Error in request.Please try later");
	}
});
}

function syncTpd() {
	if(!$m.networkConnected()){
		$m.logError("Sync failed: No internet connection");
		$m.alert("No internet connection");
		return false;
	}
//	$m.logInfo("Inside sync");	
	getTpdData();
}

function processSHTpdData(){
	shTpdData.multiReplace(shRows,function(data){
		$m.hideProgress();
		syncTeam();
		 $m.toast("Synced Tpd Hierarchy successfully!");
		 

		},function(error){
			$m.hideProgress();
		//	$m.alert("Synce  Hierarchy is Failed");
		console.log(error);
		});
	
}