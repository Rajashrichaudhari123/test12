/**
 * inputManagement.js
 * @author CloudPact Technologies
 * @description : This script is for viewing all the lead list based on flag value.
 **/
var currDtl, currDtlIdx;
var optionselectedforsort;
var optionselectedforsearch;
var SortingArray = [];
var input = {
	"newBusiness":"",
	"recruitment":"",
	"existingAdv":"",
	"lms":"",
	"renewals":""
};

var dbHelper;
var NewBusiness = [];
var Recruitment = [];
var ExistingAdv = [];
var Renewals = [];
var LMSBranch = [];
var devicestarttime;
var messageData;

$m.juci.addDataset("isLms",false);
$m.juci.addDataset("isNotLms",true);
$m.juci.addDataset("lmsBranchInputs",[]);
$m.juci.addDataset("displayName","");
$m.juci.addDataset("new_message","");
$m.juci.addDataset("inputManagement",input);
$m.juci.addDataset("newbusinessinputs",[]);
$m.juci.addDataset("recriutmentinputs",[]);
$m.juci.addDataset("existingAdvinputs",[]);
$m.juci.addDataset("renewlasinputs",[]);
$m.juci.addDataset("renewalsearch",[]);
$m.juci.addDataset("alertcount","");
$m.juci.addDataset("options2",["Select","Name","Date"]);
$m.juci.addDataset("options3",["Select","Earliest to Latest","Latest to Earliest"]);
$m.juci.addDataset("selectcatogory",[]);
$m.juci.addDataset("advisorList",["Select"]);
$m.juci.addDataset("dateranged",[]);
$m.juci.addDataset("options1",["Select","Advisor Name","Date Range","All"]);
$m.juci.addDataset("dateranged",[]);
$m.juci.addDataset("dateRange",false);
$m.juci.addDataset("searchText",true);
$m.juci.addDataset("searchdisableenable",false);
$m.juci.addDataset("dateRangeButton",false);
$m.juci.addDataset("lpcDetails",[]);
$m.juci.addDataset("viewDetails",[]);


$(function() {
		$("#filterList-sort").select2({
	    	placeholder: "Select",
			minimumResultsForSearch : -1
		});
		$("#filterList-listsort").select2({
	    	placeholder: "Select",
			minimumResultsForSearch : -1
		});
		$("#filterList-search").select2({
	    	placeholder: "Select",
			minimumResultsForSearch : -1
		});
		$("#filterList-advisorsearch").select2({
	    	placeholder: "Select",
			minimumResultsForSearch : -1
		});
	});

$m.onReady(function(){
	$m.juci.dataset('headerName',"Super Express");
	$(function() {
	    $(window).scroll(sticky_relocate);
	});
	initReady();
});

$m.onResume(function(){
	utils.GetLocation(12000,true,"");
	devicestarttime = utils.GetTimeStamp();
	$m.juci.findById("sortfiltr").hide();
	$m.juci.findById("searchFilter").hide();
	$m.juci.findById("dateranger").hide();
	juci.findById("select2-filterList-advisorsearch-container").el.innerHTML = "Select";
	juci.findById("select2-filterList-search-container").el.innerHTML = "Select";
	var getUserType = gettype();
	if(getUserType == 'FLS') {
		$m.juci.dataset("isLms",true);
		$m.juci.dataset("isNotLms",false);
	} else {
		$m.juci.dataset("isLms",false);
		$m.juci.dataset("isNotLms",true);
	}
});

$m.onResult(function(eventObject){
	var result = eventObject.result;
	if(result){
		getLeadListBySearch();
	}
});

$m.onData(function(){
   	initData();
});

function initReady() {
	NewBusinessView = $m.juci.findById("new-business");
	RecruitmentView = $m.juci.findById("recruit-inputs");
	ExistingAdvView = $m.juci.findById("existing-adv");
	LMSbranchView = $m.juci.findById("lms-branch");
	RenewalsView = $m.juci.findById("renewals");
	RecruitmentView.hide();
	ExistingAdvView.hide();
	LMSbranchView.hide();
	RenewalsView.hide();
	var xlistId = ["newBusip","existingip","recruitip","lmsip","renewalsip"];
	for(var i=0;i<xlistId.length;i++){
		$m.juci.getControl(xlistId[i]).addListItemClick(openActivityPlanning, this, ".update_lead");
		$m.juci.getControl(xlistId[i]).addListItemClick(openEditLead, this, ".editLead");
	    $m.juci.getControl(xlistId[i]).addListItemClick(openActivityResult, this, ".edit_lead");
	    $m.juci.getControl(xlistId[i]).addListItemClick(openActivityPlanning, this, ".update_planning");
	    $m.juci.getControl(xlistId[i]).addListItemClick(openActivityResult, this, ".update_result");
	    $m.juci.getControl(xlistId[i]).addListItemClick(openActivityResult, this, ".activity_result");
	    $m.juci.getControl(xlistId[i]).addListItemClick(onCallClick, this, ".call_button");
	    $m.juci.getControl(xlistId[i]).addListItemClick(onMessageClick, this, ".message_button");
	    $m.juci.getControl(xlistId[i]).addListItemClick(openLpcDetails, this, ".lpc_button");
	}
	$m.juci.getControl("renewalsip").addListItemClick(openViewDetails, this, ".view_button");
}

