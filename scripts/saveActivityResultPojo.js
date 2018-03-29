/**
 * saveActivityResult.js
 * @author CloudPact Technologies
 * @description : This script is used for storing activity result data into local db.
 **/
var SaveActivityResultTableName = "saveActivityResult";
// Constructor
function saveActivityResult(obj){
	var columns = [];
	var tablename = SaveActivityResultTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = saveActivityResult.getColumns();
	}
	for(var i=0; i<columns.length; i++){
		if(columns[i].name == "issync" || columns[i].name == "iscompleted" ){
			this[columns[i].name] = obj[columns[i].name] ? obj[columns[i].name] : '0';
		}else if(columns[i].name == "Activity_Date"){
			this[columns[i].name] = obj[columns[i].name] ? obj[columns[i].name] : null;
		}else{
			this[columns[i].name] = obj[columns[i].name] ? obj[columns[i].name] : '';
		}
	}
}

// Prototype methods
saveActivityResult.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(SaveActivityResultTableName,this).execute(success_callback,failure_callback);
};

saveActivityResult.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + this.Application_Number + "'");
	saveActivityResult.dbHelper.Delete(SaveActivityResultTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

saveActivityResult.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(SaveActivityResultTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
saveActivityResult.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(SaveActivityResultTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

saveActivityResult.alterTable = function(columns, success_callback,failure_callback){
	dbHelper.AlterTable(SaveActivityResultTableName, columns).execute(success_callback,failure_callback);
};

saveActivityResult.multipleInsert = function(entity, success_callback,failure_callback,inc_cb){
	dbHelper.MultiInsert(SaveActivityResultTableName, getKeyColums(this.getColumns()), entity, success_callback, inc_cb);
};

saveActivityResult.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(SaveActivityResultTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
	//	$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

saveActivityResult.Select = function(success_callback,failure_callback){
	dbHelper.Select(SaveActivityResultTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

saveActivityResult.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Lead_ID", "'" + a + "'");
	dbHelper.Select(SaveActivityResultTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

saveActivityResult.SelectWithFilterAppNo = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Select(SaveActivityResultTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

saveActivityResult.SelectedDraftedApp = function(filter,success_callback,failure_callback){
	dbHelper.Select(SaveActivityResultTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};

saveActivityResult.selectDataToSync = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(SaveActivityResultTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(response.rows[i]);
		}
		readSuccess(rows);
	},readFailure);
};

saveActivityResult.selectUnsyncedData = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(SaveActivityResultTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new saveActivityResult(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

saveActivityResult.countProposalsToSync = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(SaveActivityResultTableName,['count(*) as count'],false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		readSuccess(response);
	},readFailure);
};

saveActivityResult.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(SaveActivityResultTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

saveActivityResult.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(SaveActivityResultTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

saveActivityResult.updateDocsUploaded = function(appNo,success_callback,failure_callback) {
	/*dbHelper.Update(PDC_Customer_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);*/
	dbHelper.db.executeSql("update saveActivityResult set DOCS_UPLOADED = 'Y' where Application_Number = '" + appNo + "'", success_callback,failure_callback);
};

saveActivityResult.SelectWithFilterCondition = function(filter,success_callback,failure_callback, rows){
	dbHelper.Select(SaveActivityResultTableNames, rows,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};


saveActivityResult.getColumns = function(){
	return [
			{"name" : "Activity",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Activity_Date",								"datatype" : "NUMBER",						"objdefault" :null},
			{"name" : "Activity_Id",								"datatype" : "NUMBER ",		            	"objdefault" :''},
			{"name" : "activity_result_id",							"datatype" : "NUMBER ",		            	"objdefault" :''},
			{"name" : "Activity_Location",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Address",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Activity_Time",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Added_By",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Device_Id",									"datatype" : "VARCHAR",	   					"objdefault" :''},
			{"name" : "Lead_Category",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Lead_Disposition",							"datatype" : "VARCHAR",						"objdefault" :''},
		    {"name" : "Lead_Id",									"datatype" : "NUMBER",			            "objdefault" :''},
			{"name" : "Meeting_Status",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Campaign_Name",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Latitude",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Longitude",				 					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Next_Appointment",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Sync_Txn_Id",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Source_From",								"datatype" : "VARCHAR",				    	"objdefault" : ''},
			{"name" : "Sub_Activity",								"datatype" : "VARCHAR",				    	"objdefault" : ''},
			{"name" : "Sub_Activity_Options",						"datatype" : "VARCHAR",		             	"objdefault" : ''},
			{"name" : "With_Whom",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Name",										"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Product_Update",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Plan_Code",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "R_n_R",										"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Claims_Record",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Fund_Performance",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "DOB",										"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "City",										"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Gender",										"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Income",										"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Marital_Status",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Sync_by",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Premium_Bucket",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "issync",										"datatype" : "VARCHAR",						"objdefault" : '0'},
			{"name" : "iscompleted",								"datatype" : "VARCHAR",						"objdefault" : '0'},
		];
}; 

window.saveActivityResult = saveActivityResult;