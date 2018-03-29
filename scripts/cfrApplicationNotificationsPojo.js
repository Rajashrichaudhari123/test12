/**
 * cfrApplicationNotifications.js
 * @author CloudPact Technologies
 * @description : This script is for storing cfrApplicationNotifications data in local database.
 **/

var CfrApplicationNotificationsTableName = "cfrApplicationNotifications";
// Constructor
function cfrApplicationNotifications(obj){
	var columns = [];
	var tablename = CfrApplicationNotificationsTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = cfrApplicationNotifications.getColumns();
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
cfrApplicationNotifications.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(CfrApplicationNotificationsTableName,this).execute(success_callback,failure_callback);
};

cfrApplicationNotifications.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("CFR_CODE", "'" + this.CFR_CODE + "'");
	cfrApplicationNotifications.dbHelper.Delete(CfrApplicationNotificationsTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

cfrApplicationNotifications.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(CfrApplicationNotificationsTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
cfrApplicationNotifications.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(CfrApplicationNotificationsTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

cfrApplicationNotifications.multipleInsert = function(entity, success_callback,failure_callback){
	dbHelper.MultiInsert(CfrApplicationNotificationsTableName, getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
	//	$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

cfrApplicationNotifications.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(CfrApplicationNotificationsTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
	//	$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

cfrApplicationNotifications.Select = function(success_callback,failure_callback){
	dbHelper.Select(CfrApplicationNotificationsTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

cfrApplicationNotifications.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.notEqual("iscompleted", "'1'");
	dbHelper.Select(CfrApplicationNotificationsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

cfrApplicationNotifications.selectDataToSync = function(readSuccess,readFailure){
	var filter = new DB.CompositeFilter(DB.CompositeFilter.AND, [
			new DB.Filter.equal("issync", "'0'"),
			new DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(CfrApplicationNotificationsTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new cfrApplicationNotifications(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

cfrApplicationNotifications.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(CfrApplicationNotificationsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

cfrApplicationNotifications.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(CfrApplicationNotificationsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

cfrApplicationNotifications.getColumns = function(){
	return [
			{"name" : "ApplicationNumber",						"datatype" : "VARCHAR PRIMARY KEY",			"objdefault" :''},
			{"name" : "ClientID",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "ClientName",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "LoginDate",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Premium",								"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "ProductCode",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "ProductName",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "iscompleted",							"datatype" : "VARCHAR(10)",					"objdefault" : '0'},
			{"name" : "issync",									"datatype" : "VARCHAR(10)",					"objdefault" : '0'}
		];
};

window.cfrApplicationNotifications = cfrApplicationNotifications;