function initData(){
	utils.RemovePref("useAs");
//	getLeadlist();
	getLeadListBySearch();
}


function loadDatafromDB(pojoName){
	$m.showProgress("Loading Data from Local...");
	if(gettype() != "FLS"){
		var successNONFlsCallback = function(success_response){
		var result = success_response.rows;
		var comma_type = ',';
		for (var i=0;i<result.length;i++){
			if(result[i].Address_1 || result[i].Address_2 || result[i].Address_3){	
				result[i].Address = result[i].Address_1 +" "+  result[i].Address_2 + " " + result[i].Address_3;
			}
			if(result[i].Activity_Date || result[i].Activity_Time){
				result[i].Activity_Date = result[i].Activity_Date + " " + result[i].Activity_Time;
			}
			var addate = result[i].Added_Date;
			result[i].Added_Date = addate.substring(0,addate.indexOf(" "));
			result[i].Added_Date = convertDateFormat(result[i].Added_Date);
			switch(result[i].LeadTypeFlag) {
				case "NB" :
					NewBusiness.push(result[i]);
					break;
				case "R" :
					Recruitment.push(result[i]);
					break;
				case "EA" :
					ExistingAdv.push(result[i]);
					break;	
				case "RW" :
					Renewals.push(result[i]);
					break;	
				case "LMS" :
					LMSBranch.push(result[i]);
					break;
			}
			
		}
		var countObj = {
			"newBusiness":NewBusiness.length,
			"recruitment":Recruitment.length,
			"existingAdv":ExistingAdv.length,
			"lms":LMSBranch.length,
			"renewals":Renewals.length
			};
		$m.showProgress("Setting Data into Dataset...");
		$m.juci.dataset("inputManagement",countObj);
		$m.juci.dataset("newbusinessinputs",NewBusiness);
		$m.juci.dataset("recriutmentinputs",Recruitment);
		$m.juci.dataset("existingAdvinputs",ExistingAdv);
		$m.juci.dataset("lmsBranchInputs",LMSBranch);
		$m.juci.dataset("renewlasinputs",Renewals);
		$m.hideProgress();
	};
		utils.PojoSelectWithFilter(pojoName,successNONFlsCallback,1);
	}else{
		var successCallback = function(success_response){
		var result = success_response.rows;
		var comma_type = ',';
		for (var i=0;i<result.length;i++){
			if(result[i].Address_1 || result[i].Address_2 || result[i].Address_3){
				result[i].Address = result[i].Address = result[i].Address_1 +" "+  result[i].Address_2 + " " + result[i].Address_3;;
				
			}
			if(result[i].Activity_Date || result[i].Activity_Time){
				result[i].Activity_Date = result[i].Activity_Date + " " + result[i].Activity_Time;
			}
			var addate = result[i].Added_Date;
			result[i].Added_Date = addate.substring(0,addate.indexOf(" "));
			result[i].Added_Date = convertDateFormat(result[i].Added_Date);
			switch(result[i].LeadTypeFlag) {
				case "NB" :
					NewBusiness.push(result[i]);
					break;
				case "R" :
					Recruitment.push(result[i]);
					break;
				case "EA" :
					ExistingAdv.push(result[i]);
					break;	
				case "RW" :
					Renewals.push(result[i]);
					break;	
				case "LMS" :
					LMSBranch.push(result[i]);
					break;
			}
			
		}
		var countObj = {
			"newBusiness":NewBusiness.length,
			"recruitment":Recruitment.length,
			"existingAdv":ExistingAdv.length,
			"lms":LMSBranch.length,
			"renewals":Renewals.length
			};
		$m.showProgress("Setting Data into Dataset...");
		$m.juci.dataset("inputManagement",countObj);
		$m.juci.dataset("newbusinessinputs",NewBusiness);
		$m.juci.dataset("recriutmentinputs",Recruitment);
		$m.juci.dataset("existingAdvinputs",ExistingAdv);
		$m.juci.dataset("lmsBranchInputs",LMSBranch);
		$m.juci.dataset("renewlasinputs",Renewals);
		$m.hideProgress();
	};
	utils.PojoSelectWithFilterLMS(pojoName,successCallback,1);
	}
}

