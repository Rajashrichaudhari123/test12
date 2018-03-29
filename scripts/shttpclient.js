/*

Mowbly Server Side Script HTTP Client
Feb 14th 2015

shttpclient is a http client for server scripts that can be used to call web services from server scripts. It uses the 
default java http client for now and should be ported to use Apache HTTP Client. The following are the implemented methods

1. GET - a simple default implementation of HTTP GET, the best usecase is to trigger a local service URL

Usage:
1. Copy slogger.js and logclient.js into your project

2. Copy paste the following to the top of your server script, ensure that loadLib is already not available

//--> Start Copy

function loadLib(libName, projectName, libVar){
	var lib = ''+$sm.readFile(libName, projectName, 1); //convert string from java (js object) to native js string
	if(lib){
		this[libVar] = eval(lib);
	}
}
loadLib("shttpclient.js", [PROJECTNAME], "HttpClient");

var hc = new HttpClient();
try{
	var resp = hc.get(URL); //Ensure the URL parameters are properly encoded.
}catch(httperr){
	//TODO handle errors
}

//--> End Copy

3. Remember to use the right project name when calling loadLib function

*/

/*function http(){
	this.get = function(url, options){
		
		//TODO support options like $m.get
		urlstr = new java.lang.String(url);
		url = new java.net.URL(urlstr);
		conn = url.openConnection();
		conn.setRequestMethod("GET");
		
		isr = new java.io.InputStreamReader(conn.getInputStream());
		inbuf = new java.io.BufferedReader(isr);
		respStr = "";
		inputLine = "";
		while ((inputLine = inbuf.readLine()) !== null) {
			respStr += inputLine;
		}
		inbuf.close();
		return respStr;
	};
	
	this.post = function(url, data, options){
		urlstr = new java.lang.String(url);
		datastr = new java.lang.String(data);
		url = new java.net.URL(urlstr);
		conn = url.openConnection();
		conn.setRequestMethod("GET");
		conn.setDoOutput(true);
		
		wr = new java.ioDataOutputStream(conn.getOutputStream());
		wr.writeBytes(datastr);
		wr.flush();
		wr.close();
		
		responseCode = conn.getResponseCode();
		inStream = new java.io.BufferedReader(new java.io.InputStreamReader(conn.getInputStream()));
		var inputLine;
		response = new java.lang.StringBuffer();
 
		while ((inputLine = inStream.readLine()) !== null) {
			response.append(inputLine);
		}
		inStream.close();
		return inStream.toString();
	};
}*/


/*

Mowbly Server Side Script HTTP Client
Feb 14th 2015

shttpclient is a http client for server scripts that can be used to call web services from server scripts. It uses the 
default java http client for now and should be ported to use Apache HTTP Client. The following are the implemented methods

1. GET - a simple default implementation of HTTP GET, the best usecase is to trigger a local service URL

Usage:
1. Copy slogger.js and logclient.js into your project

2. Copy paste the following to the top of your server script, ensure that loadLib is already not available

//--> Start Copy

function loadLib(libName, projectName, libVar){
	var lib = ''+$sm.readFile(libName, projectName, 1); //convert string from java (js object) to native js string
	if(lib){
		this[libVar] = eval(lib);
	}
}
loadLib("shttpclient.js", [PROJECTNAME], "HttpClient");

var hc = new HttpClient();
try{
	var resp = hc.get(URL); //Ensure the URL parameters are properly encoded.
}catch(httperr){
	//TODO handle errors
}

//--> End Copy

3. Remember to use the right project name when calling loadLib function

*/

/*
TO DO

1. Add proxy support

*/

