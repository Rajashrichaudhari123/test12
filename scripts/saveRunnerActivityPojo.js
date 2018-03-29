/**
 * saveRunnerActivity.js
 * @author CloudPact Technologies
 * @description : This script is used for storing runner activity data into local db.
 **/
var SaveRunnerActivityTableName = "saveRunnerActivity";
// Constructor
function saveRunnerActivity(obj){
	var columns = [];
	var tablename = SaveRunnerActivityTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = saveRunnerActivity.getColumns();
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
saveRunnerActivity.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(SaveRunnerActivityTableName,this).execute(success_callback,failure_callback);
};

saveRunnerActivity.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + this.Application_Number + "'");
	saveNewLead.dbHelper.Delete(SaveRunnerActivityTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

saveRunnerActivity.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(SaveRunnerActivityTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
saveRunnerActivity.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(SaveRunnerActivityTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

saveRunnerActivity.alterTable = function(columns, success_callback,failure_callback){
	dbHelper.AlterTable(SaveRunnerActivityTableName, columns).execute(success_callback,failure_callback);
};

saveRunnerActivity.multipleInsert = function(entity, success_callback,failure_callback,inc_cb){
	dbHelper.MultiInsert(SaveRunnerActivityTableName, getKeyColums(this.getColumns()), entity, success_callback, inc_cb);
};

saveRunnerActivity.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(SaveRunnerActivityTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

saveRunnerActivity.Select = function(success_callback,failure_callback){
	dbHelper.Select(SaveRunnerActivityTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

saveRunnerActivity.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Policy_Number", "'" + a + "'");
	dbHelper.Select(SaveRunnerActivityTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

saveRunnerActivity.SelectWithFilterAppNo = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Select(SaveRunnerActivityTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

saveRunnerActivity.SelectedDraftedApp = function(filter,success_callback,failure_callback){
	dbHelper.Select(SaveRunnerActivityTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};

saveRunnerActivity.selectDataToSync = function(appno,readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'"),
			new window.DB.Filter.equal("Policy_Number", "'" + appno + "'")
	]);
	dbHelper.Select(SaveRunnerActivityTableName,null,false)
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

saveRunnerActivity.selectUnsyncedData = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(SaveRunnerActivityTableName,null,false)
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

saveRunnerActivity.countProposalsToSync = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(SaveRunnerActivityTableName,['count(*) as count'],false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		readSuccess(response);
	},readFailure);
};

saveRunnerActivity.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(SaveRunnerActivityTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

saveRunnerActivity.updateSync_NEW = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(SaveRunnerActivityTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

saveRunnerActivity.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(SaveRunnerActivityTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

saveRunnerActivity.updateDocsUploaded = function(appNo,success_callback,failure_callback) {
	/*dbHelper.Update(PDC_Customer_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);*/
	dbHelper.db.executeSql("update saveRunnerActivity set DOCS_UPLOADED = 'Y' where Application_Number = '" + appNo + "'", success_callback,failure_callback);
};

saveRunnerActivity.SelectWithFilterCondition = function(filter,success_callback,failure_callback, rows){
	dbHelper.Select(SaveRunnerActivityTableName, rows,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};


saveRunnerActivity.getColumns = function(){
	return [
			{"name" : "Aadhar_Number",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Aadhar_YN",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Added_By",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Authenticate_By",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Care_Of_Person",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "City",										"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "ClientID",									"datatype" : "VARCHAR",	   					"objdefault" :''},
			{"name" : "Contact_No",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Customer_Name",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Customer_Photo",								"datatype" : "VARCHAR",						"objdefault" :''},
		    {"name" : "DOB",										"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Details_Approved",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Device_Date",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Device_ModelName",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Device_ModelNo",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Device_PN",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "District",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "EKYC_XML",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Email_ID",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Entry_Stage",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Gender",										"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "House_Identifier",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Landmark",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Locality",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Met_NotMet",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "NotMet",				 						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Pincode",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Policy_Number",								"datatype" : "VARCHAR PRIMARY KEY",			"objdefault" : ''},
			{"name" : "PostOffice_Name",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Runner_Sapcode",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "SAPCode",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Source_From",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "State",										"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Street_Name",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Sub_District",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Remarks",			 						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Latitude",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Longitude",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Lat_Long_Address",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Policy_Status",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Renewal_Premium",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "issync",										"datatype" : "VARCHAR",						"objdefault" : '0'},
			{"name" : "iscompleted",								"datatype" : "VARCHAR",						"objdefault" : '0'},
		];
}; 

window.saveRunnerActivity = saveRunnerActivity;