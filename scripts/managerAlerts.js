var selectedLeadCnt = "";

$m.onResume(function(){
	$m.juci.getControl("toogle").toggle(0);
	initResume();
});

// fetching attendance count
function initResume() {
	utils.ShowProgress("fetching alerts information..");
	var service = new ServiceLibrary();
	if($m.networkConnected()){
		var callback = function(r){
			if(r == "Y"){
				var alertInformationCallback = function(r){
					utils.HideProgress();
					if(r.Status == "Y") {
						var attendanceAlert = r.lstResponse_Attendance;
						$m.juci.dataset("attendanceAlerts",attendanceAlert);
					} else {
						$m.alert("fetching alert info failed due to :"+JSON.stringify(r));
						$m.logError("fetching alert info failed due to :"+JSON.stringify(r));
					}
				};
				var inputRequest = {"BMCode":"70036363","AlertSubType":"","AlertType":"Attendance"};
				service.getAlertInformation(alertInformationCallback,inputRequest);
			} else {
				$m.logError("failed to fetch dashboard count");
			}
		};
		fetchDashboardCount("70036363",callback);
	}else {
		$m.alert(messages.NoNetworkConnectivity);
	}
}

// fetching leads alert data
function getLeadsdata(){
	$m.juci.dataset("prospectData",false);
	$m.juci.dataset("newBusiness",0);
	$m.juci.dataset("recruitment",1);
	$m.juci.dataset("leadsDataNewBusiness",[]);
	RecruitmentData = [];
	newBusinessdata = [];
	var newBusinessCnt = 0;
	var RecruitmentCnt = 0;
	var leadRequestData = {"BMCode":"70036363","AlertSubType":"New  Business","AlertType":"Leads"};
	utils.ShowProgress("fetching leads information..");
	var service = new ServiceLibrary();
	if($m.networkConnected()){
		var alertInformationCallback = function(r){
			utils.HideProgress();
			if(r.Status == "Y") {
				var leaddata = r.lstResponse_Leads;
				for (i = 0; i < leaddata.length; i++) {
					if(leaddata[i].LeadType == "Recruitment"){
						RecruitmentData.push(leaddata[i]);						
					}
					else{
						newBusinessdata.push(leaddata[i]);
					}
				}
			//	getNbAndAegingCnt(newBusinessdata);
				$m.juci.dataset("leadsDataNewBusiness",newBusinessdata);
			}
			else{
				$m.alert("fetching the Lead Data failed due to :"+JSON.stringify(r));
				$m.logError("fetching the Lead Data failed due to :"+JSON.stringify(r));
			}
		};
		service.getAlertInformation(alertInformationCallback,leadRequestData);
	}else {
		$m.alert(messages.NoNetworkConnectivity);
	}
}


//show New Business Leads Data
function shownewBusinessdata(){
	$m.juci.dataset("leadsDataNewBusiness",newBusinessdata);
	$m.juci.dataset("prospectData",false);
	$m.juci.dataset("newBusiness",0);
	$m.juci.dataset("recruitment",1);
}

//show Recruitment Leads Data
function showrecruitmentsdata(){
	$m.juci.dataset("leadsDataNewBusiness",RecruitmentData);
	$m.juci.dataset("prospectData",false);
	$m.juci.dataset("newBusiness",1);
	$m.juci.dataset("recruitment",0);
}

// fetching leads prospect data
function showProspectData(data,event){
	if(event.target.innerText != "0"){
		if(event.currentTarget.id != ""){
			$m.juci.findById(event.currentTarget.id).el.style.color="black";
		}
		var inputProspectData=  {};
		selectedLeadCnt = event.currentTarget.id.split(" ")[0];
		if(data.AlertType() == "Leads"){
			inputProspectData.AlertSubType ="";
			inputProspectData.LeadType =data.LeadType();
		}
		else{
			inputProspectData.AlertSubType= data.AlertSubType().includes("NonSuperExpress")? "NonSELogin":data.AlertSubType();
			inputProspectData.LeadType = "";
		}
		inputProspectData.AlertSubType2 =selectedLeadCnt;
		inputProspectData.AlertType =data.AlertType().includes("Login")? "Login" :data.AlertType() ;		
		inputProspectData.SMCode =data.SM_Code();
		var requestData={};
		requestData.SMCode =data.SM_Code();
		requestData.BMCode ="70036363";
		requestData.Isread ="1";
		if(data.AlertType() == "Leads"){
			requestData.LeadType =data.LeadType();
		} else {
			requestData.LeadType = "";
		}
		requestData.SubType = selectedLeadCnt;
		requestData.Type= "Table";
		fetchProspectInfoFromServer(inputProspectData,"leadsProspectData",requestData,"prospectData");
	}else{
		$m.alert("No Prospect data for Aging value 0 ");
		$m.juci.dataset("prospectData",false);
	}
}

