/**
 * rlifeservices.js
 * @author CloudPact Technologies
 * @description : This script is used for firing get/post requests to server through service url.
 **/
var url = "";
var baseUrl = "http://lifelineuat.reliancelife.com/SalesAssist";
var uaturl = "http://124.124.218.136/rlife2/";
var currentAdvisorCode = "";
var login_code = "";
var logincode = "";
var password = "";
var credentials = "";

$m.onResume(function() {
    // Code to execute when the page is ready
    if ($m.isWeb()) {
//        currentAdvisorCode = "20000226";
        currentAdvisorCode = "70085536";
    } else {
        if ($m.getPref("useAs")) {
            advisorCode = $m.getPref("useAs").LA_Business_LoginCode;
            advisorName = $m.getPref("useAs").Adv_Emp_Name;
            logincode = $m.getUserAccount().customProperties.Login_Code;
            password = $m.getUserAccount().customProperties.Login_Pwd;
        } else {
            advisorCode = $m.getUserAccount().customProperties.LA_Business_LoginCode;
            advisorName = $m.getUserAccount().customProperties.Login_Name;
            logincode = $m.getUserAccount().customProperties.Login_Code;
            password = $m.getUserAccount().customProperties.Login_Pwd;
        }
        currentAdvisorCode = logincode;
        if(logincode){
        	login_code = logincode;
        }else{
        	//TODO
        }
    }
});

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};

