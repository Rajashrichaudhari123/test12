function loadLib(libName, projectName, libVar){
	var lib = ''+$sm.readFile(libName, projectName, 1); //convert string from java (js object) to native js string
	if(lib){
		this[libVar] = eval(lib);
	}
}

function writelog(folder, file, data) {
   loadLib("loggerAudit.js", "RlifeAssist", "Logger");
    var logger = new Logger();
   logger.writeFileLog(folder, file, data);
}

var serverkey = "AIzaSyCii07XXA2ognCur_GPp9K5vd3KMXfFPI4";
var pushUrl = "https://android.googleapis.com/gcm/send";
var headers = {};

var mowblyCompanyDB = "mpcompany";
var mowblyCompanyDBIP = "10.126.249.232";
var mowblyCompanyDBPort = "1881";
var mowblyCompanyPwd = "pass123";
var mowblyCompanyServiceName = "uatods";

loadLib("shttpclient.js", "RlifeAssist", "HttpClient");
var hc = new HttpClient();

function getConnection (query,cloumnName) {
	var deviceids = [];
	try{
		var connection = java.sql.DriverManager.getConnection("jdbc:oracle:thin:@10.126.249.232:1881:uatods", "MPCOMPANY","pass123");
		statement = connection.createStatement();
		ResultSet = statement.executeQuery(query);  
		//return query;
		while (ResultSet.next()) {
		var id = ResultSet.getString(cloumnName) + "";
			if(id != null && id != "null"){
				deviceids.push(id);	
			}
		}
		statement.close();
		connection.close();
		return deviceids;
	} catch (e) {
    	statement.close();
        connection.close();
        $response.getWriter().print("e");
        return "failed";
   }
}


try{	
	var data = $request.getParameter("data");
	data = JSON.parse(data);
	
//	var connectionUrl = "jdbc:sqlserver://10.126.239.187:1981;" + "databaseName=eOPS_Staging;user=pdcuser;password=pdc@123";
//	java.lang.Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
//	connection = java.sql.DriverManager.getConnection(connectionUrl);
//	var sapId_arr = [];
//	var sapCodesQUery = "select Login_Code from [dbo].[PDC_User_Logins] where Login_Status = 'Y'";
//	statement = connection.createStatement();
//	results = statement.executeQuery(sapCodesQUery);
//	while(results.next()){
//		obj = {
//			SAP_Code : ""+results.getString("Login_Code")
//		};
//		sapId_arr.push(obj);
//	}
	var usersArray = [];
	var userSapcode = [];
//	for(var i=0;i<sapId_arr.length;i++){
//		usersArray[i] = "" + sapId_arr[i].SAP_Code;
//	}
usersArray = ["70085536","70036363"];
writelog("PushNotificationLogs", "logs", "Userid's ----------------------------------- " + JSON.stringify(usersArray)+ "------------------------------------------------");
	for(var j=0;j<usersArray.length;j++){ 
		try {
			userSapcode = [];
			userSapcode.push(usersArray[j]);
			//$response.getWriter().println(JSON.stringify(usersArray));
			var deviceIdQuery = "select device from deviceusers where uname='"+ userSapcode[0] +"'";
			var deviceid = getConnection(deviceIdQuery,"device");
			//$response.getWriter().println(JSON.stringify(deviceid));
			var devicesString = "";
			if(deviceid.length != 0)  {
				for(var i=0;i<deviceid.length;i++){
					devicesString = devicesString + "'" + deviceid[i] + "',"
				}
				devicesString = devicesString.substring(0, devicesString.length-1);
				var registrationidsQuery = "select registrationid from devices where deviceid in (" + devicesString + ")";
				var registrationid = getConnection(registrationidsQuery,"registrationid");
				var registration_ids = registrationid;
				//$response.getWriter().println(JSON.stringify(registrationid));
			} 
			
			var currentTime = new Date().getTime();
			var currenttime = currentTime.toString();
			var title = data.title;
			var message = data.desc;
			var userid = userSapcode[0];
			
			var notifobj = {"registration_ids":[],"data":{"id":1,"b":1,"u":""+ userid+"","a":0,"s":1,"p":"4608","d":"{\"t\":1,\"s\":" + currenttime + ",\"m\":\"" + message + "\"","us":"[\"" + userid + "\"]","ds":"[]","rs":"[]","t":""+ title +"","m":""+ message +""}};
			notifobj.registration_ids = registration_ids;
		$response.getWriter().println(JSON.stringify(notifobj));	
			writelog("PushNotificationLogs", "logs", "Push Notification Request ------------------------ " + JSON.stringify(notifobj)+ "------------------------------------------------");
			headers = {
		        "Content-Type": "application/json",
		        "Authorization" : "key=" + serverkey
		    };
			requestData = JSON.stringify(notifobj);
		//	$response.getWriter().println(requestData);   
			response = hc.post(pushUrl, requestData, headers);
		    response = JSON.parse(response);
		    writelog("PushNotificationLogs", "logs", "Response ----------------------------------- " + response+ "------------------------------------------------");
		    //$response.getWriter().println(response);
		} catch(e){
			writelog("PushNotificationLogs", "logs", "Request Failed ----------------------------------- " + e+ "------------------------------------------------");
			$response.getWriter().println(e);
		}
	}
} catch(e){
	writelog("PushNotificationLogs", "logs", "Request Failed ----------------------------------- " + e+ "------------------------------------------------");
	$response.getWriter().println(e);
}