function loadLib(libName, projectName, libVar){
	var lib = ''+$sm.readFile(libName, projectName, 1); //convert string from java (js object) to native js string
	if(lib){
		this[libVar] = eval(lib);
	}
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

var rVal=1;

try{
	rVal = fileLib.insertFile("PDC_Image_Details_Sync", "ImageDoc", [{"column" : "Application_Number", "datatype" : "string"}, {"column" : "DocumentTypeCode", "datatype" : "string"}, {"column" : "ImageName", "datatype" : "string"}, {"column" : "UploadDate", "datatype" : "string"}, {"column" : "Status", "datatype" : "string"}, {"column" : "Row_No", "datatype" : "int"}]);
}catch(httperr){
	//TODO handle errors
	//httperr.printStackTrace();
	results={"code":522,"message":"Unable to insert your task"};
}

$response.getWriter().println(rVal);