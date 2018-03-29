/**
 * runnerActivity.js
 * @author CloudPact Technologies
 * @description : This script is used for searching based on client id and policy number
 **/
var runnerActivitySearch;
var searchHistory;
var searchDetails;
$m.juci.addDataset("runnerActivity", {"search":""});

$m.onReady(function(){
	juci.dataset("headerName","Runner Activity");
	runnerActivitySearch = $m.juci.findById("runner-activity");
});

$m.onResume(function(){
    $m.juci.getControl("search-text").value(null);
	runnerActivitySearch.show();
});



// on search click
function onSearch(e){
	var data = e.data.search;
	if (data == ""){
		$m.alert("Enter Client Id or Policy no");
		return;
	}else{
		$m.open("Runner Activity List", "/Runner Activity/runnerActvityList.html",e.data);
		$m.juci.dataset("runnerActivity", {"search":""});
	}
}

function showlistitemforsearch(event){
	var data = event.data;
	var obj = {
		"DateOfBirth":data.DateOfBirth,
		"PolicyStatus":data.PolicyStatus,
		"RenewalAmount":data.RenewalAmount
	};
	$m.juci.dataset("searchDetails",obj);
	searchHistory.hide();
}

function searcher(applications, searchValue){
	return applications.PolicyNo.toLowerCase().search(searchValue.toLowerCase()) > -1;
}

function openCallTicket(){
	$m.open("CallTicket", "/Runner Activity/callticket.html");
}

function backToSearch(){
	runnerActivitySearch.show();
	searchHistory.hide();
}