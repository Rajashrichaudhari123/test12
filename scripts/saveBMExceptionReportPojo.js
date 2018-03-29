/**
 * saveBMExceptionReportPojo.js
 * @author CloudPact Technologies
 * @description : This script is used for storing runner activity data into local db.
 **/
var saveBMExceptionReportTableName = "saveBMReport";
// Constructor
function saveBMReport(obj){
	var columns = [];
	var tablename = saveBMExceptionReportTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = saveBMReport.getColumns();
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
saveBMReport.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(saveBMExceptionReportTableName,this).execute(success_callback,failure_callback);
};

saveBMReport.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + this.Application_Number + "'");
	saveNewLead.dbHelper.Delete(saveBMExceptionReportTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

saveBMReport.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(saveBMExceptionReportTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
saveBMReport.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(saveBMExceptionReportTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

saveBMReport.alterTable = function(columns, success_callback,failure_callback){
	dbHelper.AlterTable(saveBMExceptionReportTableName, columns).execute(success_callback,failure_callback);
};

saveBMReport.multipleInsert = function(entity, success_callback,failure_callback,inc_cb){
	dbHelper.MultiInsert(saveBMExceptionReportTableName, getKeyColums(this.getColumns()), entity, success_callback, inc_cb);
};

saveBMReport.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(saveBMExceptionReportTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

saveBMReport.Select = function(success_callback,failure_callback){
	dbHelper.Select(saveBMExceptionReportTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

saveBMReport.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Policy_Number", "'" + a + "'");
	dbHelper.Select(saveBMExceptionReportTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

saveBMReport.SelectWithFilterAppNo = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Select(saveBMExceptionReportTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

saveBMReport.SelectedDraftedApp = function(filter,success_callback,failure_callback){
	dbHelper.Select(saveBMExceptionReportTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};

saveBMReport.selectDataToSync = function(appno,readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'"),
			new window.DB.Filter.equal("Policy_Number", "'" + appno + "'")
	]);
	dbHelper.Select(saveBMExceptionReportTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new saveNewLead(response.rows[i]));
		}
		readSuccess(response.rows);
	},readFailure);
};

saveBMReport.selectUnsyncedData = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(saveBMExceptionReportTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new saveNewLead(response.rows[i]));
		}
		readSuccess(response.rows);
	},readFailure);
};

saveBMReport.countProposalsToSync = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(saveBMExceptionReportTableName,['count(*) as count'],false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		readSuccess(response);
	},readFailure);
};

saveBMReport.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(BmExceptionReportTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

saveBMReport.updateSync_NEW = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(saveBMExceptionReportTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

saveBMReport.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(saveBMExceptionReportTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

saveBMReport.updateDocsUploaded = function(appNo,success_callback,failure_callback) {
	/*dbHelper.Update(PDC_Customer_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);*/
	dbHelper.db.executeSql("update saveBMReport set DOCS_UPLOADED = 'Y' where Application_Number = '" + appNo + "'", success_callback,failure_callback);
};

saveBMReport.SelectWithFilterCondition = function(filter,success_callback,failure_callback, rows){
	dbHelper.Select(saveBMExceptionReportTableName, rows,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};


saveBMReport.getColumns = function(){
	return [
			{"name" : "BM_EXPer_ID",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "BM_Ex_Reason_Code",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Remarks",					 			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Sapcode",								"datatype" : "VARCHAR",	   					"objdefault" :''}
		];
}; 

window.saveBMReport = saveBMReport;