var
    // The logs database object
    db,
    // The fetch logs implementation
    fetchLogsImpl,
    // The fetch more button
    fetchMoreButton,
    // The clear logs button
    clearLogsButton,
    // The numbers of logs to fetch at once
    limit = 20,
    // Maintain a counter to know the offset of logs to fetch next time
    offset = 0,
    // The regex used to parse a log read from file (for BlackBerry)
    regex = /(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})[,.](\d{3})\s\[(\w+)\]\s\[(\w*)\]\s\[(\w*)\]\s(\w+)\s\-\s(.*)/;
	// Maintain logLevel to know the valu of logLevel. Default is null to fetch all the logs without any filter
	logLevel = "",
	// Search string 
	searchString = ""

// Create an empty dataset to store logs
$m.juci.addDataset("logs", []);
$m.juci.addDataset("loglist",["All","Debug","Info","Warn","Error","Fatal"]);
$m.juci.addDataset("searchObj",{"searchkey":""});

// On ready we initialize
$m.onReady(function() {
    // Set the page title
    juci.dataset("headerName","Logs");
    $m.pageTitle("Logs");

    // Initialize the fetchMoreButton & clearLogsButton
    fetchMoreButton = $m.juci.findById("fetchmore");
    fetchMoreButton.hide();

    clearLogsButton = $m.juci.findById("clearlogs");
    clearLogsButton.hide();

    // Initialize the logs fetching based on Bridge type
    if ($m.isBlackBerry()) {
        initializeFileLogs();
    } else {
        initializeDBLogs();
    }
});

function initializeFileLogs() {
    // Set the implementation as file
    fetchLogsImpl = fetchFileLogs;

    fetchLogs();
}

function initializeDBLogs() {
    // Set the implementation as db
    fetchLogsImpl = fetchDBLogs;

    clearLogsButton.show();

    $m.openDatabase("logs", function(response) {
        if (response.database) {
            db = response.database;
            fetchLogs();
        } else {
            $m.toast("Error occurred while opening logs database");
        }
    }, 1, "", 3);
}

function fetchLogs() {
    // Hide the fetch more button    
    fetchMoreButton.hide();

    $m.showProgress("Fetching Logs...");

    //fetchLogsImpl.call(null);
	if(logLevel && searchString){
		searchLogs(false);
	}else if(logLevel && !searchString){
		fetchDBLogs(logLevel);
	} else{
		fetchDBLogs("");
	}
	
	
}

function fetchDBLogs(level) {
    // The user whose logs needs to be fetched
    var username = __mowbly__.Page.userName,
    sqlQuery = "SELECT * FROM logs WHERE type = 'user' AND username = ? AND level like ? AND (tag like ? OR message like ?) ORDER BY timestamp DESC LIMIT ? OFFSET ?";
	db.executeSql(sqlQuery,
        // Success callback
        function(result) {
            var rows = result.rows || [],
                i = 0,
                j = rows.length,
                log;
            for (var i = 0, j = rows.length; i < j; i++) {
                log = rows[i];
                $m.juci.getDataset("logs").push(log);
            }

            offset = offset + j;

            if (j === limit) {
                // Show the fetch more button
                fetchMoreButton.show();
            }

            $m.hideProgress();
        },
        // Error callback
        function(error) {
            // Show the fetch more button
            fetchMoreButton.show();

            $m.hideProgress();
            $m.toast("Error occurred while fetching logs - " + error.message);
        },[username,"%"+logLevel.toUpperCase()+"%","%"+searchString+"%","%"+searchString+"%",limit,offset]);
}

