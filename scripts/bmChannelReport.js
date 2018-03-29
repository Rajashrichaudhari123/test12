$m.juci.addDataset("SMDetails", []);
$m.juci.addDataset("notEnoughLeads", []);
$m.juci.addDataset("enoughLeads", []);
$m.juci.addDataset("notEnoughAuthenticates", []);
$m.juci.addDataset("enoughAuthenticated", []);
$m.juci.addDataset("nelsValue","");
$m.juci.addDataset("elacValue","");
$m.juci.addDataset("neacValue","");
$m.juci.addDataset("eanslValue","");
$m.juci.addDataset("eannatValue","");
$m.juci.addDataset("tableValue",false);
$m.juci.addDataset("nelsValueDropDown",false);
$m.juci.addDataset("elacValueDropDown",false);
$m.juci.addDataset("neacValueDropDown",false);
$m.juci.addDataset("eanslValueDropDown",false);
$m.juci.addDataset("eannatValueDropDown",false);
var bmExceptionArray = [];

var fromDate ;
var toDate;
var smSapCode = "";
var dropDownValue = "";
var nels_reasonCode = "";
var elac_reasonCode = "";
var neas_reasonCode = "";
var eansl_reasonCode = "";
var eannat_reasonCode = "";
var nelsArray = {};
var elacArray = {};
var neacArray = {};
var eanslArray = {};
var eannatArray = {};
var resultArray = [];

$m.onReady(function(){
	$m.juci.dataset('headerName',"BMException");
});

$m.onData(function(eventObject){
	initData(eventObject);
	bmExceptionArray = [];
});

$m.onClose(function(){
	callCloseEvent();
});

function callCloseEvent(){
	nels_reasonCode = "";
	elac_reasonCode = "";
	neas_reasonCode = "";
	eansl_reasonCode = "";
	eannat_reasonCode = "";
	if(document.getElementById("remarks-nelstext")){
		document.getElementById("remarks-nelstext").value = null;
	}
	if(document.getElementById("remarks-elactext")){
		document.getElementById("remarks-elactext").value = null;
	}
	if(document.getElementById("remarks-neactext")){
		document.getElementById("remarks-neactext").value = null;
	}
	if(document.getElementById("remarks-eansltext")){
		document.getElementById("remarks-eansltext").value = null;
	}
	if(document.getElementById("remarks-eannattext")){
		document.getElementById("remarks-eannattext").value = null;
	}
}

function initData(eventObject){
	$m.juci.getControl("dateranger").value(null);
	$m.juci.dataset("tableValue",false);
	var dbcallback = function(dbhelper) {
		dbHelper = dbhelper;
		fetchSHData();
	};
	utils.GetDbhelper(dbcallback);
}

var checkingNetworkSpeedCallback = function(res){
	utils.HideProgress();
	saveForm(resultArray);
};


var message = "Your Network bandwidth is below 250 kbps.It will take some time to sync the data.Do you want to Proceed?";
utils.CheckingNetworkSpeed(message,checkingNetworkSpeedCallback);

function fetchSHData(){
	var bmCode = $m.getUsername();
	if(dbHelper){
		var filter = new window.DB.Filter.equal("BM_Code", "'" + bmCode + "'");
		SHData.SelectWithFilter(["SM_Code as code","SM_Name as name"],filter,setSuccessCallBack(),setErrorCallBack(),true);
 	}
}

function setSuccessCallBack(){
	return function(response){
		var SMdata = response.rows;
		$m.juci.dataset("SMDetails",SMdata);
	};
}
function setErrorCallBack(){
		return function(response){
	};
}

