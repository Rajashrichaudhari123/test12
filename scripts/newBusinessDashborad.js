var customerName=["Ashoke M", "Foreign", "Domestic"];
$m.juci.addDataset("customerName", customerName);
var timePeriod=["All", "Foreign", "Domestic"];
$m.juci.addDataset("timePeriod", timePeriod);
$m.juci.addDataset("selectedPeriod", "Month to Date");
$m.juci.addDataset("selectedCustomerName", "Select All ARDM");
$m.juci.addDataset("Customer_name", "Ashoke M");
$m.juci.addDataset("graph",[]);
$m.juci.addDataset("graphData",{});
var graph=[{
		"color":"#FFF",
		"dataValue":100,
		"type":"Leads"
	},{
		"color":"blue",
		"dataValue":90,
		"type":"Appointments"
	},{
		"color":"white",
		"dataValue":80,
		"type":"Logins"
	},
	{
		"color":"red",
		"dataValue":70,
		"type":"SuperExpessLogins"
	},{
		"color":"blue",
		"dataValue":60,
		"type":"Issuance"
	},{
		"color":"white",
		"dataValue":0,
		"type":"SuperExpressIssuance"
	}
]
$m.juci.dataset("graph",graph);
$m.juci.addDataset("isIntersection",false);

$m.onReady(function(eventObject) {
	initReady()
});
var footerGraph=[{
		"color":"white",
		"value":0,
		"type":"DailyNBAppt"
	},{
		"color":"blue",
		"value":60,
		"type":"SELogins"
	}];
	$m.juci.addDataset("footerGraph",footerGraph);
//to dinyamicall add classess  to increase or decrese the block width
function initReady() {
	var count=0;
	for (i = 0; i < graph.length; i++) {
		var element=graph[i];
		count++;
		var val=element.value;
		if(val==0)
		{
			val= 10;
		}
		var margin=(100-val)/2;
	$m.juci.getControl("new").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.width=val+"%";
	$m.juci.getControl("new").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.marginLeft=margin+"%";
	$m.juci.getControl("new").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.backgroundColor=element.color;
	}
	for (i = 0; i < footerGraph.length; i++) {
		var element=footerGraph[i];
		var val=element.value;
		if(val==0)
		{
			val= 50;
		}
		var margin=(100-val)/2;
		$m.juci.getControl("list").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.width=val+"%";
		$m.juci.getControl("list").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.marginLeft=margin+"%";
		$m.juci.getControl("list").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.backgroundColor=element.color;
}
	initResume();
}

function initResume () {
 	if($m.networkConnected()){
 		utils.ShowProgress("Fetching new business progress data, please wait..");
 		var requestData = {
			"ARDMSapCode": "",
			"BMSapCode": "",
			"DT": "1516579200000",
			"DateCode": "YTD",
			"ENDDATE": "",
			"QRTR": "",
			"RMSapCode": "70052392",
			"STARTDATE": "",
			"Service": "GetNewBusiness",
			"Type": "RM",
			"ZMSapCode": ""
 		}
		var service = new ServiceLibrary();
		var getNewBusinessprogressDataCallback = function(r) {
			if(r.Status == "Y") {
				var responseData = r.lstNewBusinessDataResponse_List[0];
				var data = responseData.lstNewBusinessDataResponse;
				for(var i=0;i<data.length;i++) {
					for(var j=0;j<graph.length;j++) {
						if(data[i].Data == graph[j].type) {
							graph[j].dataValue = parseInt(data[i].DataValues);
							graph[j].color = data[i].Color;
						}
					}
					for(var k=0;k<footerGraph.length;k++) {
						if(data[i].Data == footerGraph[k].type) {
							footerGraph[k].value = parseInt(data[i].DataValues);
							footerGraph[k].color = data[i].Color;
						}
					}
				}
				
				var count=0;
				$m.juci.dataset("footerGraph",footerGraph);
				$m.juci.dataset("graph",graph);
				for (i = 0; i < graph.length; i++) {
					var element=graph[i];
					count++;
					var val=element.dataValue;
					if(val==0)
					{
						val= 10;
					}
					var margin=(100-val)/2;
				
					$m.juci.getControl("new").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.width=val+"%";
					$m.juci.getControl("new").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.marginLeft=margin+"%";
					$m.juci.getControl("new").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.backgroundColor=element.color;
				}
				for (i = 0; i < footerGraph.length; i++) {
		var element=footerGraph[i];
		var val=element.value;
		if(val==0)
		{
			val= 50;
		}
		var margin=(100-val)/2;
		$m.juci.getControl("list").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.width=val+"%";
		$m.juci.getControl("list").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.marginLeft=margin+"%";
		$m.juci.getControl("list").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.backgroundColor=element.color;
}

				
			} else {
				$m.logError("Fetching new business progress data failed due to : "+ JSON.stringify(r));
			}
		};
		service.getNewBusinessData(getNewBusinessprogressDataCallback,requestData);
 	} else {
		$m.alert(messages.NoNetworkConnectivity);
  	};
 }


function getClassName(name){ 
	if (name() == "Meetings(Aadhaar)"){
		return 'Meetings_Aadhaar'
	}else{
		return name();
	}
}