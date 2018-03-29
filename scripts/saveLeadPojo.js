/**
 * saveLeadPojo.js
 * @author CloudPact Technologies
 * @description : This script is used for storing newlead data into local db.
 **/
var SaveNewLeadTableName = "saveNewLead";
// Constructor
function saveNewLead(obj){
	var columns = [];
	var tablename = SaveNewLeadTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = saveNewLead.getColumns();
	}

	for(var i=0; i<columns.length; i++){
	/*	if(typeof obj[columns[i].name] === "string"){
			obj[columns[i].name] = obj[columns[i].name].replace(/,/g , "")
		}*/
		if(columns[i].name == "issync" || columns[i].name == "iscompleted" || columns[i].name == "Reference_LeadID" ||columns[i].name =="Added_Date"){
			this[columns[i].name] = obj[columns[i].name] ? obj[columns[i].name] : '0';
		}else{
			this[columns[i].name] = obj[columns[i].name] ? obj[columns[i].name] : '';
		}
	}
}

// Prototype methods
saveNewLead.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(SaveNewLeadTableName,this).execute(success_callback,failure_callback);
};

saveNewLead.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + this.Application_Number + "'");
	saveNewLead.dbHelper.Delete(SaveNewLeadTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

saveNewLead.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(SaveNewLeadTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
saveNewLead.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(SaveNewLeadTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

saveNewLead.alterTable = function(columns, success_callback,failure_callback){
	dbHelper.AlterTable(SaveNewLeadTableName, columns).execute(success_callback,failure_callback);
};

saveNewLead.multipleInsert = function(entity, success_callback,failure_callback,inc_cb){
	dbHelper.MultiInsert(SaveNewLeadTableName, getKeyColums(this.getColumns()), entity, success_callback, inc_cb);
};

saveNewLead.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(SaveNewLeadTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
	//	$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

saveNewLead.Select = function(success_callback,failure_callback){
	dbHelper.Select(SaveNewLeadTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

saveNewLead.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Lead_ID", "'" + a + "'");
	dbHelper.Select(SaveNewLeadTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

saveNewLead.SelectWithFilterAppNo = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Select(SaveNewLeadTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

saveNewLead.SelectedDraftedApp = function(filter,success_callback,failure_callback){
	dbHelper.Select(SaveNewLeadTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};

saveNewLead.selectDataToSync = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(SaveNewLeadTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new saveNewLead(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

saveNewLead.selectUnsyncedData = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(SaveNewLeadTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new saveNewLead(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

saveNewLead.countProposalsToSync = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(SaveNewLeadTableName,['count(*) as count'],false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		readSuccess(response);
	},readFailure);
};

saveNewLead.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(SaveNewLeadTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

saveNewLead.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(SaveNewLeadTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

saveNewLead.updateDocsUploaded = function(appNo,success_callback,failure_callback) {
	/*dbHelper.Update(PDC_Customer_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);*/
	dbHelper.db.executeSql("update saveNewLead set DOCS_UPLOADED = 'Y' where Application_Number = '" + appNo + "'", success_callback,failure_callback);
};

saveNewLead.SelectWithFilterCondition = function(filter,success_callback,failure_callback, rows){
	dbHelper.Select(SaveNewLeadTableName, rows,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};


saveNewLead.getColumns = function(){
	return [
			{"name" : "Aadhaar",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Added_By",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Address_1",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Address_2",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Address_3",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Address",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "City",										"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Commute_Time",								"datatype" : "VARCHAR",	   					"objdefault" :''},
			{"name" : "DOB",										"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Marital_Status",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Dependents",									"datatype" : "VARCHAR",						"objdefault" :''},
		    {"name" : "Device_Id",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Educational_Background",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Email_ID",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Gender",										"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Campaign",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Income",										"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Landline",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Lead_Category",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Lead_Id",									"datatype" : "VARCHAR PRIMARY KEY",			"objdefault" : ''},
			{"name" : "Lead_Source",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Lead_Status",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Lead_Sub_Source",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Lead_Sub_Type",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Lead_Type",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Latitude",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Longitude",				 					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Mobile",										"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Name",										"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Occupation",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "AgeGroup",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Pin_Code",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Source_From",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "State",										"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Reference_LeadID",							"datatype" : "NUMBER",						"objdefault" : '0'},
			{"name" : "Reference_YN",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Sync_Txn_Id",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Lead_From_Contact_List",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Added_Date",									"datatype" : "VARCHAR",						"objdefault" : '0'},
			{"name" : "LeadInfo_Remarks",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Advisor_Code",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Sync_by",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Policy_Number",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "issync",										"datatype" : "VARCHAR",						"objdefault" : '0'},
			{"name" : "iscompleted",								"datatype" : "VARCHAR",						"objdefault" : '0'},
		];
}; 

window.saveNewLead = saveNewLead;