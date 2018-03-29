/**
 * CFR Notifications.js
 * @author CloudPact Technologies
 * @description : This script is for Notifications.
 **/

var show = false;
var notificationsAppArr = [];
var renewalsArr = [];
var applicationsArr = [];
var cfrArr = [];
var totalAppArr = [];
var totalAlerts = [];
var CheckBounceNotifications = [];
var BirthdayNotifications = [];
var NewsNotifications = [];
var cfrDetailsList = [];
var finalCfrDetailList = [];
var superTrackDetailList = [];
var alertsOldCount;
var currDtl;
var dbHelper;
var cfr = {
	"applications":"",
	"renewals":"",
	"alerts":"",
	"supertrackMainCount":""
};
$m.juci.addDataset("cfrs",cfr);
$m.juci.addDataset("AlertsCount","0");
$m.juci.addDataset("alertcount","");
$m.juci.addDataset("cfrftnr",[]);
$m.juci.addDataset("appNotifications",[]);
$m.juci.addDataset("applicationNotifications",[]);
$m.juci.addDataset("superTrackNotifications",[]);
$m.juci.addDataset("cfrUW",[]);
$m.juci.addDataset("renewals",[]);
$m.juci.addDataset("alerts",[]);
$m.juci.addDataset("alertNews",[]);
$m.juci.addDataset("importantNews","0");
$m.juci.addDataset("applicationsCount","0");
$m.juci.addDataset("cfrCount","0");
$m.juci.addDataset("superTrackCount","0");
$m.juci.addDataset("supertrack",false);
$m.juci.addDataset("superView",false);

$m.onReady(function(){
	initReady();
});

// Initilizing page header
$m.onResume(function(){
	// Code to execute when the page is ready
	var hName = $m.juci.dataset('headerName');
//	var alertCount = $m.juci.dataset('alertcount');
	$m.pageTitle('<div class="page_title"><div style="text-align:center" class="title_image"><img src="images/relaince-logo.png"></img></div></div>');
    $m.pageTitleLeftButton('<div class="left_heading"><div class="header_left"><img src="images/arrow-left2.png"></div><div class="seperator"></div><div style="text-align:left" class="page_name">&nbsp '+hName+'</div></div>');
    $m.pageTitleRightButton('<div class="icons"><div class="icon plus"><img class="plusimg" src="images/add.png" onclick="openplus(event)"/></div><div class="icon icon1"><div class="notif1"><div class="pAlert"><div class="count alert" onClick="onNotificationsClick()"></div><img src="images/Notifications.png"/></div></div></div><div class="icon icon2"><img src="images/more.png" onclick="openMenu(event)"/></div></div>');
});

function initReady(){
	$m.juci.dataset("headerName","CFR Notifications");
	$m.juci.findById("alert-count").hide();
	juci.findById("cfr-count").hide();
	juci.findById("app-count").hide();
	currentView = juci.findById("today");
	currentView1 = juci.findById("notifications-app");
	$m.juci.getControl("pending").addListItemClick(call, this, ".call");
	$m.juci.getControl("pending").addListItemClick(email, this, ".email");
	$m.juci.getControl("pending").addListItemClick(sms, this, ".sms");
	currentView1 = juci.findById("notifications-app");
	SecondView = juci.findById("thisWeek");
	ThirdView = juci.findById("all");
	currentView.hide();
	currentView1.hide();
	ThirdView.hide();
	if(gettype()==='AGSM' || gettype()==='AGPS' || gettype()==='BM'){
		$m.juci.dataset("superView",true);
		$m.juci.dataset("supertrack",true);
		SecondView.hide();
		$m.juci.findById("renewal-count").hide();
	}else{
		$m.juci.dataset("superView",false);
		$m.juci.dataset("supertrack",false);
		SecondView.show();
		$m.juci.findById("renewal-count").show();
	}
}

$m.onData(function(eventObject){
	var data = eventObject.data;
	initData();
});

function initData(data){
	var dbcallback = function(dbhelper) {
		dbHelper = dbhelper;
		getNotificationsList();
	}
	utils.GetDbhelper(dbcallback);
}

