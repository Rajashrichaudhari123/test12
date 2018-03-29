/**
 * sync.js
 * @author CloudPact Technologies
 * @description : This script is used for syncing the local data into the server.
 **/
var defaultItem = {
    "filescount": 0,
    "filesize": 0,
    "syncstate": "sync",
    "syncpercent" : "0%"
};

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};

$m.juci.addDataset("syncDetails", defaultItem);
$m.juci.addDataset("proposalFiles", defaultItem);
$m.juci.addDataset("docFiles", defaultItem);
$m.juci.addDataset("cfrFiles", defaultItem);
$m.juci.addDataset("inputManagement", defaultItem);
$m.juci.addDataset("videoFiles", defaultItem);
$m.juci.addDataset("runnerActivity", defaultItem);
$m.juci.addDataset("synchistory", []);
$m.juci.addDataset("Sales_manager", []);
$m.juci.addDataset("syncTeam","");
$m.juci.addDataset("network",false);
var logincode = "";
var password = "";
var credentials = "";
var deviceInfoObj = {};
var ERROR_500 = "Unexpected Error - Service issue, please try later";
var ERROR_0 = "Could not reach to server - please check internet connection speed.";
var ERROR_3 = "Unexpected server response.Please try later";
var ERROR_DB = "Error while reading data from local database";
var ERROR_SYNC_FAILED = "Sync failed";


var requestCounter = 0,
    tablecount = 0,
    altercount = 0;
var syncStatusFlag;
var count = 8;
var Tables = {
    "PdcCustomerDetails": "Personal Details",
    "PdcExistingPolicies": "Policies Details",
    "PdcFamilyHistory": "Family History",
    "LifeStyleDetails": "LifeStyle Details",
    "PaymentDetails": "Payment Details",
    "PlanDetails": "Plan Details",
    "ImageDetails": "Pending Documents",
    "CFRDetails": "Pending CFR",
    "cfrNotifications":"cfrNotifications",
    "CfrApplicationNotifications":"CfrApplicationNotifications",
    "cfrAlertNotifications":"cfrAlertNotifications",
    "PendingApplicationNotifications":"PendingApplicationNotifications",
    "PendingCfrNotifications":"PendingCfrNotifications",
    "AttendanceEmpDailyAtt":"AttendanceEmpDailyAtt",
    "superTrackAlerts":"superTrackAlerts",
    "shTpdData":"shTpdData",
    "saveNewLead":"saveNewLead",
    "saveActivityPlanning":"saveActivityPlanning",
    "saveActivityResult":"saveActivityResult",
    "inputPojo":"inputPojo",
    "PDCVideoDetails":"Pdc Video Details",
    "ExpertCallDetails":"Expert Call Details",
    "RunnerActivity":"RunnerActivity",
    "saveRunnerActivity":"saveRunnerActivity",
     "LeadInfoAppointment":"LeadInfoAppointment",
     "bmExceptionReport":"bmExceptionReport",
     "saveBMReport":"saveBMReport",
     "getViewDetails":"getViewDetails"
};

var tableNamesArr = [
    Tables.PdcCustomerDetails
];

$m.onReady(function(){
    juci.dataset("headerName","Sync");
    $m.juci.dataset("alertcount", "3");
});

$m.onData(function(eventObject){
    var isAutoSync = eventObject.data;
    if ( isAutoSync == "autosync") {
        $m.juci.getControl("syncallb").disable();
        startSync();
    } else {
        $m.juci.getControl("syncallb").enable();
    }
    var ispartnerBranchDetailsSynced = $m.getPref("partnerBranchDetailsSynced");
        if(!ispartnerBranchDetailsSynced){
            fetchPartnerBranchDetails();
        }
    init();
    logincode = $m.getUserAccount().customProperties.Login_Code;
    password = $m.getUserAccount().customProperties.Login_Pwd;
});

function init() {
    new window.DB(CONSTANTS.DBName, function(dbHelper) {
		window.dbHelper = dbHelper;
		var isTable = $m.getPref("TableCreation");
		if (!isTable) {
			showProgress('Creating tables...');
			createTables();
		}else{
			if(gettype()!=='ADV' && gettype()!=='TPPR' && gettype()!=='TPADV'){
			    showProgress('Fetching Hierarchy data...');
			    syncHierarchy();
			}else if(gettype() == 'TPPR'){
			    showProgress('Fetching Hierarchy data...');
			    syncTpparHierarchy();
			}
			
        }

		$m.juci.getControl("syncallb").enable();
		if(isTable){
		    updateSyncData();
		}
	}); 
	
	var network;
	if(!$m.networkConnected()){     
		$m.logError("Sync failed: No internet connection");
		network = document.getElementById("networkconnection");
		network.setAttribute('class','networkConnection');
		$m.juci.findById("network_connection").show();
		return;
	}else{
		network = document.getElementById("networkconnection");
		$m.juci.findById("network_connection").hide();
		network.removeAttribute("class")
	}
}

function updateSyncData() {
    
    changeSyncState("cfrFiles", "sync");
    changeSyncState("proposalFiles", "sync");
    changeSyncState("docFiles", "sync");
    changeSyncState("inputManagement", "sync");
    changeSyncState("videoFiles", "sync");
    changeSyncState("runnerActivity", "sync");
    var syncDataCallback = function(syncdata) {
        var totalFiles = 0;
        var totalSize = 0;
        var proposalData =  syncdata.proposalData;
        var noofproposals = proposalData.length;
        var proposalsSize = syncdata.proposalData.length ? JSON.stringify(syncdata.proposalData).length : 0;
        setCountSize("proposalFiles", noofproposals, proposalsSize);
        
        var totalDocuments = 0;
        var documentsSize = 0;
        var documentData = syncdata.documentData;
        for(var i=0;i<documentData.length;i++){
            if(documentData[i]["Data"]){
                totalDocuments += documentData[i]["Data_Count"];
                documentsSize += documentData[i]["Data"].length ? JSON.stringify(documentData[i]["Data"]).length : 0;   
            }
        }
        setCountSize("docFiles", totalDocuments, documentsSize);
        
        var totalCFRS = 0;
        var CFRSSize = 0;
        var CFRData = syncdata.cfrData;
        for(var i=0;i<CFRData.length;i++){
            if(CFRData[i]["Data"]){
                totalCFRS += CFRData[i]["Data_Count"];
                CFRSSize += JSON.stringify(CFRData[i]["Data"]).length;  
            }
        }
        setCountSize("cfrFiles", totalCFRS, CFRSSize);
        
        var totalIMS = 0;
        var IMSSize = 0;
        var IMData = syncdata.imData;
        totalIMS = IMData.length ? IMData.length : 0;
        var IMSSize = IMData.length ? JSON.stringify(IMData).length : 0;
        setCountSize("inputManagement", totalIMS, IMSSize);
        
        var totalRecords = noofproposals + totalDocuments + totalCFRS + totalIMS;
        var totalSize = proposalsSize + documentsSize + CFRSSize + IMSSize;
    
        setCountSize("syncDetails", totalRecords, totalSize);
        
        var totalVideos = 0;
        var videosSize = 0;
        var count = 0;
        var videoData = syncdata.videoData;
        for(var i=0;i<videoData.length;i++){
            for(var j=0;j<videoData[i].Data.length;j++){
                var videoCount = videoData[i].Data;
                if(videoCount[j].Personal_Video_Path){
                    count = count+1;
                }
                if(videoCount[j].Selfi_Video_Path){
                    count = count+1;
                }
            }
        }
        totalVideos = count;
        var videoSize = videoData.length ? JSON.stringify(videoData).length : 0;
        
        setCountSize("videoFiles",totalVideos, videoSize);
        
        var totalRunnerActivites = 0;
        var RunnerActivitySize = 0;
        var runnerActivityData = syncdata.runnerActivityData;
        totalRunnerActivites = runnerActivityData.length ? runnerActivityData.length : 0;
        var RunnerActivitySize = runnerActivityData.length ? JSON.stringify(runnerActivityData).length : 0;
        var data = juci.dataset("runnerActivity");
        if(data.syncstate == "sync" && data.syncpercent == "100%") {
            totalRunnerActivites = 0;
            RunnerActivitySize = 0;
        }
        
        setCountSize("runnerActivity",totalRunnerActivites, RunnerActivitySize);
    };
    getSyncData(syncDataCallback);
}

function getSyncData(callback) {
    var syncData = {

    };
    
    var syncRunnerActivityCallback = function(runnerActivityData) {
        syncData.runnerActivityData = runnerActivityData;
        callback(syncData);
    }
    
    var syncVideoCallback = function(videoData) {
        syncData.videoData = videoData;
        syncAllRunnerActivites(false, syncRunnerActivityCallback);
        //callback(syncData);
    }
    
    var syncIMCallback = function(imData) {
        SyncAllVideos(false, syncVideoCallback);
        syncData.imData = imData;
        //callback(syncData);
    }

    var syncCFRCallback = function(cfrData) {
        SyncAllIMs(false, syncIMCallback);
        syncData.cfrData = cfrData;
        //callback(syncData);
    }
    
    var syncDocumentCallback = function(documentData) {
        SyncAllCFRS(false, syncCFRCallback);
        syncData.documentData = documentData;
    }

    var syncProposalCallback = function(proposalData) {
        SyncAllDocuments(false, syncDocumentCallback);
        if(proposalData === -1){
            proposalData = [];
        }
        syncData.proposalData = proposalData;
    }
    
    
    SyncAllProposals(false, syncProposalCallback);
}

// TODO : make the sync process for table creation