function getDateRange(event){
	var from_Date = event.value[0];
	fromDate = new Date(from_Date).getDay();
	if(fromDate == 1){
		fromDate = new Date(from_Date).setDate(new Date(from_Date).getDate() + 6);
		fromDate = new Date(fromDate);
	}else if(fromDate == 2){
		var fixed_date = new Date(from_Date).getDate();
		fixed_date = (fixed_date - 1);
		var month = new Date(from_Date).getMonth() + 1;
		var year = new Date(from_Date).getFullYear();
		var fullDate = month+"/"+fixed_date+"/"+ year;
		from_Date = new Date(fullDate);
		fromDate = new Date(from_Date).setDate(new Date(from_Date).getDate() + 6);
		fromDate = new Date(fromDate);
		$m.juci.getControl("dateranger").from.value(from_Date);
	}else if(fromDate == 3){
		var fixed_date = new Date(from_Date).getDate();
		fixed_date = (fixed_date - 2);
		var month = new Date(from_Date).getMonth() + 1;
		var year = new Date(from_Date).getFullYear();
		var fullDate = month+"/"+fixed_date+"/"+ year;
		from_Date = new Date(fullDate);
		fromDate = new Date(from_Date).setDate(new Date(from_Date).getDate() + 6);
		fromDate = new Date(fromDate);
		$m.juci.getControl("dateranger").from.value(from_Date);
	}else if(fromDate == 4){
		var fixed_date = new Date(from_Date).getDate();
		fixed_date = (fixed_date - 3);
		var month = new Date(from_Date).getMonth() + 1;
		var year = new Date(from_Date).getFullYear();
		var fullDate = month+"/"+fixed_date+"/"+ year;
		from_Date = new Date(fullDate);
		fromDate = new Date(from_Date).setDate(new Date(from_Date).getDate() + 6);
		fromDate = new Date(fromDate);
		$m.juci.getControl("dateranger").from.value(from_Date);
	}else if(fromDate == 5){
		var fixed_date = new Date(from_Date).getDate();
		fixed_date = (fixed_date - 4);
		var month = new Date(from_Date).getMonth() + 1;
		var year = new Date(from_Date).getFullYear();
		var fullDate = month+"/"+fixed_date+"/"+ year;
		from_Date = new Date(fullDate);
		fromDate = new Date(from_Date).setDate(new Date(from_Date).getDate() + 6);
		fromDate = new Date(fromDate);
		$m.juci.getControl("dateranger").from.value(from_Date);
	}else if(fromDate == 6){
		var fixed_date = new Date(from_Date).getDate();
		fixed_date = (fixed_date - 5);
		var month = new Date(from_Date).getMonth() + 1;
		var year = new Date(from_Date).getFullYear();
		var fullDate = month+"/"+fixed_date+"/"+ year;
		from_Date = new Date(fullDate);
		fromDate = new Date(from_Date).setDate(new Date(from_Date).getDate() + 6);
		fromDate = new Date(fromDate);
		$m.juci.getControl("dateranger").from.value(from_Date);
	}
	$m.juci.getControl("dateranger").to.disable();
	$m.juci.getControl("dateranger").to.value(fromDate);
	toDate = new Date(fromDate).getTime();
}

function getSMCode(event){
	smSapCode = event.value.code();
}

function getBMExceptionReport(){
	if(toDate == "" || smSapCode == ""){
		$m.alert("Please enter the value","Alert",function(){
			return;
		});
	}else{
		if($m.networkConnected()){
			service = new ServiceLibrary();
			var bmExceptionCallback = function(res){
				var weeklyReport = res.WeeklyReport;
				if(weeklyReport != null){
					if(weeklyReport.length){
						for(var i = 0;i < weeklyReport.length; i++){
							var bmReportValue = weeklyReport[i];
							fetchBMReport(bmExceptionArray,bmReportValue);
						}
						//checkConditions();
					}
				}else{
					$m.alert(res.Message);
					$m.hideProgress();
				}
				if(!bmExceptionArray.length){
					$m.alert("No data found");
					$m.juci.dataset("tableValue",false);
					return;
				}
				var exceptionCallback = function(){
					loadDatafromDB("bmExceptionReport");
				};
				utils.PojoMultiReplace("bmExceptionReport",bmExceptionArray,exceptionCallback);
			};
			service.getWeeklyReport(toDate,smSapCode,bmExceptionCallback);
		}else{
			$m.alert("No Internet Connection,Please again later");
		}
	}
}

