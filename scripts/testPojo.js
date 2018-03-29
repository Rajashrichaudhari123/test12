var PDC_Customer_DetailsTableName = "TestPojo";
// Constructor
function TestPojo(obj){
	var columns = TestPojo.getColumns();
	var columns = [];
	var tablename = PDC_Customer_DetailsTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = TestPojo.getColumns();
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
TestPojo.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(PDC_Customer_DetailsTableName,this).execute(success_callback,failure_callback);
};

TestPojo.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + this.Application_Number + "'");
	PDC_Customer_Details.dbHelper.Delete(PDC_Customer_DetailsTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

TestPojo.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(PDC_Customer_DetailsTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
TestPojo.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(PDC_Customer_DetailsTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

TestPojo.alterTable = function(columns, success_callback,failure_callback){
	dbHelper.AlterTable(PDC_Customer_DetailsTableName, columns).execute(success_callback,failure_callback);
};

TestPojo.multipleInsert = function(entity, success_callback,failure_callback,inc_cb){
	dbHelper.MultiInsert(PDC_Customer_DetailsTableName, getKeyColums(this.getColumns()), entity, success_callback, inc_cb);
};

TestPojo.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(PDC_Customer_DetailsTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

TestPojo.Select = function(success_callback,failure_callback){
	dbHelper.Select(PDC_Customer_DetailsTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

TestPojo.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Select(PDC_Customer_DetailsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

TestPojo.SelectWithFilterAppNo = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("Application_Number", "'" + a + "'");
	dbHelper.Select(PDC_Customer_DetailsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

TestPojo.SelectedDraftedApp = function(filter,success_callback,failure_callback){
	dbHelper.Select(PDC_Customer_DetailsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		success_callback(response);
	},failure_callback);
};

TestPojo.selectDataToSync = function(appno,readSuccess,readFailure){
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

TestPojo.selectUnsyncedData = function(readSuccess,readFailure){
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

TestPojo.countProposalsToSync = function(readSuccess,readFailure){
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

TestPojo.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PDC_Customer_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

TestPojo.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PDC_Customer_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

TestPojo.updateDocsUploaded = function(appNo,success_callback,failure_callback) {
	/*dbHelper.Update(PDC_Customer_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);*/
	dbHelper.db.executeSql("update PDC_Customer_Details set DOCS_UPLOADED = 'Y' where Application_Number = '" + appNo + "'", success_callback,failure_callback);
};

TestPojo.SelectWithFilterCondition = function(filter,success_callback,failure_callback, rows){
	dbHelper.Select(PDC_Customer_DetailsTableName, rows,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};


TestPojo.getColumns = function(){
	return [
			{"name" : "Name",									"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Age",							"datatype" : "VARCHAR",						"objdefault" :''},
			{"name" : "Gender",								"datatype" : "VARCHAR",						"objdefault" :''},
		];
}; 

window.TestPojo = TestPojo;