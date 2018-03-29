/**
 * Application.js
 * @author CloudPact Technologies
 * @description : This script is used for resuming proposals and maintaining proposal status.
 **/

$(function() {
    $("#getSelectedoption").select2({
    	placeholder: "Select",
		minimumResultsForSearch : -1
	});
	
	$("#filterList-sort").select2({
    	placeholder: "Select",
		minimumResultsForSearch : -1
	});
	
	$("#getsortedList").select2({
    	placeholder: "Select",
		minimumResultsForSearch : -1
	});
	$("#filterlist").select2({
    	placeholder: "Select",
		minimumResultsForSearch : -1
	});
});

var Application = {
    "AllApplications": "",
    "Proposal": "",
    "LoginApplicationsList": "",
    "IssuedApplicationsList": "",
    "RejectedApplicationsList": ""
};
$m.juci.addDataset("application", Application);
$m.juci.addDataset("allapplications", []);
$m.juci.addDataset("AppCount", 0);
$m.juci.addDataset("dateranged",[]);
$m.juci.addDataset("searchbyoption",[]);

var approveddetails = [{
    "Name": "Isha Katwal",
    "id": "BRSMCU014",
    "company": "Reliance Group Term Assurance Plan",
    "Category": "Solution for Groups",
    "ApplicationNo": "0012TRA937",
    "amount": "22,643",
    "TransactionID": "SBI9991",
    "date": "01 Dec 2015",
    "status": "Payment Pending"
}, {
    "Name": "Dlana Saldana",
    "id": "BRSMCU044",
    "company": "Reliance Total Health",
    "Category": "Health Plan",
    "ApplicationNo": "0012TRA982",
    "amount": "36,345",
    "TransactionID": "I/ngv1256",
    "date": "03 Dec 2015",
    "status": "Payment Pending"
}, {
    "Name": "Sayed Jaffrey",
    "id": "BRSMCU009",
    "company": "Reliance Super Money Back Plan",
    "Category": "Savings & Investment Plan",
    "ApplicationNo": "0012TRA871",
    "amount": "10,112",
    "TransactionID": "IDBI4466",
    "date": "28 Nov 2015",
    "status": "Payment Pending"
}, {
    "Name": "Vinod Kumar",
    "id": "BRSMCU0",
    "company": "Reliance Super Online Term",
    "Category": "Protection Plan",
    "ApplicationNo": "0012TRA901",
    "amount": "12,345",
    "TransactionID": "HSBC8812",
    "date": "28 Nov 2015",
    "status": "Payment Pending"
}, {
    "Name": "Reshma M",
    "id": "BRSMCU012",
    "company": "Reliance Child Plan",
    "Category": "Child Plan",
    "ApplicationNo": "0012TRA923",
    "amount": "1,3991",
    "TransactionID": "IDBI8142",
    "date": "30 Nov 2015",
    "status": "Payment Pending"
}];

$m.juci.addDataset("draftappliacations", []);
$m.juci.addDataset("loginsapplications", []);
$m.juci.addDataset("issuedapplications", []);

$m.juci.addDataset("rejectedapplications", []);
$m.juci.addDataset("options1", ["Select", "Policy Term", "Premium Paying Term", "Premium Amount"]);
//$m.juci.addDataset("options1",["Cust Name","Cust ID","Product Name","Product Type","App No.","Login Date"]);
$m.juci.addDataset("applicationsearch", []);
$m.juci.addDataset("options2", ["Select", "Product Name", "Product Type", "Policy Term", "Premium Paying Term", "Premium Amount", "Login Date", "Issuance Date"]);
$m.juci.addDataset("options3", ["Select","Highest to Lowest", "Lowest to Highest"]);
$m.juci.addDataset("options4", ["All", "Month to Date", "Year to Date", "Custom date range"]);
$m.juci.addDataset("optionselected", []);

