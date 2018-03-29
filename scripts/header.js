/**
 * header.js
 * @author CloudPact Technologies
 * @description : This script is used for page title.
 **/

$m.onResume(function(){
	// Code to execute when the page is ready
	var hName = $m.juci.dataset('headerName');
	//var alertCount = $m.juci.dataset('alertcount');
	$m.pageTitle('<div class="page_title"><div style="text-align:center" class="title_image"><img src="images/relaince-logo.png"></img></div></div>');
    $m.pageTitleLeftButton('<div class="left_heading"><div class="header_left"><img src="images/arrow-left2.png"></div><div class="seperator"></div><div style="text-align:left" class="page_name">&nbsp '+hName+'</div></div>');
    $m.pageTitleRightButton('<div class="icons"><div class="icon contact"><img class="contactimg" src="images/mobileWhite.png" onclick="openCallContact()"/></div><div class="icon plus"><img class="plusimg" src="images/add.png" onclick="openplus(event)"/></div><div class="icon icon1"><div class="notif1"><div class="pAlert"><div class="alert" id="alertCount" onClick="onNotificationsClick()"></div><img src="images/Notifications.png" onClick="onNotificationsClick()"/></div></div></div><div class="icon icon2"><img src="images/more.png" onclick="openMenu(event)"/></div></div>');
});