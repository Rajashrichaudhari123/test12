/**
 * sDailyAttendance.js
 * @author CloudPact Technologies
 * @description : This script is used for creating server connections and firing get/post requests to server.
 **/

var data = $request.getParameter("data");
var action = $request.getParameter("action");
try{
	var connectionUrl = "jdbc:sqlserver://10.126.239.187:1981;" + "databaseName=eOPS_Staging;user=pdcuser;password=pdc@123";
	java.lang.Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
	connection = java.sql.DriverManager.getConnection(connectionUrl);
}catch (e) {
	e.printStackTrace();
}	
var result;
var dataArr=[];
var columnObj={};
var response="";

if(action =="selectAttendance"){
	var res = JSON.parse(data);
	result = selectQuery(res.SAP_Code);	
}
if(action =="updateDeviceId"){
	var res = JSON.parse(data);
	result = updateDeviceId(res.SAP_Code,res.IMIENO);
}
if(action =="selectDeviceId"){
	var res = JSON.parse(data);
	result = selectDeviceId(res.SAP_Code);	
}
//testing purpose
if(action =="deleteDeviceId"){
	var res = JSON.parse(data);
	result = deleteDeviceId(res.SAP_Code);	
}

if(action =="deleteAttReport"){
	var res = JSON.parse(data);
	result = deleteAttEntry(res.SAP_Code);	
}
if(action =="selectSapCode"){
	var res = JSON.parse(data);
	result = selectSapID(res.IMIENO);	
}
if(action =="updateLatLong"){
	var res = JSON.parse(data);
	result = updateLatLong(res.Lattitude_Node,res.Logititude_Node,res.Location_Code);	
}

if(action =="selectUserQuery"){
	//var res = JSON.parse(data);
	result = selectUserQuery();	
}

if(action =="deleteUserDetails"){
	//var res = JSON.parse(data);
	result = deleteUserDetails();	
}

//Location Mapping

if(action == "insertLocation"){
	var res = JSON.parse(data);
	result = insertLocation(res.SAP_Code,res.PC_Code,res.PA_Code,res.BCB_Code,res.Location_Map,res.Location_Edit,res.City,res.State,res.PinCode,res.Login_Date,res.Latitude,res.Longitude,res.Device_ID);	
}

if(action =="retrieveSapCode"){
	var res = JSON.parse(data);
	result = retrieveSapID(res.SAP_Code);	
}

if(action =="selectPdcUser"){
	//var res = JSON.parse(data);
	result = selectPdcUser();	
}

//testing purpose
result = JSON.stringify(result);
$response.getWriter().println(result);






function insertQuery(txn_code,sap_code,login_dt,logout_dt,added_by,added_on,mod_by,mod_on){
	var insert = "INSERT INTO Attendance_Emp_DailyAtt(Txn_ID,SAP_Code,Login_DateTime,Logout_DateTime,Added_BY,Added_On,Modified_By,Modified_On)VALUES('"+txn_code+"','"+sap_code+"','"+login_dt+"',null,'"+added_by+"','"+added_on+"','"+mod_by+"',null)";
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

function updateQuery(logout_dt,mod_on,login_dt){
		var update = "update Attendance_Emp_DailyAtt set Logout_DateTime='"+logout_dt+"',Modified_On='"+mod_on+"' where Login_DateTime='"+login_dt+"'";
		statement = connection.createStatement();
		result = statement.executeUpdate(update);
		//$response.getWriter().println(result);
		if(result != 0.0){
			result ={
				"code" :103,
				"Message" :"Query Successful",
			}
		}else{
			result = {
				"code" :402,
				"Message" :"No rows affected"
			}
		}
		return result;
}

function selectQuery(sap_code){
	var select = "select * from Attendance_Emp_DailyAtt where SAP_Code='"+sap_code+"'";
	//$response.getWriter().println(select);
	statement = connection.createStatement();
	results = statement.executeQuery(select);
		while(results.next()){
			columnObj = {
				SAP_Code : ""+results.getString("SAP_Code"),
				Login_DateTime : ""+results.getString("Login_DateTime"),
				Logout_DateTime : ""+results.getString("Logout_DateTime"),
			};
			dataArr.push(columnObj);
		}
		result = {"code":103,"msg":"Query successful","entities":dataArr,"count":dataArr.length};
		//$response.getWriter().println(JSON.stringify(result));
		return result;
}

function updateDeviceId(sap_code,ime_no){
		var update = "update Attendance_EmployeeList set IMIENO='"+ime_no+"' where SAP_Code='"+sap_code+"'";
		statement = connection.createStatement();
		result = statement.executeUpdate(update);
		//$response.getWriter().println(result);
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
}

function selectDeviceId(sap_code){
	var select = "select * from Attendance_EmployeeList where SAP_Code='"+sap_code+"'";
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
		//$response.getWriter().println(JSON.stringify(result));
		return result;
}

//testing purpose
function deleteDeviceId(sap_code){
	var deleteQ = "update Attendance_EmployeeList set IMIENO='' where SAP_Code='"+sap_code+"'";
	statement = connection.createStatement();
	results = statement.executeUpdate(deleteQ);
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
}

function deleteAttEntry(sap_code){
	var deleteQ = "delete from Attendance_Emp_DailyAtt where SAP_Code='"+sap_code+"'";
	statement = connection.createStatement();
	results = statement.executeUpdate(deleteQ);
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
}

function selectSapID(imie_no){
	var select = "select * from Attendance_EmployeeList where IMIENO='"+imie_no+"'";
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
		//$response.getWriter().println(JSON.stringify(result));
		return result;	
	}catch(e){
		java.lang.System.out.println(e + " - " + select);
	}
}

function selectUserQuery(){
	var select = "select * from SalesAssist_LastLogin_Details";
	//$response.getWriter().println(select);
	statement = connection.createStatement();
	results = statement.executeQuery(select);
		while(results.next()){
			columnObj = {
				Login_Code : ""+results.getString("Login_Code"),
				OS : ""+results.getString("OS"),
				AppVersion : ""+results.getString("AppVersion"),
				Login_Count : ""+results.getString("Login_Count"),
				EID : ""+results.getString("EID"),
				Login_Date : ""+results.getString("Login_Date")
			};
			dataArr.push(columnObj);
		}
		result = {"code":103,"msg":"Query successful","entities":dataArr,"count":dataArr.length};
		//$response.getWriter().println(JSON.stringify(result));
		return result;
}

function selectPdcUser(){
	var count;
	var row =[];
	var columnNames = [];
//	var select = "select * from [dbo].[PDC_User_Logins] where Login_Code = 'C000205'";
	var select = "select * from [dbo].[Attendance_EmployeeList] where SAP_Code ='C000205' and Emp_Status = 'Y'";
	statement = connection.createStatement();
	//$response.getWriter().println(statement);
	results = statement.executeQuery(select);
	while(results.next()){
//        count = results.getInt(1);
		var columns = results.getMetaData();
        var i = 0;
        while (i < columns.getColumnCount()) {
          i++;
         // java.out.print(columns.getColumnName(i) + "\t");
          columnNames.push(columns.getColumnName(i));
          row += results.getString(i) + ", ";  
//          columnObj = {
//				columnNames[i] : row,
//			};
        }
//		count = results.next();
    }
    $response.getWriter().println(columnNames+""+row);
  //  $response.getWriter().println(columnObj);
}

function deleteUserDetails(){
	var deleteQ = "delete from SalesAssist_LastLogin_Details";
	statement = connection.createStatement();
	results = statement.executeUpdate(deleteQ);
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
}