function fetchFileLogs() {
	$m.readLogs(offset, limit, function(response) {
		if (response.code) {
			offset = response.result.next;

			var match, line, log
				data = response.result.data,
				i = 0, 
				j = data.length;
			for (; i < j; i++) {
				match = regex.exec(data[i]);
				if (match) {
					log = {
						'timestamp': new Date(match[1], match[2] - 1, match[3], match[4], match[5], match[6], match[7]).getTime(),
						'level': match[8],
                        'username': match[9],
                        'space': match[10],
						'tag': match[11],
						'message': match[12]
					};
                    if (log.username == username) {
                        $m.juci.getDataset("logs").push(log);
                    }
				}
			}

            if (j === limit) {
                // Show the fetch more button
                fetchMoreButton.show();
            }

            $m.hideProgress();
		} else {
            // Show the fetch more button
            fetchMoreButton.show();

            $m.hideProgress();
            $m.toast("Error occurred while fetching logs - " + response.error.message);
		}
	});
}

function resetLogs() {
	offset = 0;
    $m.juci.dataset("logs", []);
}

function refreshLogs() {
	resetLogs();
    fetchLogs();
}

function clearLogs() {
    // The user whose logs needs to be cleared
    var username = __mowbly__.Page.userName;
	logLevel = "";
    $m.showProgress("Clearing Logs...");

    db.executeSql("DELETE FROM logs WHERE type = 'user' AND username = '" + username + "'", 
        // Success callback
        function(result) {
            resetLogs();

            $m.hideProgress();
        },
        // Error callback
        function(error) {
            $m.hideProgress();
            $m.toast("Error occurred while clearing logs - " + error.message);
        });
}

function formatDateFromTimestamp(timestamp) {
    var date = new Date(parseInt(timestamp));
    return date.toString("dd MMM, yyyy HH:mm:ss");
}

function syncLogs(){
	$m.syncLogs();
}
function getSelectedLogs(event){
	logLevel = event.value;
	if(event.value === "All"){
		logLevel = "";
	}
	resetLogs();
	if(searchString){
		searchLogs(false);
	}else{
		fetchDBLogs(logLevel)
	}
}
function sendEmail(){
	var username = __mowbly__.Page.userName,
    sqlQuery = "SELECT * FROM logs WHERE type = 'user' AND username = ? AND level like ? AND (tag like ? OR message like ?) ORDER BY timestamp DESC ";
	db.executeSql(sqlQuery,function(result) {
		var rows = result.rows || [];               
		var dataToUpload = JSON.stringify(rows);
		$m.getVersionInfo(function(response){
			if (response.code){
				var appName = response.result.appName; 
				Framework.getClientSettings(function(response) {
					if (response.code === 1) {
						var settings = response.result;
						var current_service_url = settings.service_url;
						var current_company_identifier = settings.company_identifier || "";
						var space = settings.space;
						var current_space = (space == "dev") ? "Development" : ((space == "test") ? "Test" : "Production");
						var username = __mowbly__.Page.userName; 
						var emailSubject = appName + " logs - " + username + "@" +current_company_identifier+ " - " +  current_space ;
						var currentLogLevel = logLevel===""?'All':logLevel;
						var searchStatus = searchString===""?' - ':searchString;
						var emailBody = "Hi,\n"+
						"\t Please find application logs for user : "+username+"\n\n"+
						"Logs details \n"+
						"Application : "+appName+"\n"+
						"Username : "+username+"\n"+
						"Company : "+current_company_identifier+"\n"+
						"Space : "+current_space+"\n"+
						"Log level :"+currentLogLevel+"\n"+
						"Search keyword : "+searchStatus+"\n\n\n"+
						"Logs data : "+dataToUpload;
						
						$m.email([""], emailSubject, emailBody);	
					}
				});
			}
		});
	},function(error) {
		$m.alert("Error occurred while fetching logs - " + error.message);
	},[username,"%"+logLevel.toUpperCase()+"%","%"+searchString+"%","%"+searchString+"%"]);	
}

function clearSearch(){
	$m.juci.getControl('searchtext').value(null);
	searchString = "";
	refreshLogs();
}
function searchLogs(btnClick){
	searchString = $m.juci.getControl('searchtext').value();
	var username = __mowbly__.Page.userName;
	if(btnClick){
		offset = 0;
		$m.juci.dataset("logs",[]);
	}
	fetchDBLogs(logLevel);
}

function getClientSettings() {
	$m.showProgress("Fetching Client Settings");
}