function fetchBMReport(bmExceptionArray,bmReportValue){
	bmReportValue.issync = 0;
	bmReportValue.iscompleted = 0;
	bmExceptionArray.push(bmReportValue);
}

function loadDatafromDB(pojoName){
	$m.showProgress("Loading Data from Local...");
	var successCallback = function(success_response){
		var result = success_response.rows;
		for (var j=0;j<result.length;j++){
			switch(result[j].w1Attribute_ID) {
				case "NELS" :
					nelsArray = result[j];
					break;
				case "ELAC" :
					elacArray = result[j];
					break;
				case "NEAC" :
					neacArray = result[j];
					break;	
				case "EANSL" :
					eanslArray = result[j];
					break;
				case "EANNAT" :
					eannatArray = result[j];
					break;
			}
		}
		$m.juci.dataset("nelsValue",nelsArray);
		$m.juci.dataset("elacValue",elacArray);
		$m.juci.dataset("neacValue",neacArray);
		$m.juci.dataset("eanslValue",eanslArray);
		$m.juci.dataset("eannatValue",eannatArray);
		assignValue();
		toDate = "";
		$m.hideProgress();
	}
	utils.PojoSelectWithFilter(pojoName,successCallback,1);
}

function getSortBy(e){
	$(function() {
	    $('#not-enough-lead').prop('selectedIndex',0);
	});
	$(function() {
	    $('#elac').prop('selectedIndex',0);
	});
	$(function() {
	    $('#neac').prop('selectedIndex',0);
	});
	$(function() {
	    $('#eansl').prop('selectedIndex',0);
	});
	optionselectedforsearch = e.target.value;
}

function assignValue(){
	$m.juci.dataset("tableValue",true);
	var nelsdrop = nelsArray;
	var elacdrop = elacArray;
	var neacdrop = neacArray;
	var eansldrop = eanslArray;
	var eannatdrop = eannatArray;
	if(nelsdrop.w1Overall_Achievment_Met == "N"){
		document.getElementById("choose-nels").value = nelsdrop.w1ReasonCode != "" ? nelsdrop.w1ReasonCode: "NELSAL";
		nels_reasonCode = nelsdrop.w1ReasonCode;
		$m.juci.findById("nelsValueDropDown").show();
		var all = document.getElementsByClassName('aadhar_data_nels');
		for (var k = 0; k < all.length; k++) {
			all[k].style.color = 'red';
		}
		var changeColor = document.getElementsByClassName('chooseoption_nels');
		for (var l = 0; l < changeColor.length; l++) {
			changeColor[l].style.color = 'red';
		}
		var headerColor = document.getElementsByClassName('aadhar_info_name_nels');
		for (var a = 0; a < headerColor.length; a++) {
			headerColor[a].style.color = 'red';
		}
	}else{
		$m.juci.findById("nelsValueDropDown").hide();
	}
	if(elacdrop.w1Overall_Achievment_Met == "N"){
		document.getElementById("choose-elac").value = elacdrop.w1ReasonCode != "" ? elacdrop.w1ReasonCode : "ELACNBP";
		elac_reasonCode = elacdrop.w1ReasonCode;
		$m.juci.findById("elacValueDropDown").show();
	}else{
		$m.juci.findById("elacValueDropDown").hide();
	}
	if(neacdrop.w1Overall_Achievment_Met == "N"){
		document.getElementById("choose-neac").value = neacdrop.w1ReasonCode != "" ? neacdrop.w1ReasonCode : "NEACAL";
		neac_reasonCode = neacdrop.w1ReasonCode;
		$m.juci.findById("neacValueDropDown").show();
		var notEnoughCalls = document.getElementsByClassName('aadhar_data_neac');
		for (var j = 0; j < notEnoughCalls.length; j++) {
			notEnoughCalls[j].style.color = 'red';
		}
		
		var changeColor = document.getElementsByClassName('chooseoption_neac');
		for (var j = 0; j < changeColor.length; j++) {
			changeColor[j].style.color = 'red';
		}
		var headerColor = document.getElementsByClassName('aadhar_info_name_neac');
		for (var j = 0; j < headerColor.length; j++) {
			headerColor[j].style.color = 'red';
		}
	}else{
		$m.juci.findById("neacValueDropDown").hide();
	}
	if(eansldrop.w1Overall_Achievment_Met == "N"){
		document.getElementById("choose-eansl").value = eansldrop.w1ReasonCode != "" ? eansldrop.w1ReasonCode : "EANSLPTI" ;
		eansl_reasonCode = eansldrop.w1ReasonCode;
		$m.juci.findById("eanslValueDropDown").show();
	}else{
		$m.juci.findById("eanslValueDropDown").hide();
	}
	
	if(eannatdrop.w1Overall_Achievment_Met == "N"){
		document.getElementById("choose-eannat").value = eannatdrop.w1ReasonCode != "" ? eannatdrop.w1ReasonCode : "EANSLPTI" ;
		eannat_reasonCode = eannatdrop.w1ReasonCode;
		$m.juci.findById("eannatValueDropDown").show();
	}else{
		$m.juci.findById("eannatValueDropDown").hide();
	}
}

