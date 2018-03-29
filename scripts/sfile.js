/*

Mowbly Server Side Script File Support API
Aug 10th 2015

sfile is a file API for server scripts that can be used to upload/download files in server scripts.
The following are the implemented methods

1. insertFile - to insert a file uploaded via multi part HTTP request to a specific table/column in a given database
	table - name of the table to insert file
	fileColumn - name of the column to insert file
	columns - array of other columns to be inserted along with the file which are provided as http parameters
		[{"column":"columnName","datatype":"string|int|long|float|double"}]

2. getFile - directly flushs a file content into the HTTP response output stream. File is read from a specific column of a row
	table - name of the table to read file
	column - name of the column containing the file
	filter - filter of column values to apply to get a specific file from the table
		[{"column":"columnName","value":"columnValue","datatype":"string|int|long|float|double"}]
	fileName - name of the file read [optional]
	contentType - mime type of the file read [optional]
	contentDisposition - true/false [default: false], can be set to mark file as download/attachment (alters browser behavior)
	
3. updateFile - to update a file uploaded via multi part HTTP request to a specific table/column in a given database
	table - name of the table to insert file
	key - object of column to check for particular record
			{"column":"columnName","datatype":"string|int|long|float|double|varchar|numeric"}
	fileColumn - name of the column to insert file
	columns - array of other columns to be inserted along with the file which are provided as http parameters
		[{"column":"columnName","datatype":"string|int|long|float|double|varchar|numeric"}]
		

Usage:
1. Copy sfile.js into your project

2. Copy paste the following to the top of your server script, ensure that loadLib is already not available

//--> Start Copy

function loadLib(libName, projectName, libVar){
	var lib = ''+$sm.readFile(libName, projectName, 1); //convert string from java (js object) to native js string
	if(lib){
		this[libVar] = eval(lib);
	}
}
loadLib("sfile.js", [PROJECTNAME], "File");

var fileLib = new File();
fileLib.database = [DATABASE NAME];
fileLib.dbProvider = [DB PROVIDER];
try{
	rVal = fileLib.insertFile("files", "file", [{"column":"name","datatype":"string"}]);
}catch(httperr){
	//TODO handle errors
}

//--> End Copy

3. Remember to use the right project name when calling loadLib function

*/

