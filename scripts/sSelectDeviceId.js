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

if(action =="selectDeviceId"){
	result = selectDeviceId(res.SAP_Code);
	resultData(result);
}


function resultData(result){
	result = JSON.stringify(result);
	$response.getWriter().println(result);
}

function selectDeviceId(sap_code){
	var select = "select * from Attendance_EmployeeList where SAP_Code='"+sap_code+"'";
	try{
		statement = connection.createStatement();
		results = statement.executeQuery(select);
		while(results.next()){
			columnObj = {
				SAP_Code : ""+results.getString("SAP_Code"),
				IMIENO : ""+results.getString("IMIENO"),
			};
			dataArr.push(columnObj);
		}
		result = {"code":103,"msg":"Query successful","entities":dataArr,"count":dataArr.length};
		return result;	
	}catch(e){
		java.lang.System.out.println(e + " - " + select);
	}
	
}