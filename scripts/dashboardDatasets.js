$m.juci.addDataset("newBusinessProgressList",["Week on Week","Month on Month","Quarter on Quarter"]);
$m.juci.addDataset("newRecruitmentProgressList",["Week on Week","Month on Month","Quarter on Quarter"]);
$m.juci.addDataset("newBusinessList",["For the Day","Week to Date","Month to Date","Quarter to Date","Year to Date","Custom Date Range"]);
$m.juci.addDataset("newRecruitmentList",["For the Day","Week to Date","Month to Date","Quarter to Date","Year to Date","Custom Date Range"]);
$m.juci.addDataset("myBusinessList",["For the Day","Week to Date","Month to Date","Quarter to Date","Year to Date"]);
$m.juci.addDataset("newBusinessProgress","");
$m.juci.addDataset("mybusinessProgress","");
$m.juci.addDataset("newRecruitmentProgress","");
$m.juci.addDataset("newBusiness","");
$m.juci.addDataset("recruitment","");
$m.juci.addDataset("ardmList",[]);
$m.juci.addDataset("ardm","");
$m.juci.addDataset("recruitmentProgressArdmList",[]);
$m.juci.addDataset("recruitmentProgressArdm","");
$m.juci.addDataset("recruitmentArdmList",[]);
$m.juci.addDataset("recruitmentArdm","");
$m.juci.addDataset("businessProgressArdmList",[]);
$m.juci.addDataset("businessProgressArdm","");
$m.juci.addDataset("newBusinessFromDate",new Date());
$m.juci.addDataset("newBusinessToDate",new Date());
$m.juci.addDataset("recritmentFromDate",new Date());
$m.juci.addDataset("recruitmentToDate",new Date());
$m.juci.addDataset("myBusinessFromDate",new Date());
$m.juci.addDataset("myBusinessToDate",new Date());
$m.juci.addDataset("productmixFromDate",new Date());
$m.juci.addDataset("productmixToDate",new Date());


var dynamicDataset = [];
var recruitmentDynamicDataset = [];
var objectLable = ["Leads","Appointment","Logins","Super Express Logins","Issuance","SuperExpressIssuance"];
var RecruitmentObjectLable = ["ARF","DRF","DailyNBAppt","ExamAttended","Leads","License","NAT","ScreeningInterview"];

var colorArray = ['red','orange','yellow','green','blue','purple','grey','green','green'];
var lineChartData = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: dynamicDataset
    };
var recruitmentLineChartData = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: recruitmentDynamicDataset
    };
var customerName=["Ashoke M", "Foreign", "Domestic"];
$m.juci.addDataset("customerName", customerName);
var timePeriod=["All", "Foreign", "Domestic"];
$m.juci.addDataset("timePeriod", timePeriod);
$m.juci.addDataset("selectedPeriod", "");
$m.juci.addDataset("selectedCustomerName", "Select All ARDM");
$m.juci.addDataset("Customer_name", "Ashoke M");
$m.juci.addDataset("graph",[]);
$m.juci.addDataset("graphData",{});
var graph=[{
		"color":"#FFFFFF",
		"dataValue":0,
		"type":"Leads"
	},{
		"color":"#FFFFFF",
		"dataValue":0,
		"type":"Meetings(Aadhaar)"
	},{
		"color":"#FFFFFF",
		"dataValue":0,
		"type":"Logins"
	},
	{
		"color":"#FFFFFF",
		"dataValue":0,
		"type":"Super Expess Logins"
	},{
		"color":"#FFFFFF",
		"dataValue":0,
		"type":"Issuance"
	},{
		"color":"#FFFFFF",
		"dataValue":0,
		"type":"Super Express Issuance"
	}
];

var recruitmentgraph=[{
		"color":"#FFFFFF",
		"dataValue":0,
		"type":"Leads"
	},{
		"color":"#FFFFFF",
		"dataValue":0,
		"type":"Screening Interview"
	},
	{
		"color":"#FFFFFF",
		"dataValue":0,
		"type":"NAT"
	},{
		"color":"#FFFFFF",
		"dataValue":0,
		"type":"ARF"
	},{
		"color":"#FFFFFF",
		"dataValue":0,
		"type":"DRF"
	},{
		"color":"#FFFFFF",
		"dataValue":0,
		"type":"Exam Attended"
	},{
		"color":"#FFFFFF",
		"dataValue":0,
		"type":"Licenses"
	}
];

var footerGraph=[{
		"color":"#FFFFFF",
		"value":0,
		"type":"Daily NB Meetings (Aadhaar)"
	},{
		"color":"#FFFFFF",
		"value":0,
		"type":"SE logins as a % of total logins"
	}];

var recruitmentfooterGraph=[{
		"color":"#FFFFFF",
		"value":0,
		"type":"Daily Screening Interview"
	}];
	
$m.juci.addDataset("footerGraph",footerGraph);	
$m.juci.dataset("graph",graph);
$m.juci.addDataset("isIntersection",false);
$m.juci.addDataset("recruitmentFooterGraph",recruitmentfooterGraph);	
$m.juci.dataset("recruitmentGraph",recruitmentgraph);

var ARDM=["All", "Foreign", "Domestic"];
$m.juci.addDataset("mybusinessARDM", []);
var timePeriod=[ "Month to Date", "Quarter to Date","Year to Date","Custom Date Range"];
$m.juci.addDataset("timePeriod", timePeriod);
$m.juci.addDataset("selectedPeriod", "");
$m.juci.addDataset("selectedARDM", "Select All ARDM");
$m.juci.addDataset("todays_date","0/0/0000");
var scorecardList = [{
	"Achievement": "0",
	"Data": "NOP (#)",
	"DataValues": "0",
	"Target": "150",
	"YoY_Growth": "0%"
	},{
	"Achievement": "0",
	"Data": "WRP (INR lacs)",
	"DataValues": "0.00",
	"Target": "52",
	"YoY_Growth": "0%"
	}];
	
$m.juci.addDataset("scorecardList", scorecardList);
