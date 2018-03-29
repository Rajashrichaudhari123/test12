/**
 * recommendedProducts.js
 * @author CloudPact Technologies
 * @description : This script is for receiving lead number,input json and shows Products
 **/
var x2js = new X2JS();
var productObj = {};
var videoId;
var gender;
var DOB;
var leadId;
var activity_result_id;
var prod_code;
var name;
var MOBILENO;
var login_code = "";
var logincode = "";
var password = "";
var credentials = "";

$m.juci.addDataset("productsName",false);
$m.juci.addDataset("products1",true);
$m.juci.addDataset("products2",true);
$m.juci.addDataset("products3",true);
$m.juci.addDataset("product1Name","");
$m.juci.addDataset("product2Name","");
$m.juci.addDataset("product3Name","");
$m.juci.addDataset("product4Name","");
$m.juci.addDataset("product5Name","");
$m.juci.addDataset("product6Name","");
$m.juci.addDataset("product7Name","");
$m.juci.addDataset("product8Name","");
$m.juci.addDataset("product9Name","");
$m.juci.addDataset("showMore",true);
$m.juci.addDataset("productsList",[]);

/** Setting the header name on page load**/
$m.onReady(function(){
	var titleName = "Life Planner" ;
	utils.headerTitle(titleName);
		var dbcallback = function(dbhelper) {
		dbHelper = dbhelper;
	Expert_To_Call.createTable(function create_table_success(){
	
	} ,function create_table_failure(){});
	
	}
	utils.GetDbhelper(dbcallback);
	logincode = $m.getUserAccount().customProperties.Login_Code;
    password = $m.getUserAccount().customProperties.Login_Pwd;
});

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};



$m.onData(function(eventObject){
	productObj = eventObject.data;
	$m.juci.dataset("productsName",false);
	$m.juci.dataset("products1",true);
	$m.juci.dataset("products2",true);
	$m.juci.dataset("products3",true);
	$m.juci.dataset("showMore",true);
	init();
});

/** Showing the products**/
function initResume(){
	products1 = $m.juci.findById("prod1");
	products2 = $m.juci.findById("prod2");
	products3 = $m.juci.findById("prod3");
	products1.show();
	products2.show();
	products3.show();
}

/** Showing the products based on the user chosen the needs and objective**/
function init()
{
	var investorProfile = productObj.investorProfile;
	var need = productObj.need;
	var activity_id = productObj.ACTIVITY_ID;
	var activity_result_id = productObj.ACTIVITY_RESULT_ID;
	var lifeStage = getCurrentLifeStage(productObj);
	var prod_paragragh = ["product1_paragraph","product2_paragraph","product3_paragraph"];
	if(productObj.Product1){
		$m.juci.dataset("product1Name",productObj.Product1);
		getProducitonInfo(prod_paragragh[0],productObj.Product1);
	}else{
		$m.juci.dataset("showMore",true);
		$m.juci.dataset("products1",false);
	}
	if(productObj.Product2){
		$m.juci.dataset("product2Name",productObj.Product2);
		getProducitonInfo(prod_paragragh[1],productObj.Product2);
	}else{
		$m.juci.dataset("showMore",true);
		$m.juci.dataset("products2",false);
	}
	if(productObj.Product3){
		$m.juci.dataset("product3Name",productObj.Product3);
		getProducitonInfo(prod_paragragh[2],productObj.Product3);
	}else{
		$m.juci.dataset("showMore",true);
		$m.juci.dataset("products3",false);
	}
}

