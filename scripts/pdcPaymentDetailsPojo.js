/**
 * pdcPaymentDetailsPojo.js
 * @author CloudPact Technologies
 * @description : This script is for storing payment details in local database.
 **/

var PDC_Payment_DetailsTableName = "PDC_Payment_Details";
// Constructor
function PDC_Payment_Details(obj){
	var columns = [];
	var tablename = PDC_Payment_DetailsTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = PDC_Payment_Details.getColumns();
	}
	for(var i=0; i<columns.length; i++){
		if(typeof obj[columns[i].name] === "string"){
			obj[columns[i].name] = obj[columns[i].name].replace(/,/g , "")
		}
		if(columns[i].name == "issync" || columns[i].name == "iscompleted" ){
			this[columns[i].name] = obj[columns[i].name] ? obj[columns[i].name] : '0';
		}else{
			this[columns[i].name] = obj[columns[i].name] ? obj[columns[i].name] : '';
		}
	}
}

// Prototype methods
PDC_Payment_Details.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(PDC_Payment_DetailsTableName,this).execute(success_callback,failure_callback);
};

PDC_Payment_Details.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + this.Application_Number + "'");
	PDC_Payment_Details.dbHelper.Delete(PDC_Payment_DetailsTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

PDC_Payment_Details.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(PDC_Payment_DetailsTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
PDC_Payment_Details.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(PDC_Payment_DetailsTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

PDC_Payment_Details.alterTable = function(columns, success_callback,failure_callback){
	dbHelper.AlterTable(PDC_Payment_DetailsTableName, columns).execute(success_callback,failure_callback);
};

PDC_Payment_Details.multipleInsert = function(entity, success_callback,failure_callback){
	dbHelper.MultiInsert(PDC_Payment_DetailsTableName, getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

PDC_Payment_Details.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(PDC_Payment_DetailsTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

PDC_Payment_Details.Select = function(success_callback,failure_callback){
	dbHelper.Select(PDC_Payment_DetailsTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PDC_Payment_Details.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Select(PDC_Payment_DetailsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PDC_Payment_Details.selectDataToSync = function(appno,readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'"),
			new window.DB.Filter.equal("Application_Number", "'" + appno + "'")
	]);
	dbHelper.Select(PDC_Payment_DetailsTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new PDC_Payment_Details(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

PDC_Payment_Details.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PDC_Payment_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PDC_Payment_Details.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PDC_Payment_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PDC_Payment_Details.SelectWithFilterCondition = function(filter,success_callback,failure_callback,rows){
	dbHelper.Select(PDC_Payment_DetailsTableName, rows,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PDC_Payment_Details.getColumns = function(){
	return [
			{"name" : "Txn_Id",						"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "Application_Number",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Row_No",						"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "Payment_Type",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Amount_Paid",				"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "Cheque_No",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Cheque_Date",				"datatype" : "DATETIME",					"objdefault" :''},
			{"name" : "Bank_Name",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Bank_Branch",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "PAYMENTDATE",				"datatype" : "DATETIME",					"objdefault" : ''},
			{"name" : "PAYMENTSTATUS",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Transaction_Payment_No",		"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "WEBTOKENNO",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "BANKCODE",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "RECEIPTNUMBER",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Txn_Date",					"datatype" : "DATETIME",					"objdefault" : ''},
			{"name" : "iscompleted",				"datatype" : "VARCHAR(10)",					"objdefault" : '0'},
			{"name" : "issync",						"datatype" : "VARCHAR(10)",					"objdefault" : '0'},
			{"name" : "Extended_Attributes",		"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "IFSC_Code",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "MICR_Code",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "DocumentType",				"datatype" : "VARCHAR",						"objdefault" :''}
		];
};

window.PDC_Payment_Details = PDC_Payment_Details;