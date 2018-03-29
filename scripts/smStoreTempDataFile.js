/**
 * smStoreTempDataFile.js
 * @author CloudPact Technologies
 * @description : This script is used for retrieving all records from local to server.
 **/

tempFolderPath = java.lang.System.getProperty("jboss.server.temp.dir");
var data = $request.getParameter("data");
var appNumber = $request.getParameter("appNo");
var tableName = $request.getParameter("tableName");
try {
    //Whatever the file path is.
    myDir = new java.io.File(tempFolderPath+"\\"+appNumber);
    myDir.mkdir();
    statText = new java.io.File(tempFolderPath+"\\"+appNumber+"\\"+appNumber+"-"+tableName+".txt");
    is = new java.io.FileOutputStream(statText);
    osw = new java.io.OutputStreamWriter(is);    
    w = new java.io.BufferedWriter(osw);
    w.write(data);
    w.close();
    result = {"message": "Successfully Retrieved."};
} catch (e) {
	result = {"message": "Sorry, Its not retrieved."};
    e.printStackTrace();
}

$response.getWriter().println(JSON.stringify(result));