function http(){
	this.proxyHost = null;
	this.proxyPort = null;
	this.setProxy = function(proxyHost, proxyPort){
		this.proxyHost = proxyHost;
		this.proxyPort = proxyPort;
	};
	this.get = function(url, options){
		
		//TODO support options like $m.get
		urlstr = new java.lang.String(url);
		url = new java.net.URL(urlstr);
		conn = url.openConnection();
		conn.setRequestMethod("GET");
		
		isr = new java.io.InputStreamReader(conn.getInputStream());
		inbuf = new java.io.BufferedReader(isr);
		respStr = "";
		inputLine = "";
		while ((inputLine = inbuf.readLine()) !== null) {
			respStr += inputLine;
		}
		inbuf.close();
		return respStr;
	};
	
	this.post = function(serverUrl, data, headers){
		urlstr = new java.lang.String(serverUrl);
		url = new java.net.URL(urlstr);
		urlConn = null;
		if(this.proxyHost && this.proxyPort){
			proxy = new java.net.Proxy(java.net.Proxy.Type.HTTP,new java.net.InetSocketAddress(this.proxyHost, this.proxyPort));
			urlConn = url.openConnection(proxy);
		}
		else{
			urlConn = url.openConnection();
		}
		//java.lang.System.out.println("******************************************** urlConn ******************" + urlConn);
		urlConn.setRequestMethod("POST");
		urlConn.setDoInput(true);
		urlConn.setDoOutput(true);
		urlConn.setUseCaches(false);
		for(var h in headers){
			urlConn.setRequestProperty(new java.lang.String(h), new java.lang.String(headers[h]));
			//java.lang.System.out.println(headers[h]);
		}
		
		cgiInput = new java.io.DataOutputStream(urlConn.getOutputStream());
		var content = data;
		cgiInput.writeBytes(content);
		//java.lang.System.out.println("******reqdata*****************************************************************************************"+JSON.stringify(content));
		//java.lang.System.out.println("Conn1 = " + urlConn.getContentType());
		cgiInput.flush();
		cgiInput.close();
		isr = new java.io.InputStreamReader(urlConn.getInputStream());
		
		inbuf = new java.io.BufferedReader(isr);
		respStr = "";
		inputLine = "";
		while ((inputLine = inbuf.readLine()) !== null) {
			respStr += inputLine;
		}
		inbuf.close();
		response = respStr;
		sessionHeader = urlConn.getHeaderField("Set-Cookie");
		if(sessionHeader != null){
			respStrHeader = "";
			sessionStream = new java.io.ByteArrayInputStream(sessionHeader.getBytes());
			inbufHeader = new java.io.BufferedReader(new java.io.InputStreamReader(sessionStream));
			inputLineHeader = "";
			while ((inputLineHeader = inbufHeader.readLine()) !== null) {
				respStrHeader += inputLineHeader;
				//java.lang.System.out.println("Response String -------------" + respStrHeader);
			}
			inbufHeader.close();	
			//java.lang.System.out.println("*********Final String*****" + respStrHeader);
			response = {
				"header" : respStrHeader.toString(),
				"data" : respStr 
			}
			response = JSON.stringify(response);
		}
	//	java.lang.System.out.println("******************************************** response ******************" + response);
		return response;
	};
	
		this.postForBinaryResponse = function(serverUrl, data, headers, contentDisposition, contentType, fileName, giveBytes){
		try{
			urlstr = new java.lang.String(serverUrl);
			url = new java.net.URL(urlstr);
			urlConn = null;
			if(this.proxyHost && this.proxyPort){
				proxy = new java.net.Proxy(java.net.Proxy.Type.HTTP,new java.net.InetSocketAddress(this.proxyHost, this.proxyPort));
				urlConn = url.openConnection(proxy);
			}
			else{
				urlConn = url.openConnection();
			}
			//java.lang.System.out.println("******************************************** urlConn ******************" + urlConn);
			urlConn.setRequestMethod("POST");
			urlConn.setDoInput(true);
			urlConn.setDoOutput(true);
			urlConn.setUseCaches(false);
			for(var h in headers){
				urlConn.setRequestProperty(new java.lang.String(h), new java.lang.String(headers[h]));
				java.lang.System.out.println(headers[h]);
			}
			
			cgiInput = new java.io.DataOutputStream(urlConn.getOutputStream());
			var content = data;
			cgiInput.writeBytes(content);
			//java.lang.System.out.println("Conn1 = " + urlConn.getContentType());
			cgiInput.flush();
			cgiInput.close();
			inputStream = urlConn.getInputStream();
			java.lang.System.out.println("Content Type - " + inputStream.available());
			if(!giveBytes){
				outputStream = $response.getOutputStream();
	 			fileLength = inputStream.available();
				$response.setContentType(contentType);
				if(contentDisposition && fileName)
					$response.setHeader("Content-Disposition", "attachment; filename="+fileName);
			} else{ // return as string
				outputStream = new java.io.ByteArrayOutputStream(inputStream.available());
            }
			bytesRead = -1;
            buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024*100);
            var count = 0;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
                count++;
            }
            var response = null;
            if(giveBytes){
				response = outputStream.toByteArray();
				//response = org.apache.commons.codec.binary.Base64.encodeBase64(outputStream.toByteArray());
				return response;
			}
 			outputStream.flush();
            outputStream.close();
            inputStream.close();
		} catch(e){
			response = {
					"header" : "FAIL",
					"data" : ""+e 
			}
			response = JSON.stringify(response);
		//	java.lang.System.out.println("******************************************** response ******************" + response);
			return response;
		}
	};
}