/**
 * hierarchy.js
 * @author CloudPact Technologies
 * @description : This script is used for get hierarchy
 **/
var obj={
		"code":"",
		"name":"",
		"usertype":""
};

  
juci.addDataset("user",obj);
var currentList;
var listNav;
var cZM, cRM, cBM, cSM, cAM, cTM, cCDAASM;
var currentUser;
var panelList;

var hierarchy = {
	"zm_name":"",
	"rm_name":"",
	"am_name":"",
	"bm_name":"",
	"sm_name":"",
	"ad_name":"",
	"adv_name":""
}

$m.juci.addDataset("Hierarchy",hierarchy);
$m.juci.addDataset("advisorVisible",false);


$m.onData(function(){
	sm_list= juci.findById("sm");
	bm_list= juci.findById("bm");
	rm_list= juci.findById("rm");
	ad_list= juci.findById("ad");
	am_list= juci.findById("am");
	agsm_list= juci.findById("agsm");
	agps_list= juci.findById("agps");
	tpsm_list = juci.findById("tpsm");
	tppar_list = juci.findById("tppar");
	tpadv_list = juci.findById("tpadv");
	tpbom_list = juci.findById("tpbom");
	prsm_list= juci.findById("prsm");
	cnsm_list= juci.findById("cnsm");
	try{
		currentUser = {"code":$m.getUsername(),"name":$m.getUserAccount().customProperties.Login_Name,"usertype":$m.getUserAccount().customProperties.User_Type};			
	}catch(e){
		
	}
});


function initDB(){
	new window.DB(CONSTANTS.DBName, function(dbHelper) {
		window.dbHelper = dbHelper;	
		checkData();
	}, function(error) {
		$m.logError("Unable to open database due to -- " + JSON.stringify(error));
		$m.alert("Unable to open database");		
	});	
}

function initNav(){
	currentUser = {"code":$m.getUsername(),"name":$m.getUserAccount().customProperties.Login_Name,"usertype":$m.getUserAccount().customProperties.User_Type};
	juci.dataset("user", currentUser);
	var CuUser = $m.getPref("useAs");

	if(CuUser && CuUser.length > 0){
		var userDetail = JSON.parse(CuUser);
	}else {
		var userType = currentUser.usertype;
		switch(userType){
			case "RM" 	  :	am_list.show();
							juci.getControl("am").value(null);
							hierarchyDataManager.getAMByRM(currentUser.code,"amlist");
							break;
			case "AM"     :	bm_list.show();
							juci.getControl("bm").value(null);
							hierarchyDataManager.getBMByAM(currentUser.code,"bmlist");
							break;
			case "BM"     :	sm_list.show();
							juci.getControl("sm").value(null);
							hierarchyDataManager.getSMByBM(currentUser.code,"smlist");
							break;
			case "SM"     :	ad_list.show();
							juci.getControl("ad").value(null);
							$m.juci.dataset("advisorVisible",true);
							hierarchyDataManager.getAdvisorBySM(currentUser.code,"adlist");
							break;
			case "ZM"     :	rm_list.show();
							juci.getControl("rm").value(null);
							hierarchyDataManager.getRMByZM(currentUser.code,"rmlist");
			case "TM"     :	hierarchyDataManager.getSMByTM(currentUser.code,"smlist");
			case "CDAASM" :	hierarchyDataManager.getCDAAdvisorByCDASM(currentUser.code,"cdaadvlist");
			case "TPSM"   :	hierarchyDataManager.getAdvisorByTPSM(currentUser.code,"tpsmlist");
			case "TPPR"   :	hierarchyDataManager.getAdvisorByTPPAR(currentUser.code,"tpparlist");
			case "AGSM"   : hierarchyDataManager.getAdvisorByAGSM(currentUser.code,"agsmlist");
			case "AGPS"   : hierarchyDataManager.getAdvisorByAGPS(currentUser.code,"agpslist");
			case "TPBOM"   : hierarchyDataManager.getAdvisorByTPBOM(currentUser.code,"tpbomlist");
			case "PRSM"   : hierarchyDataManager.getAdvisorByPRSM(currentUser.code,"prsmlist");
			case "CNSM"   : hierarchyDataManager.getAdvisorByCNSM(currentUser.code,"cnsmlist");
		}
	}
	listNav = document.getElementById("listnav");
}


