/**
 * cfr.js
 * @author CloudPact Technologies
 * @description : This script is used for call for requirement data storing into local db.
 **/
 
$(function() {
    $("#filterList").select2({
    	placeholder: "Select",
		minimumResultsForSearch : -1
	});
	
	$("#filterList-listsort").select2({
    	placeholder: "Select",
		minimumResultsForSearch : -1
	});
	
	$("#filterList-sort").select2({
    	placeholder: "Select",
		minimumResultsForSearch : -1
	});
});

var cfr = {
	"all":"",
	"ftnr":"",
	"underwrite":""
};

$m.juci.addDataset("cfrs",cfr);
$m.juci.addDataset("cfr",[]);
$m.juci.addDataset("cfrftnr",[]);
$m.juci.addDataset("cfrUW",[]);
$m.juci.addDataset("options1",["All Open","Open > 5 Days","Due for cancellation in 7 days"]);
$m.juci.addDataset("options2",["Date","Name of Proposer","Plan Name","Type","Status","Raised On"]);
$m.juci.addDataset("options3",["Earliest to Latest","Latest to Earliest"]);
$m.juci.addDataset("selectcatogory",[]);
$m.juci.addDataset("AlertsCount","0");

$m.onReady(function(){
	// Code to execute when the page is ready
	currentView = juci.findById("today");
	juci.dataset("headerName","CFR");
	var head = document.getElementsByClassName("juci_panel_title");
	juci.viewModel.applyBinding(head[0]);
	$m.juci.dataset("alertcount","3");
	
	currentView = juci.findById("today");
	SecondView = juci.findById("thisWeek");
	ThirdView = juci.findById("all");
	SecondView.hide();
	ThirdView.hide();
	ProfileView = $m.juci.findById("profile-content");
	ProfileView.hide();
});
var AllCfrArray = [];
var AllCfrDetailArray = [];
var CfrDetailList= [];
var cfrArray = [];
var service;

// Fetching server data
$m.onData(function(){
	// Code to execute when the page is resumed
	var count = $m.getPref("alertsCount"); 
	if($m.getPref("alertsCount" == undefined)){
		juci.dataset("AlertsCount","");
	}
	juci.dataset("AlertsCount",count);
	$m.removePref("alertsCount");
	new window.DB(CONSTANTS.DBName, function(dbHelper) {
		window.dbHelper = dbHelper;
		if($m.networkConnected()){
			$m.showProgress("Fetching Data...");
			service = new ServiceLibrary();
			service.GetCfrList(function(list){
				$m.hideProgress();
				var obj = {
					"all":list.TotalCount,
					"ftnr":list.FtnrCount,
					"underwrite":list.UWCount	
				};
				if((list.ApplicantCfrDetails == null || list.ApplicantCfrDetails == 0) && (list.FtnrCount == null || list.FtnrCount == 0) && (list.TotalCount == null || list.TotalCount == 0) && (list.UWCount == null || list.UWCount == 0)){
					$m.alert("No Cfr data",function(){
						return;
					});
				} else {
						$m.juci.dataset("cfrs",obj);
					for(var j=0;j<list.ApplicantCfrDetails.length;j++){
						AllCfrArray.push(list.ApplicantCfrDetails[j].ApplicantData);
					}
					for(var i=0;i<list.ApplicantCfrDetails.length;i++){
						AllCfrDetailArray.push(list.ApplicantCfrDetails[i].CfrDetailsList);
					}
					for(var k=0;k<AllCfrDetailArray.length;k++){
						for(l=0;l<AllCfrDetailArray[k].length;l++){
							CfrDetailList.push(AllCfrDetailArray[k][l]);	
						}
					}
					for(var m=0;m<CfrDetailList.length;m++){
						if(CfrDetailList[m].Source == "UW"){
							CfrDetailList[m].UniqueID = CfrDetailList[m].RequestID;
						}else{
						CfrDetailList[m].UniqueID = CfrDetailList[m].ApplicationNumber + CfrDetailList[m].CfrCode;
						}
					}
					PendingCfr.multipleInsert(AllCfrArray,function(success_response){
						PendingCfrDetail.multipleInsert(CfrDetailList,function(success_response){	
							loadDocumentsFromDB();
						
						},function(failure_response){
							$m.logError("Failed multiple insert in pending documents. Reason - " + JSON.stringify(failure_response));
							$m.alert("Failed while inserting the documents");
							loadDocumentsFromDB();
							
						});
					},function(failure_response){
						$m.logError("Failed multiple insert in pending documents. Reason - " + JSON.stringify(failure_response));
						$m.alert("Failed while inserting the documents");
						loadDocumentsFromDB();
					});	
				}	
			}); 
		}else{
				$m.alert("No Internet connection!");
				loadDocumentsFromDB();
			}
	});
	
});

