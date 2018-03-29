/**
 * Calendar.js
 * @author CloudPact Technologies
 * @description : This script is for creating calendar.
 **/

var flag = false;
var morningArr = [];
var eveningArr = [];
var midAfternoonEvents = [];
var afternoonEvents = [];
var weekDays;
var monthList;
$m.juci.addDataset("date","");
$m.juci.addDataset("eventDate","");
$m.juci.addDataset("SMDetails", ["Ashok/70025897","meera/70025845","neena/87025897","reetha/70076397"]);
$m.juci.addDataset("smList",false);
$m.juci.addDataset("new_business","New Bussiness");
$m.juci.addDataset("recruitment","Recruitment");
$m.juci.addDataset("existing_customer","Existing Customer");
var fromDate;
var toDate;
var smDatafromHome;


// Initiating Local Database
$m.onReady(function(){
	$m.juci.dataset("headerName","Calendar");
	$m.juci.dataset("upcomingEvents",true);
	$m.juci.dataset("monthEvents",false);
	$m.juci.dataset("dayEvents",false);
	$m.juci.dataset("weekEvents",false);
	weekDays = $m.juci.findById("week-days-list");
	weekDays.hide();
	monthList = $m.juci.findById("month-list");
	monthList.hide();
});


$m.onResume(function(){
	activityDays = [];
	initResume();
});



$m.onData(function(eventObject){
	console.log("inside ondata");
	var data = eventObject.data;
	data = data.event;
	var dbcallback = function(dbhelper) {
		dbHelper = dbhelper;
		SHData.createTable(function create_table_success(){
			LeadInfoAppointment.createTable(function create_table_success(){
				console.log("before funxtion ondata");
				checkforSMBM(data);
			} ,function create_table_failure(){});
		} ,function create_table_failure(){});
	};
	utils.GetDbhelper(dbcallback);
});


// Month calendar
function loadMonthCalender(){
	var monthData = utils.GetPref("caledarServiceData");
	var cDates = [];
	var cData = [];
	var obj = {};
	var	sunObj = {"type":"offday","date":"Sunday","class":"week_off","text":"Week Off","select":"true"};
	var	satObj = {"type":"offday","date":"Saturday","class":"week_off","text":"Week Off","select":"true"};
	if(monthData){
		for(var j=0;j<monthData.length;j++) {
			var dateObj = new Date(monthData[j].Activity_Date);
			//var dateObj = new Date();
			var formattedDateObj = utils.GetFormattedDate(dateObj);
			if(dateObj.getDayName() == "Sunday"){
				sunObj = {"type":"offday","date":"Sunday","class":"juci_grey","text":"Week Off","select":"true"};
				satObj = {"type":"offday","date":"Saturday","class":"week_off","text":"Week Off","select":"true"};
			} else if(monthData[j].Lead_Source == "New Business"){
				obj = {"type":"holiday","date":formattedDateObj,"class":"new_bussiness","text":".","select":"true"};
			} else if(monthData[j].Lead_Source == "Recruitment"){
				obj = {"type":"holiday","date":formattedDateObj,"class":"recruitment","text":".","select":"true"};
			} else if(monthData[j].Lead_Source == "Exisiting Customer"){
				obj = {"type":"holiday","date":formattedDateObj,"class":"exisiting","text":".","select":"true"};
			}
			cData.push(sunObj);
			cData.push(satObj);
			cDates.push(obj);
		}
	}
	var fetchCalendarData = juci.getControl("cal");
	
	fetchCalendarData.setCustomDates(cData);
	fetchCalendarData.setAnnotations(cDates);
}

// Week Calendar
function loadWeekCalendar(){
	var weekArr = [];
	var obj = {};
	var finalTime;
	var weeksData = utils.GetPref("caledarServiceData");
	if(weeksData){
		for(var k=0;k<weeksData.length;k++){
			var activityDate = new Date(weeksData[k].Activity_Date);
			weeksData[k].leadDes = weeksData[k].Lead_Type;
			var activity_time = weeksData[k].Activity_Time;
			if(!obj[activityDate]){
				weekArr = [];	
			}else{
				weekArr  = obj[activityDate];
			}
			var searchTimeFormat = activity_time.search("PM");
			var activityData = activity_time.split(":");
			var getHours = activityData[0];
			if(searchTimeFormat == -1){
				finalTime = activity_time.slice(0,4);
			} else {
				var activityTime = activity_time.slice(0,4);
				var searchTime = activityTime.split(":");
				if(searchTime[0] == "12"){
					finalTime = activityTime;
				} else {
					var hours = parseInt(searchTime[0])+12;	
					hours = hours.toString();
					finalTime = hours +":"+searchTime[1];
				}	
			}
		
			var weekObj = {"time":finalTime,"Description":weeksData[k].Name};
			weekArr.push(weekObj);
			obj[activityDate] = weekArr;
		}
	}
	var weekCalendar =	juci.getControl("wcal");
	var a = weekCalendar.getEventsObj();
	weekCalendar.clear();
	weekCalendar.setEventsObj(obj);
	weekCalendar.refreshCal();
}

// calls on resume
function initResume(){
	utils.ShowProgress("Loading Data...");
	var todaysDate = utils.GetTodaysDate();
	morningArr = [];
	eveningArr = [];
	afternoonEvents = [];
	midAfternoonEvents = [];
	morningDayEvents = [];
	afternoonDayEvents = [];
	midAfternoonDayEvents = [];
	eveningDayEvets = [];		
	var currentDate = todaysDate;
	var currentMonth = currentDate.getMonthName();
	var currentYear = currentDate.getFullYear();
	var currentDay = currentDate.getDate();
	var firstDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
	var lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
	fromDate = firstDate.getTime();
	toDate = lastDate.getTime();
	
	$m.juci.dataset("dayname",currentDay);
	$m.juci.dataset("monthName",currentMonth);
	$m.juci.dataset("fullYear",currentYear);
	$m.juci.getControl("morning-events").addListItemClick(onEditItemClick, this, ".trashicon");
	$m.juci.getControl("aft-events").addListItemClick(onEditItemClick, this, ".trashicon");
	$m.juci.getControl("midaft-events").addListItemClick(onEditItemClick, this, ".trashicon");
	$m.juci.getControl("evng-events").addListItemClick(onEditItemClick, this, ".trashicon");
	$m.juci.getControl("week_day_morning").addListItemClick(onEditItemClick, this, ".editicon");
	$m.juci.getControl("week_day_aft").addListItemClick(onEditItemClick, this, ".editicon");
	$m.juci.getControl("week_day_midaft").addListItemClick(onEditItemClick, this, ".editicon");
	$m.juci.getControl("week_day_evng").addListItemClick(onEditItemClick, this, ".editicon");
	$m.juci.getControl("day-morning").addListItemClick(onEditItemClick, this, ".trashicon");
	$m.juci.getControl("day-aft").addListItemClick(onEditItemClick, this, ".trashicon");
	$m.juci.getControl("day-midaft").addListItemClick(onEditItemClick, this, ".trashicon");
	$m.juci.getControl("day-evng").addListItemClick(onEditItemClick, this, ".trashicon");
	onHideMenu();
	if(gettype() == "FLS") {
		$m.juci.dataset("recruitment","LMS");
		$m.juci.findById("existing").hide();
		$m.juci.findById("existing_name").hide();
	} else {
		$m.juci.findById("existing").show();
		$m.juci.findById("existing_name").show();
	}
	//calendarFetchData(fromDate,toDate);
}

