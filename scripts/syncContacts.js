/**
 * syncContacts.js
 * @author CloudPact Technologies
 * @description : This script is used for syncing the personal contacts
 **/
var dbHelper;
var pageSize = 20;
var navigationPage = 1;
var firstPage = 1;
var TotalPages;
var currDtl, currDtlIdx;
var contactLength;
var finalcontactLength;
var disabledList = [];
var responseContactList;
var devicestarttime;
var startCount = 0;
var displayList;
var callData;
var messageData;
var selectedContactsList = [];
var latitude;
var longitude;
var selectedName = [];
var selectedList = [];
var annualIncome,occupationValue,age_group;

$m.juci.addDataset("displayName","");
$m.juci.addDataset("new_message","");
$m.juci.addDataset("selectAll",false);
$m.juci.addDataset("showLoadMore",false);
$m.juci.addDataset("showListContainer",false);
$m.juci.addDataset("pageCounter",
	{
		"currentpage" : 0,
		"totalpage" : 0
	}
);
$m.juci.addDataset("contactList",[]);
$m.juci.addDataset("selectedList","");
$m.juci.addDataset("fullContactList",[]);
$m.juci.addDataset("ageGroup",["18-25 years","26-35 years","35-45 years",">45 years"]);
$m.juci.addDataset("income",["Upto 5 Lacs","5-10 Lacs","10-25 Lacs","More than 25 Lacs"]);
$m.juci.addDataset("occupation",["Salaried","Self Employed","Business","Others"]);


$m.onReady(function(){
	$m.juci.dataset('headerName',"Sync Contacts");
//	$m.juci.getControl("contact-list").addListItemClick(onCallContactClick, this, ".call_button");
});

function getCurrentLocation() {
	getLocationCallback = function(response) {
		latitude = response.result.position.coords.latitude;
		longitude = response.result.position.coords.longitude;
	};
	$m.getLocation(getLocationCallback);
}

$m.onResume(function(){
	selectedContactsList = [];
	selectedList = [];
	getCurrentLocation();
	initializeValues();
});

function initializeValues(){
	pageSize = 20;
	startCount = 0;
	disabledList = [];
	navigationPage = 1;
	$m.juci.addDataset("selectAll",false);
	$m.juci.addDataset("showListContainer",false);
	$m.juci.getControl("searchbox").value("");
	devicestarttime = utils.GetTimeStamp();
	$m.showProgress("Please wait, loading contact details...");
	initResume();
}

$m.onData(function(eventObject){
	eventObject.hideProgress = false;
});

$m.onResult(function(eventObject){
	eventObject.hideProgress = false;
});

function initResume(){
	//call api and get objects
	$m.getContacts(function(r){
		//$m.logInfo("contacts:"+r);
		if(r.code == 1){
			responseContactList = r.result;
			//formatting list
			formatContactList();
			responseObj = responseContactList;
			//load server data into local
			NewBusiness = [];
			Recruitment = [];
			ExistingAdv = [];
			var inputArray= [];
			var today = new Date();
			var priorDate = new Date().setDate(today.getDate()-30);
			today = today.getTime();
			$m.showProgress("Fetching Data...");
			if(dbHelper){
				if($m.networkConnected()){
					service = new ServiceLibrary();
					var serviceCallBack = function(response){
						if(response.code){
							//loadDatafromDB("inputPojo");
							fetchDatatoDisplay();
							$m.hideProgress();
						}
						if(response.length){
							for(var k = 0;k<response.length;k++){
								var leadTypeRes = response[k].LeadInfo;
								fetchLeadDetails(inputArray,leadTypeRes);	
							}
							var inputCallback = function(){
								//loadDatafromDB("inputPojo");
								fetchDatatoDisplay();
							};
							utils.PojoMultiReplace("inputPojo",inputArray,inputCallback);
						}else{
							fetchDatatoDisplay();
						}
					};
					service.GetinputCount(priorDate,today,serviceCallBack);
				}else{
					var networkCallback = function(){
						//loadDatafromDB("inputPojo");
						fetchDatatoDisplay();
					};
					$m.alert("No Internet connection!","Network Error",networkCallback);
				}
		   }
			else{
				$m.hideProgress();
				$m.alert("Error while opening database");
			}
		}
		else{
			$m.alert("No Contacts to show");
			$m.hideProgress();
		}
	});
}

