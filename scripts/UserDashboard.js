/**
 * UserDashboard.js
 * @author CloudPact Technologies
 * @description : This script is used for fetching dashboard details
 **/
$(function() {
    $("#filterList").select2({
    	placeholder: "Select",
		minimumResultsForSearch : -1
	});
});


$m.onReady(function(){
	// Code to execute when the page is ready
	juci.dataset("headerName","User Dashboard");
	 $m.juci.dataset("alertcount", "3");
});
$m.juci.addDataset("filterList", ["Month to Date","Year to Date","Custom Date Range"]);


$m.juci.addDataset("cfrFilterList", ["Select","All Open","Open > 5 Days","Due for cancellation in 7 days"]);

var renewalsDS = {
	"syncTime" : 0,
	"data" : renewals,
	"allcurrenttype" : "Month to Date",
	"lacurrenttype" : "Month to Date",
	"allFromDate" : null,
	"allToDate" : null,
	"laToDate" : null,
	"laFromDate" : null
};
$m.juci.addDataset("renewals", renewalsDS);

var applicationsDS = {
	"syncTime" : 0,
	"data" : applicationsSummary,
	"currenttype" : "Month to Date",
	"fromDate" : null,
	"toDate" : null
};
$m.juci.addDataset("applications", applicationsDS);

var customerBirthdaysDS = {
	"syncTime" : 0,
	"data" : customerBirthdays,
	"currenttype" : "Month to Date",
	"fromDate" : null,
	"toDate" : null
};
$m.juci.addDataset("customerBirthdays", customerBirthdaysDS);


var cfrCountDS = {
	"syncTime" : 0,
	"data" : cfrCount,
	"currenttype" : "All Open",
	"fromDate" : null,
	"toDate" : null
};
$m.juci.addDataset("cfrcount", cfrCountDS);


var businessDS = {
	"syncTime" : 0,
	"data" : businessCount,
	"currenttype" : "Month to Date",
	"fromDate" : null,
	"toDate" : null
};
$m.juci.addDataset("businessData", businessDS);


var commisionDS = {
	"syncTime" : 0,
	"data" : commisionCount,
	"currenttype" : "Month to Date",
	"fromDate" : null,
	"toDate" : null
};
$m.juci.addDataset("commisions", commisionDS);

var applicationsDS = {
	"syncTime" : 0,
	"data" : [
	  {
	    "Text": "All Open",
	    "Value": "ALL"
	  },
	  {
	    "Text": "Open > 5 Days",
	    "Value": "OLD"
	  },
	  {
	    "Text": "Due for cancellation in 7 days",
	    "Value": "NC"
	  }
	],
	"currenttype" : "All Open"
};
$m.juci.addDataset("cfroptions", applicationsDS);

$m.onData(function(eventObject){
	//eventObject.hideProgress = false;
	var bChannel = $m.getUserAccount().customProperties.Business_Channel;
	if (bChannel == "DM"){
		juci.findById("dashboard-commision").hide();
	} else {
		juci.findById("dashboard-commision").show();
	}
	var syncAllCallback = function(){
		populateData();
		$m.hideProgress();
	}
	//$m.show
	syncAllData(syncAllCallback);
});

function syncAllData(callback){
	$m.showProgress("Fetching data...");
	var commisionCallback = function(){
		$m.hideProgress();
		if(callback){
			$m.putPref(prefKeys.SyncTime, getTimestamp())
			callback();
		}
	};
	
	var businessCallback = function(){
		$m.showProgress("Fetching commision data...");
		syncCommision(commisionCallback);	
	};
	
	var cfrsCallback = function(){
		$m.showProgress("Fetching Business data...");
		syncBusiness(businessCallback);	
	};
	
	var cfroptionsCallback = function(){
		$m.showProgress("Fetching CFR data...");
		syncCFRs(cfrsCallback);	
	};
	
	var birthdaysCallback = function(){
		$m.showProgress("Fetching CFR options data...");
		syncOptions(cfroptionsCallback);	
	};
	
	var applicationsCallback = function(){
		$m.showProgress("Fetching birthdays data...");
		syncBirthdays(birthdaysCallback);
	};
	
	var renewalsCallback = function(){
		$m.showProgress("Fetching Applications data...");
		syncApplications(applicationsCallback);	
	};
	syncRenewals(renewalsCallback);
}

