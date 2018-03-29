/**
 * newlead.js
 * @author CloudPact Technologies
 * @description : This script is for creating the new lead
 **/
var dbHelper;
$m.juci.addDataset("newLeadForm",bindingObjInputManagement.NewLead);
$m.juci.addDataset("commuteTime", ["~5","5~10","10~15","15~25","25~35","35~45","45~60","60~"]);
$m.juci.addDataset("lead_subtype", []);
$m.juci.addDataset("lead_subsource", []);
$m.juci.addDataset("Subtype", false);
$m.juci.addDataset("SubSource", false);
$m.juci.addDataset("cityList", []);
$m.juci.addDataset("campaignDrop",true);
$m.juci.addDataset("advisors_visible",true);
$m.juci.addDataset("campaign_group",[]);
$m.juci.addDataset("campaign_names",[]);
$m.juci.addDataset("campaign_names_flag",false);
$m.juci.addDataset("leadTypeFls",true);
$m.juci.addDataset("leadTypeFlsRemarks",false);

var datasetData={};
var advisorList;
var campaignNames = [];


$m.onReady(function(){
	initReady();
});

$m.onResume(function(){
	initResume();
});

$m.onData(function(eventObject){
	initData(eventObject);
});

$m.onClose(function(){
	$m.juci.dataset("newLeadForm",bindingObjInputManagement.NewLead);
	var leadForm = utils.GetControl("nLeadForm");
	leadForm.clearValidation();
});

/** Setting the header name on page load**/
function initReady(){
	$m.juci.dataset("headerName","Super Express");
	$m.juci.dataset("Subtype", false);
	$m.juci.dataset("SubSource", false);
}

/** Checking the network speed and save the newlead details**/
var checkingNetworkSpeedCallback = function(res){
	utils.HideProgress();
	saveForm(datasetData);
};


var message = "Your Network bandwidth is below 250 kbps.It will take some time to sync the data.Do you want to Proceed?";
utils.CheckingNetworkSpeed(message,checkingNetworkSpeedCallback);