function fetchDatatoDisplay(){
	var successCallback = function(success_response){
		var inserPojolistItem = success_response.rows;
		var saveLeadsuccessCallback = function(success_response){
			var saveleadlistItem = success_response.rows;
			//compare resplist with localdb ,if name exists for current month push that resplist into disablelist
			contactLength = responseContactList.length;	
			
			//comparison in inputpojo table
			if(inserPojolistItem.length !== 0){
				for(var i=0 ; i<contactLength ; i++){
					//var name =  formatName(responseContactList[i].Name);
					for(var j=0 ; j<inserPojolistItem.length ; j++){
						var currentMonth = new Date().getMonth()+1;
						var addedMonth = extractMonth(inserPojolistItem[j].Added_Date);
						if(inserPojolistItem[j].Mobile == responseContactList[i].phone1 && addedMonth == currentMonth){
							disabledList.push(responseContactList[i]);	
						}
					}
				}
			}
			//comparison in saveNewLead table
			if(saveleadlistItem.length !== 0){
				for(var i=0 ; i<contactLength ; i++){
					//var name =  formatName(responseContactList[i].Name);
					for(var j=0 ; j<saveleadlistItem.length ; j++){
						var currentMonth = new Date().getMonth()+1;
						var addedMonth = extractMonth(saveleadlistItem[j].Added_Date);
						if(saveleadlistItem[j].Mobile == responseContactList[i].phone1 && addedMonth == currentMonth){
							disabledList.push(responseContactList[i]);	
						}
					}
				}
			}
			
			if(disabledList.length !== 0){
				removeDupfromDisabledlist();
				removeDisabledList();
			}
			//$m.logInfo("Final contact List:"+responseContactList);
			finalcontactLength = responseContactList.length;
			
			//pagination
			doPagination(responseContactList);
			
			$m.juci.addDataset("showListContainer",true);
			$m.hideProgress();
		};
		var saveLeadfailureCallback = function(failure_response){
			console.log(failure_response);
		};
		saveNewLead.Select(saveLeadsuccessCallback,saveLeadfailureCallback);
	};
	utils.PojoSelectWithFilter("inputPojo",successCallback,1);
}

function doPagination(responseList){
	/*Pagination*/
	displayList = responseList;
	var totalList = responseList;//response data
	totalListLength = totalList.length;
	TotalPages = Math.ceil(totalListLength/pageSize);
	if(TotalPages > 1){
		if(navigationPage == 1){
			currentPage = 1;
			startSize = 0;
			endSize = pageSize;
			displayData(startSize,endSize);
		}
	}
	else{
		var pageCount = [];
		var obj = {
			"currentpage" : 1,
			"totalpage" : TotalPages
		};
		pageCount.push(obj);
		$m.juci.dataset("pageCounter",obj);
		$m.juci.dataset("contactList",responseList);
	}
}

//next button
function next(){
	scroll(0,0);
	currentPage = currentPage + 1;
	navigationPage = navigationPage + 1;
	
	//updating the status of list(whether selected or not while moving forward and backward)
	var bindedContactList = $m.juci.dataset("contactList");
	var start = startSize;
	var end = endSize;
	for(var i=0 ; i<bindedContactList.length ; i++){
		responseContactList[start].selectValue = bindedContactList[i].selectValue;
		start = start +1;
	}
	
	if(currentPage > TotalPages){
		currentPage = currentPage - 1;
		navigationPage = navigationPage -1;
		$m.toast("Last page");
	}
	else if(currentPage == TotalPages){
		currentPage = currentPage;
		startSize = endSize;
		endSize = totalListLength;
		if($m.juci.dataset("selectAll") === true){
			$m.juci.dataset("selectAll",false);
		}
		displayData(startSize,endSize);
	}else{
		currentPage = currentPage;
		startSize = endSize;
		endSize = startSize+20;
		if($m.juci.dataset("selectAll") === true){
			$m.juci.dataset("selectAll",false);
		}
		displayData(startSize,endSize);
	}
}

//previous button
function previous(){
	scroll(0,0);
	currentPage = currentPage - 1;
	navigationPage = navigationPage - 1;
	
	//updating the status of list(whether selected or not while moving forward and backward)
	var bindedContactList = $m.juci.dataset("contactList");
	var start = startSize;
	var end = endSize;
	for(var i=0 ; i<bindedContactList.length ; i++){
		responseContactList[start].selectValue = bindedContactList[i].selectValue;
		start = start +1;
	}
	
	if(currentPage === 0){
		currentPage = currentPage +1;
		navigationPage = navigationPage +1;
		$m.toast("First page");
	}
	else if(currentPage == firstPage){
		currentPage = currentPage;
		startSize = 0;
		endSize = pageSize;
		if($m.juci.dataset("selectAll") === true){
			$m.juci.dataset("selectAll",false);
		}
		displayData(startSize,endSize);
	}
	else{
		currentPage = currentPage;
		endSize = startSize;
		startSize = endSize-20;
		if($m.juci.dataset("selectAll") === true){
			$m.juci.dataset("selectAll",false);
		}
		displayData(startSize,endSize);
	}
}