function loadAdvisorDatafromDB(pojoName,advisorCode){
	$m.showProgress("Loading Data from Local...");
	var successCallback = function(success_response){
		var result = success_response.rows;
		for (var i=0;i<result.length;i++){
			switch(result[i].LeadTypeFlag) {
				case "NB" :
					NewBusiness.push(result[i]);
					break;
				case "R" :
					Recruitment.push(result[i]);
					break;
				case "EA" :
					ExistingAdv.push(result[i]);	
					break;	
				case "RW" :
					Renewals.push(result[i]);
					break;	
				case "LMS" :
					LMSBranch.push(result[i]);
					break;
			}
			
		}
		var countObj = {
			"newBusiness":NewBusiness.length,
			"recruitment":Recruitment.length,
			"existingAdv":ExistingAdv.length,
			"lms":LMSBranch.length,
			"renewals":Renewals.length
			};
		$m.showProgress("Setting Data into Dataset...");
		$m.juci.dataset("inputManagement",countObj);
		$m.juci.dataset("newbusinessinputs",NewBusiness);
		$m.juci.dataset("recriutmentinputs",Recruitment);
		$m.juci.dataset("existingAdvinputs",ExistingAdv);
		$m.juci.dataset("lmsBranchInputs",LMSBranch);
		$m.juci.dataset("renewlasinputs",Renewals);
		$m.hideProgress();
	};
	utils.PojoSelectWithAdvFilter(pojoName,successCallback,advisorCode);
}

function fetchLeadDetails(arrayName,leadResponse){
	for(var j=0;j<leadResponse.length;j++){
		var responseInfo = leadResponse[j];
		responseInfo.issync = 0;
		responseInfo.iscomplete = 0;
		var dob = responseInfo.DOB;
		var act_time = responseInfo.Activity_Time;
		responseInfo.DOB = dob.substring(0,dob.indexOf(" "));
		responseInfo.Added_Date = changeAddedDate(responseInfo.Added_Date);
		if(responseInfo.Activity_Date){
			responseInfo.Activity_Date = changeAddedDate(responseInfo.Activity_Date);
			var act_date = responseInfo.Activity_Date;
			responseInfo.Activity_Date = act_date.substring(0,act_date.indexOf(" "));
			responseInfo.Activity_Date = ChangeDateFormat(responseInfo.Activity_Date);
		}else{
			responseInfo.Activity_Date = "";
		}
		responseInfo['roworder'] = arrayName.length;
		arrayName.push(responseInfo);
	}
	return arrayName;
}

var toggleid = 0;
function toggleView(e){
	NewBusinessView.hide();
	RecruitmentView.hide();
	ExistingAdvView.hide();
	LMSbranchView.hide();
	RenewalsView.hide();
	toggleid = e.newToggled;
	switch(e.newToggled){
		case 0:
			NewBusinessView.show();
			break;
		case 1:
			RecruitmentView.show();
			break;
		case 2:
			RenewalsView.show();
			break;
		case 3:
			ExistingAdvView.show();
			break;
		case 4:
			LMSbranchView.show();
			break;
	} 
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
	}
}

function getSortBy(e){
	$(function() {
	    $('#filterList-listsort').prop('selectedIndex',0);
	});
	optionselectedforsort = e.target.value;
	if(optionselectedforsort == "Name"){
		$m.juci.dataset("options3",["Select","A to Z","Z to A"]);
		$m.juci.dataset("selectcatogory",["Select","A to Z","Z to A"]);
	}else if(optionselectedforsort == "Date"){
		$m.juci.dataset("options3",["Select","Oldest to Newest","Newest to Oldest"]);
		$m.juci.dataset("selectcatogory",["Select","Oldest to Newest","Newest to Oldest"]);
	}	
}

function getSearchBy(e){
	$(function() {
	    $('#filterList-sort').prop('selectedIndex',0);
	});
	$(function() {
	    $('#filterList-advisorsearch').prop('selectedIndex',0);
	});
	optionselectedforsearch = e.target.value;
	switch(optionselectedforsearch){
		case "Advisor Name" : $m.juci.dataset("searchdisableenable",true);
							  $m.juci.dataset("dateRange",false);
							  var advisorAllList = ["Select"];
							  var advisorsList = $m.getPref("advisorList");
							  advisorsList = advisorAllList.concat(advisorsList);
							  $m.juci.dataset("advisorList",advisorsList);
							  $m.juci.dataset("dateRangeButton",false);
							 break;
		case "Date Range" : $m.juci.dataset("searchdisableenable",false);
							$m.juci.getControl("dateranger").value("");
							$m.juci.dataset("dateRange",true);
							$m.juci.dataset("dateRangeButton",true);
							break;
		case "All" : $m.juci.dataset("searchdisableenable",false);
					$m.juci.dataset("dateRangeButton",false);
					 getLeadListBySearch("All","0",0,0);
					 $m.juci.dataset("dateRange",false);
					 break;
	}
}

