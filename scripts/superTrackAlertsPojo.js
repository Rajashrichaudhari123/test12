/**
 * superTrackAlertPojo.js
 * @author CloudPact Technologies
 * @description : This script is used for storing the super track alert details into the local db.
 **/
var StAlertNotificationsTableName = "superTrackAlerts";
// Constructor
function superTrackAlerts(obj){
	var columns = [];
	var tablename = StAlertNotificationsTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = superTrackAlerts.getColumns();
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
superTrackAlerts.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(StAlertNotificationsTableName,this).execute(success_callback,failure_callback);
};

superTrackAlerts.prototype.remove = function(success_callback,failure_callback){
//	var filter = new DB.Filter.equal("CFR_CODE", "'" + this.CFR_CODE + "'");
	dbHelper.Delete(StAlertNotificationsTableName,this).execute(success_callback,failure_callback);
};

superTrackAlerts.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(StAlertNotificationsTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
superTrackAlerts.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(StAlertNotificationsTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

superTrackAlerts.multipleInsert = function(entity, success_callback,failure_callback){
	dbHelper.MultiInsert(StAlertNotificationsTableName, getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

superTrackAlerts.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(StAlertNotificationsTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

superTrackAlerts.Select = function(success_callback,failure_callback){
	dbHelper.Select(StAlertNotificationsTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

superTrackAlerts.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.notEqual("iscompleted", "'1'");
	dbHelper.Select(StAlertNotificationsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

superTrackAlerts.selectDataToSync = function(readSuccess,readFailure){
	var filter = new DB.CompositeFilter(DB.CompositeFilter.AND, [
			new DB.Filter.equal("issync", "'0'"),
			new DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(StAlertNotificationsTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new superTrackAlerts(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

superTrackAlerts.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(StAlertNotificationsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

superTrackAlerts.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(StAlertNotificationsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

superTrackAlerts.getColumns = function(){
	return [
			{"name" : "Type",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Alert",							"datatype" : "VARCHAR PRIMARY KEY",			"objdefault" :''},
			{"name" : "PressID",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "NewsDate",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "iscompleted",					"datatype" : "VARCHAR",						"objdefault" : '0'},
			{"name" : "issync",							"datatype" : "VARCHAR",						"objdefault" : '0'}
		];
};

window.superTrackAlerts = superTrackAlerts;