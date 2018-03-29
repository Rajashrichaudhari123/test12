
function loadLib(libName, projectName, libVar) {
	var lib = '' + $sm.readFile(libName, projectName, 1); //convert string from java (js object) to native js string
	if (lib) {
		this[libVar] = eval(lib);
	}
}
loadLib("shttpclient.js", "RlifeAssist", "HttpClient");

var header = {
		"Content-Type": "application/json"
	};

var action  = $request.getParameter("action");
var sapCode =  $request.getParameter("sapCode");

var dataArray = [];
var xmlArray = [];
var photoArray = [];
var dataObj = {};

function sendResponse(result) {
	result = JSON.stringify(result); 
	$response.addHeader("Content-Type", "application/json");
	$response.getWriter().println(result);
}

function writelog(folder, file, sapCode) {
   loadLib("loggerAudit.js", "RlifeAssist", "Logger");
    var logger = new Logger();
   logger.writeFileLog(folder, file, sapCode);
}

function processRequest(action){
	var resp;
	if(action == "getEkycBySapCode"){
	url = "http://lifelineuat.reliancelife.com/RassistServices/wsLeadActivityPlanning.svc/GetEKYCDetailsbySAP/"+sapCode;
	resp = fireHttpApi(url);
}
	return resp;
}

function fireHttpApi(url){
    var hc = new HttpClient();
    response = hc.get(url); 
    response = JSON.parse(response);
	if(response.length != 0){
		for(var i=0;i<response.length;i++){
			delete response[i].EKYC_XML;
			delete response[i].Customer_Photo;
			dataArray.push(response[i]);
			dataObj = {
				"dataArray" : dataArray
			};
		}
		return dataObj;
	}else{
		dataObj = {
			"dataArray" : []
		}
		return dataObj;
	}
}

var res = processRequest(action);
sendResponse(res);