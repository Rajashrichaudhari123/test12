//var videoRetrievalList=[
//	{
//		"Application_Number":"101116778899087761",
//		"LA_Name":"Rajashri Rajendra Chaudhari",
//		"LA_Mobileno":"16/03/2018"
//	}
//];
$m.juci.addDataset("selectedApplication","");
$m.juci.addDataset("headerName","Upload Selfie Video");
$m.juci.addDataset("isData",false);
$m.juci.addDataset("currentpage",0);
$m.juci.addDataset("totalpage",0);
var lstCustomer = [];
var lstLifeStyle = [];
var lstPlan = [];
var selectedApplicationData = [];
var counter= 1;
$m.juci.addDataset("videoRetrievalList",[]);


$m.onResume(function(){
	counter = 1;
	utils.ShowProgress("Fetching data please wait..");
	initResume();
});

function initResume() {
	if($m.networkConnected()){
		utils.ShowProgress("Fetching data please wait..");
		selectedApplicationData = [];
		var service = new ServiceLibrary();
		var applicationsWithoutPIVCCallback = function (r) {
			if(r.Status == "Y") {
				utils.HideProgress();
				lstCustomer = r.lstCustomer;
				lstLifeStyle = r.lstLifeStyle;
				lstPlan = r.lstPlan;
				if(lstCustomer.length == 0) {
					if(lstCustomer.length < 10){
						$m.juci.dataset("currentpage",1);
						$m.juci.dataset("totalpage",1);
						$m.juci.dataset("videoRetrievalList",lstCustomer);
					}
					else{
						var totalpage = 0 ;
						var lsTtenCustomer = [];
						$m.juci.dataset("currentpage",1);
						if((lstCustomer.length%10)!= 0){
							totalpage= Math.ceil(lstCustomer.length/10);
						}
						else{
							totalpage= lstCustomer.length/10 ;
						}
						$m.juci.dataset("totalpage",totalpage);
						for(var i =0;i< 9;i++){
							lsTtenCustomer.push(lstCustomer[i]);
						}
						$m.juci.dataset("videoRetrievalList",lsTtenCustomer);
					}

				} else {
					if(lstCustomer.length < 10){
						$m.juci.dataset("currentpage",1);
						$m.juci.dataset("totalpage",1);
						$m.juci.dataset("videoRetrievalList",lstCustomer);
					}
					else{
						var totalpage = 0 ;
						var lsTtenCustomer = [];
						$m.juci.dataset("currentpage",1);
						if((lstCustomer.length%10)!= 0){
							totalpage= Math.ceil(lstCustomer.length/10);
						}
						else{
							totalpage= lstCustomer.length/10 ;
						}
						$m.juci.dataset("totalpage",totalpage);
						for(var i =0;i< 9;i++){
							lsTtenCustomer.push(lstCustomer[i]);
						}
						$m.juci.dataset("videoRetrievalList",lsTtenCustomer);
					}
				}
				
				if(lstLifeStyle.length == 0) {
					var obj = {
						"Application_Number":"TL912182",
						"QsLS_30_Medication_Drug_YN":"Y",
						"QsLS_32_MedicalAilgment_YN":"Y",
						"QsLS_33_SurgeryPlanned_YN":"N"
					};
					lstLifeStyle.push(obj);	
				}
				
				if(lstPlan.length == 0) {
					var obj = {
						"Application_Number":"TL912182",
						"InstallmentPremium_BasePlan":"89878",
						"InstallmentPremium_ST":"50000",
						"ProductName":"Reliance Super Income Money Back Plan",
						"policyterm":"10",
						"sumassured":"100000",
						"plancode":"120",
						"PremiumFrequency":"12"
					};
					lstPlan.push(obj);	
				}
				
				
			} else {
				$m.logError("applications without pivc failed due to : "+JSON.stringify(r));
			}
		};
		var sapcode = $m.getUsername();
		service.getApplicationsWithoutPIVC(sapcode,applicationsWithoutPIVCCallback);
	} else {
		$m.alert(messages.NoNetworkConnectivity);
  	};
}

function next(){
	var currentpage = $m.juci.dataset("currentpage");
	var totalpage = $m.juci.dataset("totalpage");
		if(currentpage == totalpage ){
	$m.toast("Last Page");
	}
	else{
		var nextTenCustomer = [];
		if(((lstCustomer.length % 10)!= 0)&&((lstCustomer.length / 10) < counter+1)){
		var max= lstCustomer.length % 10;	
		} 
		else{
			max= 9;
		}
		for(var i =0;i< max;i++){
		var index = i+(counter* 10);
			nextTenCustomer.push(lstCustomer[index]);
		}
		$m.juci.dataset("videoRetrievalList",nextTenCustomer);
			$m.juci.dataset("currentpage",counter+1);
		counter++;
	}
}

