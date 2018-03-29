var uname = $request.getParameter("uname");
var fname = $request.getParameter("fname");
try {
	
	seriesArray = new String("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
	var connectionUrl = "jdbc:sqlserver://10.126.239.187:1981;" + "databaseName=eOPS_Staging;user=pdcuser;password=pdc@123";
	java.lang.Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
	connection = java.sql.DriverManager.getConnection(connectionUrl);	
	
	var query = "Select Max(Application_Number) as lastappno from PDC_ApplicationNo_Map";
	statement = connection.createStatement();
	rset = statement.executeQuery(query);
	var lastAppNo;
	if(rset.next())
		lastAppNo = rset.getString("lastappno");
	var appNo = lastAppNo.substring(2,lastAppNo.length());
	var currentSeriesCode = lastAppNo.substring(1, 2);
	//$response.getWriter().println(lastAppNo);
	var newapp = "";
	if(appNo.equals("999999")){
		newapp = "900000";
		var index = seriesArray.indexOf(currentSeriesCode);
		currentSeriesCode = seriesArray[index + 1];
	}
	//$response.getWriter().println(currentSeriesCode);
	var newAppNo;
	var firstApp;
	var secondAppNo;
	if(newapp.equals("900000")){
		newAppNo = "T"+ currentSeriesCode + (parseInt(newapp,10));
		firstapp = parseInt(newapp,10);
		secondAppNo = "T"+ currentSeriesCode + (parseInt(firstapp,10));
	}
	else {
	    newAppNo = "T"+ currentSeriesCode + (parseInt(appNo,10)+1);
	    firstapp = (parseInt(appNo,10)+1);
	    secondAppNo = "T"+ currentSeriesCode + (parseInt(firstapp,10)+1);
	}
//	$response.getWriter().println("FirstApp"+newAppNo);
//	$response.getWriter().println("secondApp"+secondAppNo);

	var appNo = lastAppNo.substring(2,lastAppNo.length());
	queryString = "INSERT INTO PDC_ApplicationNo_Map (Application_Number, Advisor_Code, BI_Session_ID) VALUES ('"+ newAppNo +"'," + uname +",'"+fname+"')";
	statement = connection.createStatement();
	insertResponse = statement.executeUpdate(queryString);
	//$response.getWriter().println("Firstresponse"+insertResponse);
	statement.close();

	
	secondQueryString = "INSERT INTO PDC_ApplicationNo_Map (Application_Number, Advisor_Code, BI_Session_ID,Parent_Application_Number) VALUES ('"+ secondAppNo +"'," + uname +",'"+fname+"','"+newAppNo+"')";
	statement = connection.createStatement();
	secondInsertResponse = statement.executeUpdate(secondQueryString);
	//$response.getWriter().println("secondResponse"+secondInsertResponse);
	var response = {
		"firstAppNo":newAppNo,
		"secondAppNo":secondAppNo
	};
	
	$response.getWriter().println(JSON.stringify(response));
	connection.close();
}catch (e) {
	e.printStackTrace();
}