//Fetching calendar data from server
function calendarFetchData(fromDate,toDate){	
	if($m.networkConnected()){
		var calendarEventDetailsCallback = function(res){
			utils.ShowProgress("Fetching Data...");
			if(res.LeadInfoAppointment.length == 0){
				$m.alert("No Data");
					$m.juci.dataset("afternoonEvents",[]);
					$m.juci.dataset("midAfternoonEvents",[]);
					$m.juci.dataset("eveningEvents",[]);
					$m.juci.dataset("morningEvents",[]);
					utils.HideProgress();
				return;
			}
		var responseData = res.LeadInfoAppointment;
		utils.PutPref("caledarServiceData",responseData);
		savingData();
		loadMonthCalender();
		};
		var userType = $m.getUserAccount().customProperties.User_Type;
		var advisorCode;
		if( userType == "BM") {
			var userId = juci.getControl("sm_Details").value();
			if(userId){
				userId = userId.substring(userId.indexOf("/")+2,userId.length);	
			} else {
				advisorCode = $m.getUsername();
			}
			advisorCode = userId;
		} else {
			advisorCode = $m.getUsername();	
		}
		
		if (advisorCode == null) {
			advisorCode = $m.getUsername();	
		}
		service = new ServiceLibrary();
		service.getCalendarEventDetails(fromDate,toDate,advisorCode,calendarEventDetailsCallback);
	}else{
		$m.alert("No Internet Connection,Please again later");
	}
}

// calendar data storing in local db
function savingData(){
	var advisorCode = $m.getUserAccount().customProperties.Login_Code;
	var getData = utils.GetPref("caledarServiceData");
	var upcomingDates = utils.GetNextWeekDates();	
	var splitDates = upcomingDates.split("-");
	var fromDate = parseInt(splitDates[0]);
	var toDate = parseInt(splitDates[1]);
	if($m.networkConnected()){
		var calendarEventDetailsCallback = function(res){
			utils.ShowProgress("Fetching Data...");
			if(res.LeadInfoAppointment.length == 0){
				//$m.alert(res.Message);
					$m.juci.dataset("afternoonEvents",[]);
					$m.juci.dataset("midAfternoonEvents",[]);
					$m.juci.dataset("eveningEvents",[]);
					$m.juci.dataset("morningEvents",[]);
					utils.HideProgress();
				return;
			}
			var responseData = res.LeadInfoAppointment;
			var s_callback = function (r){
				var calendarEventsPojoCallback = function(response){
					var success_callback = function(res){
						var responseData = res.rows;
						//responseData = responseData.sort(function(a,b){return new Date(b.Activity_Date) - new Date(a.Activity_Date);});
						responseData = sortArrayDate(responseData,"Asc");
						morningArr = [];
						eveningArr = [];
						afternoonEvents = [];
						midAfternoonEvents = [];
						var todaysDate = utils.GetTodaysDate();
						$m.juci.dataset("afternoonEvents",[]);
						$m.juci.dataset("midAfternoonEvents",[]);
						$m.juci.dataset("eveningEvents",[]);
						$m.juci.dataset("morningEvents",[]);
						utils.ShowProgress("Prepopulating...");
						for(var i=0;i<responseData.length;i++){
							var activity_date = new Date(responseData[i].Activity_Date);
							var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
							var activityMonth = activity_date.getMonthName();
							var currentDate = todaysDate;
							responseData[i].leadDes = responseData[i].Lead_Type + " " + "with" + " " + responseData[i].Name;
							responseData[i].eventDes = responseData[i].Lead_Type + " " + "with"+ " " +responseData[i].Name + " " +responseData[i].Lead_Sub_Type + " " + "and" + " " + responseData[i].Lead_Source;
							responseData[i].Activity_Date = new Date(responseData[i].Activity_Date);
							var currentMonth = monthNames[currentDate.getMonth()];	
							var activity_time = responseData[i].Activity_Time;
							var searchTimeFormat = activity_time.search("PM");
							var activityData = activity_time.split(":");
							var getHours = activityData[0];
							if(searchTimeFormat == -1){
								if (getHours < 12){
									morningArr.push(responseData[i]);
								} 	
							} else {
								if((getHours == 12 || getHours >= 1)&& (getHours == 12 || getHours < 3)){
									afternoonEvents.push(responseData[i]);
								} else if (getHours >= 3 && getHours < 5){
									midAfternoonEvents.push(responseData[i]);
								} else if (getHours >= 5){
									eveningArr.push(responseData[i]);
								}
							}		
						}
						$m.juci.dataset("morningEvents",morningArr);
						$m.juci.dataset("afternoonEvents",afternoonEvents);
						$m.juci.dataset("midAfternoonEvents",midAfternoonEvents);
						$m.juci.dataset("eveningEvents",eveningArr);
						utils.HideProgress();
					};
					
					utils.PojoSelect("LeadInfoAppointment",success_callback);
				};
				utils.PojoMultiReplace("LeadInfoAppointment",responseData,calendarEventsPojoCallback);
			};
			var f_callback = function(r){
				utils.HideProgress();
				$m.logError("Failed to delete LeadInfoAppointment table- -- " + JSON.stringify(r));
				$m.alert("res"+res);
			};
			LeadInfoAppointment.removeAll(s_callback,f_callback);
		};
		service = new ServiceLibrary();
		service.getCalendarEventDetails(fromDate,toDate,advisorCode,calendarEventDetailsCallback);
	}else{
		$m.alert("No Internet Connection,Please again later");
	}
	utils.ShowProgress("Setting data to dataset please wait...");
}