function getSearchedItem(e){
	var advisorName = e.target.value;
	advisorName = advisorName.toLowerCase();
	$m.putPref("advisorName",advisorName);
	$m.savePref();
}

function searchAdvisorsName(){
	var advisorName = $m.getPref("advisorName");
	var advisorCode = getAdvisorCode(advisorName);
	getLeadListBySearch("advisorsList",advisorCode);
}

function getDateRange(e){
	var fromDate = e.value[0];
	var toDate = e.value[1];
	var currentTime = new Date().getTime();
	fromDate = new Date(fromDate).getTime();
	toDate = new Date(toDate).getTime();
	var currentDate = new Date().toString('dd/MM/yyyy');
	var from_date = new Date(fromDate).toString('dd/MM/yyyy');
	var to_date = new Date(toDate).toString('dd/MM/yyyy');
	if((fromDate > currentTime > toDate)){
		$m.alert("Please enter valid date","",function(){
			$m.juci.getControl("dateranger").value(null);
			return;
		});
	}else if(to_date == from_date){
		$m.alert("Please enter valid date","",function(){
			$m.juci.getControl("dateranger").value(null);
			return;
		});
	}
}

function searchDateRange(){
	var fromDate = $m.juci.getControl("dateranger").value()[0];
	var toDate = $m.juci.getControl("dateranger").value()[1];
	fromDate = new Date(fromDate).getTime();
	toDate = new Date(toDate).getTime();
	getLeadListBySearch("dateRange","0",fromDate,toDate);
}

function getlistBySort(e){
	SortingArray =[];
	if(toggleid === 0){
		SortingArray = NewBusiness;
	}else if(toggleid == 1){
		SortingArray = Recruitment;
	}else if(toggleid == 2){
		SortingArray = Renewals;
	}else if(toggleid == 3){
		SortingArray = ExistingAdv;
	}
	var optionselcted = $m.juci.findById("filterList-listsort").el;
	var optionselcted = optionselcted.value;
	if(optionselectedforsort == "Date" && optionselcted == "Oldest to Newest"){
		sortArrayDate(SortingArray,"Asc");
	}else if(optionselectedforsort == "Date" && optionselcted == "Newest to Oldest"){
		sortArrayDate(SortingArray,"Desc")
	}
	else if(optionselectedforsort == "Name" && optionselcted == "A to Z"){
		sortArrayName(SortingArray,"Asc");

	}else if(optionselectedforsort == "Name" && optionselcted == "Z to A"){
	    sortArrayName(SortingArray,"Desc");
	}	
}

function sortArrayDate(SortingArray,order){
	SortingArray.sort(function(a,b){
		var firstDateFormat = ChangeFormat(a);
		var secondDateFormat = ChangeFormat(b);
		var firstTimeStamp = utils.SetTimeStamp(firstDateFormat);
		var secondTimeStamp = utils.SetTimeStamp(secondDateFormat);
		if(order == 'Asc')
	    	return utils.SetOrderAsc(firstTimeStamp,secondTimeStamp);
	    else
	    	return utils.SetOrderDesc(firstTimeStamp,secondTimeStamp);
	});
		AssignToDataset(SortingArray);
}

function sortArrayName(SortingArray,order){
	SortingArray.sort(function(a,b){
		var object1 = a.Name.toLowerCase();
		var object2 = b.Name.toLowerCase();
		if(order == 'Asc'){
			return utils.SetOrderAsc(object1,object2);
		}
		else{
			return utils.SetOrderDesc(object1,object2);
		}
	});
	AssignToDataset(SortingArray);
}

function AssignToDataset(SortingArray){
	var datasetInputs = "";
	if(toggleid === 0){
		datasetInputs ="newbusinessinputs";
	}else if(toggleid == 1){
		datasetInputs ="recriutmentinputs";
	}else if(toggleid == 2){
		datasetInputs ="renewlasinputs";
	}else if(toggleid == 3){
		datasetInputs ="existingAdvinputs";
	}else if(toggleid == 4){
		datasetInputs ="lmsBranchInputs";
	}
	$m.juci.dataset(datasetInputs,SortingArray);
}

