var SIX_DAY_SEC = 6*24*60*60*1000;
var beforeOneWeek = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000),
day = beforeOneWeek.getDay(), diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -6 : 1),
LAST_MONDAY = new Date(beforeOneWeek.setDate(diffToMonday)).getTime(), LAST_SUNDAY = new Date(beforeOneWeek.setDate(diffToMonday + 6)).getTime();
var PREVIOUS_DAY = new Date((new Date().setHours(0,0,0,0) - 24*60*60*1000)).getTime();
$m.onResume(function(){
	$m.juci.dataset("headerName","Dashboard");
	$m.juci.findById("date_container").hide();
	$m.juci.findById("productmix_date_container").hide();
	$m.juci.findById("recruitment_date_container").hide();
	$m.juci.findById("business_date_container").hide();
	//loadNewBusinessData();
	fetchArdmData();
	juci.dataset('scorecardList',[]);
	refreshData();
});
 
 function loadNewBusinessProgress (dateCode , sapcode , ardmsapcode) {
 	if($m.networkConnected()){
 		utils.ShowProgress("Fetching new business progress data, please wait..");
 		var requestData = {
			"ARDMSapCode": ardmsapcode ? ardmsapcode : "",
			"BMSapCode": sapcode ? sapcode : "",//"70275346",
			"DateCode":dateCode ,
			"RMSapCode":"",
			"ZMSapCode":""
 		}
		var service = new ServiceLibrary();
		var getNewBusinessprogressDataCallback = function(r) {
			if(r.Status == "Y") {
				dynamicDataset = [];
				var labels = [];
				var responseData = r.NewBusinessProDataResponse;
				for(var i=0;i<objectLable.length;i++) {
					var datasetObjTemplate = {label: "",lineTension: 0,borderColor: "",backgroundColor: "",fill: false,data: []};
					datasetObjTemplate['label'] = objectLable[i];
					var color = colorArray[i];
					datasetObjTemplate['borderColor'] = window.chartColors[color];
					datasetObjTemplate['backgroundColor'] = window.chartColors[color];
					datasetObjTemplate['fillBetweenSet'] = 1;
					datasetObjTemplate['fillBetweenColor'] = "rgba(0, 0, 0, 0)";
					
					if(objectLable[i] == 'Leads'){
						for(var j=0;j<responseData.length;j++){
							datasetObjTemplate.data.push(responseData[j].Leads);
						}
						
					}else if(objectLable[i] == 'Appointment'){
						for(var j=0;j<responseData.length;j++){
							datasetObjTemplate.data.push(responseData[j].DailyNBAppt);
						}
						
					} else if(objectLable[i] == 'Logins'){
						for(var j=0;j<responseData.length;j++){
							datasetObjTemplate.data.push(responseData[j].Logins);
						}
						
					}else if(objectLable[i] == 'Super Express Logins'){
						for(var j=0;j<responseData.length;j++){
							datasetObjTemplate.data.push(responseData[j].SuperExpessLogins);
						}
						
					}else if(objectLable[i] == 'Issuance'){
						for(var j=0;j<responseData.length;j++){
							datasetObjTemplate.data.push(responseData[j].Issuance);
						}
						
					}else if(objectLable[i] == 'SuperExpressIssuance'){
						for(var j=0;j<responseData.length;j++){
							datasetObjTemplate.data.push(responseData[j].SuperExpressIssuance);
						}
						
					}
					dynamicDataset.push(JSON.parse(JSON.stringify(datasetObjTemplate)));
				}
				for(var i=0;i<responseData.length;i++){
					labels.push(responseData[i].MonthStart.trim());
				}
				lineChartData.datasets = dynamicDataset;
				lineChartData.labels = labels;
				loadLineGraph(lineChartData);
				loadRecuitment();
				$m.hideProgress();
			} else {
				dynamicDataset = [];
				$m.logError("Fetching new business progress data failed due to : "+ JSON.stringify(r));
				$m.hideProgress();
			}
		};
		service.getNewBusinessprogressData(getNewBusinessprogressDataCallback,requestData);
 	} else {
		$m.alert(messages.NoNetworkConnectivity);
  	};
 }
 
 function loadLineGraph(linechartdata){
	 var ctx = document.getElementById("canvas").getContext("2d");
	 ctx.canvas.width = 500;
	 ctx.canvas.height = 300;
   	 window.myLine = Chart.Line(ctx, {
    	showTooltips: false,
        data: linechartdata,
        options: {
            responsive: false,
            bezierCurve : false,
            hoverMode: 'index',
            stacked: false,
            title:{
                display: true,
                text:''
            },
            scales: {
                yAxes: [{
            		display: false,
            		gridLines: {
                		color: "rgba(0, 0, 0, 0)",
            		},
            		fontSize:6
            		
       		 	}
       		 	],
       		 	xAxes: [{
       		 		gridLines: {
                		color: "rgba(0, 0, 0, 0)",
            		},
            		fontSize:6
       		 	}]
            },
            legend: {
	            labels: {
	                fontSize: 10
	            }
	        },
	        animation : {
	        	onComplete :function () {
	        	var chart = this.chart;
	        	var ctx = this.chart.ctx;
				//ctx.fillStyle = 'rgb(133, 157, 189)'; 
                ctx.textAlign = "center";
                ctx.textBaseline = "bottom";
				var datasets = this.config.data.datasets;
                  datasets.forEach(function (dataset, i) {
                      chart.getDatasetMeta(i).data.forEach(function (p, j) {
                        ctx.fillText(datasets[i].data[j], p._model.x, p._model.y - 0);
                      });
                   });
			    }
	        }
        }
    });
}   

