var PDC_Homepage_CountTableName = "PDC_Homepage_Count";
// Constructor
function PDC_Homepage_Count(obj){
	var columns = [];
	var tablename = PDC_Homepage_CountTableName+"_dbtableobject";
	if(window[tablename]){
	 	columns = window[tablename];
	}else{
		 columns = PDC_Homepage_Count.getColumns();
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
PDC_Homepage_Count.prototype.insert = function(success_callback,failure_callback){
	dbHelper.Insert(PDC_Cfr_DetailsTableName,this).execute(success_callback,failure_callback);
};

PDC_Homepage_Count.prototype.remove = function(success_callback,failure_callback){
	var filter = new DB.Filter.equal("CFR_CODE", "'" + this.CFR_CODE + "'");
	PDC_Cfr_Details.dbHelper.Delete(PDC_Cfr_DetailsTableName,this).setFilter(filter).execute(success_callback,failure_callback);
};

PDC_Homepage_Count.prototype.update = function(success_callback,failure_callback){
	dbHelper.Replace(PDC_Cfr_DetailsTableName,this).execute(success_callback,failure_callback);
};

// Static Helpers
PDC_Homepage_Count.createTable = function(success_callback,failure_callback){
	dbHelper.CreateTable(PDC_Cfr_DetailsTableName, this.getColumns(),true).execute(success_callback,failure_callback);
};

PDC_Homepage_Count.multipleInsert = function(entity, success_callback,failure_callback,inc_cb){
	dbHelper.MultiInsert(PDC_Cfr_DetailsTableName, getKeyColums(this.getColumns()), entity, success_callback ,function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

PDC_Homepage_Count.multipleReplace = function(entity,success_callback,failure_callback){
	dbHelper.MultiReplace(PDC_Cfr_DetailsTableName,getKeyColums(this.getColumns()), entity, success_callback, function inc_cb(tName, incrCounter, rowsInserted) {
		//$m.logInfo(tName + '---' + rowsInserted + 'record(s) inserted successfully');
	});
};

PDC_Homepage_Count.Select = function(success_callback,failure_callback){
	dbHelper.Select(PDC_Cfr_DetailsTableName, null,false).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PDC_Homepage_Count.SelectWithFilter = function(a,success_callback,failure_callback){
	var filter = new DB.Filter.equal("CFR_CODE", "'" + a + "'");
	dbHelper.Select(PDC_Cfr_DetailsTableName, null,false).setFilter(filter).execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		//$m.logInfo(JSON.stringify(response));
		success_callback(response);
	},failure_callback);
};

PDC_Homepage_Count.selectDataToSync = function(readSuccess,readFailure){
	var filter = new window.DB.Filter.equal("issync", "'0'");
	dbHelper.Select(PDC_Cfr_DetailsTableName,null,false)
	.setFilter(filter)
	.addDescOrder("APP_NO")
	.execute(function(response){
		if($m.isWeb()){
			response = JSON.parse(JSON.stringify(response));
		}
		var rows = [], resultsetLength = response.rows.length;
		for(var i=0; i<resultsetLength; i++){
			rows.push(new PDC_Cfr_Details(response.rows[i]));
		}
		readSuccess(rows);
	},readFailure);
};

PDC_Homepage_Count.updateSync = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PDC_Cfr_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};

PDC_Homepage_Count.updateIsCompleted = function(data,filter,success_callback,failure_callback) {
	dbHelper.Update(PDC_Cfr_DetailsTableName,data)
	.setFilter(filter)
	.execute(success_callback,failure_callback);
};


PDC_Homepage_Count.getColumns = function(){
	return [
			{"name" : "APP_NO",						"datatype" : "VARCHAR",						"objdefault" :""},
			{"name" : "Renewal_Count",				"datatype" : "VARCHAR",						"objdefault" :""},
			{"name" : "Application_Count",			"datatype" : "VARCHAR",						"objdefault" :""},
			{"name" : "Cfr_Count",					"datatype" : "VARCHAR",						"objdefault" :""},
			{"name" : "NewsUpdate",					"datatype" : "BLOB",						"objdefault" :""},
		
			{"name" : "Row_No",						"datatype" : "NUMBER",						"objdefault" :""},
			{"name" : "iscompleted",				"datatype" : "VARCHAR(10)",					"objdefault" :'0'},
			{"name" : "issync",						"datatype" : "VARCHAR(10)",					"objdefault" :'0'},
			{"name" : "Extended_Attributes",		"datatype" : "VARCHAR",						"objdefault" : ''}
		];
}; 

window.PDC_Homepage_Count = PDC_Homepage_Count;