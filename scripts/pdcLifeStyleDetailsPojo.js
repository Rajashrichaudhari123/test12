/**
 * pdcLifeStylePojo.js
 * @author CloudPact Technologies
 * @description : This script is used for storing life style data into local db.
 **/
var PDC_LifeStyle_DetailsTableName = "PDC_LifeStyle_Details";
// Constructor
function PDC_LifeStyle_Details(obj){
	var columns = [];
	var tablename = PDC_LifeStyle_DetailsTableName+"_dbtableobject";
	if(window[tablename]){
		columns = window[tablename];
	}else{
		columns = PDC_LifeStyle_Details.getColumns();
	}
	for(var i=0; i<columns.length; i++){
		if(typeof obj[columns[i].name] === "string"){
			obj[columns[i].name] = obj[columns[i].name].replace(/,/g , "");
		}
		if(columns[i].name == "issync" || columns[i].name == "iscompleted" ){
			this[columns[i].name] = obj[columns[i].name] ? obj[columns[i].name] : '0';
		}else if( columns[i].name== "EInsurance_Free"){
			this[columns[i].name] = obj[columns[i].name] ? obj[columns[i].name] : 'N';
		}else{
			this[columns[i].name] = obj[columns[i].name] ? obj[columns[i].name] : '';
		}	
	}
}

// Prototype methods
PDC_LifeStyle_Details.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(PDC_LifeStyle_DetailsTableName,this).execute(success_callback,failure_callback);
};