function createTables() {
    PDC_Customer_Details.createTable(create_table_success, create_table_failure);
    PDC_FAMILYHISTORY_Details.createTable(create_table_success, create_table_failure);
    PDC_EXISITINGPOLICIES_Details.createTable(create_table_success, create_table_failure);
    PDC_LifeStyle_Details.createTable(create_table_success, create_table_failure);
    PDC_Payment_Details.createTable(create_table_success, create_table_failure);
    PDC_Plan_Details.createTable(create_table_success, create_table_failure);
    PDC_Image_Details.createTable(create_table_success, create_table_failure);
    PDC_Cfr_Details.createTable(create_table_success, create_table_failure);
    PendingCfr.createTable(create_table_success, create_table_failure);
    PendingCfrDetail.createTable(create_table_success, create_table_failure);
    SHData.createTable(create_table_success,create_table_failure);
    cfrNotifications.createTable(create_table_success,create_table_failure);
    cfrApplicationNotifications.createTable(create_table_success,create_table_failure);
    cfrAlertNotifications.createTable(create_table_success,create_table_failure);
    PendingApplicationNotifications.createTable(create_table_success,create_table_failure);
    PendingCfrNotifications.createTable(create_table_success,create_table_failure);
    Attendance_Emp_DailyAtt.createTable(create_table_success,create_table_failure);
    shTpdData.createTable(create_table_success,create_table_failure);
    saveNewLead.createTable(create_table_success,create_table_failure);
    saveActivityPlanning.createTable(create_table_success,create_table_failure);
    saveActivityResult.createTable(create_table_success,create_table_failure);
    Customer_Aadhar_Details.createTable(create_table_success,create_table_failure);
    PDC_Video_Details.createTable(create_table_success,create_table_failure);
    inputPojo.createTable(create_table_success,create_table_failure);
    Expert_To_Call.createTable(create_table_success,create_table_failure);
    superTrackAlerts.createTable(create_table_success,create_table_failure);
    Runner_Activity.createTable(create_table_success,create_table_failure);
    saveRunnerActivity.createTable(create_table_success,create_table_failure);
    LeadInfoAppointment.createTable(create_table_success,create_table_failure);
    saveLPCDetails.createTable(create_table_success,create_table_failure);
    saveCandidateDetails.createTable(create_table_success,create_table_failure);
    saveViewDetails.createTable(create_table_success,create_table_failure);
    bmExceptionReport.createTable(create_table_success,create_table_failure);
}

function create_table_success(res) {
    //$m.logInfo("Table created successfully");
    tablecount = tablecount + 1;
    if (tablecount === 32) {
        $m.putPref("TableCreation", true);
        $m.putPref("com.cloudpact.rel.alterUpdate", 1);
        $m.savePref();
        $m.putPref("alterScriptnew1",true);
        $m.savePref();
       // $m.toast("Tables created successfully!");
		if(gettype()!=='ADV' && gettype()!=='TPPR' && gettype()!=='TPADV'){
            showProgress('Fetching Hierarchy data...');
            syncHierarchy();
        }else if(gettype() == 'TPPR'){
            showProgress('Fetching Hierarchy data...');
            syncTpparHierarchy();
        }
		// Fetch TPA data only if use type is RRB
    }
}

function create_table_failure(res) {
   errorResponse(ERROR_SYNC_FAILED,res,'create_table_failure');
}

function updateList() {
    var temp = {};
    var list = [];
    for (var i = 0; i < tableNamesArr.length; i++) {
        temp = {};
        temp.name = tableNamesArr[i];
        temp.status = "Ready";
        temp.totalrecs = 0;
        temp.timeremaining = "Not started";
        temp.lastinstime = new Date().getTime();
        list.push(temp);
    }
}

var checkingNetworkSpeedCallback = function(res){
    utils.HideProgress();
    resumeSync();
};

var message = "Your Network bandwidth is below 256 KBPS.It will take some time to sync the data.Do you want to Proceed?";
utils.CheckingNetworkSpeed(message,checkingNetworkSpeedCallback);

function startSync() {
    if($m.networkConnected()){
        utils.ShowProgress("Checking your network bandwidth please wait...");
        utils.NetworkUtils();
    }else{
        $m.alert("No Internet Connection,Please again later");
    }
}

function resumeSync(){
    $m.juci.getControl("syncallb").disable(); 
    var syncRunnerActivityCallback = function(syncStatus) {
        changeSyncState("runnerActivity", "synced");
        if(syncStatusFlag == "success"){
            $m.alert("Sync Complete!","",function(){
                new window.DB(CONSTANTS.DBName, function(dbHelper) {
                    window.dbHelper = dbHelper;
                    $m.juci.getControl("syncallb").enable();
                    updateSyncData();    
                    $m.open("com.cloudpact.mowbly.home", "/system/home.html", null);
                });
            }); 
        } else if(syncStatusFlag == "failure"){
            $m.alert("Sync Failed!","",function(){
                new window.DB(CONSTANTS.DBName, function(dbHelper) {
                    window.dbHelper = dbHelper;
                    $m.juci.getControl("syncallb").enable();
                    updateSyncData();           
                });
            }); 
        } else {
            $m.alert("Sync Complete!","",function(){
                new window.DB(CONSTANTS.DBName, function(dbHelper) {
                    window.dbHelper = dbHelper;
                    $m.juci.getControl("syncallb").enable();
                    updateSyncData();   
                    $m.open("com.cloudpact.mowbly.home", "/system/home.html", null);
                });
            }); 
        }
    };
    
    var syncVideosCallback = function(syncStatus){
        syncRunnerActivity(syncRunnerActivityCallback);
        changeSyncState("videoFiles", "synced");
    };
    
    var syncIMCallback = function(syncStatus) {
        syncVideos(syncVideosCallback);
        changeSyncState("inputManagement", "synced");
    }
    
    var syncCFRCallback = function(syncStatus){
        changeSyncState("cfrFiles", "synced");
        syncIMs(syncIMCallback);
    }

    var syncDocumentCallback = function(syncStatus) {
        changeSyncState("docFiles", "synced");
        syncCFRs(syncCFRCallback);

    }

    var syncProposalCallback = function(syncStatus) {
        changeSyncState("proposalFiles", "synced");
        syncDocuments(syncDocumentCallback);

    }
    syncProposals(syncProposalCallback);
}


//Proposal Syc
var syncProposalInProgress = false;

function syncProposals(proposalsynccallback) {
    syncProposalInProgress = true;
    changeSyncState("proposalFiles", "stop");
    setSyncPercent("proposalFiles", 0);
    var syncProposalCallback = function(syncStatus) {
        syncProposalInProgress = false;
        if(syncStatus != "Y" && syncStatus != "-1"){
			//$m.juci.findById("syncallb").show();
			$m.juci.getControl("syncallb").enable();
			$m.alert("Sync Failed!");
			return;
        }
        changeSyncState("proposalFiles", "synced");
        setSyncPercent("proposalFiles","100");
        if(proposalsynccallback){
			proposalsynccallback(syncStatus);   
        }
    }
    SyncAllProposals(true, syncProposalCallback);
}

function stopProposalSync() {
    syncProposalInProgress = false;
    changeSyncState("proposalFiles", "sync");
}

//Documents Sync

var syncDocumentsInProgress = false;

function syncDocuments(documentssynccallback) {
    syncDocumentsInProgress = true;
    changeSyncState("docFiles", "stop");
    var syncDocumentsCallback = function(syncStatus) {
        syncDocumentsInProgress = false;
        if(syncStatus != "Y" && syncStatus != "-1"){
			$m.juci.getControl("syncallb").enable();
			$m.alert("Sync Failed!");
			return;
        }
        //var imagePDCDetails = $m.getPref("imagePDCDetails");
        changeSyncState("docFiles", "synced");
        setSyncPercent("docFiles","100");
        if(documentssynccallback){
			documentssynccallback(syncStatus);  
        }
    }
    SyncAllDocuments(true, syncDocumentsCallback);
}

function stopDocumentSync() {
    syncProposalInProgress = false;
    changeSyncState("docFiles", "sync");
}

// CFR Sync

var syncCFRsInProgress = false;

function syncCFRs(cfrsynccallback) {
    syncCFRsInProgress = true;
    changeSyncState("cfrFiles", "stop");
    var syncCFRsCallback = function(syncStatus) {
        syncCFRsInProgress = false;
        if(syncStatus != "Y" && syncStatus != "-1"){
			$m.juci.getControl("syncallb").enable();
			$m.alert("Sync Failed!");
			return;
        }
        changeSyncState("cfrFiles", "synced");
        setSyncPercent("cfrFiles","100");
        if(cfrsynccallback){
            cfrsynccallback(syncStatus);    
        }
    }
    SyncAllCFRS(true, syncCFRsCallback);
}

function stopCFRSync() {
    syncProposalInProgress = false;
    changeSyncState("cfrFiles", "sync");
}

// Videos Sync

function syncVideos(videossynccallback) {
    syncVideoInProgress = true;
    changeSyncState("videoFiles", "stop");
    var syncVideosCallback = function(syncStatus) {
        syncVideoInProgress = false;
        if(syncStatus != "Y" && syncStatus != "-1"){
			$m.juci.getControl("syncallb").enable();
			$m.alert("Sync Failed!");
			return;
        }
        //var imagePDCDetails = $m.getPref("imagePDCDetails");
        changeSyncState("videoFiles", "synced");
        setSyncPercent("videoFiles","100");
        if(videossynccallback){
			videossynccallback(syncStatus); 
        }
    }
    SyncAllVideos(true, syncVideosCallback);
}

function stopVideosSync() {
    syncProposalInProgress = false;
    changeSyncState("videoFiles", "sync");
}

function syncRunnerActivity(runnerActivitysynccallback) {
    syncRunnerActivityInProgress = true;
    changeSyncState("videoFiles", "stop");
    var syncRunnerActivityCallback = function(syncStatus) {
        syncRunnerActivityInProgress = false;
        if(syncStatus != "Y" && syncStatus != "-1"){
			$m.juci.getControl("syncallb").enable();
			$m.alert("Sync Failed!");
			return;
        }
        //var imagePDCDetails = $m.getPref("imagePDCDetails");
        changeSyncState("runnerActivity", "synced");
        setSyncPercent("runnerActivity","100");
        if(runnerActivitysynccallback){
			runnerActivitysynccallback(syncStatus); 
        }
    }
    syncAllRunnerActivites(true, syncRunnerActivityCallback);
}

function stopRunnerActivitySync() {
    syncRunnerActivityInProgress = false;
    changeSyncState("runnerActivity", "sync");
}

function syncIMs(imsynccallback) {
    syncIMsInProgress = true;
    changeSyncState("inputManagement", "stop");
    var syncIMsCallback = function(syncStatus) {
        syncIMsInProgress = false;
        if(syncStatus != "Y" && syncStatus != "-1"){
			$m.juci.getControl("syncallb").enable();
			$m.alert("Sync Failed!");
			return;
        }
        changeSyncState("inputManagement", "synced");
        setSyncPercent("inputManagement","100");
        if(imsynccallback){
			imsynccallback(syncStatus); 
        }
    }
    SyncAllIMs(true, syncIMsCallback);
}

