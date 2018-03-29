var PendingApplicationNotificationsTableName = "PendingApplicationNotifications";
// Constructor
function PendingApplicationNotifications(obj){
	var columns = [];
	var tablename = PendingApplicationNotificationsTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = PendingApplicationNotifications.getColumns();
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
PendingApplicationNotifications.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(PendingApplicationNotificationsTableName,this).execute(success_callback,failure_callback);
};

PendingApplicationNotifications.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("CFR_CODE", "'" + this.CFR_CODE + "'");
	PendingApplicationNotifications.dbHelper.Delete(PendingApplicationNotificationsTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

PendingApplicationNotifications.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(PendingApplicationNotificationsTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
PendingApplicationNotifications.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(PendingApplicationNotificationsTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

PendingApplicationNotifications.multipleInsert = function(entity, success_callback,failure_callback){
	dbHelper.MultiInsert(PendingApplicationNotificationsTableName, getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

PendingApplicationNotifications.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(PendingApplicationNotificationsTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

PendingApplicationNotifications.Select = function(success_callback,failure_callback){
	dbHelper.Select(PendingApplicationNotificationsTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PendingApplicationNotifications.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.notEqual("iscompleted", "'1'");
	dbHelper.Select(PendingApplicationNotificationsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PendingApplicationNotifications.selectDataToSync = function(readSuccess,readFailure){
	var filter = new DB.CompositeFilter(DB.CompositeFilter.AND, [
			new DB.Filter.equal("issync", "'0'"),
			new DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(PendingApplicationNotificationsTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new PendingApplicationNotifications(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

PendingApplicationNotifications.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PendingApplicationNotificationsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PendingApplicationNotifications.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PendingApplicationNotificationsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PendingApplicationNotifications.getColumns = function(){
	return [
			{"name" : "ApplicantCfrDeadLine",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "ApplicantCfrOpenDate",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "ApplicantCfrStatus",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "ApplicationNumber",							"datatype" : "VARCHAR PRIMARY KEY",			"objdefault" :''},
			{"name" : "CfrCategory",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CfrCount",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CfrSource",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "ClientID",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CustomerName",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "EmailID",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "FirstPremiumAmount",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "MobileNumber",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "ProductCode",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "ProductName",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "iscompleted",								"datatype" : "VARCHAR(10)",					"objdefault" : '0'},
			{"name" : "issync",										"datatype" : "VARCHAR(10)",					"objdefault" : '0'}
		];
};

window.PendingApplicationNotifications = PendingApplicationNotifications;