/** Getting the lead details for edit lead and initalizing the local database**/
function initData(eventObject){
	var agadvAdvName = [];
	advisorList = $m.getPref("advisorList");
	if(gettype() !=='FLS'){
		$m.juci.dataset("advisors_visible",true);
		//$m.juci.dataset("campaignDrop",true);
	}else{
		$m.juci.dataset("advisors_visible",false);
		$m.juci.dataset("leadTypeFls",true);
	}
	if(gettype() !=='AGADV' && gettype() !=='TPADV' && gettype() !=='CNADV' && gettype() !=='PRADV' && gettype() !=='ENADV'){
		$m.juci.dataset("advisors_list",advisorList);
	}else{
		var advisor_Name = $m.getUserAccount().customProperties.Login_Name;
		agadvAdvName.push(advisor_Name);
		$m.juci.dataset("advisors_list",agadvAdvName);
	}
	$m.juci.dataset("newLeadForm",bindingObjInputManagement.NewLead);
	if(typeof eventObject.data !== "object"){
		var newLead = $m.juci.dataset("newLeadForm");
		newLead.Reference_LeadID = eventObject.data;
		newLead.Reference_YN ="Y";
		newLead.Advisor_Code = $m.getUserAccount().customProperties.Login_Name;
		if(gettype() =='AGADV' || gettype() =='TPADV' || gettype() =='CNADV' || gettype() =='PRADV' || gettype() =='ENADV'){
			newLead.Advisor_Code = agadvAdvName;
		}
		if(gettype() =='FLS'){
			newLead.Lead_Type =  setValueFromOptions("lead_type", {
				"Description": "NATURAL MARKETING"
			}, inputComparator);
			newLead.Lead_Sub_Type ="New Prospect";
			$m.juci.dataset("newLeadForm",newLead);
			callLeadSubType(newLead.Lead_Type.Description);
			newLead.Lead_Source = setValueFromOptions("campaign_group", {
				"DESCRIPTION": "NATURAL MARKETING"
			}, inputDescComparator);
			//newLead.Lead_Source = getCampaignGroupValue(newLead.Lead_Source);
			newLead.Lead_Sub_Source = "Self Sourced lead";
			newLead.Campaign = "Self Sourced lead" ;
			$m.juci.dataset("campaign_names_flag",true);
			$m.juci.dataset("campaignDrop",true);
			$m.juci.dataset("campaign_names",["Self Sourced lead"]);
			$m.juci.dataset("campaign_drop",newLead.Campaign);
			$m.juci.dataset("campaign_group",[newLead.Lead_Source]);
			console.log(newLead.Lead_Source);
		}
		$m.juci.dataset("newLeadForm",newLead);
	}else{
		var newLead = $m.juci.dataset("newLeadForm");
		var editLeadData = eventObject.data;
		newLead.Aadhaar = editLeadData.Aadhaar;
		newLead.Activity_Id = editLeadData.Activity_Id;
		newLead.Activity_Result_Id = editLeadData.Activity_Result_Id;
		newLead.Added_Date = new Date(editLeadData.Added_Date).getTime();
		newLead.Address = editLeadData.Address;
		newLead.Address_1 = editLeadData.Address_1;
		newLead.Address_2 = editLeadData.Address_2;
		newLead.Address_3 = editLeadData.Address_3;
		newLead.Alternate_Number = editLeadData.Alternate_Number;
		/*newLead.Campaign = setValueFromOptions("campaign_drop", {
				"Campaign": editLeadData.Campaign
			}, inputComparator);*/
		newLead.Campaign = editLeadData.Campaign;
		newLead.City = editLeadData.City;
		newLead.Commute_Time = editLeadData.Commute_Time;
		newLead.DOB = editLeadData.DOB;
		newLead.Dependents = setValueFromOptions("dependents", {
				"Description": editLeadData.Dependents
			}, inputComparator);
		newLead.Device_Id = editLeadData.Device_Id;
		newLead.Educational_Background = setValueFromOptions("education", {
				"Description": editLeadData.Educational_Background
			}, inputComparator);
		newLead.Email_ID = editLeadData.Email_ID;
		newLead.AgeGroup = editLeadData.AgeGroup;
		newLead.Flag = editLeadData.Flag;
		newLead.Gender = editLeadData.Gender;
		if(newLead.Gender == "Male"){
		 	utils.GetControl("Lead_gender").toggle(0);
		}
		else{
			utils.GetControl("Lead_gender").toggle(1);
		}
		newLead.Income = setValueFromOptions("Income", {
				"Description": editLeadData.Income
			}, inputComparator);
		newLead.Landline = editLeadData.Landline;
		newLead.Latitude = editLeadData.Latitude;
		newLead.LeadTypeFlag = editLeadData.LeadTypeFlag;
		newLead.Lead_Category = editLeadData.Lead_Category;
		newLead.Lead_Id = editLeadData.Lead_Id;
		newLead.Sync_by = editLeadData.Sync_by;
		newLead.Lead_Status = editLeadData.Lead_Status;
		newLead.Lead_Sub_Source = editLeadData.Lead_Sub_Source;
		newLead.Lead_Sub_Type =editLeadData.Lead_Sub_Type;
		newLead.Lead_Type =  setValueFromOptions("lead_type", {
				"Description": editLeadData.Lead_Type
			}, inputComparator);
		newLead.Longitude = editLeadData.Longitude;
		newLead.Marital_Status = setValueFromOptions("marital_stat", {
				"Description": editLeadData.Marital_Status
			}, lAComparator);
		newLead.Meeting_Status = editLeadData.Meeting_Status;
		newLead.Mobile = editLeadData.Mobile;
		newLead.Name = editLeadData.Name;
		newLead.Occupation = setValueFromOptions("Occupation", {
				"Description": editLeadData.Occupation
			}, inputComparator);
		newLead.Pin_Code = editLeadData.Pin_Code;
		newLead.Reference_LeadID = editLeadData.Reference_LeadID;
		newLead.Reference_YN = editLeadData.Reference_YN;
		newLead.Source_From = editLeadData.Source_From;
		newLead.State = editLeadData.State;
		newLead.Sub_Activity = editLeadData.Sub_Activity;
		newLead.Sub_Activity_Options = editLeadData.Sub_Activity_Options;
		newLead.Updated_By = editLeadData.Updated_By;
		newLead.Updated_Date = editLeadData.Updated_Date;
		newLead.LeadInfo_Remarks = editLeadData.LeadInfo_Remarks;
		if(newLead.LeadInfo_Remarks){
			$m.juci.dataset("leadTypeFlsRemarks",true);
		}else{
			$m.juci.dataset("leadTypeFlsRemarks",false);
		}
		newLead.iscomplete = editLeadData.iscomplete;
		newLead.issync= editLeadData.issync;
		newLead.Lead_From_Contact_List  = editLeadData.Lead_From_Contact_List;
		newLead.editLead = "Y";
		var advisor_Name = $m.getUserAccount().customProperties.Login_Name;
		if(gettype() == 'FLS'){
			newLead.Advisor_Code = $m.getUserAccount().customProperties.Login_Name;
		}else if(gettype() =='AGADV' || gettype() =='TPADV' || gettype() =='CNADV' || gettype() =='PRADV' ||  gettype() =='ENADV'){
			newLead.Advisor_Code = advisor_Name;
		}else{
			newLead.Advisor_Code = getAdvisorName(editLeadData.Advisor_Code);
		}
		newLead.policyNumber = editLeadData.Policy_Number;
		$m.juci.dataset("newLeadForm",newLead);
		callLeadSubType(newLead.Lead_Type.Description);
		getCityList(newLead.State);
		if(gettype() == 'FLS'){
			newLead.Lead_Type =  setValueFromOptions("leadType", {
				"Description": editLeadData.Lead_Type
			}, inputComparator);
			newLead.Income = setValueFromOptions("IncomeFls", {
				"Description": editLeadData.Income
			}, inputComparator);
			newLead.Marital_Status = setValueFromOptions("MaritalFls", {
				"Description": editLeadData.Marital_Status
			}, inputComparator);
			newLead.Occupation = setValueFromOptions("Occupation", {
				"Description": editLeadData.Occupation
			}, inputComparator);
			newLead.Educational_Background = setValueFromOptions("educationFls", {
				"Description": editLeadData.Educational_Background
			}, inputComparator);
			newLead.Lead_Source = setValueFromOptions("campaign_group", {
				"DESCRIPTION": editLeadData.Lead_Source 
			}, inputDescComparator);
		//	newLead.Lead_Source = getCampaignGroupValue(newLead.Lead_Source);
			newLead.Lead_Sub_Source = editLeadData.Lead_Sub_Source;
			newLead.LeadTypeFlag = editLeadData.LeadTypeFlag;
			newLead.Campaign =  editLeadData.Campaign;
			$m.juci.dataset("campaign_names_flag",true);
			$m.juci.dataset("campaignDrop",true);
			$m.juci.dataset("campaign_names",["Self Sourced lead"]);
			$m.juci.dataset("campaign_drop",newLead.Campaign);
			$m.juci.dataset("campaign_group",[newLead.Lead_Source]);
			$m.juci.dataset("newLeadForm",newLead);
			callLeadSubType(newLead.Lead_Type.Description);
			if(newLead.LeadTypeFlag == "LMS"){
				getCampaignNames(newLead.Lead_Source.DESCRIPTION);
			}
		}
	}
}

