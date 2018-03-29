$m.juci.addDataset("newsupdate", "");
$m.juci.addDataset("cfr_count", "");
$m.juci.addDataset("aptns_count", "");
$m.juci.addDataset("renl_count", "");
 $m.juci.addDataset("sync","");
 $m.juci.addDataset("synccfr","");
 $m.juci.addDataset("syncRenl","");
 $m.juci.addDataset("syncApp","");
 $m.juci.addDataset("syncNews","");
 $m.juci.addDataset("username","");

function checkitem(item) {
  var str = item();
 if (str === "2,34,000") {
  return true;
}

else {
  return false;
}
}

$m.onReady(function() {
	juci.dataset("headerName","Home");
 var head = document.getElementsByClassName("juci_panel_title");
 juci.viewModel.applyBinding(head[0]);
 $m.juci.dataset("alertcount", "3");

 // juci.getControl("menu_list").removeListItemClick();
 juci.getControl("menu_list").addListItemClick(Count,this,".refresh_image");
    // var username =  JSON.parse($m.getUserAccount()).fname;
    //  $m.juci.dataset("username",username);
});








function NewsUpdates() {
   var a = [];
 
var news_update = [];
 /*service.GetLatestNewsUpdates(function(list) {
  var data = list.result.data;
  data = JSON.parse(data);
  
   news_update= data;
  
 /* a.push(data.NewsAlerts);
  update_data = update_data.concat(data.NewsAlerts);
  news_update = update_data.concat(data.PressAlerts)


  for (var i = 0; i < news_update.length; i++){
  
  
   news_update[i]["img"] = "images/news.jpg";

}

  $m.putAppPref("NewsUpdate", news_update,true);
  $m.savePref();
  $m.juci.dataset("newsupdate", news_update);
});*/
}

function openPack(e) {
if (e.data.name == "Applications") {
  $m.open("Applications", "/Applications/Application.html");
}

else if (e.data.name == "Call For Requirement") {
$m.open("cfr", "/Call For Requirement/cfr.html");
}

else if (e.data.name == "Renewals") {
$m.open("renewals", "/Renewals/renewals.html");
}

else if (e.data.name == "Products") {
$m.open("Products", "/Products/Products.html");
}
}

function getCFR() {
/*	 service = new ServiceLibrary();
service.GetLatestOpenCfrCount(function(value) {

  var result = value.data;

  var data = JSON.parse(result);

  var cfr_count = {
   "count": data.Value,
   "pname": "New"
};
  $m.putAppPref("Cfr_Count", cfr_count,true);
  $m.savePref();
  $m.juci.dataset("cfr_count", cfr_count);
});*/
}

function getRenewal() {
	 service = new ServiceLibrary();
/*service.GetUpcomingRenewalCount(function(value) {

  var result = value.data;

  var data = JSON.parse(result);

  var rnl_count = {
   "count": data.Value,
   "pname": "New"
};
  $m.putAppPref("Renewal_Count", rnl_count,true);
  $m.savePref();
 
  $m.juci.dataset("renl_count", rnl_count);
});*/

}

function getappn() {
/*service.GetLatestApplicationsCount(function(value) {

  var result = value.data;

  var data = JSON.parse(result);
  var aptn_count = {
   "count": data.Value,
   "pname": "New"
};
  $m.putAppPref("Apptn_Count", aptn_count,true);
  $m.savePref();
  $m.juci.dataset("aptns_count", aptn_count);
});*/

}

function Count(event) {

		
 var time= new Date().getTime();
 
   time = new Date(time);
 
  var sync = time.toString("dd MMM yy hh:mm tt");
  
  $m.putAppPref("sync",sync,true);
  $m.savePref();
 
 var sync_value = $m.getPref("sync");
 
 
    var data=event.data;
 

 if (data.name == "Call For Requirement") {
 	 getCFR();
  var cfr_count = $m.getPref("Cfr_Count");
  
  $m.juci.dataset("cfr_count", cfr_count);
   $m.juci.dataset("synccfr",sync_value);
    $m.toast("Call For Requirement Updated sucessfully ");
}

else if (data.name == "Renewals") {
		getRenewal();
var rnl_count = $m.getPref("Renewal_Count");
  $m.juci.dataset("renl_count", rnl_count);
   $m.juci.dataset("syncRenl",sync_value);
   $m.toast("Renewals Updated sucessfully ");
}

else if (data.name == "Applications") {
	getappn();
	var appCount;
	
var aptn_count = $m.getPref("Apptn_Count");
if($m.getPref("AppCount")){
		 appCount = $m.getPref("AppCount");
		AppltnCount= parseInt(appCount+ aptn_count);
		 $m.juci.dataset("aptns_count", AppltnCount);
	}
  $m.juci.dataset("aptns_count", aptn_count);
   $m.juci.dataset("syncApp",sync_value);
    $m.toast("Applications Updated sucessfully ");
}

else if (data.name == "News and Updates") {
	
 //NewsUpdates();
var news_update = $m.getPref("NewsUpdate");
  $m.juci.dataset("newsupdate", news_update);
   $m.juci.dataset("syncNews",sync_value);
   $m.toast("News and Updates Updated sucessfully ");
}
}


$m.onData(function(eventObject) {
/*  var time= new Date().getTime();
 
 time = new Date(time);
 
  var sync_time = time.toString("dd MMM yy  hh:mm tt");
  $m.putPref("Sync Time", sync_time);
  $m.savePref();
   var  sync_t = $m.getPref("Sync Time");*/
  
           
 service = new ServiceLibrary();
 
NewsUpdates();
getCFR();
 getappn();
 getRenewal();
 preference();
  
});

function preference(){
	NewsUpdates();
getCFR();
 getappn();
 getRenewal();
 preference();
  
	 var sync_value = $m.getAppPref("sync");
   var news_update= $m.getAppPref("NewsUpdate");
   var rnl_count = $m.getAppPref("Renewal_Count");
   var cfr_count = $m.getAppPref("Cfr_Count");
   var aptn_count = $m.getAppPref("Apptn_Count");
     $m.juci.dataset("synccfr",sync_value);
      $m.juci.dataset("syncRenl",sync_value);
      $m.juci.dataset("syncApp",sync_value);
      $m.juci.dataset("syncNews",sync_value);
      $m.juci.dataset("newsupdate", news_update);
      $m.juci.dataset("aptns_count", aptn_count);
      $m.juci.dataset("renl_count", rnl_count);
      $m.juci.dataset("cfr_count", cfr_count);
          
         
}
 