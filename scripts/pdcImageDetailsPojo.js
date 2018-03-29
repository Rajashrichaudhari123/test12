/**
 * pdcImageDetailsPojo.js
 * @author CloudPact Technologies
 * @description : This script is used for storing image data into local db.
 **/
var PDC_Image_DetailsTableName = "PDC_Image_Details";
// Constructor
function PDC_Image_Details(obj){
	var columns = [];
	var tablename = PDC_Image_DetailsTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = PDC_Image_Details.getColumns();
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
PDC_Image_Details.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(PDC_Image_DetailsTableName,this).execute(success_callback,failure_callback);
};

PDC_Image_Details.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + this.Application_Number + "'");
	PDC_Image_Details.dbHelper.Delete(PDC_Image_DetailsTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

PDC_Image_Details.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(PDC_Image_DetailsTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
PDC_Image_Details.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(PDC_Image_DetailsTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

PDC_Image_Details.removeAll = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Delete(PDC_Image_DetailsTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

PDC_Image_Details.multipleInsert = function(entity, success_callback,failure_callback){
	dbHelper.MultiInsert(PDC_Image_DetailsTableName, getKeyColums(this.getColumns()), entity, success_callback,function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

PDC_Image_Details.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(PDC_Image_DetailsTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

PDC_Image_Details.Select = function(success_callback,failure_callback){
	dbHelper.Select(PDC_Image_DetailsTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PDC_Image_Details.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Select(PDC_Image_DetailsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PDC_Image_Details.SelectSyncAppno = function(success_callback,failure_callback){
	var filter = new window.DB.Filter.equal("issync", "'0'");
	dbHelper.Select(PDC_Image_DetailsTableName, ["Application_Number", "issync"],true).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new PDC_Image_Details(response.rows[i]));
		}
		success_callback(rows);
	},failure_callback);
};

PDC_Image_Details.SelectSyncAppno_DOC = function(success_callback,failure_callback){
	var filter = new window.DB.Filter.equal("issync", "'0'");
	var image_namefilter = new window.DB.Filter.notEqual("imagename", "'CFR_DOCS'");
	var compositFilter = new DB.CompositeFilter(DB.CompositeFilter.AND, [filter,image_namefilter]);
	dbHelper.Select(PDC_Image_DetailsTableName, ["Application_Number"],true)
			.setFilter(compositFilter)
			.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new PDC_Image_Details(response.rows[i]));
		}
		success_callback(rows);
	},failure_callback);
};

PDC_Image_Details.SelectSyncAppno_CFR = function(success_callback,failure_callback){
	var filter = new window.DB.Filter.equal("issync", "'0'");
	var image_namefilter = new window.DB.Filter.equal("imagename", "'CFR_DOCS'");
	var compositFilter = new DB.CompositeFilter(DB.CompositeFilter.AND, [filter,image_namefilter]);
	dbHelper.Select(PDC_Image_DetailsTableName, ["Application_Number"],true)
			.setFilter(compositFilter)
			.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new PDC_Image_Details(response.rows[i]));
		}
		success_callback(rows);
	},failure_callback);
};

PDC_Image_Details.selectDataToSync = function(readSuccess,readFailure){
	var filter = new window.DB.Filter.equal("issync", "'0'");
	dbHelper.Select(PDC_Image_DetailsTableName,null,false)
	.setFilter(filter)
	.addDescOrder("Application_Number")
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new PDC_Image_Details(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

PDC_Image_Details.selectDataToSync_CFR = function(appno, readSuccess,readFailure){
	var filter = new window.DB.Filter.equal("issync", "'0'");
	var appnofilter = new window.DB.Filter.equal("Application_Number", "'" + appno + "'");
	var compositFilter = new DB.CompositeFilter(DB.CompositeFilter.AND, [filter,appnofilter]);
	dbHelper.Select(PDC_Image_DetailsTableName,null,false)
	.setFilter(compositFilter)
	.addDescOrder("Application_Number")
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new PDC_Image_Details(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

PDC_Image_Details.selectDataToSync_DOC = function(appno,readSuccess,readFailure){
	var filter = new window.DB.Filter.equal("issync", "'0'");
	var appnofilter = new window.DB.Filter.equal("Application_Number", "'" + appno + "'");
	var compositFilter = new DB.CompositeFilter(DB.CompositeFilter.AND, [filter,appnofilter]);
	dbHelper.Select(PDC_Image_DetailsTableName,null,false)
	.setFilter(compositFilter)
	.addDescOrder("Application_Number")
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new PDC_Image_Details(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};


PDC_Image_Details.selectCompleteDataToSync = function(readSuccess,readFailure){
	dbHelper.Select(PDC_Image_DetailsTableName,null,false)
	.addDescOrder("Application_Number")
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new PDC_Image_Details(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

PDC_Image_Details.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PDC_Image_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PDC_Image_Details.updateSync_NEW = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PDC_Image_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PDC_Image_Details.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PDC_Image_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PDC_Image_Details.SelectWithFilterCondition = function(filter,success_callback,failure_callback,rows){
	dbHelper.Select(PDC_Image_DetailsTableName, rows,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PDC_Image_Details.getColumns = function(){
	return [
			{"name" : "Txn_Id",						"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "Application_Number",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "DocumentTypeCode",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "AadharImage",			    "datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "ImagePath",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "ImageName",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "ImageDoc",					"datatype" : "BLOB",						"objdefault" :''},
			{"name" : "UploadDate",					"datatype" : "DATETIME",					"objdefault" :''},
			{"name" : "Status",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Txn_Date",					"datatype" : "DATETIME",					"objdefault" :''},
			{"name" : "iscompleted",				"datatype" : "VARCHAR(10)",					"objdefault" : '0'},
			{"name" : "issync",						"datatype" : "VARCHAR(10)",					"objdefault" : '0'},
			{"name" : "Row_No",						"datatype" : "Number",						"objdefault" : ''},
			{"name" : "Extended_Attributes",		"datatype" : "VARCHAR",						"objdefault" : ''}
		];
};

window.PDC_Image_Details = PDC_Image_Details;