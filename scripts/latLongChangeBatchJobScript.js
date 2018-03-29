function loadLib(libName, projectName, libVar) {
	var lib = '' + $sm.readFile(libName, projectName, 1); //convert string from java (js object) to native js string
	if (lib) {
		this[libVar] = eval(lib);
	}
}
loadLib("shttpclient.js", "RlifeAssist", "HttpClient");

var header = {
		"Content-Type": "application/json"
	};
var rows =[];	
try{
	var connectionUrl = "jdbc:sqlserver://10.126.239.187:1981;" + "databaseName=eOPS_Staging;user=pdcuser;password=pdc@123";
	java.lang.Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
	connection = java.sql.DriverManager.getConnection(connectionUrl);
	var queryString = "select {fn CONCAT(Address_1, {fn CONCAT(Address_2,Address_3)})} as concataddress,Lead_Id from [eOPS_Staging].[dbo].[Lead_Information] where Is_Updated='0'";
	
	statement = connection.createStatement();
	results = statement.executeQuery(queryString);
	
	while(results.next()){
		columnsObj = {
			Lead_Id : ""+results.getString("Lead_Id"),
			Address : ""+results.getString("concataddress")
		};
		rows.push(columnsObj);
	}
		
	//$response.getWriter().println(JSON.stringify(rows));
	var finalResponse=[];
	for (var i = 0; i < rows.length ; i++){
		var hc = new HttpClient();
		if(rows[i].Address != ""){
			var lead_id = rows[i].Lead_Id;
			response = hc.get(encodeURI("https://maps.googleapis.com/maps/api/geocode/json?address="+ rows[i].Address + "&sensor=false&key=AIzaSyA17Ot8-x5wFKq-bSMyXLiKJkohp0zwu0Q")); 
			response = JSON.parse(response);
			for(var j=0;j<response.results.length;j++){
				var Lat = response.results[j].geometry.location.lat;
				var Long = response.results[j].geometry.location.lng;
			//	$response.getWriter().println(JSON.stringify("Lat"+Lat+",Long"+Long+",Lead_Id"+lead_id ));
				java.lang.System.out.println("********************************************Lat"+Lat+",Long"+Long+",Lead_Id"+lead_id);
				var updateQuery = "update [eOPS_Staging].[dbo].[Lead_Information] set From_Latitude = '"+Lat+"',From_Longitude = '"+Long+"',Is_Updated = '1' where Lead_Id = '"+lead_id+"'";
				java.lang.System.out.println("********************************Update Query***********************************"+updateQuery);
				java.lang.System.out.println("***********************************statement******************************"+statement);
				results = statement.execute(updateQuery);
			}
		}
	}
	$response.getWriter().println(JSON.stringify("Success"));
	connection.close();
	statement.close();
	results.close();
}
catch (e) {
	if(connection != null){
		connection.close();
		statement.close();
		//results.close();
	}
	resp = {"code":501,"msg":"Server Error: "+e};
	$response.getWriter().println(JSON.stringify(resp));
}
