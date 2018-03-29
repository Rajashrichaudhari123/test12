var url = "";
var baseUrl = "http://lifelineuat.reliancelife.com/SalesAssist";
var uaturl = "http://124.124.218.136/rlife2/";
var currentAdvisorCode = "";
var login_code = "";
var logincode = "";
var password = "";
var credentials = "";

$m.onResume(function() {
    // Code to execute when the page is ready
    if ($m.isWeb()) {
//        currentAdvisorCode = "20000226";
        currentAdvisorCode = "70085536";
    } else {
        if ($m.getPref("useAs")) {
            advisorCode = $m.getPref("useAs").LA_Business_LoginCode;
            advisorName = $m.getPref("useAs").Adv_Emp_Name;
            logincode = $m.getUserAccount().customProperties.Login_Code;
            password = $m.getUserAccount().customProperties.Login_Pwd;
        } else {
            advisorCode = $m.getUserAccount().customProperties.LA_Business_LoginCode;
            advisorName = $m.getUserAccount().customProperties.Login_Name;
            logincode = $m.getUserAccount().customProperties.Login_Code;
            password = $m.getUserAccount().customProperties.Login_Pwd;
        }
        currentAdvisorCode = logincode;
        if(logincode){
        	login_code = logincode;
        }else{
        	//TODO
        }
    }
});

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};

var DashboardServices = {
	"_serviceUrl" : "http://lifelineuat.reliancelife.com/SalesAssist/Dashboard/wsDashboard.svc",
	"_actions" : {
		"FetchAllRenewalSummary" : "FetchAllRenewalSummary",
		"FetchLARenewalSummary" : "FetchLARenewalSummary",
		"FetchApplicationSummary" : "FetchApplicationSummary",
		"FetchCfrOptions" : "FetchCfrOptions",
		"FetchCfrSummary" : "FetchCfrSummary",
		"FetchCustomerBirthdays" : "FetchCustomerBirthdays",
		"FetchBusinessSummary" : "FetchBusinessSummary",
		"FetchCommissionSummary" : "FetchCommissionSummary"
	},
	"_getAdvisorCode" : function(){
		var advisorCode = $m.getUsername();
		if(!advisorCode){
			advisorCode = "20000226";
		}
		return advisorCode;
	},
	"_getRole" : function(){
		var userAccount = $m.getUserAccount();
		userAccount = userAccount;
		var customeProperties = userAccount.customProperties;
		var role = customeProperties.User_Type;
		return role;
	},
	"_getRequest" : function(renewalRequest){
		var advisorCode = this._getAdvisorCode();
		var role = this._getRole();
		var requestData = {
		  "Duration": renewalRequest.duration,
		  "FromDate": formateDate(renewalRequest.fromDate),
		  "LoginCode": advisorCode,
		  "Role": role,
		  "ToDate": formateDate(renewalRequest.toDate)
		};
		return requestData;
	},
	"GetRenewals" : function(renewalRequest ,callback){
		var action = "Fetch" + renewalRequest.renewalType + "RenewalSummary";
		var requestData = this._getRequest(renewalRequest);
		this._fireRequest(action,requestData,callback);
	},
	"GetApplicationSummary" : function(renewalRequest, callback){
		var action = "FetchApplicationSummary";
		var requestData = this._getRequest(renewalRequest);
		this._fireRequest(action,requestData,callback);
	},
	"GetCFROptions" : function(callback){
		var advisorCode = this._getAdvisorCode();
		var action = "FetchCfrOptions/" + advisorCode;
		var requestData = "";
		this._fireGetRequest(action,requestData,callback);
	},
	"GetCfrCount" : function(cfrRequest, callback){
		var action = "FetchCfrSummary";
		var requestData = this._getRequest(cfrRequest);
		this._fireRequest(action,requestData,callback);
	},
	"GetCustomerBirthdays" : function(birthdayRequest, callback){
		var action = "FetchCustomerBirthdays";
		var requestData = this._getRequest(birthdayRequest);
		this._fireRequest(action,requestData,callback);
	},
	"GetBusinessSummary" : function(summaryRequest, callback){
		var action = "FetchBusinessSummary";
		var requestData = this._getRequest(summaryRequest);
		this._fireRequest(action,requestData,callback);
	},
	"GetCommisions" : function(commisionRequest, callback){
		var action = "FetchCommissionSummary";
		var requestData = this._getRequest(commisionRequest);
		this._fireRequest(action,requestData,callback);
	},
	"_fireRequest" : function(action, data, callback){
		var url = this._serviceUrl + "/" + action;
        if ($m.networkConnected()) {
        	 if ($m.isWeb()) {
            	credentials = Base64.encode("70268271:70268271");	
			} else {
				credentials = Base64.encode(logincode +":" + password);	
			}
        	data = JSON.stringify(data);
            $m.post(url, data, {
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization":"Basic "+ credentials
                }
            }, function(callback) {
                return function(response) {
                    if (response.code == 200) {
                        var result = response.result;
                        result = JSON.parse(result.data);
                        //$m.logInfo("Dashboard : "  + action + "  "+ JSON.stringify(result));
                        callback.call(this, result);
                    } else {
                        $m.alert(messages.ServerError);
                        var errMsg = response;
                        $m.logError(JSON.stringify(response));
                    }
                };
            }(callback));
        } else {
            $m.alert(messages.NoNetworkConnectivity);
        }
	},
	"_fireGetRequest" : function(action, data, callback){
		var url = this._serviceUrl + "/" + action;
        if ($m.networkConnected()) {
        	if ($m.isWeb()) {
            	credentials = Base64.encode("70268271:70268271");	
			} else {
				credentials = Base64.encode(logincode +":" + password);	
			}
        	$m.get(url, {
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization":"Basic "+ credentials
                }
        	}, function(callback) {
                return function(response) {
                    if (response.code === 200) {
                        var result = response.result;
                        result = JSON.parse(result.data);
                        callback.call(this, result);
                    } else {
                        $m.alert(messages.ServerError);
                        var errMsg = response;
                        $m.logError(JSON.stringify(response));
                    }
                };
            }(callback));
        } else {
            $m.alert(messages.NoNetworkConnectivity);
        }
	},
}