function stopIMSync() {
    syncIMsInProgress = false;
    changeSyncState("inputManagement", "sync");
}


function changeSyncState(dataset, syncstate) {
    var datasetObj = $m.juci.dataset(dataset);
    datasetObj.syncstate = syncstate;
    if(dataset == "runnerActivity" && syncstate == "sync"){
		datasetObj.filesize = 0;
		datasetObj.filescount = 0;
    }
    $m.juci.dataset(dataset, datasetObj);
}



/* Sync Start */
var totalProposals;
var totalVideos;
function SyncAllProposals(doSync, callback) {
    var CustomerDetailsSuccess = function(response) {
        var customerDetails = response;
        var allProposalsCallback = function(allProposalsData) {
			totalProposals = allProposalsData;
            var syncAllProposalsData = function(syncStatus) {
                allProposalsData.shift();
                if (syncStatus === "Y" && syncProposalInProgress && allProposalsData.length) {
                    syncProposal(allProposalsData[0], syncAllProposalsData);
                } else {
                    callback(syncStatus);
                }
            };
            if (doSync) {
                syncProposal(allProposalsData[0], syncAllProposalsData);
            } else {
                callback(allProposalsData);
            }
        };
        if (customerDetails.length) {
            readAllProposals(customerDetails, allProposalsCallback);
        } else {
			setSyncPercent("proposalFiles",0);
            callback(-1);
        }
    };

    var CustomerDetailsFailure = function(response) {

    };
    PDC_Customer_Details.selectUnsyncedData(CustomerDetailsSuccess, CustomerDetailsFailure);
}


function SyncAllDocuments(doSync, callback) {
    var DocumentDetailsSuccess = function(response) {
        var customerDetails = response;
        var allDocumentCallback = function(allDocumentData) {
            var syncAllDocumentData = function(syncStatus) {
                allDocumentData.shift();
                if (allDocumentData.length) {
                    syncDocumentDetails(allDocumentData[0], syncAllDocumentData);
                } else {
                    callback(syncStatus);
                }
            };
            if (doSync) {
                syncDocumentDetails(allDocumentData[0], syncAllDocumentData);
            } else {
                callback(allDocumentData);
            }
        };
        if (customerDetails.length) {
            readAllDocuments(customerDetails, allDocumentCallback);
        } else {
            callback(-1);
        }

    };

    var DocumentDetailsFailure = function(response) {

    };
    PDC_Image_Details.SelectSyncAppno_DOC(DocumentDetailsSuccess, DocumentDetailsFailure);
}

function SyncAllCFRS(doSync, callback) {
    var CFRDetailsSuccess = function(response) {
        var customerDetails = response;
        var allCFRCallback = function(allCFRData) {
            totalCFRS = allCFRData;
            var syncAllCFRData = function(syncStatus) {
                allCFRData.shift();
                if (allCFRData.length) {
                    syncCFRDocumentDetails(allCFRData[0], syncAllCFRData);
                } else {
                    callback(syncStatus);
                }
            };
            if (doSync) {
                syncCFRDocumentDetails(allCFRData[0], syncAllCFRData);
            } else {
                callback(allCFRData);
            }
        };
        if (customerDetails.length) {
            readAllCFR(customerDetails, allCFRCallback);
        } else {
            callback(-1);
        }
    };

    var CFRDetailsFailure = function(response) {

    };
    PDC_Image_Details.SelectSyncAppno_CFR(CFRDetailsSuccess, CFRDetailsFailure);
}

function SyncAllIMs(doSync, callback) {
    var imData = [];
    var IMDetailsSuccess = function(response) {
        for(var i=0; i<response.length; i++){
            imData.push(response[i]);
        }
        var IMDetails = imData;
        var allIMsCallback = function(allIMsData) {
            totalIMs = allIMsData;
            var syncAllIMsData = function(syncStatus) {
                allIMsData.shift();
                if (syncStatus === "Y" && syncIMsInProgress && allIMsData.length) {
                    syncIMData(allIMsData[0], syncAllIMsData);
                } else {
                    callback(syncStatus);
                }
            };
            if (doSync) {
                syncIMData(allIMsData[0], syncAllIMsData);
            } else {
                callback(allIMsData);
            }
        };
        if (IMDetails.length) {
            readAllIMs(IMDetails, allIMsCallback);
        } else {
            setSyncPercent("inputManagement",0);
            callback(-1);
        }
    };

    var IMDetailsFailure = function(response) {

    };
    saveNewLead.selectUnsyncedData(function(suc){
        for(var i=0; i<suc.length; i++){
            imData.push(suc[i]);
        }
        saveActivityPlanning.selectUnsyncedData(function(suc){
            for(var i=0; i<suc.length; i++){
                imData.push(suc[i]);
            }
            saveActivityResult.selectUnsyncedData(IMDetailsSuccess, IMDetailsFailure);
        }, function(fail){
            $m.logDebug("Failed to Retrieve Data");
        });
    }, function(fail){
        $m.logDebug("Failed to Retrieve Data");
    });
}


function SyncAllVideos(doSync, callback){
    var VideoDetailsSuccess = function(response) {
        var videoDetails = response;
        var allVideosCallback = function(allVideosData) {
            totalVideos = allVideosData;
            var syncAllVideosData = function(syncStatus) {
                allVideosData.shift();
                if (allVideosData.length) {
                    syncVideoDetails(allVideosData, syncAllVideosData);
                } else {
                    callback(syncStatus);
                }
            };
            if (doSync) {
                syncVideoDetails(allVideosData, syncAllVideosData);
            } else {
                callback(allVideosData);
            }
        };
        if (videoDetails.length) {
            readAllVideos(videoDetails, allVideosCallback);
        } else {
            setSyncPercent("videoFiles",0);
            callback(-1);
        }
    };

    var VideoDetailsFailure = function(response) {
    
    };
    PDC_Video_Details.selectUnsyncedData(VideoDetailsSuccess, VideoDetailsFailure);
}

function syncAllRunnerActivites(doSync, callback) {
    var RunnerActivitySuccess = function(response) {
        var runnerActivityDetails = response;
        var allRunnerActivityCallback = function(allRunnerActivityData) {
            totalRunnerActivities = allRunnerActivityData;
            var syncAllRunnerActivityData = function(syncStatus) {
                allRunnerActivityData.shift();
                if (allRunnerActivityData.length) {
                    syncRunnerActivityDetails(allRunnerActivityData, syncAllRunnerActivityData);
                } else {
                    callback(syncStatus);
                }
            };
            if (doSync) {
                syncRunnerActivityDetails(allRunnerActivityData, syncAllRunnerActivityData);
            } else {
                callback(allRunnerActivityData);
            }
        };
        if (runnerActivityDetails.length) {
            readAllRunnerActivities(runnerActivityDetails, allRunnerActivityCallback);
        } else {
            setSyncPercent("runnerActivity",0);
            callback(-1);
        }
    };

    var RunnerActivityFailure = function(response) {
        $m.logError("RunnerActivity Failed due to"+response);
    };
    saveRunnerActivity.selectUnsyncedData(RunnerActivitySuccess, RunnerActivityFailure);
}

/* Read Data */

function readAllProposals(applications, callback) {
    var finalSyncData = [];
    var getSyncDataCallback = function(appno, propData) {
        finalSyncData.push(propData);
        applications.shift();
        if (applications.length) {
            readProposals(applications[0].Application_Number, getSyncDataCallback)
        } else {
            for(var i=0;i<finalSyncData.length;i++){
                finalSyncData[i]["record"] = i + 1;
            }
            callback(finalSyncData);
        }
    }
    readProposals(applications[0].Application_Number, getSyncDataCallback)
}