function onNextMeetingsClick() {
	$m.juci.dataset("meetingsNext3",true);
	$m.juci.dataset("nextflag",0);
	$m.juci.dataset("rescheduledflag",1);
	$m.juci.dataset("authenticatedflag",1);
	$m.juci.dataset("meetingsRescheduled",false);
	$m.juci.dataset("meetingsAuthenticate",false);
	$m.juci.dataset("meetingsAuthenticatedCnt7",false);
	$m.juci.dataset("meetingsAuthenticatedCnt30",false);
	$m.juci.dataset("meetingsAuthenticatedCnt15",false);
	
	var service = new ServiceLibrary();
	var meetingsdata = {"BMCode":"70036363","AlertSubType":"MD","AlertType":"Meetings"};
	if($m.networkConnected()){
		//utils.ShowProgress("fetching meetings information..");
		var alertInformationCallback = function (r) {
			//utils.HideProgress();
			if(r.Status == "Y") {
				updateNotify("MD","Tab");
				var nextMeetings = r.lstResponse_Meeting3;
				for(var i=0;i<nextMeetings.length;i++){
					nextMeetings[i].ARDM = "Discussed with ARDM";
				}
				$m.juci.dataset("meetings3",nextMeetings);
			} else {
				$m.logError("fetching meetings failed due to :"+JSON.stringify(r));
			}
		};
		service.getAlertInformation(alertInformationCallback,meetingsdata);
	} else {
		$m.alert(messages.NoNetworkConnectivity);
	}
}

// Meetings Schedule
function onMeetingsRescheduledClick() {
	$m.juci.dataset("nextflag",1);
	$m.juci.dataset("rescheduledflag",0);
	$m.juci.dataset("authenticatedflag",1);
	$m.juci.dataset("meetingsRescheduled",true);
	$m.juci.dataset("meetingsNext3",false);
	$m.juci.dataset("meetingsAuthenticate",false);
	$m.juci.dataset("meetingsProspectRescheduled",false);
	$m.juci.dataset("meetingsProspectScheduledRecruitment",false);
	$m.juci.dataset("meetingsAuthenticatedCnt7",false);
	$m.juci.dataset("meetingsAuthenticatedCnt30",false);
	$m.juci.dataset("meetingsAuthenticatedCnt15",false);
	$m.juci.dataset("meetingsProspectInfoNext3days",false);
		
	var service = new ServiceLibrary();
	var meetingsdata = {"BMCode":"70036363","AlertSubType":"MR","AlertType":"Meetings"};
	if($m.networkConnected()){
		utils.ShowProgress("fetching meetings information..");
		var alertInformationCallback = function (r) {
			utils.HideProgress();
			if(r.Status == "Y") {
				updateNotify("MR","Tab");
				var meetingsScheduled = r.lstResponse_MeetingRescheduled;
				for(var i=0;i<meetingsScheduled.length;i++){
					meetingsScheduled[i].ARDM = "Discussed with ARDM";
				}
				$m.juci.dataset("meetingsScheduled",meetingsScheduled);
			} else {
				$m.logError("fetching meetings failed due to :"+JSON.stringify(r));
			}
		};
		service.getAlertInformation(alertInformationCallback,meetingsdata);
	} else {
		$m.alert(messages.NoNetworkConnectivity);
	}
}