var ftnrarry = [];
var uwarry = [];


function loadDocumentsFromDB(){
	$m.showProgress("Loading...");
	PendingCfr.SelectWithFilter(1,function(success_response){
		$m.juci.dataset("cfr",success_response.rows);
		showContent = false;
		cfrArray = success_response.rows;
		for(var i=0;i<cfrArray.length;i++){
			if(cfrArray[i].CfrSource == "FTNR"){
				ftnrarry.push(cfrArray[i]);
			}else if(cfrArray[i].CfrSource == "UW"){
				uwarry.push(cfrArray[i]);
			}
		}
		$m.juci.dataset("cfrftnr",ftnrarry);
		$m.juci.dataset("cfrUW",uwarry);
		$m.hideProgress();
		
	},function(failure_response){
		$m.logError("Failed select in cfr documents. Reason - " + JSON.stringify(failure_response));
		$m.alert("Failed while fetching the documents");
	});
}



function openUpload(val){
	var obj = val;
	if(obj.CfrCategory == "Document" || obj.CfrCategory == "Others" || obj.CfrCategory == "BOP"){
		$m.open("Upload Cfr", "/Call For Requirement/cfrupload.html", {"data":obj});
	}else if(obj.CfrCategory == "Medical"){
		$m.open("medical Cfr", "/Call For Requirement/medicalCfr.html", {"data":obj});
	}
	
}

	
function showMore(e){
	juci.findById("showmore").hide();
	juci.findById("showless").show();
}

function showLess(){
	juci.findById("showless").hide();
	juci.findById("showmore").show();
}

var toggleid = 0;
$m.juci.addDataset("currentCategory", "all");
function toggleView(e){
		currentView.hide();
		SecondView.hide();
		ThirdView.hide();
		toggleid = e.newToggled;
		if(Sortmenu === true){ 
			$m.juci.findById("sortfiltr").hide();
		}
		if(Filtermenu === true){
			$m.juci.findById("selfiltr").hide();
		}
	switch(e.newToggled){
		case 0:
		//	currentView = juci.findById("today");
			$m.juci.dataset("currentCategory", "all");
			currentView.show();
			break;
		case 1:
		//	SecondView = juci.findById("thisWeek");
			$m.juci.dataset("currentCategory", "ftnr");
			SecondView.show();
			break;
		case 2:
		//	ThirdView = juci.findById("all");
			$m.juci.dataset("currentCategory", "underwriting");
			ThirdView.show();
			break;	
	} 
}
function showCFR(cfrcategory, currentCategory){
	if(currentCategory === "all"){
		return true;
	}
	if(currentCategory === "ftnr" && (cfrcategory === "Document" || cfrcategory === "BOP")){
		return true;		
	}
	if(currentCategory === "underwriting" && cfrcategory === "Medical"){
		return true;
	}
	return false;
}

