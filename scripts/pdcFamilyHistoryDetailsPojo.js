/**
 * pdcFamilyHistory.js
 * @author CloudPact Technologies
 * @description : This script is used for storing family data into local db.
 **/
var PDC_FAMILYHISTORY_DetailsTableName = "PDC_FAMILYHISTORY_Details";
// Constructor
function PDC_FAMILYHISTORY_Details(obj){
	var columns = [];
	var tablename = PDC_FAMILYHISTORY_DetailsTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = PDC_FAMILYHISTORY_Details.getColumns();
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
PDC_FAMILYHISTORY_Details.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(PDC_FAMILYHISTORY_DetailsTableName,this).execute(success_callback,failure_callback);
};

PDC_FAMILYHISTORY_Details.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + this.Application_Number + "'");
	dbHelper.Delete(PDC_FAMILYHISTORY_DetailsTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

PDC_FAMILYHISTORY_Details.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(PDC_FAMILYHISTORY_DetailsTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
PDC_FAMILYHISTORY_Details.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(PDC_FAMILYHISTORY_DetailsTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

PDC_FAMILYHISTORY_Details.multipleInsert = function(entity, success_callback,failure_callback,inc_cb){
	dbHelper.MultiInsert(PDC_FAMILYHISTORY_DetailsTableName, getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
	//	$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

PDC_FAMILYHISTORY_Details.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(PDC_FAMILYHISTORY_DetailsTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
	//	$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

PDC_FAMILYHISTORY_Details.removeAll = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Delete(PDC_FAMILYHISTORY_DetailsTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

PDC_FAMILYHISTORY_Details.Select = function(success_callback,failure_callback){
	dbHelper.Select(PDC_FAMILYHISTORY_DetailsTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PDC_FAMILYHISTORY_Details.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Select(PDC_FAMILYHISTORY_DetailsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PDC_FAMILYHISTORY_Details.selectDataToSync = function(appno, readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'"),
			new window.DB.Filter.equal("Application_Number", "'" + appno + "'")
	]);
	dbHelper.Select(PDC_FAMILYHISTORY_DetailsTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new PDC_FAMILYHISTORY_Details(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

PDC_FAMILYHISTORY_Details.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PDC_FAMILYHISTORY_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PDC_FAMILYHISTORY_Details.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PDC_FAMILYHISTORY_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PDC_FAMILYHISTORY_Details.SelectWithFilterCondition = function(filter,success_callback,failure_callback,rows){
	dbHelper.Select(PDC_FAMILYHISTORY_DetailsTableName, rows,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PDC_FAMILYHISTORY_Details.getColumns = function(){
	return [
			{"name" : "Txn_Id",						"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "Application_Number",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "FHID_LA_PRPOSER",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "FHID_FAMILEMEMBER",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "FHID_CAUSEOFDEATH",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "FHID_CURRENTAGEIFALIVE",		"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "FHID_DEATHAGEIFDECEASED",	"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "FH_AGEATDIAGNOSIS",			"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "IS_FAMILYMEMBERALIVE",		"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "iscompleted",				"datatype" : "VARCHAR(10)",					"objdefault" : '0'},
			{"name" : "issync",						"datatype" : "VARCHAR(10)",					"objdefault" : '0'},
			{"name" : "Row_No",						"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "Extended_Attributes",		"datatype" : "VARCHAR",						"objdefault" : ''}
		];
}; 

window.PDC_FAMILYHISTORY_Details = PDC_FAMILYHISTORY_Details;