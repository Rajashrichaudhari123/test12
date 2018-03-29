/**
 * callticket.js
 *
 * @author CloudPact Technologies
 * @description : Saving the call ticket details
 */
$m.juci.addDataset("callTicketForm",bindingObject.saveRunnerActivity);
$m.juci.addDataset("category",["No Network","Invalid Policy Number", "Incorrect Information","Aadhar not available"]);
var datasetData = {};

$m.onReady(function(){
	juci.dataset("headerName","Call Ticket");
});


function saveCallTicket(){
	var locationCallback = function(lat, long) {
		datasetData = $m.juci.dataset("callTicketForm");
		datasetData.Latitude = lat;
		datasetData.Longitude = long;
		datasetData.Aadhar_YN = "N";
		datasetData.Source_From = "TAB";
					var aadharData = utils.GetPref("AadhaarData");
					if(aadharData){
						datasetData.Aadhar_YN = "Y";
						datasetData.Aadhar_Number = aadharData.Aadhar_Number;
						datasetData.Authenticate_By = aadharData.Authenticate_By;
						datasetData.Care_Of_Person = aadharData.Care_Of_Person;
						datasetData.City = aadharData.City;
						datasetData.Contact_No = aadharData.Contact_No;
						datasetData.Customer_Name = aadharData.Customer_Name;
						datasetData.Customer_Photo = aadharData.Customer_Photo;
						datasetData.DOB = aadharData.DOB;
						datasetData.Details_Approved = aadharData.Details_Approved;
						datasetData.Device_PN = aadharData.Device_PN;
						datasetData.Device_SN = aadharData.Device_SN;
						datasetData.District = aadharData.District;
						datasetData.EKYC_XML = aadharData.EKYC_XML;
						datasetData.Email_ID =aadharData.Email_ID;
						datasetData.Entry_Stage = aadharData.Entry_Stage;
						datasetData.Gender = aadharData.Gender;
						datasetData.House_Identifier = aadharData.House_Identifier;
						datasetData.Landmark = aadharData.Landmark;
						datasetData.Locality = aadharData.Locality;
						datasetData.Pincode = aadharData.Pincode;
						datasetData.PostOffice_Name = aadharData.PostOffice_Name;
						datasetData.Runner_Sapcode =  aadharData.SAPCode;
						datasetData.Source_From = aadharData.Source_From;
						datasetData.State = aadharData.State;
						datasetData.Street_Name = aadharData.Street_Name;
						datasetData.Sub_District = aadharData.Sub_District;
					}
					datasetData.Added_By = utils.GetLoginCode();
					//datasetData.Lat_Long_Address = address;
					datasetData.ClientID = "12345678";
					datasetData.DOB = -697680000000;
					datasetData.Customer_Name = "TESTING";
					datasetData.Renewal_Premium = "30153.78";
					datasetData.Policy_Status = "IF";
					datasetData.Source_From = "TAB";
					datasetData.iscompleted = "1";
					if (dbHelper) {
						var tablename = "saveRunnerActivity";
						var responsecallback = function(res){
							if(res.length > 0){
								// TODO : prepare object from this dataset
								var key = tablename+"_dbtableobject";
								window[key] = res;
								console.log(res);
								var Obj = new saveRunnerActivity(datasetData);
								var insertCallback = function() {
								//$m.logInfo("Successfully inserted!");
									if ($m.networkConnected()) {
	//									var networkCallback = function(res){
	//										if(res){
	//											console.log(res);
	//											utils.HideProgress();
	//										} 
	//									};
	//									utils.NetworkUtils(networkCallback);
										saveForm(datasetData);
									} else {
										$m.alert(messages.NoNetworkConnectivity, "Network Alert", function() {
											$m.hideProgress();
										    //openLifePlannerPage(datasetData);
										    $m.close();
										});
									}
								};
								utils.PojoInsert(tablename, insertCallback, Obj);
							}else{
								$m.alert("Can not save data at this movement");
								return;
							}
						};
						getTableInfo(tablename,responsecallback);
					}else {
							$m.alert("Error while opening database");
					}
//				}
//			}
//			else{
//				$m.hideProgress();
//				$m.alert(status);
//			}
//		}
//		geocoder.geocode({
//			'latLng': latlng
//		},geoCodeCallback);
	};
	utils.GetLocation(12000, true,locationCallback);
}

function fireRequestInput(action, data, callback){
	var url = Constants.publicIP+"/mowblyserver/slocationscript/rellife/prod/RlifeAssist";
     if ($m.networkConnected()) {
    	data = JSON.stringify(data);
        $m.post(url, {"action":action,"data":data}, function(callback) {
            return function(response) {
                if (response.code == 200) {
                    var result = response.result;
                    result = JSON.parse(JSON.parse(result.data).data);
                    //$m.logInfo("Input management : "  + action + "  "+ JSON.stringify(result));
                    callback.call(this, result);
                } else {
                    $m.alert(messages.ServerMessage,"Server Message",function(){
                        	$m.hideProgress();
            				$m.close();
                        });
                    var errMsg = response;
                    $m.logError(JSON.stringify(response));
                }
            };
        }(callback));
    } else {
        $m.alert(messages.NoNetworkConnectivity);
    }
}

function clearData(){
	$m.juci.getControl("policy_no").value("");
	$m.juci.getControl("meeting-status").value("");
	$m.juci.getControl("remark").value("");
}

function saveForm(datasetData){
	$m.showProgress("Syncing data...");
	var callback = function(res) {
		if (res.Status == "Y") {
			var serverAlertCallback = function(){
				//$m.logInfo("Runner activity inserted successfully");
				var filterData = new DB.Filter.equal("Policy_Number", "'" + datasetData.Policy_Number + "'"); 
				var data = {
					"issync" : "1"
				}
				saveRunnerActivity.updateSync(data, filterData, function(){
					$m.hideProgress();
					clearData();
					//setClose();
					//$m.open("com.cloudpact.mowbly.home","/system/home.html");
					$m.close();
				});
			};
			$m.alert("Record inserted successfully to server","Alert",serverAlertCallback);
		} else {
			$m.logError("Failed to insert Runner Activity response is" + ' ' + res.Status);
			$m.alert("Failed to insert Runner Activity response is" + ' ' + res.Status, "Failed to Insert", function() {
				utils.HideProgress();
				clearData();
				utils.ClosePage();
			});
		}
	};
//	fireRequestInput("SaveRunner", datasetData, callback);
	service.saveRunnerActivityDetails(callback,datasetData);
}