/**
 * VideoUpload.js
 * @author CloudPact Technologies
 * @description : This script is used for sending video data into server using multipart request.
 **/

function loadLib(libName, projectName, libVar){
	var lib = ''+$sm.readFile(libName, projectName, 1); //convert string from java (js object) to native js string
	if(lib){
		this[libVar] = eval(lib);
	}
}

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


var imageTables = {
	"PDC_Video_Details" : "PDC_Video_Details"
};

var response = "";

try{
	var tabelname = $request.getParameter("TABLE");
	var Application_Number = $request.getParameter("Application_Number");
	var columns = [
		{"column" : "Txn_ID", "datatype" : "string"},
		{"column" : "Application_Number", "datatype" : "string"},
		{"column" : "Selfi_Video_Status", "datatype" : "string"},
		{"column" : "Personal_Video_Status", "datatype" : "string"},
		{"column" : "Selfi_Video_SyncStatus", "datatype" : "string"},
		{"column" : "Personal_Video_SyncStatus", "datatype" : "string"},
		{"column" : "Selfie_Camera_Available", "datatype" : "string"},
		{"column" : "PIVC_Medical_Qs_Ans_Flag", "datatype" : "string"},
		{"column" : "Cust_Salutation", "datatype" : "string"},
		{"column" : "Cust_Name", "datatype" : "string"},
		{"column" : "Cust_Email_ID", "datatype" : "string"},
		{"column" : "Cust_Mobile_Number", "datatype" : "string"},
		{"column" : "Scheduled_Date", "datatype" : "string"},
		{"column" : "Added_By", "datatype" : "string"}
	];
	response = fileLib.insertFile(imageTables[tabelname], "Selfi_Video", columns);
	response = fileLib.updateFile(imageTables[tabelname], "Personal_Video", [], [{"column":"Application_Number","operator":"EQ","value":Application_Number,"datatype":"string"}]);
}catch(e){
	response = {"code":522,"message":"Unable to insert your task"};
	response = "failed " +e;
}
$response.getWriter().println(""+response);