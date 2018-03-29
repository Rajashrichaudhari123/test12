/**
 * dailyAttendancePojo.js
 * @author CloudPact Technologies
 * @description : This script is for storing attendance data in local database.
 **/

var AttendanceTableName = "Attendance_Emp_DailyAtt";
// Constructor
function Attendance_Emp_DailyAtt(obj){
	var columns = [];
	var tablename = AttendanceTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = Attendance_Emp_DailyAtt.getColumns();
	}
	for(var i=0; i<columns.length; i++){
		if(typeof obj[columns[i].name] === "string"){
			obj[columns[i].name] = obj[columns[i].name].replace(/,/g , "")
		}
		if(columns[i].name == "ischeckin" || columns[i].name == "ischeckout" ){
			this[columns[i].name] = obj[columns[i].name] ? obj[columns[i].name] : '0';
		}else{
			this[columns[i].name] = obj[columns[i].name] ? obj[columns[i].name] : '';
		}
	}
}

// Prototype methods
Attendance_Emp_DailyAtt.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(AttendanceTableName,this).execute(success_callback,failure_callback);
};

Attendance_Emp_DailyAtt.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + this.Application_Number + "'");
	PDC_Plan_Details.dbHelper.Delete(AttendanceTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

Attendance_Emp_DailyAtt.prototype.update = function(f,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Login_DateTime", "'" + f + "'");
	dbHelper.Update(AttendanceTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

// Static Helpers
Attendance_Emp_DailyAtt.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(AttendanceTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

Attendance_Emp_DailyAtt.alterTable = function(columns, success_callback,failure_callback){
	dbHelper.AlterTable(AttendanceTableName, columns).execute(success_callback,failure_callback);
};

Attendance_Emp_DailyAtt.multipleInsert = function(entity, success_callback,failure_callback,inc_cb){
	dbHelper.MultiInsert(AttendanceTableName, getKeyColums(this.getColumns()), entity, success_callback, inc_cb);
};

Attendance_Emp_DailyAtt.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(AttendanceTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

Attendance_Emp_DailyAtt.Select = function(success_callback,failure_callback){
	dbHelper.Select(AttendanceTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

Attendance_Emp_DailyAtt.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("SAP_Code", "'" + a + "'");
	dbHelper.Select(AttendanceTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

Attendance_Emp_DailyAtt.selectDataToSync = function(appno,readSuccess,readFailure){
	var filter = new DB.CompositeFilter(DB.CompositeFilter.AND, [
			new DB.Filter.equal("issync", "'0'"),
			new DB.Filter.equal("iscompleted", "'1'"),
			new window.DB.Filter.equal("Application_Number", "'" + appno + "'")
	]);
	dbHelper.Select(AttendanceTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new PDC_Plan_Details(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

Attendance_Emp_DailyAtt.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(AttendanceTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

Attendance_Emp_DailyAtt.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	var filter = new DB.Filter.equal("SAP_Code", "'" + filter + "'");
	dbHelper.Update(AttendanceTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

Attendance_Emp_DailyAtt.SelectWithFilterCondition = function(filter,success_callback,failure_callback,rows){
	dbHelper.Select(AttendanceTableName, rows,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

Attendance_Emp_DailyAtt.getColumns = function(){
	return [
			{"name" : "Address",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Device_Id",			        "datatype" : "VARCHAR",		            	"objdefault" :''},
			{"name" : "InOut",						"datatype" : "VARCHAR",			     		"objdefault" :''},
			{"name" : "Latitude",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Longitude",			    	"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "SAP_Code",			    	"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Source_From",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "ischeckin",			    	"datatype" : "VARCHAR",						"objdefault" :'0'},
			{"name" : "ischeckout",			    	"datatype" : "VARCHAR",						"objdefault" :'0'},
		   	{"name" : "Login_DateTime",			    "datatype" : "DATETIME",					"objdefault" :''}
		];
};

window.Attendance_Emp_DailyAtt = Attendance_Emp_DailyAtt;