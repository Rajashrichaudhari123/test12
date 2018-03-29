function auditlogger(){
	this.rootDirectory = "E://mowbly";
	this.logIdentifier = "RLIFE";
	this.writeFileLog = function(folder, file, data){
		this.fileLog(folder, file, JSON.stringify(data));
	};
	
	this.fileLog = function(folder, file, data){
		try {
	        myDir = new java.io.File(this.rootDirectory + "\\" + folder);
	        myDir.mkdir();
	        myDir = new java.io.File(this.rootDirectory + "\\" + folder + "\\" + file);
	        myDir.mkdir();
	        statText = new java.io.File(this.rootDirectory + "\\" + folder + "\\" + file + "\\" + file  + "-" + this.getLogDate() + ".txt");
	        is = new java.io.FileOutputStream(statText, true);
	        osw = new java.io.OutputStreamWriter(is);
	        w = new java.io.BufferedWriter(osw);
	        w.write("\n");
	        w.write(this.getCurrentTime() + " ------ " + data);
	        w.write("\n");
	        w.close();
	    } catch (e) {
	        e.printStackTrace();
	    }
	}
	
	this.getLogDate = function(){
		var dateObj = new Date();
		var dateString = dateObj.getDate() + "-" + (dateObj.getMonth()+1) + "-" + dateObj.getFullYear();
		return dateString;
	};
	
	this.getCurrentTime = function(){
		var currentDate = new Date();
		return currentDate;
	};
	
	this.writeConsoleLog = function(logtype, message){
		message = this.getCurrentTime() + " : " + this.logIdentifier + " : " + message;
		if(logtype === "info"){
			java.lang.System.out.println(message);
		}else{
			java.lang.System.err.println(message);
		}
	}
}