var Runner_ActivityTableName = "Runner_Activity";
// Constructor
function Runner_Activity(obj){
	var columns = [];
	var tablename = Runner_ActivityTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = Runner_Activity.getColumns();
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
Runner_Activity.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(Runner_ActivityTableName,this).execute(success_callback,failure_callback);
};

Runner_Activity.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + this.Application_Number + "'");
	Runner_Activity.dbHelper.Delete(Runner_ActivityTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

Runner_Activity.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(Runner_ActivityTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
Runner_Activity.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(Runner_ActivityTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

Runner_Activity.alterTable = function(columns, success_callback,failure_callback){
	dbHelper.AlterTable(Runner_ActivityTableName, columns).execute(success_callback,failure_callback);
};

Runner_Activity.removeAll = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Delete(Runner_ActivityTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

Runner_Activity.multipleInsert = function(entity, success_callback,failure_callback,inc_cb){
	dbHelper.MultiInsert(Runner_ActivityTableName, getKeyColums(this.getColumns()), entity, success_callback, inc_cb);
};

Runner_Activity.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(Runner_ActivityTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

Runner_Activity.Select = function(success_callback,failure_callback){
	dbHelper.Select(Runner_ActivityTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

Runner_Activity.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Select(Runner_ActivityTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

Runner_Activity.SelectWithFilterAppNo = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Select(Runner_ActivityTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

Runner_Activity.SelectedDraftedApp = function(filter,success_callback,failure_callback){
	dbHelper.Select(Runner_ActivityTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};

Runner_Activity.selectDataToSync = function(appno,readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'"),
			new window.DB.Filter.equal("Application_Number", "'" + appno + "'")
	]);
	dbHelper.Select(Runner_ActivityTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new Runner_Activity(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

Runner_Activity.selectUnsyncedData = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(Runner_ActivityTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new Runner_Activity(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

Runner_Activity.updateSync_NEW = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(Runner_ActivityTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

Runner_Activity.countProposalsToSync = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(Runner_ActivityTableName,['count(*) as count'],false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		readSuccess(response);
	},readFailure);
};

Runner_Activity.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(Runner_ActivityTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

Runner_Activity.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(Runner_ActivityTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

Runner_Activity.updateDocsUploaded = function(appNo,success_callback,failure_callback) {
	/*dbHelper.Update(PDC_Customer_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);*/
	dbHelper.db.executeSql("update Runner_Activity set DOCS_UPLOADED = 'Y' where Application_Number = '" + appNo + "'", success_callback,failure_callback);
};

Runner_Activity.SelectWithFilterCondition = function(filter,success_callback,failure_callback, rows){
	dbHelper.Select(Runner_ActivityTableName, rows,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};


Runner_Activity.getColumns = function(){
	return [
			{"name" : "ClientId",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "DateOfBirth",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "ClientName",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "PolicyNo",								"datatype" : "VARCHAR PRIMARY KEY",			"objdefault" :''},
			{"name" : "PolicyStatus",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "RenewalAmount",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "RenewalDate",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "iscompleted",							"datatype" : "VARCHAR(10)",					"objdefault" : '0'},
			{"name" : "issync",									"datatype" : "VARCHAR(10)",					"objdefault" : '0'}
		];
}; 

window.Runner_Activity = Runner_Activity;