// Fetching server data in to local db
function getNotificationsList(){
	superTrackDetailList = [];
	if(gettype()==='AGSM' || gettype()==='AGPS' || gettype()==='BM'){
		$m.juci.dataset("superView",true);
		$m.juci.dataset("supertrack",true);
		SecondView.hide();
		$m.juci.findById("renewal-count").hide();
	}else{
		$m.juci.dataset("superView",false);
		$m.juci.dataset("supertrack",false);
		SecondView.show();
		$m.juci.findById("renewal-count").show();
	}
	if(dbHelper) {
		if($m.networkConnected()){
			$m.showProgress("Fetching Data...");
			service = new ServiceLibrary();
			var serviceCallBack =  function(res){
				var finalArr = [];
				if((res.ApplicationNotifications == null || res.ApplicationNotifications == 0) && (res.CfrNotifications == null || res.CfrNotifications == 0) && (res.CfrNotifications == null || res.CfrNotifications == 0)){
					$m.hideProgress();
				}else{
					for(var i=0;i<res.ApplicationNotifications.length;i++){
						applicationsArr.push(res.ApplicationNotifications[i]);
					}
					for(var k=0;k<res.CfrNotifications.length;k++){
						cfrArr.push(res.CfrNotifications[k].ApplicantData);	
					}
					for(var d=0;d<res.CfrNotifications.length;d++){
						cfrDetailsList.push(res.CfrNotifications[d].CfrDetailsList);
					}
					for(var q=0;q<cfrDetailsList.length;q++){
						for(l=0;l<cfrDetailsList[q].length;l++){
							finalCfrDetailList.push(cfrDetailsList[q][l]);	
						}
					}
				}
				/*Sample Data*/
				var superTrackInfo = res.SuperTrackAlerts;
				if(superTrackInfo.length == 0){
					superTrackDetailList = [];
				}else{
					for(var j = 0;j < superTrackInfo.length; j++){
						var responseInfo = superTrackInfo[j];
						responseInfo.issync = 0;
						responseInfo.iscompleted = 0;
						superTrackDetailList.push(responseInfo);	
					}
				}
				
				for(var m=0;m<finalCfrDetailList.length;m++){
					if(finalCfrDetailList[m].Source == "UW"){
						finalCfrDetailList[m].UniqueID = finalCfrDetailList[m].RequestID;
					}else{
					finalCfrDetailList[m].UniqueID = finalCfrDetailList[m].ApplicationNumber + finalCfrDetailList[m].CfrCode;
					}
				}
				
				cfrApplicationNotifications.multipleInsert(applicationsArr,function(success_response){
					loadAppNotificationsFromDB();
				},function(failure_response){
					$m.logError("Failed multiple insert in pending documents. Reason - " + JSON.stringify(failure_response));
					$m.alert("Failed while inserting the documents");
				});
				
				PendingApplicationNotifications.multipleInsert(cfrArr,function(success_response){
					PendingCfrNotifications.multipleInsert(finalCfrDetailList,function(success_response){	
						loadAppDocumentsFromDB();
					},function(failure_response){
						$m.logError("Failed multiple insert in pending documents. Reason - " + JSON.stringify(failure_response));
						$m.alert("Failed while inserting the documents");
						loadAppDocumentsFromDB();
					});
				},function(failure_response){
					$m.logError("Failed multiple insert in pending documents. Reason - " + JSON.stringify(failure_response));
					$m.alert("Failed while inserting the documents");
					loadAppDocumentsFromDB();
				});	
				superTrackAlerts.prototype.remove(function(suc){
					superTrackAlerts.multipleReplace(superTrackDetailList,function(success_response){
						loadSuperTrackAlertsFromDB();
					},function(failure_response){
						$m.logError("Failed multiple insert in pending documents. Reason - " + JSON.stringify(failure_response));
						$m.alert("Failed while inserting the documents");
					});
				}, function(fail){
					console.log(fail);
				});
				
				//$m.juci.addDataset("cfrs",obj);
				for(var q=0;q<res.RenewalNotifications.length;q++){
					renewalsArr.push(res.RenewalNotifications[q]);
				}
				for(var a=0;a<res.NewsNotifications.length;a++){
					NewsNotifications.push(res.NewsNotifications[a]);
				}
				for(var b=0;b<res.BirthdayNotifications.length;b++){
					BirthdayNotifications.push(res.BirthdayNotifications[b]);
				}
				for(var c=0;c<res.CheckBounceNotifications.length;c++){
					CheckBounceNotifications.push(res.CheckBounceNotifications[c]);
				}
				var totalalerts = totalAlerts.concat(NewsNotifications,BirthdayNotifications,CheckBounceNotifications);
				cfrAlertNotifications.multipleInsert(totalalerts,function(success_response){
					//TODO
					loadCfrAlertsFromDB();
				},function(failure_response){
					$m.logError("Failed multiple insert in pending documents. Reason - " + JSON.stringify(failure_response));
					$m.alert("Failed while inserting the documents");
				});
				cfrNotifications.multipleInsert(renewalsArr,function(success_response){
					//TODO
					loadDocumentsFromDB();
				},function(failure_response){
					$m.logError("Failed multiple insert in pending documents. Reason - " + JSON.stringify(failure_response));
					$m.alert("Failed while inserting the documents");
				});
			};
			service.GetNotofications(serviceCallBack);
		}else{
			$m.alert("No Internet connection!");
			loadDocumentsFromDB();
			$m.hideProgress();
		}
	}else{
		$m.hideProgress();
		$m.alert("Error while opening database");
	}
}

