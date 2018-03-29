/**
 * inputPojo.js
 * @author CloudPact Technologies
 * @description : This script is for storing lead data in local database.
 **/
var inputPojoTableName = "inputPojo";
// Constructor
function inputPojo(obj){
	var columns = [];
	var tablename = inputPojoTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = inputPojo.getColumns();
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
inputPojo.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(inputPojoTableName,this).execute(success_callback,failure_callback);
};

inputPojo.prototype.remove = function(success_callback,failure_callback){
	//var filter = new DB.Filter.equal("CFR_CODE", "'" + this.CFR_CODE + "'");
	dbHelper.Delete(inputPojoTableName,this).execute(success_callback,failure_callback);
};

inputPojo.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(inputPojoTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
inputPojo.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(inputPojoTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

inputPojo.alterTable = function(columns, success_callback,failure_callback){
	dbHelper.AlterTable(inputPojoTableName, columns).execute(success_callback,failure_callback);
};

inputPojo.multipleInsert = function(entity, success_callback,failure_callback){
	dbHelper.MultiInsert(inputPojoTableName, getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
	//	$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

inputPojo.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(inputPojoTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
	//	$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

inputPojo.Select = function(success_callback,failure_callback){
	dbHelper.Select(inputPojoTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

inputPojo.SelectWithFilter = function(a,success_callback,failure_callback){
//	var filter = new DB.Filter.notEqual("iscomplete", "'1'");
//	var sortBy = new DB.SortOrder.descending("Updated_Date");
//	dbHelper.Select(inputPojoTableName, null,false).setFilter(filter).setOrder([sortBy]).execute(function(response){
//		if($m.isWeb()){
//			response = JSON.parse(JSON.stringify(response));
//		}
//		//$m.logInfo(JSON.stringify(response));
//		success_callback(response);
//	},failure_callback);
	dbHelper.db.executeSql("select * from inputPojo order by cast(roworder as unsigned) asc",success_callback,failure_callback);
};

inputPojo.SelectWithFilterLMS = function(a,success_callback,failure_callback){
//	var filter = new DB.Filter.notEqual("iscomplete", "'1'");
//	var sortBy = new DB.SortOrder.descending("Updated_Date");
//	dbHelper.Select(inputPojoTableName, null,false).setFilter(filter).setOrder([sortBy]).execute(function(response){
//		if($m.isWeb()){
//			response = JSON.parse(JSON.stringify(response));
//		}
//		//$m.logInfo(JSON.stringify(response));
//		success_callback(response);
//	},failure_callback);
	dbHelper.db.executeSql("select * from inputPojo order by cast(roworder as unsigned) asc",success_callback,failure_callback);
};

inputPojo.SelectWithLead_ID = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Lead_ID", "'" + a + "'");
	dbHelper.Select(inputPojoTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

inputPojo.SelectWithAdded_By = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Added_By", "'" + a + "'");
	dbHelper.Select(inputPojoTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

inputPojo.SelectWithFilterAdv = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Advisor_Code", "'" + a + "'");
	dbHelper.Select(inputPojoTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

inputPojo.SelectWithFilterDateRange = function(a,b,readSuccess,readFailure){
	var filter = new DB.CompositeFilter(DB.CompositeFilter.AND, [
			new DB.Filter.greaterThanOrEqual("Added_Date","'" + a + "'"),
			new DB.Filter.lessThanOrEqual("Added_Date", "'" + b + "'")
	]);
	dbHelper.Select(inputPojoTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new inputPojo(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};


inputPojo.selectDataToSync = function(readSuccess,readFailure){
	var filter = new DB.CompositeFilter(DB.CompositeFilter.AND, [
			new DB.Filter.equal("issync", "'0'"),
			new DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(inputPojoTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new inputPojo(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

inputPojo.selectDataToInsert = function(activity_id,readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("Activity_Id", "'" + activity_id + "'")
	]);
	dbHelper.Select(inputPojoTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new inputPojo(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

inputPojo.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(inputPojoTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

inputPojo.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(inputPojoTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

inputPojo.getColumns = function(){
	return [
			{"name" : "Activity_Id",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Added_Date",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Activity_Date",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Activity_Time",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Campaign",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Flag",								"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "Activity_Result_Id",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "LeadTypeFlag",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Lead_Id",							"datatype" : "VARCHAR PRIMARY KEY",			"objdefault" :''},
			{"name" : "Lead_Sub_Source",					"datatype" : "VARCHAR",				   		"objdefault" : ''},
			{"name" : "Lead_Type",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Mobile",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Meeting_Status",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Name",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Sub_Activity",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Sub_Activity_Options",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Lead_Category",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "DOB",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "City",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Gender",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Income",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Marital_Status",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Aadhaar",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Commute_Time",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Dependents",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Educational_Background",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Landline",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Latitude",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Lead_Status",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Longitude",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Occupation",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Pin_Code",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Reference_LeadID",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Reference_YN",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Source_From",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "State",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Updated_By",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Updated_Date",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Address",						    "datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Alternate_Number",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Added_By",						    "datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Lead_Sub_Type",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Lead_Source",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Email_ID",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Device_Id",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Address_1",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Address_2",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Address_3",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Advisor_Code",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "LeadInfo_Remarks",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Planning_Remarks",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Policy_Number",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "issync",								"datatype" : "VARCHAR",						"objdefault" : '0'},
			{"name" : "iscomplete",							"datatype" : "VARCHAR",						"objdefault" : '0'},
			{"name" : "roworder",							"datatype" : "VARCHAR",						"objdefault" : '0'}
		];
};

window.inputPojo = inputPojo;