/**
 * nomineeAppointee.js
 * @author CloudPact Technologies
 * @description : This script is used for storing nominee and appointee data into local db.
 **/
$m.juci.addDataset("appAge",true);

function openNext2(){
	var datasetData = $m.juci.dataset('nomineeOrAppointeeDetailsForm');
//	if(datasetData.NOM_Mobileno.length != 10 && datasetData.NOM_Mobileno != "" ){
//		return;
//	}
	datasetData.NOM_DOB = datasetData.NOM_DOB.getTime();
	datasetData.NOM_Salutation = datasetData.NOM_Salutation.LA_CODE;
	datasetData.NOM_LA_Relationship = datasetData.NOM_LA_Relationship.LA_CODE;
	datasetData.NOM_DOB_1 = new Date(datasetData.NOM_DOB_1);
	datasetData.NOM_DOB_1 = datasetData.NOM_DOB_1.getTime();
	datasetData.NOM_Salutation_1 = datasetData.NOM_Salutation_1.LA_CODE;
	datasetData.NOM_LA_Relationship_1 = datasetData.NOM_LA_Relationship_1.LA_CODE;
	datasetData.APP_DOB = datasetData.APP_DOB ? datasetData.APP_DOB.getTime() : datasetData.APP_DOB;
	datasetData.Child_DOB = datasetData.Child_DOB ? datasetData.Child_DOB.getTime() : datasetData.Child_DOB;
	datasetData.APP_Salutation = datasetData.APP_Salutation? datasetData.APP_Salutation.LA_CODE : datasetData.APP_Salutation; 
	datasetData.APP_NOM_Relationship = datasetData.APP_NOM_Relationship? datasetData.APP_NOM_Relationship.LA_CODE : datasetData.APP_NOM_Relationship;
	$m.putPref("customerDetails", datasetData);
	$m.savePref();
	$m.putPref("messageSchedular",datasetData);
	$m.savePref();
	if(getAge(datasetData.NOM_DOB) >= 18){
		datasetData.APP_Gender = "";
		datasetData.APP_NOM_AddressSame = "";
		datasetData.APP_Salutation="";
	}	
	if(datasetData.IS_LA_PR_SAME == 'Y'){
		datasetData.PR_Gender = "";
		datasetData.PR_IsRelianceEmp = "";
		datasetData.PR_LA_AddressSame = "";
	}
	 var PDC_Customer_Details_object = new PDC_Customer_Details(datasetData);
    PDC_Customer_Details_object.update(function(dbresponse) {
       // $m.logInfo("Nominee Details  inserted successfully");       
        var data = {"applicationNumber":applicationNumber};
			navigateTo("family");
    }, function(res) {
        $m.logError("Failed to insert personal details--- " + JSON.stringify(res));
        $m.alert("Error while inserting to database");
    });
}


function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}

function assigndate(){
	var dob = $m.juci.dataset("nomineeOrAppointeeDetailsForm").NOM_DOB;
	var newdob = new Date(dob).toDateString();
	var currentDate =  new Date().toDateString();
	if(dob > new Date()){
		$m.juci.getDataset("nomineeOrAppointeeDetailsForm")().NOM_DOB('');
		$m.alert("Date of birth should not be greater than Today's Date");
	}
	else if(newdob == currentDate){
		$m.juci.getDataset("nomineeOrAppointeeDetailsForm")().NOM_DOB('');
		$m.alert("Date of birth should not be current date");	
	}
	else{
		var age = getAge(dob);
		if(age < 18){
			juci.findById("appointee-section").show();
			$m.juci.dataset("appAge",false);	
		}
		else {
			var planCode = $m.getPref("planDetails").PLanCode;
			if(planCode == "101"){
				juci.getControl("uneditabledob").value(null);
				$m.alert("Nominee age should not be greater than 18 yrs.");
			} else {
				juci.findById("appointee-section").hide();
				$m.juci.dataset("appAge",true);	
			}
		}
	}
}

function getGender(relation){
	if(relation=="Grandson"||relation=="Son")
		return "M";
	else 
		return "F";
}

function getLACODEfromChildLARelation(relation){
	if(relation=="Grandson")
	{
	return "GS";
	}
	else if(relation=="Son")
	{
	return "SO";
	}
	else if(relation=="Granddaughter")
	{
	return "GD";
	}
	else if(relation=="Daughter")
	{
	return "DA";
	}
 }
 
