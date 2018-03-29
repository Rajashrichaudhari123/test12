/**
 * existingAdvisorPojo.js
 * @author CloudPact Technologies
 * @description : This script is for storing existingAdvisor data in local database.
 **/

var existingAdvisorTableName = "existingAdvisor";
// Constructor
function existingAdvisor(obj){
	var columns = [];
	var tablename = existingAdvisorTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = existingAdvisor.getColumns();
	}
	for(var i=0; i<columns.length; i++){
		if(columns[i].name == "issync" || columns[i].name == "iscompleted" ){
			this[columns[i].name] = obj[columns[i].name] ? obj[columns[i].name] : '0';
		}else{
			this[columns[i].name] = obj[columns[i].name] ? obj[columns[i].name] : '';
		}
	}
}

// Prototype methods
existingAdvisor.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(existingAdvisorTableName,this).execute(success_callback,failure_callback);
};

existingAdvisor.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("CFR_CODE", "'" + this.CFR_CODE + "'");
	cfrApplicationNotifications.dbHelper.Delete(existingAdvisorTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

existingAdvisor.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(existingAdvisorTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
existingAdvisor.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(existingAdvisorTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

existingAdvisor.multipleInsert = function(entity, success_callback,failure_callback){
	dbHelper.MultiInsert(existingAdvisorTableName, getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

existingAdvisor.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(existingAdvisorTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
	//	$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

existingAdvisor.Select = function(success_callback,failure_callback){
	dbHelper.Select(existingAdvisorTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

existingAdvisor.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.notEqual("iscomplete", "'1'");
	dbHelper.Select(existingAdvisorTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

existingAdvisor.selectDataToSync = function(readSuccess,readFailure){
	var filter = new DB.CompositeFilter(DB.CompositeFilter.AND, [
			new DB.Filter.equal("issync", "'0'"),
			new DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(existingAdvisorTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new newBusiness(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

existingAdvisor.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(existingAdvisorTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

existingAdvisor.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(existingAdvisorTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

existingAdvisor.getColumns = function(){
	return [
			{"name" : "Count",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Activity_Id",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Added_Date",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Campaign",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Flag",								"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "LeadTypeFlag",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Lead_Id",							"datatype" : "VARCHAR PRIMARY KEY",			"objdefault" :''},
			{"name" : "Lead_Sub_Source",					"datatype" : "VARCHAR",				   		"objdefault" : ''},
			{"name" : "Lead_Type",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Mobile",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Meeting_Status",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Name",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Sub_Activity",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Sub_Activity_Options",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Lead_Category",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "DOB",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "City",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Gender",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Income",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Marital_Status",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "issync",								"datatype" : "VARCHAR",						"objdefault" : '0'},
			{"name" : "iscomplete",							"datatype" : "VARCHAR",						"objdefault" : '0'},
		];
};

window.existingAdvisor = existingAdvisor;