function loadCfrAlertsFromDB(){
	$m.showProgress("Loading...");
	cfrAlertNotifications.SelectWithFilter(1,function(success_response){
		$m.juci.dataset("alertNews",success_response.rows);
		var alertsCount = $m.juci.dataset("cfrs");
		alertsCount.alerts = success_response.rows.length;
		$m.juci.dataset("cfrs",alertsCount);
		$m.juci.dataset("importantNews",alertsCount.alerts);
		showContent = false;
		//renewals = success_response.rows;
		$m.hideProgress();
		
	},function(failure_response){
		$m.logError("Failed select in cfr documents. Reason - " + JSON.stringify(failure_response));
		$m.alert("Failed while fetching the documents");
	});
	
}

function loadDocumentsFromDB(){
	$m.showProgress("Loading...");
	cfrNotifications.SelectWithFilter(1,function(success_response){
		$m.juci.dataset("renewals",success_response.rows);
		var renewalCount = $m.juci.dataset("cfrs");
		renewalCount.renewals = success_response.rows.length;
		$m.juci.dataset("cfrs",renewalCount);
		showContent = false;
		//renewals = success_response.rows;
		$m.hideProgress();
		
	},function(failure_response){
		$m.logError("Failed select in cfr documents. Reason - " + JSON.stringify(failure_response));
		$m.alert("Failed while fetching the documents");
	});
}

// loading super track data from local db
function loadSuperTrackAlertsFromDB(){
	$m.showProgress("Loading...");
	superTrackAlerts.SelectWithFilter(1,function(success_response){
		$m.juci.dataset("superTrackNotifications",success_response.rows);
		var alertsCount = $m.juci.dataset("cfrs");
		alertsCount.supertrackMainCount = success_response.rows.length;
		$m.juci.dataset("cfrs",alertsCount);
		$m.juci.dataset("superTrackCount",alertsCount.supertrackMainCount);
//		$m.juci.dataset("importantNews",alertsCount.alerts);
		showContent = false;
		//renewals = success_response.rows;
		$m.hideProgress();
		
	},function(failure_response){
		$m.logError("Failed select in cfr documents. Reason - " + JSON.stringify(failure_response));
		$m.alert("Failed while fetching the documents");
	});
	
}

var ftnrarry = [];
var uwarry = [];

// Loading application data from local db
function loadAppDocumentsFromDB(){
	$m.showProgress("Loading...");
	PendingApplicationNotifications.SelectWithFilter(1,function(success_response){
		$m.juci.dataset("applicationNotifications",success_response.rows);
		showContent = false;
		var app_count = $m.juci.dataset("appNotifications").length;
		var cfr_count = $m.juci.dataset("applicationNotifications").length;
		juci.dataset("cfrCount",cfr_count);
		var finalapp_count = app_count + cfr_count;
		var applicationsCount = $m.juci.dataset("cfrs");
		applicationsCount.applications = finalapp_count;
		$m.juci.dataset("cfrs",applicationsCount);
		var alerts = juci.dataset("cfrs");
		var alertsCount = alerts.applications  + alerts.renewals + alerts.alerts;
		if(alertsOldCount == undefined){
			alertsOldCount = alertsCount;	
		}
		if( alertsCount != alertsOldCount){
			var oldCount = alertsCount - alertsOldCount;
			var count = alertsCount = alertsOldCount;
			juci.dataset("AlertsCount",oldCount);
		}
		$m.putPref("alertsCount",oldCount);
		$m.savePref();
		cfrArray = success_response.rows;
		for(var i=0;i<cfrArray.length;i++){
			if(cfrArray[i].CfrSource == "FTNR"){
				ftnrarry.push(cfrArray[i]);
			}else if(cfrArray[i].CfrSource == "UW"){
				uwarry.push(cfrArray[i]);
			}
		}
		$m.juci.dataset("cfrftnr",ftnrarry);
		$m.juci.dataset("cfrUW",uwarry);
		$m.hideProgress();
		
	},function(failure_response){
		$m.logError("Failed select in cfr documents. Reason - " + JSON.stringify(failure_response));
		$m.alert("Failed while fetching the documents");
	});
}