function previous(){
	if(counter == 0 || counter == 1){
	$m.toast("First Page");
	}
	else{
		counter-= 2;
		var prevTenCustomer = [];
		for(var i =0;i< 10;i++){
			var index = i+(counter* 10);
			prevTenCustomer.push(lstCustomer[index]);
		}
		$m.juci.dataset("videoRetrievalList",prevTenCustomer);
		$m.juci.dataset("currentpage",counter+1);
		counter++;
	}
					
}
function onVideoRetrievalListClick(event){
	var applicationNo = lstCustomer[(event.index)+((counter-1)*10)].Application_Number;
	
	for(var k=0;k<lstCustomer.length;k++) {
		if(applicationNo == lstCustomer[k].Application_Number) {
			selectedApplicationData.push(lstCustomer[k]);
		}
	}
	
	for(var j=0;j<lstLifeStyle.length;j++) {
		if(applicationNo == lstLifeStyle[j].Application_Number) {
			selectedApplicationData.push(lstLifeStyle[j]);
		}
	}
	
	for(var l=0;l<lstPlan.length;l++) {
		if(applicationNo == lstPlan[l].Application_Number) {
			selectedApplicationData.push(lstPlan[l]);
		}
	}
	
	
	$m.confirm({
		"title": applicationNo,
        "message": "Do you want to take selfi video and PIVC screen ?", 
        "buttons": [{"label": "Yes"},
					{"label": "No"}]
	}, function(index) {
		var options = ["Yes", "No"];
		if(options[index] == "Yes"){
			$m.juci.dataset("selectedApplication",applicationNo);
			openNextSelfiePage();
		}
	});
}

function openNextSelfiePage(){
	var applicatioNo= 	$m.juci.dataset("selectedApplication");
	$m.putPref("selectedApplication",applicatioNo );
	$m.savePref();
	var selfieobj = {
		"selectedApplicationData" : selectedApplicationData,
	};
	$m.open("selfieRetrieval", "/Applications/selfieRetrieval.html",selfieobj); 
}

/* function getSearchedItem(){
 	var listcount=0;
 	var CustomerList=[];
	var input, filter, i;

	input = document.getElementById('searchbox').children[2].value;
	filter = input.toUpperCase();
	document.getElementById("video-retrieval-list").style.display = "block";
	document.getElementById("video-retrieval-list-title").style.display = "block";
	for (i = 0; i < 10; i++) {
		if (lstCustomer[i].LA_Name.toUpperCase().indexOf(filter) > -1) {
			CustomerList.push(lstCustomer[i]);
			listcount++;
		}
		$m.juci.dataset("videoRetrievalList",CustomerList);
	}
	if(listcount == 0){
		document.getElementById("video-retrieval-list").style.display = "none";
		document.getElementById("video-retrieval-list-title").style.display = "none";
		$m.alert("Sorry! no records found");
		$m.juci.dataset("currentpage",0);
	}
	if((CustomerList.length%10)!= 0){
		totalpage= Math.ceil(CustomerList.length/10);
	}
	else{
		totalpage= CustomerList.length/10 ;
	}
	$m.juci.dataset("totalpage",totalpage);
						
}*/
 function getSearchedItem(){
 	var listcount=0;
 	var CustomerList=[];
	var input, filter, i;

	input = document.getElementById('searchbox').children[2].value;
	filter = input.toUpperCase();
	document.getElementById("video-retrieval-list").style.display = "block";
	document.getElementById("video-retrieval-list-title").style.display = "block";
	for (i = 0; i < lstCustomer.length; i++) {
		if (lstCustomer[i].LA_Name.toUpperCase().indexOf(filter) > -1) {
			CustomerList.push(lstCustomer[i]);
			listcount++;
		}
		$m.juci.dataset("videoRetrievalList",CustomerList);
	}
	if(listcount == 0){
		document.getElementById("video-retrieval-list").style.display = "none";
		document.getElementById("video-retrieval-list-title").style.display = "none";
		$m.alert("Sorry! no records found");
		$m.juci.dataset("currentpage",0);
	}
	if((CustomerList.length%10)!= 0){
		totalpage= Math.ceil(CustomerList.length/10);
	}
	else{
		totalpage= CustomerList.length/10 ;
	}
	$m.juci.dataset("totalpage",totalpage);
						
}