// calendar data storing in local db
function savingBMData(sapcode){
	var advisorCode = sapcode;
	var getData = utils.GetPref("caledarServiceData");
	var upcomingDates = utils.GetNextWeekDates();	
	var splitDates = upcomingDates.split("-");
	var fromDate = parseInt(splitDates[0]);
	var toDate = parseInt(splitDates[1]);
	if($m.networkConnected()){
		var calendarEventDetailsCallback = function(res){
			utils.ShowProgress("Fetching BM Data...");
			if(res.LeadInfoAppointment.length == 0){
					$m.alert(res.Message);
					$m.juci.dataset("afternoonEvents",[]);
					$m.juci.dataset("midAfternoonEvents",[]);
					$m.juci.dataset("eveningEvents",[]);
					$m.juci.dataset("morningEvents",[]);
					utils.HideProgress();
				return;
			}else{
				var responseData = res.LeadInfoAppointment;
			var s_callback = function (r){
				var calendarEventsPojoCallback = function(response){
					var success_callback = function(res){
						var responseData = res.rows;
						//responseData = responseData.sort(function(a,b){return new Date(b.Activity_Date) - new Date(a.Activity_Date);});
						responseData = sortArrayDate(responseData,"Asc");
						morningArr = [];
						eveningArr = [];
						afternoonEvents = [];
						midAfternoonEvents = [];
						var todaysDate = utils.GetTodaysDate();
						$m.juci.dataset("afternoonEvents",[]);
						$m.juci.dataset("midAfternoonEvents",[]);
						$m.juci.dataset("eveningEvents",[]);
						$m.juci.dataset("morningEvents",[]);
						utils.ShowProgress("Prepopulating...");
						for(var i=0;i<responseData.length;i++){
							var activity_date = new Date(responseData[i].Activity_Date);
							var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
							var activityMonth = activity_date.getMonthName();
							var currentDate = todaysDate;
							responseData[i].leadDes = responseData[i].Lead_Type + " " + "with" + " " + responseData[i].Name;
							responseData[i].eventDes = responseData[i].Lead_Type + " " + "with"+ " " +responseData[i].Name + " " +responseData[i].Lead_Sub_Type + " " + "and" + " " + responseData[i].Lead_Source;
							responseData[i].Activity_Date = new Date(responseData[i].Activity_Date);
							var currentMonth = monthNames[currentDate.getMonth()];	
							var activity_time = responseData[i].Activity_Time;
							var searchTimeFormat = activity_time.search("PM");
							var activityData = activity_time.split(":");
							var getHours = activityData[0];
							if(searchTimeFormat == -1){
								if (getHours < 12){
									morningArr.push(responseData[i]);
								} 	
							} else {
								if((getHours == 12 || getHours >= 1)&& (getHours == 12 || getHours < 3)){
									afternoonEvents.push(responseData[i]);
								} else if (getHours >= 3 && getHours < 5){
									midAfternoonEvents.push(responseData[i]);
								} else if (getHours >= 5){
									eveningArr.push(responseData[i]);
								}
							}
						}
						$m.juci.dataset("morningEvents",morningArr);
						$m.juci.dataset("afternoonEvents",afternoonEvents);
						$m.juci.dataset("midAfternoonEvents",midAfternoonEvents);
						$m.juci.dataset("eveningEvents",eveningArr);
						utils.HideProgress();
					};
					
					utils.PojoSelect("LeadInfoAppointment",success_callback);
				};
				utils.PojoMultiReplace("LeadInfoAppointment",responseData,calendarEventsPojoCallback);
			};
			var f_callback = function(r){
				utils.HideProgress();
				$m.logError("Failed to delete LeadInfoAppointment table- -- " + JSON.stringify(r));
				$m.alert("res"+res);
			};
			LeadInfoAppointment.removeAll(s_callback,f_callback);
			}		
		};
		service = new ServiceLibrary();
		service.getCalendarEventDetails(fromDate,toDate,advisorCode,calendarEventDetailsCallback);
	}else{
		$m.alert("No Internet Connection,Please again later");
	}
	utils.ShowProgress("Setting data to dataset please wait...");
}




var morningDayEvents = [];
var afternoonDayEvents = [];
var midAfternoonDayEvents = [];
var eveningDayEvets = [];

// Days Calendar
function loadDaysEvent(todaysDate) {
	morningDayEvents = [];
	afternoonDayEvents = [];
	midAfternoonDayEvents = [];
	eveningDayEvets = [];
	$m.juci.dataset("dayMorningEvents",[]);
	$m.juci.dataset("dayAfternoonEvents",[]);
	$m.juci.dataset("dayMidAfternoonEvents",[]);
	$m.juci.dataset("dayEveningEvents",[]);
	var todaysData = utils.GetPref("caledarServiceData");
	if(todaysData){
		if (todaysData.length > 100) {
			$m.showProgress("Please wait...");
		}
		for(var i=0;i<todaysData.length;i++){
			todaysData[i].leadDes = todaysData[i].Lead_Type + " " + "with" + " " + todaysData[i].Name;
			todaysData[i].eventDes = todaysData[i].Lead_Type + " " + "with"+ " " +todaysData[i].Name + " " +todaysData[i].Lead_Sub_Type + " " + "and" + " " + todaysData[i].Lead_Source;
			todaysData[i].Activity_Date = new Date(todaysData[i].Activity_Date);
			var activity_date = new Date(todaysData[i].Activity_Date);
			var activityDate = todaysData[i].Activity_Date.toString("dd-MM-yyyy");
			var currentDate = todaysDate;
			var currentDateStrng = currentDate.toString("dd-MM-yyyy");
			if(activityDate == currentDateStrng){
				var activity_time = todaysData[i].Activity_Time;
				var searchTimeFormat = activity_time.search("PM");
				var activityData = activity_time.split(":");
				var getHours = activityData[0];
				if(searchTimeFormat == -1){
					if (getHours < 12){
						morningDayEvents.push(todaysData[i]);
					} 
					$m.juci.dataset("dayMorningEvents",morningDayEvents);
					$m.putPref("dayMorningEvents",morningDayEvents);
					$m.savePref();
				} else {
					if((getHours == 12 || getHours >= 1)&& (getHours == 12 || getHours < 3)){
						afternoonDayEvents.push(todaysData[i]);
					} else if (getHours >= 3 && getHours < 5){
						midAfternoonDayEvents.push(todaysData[i]);
					} else if (getHours >= 5){
						eveningDayEvets.push(todaysData[i]);
					}
				}
			}
		}
		$m.juci.dataset("dayAfternoonEvents",afternoonDayEvents);
		$m.putPref("dayAfternoonEvents",afternoonDayEvents);
		$m.savePref();
		$m.juci.dataset("dayMidAfternoonEvents",midAfternoonDayEvents);
		$m.putPref("dayMidAfternoonEvents",midAfternoonDayEvents);
		$m.savePref();
		$m.juci.dataset("dayEveningEvents",eveningDayEvets);
		$m.putPref("dayEveningEvents",eveningDayEvets);
		$m.savePref();
	}
	utils.HideProgress();
}

