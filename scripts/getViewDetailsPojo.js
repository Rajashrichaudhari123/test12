/**
 * getViewDetailsPojo.js
 * @author CloudPact Technologies
 * @description : This script is used for storing runner activity data into local db.
 **/
var ViewDetailsTableName = "saveViewDetails";
// Constructor
function saveViewDetails(obj){
	var columns = [];
	var tablename = ViewDetailsTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = saveViewDetails.getColumns();
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
saveViewDetails.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(ViewDetailsTableName,this).execute(success_callback,failure_callback);
};

saveViewDetails.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + this.Application_Number + "'");
	saveNewLead.dbHelper.Delete(ViewDetailsTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

saveViewDetails.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(ViewDetailsTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
saveViewDetails.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(ViewDetailsTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

saveViewDetails.alterTable = function(columns, success_callback,failure_callback){
	dbHelper.AlterTable(ViewDetailsTableName, columns).execute(success_callback,failure_callback);
};

saveViewDetails.multipleInsert = function(entity, success_callback,failure_callback,inc_cb){
	dbHelper.MultiInsert(ViewDetailsTableName, getKeyColums(this.getColumns()), entity, success_callback, inc_cb);
};

saveViewDetails.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(ViewDetailsTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

saveViewDetails.Select = function(success_callback,failure_callback){
	dbHelper.Select(ViewDetailsTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

saveViewDetails.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("iscompleted", "'0'");
	dbHelper.Select(ViewDetailsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

saveViewDetails.SelectWithFilterAppNo = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Select(ViewDetailsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

saveViewDetails.SelectedDraftedApp = function(filter,success_callback,failure_callback){
	dbHelper.Select(ViewDetailsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};

saveViewDetails.selectDataToSync = function(appno,readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'"),
			new window.DB.Filter.equal("Policy_Number", "'" + appno + "'")
	]);
	dbHelper.Select(ViewDetailsTableName,null,false)
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

saveViewDetails.selectUnsyncedData = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(ViewDetailsTableName,null,false)
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

saveViewDetails.countProposalsToSync = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(ViewDetailsTableName,['count(*) as count'],false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		readSuccess(response);
	},readFailure);
};

saveViewDetails.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(ViewDetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

saveViewDetails.updateSync_NEW = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(ViewDetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

saveViewDetails.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(ViewDetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

saveViewDetails.updateDocsUploaded = function(appNo,success_callback,failure_callback) {
	/*dbHelper.Update(PDC_Customer_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);*/
	dbHelper.db.executeSql("update saveViewDetails set DOCS_UPLOADED = 'Y' where Application_Number = '" + appNo + "'", success_callback,failure_callback);
};

saveViewDetails.SelectWithFilterCondition = function(filter,success_callback,failure_callback, rows){
	dbHelper.Select(ViewDetailsTableName, rows,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};


saveViewDetails.getColumns = function(){
	return [
			{"name" : "ADVISOR",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "AGENTNAME",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "AGENTSTATUS",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CHANNEL",							"datatype" : "VARCHAR",	   					"objdefault" :''},
			{"name" : "CLIENT_MOBILENO",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CLNTNAME",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CLNTNUM",							"datatype" : "VARCHAR",						"objdefault" :''},
		    {"name" : "CLTADDR01",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CLTADDR02",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CLTADDR03",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "CLTADDR04",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "CLTADDR05",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "CLTPCODE",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "CSCCODE",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "DEPOSIT",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "DGH_REQUIRED",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "EMAIL_ID",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "FREQUENCY",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "INTEREST",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "ISSUANCE_DATE",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LOCATION",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LOCATIONCODE",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NET_DUE_COLLECTABLE",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "OFF_PHONE",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "POLICY_NO",							"datatype" : "VARCHAR PRIMARY KEY",			"objdefault" : ''},
			{"name" : "POLICY_STATUS",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PRODUCT_CODE",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PRODUCT_NAME",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PTD_FREEZED",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PTD_Updated",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "REGION",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "RES_PHONE",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "SA",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "SALES_MANAGER_NAME",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "SMSTATUS",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "SM_EMP_CODE",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "SM_EMP_NAME",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Status",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "TOTAL_DUE",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "DUE_DATE",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "TOTAL_DUE_WITHOUT_INTEREST",			"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "ZONE",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "issync",								"datatype" : "VARCHAR",						"objdefault" : '0'},
			{"name" : "iscompleted",						"datatype" : "VARCHAR",						"objdefault" : '0'},
		];
}; 

window.saveViewDetails = saveViewDetails;