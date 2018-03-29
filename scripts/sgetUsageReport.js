results = generateUsageReport();
$response.getWriter().println(results);

function generateUsageReport(){
	var mowblyCompanyDB = "mpcompany";
	var mowblyCompanyDBIP = "10.126.143.17";
	var mowblyCompanyDBPort = "1881";
	var mowblyCompanyPwd = "pass123";
	var mowblyCompanySID = "prodods1";
	var dataForCSV = [];
	var companiesResults = {};
	var connection;
	try{
		connection = getConnection(mowblyCompanyDBIP, mowblyCompanyDBPort, mowblyCompanySID, mowblyCompanyDB, mowblyCompanyPwd);
			statement = connection.createStatement();
			queryString = "SELECT * FROM  ANALYTICS  WHERE  (o_createdon >= 1475263800000 AND o_createdon <= 1475501580000)";
			//$response.getWriter().println(queryString);
			//" AND UNAME IN('70253053', '70257385', '70276286', '70275664', '70258745'))";
			//queryString = "SELECT * FROM USERS";
			//$response.getWriter().println(anlyticsQueryByCompany[i].query);
			//queryString = anlyticsQueryByCompany[i].query;
			rs = statement.executeQuery(queryString);
			results = getResultSetAsList(rs);
			companiesResults[anlyticsQueryByCompany[i].name] = results;
			rs.close();
			statement.close();
			var obj = {};
			//obj[anlyticsQueryByCompany[i].name] = {"PackLaunches": totalaunchesBypacks(results), "UserPackLaunches": totalaunchesByusers(results), "UserPerPackLaunches": totalaunchesPerPackByUser(results)}
			dataForCSV.push(obj);
		connection.close();
		
		//return sendResponseToCSV(dataForCSV);
		return JSON.stringify(dataForCSV);
	} catch(e){
		return e;
	}
}


function getResultSetAsList(rs) {
	var results = [];
	while (rs.next()) {
		results.push(getResultSetAsMap(rs));
	}
	return results;
}


function getConnection(mowblyCompanyDBIP, mowblyCompanyDBPort, mowblyCompanySID, mowblyCompanyDB, mowblyCompanyPwd){
	java.lang.Class.forName("oracle.jdbc.driver.OracleDriver");
	var connection = java.sql.DriverManager.getConnection("jdbc:oracle:thin:@"+mowblyCompanyDBIP+":"+mowblyCompanyDBPort+":"+mowblyCompanySID, mowblyCompanyDB, mowblyCompanyPwd);
	return connection;
}

function getResultSetAsMap(rs){
	var rsmd = rs.getMetaData();
	var noOfColumns = rsmd.getColumnCount();
	var props = {};
	for (var i = 1; i <= noOfColumns; i++) {
		var column_name = null;
		var value = null;
		column_name = rsmd.getColumnName(i);
		var col_type = rsmd.getColumnType(i);
		if (col_type == java.sql.Types.ARRAY) {
			value = rs.getArray(i);
		} else if (col_type == java.sql.Types.BIGINT) {
			value = rs.getLong(i);
		} else if (col_type == java.sql.Types.BOOLEAN) {
			value = rs.getBoolean(i);
		} else if (col_type == java.sql.Types.DOUBLE) {
			value = rs.getDouble(i);
		} else if (col_type == java.sql.Types.FLOAT) {
			value = rs.getFloat(i);
		} else if (col_type == java.sql.Types.INTEGER) {
			value = rs.getInt(i);
		} else if (col_type == java.sql.Types.NVARCHAR) {
			value = rs.getNString(i);
		} else if (col_type == java.sql.Types.VARCHAR) {
			value = rs.getString(i);
		} else if (col_type == java.sql.Types.TINYINT) {
			value = rs.getInt(i);
		} else if (col_type == java.sql.Types.SMALLINT) {
			value = rs.getInt(i);
		} else if (col_type == java.sql.Types.DATE) {
			value = rs.getDate(i);
		} else if (col_type == java.sql.Types.TIMESTAMP) {
			value = rs.getTimestamp(i);
		} else {
			value = rs.getObject(i);
		}
		column_name = ""+column_name;
		column_name = column_name.toLowerCase();
		props[column_name] = ""+value;
	}
	return props;
}