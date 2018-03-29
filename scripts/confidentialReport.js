/**
 * confidentialReport.js
 * @author CloudPact Technologies
 * @description : This script is used for confidentialReport data storing into local db.
 **/

// data storing in local db
function openNext8() {
	var datasetData = $m.juci.dataset('cfrSectionForm');
	//datasetData.Application_Number=applicationNumber;
	datasetData.CFReport_2_Relatedto_LARelationship = datasetData.CFReport_2_Relatedto_LARelationship.LA_CODE;
	datasetData.CFReport_5_IncomeVerified_Type = datasetData.CFReport_5_IncomeVerified_Type.LA_CODE;
	new window.DB(CONSTANTS.DBName, function(dbHelper) {
		window.dbHelper = dbHelper;
	    var PDC_LifeStyle_Details_object = new PDC_LifeStyle_Details(datasetData);
		    PDC_LifeStyle_Details_object.update(function() {		
				//$m.logInfo("Confidential Details  inserted successfully");       
				var data = {"applicationNumber":applicationNumber};
					navigateTo("prepayment");
					utils.GetControl("toogle").toggle(2);
		    }, function(res) {
		        $m.logError("Failed to insert Confidential details--- " + JSON.stringify(res));
		        $m.alert("Error while inserting to database");
		    });
	}, function(error) {
		        $m.logError("Unable to open database due to -- " + JSON.stringify(error));
		        $m.alert("Error while opening database");
   	});
}

function getAnnuityValidate(annuityId){
	//juci.dataset("annuityMap");
	//var annuityId = juci.dataset("annuityMap");
	if(annuityId != ""){
		if(annuityId == '114'){
			return true;
		} else {
			return false;
		}
	}
}