function submitReport(){
	var nelsdrop = $m.juci.dataset("nelsValue");
	var elacdrop = $m.juci.dataset("elacValue");
	var neacdrop = $m.juci.dataset("neacValue");
	var eansldrop = $m.juci.dataset("eanslValue");
	var nelsRemarks = document.getElementById("remarks-nelstext").value;
	var elacRemarks = document.getElementById("remarks-elactext").value;
	var neacRemarks = document.getElementById("remarks-neactext").value;
	var eanslRemarks = document.getElementById("remarks-eansltext").value;
	var eannatRemarks = document.getElementById("remarks-eannattext").value;
	//var nelsObj,elacObj,neacObj,eanslObj = {}; 
	$m.juci.findById("remarks-nels").show();
	$m.juci.findById("remarks-elac").show();
	$m.juci.findById("remarks-neac").show();
	$m.juci.findById("remarks-eansl").show();
	$m.juci.findById("remarks-eannat").show();
	resultArray = [];
	var nelsObj = {
		"BM_EXPer_ID":"",
		"BM_Ex_Reason_Code":"",
		"Remarks":"",
		"Sapcode":""
	
	};
	var elacObj = {
		"BM_EXPer_ID":"",
		"BM_Ex_Reason_Code":"",
		"Remarks":"",
		"Sapcode":""
	
	};
	var neacObj = {
		"BM_EXPer_ID":"",
		"BM_Ex_Reason_Code":"",
		"Remarks":"",
		"Sapcode":""
	
	};
	var eanslObj = {
		"BM_EXPer_ID":"",
		"BM_Ex_Reason_Code":"",
		"Remarks":"",
		"Sapcode":""
	
	};
	
	var eannatObj = {
		"BM_EXPer_ID":"",
		"BM_Ex_Reason_Code":"",
		"Remarks":"",
		"Sapcode":""
	
	};
	var nels_check = checkNels(nelsRemarks);
	var elac_check = checkElac(elacRemarks);
	var neac_check = checkNeac(neacRemarks);
	var eansl_check = checkEansl(eanslRemarks);
	var eannat_check = checkEannat(eannatRemarks);
	if(nels_check == true && elac_check == true && neac_check == true && eansl_check ==true && eannat_check == true){
		if(nelsdrop.w1Attribute_ID == "NELS"){
			nelsObj.BM_EXPer_ID = nelsdrop.w1UID;
			nelsObj.BM_Ex_Reason_Code = nels_reasonCode;
			nelsObj.Remarks = nelsRemarks;
			nelsObj.Sapcode= smSapCode
		}
		if(elacdrop.w1Attribute_ID == "ELAC"){
			elacObj.BM_EXPer_ID = elacdrop.w1UID;
			elacObj.BM_Ex_Reason_Code = elac_reasonCode;
			elacObj.Remarks = elacRemarks;
			elacObj.Sapcode= smSapCode
		}
		if(neacdrop.w1Attribute_ID == "NEAC"){
			neacObj.BM_EXPer_ID = neacdrop.w1UID;
			neacObj.BM_Ex_Reason_Code = neas_reasonCode;
			neacObj.Remarks = neacRemarks;
			neacObj.Sapcode= smSapCode
		}
		if(eansldrop.w1Attribute_ID == "EANSL"){
			eanslObj.BM_EXPer_ID = eansldrop.w1UID;
			eanslObj.BM_Ex_Reason_Code = eansl_reasonCode;
			eanslObj.Remarks = eanslRemarks;
			eanslObj.Sapcode= smSapCode
		}
		
		if(eannatdrop.w1Attribute_ID == "EANNAT"){
			eannatObj.BM_EXPer_ID = eannatdrop.w1UID;
			eannatObj.BM_Ex_Reason_Code = eannat_reasonCode;
			eannatObj.Remarks = eannatRemarks;
			eannatObj.Sapcode= smSapCode
		}
		resultArray = resultArray.concat(nelsObj,elacObj,neacObj,eanslObj,eannatObj);
		if (dbHelper) {
			var saveExceptionCallback = function(){
				$m.logInfo("Successfully inserted!");
				if ($m.networkConnected()) {
					$m.showProgress("Checking network bandwidth");
					utils.NetworkUtils();
					//saveForm(datasetData);
				} else {
					$m.alert(messages.NoNetworkConnectivity,"Network Alert", function() {
						$m.hideProgress();
					});
			  }		
			};
			utils.PojoMultiReplace("saveBMReport",resultArray,saveExceptionCallback);
		}else {
			$m.alert("Error while opening database");
		}
	}
}

