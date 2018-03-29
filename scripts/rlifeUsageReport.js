var uname = $request.getParameter("uname");
var currentversion = $request.getParameter("currentversion");
var updatedversion = 3.4;
var response = true;
try {
	var connectionUrl = "jdbc:sqlserver://10.126.239.187:1981;" + "databaseName=PDC;user=pdcuser;password=pdc@123";
	java.lang.Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
	connection = java.sql.DriverManager.getConnection(connectionUrl);	
		
	if(currentversion == updatedversion){
		response = true;
		var queryString = "Select * from PDC_User_logins where Login_Code = '" + uname + "' and App_VersionNo = '" + currentversion + "'";
		statement = connection.createStatement();
		rset = statement.executeQuery(queryString);
		var recordExisted = false;
		if(rset.next())
			recordExisted = true;
		if(!recordExisted){
			var dateValue = getTodayDateFormatted();
			var query = "update PDC_User_logins set App_VersionNo = '"+currentversion+"', App_Update_Date = '"+dateValue+"' where Login_Code = '"+uname+"'";
			statement = connection.createStatement();
			var res = statement.executeUpdate(query);	
		}		
	}else{
		response = false;
		var dateValue = getTodayDateFormatted();
		var query = "update PDC_User_logins set App_VersionNo = '"+currentversion+"', App_Update_Date = '"+dateValue+"' where Login_Code = '"+uname+"'";
		statement = connection.createStatement();
		var res = statement.executeUpdate(query);
	}
	var resultObject = {"res":response,"mandatory":true};
	$response.getWriter().println(JSON.stringify(resultObject));
	connection.close();
}catch (e) {
	e.printStackTrace();
}

function getTodayDateFormatted(){
	var date = new Date();
	var dateString, month = "", dt = "";
	if(date.getMonth() < 9)
		month = '0' + (date.getMonth()+1);
	else
		month = date.getMonth()+1;
	if(date.getDate() <= 9)
		dt = '0' + (date.getDate());
	else
		dt = date.getDate();
	dateString =  date.getFullYear() + "-" + month + '-' + dt;
	return dateString;
}