var Filtermenu = false;
function showfilter(){
	if(Sortmenu === true){
		$m.juci.findById("sortfiltr").hide();
	}
	if(Filtermenu === true){
		$m.juci.findById("selfiltr").hide();
		Filtermenu = false;
	}
	if(Sortmenu === true && Filtermenu === true){
		$m.juci.findById("selfiltr").show();
	}
	else{
		$m.juci.findById("selfiltr").show();
		Filtermenu = true;
	}
}

var Sortmenu = false;
function showsortby(){
	if(Filtermenu === true){
		$m.juci.findById("selfiltr").hide();
	}
	if(Sortmenu === true){
		$m.juci.findById("sortfiltr").hide();
		Sortmenu = false;
	}
	if(Sortmenu === true && Filtermenu === true){
		$m.juci.findById("sortfiltr").show();
	}else{
		$m.juci.findById("sortfiltr").show();
		Sortmenu = true;
	}
}


function cleanup(arr, prop) {
 var new_arr = [];
 var lookup = {};
 for (var i in arr) {
		lookup[arr[i][prop]] = arr[i]; 
	}
for (var j in lookup) {
		new_arr.push(lookup[j]); 
	} 
	return new_arr;
}

var showContent = false;
var showContent2 = false;
var showContent3 = false;


 var showContent = false;
function showfulllistitem(e){
	$m.putPref("AppNo",e.data.ApplicationNumber);
	$m.savePref();
	if(e.target.el.className == "showing"){
		var	currentindex = e.target.el.id;
		var contentid = "less" + e.index;
		var menuItem = document.getElementById(contentid);
		if(menuItem.style.display === "none"){
			document.getElementById(contentid).style.display = "block";
			document.getElementById(currentindex).innerHTML = "Show less";
		}else{
			document.getElementById(contentid).style.display = "none";
			document.getElementById(currentindex).innerHTML = "Show more";
		}
	}else if(e.target.el.className == " juci_button view"){
			openUpload(e.data);
	}
}


var showContent2=false;
function showlistitemforftnr(e){
	$m.putPref("AppNo",e.data.ApplicationNumber);
	$m.savePref();
	if(e.target.el.className == "showing"){
		var	currentindex = e.target.el.id;
		var contentid = "lesst" + e.index;
		if(showContent2 === true){
			$m.juci.findById(contentid).hide();	
			juci.findById(currentindex).html("Show more");
			showContent2 = false;
		}else{
			$m.juci.findById(contentid).show();
			juci.findById(currentindex).html("Show less");
			showContent2 = true;
		}
	}else if(e.target.el.className == " juci_button view"){
			openUpload(e.data);
	}
}

var showContent3 = false;
function showlistitemforuw(e){
	$m.putPref("AppNo",e.data.ApplicationNumber);
	$m.savePref();
	if(e.target.el.className == "showing"){
		var	currentindex = e.target.el.id;
		var contentid = "lessu" + e.index;
		if(showContent3 === true){
			$m.juci.findById(contentid).hide();	
			juci.findById(currentindex).html("Show more");
			showContent3 = false;
		}else{
			$m.juci.findById(contentid).show();
			juci.findById(currentindex).html("Show less");
			showContent3 = true;
		}
	}else if(e.target.el.className == " juci_button view"){
			openUpload(e.data);
	}
}

function scrollToTop() {
		if(Sortmenu === true && Filtermenu === true){
		$m.juci.findById("selfiltr").hide();
			$m.juci.findById("sortfiltr").hide();
	}
    window.scrollTo(0, 0);
}

function sticky_relocate() {
    var window_top = $(window).scrollTop();
    var div_top = $('#sticky-anchor').offset().top;
    if (window_top > div_top) {
        $('#filter_scroll').addClass('stick');
        $('#sticky-anchor').height($('#filter_scroll').outerHeight());
    } else {
        $('#filter_scroll').removeClass('stick');
        $('#sticky-anchor').height(0);
    }
}

$m.onReady(function(){
	$(function() {
	    $(window).scroll(sticky_relocate);
	    //sticky_relocate();
	});
});