function displayData(start,end){
	//bind pagecount
	var pageCount = [];
	var obj = {
		"currentpage" : currentPage,
		"totalpage" : TotalPages
	};
	pageCount.push(obj);
	$m.juci.dataset("pageCounter",obj);
	
	//bind dataset
	var displaydata = displayList;
	displaydata = displaydata.slice(start,end);
	$m.juci.dataset("contactList",displaydata);
}

function selectAllcheckBox(){
	var selectallvalue = $m.juci.dataset("selectAll");
	var selectObj = $m.juci.dataset("contactList");
	for(var i=0; i<selectObj.length ; i++){
		selectObj[i].selectValue = selectallvalue;
	}
	$m.juci.dataset("contactList",selectObj);
}

function showlistitem(e){
	var	currentindex = e.target.id;
	var index = currentindex.slice(2,currentindex.length);
	var contentid = "less"+index;
	if(currDtl){
		document.getElementById(currDtl).style.display = "none";
		document.getElementById(lastindex).innerHTML = "Show more";
		if(currDtlIdx === index){
			currDtlIdx = null;
			currDtl = null;
			return;
		}
	}
	currDtlIdx = index;
	currDtl	= "less"+ currDtlIdx;
	document.getElementById(currDtl).style.display = "block";
	lastindex = currentindex;
	document.getElementById(currentindex).innerHTML = "Show less";
}

function formatContactList(){
	var respContactLength = responseContactList.length;
	for(var i=0 ; i<respContactLength ; i++){
		
		//adding selectValue and name parameter
		responseContactList[i].Name = formatName(responseContactList[i].displayName);
		responseContactList[i].selectValue = false;
		responseContactList[i].selectedMonth = "";
		responseContactList[i].disableItem = 0;
		
		//only 1st phone , address , email 
		if(responseContactList[i].phoneNumbers.length === 0){
			responseContactList[i].phone1 = "NA";
			responseContactList[i].email = "NA";
			responseContactList[i].address = "NA";
		}
		else if(responseContactList[i].phoneNumbers){
			var numberDetails = responseContactList[i].phoneNumbers[0];
			responseContactList[i].phone1 = numberDetails.phoneNumber ? numberDetails.phoneNumber : "NA";
			responseContactList[i].email = numberDetails.email ? numberDetails.email : "NA";
			responseContactList[i].address = numberDetails.address ? numberDetails.address : "NA";
		}
	}
}

function createLead(){
	var allList = $m.juci.dataset("contactList");
	for(var i= 0 ; i<allList.length ; i++){
		if(allList[i].selectValue === true){
			selectedList.push(allList[i]);
		}
	}
	var selectedListLength = selectedList.length;
	if(typeof selectedListLength == "undefined"){
		SaveLeadDetails(selectedList);
	}
	else if(selectedListLength === 0){
		$m.alert("Please select atleast one contact");
	}
	else{
		for(var j=0; j<selectedList.length ; j++){
			if(!selectedList[j].AgeGroup || !selectedList[j].Occupation || !selectedList[j].Income){
				$m.alert("Please enter value");
				return;
			}else if(selectedList[j].selectValue == false){
				if(contactDetails[j].AgeGroup){
					delete contactDetails[i].AgeGroup;
				}
				if(contactDetails[j].Occupation){
					delete contactDetails[j].Occupation;
				}
				if(contactDetails[j].Income){
					delete contactDetails[j].Income;
				}
				if(contactDetails[j].syncedValue){
					delete contactDetails[j].syncedValue;
				}
			}else{
				
			}
		}
		var responseCallback = function(r) {
			selectedList.splice(0,1);
			if(selectedList.length){
				SaveLeadDetails(selectedList[0],responseCallback);	
			}
		}
		if(selectedList.length){
			SaveLeadDetails(selectedList[0],responseCallback);	
		}
	}
}


