/**
 * attendanceConnector.js
 * @author CloudPact Technologies
 * @description : This script is for firing requests to server.
 **/


var login_code;
var password;
var credentials;
var baseUrl = "http://lifelineuat.reliancelife.com/RassistServices";
//var publicUrl = "http://salesassistuat.reliancenipponlife.com/rlife2";
var publicUrl = Constants.publicIP;
var attendenceUrl = {
	"checkAttendance" : publicUrl+"/mowblyserver/sdailyAttendance/rellife/prod/RlifeAssist",
	"updateImeiNo" : publicUrl+"/mowblyserver/sUpdateDeviceId/rellife/prod/RlifeAssist",
	"checkImeiNo" : publicUrl+"/mowblyserver/sSelectDeviceId/rellife/prod/RlifeAssist",
	"checkSapCode" : publicUrl+"/mowblyserver/sSelectSapCode/rellife/prod/RlifeAssist"
};

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};

$m.onResume(function() {
    // Code to execute when the page is ready
    if ($m.isWeb()) {
        login_code = "70008521";
    } else {
		login_code =$m.getUserAccount().customProperties.Login_Code;
		password = $m.getUserAccount().customProperties.Login_Pwd;
    }
});


var attendanceConnector = {
	"url" : publicUrl+"/mowblyserver/sdailyAttendance/rellife/prod/RlifeAssist",
	"insertDaily" : function(arr,callBack){	
		//arr = JSON.stringify(arr);
		if ($m.networkConnected()) {
			$m.post(attendanceConnector.url,{"data":arr,"action":"dailyattendance"}, function(response){
				if(response.code == 200){
					// Success
					var result = response.result;
					callBack.call(this,result);
				}else{
					// Error
					$m.hideProgress();
					$m.alert(messages.ServerMessage);
					var errMsg = response.error.message;
					
				}
			});
		}else{
			$m.alert(messages.NoNetworkConnectivity);
		}
	},
	"updateDaily" : function(arr,callBack){	
		//arr = JSON.stringify(arr);
		if ($m.networkConnected()) {
			$m.post(attendanceConnector.url,{"data":arr,"action":"updateAttendance"}, function(response){
				if(response.code == 200){
					// Success
					var result = response.result;
					callBack.call(this,result);
				}else{
					// Error
					$m.alert(messages.ServerMessage);
					$m.hideProgress();
					var errMsg = response.error.message;
				}
			});
		}else{
			$m.alert(messages.NoNetworkConnectivity);
		}
	},
	"getEmpList" : function(emplist) {
		if ($m.isWeb()) {
            url = publicUrl+"/mowblyserver/employeeAddressServerScript/rellife/prod/RlifeAssist?sap_code=70008521";
        } else {
            url = publicUrl+"/mowblyserver/employeeAddressServerScript/rellife/prod/RlifeAssist?sap_code="+login_code;
        }
        if ($m.networkConnected()) {
        	$m.get(url, function(cb) {
                return function(response) {
                    if (response.code === 200) {
                        // Successs
                        var result = response.result;
                        var empList = JSON.parse(result.data);
                        cb.call(this, empList);
                    } else {
                        // Error
                       $m.hideProgress();
                        $m.alert(messages.ServerMessage);
                        var errMsg = response;
                        $m.logError(JSON.stringify(response));
                    }
                };
            }(emplist));
        } else {
            $m.alert(messages.NoNetworkConnectivity);
        }
	},
	"getDailyReport" : function(arr,callBack){	
		//arr = JSON.stringify(arr);
		if ($m.networkConnected()) {
			$m.post(attendenceUrl.checkAttendance,{"data":arr,"action":"selectAttendance"}, function(response){
				if(response.code == 200){
					// Success
					var result = response.result;
					callBack.call(this,result);
				}else{
					// Error
					$m.alert(messages.ServerMessage);
					$m.hideProgress();
					var errMsg = response.error.message;
				}
			});
		}else{
			$m.alert(messages.NoNetworkConnectivity);
		}
	},
	"updateDeviceId" : function(arr,callBack){	
		//arr = JSON.stringify(arr);
		if ($m.networkConnected()) {
			$m.post(attendenceUrl.updateImeiNo,{"data":arr,"action":"updateDeviceId"}, function(response){
				if(response.code == 200){
					// Success
					var result = response.result;
					callBack.call(this,result);
				}else{
					// Error
					$m.alert(messages.ServerMessage);
					$m.hideProgress();
					var errMsg = response.error.message;
				}
			});
		}else{
			$m.alert(messages.NoNetworkConnectivity);
		}
	},
	"getDeviceId" : function(arr,callBack){	
		//arr = JSON.stringify(arr);
		if ($m.networkConnected()) {
			$m.post(attendenceUrl.checkImeiNo,{"data":arr,"action":"selectDeviceId"}, function(response){
				if(response.code == 200){
					// Success
					var result = response.result;
					callBack.call(this,result);
				}else{
					// Error
					$m.alert(messages.ServerMessage);
					$m.hideProgress();
//					var errMsg = response.error.message;
				}
			});
		}else{
			$m.alert(messages.NoNetworkConnectivity);
		}
	},
	"getCheckInTime" : function(checkInTime) {
		if ($m.isWeb()) {
            url = publicUrl+"/mowblyserver/checkInServerScript/rellife/prod/RlifeAssist";
        } else {
            url = publicUrl+"/mowblyserver/checkInServerScript/rellife/prod/RlifeAssist";
        }
        if ($m.networkConnected()) {
        	$m.get(url, function(cb) {
                return function(response) {
                    if (response.code === 200) {
                        // Successs
                        var result = response.result;
                        var checkInTime = JSON.parse(result.data);
                        cb.call(this, checkInTime);
                    } else {
                        // Error
                        $m.hideProgress();
                        $m.alert(messages.ServerMessage);
                        var errMsg = response;
                        $m.logError(JSON.stringify(response));
                    }
                };
            }(checkInTime));
        } else {
            $m.alert(messages.NoNetworkConnectivity);
        }
	},
	"getSapCode" : function(arr,callBack){	
		//arr = JSON.stringify(arr);
		if ($m.networkConnected()) {
			$m.post(attendenceUrl.checkSapCode,{"data":arr,"action":"selectSapCode"}, function(response){
				if(response.code == 200){
					// Success
					var result = response.result;
					callBack.call(this,result);
				}else{
					// Error
					$m.alert(messages.ServerMessage);
					$m.hideProgress();
					var errMsg = response.error.message;
				}
			});
		}else{
			$m.alert(messages.NoNetworkConnectivity);
		}
	}
}