function getAttributeValue(value){
	nels_reasonCode = value;
	$m.juci.findById("remarks-nels").show();
}

function getAttributeValueElac(value){
	elac_reasonCode = value;
	$m.juci.findById("remarks-elac").show();
}
function getAttributeValueNeac(value){
	neas_reasonCode = value;
	$m.juci.findById("remarks-neac").show();
}
function getAttributeValueEansl(value){
	eansl_reasonCode = value;
	$m.juci.findById("remarks-eansl").show();
}

function getAttributeValueEannat(value){
	eannat_reasonCode = value;
	$m.juci.findById("remarks-eansl").show();
}

function saveForm(resultArray){
	$m.showProgress("Syncing data..");
	var service = new ServiceLibrary();
	var callback = function(res){
		if (res.Status == "SUCCESS") {
			$m.logInfo("Bm report inserted successfully");
			$m.alert("Record inserted successfully to server");
			utils.ClosePage();
		} else {
			$m.logInfo("Failed to Bm report response is" + ' ' + res.Error);
			$m.alert("Failed to insert Bm report response is" + ' ' + res.Error, "Failed to Insert", function() 
			{
				utils.ClosePage();
			});
		}
	};
	service.updateRemarkReasonBM(callback,resultArray);
}

function checkNels(nelsRemarks){
	var nelsdrop = $m.juci.dataset("nelsValue");
	if(nelsdrop.w1Overall_Achievment_Met == "N"){
		if(nels_reasonCode == ""){
			$m.alert("Please enter the reason","Alert",function(){
				return;
			});
		}else if(nels_reasonCode == "NELSOR"){
			if(nelsRemarks == ""){
				$m.alert("Please enter the remarks","Alert",function(){
				return;
			});
			}else{
				return true;
			}
		}else{
			return true;
		}
	}else{
		return true;
	}
}

