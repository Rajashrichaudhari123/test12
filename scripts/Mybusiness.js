var ARDM=["All", "Foreign", "Domestic"];
$m.juci.addDataset("ARDM", ARDM);
var timePeriod=[ "Month to Date", "Quater to Date","Year to Date","Custom Date Range"];
$m.juci.addDataset("timePeriod", timePeriod);
$m.juci.addDataset("selectedPeriod", "Month to Date");
$m.juci.addDataset("selectedARDM", "Select All ARDM");
$m.juci.addDataset("todays_date","0/0/0000");
var scorecardList = [{
	"Achievement": "0",
	"Data": "NOP (#)",
	"DataValues": "0",
	"Target": "150",
	"YoY_Growth": "0%"
	},{
	"Achievement": "0",
	"Data": "WRP (INR lacs)",
	"DataValues": "0.00",
	"Target": "52",
	"YoY_Growth": "0%"
	}];
	
$m.juci.addDataset("scorecardList", scorecardList);

$m.onReady(function(eventObject) {
	$m.juci.findById("date_container").hide();	
	$m.juci.getControl("time_period").onAfterChange(function(){
		customDateRange();
	});
});


 
 function customDateRange() {
 	var selectedPeriod = $m.juci.dataset("selectedPeriod");
 	var datecode = getDatacode(selectedPeriod);
 	if(selectedPeriod != "Custom Date Range"){
 		$m.juci.getControl("ARDM").show();
		$m.juci.findById("date_container").hide();
 	}
	if(selectedPeriod == "Custom Date Range"){
		$m.juci.findById("date_container").show();
		$m.juci.addDataset("todaysDate",getTodaysDate());
	}	
}

function getDatacode(selectedPeriod){
	switch(selectedPeriod){
 		case "Month to Date":return "MTD";
 		case "Quater to Date":return "QTD";
 		case "Year to Date":return "YTD";
 	}
}


function getTodaysDate(){
 	var todaydate = new Date();
	var day = todaydate.getDate();
	var month = todaydate.getMonth()+1;
	var year = todaydate.getFullYear();	
	debugger;
		$m.juci.getControl("from_date").j.el.innerText=day+ "/"+month+"/"+year;
	$m.juci.getControl("to_date").j.el.innerText=day+ "/"+month+"/"+year;
return day+ "/"+month+"/"+year
 }
 /*function getTodatsDate(){
 	var todaydate = new Date();
	var day = todaydate.getDate();
	var month = todaydate.getMonth()+1;
	var year = todaydate.getFullYear();
	$m.juci.getControl("from_date").j.el.innerText=day+ "/"+month+"/"+year;
	$m.juci.getControl("to_date").j.el.innerText=day+ "/"+month+"/"+year;
	
 }*/
 