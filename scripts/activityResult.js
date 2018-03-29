/**
 * activityResult.js
 * @author CloudPact Technologies
 * @description : This script is for activity result
 **/
var dbHelper;
var x2js = new X2JS();

$m.juci.addDataset("Aadhar", "");
$m.juci.addDataset("Aadharno", "");
$m.juci.addDataset("activity_option", []);
$m.juci.addDataset("newResultForm", bindingObjInputManagement.ActivityResult);
$m.juci.addDataset("activity_subtype", []);
$m.juci.addDataset("Subtype", false);
$m.juci.addDataset("hasMet", true);
$m.juci.addDataset("status", true);
$m.juci.addDataset("hasAuthenticated",false);
$m.juci.addDataset("SubtypeOption", false);
$m.juci.addDataset("aadhar_section", false);
$m.juci.addDataset("fingerPrint","");
$m.juci.addDataset("meeting_status",true);
$m.juci.addDataset("lifePlanner",true);
$m.juci.addDataset("isProductsList",false);
$m.juci.addDataset("aadharSection",true);
$m.juci.addDataset("products_list",[]);
$m.juci.addDataset("campaign_names",[]);
$m.juci.addDataset("isDispFls",false);
$m.juci.addDataset("flsCampaign",false);
$m.juci.addDataset("followUp",false);
$m.juci.addDataset("adag_group",false);
$m.juci.addDataset("consentText",true);
$m.juci.addDataset("renewal_check_flag",false);
$m.juci.addDataset("renewalDisposition",true);
$m.juci.addDataset("renewalSMS",true);
$m.juci.addDataset("activityDone",false);
$m.juci.addDataset("LeadType","");
$m.juci.addDataset("LA_DOB","");

var prod_value,rewardsValue,claimValue,prodValue,companyInfo;
var data={};
var datasetData={};
var productCode;
var leadData = {}; 

$m.onReady(function() {
	initReady();
});

$m.onResume(function() {
	hideMenu();
	$m.juci.dataset("LA_DOB","");
		$m.juci.findByClass("life2assure")[0].el.style.display="block";
	var leadtype = $m.juci.dataset("newResultForm");
	if(gettype() == "FLS") {
		$m.juci.dataset("campaign_names",Campaign_Names);
	}
	$m.removePref("activity_result_id");
});

$m.onData(function(eventObject) {
	initData(eventObject);
});

$m.onClose(function() {
	setClose();
});

$m.onLocationError(function(response) {
	$m.alert("Please enable GPS Location", "GPS Message", function() {
		$m.close();
	});
});

/** Initiating Local Database **/
function initReady() {
	service = new ServiceLibrary();
	$m.juci.dataset("headerName","Super Express");
}

/** Fetching the lead details and set into data set**/
function initData(eventObject) {
	data = eventObject.data;
	$m.juci.dataset("aadharSection",true);
	utils.RemovePref("AadhaarData");
	$m.juci.getControl("productUpdate").value(null);
	$m.juci.getControl("companyinfo").value(null);
	$m.juci.getControl("claimsRec").value(null);
	$m.juci.getControl("plan-code").value(null);
	$m.juci.dataset("isProductsList",false);
	$m.juci.dataset("Subtype", false);
	$m.juci.dataset("hasMet", true);
	$m.juci.dataset("lifePlanner",false);
	$m.juci.dataset("meeting", inputManagement.Meeting);
	utils.GetControl("activity-dob").enable();
	utils.GetControl("checkAadhar").value(false);
	$m.juci.dataset("Aadharno", "");
	$m.juci.dataset("hasAuthenticated",false);
	$m.juci.dataset("activityDone",false);
	$m.juci.dataset("newResultForm", bindingObjInputManagement.ActivityResult);
	var resultform = $m.juci.dataset("newResultForm");
	resultform.Lead_Id = data.Lead_Id;
	resultform.Activity_Id = data.Activity_Id;
	resultform.Name  = data.Name;
	resultform.DOB = data.DOB;
	resultform.Gender = data.Gender;
	resultform.City = data.City;
	resultform.Marital_Status = data.Marital_Status;
	resultform.Income = data.Income;
	resultform.Lead_Type = data.Lead_Type;
	$m.juci.dataset("LeadType",resultform.Lead_Type);
	$m.juci.dataset("newResultForm", resultform);
	if(gettype() != 'FLS'){
		if(resultform.Lead_Type == "Renewal") {
			$m.juci.dataset("renewalDisposition",false);
			$m.juci.dataset("aadharSection",false);
			$m.juci.dataset("aadhar_section", false);
			$m.juci.dataset("hasAuthenticated",true);
			$m.juci.dataset("renewalSMS",false);
			$m.juci.dataset("activity_done", inputManagement.ActivityDone);
		} else {
			$m.juci.dataset("leadCategory", inputManagement.LeadCategory);
			$m.juci.dataset("activity_done", inputManagement.ActivityDone);
			$m.juci.dataset("renewalDisposition",true);
			$m.juci.dataset("aadharSection",true);
			$m.juci.dataset("renewalSMS",true);
		}
	}else{
		$m.juci.dataset("activity_option",["Joint Call for NB","No joint call"]);
		$m.juci.dataset("SubtypeOption", true);
		$m.juci.dataset("leadCategory", inputManagement.FlsLeadCategory);
		$m.juci.dataset("ActivityDone", inputManagement.Activity_Done);
		$m.alert("Please verify the DOB and gender of the applicant");
	}
	utils.RemovePref("AadhaarLead_ID");
	utils.RemovePref("Lead_ID");
	utils.RemovePref("PIDData");
	$m.juci.dataset("aadhar_section", false);
	if(data.Lead_Type == "Existing Customer" || data.Lead_Type == "New Business") {
		$m.juci.dataset("lead_disp",LeadDisp);
	} else if(data.Lead_Type == "Recruitment") {
		$m.juci.dataset("lead_disp", recruit);
	} else if(data.Lead_Type == "Renewal"){
		$m.juci.dataset("lead_disp", inputManagement.LeadRenewalDisp);
	} else {
		$m.juci.dataset("lead_disp",LeadDisp);
	}
	
	fetchAadharData(data.Lead_Id);
	//setAadhaarData(data.Lead_Id);	
}