function checkElac(elacRemarks){
	var elacdrop = $m.juci.dataset("elacValue");
	if(elacdrop.w1Overall_Achievment_Met == "N"){
		if(elac_reasonCode == ""){
			$m.alert("Please enter the reason","Alert",function(){
				return;
			});
		}else if(elac_reasonCode == "ELACOR"){
			if(elacRemarks == ""){
				$m.alert("Please enter the remarks","Alert",function(){
				return;
			});
			}else{
				return true;
			}
		}else{
			return true;
		}
	}else{
		return true;
	}
}

function checkNeac(neacRemarks){
	var neacdrop = $m.juci.dataset("neacValue");
	if(neacdrop.w1Overall_Achievment_Met == "N"){
		if(neas_reasonCode == ""){
			$m.alert("Please enter the reason","Alert",function(){
				return;
			});
		}else if(neas_reasonCode == "NEACOR"){
			if(neacRemarks == ""){
				$m.alert("Please enter the remarks","Alert",function(){
				return;
			});
			}else{
				return true;
			}
		}else{
			return true;
		}
	}else{
		return true
	}
}

function checkEansl(eanslRemarks){
	var eansldrop = $m.juci.dataset("eanslValue");
	if(eansldrop.w1Overall_Achievment_Met == "N"){
		if(eansl_reasonCode == ""){
			$m.alert("Please enter the reason","Alert",function(){
				return;
			});
		}else if(eansl_reasonCode == "EANSLOR"){
			if(eanslRemarks == ""){
				$m.alert("Please enter the remarks","Alert",function(){
				return;
			});
			}else{
				return true;
			}
		}else{
			return true;
		}
	}else{
		return true;
	}
}

function checkEannat(eannatRemarks){
	var eannatdrop = $m.juci.dataset("eannatValue");
	if(eannatdrop.w1Overall_Achievment_Met == "N"){
		if(eannat_reasonCode == ""){
			$m.alert("Please enter the reason","Alert",function(){
				return;
			});
		}else if(eannat_reasonCode == "EANSLOR"){
			if(eannatRemarks == ""){
				$m.alert("Please enter the remarks","Alert",function(){
				return;
			});
			}else{
				return true;
			}
		}else{
			return true;
		}
	}else{
		return true;
	}
}


function format(e){	
	return e.name;	
}

function checkConditions() {
	if(bmExceptionArray.length){
		for(var i=0;i<bmExceptionArray.length;i++) {
			if(bmExceptionArray[i].Attribute == "Not enough leads") {
				if(bmExceptionArray[i].w1AchvCnt < "10") {
					console.log(bmExceptionArray[i].w1AchvCnt);
					var all = document.getElementsByClassName('aadhar_data_nels');
					for (var k = 0; k < all.length; k++) {
						all[k].style.color = 'red';
					}
					var changeColor = document.getElementsByClassName('chooseoption_nels');
					for (var l = 0; l < changeColor.length; l++) {
						changeColor[l].style.color = 'red';
					}
					var headerColor = document.getElementsByClassName('aadhar_info_name_nels');
					for (var a = 0; a < headerColor.length; a++) {
						headerColor[a].style.color = 'red';
					}
				}
			} 
			
			if(bmExceptionArray[i].Attribute == "Not enough authenticated calls") {
				if(bmExceptionArray[i].w1AchvCnt < "5") {
					var notEnoughCalls = document.getElementsByClassName('aadhar_data_neac');
					for (var j = 0; j < notEnoughCalls.length; j++) {
						notEnoughCalls[j].style.color = 'red';
					}
					
					var changeColor = document.getElementsByClassName('chooseoption_neac');
					for (var j = 0; j < changeColor.length; j++) {
						changeColor[j].style.color = 'red';
					}
					var headerColor = document.getElementsByClassName('aadhar_info_name_neac');
					for (var j = 0; j < headerColor.length; j++) {
						headerColor[j].style.color = 'red';
					}
				}
			}
		}
	}
}