function smdbfile(){
	this.accessKey = null;
	this.database = null;
	this.dbProvider = null;
	this.dbPort = null;
	this.dbHost = null;
	this.dbUsername = null;
	this.dbPassword = null;
	this.classForName = null;

	this.DB_MYSQL = 1;
	this.DB_ORACLE = 2;
	this.DB_MSSQL = 3;

	this.CT_JPEG = "image/jpeg";
	this.CT_PNG = "image/png";
	this.CT_GIF = "image/gif";
	this.CT_BMP = "image/bmp";
	
	this.CT_MP4 = "video/mp4";

	this.CT_AIFF = "audio/x-aiff";

	this.CT_DOC = "application/msword";
	this.CT_DOCX = "application/msword";
	this.CT_PPT = "application/mspowerpoint";
	this.CT_PPTX = "application/mspowerpoint";
	this.CT_XLS = "application/mspowerpoint";
	this.CT_XLSX = "application/msexcel";

	this.CT_GZIP = "application/x-gzip";
	this.CT_TEXT = "text/plain";
	this.CT_OCTET_STREAM = "application/octet-stream";

	this.insertFile = function(table, fileColumn, columns){
	//	java.lang.System.out.println("***************************fileColumn********************"+fileColumn);
		rVal = null;
		item = $request.getPart(fileColumn);
	//	java.lang.System.out.println("***************************item********************"+item);
		if(item)
			rVal = this.insert(table, fileColumn, columns, item.getInputStream());
		else{
			rVal = '{"code":522,"message":"Could not get file stream"}';
		}
		return rVal;
	};
	
	this.updateFile = function(table, fileColumn, columns, filter){
		rVal = null;
		item = $request.getPart(fileColumn);
		rVal = this.update(table, fileColumn, columns, filter, item.getInputStream());
		return rVal;
	};
	
	this.insertBlob = function(table, blobColumn, blob, columns){
		rVal = null;
		if(!blob)
			blob = $request.getParameter(blobColumn);
		stream = new java.io.ByteArrayInputStream(new java.lang.String(blob).getBytes());
		rVal = this.insert(table, blobColumn, columns, stream);
	//	java.lang.System.out.println("***************************stream********************"+stream);
	//	java.lang.System.out.println("***************************blob********************"+blob);
		//writelog("RLIFELOGS", "Boblogs", "blob - " + blob);
	//	java.lang.System.out.println("***************************rVal********************"+rVal);
		return rVal;
	};

	this.insert = function(table, fileColumn, columns, blobStream){
	//	java.lang.System.out.println("***************************table********************"+table);
		//writelog("RLIFELOGS", "logs", "blobStream - " + blobStream);
		rVal = null;
		conn = this.getDBConnection();
		sql = "INSERT INTO " + table + " ";
		//java.lang.System.out.println("***************************sql********************"+sql);
		var colStr = "(" + fileColumn + ",";
		var valStr = " values (?,";
		for(var i=0;i<columns.length;i++){
			colStr += columns[i].column + ",";
			valStr += "?,";
		}
		colStr = colStr.substring(0, colStr.length-1);
		valStr = valStr.substring(0, valStr.length-1);

		colStr += ") ";
		valStr += ")";

		sql += colStr + valStr;
		statement = conn.prepareStatement(sql);
		//java.lang.System.out.println("***************************statement********************"+statement);
		if(this.dbProvider == this.DB_MSSQL){
			statement.setBinaryStream(1, blobStream);
		}else{
			statement.setBlob(1, blobStream);
		}
		//java.lang.System.out.println("***************************statementsetBinaryStream********************"+statement.setBinaryStream);
		//java.lang.System.out.println("***************************columns********************"+JSON.stringify(columns));
		for(i=0;i<columns.length;i++){
			idx = i+2; //start from index 2 as index 1 is used for file field
			if(!columns[i].value)
				value = $request.getParameter(columns[i].column);
			else
				value = columns[i].value;
			switch(columns[i].datatype){
				case "string":
					statement.setString(idx, value);
					break;
				case "int":
					statement.setInt(idx, value);
					break;
				case "long":
					statement.setLong(idx, value);
					break;
				case "float":
					statement.setFloat(idx, value);
					break;
				case "double":
					statement.setDouble(idx, value);
					break;
				case "varchar":
					statement.setString(idx, value);
					break;
				case "numeric":
					statement.setFloat(idx, value);
					break;
			}
		}
		row = statement.executeUpdate();
		if (row > 0) {
			rVal = true;
		}
		conn.close();
		return rVal;
	};
	
    this.updateBlob = function(table, blobColumn, blob, columns, filter, isString){
		rVal = null;
		if(!blob)
			blob = $request.getParameter(blobColumn);
		if(isString){
			stream = new java.io.ByteArrayInputStream(blob);
		} else {
			stream = new java.io.ByteArrayInputStream(new java.lang.String(blob).getBytes("UTF-8"));
		}
		rVal = this.update(table, blobColumn, columns, filter, stream);
		return rVal;
	};
	
	this.updateFile = function(table, fileColumn, columns, filter){
		rVal = null;
		item = $request.getPart(fileColumn);
		rVal = this.update(table, fileColumn, columns, filter, item.getInputStream());
		return rVal;
	};

	
	this.update = function(table, fileColumn, columns, filter, blobStream){
		rVal = null;
		sql = "UPDATE " + table + " SET ";

		var colStr = fileColumn + "=?,";
		for(var i=0;i<columns.length;i++){
			colStr += columns[i].column + "=?,";
		}
		colStr = colStr.substring(0, colStr.length-1);
		sql += colStr ;
		sql +=" WHERE ";
		for(i=0;i<filter.length;i++){
				sql += filter[i].column;
				switch(filter[i].operator){
					case "EQ":
						sql += "=";
						break;
					case "NEQ":
						sql += "<>";
						break;
					case "GT":
						sql += ">";
						break;
					case "GTE":
						sql += ">=";
						break;
					case "LT":
						sql += "<";
						break;
					case "LTE":
						sql += "<=";
						break;
				}
				sql += "?";
				if(i+1 < filter.length)
					sql += " AND ";
		}
		
		conn = this.getDBConnection();
		statement = conn.prepareStatement(sql);
	//	java.lang.System.out.println("sfilequery: "+sql);
		
		if(this.dbProvider == this.DB_MSSQL || this.dbProvider == this.DB_ORACLE){
			statement.setBinaryStream(1, blobStream);
		}else{
			statement.setBlob(1, blobStream);
		}
		
		for(i=0;i<columns.length;i++){
			idx = i+2;
			switch(columns[i].datatype){
				case "string":
					statement.setString(idx, columns[i].value);
					break;
				case "int":
					statement.setInt(idx, columns[i].value);
					break;
				case "long":
					statement.setLong(idx, columns[i].value);
					break;
				case "float":
					statement.setFloat(idx, columns[i].value);
					break;
				case "double":
					statement.setDouble(idx, columns[i].value);
					break;
				case "numeric":
					statement.setFloat(idx, columns[i].value);
					break;
			}
		}
		
		i = columns.length + 1;
		for(var j=0;j<filter.length;j++){
			idx = i+1;
		//	java.lang.System.out.println("sfilefilter: "+(idx + " - " + filter[j].value));
			switch(filter[j].datatype){
				case "string":
					statement.setString(idx, filter[j].value);
					break;
				case "int":
					statement.setInt(idx, filter[j].value);
					break;
				case "long":
					statement.setLong(idx, filter[j].value);
					break;
				case "float":
					statement.setFloat(idx, filter[j].value);
					break;
				case "double":
					statement.setDouble(idx, filter[j].value);
					break;
				case "numeric":
					statement.setFloat(idx, filter[j].value);
					break;
			}
		}
		
		result = statement.executeUpdate();
		//java.lang.System.out.println("sfileresult: "+result);

		conn.close();
		return result;
	};
	
	this.getFile = function(table, column, filter, fileName, contentType, contentDisposition){
//		java.lang.System.out.println("***************************table*************"+table);
//		java.lang.System.out.println("***************************column*************"+column);
//		java.lang.System.out.println("***************************filter*************"+filter);
//		java.lang.System.out.println("***************************contentType*************"+contentType);
//		java.lang.System.out.println("***************************contentDisposition*************"+contentDisposition);
		this.get(table, column, filter, fileName, contentType, contentDisposition);
	};
	
	this.getTextBlob = function(table, column, filter){
		return this.get(table, column, filter, null, null, null, true);
	};
	
	this.get = function(table, column, filter, fileName, contentType, contentDisposition, isText){
		//return JSON.stringify(filter);
		var rVal = null;
		if(!contentType)
			contentType = this.CT_OCTET_STREAM;
		var query = "SELECT " + column + " FROM " + table + " WHERE ";
	//	java.lang.System.out.println("***************************Query*************"+query);
		for(var i=0;i<filter.length;i++){
				query += filter[i].column;
				switch(filter[i].operator){
					case "EQ":
						query += "=";
						break;
					case "NEQ":
						query += "<>";
						break;
					case "GT":
						query += ">";
						break;
					case "GTE":
						query += ">=";
						break;
					case "LT":
						query += "<";
						break;
					case "LTE":
						query += "<=";
						break;
				}
				query += "?";
				if(i+1 < filter.length)
					query += " AND ";
		}
		
		conn = this.getDBConnection();
	//	java.lang.System.out.println("***************************conn*************"+conn);
		statement = conn.prepareStatement(query);
	//	java.lang.System.out.println("***************************statement*************"+statement);
		i=0;
		for(i=0;i<filter.length;i++){
			idx = i+1;
			switch(filter[i].datatype){
				case "string":
					statement.setString(idx, filter[i].value);
					break;
				case "int":
					statement.setInt(idx, filter[i].value);
					break;
				case "long":
					statement.setLong(idx, filter[i].value);
					break;
				case "float":
					statement.setFloat(idx, filter[i].value);
					break;
				case "double":
					statement.setDouble(idx, filter[i].value);
					break;
				case "numeric":
					statement.setFloat(idx, filter[i].value);
					break;
			}
		}

		result = statement.executeQuery();
	//	java.lang.System.out.println("***************************result*************" + result);
		//result.next();
		//return result.getFetchSize();
		if (result.next()) {
                blob = result.getBlob(column);
             //   java.lang.System.out.println("*********************Blob*****************" + blob);
                inputStream = blob.getBinaryStream();
              //  java.lang.System.out.println("*********************inputStream*****************" + inputStream);
                if(!isText){ //return as file content directly on the http response stream
                //java.lang.System.out.println("***************************isText************* - true");
					fileLength = inputStream.available();
			//		java.lang.System.out.println("***************************fileLength*************" + fileLength);
					$response.setContentType(contentType);
			//		java.lang.System.out.println("***************************contentType*************" + contentType);
					$response.setContentLength(fileLength);
			//		java.lang.System.out.println("***************************fileLength*************" + fileLength);
					if(contentDisposition && fileName)
						$response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
					
					outStream = $response.getOutputStream();
                }else{ // return as string
               // java.lang.System.out.println("***************************isText************* - false");
					outStream = new java.io.ByteArrayOutputStream(inputStream.available());
                }
                
                buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024*100); //100Kb byte array
				bytesRead = -1;
				
				while ((bytesRead = inputStream.read(buffer)) != -1) {
					outStream.write(buffer, 0, bytesRead);
				}
				if(isText){
					rVal = "" + new java.lang.String(outStream.toByteArray());
				}
				
				inputStream.close();
				outStream.close();
		}
		conn.close();
		if(isText)
		//java.lang.System.out.println("***************************rVal*************" + rVal);
			return rVal;
	};

	this.getDBConnection = function(){
		conn=null;
		switch(this.dbProvider){
			case this.DB_MYSQL:
				conn = com.cloudpact.mowbly.data.mysql.DatabaseConnection.getConnection(this.database);
				break;
			case this.DB_ORACLE:
				//TODO
				break;
			case this.DB_MSSQL:
				connectionString = "jdbc:sqlserver://"+this.dbHost+":"+this.dbPort+";databaseName="+this.database+";user="+this.dbUsername+";password="+this.dbPassword;
				//java.lang.System.out.println(connectionString);
				java.lang.Class.forName(this.classForName);
				conn = java.sql.DriverManager.getConnection(connectionString);
				break;
			default:
				break;
		}
		return conn;
	};
}