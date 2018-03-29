var versionInfo = {
	"App" : {
		"version" : "4.3"
	},
	"System" : {
		"version" : "30.0"
	},
	"Packs" : []
};

function getConnection(mowblyCompanyDBIP, mowblyCompanyDBPort, mowblyCompanySID, mowblyCompanyDB, mowblyCompanyPwd) {
    java.lang.Class.forName("oracle.jdbc.driver.OracleDriver");
    var connection = java.sql.DriverManager.getConnection("jdbc:oracle:thin:@" + mowblyCompanyDBIP + ":" + mowblyCompanyDBPort + ":" + mowblyCompanySID, mowblyCompanyDB, mowblyCompanyPwd);
    reponse = connection.createStatement();
    var getPackinfoQuery = "select * from packs order by o_eid desc";
    ResultSet = reponse.executeQuery(getPackinfoQuery);
    var packInfo = "";
    while (ResultSet.next()) {
    	packInfo += "'" + ResultSet.getString("fileid") + "':{'_modifiedon':" + ResultSet.getString("o_modifiedon") + "},";
    }
    packInfo = "{" + packInfo + "}";
    packInfo = packInfo.substring(0, packInfo.length-2) + packInfo.substring(packInfo.length-1);
    versionInfo.Packs = packInfo;
    versionInfo = JSON.stringify(versionInfo);
    $response.getWriter().print(versionInfo);
	ResultSet.close();
    reponse.close();
    connection.close();
}

getConnection("10.126.249.232", "1881", "uatods", "MPCOMPANY", "pass123");