function syncRenewals(callback){
	var renewalsCallback = function(){
		if(typeof callback === "function"){
			callback();		
		}
	};
	getFullRenewalsData(renewalsCallback);	
}

function syncApplications(callback){
	var applicationsCallback = function(){
		if(typeof callback === "function"){
			callback();		
		}
	};
	getFullApplicationsData(applicationsCallback);	
}

function syncBirthdays(callback){
	var birthdaysCallback = function(){
		if(typeof callback === "function"){
			callback();		
		}
	};
	getFullBirthDayData(birthdaysCallback);
}

function syncOptions(callback){
	var cfroptionsCallback = function(){
		if(typeof callback === "function"){
			callback();		
		}
	};
	getCFROptionsData(cfroptionsCallback);	
}

function syncCFRs(callback){
	var cfrsCallback = function(){
		if(typeof callback === "function"){
			callback();		
		}
	};
	getCFRData(cfrsCallback);	
}

function syncBusiness(callback){
	var businessCallback = function(){
		if(typeof callback === "function"){
			callback();		
		}
	};
	getBusinessData(businessCallback);	
}

function syncCommision(callback){
	var commisionCallback = function(){
		if(typeof callback === "function"){
			callback();		
		}
	};
	getCommisionData(commisionCallback);	
}


function populateData(){
	$m.showProgress("Populating data...");
	populateCommisions();	
	populateBusiness();	
	populateCFRS();	
	populateCFROptions();	
	populateBirthdays();
	populateApplications();	
	populateRenewals();
	$m.hideProgress();
}


function populateRenewals(){
	var data = getData("Renewal");
	updateDataset("renewals", data.data, data.syncTime);
}

function populateApplications(){
	var data = getData("Application");
	updateDataset("applications", data.data, data.syncTime);
}

function populateBirthdays(){
	var data = getData("Birthday");
	updateDataset("customerBirthdays", data.data, data.syncTime);
}

function populateCFROptions(){
	var data = getData("CfrOptions");
	updateDataset("cfroptions", data.data, data.syncTime);
}

function populateCFRS(){
	var data = getData("Cfr");
	updateDataset("cfrcount", data.data, data.syncTime);
}

function populateBusiness(){
	var data = getData("Business");
	updateDataset("businessData", data.data, data.syncTime);
}

function populateCommisions(){
	var data = getData("Commsion");
	updateDataset("commisions", data.data, data.syncTime);
}

function getData(prefKey){
	var data = {
		"data" : $m.getPref(prefKeys[prefKey + "Data"]),
		"syncTime" : $m.getPref(prefKeys[prefKey + "Sync"]),
	}
	return data;
}

function updateDataset(dataset, data, synctime){
	var datasetContent = $m.juci.getDataset(dataset);
	data = ko.mapping.fromJS(data);
	synctime = ko.mapping.fromJS(synctime);
	datasetContent().data(data);
	datasetContent().syncTime(synctime);
}

function getRenewaldata(data,currenttype,dataType){
	currenttype = getDurationOption(currenttype());
	var renewalData = data()[dataType]();
	renewalData = renewalData[currenttype.toLowerCase()];
	renewalData = ko.toJS(renewalData);
	if(!renewalData){
		renewalData = {
			"TotalPayments" : 0,
			"TotalPremium" : 0
		}
	}
	return renewalData;
}

function _getApplicationsData(data,currenttype,dataType){
	currenttype = getDurationOption(currenttype());
	var applicationsData = data()[currenttype.toLowerCase()];
	applicationsData = ko.toJS(applicationsData);
	for(var i=0;i<applicationsData.length;i++){
		if(applicationsData[i]["ApplicationStatus"] === dataType){
			return applicationsData[i];
		}
	}
	return {
		"ApplicationCount" : 0,
		"ApplicationStatus" : 0,
		"TotalApplicationPremium" : 0
	}
}

