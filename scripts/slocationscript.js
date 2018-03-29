
function loadLib(libName, projectName, libVar) {
	var lib = '' + $sm.readFile(libName, projectName, 1); //convert string from java (js object) to native js string
	if (lib) {
		this[libVar] = eval(lib);
	}
}
loadLib("shttp.js", "RlifeAssist", "HttpClient");

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
	//java.lang.System.out.println("Result - " + JSON.stringify(result));
	$response.addHeader("Content-Type", "application/json");
	$response.getWriter().println(result);
	writelog("RlifeAssistLogs", "logs", "ReponseQuery ----------------------------------- " + result+ "------------------------------------------------");
}

function writelog(folder, file, sapCode) {
   loadLib("loggerAudit.js", "RlifeAssist", "Logger");
    var logger = new Logger();
   logger.writeFileLog(folder, file, sapCode);
}

function processRequest(action){
	var resp;
	writelog("RlifeAssistLogs", "logs", "RequestQuery ----------------------------------- " + sapCode + action+"-----------------------------------------");
	if(action == "getEkycBySapCode"){
	url = "http://lifelineuat.reliancelife.com/RassistServices/wsLeadActivityPlanning.svc/GetEKYCDetailsbySAP/"+sapCode;
	resp = fireHttpApi(url);
}
	return resp;
}

function fireHttpApi(url){
    var hc = new HttpClient();
    response = hc.get(url); 
    writelog("RlifeAssistLogs", "logs", "ResponsefireHttpApiQuery ----------------------------------- " + response+ "------------------------------------------------");
    response = JSON.parse(response);
	if(response.length != 0){
		for(var i=0;i<response.length;i++){
			var xmlObj = {"EKYC_xml" :response[i].EKYC_XML,"Lead_id":response[i].Lead_ID};
			var photoObj = {"customer_foto" :response[i].Customer_Photo,"Lead_id":response[i].Lead_ID};
			xmlArray.push(xmlObj);
			photoArray.push(photoObj);
			delete response[i].EKYC_XML;
			delete response[i].Customer_Photo;
			dataArray.push(response[i]);
			dataObj = {
				"xmlArray" : xmlArray,
				"photoArray" : photoArray,
				"dataArray" : dataArray
			};
		}
		return dataObj;
	}else{
	return null;
	}
}

var res = processRequest(action);
sendResponse(res);