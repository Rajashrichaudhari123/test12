var PendingCfrDetailTableName = "PendingCfrDetail";
// Constructor
function PendingCfrDetail(obj){
	var columns = [];
	var tablename = PendingCfrDetailTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = PendingCfrDetail.getColumns();
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
PendingCfrDetail.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(PendingCfrDetailTableName,this).execute(success_callback,failure_callback);
};

PendingCfrDetail.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("CFR_CODE", "'" + this.CFR_CODE + "'");
	PendingCfr.dbHelper.Delete(PendingCfrDetailTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

PendingCfrDetail.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(PendingCfrDetailTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
PendingCfrDetail.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(PendingCfrDetailTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

PendingCfrDetail.multipleInsert = function(entity, success_callback,failure_callback){
	dbHelper.MultiInsert(PendingCfrDetailTableName, getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

PendingCfrDetail.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(PendingCfrDetailTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

PendingCfrDetail.Select = function(success_callback,failure_callback){
	dbHelper.Select(PendingCfrDetailTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PendingCfrDetail.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.notEqual("iscompleted", "'1'");
	dbHelper.Select(PendingCfrDetailTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PendingCfrDetail.SelectWithFilterAppNo = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("ApplicationNumber", "'" + a + "'");
	dbHelper.Select(PendingCfrDetailTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PendingCfrDetail.selectDataToSync = function(readSuccess,readFailure){
	var filter = new DB.CompositeFilter(DB.CompositeFilter.AND, [
			new DB.Filter.equal("issync", "'0'"),
			new DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(PendingCfrDetailTableName,null,false)
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

PendingCfrDetail.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PendingCfrDetailTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PendingCfrDetail.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PendingCfrDetailTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PendingCfrDetail.getColumns = function(){
	return [
			{"name" : "ApplicationNumber",						"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "BopAmount",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CfrCode",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "DeadLine",								"datatype" : "DATETIME",					"objdefault" :''},
			{"name" : "OpenDate",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CfrDocumentCategory",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CfrDescription",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CfrComments",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CfrCommentCode",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Status",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "UniqueID",								"datatype" : "VARCHAR PRIMARY KEY",			"objdefault" :''},
			{"name" : "iscompleted",							"datatype" : "VARCHAR(10)",					"objdefault" : '0'},
			{"name" : "issync",									"datatype" : "VARCHAR(10)",					"objdefault" : '0'}
		];
};

window.PendingCfrDetail = PendingCfrDetail;