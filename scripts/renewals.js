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

var flag = "true";
var ren = {
	"TotalCount":"",
	"InForceCount":"",
	"LapseCount":"",
	"SurrenderCount":""
};
var info = {
	"ProfileImage":"",
	"PayPropensity":"",
	"ClientName":"",
	"State":"",
	"DateOfBirth":"",
	"City":"",
	"ClientID":"",
	"MobileNumber":"",
	"EmailAddress":"",
	"AdvisorCode":"",
	"AdvisorEmailAddress":"",
	"AdvisorMobileNumber":"",
	"AdvisorName":"",
	"EcsActive":"",
	"Frequency":"",
	"GraceEndDate":"",
	"IssuedDate":"",
	"PaymentMode":"",
	"PolicyNumber":"",
	"PolicyTerm":"",
	"PremiumDueDate":"",
	"PremiumTerm":"",
	"PremiumType":"",
	"LastPremiumPaidDate":""
	
};

$m.juci.addDataset("customerinfo",info);
$m.juci.addDataset("renewals",ren);
$m.juci.addDataset("totalrenewals",[]);
$m.juci.addDataset("inforcerenewals",[]);
$m.juci.addDataset("lapsedrenewals",[]);
$m.juci.addDataset("surrenderedrenewals",[]);
$m.juci.addDataset("renewalsearch",[]);
$m.juci.addDataset("options1",["Select","App No.","Name","Mobile No."]);
$m.juci.addDataset("options2",["Select","Grace End Date","Name of Proposer","Plan Name","Installment Period","Installment Premium","Propensity to Pay"]);
$m.juci.addDataset("options3",["Select","Earliest to Latest","Latest to Earliest"]);
$m.juci.addDataset("options4",["Select","Today","Next 7 days","Next 15 days","Next 30 days","In grace period","Custom Date Range"]);
$m.juci.addDataset("options5",["Select","Max to Min","Min to Max"]);
$m.juci.addDataset("selectcatogory",[]);
$m.juci.addDataset("dateranged",[]);
$m.juci.addDataset("searchbyoption",[]);
$m.juci.addDataset("searchtext","");


var toggleid = 0;

function toggleView(e){
	currentView.hide();
	InForceView.hide();
	LapsedView.hide();
	SurrenderedView.hide();
	toggleid = e.newToggled;
	if(sortby === true){
		juci.findById("sort").hide();
	}
	if(filterby === true){
		juci.findById("filter").hide();
	}
	if(searchBy === true){
		juci.findById("searchbox").hide();
		searchBy = false;
	}
	$m.juci.findById("dateranger").hide();
	$m.juci.dataset("dateranged",[]);
	for(var i=0;i<searchxlist.length;i++){
		searchxlist[i].hide();
	}
	switch(e.newToggled){
		case 0:
			currentView.show();
			break;
		case 1:
			InForceView.show();
			break;
		case 2:
			LapsedView.show();
			break;
		case 3:
			SurrenderedView.show();
			break;
	} 
}



$m.onReady(function(){
	// Code to execute when the page is ready
	var head = document.getElementsByClassName("juci_panel_title");
	juci.viewModel.applyBinding(head[0]);
	juci.dataset("headerName","Renewals");
	$m.juci.dataset("alertcount","3");
	
	InForceView = juci.findById("inforcedrenewals");
	LapsedView = juci.findById("lapserenewals");
	SurrenderedView = juci.findById("surrenderrenewals");
	InForceView.hide();
	LapsedView.hide();
	SurrenderedView.hide();
	currentView = juci.findById("totalrenewals");
	/*
	juci.getControl("allrenewal").addListItemClick(onSwitchClick, this, ".show");
	juci.getControl("forcerenewal").addListItemClick(onSwitchClick, this, ".show");
	juci.getControl("laprenewal").addListItemClick(onSwitchClick, this, ".show");
	juci.getControl("surrdrenewal").addListItemClick(onSwitchClick, this, ".show"); */
	
	juci.getControl("allrenewal").addListItemClick(call, this, ".call");
	juci.getControl("allrenewal").addListItemClick(email, this, ".email");
	juci.getControl("allrenewal").addListItemClick(sms, this, ".sms");
	
	juci.getControl("forcerenewal").addListItemClick(call, this, ".call");
	juci.getControl("forcerenewal").addListItemClick(email, this, ".email");
	juci.getControl("forcerenewal").addListItemClick(sms, this, ".sms");
	
	juci.getControl("laprenewal").addListItemClick(call, this, ".call");
	juci.getControl("laprenewal").addListItemClick(email, this, ".email");
	juci.getControl("laprenewal").addListItemClick(sms, this, ".sms");
	
	juci.getControl("surrdrenewal").addListItemClick(call, this, ".call");
	juci.getControl("surrdrenewal").addListItemClick(email, this, ".email");
	juci.getControl("surrdrenewal").addListItemClick(sms, this, ".sms");
});
/*
var servicecalled = false;
function onSwitchClick(e){
	var contactnumber = e.data.ContractNumber;
	if(servicecalled){
		servicecalled = false;
		service.GetCustomerInfo(function(list){
			$m.juci.dataset("customerinfo",list);
		},contactnumber);
	}else{
		service = new ServiceLibrary();
		service.GetCustomerInfo(function(list){
			$m.juci.dataset("customerinfo",list);
		},contactnumber);
		servicecalled = true;
	}
} */