var ServiceLibrary = function() {
    this.GetCfrList = function(cfrObj) {
        if ($m.isWeb()) {
            url = baseUrl + "/CFR/wsCFR.svc/GetCfrDetails/20000226";
        } else {
            url = baseUrl + "/CFR/wsCFR.svc/GetCfrDetails/" + login_code;
        }
        this.fireGetRequest(url,cfrObj);
    };

    this.GetRenewalsList = function(renewal) {
        if ($m.isWeb()) {
            url = baseUrl + "/Customer/wsCustomers.svc/FetchCustomerSummary/20000226";
        } else {
            url = baseUrl + "/Customer/wsCustomers.svc/FetchCustomerSummary/" + login_code;
        }
  		this.fireGetRequest(url,renewal);
    };

    this.GetCustomerInfo = function(renewal, number) {
        url = baseUrl + "/Customer/wsCustomers.svc/FetchCustomerInfo/" + number;
       	this.fireGetRequest(url,renewal);
    };

    this.GetApplicationList = function(app) {
        if ($m.isWeb()) {
            url = baseUrl + "/Applications/wsApplications.svc/GetApplications/20000226";
        } else {
            url = baseUrl + "/Applications/wsApplications.svc/GetApplications/" + login_code;
        }
       	this.fireGetRequest(url,app);
    };

    this.PostRegistration = function(res, data) {
        url = baseUrl + "/PreLogin/wsPreLogin.svc/Registration";
       	this.fireRequest(url,res,data);
    };

    this.SendRegistrationOtp = function(resp, userid) {
        url = baseUrl + "/PreLogin/wsPreLogin.svc/SendOtp/" + userid + "/0";
        this.fireGetRequest(url,resp);
    };

    this.ForgotPassword = function(resp, data) {
        url = baseUrl + "/PreLogin/wsPreLogin.svc/ForgotPassword";
        this.fireRequest(url,resp,data);
    };

    this.GetUmsStatus = function(resp, userid) {
        url = baseUrl + "/CFR/wsCFR.svc/GetUmsStatus/" + userid;
		this.fireGetRequest(url,resp);
    };
    
    this.GetNotofications = function(resp) {
    	if ($m.isWeb()) {
            url = baseUrl + "/Alerts/wsNotifications.svc/GetNotifications/20000226";
        } else {
            url = baseUrl + "/Alerts/wsNotifications.svc/GetNotifications/" + login_code;
        }
		this.fireGetRequest(url,resp);
    };
    
    this.GetMedicalTests = function(app, obj) {
        //	if($m.isWeb()){
        url = baseUrl + "/CFR/wsCFR.svc/GetMedicalTests/AA227276/54502177";
        //	}else{
        //		url = baseUrl+"/CFR/wsCFR.svc/GetMedicalTests/"+obj.ApplicationNumber+"/"+obj.ClientID;
        //	}
		this.fireGetRequest(url,app);
    };

    this.VerifyRegistrationOtp = function(resp, userid, otp) {
        url = baseUrl + "/PreLogin/wsPreLogin.svc/VerifyOtp/" + userid + "/" + otp + "/2";
   		  this.fireGetRequest(url,resp);
    };

    this.syncCustomerDetailsTable = function(res, data) {
        url = "http://lifelineuat.reliancelife.com/RassistServices/wsPDCDetails.svc/SaveCustomerDetails";
        this.fireRequest(url,res,data);
    };

    this.syncLifeStyleDetailsTable = function(res, data) {
        url = "http://lifelineuat.reliancelife.com/RassistServices/wsPDCDetails.svc/SaveLifeStyleDetails";
		this.fireRequest(url,res,data);
    };
    
    this.updatedCustomerDetails = function(resp, data) {
        url = "http://lifelineuat.reliancelife.com/RassistServices/wsPDCDetails.svc/UpdateCustomerDetails";
      	this.fireRequest(url,resp,data);
    };

    this.syncFamilyHistoryData = function(res, data) {
        url = "http://lifelineuat.reliancelife.com/RassistServices/wsPDCDetails.svc/SaveFamilyHistory";
       	this.fireRequest(url,res,data);
    };

    this.syncPlanDetails = function(res, data) {
        url = "http://lifelineuat.reliancelife.com/RassistServices/wsPDCDetails.svc/SavePlanDetails";
      	this.fireRequest(url,res,data);
    };

    this.syncCFRDetails = function(res, data) {
        url = "http://lifelineuat.reliancelife.com/RassistServices/wsPDCDetails.svc/SaveCFRDetails";
        this.fireRequest(url,res,data);
    };
    
    this.syncSaveLeadDetails = function(res, data) {
        url = "http://lifelineuat.reliancelife.com/RassistServices/wsLeadActivityPlanning.svc/SaveLeadInformation";
        this.fireRequest(url,res,data);
    };
    
    this.syncLeadActivityResultDetails = function(res, data) {
        url = "http://lifelineuat.reliancelife.com/RassistServices/wsLeadActivityPlanning.svc/SaveLeadActivityResult";
        this.fireRequest(url,res,data);
    };
    
    this.syncLeadActivityPlanningDetails = function(res, data) {
        url = "http://lifelineuat.reliancelife.com/RassistServices/wsLeadActivityPlanning.svc/SaveLeadActivityPlanning";
        this.fireRequest(url,res,data);
    };

    this.syncExistingPolicyData = function(res, data) {
        url = "http://lifelineuat.reliancelife.com/RassistServices/wsPDCDetails.svc/SaveExisitingPolicies";
       	this.fireRequest(url,res,data);
    };

    this.syncPaymentDetailsData = function(res, data) {
        url = "http://lifelineuat.reliancelife.com/RassistServices/wsPDCDetails.svc/SavePaymentDetails";
        this.fireRequest(url,res,data);
    };

    this.syncImageDetailsData = function(res, data) {
        url = "http://lifelineuat.reliancelife.com/RassistServices/wsPDCDetails.svc/SaveImageDetails";
        this.fireRequest(url,res,data);
    };

    this.GetSyncApplicationStatus = function(response, data) {
        url = "http://lifelineuat.reliancelife.com/RassistServices/wsApplicationSyncStatus.svc/GetSyncStatus/" + data.Application_Number;
       	this.fireGetRequest(url,response);
    };

    this.GetCfrHistory = function(response, data) {
        url = "http://lifelineuat.reliancelife.com/SalesAssist/CFR/wsCFR.svc/GetFtnrHistory/" + data.Application_Number;
      	this.fireRequest(url,response,data);
    };

    this.GetTPA = function(response, data) {
        url = "http://lifelineuat.reliancelife.com/SalesAssist/CFR/wsCFR.svc/FetchTPA/" + data.Application_Number;
 		this.fireGetRequest(url,response);
    };

   this.FetchAdvisorDetails = function(resp) {
   	if($m.isWeb()){
   		url= baseUrl + "/Profile/wsProfile.svc/FetchAdvisorDetails/20000226";
   	}
   	else{
        url = baseUrl + "/Profile/wsProfile.svc/FetchAdvisorDetails/" + currentAdvisorCode;
   	}
     this.fireGetRequest(url,resp);
    };
    
   this.FetchBusinessSummary = function(resp,data) {
   	if($m.isWeb()){
   		url= baseUrl + "/Profile/wsProfile.svc/FetchBusinessSummary";
   	}
   	else{
        url = baseUrl + "/Profile/wsProfile.svc/FetchBusinessSummary" ;
   	}
      	this.fireRequest(url,resp,data);
    };
    
    this.GetLatestNewsUpdates = function(resp) {
        url = baseUrl + "/NewsUpdates/wsNewUpdates.svc/GetLatestNewsUpdates/" + currentAdvisorCode;
        this.fireGetRequest(url,resp);
    };
    
    this.GetLatestOpenCfrCount = function(resp) {
        url = baseUrl + "/Home/wsHome.svc/GetLatestOpenCfrCount/" + currentAdvisorCode;
        this.fireGetRequest(url,resp);
    };
    
    this.GetUpcomingRenewalCount = function(resp) {
        url = baseUrl + "/Home/wsHome.svc/GetUpcomingRenewalCount/" + currentAdvisorCode;
        this.fireGetRequest(url,resp);
    };
    
    this.saveDeviceInformation = function(res, data) {
		url = "http://lifelineuat.reliancelife.com/RassistServices/wsPDCDetails.svc/SaveUserDeviceInfo";
		this.fireRequest(url,res,data);
    };
    
     this.saveIncomeCalculator = function(res, data) {
		url = "http://lifelineuat.reliancelife.com/RassistServices/wsLeadActivityPlanning.svc/SaveIncomeCalculatorDetails";
		this.fireRequest(url,res,data);
    };
    
    this.saveNetworkCalcultor = function(res, data) {
		url = "http://lifelineuat.reliancelife.com/RassistServices/wsQuest.svc/NetworkCalculator";
		this.fireRequest(url,res,data);
    };
    
    this.getIncomeCalculatorDetails = function(res, data) {
		url = "http://lifelineuat.reliancelife.com/RassistServices/wsLeadActivityPlanning.svc/GetIncomeCalculatorDetails/" + data.name+ "/" + data.value + "";
		this.fireGetRequest(url,res,data);
    };
    
    this.GetLatestApplicationsCount = function(resp) {
        url = baseUrl + "/Home/wsHome.svc/GetLatestApplicationsCount/" + currentAdvisorCode;
        this.fireGetRequest(url,resp);
    };
    
    this.GetExpertCallData = function(Activity_Result_Id,resp) {
        url = "http://124.124.218.136/supertrack/mowblyserver/ExpertCallScript/rellife/prod/RlifeAssist?Activity_Result_Id=" + Activity_Result_Id;
        this.fireGetRequest(url,resp);
    };
    
    this._uploadDocuments = function(res, currentDocument){
    	if($m.networkConnected()){
			var r = $m.httpRequest({
				url: Constants.publicIP+"/mowblyserver/smblobpost/rellife/prod/ProposalForm"
			}).addPart(
				"DocumentTypeCode", currentDocument.DocumentTypeCode, "text/plain"
			).addPart(
				"ImageName", currentDocument.ImageName, "text/plain"
			).addPart(
				"UploadDate", currentDocument.UploadDate, "text/plain"
			).addPart(
				"Status", currentDocument.Status, "text/plain"
			).addPart(
				"Application_Number", currentDocument.Application_Number, "text/plain"
			).addPart(
				"Row_No", ""+currentDocument.Row_No, "text/plain"
			).setType("POST");
			r.addPart(
				"ImageDoc", new $m.file(currentDocument.ImagePath, {level: $m.STORAGE_LEVEL}), "image/png", "ImageDoc"
			);
			r.send(res);
		}else{
			$m.alert("Network disconnected in between. Please try later.");
		}
    };
    
    this.uploadDocuments = function(res, currentDocument){
    	if($m.networkConnected()){
    		if(!currentDocument.Extended_Attributes){
    			currentDocument.Extended_Attributes = "LA";
    		}
    		credentials = Base64.encode(logincode +":" + password);	
			var r = $m.httpRequest({
				url: "http://lifelineuat.reliancelife.com/RassistServices/wsUploadImage.svc/SaveImageDetails",
			}).addPart(
				"documenttypecode", currentDocument.DocumentTypeCode, "text/plain"
			).addPart(
				"imagename", currentDocument.ImageName, "text/plain"
			).addPart(
				"application_number", currentDocument.Application_Number, "text/plain"
			).addPart(
				"Source_From", "TAB", "text/plain"
			).addPart(
				"Add_Param1",currentDocument.AadharImage, "text/plain"
			).addPart(
				"Add_Param2", currentDocument.Txn_Id, "text/plain"
			).addPart(
				"Add_Param3",currentDocument.total_Count, "text/plain"
			).addPart(
				"Add_Param4", "", "text/plain"
			).addPart(
				"type", currentDocument.Extended_Attributes, "text/plain"
			).addHeader(
				"Authorization","Basic "+ credentials	
			).setType("POST");
			
			if(currentDocument.AadharImage){
			 r.addPart(
				"ImageDoc", "", "text/plain"
			);
			}
			else{
			r.addPart(
				"ImageDoc", new $m.file(currentDocument.ImagePath, {level: $m.STORAGE_LEVEL}), "image/png", "ImageDoc"
			);
			}
			
			r.send(res);
		}else{
			 $m.juci.getControl("syncallb").enable();
			$m.alert("Network disconnected in between. Please try later.");
		}
    };
    
    this.uploadCFRDocuments = function(res, currentDocument){
    	if($m.networkConnected()){
    		credentials = Base64.encode(logincode +":" + password);	
			var r = $m.httpRequest({
				url: "http://lifelineuat.reliancelife.com/RassistServices/wsUploadImage.svc/SaveCFRDetails"
			}).addPart(
				"app_no", currentDocument.Application_Number, "text/plain"
			).addPart(
				"Source_From", "TAB", "text/plain"
			).addPart(
				"Add_Param1", "", "text/plain"
			).addPart(
				"Add_Param2", "", "text/plain"
			).addPart(
				"Add_Param3", "", "text/plain"
			).addPart(
				"Add_Param4", "", "text/plain"
			).addPart(
				"cfr_code", currentDocument.Extended_Attributes, "text/plain"
			).addPart(
				"docformat", "image/png", "text/plain"
			).addHeader(
				"Authorization","Basic "+ credentials	
			).setType("POST");
			r.addPart(
				"ImageDoc", new $m.file(currentDocument.ImagePath, {level: $m.STORAGE_LEVEL}), "image/png", "ImageDoc"
			);
			r.send(res);
		}else{
			  $m.juci.getControl("syncallb").enable();
			$m.alert("Network disconnected in between. Please try later.");
		}
    };
    
    this.uploadVideoFiles = function(res,currentDocument){
		if($m.networkConnected()){
			var request = $m.httpRequest({url: "http://124.124.218.136/rlife2/mowblyserver/videoUpload/rellife/prod/RlifeAssist","type": "POST"});
			request.addPart("TABLE", "PDC_Video_Details", "text/plain");
			request.addPart("Application_Number", currentDocument.Application_Number, "text/plain");
			request.addPart("Txn_ID", currentDocument.Txn_ID, "text/plain");
			if(currentDocument.Selfi_Video_Status != ""){
				request.addPart("Selfi_Video_Status", currentDocument.Selfi_Video_Status, "text/plain");
			}
			request.addPart("Personal_Video_Status", currentDocument.Personal_Video_Status, "text/plain");
			if(currentDocument.Selfi_Video_SyncStatus != ""){
				request.addPart("Selfi_Video_SyncStatus", currentDocument.Selfi_Video_SyncStatus, "text/plain");
			}
			request.addPart("Selfie_Camera_Available", currentDocument.Selfie_Camera_Available, "text/plain");
			if(currentDocument.Personal_Video_SyncStatus != ""){
				request.addPart("Personal_Video_SyncStatus", currentDocument.Personal_Video_SyncStatus, "text/plain");	
			}
			if(currentDocument.Cust_Salutation != ""){
				request.addPart("Cust_Salutation", currentDocument.Cust_Salutation, "text/plain");	
			}
			if(currentDocument.Cust_Name != ""){
				request.addPart("Cust_Name", currentDocument.Cust_Name, "text/plain");	
			}
			if(currentDocument.Cust_Email_ID != ""){
				request.addPart("Cust_Email_ID", currentDocument.Cust_Email_ID, "text/plain");	
			}
			if(currentDocument.Cust_Mobile_Number != ""){
				request.addPart("Cust_Mobile_Number", currentDocument.Cust_Mobile_Number, "text/plain");	
			}
			if(currentDocument.Scheduled_Date != ""){
				request.addPart("Scheduled_Date", currentDocument.Scheduled_Date, "text/plain");	
			}
			if(currentDocument.PIVC_Medical_Qs_Ans_Flag != ""){
				request.addPart("PIVC_Medical_Qs_Ans_Flag", currentDocument.PIVC_Medical_Qs_Ans_Flag, "text/plain");
			}
			request.addPart("Added_By", currentDocument.Added_By, "text/plain");
			currentDocument.Personal_Video_Path = currentDocument.Personal_Video_Path ? currentDocument.Personal_Video_Path : "";
			if(currentDocument.Personal_Video_Path != ""){
				request.addPart("Personal_Video", new $m.file(currentDocument.Personal_Video_Path,{level: $m.STORAGE_LEVEL}), "video/mp4", "personalVideoPath");	
			}
			if(currentDocument.Selfi_Video_Path != ""){
				request.addPart("Selfi_Video", new $m.file(currentDocument.Selfi_Video_Path,{level: $m.STORAGE_LEVEL}), "video/mp4", "selfiVideoPath");
			}
			request.send(res);
		} else{
			$m.alert("Network disconnected in between. Please try later.");
		}
    };
    
//    this.uploadVideoFiles = function(res,currentDocument){
//		if($m.networkConnected()){
//			var request = $m.httpRequest({url: "http://lifelineuat.reliancelife.com/RassistServices/wsUploadImage.svc/SavePDCVideoDetails"});
//			//request.addPart("TABLE", "PDC_Video_Details", "text/plain");
//			request.setType("POST");
//			request.addPart("Application_Number", currentDocument.Application_Number, "text/plain");
//			request.addPart("Txn_ID", currentDocument.Txn_ID, "text/plain");
//			request.addPart("Selfi_Video_Status", currentDocument.Selfi_Video_Status, "text/plain");
//			request.addPart("Personal_Video_Status", currentDocument.Personal_Video_Status, "text/plain");
//			request.addPart("Selfi_Video_SyncStatus", currentDocument.Selfi_Video_SyncStatus, "text/plain");
//			request.addPart("Selfie_Camera_Available", currentDocument.Selfie_Camera_Available, "text/plain");
//			if(currentDocument.Personal_Video_SyncStatus != ""){
//				request.addPart("Personal_Video_SyncStatus", currentDocument.Personal_Video_SyncStatus, "text/plain");	
//			}
//			if(currentDocument.Cust_Salutation != ""){
//				request.addPart("Cust_Salutation", currentDocument.Cust_Salutation, "text/plain");	
//			}
//			if(currentDocument.Cust_Name != ""){
//				request.addPart("Cust_Name", currentDocument.Cust_Name, "text/plain");	
//			}
//			if(currentDocument.Cust_Email_ID != ""){
//				request.addPart("Cust_Email_ID", currentDocument.Cust_Email_ID, "text/plain");	
//			}
//			if(currentDocument.Cust_Mobile_Number != ""){
//				request.addPart("Cust_Mobile_Number", currentDocument.Cust_Mobile_Number, "text/plain");	
//			}
//			if(currentDocument.Scheduled_Date != ""){
//				request.addPart("Scheduled_Date", currentDocument.Scheduled_Date, "text/plain");	
//			}
//			if(currentDocument.PIVC_Medical_Qs_Ans_Flag != ""){
//				request.addPart("PIVC_Medical_Qs_Ans_Flag", currentDocument.PIVC_Medical_Qs_Ans_Flag, "text/plain");
//			}
//			request.addPart("Added_By", currentDocument.Added_By, "text/plain");
//			currentDocument.Personal_Video_Path = currentDocument.Personal_Video_Path ? currentDocument.Personal_Video_Path : "";
//			if(currentDocument.Personal_Video_Path != ""){
//				request.addPart("Personal_Video", new $m.file(currentDocument.Personal_Video_Path,{level: $m.STORAGE_LEVEL}), "video/mp4", "Personal_Video");	
//			}
//			request.addPart("Selfi_Video", new $m.file(currentDocument.Selfi_Video_Path,{level: $m.STORAGE_LEVEL}), "video/mp4", "Selfi_Video");
//			console.log(JSON.stringify(request));
//			request.send(res);
//		} else{
//			$m.alert("Network disconnected in between. Please try later.");
//		}
//    };
    
	this.GetinputCount = function(priorDate,today,inputs) {
	    var url = "http://lifelineuat.reliancelife.com/RassistServices/wsLeadActivityPlanning.svc/GetLatestLeadDatabySearch/"+currentAdvisorCode+"/DateRange/"+priorDate+"-"+today;
		this.fireGetRequest(url,inputs);
	};
	this.GetinputCountAdvisor = function(advisorCode,inputs) {
	    var url = "http://lifelineuat.reliancelife.com/RassistServices/wsLeadActivityPlanning.svc/GetLatestLeadDatabySearch/"+currentAdvisorCode+"/AdvisorCode/"+advisorCode;
		this.fireGetRequest(url,inputs);
	};
	
	this.GetinputCountDefault = function(inputs) {
	    var url = "http://lifelineuat.reliancelife.com/RassistServices/wsLeadActivityPlanning.svc/GetLatestLeadDatabySearch/"+currentAdvisorCode;
		this.fireGetRequest(url,inputs);
	};
	
	this.GetApplicationNumber = function(res, data) {
        url = "http://lifelineuat.reliancelife.com/RassistServices/wsPDCDetails.svc/GetApplicationNumber";
		this.fireRequest(url,res,data);
    };
    
	this.saveNewLead = function(res, data) {
        url = "http://lifelineuat.reliancelife.com/RassistServices/wsLeadActivityPlanning.svc/SaveLeadInformation";
		this.fireRequest(url,res,data);
    };
    
 	this.updateLeadInformation = function(res,data) {
    	url = "http://lifelineuat.reliancelife.com/RassistServices/wsLeadActivityPlanning.svc/UpdateLeadInformation";
		this.fireRequest(url,res,data);
	};
	
	this.saveEKYC = function(res, data) {
    	url = "http://lifelineuat.reliancelife.com/RassistServices/wsLeadActivityPlanning.svc/SaveEKYCData";
        this.fireRequest(url,res,data);
	};
	
	this.getEKYC = function(res, data) {
    	url = "http://lifelineuat.reliancelife.com/RassistServices/wsLeadActivityPlanning.svc/GetEKYCDetails/{STRAADHAR}/{STRDOB}";
        this.fireGetRequest(url,res,data);
	};
	
	this.getEKYCBySAP = function(lead_id,res) {
    	url = "http://lifelineuat.reliancelife.com/RassistServices/wsLeadActivityPlanning.svc/GetEKYCDetailsbyLEAD/"+lead_id;
        this.fireGetRequest(url,res);
	};
	
	this.getCalendarEventDetails = function(fromdate,todate,currentAdvisorCode,res) {
    	url = "http://lifelineuat.reliancelife.com/RassistServices/wsLeadActivityPlanning.svc/GetLeadsDateWise/"+fromdate+"/"+todate+"/"+currentAdvisorCode;
      	this.fireGetRequest(url,res);
	};
	
	this.getSMforBMCalendarDetails = function(fromdate,todate,sapcode,res) {
    	url = "http://lifelineuat.reliancelife.com/RassistServices/wsLeadActivityPlanning.svc/GetLeadsDateWise/"+fromdate+"/"+todate+"/"+sapcode;
		this.fireGetRequest(url,res);
	};
	this.getWeeklyReport = function(todate,sapcode,res) {
    	url = "http://lifelineuat.reliancelife.com/RassistServices/wsLeadActivityPlanning.svc/GetWeeklyReport/"+sapcode+"/"+todate;
		this.fireGetRequest(url,res);
	};
	
	this.getRunnerActivityDetails = function(no,res) {
    	url = "http://lifelineuat.reliancelife.com/ClientInfo/wsClientInfo.svc/GetClientInfo/"+no;
        this.fireGetRequest(url,res);
	};
	
	this.saveRunnerActivityDetails = function(res, data) {
		url = "http://lifelineuat.reliancelife.com/RassistServices/wsLeadActivityPlanning.svc/SaveRunnerActivity";
		this.fireRequest(url,res,data);
	};
	
	this.saveContactAgentDetails = function(res, data) {
		url = "http://lifelineuat.reliancelife.com/RassistServices/wsLeadActivityPlanning.svc/SaveContactAgentSMSCallLog";
		this.fireRequest(url,res,data);
	};
	this.saveDeviceCompatibilityDetails = function(res, data) {
		url = "http://lifelineuat.reliancelife.com/RassistServices/wsLeadActivityPlanning.svc/SaveDeviceCompatiblityInfo";
		this.fireRequest(url,res,data);
	};
	
	this.saveCandidateEKYCData = function(res, data) {
		url = "http://lifelineuat.reliancelife.com/RassistServices/wsHRMS.svc/Candidate_EKYC_Insert_Data";
		this.fireRequest(url,res,data);
	};
	
	this.saveCandidateDetails = function(res, data) {
		url = "http://lifelineuat.reliancelife.com/RassistServices/wsHRMS.svc/RegisterCandidate";
		this.fireRequest(url,res,data);
	};
	this.updateRemarkReasonBM = function(res, data) {
		url = "http://lifelineuat.reliancelife.com/RassistServices/wsLeadActivityPlanning.svc/Update_Reason_Remark_BM";
		this.fireRequest(url,res,data);
	};
	this.getLPCdetails = function(lead_id,inputs) {
	    var url = "http://lifelineuat.reliancelife.com/RassistServices/wsLeadActivityPlanning.svc/GetPolicyDetails/"+lead_id;
		this.fireGetRequest(url,inputs);
	};
	this.getViewDetails = function(lead_id,inputs) {
	    var url = "http://lifelineuat.reliancelife.com/RassistServices/wsLeadActivityPlanning.svc/GetRedCasePolicy/"+lead_id;
		this.fireGetRequest(url,inputs);
	};
	this.getClientDetails = function(res,data) {
	    var url = "http://lifelineuat.reliancelife.com/RassistServices/wsPDCDetails.svc/GetClientDetails";
		this.fireRequest(url,res,data);
	};
	
	this.submitAadhaarDetails = function(res,data) {
	    var url = "http://lifelineuat.reliancelife.com/RassistServices/wsPDCDetails.svc/UpdateAadhar";
		this.fireRequest(url,res,data);
	};
	
	this.CRMAdharService = function(res,data) {
	    var url = "http://10.126.239.199:5656/RLIFECRMWebService.asmx/CreateAadharUpdationSR_Portal";
		this.fireRequest(url,res,data);
	};
	
	// TODO : Create base URL here
	// Added by Sajid Halai on 15/01/2018 for User Progress Tile 
	
	this.chkTargetsCurrMonth = function(res,data) {
	    var url = "http://lifelineuat.reliancelife.com/RassistServices/wsBMException.svc/ChkTargetsCurrMonth";
		this.fireRequest(url,res,data);
	};
	
	this.insertUpdateTargets = function(res,data) {
	    var url = "http://lifelineuat.reliancelife.com/RassistServices/wsBMException.svc/InsertUpdateTargets";
		this.fireRequest(url,res,data);
	};
	
	this.getUserTargetAchievedData = function(res,data) {
	    var url = "http://lifelineuat.reliancelife.com/RassistServices/wsBMException.svc/GetUserTargetAchievedData";
		this.fireRequest(url,res,data);
	};
	
	// Web Services for BM dashboard
	
	this.getNewBusinessprogressData = function(res,data) {
	    var url = "https://saservices.reliancenipponlife.com/eopsservices/wsPortal.svc/NewBusinessPro";
		this.fireRequest(url,res,data);
	};
	
	this.getNewBusinessData = function(res,data) {
	    var url = "https://saservices.reliancenipponlife.com/eopsservices/wsPortal.svc/NewBusiness";
		this.fireRequest(url,res,data);
	};
	
	this.getNewRecruitmentData = function(res,data) {
	    var url = "https://saservices.reliancenipponlife.com/eopsservices/wsPortal.svc/Recruitment";
		this.fireRequest(url,res,data);
	};
	
	this.getNewRecruitmentProgressData = function(res,data) {
	    var url = "https://saservices.reliancenipponlife.com/eopsservices/wsPortal.svc/RecruitmentPro";
		this.fireRequest(url,res,data);
	};
	
	this.getMybusinessData = function(res,data) {
	    var url = "https://saservices.reliancenipponlife.com/eopsservices/wsPortal.svc/Mybusiness";
		this.fireRequest(url,res,data);
	};
	
	this.getMyARDMHierarchyData = function(res,data) {
	    var url = "https://saservices.reliancenipponlife.com/eopsservices/wsPortal.svc/GetHIERARCHY";
		this.fireRequest(url,res,data);
	};
	
	this.getProductMixData= function(res,data) {
	    var url = "https://saservices.reliancenipponlife.com/eopsservices/wsPortal.svc/ProductMix";
		this.fireRequest(url,res,data);
	};
	
	this.getApplicationsWithoutPIVC = function(sapcode,inputs) {
	    var url = "http://lifelineuat.reliancelife.com/RassistServices/wsPDCDetails.svc/GetApplicationsWithoutPIVC/"+sapcode;
		this.fireGetRequest(url,inputs);
	};
	
	this.getSavePIVCScreenINFO= function(res,data) {
	    var url = "http://lifelineuat.reliancelife.com/RassistServices/wsPDCDetails.svc/SavePIVCScreenINFO";
		this.fireRequest(url,res,data);
	};
	
	this.getAlertInformation= function(res,data) {
	    var url = "http://lifelineuat.reliancelife.com/RassistServices/wsBMException.svc/AlertInformation";
		this.fireRequest(url,res,data);
	};
	
	this.udateNotify= function(res,data) {
	    var url = "http://lifelineuat.reliancelife.com/RassistServices/wsBMException.svc/UpdateNotify";
		this.fireRequest(url,res,data);
	};
	
	this.getProspectInfo= function(res,data) {
	    var url = "http://lifelineuat.reliancelife.com/RassistServices/wsBMException.svc/PropectInfo";
		this.fireRequest(url,res,data);
	};
	
	this.getDashboardCount= function(res,data) {
	    var url = "http://lifelineuat.reliancelife.com/RassistServices/wsBMException.svc/DashboardAlertCount";
		this.fireRequest(url,res,data);
	};
		
	
    this.fireRequest =  function(url,res,data){
    	 if ($m.networkConnected()) {
	          data = JSON.stringify(data);
	            if ($m.isWeb()) {
	            	credentials = Base64.encode("70268271:70268271");	
    			} else {
    				credentials = Base64.encode(logincode +":" + password);	
    			}
	          $m.post(url, data, {"timeout":60000,
	                "headers": {
	                    "Content-Type": "application/json",
	                    "Authorization":"Basic "+ credentials
	                    
	                }
	            }, function(cb) {
	                return function(response) {
	                    if (response.code == 200) {
	                        // Success
	                        var result = response.result;
	                        var responseLead = JSON.parse(result.data);
	                        cb.call(this, responseLead);
	                    } else if(response.code == 0) {
	                        // Error
	                        $m.alert(messages.ServerMessage);
	                        var errMsg = response;
	                        $m.hideProgress();
	                        $m.logError(JSON.stringify(response));
	                    } else {
	                    	// Error
	                    	$m.alert(messages.ServerError);
	                        var errMsg = response;
	                        $m.hideProgress();
	                        $m.logError(JSON.stringify(response));
	                    }
	                };
	            }(res));
        } else {
            //$m.juci.getControl("syncallb").enable();
            $m.alert(messages.NoNetworkConnectivity);
        }
    };
    
    this.fireGetRequest = function(url,res){
    	if ($m.networkConnected()) {
    		var credentials = Base64.encode(logincode +":" + password);
	        $m.get(url, {"timeout":60000,
	        	"headers": {
	                    "Content-Type": "application/json",
	                    "Authorization":"Basic "+ credentials
	                    
	                }
	        }, function(cb) {
	        	return function(response) {
	                if (response.code === 200) {
	                    // Successs
	                    var result = response.result;
	                    var inputsArray = JSON.parse(result.data);
	                    cb.call(this, inputsArray);
	                } else if(response.code == 0) {
	                        // Error
	                        $m.alert(messages.ServerMessage);
	                        var errMsg = response;
	                        $m.hideProgress();
	                        $m.logError(JSON.stringify(response));
	                    } else {
	                    	// Error
	                    	$m.hideProgress();
	                    	$m.alert(messages.ServerError);
	                        var errMsg = response;
	                        $m.logError(JSON.stringify(response));
	                    }
	            	};
	        	}(res));
	    } else {
	        $m.alert(messages.NoNetworkConnectivity);
	    }
    };   
};

