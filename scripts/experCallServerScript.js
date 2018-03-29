/**
 * applicationServerScript.js
 * @author CloudPact Technologies
 * @description : This script is for creating connection to server database,firing request to server.
 **/

var data = $request.getParameter("data");
var action = $request.getParameter("action");
var connectionUrl = "jdbc:sqlserver://10.126.239.187:1981;" + "databaseName=eOPS_Staging;user=pdcuser;password=pdc@123";
java.lang.Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
connection = java.sql.DriverManager.getConnection(connectionUrl);

var result;
var dataArr=[];
var columnObj={};
var response="";

function ProcessRequest(requestdata){
	var results = "FAIL";
	results = syncExpertCallData(requestdata);		
	return results;
}

function syncExpertCallData(syncData){
	var insertResponse = insertHelper("Expert_To_Call", syncData);
	return insertResponse;
}

function insertHelper(tablename, data){
	var baseQuery = "insert into " + tablename;
	var insertReponse = [];
	var insertQueries = [];
	data = JSON.parse(data);	
	if(data.length){
		for(var i=0;i<data.length;i++){
			var insertQuery = prepareInsertStatement(baseQuery, [data[i]]);
			insertReponse.push(getDataForQuery(insertQuery, true));		
			insertReponse.push(insertQuery);		
		}
	}
	return insertReponse;
}


function prepareInsertStatement(queryString, res, uname, nomod) {
    var finalvalue = "";
    var keys = "(";
    var obj = res[0];
    
    
    if(obj.issync){
    	delete obj.issync;	
    }
    var objKeys = Object.keys(obj);
    for (var key in objKeys) {
    	if(key != "issync"){
    		keys = keys + objKeys[key] + ",";	
    	}
    }
    keys = keys.substring(0, keys.length - 1);
    keys = keys + ") values";
    for (var i = 0; i < res.length; i++) {
        var result = "(";
        var obj = res[i];
        for (var key in objKeys) {
            var val = obj[objKeys[key]];
            var valType = typeof val;
            if (valType == "number" || valType == "boolean") {
                result = result + val + ",";
            } else {
                var find = "'";
                var re = new RegExp(find, 'g');
                if (objKeys[key] === "dob" || objKeys[key] === "ndob" || objKeys[key] === "proposalrecvdt" || objKeys[key] == "jdob") {
                    result = result + "to_date('" + val + "','DD/MM/YYYY')" + ",";
                } else {
                    if (val) {
                        val = val.replace(re, "''");
                    }
                    result = result + "'" + val + "',";
                }
            }
        }
        result = result.substring(0, result.length - 1);
        result = result + "),";
        finalvalue = finalvalue + result;
    }
    finalvalue = finalvalue.substring(0, finalvalue.length - 1);
    return queryString + keys + finalvalue;
}

function getDataForQuery(query, isUpdate){	
	statement = connection.createStatement();
	results = statement.executeUpdate(query);
	if(results == 1.0){
		result ={
			"code" :103,
			"Message" :"Query Successful",
			"rows" :results
		};
	}
	return result;
}

function sendResponse(result){
	connection.close();
	//statement.close();
	result = JSON.stringify(result); 
	$response.addHeader("Content-Type", "application/json");
	$response.getWriter().println(result);	
}

var response = ProcessRequest(data);
sendResponse(response);