function onNewBusinessArdmChange(e) {
	var value = e.value.ARDM_CODE();
	var selectedValue = $m.juci.dataset("newBusiness");
	var datecode = "";
	if(selectedValue == "For the Day") {
		datecode = "FTD";
	} else if(selectedValue == "Week to Date") {
		datecode = "WTD";
	} else if(selectedValue == "Month to Date") {
		datecode = "MTD";
	} else if(selectedValue == "Quarter to Date") {
		datecode = "QTD";
	} else if(selectedValue == "Year to Date") {
		datecode = "YTD";
	} else if(selectedValue == "Custom Date Range") {
		datecode = "CDR";
	}
	
	if(datecode && value == "0"){
		fetchBusinessData(datecode,$m.getUsername(),"");
	}else{
		fetchBusinessData(datecode,"",value);
	}
	
}

function onNewBusinessProgressArdmChange(e) {
	var value = e.value.ARDM_CODE();
	var selectedValue = $m.juci.dataset("newBusinessProgress");
	var datecode = "";
	if(selectedValue == "Week on Week") {
		datecode = "WoW";
	} else if(selectedValue == "Month on Month") {
		datecode = "MoM";
	} else if(selectedValue == "Quarter on Quarter") {
		datecode = "QoQ";
	}
	
	if(datecode && value == "0"){
		loadNewBusinessProgress(datecode,$m.getUsername(),"");
	}else{
		loadNewBusinessProgress(datecode,"",value);
	}
	
}

function onRecruitmentArdmChange (e) {
	var value = e.value.ARDM_CODE();
	var selectedValue = $m.juci.dataset("recruitment");
	var datecode = "";
	if(selectedValue == "For the Day") {
		datecode = "FTD";
	} else if(selectedValue == "Week to Date") {
		datecode = "WTD";
		
	} else if(selectedValue == "Month to Date") {
		datecode = "MTD";
	} else if(selectedValue == "Quarter to Date") {
		datecode = "QTD";
	} else if(selectedValue == "Year to Date") {
		datecode = "YTD";
	} else if(selectedValue == "Custom Date Range") {
			datecode = "CDR";
	}
	
	if(datecode && value == "0"){
		fetchRecriutmentData(datecode,$m.getUsername(),"");
	}else{
		fetchRecriutmentData(datecode,"",value);
	}	
	
}

function onProductMixArdmChange (e) {
	var value = e.value.ARDM_CODE();
	var selectedValue = $m.juci.dataset("mybusinessProgress");
	var datecode = "";
	if(selectedValue == "For the Day") {
			datecode = "FTD"; 
	} else if(selectedValue == "Week to Date") {
			datecode = "WTD";
	} else if(selectedValue == "Month to Date") {
			datecode = "MTD";
	} else if(selectedValue == "Quarter to Date") {
			datecode = "QTD";
	} else if(selectedValue == "Year to Date") {
			datecode = "YTD";
	}
		
	if(datecode && value == "0"){
		getProductMix(datecode,$m.getUsername(),"");
	}else{
		getProductMix(datecode,"",value);
		
	}
	
}

function onRecruitmentProgressArdmChange (e) {
	var value = e.value.ARDM_CODE();	
	var selectedValue = $m.juci.dataset("newRecruitmentProgress");
	var datecode = "";
	if(selectedValue == "Week on Week") {
		datecode = "WoW";
	} else if(selectedValue == "Month on Month") {
		datecode = "MoM";
	} else if(selectedValue == "Quarter on Quarter") {
		datecode = "QoQ";
	}
	
	if(datecode && value == "0"){
		fetchrecruitmentProgress(datecode,$m.getUsername(),"");
	}else{
		fetchrecruitmentProgress(datecode,"",value);
	}
	
}

function onNewBusinessProgressChange(e) {
	var value = e.value;
	var ardmSAPCode =  $m.juci.getControl("newbusinessprog").value();
	if(value == "Week on Week") {
		if(ardmSAPCode){
			ardmSAPCode = ko.toJS(ardmSAPCode).ARDM_CODE
			loadNewBusinessProgress("WoW","",ardmSAPCode);
		}else{
			loadNewBusinessProgress("WoW",$m.getUsername() ,"");
		}
	} else if(value == "Month on Month") {
		if(ardmSAPCode){
			ardmSAPCode = ko.toJS(ardmSAPCode).ARDM_CODE
			loadNewBusinessProgress("MoM","",ardmSAPCode);
		}else{
			loadNewBusinessProgress("MoM",$m.getUsername() ,"");
		}
	} else if(value == "Quarter on Quarter") {
		if(ardmSAPCode){
			ardmSAPCode = ko.toJS(ardmSAPCode).ARDM_CODE
			loadNewBusinessProgress("QoQ","",ardmSAPCode);
		}else{
			loadNewBusinessProgress("QoQ",$m.getUsername() ,"");
		}
	} 
	if(window.MyLine){
		window.MyLine.destroy();
	}
}

function onNewRecruitmentProgressChange(e) {
	var value = e.value;
	var ardmSAPCode =  $m.juci.getControl("recruitment-progress").value();
	if(value == "Week on Week") {
		if(ardmSAPCode){
			ardmSAPCode = ko.toJS(ardmSAPCode).ARDM_CODE
			fetchrecruitmentProgress("WoW","",ardmSAPCode);
		}else{
			fetchrecruitmentProgress("WoW",$m.getUsername(),"");
		}
	} else if(value == "Month on Month") {
		if(ardmSAPCode){
			ardmSAPCode = ko.toJS(ardmSAPCode).ARDM_CODE
			fetchrecruitmentProgress("MoM","",ardmSAPCode);
		}else{
			fetchrecruitmentProgress("MoM",$m.getUsername(),"");
		}
	} else if(value == "Quarter on Quarter") {
		if(ardmSAPCode){
			ardmSAPCode = ko.toJS(ardmSAPCode).ARDM_CODE
			fetchrecruitmentProgress("QoQ","",ardmSAPCode);
		}else{
			fetchrecruitmentProgress("QoQ",$m.getUsername(),"");
		}
	} 
	if(window.recruitmentLine){
		window.recruitmentLine.destroy();
	}
}