// toggle bar
function toggleView(e){
	switch(e.newToggled){
		case 0:
			//upcomingEvents.show();
			$m.juci.dataset("upcomingEvents",true);
			$m.juci.dataset("dayEvents",false);
			$m.juci.dataset("monthEvents",false);
			$m.juci.dataset("weekEvents",false);
			weekDays.hide();
			break;
		case 1:
			$m.juci.dataset("upcomingEvents",false);
			$m.juci.dataset("dayEvents",false);
			$m.juci.dataset("monthEvents",true);
			$m.juci.dataset("weekEvents",false);
			loadMonthCalender();
			weekDays.hide();
			break;
		case 2:
			$m.juci.dataset("upcomingEvents",false);
			$m.juci.dataset("dayEvents",false);
			$m.juci.dataset("monthEvents",false);
			$m.juci.dataset("weekEvents",true);
			monthList.hide();
			loadWeekCalendar();
			break;
		case 3:
			$m.juci.dataset("upcomingEvents",false);
			$m.juci.dataset("monthEvents",false);
			$m.juci.dataset("dayEvents",true);
			var todaysDate = utils.GetTodaysDate();
			var currentMonth = todaysDate.getMonthName();
			var currentYear = todaysDate.getFullYear();
			var currentDay = todaysDate.getDate();			
			$m.juci.dataset("dayname",currentDay);
			$m.juci.dataset("monthName",currentMonth);
			$m.juci.dataset("fullYear",currentYear);
			loadDaysEvent(todaysDate);
			$m.juci.dataset("weekEvents",false);
			monthList.hide();
			weekDays.hide();
			break;
	}
}

// show more,show less
function showMore(id){
	var currDtl;
	//var menuid = event.target.el.id;
	if(event.index == -1){
		return ;
	}
	else{
	index = event.index;
	var currentindex = id + index;
	var menuItem = document.getElementById(currentindex);
	if(currDtl){
		currDtl.style.display = "none";
		if(currDtlIdx === index ){
			currDtlIdx = null;
			currDtl = null;
			return;
		}
	}
	currDtlIdx = index;
	currDtl	= document.getElementById(currentindex);
	var currList = document.getElementById(index);
	if (menuItem.style.display === "none") {
		currDtl.style.display = "block";
		indexid = index;
	}
	else{
		currDtl.style.display = "none";
		} 
	}
}

// Month change arrow click
function previousArrowClick(){
	var todaysDate = utils.GetTodaysDate();
	utils.ShowProgress("Loading Data....");
	if(flag == false){
		var currentDate = utils.PutPref("currentDate",todaysDate);	
	}
	var getCurrentDate = utils.GetPref("currentDate");
	var now = getCurrentDate;
	var nextMonth;
	var lastDay;
	if (now.getMonth() == 11) {
		nextMonth = new Date(now.getFullYear() - 1, 0, 1);
		lastDay = new Date(now.getFullYear(), now.getMonth() - 0, 0);
		flag = true;
	} else {
		nextMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
		lastDay = new Date(now.getFullYear(), now.getMonth() - 0, 0);
		flag = true;
	}
	var fromDate = nextMonth.getTime();
	var toDate = lastDay.getTime();
	$m.juci.dataset("afternoonEvents",[]);
	$m.juci.dataset("midAfternoonEvents",[]);
	$m.juci.dataset("eveningEvents",[]);
	$m.juci.dataset("morningEvents",[]);
	utils.PutPref("currentDate",nextMonth);
	var next = nextMonth.getMonthName();
	var nextYear = nextMonth.getFullYear();
	var nextDate = nextMonth.getDate();
	$m.juci.dataset("dayname",nextDate);
	$m.juci.dataset("monthName",next);
	$m.juci.dataset("fullYear",nextYear);
	
	calendarFetchData(fromDate,toDate);
}

// Month change arrow click
function nextArrowClick(){
	utils.ShowProgress("Loading Data....");
	var todaysDate = utils.GetTodaysDate();
	if(flag == false){
		var currentDate = utils.PutPref("currentDate",todaysDate);	
	}
	var getCurrentDate = utils.GetPref("currentDate");
	var now = getCurrentDate;
	var nextMonth;
	var lastDay
	if (now.getMonth() == 11) {
		nextMonth = new Date(now.getFullYear() + 1, 0, 1);
		lastDay = new Date(now.getFullYear(), now.getMonth() + 2, 0);
		flag = true;
	} else {
		nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
		lastDay = new Date(now.getFullYear(), now.getMonth() + 2, 0);
		flag = true;
	}
	var fromDate = nextMonth.getTime();
	var toDate = lastDay.getTime();
	$m.juci.dataset("afternoonEvents",[]);
	$m.juci.dataset("midAfternoonEvents",[]);
	$m.juci.dataset("eveningEvents",[]);
	$m.juci.dataset("morningEvents",[]);	
	utils.PutPref("currentDate",nextMonth);
	var next = nextMonth.getMonthName();
	var nextYear = nextMonth.getFullYear();
	var nextDate = nextMonth.getDate();
	$m.juci.dataset("dayname",nextDate);
	$m.juci.dataset("monthName",next);
	$m.juci.dataset("fullYear",nextYear);
	
	calendarFetchData(fromDate,toDate);
}

// Filter
function onFiterClick(event){
	if($m.juci.findById("filter-data").el.style.display === "none"){
        $m.juci.findById("filter-data").show();
        event.stopPropagation();
	}
	else{
		$m.juci.findById("filter-data").hide();
		event.stopPropagation();
	}
}