function SaveLeadDetails(leadData,responseCallback){
	var deviceCallback = function(response) {
		var datasetData = {};
		var deviceId = response.result;
		var locationCallback = function(lat, long) {
			datasetData.Latitude = lat;
			datasetData.Longitude = long;
			datasetData.Name = leadData.Name.substr(0,1).toUpperCase() + leadData.Name.substr(1).toLowerCase();
			datasetData.DOB = 915129000000;
			datasetData.Educational_Background = "Others";
			if(gettype() == "AGSM"){
				datasetData.Lead_Type = "Recruitment";
				datasetData.Lead_Source = "Recruitment";
			} else {
				datasetData.Lead_Type = "New Business";
				datasetData.Lead_Source = "New Business";	
			}
			datasetData.Dependents = "Up to 2";
			datasetData.Income = leadData.Income ? leadData.Income.Description : "Up to 3 Lacs";
			datasetData.Occupation = leadData.Occupation ? leadData.Occupation.Description :"Others";
			datasetData.Marital_Status = "Single";
			datasetData.Campaign = "Children";
			datasetData.Device_Id = deviceId;
			datasetData.Reference_LeadID = 0;
			datasetData.AgeGroup = leadData.AgeGroup;
			datasetData.Sync_Txn_Id = 1494846765099;
			datasetData.Lead_Id = utils.GetRandomNum();
			if(gettype() !=='AGADV'){
				datasetData.Added_By = utils.GetLoginCode();
				datasetData.Advisor_Code = "";
			}else{
				datasetData.Advisor_Code = utils.GetLoginCode();
				datasetData.Added_By = utils.GetLoginCode();
			}
			datasetData.Sync_by = utils.GetLoginCode();
			datasetData.Aadhaar = "";
			datasetData.Address = leadData.address;
			datasetData.Address_1 = "";
			datasetData.Address_2 = "";
			datasetData.Address_3 = "";
			datasetData.City = "Mumbai";
			datasetData.Commute_Time = "~5";
			datasetData.Email_ID = leadData.email;
			datasetData.Gender = "Male";
			datasetData.Landline = "";
			datasetData.Lead_Category = "";
			datasetData.Lead_Status = "";
			if(gettype() !=='AGADV'){
				datasetData.Lead_Sub_Source = "Goldmine";
				datasetData.Lead_Sub_Type = "Candidate - Recruitment prospect";	
			} else {
				datasetData.Lead_Sub_Source = "Self Sourced lead";
				datasetData.Lead_Sub_Type = "New Prospect";	
			}
			datasetData.Mobile = leadData.phone1;
			datasetData.Pin_Code = "999999";
			datasetData.Source_From = "TAB";
			datasetData.State = "MAHARASHTRA";
			datasetData.Reference_YN = "N";
			datasetData.Lead_From_Contact_List = "Y";
			datasetData.Added_Date = formatDate(new Date());
			datasetData.issync = "0";
			datasetData.iscompleted = "1";
			if (dbHelper) {
				var Obj = new saveNewLead(datasetData);
				var insertCallback = function() {
						//$m.logInfo("Successfully inserted!");
						if($m.networkConnected()){
							$m.showProgress("Syncing data..");
							delete datasetData.Added_Date;
							var service = new ServiceLibrary();
							var callback = function(res) {
								if (res.Status == "Y") {
						            //$m.logInfo("Lead Details inserted successfully");
						            responseCallback("Y");
						            $m.alert("Lead Details inserted successfully to server");
						            var appfilter = new DB.Filter.equal("Sync_Txn_Id", "'" + res.Sync_Txn_Id + "'");
									var data = {
										"issync" : "1"
									}
									saveNewLead.updateSync(data, appfilter, function(){
										$m.alert("Updated Successfully");
										removeCreatedLeadContact(datasetData);
									});		
						        } else {
						            $m.logError("Failed to insert New Lead response is" + ' ' + res.Status);
						            $m.alert("Failed to insert New Lead response is" + ' ' + res.Status);
						        }
						        $m.juci.dataset("selectAll",false);
								$m.hideProgress();
								uncheckContacts();
							};   
//							fireRequestInput("SaveLead", datasetData, callback);
							service.saveNewLead(callback,datasetData);
						}
					   else{
					   	$m.alert(messages.NoNetworkConnectivity);
					  }
		    	};
				utils.PojoInsertQuery("saveNewLead", insertCallback, Obj);
			}
			else {
				$m.alert("Error while opening database");
			}
		};
		utils.GetLocation(2000,true,locationCallback);
	};
	utils.GetDeviceId(deviceCallback);
}