function ChangeFormat(a){
	var dateNew = a.Added_Date;
    dateNew = datetime(dateNew);
	dateNew = dateNew.split("/");
	currdate=dateNew[1]+"/"+dateNew[0]+"/"+dateNew[2];
	return currdate;
}

function ChangeDateFormat(a){
	var dateNew = a;
	dateNew = dateNew.split("/");
	currdate=dateNew[1]+"/"+dateNew[0]+"/"+dateNew[2];
	return currdate;
}

var Sortmenu = false;
function showsortby(){
	$('#filterList-listsort').prop('selectedIndex',0);
	$('#filterList-sort').prop('selectedIndex',0);
	if(Sortmenu === true){
		$m.juci.findById("sortfiltr").hide();
		Sortmenu = false;
		$m.juci.findById("searchFilter").hide();
		Searchmenu = false;
		$m.juci.findById("dateranger").hide();
		Searchmenu = false;
	}
	else{
		$m.juci.findById("sortfiltr").show();
		Sortmenu = true;
		$m.juci.findById("searchFilter").hide();
		Searchmenu = false;
		$m.juci.findById("dateranger").hide();
		Searchmenu = false;
	}
}

var Searchmenu = false;
function showsearchby(){
	$('#filterList-sort').prop('selectedIndex',0);
	$("#filterList-listsort").bind("click", function () {
            $("#filterList-search")[0].selectedIndex = 0;
    });
	if(Searchmenu === true){
		$m.juci.findById("sortfiltr").hide();
		Sortmenu = false;
		$m.juci.findById("searchFilter").hide();
		Searchmenu = false;
		$m.juci.findById("dateranger").hide();
		Searchmenu = false;
	}
	else{
		$m.juci.findById("sortfiltr").hide();
		Sortmenu = false;
		$m.juci.findById("searchFilter").show();
		Searchmenu = true;
		$m.juci.findById("dateranger").hide();
		Searchmenu = true;
	}
}

function datetime(date) {
	var date = new Date(date);
    var dt = date.getDate();
    var m = date.getMonth() + 1;
   // mon = monthNames[date.getMonth()];
    var y = date.getFullYear();
    newdate = ((dt < 10) ? ("0" + dt) : dt) + "/" 
	+ ((m < 10) ? ("0" + m) : m) 
	+ "/" +y ; 
    return  newdate ;
}

function opentest(){
	$m.open("test","/Input Management/testbutton.html");
}

function sortingArrayDate(arrayData){
	arrayData.sort(function(a,b)
	{
	    a = new Date(a.Added_Date);
	    b = new Date(b.Added_Date);
	    return b-a;
	});
	AssignToDataset(arrayData);
}

function showElapsedTime(time,servicename){
	var elaspedtime = (devicestarttime - time)/1000.0;
	console.log(servicename + " elasped time : " + JSON.stringify(elaspedtime));
	console.log(servicename + " elasped time : " + JSON.stringify(elaspedtime));
//	var attendencelog  = servicename + " elasped time : " + JSON.stringify(elaspedtime) +" ";
//	setLogs(attendencelog);
}

function getAdvisorCode(advisorName){
	var advisorList = $m.getPref("advisorsDetails");
	for(var i= 0; i<advisorList.length;i++){
		var smallCase = advisorList[i].name;
		smallCase = smallCase.toLowerCase();
		if(smallCase == advisorName){
			return advisorList[i].code;
		}
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
	})
}

function getLeadListBySearch(searchType,advisorCode,fromDate,toDate){
	var today = new Date();
	var priorDate = new Date().setDate(today.getDate()-30);
	today = today.getTime();
	$m.showProgress("Fetching Data from Server...");
	if($m.networkConnected()){
			switch(searchType){
				case "advisorsList" :callLeadDataAdvisor(advisorCode);
									break;
				case "dateRange" :callLeadDateRange(fromDate,toDate);
									break;
				case "All":callLeadDataAll();
							break;
				default :callLeadData(priorDate,today);
						break;
			}
	}else{
		var networkCallback = function(){
			loadDatafromDB("inputPojo");
		};
		$m.alert("No Internet connection!","Network Error",networkCallback);
	}
}

