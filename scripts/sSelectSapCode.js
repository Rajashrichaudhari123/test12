//data = JSON.parse(data);
//seriesArray = new String("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
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

if(action =="selectSapCode"){
	var res = JSON.parse(data);
	result = selectSapID(res.IMIENO);
	resultData(result);
}

if(action =="selectAttendance"){
	result = selectQuery(res.SAP_Code);	
}

//testing purpose
if(action =="deleteDeviceId"){
	result = deleteDeviceId(res.SAP_Code);	
}

if(action =="deleteAttReport"){
	result = deleteAttEntry(res.SAP_Code);	
}

if(action =="updateLatLong"){
	result = updateLatLong(res.Lattitude_Node,res.Logititude_Node,res.Location_Code);
}


//Location Mapping

/*if(action == "insertLocation"){
	var res = JSON.parse(data);
	result = insertLocation(res.SAP_Code,res.PC_Code,res.PA_Code,res.BCB_Code,res.Location_Map,res.Location_Edit,res.City,res.State,res.PinCode,res.Login_Date,res.Latitude,res.Longitude,res.Device_ID);
//	resultData(result);
}

if(action =="retrieveSapCode"){
	var res = JSON.parse(data);
	result = retrieveSapID(res.SAP_Code);
//	resultData(result);
}*/

//testing purpose
function resultData(result){
	result = JSON.stringify(result);
	$response.getWriter().println(result);
}



function selectQuery(sap_code){
	var select = "select * from Attendance_Emp_DailyAtt where SAP_Code='"+sap_code+"'";
	try{
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
		return result;	
	}catch(e){
		java.lang.System.out.println(e + " - " + select);
	}
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


//testing purpose
function deleteDeviceId(sap_code){
	var deleteQ = "update Attendance_EmployeeList set IMIENO='' where SAP_Code='"+sap_code+"'";
	try{
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
	}catch(e){
		java.lang.System.out.println(e + " - " + deleteQ);
	}
}

function deleteAttEntry(sap_code){
	var deleteQ = "delete from Attendance_Emp_DailyAtt where SAP_Code='"+sap_code+"'";
	try{
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
	}catch(e){
		java.lang.System.out.println(e + " - " + deleteQ);
	}	
}


	function updateLatLong(lat,long,code){
		var update = "update Attendance_Location set Lattitude_Node='"+lat+"',Logititude_Node='"+long+"' where Location_Code='"+code+"'";
		try{
			statement = connection.createStatement();
			result = statement.executeUpdate(update);
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
		}catch(e){
			java.lang.System.out.println(e + " - " + update);
		}
	}
	
	
//Location Mapping
/*function insertLocation(sap_code,pc_code,pa_code,bcb_code,location_map,location_edit,city,state,pincode,login_date,latitude,longitude,deviceId){
	var insert = "INSERT INTO Attendance_Emp_Details(SAP_Code,PC_Code,PA_Code,BCB_Code,Location_Map,Location_Edit,City,State,PinCode,Login_Date,Latitude,Longitude,Device_ID)VALUES('"+sap_code+"','"+pc_code+"','"+pa_code+"','"+bcb_code+"','"+location_map+"','"+location_edit+"','"+city+"','"+state+"','"+pincode+"','"+login_date+"','"+latitude+"','"+longitude+"','"+deviceId+"')";
	try{
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
	}catch(e){
		java.lang.System.out.println(e + " - " + update);
	}	
}

function retrieveSapID(sap_code){
	var select = "select * from Attendance_Emp_Details where SAP_Code='"+sap_code+"'";
	//$response.getWriter().println(select);
	try{
		statement = connection.createStatement();
		results = statement.executeQuery(select);
		while(results.next()){
			columnObj = {
				SAP_Code : ""+results.getString("SAP_Code"),
				Login_Date : ""+results.getString("Login_Date"),
				Latitude : ""+results.getString("Latitude"),
				Longitude : ""+results.getString("Longitude"),
				Device_ID : ""+results.getString("Device_ID")
			};
			dataArr.push(columnObj);
		}
		result = {"code":103,"msg":"Query successful","entities":dataArr,"count":dataArr.length};
		//$response.getWriter().println(JSON.stringify(result));
		return result;		
	}catch(e){
		java.lang.System.out.println(e + " - " + update);
	}
}*/
