/**
 * sshdatasvc.js
 * @author CloudPact Technologies
 * @description : This script is used for creating server connections and firing get/post requests to server.
 **/
var results;
var resultString = "";
var action=""+$request.getParameter("action");

var respJSON = "";

var SHData = [
		{"name" : "Txn_ID",	"datatype" : "NUMBER PRIMARY KEY",			"objdefault" : ''},
		{"name" : "Adv_Emp_Code",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Adv_Emp_Name",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Channel",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Agent_Type",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "CSCCode",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Designation",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Business_Login_Code",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "SM_Code",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "SM_Name",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "BM_Code",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "BM_Name",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "RM_Code",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "RM_Name",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "ZM_Code",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "ZM_Name",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "AM_Code",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "AM_Name",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Effective_Date",		"datatype" : "DATETIME",			"objdefault" : ''},
		{"name" : "Terminated_On",		"datatype" : "DATETIME",			"objdefault" : ''},
		{"name" : "AgentStatus",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "SMStatus",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "BMStatus",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "RMStatus",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "ZMStatus",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "User_Type",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Additional_Information_1",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Additional_Information_2",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Additional_Information_3",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Additional_Information_4",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Additional_Information_5",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Inf_Updated_On",		"datatype" : "DATETIME",			"objdefault" : ''}
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
		var queryString = "select distinct count(*) from [eOPS_Staging].[dbo].[PDC_Sales_Hierachy_Data] where "+codeCol+" = '"+code+"'";
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
		var queryString = "select * from [eOPS_Staging].[dbo].[PDC_Sales_Hierachy_Data] where "+codeCol+" = '"+code+"'";
		statement = connection.createStatement();
		results = statement.executeQuery(queryString);
		
		var rows = [];
		while(results.next()){
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

