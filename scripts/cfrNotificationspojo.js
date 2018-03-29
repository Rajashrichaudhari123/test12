/**
 * cfrNotification.js
 * @author CloudPact Technologies
 * @description : This script is for storing cfr data in local database.
 **/
var CfrNotificationsTableName = "cfrNotifications";
// Constructor
function cfrNotifications(obj){
	var columns = [];
	var tablename = CfrNotificationsTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = cfrNotifications.getColumns();
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
cfrNotifications.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(CfrNotificationsTableName,this).execute(success_callback,failure_callback);
};

cfrNotifications.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("CFR_CODE", "'" + this.CFR_CODE + "'");
	cfrNotifications.dbHelper.Delete(CfrNotificationsTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

cfrNotifications.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(CfrNotificationsTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
cfrNotifications.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(CfrNotificationsTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

cfrNotifications.multipleInsert = function(entity, success_callback,failure_callback){
	dbHelper.MultiInsert(CfrNotificationsTableName, getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

cfrNotifications.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(CfrNotificationsTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

cfrNotifications.Select = function(success_callback,failure_callback){
	dbHelper.Select(CfrNotificationsTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

cfrNotifications.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.notEqual("iscompleted", "'1'");
	dbHelper.Select(CfrNotificationsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

cfrNotifications.selectDataToSync = function(readSuccess,readFailure){
	var filter = new DB.CompositeFilter(DB.CompositeFilter.AND, [
			new DB.Filter.equal("issync", "'0'"),
			new DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(CfrNotificationsTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new cfrNotifications(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

cfrNotifications.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(CfrNotificationsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

cfrNotifications.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(CfrNotificationsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

cfrNotifications.getColumns = function(){
	return [
			{"name" : "ClientID",								"datatype" : "VARCHAR  PRIMARY KEY",		"objdefault" :''},
			{"name" : "ClientName",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "DeadLine",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "EmailAddress",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "MobileNumber",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "PremiumDueDate",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "PremiumPayable",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "ProductName",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "iscompleted",							"datatype" : "VARCHAR(10)",					"objdefault" : '0'},
			{"name" : "issync",									"datatype" : "VARCHAR(10)",					"objdefault" : '0'}
		];
};

window.cfrNotifications = cfrNotifications;