function callLeadData(fromDate,toDate){
	NewBusiness = [];
	Recruitment = [];
	ExistingAdv = [];
	LMSBranch = [];
	Renewals = [];
	var inputArray= [];
	var sapcode = $m.getUserAccount().customProperties.Login_Code;
	service = new ServiceLibrary();
	setTimeout(function() {
		var serviceCallBack = function(response){
				if(response.code){
					loadDatafromDB("inputPojo");
					$m.hideProgress();
				}
				if(response.length){
					for(var k = 0;k<response.length;k++){
						var leadTypeRes = response[k].LeadInfo;
						fetchLeadDetails(inputArray,leadTypeRes);	
					}
					var inputCallback = function(){
						loadDatafromDB("inputPojo");
//							var aadharCallback = function(res){
//								var aadharpPojoCallback = function(res){
//									//$m.logInfo("Successfully inserted..");
//								};
//								utils.PojoMultiReplace("Customer_Aadhar_Details",res,aadharpPojoCallback);
//					   		};
				      	 //fireRequestInput("getEkycBySapCode",sapcode,aadharCallback);
				      	var today = new Date();
						var firstDay = new Date().setDate(today.getDate()-30);
						var formatDate = new Date(firstDay);
						var lastMonthDate = formatDate.setHours(0,0,1,0);
						var currentDate = utils.GetTimeStamp();
						var currentDateString = new Date(currentDate);
						var currentTimeStamp = currentDateString.setHours(0,0,1,0);
				      	//service.getEKYCBySAP(lastMonthDate,currentTimeStamp,aadharCallback);
					};
					inputPojo.prototype.remove(function(suc){
						utils.PojoMultiReplace("inputPojo",inputArray,inputCallback);
					}, function(fail){
						console.log(fail);
					});
				}else{
					$m.alert("No data found");
					$m.hideProgress();
				}
			};
			service.GetinputCount(fromDate,toDate,serviceCallBack);
	},1000);
}

function callLeadDataAll(){
	NewBusiness = [];
	Recruitment = [];
	ExistingAdv = [];
	Renewals = [];
	var inputArray= [];
	service = new ServiceLibrary();
	var sapcode = $m.getUserAccount().customProperties.Login_Code;
	setTimeout(function() {
		var serviceCallBack = function(response){
				if(response.code){
					loadDatafromDB("inputPojo");
					$m.hideProgress();
				}
				if(response.length){
					for(var k = 0;k<response.length;k++){
						var leadTypeRes = response[k].LeadInfo;
						fetchLeadDetails(inputArray,leadTypeRes);	
					}
					var inputCallback = function(){
						loadDatafromDB("inputPojo");
//							var aadharCallback = function(res){
//								var aadharpPojoCallback = function(res){
//								//	$m.logInfo("Successfully inserted..");
//								};
//								utils.PojoMultiReplace("Customer_Aadhar_Details",res,aadharpPojoCallback);
//					   		};
				      	 //fireRequestInput("getEkycBySapCode",sapcode,aadharCallback);
				      	var today = new Date();
						var firstDay = new Date().setDate(today.getDate()-30);
						var formatDate = new Date(firstDay);
						var lastMonthDate = formatDate.setHours(0,0,1,0);
						var currentDate = utils.GetTimeStamp();
						var currentDateString = new Date(currentDate);
						var currentTimeStamp = currentDateString.setHours(0,0,1,0);
				      	//service.getEKYCBySAP(lastMonthDate,currentTimeStamp,aadharCallback);
					};
					inputPojo.prototype.remove(function(suc){
						utils.PojoMultiReplace("inputPojo",inputArray,inputCallback);
					}, function(fail){
						console.log(fail);
					});
				}else{
					$m.alert("No data found");
					$m.hideProgress();
				}
			};
			service.GetinputCountDefault(serviceCallBack);
	},1000);
}

function callLeadDateRange(fromDate,toDate){
	NewBusiness = [];
	Recruitment = [];
	ExistingAdv = [];
	LMSBranch = [];
	Renewals = [];
	var inputArray= [];
	service = new ServiceLibrary();
	var sapcode = $m.getUserAccount().customProperties.Login_Code;
	setTimeout(function() {
		var serviceCallBack = function(response){
				if(response.code){
					loadDatafromDB("inputPojo");
					$m.hideProgress();
				}
				if(response.length){
					for(var k = 0;k<response.length;k++){
						var leadTypeRes = response[k].LeadInfo;
						fetchLeadDetails(inputArray,leadTypeRes);	
					}
					var inputCallback = function(){
						loadDatafromDB("inputPojo");
//							var aadharCallback = function(res){
//								var aadharpPojoCallback = function(res){
//								//	$m.logInfo("Successfully inserted..");
//								};
//								utils.PojoMultiReplace("Customer_Aadhar_Details",res,aadharpPojoCallback);
//					   		};
				      	 //fireRequestInput("getEkycBySapCode",sapcode,aadharCallback);
				      	 var today = new Date();
						var firstDay = new Date().setDate(today.getDate()-30);
						var formatDate = new Date(firstDay);
						var lastMonthDate = formatDate.setHours(0,0,1,0);
						var currentDate = utils.GetTimeStamp();
						var currentDateString = new Date(currentDate);
						var currentTimeStamp = currentDateString.setHours(0,0,1,0);
				      	//service.getEKYCBySAP(lastMonthDate,currentTimeStamp,aadharCallback);
					};
					inputPojo.prototype.remove(function(suc){
						utils.PojoMultiReplace("inputPojo",inputArray,inputCallback);
					}, function(fail){
						console.log(fail);
					});
				}else{
					$m.alert("No data found");
					$m.hideProgress();
				}
			};
			service.GetinputCount(fromDate,toDate,serviceCallBack);
	},1000);
}