function removeCreatedLeadContact(leadData){
	for(var i=0 ; i<responseContactList.length ; i++){
		var name =  formatName(responseContactList[i].Name); 
		if(name == leadData.Name){
			responseContactList.splice(i,1);
			i--;
		}
	}
	recalculateData();
}

function recalculateData(){
	$m.juci.getControl("searchbox").value("");
	navigationPage = 1;
	currentPage = 1;
	//uncheck ckecked list
	for(var i=0 ; i<responseContactList.length ; i++){
		responseContactList[i].selectValue = false;
	}
	var totalList = responseContactList;//response data
	totalListLength = totalList.length;
	TotalPages = Math.ceil(totalListLength/pageSize);
	if(TotalPages > 1){
		if(navigationPage == 1){
			currentPage = 1;
			startSize = 0;
			endSize = pageSize;
			//assigning all values after contact is selected and inserted
			displayList = responseContactList;
			displayData(startSize,endSize);
		}
	}
	else{
		$m.juci.dataset("contactList",responseContactList);
	}
}


function uncheckContacts(){
	var contacts = $m.juci.dataset("contactList");
	for(var i=0 ; i<contacts.length ; i++){
		contacts[i].selectValue = false;
	}
	$m.juci.dataset("contactList",contacts);
}

function formatDate(date){
	dd = date.getDate();
	mm = date.getMonth()+1;
	yy = date.getFullYear();
	if(dd <= 9){
		dd = "0"+dd;
	}
	if(mm <= 9){
		mm = "0"+mm;
	}
	return mm+"/"+dd+"/"+yy;
}
function extractMonth(date){
	var date = new Date(date);
	date = date.getMonth()+1;
	return date;
}
function formatName(name){
	var Name = name.substr(0,1).toUpperCase() + name.substr(1).toLowerCase();
	return Name;
}
function removeDupfromDisabledlist(){
	for(var i=0 ; i<disabledList.length ; i++){
		for(var j=i+1 ; j<disabledList.length ; j++){
			if(disabledList[i].Name == disabledList[j].Name){
				disabledList.splice(j,1);
				j--;
			}
		}
	}
}

function removeDisabledList(){
	for(var i=0 ; i<disabledList.length ; i++){
		for(var j=0 ; j<responseContactList.length ; j++){
			if(disabledList[i].Name == responseContactList[j].Name){
				responseContactList.splice(j,1);
				j--;
			}
		}
	}
}

function fetchLeadDetails(arrayName,leadResponse){
	for(var j=0;j<leadResponse.length;j++){
		var responseInfo = leadResponse[j];
		responseInfo.issync = 0;
		responseInfo.iscomplete = 0;
		var addate = responseInfo.Added_Date;
		var dob = responseInfo.DOB;
		responseInfo.DOB = dob.substring(0,dob.indexOf(" "));
		responseInfo.Added_Date = addate.substring(0,addate.indexOf(" "));
		arrayName.push(responseInfo);
	}
	return arrayName;
}

//search function
function getSearchedItem(){
	var srcList = [];
	var srcText = $m.juci.getControl("searchbox").value();
	srcText =  formatName(srcText); 
	for(var i=0 ; i<responseContactList.length ; i++){
		if(responseContactList[i].Name.indexOf(srcText) >= 0 || responseContactList[i].phone1.indexOf(srcText) >= 0){
			srcList.push(responseContactList[i]);
		}
	}
	
	var bindedContactList = srcList;
	for(var i=0 ; i<bindedContactList.length ; i++){
		var selectedValue = responseContactList[i].selectValue;
		if(selectedValue == true){
			selectedName.push(selectedValue);
		}
	}
	$m.juci.dataset("contactList",selectedName);
	if(srcList){
		//redefine variable and dopagination
		pageSize = 20;
		startCount = 0;
		navigationPage = 1;
		doPagination(srcList);
	}else{
		$m.alert("Sorry! no records found");
	}
}

// Message Trigger for selected users
function onTriggerMessage() {
	selectedContactsList = [];
	var allList = $m.juci.dataset("contactList");
	for(var i= 0 ; i<allList.length ; i++){
		if(allList[i].selectValue === true){
			selectedContactsList.push(allList[i]);
		}
	}
	var displayName = "";
	if(selectedContactsList.length) {
		for(var j=0;j<selectedContactsList.length;j++) {
			var name = selectedContactsList[j];
			displayName += name["displayName"]+ ',';
			var display_name = displayName.substring(0, displayName.length-1);
		}	
	}
	$m.juci.dataset("displayName",display_name);
	console.log(selectedContactsList);
	if(!selectedContactsList.length) {
		$m.alert("Kindly select atleast one contact to send message","Alert");
	} else if(selectedContactsList.length >= 10){
		$m.alert("Please select less than 10 contacts","Alert",function(){
			return;
		});
	}else {
		$m.juci.dataset("new_message","");
		utils.ShowDialog("message-inbox");	
	}
}

