function loadLib(libName, projectName, libVar) {
	var lib = '' + $sm.readFile(libName, projectName, 1); //convert string from java (js object) to native js string
	if (lib) {
		this[libVar] = eval(lib);
	}
}
loadLib("shttpclient.js", "RlifeAssist", "HttpClient");

var data = $request.getParameter("data");
data= JSON.parse(data);
//$response.getWriter().println("JSON.stringify(data)");
//$response.getWriter().println(data);
var action  = $request.getParameter("action");

function sendResponse(result) {
	result = JSON.stringify(result); 
	//java.lang.System.out.println("Result - " + JSON.stringify(result));
	$response.addHeader("Content-Type", "application/pdf");
	$response.getWriter().println(result);
}

function processRequest(data){
	var resp;
	if(data.action == "generatePDF"){
		//$response.getWriter().println(data.action);
		resp = generatePDF(data);
		//$response.getWriter().println(resp);
		
	}
	else if(data.action == "downloadPDF"){
		resp = downloadPDF(data);
	}
	return resp;
}

function generatePDF(data){
var headers = {
       "Content-Type": "application/x-www-form-urlencoded"
   };
   var hc = new HttpClient();  
   var hsource = data.hsource;
   var xslsource = data.template;
   var filename = data.filename;
   response = hc.post("http://10.65.8.221:7008/mtools/GenPDFFromXML","hsource="+java.net.URLEncoder.encode(new java.lang.String(hsource), "UTF-8")+"&xslsource="+java.net.URLEncoder.encode(new java.lang.String(xslsource), "UTF-8")+"&filename="+filename, headers);  
   return response;
}
//http://10.65.15.179/mtools/GenPDFFromXML"10.126.249.116
//function downloadPDF(data){
//	var bytearray = [];
//	var headers = {
//	       "Content-Type": "application/x-www-form-urlencoded"
//	   };
//	   var fileName = data.filename;
//	var data = {
//	"a":"readfile",
//	"databasename" : "eOPS_Staging",
//	"blobkey" : data.blobkey
//	}
//	
//	var contentDisposition = true;
//	var contentType = "application/pdf";
//	loadLib("shttp.js", "SMP", "HttpClient");
//	var hc = new HttpClient(); 
//	bytearray = hc.postForBinaryResponse("http://10.65.15.179/mcraftuat/storageservice?a=readfile&databasename=smpuat&blobkey="+data.blobkey, {}, headers, false, contentType, fileName, true);
//	//bytearray = string.getBytes();
//	$response.addHeader("Content-Disposition", "attachment; filename='" + fileName +"'");
//	$response.setContentType("application/pdf");
//	//$response.getWriter().println(bytearray+'');
//	$response.getOutputStream().write(bytearray, 0, bytearray.length);
//	var response = {
//	"code" : 200
//	}	
//	return response;
//}

var res = processRequest(data);
sendResponse(res);