function checkData(){
	
	window.dbHelper.db.executeSql("PRAGMA table_info(shdata)",function(sr){
		var flag = false;
		var schema = sr.rows;
		schema.forEach(function(obj){
			if(obj.name == 'AM_Code' || obj.name == 'AM_Name'){
				flag = true;
			}
		});
		if(flag){
			juci.dataset("user", currentUser);
			SHData.Count("Adv_Emp_Code",function(response){
				var result = response.rows[0];
			if(result["COUNT(Adv_Emp_Code)"] === 0){
				}
				else{
					initNav();
				}
			},function(fr){
				$m.logError("Database fetch failed. Reason - " + JSON.stringify(fr));
				$m.alert("Error while fetching database");
			});
		}else{
			window.dbHelper.db.executeSql("ALTER TABLE shdata ADD COLUMN AM_Name VARCHAR",function(sr){
				window.dbHelper.db.executeSql("ALTER TABLE shdata ADD COLUMN AM_Code VARCHAR",function(sr){
					juci.dataset("user", currentUser);
					SHData.Count("Adv_Emp_Code",function(response){
						var result = response.rows[0];
						if(result["COUNT(Adv_Emp_Code)"] === 0){
						}else{
							initNav();
						}
					},function(fr){
						$m.logError("Database fetch failed. Reason - " + JSON.stringify(fr));
						$m.alert("Error while fetching database");
					});
				},function(fr){
					$m.logError("Database fetch failed. Reason - " + JSON.stringify(fr));
					//$m.alert("Error while fetching database");
					currentUser = {"code":JSON.parse(JSON.parse($m.getUsername())),"name":$m.getUserAccount().customProperties.Login_Name,"usertype":$m.getUserAccount().customProperties.User_Type};
					//	$m.alert(currentUser);
					juci.dataset("user", currentUser);
					SHData.Count("Adv_Emp_Code",function(response){
						var result = response.rows[0];
						if(result["COUNT(Adv_Emp_Code)"] === 0){
						/*	$m.alert("Proceed to download your organisation heirarchy","Organisational Heirarchy", function(){
								$m.open("Data Sync","/Team Login/shdatasync.html",{data:currentUser});	
							});*/
						}else{
							initNav();
						}
					},function(fr){
						$m.logError("Database fetch failed. Reason - " + JSON.stringify(fr));
						$m.alert("Error while fetching database");
					});
				});
			},function(fr){
				$m.logError("Database fetch failed. Reason - " + JSON.stringify(fr));
				//$m.alert("Error while fetching database");
				currentUser = {"code":JSON.parse(JSON.parse($m.getUsername())),"name":$m.getUserAccount().customProperties.Login_Name,"usertype":$m.getUserAccount().customProperties.User_Type};
				//	$m.alert(currentUser);
				juci.dataset("user", currentUser);
				SHData.Count("Adv_Emp_Code",function(response){
					var result = response.rows[0];
					if(result["COUNT(Adv_Emp_Code)"] === 0){
					/*	$m.alert("Proceed to download your organisation heirarchy","Organisational Heirarchy", function(){
							$m.open("Data Sync","/Team Login/shdatasync.html",{data:currentUser});	
						});*/
					}else{
						initNav();
					}
				},function(fr){
					$m.logError("Database fetch failed. Reason - " + JSON.stringify(fr));
					$m.alert("Error while fetching database");
				});
			});
		}		
	},function(fr){
		$m.logError("Pragma fetch failed. Reason - " + JSON.stringify(fr));
		$m.alert("Error while fetching database");
	});
}



function drillDown(e){
	
      getId(e.control._id);
	openDrillDown(e.control._id, e.value.code._latestValue);
	
	
}

