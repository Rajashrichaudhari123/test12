/**
 * expertCallImagesUpload.js
 * @author CloudPact Technologies
 * @description : This script is for creating connection to server database,generating pdf and storing in server db.
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
	"Expert_To_Call" : "Expert_To_Call"
};

var response = "";

try{
	var tabelname = $request.getParameter("TABLE");
	var activity_result_id = $request.getParameter("Activity_Result_Id");
	var columns = [
		{"column" : "Updated_By", "datatype" : "string"},
		{"column" : "Lead_Id", "datatype" : "string"},
		{"column" : "Activity_Result_Id", "datatype" : "string"},
		{"column" : "Name", "datatype" : "string"},
		{"column" : "Mobile", "datatype" : "string"},
		{"column" : "Marital_Status", "datatype" : "string"},
		{"column" : "Income", "datatype" : "string"},
		{"column" : "Gender", "datatype" : "string"},
		{"column" : "City", "datatype" : "string"},
		{"column" : "Added_By", "datatype" : "string"}
	];
    response = fileLib.insertFile(imageTables[tabelname], "LifePlanner_Image1", columns);
	var image = ["LifePlanner_Image2","LifePlanner_Image3","LifePlanner_Image4", "LifePlanner_Image5"];
	for(var i =0;i<image.length;i++){
		response = fileLib.updateFile(imageTables[tabelname],image[i], [], [{"column":"Activity_Result_Id", "operator": "EQ","value":activity_result_id,"datatype":"string"}]);
	}	
}catch(error){
	response = {"code":522,"message":"Unable to insert your task"};
	response = ""+ error;
}
$response.getWriter().println(""+response);
