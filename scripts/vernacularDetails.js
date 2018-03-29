/**
 * vernacularDetails.js
 * @author CloudPact Technologies
 * @description : This script is used for storing the vernacular details into local db
 **/
function openNext6() {
	var datasetData = $m.juci.dataset('vernacularOrUneducatedForm');
	datasetData.Declarant_Date = datasetData.Declarant_Date !== ""? datasetData.Declarant_Date.getTime() : datasetData.Declarant_Date;
	datasetData.Witness_Date = datasetData.Witness_Date.getTime();
	new window.DB(CONSTANTS.DBName, function(dbHelper) {
       window.dbHelper = dbHelper;
	    var PDC_LifeStyle_Details_object = new PDC_LifeStyle_Details(datasetData);
		PDC_LifeStyle_Details_object.update(function() {
		    //$m.logInfo("Vernacular Details  inserted successfully");       
		    var data = {"applicationNumber":applicationNumber};
			   	navigateTo("declaration");
		}, function(res) {
		    $m.logError("Failed to insert Vernacular details--- " + JSON.stringify(res));
		    $m.alert("Error while inserting to database");
		});
	});
}