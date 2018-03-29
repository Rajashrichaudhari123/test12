$m.juci.addDataset("monthNames",["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]);
$m.juci.addDataset("month","");
$m.juci.addDataset("month1","");
$m.juci.addDataset("yearNames",["2017","2018","2019"]);
$m.juci.addDataset("year","");
$m.juci.addDataset("year1","");
$m.juci.addDataset("userExperianceOptions",{"targets":"","performance":""});
$m.juci.addDataset("target_amounts",{"monthlyIncentiveTarget":"","wcp":"","monthlyNewLicenceTarget":""});
$m.juci.addDataset("wcpOptions",["5","7","10"]);
$m.juci.addDataset("isPerformance",false);
$m.juci.addDataset("isTargets",true);
$m.juci.addDataset("NBCalls",{"target":"10","achieved":"20","perAcheived":"30"});
$m.juci.addDataset("NOP",{"target":"10","achieved":"20","perAcheived":"30"});
$m.juci.addDataset("Recruitment_Leads",{"target":"10","achieved":"20","perAcheived":"30"});
$m.juci.addDataset("Sales_Lead",{"target":"10","achieved":"20","perAcheived":"30"});
$m.juci.addDataset("WCP",{"target":"10","achieved":"20","perAcheived":"30"});
$m.juci.addDataset("isPerformanceTable",false);
$m.juci.addDataset("salescallperday",0);
$m.juci.addDataset("sales_rec_perday",0);
$m.juci.addDataset("salesLeadsText","");

$m.onResume(function(){
	initResume();
	$m.juci.dataset("headerName","User Progress");
	
});

$m.onData(function(event){
	$m.juci.getControl("targetform").reset();
	$m.juci.getControl("targetform").clearValidation();
});

function initResume() {
	juci.getControl("toogle").toggle(0);
	$m.juci.dataset("isTargets",true);
	$m.juci.dataset("isPerformance",false);
	$m.juci.dataset("isPerformanceTable",false);
	var setdata = new Date().toString("MMM-yyyy").split("-");
	$m.juci.dataset("month",setdata[0]);
	$m.juci.dataset("year",setdata[1]);
	checkTargetsCurrentMonth();
}

function toggleView(e){
	switch (e.newToggled) {
		case 0:
			$m.juci.dataset("isTargets",true);
			$m.juci.dataset("isPerformance",false);
			break;
		case 1:
			$m.juci.dataset("isTargets",false);
			$m.juci.dataset("isPerformance",true);
			break;
	}
}

function sumitTargets(e){
	var targetData = $m.juci.dataset("target_amounts");
	var month = $m.juci.dataset("month");
	var year = $m.juci.dataset("year");
	if(targetData && month && year){
		var updateTargets = {};
		updateTargets.IncentiveTarget = targetData.monthlyIncentiveTarget;
		updateTargets.License_Tgt = targetData.monthlyNewLicenceTarget;
		updateTargets.WCP = targetData.wcp;
		updateTargets.LoginCode = $m.getUsername();
		updateTargets.Role = gettype();
		var getMonth = getMonthFromString(month);
		updateTargets.month = getMonth.toString();
		updateTargets.year = year;
		$m.juci.dataset("isPerformanceTable",false);
		
		insertUpdateTarget(updateTargets);
	}else{
		$m.alert('Please enter all the data'); // TODO : Replace with Juci form validation
	}
}

function insertUpdateTarget(data){
	if($m.networkConnected()){
		var service = new ServiceLibrary();
		var responseCallback = function(res){
			if(res.Status == "Y"){
				$m.toast("Data Updated successfully");
				$m.juci.dataset("isPerformance",true);
				$m.juci.dataset("isTargets",false);
				var changeToggle = {
					"newToggled":1
				};
				toggleView(changeToggle);
				onViewClick("1");
				
			} else {
				$m.alert("insert update failed due to :"+JSON.stringify(res));
				$m.logError("insert update failed due to :"+JSON.stringify(res));
			}
		};
		service.insertUpdateTargets(responseCallback,data);
	}else {
		$m.alert(messages.NoNetworkConnectivity);
	};
}

function onViewClick(data){
	var month="",year="";
	if(data == "1"){
		month = $m.juci.dataset("month");
		year = $m.juci.dataset("year");
		$m.juci.dataset("month1",month);
		$m.juci.dataset("year1",year);
	}else{
		month = $m.juci.dataset("month1");
		year = $m.juci.dataset("year1");
	}
	
	
	if(!month || !year) {
		$m.alert("Please select month and year options");
	}
	var getMonth = getMonthFromString(month);
	var data = {
		"Month":getMonth.toString(),
		"Year":year,
		"Role":gettype(),
		"LoginCode":$m.getUsername()
	};
	getUserTargetAchievedData(data);
	
}

function getUserTargetAchievedData(data){
	if($m.networkConnected()){
		var service = new ServiceLibrary();
		utils.ShowProgress("Please wait..");
		var responseCallback = function(res){
			if(res.Status == "Y"){
				utils.HideProgress();
				var responseData = res.lstUserTargetAchievedDataResponse;
				if(!responseData.length){
					$m.alert("No records are found");
					$m.juci.dataset("isPerformanceTable",false);
					return;
				}
				for(var i=0;i<responseData.length;i++){
					if(responseData[i].col == "NBCalls"){
						var nbCallsData = $m.juci.dataset("NBCalls");
						nbCallsData.target = responseData[i].T;
						var salescallperday =  (nbCallsData.target && nbCallsData.target !=="") ? parseFloat(nbCallsData.target/25): 0;
						$m.juci.dataset("salescallperday",salescallperday);
						nbCallsData.achieved = responseData[i].A;
						nbCallsData.perAcheived = responseData[i].P;
						$m.juci.dataset("NBCalls",nbCallsData);
					}
					if(responseData[i].col == "NOP"){
						var nopData = $m.juci.dataset("NOP");
						nopData.target = responseData[i].T;
						nopData.achieved = responseData[i].A;
						nopData.perAcheived = responseData[i].P;
						$m.juci.dataset("NOP",nopData);
					}
					if(responseData[i].col == "Recruitment_Leads"){
						var recruitmentLeadsData = $m.juci.dataset("Recruitment_Leads");
						recruitmentLeadsData.target = responseData[i].T;
						recruitmentLeadsData.achieved = responseData[i].A;
						recruitmentLeadsData.perAcheived = responseData[i].P;
						$m.juci.dataset("Recruitment_Leads",recruitmentLeadsData);
						var sales_rec_perday = (recruitmentLeadsData.target && recruitmentLeadsData.target !=="") ? parseFloat(recruitmentLeadsData.target/25) : 0;
						$m.juci.dataset("sales_rec_perday",sales_rec_perday);
						if(gettype() =='AGADV' && gettype() =='CNADV' && gettype() =='PRADV' && gettype() =='TPADV') {
							$m.juci.dataset("salesLeadsText","sales leads per day");
						} else {
							$m.juci.dataset("salesLeadsText","recruitment leads per day");
						}
					}
					if(responseData[i].col == "Sales_Lead"){
						var salesLeadsData = $m.juci.dataset("Sales_Lead");
						salesLeadsData.target = responseData[i].T;
						salesLeadsData.achieved = responseData[i].A;
						salesLeadsData.perAcheived = responseData[i].P;
						$m.juci.dataset("Sales_Lead",salesLeadsData);
					}
					if(responseData[i].col == "WCP"){
						var wcpData = $m.juci.dataset("WCP");
						wcpData.target = responseData[i].T;
						wcpData.achieved = responseData[i].A;
						wcpData.perAcheived = responseData[i].P;
						$m.juci.dataset("WCP",wcpData);
					}	
				}
				juci.getControl("toogle").toggle(1);
				$m.juci.dataset("isPerformanceTable",true);
			} else {
				utils.HideProgress();
				$m.alert("get user target achieved data failed due to :" + JSON.stringify(res));
				$m.logError("get user target achieved data failed due to :" + JSON.stringify(res));
			}
		};
		service.getUserTargetAchievedData(responseCallback,data);
	} else {
		$m.alert(messages.NoNetworkConnectivity);
	};
}

function checkTargetsCurrentMonth(){
	$m.juci.getControl("targetform").clearValidation();
	setTimeout(function(){
		var month = $m.juci.dataset("month");
		var year = $m.juci.dataset("year")
		if(!month || !year) {
			//$m.alert("Please select month and year options");
		}else{
			$m.juci.dataset("month1",month);
			$m.juci.dataset("year1",year);
			$m.juci.dataset("isPerformanceTable",false);
			$m.showProgress('Please wait...');
			var getMonth = getMonthFromString(month);
			var data = {
				"Month":getMonth.toString(),
				"Year":year
			};
			chkTarSumForCurrMonth(data);
		}
	},300);	
}


function chkTarSumForCurrMonth(targetData){
	var data = {"Login_Code":$m.getUsername(),"Month":targetData.Month,"Year":targetData.Year};
	if($m.networkConnected()){
		var service = new ServiceLibrary();
		var chkTarSumForCurrMonthresponseCallback = function(res){
			var responseData = res.ChkTargetsCurrMonth;
			var targetAmount = $m.juci.dataset("target_amounts");
			targetAmount.monthlyIncentiveTarget = responseData.Incentive_Tgt;
			targetAmount.wcp = responseData.WCP;
			targetAmount.monthlyNewLicenceTarget = responseData.License_Tgt;
			$m.juci.dataset("target_amounts",targetAmount);	
			$m.hideProgress();
			if(!targetAmount.monthlyIncentiveTarget){
				$m.alert('No records are found');
			}
		};
		service.chkTargetsCurrMonth(chkTarSumForCurrMonthresponseCallback,data);
	} else {
		$m.alert(messages.NoNetworkConnectivity);
	};
}

function getMonthFromString(mon){
   return new Date(Date.parse(mon +" 1, 2012")).getMonth()+1;
}

function getWipName(obj){
	return obj.wip;
}

function showWCPdata(data){
	return data+"x";
}