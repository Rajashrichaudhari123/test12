/**
 * recommendedVideo.js
 * @author CloudPact Technologies
 * @description : This script is for receiving lead number,input json and shows Online You tube video
 **/
 
var x2js = new X2JS();
var productObj = {};
var videoId;

/** Setting the header name on page load**/
$m.onReady(function(){
	var titleName = "Life Planner" ;
	utils.headerTitle(titleName);
});

$m.onResume(function(){
	initResume();
});


$m.onData(function(eventObject){
	productObj = eventObject.data;
	$m.juci.dataset("productsName",false);
	$m.juci.dataset("showMore",false);
});

/** Stopping the video if close the page**/
$m.onClose(function(){
	stopVideo();
});

/** Showing the online video on loading the page**/
function initResume(){
	displayVideo = $m.juci.findById("rec-video");
	displayVideo.show();
}

/** Open the recommended products page and stop the video**/
function skipToProducts(){
	stopVideo();	
    utils.OpenPage("Products recommendation","/Input Management/recommendedProducts.html",productObj);
}
	
