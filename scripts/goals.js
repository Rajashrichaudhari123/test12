/**
 * goals.js
 * @author CloudPact Technologies
 * @description : This script is for receiving lead number,input json and shows goal graph based on marital status
 **/
var dataObj ={};

/** Setting the header name on page load**/
$m.onReady(function() {
	var titleName = "Life Planner" ;
	utils.headerTitle(titleName);
});

/** Setting the language**/
$m.onData(function(eventObject){
	dataObj = eventObject.data;
	var chosenLanguage = dataObj.LANGUAGE;
	CName = dataObj.NAME;
	utils.GetLanguage(chosenLanguage);
	$m.hideProgress();
	LifeStage(dataObj);
});



/**Life Stage goal graph based on marital status**/
function LifeStage(input_json){
	var life_stage = getCurrentLifeStage(input_json);
	var imageSource = $m.juci.findById("life_stage").el;
	var imagePath = "";
	switch(life_stage){
	case "Single": imagePath="images/Single.jpg";
					break;
	case "Married":	imagePath="images/Married.jpg";
					break;
	case "Seperated": imagePath="images/Nearing_Retirement.jpg";
					break;
		}
	imageSource.src = 	imagePath ;
}

/**open plan page**/
function goToPlanPage(){
	var screenCallback = function(screenPath){
		var Obj = utils.GetPref("PdfScreens");
		Obj.screen2 = screenPath;
		utils.PutPref("PdfScreens",Obj);
		utils.OpenPage("Create Plan","/Input Management/createPlan.html",dataObj);
	};
	getBlobFromHtml("PdfScreen2",screenCallback);
}

