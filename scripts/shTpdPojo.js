/**
 * SHTpdPojo.js
 * @author CloudPact Technologies
 * @description : This script is used for storing TPPR advisor data into local db.
 **/
var SHTpdDataTableName = "shTpdData";

// Constructor
function shTpdData(obj){
	var columns = [];
	var tablename = SHTpdDataTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = shTpdData.getColumns();
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
shTpdData.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(SHTpdDataTableName,this).execute(success_callback,failure_callback);
};

shTpdData.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("Txn_ID", "'" + this.Txn_ID + "'");
	dbHelper.Delete(SHTpdDataTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

shTpdData.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(SHTpdDataTableName,this).execute(success_callback,failure_callback);
};




shTpdData.multiReplace = function(records,cb, incrementCb){
	var cols = shTpdData.getColumns();
	var keys=[];
	for(var i=0;i<cols.length;i++)
		keys.push(cols[i].name);
	dbHelper.MultiReplace(SHTpdDataTableName, keys, records, cb, incrementCb);
};

//Static Helpers
shTpdData.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(SHTpdDataTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

shTpdData.alterTable = function(columns, success_callback,failure_callback){
	dbHelper.AlterTable(SHTpdDataTableName, columns).execute(success_callback,failure_callback);
};

shTpdData.Count = function(column,success_callback,failure_callback,isDistinct){
	dbHelper.Count(SHTpdDataTableName, column,isDistinct).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};

shTpdData.Select = function(success_callback,failure_callback){
	dbHelper.Select(SHTpdDataTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};

shTpdData.SelectWithFilter = function(columns,filter,success_callback,failure_callback,isDistinct){
	dbHelper.Select(SHTpdDataTableName, columns,isDistinct).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};

shTpdData.getColumns = function(){
	return [
			{"name" : "Txn_ID",						"datatype" : "NUMBER PRIMARY KEY",			"objdefault" : ''},
		{"name" : "ADVISORCODE",				"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "ADVISORSTATUS",				"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "ADVISORNAME",				"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "CSC_CODE",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "SM_STATUS",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "SM_EMPCODE",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "SM_NAME",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "DOJ",						"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "DESIGNATION_OF_LEADER",		"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "CHANNEL",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "LOCATION_CODE",				"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "LOCATION",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "CHANNEL_PARTNER",			"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "CHANNELPARTNER_NAME",		"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "COMPANY_UNITCODE",			"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "COMPANY_UNITNAME",			"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "BM_EMPCODE",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "BM_NAME",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "CM_EMPCODE",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "CM_NAME",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "RM_EMPCODE",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "RM_NAME",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "REGION",						"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "DIRECTMGRCODE",				"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "DIRECT_STATUS",				"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "DIRECT_NAME",				"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "DIRECT_TYPE",				"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "DIRECT_EMPCODE",				"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "COMPANY_LOCATION",			"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "COMPANY_LOCATION_DESC",		"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "ADVISORDESIGNTAION",		"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "ADVISORTYPE",				"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "CHANNEL_MST",				"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "CHANNEL_MST_NAME",			"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "FLAG",						"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "SERVPROVDINFO",			"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "ZM_EMPCODE",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "ZM_NAME",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "ZONE",						"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "AO_EMPCODE",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "AO_NAME",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "AREA",						"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "AOMGRCODE",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "CMCODE",						"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "CLUSTER_NAME",				"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "CMMGRCODE",					"datatype" : "VARCHAR",						"objdefault" : ''}
	];
};

window.shTpdData = shTpdData;