function readProposals(appno, callback) {
    var syncData = {};
    var finalSyncData = {};

    var CustomerDetailsSuccess = function(response) {
        var customerDetails = response;
        syncData.customerDetails = customerDetails;
        PDC_LifeStyle_Details.selectDataToSync(appno,LifeStyleDetailsSuccess, LifeStyleDetailsFail);
    };

    var CustomerDetailsFailure = function(response) {

    };

    var LifeStyleDetailsSuccess = function(response) {
        var lifeStyleDetails = response;
        syncData.lifeStyleDetails = lifeStyleDetails;
        PDC_FAMILYHISTORY_Details.selectDataToSync(appno,FamilyHistorySuccess, FamilyHistoryFailure);
    };

    var LifeStyleDetailsFail = function(response) {

    };

    var FamilyHistorySuccess = function(response) {
        var familyHistoryDetails = response;
        syncData.familyHistoryDetails = familyHistoryDetails;
        PDC_EXISITINGPOLICIES_Details.selectDataToSync(appno,ExistingPolicySuccess, ExistingPolicyFailure);
    };

    var FamilyHistoryFailure = function(response) {

    };


    var ExistingPolicySuccess = function(response) {
        var existingPolicyDetails = response;
        syncData.existingPolicyDetails = existingPolicyDetails;
        PDC_Plan_Details.selectDataToSync(appno,PlanDetailsSuccess, PlanDetailsFailure);
    };

    var ExistingPolicyFailure = function(response) {

    };

    var PlanDetailsSuccess = function(response) {
        var planDetails = response;
        syncData.planDetails = planDetails;
        PDC_Payment_Details.selectDataToSync(appno,PaymentDetailsSuccess, PaymentDetailsFailure);

    };

    var PlanDetailsFailure = function(response) {

    };

    var PaymentDetailsSuccess = function(response) {
        var paymentDetailsDetails = response;
        syncData.paymentDetails = paymentDetailsDetails;
        var checkLaAadhar = syncData.customerDetails[0].LA_EKYC_Aadhar_YN;
        var checkPrAadhar = syncData.customerDetails[0].PR_EKYC_Aadhar_YN; 
        if($m.getPref("aadharLA_value_"+appno) == true){
            var aadharLaResult = $m.getPref("Aadhar_resultLA_"+appno);
            var getLaAadhar = checkLaAadhar == "Y" ? aadharLaResult  : "";
        
        }else{
             getLaAadhar = "";
        
        }
         if($m.getPref("aadharPR_value_"+appno) == true){
            var aadharPrResult = $m.getPref("Aadhar_resultPR_"+appno);
            var getPrAadhar = checkPrAadhar == "Y"? checkPrAadhar : "";
        }else{
             getPrAadhar = "";
        }
        finalSyncData = {
            "PDC_Customer_Details": {
                "Application_Number": appno,
                "Data": [syncData.customerDetails[0]],
                "Data_Count": 1,
                "Source_From" : "TAB",
                "Add_Param1" : "",
                "Add_Param2" :syncData.customerDetails[0].Txn_Id ,
                "Add_Param3" : getLaAadhar,
                "Add_Param4" : getPrAadhar
            },
            "PDC_LifeStyle_Details": {
                "Application_Number": appno,
                "Data": [syncData.lifeStyleDetails[0]] ? syncData.lifeStyleDetails : [], 
                "Data_Count": syncData.lifeStyleDetails[0] ? syncData.lifeStyleDetails.length : 1,
                "Source_From" : "TAB",
                "Add_Param1" : "",
                "Add_Param2" :syncData.lifeStyleDetails[0] ?syncData.lifeStyleDetails[0].Txn_Id:"",
                "Add_Param3" : "",
                "Add_Param4" : ""
            },
            "PDC_FAMILYHISTORY_Details": {
                "Application_Number": appno,
                "Data": syncData.familyHistoryDetails[0] ? syncData.familyHistoryDetails : [],
                "Data_Count": syncData.familyHistoryDetails[0] ? syncData.familyHistoryDetails.length : 1,
                "Source_From" : "TAB",
                "Add_Param1" : "",
                "Add_Param2" : syncData.familyHistoryDetails[0] ? JSON.stringify(syncData.familyHistoryDetails[0].Txn_Id):"" ,
                "Add_Param3" : "",
                "Add_Param4" : ""
            },
            "PDC_EXISITINGPOLICIES_Details": {
                "Application_Number": appno,
                "Data": syncData.existingPolicyDetails[0] ? syncData.existingPolicyDetails : [],
                "Data_Count": syncData.existingPolicyDetails[0] ? syncData.existingPolicyDetails.length : 1,
                "Source_From" : "TAB",
                "Add_Param1" : "",
                "Add_Param2" : syncData.existingPolicyDetails[0]?JSON.stringify(syncData.existingPolicyDetails[0].Txn_Id):"",
                "Add_Param3" : "",
                "Add_Param4" : ""
            },
            "Plan_Details_Mowbly": {
                "Application_Number": appno,
                "Data": syncData.planDetails[0] ? syncData.planDetails : [],
                "Data_Count": syncData.planDetails[0] ? syncData.planDetails.length : 1,
                "Source_From" : "TAB",
                "Add_Param1" : "",
                "Add_Param2" : syncData.planDetails[0] ?JSON.stringify(syncData.planDetails[0].Txn_Id):"" ,
                "Add_Param3" : "",
                "Add_Param4" : ""
            },
            "PDC_Payment_Details" : {
                "Application_Number": appno,
                "Data": syncData.paymentDetails[0] ? syncData.paymentDetails : [],
                "Data_Count": syncData.paymentDetails[0] ? syncData.paymentDetails.length : 1,
                "Source_From" : "TAB",
                "Add_Param1" : "",
                "Add_Param2" : syncData.paymentDetails[0]?JSON.stringify(syncData.paymentDetails[0].Txn_Id):"",
                "Add_Param3" : "",
                "Add_Param4" : ""
            }
        }
        callback(appno, finalSyncData);
    };

    var PaymentDetailsFailure = function(response) {

    };

    PDC_Customer_Details.selectDataToSync(appno,CustomerDetailsSuccess, CustomerDetailsFailure);
}

function readAllCFR(applications, callback) {
    var finalSyncData = [];
    var getSyncDataCallback = function(appno, propData) {
        finalSyncData.push(propData);   
        applications.shift();
        if (applications.length) {
            readCFR(applications[0].Application_Number, getSyncDataCallback)
        } else {
            callback(finalSyncData);
        }
    }
    readCFR(applications[0].Application_Number, getSyncDataCallback)
}

function readCFR(appno, callback) {
    var syncData = {};
    var CFRDetailsSuccess = function(response) {
        var cfrDetailsDetails = response;
        syncData = {
            "Application_Number": appno,
            "Data": cfrDetailsDetails,
            "Data_Count": cfrDetailsDetails.length,
            "Source_From" : "TAB",
            "Add_Param1" : "",
            "Add_Param2" : "",
            "Add_Param3" : "",
            "Add_Param4" : ""
            
        }
        callback(appno,syncData);
    };

    var CFRDetailsFailure = function(response) {

    };
    PDC_Image_Details.selectDataToSync_CFR(appno,CFRDetailsSuccess, CFRDetailsFailure);
}

function readAllDocuments(applications, callback) {
    var finalSyncData = [];
    var getSyncDataCallback = function(appno, propData) {
        finalSyncData.push(propData);   
        applications.shift();
        if (applications.length) {
            readDocuments(applications[0].Application_Number, getSyncDataCallback)
        } else {
            callback(finalSyncData);
        }
    }
    readDocuments(applications[0].Application_Number, getSyncDataCallback)
}

function readDocuments(appno, callback) {
    var syncData = {};
    var documentDetailsSuccess = function(response) {
        var documentDetails = response;
        syncData = {
            "Application_Number": appno,
            "Data": documentDetails,
            "Data_Count": documentDetails.length,
            "Source_From" : "TAB",
            "Add_Param1" : "",
            "Add_Param2" : "",
            "Add_Param3" : "",
            "Add_Param4" : ""
        }
        callback(appno, syncData);
    };

    var documentDetailsFailure = function(response) {

    };

    PDC_Image_Details.selectDataToSync_DOC(appno,documentDetailsSuccess, documentDetailsFailure);
}

function readAllIMs(applications, callback) {
    var finalSyncData = [];
    var getSyncDataCallback = function(propData) {
        finalSyncData.push(propData);
        applications.shift();
        if (applications.length) {
            readIMs(getSyncDataCallback)
        } else {
            for(var i=0;i<finalSyncData.length;i++){
                finalSyncData[i]["record"] = i + 1;
            }
            callback(finalSyncData);
        }
    }
    readIMs(getSyncDataCallback)
}

function readAllVideos(applications, callback) {
    var finalSyncData = [];
    var getSyncDataCallback = function(appno, propData) {
        finalSyncData.push(propData);   
        applications.shift();
        if (applications.length) {
            readVideos(applications[0].Application_Number, getSyncDataCallback)
        } else {
            callback(finalSyncData);
        }
    }
    readVideos(applications[0].Application_Number, getSyncDataCallback)
}

function readVideos(appno, callback) {
    var syncData = {};
    var videoDetailsSuccess = function(response) {
        var videoDetails = response;
        syncData = {
            "Application_Number": appno,
            "Data": videoDetails,
            "Data_Count": videoDetails.length
        }
        callback(appno, syncData);
    };

    var videoDetailsFailure = function(response) {

    };

    PDC_Video_Details.selectDataToSync(appno,videoDetailsSuccess, videoDetailsFailure);
}

function readAllRunnerActivities(applications, callback) {
    var finalSyncData = [];
    var getSyncDataCallback = function(appno, propData) {
        finalSyncData.push(propData);   
        applications.shift();
        if (applications.length) {
            readRunnerActivites(applications[0].Policy_Number, getSyncDataCallback)
        } else {
            callback(finalSyncData);
        }
    }
    readRunnerActivites(applications[0].Policy_Number, getSyncDataCallback)
}

function readRunnerActivites(appno, callback) {
    var syncData = {};
    var RunnerActivitySuccess = function(response) {
        var runnerActivityDetails = response;
        syncData = {
            "Application_Number": appno,
            "Data": runnerActivityDetails,
            "Data_Count": runnerActivityDetails.length
        }
        callback(appno, syncData);
    };

    var RunnerActivityFailure = function(response) {
        $m.logError("Runner Activity Failed due to"+response);
    };

    saveRunnerActivity.selectDataToSync(appno,RunnerActivitySuccess, RunnerActivityFailure);
}

function readIMs(callback) {
    var syncData = {};
    var finalSyncData = {};

    var LeadResultsSuccess = function(response) {
        var leadResultDetails = response;
        syncData.leadResultDetails = leadResultDetails;
        saveActivityResult.selectDataToSync(ActivityResultsSuccess, ActivityResultsFail);
    };

    var LeadResultsFailure = function(response) {

    };

    var ActivityResultsSuccess = function(response) {
        var activityResultDetails = response;
        syncData.activityResultDetails = activityResultDetails;
        saveActivityPlanning.selectDataToSync(ActivityPlanningSuccess, ActivityPlanningFailure);
    };

    var ActivityResultsFail = function(response) {

    };

    var ActivityPlanningSuccess = function(response) {
        var activityPlanningDetails = response;
        syncData.activityPlanningDetails = activityPlanningDetails;
        finalSyncData = {
            "saveNewLead": {
                "Data": [syncData.leadResultDetails[0]] ? syncData.leadResultDetails : [],
                "Data_Count": syncData.leadResultDetails[0] ? syncData.leadResultDetails.length : 1,
            },
            "saveActivityResult": {
                "Data": [syncData.activityResultDetails[0]] ? syncData.activityResultDetails : [],
                "Data_Count": syncData.activityResultDetails[0] ? syncData.activityResultDetails.length : 1,
            },
            "saveActivityPlanning": {
                "Data": [syncData.activityPlanningDetails[0]] ? syncData.activityPlanningDetails : [],
                "Data_Count": syncData.activityPlanningDetails[0] ? syncData.activityPlanningDetails.length : 1,
            },
        }
        callback(finalSyncData);
    };

    var ActivityPlanningFailure = function(response) {

    };

    saveNewLead.selectDataToSync(LeadResultsSuccess, LeadResultsFailure);
}


/* Sync Service */

function SyncAllService(syncData, callback) {
    var syncProposalCallback = function(status) {
        if (status != "Y") {
            fp_callback(status);
        } else {
            syncCfr(syncData, syncCFRCallback);
        }
    };

    var syncCFRCallback = function(status) {
        if (status != "Y") {
            fp_callback(status);
        } else {
            syncDocs(syncData, syncDouments);
        }
    };

    var syncDoumentsCallback = function(status) {
        if(status != "Y"){
            fp_callback(status);
        } else {
            syncIMData(syncData, syncDocuments);
        }
    };

    syncProposal(syncData, syncProposalCallback);
}

