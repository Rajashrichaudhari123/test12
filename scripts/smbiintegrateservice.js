var results;
var resultString = "";
var fname = $request.getParameter("fname");
var planNo = "";
try {
	var connectionUrl = "jdbc:sqlserver://10.126.239.129:1981;" + "databaseName=RLIFECALCDB;user=sa;password=pass123$";
	java.lang.Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
	connection = java.sql.DriverManager.getConnection(connectionUrl);
	//var queryString = "SELECT * FROM RLIFECALCDB.INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME= 'Mobile_BI'";
	var queryString = "select * from [dbo].[Mobile_BI] where session ='"+fname+"'";
	statement = connection.createStatement();
	results = statement.executeQuery(queryString);
	//resultString += ""+results.getString("Session");
	while(results.next()){
		planNo = results.getString("Planno");
	}
	connection.close();
} 
catch (e) {
	e.printStackTrace();
}

$response.getWriter().println(planNo);