function callLeadDataAdvisor(advisorCode){
	NewBusiness = [];
	Recruitment = [];
	ExistingAdv = [];
	LMSBranch = [];
	Renewals = [];
	var inputArray= [];
	service = new ServiceLibrary();
	setTimeout(function() {
		var serviceCallBack = function(response){
				if(response.code){
					loadAdvisorDatafromDB("inputPojo",advisorCode);
					$m.hideProgress();
				}
				if(response.length){
					for(var k = 0;k<response.length;k++){
						var leadTypeRes = response[k].LeadInfo;
						fetchLeadDetails(inputArray,leadTypeRes);	
					}
					var inputCallback = function(){
						loadAdvisorDatafromDB("inputPojo",advisorCode);
						$m.juci.getControl("searchbox").value("");
					};
					inputPojo.prototype.remove(function(suc){
						utils.PojoMultiReplace("inputPojo",inputArray,inputCallback);
					}, function(fail){
						console.log(fail);
					});
				}else{
					$m.alert("No data found");
					$m.hideProgress();
					$m.juci.getControl("searchbox").value("")
				}
			};
			service.GetinputCountAdvisor(advisorCode,serviceCallBack);
	},1000);
}

function onCallClick(event) {
	var callData = event.data;
	console.log(callData);
	var makeCallCallback = function(res) {
		if(res.code == 1){
			var Call_Start_Time = res.result.startTime;
			var Call_End_Time = res.result.endTime;
				var data = {
					"Call_Start_Time" : Call_Start_Time,
					"Call_End_Time"	: Call_End_Time,
					"Total_Duration": utils.GetTodaysDate(Call_Start_Time) - utils.GetTodaysDate(Call_End_Time),
					"Added_By"	: $m.getUsername(),
					"Customer_name":callData.Name,
					"Destination_Mobile":res.result.to,
					"Lead_ID":callData.Lead_Id,
					"Log_Type":"CALL",
					"Latitude":callData.Latitude,
					"Longitude":callData.Longitude,
					"User_Role":gettype()
				};
				console.log(data);
				saveCallRecord(data);
		} else if(r.code == 0) {
			$m.alert(r.error.message);
		}
	};
	$m.makeCall(callData.Mobile,makeCallCallback);
}

function saveCallRecord(data) {
	service = new ServiceLibrary();
		var contactDetailsCallback = function(res) {
			if(res.Status != "Y"){
				$m.logError("recored failed due to"+res);
			} else {
				$m.toast(res.Message);
			}
		};
	service.saveContactAgentDetails(contactDetailsCallback,data);
}

function onMessageClick(event) {
	messageData = event.data;
	console.log(messageData);
	$m.juci.dataset("displayName",messageData.Name);
	$m.juci.dataset("new_message","");
	utils.ShowDialog("message-inbox");	
}

function closedialog(id){
	utils.HideDialog(id);
}

var smsCallback = function (res) {
	console.log(res);
};

function onSendMessage(e) {
	var message = $m.juci.dataset("new_message");
	if(message == "") {
		$m.alert("Enter Your Message");
		return;
	}
	var eventData = ko.toJS(e);
	console.log(eventData);
	var textMsg = $m.juci.dataset("new_message");
	var messageNumber = messageData.Mobile;
	var customerName = messageData.Name;
	sendSms(messageNumber,textMsg,customerName,smsCallback);	
}

function sendSms(messageNumber,textMessage,customerName,callback) {
	var sendBgSmsCallback = function(res) {
		if(res.code == 1) {
			var delivered_time = res.result.delivered_time;
			callback(delivered_time);
			$m.toast("Message Delivered successfully");
			var messageDataObj = {
				"Log_Type":"SMS",
				"Added_By": $m.getUsername(),
				"Customer_name":customerName,
				"SMS_Send_Time":delivered_time,
				"Message_Text":textMessage,
				"User_Role":gettype(),
				"Destination_Mobile":parseInt(messageNumber),
				"Lead_ID":messageData.Lead_Id,
				"Log_Type":"SMS",
				"Latitude":messageData.Latitude,
				"Longitude":messageData.Longitude,
			};
			saveCallRecord(messageDataObj);
			closedialog("message-inbox");
			console.log(messageDataObj);
		} else {
			$m.alert(res.result);
			$m.logError("recored failed due to"+res);
		}
	};
	$m.sendBgSms(messageNumber,textMessage,"",{"timeout":"10000"},sendBgSmsCallback);
}

