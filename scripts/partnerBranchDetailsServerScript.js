var results;
var resultString = "";

var respJSON = "";

var branchDetails = [
		{"name" : "Branch_Code",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Branch_Name",		"datatype" : "VARCHAR",			"objdefault" : ''},
		{"name" : "Partner",		"datatype" : "VARCHAR",			"objdefault" : ''}];

function addRow(rs){
	var row = {};
	for(var c=0;c<branchDetails.length;c++){
		var col = branchDetails[c];
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
	
	//var codeCol = $request.getParameter("codeCol");
	var queryString = "select * from [eOPS_Staging].[dbo].[Partner_Branch_Details]";
	statement = connection.createStatement();
	results = statement.executeQuery(queryString);

	var rows = [];
		while(results.next()){
			rows.push(addRow(results));
		}
	respJSON = {"code":103,"msg":"Query successful","entities":rows,"count":rows.length}; 
	connection.close();

} 
catch (e) {
	//TODO send error response
		respJSON = {"code":501,"msg":"Server Error: "+e};
}
//$response.addHeader("Content-Type","application/json");
$response.getWriter().println(JSON.stringify(respJSON));
