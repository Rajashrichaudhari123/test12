/**
 * data-retrieval.js
 * @author CloudPact Technologies
 * @description : This script is used for fetching all local table records and storing into the server.
 **/
 
var appDataForm = {"tableName": {"name": "", "tablename": ""}, "appNumber": "","leadId":""};
var tablesList = [
	{"name": "Customer Details", "tablename":"PDC_Customer_Details"},
	{"name": "Existing Policies Details", "tablename":"PDC_EXISITINGPOLICIES_Details"},
	{"name": "Family History Details", "tablename":"PDC_FAMILYHISTORY_Details"},
	{"name": "Life Style Details", "tablename":"PDC_LifeStyle_Details"},
	{"name": "Payment Details", "tablename":"PDC_Payment_Details"},
	{"name": "Plan Details", "tablename":"PDC_Plan_Details"}
];

var leadsTableList = [
	{"name": "New Lead", "tablename":"saveNewLead"},
	{"name": "Runner Activity", "tablename":"saveRunnerActivity"},
	{"name": "Activity Planning", "tablename":"saveActivityPlanning"},
	{"name": "Activity Result", "tablename":"saveActivityResult"},
];
juci.dataset("appDataForm", appDataForm);
juci.dataset("tablesList", tablesList);
juci.dataset("tablesList", leadsTableList);
$m.juci.addDataset("appNo",true);
$m.juci.addDataset("leadNo",true);

$m.onResume(function(){
	juci.dataset("appDataForm", appDataForm);
	juci.dataset("tablesList", tablesList);
});

function formatApplicationNumber(data){
	return data.toUpperCase();
}

function callTableOptions(event){
	var leadOrApp = event.value;
	var testNumber  = /^\d+$/.test(leadOrApp);
	if(testNumber){
		$m.juci.dataset("tablesList", leadsTableList);
	}else{
		$m.juci.dataset("tablesList", tablesList);
	}
}

function onDataRetrieve(event){
	if(event.data.appNumber.length){
		new window.DB(CONSTANTS.DBName, function(dbHelper) {
			window.dbHelper = dbHelper;
			event.data.appNumber = event.data.appNumber.toUpperCase();
			var tableObj = window[event.data.tableName.tablename];
			$m.showProgress("Retrieving Records..");
			tableObj.SelectWithFilter(event.data.appNumber,function(success_response){
				$m.hideProgress();
				$m.logDebug("Read Success -- " + JSON.stringify(success_response));
				if(success_response.rows.length > 0){
					$m.showProgress("Storing Records..");
					$m.post(Constants.publicIP+"/mowblyserver/smStoreTempDataFile/comp/prod/RlifeAssist", {"appNo": event.data.appNumber, "tableName": event.data.tableName.tablename, "data": success_response.rows[0]}, function(response){
						$m.hideProgress();
						if(response.code == 200){
							// Success
							var result = response.result;
							juci.dataset("appDataForm", appDataForm);
							juci.dataset("tablesList", tablesList);
							$m.alert("Data Successfully Retrieved. Thank You!");
						} else{
							// Error
							var errMsg = response.error.message;
							juci.dataset("appDataForm", appDataForm);
							juci.dataset("tablesList", tablesList);
							$m.alert("Error Message - "+errMsg);
						}
					});
				} else {
					$m.hideProgress();
					$m.alert("No Records available");
				}
			},function(failure_response){
				$m.logError("Read failed -- " + JSON.stringify(failure_response));
				$m.alert("Error while fetching from database");
			});
		});
	} else {
		$m.alert("Please enter valid information to retrieve records.");
	}
}

function complexComparator(i1, i2){
	return i1.name == i2.name;
}

function formatTableName(item){
	return item.name;
}