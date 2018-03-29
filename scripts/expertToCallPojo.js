/**
 * expertToCallPojo.js
 * @author CloudPact Technologies
 * @description : This script is for storing expert call data in local database.
 **/

var ExpertToCallTableName = "Expert_To_Call";
// Constructor
function Expert_To_Call(obj){
	var columns = [];
	var tablename = ExpertToCallTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = Expert_To_Call.getColumns();
	}
	for(var i=0; i<columns.length; i++){
		if(typeof obj[columns[i].name] === "string"){
			obj[columns[i].name] = obj[columns[i].name].replace(/,/g , "")
		}
		if(columns[i].name == "issync" ){
			this[columns[i].name] = obj[columns[i].name] ? obj[columns[i].name] : '0';
		}else{
			this[columns[i].name] = obj[columns[i].name] ? obj[columns[i].name] : '';
		}
	}
}

// Prototype methods
Expert_To_Call.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(ExpertToCallTableName,this).execute(success_callback,failure_callback);
};

Expert_To_Call.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + this.Application_Number + "'");
	Expert_To_Call.dbHelper.Delete(ExpertToCallTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

Expert_To_Call.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(ExpertToCallTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
Expert_To_Call.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(ExpertToCallTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

Expert_To_Call.alterTable = function(columns, success_callback,failure_callback){
	dbHelper.AlterTable(ExpertToCallTableName, columns).execute(success_callback,failure_callback);
};

Expert_To_Call.multipleInsert = function(entity, success_callback,failure_callback,inc_cb){
	dbHelper.MultiInsert(ExpertToCallTableName, getKeyColums(this.getColumns()), entity, success_callback, inc_cb);
};

Expert_To_Call.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(ExpertToCallTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

Expert_To_Call.Select = function(success_callback,failure_callback){
	dbHelper.Select(ExpertToCallTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

Expert_To_Call.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Select(ExpertToCallTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

Expert_To_Call.SelectWithFilterAppNo = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Activity_Result_Id", "'" + a + "'");
	dbHelper.Select(ExpertToCallTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

Expert_To_Call.SelectedDraftedApp = function(filter,success_callback,failure_callback){
	dbHelper.Select(ExpertToCallTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};

Expert_To_Call.selectDataToSync = function(appno,readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'"),
			new window.DB.Filter.equal("Application_Number", "'" + appno + "'")
	]);
	dbHelper.Select(ExpertToCallTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new Expert_To_Call(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

Expert_To_Call.selectDataToInsert = function(Activity_ID,readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("Activity_ID", "'" + Activity_ID + "'")
	]);
	dbHelper.Select(ExpertToCallTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new Expert_To_Call(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

Expert_To_Call.selectUnsyncedData = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(ExpertToCallTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new Expert_To_Call(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

Expert_To_Call.updateSync_NEW = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(ExpertToCallTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

Expert_To_Call.countProposalsToSync = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(ExpertToCallTableName,['count(*) as count'],false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		readSuccess(response);
	},readFailure);
};

Expert_To_Call.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(ExpertToCallTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

Expert_To_Call.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(ExpertToCallTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

Expert_To_Call.updateDocsUploaded = function(appNo,success_callback,failure_callback) {
	/*dbHelper.Update(PDC_Customer_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);*/
	dbHelper.db.executeSql("update Expert_To_Call set DOCS_UPLOADED = 'Y' where Application_Number = '" + appNo + "'", success_callback,failure_callback);
};

Expert_To_Call.SelectWithFilterCondition = function(filter,success_callback,failure_callback, rows){
	dbHelper.Select(ExpertToCallTableName, rows,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};


Expert_To_Call.getColumns = function(){
	return [
			{"name" : "Txn_Id",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Lead_Id",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Activity_ID",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Activity_Result_Id",						"datatype" : "VARCHAR PRIMARY KEY",			"objdefault" :''},
			{"name" : "Name",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Gender",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "DOB",									"datatype" : "DATETIME",					"objdefault" :''},
			{"name" : "Occupation",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Income",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Mobile",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Alternate_Number",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Landline",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "State",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "City",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Pin_Code",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Email_ID",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LifePlanner_Image1",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LifePlanner_Image2",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LifePlanner_Image3",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LifePlanner_Image4",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LifePlanner_Image5",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LifePlanner_Image6",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LifePlanner_Image7",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LifePlanner_Pdf",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Added_By",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Added_Date",								"datatype" : "DATETIME",					"objdefault" : ''},
			{"name" : "Device_Id",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Source_From",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Marital_Status",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Updated_Date",							"datatype" : "DATETIME",					"objdefault" : ''},
			{"name" : "Updated_By",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Longitude",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Latitude",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Address",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "issync",									"datatype" : "VARCHAR",						"objdefault" : '0'}
		];
}; 

window.Expert_To_Call = Expert_To_Call;