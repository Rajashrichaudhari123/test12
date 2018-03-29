/**
 * attendance.js
 * @author CloudPact Technologies
 * @description : This script is for checkin and checkout of attendance.
 **/

var lat, long;
var uname =  "";
var infowindow;
var currLatLong = {};
var map;
var entry_time;
var deviceId;
var devicestarttime;
var current_address;
$m.juci.addDataset("checktimeObj", "");
$m.juci.addDataset("searchInput","");
$m.juci.addDataset("isCheckInEnable",false);
$m.juci.addDataset("isCheckOutEnable",false);

/** Checking Network Speed **/
$m.onReady(function() {
	checkingNetwork();
	//initReady();
});

/** Fetching Employee Server data **/
$m.onResume(function(eventObject) {
	checkingNetworkSpeed();
	FetchingServerDate();
});

function checkingNetwork(){
	$m.juci.dataset("headerName", "Attendance");
//	utils.NetworkUtils();
}

/** Fetching Server Date **/
function FetchingServerDate(){
	service = new ServiceLibrary();
	var serverDateScriptCallback = function(response) {
		utils.PutPref("ServerTime",response);
	};
	service.serverDateScript(serverDateScriptCallback);
}

//Checking with network bandwidth

var checkingNetworkSpeedCallback = function(res){
		checkEmployeeAttendanceStatus();
};
var message = "Your Network bandwidth is below 256 KBPS.It will take some time to sync the data.Do you want to Proceed?";
utils.CheckingNetworkSpeed(message,checkingNetworkSpeedCallback);

function checkingNetworkSpeed(){
	devicestarttime = utils.GetTimeStamp();
	attendencelog = "";
	$m.showProgress("Checking network bandwidth");
	$m.juci.dataset("searchInput","Calling Web Services for Requirements");
	setTimeout(function() {
		$m.showProgress("Checking your network bandwidth please wait...");
		utils.NetworkUtils();
	}, 1000);
}

// checking employee daily attendance status
function checkEmployeeAttendanceStatus(){
	service = new ServiceLibrary();
	var alertCallback = function(){
		$m.hideProgress();
		$m.close();
	};
	var employeeStatusCallback = function(response) {
		if (response.Output == "A") {
			checkDeviceid();
			getReport();
		} else if(response.Output == "P"){
			checkDeviceid();
			getReport();
			//$m.alert("Already Your Attendance is marked today","Alert",alertCallback);	
		} else {
			$m.alert("Attendance check in will not happen today","Alert",alertCallback);	
		}
	};
	service.checkEmployeeAttendanceStatus(employeeStatusCallback);
}

//Checking Device Id
function checkDeviceid() {
	uname = utils.GetLoginCode();
	var isToday = $m.getPref("isToday");
	if (isToday) {
		$m.putPref("isToday", true);
		$m.savePref();
	}
	$m.showProgress("Fetching Device ID's....");
	$m.getDeviceId(function(response) {
		deviceId = response.result;
		showElapsedTime(devicestarttime,"Get DeviceId Api");
		var dataObj = {
			"SAP_Code": uname,
			"IMIENO": deviceId
		}
		//check with device id
		var getDeviceIdCallback = function(serverResponse) {
			var response = JSON.parse(serverResponse.data);
			var result = response.code;
			showElapsedTime(devicestarttime,"Get DeivceId");
			$m.hideProgress();
			if (result == 103) {
				for (var i = 0; i < response.entities.length; i++) {
					var deviceId_check = response.entities[i].IMIENO;
					var present_deviceId = deviceId;
					if (deviceId_check != present_deviceId && (deviceId_check)) {
						$m.hideProgress();
						var checkinAlertCallback = function() {
							$m.close();	
						}
						$m.alert("You cannot checkin with other SAP Id in this device", "Alert",checkinAlertCallback);
					} else if (deviceId_check === "") {
						$m.showProgress("Fetching SAP Code");
						var getSapCodeCallback = function(serverResponse) {
							showElapsedTime(devicestarttime,"Get SapCode");
							var response = JSON.parse(serverResponse.data);
							var result = response.code;
							if (result == 103) {
								var resp = response.entities.length;
								if (resp != 0) {
									$m.hideProgress();
									var sapIdAlertCallback = function() {
										$m.close();		
									}
									$m.alert("You cannot checkin with other SAP Id in this device", "Alert",sapIdAlertCallback);
								} else {
									$m.showProgress("Updating Device ID");
									var updateDeviceIdCallback = function(serverResponse) {
										showElapsedTime(devicestarttime,"Updating Device Id");
										var response = JSON.parse(serverResponse.data);
										var result = response.code;
										if (result == 103) {
											getGeoLocation();
										} else {
											$m.alert("Error while updating Database");
											$m.hideProgress();
										}
									};
									attendanceConnector.updateDeviceId(dataObj,updateDeviceIdCallback);
								}
							}
						};
						attendanceConnector.getSapCode(dataObj,getSapCodeCallback);
					} else {
						getGeoLocation();
					}
				}
			}
		};
		attendanceConnector.getDeviceId(dataObj,getDeviceIdCallback);
	});
	var dateString = utils.GetDateString();
	if (dateString == "23:59") {
		checkInCheckOutDisable();
	}
}

