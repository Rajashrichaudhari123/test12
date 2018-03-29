var policyId = $request.getParameter("policyId");
var appversion = $request.getParameter("appversion");
//if( appversion && appversion >= 1.0){
	try {
		var connectionUrl = "jdbc:sqlserver://10.126.239.187:1981;" + "databaseName=eOPS_Staging;user=pdcuser;password=pdc@123";
		java.lang.Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
		connection = java.sql.DriverManager.getConnection(connectionUrl);
		var queryString = "select LIFEASIA_PRODUCTCODE1,SolutionFlag from PRODUCT_MASTER where plan_code ='"+policyId+"'";
		statement = connection.createStatement();
		//$response.getWriter().println(queryString);
		results = statement.executeQuery(queryString);
		while(results.next()){
			ProductCode = ""+results.getString("LIFEASIA_PRODUCTCODE1");
			CombinationOFProducts  = ""+results.getString("SolutionFlag");
			var response = {"ProductCode": ProductCode, "CombinationOFProducts": CombinationOFProducts};
			response = JSON.stringify(response);
			$response.getWriter().println(response);
		}
		connection.close();
	} 
	catch (e) {
		e.printStackTrace();
	}
//}else{
	//$response.getWriter().println("");
//}
