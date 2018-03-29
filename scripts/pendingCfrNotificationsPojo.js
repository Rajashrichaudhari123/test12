var PendingCfrNotificationsTableName = "PendingCfrNotifications";
// Constructor
function PendingCfrNotifications(obj){
	var columns = [];
	var tablename = PendingCfrNotificationsTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = PendingCfrNotifications.getColumns();
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
PendingCfrNotifications.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(PendingCfrNotificationsTableName,this).execute(success_callback,failure_callback);
};

PendingCfrNotifications.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("CFR_CODE", "'" + this.CFR_CODE + "'");
	PendingCfrNotifications.dbHelper.Delete(PendingCfrNotificationsTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

PendingCfrNotifications.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(PendingCfrNotificationsTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
PendingCfrNotifications.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(PendingCfrNotificationsTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

PendingCfrNotifications.multipleInsert = function(entity, success_callback,failure_callback){
	dbHelper.MultiInsert(PendingCfrNotificationsTableName, getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

PendingCfrNotifications.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(PendingCfrNotificationsTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

PendingCfrNotifications.Select = function(success_callback,failure_callback){
	dbHelper.Select(PendingCfrNotificationsTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PendingCfrNotifications.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.notEqual("iscompleted", "'1'");
	dbHelper.Select(PendingCfrNotificationsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PendingCfrNotifications.SelectWithFilterAppNo = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("ApplicationNumber", "'" + a + "'");
	dbHelper.Select(PendingCfrNotificationsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PendingCfrNotifications.selectDataToSync = function(readSuccess,readFailure){
	var filter = new DB.CompositeFilter(DB.CompositeFilter.AND, [
			new DB.Filter.equal("issync", "'0'"),
			new DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(PendingCfrNotificationsTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new PendingCfrNotifications(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

PendingCfrNotifications.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PendingCfrNotificationsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PendingCfrNotifications.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PendingCfrNotificationsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PendingCfrNotifications.getColumns = function(){
	return [
			{"name" : "ApplicationNumber",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "BopAmount",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CfrCode",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CfrCommentCode",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CfrComments",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CfrDescription",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CfrDocumentCategory",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "DeadLine",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "OpenDate",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "UniqueID",								"datatype" : "VARCHAR PRIMARY KEY",			"objdefault" :''},
			{"name" : "Source",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Status",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "iscompleted",							"datatype" : "VARCHAR(10)",					"objdefault" : '0'},
			{"name" : "issync",									"datatype" : "VARCHAR(10)",					"objdefault" : '0'}
		];
};

window.PendingCfrNotifications = PendingCfrNotifications;