// Meetings Authenticate
function onMeetingsAuthenticateClick() {
	var newBusinessArray = [];
	var recruitmentArray = [];
	$m.juci.dataset("nextflag",1);
	$m.juci.dataset("rescheduledflag",1);
	$m.juci.dataset("authenticatedflag",0);
	$m.juci.dataset("meetingsRescheduled",false);
	$m.juci.dataset("meetingsNext3",false);
	$m.juci.dataset("meetingsAuthenticate",true);
	$m.juci.dataset("meetingsProspectRescheduled",false);
	$m.juci.dataset("meetingsProspectScheduledRecruitment",false);
	$m.juci.dataset("meetingsAuthenticatedCnt7",false);
	$m.juci.dataset("meetingsAuthenticatedCnt30",false);
	$m.juci.dataset("meetingsAuthenticatedCnt15",false);
	$m.juci.dataset("meetingsProspectInfoNext3days",false);
	
	var service = new ServiceLibrary();
	var meetingsdata = {"BMCode":"70036363","AlertSubType":"Ageing","AlertType":"Meetings"};
	if($m.networkConnected()){
		//utils.ShowProgress("fetching meetings information..");
		var alertInformationCallback = function (r) {
			//utils.HideProgress();
			if(r.Status == "Y") {
				updateNotify("MAgeing","Tab");
				var responseData = r.lstResponse_MeetingAgeing;
				for(var i=0;i<responseData.length;i++){
					if(responseData[i].LeadType == "New Business"){
						newBusinessArray.push(responseData[i]);
						$m.juci.dataset("meetingsAuthenticatedNewBusiness",newBusinessArray);
					} else {
						recruitmentArray.push(responseData[i]);
						$m.juci.dataset("meetingsAuthenticatedRecruitment",recruitmentArray);
					}
				}
			} else {
				$m.logError("fetching meetings failed due to :"+JSON.stringify(r));
			}
		};
		service.getAlertInformation(alertInformationCallback,meetingsdata);
	} else {
		$m.alert(messages.NoNetworkConnectivity);
	}
}
function getAlertInformation(requstData,callback){
		var service = new ServiceLibrary();
		if($m.networkConnected()){
		var alertInformationCallback = function(r){
			utils.HideProgress();
			if(r.Status == "Y") {
				callback(r);
			}
			else{
				$m.alert("fetching the alert Data failed due to :"+JSON.stringify(r));
				$m.logError("fetching the Lead Data failed due to :"+JSON.stringify(r));
				}
		};
		service.getAlertInformation(alertInformationCallback,requstData);
	}else {
		$m.alert(messages.NoNetworkConnectivity);
	}
} 

function GetRenewalsData(){
	var RequestData = {"BMCode":"70085536","AlertSubType":"","AlertType":"Renewal"};
	utils.ShowProgress("Fetching renuwals information..");
	var callback = function(res){
		var renewalsData = res.lstResponse_Renewal;
		for(var i =0;i< renewalsData.length;i++){
			renewalsData[i].PaidToDate=  utils.GetFormatedDate(renewalsData[i].PaidToDate);
			renewalsData[i].ARDM = "Discussed with ARDM";
		}
		$m.juci.dataset("Renuwals",true);
		$m.juci.dataset("renewalsData",renewalsData);
	}
		getAlertInformation(RequestData,callback);
}

