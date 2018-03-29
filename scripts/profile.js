$m.juci.addDataset("profile",


 {
  "Address": "",
  "AdvisorCode": "",
  "BirthDate": "",
  "BranchAddress": "",
  "BranchManager": "",
  "EmailAddress": "",
  "JoiningDate": "",
  "LicenseDate": "",
  "MobileNumber": "",
  "Name": "",
  "PanNumber": "",
  "ProfileImage": "images/testi3.png",
  "SalesManager": ""
 }
);

$m.juci.addDataset("date_filter", ["Month to Date", "Year to Date", "FY 2014", "FY 2015"]);

var months =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var values = ["25","25","25","25","25","25","25","25","25","25","25","25"];

$m.juci.addDataset("bus_month",months);

var b_values=["96","78","59","10","42","89","67","51","29","49","81","29"];
var b_value1=["31","59","78","42","10","67","89","29","51","81","49","96"];
$m.juci.addDataset("bus_values",b_values);
$m.juci.addDataset("AccountDtls", {

 "IssuanceNop": "0",
 "IssuanceWrp": "0",
 "currentType": "Month to Date",
 "LoginsNop": "0",
 "LoginsWrp": "0",
 "Persistency13": "0",
 "Persistency25": "0"
});

$m.onReady(function() {
 // Code to execute when the page is ready

   business =juci.findById("Business");
   Persistency =juci.findById("Persistency");
   Persistency.hide();
      per_summary = juci.findById("per-summary");
      bus_summary = juci.findById("bus-summary");
       bus_chart = juci.findById("bus-chart");
         per_chart = juci.findById("per-chart");
         per_summary.hide();
         bus_summary.hide();
         per_chart.hide();
 GetProfileDetails();
 barGraph();
 //getAccountDetails();
});

function GetProfileDetails() {

 service = new ServiceLibrary();

 service.FetchAdvisorDetails(function(response) {
  if (response) {

   var result = response.data;
   var result = JSON.parse(result);

   $m.juci.dataset("profile", result);
  }
 });


}

function getAccountDetails(e) {

 var acc_data = juci.dataset('AccountDtls');


 var Option = getDurationOption(acc_data.currentType);
 var data = {
  "Duration": Option.durationOption,
  "LoginCode": "20000226",
  "Year": Option.Year

 };

 var request = JSON.stringify(data);
 service.FetchBusinessSummary(function(response) {
  if (response) {

   var result = response.data;
   var result = JSON.parse(result);

   juci.dataset('AccountDtls', result.AccountSummary);


  }
 }, request);

}


function getDurationOption(option) {
 var Year;
 var durationOption = "MTD";
 if (option === "Year to Date") {
  durationOption = "YTD";
 }
 if (option === "FY 2014") {
  durationOption = "FY";
  Year = "2014";

 }
 if (option === "FY 2015") {
  durationOption = "FY";
  Year = "2015";

 }

 var Option = {
  durationOption: durationOption,
  Year: Year

 }

 return Option;
}


function toggleHead(e) {

 	business.hide();
 	Persistency.hide();
 	  per_chart.hide();
     bus_chart.hide();
 switch (e.newToggled) {
  case 0:
  	business.show();
  	 bus_chart.show();
   break;
  case 1:
  	Persistency.show();
  	per_chart.show();
   break;


 }

}



function toggleSubHead(e) {

   per_summary.hide();
   bus_summary.hide();
   per_chart.hide();
   bus_chart.hide();
 switch (e.newToggled) {
  case 0:
  bus_summary.hide();
  bus_chart.show();
  	
   break;
  case 1:
  	 bus_summary.show();
  bus_chart.hide();
   break;


 }

}

function togglePerSubHead(e) {

  
   per_chart.hide();
   per_summary.hide();
 switch (e.newToggled) {
  case 0:
  per_summary.hide();
  per_chart.show();
  	
   break;
  case 1:
  	per_summary.show();
  	 per_chart.hide();
   break;


 }

}

function hidebox() {
 juci.hideDialog("dialog-dob");

}

function hideAddbox() {
 juci.hideDialog("dialog-Address");

}

function hidePanbox() {
 juci.hideDialog("dialog-Pan");

}

function hideMobilebox() {
 juci.hideDialog("dialog-Mobile");

}

function hideemailbox() {
 juci.hideDialog("dialog-email");

}


function hideVerbox() {
 juci.hideDialog("dialog-Verf");

}

function editAddress() {
 juci.showDialog("dialog-Address");
}


function editEmail() {
 juci.showDialog("dialog-email");
}

function editdob() {
 juci.showDialog("dialog-dob");
}

function editMobile() {
 juci.showDialog("dialog-Mobile");
}

function editPan() {
 juci.showDialog("dialog-Pan");
}


function prependRs(x) {
 if (typeof x === "function") {
  x = x();
 }
 if (isNaN(x)) {
  x = x.replace(/,/g, "");
  x = parseInt(x);
 }
 x = roundTo2(x);
 var isNegative = false;
 if (x < 0) {
  x = x * -1;
  isNegative = true;
 }
 var prependAmount = "Rs." + (x ? rupeeFormat(x) : '0');
 if (isNegative) {
  prependAmount = "-" + prependAmount
 }
 return prependAmount;
}

function rupeeFormat(nStr) {
 nStr += '';
 var x = nStr.split('.');
 var x1 = x[0];
 var x2 = x.length > 1 ? '.' + x[1] : '';
 var rgx = /(\d+)(\d{3})/;
 var z = 0;
 var len = String(x1).length;
 var num = parseInt((len / 2) - 1, 10);

 while (rgx.test(x1)) {
  if (z > 0) {
   x1 = x1.replace(rgx, '$1' + ',' + '$2');
  } else {
   x1 = x1.replace(rgx, '$1' + ',' + '$2');
   rgx = /(\d+)(\d{2})/;
  }
  z++;
  num--;
  if (num === 0) {
   break;
  }
 }
 return x1 + x2;
}

function roundTo2(v) {
 return Math.round(v * 100) / 100;
}

