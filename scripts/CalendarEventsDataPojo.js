/**
 * CalendarEventsDataPojo.js
 * @author CloudPact Technologies
 * @description : This script is for storing calendar data in local database.
 **/

var LeadInfoAppointmentTableName = "LeadInfoAppointment";
// Constructor
function LeadInfoAppointment(obj){
	var columns = [];
	var tablename = LeadInfoAppointmentTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = LeadInfoAppointment.getColumns();
	}
	for(var i=0; i<columns.length; i++){
		if(typeof obj[columns[i].name] === "string"){
			obj[columns[i].name] = obj[columns[i].name].replace(/,/g , "")
		}
		this[columns[i].name] = obj[columns[i].name] ? obj[columns[i].name] : '';
	}
}

// Prototype methods
LeadInfoAppointment.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(LeadInfoAppointmentTableName,this).execute(success_callback,failure_callback);
};

LeadInfoAppointment.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + this.Application_Number + "'");
	LeadInfoAppointment.dbHelper.Delete(LeadInfoAppointmentTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

LeadInfoAppointment.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(LeadInfoAppointmentTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
LeadInfoAppointment.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(LeadInfoAppointmentTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

LeadInfoAppointment.alterTable = function(columns, success_callback,failure_callback){
	dbHelper.AlterTable(LeadInfoAppointmentTableName, columns).execute(success_callback,failure_callback);
};

LeadInfoAppointment.removeAll = function(success_callback,failure_callback){
	dbHelper.Delete(LeadInfoAppointmentTableName,this.getColumns()).execute(success_callback,failure_callback);
};

LeadInfoAppointment.multipleInsert = function(entity, success_callback,failure_callback,inc_cb){
	dbHelper.MultiInsert(LeadInfoAppointmentTableName, getKeyColums(this.getColumns()), entity, success_callback,inc_cb);
};

LeadInfoAppointment.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(LeadInfoAppointmentTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

LeadInfoAppointment.Select = function(success_callback,failure_callback){
	dbHelper.Select(LeadInfoAppointmentTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

LeadInfoAppointment.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("lead_id", "'" + a + "'");
	dbHelper.Select(LeadInfoAppointmentTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

LeadInfoAppointment.SelectWithFilterAppNo = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("lead_id", "'" + a + "'");
	dbHelper.Select(LeadInfoAppointmentTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

LeadInfoAppointment.SelectedDraftedApp = function(filter,success_callback,failure_callback){
	dbHelper.Select(LeadInfoAppointmentTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};

LeadInfoAppointment.selectDataToSync = function(appno,readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'"),
			new window.DB.Filter.equal("Application_Number", "'" + appno + "'")
	]);
	dbHelper.Select(LeadInfoAppointmentTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new LeadInfoAppointment(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

LeadInfoAppointment.selectUnsyncedData = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(LeadInfoAppointmentTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new LeadInfoAppointment(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

LeadInfoAppointment.updateSync_NEW = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(LeadInfoAppointmentTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

LeadInfoAppointment.countProposalsToSync = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(LeadInfoAppointmentTableName,['count(*) as count'],false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		readSuccess(response);
	},readFailure);
};

LeadInfoAppointment.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(LeadInfoAppointmentTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

LeadInfoAppointment.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(LeadInfoAppointmentTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

LeadInfoAppointment.updateDocsUploaded = function(appNo,success_callback,failure_callback) {
	/*dbHelper.Update(PDC_Customer_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);*/
	dbHelper.db.executeSql("update PDC_Video_Details set DOCS_UPLOADED = 'Y' where Application_Number = '" + appNo + "'", success_callback,failure_callback);
};

LeadInfoAppointment.SelectWithFilterCondition = function(filter,success_callback,failure_callback, rows){
	dbHelper.Select(LeadInfoAppointmentTableName, rows,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};


LeadInfoAppointment.getColumns = function(){
	return [
			{"name" : "lead_id",								"datatype" : "VARCHAR PRIMARY KEY",			"objdefault" : ''},
			{"name" : "Activity",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Activity_Date",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Activity_Id",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Activity_Location",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Activity_Result_Id",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Activity_Time",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Added_By",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Added_date",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Address_1",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Address_2",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Address_3",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "City",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Gender",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Message",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Mobile",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Name",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Next_Appointment",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Pin_code",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Special_Campaign",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "State",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Status",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Sub_Activity",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Sub_Activity_Options",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "With_Whom",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Lead_Category",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Lead_Source",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Lead_Sub_Type",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Lead_Type",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Flag",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "LeadTypeFlag",							"datatype" : "VARCHAR",						"objdefault" :''}
		];
}; 

window.LeadInfoAppointment = LeadInfoAppointment;