$m.onReady(function() {
	juci.dataset("headerName","Applications");
    var head = document.getElementsByClassName("juci_panel_title");
    juci.viewModel.applyBinding(head[0]);
    $m.juci.dataset("alertcount", "5");
    DraftView = juci.findById("draftView");
    LoginView = juci.findById("loginView");
    IssuedView = juci.findById("issuedView");
    RejectedView = juci.findById("rejectedView");
    DraftView.hide();
    LoginView.hide();
    IssuedView.hide();
    RejectedView.hide();
    currentView = juci.findById("allAppView");
    juci.getControl("pending").addListItemClick(call, this, ".call");
    juci.getControl("pending").addListItemClick(email, this, ".email");
    juci.getControl("pending").addListItemClick(sms, this, ".sms");
    juci.getControl("draftedApplications").addListItemClick(callData, this, ".call");
    juci.getControl("draftedApplications").addListItemClick(emailService, this, ".email");
    juci.getControl("draftedApplications").addListItemClick(smsService, this, ".sms");
    juci.getControl("draftedApplications").addListItemClick(restart, this, ".restart");
    juci.getControl("draftedApplications").addListItemClick(openproposal, this, ".resumeProposal");
    juci.getControl("pending").addListItemClick(openTrackProposal, this, ".trace_proposal");
    juci.getControl("issuedapplications").addListItemClick(openTrackProposal, this, ".trace_proposal");
    showDraftProposal();

});


AllApplications = [];
LoginApplications = [];
IssuedApplications = [];
RejectedApplications = [];
$m.onData(function(eventObject) {
    // Code to execute when a data is received from parent page
    $m.showProgress("Fetching renewals...");
    getPlanmaster();
    showDraftProposal();
    count_service();

});

var toggleid = 0;

function toggleView(e) {
    currentView.hide();
    DraftView.hide();
    LoginView.hide();
    IssuedView.hide();
    RejectedView.hide();
    toggleid = e.newToggled;
    if (searchBy === true) {
        juci.findById("searchbox").hide();
    }
    if (sortby === true) {
        juci.findById("sort").hide();
    }
    if (filterby === true) {
        juci.findById("filter").hide();
    }
    for (var i = 0; i < searchxlist.length; i++) {
        searchxlist[i].hide();
    }
    switch (e.newToggled) {
        case 0:
            currentView.show();
            $m.juci.dataset("options2", ["Select","Product Name", "Product Type", "Policy Term", "Premium Paying Term", "Premium Amount", "Login Date", "Issuance Date"]);
            $m.juci.dataset("options1", ["Select","Policy Term", "Premium Paying Term", "Premium Amount"]);
            $m.juci.dataset("optionselected", []);
            break;
        case 1:
            DraftView.show();
            break;
        case 2:
            LoginView.show();
            $m.juci.dataset("options2", ["Select","Product Name", "Product Type", "Policy Term", "Premium Paying Term", "Premium Amount", "Login Date", "Draft Date"]);
            $m.juci.dataset("options1", ["Select","Cust Name", "Cust ID", "Product Name", "Product Type", "App No.", "Login Date", "Pending Since Date"]);
            $m.juci.dataset("optionselected", []);
            break;
        case 3:
            IssuedView.show();
            $m.juci.dataset("options2", ["Select","Product Name", "Product Type", "Policy Term", "Premium Paying Term", "Premium Amount", "Login Date", "Issuance Date"]);
            $m.juci.dataset("options1", ["Select","Cust Name", "Cust ID", "Product Name", "Product Type", "App No.", "Login Date", "Issuance Date"]);
            $m.juci.dataset("optionselected", []);
            break;
        case 4:
            RejectedView.show();
            $m.juci.dataset("options2", ["Select","Product Name", "Product Type", "Premium Amount", "Login Date", "Refund Date"]);
            $m.juci.dataset("options1", ["Select","Cust Name", "Cust ID", "Product Name", "Product Type", "App No.", "Login Date", "Refund Date"]);
            $m.juci.dataset("optionselected", []);
            break;
    }
}

var select = {
    "fld1": "Cust Name",
    "fld2": "Cust ID",
    "fld3": "Product Name",
    "fld4": "Product Type",
    "fld5": "App No.",
}

$m.juci.addDataset("select", select);

var sorttype = {
    "fld1": "Product Name",
    "fld2": "Product Type",
    "fld3": "Premium Type",
    "fld4": "Policy Term",
    "fld5": "Premium Paying Term"
};

$m.juci.addDataset("sorttype", sorttype);