/** Save the expert call details**/
function saveExpertCallDetails() {
	var lead_no = productObj.LEAD_ID;
	var activity_id = productObj.ACTIVITY_ID;
	var activity_result_id = productObj.ACTIVITY_RESULT_ID;
	var dbHelperCallback = function(response){
		var successcallback = function(res){
			res = res[0];
			res.Updated_Date = new Date().getTime();
			res.Txn_Id = "";
			res.Added_By = $m.getUsername();
			res.Added_Date = utils.GetTimeStampByDate(res.Added_Date);
			res.DOB = utils.GetTimeStampByDate(res.DOB);
			var pdf = utils.GetPref("PdfScreens");
			res.LifePlanner_Image1 = pdf.screen1;  
			res.LifePlanner_Image2 = pdf.screen2;
			res.LifePlanner_Image3 = pdf.screen3; 
			res.LifePlanner_Image4 = pdf.screen4; 
			res.LifePlanner_Image5 = pdf.screen5; 
			res.Activity_ID = res.Activity_Id;
			res.Activity_Result_Id = activity_result_id;
			var selectSuccessCallback = function(res1){
				var tablename = "Expert_To_Call";
				var responsecallback = function(rescol){
					if(rescol.length > 0){
						// TODO : prepare object from this dataset
						var key = tablename+"_dbtableobject";
						window[key] = rescol;
						var expertCallDetails = new Expert_To_Call(res);
						var expertCallUpdateSuccessCallback = function(res){
							$m.showProgress("Loading...");
							//$m.logInfo("Expert Call updating successfully");
							$m.showProgress("Loading...");
							synctoServer();
						};
						var expertCallUpdateFailureCalback = function(response){
							$m.hideProgress();
							$m.alert("Error while updating into database expert call");
							$m.logError("Failed to update into Expert_To_Call--- " + JSON.stringify(response));
						};
						expertCallDetails.update(expertCallUpdateSuccessCallback,expertCallUpdateFailureCalback);
					}else{
						$m.alert("Can not save data at this movement");
						return;
					}
				};
				getTableInfo(tablename,responsecallback);	
			};
			var selectFailureCallback = function(res){
				$m.hideProgress();
				$m.alert("Error while inserting into database expert call");
				$m.logError("Failed to insert into Expert_To_Call--- " + JSON.stringify(res));
				//$m.logInfo("Failed to insert");
			};
			Expert_To_Call.SelectWithFilterAppNo(activity_result_id,selectSuccessCallback,selectFailureCallback);
		};
		var failurecalback = function(response){
			$m.alert("Error while Fetching into database");
			$m.logError("Failed to Fetch InputPojo--- " + JSON.stringify(response));
			//$m.logInfo("Failed to insert");
		};
		inputPojo.selectDataToInsert(activity_id,successcallback,failurecalback);	
	};
	utils.GetDbhelper(dbHelperCallback);
}

/** Go to BI page from 3 products and save image for pdf**/
var eventData;
function goToProducts(event){
	var productsName = event.currentTarget.parentElement.getElementsByClassName("products1_name")[0].innerHTML;
	var planCode = getplanCode(productsName);
	$m.putPref("planCode",planCode);
	$m.savePref();
	var screenCallback = function(screenPath){
		var Obj = utils.GetPref("PdfScreens");
		Obj.screen5 = screenPath;
		utils.PutPref("PdfScreens",Obj);
		saveExpertCallDetails();
	};
	getBlobFromHtml("PdfScreen5",screenCallback);
}

/** Go to BI page from show more products and save image for pdf**/
function showProducts(event){
	var productsName = event.target.el.innerText;
	var planCode = getplanCode(productsName);
	$m.putPref("planCode",planCode);
	$m.savePref();
	var screenCallback = function(screenPath){
		var Obj = utils.GetPref("PdfScreens");
		Obj.screen5 = screenPath;
		utils.PutPref("PdfScreens",Obj);
		saveExpertCallDetails();
	};
	getBlobFromHtml("PdfScreen5",screenCallback);
}

/** Show the paragragh for 3 products**/
function getProducitonInfo(paraId,prodName){
	var prod_paragraph = $m.juci.findById(paraId).el;
	prod_paragraph.innerHTML  = getProductParagraph(prodName);
}

/** Seprating the products from 3 main products**/
function showMoreProducts(){
	$m.juci.dataset("showMore",false);
	$m.juci.dataset("productsName",true);
	var product = "" , productsPara ="";
	var existingProducts = [productObj.Product1,productObj.Product2,productObj.Product3];
	var products_name = getPlanName();
	var showMoreProducts = [];
	for(var i=0 ; i < products_name.length ; i++){
		for(var j=0 ; j < existingProducts.length ; j++){
			if(existingProducts[j] == products_name[i].title){
				products_name.splice(i,1);
			}
		}
	}
	$m.juci.dataset("productsList",products_name);
}

/** Get the plan code according to the plan which the user has taken**/
var planMap = {};
function getPlanmaster() {
    var protect = $m.juci.dataset("protect");
    var plans = [];
    plans = plans.concat(protect);
    var saving = $m.juci.dataset("saving");
    plans = plans.concat(saving);
    var invest = $m.juci.dataset("invest");
    plans = plans.concat(invest);
    var health = $m.juci.dataset("health");
    plans = plans.concat(health);
    var retirement = $m.juci.dataset("retirement");
    plans = plans.concat(retirement);
    var child = $m.juci.dataset("child");
    plans = plans.concat(child);
    var solutions = $m.juci.dataset("solutions");
    plans = plans.concat(solutions);
    for (var i = 0; i < plans.length; i++) {
        if (plans[i].productCode) {
            planMap[plans[i].title] = plans[i].productCode;
        }
    }
    return planMap;
}