// next month or previous month click
function onNextAndPreviousMonthClick(event){
	utils.ShowProgress("Loading Data....");
	var ifNextYear = new Date().getFullYear();
	if(event.year != ifNextYear){
		utils.HideProgress();
		$m.alert("No Data found");
	}
	var todaysDate = utils.GetTodaysDate();
	var todaysTimeStamp = utils.GetTodaysTimeStamp();
	var currentMonth = todaysTimeStamp+1;
	var fromDate;
	var	toDate;
	var eventMonth = event.month+1;
	var usertype = $m.getUserAccount().customProperties.User_Type;
	if(currentMonth <= eventMonth){
		if(flag == false){
			var currentDate = utils.PutPref("currentDate",todaysDate);	
		}
		var getCurrentDate = utils.GetPref("currentDate");
		var now = new Date(getCurrentDate);
		var nextMonth;
		var lastDay
		if (now.getMonth() == 11) {
			nextMonth = new Date(now.getFullYear() + 1, 0, 1);
			flag = true;
		} else {
			nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
			lastDay = new Date(now.getFullYear(), now.getMonth() + 2, 0);
			flag = true;
		}
		if(eventMonth == new Date().getMonth()+1){
			var todaysDate = utils.GetTodaysDate();
			nextMonth = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), 1);
			lastDay = new Date(todaysDate.getFullYear(), todaysDate.getMonth() + 1, 0);
		}
			
		fromDate = nextMonth.getTime();
		toDate = lastDay.getTime();	
		if(fromDate && toDate)
			calendarFetchData(fromDate,toDate);
	} else {
		if(flag == false){
			var currentDate = utils.PutPref("currentDate",todaysDate);	
		}
		var getCurrentDate = utils.GetPref("currentDate");
		var now = getCurrentDate;
		var nextMonth;
		var lastDay;
		now = new Date(now);
		if (now.getMonth() == 11) {
			nextMonth = new Date(now.getFullYear() - 1, 0, 1);
			flag = true;
		} else {
			nextMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
			lastDay = new Date(now.getFullYear(), now.getMonth() - 0, 0);
			flag = true;
		}
		fromDate = nextMonth.getTime();
		toDate = lastDay.getTime();
			calendarFetchData(fromDate,toDate);
	}
}

// week date select
function onDateSelect(event) {
	utils.ShowProgress("Please Wait...");
	if(event.selecteddate.eventArr.length == 0){
		$m.open("newlead","/Super Track/newlead.html");
		return;
	}
	var eventDate = event.fullDate;
	eventList(eventDate,"weekDayMorningEvents","WeekDayAfternoonEvents","weekDayMidAfternoonEvents","WeekDayEveningEvents","week");
}

// month date select
function onMonthDateSelect(event){
	utils.ShowProgress("Please Wait...");
	var month = event.month;
	var date = event.date;
	var year = event.year;
	var eventDate = month +"-"+date+"-"+year;
	eventList(eventDate,"monthMorningEvents","monthAfternoonEvents","monthMidAfternoonEvents","monthEveningEvents","month");
}

function onHideMenu(){
	var fiterData = $m.juci.findById("filter-data");
	if(fiterData){
		var filter = $m.juci.findById("filter-data").el.style.display === "block"
		if(filter){
			$m.juci.findById("filter-data").hide();
		}
	}
}

function eventList(eventDate,morningEvent,afternoonEvent,midAfternoonEvent,eveningEvent,monthorweek){
	morningDayEvents = [];
	afternoonDayEvents = [];
	midAfternoonDayEvents = [];
	var todaysDate = utils.GetTodaysDate();
	eveningDayEvets = [];
	$m.juci.dataset(morningEvent,[]);
	$m.juci.dataset(afternoonEvent,[]);
	$m.juci.dataset(midAfternoonEvent,[]);
	$m.juci.dataset(eveningEvent,[]);
	
	var todaysData = utils.GetPref("caledarServiceData");
	for(var i=0;i<todaysData.length;i++){
		todaysData[i].leadDes = todaysData[i].Lead_Type + " " + "with" + " " + todaysData[i].Name;
		todaysData[i].eventDes = todaysData[i].Lead_Type + " " + "with"+ " " +todaysData[i].Name + " " +todaysData[i].Lead_Sub_Type + " " + "and" + " " + todaysData[i].Lead_Source;
		todaysData[i].Activity_Date = new Date(todaysData[i].Activity_Date);
		var activity_date = new Date(todaysData[i].Activity_Date);
		var activityDate = todaysData[i].Activity_Date.toString("dd-MM-yyyy");
		var currentDate = new Date(eventDate);
		var currentDateStrng = currentDate.toString("dd-MM-yyyy");
		$m.juci.dataset("eventDate",currentDateStrng);
		if(activityDate == currentDateStrng){
			var activity_time = todaysData[i].Activity_Time;
			var searchTimeFormat = activity_time.search("PM");
			var activityData = activity_time.split(":");
			var getHours = activityData[0];
			if(searchTimeFormat == -1){
				if (getHours < 12){
					morningDayEvents.push(todaysData[i]);
				} 
				//$m.juci.dataset(morningEvent,morningDayEvents);
			} else {
				if((getHours == 12 || getHours >= 1)&& (getHours == 12 || getHours < 3)){
					afternoonDayEvents.push(todaysData[i]);
				} else if (getHours >= 3 && getHours < 5){
					midAfternoonDayEvents.push(todaysData[i]);
				} else if (getHours >= 5){
					eveningDayEvets.push(todaysData[i]);
				}
//				$m.juci.dataset(afternoonEvent,afternoonDayEvents);
//				$m.juci.dataset(midAfternoonEvent,midAfternoonDayEvents);
//				$m.juci.dataset(eveningEvent,eveningDayEvets);
			}
		}
	}
	utils.HideProgress();
	if(morningDayEvents.length != 0 || afternoonDayEvents.length != 0 || midAfternoonDayEvents.length != 0 || eveningDayEvets.length != 0){
		if(monthorweek == "month"){
			monthList.show();
		} else {
			weekDays.show();	
		}
	}
	var scroll_bottom = document.getElementById("scroll_bar");
	scroll_bottom.scrollTop = 500;
}

// week calendar navigate
function onCalendarNavigate(event){
	var weekDaysEvent = $m.juci.findById("week-days-list");
}

