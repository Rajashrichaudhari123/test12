/**
 * MessageSchedular.js
 * @author CloudPact Technologies
 * @description : This script is for Message Scheduling.
 **/

var eventData;

$m.onData(function(eventObject){
	var data = eventObject.data;
	initData(data);
	var dbhelpercallback = function(response){
		console.log(response);
	};
	utils.GetDbhelper(dbhelpercallback);
});


function initData(data){
	var nomineeData = utils.GetPref("messageSchedular");
	var customerData = $m.juci.dataset("customerData");
	customerData.nomineeSalutation = nomineeData.NOM_Salutation;
	customerData.nomineeName = nomineeData.NOM_Name;
	customerData.nomineeEmail = nomineeData.NOM_EmailId;
	customerData.nomineeMobileNo = nomineeData.NOM_Mobileno;
	$m.juci.dataset("customerData",customerData);
}

function onCustomerSubmit(e){
	eventData = e;
	var videoPath = utils.GetPref("PersonalVideo");
	var planObj = utils.GetPref("plandetails");
	var selfieMedicalQues = utils.GetPref("SelfieVideoDetails");
	var selfieVideoPath = utils.GetPref("selfiePath");
	
	var successCallback = function (res){
		var personalCompressedPath = utils.GetPref("personalCompressedPath");
		var video_path = utils.GetPref("videoPath");
		var videoResponse = {};
		videoResponse.Personal_Video_Path = video_path;
		videoResponse.Personal_Video_Status = "Y";
		videoResponse.Added_On = new Date().getTime();
		videoResponse.Personal_Video_SyncStatus = "Y";
		videoResponse.Cust_Name = eventData.data.nomineeName;
		videoResponse.Cust_Email_ID = eventData.data.nomineeEmail;
		videoResponse.Cust_Mobile_Number = eventData.data.nomineeMobileNo;
		videoResponse.Scheduled_Date = eventData.data.calender.toString("yyyy-MM-dd");
		videoResponse.Application_Number = planObj.Application_Number;
		videoResponse.iscompleted = "1";
		videoResponse.Personal_Video_SyncStatus = "Y";
		
		var videoInsertSuccessCallback = function(res){
			var callback = function(){
				//$m.open("com.cloudpact.mowbly.home", "/system/home.html", null);
				$m.open("Sync","/Applications/sync.html","autosync");
			};
			var appno = utils.GetPref("plandetails");
			$m.alert("Your proposal form with the following Application Number - "+appno.Application_Number+" has been saved successfully","Alert",callback);
		};
		var videoInsertFailureCallback = function(response){
			$m.alert("Error while inserting to database");
			$m.logError("Failed to insert into PDC_Video_Details--- " + JSON.stringify(response));
			$m.logInfo("Failed to insert");
		};
		var customerData = new PDC_Video_Details(videoResponse);
		customerData.update(videoInsertSuccessCallback,videoInsertFailureCallback);		
	};
	var failureCallback = function(response){
		$m.alert("Error while inserting to database");
		$m.logError("Failed to retrive into PDC_Video_Details--- " + JSON.stringify(response));
	};
	PDC_Video_Details.SelectWithFilter(planObj.Application_Number,successCallback,failureCallback);
}

function validateEmail(emailText) {
	if (!emailText) {
		return "";
	}
	if (emailText[emailText.length - 1].search(/[a-zA-Z]/) == -1) {
		$m.alert("Enter valid Email Id");
		//return emailText.substring(0,emailText.length-1);
		return "";
	}
	return emailText;
}

function assignDate(event) {
	var dob = $m.juci.dataset("customerData").calender;
	var newdob = new Date(dob).toDateString();
	var currentDate =  new Date().toDateString();
	if(dob < new Date() && newdob!= currentDate){
		$m.juci.getDataset("customerData")().calender('');
		$m.alert("Date should not lesser than  Current Date");
	}
}