/*
	this.PassCheckInOut = function(Obj) {
	if($m.isWeb()){
	var serviceUrl=baseUrl+"/wsAttendanceDetails.svc/MarkAttendance";
	}
        $m.post(serviceUrl,{"data":obj}, function(cb) {
            return function(response) {
                if (response.code === 200) {
                    // Success
                    var result = response.result;
                     var array = JSON.parse(result.data);
                    cb.call(this, array);
                } else {
                    // Error
                    var errMsg = response.error.message;
                    $m.logError(JSON.stringify(response));
                }
            };
        }(Obj));
    };
}*/

var ServiceLibrary = function() {
	this.PassCheckInOut = function(data, inout) {
	    var serviceUrl = "http://lifelineuat.reliancelife.com/RassistServices/wsAttendanceDetails.svc/MarkAttendance";
	   if($m.networkConnected()){
	   	var data = JSON.stringify(data);
	   	 if ($m.isWeb()) {
        	credentials = Base64.encode("70268271:70268271");	
		} else {
			credentials = Base64.encode(login_code +":" + password);	
		}
	   	var messagedigest = md5(data,Constants.mdkey);
	    $m.post(serviceUrl, data, {"headers":{"Content-Type":"application/json","content-md5" : messagedigest,"Authorization":"Basic "+ credentials}},function(cb) {
	        return function(response) {
	            if (response.code == 200) {
	                // Success
	                var result = response.result;
	                var password = JSON.parse(result.data);
	                cb.call(this, password);
	            } else {
	                // Error
	                $m.hideProgress();
	                $m.alert(messages.ServiceMessage);
                    var errMsg = response;
                    $m.logError(JSON.stringify(response));
            }
	        };
	    }(inout));
	  }else{
		$m.alert(messages.NoNetworkConnectivity);
	  }
	},
	this.serverDateScript = function(data){	
		var serverDate;
		if ($m.networkConnected()) {
			var serviceUrl = publicUrl+"/mowblyserver/serverDateScript/rellife/prod/RlifeAssist";
			$m.get(serviceUrl, function(cb) {
                return function(response) {
                    if (response.code === 200) {
                        // Successs
                        var result = JSON.parse(response.result.data);
                        serverDate = new Date(result.entities).toString("yyyy-MM-dd");
                        $m.putPref("serverDate",serverDate);
                        $m.savePref();
                        cb.call(this, serverDate);
                    } else {
                        // Error
                       $m.hideProgress();
                        $m.alert(messages.ServerMessage);
                        var errMsg = response;
                        $m.logError(JSON.stringify(response));
                    }
                };
            }(data));
		}else{
			$m.alert(messages.NoNetworkConnectivity);
		}
	};	
	
	this.checkEmployeeAttendanceStatus = function(data){	
		if ($m.networkConnected()) {
			var serverDate = $m.getPref("serverDate");
			 if ($m.isWeb()) {
	        	credentials = Base64.encode("70268271:70268271");	
			} else {
				credentials = Base64.encode(logincode +":" + password);	
			}
			var serviceUrl = "http://lifelineuat.reliancelife.com/RassistServices/wsAttendanceDetails.svc/GetAttendanceDataBySAPDate/"+login_code+"/"+serverDate+"";
			$m.get(serviceUrl,{"headers":{"Content-Type":"application/json","content-md5" : messagedigest,"Authorization":"Basic "+ credentials}}, function(cb) {
                return function(response) {
                    if (response.code === 200) {
                        // Successs
                        var result = response.result;
                        var res = JSON.parse(result.data);
                        cb.call(this, res);
                    } else {
                        // Error
                       $m.hideProgress();
                        $m.alert(messages.ServiceMessage);
                        var errMsg = response;
                        $m.logError(JSON.stringify(response));
                    }
                };
            }(data));
		}else{
			$m.alert(messages.NoNetworkConnectivity);
		}
	};	
}   