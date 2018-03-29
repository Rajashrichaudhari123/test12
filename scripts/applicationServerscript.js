/**
 * applicationServerScript.js
 * @author CloudPact Technologies
 * @description : This script is for creating connection to server database,generating application numbers and storing in server db.
 **/


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
	var newAppNo;
	if(newapp.equals("900000")){
		newAppNo = "T"+ currentSeriesCode + (parseInt(newapp,10));
	}
	else {
	    newAppNo = "T"+ currentSeriesCode + (parseInt(appNo,10)+1);
	}
	var appNo = lastAppNo.substring(2,lastAppNo.length());
	queryString = "INSERT INTO PDC_ApplicationNo_Map (Application_Number, Advisor_Code, BI_Session_ID) VALUES ('"+ newAppNo +"'," + uname +",'"+fname+"')";
	statement = connection.createStatement();
	insertResponse = statement.executeUpdate(queryString);
	$response.getWriter().println(newAppNo);
	connection.close();
}catch (e) {
	e.printStackTrace();
}