// call functionality
function onCallClick(e, event){
	callData = ko.toJS(e);
	var mobileNumber = callData.phone1;
	var makeCallCallback = function (r) {
		if(r.code == 1){
			var Call_Start_Time = r.result.startTime;
			var Call_End_Time = r.result.endTime;		
				var data = {
					"Call_Start_Time" : Call_Start_Time,
					"Call_End_Time"	: Call_End_Time,
					"Total_Duration": utils.GetTodaysDate(Call_Start_Time) - utils.GetTodaysDate(Call_End_Time),
					"Added_By"	: $m.getUsername(),
					"Customer_name":callData.displayName,
					"Destination_Mobile":r.result.to,
					"Lead_ID":utils.GetRandomNum(),
					"Log_Type":"CALL",
					"Latitude":latitude,
					"Longitude":longitude,
					"User_Role":gettype()
				};
			console.log(data);
			saveCallRecord(data);
		} else if(r.code == 0) {
			$m.alert(r.error.message);
		}	
	};
	$m.makeCall(mobileNumber,makeCallCallback);
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
// Message Functionality
function onMessageClick(e, event){
	messageData = ko.toJS(e);
	$m.juci.dataset("displayName",messageData.Name);
	$m.juci.dataset("new_message","");
	utils.ShowDialog("message-inbox");	
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
	if(selectedContactsList.length != 0) {
		for (var i=0; i<selectedContactsList.length; i++) {
			var messageNumber = selectedContactsList[i].phone1;
			var contactNumber = selectedContactsList[i].displayName;
			sendSms(messageNumber,textMsg,contactNumber,smsCallback);
		}
	} else {
		var messageNumber = messageData.phone1;
		var customerName = eventData.contactList[0].displayName;
		sendSms(messageNumber,textMsg,customerName,smsCallback);
	}
	closedialog("message-inbox");
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
				"Lead_ID":utils.GetRandomNum(),
				"SMS_Send_Time":delivered_time,
				"Message_Text":textMessage,
				"User_Role":gettype(),
				"Destination_Mobile":parseInt(messageNumber),
				"Latitude":latitude,
				"Longitude":longitude
			};
			saveCallRecord(messageDataObj);
			console.log("message"+messageDataObj);
		} else {
			$m.alert(res.result);
			$m.logError("recored failed due to"+res);
		}
	};
	$m.sendBgSms(messageNumber,textMessage,"",{"timeout":"10000"},sendBgSmsCallback);
}

function closedialog(id){
	utils.HideDialog(id);
}

function showPopUp(id){
	console.log(id.checked);
	var checkedValue = id.checked;
	if(checkedValue == true){
		annualIncome = "";
		occupationValue ="";
		age_group = "";
		console.log($m.juci.dataset("Occupation"));
		utils.ShowDialog("lead-info");
	}
}

function closeAuthenticate(){
	closedialog('lead-info');
}

function submitLeadValue(){
	if(annualIncome == "" || occupationValue == "" || age_group == ""){
		$m.alert("Please enter the value");
	}else{
		var contactDetails = $m.juci.dataset("contactList");
		for(var i = 0 ;i < contactDetails.length ; i++){
			if(contactDetails[i].selectValue == true && (contactDetails[i].syncedValue != 1)){
				//console.log(contactDetails);
				contactDetails[i].AgeGroup = age_group;
				contactDetails[i].Occupation = occupationValue;
				contactDetails[i].Income = annualIncome;
				contactDetails[i].syncedValue = 1;
			}
		}
		$m.toast("Annual income,Age group,Occupations are saved successfully");
		$m.juci.dataset("contactList",contactDetails);
		$m.juci.getControl("annual-income").value(null);
		$m.juci.getControl("age-group").value(null);
		$m.juci.getControl("occupation-value").value(null);
		closedialog('lead-info');
	}
}

function getAnnualIncome(event){
	annualIncome = event.value;
}
function getOccupationValue(event){
	occupationValue = event.value;
}
function getAgeGropuValue(event){
	age_group = event.value;
}