/** Checking the GPS and setting the gender toggle as male by default**/
function initResume(){
	utils.GetLocation(12000,true,"");
	utils.GetControl("Lead_gender").toggle(0);
	$m.juci.getControl("lead-type").enable();
	$m.juci.getControl("lead-type").value("");
	$m.juci.getControl("lead-source").value("");
	if(gettype() == "FLS") {
		$m.juci.dataset("campaign_group",campaignGroupMaster);
		$m.juci.dataset("campaign_names_flag",false);
	}
}

/** Saving the newlead details into dataset and check with network**/
function SaveNewLeadDetails(){
	var deviceCallback = function(response) {
		datasetData = $m.juci.dataset("newLeadForm");
		var deviceId = response.result;
		var locationCallback = function(lat, long) {
			datasetData.Latitude = datasetData.Latitude ? datasetData.Latitude : lat;
			datasetData.Longitude = datasetData.Longitude ? datasetData.Longitude : long;
		    if(datasetData.DOB){
				var age = utils.GetAge(datasetData.DOB);
				if(age<18){
					$m.alert("Lead should have greater than 18 years");
					return;
				}
			}
			
			datasetData.DOB = datasetData.DOB instanceof Date ? datasetData.DOB.getTime() : new Date(datasetData.DOB).getTime();
			datasetData.Educational_Background = datasetData.Educational_Background.Description;
			datasetData.Lead_Type = datasetData.Lead_Type.Description ? datasetData.Lead_Type.Description :datasetData.Lead_Type;
			datasetData.Income = datasetData.Income.Description;
			if(gettype() == "FLS") {
				datasetData.Lead_Source = datasetData.Lead_Source.DESCRIPTION;
				datasetData.Lead_Sub_Source = datasetData.Lead_Sub_Source;
				datasetData.Name = datasetData.Name;
			} else {
				datasetData.Lead_Source = datasetData.Lead_Type;
				datasetData.Name = datasetData.Name.substr(0,1).toUpperCase() + datasetData.Name.substr(1).toLowerCase();
			}
			datasetData.Dependents = datasetData.Dependents.Description;			
			if(gettype() == "FLS") {
				datasetData.Advisor_Code = utils.GetLoginCode();
			}else if(gettype() == "AGADV" || gettype() == "TPADV" || gettype() =='CNADV' || gettype() =='PRADV' || gettype() =='ENADV'){
				datasetData.Advisor_Code = utils.GetLoginCode();
			} else {
				datasetData.Advisor_Code = getAdvisorCode(datasetData.Advisor_Code) ? getAdvisorCode(datasetData.Advisor_Code) : "";
			}
			datasetData.Occupation = datasetData.Occupation.Description;
			datasetData.Marital_Status = datasetData.Marital_Status.Description;
			datasetData.Campaign = datasetData.Campaign;
			datasetData.Device_Id = datasetData.Device_Id ? datasetData.Device_Id : deviceId;
			datasetData.Reference_LeadID = datasetData.Reference_LeadID ? datasetData.Reference_LeadID : 0;
			datasetData.Sync_Txn_Id = utils.GetTimeStamp();
			datasetData.editLead = datasetData.editLead;
			datasetData.Lead_Id = datasetData.Lead_Id ? datasetData.Lead_Id :utils.GetRandomNum();
			datasetData.Added_By = utils.GetLoginCode();
			datasetData.Policy_Number = datasetData.policyNumber;
			datasetData.Sync_by = utils.GetLoginCode();
			datasetData.Address = "";
			datasetData.Lead_From_Contact_List = datasetData.Lead_From_Contact_List ? datasetData.Lead_From_Contact_List : "N";
			datasetData.iscompleted = "1";
			var tablename = "saveNewLead";
	    	var responsecallback = function(res){
				if(res.length > 0){
					// TODO : prepare object from this dataset
					var key = tablename+"_dbtableobject";
					window[key] = res;
					console.log(res);
					var Obj = new saveNewLead(datasetData);
					var insertCallback = function() {
						//$m.logInfo("Successfully inserted!");
						if($m.networkConnected()){
							$m.showProgress("Checking your network bandwidth please wait...");
							utils.NetworkUtils();
						}
					   else{
					   	$m.alert(messages.NoNetworkConnectivity,"Network Alert",function(){
	//					    	utils.OpenPage("Input Management","/Input Management/inputManagement.html");
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
			
		};
		utils.GetLocation(12000,true,locationCallback);
	};
	utils.GetDeviceId(deviceCallback);
}

/** Call the lead sub type based on the lead type**/
function callLeadSubType(event){
	var campaignList;
	var subTypeList;
	var campaign_drop;
	var advisorNames;
	var advisorNameVisible;
	var lead_type;
	var agadvAdvName = [];
	if (typeof event == "object") {
		lead_type = event.value.Description();
	} else {
		lead_type = event;
	}	
	var leadEditData = $m.juci.dataset("newLeadForm");
	$m.juci.getControl("lead-subtype").value(null);
	$m.juci.getControl("campaign").value(null);
	$m.juci.getControl("lead-subsource").value(null);
	if(lead_type == "Recruitment"){
		$m.juci.dataset("Subtype", true);
		subTypeList = ["Goldmine","Candidate - Recruitment prospect"];
		campaignList = reccampaign;
		campaign_drop = false;
		advisorNames = false;
	}else if(lead_type == "New Business"){
		$m.juci.dataset("Subtype", true);
		subTypeList = ["New Prospect"];
		campaignList = Campaign;
		campaign_drop = true;
		advisorNames = true;
		if(leadEditData.Advisor_Code){
			var advisor_Name = $m.getUserAccount().customProperties.Login_Name;
			agadvAdvName.push(advisor_Name);
			advisorNameVisible = leadEditData.Advisor_Code ? leadEditData.Advisor_Code : agadvAdvName;
			leadEditData.Advisor_Code = advisorNameVisible;
		}
	}else if(lead_type == "Exisiting Customer"){
		$m.juci.dataset("Subtype", false);
		$m.juci.dataset("SubSource", true);
		campaignList = existingcampaign;
		campaign_drop = false;
		advisorNames = true;
		if(leadEditData.Advisor_Code){
			var advisor_Name = $m.getUserAccount().customProperties.Login_Name;
			agadvAdvName.push(advisor_Name);
			advisorNameVisible = leadEditData.Advisor_Code ? leadEditData.Advisor_Code : agadvAdvName;
			leadEditData.Advisor_Code = advisorNameVisible;
		}
	}else if(lead_type == "Renewal"){
		$m.juci.dataset("Subtype", false);
		$m.juci.dataset("SubSource", true);
		campaign_drop = true;
		campaignList = ["Renewal"];
		advisorNames = true;
		if(leadEditData.Advisor_Code){
			var advisor_Name = $m.getUserAccount().customProperties.Login_Name;
			agadvAdvName.push(advisor_Name);
			advisorNameVisible = leadEditData.Advisor_Code ? leadEditData.Advisor_Code : agadvAdvName;
			leadEditData.Advisor_Code = advisorNameVisible;
		}
		leadEditData.Campaign = "Renewal";
	}else if(lead_type == "NATURAL MARKETING"){
		$m.juci.dataset("Subtype", true);
		subTypeList = (leadEditData.Lead_Id != "") ? [leadEditData.Lead_Id] : ["New Prospect"];
		campaignList = Campaign;
		campaign_drop = true;
		advisorNames = true;
		leadEditData.Lead_Sub_Type =  (leadEditData.Lead_Id != "") ? leadEditData.Lead_Id : "New Prospect";
		leadEditData.Lead_Source = leadEditData.Lead_Source;
	}else{
		$m.juci.dataset("Subtype", true);
		subTypeList = [leadEditData.Lead_Id];
		campaignList = Campaign;
		campaign_drop = true;
		advisorNames = true;
		leadEditData.Lead_Sub_Type = leadEditData.Lead_Id ;
		leadEditData.Lead_Source = leadEditData.Lead_Source;
	}
	$m.juci.dataset("lead_subtype",subTypeList);
	$m.juci.dataset("campaign_drop",campaignList);
	$m.juci.dataset("campaignDrop",campaign_drop);
	if (typeof event == "object") {
		if(gettype() =='AGADV' || gettype() =='TPADV' || gettype() =='CNADV' || gettype() =='PRADV' || gettype() =='ENADV'){
			$m.juci.dataset("advisors_list",agadvAdvName);
		}else{
			$m.juci.dataset("advisors_list",advisorList);
		}
	} else {
		$m.juci.dataset("advisors_list",advisorNameVisible);
	}
	$m.juci.dataset("newLeadForm",leadEditData);
	$m.juci.dataset("advisors_visible",advisorNames);
	if(gettype() != 'FLS'){
		callLeadSubSource(lead_type);
	}
}

/** CAll the lead sub source based on lead source**/
function callLeadSubSource(lead_source){
	var subSource;
	var subSourceList;
	var leadEditData = $m.juci.dataset("newLeadForm");
	juci.getControl("lead-source").disable();
	juci.getControl("lead-subsource").value(null);
	if(lead_source == "Recruitment"){
		subSource = true;
		subSourceList = ["Goldmine","Reference","Self Sourced lead"];
	}else if(lead_source == "Exisiting Customer"){
		subSource = false;
		subSourceList = ["Goldmine","Reference","Self Sourced lead"];
	}else if(lead_source == "Renewal"){
		subSource = false;
		subSourceList = ["Red","Green","Amber"];
	}else if(lead_source == "New Business"){
		subSource = true;
		if(gettype() != 'FLS'){
			subSourceList = ["Self Sourced lead","Advisor"];
		}else{
			subSourceList = ["Self Sourced lead"];
			leadEditData.Lead_Sub_Source = subSourceList;
		}
	}
	$m.juci.dataset("lead_subsource",subSourceList);
	$m.juci.dataset("SubSource", subSource);
	$m.juci.dataset("newLeadForm",leadEditData);		
}

/** Set the gender value based on toggle**/
function setLeadGender(e){	
	var leadGender = juci.dataset("newLeadForm");
	switch (e.newToggled) {
		case 0:
			leadGender.Gender = "Male";
	    	break;
	    case 1:
			leadGender.Gender = "Female";
			break;
	}
	$m.juci.dataset("newLeadForm", leadGender);
}

/** Checking the leadd DOB with current date or below 18 years**/
function checkTodayDate(){
	var dob = $m.juci.dataset("newLeadForm").DOB;
	var newdob = new Date(dob).toDateString();
	var currentDate =  new Date().toDateString();
	if(dob > new Date()){
		$m.juci.getDataset("newLeadForm")().DOB('');
		$m.alert("Date of birth should not be greater than Today's Date");
	}
	else if(newdob == currentDate){
		$m.juci.getDataset("newLeadForm")().DOB('');
		$m.alert("Date of birth cannot be current date");	
	}else{
		var age = utils.GetAge(dob);
		if(age < 18){
			$m.juci.getDataset("newLeadForm")().DOB('');
			$m.alert("Age should be greater than 18 years");		
		}
	}
}

/** Getting the city list based on state**/
function getCityList(event){
	$m.juci.getControl("City").value(null);
	$m.juci.dataset("cityList",[]);
	var cityName = [];
	var stateName;
	var leadList = $m.juci.dataset("newLeadForm");
	if(typeof event == "object"){
		stateName = event.value;
		for(var i=0;i<cityTier_json.length;i++){
			var cityList = cityTier_json[i].State;
			if(stateName == cityList){
				cityName.push(cityTier_json[i].City);
			}
		}
	}else{
		stateName = event;
		cityName = [leadList.City];
	}
	$m.juci.dataset("cityList",cityName);
	$m.juci.dataset("newLeadForm",leadList);
}

/** Formating the lead name with first letter as capital letter**/
function formatValue(val){
	return val.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function getAdvisorCode(advisorName){
	var advisorList = $m.getPref("advisorsDetails");
	for(var i= 0; i<advisorList.length;i++){
		if(advisorList[i].name == advisorName){
			return advisorList[i].code;
		}
	}
}

function getAdvisorName(advisorCode){
	var advisorList = $m.getPref("advisorsDetails");		
	for(var i=0;i<advisorList.length;i++){
		if(advisorList[i].code == advisorCode){
			return advisorList[i].name;
		}
	}
}

/** Save or Update the newlead details into local db and server**/
function saveForm(datasetData){
		if(datasetData.editLead == "Y"){
		delete datasetData.editLead;
		var service = new ServiceLibrary();
				$m.showProgress("Syncing data..");
				var callback = function(res) {
				if (res.Status == "Y") {
		            //$m.logInfo("Lead Details inserted successfully");
		            $m.alert("Lead Details Updated successfully to server");
		            var appfilter = new DB.Filter.equal("Sync_Txn_Id", "'" + res.Sync_Txn_Id + "'");
					var data = {
						"issync" : "1"
					}
					saveNewLead.updateSync(data, appfilter, function(){
						$m.setResult(true);
						utils.OpenPage("Input Management","/Input Management/inputManagement.html");
					});
		        } else {
		            $m.logError("Failed to insert New Lead response is" + ' ' + res.Status);
		            $m.alert("Failed to insert New Lead response is" + ' ' + res.Status, "Failed to Insert", function() {
							utils.OpenPage("Input Management","/Input Management/inputManagement.html");
						});
		        }	
				};   
			service.updateLeadInformation(callback,datasetData);
	}else{
		var service = new ServiceLibrary();
		$m.showProgress("Syncing data..");
				var callback = function(res) {
				if (res.Status == "Y") {
		            //$m.logInfo("Lead Details inserted successfully");
		            $m.alert("Lead Details inserted successfully to server");
		            var appfilter = new DB.Filter.equal("Sync_Txn_Id", "'" + res.Sync_Txn_Id + "'");
					var data = {
						"issync" : "1"
					}
					saveNewLead.updateSync(data, appfilter, function(){
						//utils.OpenPage("Input Management","/Input Management/inputManagement.html");
						$m.setResult(true);
						$m.close();
					});
		        } else {
		            $m.logError("Failed to insert New Lead response is" + ' ' + res.Status);
		            $m.alert("Failed to insert New Lead response is" + ' ' + res.Status, "Failed to Insert", function() {
							utils.OpenPage("Input Management","/Input Management/inputManagement.html");
						});
		        }	
			};   
//			fireRequestInput("SaveLead", datasetData, callback);
			service.saveNewLead(callback,datasetData);
	}
}

function validateWithLeadType(value) {
	if (value() != "") {
		var description = value().Description();
		if (description != "New Business") {
			return true;
		} else {
			return false;
		}
	}
}

function getCampaignNames(event) {
	$m.juci.dataset("campaign_names_flag",true);
	var newLead = $m.juci.dataset("newLeadForm");
	if(typeof event == "object"){
		var campaignGroupCode = event.value.CAMPAIGN_GROUP_CODE();
	}else{
		var campaignGroupCode = event;
		campaignGroupCode = getCampaignCode(campaignGroupCode);
	}
	for(var i=0;i<Campaign_Names.length;i++) {
		if(campaignGroupCode == Campaign_Names[i].CAMPAIGN_GROUP_CODE) {
			campaignNames.push(Campaign_Names[i]);
		}
	}
	if(campaignNames.length == 0){
		$m.juci.dataset("campaign_names_flag",false);
		$m.juci.dataset("campaignDrop",false);
	}else{
		$m.juci.dataset("campaign_names_flag",true);
		$m.juci.dataset("campaignDrop",true);
	}
	newLead.Lead_Sub_Source = newLead.Lead_Sub_Source;
	$m.juci.dataset("campaign_names",[newLead.Lead_Sub_Source]);
	$m.juci.dataset("newLeadForm",newLead);
}

function getCampaignDetails(value){
	console.log(value());
	if (value() != "") {
		var description = value();
		if (description == true) {
			return false;
		} else {
			return true;
		}
	}
}

function getCampaignCode(value){
	var campaignCode;
	var value = value.DESCRIPTION;
	for(var i=0;i<campaignGroupMaster.length;i++) {
		if(value == campaignGroupMaster[i].DESCRIPTION) {
			return campaignGroupMaster[i].CAMPAIGN_GROUP_CODE;
		}
	}
}

function getCampaignGroupValue(value){
	var campaignCode;
	var value = value.DESCRIPTION;
	for(var i=0;i<campaignGroupMaster.length;i++) {
		if(value == campaignGroupMaster[i].CAMPAIGN_GROUP_CODE) {
			return campaignGroupMaster[i].DESCRIPTION;
		}
	}
}


function inputDescComparator(a,b) {
	return a['DESCRIPTION'] == b['DESCRIPTION'];
}

function SetLeadType(e) {
	var agadvAdvName = [];
	advisorList = $m.getPref("advisorList");
	var newLead = $m.juci.dataset("newLeadForm");
	newLead.Lead_Type =  setValueFromOptions("lead_type", {
				"Description": "Exisiting Customer"
			}, inputComparator);
	$m.juci.getControl("lead-type").value(newLead.Lead_Type);
	$m.juci.getControl("lead-type").disable();
	callLeadSubType(newLead.Lead_Type.Description);
	var source=$m.juci.dataset("lead_source");
	source ={
			"LA_CODE": "EXCU",
			"Description":"Exisiting Customer"
		}
		$m.juci.getControl("lead-source").value(source);
		if(gettype() !=='AGADV' && gettype() !=='TPADV' && gettype() !=='CNADV' && gettype() !=='PRADV' && gettype() !=='ENADV'){
			$m.juci.dataset("advisors_list",advisorList);
		}else{
			var advisor_Name = $m.getUserAccount().customProperties.Login_Name;
			agadvAdvName.push(advisor_Name);
			$m.juci.dataset("advisors_list",agadvAdvName);
		}
		if(!e.value) {
			$m.juci.getControl("lead-type").enable();
		}
}