function syncProposal(syncData, fp_callback) {
    var syncCustomerCallback = function(status, response) {
        setProposalProgress(syncData,1);
        syncLifeStyleDetails(syncData, syncLifeStyleDetailsCallback)
        
    };

    var syncLifeStyleDetailsCallback = function(status) {
        setProposalProgress(syncData,2);
        syncFamilyHistoryData(syncData, syncFamilyHistoryCallback)
        
    }

    var syncFamilyHistoryCallback = function(status) {
        setProposalProgress(syncData,3);
        syncExistingPolicyData(syncData, syncExistingPolicyCallback);        
    };

    var syncExistingPolicyCallback = function(status) {
        setProposalProgress(syncData,4);
        syncPaymentDetalisData(syncData, syncPaymentDetailsCallback);
    };

    var syncPaymentDetailsCallback = function(status) {
        setProposalProgress(syncData,5);
        syncPlanDetails(syncData, syncPlanDetailsCallback)
    };

    var syncPlanDetailsCallback = function(status, response) {
        setProposalProgress(syncData,6);
        
        if(status == 'Y'){
        var filter = new DB.Filter.equal("Application_Number", "'" + syncData["PDC_Customer_Details"].Application_Number + "'");
            var data = {
                "Application_Number" : syncData["PDC_Customer_Details"].Application_Number,
                "issync" : "1"
            }
            PDC_Customer_Details.updateSync(data,filter,function(r){
                fp_callback(status);
            },function(r){
                fp_callback(status);
            });
        }
        
    }

    syncCustomerDetails(syncData, syncCustomerCallback);
}

function getApplicationStatus(applicationNumber){
    
}

function syncCustomerDetails(syncData, callback) {
    service = new ServiceLibrary();
    service.syncCustomerDetailsTable(function(res) {
        if (res.Status == "Y") {
            //$m.logInfo("Customer details inserted successfully");
            updateSyncedRecord(res, function(){
                callback("Y", res);
            });
        } else {
            $m.logError("Failed to insert PDC_Customer_Details response is" + ' ' + res.Status);
            callback("Y", res);
        }
    }, syncData["PDC_Customer_Details"]);
}

function syncLifeStyleDetails(syncData, callback) {
    service = new ServiceLibrary();
    if(syncData["PDC_LifeStyle_Details"]["Data"].length && syncData["PDC_LifeStyle_Details"]["Data_Count"]){
        service.syncLifeStyleDetailsTable(function(res) {
            if (res.Status == "Y") {
                updateSyncedRecord(res, function(){
                    callback("Y", res);
                });
            } else {
                callback("Y", res);
                $m.logError("Failed to insert PDC_LifeStyle_Details response is" + ' ' + res.Status);
            }
        }, syncData["PDC_LifeStyle_Details"]);
    }else{
        callback("Y");  
    }
    
    
    
}

function updateSyncedRecord(res, callback){
    var appfilter = new DB.Filter.equal("Application_Number", "'" + res.Application_Number + "'");
    var data = {
        "issync" : "1"
    }
    if(res.Table_Name === "PDC_Customer_Details"){
        data = {
            "issync" : "0"
        }
    }
    if(res.Table_Name === "Plan_Details_Mowbly"){
        res.Table_Name = "PDC_Plan_Details";
    }
    this[res.Table_Name].updateSync(data, appfilter, function(){
        callback("Y")
    }, function(){
        callback("N");
    })
}

function syncFamilyHistoryData(syncData, callback) {
    service = new ServiceLibrary();
    if(syncData["PDC_FAMILYHISTORY_Details"]["Data"].length && syncData["PDC_FAMILYHISTORY_Details"]["Data_Count"]){
        service.syncFamilyHistoryData(function(res) {
            if (res.Status == "Y") {
                //$m.logInfo("Customer details inserted successfully");
                updateSyncedRecord(res, function(){
                    callback("Y", res);     
                });
            } else {
                $m.logError("Failed to insert PDC_Customer_Details response is" + ' ' + res.Status);
                callback("Y", res);
            }
        }, syncData["PDC_FAMILYHISTORY_Details"]);  
    } else {
        callback("Y");  
    }
}

function syncExistingPolicyData(syncData, callback) {
    service = new ServiceLibrary();
    if(syncData["PDC_EXISITINGPOLICIES_Details"]["Data"].length && syncData["PDC_EXISITINGPOLICIES_Details"]["Data_Count"]){
        service.syncExistingPolicyData(function(res) {
            if (res.Status == "Y") {
                //$m.logInfo("Customer details inserted successfully");
                updateSyncedRecord(res, function(){
                    callback("Y", res);     
                });
            } else {
                $m.logError("Failed to insert PDC_Customer_Details response is" + ' ' + res.Status);
                callback("Y", res);
            }
        }, syncData["PDC_EXISITINGPOLICIES_Details"]);  
    }else{
        callback("Y");  
    }
}

function syncPaymentDetalisData(syncData, callback){
    service = new ServiceLibrary();
    if(syncData["PDC_Payment_Details"]["Data"].length && syncData["PDC_Payment_Details"]["Data_Count"]){
        service.syncPaymentDetailsData(function(res){
            if(res.Status == "Y"){
                //$m.logInfo("payment details inserted successfully");
                updateSyncedRecord(res, function(){
                    callback("Y", res);     
                });
            }else{
                $m.logError("Failed to insert PDC_Payment_Details response is" +' '+res.Status);
                callback("Y", res);
            }
        },syncData["PDC_Payment_Details"]);
    }else{
        callback("Y");
    }
}

function syncPlanDetails(syncData, callback) {
    var service = new ServiceLibrary();
    if(syncData["Plan_Details_Mowbly"]["Data"].length && syncData["Plan_Details_Mowbly"]["Data_Count"]){
        service.syncPlanDetails(function(res) {
            if (res.Status == "Y") {
                $m.logInfo("Plan Details inserted successfully");
                updateSyncedRecord(res, function(){
                    callback("Y", res);
                });
            } else {
                $m.logError("Failed to insert PDC_Plan_Details response is" + ' ' + res.Status);
                callback("Y", res);
            }
        }, syncData["Plan_Details_Mowbly"]);
    }else{
        callback("Y");
    }

}

function syncDocumentDetails(syncData, callback){
    for(var i=0 ;i<syncData.Data_Count;i++){
        syncData.Data[i]["total_Count"] = JSON.stringify(syncData.Data_Count);
        syncData.Data[i]["Txn_Id"] = JSON.stringify(syncData.Data[i].Txn_Id);
    }
    uploadDocuments(syncData.Data,callback);
}

function syncVideoDetails(syncData, callback){
    uploadVideoDocuments(syncData[0].Data, callback);
}

function syncCFRDocumentDetails(syncData, callback){
    uploadCFRDocuments(syncData.Data,callback);
}

function syncRunnerActivityDetails(syncData, callback) {
    uploadRunnerActivityDocuments(syncData,callback)
}


var totalDocuments;
function uploadDocuments(documents, callback){
    totalDocuments = JSON.parse(JSON.stringify(documents));
    var documentUploadCallback = function(response){
        updateDocSyncStatus(documents[0],response, function(){
            documents.shift();
            setDocumentsProgress(documents[0],1);
            if(documents.length){
            	$m.logError("Sync -> Info -> Document Upload File Path" +' '+ JSON.stringify(documents[0].ImagePath));
            	$m.logError("Sync -> Info -> Document type" +' '+ JSON.stringify(documents[0].DocumentTypeCode));
            	$m.fileExists(documents[0].ImagePath, function(response){
					if(response.code == -1) {
						// External storage is not ready. Possible reason could be the storage
						// is mounted to file system on a computer.
						$m.logError("Sync -> Info -> File Status" +' '+ JSON.stringify(response));
						return;
					}
					if(response.result){
						$m.logError("Sync -> Info -> File Status" +' '+ JSON.stringify(response));
					}else {
						$m.logError("Sync -> Info -> File Status" +' '+ JSON.stringify(response));
					}
				});
            	
                uploadDocumentsDetails(documentUploadCallback, documents[0]);   
            }else{
                var VideoDetailsSuccessCallback = function(res){
                    if(res.length == 0){
                        service = new ServiceLibrary();
                        var application = {
                            "Application_Number" : totalDocuments[0].Application_Number
                        };
                        service.GetSyncApplicationStatus(function(status_response){
                            var syncstatus = "1"
                            syncStatusFlag = "success";
                            if(status_response.indexOf("SUCCESS") == -1){
                                syncstatus = "0"
                                syncStatusFlag = "failure";
                            }
                            var filter = new DB.Filter.equal("Application_Number", "'" + totalDocuments[0].Application_Number + "'");
                        
                            var data = {
                                "Application_Number" : totalDocuments[0].Application_Number,
                                "issync" : syncstatus,
                                "DOCS_UPLOADED":"Y"
                            }
                            PDC_Customer_Details.updateSync(data,filter,function(r){
                                callback("Y");
                            },function(r){
                                callback("Y");
                            });
                        }, application);
                    } else {
                        callback("Y");
                    }
                }
                var VideoDetailsFailureCallback = function(res){
                    callback("Y");
                    $m.alert("video details failed --"+res);
                }
                PDC_Video_Details.selectUnsyncedData(VideoDetailsSuccessCallback, VideoDetailsFailureCallback);     
            }
        }, function(){
            $m.alert("Updating data failed!");
        });     
    }
    uploadDocumentsDetails(documentUploadCallback, documents[0]);
}

var totalCFRS;
var totalVideos;
var totalRunnerActivities;


function uploadCFRDocuments(documents, callback){
    totalCFRS = JSON.parse(JSON.stringify(documents));
    var documentUploadCallback = function(response){
        updatecfrDocSyncStatus(documents[0], function(){
            documents.shift();
            setCFRProgress(documents[0],1);
            if(documents.length){
                uploadCFRDocumentsDetails(documentUploadCallback, documents[0]);    
            }else{
                callback("Y");  
            }
        }, function(){
            $m.alert("Updating data failed!");
        });
    }
    uploadCFRDocumentsDetails(documentUploadCallback, documents[0]);
}

