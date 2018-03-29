$m.onResume(function(){
	var hName = $m.juci.dataset('headerName');
//	var alertCount = $m.juci.dataset('alertcount');
	$m.pageTitle('<div class="page_title"><div style="text-align:center" class="title_image"><img src="images/relaince-logo.png"></img></div></div>');
    $m.pageTitleLeftButton('<div class="left_heading"><div class="header_left" onclick="onBackPress()"><img src="images/arrow-left2.png"></div><div class="seperator"></div><div style="text-align:left" class="page_name">&nbsp '+hName+'</div></div>');
    $m.pageTitleRightButton('<div class="icons"><div class="icon contact"><img class="contactimg" src="images/mobileWhite.png" onclick="openCallContact()"/></div><div class="icon plus"><img class="plusimg" src="images/add.png" onclick="openplus(event)"/></div><div class="icon icon1"><div class="notif1"><div class="pAlert"><div class="alert" id="alertCount" onClick="onNotificationsClick()"></div><img src="images/Notifications.png" onClick="onNotificationsClick()"/></div></div></div><div class="icon icon2"><img src="images/more.png" onclick="openMenu(event)"/></div></div>');
	$m.juci.findById("network-calculator").show();
	$m.juci.dataset("isLeadOrAdvisor",false);
	$m.juci.dataset("isPreviousEntry",false);
	$m.juci.dataset("isPremiumExceed",false);
});

function initNetworkCalculator() {
	$m.juci.dataset("thinbar","Welcome to Newtork Calculator...");
	$m.juci.dataset("footerText","Please answer for the above questions");
	showMenu("network-calculator");
	$m.juci.dataset("questionaries",{"relativesCount":"","relatives":["Upto 100","101-250","251-500","More than 500"],"spouseOptions":["Yes","No"],"spouse":"","inLawsoptions":["Upto 100","101-250","251-500","More than 500",""],"inLawsValue":"","socialMediaoptions":["Upto 500","501-1000","1001-2000","More than 2000"],"socialMediaValue":"","businessOptions":["Yes","No"],"businessValue":"","businessCustomerOptions":["Upto 500","501-1000","1001-2000","More than 2000"],"businessCustomerValue":"","policyOptions":["3","4","5","6","7","8"],"policyValue":""});
	$m.juci.dataset("isCalculator",false);
}

function onChangeClick(e) {
	var datasetData = $m.juci.dataset("questionaries");
	if(e.value == "No") {
		datasetData.inLawsValue = 0;
	}
	$m.juci.dataset("questionaries",datasetData);
}

function onChangeBusinessClick(e) {
	var datasetData = $m.juci.dataset("questionaries");
	if(e.value == "No") {
		datasetData.businessCustomerValue = 0;
	}
	$m.juci.dataset("questionaries",datasetData);
}

function onSubmitClick () {
	var datasetData = $m.juci.dataset("questionaries");
	var selectedOptions = {
		"firstQuestionAns": datasetData.relativesCount,
		"thirdQuestionAns": datasetData.socialMediaValue,
		"secondQuestionAns": datasetData.inLawsValue,
		"fourthQuestionAns": datasetData.businessCustomerValue,
		"noOfPolicies"	: datasetData.policyValue
	};
	var networkCalculatorCallback = function (res) {
		console.log(res);
		var networkDataset = $m.juci.dataset("networkCalci");
		networkDataset = "Congratulations! Your network is estimated to have " + res.estimatedConnections + " connections. You have potential to sell " + res.estimationPoliciesSold + " policies to your connections and achieve policy sales target for next " + res.estimatedYearsOfSales + " year/s. Join us today.";
		$m.juci.dataset("networkCalci",networkDataset);
		utils.ShowDialog("dialog-network-calculator");
	};
	networkCalculator.calculateEstimatedNetworkConnections(selectedOptions , networkCalculatorCallback);
}

function onClose(id) {
	utils.HideDialog(id);
	$m.juci.dataset("questionaries",{"relativesCount":"","relatives":["Upto 100","101-250","251-500","More than 500"],"spouseOptions":["Yes","No"],"spouse":"","inLawsoptions":["Upto 100","101-250","251-500","More than 500",""],"inLawsValue":"","socialMediaoptions":["Upto 500","501-1000","1001-2000","More than 2000"],"socialMediaValue":"","businessOptions":["Yes","No"],"businessValue":"","businessCustomerOptions":["Upto 500","501-1000","1001-2000","More than 2000"],"businessCustomerValue":"","policyOptions":["3","4","5","6","7","8"],"policyValue":""});
	$m.close();
}