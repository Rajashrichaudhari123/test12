/**
 * declarationAndSignature.js
 * @author CloudPact Technologies
 * @description : This script is used for declaration and signature purpose.
 **/

$m.juci.addDataset("annuityMap","");

// storing data into local db
function openNext7() {
	var a = juci.getControl("switchValue").value();
	if(a == "Y"){
		$m.confirm({
			"title": "Confirm",
			"message": "You have opted for new e-Account opening,kindly submit Pan/Aadhar as ID proof document,failing which CFR will be raised.",
			"buttons": [{
			"label": "Yes"
			}, {
			"label": "No"
			}]
		}, function(index) {
			// Code to execute when the confirm dialog dismisses
			if (index == 0) {
			// Yes
				openDeclarations();
			} else if (index == 1) {
			// No
			}
		});
	} else {
		openDeclarations();
	}
}

function openDeclarations(){
	var isAccepted  = declarations();
	if(!isAccepted){
		return;
	}
	var datasetData = $m.juci.dataset('signatureForm');
	var idproofData = juci.dataset("signatureForm");
	if(idproofData.Ins_Account_YN == "Y"){
		var idvalue = juci.getControl("id-proofs").value().idvalue();
		if(idvalue){
			$m.putPref("idValue",idvalue);
			$m.savePref();
		}	
	} 
	if(datasetData.Ins_Account_YN == 'Y'){
		datasetData.Ins_Repository_Type = datasetData.Ins_Repository_Type.LA_CODE;
		datasetData.Ins_Repository_YN = "";
		datasetData.Ins_Repository_AccountNumber = "";
	} else {
		if(datasetData.Ins_Repository_YN == "Y"){
			var eAccountNumber = datasetData.Ins_Repository_AccountNumber.charAt(0);
			if(eAccountNumber == "1"){
				datasetData.Ins_Repository_Type = obj.insuranceRepositoryValue[1].LA_CODE;
			} else if(eAccountNumber == "2"){
				datasetData.Ins_Repository_Type = obj.insuranceRepositoryValue[3].LA_CODE;
			} else if(eAccountNumber == "4"){
				datasetData.Ins_Repository_Type = obj.insuranceRepositoryValue[2].LA_CODE;
			} else if(eAccountNumber == "5"){
				datasetData.Ins_Repository_Type = obj.insuranceRepositoryValue[0].LA_CODE;
			} else {
				datasetData.Ins_Repository_Type = "";
			}
		}else{
			datasetData.Ins_Repository_AccountNumber = "";
			datasetData.Ins_Repository_Type = "";
		}
	}
	new window.DB(CONSTANTS.DBName, function(dbHelper) {
       window.dbHelper = dbHelper;
		var PDC_LifeStyle_Details_object = new PDC_LifeStyle_Details(datasetData);
		PDC_LifeStyle_Details_object.update(function() {
		    //$m.logInfo("Declaration Details  inserted successfully");       
		    var data = {"applicationNumber":applicationNumber};
		    navigateTo("confidentail");
		}, function(res) {
		    $m.logError("Failed to insert declaration details--- " + JSON.stringify(res));
		    $m.alert("Error while inserting to database");
		});
	});
}

function complexcomparator(a,b){
	
	return a['idvalue']==b['idvalue'];
	
	
}

function declarations(){
	var declarationpr = $m.juci.getControl("declarationpr").value();
	var declarationla = $m.juci.getControl("declarationla").value();
	var prohibition = $m.juci.getControl("prohibition").value();
	var policydetails = $m.juci.getControl("policydetails").value(); 
	var insurance = $m.juci.getControl("insurence").value();
	var valueChange = $m.juci.getControl("switchValue").value() ;
	if(valueChange == "Y"){
		if(!declarationpr || !declarationla || !prohibition || !policydetails || !insurance){
			$m.alert("Please accept terms and conditions");
			return false;
		}
	}
	return true;
}


function selectAllDeclarations(){
	var declarationpr = $m.juci.getControl("declarationpr").value(true);
	var declarationla = $m.juci.getControl("declarationla").value(true);
	var prohibition = $m.juci.getControl("prohibition").value(true);
	var policydetails = $m.juci.getControl("policydetails").value(true); 
	var insurance = $m.juci.getControl("insurence").value(true);
}

function hiddenCheckbox(event){
	var result = event.value;
	if(result == "N"){
		$m.juci.getControl("insurence").hide();
	}
	else{
		$m.juci.getControl("insurence").show();
	}
}