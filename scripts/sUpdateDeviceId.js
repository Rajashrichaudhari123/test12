/**
 * sUpdateDeviceId.js
 * @author CloudPact Technologies
 * @description : This script is used for creating server connections and firing get/post requests to server.
 **/
try{
	var connectionUrl = "jdbc:sqlserver://10.126.239.187:1981;" + "databaseName=eOPS_Staging;user=pdcuser;password=pdc@123";
	java.lang.Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
	connection = java.sql.DriverManager.getConnection(connectionUrl);	
}catch(e){
	java.lang.System.out.println(e + " - " + "Connection failed"+ connection);
}

var result;
var dataArr=[];
var columnObj={};
var response="";
var data = $request.getParameter("data");
var action = $request.getParameter("action");
var res = JSON.parse(data);

if(action =="updateDeviceId"){
	result = updateDeviceId(res.SAP_Code,res.IMIENO);
	resultData(result);
}


function resultData(result){
	result = JSON.stringify(result);
	$response.getWriter().println(result);
}

function updateDeviceId(sap_code,ime_no){
		var update = "update Attendance_EmployeeList set IMIENO='"+ime_no+"' where SAP_Code='"+sap_code+"'";
		try{
			statement = connection.createStatement();
			result = statement.executeUpdate(update);
			if(result !== 0.0){
				result ={
					"code" :103,
					"Message" :"Query Successful"
				}
			}else{
				result = {
					"code" :402,
					"Message" :"No rows affected"
				}
			}
			return result;
		}catch(e){
			java.lang.System.out.println(e + " - " + update);
		}
}