function toggleView(event){
	switch(event.newToggled) {
		case 0 :
			$m.juci.dataset("attendance",true);
			$m.juci.dataset("lead",false);
			$m.juci.dataset("meetings",false);
			$m.juci.dataset("loginsalert",false);
			$m.juci.dataset("meetingsAuthenticatedCnt7",false);
			$m.juci.dataset("meetingsAuthenticatedCnt30",false);
			$m.juci.dataset("Renuwals",false);
			$m.juci.findByClass("loginsalert")[0].el.style.display="none";
			updateNotify("Attendance","Tab");
			break;
		case 1 :
			$m.juci.dataset("lead",true);
			$m.juci.dataset("attendance",false);
			$m.juci.dataset("meetings",false);
			$m.juci.dataset("loginsalert",false);
			$m.juci.dataset("meetingsAuthenticatedCnt7",false);
			updateNotify("Leads","Tab");
			$m.juci.dataset("meetingsAuthenticatedCnt30",false);
			$m.juci.dataset("Renuwals",false);
			getLeadsdata();
			$m.juci.findByClass("loginsalert")[0].el.style.display="none";
			break;
		case 2 :
			$m.juci.dataset("lead",false);
			$m.juci.dataset("attendance",false);
			$m.juci.dataset("meetings",true);
			$m.juci.dataset("loginsalert",false);
			$m.juci.dataset("meetingsAuthenticatedCnt7",false);
			$m.juci.dataset("meetingsAuthenticatedCnt30",false);
			updateNotify("Meeting","Tab");
			$m.juci.dataset("Renuwals",false);
			onNextMeetingsClick();
			$m.juci.findByClass("loginsalert")[0].el.style.display="none";
			break;
		case 3 :
			$m.juci.dataset("lead",false);
			$m.juci.dataset("attendance",false);
			$m.juci.dataset("meetings",false);
			$m.juci.dataset("loginsalert",true);
			$m.juci.dataset("meetingsAuthenticatedCnt7",false);
			$m.juci.dataset("meetingsAuthenticatedCnt30",false);
			$m.juci.findByClass("loginsalert")[0].el.style.display="block";
			updateNotify("Login","Tab");
			$m.juci.dataset("Renuwals",false);
			onLoginsAgingClick();
		break;
		case 4: 
			$m.juci.dataset("lead",false);
			$m.juci.dataset("attendance",false);
			$m.juci.dataset("meetings",false);
			$m.juci.dataset("loginsalert",false);
			$m.juci.dataset("meetingsAuthenticatedCnt7",false);
			$m.juci.dataset("meetingsAuthenticatedCnt30",false);
			$m.juci.findByClass("loginsalert")[0].el.style.display="none";	
			$m.juci.dataset("Renuwals",true);
			updateNotify("Renewal");
			GetRenewalsData();
			break;
	}
}

// prospectInfo for meetings scheduled
function showProspectDataMeetingsReschedule(data,e){
	var reqData = ko.toJS(data);
	var requestData = {
		"AlertSubType":reqData.AlertSubType,
		"AlertSubType2":reqData.AlertSubType,
		"AlertType":"Meetings",
		"LeadType":"New Business",
		"SMCode":"70085536", //reqData.SM_Code,
	};
	var UpdateNotifyData = {
		"BMCode": "70036363",
		"Type": "Table",
		"SubType": reqData.AlertSubType,
		"LeadType": "New Business",
		"SMCode": "70085536", //reqData.SM_Code,
		"Isread": "1"
	};	
	$m.juci.dataset("meetingsProspectRescheduled",true);
	$m.juci.dataset("meetingsProspectScheduledRecruitment",false);
	$m.juci.dataset("meetingsAuthenticatedCnt7",false);
	$m.juci.dataset("meetingsAuthenticatedCnt15",false);
	$m.juci.dataset("meetingsAuthenticatedCnt30",false);
	$m.juci.dataset("meetingsProspectInfoNext3days",false);
	$m.juci.dataset("meetingsProspectInfoNext3daysRecruitmentFlag",false);
	
	fetchProspectInfoFromServer(requestData,"meetingsProspectResheduledData",UpdateNotifyData);
}

function showProspectDataRecruitmentReshedule(data,e){
	var reqData = ko.toJS(data);
	var requestData = {
		"AlertSubType":reqData.AlertSubType,
		"AlertSubType2":reqData.AlertSubType,
		"AlertType":"Meetings",
		"LeadType":"Recruitment",
		"SMCode":"70085536", //reqData.SM_Code,
	};
	var UpdateNotifyData = {
		"BMCode": "70036363",
		"Type": "Table",
		"SubType": reqData.AlertSubType,
		"LeadType": "Recruitment",
		"SMCode": "70085536", //reqData.SM_Code,
		"Isread": "1"
	};	
	$m.juci.dataset("meetingsProspectRescheduled",false);
	$m.juci.dataset("meetingsProspectScheduledRecruitment",true);
	$m.juci.dataset("meetingsAuthenticatedCnt7",false);
	$m.juci.dataset("meetingsAuthenticatedCnt30",false);
	$m.juci.dataset("meetingsAuthenticatedCnt15",false);
	$m.juci.dataset("meetingsProspectInfoNext3days",false);
	$m.juci.dataset("meetingsProspectInfoNext3daysRecruitmentFlag",false);
	
	fetchProspectInfoFromServer(requestData,"meetingsProspectSheduledRecruitmentData",UpdateNotifyData);
}