// loading app notifications from local db
function loadAppNotificationsFromDB(){
	$m.showProgress("Loading...");
	cfrApplicationNotifications.SelectWithFilter(1,function(success_response){
		$m.juci.dataset("appNotifications",success_response.rows);
		var count = $m.juci.dataset("appNotifications").length;
		$m.juci.dataset("applicationsCount",count);
		showContent = false;
		//renewals = success_response.rows;
		$m.hideProgress();
		
	},function(failure_response){
		$m.logError("Failed select in cfr documents. Reason - " + JSON.stringify(failure_response));
		$m.alert("Failed while fetching the documents");
	});
}

var AllCfrArray = [];

var notificationsObj = [{
	"CustomerName":"Soham Meshram",
	"ClientID":"BRSMCU023",
	"LoginDate":"01/02/2016",
	"ProductName":"Reliance Increasing Income",
	"Premium":"1000"
}];

var alerts = [{
	"BirthdayToday" :"085:05:19,March 19,2016",
	"ClientName":"Soham Meshram",
	"ClientID":"BRSMCU023",
	"LoginDate":"01/02/2016",
	"PlanName":"Reliance Increasing Income"
}];


var showContent = false;
function showFullLisItem(e){
	if(e.target.el.className == "showing"){
		var	currentindex = e.target.el.id;
		var contentid = "less" + e.index;
		var menuItem = document.getElementById(contentid);
		if(menuItem.style.display === "none"){
			document.getElementById(contentid).style.display = "block";
			document.getElementById(currentindex).innerHTML = "Show less";
		}else{
			document.getElementById(contentid).style.display = "none";
			document.getElementById(currentindex).innerHTML = "Show more";
		}
	}else if(e.target.el.className == " juci_button view"){
			opencfrUpload(e.data);
	}
}

var showContent2=false;
function showlistitemforrenewals(e){
//	$m.putPref("AppNo",e.data.ApplicationNumber);
//	$m.savePref();
	if(e.target.el.className == "vertical"){
		var currentindex = e.target.el.parentElement.id;
		var menuid = "menuBox"+currentindex;
		if(show === true){
			$m.juci.findById(menuid).hide();
			show = false;
		}
		else{
			$m.juci.findById(menuid).show();
			show = true;
		}
	}
	else if(e.target.el.className == "showing"){
		var	currentindex = e.target.el.id;
		var contentid = "lesst" + e.index;
		if(showContent2 === true){
			$m.juci.findById(contentid).hide();	
			juci.findById(currentindex).html("Show more");
			showContent2 = false;
		}else{
			$m.juci.findById(contentid).show();
			juci.findById(currentindex).html("Show less");
			showContent2 = true;
		}
	}else if(e.target.el.className == " juci_button view"){
			openUpload(e.data);
	}
}

var showContent3 = false;
function showlistitemforalerts(e){
//	$m.putPref("AppNo",e.data.ApplicationNumber);
//	$m.savePref();
	if(e.target.el.className == "showing"){
		var	currentindex = e.target.el.id;
		var contentid = "lessu" + e.index;
		if(showContent3 === true){
			$m.juci.findById(contentid).hide();	
			juci.findById(currentindex).html("Show more");
			showContent3 = false;
		}else{
			$m.juci.findById(contentid).show();
			juci.findById(currentindex).html("Show less");
			showContent3 = true;
		}
	}else if(e.target.el.className == " juci_button view"){
			openUpload(e.data);
	}
}

function showMore(e){
	juci.findById("showmore").hide();
	juci.findById("showless").show();
}

function showLess(){
	juci.findById("showless").hide();
	juci.findById("showmore").show();
}