function onNewBusinessChange(e) {
	var value = e.value;
	var datecode = "";
	var ardmSAPCode =  $m.juci.getControl("new-business-ARDM").value();
	if(value == "For the Day") {
		datecode = "FTD";
		if(ardmSAPCode){
			ardmSAPCode = ko.toJS(ardmSAPCode).ARDM_CODE
			fetchBusinessData(datecode,"",ardmSAPCode);
		}else{
			fetchBusinessData(datecode,$m.getUsername(),"");
		}
	} else if(value == "Week to Date") {
		datecode = "WTD";
		if(ardmSAPCode){
			ardmSAPCode = ko.toJS(ardmSAPCode).ARDM_CODE
			fetchBusinessData(datecode,"",ardmSAPCode);
		}else{
			fetchBusinessData(datecode,$m.getUsername(),"");
		}
	} else if(value == "Month to Date") {
		datecode = "MTD";
		if(ardmSAPCode){
			ardmSAPCode = ko.toJS(ardmSAPCode).ARDM_CODE
			fetchBusinessData(datecode,"",ardmSAPCode);
		}else{
			fetchBusinessData(datecode,$m.getUsername(),"");
		}
	} else if(value == "Quarter to Date") {
		datecode = "QTD";
		if(ardmSAPCode){
			ardmSAPCode = ko.toJS(ardmSAPCode).ARDM_CODE
			fetchBusinessData(datecode,"",ardmSAPCode);
		}else{
			fetchBusinessData(datecode,$m.getUsername(),"");
		}
	} else if(value == "Year to Date") {
		datecode = "YTD";
		if(ardmSAPCode){
			ardmSAPCode = ko.toJS(ardmSAPCode).ARDM_CODE
			fetchBusinessData(datecode,"",ardmSAPCode);
		}else{
			fetchBusinessData(datecode,$m.getUsername(),"");
		}
	}
	
	var selectedPeriod = $m.juci.dataset("newBusiness");
	if(selectedPeriod != "Custom Date Range"){
		$m.juci.getControl("new-business-ARDM").show();
		$m.juci.findById("business_date_container").hide();
 	} else {	
 		$m.juci.findById("business_date_container").show();
 		$m.juci.dataset("newBusinessFromDate",new Date());
		$m.juci.dataset("newBusinessToDate",new Date());
 	}
}

function onNewBusinessCustomChange(e,id){
	e.preventDefault();
	if(e.value > new Date()){
		e.control.value(new Date());
		$m.alert("Selected date can not be greater than today's date");
		if(id == 'from_nb'){
			$m.juci.dataset("newBusinessFromDate",new Date());
		}
		if(id == 'to_nb'){
			$m.juci.dataset("newBusinessToDate",new Date());
		}
		return;
	}
	if(id == 'from_nb'){
		$m.juci.dataset("newBusinessFromDate",e.value);
	}
	if(id == 'to_nb'){
		$m.juci.dataset("newBusinessToDate",e.value);
	}
	var fromDate = $m.juci.dataset("newBusinessFromDate");
	var toDate = $m.juci.dataset("newBusinessToDate");
	
	if( fromDate > toDate ){
		e.control.value(new Date());
		$m.alert("'From Date' can not be greater than 'To Date'");
		return;	
	}
	
	var ardmSAPCode = $m.juci.getControl("new-business-ARDM").value();
	if(ardmSAPCode){
		ardmSAPCode = ko.toJS(ardmSAPCode).ARDM_CODE
		fetchBusinessData("CDR","",ardmSAPCode);
	}else{
		fetchBusinessData("CDR",$m.getUsername(),"");
	}
}

function onproductMixChange(e) {
	var value = e.value;
	var ardmSAPCode = $m.juci.getControl('productMixARDM').value();
	if(value == "For the Day") {
		if(ardmSAPCode){
			ardmSAPCode = ko.toJS(ardmSAPCode).ARDM_CODE
			getProductMix("FTD","",ardmSAPCode);
		}else{
			getProductMix("FTD",$m.getUsername(),"");
		}
	} else if(value == "Week to Date") {
		if(ardmSAPCode){
			ardmSAPCode = ko.toJS(ardmSAPCode).ARDM_CODE
			getProductMix("WTD","",ardmSAPCode);
		}else{
			getProductMix("WTD",$m.getUsername(),"");
		}
	} else if(value == "Month to Date") {
		if(ardmSAPCode){
			ardmSAPCode = ko.toJS(ardmSAPCode).ARDM_CODE
			getProductMix("MTD","",ardmSAPCode);
		}else{
			getProductMix("MTD",$m.getUsername(),"");
		}
	} else if(value == "Quarter to Date") {
		if(ardmSAPCode){
			ardmSAPCode = ko.toJS(ardmSAPCode).ARDM_CODE
			getProductMix("QTD","",ardmSAPCode);
		}else{
			getProductMix("QTD",$m.getUsername(),"");
		}
	} else if(value == "Year to Date") {
		if(ardmSAPCode){
			ardmSAPCode = ko.toJS(ardmSAPCode).ARDM_CODE
			getProductMix("YTD","",ardmSAPCode);
		}else{
			getProductMix("YTD",$m.getUsername(),"");
		}
	}
}

