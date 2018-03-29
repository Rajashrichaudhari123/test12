/**
 * pdcplanDetails.js
 * @author CloudPact Technologies
 * @description : This script is used for storing plan data into local db.
 **/
var PDC_Plan_DetailsTableName = "PDC_Plan_Details";
// Constructor
function PDC_Plan_Details(obj){
	var columns = [];
	var tablename = PDC_Plan_DetailsTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = PDC_Plan_Details.getColumns();
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
PDC_Plan_Details.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(PDC_Plan_DetailsTableName,this).execute(success_callback,failure_callback);
};

PDC_Plan_Details.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + this.Application_Number + "'");
	PDC_Plan_Details.dbHelper.Delete(PDC_Plan_DetailsTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

PDC_Plan_Details.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(PDC_Plan_DetailsTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
PDC_Plan_Details.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(PDC_Plan_DetailsTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

PDC_Plan_Details.alterTable = function(columns, success_callback,failure_callback){
	dbHelper.AlterTable(PDC_Plan_DetailsTableName, columns).execute(success_callback,failure_callback);
};

PDC_Plan_Details.multipleInsert = function(entity, success_callback,failure_callback,inc_cb){
	dbHelper.MultiInsert(PDC_Plan_DetailsTableName, getKeyColums(this.getColumns()), entity, success_callback, inc_cb);
};

PDC_Plan_Details.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(PDC_Plan_DetailsTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
	//	$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

PDC_Plan_Details.Select = function(success_callback,failure_callback){
	dbHelper.Select(PDC_Plan_DetailsTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PDC_Plan_Details.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Select(PDC_Plan_DetailsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PDC_Plan_Details.selectDataToSync = function(appno,readSuccess,readFailure){
	var filter = new DB.CompositeFilter(DB.CompositeFilter.AND, [
			new DB.Filter.equal("issync", "'0'"),
			new DB.Filter.equal("iscompleted", "'1'"),
			new window.DB.Filter.equal("Application_Number", "'" + appno + "'")
	]);
	dbHelper.Select(PDC_Plan_DetailsTableName,null,false)
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

PDC_Plan_Details.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PDC_Plan_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PDC_Plan_Details.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PDC_Plan_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PDC_Plan_Details.SelectWithFilterCondition = function(filter,success_callback,failure_callback,rows){
	dbHelper.Select(PDC_Plan_DetailsTableName, rows,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PDC_Plan_Details.getColumns = function(){
	return [
			{"name" : "Txn_Id",						"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "Application_Number",			"datatype" : "VARCHAR PRIMARY KEY",			"objdefault" :''},
			{"name" : "Application_Dt",				"datatype" : "DATETIME",					"objdefault" :''},
			{"name" : "Advisor_Code",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Advisor_Name",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "ProductCode",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "PLanCode",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "CombinationOFProducts",		"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "AGE_Proof",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "ECS_NonECS",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Total_InstPremium",			"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "Total_InstPremium_ST",		"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "PolicyTerm",					"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "PremiumPayingTerm",			"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "SumAssured",					"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "InstallmentPremium",			"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "InstallmentPremium_ST",		"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "RiderName_1",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "COVERAGECODEFORRIDER_1",		"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PolicyTerm_1",				"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "PremiumPayingTerm_1",		"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "SumAssured_1",				"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "InstallmentPremium_1",		"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "InstallmentPremium_1_ST",	"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "RiderName_2",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "COVERAGECODEFORRIDER_2",		"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PolicyTerm_2",				"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "PremiumPayingTerm_2",		"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "SumAssured_2",				"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "InstallmentPremium_2",		"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "InstallmentPremium_2_ST",	"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "RiderName_3",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "COVERAGECODEFORRIDER_3",		"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PolicyTerm_3",				"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "PremiumPayingTerm_3",		"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "SumAssured_3",				"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "InstallmentPremium_3",		"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "InstallmentPremium_3_ST",	"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "RiderName_4",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "COVERAGECODEFORRIDER_4",		"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PolicyTerm_4",				"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "PremiumPayingTerm_4",		"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "SumAssured_4",				"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "InstallmentPremium_4",		"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "InstallmentPremium_4_ST",	"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "RiderName_5",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "COVERAGECODEFORRIDER_5",		"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PolicyTerm_5",				"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "PremiumPayingTerm_5",		"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "SumAssured_5",				"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "InstallmentPremium_5",		"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "InstallmentPremium_5_ST",	"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "RiderName_6",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "COVERAGECODEFORRIDER_6",		"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PolicyTerm_6",				"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "PremiumPayingTerm_6",		"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "SumAssured_6",				"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "InstallmentPremium_6",		"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "InstallmentPremium_6_ST",	"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "RiderName_7",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "COVERAGECODEFORRIDER_7",		"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PolicyTerm_7",				"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "PremiumPayingTerm_7",		"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "SumAssured_7",				"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "InstallmentPremium_7",		"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "InstallmentPremium_7_ST",	"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "LifeCorporateBond_Fund1",	"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "LifeMoneyMarket_Fund1",		"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "LifeEquity_Fund3",			"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "LifeBalanced_Fund1",			"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "LifePureEquity_Fund2",		"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "PensionSmart_Fund1",			"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "Systematic_TransaferPlan",	"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Premium_Payment_type",		"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Death_BenifitOption",		"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Premium_Frequency",			"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Mode_Deposit",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "BI_XML",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Txn_Date",					"datatype" : "DATETIME",					"objdefault" : ''},
			{"name" : "iscompleted",				"datatype" : "VARCHAR(10)",					"objdefault" : '0'},
			{"name" : "issync",						"datatype" : "VARCHAR(10)",					"objdefault" : '0'},
			{"name" : "Extended_Attributes",		"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Rider_Total_InstPrem",		"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "Rider_Total_InstPrem_ST",	"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "MakeinIndia_Fund",			"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "Extra_1_Fund",				"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "Extra_2_Fund",				"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "Extra_3_Fund",				"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "Investment_Option",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "AnnuityPayout_Option",		"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Annuity_Payout_Mode",		"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Life_Annuity_Guaranteed_For","datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Annuity_Payments_By",		"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Cover_Option",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Eligible_for_EmpDiscount",	"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Quotation_No",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Coverage_Code",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Base_Annualised_Premium",	"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "InstallmentPremium_BasePlan","datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "InstallmentPremium_BasePlan_ST","datatype" : "NUMBER",					"objdefault" :''},
			{"name" : "NSAP_InstallmentPremium",	"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "NSAP_InstallmentPremium_ST",	"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "Maturity_Benefit_PayoutOption","datatype" : "VARCHAR",					"objdefault" :''},
			{"name" : "Premium_Payment_Option",		"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Purchase_Price",				"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "Purchase_Price_ST",			"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "Additional_Param1",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Additional_Param2",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Additional_Param3",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Additional_Param4",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Additional_Param5",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "RiderName7",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "PolicyTerm7",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "PremiumPayingTerm7",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "SumAssured7",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "InstallmentPremium7",		"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "MortalityClass_Rider7",		"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "SID",						"datatype" : "VARCHAR",						"objdefault" :''}
		];
};

window.PDC_Plan_Details = PDC_Plan_Details;