var sortorder = {
    "fld1": "Ascending To Descending",
    "fld2": "Descending TO Ascending"
};

$m.juci.addDataset("sortorder", sortorder);

var filter = {
    "fld1": "Month To Date",
    "fld2": "Year To Date",
    "fld3": "Custom Date Range"
};

$m.juci.addDataset("filter", filter);

$m.onResume(function() {
    // Code to execute when the page is resumed
    searchxlist = juci.findByClass("juci_xlist_search");
    for (var i = 0; i < searchxlist.length; i++) {
        searchxlist[i].hide();
    }
    showDraftProposal();
});

// draft proposal
function showDraftProposal() {
	$m.showProgress("Fecthing drafts...");
    new window.DB(CONSTANTS.DBName, function(dbHelper) {
        window.dbHelper = dbHelper;
		PDC_Customer_Details.Select(function(applicationsResult){
			var applications = applicationsResult.rows;
			
			applications.forEach(function(application, index) {
				
				if(application.issync === "1" && application.DOCS_UPLOADED == ""){
					application.issync = "0";
					
				}
				
				
				if(application.iscompleted === "1" && application.issync === "1" && application.DOCS_UPLOADED == "Y" ){
					application["dataflag"] = "S";
				}
				if(application.iscompleted === "1" && application.issync === "0" && application.DOCS_UPLOADED == ""){
					application["dataflag"] = "P";
				}
				
				 if(application.iscompleted === "1" && application.issync === "1" && application.DOCS_UPLOADED == "N"){
					application["dataflag"] = "C";
				}
			 
				if(application.iscompleted === "1" && application.issync === "0" && application.DOCS_UPLOADED == "N"){
					application["dataflag"] = "C";
				}
				if(application.iscompleted === "0" && application.issync === "0"){
					application["dataflag"] = "D";
				}
			});
			applications = updatePolicyDetails(applications);
			$m.juci.dataset("draftappliacations", applications);
			$m.juci.dataset("AppCount", applications.length);
			$m.putPref("AppCount", applications.length, true);
            $m.savePref();
            $m.hideProgress();
		}, function(error_response) {
            $m.hideProgress();
            $m.logError("Select query failed -- " + JSON.stringify(error_response));
            $m.alert("Error while fetching from database");
        });
    }, function(error) {
        $m.hideProgress();
        $m.logError("Unable to open database due to -- " + JSON.stringify(error));
        $m.alert("Error while opening database");
    });
}

function updatePolicyDetails(draftedAppication){
	for(var i=0;i<draftedAppication.length;i++){
		var planDetails = $m.getPref("planDetails_" + draftedAppication[i].Application_Number);
	//	var planName = $m.getPref("planName_" + draftedAppication[i].Application_Number);
		if(!planDetails){
			planDetails = {
				"InstallmentPremium_ST" : "-",
				"Premium_Frequency" : "-",
				"PolicyTerm" : "-",
				"PremiumPayingTerm" : "-",
				"Application_Dt" : "-",
				"planName" : "-",
				"PlanCode" : "-"
			};
		}
		draftedAppication[i].InstallmentPremium_ST = planDetails.InstallmentPremium_ST ? planDetails.InstallmentPremium_ST : "-";
		draftedAppication[i].Premium_Frequency = planDetails.Premium_Frequency ? planDetails.Premium_Frequency : "-";
		draftedAppication[i].PolicyTerm = planDetails.PolicyTerm ? planDetails.PolicyTerm : "-";
		draftedAppication[i].PremiumPayingTerm = planDetails.PremiumPayingTerm ? planDetails.PremiumPayingTerm : "-";
		draftedAppication[i].Application_Dt = planDetails.Application_Dt ? planDetails.Application_Dt : "-";
		draftedAppication[i]["planName"] = planDetails.PLanCode ? getPlanname(planDetails["PLanCode"]):"-";
	}
	return draftedAppication;
}

function changeStatus(status) {
	var fullstatus = "";
	switch(status){
		case "D" : 
			fullstatus = "Draft Proposal";
			break;
		case "C" : 
			fullstatus = "Completed";
			break;
		case "S" : 
			fullstatus = "Synced";
			break;
		case "P":
			fullstatus = "Pending Documents";
			break;
	}
    return fullstatus;
}

