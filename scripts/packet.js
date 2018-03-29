var totalPackets = $request.getParameter("totalPackets");
var packetid = $request.getParameter("packetid");
var packet = $request.getParameter("packet");

var data = {
	"totalPackets" : totalPackets,
	"packetid" : packetid,
	"packet" : packet
}

function sendResponse(result){
	result = JSON.stringify(result); 
	$response.addHeader("Content-Type", "application/json");
	$response.getWriter().println(result);	
}

sendResponse(data);