//Checking SapId with daily report when user logout the application
function getReport() {
	var array = {
		"SAP_Code": uname
	};
	$m.removePref("today_checkin");
	$m.removePref("login_time");
	$m.removePref("today_checkout");
	$m.showProgress("Fetching Daily Report....");
	var getDailyReportCallback = function(serverResponse) {
		showElapsedTime(devicestarttime,"GetDailyReport");
		var response = JSON.parse(serverResponse.data);
		var result = response.code;
		if (result == 103) {
			checkInCheckOutDisable();
			for (var i = 0; i < response.entities.length; i++) {
				var date_string = response.entities[i].Login_DateTime;
				var date_checked = date_string.lastIndexOf(" ");
				var date_checkedIn = date_string.substring(0, date_checked);
				var date_stringCheck = response.entities[i].Logout_DateTime;
				var date_checkedCheck = date_stringCheck.lastIndexOf(" ");
				var date_checkedOut = date_stringCheck.substring(0, date_checkedCheck);
				var today_date = new Date().toString("yyyy-MM-dd");
				if (response.entities[i].Login_DateTime != "null") {
					if (date_checkedIn == today_date) {
						$m.putPref("today_checkin", true);
						$m.savePref();
						var checked_inTime = response.entities[i].Login_DateTime;
						$m.putPref("login_time", checked_inTime);
						$m.savePref();
						checkOutEnable();
					}
				}
				if (response.entities[i].Logout_DateTime != "null") {
					if (date_checkedOut == today_date) {
						$m.putPref("today_checkout", true);
						$m.savePref();
						$m.juci.dataset("isCheckOutEnable",false);
					}
				}
			}
		}
	};
	attendanceConnector.getDailyReport(array,getDailyReportCallback);
}


// Fetching Employee address from server
// Current Location Latititude and Longititude

function getGeoLocation() {
	if ($m.networkConnected()) {
		$m.showProgress("Fetching Employee List...");
		var getEmpListCallback = function(res) {
			$m.showProgress("Fetching Check In Time...");
			showElapsedTime(devicestarttime,"GetEmpList");
			var getCheckinCallback = function(response) {
				showElapsedTime(devicestarttime,"Get CheckIn Time");
				var obj = {
					"checkintime": response.checkintime,
					"radius": response.radius
				};
				$m.juci.dataset("checktimeObj", obj);
				$m.showProgress("Fetching Location...");
				$m.getLocation({
					"enableHighAccuracy": true,
				}, function(resp) {
					showElapsedTime(devicestarttime,"Get Location");
					if (resp.code) {
						//$m.alert("resp" , resp.code);
						lat = parseFloat(resp.result.position.coords.latitude);
						long = parseFloat(resp.result.position.coords.longitude);
						$m.alert("Lat" + lat , "long" + long);
						currLatLong = {
							lat: lat,
							lng: long
						};
						initMap();
						getServerAddress(res);
					} else if (resp.error.message == "Request timed out") {
						$m.hideProgress();
						$m.alert("Please Enable GPS", "", function() {
							var callback = function(r){
								if(r.code == 1)
									$m.toast("success");
								};
								Framework.openExternal({"className":"","packageName":"com.android.settings","action":"android.settings.LOCATION_SOURCE_SETTINGS"},callback);
						});
					} else if (resp.code == 0) {
						if (resp.error.message == "No location providers enabled") {
							$m.hideProgress();
							$m.alert("Please Enable GPS", "", function() {
								$m.close();
							});
						}
					}
				});
			};
			attendanceConnector.getCheckInTime(getCheckinCallback);
		};
		attendanceConnector.getEmpList(getEmpListCallback);
	} else {
		$m.alert("Please check the internet connectivity");
		$m.hideProgress;
	}
}

