$m.onReady(function(){
	initReady();
});

$m.onResume(function() {
	initResume();
});

$m.onClose(function() {
	setClose();
});

/** Setting the header name on page load**/
function initReady(){
	$m.juci.dataset("headerName","MyCandidate");
	var dbcallback = function(dbhelper) {
		dbHelper = dbhelper;
	};
	utils.GetDbhelper(dbcallback);
}

function initResume(){
	hideMenu();
}

/** Clearing the form**/
function setClose(){
	$m.juci.dataset("newCandidateForm",bindingObject.saveCandidateForm);
	var candidateForm = utils.GetControl("candidateForm");
	candidateForm.clearValidation();
}

/** Checking the network bandwidth and save the planning details**/
var checkingNetworkSpeedCallback = function(res){
	utils.HideProgress();
	saveForm(datasetData);
};

var message = "Your Network bandwidth is below 250 kbps.It will take some time to sync the data.Do you want to Proceed?";
utils.CheckingNetworkSpeed(message,checkingNetworkSpeedCallback);

function SaveCandidateDetails(event) {
		datasetData = $m.juci.dataset("newCandidateForm");
		datasetData.Department = datasetData.Department.LA_CODE;
		datasetData.iscompleted = "1";
		var check_data = checkSUCode(datasetData.SU_Code);
		if(check_data == undefined){
			$m.alert("Please enter the Proper SU Code","Alert",function(){
				return;
			});
		}else{
			if (dbHelper) {
	    		var Obj = new saveCandidateDetails(datasetData);
	    		var insertCallback = function() {
						if ($m.networkConnected()) {
							$m.showProgress("Checking your network bandwidth please wait...");
							utils.NetworkUtils();
							//saveForm(datasetData);
						} else {
							$m.alert(messages.NoNetworkConnectivity,"Network Alert", function() {
								$m.hideProgress();
							});
						  }
	    		};
				utils.PojoInsert("saveCandidateDetails", insertCallback, Obj);
			}else {
				$m.alert("Error while opening database");
			}
		}
}

function saveForm(datasetData){
	$m.showProgress("Syncing data..");
	var service = new ServiceLibrary();
	var callback = function(res){
		if (res.Status == "Y") {
			$m.alert("Record inserted successfully to server");
			utils.ClosePage();
		} else {
			$m.logError("Failed to insert My Candidate response is" + ' ' + res.Status);
			$m.alert("Failed to insert My Candidate response is" + ' ' + res.Status, "Failed to Insert", function() 
			{
				utils.ClosePage();
			});
		}
	};
	service.saveCandidateDetails(callback,datasetData);
}

var check_value = false;
function checkSUCode(event){
	var value;
	if(event.type == "afterchange"){
		value = event.value;
	}else{
		value = event;
	}
	value = value.toUpperCase();
	var candidate_types = candidateList.SU_Code;
	for(var i=0 ;i < candidate_types.length ; i++){
		if(value == candidate_types[i]){
			check_value = true;
			return check_value;
		}
	}
	if(check_value == false){
		$m.alert("Please enter the Proper SU Code","Alert",function(){
				return;
			});
	}
}