function openDrillDown(id, code){
	
	switch(id){
		case "zm":
			cZM = code;
			rm_list.show();
			juci.getControl("rm").value(null);
			hierarchyDataManager.getRMByZM(code,"rmlist");
			
			break;
		case "rm":
			cRM = code;
			am_list.show();
			juci.getControl("am").value(null);
			hierarchyDataManager.getAMByRM(code,"amlist");
		
			break;
		case "am":
			cAM = code;
			bm_list.show();
			  juci.getControl("bm").value(null);
			hierarchyDataManager.getBMByAM(code,"bmlist");
		
			break;
		case "bm":
			cBM = code;
			sm_list.show();
			 juci.getControl("sm").value(null);
			hierarchyDataManager.getSMByBM(code,"smlist");
	        	sm_list.show();
			break;
		case "sm":
			cSM = code;
				ad_list.show();
				juci.getControl("ad").value(null);
			hierarchyDataManager.getAdvisorBySM(code,"adlist");
		
			break;	
		case "tpsm":
			cTPSM = code;
				tpsm_list.show();
				juci.getControl("ad").value(null);
			hierarchyDataManager.getAdvisorByTPSM(code,"tpsmlist");
		
			break;	
		case "tppr":
			cTPSM = code;
				tppar_list.show();
				juci.getControl("ad").value(null);
			hierarchyDataManager.getAdvisorByTPSM(code,"tpparlist");
		
			break;	
		case "agsm":
			cSM = code;
				agsm_list.show();
				juci.getControl("ad").value(null);
			hierarchyDataManager.getAdvisorByAGSM(code,"agsmlist");
		
			break;
		case "agps":
			cSM = code;
				agps_list.show();
				juci.getControl("ad").value(null);
			hierarchyDataManager.getAdvisorByAGSM(code,"agpslist");
		
			break;	
		case "tpbom":
			cSM = code;
				agps_list.show();
				juci.getControl("ad").value(null);
			hierarchyDataManager.getAdvisorByAGSM(code,"tpbomlist");
		
			break;	
		case "prsm":
			cSM = code;
				prsm_list.show();
				juci.getControl("ad").value(null);
			hierarchyDataManager.getAdvisorByPRSM(code,"prsmlist");
		
			break;
		case "cnsm":
			cSM = code;
				cnsm_list.show();
				juci.getControl("ad").value(null);
			hierarchyDataManager.getAdvisorByCNSM(code,"cnsmlist");
		
			break;
	}
}


juci.addDataset("zmlist",[]);

juci.addDataset("rmlist",[]);

juci.addDataset("bmlist",[]);

juci.addDataset("smlist",[]);

juci.addDataset("adlist",[]);

juci.addDataset("amlist",[]);

juci.addDataset("cdaadvlist",[]);

juci.addDataset("tpsmlist",[]);

juci.addDataset("tpparlist",[]);

juci.addDataset("tpadvlist",[]);
$m.juci.addDataset("agsmlist",[]);
$m.juci.addDataset("agpslist",[]);
$m.juci.addDataset("agadvlist",[]);
$m.juci.addDataset("flslist",[]);
$m.juci.addDataset("tpbomlist",[]);
$m.juci.addDataset("prsmlist",[]);
$m.juci.addDataset("cnsmlist",[]);

var currentList;

function showList(listid){
	setTimeout(function(){
		if(currentList){
			currentList.hide();
		}
		currentList = juci.getControl(listid);
		currentList.show();
		updateNav(listid);
	},100);
}