function _getCfrData(data, currenttype){
	currenttype = cfrOptionText(currenttype());
	var cfrData = data()[currenttype];	
	var totalCount = "0";
	cfrData = ko.toJS(cfrData);
	totalCount = cfrData.TotalCfrCount;
	UwCfrCount = cfrData.UwCfrCount;
	setChart((UwCfrCount/totalCount)*100, totalCount);	
	return cfrData;
}

function _getBirthdays(data, currenttype){
	currenttype = getDurationOption(currenttype());
	var birthdayData = data()[currenttype.toLowerCase()];
	if(!birthdayData){
		birthdayData = [];
	}
	birthdayData = ko.toJS(birthdayData);
	return birthdayData;
}

function _getBusinessData(data, currenttype){
	currenttype = getDurationOption(currenttype());
	var businessData = data()[currenttype.toLowerCase()];
	businessData = ko.toJS(businessData);
	if(!businessData){
		businessData = {
		  "AmountDue": "0",
		  "AmountPaid": "0",
		  "CollectedPersistency": "0",
		  "IssuanceNop": "0",
		  "IssuanceWcpSum": "0",
		  "IssuanceWrpSum": "0",
		  "LoginsNop": "0",
		  "LoginsWcpSum": "0",
		  "LoginsWrpSum": "0",
		  "PersistencyTotal": "0",
		  "TotalPremium": "0"
		};	
	}
	businessData = ko.toJS(businessData);
	return businessData;
}


function _getCommisions(data, currenttype){
	currenttype = getDurationOption(currenttype());
	var commisionData = data()[currenttype.toLowerCase()];
	commisionData = ko.toJS(commisionData);
	if(!commisionData){
		commisionData = {
		  "NBCommissionAccrued": "0",
		  "NBCommissionCredited": "0",
		  "NBPremium": "0",
		  "RenewalCommissionAccrued": "0",
		  "RenewalCommissionCredited": "0",
		  "RenewalPremium": "0",
		  "TotalCommissionAccrued": "0",
		  "TotalCommissionCredited": "0",
		  "TotalPremium": "0"
		};	
	}
	commisionData = ko.toJS(commisionData);
	return commisionData;
}

function getSyncTime(syncTime){
	syncTime = ko.toJS(syncTime);
	if(!syncTime){
		syncTime = "NA";
		return syncTime;
		
	}
	var syncDate = new Date(syncTime).toString("dd/MM/yyyy hh:mm:ss tt");
	return syncDate;
}


/* Custome Date Range  */

function getCDRAllRenewals(event){
	var renewals = $m.juci.dataset("renewals");
	var validateResult = validateCDR(renewals.allFromDate, renewals.allToDate);
	if(validateResult){
		$m.alert(validateResult);
		return;
	}
	if(renewals.allFromDate && renewals.allToDate){
		var callback = function(cdrData){
			var renewalsData = $m.juci.getDataset("renewals");
			cdrData = ko.mapping.fromJS(cdrData);
			renewalsData().data().all().cdr(cdrData);
		}
		var request  = {
		  "duration": "CDR",
		  "fromDate": renewals.allFromDate,
		  "role": "ADV",
		  "toDate": renewals.allToDate,
		  "renewalType" : "All"
		}
		DashboardServices.GetRenewals(request, callback);		
	}
}


function getCDRLARenewals(event){
	var renewals = $m.juci.dataset("renewals");
	var validateResult = validateCDR(renewals.laFromDate, renewals.laToDate);
	if(validateResult){
		$m.alert(validateResult);
		return;
	}
	if(renewals.laFromDate && renewals.laToDate){
		var callback = function(cdrData){
			var renewalsData = $m.juci.getDataset("renewals");
			cdrData = ko.mapping.fromJS(cdrData);
			renewalsData().data().la().cdr(cdrData);
		}
		var request  = {
		  "duration": "CDR",
		  "fromDate": renewals.laFromDate,
		  "role": "ADV",
		  "toDate": renewals.laToDate,
		  "renewalType" : "LA"
		}
		DashboardServices.GetRenewals(request, callback);		
	}
}

