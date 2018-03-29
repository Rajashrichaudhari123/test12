/**
 * bindingObjectInput.js
 *
 * @author CloudPact Technologies
 * @description : Contains all input management dataset values
 */
var bindingObjInputManagement = {
	"NewLead" : {
		"Aadhaar":"",
		"Added_By":"",
		"Address_1":"",
		"Address_2":"",
		"Address_3":"",
		"Alternate_Number":"",
		"City":"",
		"Campaign":"",
		"Marital_Status":"",
		"Commute_Time":"",
		"DOB":new Date(1009823400000),
		"Dependents":"",
		"Device_Id":"",
		"Educational_Background":"",
		"Email_ID":"",
		"Gender":"Male",
		"Income":"",
		"Landline":"",
		"Lead_Category":"",
		"Lead_Id":"",
		"Lead_Source":"",
		"Lead_Status":"",
		"Lead_Sub_Source":"",
		"Lead_Sub_Type":"",
		"Lead_Type":"",
		"Mobile":"",
		"Name":"",
		"Occupation":"",
		"Pin_Code":"",
		"Source_From":"TAB",
		"Reference_LeadID":null,
		"Reference_YN":"N",
		"State":"",
		"Latitude":"",
		"Longitude":"",
		"Address":"",
		"Advisor_Code":"",
		"LeadInfo_Remarks":"",
		"campaign_type":"",
		"lead_id":"",
		"policyNumber":""
	},
	"ActivityPlanning":{
		"Activity":"",
		"Activity_Date":"",
		"Activity_Id":"",
		"Activity_Location":"",
		"Advisor_Status":"",
		"Activity_Time":null,
		"Added_By":"",
		"Device_Id":"",
		"Lead_Id":"",
		"Source_From":"TAB",
		"Special_Campaign":"",
		"Sub_Activity":"",
		"Sub_Activity_Options":"",
		"Sync_Txn_Id":"",
		"With_Whom":"",
		"Latitude":"",
		"Longitude":"",
		"Address":"",
		"Advisor_SAPCode":"",
		"Advisor_Name":"",
		"Planning_Remarks":""
	},
	"ActivityResult":{
		"Activity":{"LA_CODE":"","Description":""},
		"Activity_Date":new Date().getTime(),
		"Activity_Id":"",
		"Activity_Location":"",
		"Activity_Time":"",
		"Added_By":"",
		"Device_Id":"",
		"Lead_Category":"",
		"Lead_Disposition":"",
		"Lead_Id":"",
		"Meeting_Status":{"LA_CODE":"","Description":""},
		"Next_Appointment":"",
		"Sync_Txn_Id":"",
		"Source_From":"TAB",
		"Sub_Activity":"",
		"Sub_Activity_Options":"",
		"With_Whom":"",
		"Name":"",
		"DOB":"",
		"City":"",
		"Gender":"",
		"Income":"",
		"Marital_Status":"",
		"Campaign_Name":"",
		"Latitude":"",
		"Longitude":"",
		"Address":"",
		"Lead_Type":"",
		"renewal_check_flag":false,
		"permium_bucket_ref":""
	}
};


function fireRequestInput(action, sapcode, callback){
	var url = "http://124.124.218.136/supertrack/mowblyserver/sGetAadharDetails/rellife/prod/RlifeAssist";
	if ($m.networkConnected()) {
		$m.post(url, {"action":action,"sapCode":sapcode,"headers": {
			"Content-Type": "application/json"
			}}, function(callback) {
			return function(response) {
				if (response.code == 200) {
					var result = JSON.parse(response.result.data);
					result = result.dataArray;
					if(result.length != 0){
						$m.hideProgress();
						callback.call(this, result);
					} else {
						$m.hideProgress();
						callback.call(this, result);
						$m.logError(JSON.stringify(response));
					}	
				}  else {
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
		$m.alert(messages.NoNetworkConnectivity,"Network Error",function(){
		$m.hideProgress();
		});
	}
}