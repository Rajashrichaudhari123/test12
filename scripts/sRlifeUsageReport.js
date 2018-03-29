results = generateUsageReport();
results = JSON.stringify(results);
$response.getWriter().println(results);

function generateUsageReport(){
	var mowblyCompanyDB = "MPCOMPANY";
	var mowblyCompanyDBIP = "10.126.249.232";
	var mowblyCompanyDBPort = "1881";
	var mowblyCompanyPwd = "pass123";
	var mowblyCompanyServiceName = "uatods";
	var dataForCSV = [];
	var dataArr=[];
	var companiesResults = {};
	var connection;
	var today_Date = new Date().toString('MM/dd/yyyy') ;
	var todayDate = new Date().setHours(0,0,0,0);
	var yesterdayDate = todayDate - 86400000;
	try{
		connection = getConnection(mowblyCompanyDBIP, mowblyCompanyDBPort, mowblyCompanyServiceName, mowblyCompanyDB, mowblyCompanyPwd);
			statement = connection.createStatement();
			queryString = "SELECT * FROM ACTIVETOKENS WHERE o_eid IN ( SELECT MAX(o_eid) FROM ACTIVETOKENS where  o_createdon <= '"+todayDate+"' and  o_createdon >= '"+yesterdayDate+"' and os='android' GROUP BY uname )";
			rs = statement.executeQuery(queryString);
			results = rs;
			while(results.next()){
				columnObj = {
					UNAME : ""+results.getString("uname"),
					OSMAJOR : ""+results.getString("osmajor"),
					OSMINOR : ""+results.getString("osminor"),
					OSPATCH : ""+results.getString("ospatch"),
					APPLICATIONVERSION : ""+results.getString("applicationversion"),
					O_EID :  ""+results.getInt("o_eid"),
					O_CREATEDON :  ""+results.getString("o_createdon")
				};
				dataArr.push(columnObj);
			}
			result = {"code":103,"msg":"Query successful","entities":dataArr,"count":dataArr.length};
			getSQLConnection(result);
			rs.close();
			statement.close();
		return result;
	} catch(e){
		return e;
	}
}

function getConnection(mowblyCompanyDBIP, mowblyCompanyDBPort, mowblyCompanyServiceName, mowblyCompanyDB, mowblyCompanyPwd){
	java.lang.Class.forName("oracle.jdbc.driver.OracleDriver");
	var connection = java.sql.DriverManager.getConnection("jdbc:oracle:thin:@"+mowblyCompanyDBIP+":"+mowblyCompanyDBPort+":"+mowblyCompanyServiceName, mowblyCompanyDB, mowblyCompanyPwd);
	return connection;
}

var usersCount;
function getSQLConnection(result){
	try{
		var connectionUrl = "jdbc:sqlserver://10.126.239.187:1981;" + "databaseName=eOPS_Staging;user=pdcuser;password=pdc@123";
		java.lang.Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
		connection = java.sql.DriverManager.getConnection(connectionUrl);
	}catch(e){
		e.printStackTrace();
	}
	var objResult = result.entities;
	usersCount = result.count ;
	for(var i = 0; i< objResult.length ; i++){
		var uname = objResult[i].UNAME;
		var applicationVersion = objResult[i].APPLICATIONVERSION;
		var osmajor = objResult[i].OSMAJOR;
		var osminor = objResult[i].OSMINOR;
		var ospatch = objResult[i].OSPATCH;
		var eid = objResult[i].O_EID;
		var createdOn = objResult[i].O_CREATEDON;
		passUserDetails(uname,applicationVersion,osmajor,osminor,ospatch,usersCount,eid,createdOn);
	}
}

function passUserDetails(uname,applicationVersion,osmajor,osminor,ospatch,usersCount,eid,createdOn){
	createdOn = parseInt(createdOn);
	var created_on = new Date(createdOn);
	var os = osmajor+'.'+osminor+'.'+ospatch;
	var entry_time = created_on.getFullYear() + '-' +(created_on.getMonth() + 1) + '-' +  created_on.getDate() + ' '+created_on.getHours()+ ':'+created_on.getMinutes()+ ':'+created_on.getSeconds()+'.'+created_on.getMilliseconds();
	var insert = "INSERT INTO SalesAssist_LastLogin_Details(Login_Code,OS,AppVersion,Login_Count,EID,Login_Date)VALUES('"+uname+"','"+os+"','"+applicationVersion+"','"+usersCount+"','"+eid+"','"+entry_time+"')";
	statement = connection.createStatement();
	results = statement.executeUpdate(insert);
	if(results == 1.0){
		result ={
			"code" :103,
			"Message" :"Query Successful",
			"rows" :results
		}
	}
	return result;	
}

