/**
 * saveLPCDetailsPojo.js
 * @author CloudPact Technologies
 * @description : This script is used for storing runner activity data into local db.
 **/
var LPCDetailsTableName = "saveLPCDetails";
// Constructor
function saveLPCDetails(obj){
	var columns = [];
	var tablename = LPCDetailsTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = saveLPCDetails.getColumns();
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
saveLPCDetails.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(LPCDetailsTableName,this).execute(success_callback,failure_callback);
};

saveLPCDetails.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + this.Application_Number + "'");
	saveNewLead.dbHelper.Delete(LPCDetailsTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

saveLPCDetails.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(LPCDetailsTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
saveLPCDetails.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(LPCDetailsTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

saveLPCDetails.alterTable = function(columns, success_callback,failure_callback){
	dbHelper.AlterTable(LPCDetailsTableName, columns).execute(success_callback,failure_callback);
};

saveLPCDetails.multipleInsert = function(entity, success_callback,failure_callback,inc_cb){
	dbHelper.MultiInsert(LPCDetailsTableName, getKeyColums(this.getColumns()), entity, success_callback, inc_cb);
};

saveLPCDetails.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(LPCDetailsTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

saveLPCDetails.Select = function(success_callback,failure_callback){
	dbHelper.Select(LPCDetailsTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

saveLPCDetails.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("iscompleted", "'0'");
	dbHelper.Select(LPCDetailsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

saveLPCDetails.SelectWithFilterAppNo = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Select(LPCDetailsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

saveLPCDetails.SelectedDraftedApp = function(filter,success_callback,failure_callback){
	dbHelper.Select(LPCDetailsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};

saveLPCDetails.selectDataToSync = function(appno,readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'"),
			new window.DB.Filter.equal("Policy_Number", "'" + appno + "'")
	]);
	dbHelper.Select(LPCDetailsTableName,null,false)
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

saveLPCDetails.selectUnsyncedData = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(LPCDetailsTableName,null,false)
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

saveLPCDetails.countProposalsToSync = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(LPCDetailsTableName,['count(*) as count'],false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		readSuccess(response);
	},readFailure);
};

saveLPCDetails.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(LPCDetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

saveLPCDetails.updateSync_NEW = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(LPCDetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

saveLPCDetails.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(LPCDetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

saveLPCDetails.updateDocsUploaded = function(appNo,success_callback,failure_callback) {
	/*dbHelper.Update(PDC_Customer_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);*/
	dbHelper.db.executeSql("update saveLPCDetails set DOCS_UPLOADED = 'Y' where Application_Number = '" + appNo + "'", success_callback,failure_callback);
};

saveLPCDetails.SelectWithFilterCondition = function(filter,success_callback,failure_callback, rows){
	dbHelper.Select(LPCDetailsTableName, rows,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};


saveLPCDetails.getColumns = function(){
	return [
			{"name" : "ADDRESS",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "ADVISOR_NAME",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CONTACT_NO",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "DATE_OF_BIRTH",						"datatype" : "VARCHAR",	   					"objdefault" :''},
			{"name" : "EMAIL_ID",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "FIRST_ISSUANCE_DATE",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "FORM_PRINT_DATE",					"datatype" : "VARCHAR",						"objdefault" :''},
		    {"name" : "FREQUENCY",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "LAST_INSTA_PREMIUM_PAID_DATE",		"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "MATURITY_VALUE",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NAME",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NEXT_PREMIUM_AMOUNT",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NEXT_PREMIUM_DUE_DATE",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PAID_TO_DATE",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PIN_CODE",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PLAN_NAME",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "POLICY_NO",							"datatype" : "VARCHAR PRIMARY KEY",			"objdefault" : ''},
			{"name" : "POLICY_STATUS",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "POLICY_TERM",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PREMIUM_TYPE",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PRODUCT_CATEGORY",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "SUM_ASSURED",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "issync",								"datatype" : "VARCHAR",						"objdefault" : '0'},
			{"name" : "iscompleted",						"datatype" : "VARCHAR",						"objdefault" : '0'},
		];
}; 

window.saveLPCDetails = saveLPCDetails;