function meetingsAuthenticatedCnt7(data,e){
	var reqData = ko.toJS(data);
	if(e.currentTarget.id != ""){
			$m.juci.findById(e.currentTarget.id).el.style.color="black";
		}
	var requestData = {
		"AlertSubType":reqData.AlertSubType,
		"AlertSubType2":"MeetingCnt7",
		"AlertType":"Meetings",
		"LeadType":"New Business",
		"SMCode":reqData.SM_Code,
	};
	
	var UpdateNotifyData = {
		"BMCode": "70036363",
		"Type": "Table",
		"SubType": "MeetingCnt7",
		"LeadType": "New Business",
		"SMCode": reqData.SM_Code,
		"Isread": "1"
	};	
	$m.juci.dataset("meetingsProspectRescheduled",false);
	$m.juci.dataset("meetingsProspectScheduledRecruitment",false);
	$m.juci.dataset("meetingsAuthenticatedCnt7",true);
	$m.juci.dataset("meetingsAuthenticatedCnt30",false);
	$m.juci.dataset("meetingsProspectInfoNext3days",false);
	$m.juci.dataset("meetingsProspectInfoNext3daysRecruitmentFlag",false);
	
	fetchProspectInfoFromServer(requestData,"meetingsAutenticatedCnt7Data",UpdateNotifyData);
}

function meetingsAuthenticatedCnt15(data,e){
	if(e.currentTarget.id != ""){
		$m.juci.findById(e.currentTarget.id).el.style.color="black";
	}
	var reqData = ko.toJS(data);
	var requestData = {
		"AlertSubType":reqData.AlertSubType,
		"AlertSubType2":"MeetingCnt15",
		"AlertType":"Meetings",
		"LeadType":"New Business",
		"SMCode": reqData.SM_Code,
	};
	
	var UpdateNotifyData = {
		"BMCode": "70036363",
		"Type": "Table",
		"SubType": "MeetingCnt15",
		"LeadType": "New Business",
		"SMCode": reqData.SM_Code,
		"Isread": "1"
	};	
	$m.juci.dataset("meetingsProspectRescheduled",false);
	$m.juci.dataset("meetingsProspectScheduledRecruitment",false);
	$m.juci.dataset("meetingsAuthenticatedCnt7",false);
	$m.juci.dataset("meetingsAuthenticatedCnt15",true);
	$m.juci.dataset("meetingsAuthenticatedCnt30",false);
	$m.juci.dataset("meetingsProspectInfoNext3days",false);
	$m.juci.dataset("meetingsProspectInfoNext3daysRecruitmentFlag",false);
	
	fetchProspectInfoFromServer(requestData,"meetingsAutenticatedCnt15Data",UpdateNotifyData);
	console.log(reqData);
}

function meetingsAuthenticatedCnt30(data,e){
	if(e.currentTarget.id != ""){
		$m.juci.findById(e.currentTarget.id).el.style.color="black";
	}
	var reqData = ko.toJS(data);
	var requestData = {
		"AlertSubType":reqData.AlertSubType,
		"AlertSubType2":"MeetingCnt30",
		"AlertType":"Meetings",
		"LeadType":"New Business",
		"SMCode":reqData.SM_Code,
	};
	
	var UpdateNotifyData = {
		"BMCode": "70036363",
		"Type": "Table",
		"SubType": "MeetingCnt30",
		"LeadType": "New Business",
		"SMCode": reqData.SM_Code,
		"Isread": "1"
	};	
	$m.juci.dataset("meetingsProspectRescheduled",false);
	$m.juci.dataset("meetingsProspectScheduledRecruitment",false);
	$m.juci.dataset("meetingsAuthenticatedCnt7",false);
	$m.juci.dataset("meetingsAuthenticatedCnt15",false);
	$m.juci.dataset("meetingsAuthenticatedCnt30",true);
	$m.juci.dataset("meetingsProspectInfoNext3days",false);
	$m.juci.dataset("meetingsProspectInfoNext3daysRecruitmentFlag",false);
	
	fetchProspectInfoFromServer(requestData,"meetingsAutenticatedCnt30Data",UpdateNotifyData);
	console.log(reqData);
}

