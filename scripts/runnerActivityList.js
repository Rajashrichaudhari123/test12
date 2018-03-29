/**
 * runnerActivity.js
 * @author CloudPact Technologies
 * @description : This script is used for displaying the policy details based on client id and policy number
 **/
$m.onReady(function(){
	juci.dataset("headerName","Runner Activity");
	searchHistory = $m.juci.findById("search-history");
	$m.juci.getControl("search-history").addListItemClick(openRunnerActivity, this, ".view");
	var dbcallback = function(dbhelper) {
		Runner_Activity.createTable(function create_table_success(){
	
	} ,function create_table_failure(){});
		dbHelper = dbhelper;
	};
	utils.GetDbhelper(dbcallback);
});


$m.onData(function(eventObject){
	initData(eventObject);
});

function initData(eventObject){
	var data = eventObject.data.search;
//	if (data == ""){
//		$m.alert("Enter Client Id or Policy no");
//		return;
//	}
	$m.juci.dataset("searchHistory",[]);
	if($m.networkConnected()){
		utils.ShowProgress("Searching...");
		var runnerActivityCallaback = function (r){
			if (r.length == 0){
				$m.alert("No data found");
				utils.HideProgress();
				return;
			}
			utils.PutPref("runner_activity",r);
			var updateCallback = function(res){
				utils.HideProgress();
				searchHistory.show();
				var runnerActivity = utils.GetPref("runner_activity");
				$m.juci.dataset("searchHistory",runnerActivity);
			};
			utils.PojoMultiReplace("Runner_Activity",r,updateCallback);
		};
		service = new ServiceLibrary();
		service.getRunnerActivityDetails(data,runnerActivityCallaback);
	} else {
		$m.logError("Sync failed: No internet connection");
		$m.alert("No internet connection");
	}
}

function searcher(documents,searchString){
	if(documents.ClientId.search(searchString)>-1 || documents.PolicyNo.search(searchString)>-1){
		return true ;	
	}
}

function openRunnerActivity(event){
	$m.open("saveRunnerActivity", "/Runner Activity/saveRunnerActivity.html",event.data);
}