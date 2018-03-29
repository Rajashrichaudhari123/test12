function loadLib(libName, projectName, libVar){
	var lib = ''+$sm.readFile(libName, projectName, 1); //convert string from java (js object) to native js string
	if(lib){
		this[libVar] = eval(lib);
	}
}
var activity_result_id = $request.getParameter("activity_result_id");

function writelog(folder, file, data) {
    loadLib("loggerlib.js", "RlifeAssist", "HttpClient");
     var hc = new HttpClient();
    hc.writeFileLog(folder, file, data);
}

loadLib("sfile.js", "RlifeAssist", "File");

var fileLib = new File();
fileLib.database = "eOPS_Staging";
fileLib.dbHost = "10.126.239.187";
fileLib.dbPort = "1981";
fileLib.classForName = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
fileLib.dbUsername = "pdcuser";
fileLib.dbPassword = "pdc@123";
fileLib.dbProvider = fileLib.DB_MSSQL;


try {
		var response = fileLib.getFile("Expert_To_Call","LifePlanner_Pdf",[{"column":"Activity_Result_Id","operator":"EQ","value":activity_result_id,"datatype":"string"}],"test","application/pdf");
	    $response.getWriter().print(""+response);
}catch (e) {
	//e.printStackTrace();
	$response.getWriter().print(e);
}