var MedicalCfrTableName = "MedicalCfr";
// Constructor
function MedicalCfr(obj){
	var columns = [];
	var tablename = MedicalCfrTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = MedicalCfr.getColumns();
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
MedicalCfr.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(MedicalCfrTableName,this).execute(success_callback,failure_callback);
};

MedicalCfr.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("CFR_CODE", "'" + this.CFR_CODE + "'");
	PendingCfr.dbHelper.Delete(MedicalCfrTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

MedicalCfr.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(MedicalCfrTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
MedicalCfr.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(MedicalCfrTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

MedicalCfr.multipleInsert = function(entity, success_callback,failure_callback){
	dbHelper.MultiInsert(MedicalCfrTableName, getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
	//	$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

MedicalCfr.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(MedicalCfrTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

MedicalCfr.Select = function(success_callback,failure_callback){
	dbHelper.Select(MedicalCfrTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

MedicalCfr.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.notEqual("iscompleted", "'1'");
	dbHelper.Select(MedicalCfrTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

MedicalCfr.SelectWithFilterAppNo = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("ApplicationNumber", "'" + a + "'");
	dbHelper.Select(MedicalCfrTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

MedicalCfr.selectDataToSync = function(readSuccess,readFailure){
	var filter = new DB.CompositeFilter(DB.CompositeFilter.AND, [
			new DB.Filter.equal("issync", "'0'"),
			new DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(MedicalCfrTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new MedicalCfr(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

MedicalCfr.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(MedicalCfrTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

MedicalCfr.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(MedicalCfrTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

MedicalCfr.getColumns = function(){
	return [
			{"name" : "TpaAddress",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "TpaName",								"datatype" : "VARCHAR PRIMARY KEY",			"objdefault" :''},
			{"name" : "TpaPhone1",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "TpaPhone2",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "iscompleted",							"datatype" : "VARCHAR(10)",					"objdefault" : '0'},
			{"name" : "issync",									"datatype" : "VARCHAR(10)",					"objdefault" : '0'}
		];
};

window.MedicalCfr = MedicalCfr;