function uploadVideoDocuments(documents, callback){
    totalVideos = JSON.parse(JSON.stringify(documents));
    var videosUploadCallback = function(response){
        console.log(response);
//        if(response.result.data == 0){
//            $m.alert("Video details sync failed");
//            return;
//        }
//      var deleteFileCallback = function(res) {
//          if(res.code == 1){
//              $m.logInfo("File deleted successfully")     
//          } 
//      }
//      $m.deleteFileUsingFilePath("",deleteFileCallback);
        setVideosProgress(documents[0],1);
        updateVideoSyncStatus(documents[0], function(){
            documents.shift();
            setVideosProgress(documents[0],1);
            if(documents.length){
                uploadVideoDetails(videosUploadCallback, documents[0].Data);    
            }else{
                service = new ServiceLibrary();
                var application = {
                    "Application_Number" : totalVideos[0].Application_Number
                };
                service.GetSyncApplicationStatus(function(status_response){
                    var syncstatus = "1"
                    syncStatusFlag = "success";
                    if(status_response.indexOf("SUCCESS") == -1){
                        syncstatus = "0"
                        syncStatusFlag = "failure";
                    }
                    var filter = new DB.Filter.equal("Application_Number", "'" + totalVideos[0].Application_Number + "'");
                
                    var data = {
                        "Application_Number" : totalVideos[0].Application_Number,
                        "issync" : syncstatus,
                        "DOCS_UPLOADED":"Y"
                    }
                    PDC_Customer_Details.updateSync(data,filter,function(r){
                        callback("Y");
                    },function(r){
                        callback("Y");
                    });
                }, application);
                //callback("Y");    
            }
        }, function(){
            $m.alert("Updating data failed!");
        });
    }
    uploadVideoDetails(videosUploadCallback, documents[0]);
}


function uploadRunnerActivityDocuments(documents, callback) {
    totalRunnerActivities = JSON.parse(JSON.stringify(documents));
    var runnerActivityUploadCallback = function(response){
        if(response.Status != "Y") {
            syncStatusFlag = "failure"
            $m.alert(" Runner Activity sync Failed due to " + response);
            return;
        }
        syncStatusFlag = "success"
        updateRunnerActivitySyncStatus(documents[0], function(){
            documents.shift();
            setRunnerActivityProgress(documents[0],1);
            if(documents.length){
                uploadRunnerActivites(runnerActivityUploadCallback, documents[0].Data); 
            }else{
                callback("Y");  
            }
        }, function(){
            $m.alert("Updating data failed!");
        });
    }
    uploadRunnerActivites(runnerActivityUploadCallback, documents[0]);
}



function uploadCFRDocumentsDetails(fp_callback,documentDetails){
    var service = new ServiceLibrary();
    service.uploadCFRDocuments(fp_callback,documentDetails);
}

function uploadVideoDetails(fp_callback,documentDetails){
    var service = new ServiceLibrary();
    service.uploadVideoFiles(fp_callback,documentDetails);
}

function uploadDocumentsDetails(fp_callback,documentDetails){
    var service = new ServiceLibrary();
    service.uploadDocuments(fp_callback,documentDetails);
}

function uploadRunnerActivites(fp_callback,documentDetails) {
    var service = new ServiceLibrary();
    service.saveRunnerActivityDetails(fp_callback,documentDetails.Data[0]);
}

function syncCFRDetails(syncData, callback){
    var service = new ServiceLibrary();
    service.syncCFRDetails(function(res){
        if(res.Status == "Y"){
            //$m.logInfo("CFR details inserted successfully");
        }else{
            $m.logError("Failed to insert CFR_Details response is" +' '+ res.Status);
        }
        callback(res.Status);
    },syncData);
}

function syncIMData(syncData, fp_callback) {
    var syncLeadResultCallback = function(status, response) {
        setIMProgress(syncData,1);
        syncActivityResultsDetails(syncData, syncActivityResultsCallback)
    };

    var syncActivityResultsCallback = function(status, response) {
        setIMProgress(syncData,2);
        syncActivityPlanningDetails(syncData, syncActivityPlanningCallback)
    }
    var syncActivityPlanningCallback = function(status, response) {
        setIMProgress(syncData,3);
        fp_callback(status);
    }

    syncLeadResults(syncData, syncLeadResultCallback);
}

function syncLeadResults(syncData, callback) {
    var service = new ServiceLibrary();
    if(syncData["saveNewLead"]["Data"].length && syncData["saveNewLead"]["Data_Count"]){
            var leadcallback = function(res){
                    if (res.Status == "Y") {
                //$m.logInfo("Lead Details inserted successfully");
                var appfilter = new DB.Filter.equal("Sync_Txn_Id", "'" + res.Sync_Txn_Id + "'");
                var data = {
                    "issync" : "1"
                }
                this["saveNewLead"].updateSync(data, appfilter, function(){
                    callback("Y", res);
                });
            } else {
                $m.logError("Failed to insert New Lead response is" + ' ' + res.Status);
                callback("Y", res);
            }
            }
//      fireRequestInput("SaveLead", syncData["saveNewLead"].Data[0], leadcallback);
        service.saveNewLead(leadcallback,syncData["saveNewLead"].Data[0]);
    }else{
        callback("Y");
    }

}

function syncActivityResultsDetails(syncData, callback) {
    var service = new ServiceLibrary();
    if(syncData["saveActivityResult"]["Data"].length && syncData["saveActivityResult"]["Data_Count"]){
    var activitycallback = function(res){
           if (res.Status == "Y") {
                //$m.logInfo("Activity Results inserted successfully");
                var appfilter = new DB.Filter.equal("Sync_Txn_Id", "'" + res.Sync_Txn_Id + "'");
                var data = {
                    "issync" : "1"
                }
                this["saveActivityResult"].updateSync(data, appfilter, function(){
                    callback("Y", res);
                });
            } else {
                $m.logError("Failed to insert Activity Results response is" + ' ' + res.Status);
                callback("Y", res);
            }
          }
//      fireRequestInput("SaveActivity", syncData["saveActivityResult"].Data[0], activitycallback);
        service.syncLeadActivityResultDetails(activitycallback,syncData["saveActivityResult"].Data[0]);
    }else{
        callback("Y");
    }

}

function syncActivityPlanningDetails(syncData, callback) {
    var service = new ServiceLibrary();
    if(syncData["saveActivityPlanning"]["Data"].length && syncData["saveActivityPlanning"]["Data_Count"]){
    var planningCallback = function(res){
            if (res.Status == "Y") {
                //$m.logInfo("Activity Planning inserted successfully");
                var appfilter = new DB.Filter.equal("Sync_Txn_Id", "'" + res.Sync_Txn_Id + "'");
                var data = {
                    "issync" : "1"
                }
                this["saveActivityPlanning"].updateSync(data, appfilter, function(){
                    callback("Y", res);
                });
            } else {
                $m.logError("Failed to insert Activity Planning response is" + ' ' + res.Status);
                callback("Y", res);
            }
    }
//      fireRequestInput("SavePlanning", syncData["saveActivityPlanning"].Data[0], planningCallback);
          service.syncLeadActivityPlanningDetails(planningCallback,syncData["saveActivityPlanning"].Data[0]);

    }else{
        callback("Y");
    }

}

function syncc(syncData, callback) {
    juci.findById("cfrsyncbtn").hide();
    juci.findById("cfrsync").hide();
    juci.findById("cfrcancel").show();
    juci.findByClass("progress_bars")[1].el.style.display = "block";
    juci.findByClass("progress_bars")[1].el.children[0].children[0].style.width = '70%';
    juci.findByClass("progress_bars")[1].el.children[1].innerHTML = "80%";
    service = new ServiceLibrary();
    service.syncCustomerDetailsTable(function(res) {
        if (res.Status == "Y") {
            //$m.logInfo("Customer details inserted successfully");
        } else {
            $m.logError("Failed to insert PDC_Customer_Details response is" + ' ' + res.Status);
        }
        callback(res.Status);
    }, syncData);
}

function cancelCfrSync() {
    juci.findByClass("progress_bars")[1].el.style.display = "none";
    juci.findById("cfrsync").show();
    juci.findById("cfrsyncbtn").show();
    juci.findById("cfrcancel").hide();
}




function cancelPaySync() {
    juci.findByClass("progress_bars")[3].el.style.display = "none";
    juci.findById("paymentsync").show();
    juci.findById("paymentpending").show();
    juci.findById("paymentcancel").hide();
}

function addSize(data) {
    return data + "GB";
}



function setSyncPercent(dataset,percent){
    var datasetObj = $m.juci.dataset(dataset);
    datasetObj.syncpercent = percent + "%";
    $m.juci.dataset(dataset, datasetObj);   
}

function setCountSize(dataset, count, size){
    var datasetObj = $m.juci.dataset(dataset);
    datasetObj.filescount = count;
    datasetObj.filesize = size;
    $m.juci.dataset(dataset, datasetObj);   
}


function fetchTPAList(){
    $m.showProgress("Fetching TPA List...");
    var uname = $m.getUsername();
    
    if ($m.isWeb()) {
    	credentials = Base64.encode("70268271:70268271");	
	} else {
		credentials = Base64.encode(logincode +":" + password);	
	}
    var url = "http://lifelineuat.reliancelife.com/SalesAssist/CFR/wsCFR.svc/FetchTPA/" + uname;
    $m.get(url,{
        "headers": {
            "Content-Type": "application/json",
            "Authorization":"Basic "+ credentials
        }
    }, function(response){
        if(response.code === 200){
            var result = response.result;
            saveTPAList(JSON.stringify(result.data));
            $m.putPref("TPASynced", true);
            $m.savePref();
        } else if (response.code === 0){
            errorResponse(ERROR_0,response,'fetchTPAList');
            $m.putPref("TPASynced", false);
            $m.savePref();
            saveTPAList([]);
        }else {
        	$m.putPref("TPASynced", false);
            $m.savePref();
            errorResponse(ERROR_500,response,'fetchTPAList');
            saveTPAList([]);
        }
    });
}

function saveTPAList(TPAData){
    $m.showProgress("Saving TPA List...");
    var fileObj = $m.file("tpadata.txt",{"level": $m.APP_LEVEL, "storageType": $m.SDCARD});
    $m.writeFile(fileObj, TPAData, function(response){
        if(response.code == -1) {
            errorResponse("Could not store TPA data in file",response,'saveTPAList');
            return;
        }
        if(response.code){
            //$m.toast("TPA List store successfully...");
            hideProgress(null,null);
            $m.toast('Sync successfully completed');
        } else{
            errorResponse("Could not store TPA data in file",response,'saveTPAList');
        }
    }); 
}