PDC_LifeStyle_Details.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + this.Application_Number + "'");
	PDC_LifeStyle_Details.dbHelper.Delete(PDC_LifeStyle_DetailsTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

PDC_LifeStyle_Details.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(PDC_LifeStyle_DetailsTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
PDC_LifeStyle_Details.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(PDC_LifeStyle_DetailsTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

PDC_LifeStyle_Details.alterTable = function(columns, success_callback,failure_callback){
	dbHelper.AlterTable(PDC_LifeStyle_DetailsTableName, columns).execute(success_callback,failure_callback);
};

PDC_LifeStyle_Details.multipleInsert = function(entity, success_callback,failure_callback,inc_cb){
	dbHelper.MultiInsert(PDC_LifeStyle_DetailsTableName, getKeyColums(this.getColumns()), entity, success_callback, inc_cb);
};

PDC_LifeStyle_Details.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(PDC_LifeStyle_DetailsTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

PDC_LifeStyle_Details.Select = function(success_callback,failure_callback){
	dbHelper.Select(PDC_LifeStyle_DetailsTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PDC_LifeStyle_Details.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Select(PDC_LifeStyle_DetailsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PDC_LifeStyle_Details.selectDataToSync = function(appno,readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'"),
			new window.DB.Filter.equal("Application_Number", "'" + appno + "'")
	]);
	dbHelper.Select(PDC_LifeStyle_DetailsTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new PDC_LifeStyle_Details(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

PDC_LifeStyle_Details.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PDC_LifeStyle_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PDC_LifeStyle_Details.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PDC_LifeStyle_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PDC_LifeStyle_Details.SelectWithFilterCondition = function(filter,success_callback,failure_callback,rows){
	dbHelper.Select(PDC_LifeStyle_DetailsTableName, rows,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PDC_LifeStyle_Details.getColumns = function(){
	return [
			{"name" : "Txn_Id",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Application_Number",						"datatype" : "VARCHAR PRIMARY KEY",			"objdefault" :''},
			{"name" : "FHistory_FamilyDied_YN",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Existing_LifeInsurance_Cover_YN",		"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "ParentInsuranceDetails_SA",				"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "NameoftheHusbandParent",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "TotalSAontheHusband",					"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "QsLS_26_HazardousOccupation_YN",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_26_HazardousOccupation_Remarks",	"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_27_TravelOutsideIndia_YN",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_27_TravelOutsideIndia_Country",		"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_27_TravelOutsideIndia_Purpose",		"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_27_TravelOutsideIndia_Duration",	"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "QsLS_28a_Smoke_YN",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28a_Smoke_Remarks",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28a_Smoke_Cigarettes_YN",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28a_Smoke_Cigarettes_Qty",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28a_Smoke_Cigarettes_Duration",		"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28a_Smoke_ECigarettes_YN",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28a_Smoke_ECigarettes_Qty",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28a_Smoke_ECigarettes_Duration",	"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28a_Smoke_Beedi_YN",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28a_Smoke_Beedi_Qty",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28a_Smoke_Beedi_Duration",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28a_Smoke_Chew_YN",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28a_Smoke_Chew_Qty",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28a_Smoke_Chew_Duration",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28a_Smoke_Gutka_YN",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28a_Smoke_Gutka_Qty",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28a_Smoke_Gutka_Duration",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28a_Smoke_OTH_YN",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28a_Smoke_OTH_Duration",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28a_Smoke_OTH_QTY",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28b_Alcohol_Consume_YN",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28b_Alcohol_Remarks",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28b_Alcohol_Beer_YN",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28b_Alcohol_Beer_Qty",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28b_Alcohol_Beer_Duration",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28b_Alcohol_Wine_YN",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28b_Alcohol_Wine_Qty",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28b_Alcohol_Wine_Duration",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28b_Alcohol_HardLiquor_YN",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28b_Alcohol_HardLiquor_Qty",		"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "QsLS_28b_Alcohol_HardLiquor_Duration",	"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "QsLS_28b_Alcohol_OTH_YN",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "QsLS_28b_Alcohol_OTH_Duration",			"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "QsLS_28b_Alcohol_OTH_QTY",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "QsLS_29_Height_Feet",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "QsLS_29_Height_Inches",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "QsLS_29_Weight_Kg",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "QsLS_29_Height_CM",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "QsLS_30_Medication_Drug_YN",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "QsLS_30_Medication_Drug_Remarks",		"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "QsLS_31_CongenitalBirthDefect_YN",		"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "QsLS_31_CongenitalBirthDefect_Remarks",	"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "QsLS_32_MedicalAilgment_YN",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "QsLS_32_MedicalAilgment_Remarks",		"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "QsLS_33_SurgeryPlanned_YN",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "QsLS_33_SurgeryPlanned_Remarks",			"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "QsLS_34_SufferedDrugsAlcohol_YN",		"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "QsLS_34_SufferedDrugsAlcohol_Remarks",	"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "QsLS_35_Pregnant_YN",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "QsLS_35_Pregnant_Remarks",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "QsLS_35_Pregnant_ExpDeliveryDT",			"datatype" : "DATETIME",					"objdefault" : ''},
			{"name" : "QsLS_35_Pregnant_Duration",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "PoliticallyExposedPerson_YN",			"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Receive_Electronic_Communication_YN",	"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Ins_Repository_YN",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Ins_Repository_Type",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Ins_Repository_AccountNumber",			"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Ins_Account_YN",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Undergo_Medical_YN",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Authorize_RLIC_Calls_YN",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Witness_Name",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Witness_MobileNO",						"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "Witness_Date",							"datatype" : "DATETIME",					"objdefault" : ""},
			{"name" : "Witness_Address_Line1",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Witness_Address_Line2",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Witness_Address_Line3",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Witness_Address_City",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Witness_Address_State",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Witness_Address_PinCode",				"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "Vernacular_declaration_YN",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Declarant_Name",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Declarant_Place",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Declarant_Date",							"datatype" : "DATETIME",					"objdefault" : ""},
			{"name" : "CFReport_1_Met_PR_LA_YN",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "CFReport_2_Relatedto_LA_YN",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "CFReport_2_Relatedto_LARelationship",	"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "CFReport_3_LADisability_YN",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "CFReport_3_LADisability_Remarks",		"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "CFReport_4_FinancialStanding_YN",		"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "CFReport_4_FinancialStanding_Income",	"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "CFReport_5_IncomeVerified_YN",			"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "CFReport_5_IncomeVerified_Type",			"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "CFReport_6_AgeProofVerified_YN",			"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "CFReport_7_LAGoodHealth_YN",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "CFReport_7_LAGoodHealth_Remarks",		"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "CFReport_8_LongKnown_Years",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "CFReport_8_LongKnown_Mnths",				"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "SM_FLS_MobileNo",						"datatype" : "NUMBER",						"objdefault" : ''},
			{"name" : "Txn_Date",								"datatype" : "DATETIME",					"objdefault" : ''},
			{"name" : "iscompleted",							"datatype" : "VARCHAR(10)",					"objdefault" : '0'},
			{"name" : "issync",									"datatype" : "VARCHAR(10)",					"objdefault" : '0'},
			{"name" : "Extended_Attributes",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "EInsurance_Free",						"datatype" : "VARCHAR",						"objdefault" : 'N'},
		    {"name" : "Vernacular_Language",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Vernacular_Declarant_Name",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Vernacular_Declarant_MobileNo",			"datatype" : "NUMBER",						"objdefault" :''},
			{"name" : "Vernacular_Declarant_Date",				"datatype" : "DATETIME",					"objdefault" :''},
			{"name" : "Vernacular_Declarant_Address1",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Vernacular_Declarant_Address2",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Vernacular_Declarant_Address3",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Vernacular_Declarant_City",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Vernacular_Declarant_State",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Vernacular_Declarant_Pincode",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Vernacular_Declarant_EmailId",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Additional_Param1",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Additional_Param2",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Additional_Param3",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Additional_Param4",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Additional_Param5",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Authorize_YN",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "FATCA_YN",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Residence_Tax_outside_India_YN",			"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Country_of_Birth",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Place_of_birth",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Nationality",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Country_countries_of_TaxResidency",		"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Address_jurisdiction_TaxResidence",		"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "TIN_Functional_equivalent_Number",		"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "TIN_Functional_equivalentNo_IssuingCountry",	"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Validity_docevidence_provided",			"datatype" : "VARCHAR",						"objdefault" :''}
		];
};  

window.PDC_LifeStyle_Details = PDC_LifeStyle_Details;