/**
 * srlifedtPushNotification.js
 * @author CloudPact Technologies
 * @description : This script is used for creating server connections and firing get/post requests to server.
 **/


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

loadLib("shttpclient.js", "RlifeAssist", "HttpClient");
var hc = new HttpClient();

try{
	var data = $request.getParameter("data");
	data = JSON.parse(data);
	var connectionUrl = "jdbc:sqlserver://10.126.239.187:1981;" + "databaseName=eOPS_Staging;user=pdcuser;password=pdc@123";
	java.lang.Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
	connection = java.sql.DriverManager.getConnection(connectionUrl);
	var sapId_arr = [];
	var select = "select TOP 200 Login_Code from [dbo].[PDC_User_Logins] where Login_Status = 'Y'";
	statement = connection.createStatement();
	results = statement.executeQuery(select);
	while(results.next()){
		obj = {
			SAP_Code : ""+results.getString("Login_Code")
		};
		sapId_arr.push(obj);
	}
	var usersArray = [];
	var arr = [];
	for(var i=0;i<sapId_arr.length;i++){
		usersArray[i] = "" + sapId_arr[i].SAP_Code;
	}
	for(var j=0;j<usersArray.length;j++){
		arr = [];
		arr.push(usersArray[j]);
		arr = JSON.stringify(arr);
		arr = arr.replace(/"/g, '\\"');
		var notifobj = "a=userpushnotification&uname=admin@rlife.com&pwd=admin&notifications="+encodeURIComponent("[{\"b\":1,\"u\":\"admin@rlife.com\",\"a\":0,\"s\":1,\"p\":\"Applications\",\"d\":\"{\\\"t\\\":1,\\\"s\\\":1442412593547,\\\"m\\\":\\\"New Message\\\"}\",\"us\":\""+arr+"\",\"ds\":\"[]\",\"rs\":\"[]\",\"t\":\""+data.title+"\",\"m\":\""+data.desc+"\"}]");
	
		notifobj = notifobj.replace(/@/g, "%40");
		writelog("PushNotificationLogs", "logs", "Push Notification Request ----------------------------------- " + JSON.stringify(notifobj)+ "------------------------------------------------");
		//java.lang.System.out.println(JSON.stringify(notifobj));
		//$response.getWriter().println(notifobj)
		responseData = hc.post("http://10.126.249.116/rlife2/mobiledata", notifobj,[]); 
		writelog("PushNotificationLogs", "logs", "Response ----------------------------------- " + responseData+ "------------------------------------------------");
		$response.getWriter().println(responseData);
		
	}
} catch (e) {
	e.printStackTrace();
}