function fetchPartnerBranchDetails() {
	$m.showProgress("Fetching partner branch details...");
	var url = Constants.publicIP +"/mowblyserver/partnerBranchDetailsServerScript/rellife/prod/RlifeAssist";
    $m.get(url, function(response){
        if(response.code === 200){
            var result = response.result;
            savePartnerBranchDetails(JSON.stringify(result.data));
            $m.putPref("partnerBranchDetailsSynced", true);
            $m.savePref();
        } else if (response.code === 0){
            errorResponse(ERROR_0,response,'fetchPartnerBranchDetails');
            $m.putPref("partnerBranchDetailsSynced", false);
            $m.savePref();
            savePartnerBranchDetails([]);
        }else {
        	$m.putPref("partnerBranchDetailsSynced", false);
            $m.savePref();
            errorResponse(ERROR_500,response,'fetchPartnerBranchDetails');
            savePartnerBranchDetails([]);
        }
    });
}

function savePartnerBranchDetails(partnerBranchData) {
	$m.showProgress("Saving Partner Branch Data...");
    var fileObj = $m.file("partnerBranchdata.txt",{"level": $m.APP_LEVEL, "storageType": $m.SDCARD});
    $m.writeFile(fileObj, partnerBranchData, function(response){
        if(response.code == -1) {
            errorResponse("Could not store Partner Branch Data in file",response,'savePartnerBranchDetails');
            return;
        }
        if(response.code){
            //$m.toast("TPA List store successfully...");
            hideProgress(null,null);
            $m.toast('Sync successfully completed');
        } else{
            errorResponse("Could not store Partner Branch Data in file",response,'savePartnerBranchDetails');
        }
    }); 
}

function setProposalProgress(syncData, step){
    var proposalsCount = totalProposals.length;
    var currentProposal = syncData.record;
    var sliceCount = proposalsCount * 6;
    var sliceWidth = 1/sliceCount * 100;
    var currentWidth = $m.juci.dataset("proposalFiles").syncpercent;
    currentWidth = parseInt(currentWidth.replace("%", "")) + sliceWidth;
    if(currentWidth > 99){
        currentWidth = 100;
    }
    setSyncPercent("proposalFiles", Math.round(currentWidth));
}

function setDocumentsProgress(syncData, step){
    var proposalsCount = totalDocuments.length;
    var sliceCount = proposalsCount;
    var sliceWidth = 1/sliceCount * 100;
    var currentWidth = $m.juci.dataset("docFiles").syncpercent;
//  if(currentWidth >= 100){
//      currentWidth = sliceWidth;
//      
//  }
//  else{
    currentWidth = parseInt(currentWidth.replace("%", "")) + sliceWidth;
    if(currentWidth > 100){
        currentWidth = 100;
    }

    setSyncPercent("docFiles", Math.round(currentWidth));
}

function setCFRProgress(syncData, step){
    var proposalsCount = totalCFRS.length;
    var sliceCount = proposalsCount;
    var sliceWidth = 1/sliceCount * 100;
    var currentWidth = $m.juci.dataset("cfrFiles").syncpercent;
    currentWidth = parseInt(currentWidth.replace("%", "")) + sliceWidth;
    if(currentWidth > 100){
        currentWidth = 100;
    }
    setSyncPercent("cfrFiles", Math.round(currentWidth));
}

function setVideosProgress(syncData, step){
    var proposalsCount = totalVideos.length;
    var sliceCount = proposalsCount;
    var sliceWidth = 1/sliceCount * 100;
    var currentWidth = $m.juci.dataset("videoFiles").syncpercent;
    currentWidth = parseInt(currentWidth.replace("%", "")) + sliceWidth;
    if(currentWidth > 100){
        currentWidth = 100;
    }
    setSyncPercent("videoFiles", Math.round(currentWidth));
}

function setRunnerActivityProgress(syncData, step){
    var proposalsCount = totalRunnerActivities.length;
    var sliceCount = proposalsCount;
    var sliceWidth = 1/sliceCount * 100;
    var currentWidth = $m.juci.dataset("runnerActivity").syncpercent;
    currentWidth = parseInt(currentWidth.replace("%", "")) + sliceWidth;
    if(currentWidth > 100){
        currentWidth = 100;
    }
    setSyncPercent("runnerActivity", Math.round(currentWidth));
}

function setIMProgress(syncData, step){
    var imCount = totalIMs.length;
    var currentIM = syncData.record;
    var sliceCount = imCount * 3;
    var sliceWidth = 1/sliceCount * 100;
    var currentWidth = $m.juci.dataset("inputManagement").syncpercent;
    currentWidth = parseInt(currentWidth.replace("%", "")) + sliceWidth;
    if(currentWidth > 100){
        currentWidth = 100;
    }
    setSyncPercent("inputManagement", Math.round(currentWidth));
}

// fetching device information from api's
function fetchDeviceInfo(callback){
    var memStatusCallback = function(res){
        if(res.code == 0){
            deviceInfoObj.RAM = res.result.RAMSize;
            deviceInfoObj.Free_Space = res.result.availableInternalMemory;
            deviceInfoObj.CPU_Details = res.result.noOfCores +" Core "+ res.result.cpuFrequency;
            
            var versionInfoCallback = function(r){
                if (r.code == 1){
                    deviceInfoObj.Android_Version = r.result.osVersion;
                    deviceInfoObj.SAPCode = $m.getUsername();
                    deviceInfoObj.Added_By = $m.getUsername();
                    var getotgInfo = $m.getUsbhostSupport();
                    var getGpsInfo = $m.getGpsAvailabilty();
                    deviceInfoObj.GPS_Option = getGpsInfo;
                    deviceInfoObj.OTG_Option = getotgInfo;
                    deviceInfoObj.Device_Model = r.result.modelName;
                    deviceInfoObj.Model_Number = r.result.modelNumber;
                    
                    var cameraAvailableCallback = function(resp){
                        if(resp.code == 1){
                            deviceInfoObj.Selfie_Camera = "Y";
                            var deviceIdCallback = function(r){
                                if(r.code == 0){
                                    deviceInfoObj.Device_ID = r.result;
                                    callback(deviceInfoObj);
                                } else {
                                    callback(deviceInfoObj);
                                }
                            } 
                            $m.getDeviceId(deviceIdCallback);
                        } else if(resp.code == 0) {
                            deviceInfoObj.Selfie_Camera = "N";
                            callback(deviceInfoObj);
                        } 
                    }
                    $m.isfrontCameraAvailable(cameraAvailableCallback);
                } else {
                    $m.logError("version info Callback failed due to : "+r);
                    callback(deviceInfoObj);
                }
            }
            $m.getVersionInfo(versionInfoCallback)
        } else {
            callback(deviceInfoObj);
            $m.logError("memStatus Callback failed due to : "+res);
        }
    }
    $m.getMemStat(memStatusCallback);
}

// callback for saving information
var device_fp_callback = function(res){
    if(res.Status == "Y"){
        utils.PutPref("saveDeviceInfo",true);
        utils.PutPref("DeviceInfomation",deviceInfoObj);
        $m.savePref();
        //$m.toast("Device Information stored succesfully..");
        if(gettype() == 'RRB'){
            showProgress('Fetching TPA data and partner branch details...');
            var isTPASynced = $m.getPref("TPASynced");
            if(!isTPASynced){
                fetchTPAList();
            }else{
                hideProgress(null,null);
            }
            var ispartnerBranchDetailsSynced = $m.getPref("partnerBranchDetailsSynced");
            if(!ispartnerBranchDetailsSynced){
                fetchPartnerBranchDetails();
            }else{
                hideProgress(null,null);
            }
        }else{
            hideProgress(null,null);    
            $m.toast('Sync successfully completed');
        }
    } else {
        $m.logError("Device information insertion failed due to "+ res);
        $m.alert("Device information insertion failed due to "+ res.Error);
    }
}

// Saving device information
function saveDeviceInformation(deviceInfoObj){
    var service = new ServiceLibrary();
    service.saveDeviceInformation(device_fp_callback,deviceInfoObj);
}

function syncHierarchy(){
    $m.showProgress("Syncing Sales Hierarchy...");
    var url = Constants.publicIP +"/mowblyserver/sshdatasvc/rellife/prod/RlifeAssist";
    var data = {
        "code":currentUser.code,
        "codeCol":getColumnByUserType(currentUser.usertype),
        "action":"count"
    };
    $m.post(url,data,function(response){
        if(response.code === 200){
            // Success
            var result = response.result;
            result = JSON.parse(response.result.data);
            
            if(result.code == "103"){
                    sync();
/*              var countlength = result.entities[0].count; 
                var ttm = countlength*TTOI;
                var tts = ttm/1000;
                var ttmn;
                if(tts > 60){
                    ttmn = tts/60;
                }
                var msg;
                if(ttmn){
                    msg = "Estimated Time for Sync is :" +ttmn+" minute(s)";
                }else{
                    msg = "Estimated Time for Sync is :" +tts+" second(s)";
                }*/
            /*  $m.confirm({"title":"Time for sync",
                            "message":"This might take a few moments. Do you wish to continue?", 
                            "buttons": [{"label": "Yes"},
                                        {"label": "No"}]
                            }, function(index){
                    // Code to execute when the confirm dialog dismisses
                    if(index == 0) {
                        sync();
                    } else if(index == 1) {
                        $m.close();
                    }
                });*/
            }else{

            errorResponse(ERROR_3,response,'syncHierarchy');

            }
            
        } else if(response.code === 0){

            errorResponse(ERROR_0,response,'syncHierarchy');

        }else{
     
            errorResponse(ERROR_500,response,'syncHierarchy');

        }
    }); 
}


