/**
 * SHDataPojo.js
 * @author CloudPact Technologies
 * @description : This script is used for storing advisor data into local db.
 **/
var SHDataTableName = "shdata";

// Constructor
function SHData(obj){
	var columns = [];
	var tablename = SHDataTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = SHData.getColumns();
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
SHData.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(SHDataTableName,this).execute(success_callback,failure_callback);
};

SHData.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("Txn_ID", "'" + this.Txn_ID + "'");
	dbHelper.Delete(SHDataTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

SHData.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(SHDataTableName,this).execute(success_callback,failure_callback);
};




SHData.multiReplace = function(records,cb, incrementCb){
	var cols = SHData.getColumns();
	var keys=[];
	for(var i=0;i<cols.length;i++)
		keys.push(cols[i].name);
	dbHelper.MultiReplace(SHDataTableName, keys, records, cb, incrementCb);
};

//Static Helpers
SHData.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(SHDataTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

SHData.Count = function(column,success_callback,failure_callback,isDistinct){
	dbHelper.Count(SHDataTableName, column,isDistinct).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};

SHData.Select = function(success_callback,failure_callback){
	dbHelper.Select(SHDataTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};

SHData.SelectWithFilter = function(columns,filter,success_callback,failure_callback,isDistinct){
	dbHelper.Select(SHDataTableName, columns,isDistinct).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};

SHData.SelectWithFilterAdv = function(columns,a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("SM_Code", a);
	dbHelper.Select(SHDataTableName, columns,true).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

SHData.getColumns = function(){
	return [
		{"name" : "Txn_ID",	"datatype" : "NUMBER PRIMARY KEY",			"objdefault" : ''},
		{"name" : "Adv_Emp_Code",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Adv_Emp_Name",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Channel",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Agent_Type",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "CSCCode",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Designation",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Business_Login_Code",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "SM_Code",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "SM_Name",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "BM_Code",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "BM_Name",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "RM_Code",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "RM_Name",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "ZM_Code",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "ZM_Name",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "AM_Code",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "AM_Name",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Effective_Date",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Terminated_On",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "AgentStatus",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "SMStatus",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "BMStatus",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "RMStatus",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "ZMStatus",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "User_Type",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Additional_Information_1",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Additional_Information_2",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Additional_Information_3",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Additional_Information_4",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Additional_Information_5",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Inf_Updated_On",		"datatype" : "VARCHAR",			"objdefault" : ''}
		
	];
};

window.SHData = SHData;