/**
 * EmployeeAddressServerScript.js
 * @author CloudPact Technologies
 * @description : This script is for creating connection to server database and fetching data.
 **/

var results;
var statement;
var action =""+$request.getParameter("action");
var resp = "";
var rows = [];
var columnsObj = {};

try{
	var connectionUrl = "jdbc:sqlserver://10.126.239.187:1981;" + "databaseName=eOPS_Staging;user=pdcuser;password=pdc@123";
	java.lang.Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
	connection = java.sql.DriverManager.getConnection(connectionUrl);
	//if(action == "select"){
		var sap_code = $request.getParameter("sap_code");
		var queryString = "select MT.Location_Code,AL.Address_Line1,AL.Address_Line2,AL.Address_Line3,AL.Location_Name,AL.Lattitude_Node,AL.Logititude_Node from Attendance_Emp_Loc_Mapping MT right join Attendance_Location AL on MT.Location_Code = AL.Location_Code where MT.SAP_Code ='"+sap_code+"'";
		
		statement = connection.createStatement();
		results = statement.executeQuery(queryString);
		while(results.next()){
			columnsObj = {
				Location_Code : ""+results.getString("Location_Code"),
				Address_Line1 : ""+results.getString("Address_Line1"),
				Address_Line2 : ""+results.getString("Address_Line2"),
				Address_Line3 : ""+results.getString("Address_Line3"),
				Location_Name : ""+results.getString("Location_Name"),
				Lattitude_Node: ""+results.getString("Lattitude_Node"),
				Logititude_Node: ""+results.getString("Logititude_Node"),
			};
			rows.push(columnsObj);
		}
		resp = {"code":103,"msg":"Query successful","entities":rows,"count":rows.length};
		connection.close();
		statement.close();
		results.close();
	//}
}
catch (e) {
	//TODO send error response
		if(connection != null){
			connection.close();
			statement.close();
			//results.close();
		}
		resp = {"code":501,"msg":"Server Error: "+e};
}

$response.addHeader("Content-Type","application/json");
$response.getWriter().println(JSON.stringify(resp));