var Allrenewals = [];
var Forcerenewals = [];
var Lapserenewals = [];
var surrenderrenewals = [];
var list = [];

$m.onData(function(){
	// Code to execute when a data is received from parent page
	$m.showProgress("Fetching...");
		service = new ServiceLibrary();
		service.GetRenewalsList(function(list){
			//	$m.hideProgress();
			$m.showProgress("Fetching...");
				var obj = {
					"TotalCount":list.TotalCount,
					"InForceCount":list.InForceCount,
					"SurrenderCount":list.SurrenderCount,
					"LapseCount":list.LapseCount
				};
			$m.juci.addDataset("renewals",obj);
			if((list.InForcePaymentSummaryList == null || list.InForcePaymentSummaryList == 0) && (list.LapsedPaymentSummaryList == null || list.LapsedPaymentSummaryList == 0) && (list.TotalCount == null || list.TotalCount == 0) && (list.SurrenderedPaymentSummaryList == null || list.SurrenderedPaymentSummaryList == 0) && (list.LapseCount == null || list.LapseCount == 0) && (list.SurrenderCount == null || list.SurrenderCount == 0)){
					$m.hideProgress();
					$m.alert("No data found","Alert",function(){
						$m.hideProgress();
					});
			}else{
				for(var i=0;i<list.InForcePaymentSummaryList.length;i++){
					Allrenewals.push(list.InForcePaymentSummaryList[i]);
				}
				for(var j=0;j<list.LapsedPaymentSummaryList.length;j++){
					Allrenewals.push(list.LapsedPaymentSummaryList[j]);
				}
				for(var k=0;k<list.SurrenderedPaymentSummaryList.length;k++){
					Allrenewals.push(list.SurrenderedPaymentSummaryList[k]);
				}
				//$m.hideProgress();
				$m.juci.dataset("totalrenewals",Allrenewals);
				$m.juci.dataset("inforcerenewals",list.InForcePaymentSummaryList);
				$m.juci.dataset("lapsedrenewals",list.LapsedPaymentSummaryList);
				$m.juci.dataset("surrenderedrenewals",list.SurrenderedPaymentSummaryList);
				$m.juci.dataset("renewalsearch",Allrenewals);
				$m.hideProgress();
				showDetails();
				var a = $m.juci.findById("policy-details");
				a.hide();
				Forcerenewals = list.InForcePaymentSummaryList;
				Lapserenewals = list.LapsedPaymentSummaryList;
				surrenderrenewals = list.SurrenderedPaymentSummaryList;
			}
		});	
});

$m.onResume(function(){
	// Code to execute when the page is resumed
	juci.dataset("headerName","Renewals");
	searchxlist = juci.findByClass("juci_xlist_search");
	for(var i=0;i<searchxlist.length;i++){
		searchxlist[i].hide();
	}
	juci.findById("searchbox").hide();
});

$m.onReady(function(){
	$(function() {
	    $(window).scroll(sticky_relocate);
	    //sticky_relocate();
	});
});


function onPolicyDetailsClick(e,a){
	debugger
	if(flag === "true"){
		flag = "flase";
		$m.juci.findById("policy-details").show();	
	} else {
		flag = "true";
		$m.juci.findById("policy-details").hide();	
	}
}