function updateNav(listid){
	var navHTML = "";
	switch(listid){
		case "zm":
			listNav.innerHTML = '<li>ZM &nbsp;&gt;</li>';
			break;
		case "rm":
			if(cZM)
				navHTML += '<li onclick="navTo(\'zm\')">ZM &nbsp;&gt;</li>';
			listNav.innerHTML = navHTML + '<li>RM &nbsp;&gt;</li>';
			break;
		case "am":
			if(cZM)
				navHTML += '<li onclick="navTo(\'zm\')">ZM &nbsp;&gt;</li>';
			if(cRM)
				navHTML += '<li onclick="navTo(\'rm\')">RM &nbsp;&gt;</li>';
			listNav.innerHTML = navHTML += '<li>BM &nbsp;&gt;</li>';
			break;
		case "bm":
			if(cZM)
				navHTML += '<li onclick="navTo(\'zm\')">ZM &nbsp;&gt;</li>';
			if(cRM)
				navHTML += '<li onclick="navTo(\'rm\')">RM &nbsp;&gt;</li>';
			if(cAM)
				navHTML += '<li onclick="navTo(\'am\')">AM &nbsp;&gt;</li>';
			listNav.innerHTML = navHTML += '<li>BM &nbsp;&gt;</li>';
			break;
		case "sm":
			if(cZM)
				navHTML += '<li onclick="navTo(\'zm\')">ZM &nbsp;&gt;</li>';
			if(cRM)
				navHTML += '<li onclick="navTo(\'rm\')">RM &nbsp;&gt;</li>';
			if(cAM)
				navHTML += '<li onclick="navTo(\'am\')">AM &nbsp;&gt;</li>';
			if(cBM)
				navHTML += '<li onclick="navTo(\'bm\')">BM &nbsp;&gt;</li>';
			if(cTM)
				navHTML += '<li onclick="navTo(\'tm\')">TM &nbsp;&gt;</li>';
			listNav.innerHTML = navHTML += '<li>SM &nbsp;&gt;</li>';
			break;
		case "ad":
			if(cZM)
				navHTML += '<li onclick="navTo(\'zm\')">ZM &nbsp;&gt;</li>';
			if(cRM)
				navHTML += '<li onclick="navTo(\'rm\')">RM &nbsp;&gt;</li>';
			if(cAM)
				navHTML += '<li onclick="navTo(\'am\')">AM &nbsp;&gt;</li>';
			if(cBM)
				navHTML += '<li onclick="navTo(\'bm\')">BM &nbsp;&gt;</li>';
			if(cTM)
				navHTML += '<li onclick="navTo(\'tm\')">TM &nbsp;&gt;</li>';
			if(cSM)
				navHTML += '<li onclick="navTo(\'sm\')">SM &nbsp;&gt;</li>';	
			listNav.innerHTML = navHTML += '<li>ADV</li>';
			break;
		case "cdaadv":
			if(cZM)
				navHTML += '<li onclick="navTo(\'zm\')">ZM &nbsp;&gt;</li>';
			if(cRM)
				navHTML += '<li onclick="navTo(\'rm\')">RM &nbsp;&gt;</li>';
			if(cAM)
				navHTML += '<li onclick="navTo(\'am\')">AM &nbsp;&gt;</li>';
			if(cBM)
				navHTML += '<li onclick="navTo(\'bm\')">BM &nbsp;&gt;</li>';
			if(cTM)
				navHTML += '<li onclick="navTo(\'tm\')">TM &nbsp;&gt;</li>';
			if(cSM)
				navHTML += '<li onclick="navTo(\'sm\')">SM &nbsp;&gt;</li>';	
			if(cCDASM)
				navHTML += '<li onclick="navTo(\'cdasm\')">CDASM &nbsp;&gt;</li>';	
			listNav.innerHTML = navHTML += '<li>ADV</li>';
			break;
		case "tpsm":
			if(cZM)
				navHTML += '<li onclick="navTo(\'zm\')">ZM &nbsp;&gt;</li>';
			if(cRM)
				navHTML += '<li onclick="navTo(\'rm\')">RM &nbsp;&gt;</li>';
			if(cAM)
				navHTML += '<li onclick="navTo(\'am\')">AM &nbsp;&gt;</li>';
			if(cBM)
				navHTML += '<li onclick="navTo(\'bm\')">BM &nbsp;&gt;</li>';
			if(cTM)
				navHTML += '<li onclick="navTo(\'tm\')">TM &nbsp;&gt;</li>';
			listNav.innerHTML = navHTML += '<li>SM &nbsp;&gt;</li>';
			break;
		case "tppar":
			if(cZM)
				navHTML += '<li onclick="navTo(\'zm\')">ZM &nbsp;&gt;</li>';
			if(cRM)
				navHTML += '<li onclick="navTo(\'rm\')">RM &nbsp;&gt;</li>';
			if(cAM)
				navHTML += '<li onclick="navTo(\'am\')">AM &nbsp;&gt;</li>';
			if(cBM)
				navHTML += '<li onclick="navTo(\'bm\')">BM &nbsp;&gt;</li>';
			if(cTM)
				navHTML += '<li onclick="navTo(\'tm\')">TM &nbsp;&gt;</li>';
			listNav.innerHTML = navHTML += '<li>SM &nbsp;&gt;</li>';
			break;
		case "agsm":
			if(cZM)
				navHTML += '<li onclick="navTo(\'zm\')">ZM &nbsp;&gt;</li>';
			if(cRM)
				navHTML += '<li onclick="navTo(\'rm\')">RM &nbsp;&gt;</li>';
			if(cAM)
				navHTML += '<li onclick="navTo(\'am\')">AM &nbsp;&gt;</li>';
			if(cBM)
				navHTML += '<li onclick="navTo(\'bm\')">BM &nbsp;&gt;</li>';
			if(cTM)
				navHTML += '<li onclick="navTo(\'tm\')">TM &nbsp;&gt;</li>';
			listNav.innerHTML = navHTML += '<li>SM &nbsp;&gt;</li>';
			break;
			
		case "cnsm":
			if(cZM)
				navHTML += '<li onclick="navTo(\'zm\')">ZM &nbsp;&gt;</li>';
			if(cRM)
				navHTML += '<li onclick="navTo(\'rm\')">RM &nbsp;&gt;</li>';
			if(cAM)
				navHTML += '<li onclick="navTo(\'am\')">AM &nbsp;&gt;</li>';
			if(cBM)
				navHTML += '<li onclick="navTo(\'bm\')">BM &nbsp;&gt;</li>';
			if(cTM)
				navHTML += '<li onclick="navTo(\'tm\')">TM &nbsp;&gt;</li>';
			listNav.innerHTML = navHTML += '<li>SM &nbsp;&gt;</li>';
			break;
			
		case "prsm":
			if(cZM)
				navHTML += '<li onclick="navTo(\'zm\')">ZM &nbsp;&gt;</li>';
			if(cRM)
				navHTML += '<li onclick="navTo(\'rm\')">RM &nbsp;&gt;</li>';
			if(cAM)
				navHTML += '<li onclick="navTo(\'am\')">AM &nbsp;&gt;</li>';
			if(cBM)
				navHTML += '<li onclick="navTo(\'bm\')">BM &nbsp;&gt;</li>';
			if(cTM)
				navHTML += '<li onclick="navTo(\'tm\')">TM &nbsp;&gt;</li>';
			listNav.innerHTML = navHTML += '<li>SM &nbsp;&gt;</li>';
			break;
	}
}

