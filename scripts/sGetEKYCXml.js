
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
var lead_id =  $request.getParameter("lead_id");

var dataArray = [];
var xmlArray = [];
var fullArray = [];
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
	resp = fireHttpApi(url,lead_id);
}
	return resp;
}

function fireHttpApi(url,lead_id){
    var hc = new HttpClient();
    response = hc.get(url); 
    response = JSON.parse(response);
	if(response.length != 0){
		for(var i=0;i<response.length;i++){
			var xmlObj = {"customer" :response[i].Customer_Photo,"EKYC_XML" :response[i].EKYC_XML,"Lead_ID":response[i].Lead_ID};
			xmlArray.push(xmlObj);
		}
		for(var j =0; j < xmlArray.length; j++){
			if(lead_id == xmlArray[j].Lead_ID){
				var xmlValue  = {"customer" : xmlArray[j].customer,"ekycXml":xmlArray[j].EKYC_XML};
				fullArray.push(xmlValue);
			}
		}
		return fullArray;
	}else{
		xmlValue = {"ekycXml" : "","customer":""};
		fullArray.push(xmlValue);
		return fullArray;
	}
}

var res = processRequest(action);
sendResponse(res);