function getplanCode(planName) {
    if (planName) {
		planMap = getPlanmaster();
		return planMap[planName];
    }
    return "Not Found";
}

function getPlanName(){
	var protect = $m.juci.dataset("protect");
    var plans = [];
    plans = plans.concat(protect);
    var saving = $m.juci.dataset("saving");
    plans = plans.concat(saving);
    var invest = $m.juci.dataset("invest");
    plans = plans.concat(invest);
    var health = $m.juci.dataset("health");
    plans = plans.concat(health);
    var retirement = $m.juci.dataset("retirement");
    plans = plans.concat(retirement);
    var child = $m.juci.dataset("child");
    plans = plans.concat(child);
    var solutions = $m.juci.dataset("solutions");
    plans = plans.concat(solutions);
    return plans;
}

/**network bandwidth**/
var checkingNetworkSpeedCallback = function(res){
	utils.HideProgress();
	openProductsBi();
};
var message = "Your Network bandwidth is below 250 kbps.It will take some time to sync the data.Do you want to Proceed?";
utils.CheckingNetworkSpeed(message,checkingNetworkSpeedCallback);

/**Call the Bi url for show me the plan**/
function openBIUrl(){
	name = productObj.NAME;
	$m.putPref("annnualIncome",productObj.INCOME);
	$m.savePref();
	gender =  productObj.GENDER ;
	DOB = productObj.DATE_OF_BIRTH;
	leadId = productObj.LEAD_ID;
	MOBILENO = productObj.PHONE_NO;
	activity_result_id = productObj.ACTIVITY_RESULT_ID;
	prod_code = $m.getPref("planCode");
	var hierarchydata;
	if(gettype() !=='ADV' && gettype() !=='TPADV' && gettype() !=='AGADV' && gettype() !=='FLS' && gettype() !=='CNADV' && gettype() !=='PRADV' && gettype() !=='ENADV'){
		if(gettype() =='TPPR'){
			hierarchydata = $m.juci.getControl("tppar").value();
		}else if(gettype() =='TPSM'){
			hierarchydata = $m.juci.getControl("tpsm").value();
		}else if(gettype() =='AGSM'){
	   		hierarchydata = $m.juci.getControl("agsm").value();
	   	}else if(gettype() =='PRSM'){
	   		hierarchydata = $m.juci.getControl("prsm").value();
	   	}else if(gettype() =='CNSM'){
	   		hierarchydata = $m.juci.getControl("cnsm").value();
	   	}else if(gettype() =='AGPS'){
	   		hierarchydata = $m.juci.getControl("agps").value();
	   	}else if(gettype() =='TPBOM'){
	   		hierarchydata = $m.juci.getControl("tpbom").value();
	   	}
		else{
			hierarchydata = $m.juci.getControl("ad").value();
		}
		if(!hierarchydata){	
			$m.alert("Please Select Advisor");
			return;
		}
		hidebox();
	}
	if ($m.getPref("useAs")) {
		advisorCode = $m.getPref("useAs").LA_Business_LoginCode;
		advisorName = $m.getPref("useAs").Adv_Emp_Name;
	} else {
		advisorCode = $m.getUserAccount().customProperties.LA_Business_LoginCode;
		advisorName = $m.getUserAccount().customProperties.Login_Name;
	}
	
	
	/**Intializing the network bandwidth**/
	if($m.networkConnected()){
		$m.showProgress("Checking network bandwidth");
		utils.NetworkUtils();
	}else{
			$m.alert(messages.NoNetworkConnectivity,"Network Alert",function(){
			$m.hideProgress();
		});
	}
}

