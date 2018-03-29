var PDC_Video_DetailsTableName = "PDC_Video_Details";
// Constructor
function PDC_Video_Details(obj){
	var columns = [];
	var tablename = PDC_Video_DetailsTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = PDC_Video_Details.getColumns();
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
PDC_Video_Details.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(PDC_Video_DetailsTableName,this).execute(success_callback,failure_callback);
};

PDC_Video_Details.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + this.Application_Number + "'");
	PDC_Video_Details.dbHelper.Delete(PDC_Video_DetailsTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

PDC_Video_Details.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(PDC_Video_DetailsTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
PDC_Video_Details.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(PDC_Video_DetailsTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

PDC_Video_Details.alterTable = function(columns, success_callback,failure_callback){
	dbHelper.AlterTable(PDC_Video_DetailsTableName, columns).execute(success_callback,failure_callback);
};

PDC_Video_Details.multipleInsert = function(entity, success_callback,failure_callback,inc_cb){
	dbHelper.MultiInsert(PDC_Video_DetailsTableName, getKeyColums(this.getColumns()), entity, success_callback, inc_cb);
};


PDC_Video_Details.removeAll = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Delete(PDC_Video_DetailsTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

PDC_Video_Details.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(PDC_Video_DetailsTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
	//	$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

PDC_Video_Details.Select = function(success_callback,failure_callback){
	dbHelper.Select(PDC_Video_DetailsTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PDC_Video_Details.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Select(PDC_Video_DetailsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PDC_Video_Details.SelectWithFilterAppNo = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Select(PDC_Video_DetailsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PDC_Video_Details.SelectedDraftedApp = function(filter,success_callback,failure_callback){
	dbHelper.Select(PDC_Video_DetailsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};

PDC_Video_Details.selectDataToSync = function(appno,readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'"),
			new window.DB.Filter.equal("Application_Number", "'" + appno + "'")
	]);
	dbHelper.Select(PDC_Video_DetailsTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new PDC_Video_Details(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

PDC_Video_Details.selectCompleteDataToSync = function(readSuccess,readFailure){
	dbHelper.Select(PDC_Video_DetailsTableName,null,false)
	.addDescOrder("Application_Number")
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new PDC_Video_Details(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

PDC_Video_Details.selectUnsyncedData = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(PDC_Video_DetailsTableName,null,false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new PDC_Video_Details(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

PDC_Video_Details.updateSync_NEW = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PDC_Video_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PDC_Video_Details.countProposalsToSync = function(readSuccess,readFailure){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
			new window.DB.Filter.equal("issync", "'0'"),
			new window.DB.Filter.equal("iscompleted", "'1'")
	]);
	dbHelper.Select(PDC_Video_DetailsTableName,['count(*) as count'],false)
	.setFilter(filter)
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		readSuccess(response);
	},readFailure);
};

PDC_Video_Details.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PDC_Video_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PDC_Video_Details.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PDC_Video_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PDC_Video_Details.updateDocsUploaded = function(appNo,success_callback,failure_callback) {
	/*dbHelper.Update(PDC_Customer_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);*/
	dbHelper.db.executeSql("update PDC_Video_Details set DOCS_UPLOADED = 'Y' where Application_Number = '" + appNo + "'", success_callback,failure_callback);
};

PDC_Video_Details.SelectWithFilterCondition = function(filter,success_callback,failure_callback, rows){
	dbHelper.Select(PDC_Video_DetailsTableName, rows,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};


PDC_Video_Details.getColumns = function(){
	return [
			{"name" : "Txn_ID",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Application_Number",						"datatype" : "VARCHAR PRIMARY KEY",			"objdefault" :''},
			{"name" : "Selfi_Video_Path",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Personal_Video_Path",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Selfi_Video_Status",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Personal_Video_Status",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Selfi_Video_SyncStatus",					"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Personal_Video_SyncStatus",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Added_By",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Selfie_Camera_Available",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Added_On",								"datatype" : "DATETIME",					"objdefault" :''},
			{"name" : "PIVC_Medical_Qs_Ans_Flag",				"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Cust_Salutation",						"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Cust_Name",								"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Cust_Email_ID",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Cust_Mobile_Number",						"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Cust_Contact_Number",					"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Cust_Message",							"datatype" : "VARCHAR",						"objdefault" : ''},
			{"name" : "Scheduled_Date",							"datatype" : "DATETIME",					"objdefault" : ''},
			{"name" : "iscompleted",							"datatype" : "VARCHAR(10)",					"objdefault" : '0'},
			{"name" : "issync",									"datatype" : "VARCHAR(10)",					"objdefault" : '0'}
		];
}; 

window.PDC_Video_Details = PDC_Video_Details;