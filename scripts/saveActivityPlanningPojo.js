/**
 * saveActivityPlanning.js
 * @author CloudPact Technologies
 * @description : This script is used for storing activity planning data into local db.
 **/
var SaveActivityPlanningTableName = "saveActivityPlanning";
// Constructor
function saveActivityPlanning(obj){
	var columns = [];
	var tablename = SaveActivityPlanningTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = saveActivityPlanning.getColumns();
	}
	for(var i=0; i<columns.length; i++){
		if(columns[i].name == "issync" || columns[i].name == "iscompleted" ){
			this[columns[i].name] = obj[columns[i].name] ? obj[columns[i].name] : '0';
		}else if(columns[i].name == "Lead_Id"){
			this[columns[i].name] = obj[columns[i].name] ? obj[columns[i].name] : null;
		}else{
			this[columns[i].name] = obj[columns[i].name] ? obj[columns[i].name] : '';
		}
	}
}

// Prototype methods
saveActivityPlanning.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(SaveActivityPlanningTableName,this).execute(success_callback,failure_callback);
};

saveActivityPlanning.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + this.Application_Number + "'");
	saveActivityPlanning.dbHelper.Delete(SaveActivityPlanningTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

saveActivityPlanning.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(SaveActivityPlanningTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
saveActivityPlanning.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(SaveActivityPlanningTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

saveActivityPlanning.alterTable = function(columns, success_callback,failure_callback){
	dbHelper.AlterTable(SaveActivityPlanningTableName, columns).execute(success_callback,failure_callback);
};

saveActivityPlanning.multipleInsert = function(entity, success_callback,failure_callback,inc_cb){
	dbHelper.MultiInsert(SaveActivityPlanningTableName, getKeyColums(this.getColumns()), entity, success_callback, inc_cb);
};

saveActivityPlanning.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(SaveActivityPlanningTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

saveActivityPlanning.Select = function(success_callback,failure_callback){
	dbHelper.Select(SaveActivityPlanningTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

saveActivityPlanning.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Lead_Id", "'" + a + "'");
	dbHelper.Select(SaveActivityPlanningTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

saveActivityPlanning.SelectWithFilterAppNo = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Select(SaveActivityPlanningTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

saveActivityPlanning.SelectedDraftedApp = function(filter,success_callback,failure_callback){
	dbHelper.Select(SaveActivityPlanningTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};

saveActivityPlanning.selectDataToSync = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(SaveActivityPlanningTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new saveActivityPlanning(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

saveActivityPlanning.selectUnsyncedData = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(SaveActivityPlanningTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new saveActivityPlanning(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

saveActivityPlanning.countProposalsToSync = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(SaveActivityPlanningTableName,['count(*) as count'],false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		readSuccess(response);
	},readFailure);
};

saveActivityPlanning.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(SaveActivityPlanningTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

saveActivityPlanning.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(SaveActivityPlanningTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

saveActivityPlanning.updateDocsUploaded = function(appNo,success_callback,failure_callback) {
	/*dbHelper.Update(PDC_Customer_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);*/
	dbHelper.db.executeSql("update saveActivityPlanning set DOCS_UPLOADED = 'Y' where Application_Number = '" + appNo + "'", success_callback,failure_callback);
};

saveActivityPlanning.SelectWithFilterCondition = function(filter,success_callback,failure_callback, rows){
	dbHelper.Select(SaveActivityPlanningTableName, rows,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};


saveActivityPlanning.getColumns = function(){
	return [
			{"name" : "Activity",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Activity_Date",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Activity_Id",								"datatype" : "NUMBER",		  				"objdefault" :''},
			{"name" : "Activity_Location",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Activity_Time",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Advisor_Status",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Address",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Advisor_SAPCode",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Added_By",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Device_Id",									"datatype" : "VARCHAR",	   					"objdefault" :''},
			{"name" : "Lead_Id",									"datatype" : "NUMBER ",		            	"objdefault" :null},
			{"name" : "Source_From",								"datatype" : "VARCHAR",						"objdefault" :''},
		    {"name" : "Special_Campaign",							"datatype" : "VARCHAR",						"objdefault" :''},
		    {"name" : "Latitude",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Longitude",				 					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Sub_Activity",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Sub_Activity_Options",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "With_Whom",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Name",										"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "DOB",										"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "City",										"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Gender",										"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Income",										"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Planning_Remarks",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Marital_Status",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Sync_Txn_Id",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Advisor_Code",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Sync_by",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "issync",										"datatype" : "VARCHAR",						"objdefault" : '0'},
			{"name" : "iscompleted",								"datatype" : "VARCHAR",						"objdefault" : '0'},
		];
}; 

window.saveActivityPlanning = saveActivityPlanning;