// Intializing Map
function initMap() {
	var check = $m.juci.dataset("checktimeObj");
	currLatLong = {
		lat: lat,
		lng: long
	};
	infowindow = new google.maps.InfoWindow();
	map = new google.maps.Map($m.juci.findById('map').el, {
		zoom: 15,
		center: currLatLong,
		radius: check.radius
	});
}


//Call the check in function
var flag = 0;
var data, checkin;
var txn_id;
var currentDate = utils.GetDateTime();

function callCheckIn() {
	$m.showProgress("Please wait....");
	var check = $m.juci.dataset("checktimeObj");
	if (currentDate) {
		var time = new Date().toString("hh:mm tt");
		if (time <= check.checkintime) {
			var today_checkin = $m.getPref("today_checkin");
			if (today_checkin != true) {
				entry_time = new Date().toString("yyyy-MM-dd H:mm:ss.000");
				$m.putPref("login_time", entry_time);
				$m.savePref();
				txn_id = Math.floor(10000000 + Math.random() * 90000000);
				data = {
					"Address": current_address,
					"Device_Id": deviceId,
					"InOut": "IN",
					"Latitude": lat,
					"Longitude": long,
					"SAP_Code": uname,
					"Source_From": "TAB",
					"Login_DateTime": entry_time
				};
				if (flag === 0) {
					var dbHelperCallback = function(){
						var tablename = "Attendance_Emp_DailyAtt";
						var responsecallback = function(res){
							if(res.length > 0){
								// TODO : prepare object from this dataset
								var key = tablename+"_dbtableobject";
								window[key] = res;
								console.log(res);
								var attendObj = new Attendance_Emp_DailyAtt(data);
								var insertAttendanceSuccessCallback = function(success) {
									delete data.Login_DateTime;
									service = new ServiceLibrary();
									var passCheckOutCallback = function(list) {
										if (list == "FAILURE") {
											$m.alert(list);
											$m.hideProgress();
										} else {
											checkin = {
												"ischeckin": 1
											};
											$m.putPref("check_value", checkin);
											$m.savePref();
											$m.hideProgress();
											$m.toast("You are Successfully Logged In & Your attendance marked for the day");
											checkOutEnable();
										}
									};
									service.PassCheckInOut(data,passCheckOutCallback);
								};
								var insertAttendanceFailureCallback = function(failure_response) {
									$m.logError("Read failed -- " + JSON.stringify(failure_response));
								};
								attendObj.insert(insertAttendanceSuccessCallback,insertAttendanceFailureCallback);
							}else{
								$m.alert("Can not save data at this movement");
								return;
							}
						};
						getTableInfo(tablename,responsecallback);
						
					};
					utils.GetDbhelper(dbHelperCallback);
					flag++;
				}
			} else {
				$m.alert("Sorry!You have already registed Today");
			}
		} else {
			attendanceTimeoutAlertCallback = function() {
				$m.juci.dataset("isCheckInEnable",false);
			};
			$m.alert("Attendance cannot  be marked after 10:00 AM", "Alert",attendanceTimeoutAlertCallback);
		}
	}
}