function onNewRecruitmentChange(e) {
	var value = e.value;
	var ardmSAPCode = $m.juci.getControl("recruitment-ARDM").value();
	if(value == "For the Day") {
		if(ardmSAPCode){
			ardmSAPCode = ko.toJS(ardmSAPCode).ARDM_CODE
			fetchRecriutmentData("FTD","",ardmSAPCode);
		}else{
			fetchRecriutmentData("FTD",$m.getUsername(),"");
		}
	} else if(value == "Week to Date") {
		if(ardmSAPCode){
			ardmSAPCode = ko.toJS(ardmSAPCode).ARDM_CODE
			fetchRecriutmentData("WTD","",ardmSAPCode);
		}else{
			fetchRecriutmentData("WTD",$m.getUsername(),"");
		}
	} else if(value == "Month to Date") {
		if(ardmSAPCode){
			ardmSAPCode = ko.toJS(ardmSAPCode).ARDM_CODE
			fetchRecriutmentData("MTD","",ardmSAPCode);
		}else{
			fetchRecriutmentData("MTD",$m.getUsername(),"");
		}
	} else if(value == "Quarter to Date") {
		if(ardmSAPCode){
			ardmSAPCode = ko.toJS(ardmSAPCode).ARDM_CODE
			fetchRecriutmentData("QTD","",ardmSAPCode);
		}else{
			fetchRecriutmentData("QTD",$m.getUsername(),"");
		}
	} else if(value == "Year to Date") {
		if(ardmSAPCode){
			ardmSAPCode = ko.toJS(ardmSAPCode).ARDM_CODE
			fetchRecriutmentData("YTD","",ardmSAPCode);
		}else{
			fetchRecriutmentData("YTD",$m.getUsername(),"");
		}
	}
	
	var selectedPeriod = $m.juci.dataset("recruitment");
	if(selectedPeriod != "Custom Date Range"){
		$m.juci.findById("recruitment_date_container").hide();
 	} else {	
 		$m.juci.findById("recruitment_date_container").show();
 		$m.juci.dataset("recritmentFromDate",new Date());
		$m.juci.dataset("recruitmentToDate",new Date());
 	}
}

function onRecriutmentCustomChange(e,id) {
	e.preventDefault();
	if(e.value > new Date()){
		e.control.value(new Date());
		$m.alert("Selected date can not be greater than today's date");
		if(id == 'from_rec'){
			$m.juci.dataset("recritmentFromDate",new Date());
		}
		if(id == 'to_rec'){
			$m.juci.dataset("recruitmentToDate",new Date());
		}
		return;
	}
	if(id == 'from_rec'){
		$m.juci.dataset("recritmentFromDate",e.value);
	}
	if(id == 'to_rec'){
		$m.juci.dataset("recruitmentToDate",e.value);
	}
	var fromDate = $m.juci.dataset("recritmentFromDate");
	var toDate = $m.juci.dataset("recruitmentToDate");
	
	if( fromDate > toDate ){
		e.control.value(new Date());
		$m.alert("'From Date' can not be greater than 'To Date'");
		return;	
	}
	
	var ardmSAPCode = $m.juci.getControl("recruitment-ARDM").value();
	if(ardmSAPCode){
		ardmSAPCode = ko.toJS(ardmSAPCode).ARDM_CODE
		fetchRecriutmentData("CDR","",ardmSAPCode);
	}else{
		fetchRecriutmentData("CDR",$m.getUsername(),"");
	}
}

function onMyBusinessCustomChange(e,id){
	
	e.preventDefault();
	if(e.value > new Date()){
		$m.alert("Selected date can not be greater than today's date");
		if(id == 'from_mb'){
			$m.juci.dataset("myBusinessFromDate",new Date());
		}
		if(id == 'to_mb'){
			$m.juci.dataset("myBusinessToDate",new Date());
		}
		return;
	}
	if(id == 'from_mb'){
		$m.juci.dataset("myBusinessFromDate",e.value);
	}
	if(id == 'to_mb'){
		$m.juci.dataset("myBusinessToDate",e.value);
	}
	var fromDate = $m.juci.dataset("myBusinessFromDate");
	var toDate = $m.juci.dataset("myBusinessToDate");
	
	if( fromDate > toDate ){
		$m.alert("'From Date' can not be greater than 'To Date'");
		return;	
	}
	var ardmSAPCode = $m.juci.getControl("ARDM").value();
	if(ardmSAPCode){
		ardmSAPCode = ko.toJS(ardmSAPCode).ARDM_CODE
		if(ardmSAPCode == "0"){
			fetchMyBusinessData("CDR",$m.getUsername(),"");
		}else{
			fetchMyBusinessData("CDR","",ardmSAPCode);
		}
	}else{
		fetchMyBusinessData("CDR",$m.getUsername(),"");
	}
}

function onProductMixCustomChange(e) {
	if(e.context.placeholder="from_date"){
		if((e.value.getDayOfYear()> new Date().getDayOfYear())||( (e.value.getFullYear())>new Date().getFullYear())){
			$m.alert("Selected date must be less than todays date");
			return;
		}
	}
	getProductMix("MTD",$m.getUsername(),"");
}

function onMyBusinessChangeClick(e) {
 	var selectedPeriod = $m.juci.dataset("selectedPeriod");
 	var datecode = getDatacode(selectedPeriod);
 	var ardmSAPCode = $m.juci.getControl("ARDM").value();
 	if(selectedPeriod != "Custom Date Range"){
 		$m.juci.getControl("ARDM").show();
		$m.juci.findById("date_container").hide();
		if(ardmSAPCode){
			ardmSAPCode = ko.toJS(ardmSAPCode).ARDM_CODE;
			if(ardmSAPCode == "0"){
				fetchMyBusinessData(datecode,$m.getUsername(),"");
			}else{
				fetchMyBusinessData(datecode,"",ardmSAPCode);
			}
		}else{
			fetchMyBusinessData(datecode,$m.getUsername(),"");
		}
 	}
	if(selectedPeriod == "Custom Date Range"){
		$m.juci.findById("date_container").show();
		$m.juci.dataset("myBusinessFromDate",new Date());
		$m.juci.dataset("myBusinessToDate",new Date());
	}	
}

function onMyBusinessArdmChange(e) {
	var value = e.value.ARDM_CODE();
	var selectedPeriod = $m.juci.dataset("selectedPeriod");
	var datecode = getDatacode(selectedPeriod);
	if (datecode) {
		if(value == "0"){
 			fetchMyBusinessData(datecode,$m.getUsername(),"");
		}else{
			fetchMyBusinessData(datecode,"",value);
		}
 	}
}

// New Business
	