function openLpcDetails(e){
	$m.showProgress("Please wait....LPC details are Loading");
	var lead_id = e.data.Lead_Id;
	
	console.log(lead_id);
	var policyArray = [];
	service = new ServiceLibrary();
	setTimeout(function() {
		var serviceCallBack = function(response){
			var policyDetails = response.PolicyLeads;
				if(policyDetails == null || policyDetails == [] || policyDetails.length == 0){
					$m.alert(response.Message);
					$m.hideProgress();
				}else{
					if(policyDetails.length){
						for(var k = 0;k<policyDetails.length;k++){
							var policyInfo = policyDetails[k];
							fetchPolicyDetails(policyArray,policyInfo);	
						}
						var exceptionCallback = function(){
							loadPolicyDatafromDB("saveLPCDetails");
							utils.ShowDialog('lpc-details');
						};
						utils.PojoMultiReplace("saveLPCDetails",policyArray,exceptionCallback);
					}
				}
			};
			service.getLPCdetails(lead_id,serviceCallBack);
	},500);
}

function closeAuthenticate(){
	utils.HideDialog('lpc-details');
}

function fetchPolicyDetails(policyArray,policyInfo){
	policyInfo.issync = 0;
	policyInfo.iscompleted = 0;
	policyArray.push(policyInfo);
}

function loadPolicyDatafromDB(pojoName){
	$m.showProgress("Loading Data from Local...");
	var successCallback = function(success_response){
		var result = success_response.rows;	
		$m.juci.dataset("lpcDetails",result);
		$m.hideProgress();
	}
	utils.PojoSelectWithFilter(pojoName,successCallback,1);
}

function changeAddedDate(added_date){
	if(added_date != ""){
		var addedSplit = added_date.split(" ");
		var dateFormat = addedSplit[0];
		var updated_date = new Date(dateFormat).getDate() <10 ? '0'+new Date(dateFormat).getDate() : new Date(dateFormat).getDate();
		var updated_month = new Date(dateFormat).getMonth() + 1;
		updated_month = updated_month < 10 ? '0'+updated_month : updated_month;
		var year = new Date(dateFormat).getFullYear();
		var updated_dates = updated_month+"/"+updated_date+"/"+year ;
		var fullDate = updated_dates + " " + addedSplit[1] + " " +addedSplit[2];
		return fullDate;
	}else{
		return "";
	}
}

function openViewDetails(e){
	$m.showProgress("Please wait....Details are Loading");
	var lead_id = e.data.Lead_Id;
	console.log(lead_id);
	var ViewDetailsArray = [];
	service = new ServiceLibrary();
	setTimeout(function() {
		var serviceCallBack = function(response){
			var policyDetails = response.lstRedPolicyLeads;
				if(policyDetails == null || policyDetails == [] || policyDetails.length == 0){
					$m.alert("No data found");
					$m.hideProgress();
				}else{
					if(policyDetails.length){
						for(var k = 0;k<policyDetails.length;k++){
							var viewInfo = policyDetails[k];
							fetchViewDetails(ViewDetailsArray,viewInfo);	
						}
						var exceptionCallback = function(){
							loadViewDatafromDB("saveViewDetails");
							utils.ShowDialog('view-details');
						};
						utils.PojoMultiReplace("saveViewDetails",ViewDetailsArray,exceptionCallback);
					}
				}
			};
			service.getViewDetails(lead_id,serviceCallBack);
	},500);
}

function fetchViewDetails(ViewDetailsArray,viewInfo){
	viewInfo.issync = 0;
	viewInfo.iscompleted = 0;
	ViewDetailsArray.push(viewInfo);
}

function loadViewDatafromDB(pojoName){
	$m.showProgress("Loading Data from Local...");
	var successCallback = function(success_response){
		var result = success_response.rows;	
		for(var i =0 ;i < result.length; i++){
			result[i].DUE_DATE = convertDateFormat(result[i].DUE_DATE);
		}
		$m.juci.dataset("viewDetails",result);
		$m.hideProgress();
	}
	utils.PojoSelectWithFilter(pojoName,successCallback,1);
}
function closeAuthenticateView(){
	utils.HideDialog('view-details');
}
function convertDateFormat(date){
	if(date){
		return new Date(date).toString("dd/MM/yyyy");
	}else{
		return '-';
	}

}