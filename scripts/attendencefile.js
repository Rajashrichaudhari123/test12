/**
 * Attendance File.js
 * @author CloudPact Technologies
 * @description : This script is for storing attendace logs in server folder.
 **/

var data = $request.getParameter("data");
data = JSON.parse(data);
var folderPath = {
		"path" : "E://mowbly//",
		"folder" : "Attendence logs"
	}
	
function processrequest(requestdata){
	writefiles(requestdata);
}

function writefiles(request) {
//	$response.getWriter().println(request);
	var  fileName = "attendencelogs.txt";
	java.lang.System.out.println(fileName + " - ");
	tempFolderPath = folderPath.path;
    var currentTime = new Date();
    var folderName = folderPath.folder;
    try {
	    parentDir = new java.io.File(tempFolderPath + "\\" + folderName);
	    if(!parentDir.exists()){
	    	parentDir.mkdir();
	    }
	   txtFile = new java.io.File(tempFolderPath + "\\" + folderName + "\\" + fileName);
	    is = new java.io.FileOutputStream(txtFile,true);
	    var w = new java.io.OutputStreamWriter(is, "UTF-8");
	    var bw = new java.io.BufferedWriter(w);
        bw.write(" "+ request);
	    bw.newLine();
	    bw.close();
	} catch (e) {
	    e.printStackTrace();
	    java.lang.System.out.println("Result - " + e.printStackTrace());
	}
}

function sendResponse(result){
	result = JSON.stringify(result); 
	//java.lang.System.out.println("Result - " + JSON.stringify(result));
	$response.addHeader("Content-Type", "application/json");
	$response.getWriter().println(result);	
}

var req = processrequest(data);