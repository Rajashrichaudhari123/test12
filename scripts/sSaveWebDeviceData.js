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

var data = $request.getParameter("data");
var action  = $request.getParameter("action");
data= JSON.parse(data);

function sendResponse(result) {
	result = JSON.stringify(result); 
	//java.lang.System.out.println("Result - " + JSON.stringify(result));
	$response.addHeader("Content-Type", "application/json");
	$response.getWriter().println(result);
	writelog("RlifeAssistLogs", "logs", "ReponseQuery ----------------------------------- " + result+ "------------------------------------------------");
}

function writelog(folder, file, data) {
   loadLib("loggerAudit.js", "RlifeAssist", "Logger");
    var logger = new Logger();
   logger.writeFileLog(folder, file, data);
}

function processRequest(action){
	var resp;
	writelog("RlifeAssistLogs", "logs", "RequestQuery ----------------------------------- " + JSON.stringify(data) + action+"-----------------------------------------");
	if(action == "SaveDeviceInfo"){
	  url = "http://lifelineuat.reliancelife.com/RassistServices/wsLeadActivityPlanning.svc/SaveDeviceCompatiblityInfo";
	  resp = fireHttp(url,data,header);           
	}
return resp;
}

function fireHttp(url,requestData,addHeaders){
	if (addHeaders) {
        headers = addHeaders;
    } else {
        headers = {
            "Content-Type": "application/json"
        };
    }
	var hc = new HttpClient();
    requestData = JSON.stringify(requestData);
    writelog("RlifeAssistLogs", "logs", "RequestfireHttpQuery ----------------------------------- " + requestData+ "------------------------------------------------");
    response = hc.post(url, requestData, headers);
    writelog("RlifeAssistLogs", "logs", "ResponsefireHttpQuery ----------------------------------- " + response+ "------------------------------------------------");
    response = JSON.parse(response);
    return response;
}
function fireHttpApi(lat,long){
    var hc = new HttpClient();
  	hc.setProxy("10.185.6.144", "8080");
  	if(!lat || !long){
    	lat = 0.0;
    	long = 0.0;
    }
    response = hc.get(encodeURI("https://maps.googleapis.com/maps/api/geocode/json?latlng="+ lat +","+ long + "&sensor=false&key=AIzaSyAOORHmf3m8sKdKs-2s5yHxrxTnVE3hkO0"));  
    response = JSON.parse(response);
//    return response.results[1].formatted_address;
	if(response.status != "ZERO_RESULTS"){
		 return response.results[1].formatted_address;
	}else{
		return null;
	}
}

var res = processRequest(action);
sendResponse(res);