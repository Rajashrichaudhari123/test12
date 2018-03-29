/**
 * activityPlanning.js
 * @author CloudPact Technologies
 * @description : This script is for planning the activity with lead type
 **/
var ip_sub_activity;
var dbHelper;

$m.juci.addDataset("newPlanningForm", bindingObjInputManagement.ActivityPlanning);
$m.juci.addDataset("activity_subtype", []);
$m.juci.addDataset("activity_option", []);
$m.juci.addDataset("AdvisorStatus", ["IF","TR"]);
$m.juci.addDataset("with_whom", with_whom);
$m.juci.addDataset("activity_time", activity_time);
$m.juci.addDataset("Subtype", false);
$m.juci.addDataset("SubtypeOption", false);
$m.juci.addDataset("subDropDown",subDropdowns);
$m.juci.addDataset("campaignNames",Campaign_Names);
$m.juci.addDataset("leadTypeFlsRemarks",false);
var datasetData={};
var advisorList;


$m.onReady(function(){
	initReady();
});

$m.onResume(function() {
	initResume();
});

$m.onData(function(eventObject) {
 	initData(eventObject);
});

$m.onClose(function() {
	setClose();
});

/** Setting the header name on page load**/
function initReady(){
	$m.juci.dataset("headerName","Super Express");
}

function initResume(){
	$m.removePref("advisorDetails");
	$m.removePref("subTypeOptions");
}

/** Checking the network bandwidth and save the planning details**/
var checkingNetworkSpeedCallback = function(res){
	utils.HideProgress();
	saveForm(datasetData);
};

var message = "Your Network bandwidth is below 250 kbps.It will take some time to sync the data.Do you want to Proceed?";
utils.CheckingNetworkSpeed(message,checkingNetworkSpeedCallback);


/** Getting the lead details and initalizing the local database**/
function initData(eventObject){
	$m.hideProgress();
	var agadvAdvName = [];
	advisorList = $m.getPref("advisorList");
	if(gettype() !=='AGADV' && gettype() !=='TPADV' && gettype() !=='CNADV' && gettype() !=='PRADV' && gettype() !=='ENADV'){
		$m.juci.dataset("activity_subtype",advisorList);
	}else{
		var advisor_Name = $m.getUserAccount().customProperties.Login_Name;
		agadvAdvName.push(advisor_Name);
		$m.juci.dataset("activity_subtype",agadvAdvName);
	}
	$m.juci.dataset("Subtype", false);
	$m.juci.dataset("SubtypeOption", false);
	//$m.juci.getControl("campaign").enable();
	var data = eventObject.data;
	var dbcallback = function(dbhelper) {
		dbHelper = dbhelper;
		juci.getControl("activity-type").enable();
		if(data == "Exisiting Advisor"){
			$m.putPref("subTypeOptions",true);
			$m.savePref();
			juci.getControl("activity-type").disable();
			juci.getControl("activity-subtype").value(null);
			var planningform = $m.juci.dataset("newPlanningForm");
			planningform.Advisor_Name = $m.getUserAccount().customProperties.Login_Name;
			planningform.Activity = data;
			planningform.Activity = setValueFromOptions("activity", {
					"LA_CODE": "EXADV"
				}, localLaComparator);
			if(gettype() !=='AGADV' && gettype() !=='TPADV' && gettype() !=='CNADV' && gettype() !=='PRADV' && gettype() !=='ENADV'){
				planningform.Advisor_SAPCode = getAdvisorName(data.Advisor_Code);
			}else{
				planningform.Advisor_SAPCode = agadvAdvName;
			}
			$m.juci.dataset("newPlanningForm", planningform);
			callActivitySubType(planningform.Activity);
			$m.juci.getControl("with-whom").hide();
		}else {
			juci.getControl("activity-type").disable();
			juci.getControl("activity-subtype").value(null);
			$m.juci.getControl("with-whom").show();
			var planningform = $m.juci.dataset("newPlanningForm");
			planningform.Lead_Id = data.Lead_Id;
			planningform.With_Whom = data.Name;
			planningform.Advisor_Name = $m.getUserAccount().customProperties.Login_Name;
			planningform.Activity = data.Lead_Type;
			planningform.Lead_Type = data.Lead_Type;
			if(gettype() != 'FLS'){
				if (planningform.Activity == "Recruitment") {
					planningform.Activity = setValueFromOptions("activity", {
						"LA_CODE": "REC"
					}, localLaComparator);
				} else if (planningform.Activity == "New Business" || planningform.Activity == "Exisiting Customer" || planningform.Activity == "Renewal") {
					planningform.Activity = setValueFromOptions("activity", {
						"LA_CODE": "JOINNB"
					}, localLaComparator);
				}
			}
			if(gettype() == 'FLS') {
				planningform.Planning_Remarks = data.Planning_Remarks;
				if(planningform.Planning_Remarks){
					$m.juci.dataset("leadTypeFlsRemarks",true);
				}else{
					$m.juci.dataset("leadTypeFlsRemarks",false);
				}
				$m.juci.addDataset("leadTypeFlsRemarks",false);
				planningform.Sub_Activity_Options = data.Sub_Activity_Options;
			}
			if(gettype() =='AGADV' || gettype() =='TPADV' || gettype() =='CNADV' || gettype() =='PRADV' || gettype() =='ENADV'){
				planningform.Advisor_SAPCode = agadvAdvName;
				$m.juci.dataset("newPlanningForm", planningform);
				callActivitySubType(planningform.Activity);
			}else if(gettype() =='FLS'){
				planningform.Advisor_SAPCode = agadvAdvName;
				$m.juci.dataset("newPlanningForm", planningform);
			}else{
				planningform.Advisor_SAPCode = getAdvisorName(data.Advisor_Code);
				$m.juci.dataset("newPlanningForm", planningform);
				callActivitySubType(planningform.Activity);
			}
		}
		ip_sub_activity = data.Sub_Activity_Options;
	};
	utils.GetDbhelper(dbcallback);
}

