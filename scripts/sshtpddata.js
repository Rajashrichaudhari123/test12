/**
 * sshtpddata.js
 * @author CloudPact Technologies
 * @description : This script is used for creating server connections and firing get/post requests to server.
 **/
var results;
var resultString = "";
var action=""+$request.getParameter("action");
//var user = $request.getParameter("user");
var respJSON = "";

var SHData = [
		{"name" : "Txn_ID",						"datatype" : "NUMBER PRIMARY KEY",			"objdefault" : ''},
		{"name" : "ADVISORCODE",				"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "ADVISORSTATUS",				"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "ADVISORNAME",				"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "CSC_CODE",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "SM_STATUS",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "SM_EMPCODE",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "SM_NAME",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "DOJ",						"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "DESIGNATION_OF_LEADER",		"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "CHANNEL",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "LOCATION_CODE",				"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "LOCATION",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "CHANNEL_PARTNER",			"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "CHANNELPARTNER_NAME",		"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "COMPANY_UNITCODE",			"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "COMPANY_UNITNAME",			"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "BM_EMPCODE",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "BM_NAME",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "CM_EMPCODE",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "CM_NAME",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "RM_EMPCODE",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "RM_NAME",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "REGION",						"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "DIRECTMGRCODE",				"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "DIRECT_STATUS",				"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "DIRECT_NAME",				"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "DIRECT_TYPE",				"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "DIRECT_EMPCODE",				"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "COMPANY_LOCATION",			"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "COMPANY_LOCATION_DESC",		"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "ADVISORDESIGNTAION",		"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "ADVISORTYPE",				"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "CHANNEL_MST",				"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "CHANNEL_MST_NAME",			"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "FLAG",						"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "SERVPROVDINFO",			"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "ZM_EMPCODE",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "ZM_NAME",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "ZONE",						"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "AO_EMPCODE",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "AO_NAME",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "AREA",						"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "AOMGRCODE",					"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "CMCODE",						"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "CLUSTER_NAME",				"datatype" : "VARCHAR",						"objdefault" : ''},
		{"name" : "CMMGRCODE",					"datatype" : "VARCHAR",						"objdefault" : ''}
	];



function addRow(rs){
	var row = {};
	for(var c=0;c<SHData.length;c++){
		var col = SHData[c];
		index = col.datatype.indexOf("NUMBER");
		
		if(col.datatype.indexOf("NUMBER") === 0){
			row[col.name] = rs.getInt(col.name);
		}else if(col.datatype.indexOf("VARCHAR") === 0){
			row[col.name] = ""+rs.getString(col.name);
		}else if(col.datatype.indexOf("DATETIME") === 0){
			timestamp = ""+rs.getString(col.name);
			if (timestamp !== null)
				row[col.name] = timestamp;
		}
	}
	return row;
}

try{
	var connectionUrl = "jdbc:sqlserver://10.126.239.187:1981;" + "databaseName=eOPS_Staging;user=pdcuser;password=pdc@123";
	java.lang.Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
	connection = java.sql.DriverManager.getConnection(connectionUrl);
	
	if(action == "count"){
		var code = $request.getParameter("code");
		var codeCol = $request.getParameter("codeCol");
		var queryString = "select distinct count(*) from [eOPS_Staging].[dbo].[PDC_Sales_Hierachy_TPD_Data] where CHANNEL_PARTNER = '"+code+"'";
		statement = connection.createStatement();
		results = statement.executeQuery(queryString);
	
		while(results.next()){
			shCount = results.getInt(1);
		}
		respJSON = {"code":103,"msg":"Query successful","entities":[{"count":shCount}]}; 
		connection.close();

	}else if(action == "get"){
		var code = $request.getParameter("code");
		var codeCol = $request.getParameter("codeCol");
		var queryString = "select * from [eOPS_Staging].[dbo].[PDC_Sales_Hierachy_TPD_Data] where CHANNEL_PARTNER = '"+code+"'";
		statement = connection.createStatement();
		results = statement.executeQuery(queryString);
		
		var rows = [];
		while(results.next()){
		//	results.getString("SERVERPROVIDINFO");
			rows.push(addRow(results));
		}
		respJSON = {"code":103,"msg":"Query successful","entities":rows,"count":rows.length};
		connection.close();	
	}
} 
catch (e) {
	//TODO send error response
		respJSON = {"code":501,"msg":"Server Error: "+e};
}
//$response.addHeader("Content-Type","application/json");
$response.getWriter().println(JSON.stringify(respJSON));

