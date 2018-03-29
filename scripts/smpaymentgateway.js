var results = {Txn_Status: "", Txn_Amt_Paid: ""};
var applicationNumber = $request.getParameter('appNo');
var key = $request.getParameter('key');
try {
	java.lang.Class.forName("oracle.jdbc.driver.OracleDriver");
	connection = java.sql.DriverManager.getConnection("jdbc:oracle:thin:@10.126.249.232:1881:uatods", "relportal","relportal");
	statement = connection.createStatement();
	var queryString = "SELECT TRXN_TGTW_PAID,TRXN_AMOUNT FROM TRX_TRANSACTIONS WHERE TRXN_KEY='"+key+"'";
	//$response.getWriter().println(queryString);
	result = statement.executeQuery(queryString);
	
	if(result.next()){
		results.Txn_Status = ""+result.getString("TRXN_TGTW_PAID");
			
		results.Txn_Amt_Paid = ""+result.getString("TRXN_AMOUNT");
	}
	statement.close();
	connection.close();
} 
catch (e) {
	e.printStackTrace();
}

$response.getWriter().println(JSON.stringify(results));