//to dinyamicall add classess  to increase or decrese the block width
function loadNewBusinessData() {
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
	//$m.juci.getControl("new").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.width=val+"%";
	//$m.juci.getControl("new").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.maxWidth="98%";
	//$m.juci.getControl("new").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.marginLeft=margin+"%";
	//$m.juci.getControl("new").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.backgroundColor=element.color;
	}
	for (i = 0; i < footerGraph.length; i++) {
		var element=footerGraph[i];
		var val=element.value;
		if(val==0)
		{
			val= 50;
		}
		var margin=(100-val)/2;
		//$m.juci.getControl("list").j.el.childNodes[3].childNodes[1].childNodes[4].childNodes[1].innerText=footerGraph[1].value+"%";
	//	$m.juci.getControl("list").j.el.childNodes[3].childNodes[0].childNodes[4].childNodes[1].innerText=footerGraph[0].value+".0";
		//$m.juci.getControl("list").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.width=val+"%";
		//$m.juci.getControl("list").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.maxWidth="98%";
		//$m.juci.getControl("list").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.marginLeft=margin+"%";
		//$m.juci.getControl("list").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.backgroundColor=element.color;
	}
	fetchBusinessData("YTD",$m.getUsername(),"");
}

function fetchBusinessData (dateCode,sapcode,ardamSapcode) {
	if($m.networkConnected()){
 		utils.ShowProgress("Fetching new business progress data, please wait..");
 		var requestData = {
			"ARDMSapCode": ardamSapcode ? ardamSapcode : "",
			"BMSapCode": sapcode ? sapcode : "",
			"DT": "",
			"DateCode": dateCode,//"YTD",
			"ENDDATE": "",
			"QRTR": "",
			"RMSapCode": "",
			"STARTDATE": "",
			"Service": "GetNewBusiness",
			"Type": "BM",
			"ZMSapCode": ""
 		}
 		if(dateCode == "MTD"){
 			var fromDate = $m.juci.dataset("newBusinessFromDate");
			var toDate = $m.juci.dataset("newBusinessToDate");
 			requestData.STARTDATE = new Date(fromDate).getTime();
 			requestData.ENDDATE = new Date(toDate).getTime();
 		}
 		if(dateCode == "CDR"){
 			var fromDate = $m.juci.dataset("newBusinessFromDate");
			var toDate = $m.juci.dataset("newBusinessToDate");
 			requestData.STARTDATE = new Date(fromDate).getTime();
 			requestData.ENDDATE = new Date(toDate).getTime();
 			requestData.DateCode = "WTD";
 		}
 		if(dateCode == "WTD"){
 			requestData.STARTDATE = LAST_MONDAY
 			requestData.ENDDATE = LAST_SUNDAY
 		}
 		if(dateCode == "FTD"){
 			requestData.STARTDATE = PREVIOUS_DAY;
 			requestData.ENDDATE = PREVIOUS_DAY;
 			requestData.DateCode = "WTD";
 		}
		var service = new ServiceLibrary();
		var getNewBusinessprogressDataCallback = function(r) {
			if(r.Status == "Y") {
				utils.HideProgress();
				var responseData = r.lstNewBusinessDataResponse_List[0];
				var data = responseData.lstNewBusinessDataResponse;
				for(var i=0;i<data.length;i++) {
					for(var j=0;j<graph.length;j++) {
						if(data[i].Data == "Appointments") {
							data[i].Data = "Meetings(Aadhaar)";
						}
						if(data[i].Data == "SuperExpessLogins") {
							data[i].Data = "Super Expess Logins";
						}
						if(data[i].Data == "SuperExpressIssuance") {
							data[i].Data = "Super Express Issuance";
						}
						
						if(data[i].Data == graph[j].type) {
							graph[j].dataValue = parseInt(data[i].DataValues);
							graph[j].color = data[i].Color;
						}
					}
					for(var k=0;k<footerGraph.length;k++) {
						if(data[i].Data == "DailyNBAppt") {
							data[i].Data = "Daily NB Meetings (Aadhaar)"
						}
						if(data[i].Data == "SELogins") {
							data[i].Data = "SE logins as a % of total logins"
						}
						if(data[i].Data == footerGraph[k].type) {
							footerGraph[k].value = data[i].DataValues;
							footerGraph[k].color = data[i].Color;
						}
					}
				}
				
				var count=0;
				$m.juci.dataset("footerGraph",footerGraph);
				$m.juci.dataset("graph",graph);
				//loadNewBusinessProgress("MoM",$m.getUsername(),"");
			} else {
				utils.HideProgress();
				$m.logError("Fetching new business progress data failed due to : "+ JSON.stringify(r));
			}
		};
		service.getNewBusinessData(getNewBusinessprogressDataCallback,requestData);
 	} else {
		$m.alert(messages.NoNetworkConnectivity);
  	};
 }
 
 function loadRecuitment() {
 	var count=0;
	for (i = 0; i < recruitmentgraph.length; i++) {
		var element=recruitmentgraph[i];
		count++;
		var val=element.value;
		if(val==0)
		{
			val= 10;
		}
		var margin=(100-val)/2;
		//$m.juci.getControl("recruitment").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.width=val+"%";
		//$m.juci.getControl("recruitment").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.maxWidth="98%";
		//$m.juci.getControl("recruitment").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.marginLeft=margin+"%";
		//$m.juci.getControl("recruitment").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.backgroundColor=element.color;
	}
	for (i = 0; i < recruitmentfooterGraph.length; i++) {
		var element=recruitmentfooterGraph[i];
		var val=element.value;
		if(val==0)
		{
			val= 50;
		}
		var margin=(100-val)/2;
	//	$m.juci.getControl("recruitment-list").j.el.childNodes[3].childNodes[0].childNodes[4].childNodes[1].innerText=recruitmentfooterGraph[0].value+".0";
	//	$m.juci.getControl("recruitment-list").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.width=val+"%";
		//$m.juci.getControl("recruitment-list").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.maxWidth="98%";
		//$m.juci.getControl("recruitment-list").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.marginLeft=margin+"%";
	//	$m.juci.getControl("recruitment-list").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.backgroundColor=element.color;
	}
	fetchRecriutmentData("MTD",$m.getUsername() , "")
 }
 
 function fetchRecriutmentData (dateCode,sapcode,ardmSapCode) {
 	if($m.networkConnected()){
 		utils.ShowProgress("Fetching recriutment data, please wait..");
 		var requestData = {
			"ARDMSapCode": ardmSapCode ? ardmSapCode : "",
			"BMSapCode": sapcode ? sapcode : "",//"70025546",
			"DT": "",
			"DateCode": dateCode,
			"ENDDATE": "",
			"QRTR": "",
			"RMSapCode": "",
			"STARTDATE": "",
			"Service": "",
			"Type": "BM",
			"ZMSapCode": ""
 		}
 		if(dateCode == "MTD"){
 			var fromDate = $m.juci.dataset("recritmentFromDate");
			var toDate = $m.juci.dataset("recruitmentToDate");
 			requestData.STARTDATE = new Date(fromDate).getTime();
 			requestData.ENDDATE = new Date(toDate).getTime();
 		}
 		
 		if(dateCode == "CDR"){
 			var fromDate = $m.juci.dataset("recritmentFromDate");
			var toDate = $m.juci.dataset("recruitmentToDate");
 			requestData.STARTDATE = new Date(fromDate).getTime();
 			requestData.ENDDATE = new Date(toDate).getTime();
 			requestData.DateCode = "WTD";
 		}
 		
 		if(dateCode == "WTD"){
 			requestData.STARTDATE = LAST_MONDAY;
 			requestData.ENDDATE = LAST_SUNDAY;
 		}
 		
 		if(dateCode == "FTD"){
 			requestData.STARTDATE = PREVIOUS_DAY;
 			requestData.ENDDATE = PREVIOUS_DAY;
 			requestData.DateCode = "WTD";
 		}
		var service = new ServiceLibrary();
		var recruitmentCallback = function(r) {
			if(r.Status == "Y") {
				utils.HideProgress();
				var responseData = r.lstRecruitmentDataResponse_List[0];
				var data = responseData.lstRecruitmentDataResponse;
				for(var i=0;i<data.length;i++) {
					for(var j=0;j<recruitmentgraph.length;j++) {
						if(data[i].Data == "ScreeningInterview"){
							data[i].Data = "Screening Interview"
						}
						if(data[i].Data == "ExamAttended"){
							data[i].Data = "Exam Attended"
						}
						if(data[i].Data == "License"){
							data[i].Data = "Licenses"
						}
						if(data[i].Data == recruitmentgraph[j].type) {
							recruitmentgraph[j].dataValue = parseInt(data[i].DataValues);
							recruitmentgraph[j].color = data[i].Color;
						}
					}
					for(var k=0;k<recruitmentfooterGraph.length;k++) {
						if(data[i].Data == "DailyScreeningInterview"){
							data[i].Data = "Daily Screening Interview"
						}
						if(data[i].Data == recruitmentfooterGraph[k].type) {
							recruitmentfooterGraph[k].value = data[i].DataValues;
							recruitmentfooterGraph[k].color = data[i].Color;
						}
					}
				}
				
				var count=0;
				$m.juci.dataset("recruitmentFooterGraph",recruitmentfooterGraph);
				$m.juci.dataset("recruitmentGraph",recruitmentgraph);
				/*
				for (i = 0; i < recruitmentgraph.length; i++) {
					var element=recruitmentgraph[i];
					count++;
					var val=element.dataValue;
					if(val==0)
					{
						val= 10;
					}
					var margin=(100-val)/2;
				
					$m.juci.getControl("recruitment").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.width=val+"%";
					//$m.juci.getControl("recruitment").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.maxWidth="98%";
					//$m.juci.getControl("recruitment").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.marginLeft=margin+"%";
					$m.juci.getControl("recruitment").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.backgroundColor=element.color;
				}
				for (i = 0; i < recruitmentfooterGraph.length; i++) {
					var element=recruitmentfooterGraph[i];
					var val=element.value;
					if(val==0)
					{
						val= 50;
					}
					var margin=(100-val)/2;
					$m.juci.getControl("recruitment-list").j.el.childNodes[3].childNodes[0].childNodes[4].childNodes[1].innerText=recruitmentfooterGraph[0].value+".0";
					$m.juci.getControl("recruitment-list").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.width=val+"%";
				//	$m.juci.getControl("recruitment-list").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.maxWidth="98%";
					//$m.juci.getControl("recruitment-list").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.marginLeft=margin+"%";
					$m.juci.getControl("recruitment-list").j.el.childNodes[3].childNodes[i].childNodes[4].childNodes[1].style.backgroundColor=element.color;
				}
				*/
				//fetchrecruitmentProgress("MoM",$m.getUsername(),"");
			} else {
				utils.HideProgress();
				$m.logError("Fetching new business progress data failed due to : "+ JSON.stringify(r));
			}
		};
		service.getNewRecruitmentData(recruitmentCallback,requestData);
 	} else {
		$m.alert(messages.NoNetworkConnectivity);
  	};
 }
 
 
 function fetchrecruitmentProgress (dateCode,sapcode,ardmSapcode) {
 	//sapcode = "70036363";
 	if($m.networkConnected()){
 		utils.ShowProgress("Fetching recruitment progress data, please wait..");	
 		var requestData = {
			"ARDMSapCode":ardmSapcode ? ardmSapcode : "","BMSapCode":sapcode ? sapcode : "","DateCode":dateCode,"RMSapCode":"","ZMSapCode":""
 		}
		var service = new ServiceLibrary();
		var recruitmentprogressDataCallback = function(r) {
			if(r.Status == "Y") {
				recruitmentDynamicDataset = [];
				var labels = [];
				var responseData = r.lstRecruitmentProDataResponse;
				for(var i=0;i<RecruitmentObjectLable.length;i++) {
					var datasetObjTemplate = {label: "",lineTension: 0,borderColor: "",backgroundColor: "",fill: false,data: []};
					datasetObjTemplate['label'] = RecruitmentObjectLable[i];
					
					var color = colorArray[i];
					datasetObjTemplate['borderColor'] = window.chartColors[color];
					datasetObjTemplate['backgroundColor'] = window.chartColors[color];
					datasetObjTemplate['fillBetweenSet'] = 1;
					datasetObjTemplate['fillBetweenColor'] = "rgba(0, 0, 0, 0)";
					if(RecruitmentObjectLable[i] == 'ARF'){
						for(var j=0;j<responseData.length;j++){
							datasetObjTemplate.data.push(responseData[j].ARF);
						}
						
					}else if(RecruitmentObjectLable[i] == 'DRF'){
						for(var j=0;j<responseData.length;j++){
							datasetObjTemplate.data.push(responseData[j].DRF);
						}
						
					} else if(RecruitmentObjectLable[i] == 'DailyNBAppt'){
						for(var j=0;j<responseData.length;j++){
							datasetObjTemplate.data.push(responseData[j].DailyNBAppt);
						}
						
					}else if(RecruitmentObjectLable[i] == 'ExamAttended'){
						for(var j=0;j<responseData.length;j++){
							datasetObjTemplate.data.push(responseData[j].ExamAttended);
						}
						
					}else if(RecruitmentObjectLable[i] == 'Leads'){
						for(var j=0;j<responseData.length;j++){
							datasetObjTemplate.data.push(responseData[j].Leads);
						}
						
					}else if(RecruitmentObjectLable[i] == 'License'){
						for(var j=0;j<responseData.length;j++){
							datasetObjTemplate.data.push(responseData[j].License);
						}
						
					}else if(RecruitmentObjectLable[i] == 'NAT'){
						for(var j=0;j<responseData.length;j++){
							datasetObjTemplate.data.push(responseData[j].NAT);
						}
						
					}else if(RecruitmentObjectLable[i] == 'ScreeningInterview'){
						for(var j=0;j<responseData.length;j++){
							datasetObjTemplate.data.push(responseData[j].ScreeningInterview);
						}
						
					}
					recruitmentDynamicDataset.push(JSON.parse(JSON.stringify(datasetObjTemplate)));
				}
				
				for(var i=0;i<responseData.length;i++){
					labels.push(responseData[i].MonthStart.trim());
				}
				recruitmentLineChartData.datasets = recruitmentDynamicDataset;
				recruitmentLineChartData.labels = labels;
				loadRecruitmentLineGraph(recruitmentLineChartData);
				//fetchMyBusinessData("MTD",$m.getUsername(),"");
				$m.hideProgress();
			} else {
				recruitmentDynamicDataset = [];
				$m.logError("Fetching new business progress data failed due to : "+ JSON.stringify(r));
				$m.hideProgress();
			}
		};
		service.getNewRecruitmentProgressData(recruitmentprogressDataCallback,requestData);
 	} else {
		$m.alert(messages.NoNetworkConnectivity);
  	};
 }
 
 function loadRecruitmentLineGraph(linechartdata){
	 var ctx = document.getElementById("rec-canvas").getContext("2d");
	 ctx.canvas.width = 500;
     ctx.canvas.height = 300;
   	 window.recruitmentLine = Chart.Line(ctx, {
    	showTooltips: false,
    	 scaleOverride: true,
     	scaleSteps: 10,
     	scaleStepWidth: 20,
     	scaleStartValue: 0,
        data: linechartdata,
        options: {
            responsive: false,
            bezierCurve : false,
            hoverMode: 'index',
            stacked: false,
            title:{
                display: true,
                text:''
            },
            scales: {
                yAxes: [{
            		display: false,
            		gridLines: {
                		color: "rgba(0, 0, 0, 0)",
            		},
            		fontSize:6
            		
       		 	}
       		 	],
       		 	xAxes: [{
       		 		gridLines: {
                		color: "rgba(0, 0, 0, 0)",
            		},
            		fontSize:6
       		 	}]
            },
            legend: {
	            labels: {
	                fontSize: 10
	            }
	        },
	        animation : {
	        	onComplete :function () {
	        	var chart = this.chart;
	        	var ctx = this.chart.ctx;
				//ctx.fillStyle = 'rgb(133, 157, 189)'; 
                ctx.textAlign = "center";
                ctx.textBaseline = "bottom";
				var datasets = this.config.data.datasets;
                  datasets.forEach(function (dataset, i) {
                      chart.getDatasetMeta(i).data.forEach(function (p, j) {
                        ctx.fillText(datasets[i].data[j], p._model.x, p._model.y - 0);
                      });
                   });
			    }
	        }
        }
    });
} 