function addYears(year) {
    return year + "Years";
}


function resumeDraft() {
    $m.alert("adasdasdas");
}



function openproposal(event) {
    var data = {
        "applicationNumber": event.data.Application_Number
    };
    $m.open("Proposal", "/Applications/proposal.html", data);
}


function openTrackProposal(event) {
    var applicationData = event.data;

    applicationData.BirthDate = applicationData.BirthDate.replace(/-/g, "/")

    var rep = {
        "AppNo": applicationData.ApplicationNumber,
        "DOB": applicationData.BirthDate,
    };
    var url = "http://www.reliancelife.com/trackproposal/Default.aspx?";
    for (var key in rep) {
        url = url + key + "=" + rep[key] + "&"
    }
    url = url.substring(0, url.length - 1);
    $m.openChildBrowser("Track Proposal", url, {
        "navigation": true,
        "address": [],
        "patterns": []
    });
}

function count_service() {
    service = new ServiceLibrary();
    service.GetApplicationList(function(list) {
        var obj = {
            "AllApplications": parseInt(list.IssuedCount) + parseInt(list.LoginCount) + parseInt(list.RejectedCount) + juci.dataset("AppCount"),
            "Proposal": juci.dataset("AppCount"),
            "LoginApplicationsList": list.LoginCount,
            "IssuedApplicationsList": list.IssuedCount,
            "RejectedApplicationsList": list.RejectedCount
        };
        $m.juci.dataset("application", obj);
        for (var i = 0; i < list.IssuedApplicationsList.length; i++) {
            AllApplications.push(list.IssuedApplicationsList[i]);
        }
        for (var j = 0; j < list.LoginApplicationsList.length; j++) {
            AllApplications.push(list.LoginApplicationsList[j]);
        }
        $m.hideProgress();
        $m.juci.dataset("allapplications", AllApplications);
        $m.juci.dataset("loginsapplications", list.LoginApplicationsList);
        $m.juci.dataset("issuedapplications", list.IssuedApplicationsList);
        $m.juci.dataset("rejectedapplications", list.RejectedApplicationsList);
        $m.juci.dataset("applicationsearch", AllApplications);
        LoginApplications = list.LoginApplicationsList;
        IssuedApplications = list.IssuedApplicationsList;
        RejectedApplications = list.RejectedApplicationsList;

    });
}

$m.onReady(function(){
	$(function() {
	    $(window).scroll(sticky_relocate);
	});
});

function showApplications(event){
	var searchbyoption = $m.juci.getControl("search-text").value();
	if(toggleid === 0){
		filterArray = AllApplications;
	}else if(toggleid == 1){
		//TODO
	}else if(toggleid == 2){
		filterArray = LoginApplications;
	}else if(toggleid == 3){
		filterArray = IssuedApplications;
	}else if(toggleid == 4){
		filterArray = RejectedApplications;
	}
	var searchCategory = document.getElementById("getSelectedoption");
	searchCategory = searchCategory.value;
	var searchOption = "";
	switch(searchCategory){
		case "Policy Term":
			searchOption = "PolicyTerm";
			break;
		case "Premium Paying Term":
			searchOption = "PremiumPayingTerm";
			break;
		case "Premium Amount":
			searchOption = "Premium";
			break;
	}
	var selectedApplications = [];
	for(var i=0;i<filterArray.length;i++){
		var filterOption = filterArray[i][searchOption].toLowerCase();
		searchbyoption = searchbyoption.toLowerCase();
		if(filterOption.indexOf(searchbyoption) != -1){
			selectedApplications.push(filterArray[i]);
		}
	}
	AssignToDataset(selectedApplications);	
}

var sort_by = function(field, reverse, primer){

   var key = primer ? 
       function(x) {return primer(x[field])} : 
       function(x) {return x[field]};

   reverse = !reverse ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     } 
}


//Call , Email ,SMS
function callData(e){
	var mobile = e.data.LA_Mobileno;
	$m.callContact(mobile);
}

function emailService(e){
	var emailid = e.data.LA_EmailId;
	$m.email([emailid], '' , '');
}

function smsService(e){
	var sendsms = e.data.LA_Mobileno;
	$m.sms([sendsms], '');
}