/**
 * choosePlan.js
 * @author CloudPact Technologies
 * @description : This script is for receiving input json and user can choose the plan according to their needs
 **/

var dataObj={};
$m.juci.addDataset("is_La_Pr_Same","Y");
$m.juci.addDataset("is_La_ld_Same","Y");

/** Setting the header name on page load**/
$m.onReady(function(){
	var titleName = "Life Planner" ;
	utils.headerTitle(titleName);
});

/** Removing and add class(css) based on product selection**/
$m.onResume(function(){
	$m.hideProgress();
	$m.juci.findById("investment-obj").addClass("active");
	$m.juci.findById("investment-obj1").removeClass("active");
	$m.juci.findById("investment-obj2").removeClass("active");
	$m.juci.findById("investment-need").addClass("active");
	$m.juci.findById("investment-need1").removeClass("active");
	$m.juci.findById("investment-need2").removeClass("active");
	$m.juci.findById("investment-need3").removeClass("active");
	$m.juci.findById("investment-need4").removeClass("active");
});

/** Setting the language**/
$m.onData(function(eventObject){
	dataObj = eventObject.data;
	var chosenLanguage = dataObj.LANGUAGE;
	$m.juci.dataset("language",chosenLanguage);
	utils.GetLanguage(chosenLanguage);
	init();
});



/** Intializing the class value**/
function init(){
	$(".investment_obj").click(function () {
			$(".investment_obj").removeClass("active");
			$(this).addClass("active");   
		});
	$(".investment_need").click(function () {
		$(".investment_need").removeClass("active");
		$(this).addClass("active");   
	});
	dataObj.investorProfile = "chidlEducation";
	dataObj.need = "EarlyCareer";
}

/**set investor on change**/
function setInvestor(event,ip){  
	dataObj.investorProfile = ip;
}

/**set need on change**/
function setNeed(event,need){
	dataObj.need = need;
}

function onNoClick(event){
	var eventValue = event.value;
	if(eventValue == "Y"){
		utils.PutPref("isLaPrSame",true);
	} else {
		utils.PutPref("isLaPrSame",false);
	}
}

function onLeadYesClick(event){
	var event_val = event.value;
	if(event_val == "Y"){
		utils.RemovePref("isLaPrSame");
		utils.PutPref("isLaLdSame",true);
	} else {
		utils.PutPref("isLaLdSame",false);
	}
}

/**Getting the plan based on user has chosen the objective and needs**/
function getPlan(){
	var laPrSame = $m.juci.dataset("is_La_Pr_Same");
	if(laPrSame == "Y"){
		utils.PutPref("isLaPrSame",true);
	} else if(laPrSame == "N") {
		utils.PutPref("isLaPrSame",false);
		var laLdSame = $m.juci.dataset("is_La_ld_Same");
		if(laLdSame == "Y"){
			utils.PutPref("isLaLdSame",true);
		} else {
			utils.PutPref("isLaLdSame",false);
		}
	}
	var screenCallback = function(screenPath){
	 var current_prodcuts = [];
		var investorProfile = dataObj.investorProfile;
		var need = dataObj.need;
		var Obj = utils.GetPref("PdfScreens");
		Obj.screen4 = screenPath;
		utils.PutPref("PdfScreens",Obj);
		for(var i=0;i<productsMaster.length;i++){
			var currentObject = productsMaster[i];
			if(currentObject["InvestorProfile"] == investorProfile && currentObject["Need"] == need){
					current_prodcuts[0] = currentObject["Product1"];
					current_prodcuts[1] = currentObject["Product2"];
					current_prodcuts[2] = currentObject["Product3"];
					current_prodcuts[3] = currentObject["Product4"];
					break;
			}
		}
		if(current_prodcuts[0] == "N/A" && current_prodcuts[1] == "N/A" && current_prodcuts[2] == "N/A"){
			$m.alert("No Products available.Please choose another products matrix","Alert",function(){
				return;
			});
		}else{
			dataObj["Product1"] = current_prodcuts[0];
			dataObj["Product2"] = current_prodcuts[1];
			dataObj["Product3"] = current_prodcuts[2];
			dataObj["Product4"] = current_prodcuts[3];
			utils.OpenPage("Video","/Input Management/recommededVideo.html",dataObj);
		}
	};
	getBlobFromHtml("PdfScreen4",screenCallback);
}
