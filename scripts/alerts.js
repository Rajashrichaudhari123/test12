var Alerts = {
	"alert":"02",
	"cfr":"09",
	"application":"04"
};
$m.juci.addDataset("alerts",Alerts);

$m.juci.addDataset("status", ["Approved","Rejected"]);

var alertdetails = [{
	"Name":"Shiva Shenkar",
	"id":"BRSMCU023",
	"company":"Reliance Blue Chip Savings Insurance Plans",
	"amount":"₹ 6,335",
	"ldate":"9/12/2015"
	},
	{
	"Name":"Manu Maheshwari",
	"id":"BRSMCU023",
	"company":"Reliance Online Income Plan",
	"amount":"₹ 86,946",
	"ldate":"05/12/2015"
},
{
	"Name":"Jimit Patel",
	"id":"BRSMCU023",
	"company":"Reliance Immediate Annuity Plan",
	"amount":"99,335",
	"ldate":"9/12/2015"
}];

$m.juci.addDataset("alertDetails",alertdetails);

var cfrdetails = [{
	"Name":"Sumeed Shetty",
	"id":"BRSMCU023",
	"company":"Reliance Blues Savings Insurance Plans",
	"amount":"6,335",
	"date":"9/12/2015",
	"docs":"Age Proof, Photo ID + 1 more",
	"appno":"0012TRA937",
	"term":"10 years",
	"status":"Incomplete"
	},
	{
	"Name":"Manu Maheshwari",
	"id":"BRSMCU023",
	"company":"Reliance Online Income Plan",
	"amount":"86,946",
	"date":"05/12/2015",
	"docs":"Age Proof, Photo ID + 1 more",
	"appno":"0012TRA937",
	"term":"10 years",
	"status":"Incomplete"
},
{
	"Name":"Jimit Patel",
	"id":"BRSMCU023",
	"company":"Reliance Immediate Annuity Plan",
	"amount":"99,335",
	"date":"9/12/2015",
	"docs":"Age Proof, Photo ID + 1 more",
	"appno":"0012TRA937",
	"term":"10 years",
	"status":"Incomplete"
}];

$m.juci.addDataset("cfrDetails",cfrdetails);

var applicationdetails = [{
	"Name":"Jimit Patel",
	"id":"BRSMCU023",
	"company":"Reliance Blue Chip Savings Insurance Plans",
	"status":"Approved",
	"category":"Solution for groups",
	"appnumber":"0012TRA937",
	"amount":" ₹ 22,643",
	"tid":"SBI9991",
	"date":"01 Dec 2015"
	},
	{
	"Name":"Manu Maheshwari",
	"id":"BRSMCU023",
	"company":"Reliance Online Income Plan",
	"status":"Rejected",
	"category":"Solution for groups",
	"appnumber":"0012TRA937",
	"amount":" ₹ 22,643",
	"tid":"SBI9991",
	"date":"01 Dec 2015"
},
{
	"Name":"Maheshwaril",
	"id":"BRSMCU023",
	"company":"Reliance Immediate Annuity Plan",
	"status":"Approved",
	"category":"Solution for groups",
	"appnumber":"0012TRA937",
	"amount":" ₹ 22,643",
	"tid":"SBI9991",
	"date":"01 Dec 2015"
}];

$m.juci.addDataset("applicationDetails",applicationdetails);

$m.onReady(function(){
	// Code to execute when the page is ready
	var head = document.getElementsByClassName("juci_panel_title");
	juci.viewModel.applyBinding(head[0]);
	$m.juci.dataset("alertcount","3");
	
	currentView = juci.findById("alertsView");
});

function toggleView(e){
	currentView.hide();
	switch(e.newToggled){
		case 0:
			currentView = juci.findById("alertsView");
			currentView.show();
			break;
		case 1:
			currentView = juci.findById("cfrView");
			currentView.show();
			break;
		case 2:
			currentView = juci.findById("applicationView");
			currentView.show();
			break;	
	} 
}

function showStatus(event){
	var selectedStatus = document.getElementById("appstatus").value;
		var selectboxData = [];
		for(var i=0; i<applicationdetails.length; i++){
			if(applicationdetails[i].status == selectedStatus){
				selectboxData.push(applicationdetails[i]);	
			}
		}
		$m.juci.dataset("applicationDetails",selectboxData);
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
