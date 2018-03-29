var PendingCfrTableName = "PendingCfr";
// Constructor
function PendingCfr(obj){
	var columns = [];
	var tablename = PendingCfrTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = PendingCfr.getColumns();
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
PendingCfr.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(PendingCfrTableName,this).execute(success_callback,failure_callback);
};

PendingCfr.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("CFR_CODE", "'" + this.CFR_CODE + "'");
	PendingCfr.dbHelper.Delete(PendingCfrTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

PendingCfr.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(PendingCfrTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
PendingCfr.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(PendingCfrTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

PendingCfr.multipleInsert = function(entity, success_callback,failure_callback){
	dbHelper.MultiInsert(PendingCfrTableName, getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

PendingCfr.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(PendingCfrTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

PendingCfr.Select = function(success_callback,failure_callback){
	dbHelper.Select(PendingCfrTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PendingCfr.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.notEqual("iscompleted", "'1'");
	dbHelper.Select(PendingCfrTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PendingCfr.selectDataToSync = function(readSuccess,readFailure){
	var filter = new DB.CompositeFilter(DB.CompositeFilter.AND, [
			new DB.Filter.equal("issync", "'0'"),
			new DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(PendingCfrTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new PendingCfr(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

PendingCfr.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PendingCfrTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PendingCfr.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PendingCfrTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PendingCfr.getColumns = function(){
	return [
			{"name" : "ApplicationNumber",						"datatype" : "VARCHAR  PRIMARY KEY",		"objdefault" :''},
	//		{"name" : "CFR_CODE",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CfrCategory",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CfrCount",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CfrSource",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "ApplicantCfrDeadLine",					"datatype" : "DATETIME",					"objdefault" :''},
			{"name" : "ApplicantCfrOpenDate",					"datatype" : "VARCHAR",						"objdefault" :''},
//			{"name" : "DESCRIPTION",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "ApplicantCfrStatus",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "ClientID",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CustomerName",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "FirstPremiumAmount",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "ProductCode",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "ProductName",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "EmailID",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "MobileNumber",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "iscompleted",							"datatype" : "VARCHAR(10)",					"objdefault" : '0'},
			{"name" : "issync",									"datatype" : "VARCHAR(10)",					"objdefault" : '0'}
		];
};

window.PendingCfr = PendingCfr;