// switch case for toggle bar
var toggleid = 0;
function toggleView(e){
		currentView.hide();
		currentView1.hide();
		SecondView.hide();
		ThirdView.hide();
		toggleid = e.newToggled;
	switch(e.newToggled){
		case 0:
			$m.juci.dataset("superView",true);
			juci.findById("app-count").hide();
			juci.findById("alert-count").hide();
			juci.findById("cfr-count").hide();
			juci.findById("renewal-count").hide();
			$m.juci.dataset("supertrack",true);
			break;
		case 1:
		//	SecondView = juci.findById("thisWeek");
			SecondView.show();
			$m.juci.dataset("superView",false);
			juci.findById("renewal-count").show();
			juci.findById("app-count").hide();
			juci.findById("alert-count").hide();
			$m.juci.dataset("supertrack",false);
			juci.findById("cfr-count").hide();
			break;
		case 2:
		//	ThirdView = juci.findById("all");
			ThirdView.show();
			$m.juci.dataset("superView",false);
			juci.findById("app-count").hide();
			juci.findById("alert-count").show();
			juci.findById("cfr-count").hide();
			$m.juci.dataset("supertrack",false);
			juci.findById("renewal-count").hide();
			break;	
		case 3:
		//	currentView = juci.findById("today");
			currentView.show();
			currentView1.show();
			$m.juci.dataset("superView",false);
			juci.findById("cfr-count").show();
			juci.findById("app-count").show();
			juci.findById("renewal-count").hide();
			juci.findById("alert-count").hide();
			$m.juci.dataset("supertrack",false);
			break;
	} 
}


function opencfrUpload(val){
	var obj = val;
	if(obj.CfrCategory == "Document" || obj.CfrCategory == "Others" || obj.CfrCategory == "BOP"){
		$m.open("Upload Cfr", "/Call For Requirement/cfrupload.html", {"data":obj});
	}else if(obj.CfrCategory == "Medical"){
		$m.open("medical Cfr", "/Call For Requirement/medicalCfr.html", {"data":obj});
	}
	
}

function viewNewsAlerts(e){
	var data = e.data.DownloadUrl;
	$m.openChildBrowser("News Updates",	data, {"navigation": true, "address": [],"patterns": [
		{
			"pattern":"mobilebi/Plan",
			"callback": function(){
				var fname = "";
				var fromRegenerate = false;
				if(match.url.indexOf("&") == -1){
					fname = match.url.substring(match.url.indexOf("fname") + 6, match.url.length);
				}else{
					fname = match.url.substring(match.url.indexOf("fname") + 6, match.url.indexOf("&"));
				}
			}
		}
	]});
}
function onViewAllAppsClick(){
	$m.open("Applications", "/Applications/Application.html");	
}


function viewAllRenewals(){
	$m.open("Renewals", "/Renewals/renewals.html");
}

function onViewAllCfrClick(){
	$m.open("CFR", "/Call For Requirement/cfr.html");
}

function ViewNewsAndUpdates(){
	$m.open("News and Updates", "/News and Updates/NewsUpdates.html");
}

function ViewAllSuperTrack(){
	$m.open("Super Track", "/Input Management/inputManagement.html");
}



//Call , Email ,SMS
function call(e){
	var mobile = e.data.MobileNumber;
	$m.callContact(mobile);
}

function email(e){
	var emailid = e.data.EmailAddress;
	$m.email([emailid], '' , '');
}

function sms(e){
	var sendsms = e.data.MobileNumber;
	$m.sms([sendsms], '');
}

function showlistitem(event,id){
	var	currentindex = event.target;
	var indexId = currentindex.el ; 
	var indexClass = indexId.className;
	 if(indexClass == "showing"){
		var currentId = indexId.id ;
		var contentId = id+event.index;
		if(currDtl){
			document.getElementById(currDtl).style.display = "none";
			document.getElementById(lastindex).innerHTML = "Show more";
			if(currDtlIdx === event.index){
				currDtlIdx = null;
				currDtl = null;
				return;
			}
		}
		currDtlIdx = event.index;
		currDtl	= id + currDtlIdx;
		document.getElementById(currDtl).style.display = "block";
		lastindex = currentId;
		document.getElementById(currentId).innerHTML = "Show less";
	}else if(indexClass == " juci_button view"){
		ViewAllSuperTrack();
	}
}

function onNotificationsAlertClick(){
	$m.open("Notifications", "/Call For Requirement/cfrNotifications.html");
}