function syncTpparHierarchy(){
    $m.showProgress("Syncing TPPR Hierarchy...");
    var url = Constants.publicIP +"/mowblyserver/sshtpddata/rellife/prod/RlifeAssist";
    var data = {
        "code":currentUser.code,
        "codeCol":getColumnByUserType(currentUser.usertype),
        "action":"count"
    };
    $m.post(url,data,function(response){
        if(response.code === 200){
            // Success
            var result = response.result;
            result = JSON.parse(response.result.data);
            
            if(result.code == "103"){
                    syncTpd();
/*              var countlength = result.entities[0].count; 
                var ttm = countlength*TTOI;
                var tts = ttm/1000;
                var ttmn;
                if(tts > 60){
                    ttmn = tts/60;
                }
                var msg;
                if(ttmn){
                    msg = "Estimated Time for Sync is :" +ttmn+" minute(s)";
                }else{
                    msg = "Estimated Time for Sync is :" +tts+" second(s)";
                }*/
            /*  $m.confirm({"title":"Time for sync",
                            "message":"This might take a few moments. Do you wish to continue?", 
                            "buttons": [{"label": "Yes"},
                                        {"label": "No"}]
                            }, function(index){
                    // Code to execute when the confirm dialog dismisses
                    if(index == 0) {
                        sync();
                    } else if(index == 1) {
                        $m.close();
                    }
                });*/
            }else{
                errorResponse(ERROR_3,response,'syncTpparHierarchy');
            }
            
        } else if(response.code === 0){

            errorResponse(ERROR_0,response,'syncTpparHierarchy');

        }else{
     
            errorResponse(ERROR_500,response,'syncTpparHierarchy');

        }
    }); 
}


function getColumnByUserType(usertype){
    switch(usertype){
        case "ZM":
            return "ZM_Code";
            break;
            
        case "RM":
            return "RM_Code";
            break;
            
        case "BM":
            return "BM_Code";
            break;
            
        case "SM":
            return "SM_Code";
            break;
            
        case "ADV":
            return "Adv_Emp_Code";
            break;
        
        case "AM":
            return "AM_Code";
            break;
            
        case "TM":
            return "BM_Code";
            break;
        
        case "CDASM":
            return "SM_Code";
            break;
        case "CDAADV":
            return "SM_Code";
            break;
        case "TPSM":
            return "SM_Code";
            break;
        case "TPPR":
            return "SM_Code";
            break;  
        case "TPADV":
            return "Adv_Emp_Code";
            break;
        case "AGSM":
            return "SM_Code";
            break;
        case "AGPS":
            return "SM_Code";
            break;
        case "TPBOM":
            return "SM_Code";
            break;
        case "PRSM":
            return "SM_Code";
            break;
        case "CNSM":
            return "SM_Code";
            break;
    } 
}

function getData(){
	url = Constants.publicIP +"/mowblyserver/sshdatasvc/rellife/prod/RlifeAssist";
	var data = {
	        "code":currentUser.code,
	        "codeCol":getColumnByUserType(currentUser.usertype),
	        "action":"get"
	    };
	$m.post(url, data, function(response){
	    if(response.code == 200){
	        // Success
	        var result = response.result;
	        result = JSON.parse(response.result.data);
	        shRows = result.entities;
	        utils.PutPref("AdvisorsList",shRows);
	        
	        if(result.code == "103"){
	            $m.juci.dataset("Sales_manager");
	            processSHData();
	        }else{
	            errorResponse(ERROR_3,response,'getData');
	        }
	    }else if(response.code == 0){
	        errorResponse(ERROR_0,response,'getData');
	    }else{
	        errorResponse(ERROR_500,response,'getData');
	    }
	});
}

function sync() {
    if(!$m.networkConnected()){
        $m.logError("Sync failed: No internet connection");
        $m.alert("No internet connection");
        return false;
    }
    getData();
}

function processSHData(){
    SHData.multiReplace(shRows,function(data){
        syncTeam();
        getAdvisorList();
    },function(error){
    	$m.logError('processSHData -'+JSON.stringify(error));
    });
}

function syncClose(){
//  $m.logInfo("outside sync");
    $m.alert("Records synched in your device sucessfully", "Sales Heirarchy", function(){
        //$m.close();
        $m.open("com.cloudpact.mowbly.home","/system/homt.html",null);
    });
}


function updateDocSyncStatus(data,res, success_callback, failure_callback){
    if(res.code == 0){
        $m.alert(res.error.message);
        return;
    }
     var resdata = JSON.parse(res.result.data);
    var txn_id = resdata.Sync_Txn_Id;
    if(resdata.Status == 'Y'){
    data["issync"] = "1";
    }
    else{
    data["issync"] = "0";   
    }
    
    delete data.total_Count;
    var filter = new DB.Filter.equal("ImagePath", "'" + data.ImagePath + "'");
    var txnfilter = new DB.Filter.equal("Txn_Id", txn_id );
    var appfilter = new DB.Filter.equal("Application_Number", "'" + data.Application_Number + "'");
    var doctypefilter = new DB.Filter.equal("DocumentTypeCode", "'" + data.DocumentTypeCode + "'");
    var compositFilter = new DB.CompositeFilter(DB.CompositeFilter.AND, [filter,txnfilter,appfilter,doctypefilter]);
    PDC_Image_Details.updateSync_NEW(data,compositFilter,function(r){
        success_callback();
    },function(r){
        failure_callback();
    })  
}

function updatecfrDocSyncStatus(data, success_callback, failure_callback){
    data["issync"] = "1";
    
    var filter = new DB.Filter.equal("ImagePath", "'" + data.ImagePath + "'");
    var appfilter = new DB.Filter.equal("Application_Number", "'" + data.Application_Number + "'");
    var doctypefilter = new DB.Filter.equal("DocumentTypeCode", "'" + data.DocumentTypeCode + "'");
    var compositFilter = new DB.CompositeFilter(DB.CompositeFilter.AND, [filter,appfilter,doctypefilter]);
    PDC_Image_Details.updateSync_NEW(data,compositFilter,function(r){
        success_callback();
    },function(r){
        failure_callback();
    })  
}

function updateVideoSyncStatus(data, success_callback, failure_callback){
    data["issync"] = "1";
    data["Selfi_Video_SyncStatus"] = "1";
    data["Personal_Video_SyncStatus"] = "1";
    
    var appfilter = new DB.Filter.equal("Application_Number", "'" + data.Application_Number + "'");
    var compositFilter = new DB.CompositeFilter(DB.CompositeFilter.AND, [appfilter]);
    PDC_Video_Details.updateSync_NEW(data,compositFilter,function(r){
        success_callback();
    },function(r){
        failure_callback();
    })
}

function updateRunnerActivitySyncStatus(data, success_callback, failure_callback){
    data.Data[0]["issync"] = "1";
    
    var appfilter = new DB.Filter.equal("Policy_Number", "'" + data.Data[0].Policy_Number.Policy_Number + "'");
    var compositFilter = new DB.CompositeFilter(DB.CompositeFilter.AND, [appfilter]);
    saveRunnerActivity.updateSync_NEW(data.Data[0],compositFilter,function(r){
        success_callback();
    },function(r){
        failure_callback();
    })
}


function syncTeam(){
	var time= new Date().getTime();
    time = new Date(time);
    var sync = time.toString("dd MMM yy hh:mm tt");
    $m.putPref("syncTeam",sync,true);
    $m.savePref();
    var Sync = $m.getPref("syncTeam");
    juci.dataset("syncTeam",Sync);
}
    
function getTpdData(){
	url = Constants.publicIP +"/mowblyserver/sshtpddata/rellife/prod/RlifeAssist";
	var data = {
				"code":currentUser.code,
				"codeCol":getColumnByUserType(currentUser.usertype),
				"action":"get"
	    	};
	$m.post(url, data, function(response){
	    if(response.code == 200){
	        // Success
	        var result = response.result;
	        result = JSON.parse(response.result.data);
	        shRows = result.entities;
	        
	        if(result.code == "103"){
	            $m.juci.dataset("Sales_manager");
	            processSHTpdData();
	        }else{
	            errorResponse(ERROR_3,response,'getTpdData');
	        }
	    }else if(response.code == 0){
	        errorResponse(ERROR_0,response,'getTpdData');
	    }else{
	        errorResponse(ERROR_500,response,'getTpdData');
	    }
	});
}

function syncTpd() {
    if(!$m.networkConnected()){
        $m.logError("Sync failed: No internet connection");
        $m.alert("No internet connection");
        return false;
    }
    //$m.logInfo("Inside sync");    
    getTpdData();
}

function processSHTpdData(){
	shTpdData.multiReplace(shRows,function(data){
		syncTeam();
		// $m.toast("Synced Tpd Hierarchy successfully!");
		//setUserDevice();
		getAdvisorList();
	},function(error){
		errorResponse(ERROR_DB,error,'processSHTpdData');
	});
    
}

function fireRequestInput(action, data, callback){
        var url = Constants.publicIP+"/mowblyserver/slocationscript/rellife/prod/RlifeAssist";
         if ($m.networkConnected()) {
            data = JSON.stringify(data);
            $m.post(url, {"action":action,"data":data}, function(callback) {
                return function(response) {
                    if (response.code == 200) {
                        var result = response.result;
                        result = JSON.parse(JSON.parse(result.data).data);
                        //$m.logInfo("Input management : "  + action + "  "+ JSON.stringify(result));
                        callback.call(this, result);
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
    
function getAdvisorList(){
    var advisor_list = [];
    SHData.SelectWithFilterAdv(["Adv_Emp_Code as code","Adv_Emp_Name as name"],$m.getUsername(),function(response){
        var advisorList = response.rows;
        $m.putPref("advisorsDetails",advisorList);
        $m.savePref();
        for(var i=0;i<advisorList.length;i++){
            advisor_list[i] = advisorList[i].name;
        }
        $m.putPref("advisorList",advisor_list);
        $m.savePref();
        //$m.toast("Synced  Hierarchy successfully!");
        setUserDevice();
    })
}

// Added on 15/01/2018 by Sajid Halai
$m.onClose(function(event){
    event.preventDefault();
    $m.open("com.cloudpact.mowbly.home","/system/home.html",null);
});

function showProgress(messsage){
    $m.showProgress(messsage);
}

function hideProgress(tag,message){
    $m.hideProgress();
    if(message){
        $m.logError("Sync Page"+" | Method -> "+tag+" | Erorr ->"+message);
    }
}

function errorResponse(message,error,tag){
    hideProgress(tag,JSON.stringify(error));
    $m.alert(message);
}

function setUserDevice(){
    var saveDeviceInfo = utils.GetPref("saveDeviceInfo");
    if(!saveDeviceInfo) {
        var saveDeviceInfoCallback = function(res){
            saveDeviceInformation(res);
        };
        showProgress("Setting user device...");
        fetchDeviceInfo(saveDeviceInfoCallback);
    }else{
        hideProgress(null,null);
        $m.toast("Sync successfully completed");
    }
}