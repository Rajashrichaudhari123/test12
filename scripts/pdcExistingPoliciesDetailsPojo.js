/**
 * pdcExistingPojo.js
 * @author CloudPact Technologies
 * @description : This script is used for storing policy data into local db.
 **/
var PDC_EXISITINGPOLICIES_DetailsTableName = "PDC_EXISITINGPOLICIES_Details";
// Constructor
function PDC_EXISITINGPOLICIES_Details(obj){
	var columns = [];
	var tablename = PDC_EXISITINGPOLICIES_DetailsTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = PDC_EXISITINGPOLICIES_Details.getColumns();
	}
	for(var i=0; i<columns.length; i++){
		if(typeof obj[columns[i].name] === "string"){
			obj[columns[i].name] = obj[columns[i].name].replace(/,/g , "")
		}
		if(columns[i].name == "issync" || columns[i].name == "iscompleted" ){
			this[columns[i].name] = obj[columns[i].name] ? obj[columns[i].name] : '0';
		}else{
			this[columns[i].name] = obj[columns[i].name] ? obj[columns[i].name] : '';
		}
	}
}

// Prototype methods
PDC_EXISITINGPOLICIES_Details.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(PDC_EXISITINGPOLICIES_DetailsTableName,this).execute(success_callback,failure_callback);
};

PDC_EXISITINGPOLICIES_Details.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + this.Application_Number + "'");
	PDC_EXISITINGPOLICIES_Details.dbHelper.Delete(PDC_EXISITINGPOLICIES_DetailsTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

PDC_EXISITINGPOLICIES_Details.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(PDC_EXISITINGPOLICIES_DetailsTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
PDC_EXISITINGPOLICIES_Details.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(PDC_EXISITINGPOLICIES_DetailsTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

PDC_EXISITINGPOLICIES_Details.multipleInsert = function(entity, success_callback,failure_callback,inc_cb){
	dbHelper.MultiInsert(PDC_EXISITINGPOLICIES_DetailsTableName, getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

PDC_EXISITINGPOLICIES_Details.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(PDC_EXISITINGPOLICIES_DetailsTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

PDC_EXISITINGPOLICIES_Details.removeAll = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Delete(PDC_EXISITINGPOLICIES_DetailsTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

PDC_EXISITINGPOLICIES_Details.Select = function(success_callback,failure_callback){
	dbHelper.Select(PDC_EXISITINGPOLICIES_DetailsTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PDC_EXISITINGPOLICIES_Details.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Select(PDC_EXISITINGPOLICIES_DetailsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PDC_EXISITINGPOLICIES_Details.selectDataToSync = function(appno,readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'"),
			new window.DB.Filter.equal("Application_Number", "'" + appno + "'")
	]);
	dbHelper.Select(PDC_EXISITINGPOLICIES_DetailsTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new PDC_EXISITINGPOLICIES_Details(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

PDC_EXISITINGPOLICIES_Details.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PDC_EXISITINGPOLICIES_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PDC_EXISITINGPOLICIES_Details.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PDC_EXISITINGPOLICIES_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PDC_EXISITINGPOLICIES_Details.SelectWithFilterCondition = function(filter,success_callback,failure_callback,rows){
	dbHelper.Select(PDC_EXISITINGPOLICIES_DetailsTableName, rows,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};


PDC_EXISITINGPOLICIES_Details.getColumns = function(){
	return [
			{"name" : "Txn_Id",						"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "Application_Number",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "DETAILS_LA_PROPOSER",		"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "COMPANYNAME",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CONTRACT_PROPOSALNO",		"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "BASIC_SUM_ASSURED",			"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "SUM_ASSURED_URIDER",			"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "RISK_COMMENCE_DATE",			"datatype" : "DATETIME",					"objdefault" :''},
			{"name" : "Present_Status",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Row_No",						"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "iscompleted",				"datatype" : "VARCHAR(10)",					"objdefault" : '0'},
			{"name" : "issync",						"datatype" : "VARCHAR(10)",					"objdefault" : '0'},
			{"name" : "Extended_Attributes",		"datatype" : "VARCHAR",						"objdefault" : ''}
			
		];
};

window.PDC_EXISITINGPOLICIES_Details = PDC_EXISITINGPOLICIES_Details;