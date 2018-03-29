$m.juci.addDataset("uml_status",[]);

var uml_status={
	
	"ApplicationNumber":"",
	"CaseType":"",
	"Comments":"",
	"CustomerName":"",
	"DcCode":"",
	"DcLocation":"",
	"DcName":"",
	"DcState":"",
	"DelayReason":"",
	"FifthScheduleDate":"",
	"FifthScheduleStatus":"",
	"FinalStatus":"",
	"FirstScheduleDate":"",
	"FirstScheduleStatus":"",
	"FourthScheduleDate":"",
	"FourthScheduleStatus":"",
	"LaStatus":"",
	"LevelDetails":"",
	"Levels":"",
	"LtrfNo":"",
	"MedicalReceivedTpaDate":"",
	"MedicalUploadDate":"",
	"PhotoAttached":"",
	"ProcessDate":"",
	"Processed":"",
	"QcFinalStatus":"",
	"RinNo":"",
	"RiskLocation":"",
	"SecondScheduleDate":"",
	"SecondScheduleStatus":"",
	"ServiceType":"",
	"Source":"",
	"ThirdScheduleDate":"",
	"ThirdScheduleStatus":"",
	"TpaBranch":"",
	"TpaName":"",
	"Tpacode":"",
	"UmsQcDate":"",
	"WorkFlowStatus":""
}

$m.juci.dataset("uml_status",uml_status);

$m.onData(function(eventObject){
	// Code to execute when a data is received from parent page
		juci.dataset("headerName","umsstatus");
        var id= "AA080273";
		if($m.networkConnected()){
		$m.showProgress("Fetching Data...");
		service = new ServiceLibrary();
		service.GetUmsStatus(function(status){
		          var data= status;
		          
				$m.juci.dataset("uml_status",status);
			
		},id);
	}else{
		$m.alert("No Internet connection!");
	}
});






























