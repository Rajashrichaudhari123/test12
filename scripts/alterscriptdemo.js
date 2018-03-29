
$m.juci.addDataset("tableinfo",[]);
var tablename = "saveNewLead";

$m.onData(function(event){
	getAllSaveLeadData();
});

function getAllSaveLeadData(){
	utils.GetDbhelper(function(dbHelper){
		window['dbHelper'] = dbHelper;
		getTableInfo(tablename,function(res){
			$m.juci.dataset("tableinfo",res);			
		});
	});
}
function getTableInfo(tablename,callback){
	var query = "PRAGMA table_info("+tablename+")";
	dbHelper.db.executeSql(query,
		function(s){
			resultdata = s.rows;
			callback(resultdata);
		},
		function(f){
			$m.logError("\n Could not fetch table information for table --- "+tablename + "-- Reason :"+JSON.stringify(f));
			callback([]);
		}
	);
}