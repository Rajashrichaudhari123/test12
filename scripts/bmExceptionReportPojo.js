/**
 * bmExceptionReportPojo.js
 * @author CloudPact Technologies
 * @description : This script is used for storing runner activity data into local db.
 **/
var BmExceptionReportTableName = "bmExceptionReport";
// Constructor
function bmExceptionReport(obj){
	var columns = [];
	var tablename = BmExceptionReportTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = bmExceptionReport.getColumns();
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
bmExceptionReport.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(BmExceptionReportTableName,this).execute(success_callback,failure_callback);
};

bmExceptionReport.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + this.Application_Number + "'");
	saveNewLead.dbHelper.Delete(BmExceptionReportTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

bmExceptionReport.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(BmExceptionReportTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
bmExceptionReport.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(BmExceptionReportTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

bmExceptionReport.alterTable = function(columns, success_callback,failure_callback){
	dbHelper.AlterTable(BmExceptionReportTableName, columns).execute(success_callback,failure_callback);
};

bmExceptionReport.multipleInsert = function(entity, success_callback,failure_callback,inc_cb){
	dbHelper.MultiInsert(BmExceptionReportTableName, getKeyColums(this.getColumns()), entity, success_callback, inc_cb);
};

bmExceptionReport.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(BmExceptionReportTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

bmExceptionReport.Select = function(success_callback,failure_callback){
	dbHelper.Select(BmExceptionReportTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

bmExceptionReport.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("iscompleted", "'0'");
	dbHelper.Select(BmExceptionReportTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

bmExceptionReport.SelectWithFilterAppNo = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Select(BmExceptionReportTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

bmExceptionReport.SelectedDraftedApp = function(filter,success_callback,failure_callback){
	dbHelper.Select(BmExceptionReportTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};

bmExceptionReport.selectDataToSync = function(appno,readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'"),
			new window.DB.Filter.equal("Policy_Number", "'" + appno + "'")
	]);
	dbHelper.Select(BmExceptionReportTableName,null,false)
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

bmExceptionReport.selectUnsyncedData = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(BmExceptionReportTableName,null,false)
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

bmExceptionReport.countProposalsToSync = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(BmExceptionReportTableName,['count(*) as count'],false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		readSuccess(response);
	},readFailure);
};

bmExceptionReport.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(BmExceptionReportTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

bmExceptionReport.updateSync_NEW = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(BmExceptionReportTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

bmExceptionReport.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(BmExceptionReportTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

bmExceptionReport.updateDocsUploaded = function(appNo,success_callback,failure_callback) {
	/*dbHelper.Update(PDC_Customer_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);*/
	dbHelper.db.executeSql("update bmExceptionReport set DOCS_UPLOADED = 'Y' where Application_Number = '" + appNo + "'", success_callback,failure_callback);
};

bmExceptionReport.SelectWithFilterCondition = function(filter,success_callback,failure_callback, rows){
	dbHelper.Select(BmExceptionReportTableName, rows,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};


bmExceptionReport.getColumns = function(){
	return [
			{"name" : "Attribute",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "w1AchvCnt",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "w1Attribute_ID",						"datatype" : "VARCHAR PRIMARY KEY",			"objdefault" :''},
			{"name" : "w1Overall_Achievment_Met",			"datatype" : "VARCHAR",	   					"objdefault" :''},
			{"name" : "w1ReasonCode",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "w1Remarks",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "w1UID",								"datatype" : "VARCHAR",						"objdefault" :''},
		    {"name" : "w2AchvCnt",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "w3AchvCnt",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "w4AchvCnt",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "issync",								"datatype" : "VARCHAR",						"objdefault" : '0'},
			{"name" : "iscompleted",						"datatype" : "VARCHAR",						"objdefault" : '0'},
		];
}; 

window.bmExceptionReport = bmExceptionReport;