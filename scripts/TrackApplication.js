var select={
	"fld1":"Advisor",
	"fld2":"Customer",
	"fld3":"Application No."
}

$m.juci.addDataset("select",select);

var appno = [{
	"Name":"Sayed Jaffrey",
	"alstatus":"Pending",
	"id":"BRSMCU009",
	"company":"Reliance Super Money Back Plan",
	"Category":"Savings & Investment Plan",
	"ApplicationNo":"0012TRA871",
	"amount":"10,112",
	"TransactionID":"IDBI4466",
	"date":"28 Nov 2015"
	},
	{
	"Name":"Vinod Kumar",
	"alstatus":"Rejected",
	"id":"BRSMCU0",
	"company":"Reliance Super Online Term",
	"Category":"Protection Plan",
	"ApplicationNo":"0012TRA901",
	"amount":"12,345",
	"TransactionID":"HSBC8812",
	"date":"28 Nov 2015"
},
{
	"Name":"Reshma M",
	"alstatus":"In Process",
	"id":"BRSMCU012",
	"company":"Reliance Child Plan",
	"Category":"Child Plan",
	"ApplicationNo":"0012TRA923",
	"amount":"1,3991",
	"TransactionID":"IDBI8142",
	"date":"30 Nov 2015"
},
{
	"Name":"Isha Katwal",
	"alstatus":"Pending",
	"id":"BRSMCU014",
	"company":"Reliance Group Term Assurance Plan",
	"Category":"Solution for Groups",
	"ApplicationNo":"0012TRA937",
	"amount":"22,643",
	"TransactionID":"SBI9991",
	"date":"01 Dec 2015"
},
{
	"Name":"Dlana Saldana",
	"alstatus":"Approved",
	"id":"BRSMCU044",
	"company":"Reliance Total Health",
	"Category":"Health Plan",
	"ApplicationNo":"0012TRA982",
	"amount":"36,345",
	"TransactionID":"I/ngv1256",
	"date":"03 Dec 2015"
}
];

$m.juci.addDataset("appno",appno);

var customerdetails = [{
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

$m.juci.addDataset("customerDetails",customerdetails);

var advisordetails = [{
		"img":"images/testi3.png",
		"Name":"Radha Parekh",
		"alstatus":"In Active",
		"id":"BRSMCU009",
		"addr":"Madhapur,Hyderabad",
		"email":"rahda.parekh@gmail.com",
		"mobileNo":"+919123412323",
		"target":"15%"
	},
	{
		"img":"images/Adv2.png",
		"Name":"Ranjit Bhat",
		"alstatus":"Active",
		"id":"BRSMCU0",
		"addr":"Gachibowli,Hyderabad",
		"email":"ranjt.bhat@gmail.com",
		"mobileNo":"+919123412314",
		"target":"15%"
	},
	{
		"img":"images/Adv1.png",
		"Name":"Rohini Gosh",
		"alstatus":"In Active",
		"id":"BRSMCU012",
		"addr":"Banjara Hills,Hyderabad",
		"email":"rohini.gosh@gmail.com",
		"mobileNo":"+919123412345",
 		"target":"15%"
	},
	{
		"img":"images/Adv4.png",
		"Name":"Ronak Rao",
		"alstatus":"Active",
		"id":"BRSMCU014",
		"addr":"Miyapur,Hyderabad",
		"email":"ronak.rao@gmail.com",
		"mobileNo":"+919123412380",
 		"target":"15%"
	}
];

$m.juci.addDataset("advisordetails",advisordetails);

$m.juci.dataset("tsearch",[]);

$m.onReady(function(){	
	juci.dataset("headerName","Track Applications");
	currentView = juci.findById("appno");
	
});

function view()
{
	currentView.hide();
	var x= document.getElementById("slct1").value;
	if(x=="Application No.")
	{
		currentView = juci.findById("appno");
		currentView.show();
		$m.juci.dataset("tsearch",appno);
		
	}
	else if(x=="Customer")
	{
		currentView = juci.findById("customerdetails");
		currentView.show();
		$m.juci.dataset("tsearch",customerDetails)
	}
	else if(x=="Advisor")
	{
		currentView = juci.findById("advisordetails");
		currentView.show();
		$m.juci.dataset("tsearch",advisordetails)
	}
}

function searcher(list,searchString){
	return list.Name.toLowerCase().search(searchString.toLowerCase()) > -1;
}