/** Checking the network bandwidth and save the result details**/
var checkingNetworkSpeedCallback = function(res){
	utils.HideProgress();
	console.log(res);
	saveForm(datasetData);
};

var message = "Your Network bandwidth is below 250 kbps.It will take some time to sync the data.Do you want to Proceed?";
utils.CheckingNetworkSpeed(message,checkingNetworkSpeedCallback);

/** Save result details if the user go with aadhar details**/
function SaveResultDetails() {
	var authenticated = $m.juci.dataset("hasAuthenticated");
	if(authenticated){
		saveActivityForm();	
	}
	else{
	var checkAadhaar = utils.GetControl("checkAadhar").value();
	var aadharData = utils.GetPref("AadhaarData");
	var isAadhaar = $m.juci.dataset("aadhar_section");
		if(isAadhaar){
			if(checkAadhaar){
			  saveToServer(aadharData);
			}
			else{	
				$m.alert("Please check on I agree with conditions");	
			}
	   }
	   else{
		saveActivityForm();	
	   }
	}
}

/** Save the activity form with dataset value and check with network availability**/
function saveActivityForm(){
	var deviceCallback = function(response) {
		var deviceId = response.result;
		datasetData = $m.juci.dataset("newResultForm");
		var locationCallback = function(lat, long) {
			datasetData.Latitude = lat;
			datasetData.Longitude = long;
			datasetData.Next_Appointment = datasetData.Next_Appointment ? (datasetData.Next_Appointment instanceof Date ? utils.GetTimeStampByDate(datasetData.Next_Appointment) : datasetData.Next_Appointment) : null;
			datasetData.Activity = datasetData.Activity.Description ? datasetData.Activity.Description : datasetData.Activity;
			datasetData.Meeting_Status = datasetData.Meeting_Status.Description;
			//datasetData.Lead_Disposition = (datasetData.Meeting_Status == "Met" && datasetData.Activity == "Regular Activity")? datasetData.Sub_Activity : datasetData.Lead_Disposition.Description;
			datasetData.Lead_Disposition = datasetData.Lead_Disposition.Description ? datasetData.Lead_Disposition.Description : datasetData.Lead_Disposition;
			//datasetData.Lead_Category = datasetData.Lead_Category.Description;
			datasetData.Lead_Category = datasetData.Lead_Category.Description ? datasetData.Lead_Category.Description : datasetData.Lead_Category;
			datasetData.Device_Id = deviceId;
			datasetData.activity_result_id = utils.GetTimeStamp();
			$m.putPref("activity_result_id",datasetData.activity_result_id);
			$m.savePref();
			//datasetData.Lead_Id = utils.GetRandomNum;
			datasetData.Sync_Txn_Id = utils.GetTimeStamp();
			datasetData.Activity_Date = new Date().getTime();
			datasetData.Added_By = utils.GetLoginCode();
			datasetData.Sync_by = utils.GetLoginCode();
			datasetData.Address = "";
			datasetData.Product_Update = prod_value;
			datasetData.Claims_Record = claimValue;
			datasetData.Company_Info = companyInfo;
			datasetData.Plan_Code = productCode ? productCode : "";
			datasetData.Premium_Bucket = datasetData.permium_bucket_ref;
			datasetData.iscompleted = "1";
			if (dbHelper) {
				var tablename = "saveActivityResult";
				var responsecallback = function(res){
					if(res.length > 0){
						// TODO : prepare object from this dataset
						var key = tablename+"_dbtableobject";
						window[key] = res;
						console.log(res);
						var Obj = new saveActivityResult(datasetData);
						var insertCallback = function() {
							if ($m.networkConnected()) {
									$m.showProgress("Checking network bandwidth");	
									utils.NetworkUtils();
									//saveForm(datasetData);
							} else {
								$m.alert(messages.NoNetworkConnectivity, "Network Alert", function() {
									$m.hideProgress();
								    openLifePlannerPage(datasetData);
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
		utils.GetLocation(12000, true,locationCallback);
	};
	utils.GetDeviceId(deviceCallback);
}

/** Call the activity sub type based on activity type**/
function callActivitySubType(e) {
	var datasetData = $m.juci.dataset("newResultForm");
	if(datasetData.Lead_Type != "Renewal"){
		var activity_type = e.value.Description();
	}else{
		var activity_type = e.Description();
	}
	var optionValue;
	var datasetData = $m.juci.dataset("newResultForm");
	var meetingstatus = datasetData.Meeting_Status.Description;
	changeLabel("activity-subtype", "Activity Subtype",true);
	juci.getControl("activity-subtype").value(null);
	juci.getControl("activity-subtype-opt").value(null);
	if (meetingstatus == "Met" && activity_type == "Regular Activity") {
		$m.juci.dataset("lifePlanner", true);
		$m.juci.findById("activity-subtype").disable();
		if(data.LeadTypeFlag == "NB" || data.LeadTypeFlag == "RW"){
			datasetData.Sub_Activity = activity_type;
			datasetData.Sub_Activity = "Joint Call for NB";
			$m.juci.dataset("status", true);
		}else if(data.LeadTypeFlag == "R"){
			datasetData.Sub_Activity = "Recruitment";
			$m.juci.dataset("status", false);
		}else if(data.LeadTypeFlag == "EA"){
			datasetData.Sub_Activity = "Exisiting Advisor";
			$m.juci.dataset("status", false);
		}
		$m.juci.dataset("activity_subtype", datasetData.Sub_Activity);
		$m.juci.dataset("Subtype", true); 
		callActivitySubOption(datasetData.Sub_Activity);
	}     
	else{
//		if(datasetData.Lead_Type != "Renewal"){
//			if (activity_type == "Diwali Milan") {
//				optionValue = diwali_milan;
//			} else if (activity_type == "Tax Dhamaka") {
//				optionValue = tax_damaka;
//			} else if (activity_type == "Holi Milan") {
//				optionValue = holi_milan;
//			} else if (activity_type == "Super Tax Dhamaka") {
//				optionValue = tax_damaka;
//			}
//		}else{
//			if(activity_type != "Regular Activity" && meetingstatus == "Met") {
				//optionValue = inputManagement.LeadRenewalDisp;
//			}else{
//				optionValue = inputManagement.renewal_disp;
//			}
//		}
		$m.juci.dataset("Subtype", false);
		$m.juci.dataset("status", false);
		$m.juci.findById("activity-subtype").enable();
		$m.juci.dataset("lead_disp",optionValue );
	}
}

/** Call the sub activity option based on activity sub type and meeting status**/
function callActivitySubOption(data) {
	var optionValue;
	var campaignValue;
	if (data.type == "afterchange") {
		activity_option = data.value;
	} else {
		activity_option = data;
	}
	$m.juci.dataset("SubtypeOption", false);
	var act_result = $m.juci.dataset("newResultForm");
	$m.juci.getControl("lead-disp").value(null);
	$m.juci.getControl("activity-subtype-opt").value(null);
	if (act_result.Meeting_Status.Description == "Met" && act_result.Activity.Description == "Regular Activity") {
		if(act_result.Lead_Type != "Renewal"){
			juci.dataset("activity_subtype", reg_activity);
			act_result.Lead_Disposition = activity_option;
			act_result.Sub_Activity = activity_option;
			$m.juci.getControl("lead-disp").enable();
			$m.juci.dataset("SubtypeOption", false);
		}else{
			juci.dataset("activity_subtype", reg_activity);
			act_result.Lead_Disposition = inputManagement.LeadRenewalDisp;
			//act_result.Activity = act_result.Activity.Description ? act_result.Activity.Description : act_result.Activity ;
			act_result.Sub_Activity = activity_option;
			$m.juci.getControl("lead-disp").enable();
			$m.juci.dataset("SubtypeOption", false);
		}	
	}
	var leadtype = $m.juci.dataset("newResultForm");
	if (activity_option == "Exisiting Advisor" && act_result.Meeting_Status.Description == "Met") {
		optionValue = exit_adv;
		$m.juci.addDataset("status", false);
		$m.juci.dataset("lead_disp", optionValue);
	}
	else if(activity_option == "Exisiting Advisor" && act_result.Meeting_Status.Description == "Not Met") {
		optionValue = exit_adv;
		$m.juci.addDataset("status", false);
	}
	else if (activity_option == "Recruitment" && act_result.Meeting_Status.Description == "Met") {
		optionValue = recruit;
		$m.juci.addDataset("status", false);
		$m.juci.dataset("lead_disp", optionValue);
	}
	else if(activity_option == "Recruitment" && act_result.Meeting_Status.Description == "Not Met") {
		optionValue = recruit;
		$m.juci.addDataset("status", false);
		$m.juci.dataset("lead_disp", optionValue);
	}
	else if(leadtype.Lead_Type == "Existing Customer" || leadtype.Lead_Type == "New Business") {
			$m.juci.dataset("lead_disp",LeadDisp);
	}
	else if (activity_option == "Joint Call for NB" && act_result.Meeting_Status.Description == "Met") {
		if(act_result.Lead_Type != "Renewal"){
			//optionValue = joint_for_call;
			campaignValue = Campaign;
			$m.juci.addDataset("status", true);
			//$m.juci.dataset("lead_disp", optionValue);
		}else{
			optionValue = inputManagement.LeadRenewalDisp;
			campaignValue = Campaign;
			//act_result.Activity = act_result.Activity.Description;
			act_result.Sub_Activity = activity_option;
			$m.juci.addDataset("status", true);
			//$m.juci.dataset("lead_disp", optionValue);
		}
	}
	else if(activity_option == "Joint Call for NB" && act_result.Meeting_Status.Description == "Not Met") {
		optionValue = joint_for_call;
		$m.juci.addDataset("status", false);
	}
	$m.juci.dataset("newResultForm", act_result);
	$m.juci.dataset("activity_option", optionValue);
	$m.juci.dataset("campaign_drop", campaignValue);
}

/** Checking the next appointment date with current date**/
function assignDate(event) {
	var dob = $m.juci.dataset("newResultForm").Next_Appointment;
	var newdob = new Date(dob).toDateString();
	var currentDate =  new Date().toDateString();
	if(dob < new Date() && newdob!= currentDate){
		$m.juci.getDataset("newResultForm")().Next_Appointment('');
		$m.alert("Next Appointment Date should not lesser than  Current meeting Date");
	}
}

/** Disabling the next appointment based on meeting status**/
function disabledate(event) {
	var status = event.value.Description();
	var act_result = $m.juci.dataset("newResultForm");
	$m.juci.getControl("lead-disp").value(null);
	if(act_result.Lead_Type == "Renewal") {
		if(status == "Met") {
			$m.juci.dataset("lead_disp",inputManagement.LeadRenewalDisp);
			$m.juci.dataset("lifePlanner",true);
			$m.juci.dataset("activityDone",true);
			act_result.Activity = setValueFromOptions("activity_done", {
						"LA_CODE": "REG"
					}, localLaComparator);
			$m.juci.dataset("newResultForm",act_result);		
			callActivitySubType(act_result.Activity);
		}else {		
			$m.juci.dataset("lead_disp",inputManagement.renewal_disp);	
			$m.juci.dataset("lifePlanner",false);
			$m.juci.dataset("activityDone",true);
			act_result.Activity = setValueFromOptions("activity_done", {
						"LA_CODE": "REG"
				}, localLaComparator);
			//act_result.Sub_Activity = "Joint Call for NB";	
			$m.juci.findById("activity-subtype").hide();
			$m.juci.dataset("newResultForm",act_result);
		}
		$m.juci.dataset("aadharSection",false);
		$m.juci.dataset("aadhar_section", false);
		$m.juci.dataset("hasAuthenticated",true);
	}
	else{
		$m.juci.dataset("aadharSection",true);
		$m.juci.dataset("hasAuthenticated",false);
		if(status == "Met"){
			$m.juci.dataset("hasMet", true);
			$m.juci.dataset("status", true);
			$m.juci.dataset("aadharSection",true);
		//	$m.juci.dataset("lead_disp", inputManagement.LeadDisp);
			changeLabel("activity-dob", "Next Appointment",false);
		}
		else if(status == "Life Planner"){
			$m.juci.dataset("lifePlanner",true);
			changeLabel("activity-dob", "Next Appointment",false);
			changeLabel("activity-dob", "Activity Subtype",false);
			}
		else{
			$m.juci.dataset("hasMet", true);
			$m.juci.dataset("status", false);
			$m.juci.dataset("lifePlanner",true);
		//	$m.juci.dataset("lead_disp", inputManagement.LeadDisp);
			changeLabel("activity-dob", "Next Appointment",true);
			$m.juci.dataset("aadharSection",false);
			$m.juci.dataset("aadhar_section", false);
			$m.juci.dataset("hasAuthenticated",true);
			if(gettype() == "FLS"){
				$m.juci.dataset("isDispFls",true);
				/*act_result.Lead_Disposition =  setValueFromOptions("lead_disp_fls", {
					"Description": "Follow up for closures"
				}, inputComparator);*/
				dispostion_Value = lead_dis_notMet;
				$m.juci.dataset("lead_disp_fls",dispostion_Value);
			//	$m.juci.dataset("newResultForm",act_result);
			}
		}
		$m.juci.getControl("activity-type").value(null);
	}
}

/** Clearing the activity form**/
function setClose() {
	$m.juci.dataset("newResultForm", bindingObjInputManagement.ActivityResult);
	$m.juci.dataset("meeting", []);
	$m.juci.dataset("activity_done", []);
	var resultForm = utils.GetControl("resultForm");
	resultForm.clearValidation();
}

/** Open the otp pop-up when user has chosen as otp in aadhar**/
function openOtp(value) {
	$m.showProgress("Loading OTP...");
	var callback = function(){
		utils.HideDialog("authentication");			
		utils.ShowDialog("dialog-otp");
	};
	var aadhar = $m.juci.getControl("Aadhar").value();
	$m.juci.dataset("aadharno", aadhar);
	if (aadhar) {
		getOtp(aadhar,callback);
	} else {
		$m.hideProgress();
		$m.alert("Please note  Aadhar Card number is Mandatory & application should not processed further without valid Aadhar Number");
	}
}

/** Resend the otp when user has chosen as otp in aadhar**/
function resendOtp() {
	$m.showProgress("Loading OTP...");
	var callback = function(){
		utils.HideDialog("dialog-otp");
		utils.ShowDialog("dialog-otp");
	};
	var aadhar = $m.juci.getControl("Aadhar").value();
	$m.juci.dataset("aadharno", aadhar);
	if (aadhar) {
		getOtp(aadhar,callback);
	} else {
		$m.hideProgress();
		$m.alert("Please enter Aadhar number");
	}
}

/** Send the otp when user has chosen as otp in aadhar**/
function sendOtp(event) {
	var aadharObject = {};
	var resultform = $m.juci.dataset("newResultForm");
	var aadhar = $m.juci.dataset("Aadharno");
	var Otp = juci.getControl("otpNo").value();
	if (!Otp) {
		$m.alert("Please enter Otp");
		return;
	}
	$m.showProgress("Fetching Aadhaar Details...");
	var callback = function(response) {
		var aadhar_result = response.data;
		var result = x2js.xml_str2json(aadhar_result);
		var Adhar_data = result.Envelope.Body.Production_EkycThroughOTP_RDserviceResponse.Production_EkycThroughOTP_RDserviceResult.KeyValueOfstringstring;
		if (Adhar_data.Value) {
			var validation = checkValidation(Adhar_data,"otpNo","dialog-otp");
				if(!validation){	
					return;
				}
			}
	   aadharObject = setValues(Adhar_data);
	   var Address = checkAddress("dialog-otp",aadharObject,"otpNo");
	   	   if(!Address){
				return;
			}
		if (aadharObject["Name"]) {
			var aadharDate = new Date(ChangeFormatofDate(aadharObject.DOB));
			var activity_type = $m.juci.dataset("newResultForm");
			var activityLeadType = (activity_type.Lead_Type == "Recruitment" || activity_type.Lead_Type == "New Business" || activity_type.Lead_Type == "Existing Customer");
			if(aadharDate.getDate() == "01" && aadharDate.getMonth() == "0" && activityLeadType){
				$m.alert("Since Aadhaar with DoB as 01/01/"+aadharDate.getFullYear()+ " is a non-standard age proof.Please click Ok to continue with proposal creation.");
			}
			var aadharData = assignAadhardata(aadharObject,resultform.Lead_Id, aadhar_result,"OTP");
			setAadhaarValues(aadharData);
			juci.hideDialog("dialog-otp");
			$m.hideProgress();
		} else {
			$m.hideProgress();
			juci.getControl("otpNo").value(null);
			$m.alert("Your Aadhar No is Invalid");
			return;
		}
		juci.getControl("otpNo").value(null);
	}
	AadharServices.VerifyOtp(Otp, aadhar, callback);
}

/** Close the dialog box when user click close box**/
function closebox() {
	juci.hideDialog("dialog-otp");
	juci.getControl("otpNo").value(null);
}

/** Check the aadhar number is valid or not and open dialog box if the aadhar is valid**/
function openauthentication() {
	var aadhar = $m.juci.dataset("Aadharno");
	$m.juci.dataset("aadharno", aadhar);
	if (aadhar) {
		if(aadhar.length < 12){
			$m.alert("Please enter valid Aadhaar number");
			return;
	}
		utils.ShowDialog('authentication');
	} else {
		$m.alert("Please enter Aadhar number");
	}
}

/** Close the dialog box when user click close box**/
function closeadhar() {
	utils.HideDialog('authentication');
}

/** Go to life planner page**/
function gotoLifePlanner() {
	//var displaytText = "Would you like to proceed to Life Planner?";
	//var yesCallback = function(){
		var isChecked;
		var newResult = $m.juci.dataset("newResultForm");
		var checkAadhaar = utils.GetControl("checkAadhar").value();
		var isAadhaar = $m.juci.dataset("aadhar_section");
		if(isAadhaar){
			if(checkAadhaar){
				isChecked = true;
				utils.PutPref("AadhaarLead_ID",newResult.Lead_Id);		
			}
		}
		var dobCheck = $m.juci.dataset("LA_DOB");
		var passingData ={};
		var aadharData = utils.GetPref("AadhaarData");
		passingData.Name = isChecked ?aadharData.Customer_Name :newResult.Name;
		if(dobCheck) {
			passingData.DOB = dobCheck.toString("MM/dd/yyyy")
		} else {
			passingData.DOB = isChecked ?utils.GetDateByTimeStamp(aadharData.DOB).toString("MM/dd/yyyy") :newResult.DOB;	
		}
		
		passingData.City = isChecked ?aadharData.City :newResult.City;
		passingData.Gender = isChecked ?aadharData.Gender :newResult.Gender;
		passingData.Income = newResult.Income;
		passingData.Marital_Status= newResult.Marital_Status;
		passingData.Activity_Id = newResult.Activity_Id;
		passingData.activity_result_id = $m.getPref("activity_result_id");
		passingData.Lead_Id = newResult.Lead_Id;
		passingData.MobileNumber = data.Mobile;
		utils.PutPref("Lead_ID",passingData.Lead_Id);
		utils.OpenPage("Life Planner","/Input Management/stageGraph.html",passingData,"");
	//};
//	var noCallback = function(){
//		$m.setResult(true);
//		utils.RemovePref("AadhaarLead_ID");
//    	utils.ClosePage();
//	};
 	//utils.ConfirmBox(displaytText,yesCallback,noCallback);
}

/** Assign the aadhar details to an object**/
function assignAadhardata(objects, Lead_Id, ekyc,authenticateBy) {
	var aadharMorphoInfo = utils.GetPref("aadharMorphoInfo");
	var morphoSerialNo,morphoPnNo;
	if(aadharMorphoInfo != undefined){
		var morphoSplit = aadharMorphoInfo.result.model.split("-");
		morphoSerialNo = morphoSplit[1];
		morphoPnNo = morphoSplit[0];	
	}else{
		morphoSerialNo = "";
		morphoPnNo = "";
	}
	var aadharObj = {};
		aadharObj.Lead_ID = Lead_Id;
		aadharObj.Aadhar_Number = objects.AadhaarNumber;
		aadharObj.Authenticate_By = authenticateBy;
		aadharObj.Details_Approved = "Y";
		aadharObj.Customer_Name = objects.Name;
		aadharObj.DOB = utils.GetTimeStampByDate(ChangeFormatofDate(objects.DOB));
		aadharObj.Gender = objects.Gender;
		aadharObj.Contact_No = objects.Phone;
		aadharObj.Email_ID = objects.Email;
		aadharObj.Care_Of_Person = objects.CareOfPerson;
		aadharObj.House_Identifier = objects.House;
		aadharObj.Street_Name = objects.Street;
		aadharObj.Landmark = objects.Landmark;
		aadharObj.Customer_Photo = objects.Photo;
		aadharObj.Locality = objects.Locality;
		aadharObj.City = objects.city;
		aadharObj.Sub_District = objects.SubDistrict;
		aadharObj.District = objects.District;
		aadharObj.State = objects.State;
		aadharObj.Pincode = objects.PinCode;
		aadharObj.PostOffice_Name = objects.PostOfficeName;
		aadharObj.EKYC_XML = ekyc;  //.replace(/"/g, '\\"')
		aadharObj.Added_By = utils.GetLoginCode();
		aadharObj.Source_From = "TAB";
		aadharObj.Entry_Stage = "string";
		aadharObj.Device_SN = morphoSerialNo;
		aadharObj.Device_PN = morphoPnNo;
		aadharObj.SAPCode = utils.GetLoginCode();
		aadharObj.issync = 0;
		aadharObj.iscompleted = 1;
	return aadharObj;
}

/** Formating the date for life planner**/
function ChangeFormatofDate(date) {
	var date1 = date;
	date1 = date1.split("-");
	currdate = date1[1] + "/" + date1[0] + "/" + date1[2];
	return currdate;
}

/** Open the biometric if user has chosen the biometric for aadhar**/
function openBiometric(){
	var aadharNo = $m.juci.dataset("Aadharno");
//	var isFingerPrintConnected = function(resp){
//		console.log(JSON.stringify(resp));
//	};
//	
//	var fingerPrintCallback = function(res){
//			if (res.code == 1) {
//				$m.hideProgress();
//				 utils.HideDialog('authentication');
//        		 utils.ShowDialog("dialog-fingerprint");
//				console.log(res);
//			}
//			if (res.code === 0) {
//				$m.hideProgress();
//				$m.alert(res.error.message, "Finger Print Scan Error", function() {});
//			}
//	};
//	var scanCallback = function(res){
//		if (res.data.status === 0) {
//			utils.HideDialog("dialog-fingerprint");
//			$m.juci.dataset("fingerPrint", null);
//			$m.alert(res.data.error, "Finger Print Scan Error", function() {});
//		} else if (res.data.status == 1) {
//			var result = res.data.result;
//			var pidblock = x2js.xml_str2json(result);
//			console.log(JSON.stringify(pidblock));
//			utils.PutPref("PIDData", pidblock);
//		} else if (res.data.status == 2) {
//			$m.hideProgress();
//			console.log(res.data.status);
//			var img = "data:image/png;base64,"+res.data.result;
//			if(img){
//			$m.juci.dataset("fingerPrint", img);
//			}
//		}
//	};
//	
//	var fingerPrintDeviceInfoCallback = function(res){
//		utils.PutPref("aadharMorphoInfo",res);
//	};
//	
//	AadharServices.CaptureBiometric(aadharNo,fingerPrintCallback,scanCallback);
//	$m.fingerprintDeviceInfo(fingerPrintDeviceInfoCallback);

	var ValidateBiometricCallback = function(res) {
		callBiometricService(res);
	};
	var fingerPrintCallback = function(res) {
		if(res.code == 1){
			var finalData = x2js.xml_str2json(res.result.PID_DATA);
			utils.PutPref("FingerprintData",finalData);
			var morphoInfo = utils.GetPref("MorphoDeviceInfo");
			utils.ShowProgress("Fetching Aadhaar Data..");
			AadharServices.ValidateBiometric(morphoInfo,finalData,ValidateBiometricCallback);
		} else {
			$m.alert(res.result);
			$m.logError("finger print callback failed due to : "+res);
		}	
	};
	var getMorphoDeviceCallback = function(res) {
		if(res.code == 1){
			utils.HideProgress();
			var finalRes = x2js.xml_str2json(res.result.DeviceInfo);
			utils.PutPref("MorphoDeviceInfo",finalRes);
			$m.initFingerCaptureInput(fingerPrintCallback);
		} else {
			utils.HideProgress();
			$m.alert(res.result);
			$m.logError("morpho device callback failed due to : "+res);
		}
	};
	var registerMorphoCallback = function () {
		utils.HideProgress();
		utils.ShowProgress("Capturing device data..");
		$m.getMorphoDeviceInfo(getMorphoDeviceCallback);
	};
	AadharServices.RegisterMorphoDevice(aadharNo,registerMorphoCallback);
}

function closeAuthenticate(){
	utils.HideDialog('authentication');
}

/** Save the aadhar details to the server*/
function saveToServer(aadharData){
		customer_aadhar = new Customer_Aadhar_Details(aadharData);
		var updatecallback = function(res) {
			if($m.networkConnected()) {
					var ekyccallback = function(res) {
						if (res.Status == "Y") {
							var serverAlertCallback = function(){
//								var appfilter = new DB.Filter.equal("Lead_ID",aadharData.Lead_ID);
//								Customer_Aadhar_Details.updateSync({
//									"issync": "1"
//								}, appfilter, function() {
									saveActivityForm();
//								});
							};
							$m.alert("Aadhaar Record inserted successfully to server","Alert",serverAlertCallback);
						} else {
								$m.logError("Failed to insert Aadhar Details response is" + ' ' + res.Status);
								$m.alert("Failed to insert Aadhar Details response is" + ' ' + res.Status, "Failed to Insert", function() {
									$m.close();
								});		
						}
					};
					$m.logError("Activity Result -> Info -> Save EKYC" +' '+ JSON.stringify(aadharData));
					service.saveEKYC(ekyccallback, aadharData);
			}
			else{
				$m.alert(messages.NoNetworkConnectivity, "Network Alert", function() {
					saveActivityForm();
				});
			}
		};
		utils.PojoUpdate("Customer_Aadhar_Details", updatecallback, customer_aadhar);
	}

/** Call the biometric services*/
function callBiometricService(res) {
	utils.ShowProgress("Fetching Aadhaar Details...");
	$m.logInfo("Fetching Aadhaar details..");
	var pidData = res;
	var resultform = $m.juci.dataset("newResultForm");
	if(pidData){
		$m.logInfo("pidData.." + pidData);
		//var aadhaarCallback = function(response) {
			var resultData = res.data;
			$m.logInfo("resultData.." + resultData);
			var result = x2js.xml_str2json(resultData);
			var Adhar_data = result.Envelope.Body.Production_EkycThroughBiometricForRegisteredDeviceResponse.Production_EkycThroughBiometricForRegisteredDeviceResult.KeyValueOfstringstring;
			$m.logInfo("Adhar_data.." + Adhar_data);
			if (Adhar_data.Value) {
				var validation = checkValidation(Adhar_data,"");
					if(!validation){
						$m.juci.dataset("aadhar_section", false);
						return;
					}
			}
			aadharObject = setValues(Adhar_data);
			var Address = checkAddress("dialog-fingerprint",aadharObject,"");
		    if(!Address){
		    	return;
			}	
			if (aadharObject["Name"]) {
				var aadharDate = new Date(ChangeFormatofDate(aadharObject.DOB));
				var activity_type = $m.juci.dataset("newResultForm");
				var activityLeadType = (activity_type.Lead_Type == "Recruitment" || activity_type.Lead_Type == "New Business" || activity_type.Lead_Type == "Existing Customer");
				if(aadharDate.getDate() == "01" && aadharDate.getMonth() == "0" && activityLeadType){
					//$m.alert("Since Aadhaar with DoB as 01/01/"+aadharDate.getFullYear()+ "is a non-standard age proof.Please click Ok to continue with proposal creation.");
					var yesCallback = function () {};
					var noCallback = function(){
						utils.ShowDialog('dialog-dob');	
						$m.juci.findByClass("life2assure")[0].el.style.display="none";
					};
					utils.ConfirmBox("Is LA DOB is same as per Aadhar",yesCallback,noCallback);
				}
				var aadharData = assignAadhardata(aadharObject,resultform.Lead_Id, resultData,"Biometric");
				utils.HideDialog("dialog-fingerprint");
				setAadhaarValues(aadharData);
				$m.hideProgress();
			} else {
				$m.hideProgress();
				$m.alert("Your Aadhar No is Invalid");
				return;
			}
		//}
		//AadharServices.ValidateBiometric(pidData, aadhaarCallback);
	}
	else{
		$m.alert("Please do biometric authentication");
		return;
	}
}

/** Update the lead details with aadhar details if the lead is deifferent**/
function checkAadhaarValidation(){
	var displaytText;
	var checkAadhaar = utils.GetControl("checkAadhar").value();
	utils.PutPref("checkAadhar",checkAadhaar);
	var aadharData = utils.GetPref("AadhaarData");
	if(aadharData){
		if(checkAadhaar){
			var resultform  = $m.juci.dataset("newResultForm");
		    var aadhar_DOB = utils.GetDate(aadharData.DOB);
		    var leaddob = new Date(resultform.DOB).toString("dd/MM/yyyy");
		    	displaytText = "Your Aadhaar Name or Date of Birth doesn't match with Lead data.Would you like to update lead data with Aadhaar Details";
				var yesCallback = function() {
					var serviceCallback = function(res){
						if(res.Status != "N"){
							$m.toast("Lead Details updated successfully");	
						} else {
							$m.alert("Lead service update failed due to : "+JSON.stringify(res));
							$m.logError("Lead service update failed due to : "+JSON.stringify(res));
						}
					};
					var checkDOBValidate = $m.juci.dataset("LA_DOB");
					var data = {};
					data.Name = aadharData.Customer_Name;
					if(checkDOBValidate){
						data.DOB = new Date(checkDOBValidate).getTime();
					} else {
						data.DOB  = aadharData.DOB;	
					}
					data.Gender = aadharData.Gender;
					data.Lead_Id = resultform.Lead_Id;
					data.Activity_Id = resultform.Activity_Id;
					data.Pin_Code = aadharData.Pincode;
					data.DOB_Changed = checkDOBValidate ? "Y" : "N";
					//data.City = aadharData.City;
					data.Sync_Txn_Id = utils.GetTimeStamp();
					service.updateLeadInformation(serviceCallback,data);	
				};
				var noCallback = function(){
					$m.juci.dataset("aadhar_section",false);
					utils.GetControl("checkAadhar").value(false);
					utils.RemovePref("AadhaarData");
				};
			if((resultform.Name.toUpperCase() == aadharData.Customer_Name.toUpperCase()) && ( aadhar_DOB == leaddob) && !checkDOBValidate){
			}
			else{
				utils.ConfirmBox(displaytText,yesCallback,noCallback);
			}
		}
		else{
		}
	}
	else{
		utils.GetControl("checkAadhar").value(false);
		$m.alert("No Aadhaar Data found");
		}
}

/** Assign the aadhar details on the local table**/
function setAadhaarValues(aadharrows){
	    utils.PutPref("AadhaarData",aadharrows);
		var Aadhar_data = {};
		    Aadhar_data.Name = aadharrows.Customer_Name;
			Aadhar_data.DateofBirth = utils.GetDate(utils.GetDateByTimeStamp(aadharrows.DOB));
			Aadhar_data.Gender = aadharrows.Gender;
			Aadhar_data.Phone = aadharrows.Contact_No;
			Aadhar_data.EmailID = aadharrows.Email_ID;
			Aadhar_data.Address = aadharrows.House_Identifier + " " + aadharrows.Landmark+ " " + aadharrows.Locality + " " + aadharrows.Street_Name + " " + aadharrows.District + " " + aadharrows.Pincode;
			if(new Date(aadharrows.DOB).getDate() == "01" && new Date(aadharrows.DOB).getMonth() == "0"){
				var yesCallback = function () {};
				var noCallback = function(){
					utils.ShowDialog('dialog-dob');	
				};
				utils.ConfirmBox("Is LA DOB is same as per Aadhar",yesCallback,noCallback);
			}
			$m.juci.dataset("Aadharno", aadharrows.Aadhar_Number);
			$m.juci.dataset("Aadhar", Aadhar_data);
			$m.juci.dataset("aadhar_section", true);
}

/** Open the life planner page based on usertype and meeting status**/
function openLifePlannerPage(datasetData){
	if(utils.GetUserType() != "FLS"){
		if(datasetData.Meeting_Status == "Met" && utils.GetUserType() != "AGPS" && datasetData.Sub_Activity != "Recruitment" && datasetData.Lead_Type != "Renewal" && utils.GetUserType() != "ENADV"){
			gotoLifePlanner();
		}else{
			$m.setResult(true);
	    	utils.ClosePage();
		}	
	}else{
		if(datasetData.Meeting_Status == "Met" && datasetData.Activity === "Converted"){
			gotoLifePlanner();
		}else{
			$m.setResult(true);
	    	utils.ClosePage();
		}	
	}
}

/** Open the reference lead**/
function openReference(){
	utils.OpenPage("New Lead","/Input Management/newlead.html",data.Lead_Id,"");
}


/** Save the activity form to local dB and the server**/
function saveForm(datasetData){
	$m.showProgress("Syncing data...");
	var callback = function(res) {
		if (res.Status == "Y") {
			var serverAlertCallback = function(){
			var appfilter = new DB.Filter.equal("Sync_Txn_Id", "'" + res.Sync_Txn_Id + "'");
			var data = {
				"issync": "1"
			}
			saveActivityResult.updateSync(data, appfilter, function() {
			    $m.hideProgress();
			    openLifePlannerPage(datasetData);
			});
			};
			$m.alert("Record inserted successfully to server","Alert",serverAlertCallback);
		} else {
			$m.logError("Failed to insert Activity Results response is" + ' ' + res.Status);
			$m.alert("Failed to insert Activity Results response is" + ' ' + res.Status, "Failed to Insert", function() {
				utils.HideProgress();
				utils.ClosePage();
			});
		}
	};
	
//	fireRequestInput("SaveActivity", datasetData, callback);
	service.syncLeadActivityResultDetails(callback,datasetData);
}

function validateWithLeadType(value) {
	console.log(value);
	if(typeof value == "object"){
		if (value() != "") {
			var description = value().Description();
			if (description != "Joint Call for NB") {
				return true;
			} else {
				return false;
			}
		}
	}else{
		if (value != "") {
			var description = value;
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

function getTriggerSmsValue(){
	var value = $m.juci.getControl("productUpdate").value();
	$m.juci.getControl("plan-code").value(null);
	$m.juci.getControl("plan-code").clearValidation();
	prod_value = value ? prod_value = "Y" : prod_value = "N";
	if(value){
		$m.juci.dataset("isProductsList",true);
		var ListOfProducts = [];
		for(var i = 0;i< ProductsMaster.length;i++){
			ListOfProducts[i] =  ProductsMaster[i].ProductName
		}
		$m.juci.dataset("products_list",ListOfProducts);
	}else{
		$m.juci.dataset("isProductsList",false);
		productCode = "";
	}
}

function getTriggerSmsValueOthers(){
	var claim_value = $m.juci.getControl("claimsRec").value();
	var companyinfo = $m.juci.getControl("companyinfo").value();
	claimValue = claim_value ? claimValue = "Y" : claimValue = "N";
	companyInfo = companyinfo ? companyInfo ="Y" : companyInfo = "N";

}

function takeProductCode(event){
	var choosen_products = event.value;
	for(var i = 0 ;i< ProductsMaster.length ;i++){
		if(choosen_products == ProductsMaster[i].ProductName){
			productCode = ProductsMaster[i].PlanCode;
		}
	}
}

function checkProductUpdate(id){
	var value = $m.juci.getControl("productUpdate").value();
	if(value){
		return false;
	}else{
		return true;
	}
}

function callSubType(event) {
	var eventdata = event.value.Description();
	var dispostion_Value;
	$m.juci.dataset("isDispFls",true);
	if(eventdata == "Not Interested") {
		dispostion_Value = inputManagement.LeadDispForNotInt;
	} else if(eventdata == "Follow up") {
		dispostion_Value = inputManagement.LeadDispForFollowUp;
	} else if(eventdata == "Renewal Collected") {
		dispostion_Value = inputManagement.LeadDispForRenewalCollected;
	} else {
		dispostion_Value = inputManagement.LeadDispForConverted;
	}
	$m.juci.dataset("lead_disp_fls",dispostion_Value);
}

function callActivitySubTypeFls(){
	var activity_option_Value;
	var resultform = $m.juci.dataset("newResultForm");
	$m.juci.dataset("SubtypeOption", true);
	if(data.LeadTypeFlag == "NB"){
		activity_option_Value = ["Joint Call for NB"];
	}else{
		activity_option_Value = ["No joint call"];
	}
	resultform.Sub_Activity_Options = activity_option_Value[0];
	$m.juci.dataset("activity_option",["Joint Call for NB","No joint call"]);
	$m.juci.dataset("newResultForm",resultform);
}

/*function getAadharDetails(lead_id){
	var aadharcallback = function(res){
		var aadharrows = res.rows[0];
		var sapCode = aadharrows.Added_By;
		var aadharCallback = function(resp){
			aadharrows.EKYC_XML = resp[0].ekycXml;
			aadharrows.Customer_Photo = resp[0].customer;
			aadharrows.Lead_ID = lead_id;
			var customer_aadhar = new Customer_Aadhar_Details(aadharrows);
			var aadharpPojoCallback = function(res){
				//$m.logInfo("Successfully inserted..");
			};
			utils.PojoUpdate("Customer_Aadhar_Details",aadharpPojoCallback,customer_aadhar);			
   		};
	 fireRequestEkycXml("getEkycBySapCode",sapCode,lead_id,aadharCallback);
	};
	utils.PojoSelectWithFilter("Customer_Aadhar_Details",aadharcallback,lead_id);
}

function fireRequestEkycXml(action, sapcode,lead_id, callback){
	var url = "http://124.124.218.136/supertrack/mowblyserver/sGetEKYCXml/rellife/prod/RlifeAssist";
	if ($m.networkConnected()) {
		$m.post(url, {"action":action,"sapCode":sapcode,"lead_id":lead_id,"headers": {
			"Content-Type": "application/json"
			}}, function(callback) {
			return function(response) {
				if (response.code == 200) {
					var result = JSON.parse(response.result.data);
					if(result.length != 0){
						$m.hideProgress();
						callback.call(this, result);
					} else {
						$m.hideProgress();
						callback.call(this, result);
						$m.logError(JSON.stringify(response));
					}	
				}  else {
					$m.alert(messages.ServerMessage,"Server Message",function(){
					$m.hideProgress();
					$m.close();
					});
					var errMsg = response;
					$m.logError(JSON.stringify(response));
				}
			};
		}(callback));
	} else {
		$m.alert(messages.NoNetworkConnectivity,"Network Error",function(){
		$m.hideProgress();
		});
	}
}*/

var flag = 0;
function viewTextBox(){
	if(flag == 0){
		$m.juci.dataset("adag_group",true);
		flag = 1;
	}else{
		$m.juci.dataset("adag_group",false);
		flag = 0;
	}
}

function changeLeadCategory(event){
	if(event.value == "Service Update")	{
		$m.juci.dataset("leadCategory",changeLeadCategoryDropdownForServiceUpdate);
	} else {
		$m.juci.dataset("leadCategory",inputManagement.LeadCategory);
	}
}

function fetchAadharData(lead_id){
	service = new ServiceLibrary();
	if($m.networkConnected()){
		var aadharCallback = function(res){
			if(res.length) {
				var aadharpPojoCallback = function(res){
					setAadhaarData(lead_id);	
				};
				utils.PojoMultiReplace("Customer_Aadhar_Details",res,aadharpPojoCallback);	
			}
   		};
		service.getEKYCBySAP(lead_id,aadharCallback);
	} else {
		$m.alert("Network disconnected in between. Please try later.");
	}
}

function onUpdateDOB() {
	var checkDobValidation = $m.juci.dataset("LA_DOB");
	if(checkDobValidation) {
		utils.HideDialog("dialog-dob");	
		$m.juci.findByClass("life2assure")[0].el.style.display="block";
	} else {
		$m.alert("Enter your DOB");
	}
}

function checkDOBValidation(event){
	var checkDOB = $m.juci.dataset("LA_DOB")
	var age = utils.GetAge(checkDOB);
	if(age < 18){
		$m.alert("LA DOB cannot be minor, please enter valid age");
		$m.juci.findByClass("life2assure")[0].el.style.display="none";
		return;
	}
	else{
		$m.juci.findByClass("life2assure")[0].el.style.display="block";
	}
}

function hidelife2assure(){
	$m.juci.findByClass("life2assure")[0].el.style.display="none";
}