function showProspectDataMeetingsNext3Days(data,e){
	var reqData = ko.toJS(data);
	console.log(reqData);
	var requestData = {
		"AlertSubType":reqData.AlertSubType,
		"AlertSubType2":"",
		"AlertType":"Meetings",
		"LeadType":"New Business",
		"SMCode": reqData.SM_Code
	};
	
	var UpdateNotifyData = {
		"BMCode": "70036363",
		"Type": "Table",
		"SubType": "MD",
		"LeadType": "",
		"SMCode": reqData.SM_Code,
		"Isread": "1"
	};	
	$m.juci.dataset("meetingsProspectRescheduled",false);
	$m.juci.dataset("meetingsProspectScheduledRecruitment",false);
	$m.juci.dataset("meetingsAuthenticatedCnt7",false);
	$m.juci.dataset("meetingsAuthenticatedCnt15",false);
	$m.juci.dataset("meetingsAuthenticatedCnt30",false);
	$m.juci.dataset("meetingsProspectInfoNext3days",true);
	$m.juci.dataset("meetingsProspectInfoNext3daysRecruitmentFlag",false);
	
	fetchProspectInfoFromServer(requestData,"meetingsProspectInfoNext3daysData",UpdateNotifyData);
}

function showProspectDataMeetingsNext3DaysRecruitment(data,e){
	var reqData = ko.toJS(data);
	console.log(reqData);
	var requestData = {
		"AlertSubType":reqData.AlertSubType,
		"AlertSubType2":"",
		"AlertType":"Meetings",
		"LeadType":"Recruitment",
		"SMCode":reqData.SM_Code
	};
	
	var UpdateNotifyData = {
		"BMCode": "70036363",
		"Type": "Table",
		"SubType": "MD",
		"LeadType": "",
		"SMCode": reqData.SM_Code,
		"Isread": "1"
	};	
	$m.juci.dataset("meetingsProspectRescheduled",false);
	$m.juci.dataset("meetingsProspectScheduledRecruitment",false);
	$m.juci.dataset("meetingsAuthenticatedCnt7",false);
	$m.juci.dataset("meetingsAuthenticatedCnt15",false);
	$m.juci.dataset("meetingsAuthenticatedCnt30",false);
	$m.juci.dataset("meetingsProspectInfoNext3days",false);
	$m.juci.dataset("meetingsProspectInfoNext3daysRecruitmentFlag",true);
	
	fetchProspectInfoFromServer(requestData,"meetingsProspectInfoNext3daysRecruitmentData",UpdateNotifyData);
}

function dicussedArdmMeetingsReschedule(data,e){
	var reqData = ko.toJS(data);
	$m.juci.dataset("meetingsProspectRescheduled",true);
	$m.juci.dataset("meetingsProspectScheduledRecruitment",false);
	$m.juci.dataset("meetingsAuthenticatedCnt7",false);
	$m.juci.dataset("meetingsAuthenticatedCnt15",false);
	$m.juci.dataset("meetingsAuthenticatedCnt30",false);
	$m.juci.dataset("meetingsProspectInfoNext3days",false);
	
	updateNotify("cntmr_btn","Table",reqData.SM_Code);
}

function showNewBusinessMeetingsAuthenticatedData(){
	$m.juci.dataset("newBusinessMeetingsAuthencatedFlag",true);
	$m.juci.dataset("recruitmentsMeetingsAuthencatedFlag",false);
	$m.juci.dataset("meetingsAuthenticatedNewBusinessFlag",true);
	$m.juci.dataset("meetingsAuthenticatedRecruitmentFlag",false);
}

function showRecruitmentMeetingsAuthenticatedData(){
	$m.juci.dataset("newBusinessMeetingsAuthencatedFlag",false);
	$m.juci.dataset("recruitmentsMeetingsAuthencatedFlag",true);
	$m.juci.dataset("meetingsAuthenticatedNewBusinessFlag",false);
	$m.juci.dataset("meetingsAuthenticatedRecruitmentFlag",true);
}