// Sync


var prefKeys = {
  "ApplicationData": "applicationdata",
  "ApplicationSync": "applicationsync",
  "BirthdayData": "birthdaydata",
  "BirthdaySync": "birthdaysync",
  "BusinessData": "businessdata",
  "BusinessSync": "businesssync",
  "CfrData": "cfrdata",
  "CfrOptionsData": "cfroptionsdata",
  "CfrOptionsSync": "cfroptionssync",
  "CfrSync": "cfrsync",
  "CommsionData": "commsiondata",
  "CommsionSync": "commsionsync",
  "RenewalData": "renewaldata",
  "RenewalSync": "renewalsync",
  "SyncTime" : "synctime"
};

function getTimestamp(){
	return new Date().getTime();
}

function getRequestStructure(renewalType, duration, cdrDates){
	if(!cdrDates){
		cdrDates = {
			"fromDate" : "",
			"toDate" : ""
		}
	}
	var requestData = {
		"duration": duration,
		"fromDate": formateDate(cdrDates.fromDate),
		"role": "ADV",
		"toDate": formateDate(cdrDates.toDate)
 	};
 	if(renewalType){
 		requestData["renewalType"] = renewalType;
 	}
 	return requestData;
}

/* Renewals */

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

function getFullRenewalsData(callback){
	var renewalCombinations = ["All-YTD","All-MTD","LA-YTD","LA-MTD"];
	var renewalResponse = function(response, renewalType, duration, cdrDates){
		updateRenewalData(response, renewalType, duration);
		renewalCombinations.shift();
		if(renewalCombinations.length){
			renewalType = renewalCombinations[0].split("-");
			getRenewals(renewalType[0], renewalType[1], "", renewalResponse);
		}else{
			if(callback){
				callback();
			}
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
	$m.putPref(prefKeys.RenewalData, currentData)
}

function getRenewals(renewalType, duration, cdrDates, callback){
	var requestData = getRequestStructure(renewalType, duration, cdrDates);
 	var getRenewalsCallback = function(response){
 		callback(response, renewalType, duration, cdrDates);
 	};
	DashboardServices.GetRenewals(requestData, getRenewalsCallback);
}


/* Applications */

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

function getFullApplicationsData(callback){
	var applicationCombinations = ["YTD","MTD"];
	var applicationResponse = function(response,duration, cdrDates){
		updateApplicationsData(response,duration);
		applicationCombinations.shift();
		if(applicationCombinations.length){
			getApplications(applicationCombinations[0], "", applicationResponse);
		}else{
			if(callback){
				callback();
			}
			$m.putPref(prefKeys.ApplicationSync, getTimestamp());
		}
	};
	getApplications(applicationCombinations[0], "", applicationResponse);
}

function getApplications(duration, cdrDates, callback){
	var requestData = getRequestStructure("", duration, cdrDates);
 	var getRenewalsCallback = function(response){
 		callback(response, duration, cdrDates);
 	};
	DashboardServices.GetApplicationSummary(requestData, getRenewalsCallback);
}

function updateApplicationsData(data,duration){
	var currentData = $m.getPref(prefKeys.ApplicationData);
	if(!currentData){
		currentData = applicationsSummary;
	}
	currentData[duration.toLowerCase()] = data;
	$m.putPref(prefKeys.ApplicationData, currentData)
}

/* Customer Birthdays */

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

function getFullBirthDayData(callback){
	var applicationCombinations = ["YTD","MTD"];
	var applicationResponse = function(response,duration, cdrDates){
		updateBirthdaysData(response,duration);
		applicationCombinations.shift();
		if(applicationCombinations.length){
			getBirthdays(applicationCombinations[0], "", applicationResponse);
		}else{
			if(callback){
				callback();
			}
			$m.putPref(prefKeys.BirthdaySync, getTimestamp());
		}
	};
	getBirthdays(applicationCombinations[0], "", applicationResponse);
}

function getBirthdays(duration, cdrDates, callback){
	var requestData = getRequestStructure("", duration, cdrDates);
 	var getRenewalsCallback = function(response){
 		callback(response, duration, cdrDates);
 	};
	DashboardServices.GetCustomerBirthdays(requestData, getRenewalsCallback);
}

function updateBirthdaysData(data,duration){
	var currentData = $m.getPref(prefKeys.BirthdayData);
	if(!currentData){
		currentData = customerBirthdays;
	}
	currentData[duration.toLowerCase()] = data;
	$m.putPref(prefKeys.BirthdayData, currentData)
}

/* CFR Optoins */

function getCFROptionsData(callback){
	var cfroptionsCallback = function(response){
		if(callback){
			callback();
		}
		$m.putPref(prefKeys.CfrOptionsData, response);
	}
	DashboardServices.GetCFROptions(cfroptionsCallback);
}


/* CFR Data */

var cfrCount = {
  "all": {
    "FtnrCfrCount": "0",
    "TotalCfrCount": "0",
    "UwCfrCount": "0"
  },
  "nc": {
    "FtnrCfrCount": "0",
    "TotalCfrCount": "0",
    "UwCfrCount": "0"
  },
  "old": {
    "FtnrCfrCount": "0",
    "TotalCfrCount": "0",
    "UwCfrCount": "0"
  }
};

function getCFRData(callback){
	var applicationCombinations = ["ALL", "OLD", "NC"];
	var applicationResponse = function(response,duration, cdrDates){
		updateCFRData(response,duration);
		applicationCombinations.shift();
		if(applicationCombinations.length){
			getCFRs(applicationCombinations[0], "", applicationResponse);
		}else{
			if(callback){
				callback();
			}
			$m.putPref(prefKeys.CfrSync, getTimestamp());
		}
	};
	getCFRs(applicationCombinations[0], "", applicationResponse);
}

function getCFRs(duration, cdrDates, callback){
	var requestData = getRequestStructure("", duration, cdrDates);
 	var getRenewalsCallback = function(response){
 		callback(response, duration, cdrDates);
 	};
	DashboardServices.GetCfrCount(requestData, getRenewalsCallback);
}

function updateCFRData(data,duration){
	var currentData = $m.getPref(prefKeys.CfrData);
	if(!currentData){
		currentData = cfrCount;
	}
	currentData[duration.toLowerCase()] = data;
	$m.putPref(prefKeys.CfrData, currentData)
}


/* Business Data */

var businessCount = {
  "ytd": {
    "AmountDue": "10000",
    "AmountPaid": "0",
    "CollectedPersistency": "0",
    "IssuanceNop": "0",
    "IssuanceWcpSum": "0",
    "IssuanceWrpSum": "0",
    "LoginsNop": "0",
    "LoginsWcpSum": "0",
    "LoginsWrpSum": "0",
    "PersistencyTotal": "100",
    "TotalPremium": "0"
  },
  "mtd": {
    "AmountDue": "10000",
    "AmountPaid": "0",
    "CollectedPersistency": "0",
    "IssuanceNop": "0",
    "IssuanceWcpSum": "0",
    "IssuanceWrpSum": "0",
    "LoginsNop": "0",
    "LoginsWcpSum": "0",
    "LoginsWrpSum": "0",
    "PersistencyTotal": "100",
    "TotalPremium": "0"
  },
  "cdr" : {
    "AmountDue": "10000",
    "AmountPaid": "0",
    "CollectedPersistency": "0",
    "IssuanceNop": "0",
    "IssuanceWcpSum": "0",
    "IssuanceWrpSum": "0",
    "LoginsNop": "0",
    "LoginsWcpSum": "0",
    "LoginsWrpSum": "0",
    "PersistencyTotal": "100",
    "TotalPremium": "0"
  }
};

function getBusinessData(callback){
	var applicationCombinations = ["YTD", "MTD"];
	var applicationResponse = function(response,duration, cdrDates){
		updateBusinessData(response,duration);
		applicationCombinations.shift();
		if(applicationCombinations.length){
			getBusiness(applicationCombinations[0], "", applicationResponse);
		}else{
			if(callback){
				callback();
			}
			$m.putPref(prefKeys.BusinessSync, getTimestamp());
		}
	};
	getBusiness(applicationCombinations[0], "", applicationResponse);
}

function getBusiness(duration, cdrDates, callback){
	var requestData = getRequestStructure("", duration, cdrDates);
 	var getRenewalsCallback = function(response){
 		callback(response, duration, cdrDates);
 	};
	DashboardServices.GetBusinessSummary(requestData, getRenewalsCallback);
}

function updateBusinessData(data,duration){
	var currentData = $m.getPref(prefKeys.BusinessData);
	if(!currentData){
		currentData = businessCount;
	}
	currentData[duration.toLowerCase()] = data;
	$m.putPref(prefKeys.BusinessData, currentData);
}


/* Commission Data */

var commisionCount = {
  "ytd": {
    "NBCommissionAccrued": "0",
    "NBCommissionCredited": "0",
    "NBPremium": "0",
    "RenewalCommissionAccrued": "0",
    "RenewalCommissionCredited": "0",
    "RenewalPremium": "0",
    "TotalCommissionAccrued": "0",
    "TotalCommissionCredited": "0",
    "TotalPremium": "0"
  },
  "mtd": {
    "NBCommissionAccrued": "0",
    "NBCommissionCredited": "0",
    "NBPremium": "0",
    "RenewalCommissionAccrued": "0",
    "RenewalCommissionCredited": "0",
    "RenewalPremium": "0",
    "TotalCommissionAccrued": "0",
    "TotalCommissionCredited": "0",
    "TotalPremium": "0"
  },
  "cdr": {
    "NBCommissionAccrued": "0",
    "NBCommissionCredited": "0",
    "NBPremium": "0",
    "RenewalCommissionAccrued": "0",
    "RenewalCommissionCredited": "0",
    "RenewalPremium": "0",
    "TotalCommissionAccrued": "0",
    "TotalCommissionCredited": "0",
    "TotalPremium": "0"
  }
};

function getCommisionData(callback){
	var applicationCombinations = ["YTD", "MTD"];
	var applicationResponse = function(response,duration, cdrDates){
		updateCommisionData(response,duration);
		applicationCombinations.shift();
		if(applicationCombinations.length){
			getCommisions(applicationCombinations[0], "", applicationResponse);
		}else{
			if(callback){
				callback();
			}
			$m.putPref(prefKeys.CommsionSync, getTimestamp());
		}
	};
	getCommisions(applicationCombinations[0], "", applicationResponse);
}

function getCommisions(duration, cdrDates, callback){
	var requestData = getRequestStructure("", duration, cdrDates);
 	var getRenewalsCallback = function(response){
 		callback(response, duration, cdrDates);
 	};
	DashboardServices.GetCommisions(requestData, getRenewalsCallback);
}

function updateCommisionData(data,duration){
	var currentData = $m.getPref(prefKeys.CommsionData);
	if(!currentData){
		currentData = commisionCount;
	}
	currentData[duration.toLowerCase()] = data;
	$m.putPref(prefKeys.CommsionData, currentData);
}


/* Utils */

function prependRs(x){
	if(typeof x === "function"){
		x = x();
	}
	if(isNaN(x)){
		x  = x.replace(/,/g,"");
		x = parseInt(x);	
	}
	x = roundTo2(x);
	var isNegative = false;
	if(x < 0){
		x = x * -1;
		isNegative = true;
	}
	var prependAmount = "₹ " + (x ? rupeeFormat(x) : '0') ;
	if(isNegative){
		prependAmount = "-" + prependAmount
	}
	return prependAmount;
}
function rupeeFormat(nStr){
	nStr += '';
	var x = nStr.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	var z = 0;
	var len = String(x1).length;
	var num = parseInt((len/2)-1, 10);
	
	while (rgx.test(x1)){
		if(z > 0){
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}else{
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
			rgx = /(\d+)(\d{2})/;
		}
		z++;
		num--;
		if(num === 0){
			break;
		}
	}
	return x1 + x2;
}
function roundTo2(v){
	return Math.round(v * 100) / 100;
}

function formateDate(dateObj){
	if(!dateObj){
		return "";
	}
	dateObj = new Date(dateObj).toString("dd/MM/yyyy");
	return dateObj;
	
}