function navTo(listid){
	switch(listid){
		case "zm":
			showList("zm");
			break;
		case "rm":
			showList("rm");
			break;
		case "am":
			showList("am");
			break;
		case "bm":
			showList("bm");
			break;
		case "sm":
			showList("sm");
			break;
		case "tpsm":
			showList("tpsm");
			break;
		case "tppr":
			showList("tppr");
			break;
		case "agsm":
			showList("agsm");
			break;
		case "agps":
			showList("agps");
			break;
		case "tpbom":
			showList("tpbom");
			break;
		case "tpbom":
			showList("tpbom");
			break;
		case "cnsm":
			showList("cnsm");
			break;
		case "prsm":
			showList("prsm");
			break;
	}
}

$m.juci.addDataset("Cuser","");
$m.juci.addDataset("CuserCode","");
var currentList;
var addUser = {};
juci.addDataset("advisorCode","");
juci.addDataset("advisorName","");

function confirmTeamUser(e){
	var user = e.data;
	advUser = {
		"Adv_Emp_Code": e.value.code._latestValue,
  		"Adv_Emp_Name": e.value.name._latestValue,
  		"LA_Business_LoginCode": e.value.code._latestValue
	}
	juci.dataset("advisorCode",e.value.code._latestValue);
	juci.dataset("advisorName",e.value.name._latestValue);
	$m.putPref("useAs",advUser);
	$m.savePref();
	var idValue = e.control._id;
	$m.putPref("id_Value",idValue);
	$m.savePref();
}

function getUserDetail(){
	//infoList.hide();
	//navList.show();
	juci.dataset("bmlist",hierarchyDataManager.getBMByAM(currentUser.code));
//	showList("sm");
	$m.putPref("useAs","");
}

function proceedToProposalSection(){
	callService();
}
function format(e){
	
	return e.name;
	
}
function formatTPSM(e){
 return	e.name +"-"+ e.code;
}

function compare(a,b){
	
	return a['code']=== b['code'];

	
}
function getId(id){
	
	return id;
	
}
function gettype(){
	var currentUser = "";
		try{
			currentUser = {"code":$m.getUsername(),"name":$m.getUserAccount().customProperties.Login_Name,"usertype":$m.getUserAccount().customProperties.User_Type};	
		}catch(e){
			currentUser = {
				"usertype" : ""
			}
		}
	
	return currentUser.usertype;
}