/** Clearing the form**/
function setClose(){
	$m.juci.dataset("newPlanningForm", bindingObjInputManagement.ActivityPlanning);
	var planningForm = utils.GetControl("planningForm");
	planningForm.clearValidation();
}

/** Checking the network**/
function SavePlanningDetails(event) {
		var subopt = "";
		var deviceCallBack = function(response){
			var deviceId = response.result;
			datasetData = $m.juci.dataset("newPlanningForm");
			var locationCallback = function(lat, long) {
				datasetData.Latitude = lat;
				datasetData.Longitude = long;
				datasetData.Activity_Date = datasetData.Activity_Date instanceof Date ? datasetData.Activity_Date.getTime() : datasetData.Activity_Date;
				datasetData.Sub_Activity = datasetData.Sub_Activity.name ? datasetData.Sub_Activity.name : datasetData.Sub_Activity[0];
				//datasetData.Sub_Activity = datasetData.Sub_Activity ? datasetData.Sub_Activity :null;
				datasetData.Sub_Activity_Options = datasetData.Sub_Activity_Options ? datasetData.Sub_Activity_Options :null;
				if(gettype() !=='AGADV' && gettype() !=='FLS' && gettype() !=='TPADV' && gettype() !=='CNADV' && gettype() !=='PRADV' && gettype() !=='ENADV'){
					datasetData.Advisor_SAPCode = datasetData.Advisor_SAPCode ? getAdvisorCode(datasetData.Advisor_SAPCode) : datasetData.Advisor_SAPCode;
				}else{
					datasetData.Advisor_SAPCode = utils.GetLoginCode();
				}
				datasetData.Activity = datasetData.Activity.Description;
				datasetData.Activity_Time = datasetData.Activity_Time ? datasetData.Activity_Time.hour + ':' + ((datasetData.Activity_Time.minute < 10) ? ('0'+datasetData.Activity_Time.minute):datasetData.Activity_Time.minute) + " " + datasetData.Activity_Time.meridian : "";
				datasetData.Device_Id = deviceId;
				datasetData.Lead_Id = datasetData.Lead_Id ?datasetData.Lead_Id :null;
				datasetData.Sync_Txn_Id = utils.GetTimeStamp();
				datasetData.Address = "";
				datasetData.Added_By = utils.GetLoginCode();
				datasetData.Sync_by = utils.GetLoginCode();
				datasetData.iscompleted = "1";
		        if (dbHelper) {
					var tablename = "saveActivityPlanning";
					var responsecallback = function(res){
						if(res.length > 0){
							// TODO : prepare object from this dataset
							var key = tablename+"_dbtableobject";
							window[key] = res;
							console.log(res);
							var Obj = new saveActivityPlanning(datasetData);
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
							utils.PojoInsert(tablename, insertCallback, Obj);
						}else{
							$m.alert("Can not save data at this movement");
							return;
						}
					};
					getTableInfo(tablename,responsecallback);
				}else {
					$m.alert("Error while opening database");
				}
		};
		utils.GetLocation(12000,true,locationCallback);
	};
	utils.GetDeviceId(deviceCallBack);
}