function fetchArdmData() {
	if($m.networkConnected()){ 
		var requestData = {
			  "USER_CD": $m.getUsername(),
			  "USER_TYPE": gettype()
			}
		var service = new ServiceLibrary();
		var hierarchyCallback = function(r) {
			if(r.Status == "Y") {
				utils.HideProgress();
				var responseData = r.HIERARCHYDataResponse;
				responseData.splice(0,0,{"ARDM_CODE":"0","ARDM_NAME":"Select All ARDM","BM_CODE":null,"BM_NAME":null,"Data":null,"RM_CODE":null,"RM_NAME":null});
				$m.juci.dataset("businessProgressArdmList",responseData);
				$m.juci.dataset("ardmList",responseData);
				$m.juci.dataset("recruitmentProgressArdmList",responseData);
				$m.juci.dataset("recruitmentArdmList",responseData);
				$m.juci.dataset("mybusinessARDM",responseData);
			} else {
				$m.logError("Fetching new business progress data failed due to : "+ JSON.stringify(r));
				utils.HideProgress();
			}
		}
		utils.ShowProgress("fetching hierarchy data..")
		service.getMyARDMHierarchyData(hierarchyCallback,requestData);
	} else {
		$m.alert(messages.NoNetworkConnectivity);
  	};
}