// Filter Search
function onApplyClick(){
	var new_bussiness = $m.juci.findById("new-business").el.checked;
	var recruitment = $m.juci.findById("recruitment").el.checked;
	var existing_customer = document.getElementById("existing_customer").checked;
	
	if(new_bussiness == true && recruitment == true && existing_customer == true){
		var morningArr = [];
		var afternoonArr = [];
		var midAfternoonArr = [];
		var evngEvents = [];
		
		var dayMorning = $m.getPref("dayMorningEvents");
		for(var i=0;i<dayMorning.length;i++){
			if(dayMorning[i].Lead_Type == "Exisiting Customer" || dayMorning[i].Lead_Type == "Recruitment" || dayMorning[i].Lead_Type == "New Business"){
				morningArr.push(dayMorning[i]);
			}
		}
		$m.juci.dataset("dayMorningEvents",morningArr);
		var dayAfternoonEvents = $m.getPref("dayAfternoonEvents");
		for(var i=0;i<dayAfternoonEvents.length;i++){
			if(dayAfternoonEvents[i].Lead_Type == "Exisiting Customer" || dayAfternoonEvents[i].Lead_Type == "Recruitment" || dayAfternoonEvents[i].Lead_Type == "New Business"){
				afternoonArr.push(dayAfternoonEvents[i]);
			}
		}
		$m.juci.dataset("dayAfternoonEvents",afternoonArr);
		var dayMidAfternoonEvents = $m.getPref("dayMidAfternoonEvents");
		for(var i=0;i<dayMidAfternoonEvents.length;i++){
			if(dayMidAfternoonEvents[i].Lead_Type == "Exisiting Customer" || dayMidAfternoonEvents[i].Lead_Type == "Recruitment" || dayMidAfternoonEvents[i].Lead_Type == "New Business"){
				midAfternoonArr.push(dayMidAfternoonEvents[i]);
			}
		}
		$m.juci.dataset("dayMidAfternoonEvents",midAfternoonArr);
		var dayEveningEvents = $m.getPref("dayEveningEvents");
		for(var i=0;i<dayEveningEvents.length;i++){
			if(dayEveningEvents[i].Lead_Type == "Exisiting Customer" || dayEveningEvents[i].Lead_Type == "Recruitment" || dayEveningEvents[i].Lead_Type == "New Business"){
				evngEvents.push(dayEveningEvents[i]);
			}
		}
		$m.juci.dataset("dayEveningEvents",evngEvents);
	}else if(existing_customer == true && recruitment == true){
		var morningArr = [];
		var afternoonArr = [];
		var midAfternoonArr = [];
		var evngEvents = [];
		
		var dayMorning = $m.getPref("dayMorningEvents");
		for(var i=0;i<dayMorning.length;i++){
			if(dayMorning[i].Lead_Type == "Exisiting Customer" || dayMorning[i].Lead_Type == "Recruitment"){
				morningArr.push(dayMorning[i]);
			}
		}
		$m.juci.dataset("dayMorningEvents",morningArr);
		var dayAfternoonEvents = $m.getPref("dayAfternoonEvents");
		for(var i=0;i<dayAfternoonEvents.length;i++){
			if(dayAfternoonEvents[i].Lead_Type == "Exisiting Customer" || dayAfternoonEvents[i].Lead_Type == "Recruitment"){
				afternoonArr.push(dayAfternoonEvents[i]);
			}
		}
		$m.juci.dataset("dayAfternoonEvents",afternoonArr);
		var dayMidAfternoonEvents = $m.getPref("dayMidAfternoonEvents");
		for(var i=0;i<dayMidAfternoonEvents.length;i++){
			if(dayMidAfternoonEvents[i].Lead_Type == "Exisiting Customer" || dayMidAfternoonEvents[i].Lead_Type == "Recruitment"){
				midAfternoonArr.push(dayMidAfternoonEvents[i]);
			}
		}
		$m.juci.dataset("dayMidAfternoonEvents",midAfternoonArr);
		var dayEveningEvents = $m.getPref("dayEveningEvents");
		for(var i=0;i<dayEveningEvents.length;i++){
			if(dayEveningEvents[i].Lead_Type == "Exisiting Customer" || dayEveningEvents[i].Lead_Type == "Recruitment"){
				evngEvents.push(dayEveningEvents[i]);
			}
		}
		$m.juci.dataset("dayEveningEvents",evngEvents);
	}else if(existing_customer == true && new_bussiness == true){
		var morningArr = [];
		var afternoonArr = [];
		var midAfternoonArr = [];
		var evngEvents = [];
		
		var dayMorning = $m.getPref("dayMorningEvents");
		for(var i=0;i<dayMorning.length;i++){
			if(dayMorning[i].Lead_Type == "Exisiting Customer" || dayMorning[i].Lead_Type == "New Business"){
				morningArr.push(dayMorning[i]);
			}
		}
		$m.juci.dataset("dayMorningEvents",morningArr);
		var dayAfternoonEvents = $m.getPref("dayAfternoonEvents");
		for(var i=0;i<dayAfternoonEvents.length;i++){
			if(dayAfternoonEvents[i].Lead_Type == "Exisiting Customer" || dayAfternoonEvents[i].Lead_Type == "New Business"){
				afternoonArr.push(dayAfternoonEvents[i]);
			}
		}
		$m.juci.dataset("dayAfternoonEvents",afternoonArr);
		var dayMidAfternoonEvents = $m.getPref("dayMidAfternoonEvents");
		for(var i=0;i<dayMidAfternoonEvents.length;i++){
			if(dayMidAfternoonEvents[i].Lead_Type == "Exisiting Customer" || dayMidAfternoonEvents[i].Lead_Type == "New Business"){
				midAfternoonArr.push(dayMidAfternoonEvents[i]);
			}
		}
		$m.juci.dataset("dayMidAfternoonEvents",midAfternoonArr);
		var dayEveningEvents = $m.getPref("dayEveningEvents");
		for(var i=0;i<dayEveningEvents.length;i++){
			if(dayEveningEvents[i].Lead_Type == "Exisiting Customer" || dayEveningEvents[i].Lead_Type == "New Business"){
				evngEvents.push(dayEveningEvents[i]);
			}
		}
		$m.juci.dataset("dayEveningEvents",evngEvents);
	}else if(recruitment == true && new_bussiness == true){
		var morningArr = [];
		var afternoonArr = [];
		var midAfternoonArr = [];
		var evngEvents = [];
		
		var dayMorning = $m.getPref("dayMorningEvents");
		for(var i=0;i<dayMorning.length;i++){
			if(dayMorning[i].Lead_Type == "New Business" || dayMorning[i].Lead_Type == "Recruitment"){
				morningArr.push(dayMorning[i]);
			}
		}
		$m.juci.dataset("dayMorningEvents",morningArr);
		var dayAfternoonEvents = $m.getPref("dayAfternoonEvents");
		for(var i=0;i<dayAfternoonEvents.length;i++){
			if(dayAfternoonEvents[i].Lead_Type == "New Business" || dayAfternoonEvents[i].Lead_Type == "Recruitment"){
				afternoonArr.push(dayAfternoonEvents[i]);
			}
		}
		$m.juci.dataset("dayAfternoonEvents",afternoonArr);
		var dayMidAfternoonEvents = $m.getPref("dayMidAfternoonEvents");
		for(var i=0;i<dayMidAfternoonEvents.length;i++){
			if(dayMidAfternoonEvents[i].Lead_Type == "New Business" || dayMidAfternoonEvents[i].Lead_Type == "Recruitment"){
				midAfternoonArr.push(dayMidAfternoonEvents[i]);
			}
		}
		$m.juci.dataset("dayMidAfternoonEvents",midAfternoonArr);
		var dayEveningEvents = $m.getPref("dayEveningEvents");
		for(var i=0;i<dayEveningEvents.length;i++){
			if(dayEveningEvents[i].Lead_Type == "New Business" || dayEveningEvents[i].Lead_Type == "Recruitment"){
				evngEvents.push(dayEveningEvents[i]);
			}
		}
		$m.juci.dataset("dayEveningEvents",evngEvents);
	}else if(new_bussiness == true){
		var morningArr = [];
		var afternoonArr = [];
		var midAfternoonArr = [];
		var evngEvents = [];
		
		var dayMorning = $m.getPref("dayMorningEvents");
		for(var i=0;i<dayMorning.length;i++){
			if(dayMorning[i].Lead_Type == "New Business"){
				morningArr.push(dayMorning[i]);
			}
		}
		$m.juci.dataset("dayMorningEvents",morningArr);
		var dayAfternoonEvents = $m.getPref("dayAfternoonEvents");
		for(var i=0;i<dayAfternoonEvents.length;i++){
			if(dayAfternoonEvents[i].Lead_Type == "New Business"){
				afternoonArr.push(dayAfternoonEvents[i]);
			}
		}
		$m.juci.dataset("dayAfternoonEvents",afternoonArr);
		var dayMidAfternoonEvents = $m.getPref("dayMidAfternoonEvents");
		for(var i=0;i<dayMidAfternoonEvents.length;i++){
			if(dayMidAfternoonEvents[i].Lead_Type == "New Business"){
				midAfternoonArr.push(dayMidAfternoonEvents[i]);
			}
		}
		$m.juci.dataset("dayMidAfternoonEvents",midAfternoonArr);
		var dayEveningEvents = $m.getPref("dayEveningEvents");
		for(var i=0;i<dayEveningEvents.length;i++){
			if(dayEveningEvents[i].Lead_Type == "New Business"){
				evngEvents.push(dayEveningEvents[i]);
			}
		}
		$m.juci.dataset("dayEveningEvents",evngEvents);
	}else if(recruitment == true){
		var morningArr = [];
		var afternoonArr = [];
		var midAfternoonArr = [];
		var evngEvents = [];
		
		var dayMorning = $m.getPref("dayMorningEvents");
		for(var i=0;i<dayMorning.length;i++){
			if(dayMorning[i].Lead_Type == "Recruitment"){
				morningArr.push(dayMorning[i]);
			}
		}
		$m.juci.dataset("dayMorningEvents",morningArr);
		var dayAfternoonEvents = $m.getPref("dayAfternoonEvents");
		for(var i=0;i<dayAfternoonEvents.length;i++){
			if(dayAfternoonEvents[i].Lead_Type == "Recruitment"){
				afternoonArr.push(dayAfternoonEvents[i]);
			}
		}
		$m.juci.dataset("dayAfternoonEvents",afternoonArr);
		var dayMidAfternoonEvents = $m.getPref("dayMidAfternoonEvents");
		for(var i=0;i<dayMidAfternoonEvents.length;i++){
			if(dayMidAfternoonEvents[i].Lead_Type == "Recruitment"){
				midAfternoonArr.push(dayMidAfternoonEvents[i]);
			}
		}
		$m.juci.dataset("dayMidAfternoonEvents",midAfternoonArr);
		var dayEveningEvents = $m.getPref("dayEveningEvents");
		for(var i=0;i<dayEveningEvents.length;i++){
			if(dayEveningEvents[i].Lead_Type == "Recruitment"){
				evngEvents.push(dayEveningEvents[i]);
			}
		}
		$m.juci.dataset("dayEveningEvents",evngEvents);
	} else if(existing_customer == true){
		var morningArr = [];
		var afternoonArr = [];
		var midAfternoonArr = [];
		var evngEvents = [];
		
		var dayMorning = $m.getPref("dayMorningEvents");
		for(var i=0;i<dayMorning.length;i++){
			if(dayMorning[i].Lead_Type == "Exisiting Customer"){
				morningArr.push(dayMorning[i]);
			}
		}
		$m.juci.dataset("dayMorningEvents",morningArr);
		var dayAfternoonEvents = $m.getPref("dayAfternoonEvents");
		for(var i=0;i<dayAfternoonEvents.length;i++){
			if(dayAfternoonEvents[i].Lead_Type == "Exisiting Customer"){
				afternoonArr.push(dayAfternoonEvents[i]);
			}
		}
		$m.juci.dataset("dayAfternoonEvents",afternoonArr);
		var dayMidAfternoonEvents = $m.getPref("dayMidAfternoonEvents");
		for(var i=0;i<dayMidAfternoonEvents.length;i++){
			if(dayMidAfternoonEvents[i].Lead_Type == "Exisiting Customer"){
				midAfternoonArr.push(dayMidAfternoonEvents[i]);
			}
		}
		$m.juci.dataset("dayMidAfternoonEvents",midAfternoonArr);
		var dayEveningEvents = $m.getPref("dayEveningEvents");
		for(var i=0;i<dayEveningEvents.length;i++){
			if(dayEveningEvents[i].Lead_Type == "Exisiting Customer"){
				evngEvents.push(dayEveningEvents[i]);
			}
		}
		$m.juci.dataset("dayEveningEvents",evngEvents);
	}
	$m.juci.findById("filter-data").hide();
}

