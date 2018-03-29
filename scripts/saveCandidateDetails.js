/**
 * saveCandidateDetails.js
 * @author CloudPact Technologies
 * @description : This script is used for storing newlead data into local db.
 **/
var SaveCandidateTableName = "saveCandidateDetails";
// Constructor
function saveCandidateDetails(obj){
	var columns = saveCandidateDetails.getColumns();
	for(var i=0; i<columns.length; i++){
	/*	if(typeof obj[columns[i].name] === "string"){
			obj[columns[i].name] = obj[columns[i].name].replace(/,/g , "")
		}*/
		this[columns[i].name] = obj[columns[i].name] ? obj[columns[i].name] : columns[i].objdefault;
	}
}

// Prototype methods
saveCandidateDetails.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(SaveCandidateTableName,this).execute(success_callback,failure_callback);
};

saveCandidateDetails.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + this.Application_Number + "'");
	saveNewLead.dbHelper.Delete(SaveCandidateTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

saveCandidateDetails.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(SaveCandidateTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
saveCandidateDetails.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(SaveCandidateTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

saveCandidateDetails.alterTable = function(columns, success_callback,failure_callback){
	dbHelper.AlterTable(SaveCandidateTableName, columns).execute(success_callback,failure_callback);
};

saveCandidateDetails.multipleInsert = function(entity, success_callback,failure_callback,inc_cb){
	dbHelper.MultiInsert(SaveCandidateTableName, getKeyColums(this.getColumns()), entity, success_callback, inc_cb);
};

saveCandidateDetails.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(SaveCandidateTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
	//	$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

saveCandidateDetails.Select = function(success_callback,failure_callback){
	dbHelper.Select(SaveCandidateTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

saveCandidateDetails.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Lead_ID", "'" + a + "'");
	dbHelper.Select(SaveCandidateTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

saveCandidateDetails.SelectWithFilterAppNo = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Select(SaveCandidateTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

saveCandidateDetails.SelectedDraftedApp = function(filter,success_callback,failure_callback){
	dbHelper.Select(SaveCandidateTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};

saveCandidateDetails.selectDataToSync = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(SaveCandidateTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new saveNewLead(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

saveCandidateDetails.selectUnsyncedData = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(SaveCandidateTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new saveNewLead(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

saveCandidateDetails.countProposalsToSync = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(SaveCandidateTableName,['count(*) as count'],false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		readSuccess(response);
	},readFailure);
};

saveCandidateDetails.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(SaveCandidateTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

saveCandidateDetails.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(SaveCandidateTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

saveCandidateDetails.updateDocsUploaded = function(appNo,success_callback,failure_callback) {
	/*dbHelper.Update(PDC_Customer_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);*/
	dbHelper.db.executeSql("update saveNewLead set DOCS_UPLOADED = 'Y' where Application_Number = '" + appNo + "'", success_callback,failure_callback);
};

saveCandidateDetails.SelectWithFilterCondition = function(filter,success_callback,failure_callback, rows){
	dbHelper.Select(SaveCandidateTableName, rows,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};


saveCandidateDetails.getColumns = function(){
	return [
			{"name" : "Aadhar_Number",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CONDITIONAL_OPERATOR",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Candidate_Name",								"datatype" : "VARCHAR",	   					"objdefault" :''},
			{"name" : "Candidate_Type",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Department",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Mobile_Number",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PAN_Number",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "SU_Code",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "State",										"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "State_of_Posting",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "issync",										"datatype" : "VARCHAR",						"objdefault" : '0'},
			{"name" : "iscompleted",								"datatype" : "VARCHAR",						"objdefault" : '0'},
		];
}; 

window.saveCandidateDetails = saveCandidateDetails;