/** Intializing the advisor name based on the lead type and call the activity sub type dropdown**/
function callActivitySubType(data) {
	var activity_type;
	var campaignList;
	var agadvAdvName = [];
	if (typeof data == "object") {
		activity_type = data.Description();
	} else {
		activity_type = data.Description();
	}
	juci.getControl("activity-subtype").value(null);
	juci.getControl("activity-subtype-opt").value(null);
	//juci.getControl("campaign").value(null);
	var planningDetails = 	$m.juci.dataset("newPlanningForm");
	if (activity_type == "Exisiting Customer" || activity_type == "Exisiting Advisor" || activity_type == "Renewal") {
		if(planningDetails.Advisor_SAPCode){
			var advisor_Name = $m.getUserAccount().customProperties.Login_Name;
			agadvAdvName.push(advisor_Name);
			advisorName = planningDetails.Advisor_SAPCode ? planningDetails.Advisor_SAPCode : agadvAdvName;
			planningDetails.Sub_Activity = advisorName;
		}
		changeLabel("activity-subtype", "Advisor Name",true);
		campaignList = existingcampaign;
		//$m.juci.getControl("campaign").hide();
	} else if (activity_type == "Recruitment") {
		$m.juci.dataset("activity_subtype", recruitment);
		changeLabel("activity-subtype", "Activity Subtype",true);
		campaignList = reccampaign; 
		//$m.juci.getControl("campaign").hide();
	} else if (activity_type == "Joint Call for NB") {
		//		GetADVbySM($m.getUsername(), "activity_subtype");
		if(planningDetails.Advisor_SAPCode){
			var advisor_Name = $m.getUserAccount().customProperties.Login_Name;
			agadvAdvName.push(advisor_Name);
			advisorName = planningDetails.Advisor_SAPCode ? planningDetails.Advisor_SAPCode : advisor_Name;
			planningDetails.Sub_Activity = advisorName;
		}
		changeLabel("activity-subtype", "Advisor Name",true);
		campaignList = Campaign;
		//$m.juci.getControl("campaign").show();
	} else if (activity_type == "No Joint Call") {
//		GetADVbySM($m.getUsername(), "activity_subtype");
		if(planningDetails.Advisor_SAPCode){
			advisorName = getAdvisorName(planningDetails.Advisor_SAPCode);
			planningDetails.Sub_Activity = advisorName;
		}
		changeLabel("activity-subtype", "Advisor Name",true);
	//	campaignList = [planningDetails.Special_Campaign];
		$m.juci.dataset("campaignNames", campaignList);
	} 
	if (!planningDetails.Advisor_SAPCode) {
		$m.juci.dataset("advisors_list",advisorList);
	} else {
		$m.juci.dataset("advisors_list",advisorName);
		if(gettype() != 'FLS'){
			callActivitySubOption(planningDetails.Advisor_SAPCode);
		}
	}
	if(planningDetails.Lead_Type == "Renewal"){
		planningDetails.Sub_Activity_Options = "Post Selling visit";
		$m.juci.dataset("activity_option", ["Post Selling visit"]);
	}
	$m.juci.dataset("Subtype",true);
	$m.juci.dataset("newPlanningForm",planningDetails);
	$m.juci.dataset("campaign_drop", campaignList);
}

/** Calling the activity sub option based on activity sub type**/
function callActivitySubOption(e) {
	if(typeof e == "object"){
		var activity_option = e.value;
	}else{
		var activity_option = e;
	}
	var planningDetails = 	$m.juci.dataset("newPlanningForm");
	if (activity_option != "Goldmine Visit" && activity_option != "Recruitment prospect Visit") {
		if(planningDetails.Lead_Type != "Renewal"){
			getSubActivityOption(sub_type_option);
		}else{
			planningDetails.Sub_Activity_Options = "Post Selling visit";
			$m.juci.dataset("activity_option", ["Post Selling visit"]);
		}
	} else if (activity_option == "Goldmine Visit") {
		getSubActivityOption(gold_mine);
	} else if (activity_option == "Recruitment prospect Visit") {
		getSubActivityOption(rec_props_name);
	} 
	$m.juci.dataset("SubtypeOption",true);
	$m.juci.dataset("newPlanningForm",planningDetails);
}

/** Checking the activtiy date with current date**/
function assignDate(event) {
	$m.juci.getDataset("newPlanningForm")().Activity_Time(null);
	var dob = $m.juci.dataset("newPlanningForm").Activity_Date;
	var newdob = new Date(dob).toString("dd MM yyyy");
	var currentDate = new Date().toString("dd MM yyyy");
	if (utils.GetTimeStampByDate(dob) < utils.GetTimeStamp() && newdob != currentDate) {
		$m.juci.getDataset("newPlanningForm")().Activity_Date('');
		$m.alert("Activity Date should not be less than Today's Date");
	}
}