function onResetClick(){
	$m.showProgress("Resetting the data..Please wait");
	var todaysDate = $m.juci.dataset("dayname");
	var todaysMonth = $m.juci.dataset("monthName");
	var year = $m.juci.dataset("fullYear");
	var todayDate = todaysDate +"-"+todaysMonth+"-"+year;
	var todaysDate = new Date(todayDate);
	$m.juci.findById("new-business").el.checked = false;
	$m.juci.findById("recruitment").el.checked =  false;
	$m.juci.findById("existing_customer").el.checked  = false;
	loadDaysEvent(todaysDate);
}

function onCancelClick(){
	$m.juci.findById("filter-data").hide();
}


function onLeftArrowClick(){
	previousArrowClick();
}

function onRightArrowClick(){
	nextArrowClick();
}

// days previous click
function onDayRightArrow(){
	utils.ShowProgress("Please wait...");
	var previousDate = utils.getPreviousDate();
	loadDaysEvent(previousDate);
}

// days next click
function onDayLeftArrow(){
	utils.ShowProgress("Please wait...");
	var tomorrowDate = utils.GetNextDate();
	loadDaysEvent(tomorrowDate);
}

function onDayMorningEvents(e){
	showMore("dayviewc");
	onHideMenu();
}

function onDayAfternoonEventsClick(e){
	showMore("dayeventc");
	onHideMenu();
}