var NewsUpdatesServices = {
	"_url" : "http://lifelineuat.reliancelife.com/SalesAssist/NewsUpdates/wsNewUpdates.svc/",
	"_actions" : {
		"GetNewsUpdates" : "GetNewsUpdates",
		"GetNewsDetails" : "GetPressDetails"
	},
	"GetNewsUpdates" : function(callback){
		var username = $m.getUsername();
		if(!username){
			username = "20000226";
		}
		var requesturl = this._url + this._actions.GetNewsUpdates + "/" + username;		
		this._fireReuqest(requesturl,"",callback);
	},
	"GetNewsDetails" : function(pressid, callback){
		var username = $m.getUsername();
		if(!username){
			username = "20000226";
		}
		var requesturl = this._url + this._actions.GetNewsDetails + "/" + username + "/" + pressid;		
		this._fireReuqest(requesturl,"",callback);
	},
	"_fireReuqest" : function(requestUrl,requestData ,callback){
		if ($m.networkConnected()) {
			$m.get(requestUrl, {"timeout":60000}, function(callback) {
                return function(response) {
                    if (response.code === 200) {
                        var result = response.result;
                        results = JSON.parse(result.data);
                        callback.call(this, results);
                    } else {
                        $m.alert(messages.ServerError);
                        var errMsg = response;
                        $m.logError(JSON.stringify(response));
                    }
                };
            }(callback));
        } else {
            $m.alert(messages.NoNetworkConnectivity);
        }
	}
};

 