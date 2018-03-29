/**
 * medicalCfr.js
 * @author CloudPact Technologies
 * @description : This script is used for viewing the medical cfr
 **/
$m.juci.addDataset("date","");
$m.juci.addDataset("status","");
$m.juci.addDataset("medicaltest",[]);
$m.juci.addDataset("tpadata",[]);

var customerDetails = {
	"CustomerName":"",
	"ClientID":"",
	"ApplicantCfrOpenDate":"",
	"ProductName":"",
	"ApplicantCfrDeadLine":"",
	"ApplicationNumber":"",
	"FirstPremiumAmount":"",
	"Status":""
};

$m.juci.addDataset("customerDetails",customerDetails);

$m.onReady(function(){	
	juci.dataset("headerName","Medical Cfr");
	var head = document.getElementsByClassName("juci_panel_title");
	juci.viewModel.applyBinding(head[0]);
	$m.juci.dataset("alertcount","3");
});

$m.onData(function(eventObject){
	 //Code to execute when a data is received from parent page
	var data = eventObject.data;
	var cfrobj = data.data;
	$m.juci.dataset("customerDetails",cfrobj);
	$m.juci.dataset("date",cfrobj.ApplicantCfrOpenDate);
	$m.juci.dataset("status",cfrobj.ApplicantCfrStatus);
	if($m.networkConnected()){
		$m.showProgress("Fetching Data...");
		service = new ServiceLibrary();
		service.GetMedicalTests(function(list){
			if(list.Type == "0"){
				
			}else{
				$m.juci.dataset("medicaltest",list.Tests);
			}
		},cfrobj);
	}else{
		$m.alert("No Internet connection!");
	}
});

function callCustomer(e){
	var number = e.wrappedData.MobileNumber();
	if(number){
		$m.callContact(number);	
	}else{
		$m.alert("No mobile number found!");
	}
}

function emailCustomer(e){
	var email = e.wrappedData.EmailID();
	if(email){
		$m.email([email], '' , '');
	}else{
		$m.alert("No Email ID found!");
	}
}

function smsCustomer(e){
	var sendsms = e.wrappedData.MobileNumber();
	if(sendsms){
		$m.sms([sendsms], '');
	}else{
		$m.alert("No mobile number found!");
	}
	
}


var recordsShow = 0;
function showTpaList(){
	
	var readTPAListCallback = function(readResponse){
		if(readResponse != -1 && readResponse != 0){
			
			var fullData = JSON.parse(readResponse);
			recordsShow = recordsShow + 20;
			$m.juci.dataset("tpadata", fullData.slice(0,recordsShow));
		
		}else{
			if(readResponse == -1){
				$m.alert("Please sync to fetch TPA list");
			}else{
				$m.alert("Error while reading data.Please try again");
			}
		}	
	};
	readTPAList(readTPAListCallback);
}

function readTPAList(callback){
	var fileObj = $m.file("tpadata.txt",{"level": $m.APP_LEVEL, "storageType": $m.SDCARD});
	$m.fileExists(fileObj, function(response){
		if(response.code == -1) {
			return;
		}
		if(response.result){
			$m.readFile(fileObj, function(response){
				if(response.code == -1) {
					return;
				}
				if(response.code){
					var fileContent = response.result;
					callback(fileContent);
				} else{
					var errMsg = response.error.message;
					callback(0);
				}
			});
		}else {
			callback(-1);	
		}
	});
}

function open_dialogue(){
	     showTpaList();
		$m.juci.showDialog("tpadialog-box");
		
	
}

function exit(){
	juci.hideDialog("tpa_dialogbox");
}

function openUms(){
	$m.open("Ums Status","/Call For Requirement/umsstatus.html");
	//TODO
}

function onCloseClick(){
	juci.hideDialog("tpadialog-box");
}
