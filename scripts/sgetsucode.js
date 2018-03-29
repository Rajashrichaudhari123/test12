/**
 * sshdatasvc.js
 * @author CloudPact Technologies
 * @description : This script is used for creating server connections and firing get/post requests to server.
 **/
var results;
var resultString = "";
var action="getVisitingData";


var respJSON = "";
var companyDBIP = "10.126.249.232",companyDBPort = "1881", companySID = "uatods",companyDB = "rlicods",companyPwd = "rlicods";

try{
	java.lang.Class.forName("oracle.jdbc.driver.OracleDriver");
	connection = java.sql.DriverManager.getConnection("jdbc:oracle:thin:@"+companyDBIP+":"+companyDBPort+":"+companySID, companyDB, companyPwd);
	
 if(action == "getVisitingData"){
		var code = $request.getParameter("code")+"";
		//code = "70250367";
	//	code = "70299486";
		var queryString = "select x_sm_nm as Name, X_SM_DESIGNATION as Designation, x_branch as Branch, X_COMP_UNIT_CD as Location, X_SALES_UNIT_CD as SU_Code from rlicods.x_producer_hierarchy  where x_sm_emp_cd = '"+code+"'";
		statement = connection.createStatement();
		results = statement.executeQuery(queryString);
		var jsondata = {"Name":"","Designation":"","Branch":"","SU_Code":"","Location":"","Count":0};
		while(results.next()){
			jsondata.Name = results.getString("Name")+"";
			jsondata.Designation = results.getString("Designation")+"";
			jsondata.Branch = results.getString("Branch")+"";
			jsondata.SU_Code = results.getString("SU_Code")+"";
			jsondata.Location = results.getString("Location")+"";
			jsondata.Count = 1;
		}
		respJSON = {"code":103,"msg":"Query successful","entities":jsondata};
		connection.close();	
	}
} 
catch (e) {
	//TODO send error response
		respJSON = {"code":501,"msg":"Server Error: "+e};
}
//$response.addHeader("Content-Type","application/json");
$response.getWriter().println(JSON.stringify(respJSON));