//Call the check out function
function callCheckOut() {
	$m.showProgress("Please wait....");
	if (currentDate) {
		var todayCheckout = $m.getPref("today_checkout");
		if (todayCheckout !== true) {
			var checkedin_time = $m.getPref("login_time");
			exit_time = new Date().toString("yyyy-MM-dd H:mm:ss.000");
			var loginTime = $m.getPref("login_time");
			if (loginTime) {
				checkin = "1";
			}
			data = {
				"Address": current_address,
				"Device_Id": deviceId,
				"InOut": "OUT",
				"Latitude": lat,
				"Longitude": long,
				"SAP_Code": uname,
				"Source_From": "TAB",
				"ischeckin": checkin,
				"Login_DateTime": checkedin_time
			};
			if (data.ischeckin) {
				var getDBHelperCallback = function(){
					if (data.SAP_Code) {
						var tablename = "Attendance_Emp_DailyAtt";
						var responsecallback = function(res){
							if(res.length > 0){
								// TODO : prepare object from this dataset
								var key = tablename+"_dbtableobject";
								window[key] = res;
								console.log(res);
								var attendObj = new Attendance_Emp_DailyAtt(data);
								var attendanceObjUpdateCallback = function(success) {
									service = new ServiceLibrary();
									var passCheckInOutCallback = function(list) {
										if (list == "FAILURE") {
											$m.alert(list);
											$m.hideProgress();
										} else {
											$m.hideProgress();
											$m.toast("You have Successfully Logged Out!");
											$m.juci.dataset("isCheckOutEnable",false);
										}
									}
									service.PassCheckInOut(data,passCheckInOutCallback);
								};
								var attendanceUpdateFailureCallback = function(failure_response) {
									$m.logError("Read failed -- " + JSON.stringify(failure_response));
								};
								attendObj.update(data.Login_DateTime,attendanceObjUpdateCallback,attendanceUpdateFailureCallback);
							}else{
								$m.alert("Can not save data at this movement");
								return;
							}
						};
						getTableInfo(tablename,responsecallback);
					};
				};
				utils.GetDbhelper(getDBHelperCallback);
			}
		} else {
			$m.alert("Sorry!You have already checked out Today");
		}
	}
}


// converting server destination address to lat,long
// converting server lat,long  to destination address
function getServerAddress(res) {
	var destAddress = [];
	if (res.code == 103) {
		for (var i = 0; i < res.entities.length; i++) {
			var latitude = res.entities[i].Lattitude_Node;
			var longitude = res.entities[i].Logititude_Node;
			getDestinationLatLong(latitude, longitude);
		}
	}
	else{
		$m.hideprogress();
		$m.alert(res.message);
	}
}


var destinationObj = {};
function getDestinationLatLong(latitude, longitude) {
	$m.showProgress("Calculating Destination distance");
	var check = $m.juci.dataset("checktimeObj");
	var geocoder = new google.maps.Geocoder();
	infowindow = new google.maps.InfoWindow();
	var latit = parseFloat(latitude);
	var longi = parseFloat(longitude);
	var latlng = {
		lat: latit,
		lng: longi
	};
	var p1 = new google.maps.LatLng(lat, long);
	var p2 = new google.maps.LatLng(latit, longi);
	var destMarker = new google.maps.Marker({
		map: map,
		position: latlng,
		icon: ('images/Location.png')
	});
	var cityCircle = new google.maps.Circle({
		strokeColor: '#BFC9CA',
		strokeOpacity: 0.8,
		strokeWeight: 3,
		fillColor: '#21618C',
		fillOpacity: 0.25,
		map: map,
		center: latlng,
		radius: check.radius
	});
	var geoCodeCallback = function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[1]) {
				google.maps.event.addListener(destMarker, 'click', function() {
					infowindow.setContent(results[1].formatted_address);
					infowindow.open(map, destMarker);
				});
				getDistanceMatrix(p1, p2);
			} else if(results[0]) {
				google.maps.event.addListener(destMarker, 'click', function() {
					infowindow.setContent(results[0].formatted_address);
					infowindow.open(map, destMarker);
				});
				getDistanceMatrix(p1, p2);
			}
		}
		else{
			//$m.hideProgress();
			$m.juci.dataset("searchInput","");
			//$m.alert(status);
			google.maps.event.addListener(destMarker, 'click', function() {
				//infowindow.setContent(results[1].formatted_address);
				infowindow.open(map, destMarker);
			});
			getDistanceMatrix(p1, p2);
		}
	}
	geocoder.geocode({
		'latLng': latlng
	},geoCodeCallback);
}

// Calculating origin and destination distance in metres. 
var finalDistance;
var dist_in;
var dest_distance;
var dest_status = false;

