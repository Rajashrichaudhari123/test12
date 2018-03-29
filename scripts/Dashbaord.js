/**
 * Dashboard.js
 * @author CloudPact Technologies
 * @description : This script is used for dashboard.
 **/

$(function() {
    /*$("#agents").select2({
    	placeholder: "Select agent",
		minimumResultsForSearch : -1
	});*/
});

var renewals = {
  "all": {
    "ytd": {
      "TotalPayments": "0",
      "TotalPremium": "0"
    },
    "mtd": {
      "TotalPayments": "0",
      "TotalPremium": "0"
    },
    "cdr": {
      "TotalPayments": "0",
      "TotalPremium": "0"
    }
  },
  "la": {
    "ytd": {
      "TotalPayments": "0",
      "TotalPremium": "0"
    },
    "mtd": {
      "TotalPayments": "0",
      "TotalPremium": "0"
    },
    "cdr": {
      "TotalPayments": "0",
      "TotalPremium": "0"
    }
  }
};

var prefKeys = {
	"RenewalData" : "renewaldata",
	"RenewalSync" : "renewalsync"
};

function getTimestamp(){
	return new Date().getTime();
}


// Fetching renewals data
function getFullRenewalsData(){
	var renewalCombinations = ["All-YTD","All-MTD","LA-YTD","LA-MTD"];
	var renewalResponse = function(response, renewalType, duration, cdrDates){
		updateRenewalData(response, renewalType, duration);
		renewalCombinations.shift();
		if(renewalCombinations.length){
			renewalType = renewalCombinations[0].split("-");
			getRenewals(renewalType[0], renewalType[1], "", renewalResponse);
		}else{
			$m.putPref(prefKeys.RenewalSync, getTimestamp());
		}
	};
	var renewalType = renewalCombinations[0].split("-");
	getRenewals(renewalType[0], renewalType[1], "", renewalResponse);
}

function updateRenewalData(data, renewalType, duration){
	var currentData = $m.getPref(prefKeys.RenewalData);
	if(!currentData){
		currentData = renewals;
	}
	currentData[renewalType.toLowerCase()][duration.toLowerCase()] = data;
	$m.putPref(prefKeys.RenewalData, currentData);
}

function getRenewals(renewalType, duration, cdrDates, callback){
	if(!cdrDates){
		cdrDates = {
			"fromDate" : "",
			"toDate" : ""
		}
	};
	var requestData = {
		"renewalType" : renewalType,
		"Duration": duration,
		"FromDate": cdrDates.fromDate,
		"Role": "ADV",
		"ToDate": cdrDates.toDate
 	};
 	var getRenewalsCallback = function(response){
 		callback(response, renewalType, duration, cdrDates);
 	};
	DashboardServices.GetRenewals(requestData, getRenewalsCallback);
}



var applicationsSummary = {
  "ytd": [
    {
      "ApplicationCount": "1",
      "ApplicationStatus": "Issued",
      "TotalApplicationPremium": "15003"
    },
    {
      "ApplicationCount": "5",
      "ApplicationStatus": "Logins",
      "TotalApplicationPremium": "15003"
    },
    {
      "ApplicationCount": "0",
      "ApplicationStatus": "Rejected",
      "TotalApplicationPremium": "0"
    }
  ],
  "mtd": [
    {
      "ApplicationCount": "1",
      "ApplicationStatus": "Issued",
      "TotalApplicationPremium": "15003"
    },
    {
      "ApplicationCount": "5",
      "ApplicationStatus": "Logins",
      "TotalApplicationPremium": "15003"
    },
    {
      "ApplicationCount": "0",
      "ApplicationStatus": "Rejected",
      "TotalApplicationPremium": "0"
    }
  ],
  "cdr": [
    {
      "ApplicationCount": "1",
      "ApplicationStatus": "Issued",
      "TotalApplicationPremium": "15003"
    },
    {
      "ApplicationCount": "5",
      "ApplicationStatus": "Logins",
      "TotalApplicationPremium": "15003"
    },
    {
      "ApplicationCount": "0",
      "ApplicationStatus": "Rejected",
      "TotalApplicationPremium": "0"
    }
  ]
};

var customerBirthdays = {
  "ytd": [
    {
      "ClientID": "00020370",
      "ClientName": "SALEEM A S",
      "ProfileImage": ""
    },
    {
      "ClientID": "00267165",
      "ClientName": "TATTIE CHACKO",
      "ProfileImage": ""
    }
  ],
  "mtd": [
    {
      "ClientID": "00020370",
      "ClientName": "SALEEM A S",
      "ProfileImage": ""
    },
    {
      "ClientID": "00267165",
      "ClientName": "TATTIE CHACKO",
      "ProfileImage": ""
    }
  ],
  "cdr": [
    {
      "ClientID": "00020370",
      "ClientName": "SALEEM A S",
      "ProfileImage": ""
    },
    {
      "ClientID": "00267165",
      "ClientName": "TATTIE CHACKO",
      "ProfileImage": ""
    }
  ]
};


var cfrCount = {
  "allopen": {
    "FtnrCfrCount": "5",
    "TotalCfrCount": "11",
    "UwCfrCount": "6"
  },
  "nearcancellation": {
    "FtnrCfrCount": "5",
    "TotalCfrCount": "11",
    "UwCfrCount": "6"
  },
  "old": {
    "FtnrCfrCount": "5",
    "TotalCfrCount": "11",
    "UwCfrCount": "6"
  }
};