function onDayMidAfternoonEventsClick(e){
	showMore("daydisplay");
	onHideMenu();
}

function onDayEveningEventsClick(e){
	showMore("dayshowc");
	onHideMenu();
}

function onWeekDayEveningEventsClick(e){
	showMore("weekdayshowc");
}

function onWeekDayMidAfternoonEventsClick(e){
	showMore("weekdaydisplay");
}

function onWeekDayAfternoonEventsClick(e){
	showMore("weekdayeventc");
}

function onWeekDayMorningEvents(e){
	showMore("weekdayviewc");
}

function onEditItemClick(e){
	var data = e.data;
	if(data.Flag == "2" || data.Flag == "3" || data.Flag == "4")
		$m.open("activityResult","/Super Track/activityResult.html",data);
}

function onCreateEventsClick(){
	$m.open("newlead","/Super Track/newlead.html");
}

function checkforSMBM(data){
	console.log("after eenteres in funtion")
	smDatafromHome = data;
	var userType = $m.getUserAccount().customProperties.User_Type;
	if(userType == "BM"){
		$m.juci.dataset("smList",true);
		getSMlistforBM(userType,data);
	}else{
		calendarFetchData(fromDate,toDate);
	}
}

function getSMlistforBM(userType,data){
	url = Constants.publicIP +"/mowblyserver/sshdatasvc/rellife/prod/RlifeAssist";
	BMdata = {
			"code":$m.getUsername(),
			"codeCol":getColumnByUserType(userType),
			"action":"get"
		};
	$m.post(url, BMdata, function(response){
		if(response.code == 200){
			// Success
			var result = response.result;
			result = JSON.parse(response.result.data);
			shRows = result.entities;
			
			if(result.code == "103"){
				//$m.juci.dataset("Sales_manager");
				processSHData();
			}else{
				$m.hideProgress();
				$m.alert("Unexpected server response.Please try later");
			}
		} else{
			// Error
			var errMsg = response.error.message;
			$m.hideProgress();
			$m.alert("Error in request.Please try later");
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
	} 
}

function processSHData(){
	SHData.multiReplace(shRows,function(data){
		$m.hideProgress();
		syncTeam();
		$m.toast("Synced  Hierarchy successfully!");
		//fetch the local data for list of sapid
		fetchSHData();
	},function(error){
		$m.hideProgress();
	//	$m.alert("Synce  Hierarchy is Failed");
		console.log(error);
	});
}

function syncTeam(){
	var time= new Date().getTime();
	time = new Date(time);
	var sync = time.toString("dd MMM yy hh:mm tt");
	$m.putPref("syncTeam",sync,true);
	$m.savePref();
	var Sync = $m.getPref("syncTeam");
	//juci.dataset("syncTeam",Sync);
}
function fetchSHData(){
	if(dbHelper){
		var filter = new window.DB.Filter.equal("BM_Code", "'" + BMdata.code + "'");
		SHData.SelectWithFilter(["SM_Code as code","SM_Name as name"],filter,setSuccessCallBack(),setErrorCallBack(),true);
 	}
}
function setSuccessCallBack(){
	return function(response){
		//$m.juci.dataset(dataset,response.rows);
		var SMdata = response.rows;
		displaySMData(SMdata);
		FetchSMData(SMdata);
	};
}
function setErrorCallBack(){
		return function(response){
	};
}

function displaySMData(SMdata){
	var smArr = [];
	for(var i=0 ; i<SMdata.length ; i++){
		var smDet = SMdata[i].name+" / "+SMdata[i].code;
		smArr.push(smDet);
	}
	$m.juci.dataset("SMDetails",smArr);
	//$m.juci.getControl("sm_Details").value(smArr[0]);
}
function FetchSMData(SMdata){
	//check data from home page and populate accordingly
	//var sapcode = $m.juci.getControl("sm_Details").value();
	var smDet
	var sapcode = smDatafromHome;
	sapcode = sapcode.substring(sapcode.indexOf("/")+2,sapcode.length);
	for(var i=0 ; i<SMdata.length ; i++){
		if(sapcode == SMdata[i].code){
			smDet = SMdata[i].name+" / "+SMdata[i].code;
			//smArr.push(smDet);
		}	
	}
	$m.juci.getControl("sm_Details").value(smDet);
	fetchSMDataforBM(fromDate,toDate,sapcode);
}
function FetchSMDetails(){
	var sapcode = $m.juci.getControl("sm_Details").value();
	sapcode = sapcode.substring(sapcode.indexOf("/")+2,sapcode.length);
	fetchSMDataforBM(fromDate,toDate,sapcode);
}
//Fetching SM calendar data for BM from server
function fetchSMDataforBM(fromDate,toDate,sapcode){
	if($m.networkConnected()){
		var SMforBMcalendarDetailsCallback = function(res){
			utils.ShowProgress("Fetching Calendar Data...");
			if(res.LeadInfoAppointment){
				if(res.LeadInfoAppointment.length == 0){
				//$m.alert(res.Message);
					$m.juci.dataset("afternoonEvents",[]);
					$m.juci.dataset("midAfternoonEvents",[]);
					$m.juci.dataset("eveningEvents",[]);
					$m.juci.dataset("morningEvents",[]);
					utils.HideProgress();
					return;
				}
			}
		var responseData = res.LeadInfoAppointment;
		if(responseData != undefined){
			utils.PutPref("caledarServiceData",responseData);
		}
		savingBMData(sapcode);
		loadMonthCalender();
		};
		service = new ServiceLibrary();
		service.getSMforBMCalendarDetails(fromDate,toDate,sapcode,SMforBMcalendarDetailsCallback);
	}else{
		$m.alert("No Internet Connection,Please again later");
	}
}

function sortArrayDate(SortingArray,order){
	SortingArray.sort(function(a,b){
		var firstDateFormat = a.Activity_Date + " " + a.Activity_Time;
		var secondDateFormat = b.Activity_Date + " " + b.Activity_Time;
		var firstTimeStamp = utils.SetTimeStamp(firstDateFormat);
		var secondTimeStamp = utils.SetTimeStamp(secondDateFormat);
		if(order == 'Asc')
	    	return utils.SetOrderAsc(firstTimeStamp,secondTimeStamp);
	    else
	    	return utils.SetOrderDesc(firstTimeStamp,secondTimeStamp);
	});
		return SortingArray;
}