function fetchMyBusinessData (dateCode,sapcode,ardamSapcode) {
	if($m.networkConnected()){
 		utils.ShowProgress("Fetching My business progress data, please wait..");
 		var requestData = {
			 "ARDMSapCode": ardamSapcode ? ardamSapcode : "",
			 "BMSapCode": sapcode ? sapcode : "",
			 "DT": "1",
			 "DateCode": dateCode,
			 "ENDDATE": "",
			 "QRTR": "",
			 "RMSapCode": "",
			 "STARTDATE": "",
			 "Type": "BM",
			 "ZMSapCode": ""
		}
		
		if(dateCode == "MTD"){
 			var fromDate = $m.juci.dataset("myBusinessFromDate");
			var toDate = $m.juci.dataset("myBusinessToDate");
 			requestData.STARTDATE = new Date(fromDate).getTime();
 			requestData.ENDDATE = new Date(toDate).getTime();
 		}
 		if(dateCode == "CDR"){
 			var fromDate = $m.juci.dataset("myBusinessFromDate");
			var toDate = $m.juci.dataset("myBusinessToDate");
 			requestData.STARTDATE = new Date(fromDate).getTime();
 			requestData.ENDDATE = new Date(toDate).getTime();
 			requestData.DateCode = "WTD";
 		}
 		if(dateCode == "WTD"){
 			requestData.STARTDATE = LAST_MONDAY
 			requestData.ENDDATE = LAST_SUNDAY
 		}
		var service = new ServiceLibrary();
		var getMyBusinesspDataCallback = function(r) {
			if(r.Status == "Y") {
				utils.HideProgress();
				var responseData = r.lstMybusinessDataResponse_List[0];
				var data = responseData.lstMybusinessDataResponse;
				scorecardList=[];
				scorecardList= data;
				$m.juci.dataset("scorecardList", data);
				for(var i=0;i<data.length;i++){
					if(parseInt(data[i].YoY_Growth)<=0){
					//	$m.juci.findByClass("yoygrowth_image")[i].el.src="http://124.124.218.136/rlife2/app/146/146/images/growth_down.png";
					}
				}
				//getProductMix("QTD",$m.getUsername(),"");
			}else {
				utils.HideProgress();
				$m.logError("Fetching My business  data failed due to : "+ JSON.stringify(r));
			}
		};
			
		service.getMybusinessData(getMyBusinesspDataCallback,requestData);
 	} else {
		$m.alert(messages.NoNetworkConnectivity);
  	};
 }
 
 var pieconfig = {
    type: 'pie',
    data: {
        datasets: [{
            data:[] ,
            backgroundColor: [
                "#2e8b57",
                "#90ee90",
                "#3cb371",
                "#32cd32",
            ],
            label: 'Dataset 1'
        }],
        labels: []
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        pieceLabel: {
          render: 'label',
          fontColor : ['white','white','white','white']
        },
        legend: {
	            display:true
	        }
  }
};

