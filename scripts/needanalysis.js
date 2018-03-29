$m.onData(function(eventObject){
	// Code to execute when a data is received from parent page

 $m.openChildBrowser("needAnalysis", "http://lifeplanner.reliancelife.com/", {"navigation": true, "address": [],"patterns": []});
});