function getCDRBirthdays(event){
	var customerBirthdays = $m.juci.dataset("customerBirthdays");
	var validateResult = validateCDR(customerBirthdays.fromDate, customerBirthdays.toDate);
	if(validateResult){
		$m.alert(validateResult);
		return;
	}
	if(customerBirthdays.fromDate && customerBirthdays.toDate){
		var callback = function(cdrData){
			var renewalsData = $m.juci.getDataset("customerBirthdays");
			cdrData = ko.mapping.fromJS(cdrData);
			renewalsData().data().cdr(cdrData);
		}
		var request  = {
		  "duration": "CDR",
		  "fromDate": customerBirthdays.fromDate,
		  "role": "ADV",
		  "toDate": customerBirthdays.toDate,
		}
		DashboardServices.GetCustomerBirthdays(request, callback);		
	}
}

function getCDRBusiness(event){
	var businessData = $m.juci.dataset("businessData");
	var validateResult = validateCDR(businessData.fromDate, businessData.toDate);
	if(validateResult){
		$m.alert(validateResult);
		return;
	}
	if(businessData.fromDate && businessData.toDate){
		var callback = function(cdrData){
			var renewalsData = $m.juci.getDataset("businessData");
			cdrData = ko.mapping.fromJS(cdrData);
			renewalsData().data().cdr(cdrData);
		}
		var request  = {
		  "duration": "CDR",
		  "fromDate": businessData.fromDate,
		  "role": "ADV",
		  "toDate": businessData.toDate,
		}
		DashboardServices.GetBusinessSummary(request, callback);		
	}
}

function getCDRCommisions(event){
	var commisions = $m.juci.dataset("commisions");
	var validateResult = validateCDR(commisions.fromDate, commisions.toDate);
	if(validateResult){
		$m.alert(validateResult);
		return;
	}
	if(commisions.fromDate && commisions.toDate){
		var callback = function(cdrData){
			var renewalsData = $m.juci.getDataset("commisions");
			cdrData = ko.mapping.fromJS(cdrData);
			renewalsData().data().cdr(cdrData);
		}
		var request  = {
		  "duration": "CDR",
		  "fromDate": commisions.fromDate,
		  "role": "ADV",
		  "toDate": commisions.toDate,
		}
		DashboardServices.GetCommisions(request, callback);		
	}
}

function validateCDR(fromDate, toDate){
	var fromPreviousDate = new Date();
	if(fromDate.getTime() > fromPreviousDate.getTime()){
		return "From date cannot be greater than current date";
	}
	fromPreviousDate = fromPreviousDate.setFullYear(fromPreviousDate.getFullYear()-1);
	if(dateDiffInDays(new Date(fromPreviousDate), fromDate) > 31536000000){
		return "From date should not be less than 1 year from current date";
	}
	return false;
}

function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.abs(Math.floor(utc2 - utc1));
}


function getCDRApplications(event){
	var applications = $m.juci.dataset("applications");
	if(applications.fromDate && applications.toDate){
		var callback = function(cdrData){
			var renewalsData = $m.juci.getDataset("applications");
			renewalsData().data().cdr(cdrData);
		}
		var request  = {
		  "duration": "CDR",
		  "fromDate": renewals.laFromDate,
		  "role": "ADV",
		  "toDate": renewals.laToDate,
		}
		DashboardServices.GetApplicationSummary(request, callback);		
	}
}




function cfrOptionText(item){
	var optionText = "all";
	if(item === "All Open"){
		optionText = "all";
	}
	if(item === "Open > 5 Days"){
		optionText = "old";
	}
	if(item === "Due for cancellation in 7 days"){
		optionText = "nc";
	}
	return optionText;
}


function getDurationOption(option){
	var durationOption = "MTD";
	if(option === "Year to Date"){
		durationOption = "YTD";
	}
	if(option === "Custom Date Range"){
		durationOption = "CDR";
	}
	return durationOption;
}

function refreshData(event){
	var a = 10;
}

ko.bindingHandlers.valueUpdate = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called when the binding is first applied to an element
        // Set up any initial state, event handlers, etc. here
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called once when the binding is first applied to an element,
        // and again whenever any observables/computeds that are accessed change
        // Update the DOM element based on the supplied values here.
    }
};