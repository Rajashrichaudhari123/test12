var planCode = $request.getParameter("planCode");
try {
	var connectionUrl = "jdbc:sqlserver://10.126.239.187:1981;" + "databaseName=eOPS_Staging;user=pdcuser;password=pdc@123";
	java.lang.Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
	connection = java.sql.DriverManager.getConnection(connectionUrl);
	var queryString = "select LIFEASIA_PRODUCTCODE1,SolutionFlag,PLAN_NAME from PRODUCT_MASTER where plan_code ='"+planCode+"'";
	statement = connection.createStatement();
	//$response.getWriter().println(queryString);
	results = statement.executeQuery(queryString);
	while(results.next()){
		planName = ""+results.getString("PLAN_NAME");
		var response = {"planName":planName};
		response = JSON.stringify(response);
		$response.getWriter().println(response);
	}
	connection.close();
} 
catch (e) {
	e.printStackTrace();
}