function getDistanceMatrix(p1, p2) {
	var check = $m.juci.dataset("checktimeObj");
	var service = new google.maps.DistanceMatrixService();
	var geocoder = new google.maps.Geocoder();
	var geocodeCallback = function(results, status) {
		showElapsedTime(devicestarttime,"Distance Calculating Time");
		setLogs();
		if (status === 'OK') {
			if (results[1]) {
				var marker = new google.maps.Marker({
					position: currLatLong,
					map: map
				});
				$m.juci.dataset("searchInput",results[1].formatted_address);
				current_address = results[1].formatted_address;
				var mapListenerCallback = function() {
					infowindow.setContent(results[1].formatted_address);
					infowindow.open(map, marker);
				};
				google.maps.event.addListener(marker, 'click',mapListenerCallback);
				var distance = (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
				finalDistance = distance * 1000;
				var time = new Date().toString("HH:mm");
				var loginTime = $m.getPref("login_time");
				if (loginTime) {
					$m.juci.dataset("isCheckInEnable",false);
				} else if (time <= check.checkintime && finalDistance <= check.radius) {
					checkInEnable();
				} else if (finalDistance >= check.radius && time >= check.checkintime) {
					checkInCheckOutDisable();
				} else if (finalDistance <= check.radius && time >= check.checkintime) {
					checkInCheckOutDisable();
				}
				$m.hideProgress();
			} else if (results[0]) {
				var marker = new google.maps.Marker({
					position: currLatLong,
					map: map
				});
				$m.juci.dataset("searchInput",results[0].formatted_address);
				current_address = results[0].formatted_address;
				var mapListenerCallback = function() {
					infowindow.setContent(results[0].formatted_address);
					infowindow.open(map, marker);
				};
				google.maps.event.addListener(marker, 'click',mapListenerCallback);
				var distance = (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
				finalDistance = distance * 1000;
				var time = new Date().toString("HH:mm");
				var loginTime = $m.getPref("login_time");
				if (loginTime) {
					$m.juci.dataset("isCheckInEnable",false);
				} else if (time <= check.checkintime && finalDistance <= check.radius) {
					checkInEnable();
				} else if (finalDistance >= check.radius && time >= check.checkintime) {
					checkInCheckOutDisable();
				} else if (finalDistance <= check.radius && time >= check.checkintime) {
					checkInCheckOutDisable();
				}
				$m.hideProgress();
			
			}else {
				$m.alert('No results found');
				$m.hideProgress();
			}
		} else {
			//$m.alert('Geocoder failed due to: ' + status);
			$m.hideProgress();
			var marker = new google.maps.Marker({
				position: currLatLong,
				map: map
			});
			$m.juci.dataset("searchInput","");
			current_address = "";
			var mapListenerCallback = function() {
//					infowindow.setContent(results[1].formatted_address);
				infowindow.open(map, marker);
			}
			google.maps.event.addListener(marker, 'click',mapListenerCallback);
			var distance = (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
			finalDistance = distance * 1000;
			var time = new Date().toString("HH:mm");
			var loginTime = $m.getPref("login_time");
			if (loginTime) {
				$m.juci.dataset("isCheckInEnable",false);
			} else if (time <= check.checkintime && finalDistance <= check.radius) {
				checkInEnable();
			} else if (finalDistance >= check.radius && time >= check.checkintime) {
				checkInCheckOutDisable();
			} else if (finalDistance <= check.radius && time >= check.checkintime) {
				checkInCheckOutDisable();
			}
		}
	}
	geocoder.geocode({
		'location': currLatLong
	},geocodeCallback);
}


//Calculating elapsed time
function showElapsedTime(time,servicename){
	var elaspedtime = (devicestarttime - time)/1000.0;
	$m.logInfo(servicename + " elasped time : " + JSON.stringify(elaspedtime));
	$m.logDebug(servicename + " elasped time : " + JSON.stringify(elaspedtime));
	var attendencelog  = servicename + " elasped time : " + JSON.stringify(elaspedtime) +" ";
	setLogs(attendencelog);
}

function setLogs(attendencelog){
	var url = encodeURI(publicUrl+"/mowblyserver/attendencefile/rellife/prod/RlifeAssist?data="+JSON.stringify(attendencelog));
	$m.get(url, function(response){
		if(response.code === 200){
			var result = response.result;
		} else{
			var errMsg = response.error.message;
		}
	});
}

function checkInCheckOutDisable(){
	$m.juci.dataset("isCheckInEnable",false);
	$m.juci.dataset("isCheckOutEnable",false);
}

function checkOutEnable(){
	$m.juci.dataset("isCheckInEnable",false);
	$m.juci.dataset("isCheckOutEnable",true);
}

function checkInEnable(){
	$m.juci.dataset("isCheckInEnable",true);
	$m.juci.dataset("isCheckOutEnable",false);
}