function fetchProspectInfoFromServer (requestData,meetingsProspectResheduledData,UpdateNotifyData,prospectdataset) {
	if($m.networkConnected()){
		var service = new ServiceLibrary();
		var prospectInfoCallback = function (r){
			if(r.Status == "Y"){
				utils.HideProgress();
				var responseData = r.lstPropectInfoResponse;
				if(responseData.length == 0){
					$m.alert("No Prospect data found..");
					$m.juci.dataset("meetingsProspectRescheduled",false);
					$m.juci.dataset("meetingsProspectScheduledRecruitment",false);
					$m.juci.dataset("prospectData",false);
					$m.juci.dataset("meetingsAuthenticatedCnt30",false);
					$m.juci.dataset("meetingsProspectRescheduled",false);
					$m.juci.dataset("meetingsProspectScheduledRecruitment",false);
					$m.juci.dataset("meetingsAuthenticatedCnt7",false);
					$m.juci.dataset("meetingsAuthenticatedCnt15",false);
					$m.juci.dataset("meetingsProspectInfoNext3daysRecruitmentFlag",false);
					$m.juci.dataset("meetingsProspectInfoNext3days",false);
					$m.juci.dataset("prospectData",false);
				}
				else{
					$m.juci.dataset(prospectdataset,true);
					for(var i=0;i<responseData.length;i++){
						responseData[i].EnteredDate = utils.GetFormatedDate(responseData[i].EnteredDate);
					}
					$m.juci.dataset(meetingsProspectResheduledData,responseData);
					if($m.networkConnected()){
					//	utils.ShowProgress("Inserting Update Notify data..");
						var updateNotifyCallback = function(res){
							if(res.Status == "Y"){
								utils.HideProgress();
								$m.toast(res.Message);
								var callback = function(res){
									if(res){}
								};
								fetchDashboardCount("70036363",callback);
							} else {
								utils.HideProgress();
								$m.alert("Inserting Update Notify for meetings scheduled failed due to :"+JSON.stringify(res));
								$m.logError("Inserting Update Notify for meetings scheduled failed due to :"+JSON.stringify(res));
							}	
						};
						service.udateNotify(updateNotifyCallback,UpdateNotifyData);
					}else {
						$m.alert(messages.NoNetworkConnectivity);
					}
				}
			} else {
				utils.HideProgress();
				$m.alert("Fetching prospect info for meetings scheduled failed due to :"+JSON.stringify(r));
				$m.logError("Fetching prospect info for meetings scheduled failed due to :"+JSON.stringify(r));
			}	
		};
		utils.ShowProgress("Fetching data..");
		service.getProspectInfo(prospectInfoCallback,requestData);
	} else {
		$m.alert(messages.NoNetworkConnectivity);
	}
}

function fetchDashboardCount(sapcode,callback) {
	if($m.networkConnected()){
		var service = new ServiceLibrary();
		var requestData = {"BMCode":sapcode};
		var dashboardCallback = function (res){
			if(res.Status == "Y"){
				utils.HideProgress();
				if(res.lstResponse_DashboardAlertCount[0]){
					var alertsCount = res.lstResponse_DashboardAlertCount[0];
					var alertData = $m.juci.dataset("alertsCount");
					if(alertsCount.IR_Attendance == "0"){
						alertData.attendanceCount = alertsCount.Attendance;	
					} 
					
					if(alertsCount.IR_Lead == "0") {
						alertData.leadsCount = alertsCount.Lead;	
					}
					if(alertsCount.IR_MAgeing == "0"){
						alertData.meetingsCount = alertsCount.Meeting;	
					}
					
					if(alertsCount.IR_Login == "0"){
						alertData.loginsCount = alertsCount.Login;
					}
					
					if(alertsCount.IR_Renewal == "0"){
						alertData.renewalsCount = alertsCount.Renewal;
					}
					if(alertsCount.MD3){
						$m.juci.dataset("meetingsAlertCount",alertsCount.MD3);
					}
					if(alertsCount.MR){
						$m.juci.dataset("meetingsScheduledCount",alertsCount.MR);
					}
					if(alertsCount.MAgeing){
						$m.juci.dataset("meetingsAuthenticatedCount",alertsCount.MAgeing);
					}
					
					$m.juci.dataset("agingCnt",alertsCount.LAgeing);
					$m.juci.dataset("nonSELoginCnt",alertsCount.LNonSe);
					$m.juci.dataset("alertsCount",alertData);	
					callback("Y");
				} else {
					callback("Y");
				}
			} else {
				utils.HideProgress();
				callback("N");
				$m.alert("feacting the alert count Data failed due to :"+JSON.stringify(r));
				$m.logError("feacting the alert count Data failed due to :"+JSON.stringify(r));
			}
		};
		utils.ShowProgress("Fetching dashboard data..");
		service.getDashboardCount(dashboardCallback,requestData);
	}else {
		$m.alert(messages.NoNetworkConnectivity);
	}
}


