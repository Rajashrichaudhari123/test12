/**
 * createPlan.js
 * @author CloudPact Technologies
 * @description : This script is for receiving lead number,input json and shows goal graph based on marital status
 **/
/*
	receive input
	calculate needs values
	set back to graph
*/
var dataObj = {};
var rprice;
$m.juci.addDataset("age","");
$m.juci.addDataset("language","");
$m.juci.addDataset("currentRange","");

/** Setting the header name on page load**/
$m.onReady(function(){
	var titleName = "Life Planner" ;
	utils.headerTitle(titleName);
});

/** Setting the language and calling the income value on the page load**/
$m.onData(function(eventObject){
	dataObj = eventObject.data;
	var chosenLanguage = dataObj.LANGUAGE;
	$m.juci.dataset("language",chosenLanguage);
	utils.GetLanguage(chosenLanguage);
	setIncomeValue();
	init();
});


/** Viewing the income needs chart based on calculation**/
function init()
{
	$m.juci.dataset("age",dataObj.AGE);
	var childAge = dataObj.CHILDREN.length ? dataObj.CHILDREN[0].CHILD_AGE : 0;
	var maritalStatus = getMaritialStatus(dataObj.MARITAL_STATUS_ID);
	var cityTier = getCityTier(dataObj.CITY_CODE,dataObj.STATE_CODE);
	var lifeStage = getCurrentLifeStage(dataObj);
	var incomeBand = getIncomeBand(dataObj.INCOME, lifeStage, cityTier);
	var incomeValue = dataObj.INCOME;		
	var chart2	=	new Chart2(	(dataObj.NAME), 
								dataObj.AGE, 
								maritalStatus, 
								dataObj.NO_OF_CHILDREN, 
								childAge, 
								incomeBand, 
								cityTier,null,null,null,null,lifeStage,incomeValue);
	var responseObject = chart2.calculateAll();
	var chart3	=	new Chart3(	(dataObj.NAME), 
								dataObj.AGE, 
								maritalStatus, 
								dataObj.NO_OF_CHILDREN, 
								childAge, 
								incomeBand, 
								cityTier,null,null,null,null);
	var after15YearsResponseObject = chart3.calculateAll();
	var childEdu = Math.round(after15YearsResponseObject.childsHigherEducation*100/100);
	var firstCar = Math.round(responseObject.buyChangeCar*100/100);
	var secondCar = Math.round(after15YearsResponseObject.buyChangeCar*100/100);
	var retirement = Math.round(after15YearsResponseObject.retirement*100/100);
	var childMarriage = Math.round(after15YearsResponseObject.childsMarriage*100/100);
	var firstHouse = Math.round(after15YearsResponseObject.buyingAHouse*100/100);
	var secondHouse = Math.round(after15YearsResponseObject.secondHouse*100/100);
	var pureProtValue = $m.juci.findById("protect").el;
	pureProtValue.innerHTML = "Rs." + Math.round(after15YearsResponseObject.pureProtectionCover*100)/100 + "L";
	showNeed("childedu", childEdu);
	showNeed("firstcar", firstCar);
	showNeed("secondcar", secondCar);
	showNeed("retirement", retirement);
	showNeed("childrenmarriage", childMarriage);
	showNeed("firsthouse", firstHouse);
	showNeed("secondhouse", secondHouse);
}

/** Show the need value with prefix RS.**/
function showNeed(id, value){
	var lakhsValue = $m.juci.findById(id).el;
	var displayValue = $m.juci.findById(id + "holder").el;
	var blockValue = displayValue.style;
	if(value > 0){
		lakhsValue.innerHTML = "Rs." + value + "L";
		blockValue.display = "inline-block";
	}else
		blockValue.display = "none";	
}	

/** Viewing the income needs chart based on moving the slider range**/
function getIncomeValue(event){
	var incomeValue = event.target.value;
	dataObj.INCOME = incomeValue;
	$m.juci.dataset("currentRange",dataObj.INCOME);
	init();
}

/** Initializing the income value**/
function setIncomeValue(){
	$m.juci.dataset("currentRange",dataObj.INCOME);
}

/**Open products page**/
function goToCreatePlanPage(){
	var screenCallback = function(screenPath){
		var Obj = utils.GetPref("PdfScreens");
		Obj.screen3 = screenPath;
		utils.PutPref("PdfScreens",Obj);	  
		utils.OpenPage("Choose plan","/Input Management/choosePlan.html",dataObj);
	};
	getBlobFromHtml("PdfScreen3",screenCallback);
}