/** Open the Bi URL and matching the pattern**/
function openProductsBi(){
	//__mowbly__.Shell.UEX.pauseRecording(function(res){console.log(JSON.stringify(res))});
	clearSelectBox();
	$m.openChildBrowser("Proposal BI", "http://biuat.reliancenipponlife.com/Plan"+prod_code+".html?UniqueID=undefined&DeviceID=TAB&AdvisorCode="+advisorCode+"&AdvisorName="+advisorName+"&AssuredName="+name+"&Planno="+prod_code+"&DOB="+DOB+"&Term=undefined&MOBILENO="+MOBILENO+"&SA=undefined&Mode=undefined&GENDER="+gender+"&ANNUAL_INCOME=undefined&PURCHASE_MODE=undefined&UTM_SOURCE=undefined&LEAD_ID="+leadId+"&Activity_Result_Id="+activity_result_id+ "&Expert_call=false", {
		"navigation": true,
		"address": [],
		"patterns": [{
			"pattern": "Plan" + prod_code + ".html?fname",
			"callback": function(match) {
				var fname = "";
				var fromRegenerate = false;
				if (match.url.indexOf("&") == -1) {
					fname = match.url.substring(match.url.indexOf("fname") + 6, match.url.length);
				} else {
					fname = match.url.substring(match.url.indexOf("fname") + 6, match.url.indexOf("&"));
				}
				if (fname == "" || fromRegenerate) {
					$m.alert("Unexpected Response from BI");
					return;
				} else {
					try {
						var url = "http://lifelineuat.reliancelife.com/RassistServices/wsPDCDetails.svc/GetBIDetail";
						var data = {
							"SID":fname,
							"SapCode":$m.getUsername()
						}
						data = JSON.stringify(data);
						 if ($m.isWeb()) {
			            	credentials = Base64.encode("70268271:70268271");	
		    			} else {
		    				credentials = Base64.encode(logincode +":" + password);	
		    			}
						$m.post(url,data,{
					        "headers": {
					            "Content-Type": "application/json",
					            "Authorization":"Basic "+ credentials
					        }
					    }, function(response) {
							if (response.code === 200) {
								var result = response.result;
								var resulData = JSON.parse(result.data);
								if (resulData) {
									if(resulData.Status == "N") {
										$m.alert("BI request failed due to : " + result.data.Message);
										$m.logError("BI request failed due to : " + result.data.Message);
										return;
									}
									var bidata = resulData.objBIXMLValuesData;
									var advisor_code = bidata.Advisor_Code ? bidata.Advisor_Code : "";
									var passingData = {
										"data": bidata,
										"PLanCode": bidata.PLanCode,
										"Advisor_Code": advisor_code,
										"name":bidata.Name,
										"dob":bidata.DOB,
										"sex":bidata.Sex,
										"Mode_Deposit":bidata.Mode_Deposit,
										"Premium_Frequency":bidata.Mode_Deposit,
										"InstallmentPremium_ST":bidata.InstallmentPremium_ST,
										"Total_InstPremium_ST":null,
										"EED":bidata.Eligible_for_EmpDiscount ? bidata.Eligible_for_EmpDiscount : "",
										"Advisor_Name":bidata.Advisor_Name,
										"PremiumPayingTerm":bidata.PremiumPayingTerm,
										"PolicyTerm":bidata.PolicyTerm,
										"Txn_Date":bidata.Txn_Date,
										"Child_Name":bidata.Child_Name,
										"Child_Gender":bidata.Child_Gender,
										"AGE_Proof":bidata.AGE_Proof,
										"Application_Dt":bidata.Application_Dt,
										"Child_DOB":bidata.Child_DOB,
										"NOM_LA_Relationship":bidata.NOM_LA_Relationship,
										"SumAssured":bidata.SumAssured,
										"AGE":bidata.AGE,
										"Base_Annualised_Premium":bidata.Base_Annualised_Premium ? bidata.Base_Annualised_Premium : "",
										"ECS_NonECS":bidata.ECS_NonECS ? bidata.ECS_NonECS : ""
									};
									passingData.fname = fname;
									if (passingData.name && passingData.dob) {
										$m.removePref("useAs");
										$m.removePref("id_Value");
										utils.PutPref("FromProducts",false);
										$m.removePref("advisorDetails");
										$m.putPref("isProductsPage",false);
										$m.savePref();
										$m.open("Proposals", "/Applications/proposal.html", passingData);
										
									} else {
										$m.logError("Kindly check your network connectivity!! - " + JSON.stringify(response));
										$m.logDebug("Kindly check your network connectivity!! - " + JSON.stringify(passingData));
										$m.alert("Kindly check your network connectivity!!");
									}
								} else {
									$m.logError("Request Failed. Please try later" + JSON.stringify(response));
									$m.alert("Request Failed. Please try later");
								}
							} else {
								$m.logError("Request Failed. Please try later" + JSON.stringify(response));
								$m.alert("Request Failed. Please try later");
							}
						});
					} catch (e) {
						$m.alert("Kindly upgrade to latest version from force update option for application no generation!!");
						$m.logError("Request Failed. Please try later. Reason - " + e);
					}
				}
			}
		}]
	});
}

/**Clear the drop down value based on id value**/
function clearSelectBox(){
	var id_value = $m.getPref("id_Value");
	if(id_value != undefined){
		$m.juci.getControl(id_value).value(null);		
	}
}