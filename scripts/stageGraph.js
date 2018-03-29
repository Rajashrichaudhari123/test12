/**
 * stageGraph.js
 * @author CloudPact Technologies
 * @description : This script is for receiving input json,set age marker,create lifeStage graph
 **/

var input_json = {"LEAD_ID":"","INCOME":"","NAME":"","GENDER":"","ADDRESS_1":"","ADDRESS_2":"","ADDRESS_3":"","STATE_CODE":"","CITY_CODE":"","PIN_CODE":"","PHONE_NO":"","MARITAL_STATUS_ID":"","CREATED_DATE":"","DATE_OF_BIRTH":"","LANGUAGE":"English","AGE":"","CHILDREN":"","ACTIVITY_RESULT_ID":"" };
var leadObj = {};
$m.juci.addDataset("leadName","");
$m.juci.addDataset("language","");

/** Setting the header name on page load**/
$m.onReady(function(){
	var titleName = "Life Planner" ;
	utils.headerTitle(titleName);
});

/** Setting the marker value,language**/
$m.onResume(function(){
	utils.GetLanguage(input_json.LANGUAGE);
	getGraphicContainerContent();
	setYouMarker(input_json.AGE);
});

/** Getting all the value from the actvity result page**/
$m.onData(function(eventObject){
	leadObj = eventObject.data;
	$m.removePref("language");
	utils.RemovePref("PdfScreens");
	getAllDetails(leadObj);
});

$m.onClose(function(){
	$m.setResult(true);
	utils.OpenPage("Input Management","/Input Management/inputManagement.html");
});


/** Setting all the lead details and marking the age based on DOB**/
function getAllDetails(leadObj){
	input_json.NAME = leadObj.Name;
	$m.juci.dataset("leadName",input_json.NAME);
	var dob = leadObj.DOB;
	input_json.DATE_OF_BIRTH = ChangeFormat(dob);
	var marital_status = leadObj.Marital_Status;
	var mariatlID = getMaritalId(marital_status);
	input_json.MARITAL_STATUS_ID = mariatlID;
	var income = getIncomeAmount(leadObj.Income);
	input_json.INCOME = income;
	input_json.CITY_CODE = leadObj.City;
	input_json.GENDER = leadObj.Gender;
	input_json.LEAD_ID = leadObj.Lead_Id;
	input_json.ACTIVITY_ID = leadObj.Activity_Id;
	input_json.ACTIVITY_RESULT_ID = leadObj.activity_result_id;
	input_json.PHONE_NO = leadObj.MobileNumber;
	var presentAge = setAge(dob);
	setYouMarker(presentAge);
	setLSColumns();
	input_json.AGE = presentAge;
	input_json.LANGUAGE = "English";
	utils.GetLanguage(input_json.LANGUAGE);
}

function getGraphicContainerContent(){
	careTitle =  $m.juci.findById("careFree");
	planTitle =  $m.juci.findById("planning");
	respTitle =  $m.juci.findById("responsible");
	settleTitle =  $m.juci.findById("settlement");
	relaxTitle =  $m.juci.findById("relaxed");
	careTitle.hide();
	planTitle.hide();
	respTitle.hide();
	settleTitle.hide();
	relaxTitle.hide();
}

/** Check the age**/
function setAge(cuurentAge){
	if(cuurentAge && cuurentAge != 'DD/MM/YYYY'){
		var age = utils.GetAge(cuurentAge);
		if(age < 18){
			$m.alert("Please enter valid dob");
			$m.close();
		}
		currAge = age;
	}else{
			$m.alert("Invalid date of birth");
			$m.close();
	}
	return 	age;
}


/** Setting the age marker**/
function setYouMarker(yourAge){
	if(yourAge != ""){
		var graphicImg = $m.juci.findById("graphbg").el;
		var width = graphicImg.width;
		var height = graphicImg.height;
		var umark = $m.juci.findById("youmarker");
		var youMarker = umark.el;
		var containerId = "";
		var zeroOffset = ((width * 0.0491) - (youMarker.style.width/2));
		var ageOffset = ((width-(width*0.09))/70) * yourAge;
		youMarker.style.left = zeroOffset + ageOffset + "px";
		youMarker.style.bottom = (height*0.090) + "px";
		if(yourAge >= 18 && yourAge < 30){
			careTitle.show();
		}
		else if(yourAge >= 30 && yourAge < 40){
			planTitle.show();
		}
		else if(yourAge >= 40 && yourAge < 50){
			respTitle.show();
		}
		else if(yourAge >= 50 && yourAge < 60){
			settleTitle.show();
		}
		else if(yourAge >= 60 && yourAge < 70){
			relaxTitle.show();
		}
		setLSColumn("lsdesc", 0.225, 0.045);	
	}
}

/** Setting the life stage graph**/
function setLSColumns(){
	setLSColumn("cfyears", 0.134, 0.283);
	setLSColumn("plyears", 0.134, 0.419);
	setLSColumn("rpyears", 0.134, 0.558);
	setLSColumn("styears", 0.134, 0.699);
	setLSColumn("rxyears", 0.134, 0.839);
}

/** Setting life stage graph sections**/
function setLSColumn(colId, widthOffsetFactor, leftOffsetFactor){
	var graphicImg = $m.juci.findById("graphbg").el;
	var width = graphicImg.width;
	var columSize = $m.juci.findById(colId).el;
	columSize.style.left = width * leftOffsetFactor + "px";
	columSize.style.width = width * widthOffsetFactor + "px";
}

/**Get Marital id for the marital status**/
function getMaritalId(status){
	var statusValue = "";
	if(status == "Single"){
		statusValue = 1;
	}else if(status == "Married"){
		statusValue = 2;
	}else{
		statusValue = 2;
	}
	return statusValue;
}

/**Get Income amount**/
function getIncomeAmount(income){
	var incomeValue = "";
	if(income == "Up to 3 Lacs"){
		incomeValue = "300000";
	}else if(income == "3 Lacs to 6 Lacs"){
		incomeValue = "600000";
	}else if(income == "6 Lacs to 10 Lacs"){
		incomeValue = "1000000";
	}else if(income == "10 Lacs to 20 lacs"){
		incomeValue = "2000000";
	}else if(income == "20 Lacs to 50 Lacs"){
		incomeValue = "5000000";
	}else if(income == "Above 50 Lacs"){
		incomeValue = "7000000";
	}
	return incomeValue;
}

/**open products page**/
//function goToProducts(){
//	utils.OpenPage("Products","/Products/Products.html",input_json);
//}

/**goals page**/
function goToGoalsPage(){
	var screenCallback = function(screenPath){
	var Obj = {};
	Obj.screen1 = screenPath;
	utils.PutPref("PdfScreens",Obj);
	var chosenLang = utils.GetPref("language") ;
	if(chosenLang) {
		input_json.LANGUAGE = utils.GetPref("language");
	}else{
		input_json.LANGUAGE = "English";
	}
	utils.OpenPage("Goals","/Input Management/goals.html",input_json);
}
	getBlobFromHtml("PdfScreen1",screenCallback);
}

/** Formating the date**/
function ChangeFormat(dateNew){
    dateNew = datetime(dateNew);
	dateNew = dateNew.split("/");
	currdate=dateNew[0]+"/"+dateNew[1]+"/"+dateNew[2];
	return currdate;
}

function datetime(date) {
	var date = new Date(date);
    var dt = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    newdate = ((dt < 10) ? ("0" + dt) : dt) + "/" 
	+ ((m < 10) ? ("0" + m) : m) 
	+ "/" +y ; 
    return  newdate ;
}
