/*$m.juci.addDataset("testRef",{"Name":"","Age":"","Gender":""});
var dbHelper;

var CONSTANTS={
	DBName	:	"RelLife"
};

$m.onResume(function(){
	// Code to execute when the page is resumed
		var dbcallback = function(dbhelper) {
			dbHelper = dbhelper;
		};
		utils.GetDbhelper(dbcallback);
});


function onSubmitClick(){
	var datasetData = $m.juci.dataset("testRef");
	if (dbHelper) {
    		var Obj = new TestPojo(datasetData);
    	var insertAttendanceSuccessCallback = function(success) {
//							delete data.Login_DateTime;
//							service = new ServiceLibrary();
//							var passCheckOutCallback = function(list) {
//								if (list == "FAILURE") {
//									$m.alert(list);
//								} else {
//									checkin = {
//										"ischeckin": 1
//									};
//									$m.putPref("check_value", checkin);
//									$m.savePref();
//									$m.toast("You are Successfully Logged In & Your attendance marked for the day");
//									checkOutEnable();
//								}
//							};
//							service.PassCheckInOut(data,passCheckOutCallback);
//							$m.logInfo("Successfully inserted!");
					$m.alert("Successfully inserted");
						};
						var insertAttendanceFailureCallback = function(failure_response) {
							$m.logError("Read failed -- " + JSON.stringify(failure_response));
							$m.logInfo("Failed to insert");
						};
						Obj.insert(insertAttendanceSuccessCallback,insertAttendanceFailureCallback);
		}else {
			$m.alert("Error while opening database");
		}
}*/

$m.juci.addDataset("yourOptionsListKey",["udsuif","dayutaudiy"]);