/** Splicing the sub activity option from existing dropdown list**/
function getSubActivityOption(subActivityOptions) {
	juci.getControl("activity-subtype-opt").enable();
	var getOptions = $m.getPref("subTypeOptions");
	if( getOptions == true){
		subActivityOptions = newSubActivityOptions;
	}else{
		if (ip_sub_activity != "" && ip_sub_activity != null) {
			if (ip_sub_activity.indexOf(",") != -1) {
				var options = ip_sub_activity.split(",");
				var optionslist = [];
				for (var j = 0; j < options.length; j++) {
					for (var i = 0; i < subActivityOptions.length; i++) {
						if (options[j] == subActivityOptions[i]) {
							subActivityOptions.splice(i, 1);
						}
					}
				}
			} else {
				if(subActivityOptions.length != 0){
					for (var k = 0; k < subActivityOptions.length; k++) {
						if (ip_sub_activity == subActivityOptions[k]) {
							subActivityOptions.splice(k, 1);
						}
					}
				}
			}
			if (subActivityOptions.length == '0') {
				juci.findById("activity-subtype-opt").attr("data-novalidate", true);
				juci.getControl("activity-subtype-opt").disable();
				
			}
		}
	}
	$m.juci.dataset("activity_option", subActivityOptions);
}


/** Checking the activtiy time with current time**/
function checkTimeValidation(event){
	var dob = $m.juci.dataset("newPlanningForm").Activity_Date;
	var newdob = new Date(dob).toString("dd MM yyyy");
	var currentDate = new Date().toString("dd MM yyyy");
	var date = new Date();
	currentime = date.getTime();
	if (newdob == currentDate) {
	    activitytime = event.value;
	    var today = date;
	    var hours =  today.setHours(convertTimeFormat(activitytime));
        var minutes =  today.setMinutes(activitytime.minute);
        var seconds = today.setSeconds(00);
		var timePicker = today.getTime();
		if(timePicker < currentime){
			$m.alert("Activity Time should  be more than current time")
			$m.juci.getDataset("newPlanningForm")().Activity_Time(null);
		 }
	} 
}


/** Converting the time into 24 hrs format**/
function convertTimeFormat(time){
	var AMPM = time.meridian;
		hours = time.hour;
		minutes = time.minute;
	 if (AMPM == "PM" && hours < 12)
	 hours = hours + 12;
     if (AMPM == "AM" && hours == 12) 
    hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    return hours;
}

function getAdvisorName(advisorCode){
	var advisorList = $m.getPref("advisorsDetails");		
	for(var i=0;i<advisorList.length;i++){
		if(advisorList[i].code == advisorCode){
			return advisorList[i].name;
		}
	}
}

function getAdvisorCode(advisorName){
	var advisorList = $m.getPref("advisorsDetails");
	for(var i= 0; i<advisorList.length;i++){
		if(advisorList[i].name == advisorName){
			return advisorList[i].code;
		}
	}
}


/** Saving the planning details**/
function saveForm(datasetData){
	$m.showProgress("Syncing data..");
	var service = new ServiceLibrary();
	var callback = function(res){
		if (res.Status == "Y") {
			$m.alert("Record inserted successfully to server");
			var appfilter = new DB.Filter.equal("Sync_Txn_Id", "'" + res.Sync_Txn_Id + "'");
			var data = {
				"issync": "1"
			}
			saveActivityPlanning.updateSync(data, appfilter, function() {
			    $m.setResult(true);
				utils.ClosePage();
			});
		} else {
			$m.logError("Failed to insert Activity Results response is" + ' ' + res.Status);
			$m.alert("Failed to insert Activity Planning response is" + ' ' + res.Status, "Failed to Insert", function() 
			{
				utils.ClosePage();
			});
		}
	};
//fireRequestInput("SavePlanning", datasetData, callback); 
	service.syncLeadActivityPlanningDetails(callback,datasetData);
}

function validateWithLeadType(value) {
	console.log(value());
	if(typeof value() == "object"){
		if (value() != "") {
			var description = value().Description();
			if (description != "Joint Call for NB") {
				return true;
			} else {
				return false;
			}
		}
	}else{
		if (value() != "") {
			var description = value();
			if (description != "Joint Call for NB") {
				return true;
			} else {
				return false;
			}
		}else{
			return true;
		}
	}
}
