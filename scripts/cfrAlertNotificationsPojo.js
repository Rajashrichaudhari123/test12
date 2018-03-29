var CfrAlertNotificationsTableName = "cfrAlertNotifications";
// Constructor
function cfrAlertNotifications(obj){
	var columns = [];
	var tablename = CfrAlertNotificationsTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = cfrAlertNotifications.getColumns();
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
cfrAlertNotifications.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(CfrAlertNotificationsTableName,this).execute(success_callback,failure_callback);
};

cfrAlertNotifications.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("CFR_CODE", "'" + this.CFR_CODE + "'");
	cfrAlertNotifications.dbHelper.Delete(CfrAlertNotificationsTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

cfrAlertNotifications.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(CfrAlertNotificationsTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
cfrAlertNotifications.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(CfrAlertNotificationsTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

cfrAlertNotifications.multipleInsert = function(entity, success_callback,failure_callback){
	dbHelper.MultiInsert(CfrAlertNotificationsTableName, getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
	//	$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

cfrAlertNotifications.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(CfrAlertNotificationsTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
	//	$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

cfrAlertNotifications.Select = function(success_callback,failure_callback){
	dbHelper.Select(CfrAlertNotificationsTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

cfrAlertNotifications.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.notEqual("iscompleted", "'1'");
	dbHelper.Select(CfrAlertNotificationsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

cfrAlertNotifications.selectDataToSync = function(readSuccess,readFailure){
	var filter = new DB.CompositeFilter(DB.CompositeFilter.AND, [
			new DB.Filter.equal("issync", "'0'"),
			new DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(CfrAlertNotificationsTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new cfrAlertNotifications(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

cfrAlertNotifications.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(CfrAlertNotificationsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

cfrAlertNotifications.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(CfrAlertNotificationsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

cfrAlertNotifications.getColumns = function(){
	return [
			{"name" : "Type",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Title",							"datatype" : "VARCHAR PRIMARY KEY",			"objdefault" :''},
			{"name" : "TextPreview",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "PressID",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "NewsDate",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "DownloadUrl",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "iscompleted",					"datatype" : "VARCHAR(10)",					"objdefault" : '0'},
			{"name" : "issync",							"datatype" : "VARCHAR(10)",					"objdefault" : '0'}
		];
};

window.cfrAlertNotifications = cfrAlertNotifications;