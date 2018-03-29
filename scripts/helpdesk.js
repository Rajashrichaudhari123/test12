/**
 * helpdesk.js
 * @author CloudPact Technologies
 * @description : This script is used for helpdesk.
 **/

$m.onReady(function(){
	// Code to execute when the page is ready
	 $m.pageTitle('<div class="page_title"><div style="text-align:center" class="title_image"><img src="images/relaince-logo.png"></img></div></div>')
	$m.pageTitleLeftButton('<div class="left_heading"><div class="header_left"><img src="images/arrow-left2.png"></div><div class="seperator"></div><div style="text-align:left" class="page_name">&nbspHelp Desk</div></div>')
 $m.pageTitleRightButton('<div class="icons"><div class="icon icon1"><div class="notif1"><div class="pAlert"><div class="alert" data-bind="display:alertcount"></div><img src="images/Notifications.png" onclick="onNotificationsClick()"/></div></div></div><div class="icon icon2"><img src="images/more.png" onclick="openMenu(event)"/></div></div>');
 $m.juci.dataset("alertcount", "3");
});

$m.onData(function(eventObject){
	// Code to execute when a data is received from parent page
	var data = eventObject.data;
	if(data == "FAQ"){
		$m.juci.findById("help-section").hide();
		$m.juci.findById("mail-section").hide();
	}else{
		$m.juci.findById("help-section").show();
		$m.juci.findById("mail-section").show();
	}
});

function callCustomer(e){
	var number = e.wrappedData.MobileNumber();
	$m.callContact(number);
}

function emailCustomer(e){
	var email = 'rlife.eassistsupport@relianceada.com';
	$m.email([email], '' , '');
}

function emailClient(e){
	var email = 'rlife.superexpress@relianceada.com';
	$m.email([email], '' , '');
}

function callClient(e){
	var number = e.target.innerText;
	$m.callContact(number);
}

function openBroucher() {
	openDocument("HelpDesk","http://www.reliancenipponlife.com/product_images/plans/alternate_investment_in_falling_interest_rate_regime.pdf");
}

function openDocument(filename, url, Title) {
	//	url = "http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf";
	url = encodeURI(url);
	var fileObj;
	$m.showProgress("Opening Pdf");
		fileObj = $m.file(filename + "_RNLIC.pdf", {
			"level": $m.APP_LEVEL,
			"storageType": $m.SDCARD
		});
	var intentObj = {
		"action": "android.intent.action.VIEW"
	};
	fileObj.getPath(function(x) {
		fileObj.exists(function(y) {
			if (y.result) {
				$m.hideProgress();
				//$m.logInfo("LAF exists - " + y.result);
				//$m.logInfo("LAF Path - " + x.result);
				if ($m.isAndroid()) {
					intentObj.scheme = "file://" + x.result;
					intentObj.mimeType = "application/pdf";
					$m.open("LAF", intentObj.scheme, null, {
						"type": "application/pdf"
					});
				} else {
					$m.open("LAF", url);
				}
				$m.hideProgress();
			} else {
				$m.showProgress("Please wait while downloading ...");
				$m.download(url, fileObj, function(r) {
					if (r.code == "200") {
						$m.hideProgress();
						if ($m.isAndroid()) {
							intentObj.scheme = "file://" + x.result;
							intentObj.mimeType = "application/pdf";

							$m.open("LAF", intentObj.scheme, null, {
								"type": "application/pdf"
							});
						} else {
							$m.open("LAF", url);
						}
					} else {
						$m.hideProgress();
						$m.alert("Incorrect PDF format");
					}
				});
			}
		});
	});
}