function getProductMix(datecode,sapcode,ardmSapcode){
	var service = new ServiceLibrary();
	
	var requestData = {"ARDMSapCode":ardmSapcode ? ardmSapcode : "","BMSapCode":sapcode ? sapcode : "","DT":"","DateCode":datecode,"ENDDATE":"","QRTR":"Quarter4","RMSapCode":"","STARTDATE":"","Type":"BM","ZMSapCode":""}
 	var getProductMixDataCallback = function(res){
 		if(res.lstProductMixDataResponse_List.length > 0){
 			var resdata = res.lstProductMixDataResponse_List[0].lstProductMixDataResponse;
 			var lables = [];
 			var datapoint = [];
 			for(var i=0;i<resdata.length;i++){
 				if(resdata[i].Data == "Ulip"){
 					lables.push(resdata[i].Data+"-"+resdata[i].DataValues+"%");
 				}else if(resdata[i].Data == "PAR"){
 					lables.push("PAR -"+resdata[i].DataValues+"%");
 				}else if(resdata[i].Data == "Nonpar"){
 					lables.push("Non-Par < 10 - "+resdata[i].DataValues+"%");
 				}else if(resdata[i].Data == "Health"){
 					lables.push("Non-Par > 10 - "+resdata[i].DataValues+"%");
 				}
 				datapoint.push(resdata[i].DataValues);
 			}
 			pieconfig.data.datasets[0].data = datapoint;
 			pieconfig.data.labels = lables;
 			var ctx = document.getElementById("pie").getContext("2d");
 			ctx.canvas.width = 300;
			ctx.canvas.height = 300;
			window.myPie = new Chart(ctx, pieconfig);	
 		}
 		console.log(JSON.stringify(res));
 	}
	service.getProductMixData(getProductMixDataCallback,requestData);
}

function getARDM(obj){
	return obj.ARDM_NAME;
}

function getDatacode(selectedPeriod){
	switch(selectedPeriod){
 		case "Month to Date":return "MTD";
 		case "Quarter to Date":return "QTD";
 		case "Year to Date":return "YTD";
 		case "Custom Date Range":return "WTD";
 	}
}

function getClassName(name){ 
	if (name() == "Meetings(Aadhaar)"){
		return 'Meetings_Aadhaar'
	}else if(name()  == "Super Expess Logins"){
		return 'SuperExpessLogins';
	}else if(name()  == "Super Express Issuance"){
		return 'SuperExpressIssuance';
	}else if(name()  == "Screening Interview"){
		return 'ScreeningInterview';
	}else if(name()  == "Exam Attended"){
		return 'ExamAttended'
	}else{
		return name();
	}
}


function getAchievementWidth(data){
	console.log(data());
	return data() + '%';
}

function getImg(data){
	var data = data.YoY_Growth();
	data = data.split('%')[0];
	if(data && parseInt(data) > 0){
		return "images/growth_up.png";
	}if(data && parseInt(data) == 0){
		return "images/growth_zero.png";
	}else{
		return "images/growth_down.png";
	}
}

function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
      d.setDate(diff);
      d.setHours(0,0,0,0);
  return new Date(d).getTime();
}


function refreshData(){
	
}