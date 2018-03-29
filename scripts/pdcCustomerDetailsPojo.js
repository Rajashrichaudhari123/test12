/**
 * PdcCustomerPojo.js
 * @author CloudPact Technologies
 * @description : This script is used for storing customer data into local db.
 **/
var PDC_Customer_DetailsTableName = "PDC_Customer_Details";
// Constructor
function PDC_Customer_Details(obj){
	var columns = [];
	var tablename = PDC_Customer_DetailsTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = PDC_Customer_Details.getColumns();
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
PDC_Customer_Details.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(PDC_Customer_DetailsTableName,this).execute(success_callback,failure_callback);
};

PDC_Customer_Details.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + this.Application_Number + "'");
	PDC_Customer_Details.dbHelper.Delete(PDC_Customer_DetailsTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

PDC_Customer_Details.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(PDC_Customer_DetailsTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
PDC_Customer_Details.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(PDC_Customer_DetailsTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

PDC_Customer_Details.alterTable = function(columns, success_callback,failure_callback){
	dbHelper.AlterTable(PDC_Customer_DetailsTableName, columns).execute(success_callback,failure_callback);
};

PDC_Customer_Details.multipleInsert = function(entity, success_callback,failure_callback,inc_cb){
	dbHelper.MultiInsert(PDC_Customer_DetailsTableName, getKeyColums(this.getColumns()), entity, success_callback, inc_cb);
};

PDC_Customer_Details.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(PDC_Customer_DetailsTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

PDC_Customer_Details.Select = function(success_callback,failure_callback){
	dbHelper.Select(PDC_Customer_DetailsTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PDC_Customer_Details.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Select(PDC_Customer_DetailsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PDC_Customer_Details.SelectWithFilterAppNo = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Select(PDC_Customer_DetailsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PDC_Customer_Details.SelectedDraftedApp = function(filter,success_callback,failure_callback){
	dbHelper.Select(PDC_Customer_DetailsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};

PDC_Customer_Details.selectDataToSync = function(appno,readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'"),
			new window.DB.Filter.equal("Application_Number", "'" + appno + "'")
	]);
	dbHelper.Select(PDC_Customer_DetailsTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new PDC_Customer_Details(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

PDC_Customer_Details.selectUnsyncedData = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(PDC_Customer_DetailsTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new PDC_Customer_Details(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

PDC_Customer_Details.countProposalsToSync = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(PDC_Customer_DetailsTableName,['count(*) as count'],false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		readSuccess(response);
	},readFailure);
};

PDC_Customer_Details.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PDC_Customer_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PDC_Customer_Details.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PDC_Customer_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PDC_Customer_Details.updateDocsUploaded = function(appNo,success_callback,failure_callback) {
	/*dbHelper.Update(PDC_Customer_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);*/
	dbHelper.db.executeSql("update PDC_Customer_Details set DOCS_UPLOADED = 'Y' where Application_Number = '" + appNo + "'", success_callback,failure_callback);
};

PDC_Customer_Details.SelectWithFilterCondition = function(filter,success_callback,failure_callback, rows){
	dbHelper.Select(PDC_Customer_DetailsTableName, rows,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};


PDC_Customer_Details.getColumns = function(){
	return  [
			{"name" : "Txn_Id",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "OTH_UNIQUE_Id",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Device_Id",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Device_Name",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Data_Source",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "BI_REFNUMBER",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Application_Number",						"datatype" : "VARCHAR PRIMARY KEY",			"objdefault" :''},
			{"name" : "Application_Date",						"datatype" : "DATETIME",					"objdefault" :''},
			{"name" : "LA_Salutation",							"datatype" : "VARCHAR",						"objdefault" :''},
		    {"name" : "LA_Aadharno",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "LA_Name",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "LA_FatherName",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_Gender",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_DOB",									"datatype" : "DATETIME",					"objdefault" : ''},
			{"name" : "LA_MaritalStatus",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_Education",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_Education_OTH",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_AnnualIncome",						"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "LA_INCOMESOURCE",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_INSURANCEPURPOSE",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_BankAccountNumber",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_Bank",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_Branch",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_BANKACCPROOF",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_IFSCCode",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_Nationality",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_Nationality_OTH",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_EMPLOYEECODE",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_Occupation",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_IsRelianceEmp",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_Occupation_OTH",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_JOBDESC",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_AddressProof",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_IdentityProof",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_AgeProof",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_IncomeProof",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_PANCardNumber",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_CO",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_AddressLine1",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_AddressLine2",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_AddressLine3",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_City",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_State",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_Pincode",								"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "LA_Mobileno",							"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "LA_EmailId",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_LandLineno",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_Perm_Add_Indicator",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_Prem_AddressLine1",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_Prem_AddressLine2",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_Prem_AddressLine3",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_Prem_City",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_Prem_State",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_Prem_Pincode",						"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "IS_LA_PR_SAME",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_Salutation",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_Aadharno",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_Name",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_FatherName",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_Gender",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_DOB",									"datatype" : "DATETIME",					"objdefault" : ''},
			{"name" : "PR_MaritalStatus",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_Education",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_Education_OTH",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_AnnualIncome",						"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "PR_INCOMESOURCE",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_INSURANCEPURPOSE",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_BankAccountNumber",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_Bank",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_Branch",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_BANKACCPROOF",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_IFSCCode",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_Nationality",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_Nationality_OTH",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_IsRelianceEmp",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_EMPLOYEECODE",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_Occupation",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_Occupation_OTH",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_JOBDESC",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_AddressProof",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_IdentityProof",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_AgeProof",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_IncomeProof",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_PANCardNumber",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_LA_Relationship",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_CO",									"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_LA_AddressSame",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_AddressLine1",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_AddressLine2",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_AddressLine3",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_City",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_State",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_Pincode",								"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "PR_Mobileno",							"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "PR_EmailId",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_LandLineno",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_Perm_Add_Indicator",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_Prem_AddressLine1",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_Prem_AddressLine2",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_Prem_AddressLine3",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_Prem_City",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_Prem_State",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_Prem_Pincode",						"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "NOM_Salutation",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_Name",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_Gender",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_DOB",								"datatype" : "DATETIME",					"objdefault" : ''},
			{"name" : "NOM_LA_Relationship",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_IdentityProof",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_LA_AddressSame",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_AddressLine1",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_AddressLine2",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_AddressLine3",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_City",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_State",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_Pincode",							"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "NOM_Mobileno",							"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "NOM_EmailId",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_LandLineno",							"datatype" : "VARCHAR",						"objdefault" : ''},
			
			{"name" : "NOM_PR_SAME",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_Salutation_1",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_Name_1",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_Gender_1",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_DOB_1",								"datatype" : "DATETIME",					"objdefault" : ''},
			{"name" : "NOM_LA_Relationship_1",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_AddressProof_1",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_IdentityProof_1",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_LA_AddressSame_1",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_AddressLine1_1",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_AddressLine2_1",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_AddressLine3_1",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_City_1",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_State_1",							"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "NOM_Pincode_1",							"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "NOM_Mobileno_1",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_EmailId_1",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_LandLineno_1",						"datatype" : "VARCHAR",						"objdefault" : ''},
			
			{"name" : "NOM_Salutation_2",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_Name_2",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_Gender_2",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_DOB_2",								"datatype" : "DATETIME",					"objdefault" : ''},
			{"name" : "NOM_LA_Relationship_2",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_AddressProof_2",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_IdentityProof_2",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_LA_AddressSame_2",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_AddressLine1_2",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_AddressLine2_2",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_AddressLine3_2",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_City_2",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_State_2",							"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "NOM_Pincode_2",							"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "NOM_Mobileno_2",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_EmailId_2",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_LandLineno_2",						"datatype" : "VARCHAR",						"objdefault" : ''},
			
			{"name" : "NOM_Salutation_3",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_Name_3",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_Gender_3",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_DOB_3",								"datatype" : "DATETIME",					"objdefault" : ''},
			{"name" : "NOM_LA_Relationship_3",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_AddressProof_3",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_IdentityProof_3",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_LA_AddressSame_3",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_AddressLine1_3",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_AddressLine2_3",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_AddressLine3_3",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_City_3",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_State_3",							"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "NOM_Pincode_3",							"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "NOM_Mobileno_3",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_EmailId_3",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "NOM_LandLineno_3",						"datatype" : "VARCHAR",						"objdefault" : ''},
			
			{"name" : "APP_Salutation",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_Name",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_Gender",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_DOB",								"datatype" : "DATETIME",					"objdefault" : ''},
			{"name" : "APP_NOM_Relationship",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_NOM_AddressSame",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_AddressLine1",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_AddressLine2",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_AddressLine3",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_City",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_State",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_Pincode",							"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "APP_Mobileno",							"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "APP_EmailId",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_LandLineno",							"datatype" : "VARCHAR",						"objdefault" : ''},
			
			{"name" : "APP_Salutation_1",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_Name_1",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_Gender_1",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_DOB_1",								"datatype" : "DATETIME",					"objdefault" : ''},
			{"name" : "APP_NOM_Relationship_1",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_NOM_AddressSame_1",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_AddressLine1_1",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_AddressLine2_1",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_AddressLine3_1",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_City_1",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_State_1",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_Pincode_1",							"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "APP_Mobileno_1",							"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "APP_EmailId_1",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_LandLineno_1",						"datatype" : "VARCHAR",						"objdefault" : ''},
			
			{"name" : "APP_Salutation_2",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_Name_2",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_Gender_2",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_DOB_2",								"datatype" : "DATETIME",					"objdefault" : ''},
			{"name" : "APP_NOM_Relationship_2",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_NOM_AddressSame_2",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_AddressLine1_2",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_AddressLine2_2",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_AddressLine3_2",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_City_2",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_State_2",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_Pincode_2",							"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "APP_Mobileno_2",							"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "APP_EmailId_2",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_LandLineno_2",						"datatype" : "VARCHAR",						"objdefault" : ''},
			
			{"name" : "APP_Salutation_3",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_Name_3",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_Gender_3",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_DOB_3",								"datatype" : "DATETIME",					"objdefault" : ''},
			{"name" : "APP_NOM_Relationship_3",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_NOM_AddressSame_3",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_AddressLine1_3",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_AddressLine2_3",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_AddressLine3_3",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_City_3",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_State_3",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_Pincode_3",							"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "APP_Mobileno_3",							"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "APP_EmailId_3",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "APP_LandLineno_3",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Parent_Application_Number",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_ECSFORM_YN",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "LA_PHOTOID",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PR_ECSFORM_YN",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "DOCS_UPLOADED",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Login_By",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Advisor_Code",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Advisor_Name",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Advisor_Place",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Txn_Date",								"datatype" : "DATETIME",					"objdefault" : ''},
			{"name" : "iscompleted",							"datatype" : "VARCHAR(10)",					"objdefault" : '0'},
			{"name" : "issync",									"datatype" : "VARCHAR(10)",					"objdefault" : '0'},
			{"name" : "Extended_Attributes",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Child_Name",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Child_DOB",								"datatype" : "DATETIME",					"objdefault" :''},
			{"name" : "Child_Proposar_Relation",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Child_Gender",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Insured_Spouse_Name",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Insured_Spouse_DOB",						"datatype" : "DATETIME",					"objdefault" :''},
			{"name" : "Insured_Spouse_Gender",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Insured_Father_Name",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Insured_Father_DOB",						"datatype" : "DATETIME",					"objdefault" :''},
			{"name" : "Insured_Father_Gender",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Insured_Mother_Name",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Insured_Mother_DOB",						"datatype" : "DATETIME",					"objdefault" :''},
			{"name" : "Insured_Mother_Gender",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Insured_FatherinLaw_Name",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Insured_FatherinLaw_DOB",				"datatype" : "DATETIME",					"objdefault" :''},
			{"name" : "Insured_FatherinLaw_Gender",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Insured_MotherinLaw_Name",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Insured_MotherinLaw_DOB",				"datatype" : "DATETIME",					"objdefault" :''},
			{"name" : "Insured_MotherinLaw_Gender",				"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "Insured_EldestChild_Name",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Insured_EldestChild_DOB",				"datatype" : "DATETIME",					"objdefault" :''},
			{"name" : "Insured_EldestChild_Gender",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Insured_Second_EldestChild_Name",		"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Insured_Second_EldestChild_DOB",			"datatype" : "DATETIME",					"objdefault" :''},
			{"name" : "Insured_Second_EldestChild_Gender",		"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Insured_Third_EldestChild_Name",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Insured_Third_EldestChild_DOB",			"datatype" : "DATETIME",					"objdefault" :''},
			{"name" : "Insured_Third_EldestChild_Gender",		"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Insured_Fourth_EldestChild_Name",		"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Insured_Fourth_EldestChild_DOB",			"datatype" : "DATETIME",					"objdefault" :''},
			{"name" : "Insured_Fourth_EldestChild_Gender",		"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Additional_Param1",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Additional_Param2",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Additional_Param3",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Additional_Param4",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Additional_Param5",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "MICR_Code",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Proof_of_contactability_Proposor",		"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Proof_of_contactability_LA",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Investment_Option",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "AnnuityPayout_Option",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Annuity_Payout_Mode",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Life_Annuity_Guaranteed_For",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Annuity_Payments_By",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "UCIUCIC_No",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "LEAD_REF_No",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "SP_ID",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Add_Col1",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Add_Col2",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Add_Col3",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Add_Col4",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Add_Col5",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "PIVC_Video_YN",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "LA_EKYC_Aadhar_YN",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "PR_EKYC_Aadhar_YN",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Super_Track_Login",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "LA_SpouseName",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "PR_SpouseName",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "LA_MotherName",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "PR_MotherName",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "LA_MaritalStatusOther",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "PR_MaritalStatusOther",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "LA_Citizenship",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "PR_Citizenship",							"datatype" : "VARCHAR",						"objdefault" :''},	
			{"name" : "LA_ResidentialStatus",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "PR_ResidentialStatus",					"datatype" : "VARCHAR",						"objdefault" :''},	
			{"name" : "LA_OccupationType",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "PR_OccupationType",						"datatype" : "VARCHAR",						"objdefault" :''},	
			{"name" : "LA_OccupationSubOptions",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "PR_OccupationSubOptions",				"datatype" : "VARCHAR",						"objdefault" :''},	
			{"name" : "LA_IDProof",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "PR_IDProof",								"datatype" : "VARCHAR",						"objdefault" :''},	
			{"name" : "LA_ExpiryDate",							"datatype" : "DATETIME",					"objdefault" :''},
			{"name" : "PR_ExpiryDate",							"datatype" : "DATETIME",					"objdefault" :''},
			{"name" : "LA_IdentificationNumber",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "PR_IdentificationNumber",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "KYC_Identifier",							"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "LA_Employee_Designation",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "LA_Company_Name",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "PR_Employee_Designation",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "PR_Company_Name",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Can_Date",								"datatype" : "DATETIME",					"objdefault" :''},
			{"name" : "Can_Reason_Code",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Can_Reason_Remarks",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Can_UserID",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Customer_Video_YN",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CustomerVideo",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "PIVCVideo",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "user_Role",								"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "FLS_SAP_Code",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Branch_Code",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Partner_Employee_Code",					"datatype" : "VARCHAR",						"objdefault" : ''}
		];
}; 

window.PDC_Customer_Details = PDC_Customer_Details;