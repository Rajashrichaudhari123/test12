/**
 * aadharPojo.js
 * @author CloudPact Technologies
 * @description : This script is used for storing aadhar data into local db.
 **/

var Customer_Aadhar_DetailsTableName = "Customer_Aadhar_Details";
// Constructor
function Customer_Aadhar_Details(obj){
	var columns = [];
	var tablename = Customer_Aadhar_DetailsTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = Customer_Aadhar_Details.getColumns();
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
Customer_Aadhar_Details.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(Customer_Aadhar_DetailsTableName,this).execute(success_callback,failure_callback);
};

Customer_Aadhar_Details.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + this.Application_Number + "'");
	Customer_Aadhar_Details.dbHelper.Delete(Customer_Aadhar_DetailsTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

Customer_Aadhar_Details.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(Customer_Aadhar_DetailsTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
Customer_Aadhar_Details.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(Customer_Aadhar_DetailsTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

Customer_Aadhar_Details.alterTable = function(columns, success_callback,failure_callback){
	dbHelper.AlterTable(Customer_Aadhar_DetailsTableName, columns).execute(success_callback,failure_callback);
};

Customer_Aadhar_Details.multipleInsert = function(entity, success_callback,failure_callback,inc_cb){
	dbHelper.MultiInsert(Customer_Aadhar_DetailsTableName, getKeyColums(this.getColumns()), entity, success_callback, inc_cb);
};

Customer_Aadhar_Details.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(Customer_Aadhar_DetailsTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
	});
};

Customer_Aadhar_Details.Select = function(success_callback,failure_callback){
	dbHelper.Select(Customer_Aadhar_DetailsTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};

Customer_Aadhar_Details.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Lead_ID", "'" + a + "'");
	dbHelper.Select(Customer_Aadhar_DetailsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};

Customer_Aadhar_Details.SelectWithFilterAppNo = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Select(Customer_Aadhar_DetailsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};

Customer_Aadhar_Details.SelectedDraftedApp = function(filter,success_callback,failure_callback){
	dbHelper.Select(Customer_Aadhar_DetailsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};

Customer_Aadhar_Details.selectDataToSync = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(Customer_Aadhar_DetailsTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new Customer_Aadhar_Details(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

Customer_Aadhar_Details.selectUnsyncedData = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(Customer_Aadhar_DetailsTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new Customer_Aadhar_Details(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

Customer_Aadhar_Details.countProposalsToSync = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(Customer_Aadhar_DetailsTableName,['count(*) as count'],false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		readSuccess(response);
	},readFailure);
};

Customer_Aadhar_Details.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(Customer_Aadhar_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

Customer_Aadhar_Details.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(Customer_Aadhar_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

Customer_Aadhar_Details.updateDocsUploaded = function(appNo,success_callback,failure_callback) {
	/*dbHelper.Update(PDC_Customer_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);*/
	dbHelper.db.executeSql("update Customer_Aadhar_Details set DOCS_UPLOADED = 'Y' where Application_Number = '" + appNo + "'", success_callback,failure_callback);
};

Customer_Aadhar_Details.SelectWithFilterCondition = function(filter,success_callback,failure_callback, rows){
	dbHelper.Select(Customer_Aadhar_DetailsTableName, rows,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};


Customer_Aadhar_Details.getColumns = function(){
	return [
			{"name" : "Lead_ID",								"datatype" : "VARCHAR PRIMARY KEY",			"objdefault" :''},
			{"name" : "Aadhar_Number",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Authenticate_By",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Details_Approved",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Customer_Name",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "DOB",									"datatype" : "DATETIME",					"objdefault" :''},
			{"name" : "Gender",							        "datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Contact_No",								"datatype" : "VARCHAR",						"objdefault" :''},
		    {"name" : "Email_ID",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Care_Of_Person",						    "datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "House_Identifier",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Street_Name",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Landmark",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Customer_Photo",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Locality",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "City",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Sub_District",							"datatype" : "VARCHAR ",			        "objdefault" : ''},
			{"name" : "District",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "State",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Pincode",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PostOffice_Name",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "EKYC_XML",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Added_By",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Source_From",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "SAPCode",							    "datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Entry_Stage",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Device_SN",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Device_PN",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Device_ModelNo",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Device_ModelName",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Device_Date",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "issync",									"datatype" : "VARCHAR",						"objdefault" : 0},
			{"name" : "iscompleted",							"datatype" : "VARCHAR",						"objdefault" : 0},
		];
}; 

window.Customer_Aadhar_Details = Customer_Aadhar_Details;