// fetching logins Aging alert data
function onLoginsAgingClick(){
	$m.juci.dataset("prospectData",false);
	$m.juci.dataset("aging",0);
	$m.juci.dataset("nonSELogin",1);
	$m.juci.dataset("loginsAging",[]);
	var loginsRequestData = {"BMCode":"70036363","AlertSubType":"Ageing","AlertType":"Logins"};
	utils.ShowProgress("fetching logins information..");
	var service = new ServiceLibrary();
	if($m.networkConnected()){
		var alertInformationCallback = function(r){
			utils.HideProgress();
			if(r.Status == "Y") {
				var loginsdata = r.lstResponse_LoginAgeing;
				$m.juci.dataset("loginsAging",loginsdata);
				updateNotify("LAgeing","Tab");
			}
			else{
				$m.alert("fetching the Lead Data failed due to :"+JSON.stringify(r));
				$m.logError("fetching the Lead Data failed due to :"+JSON.stringify(r));
				}
		};
		service.getAlertInformation(alertInformationCallback,loginsRequestData);
	}else {
		$m.alert(messages.NoNetworkConnectivity);
	}
}

function onLoginsnonSELoginClick(){
	$m.juci.dataset("aging",1);
	$m.juci.dataset("nonSELogin",0);
	var loginsRequestData = {"BMCode":"70036363","AlertSubType":"NonSELogin","AlertType":"Logins"};
	utils.ShowProgress("fetching logins information..");
	var service = new ServiceLibrary();
	if($m.networkConnected()){
		var alertInformationCallback = function(r){
			utils.HideProgress();
			if(r.Status == "Y") {
				$m.juci.dataset("LoginsNonSE",r.lstResponse_LoginNonSE);
				updateNotify("LNonSE","Tab");
			}
			else{
					$m.alert("fetching the Lead Data failed due to :"+JSON.stringify(r));
					$m.logError("fetching the Lead Data failed due to :"+JSON.stringify(r));
				}
		};
		service.getAlertInformation(alertInformationCallback,loginsRequestData);
	}else {
		$m.alert(messages.NoNetworkConnectivity);
	}
	$m.juci.dataset("prospectData",false);
}

function updateNotify(Subtype,type,smcode,leadtype){
	var service = new ServiceLibrary();
	if($m.networkConnected()){
		var requestData={};
		requestData.SMCode = smcode? smcode : "";
		requestData.BMCode ="70036363";
		requestData.Isread ="1";
		requestData.LeadType = leadtype ? leadtype:"";
		requestData.SubType = Subtype;
		requestData.Type= type;
		requestData.SMCode = smcode;
		//utils.ShowProgress("updating Data..");
		var updateInformationCallback = function(r){
			//utils.HideProgress();
			if(r.Status == "Y") {
				//$m.toast(r.Message);
				//get updated alert count
				var requestData = {"BMCode":"70036363"};
				var callback = function (res){}
				fetchDashboardCount("70036363",callback);
			}else{
				$m.alert("updating the Lead Data failed due to :"+JSON.stringify(r));
				$m.logError("updating the Lead Data failed due to :"+JSON.stringify(r));
			}
		}
		service.udateNotify(updateInformationCallback,requestData);
		
	}else {
			$m.alert(messages.NoNetworkConnectivity);
		}	
}

function ondiscussedARDMClick(data,event){
	$m.juci.findById(event.currentTarget.id).hide();
	updateNotify("Renewal_btn","Table",data.SM_Code,data.PolicyNo);
}