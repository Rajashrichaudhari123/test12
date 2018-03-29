/**
 * hierarchyDataMamager.js
 * @author CloudPact Technologies
 * @description : This script is used giving hierarchy manager based on selection from the local
 **/
var hierarchyDataManager={
		"getZMByHO" : function(){
			return this.HO;
		},
		
		"getRMByZM" : function(code,dataset){
			GetRMbyZM(code,dataset);
		},
		
		"getAMByRM" : function(code,dataset){
			GetAMbyRM(code,dataset);
		},
		
		"getBMByAM" : function(code,dataset){
			GetBMbyAM(code,dataset);
		},
		
		"getSMByBM" : function(code,dataset){
			GetSMbyBM(code,dataset);
		},
		
		"getAdvisorBySM" : function(code,dataset){
			GetADVbySM(code,dataset);
		},
		
		"getSMByTM" : function(code,dataset){
			GetSMbyTM(code,dataset);
		},
		
		"getCDAAdvisorByCDASM" : function(code,dataset){
			GetCDAADVbyCDASM(code,dataset);
		},
		"getAdvisorByTPSM" : function(code,dataset){
			GetAdvisorByTPSM(code,dataset);
		},
		"getAdvisorByTPPAR" : function(code,dataset){
			GetAdvisorByTPPAR(code,dataset);
		},
		"getAdvisorByAGSM" : function(code,dataset){
			GetAdvisorByAGSM(code,dataset);
		},
		"getAdvisorByAGPS" : function(code,dataset){
			GetAdvisorByAGPS(code,dataset);
		},
		"getAdvisorByTPBOM" : function(code,dataset){
			GetAdvisorByTPBOM(code,dataset);
		},
		"getAdvisorByPRSM" : function(code,dataset){
			GetAdvisorByPRSM(code,dataset);
		},
		"getAdvisorByCNSM" : function(code,dataset){
			GetAdvisorByCNSM(code,dataset);
		},
		
"HO": [
	{"code":"00001","name":"ZM 1"},
	{"code":"00002","name":"ZM 2"}
],


"ZM": {
	"00001":[
		{"code":"00011","name":"RM 1"},
		{"code":"00012","name":"RM 2"}
	],
	"00002":[
		{"code":"00021","name":"RM 3"},
		{"code":"00022","name":"RM 4"}
	]
},

"RM":{
	"00011":[
		{"code":"00111","name":"BM 1"},
		{"code":"00112","name":"BM 2"}
	],
	"00012":[
		{"code":"00121","name":"BM 3"},
		{"code":"00122","name":"BM 4"}
	],
	"00021":[
		{"code":"00211","name":"BM 5"},
		{"code":"00212","name":"BM 6"}
	],
	"00022":[
		{"code":"00221","name":"BM 7"},
		{"code":"00222","name":"BM 8"}
	]
},

"BM":{
	"00111":[
		{"code":"01111","name":"SM 1"},
		{"code":"01112","name":"SM 2"}
	],
	"00112":[
		{"code":"01121","name":"SM 3"},
		{"code":"01122","name":"SM 4"}
	]
},

"SM":{
	"01111":[
		{"code":"11111","name":"ADV 1"},
		{"code":"11112","name":"ADV 2"}
	],
	"01112":[
		{"code":"11121","name":"ADV 3"},
		{"code":"11122","name":"ADV 4"}
	]
}
		
};


function GetAMbyRM(RM_CodeValue,dataset){
	var filter = new window.DB.Filter.equal("RM_Code", "'" + RM_CodeValue + "'");
	SHData.SelectWithFilter(["AM_Code as code","AM_Name as name"],filter,setSuccessCallBack(dataset),setErrorCallBack(dataset),true);
	
}

function GetBMbyAM(AM_CodeValue,dataset){
	var filter = new window.DB.Filter.equal("AM_Code", "'" + AM_CodeValue + "'");
	SHData.SelectWithFilter(["BM_Code as code","BM_Name as name"],filter,setSuccessCallBack(dataset),setErrorCallBack(dataset),true);
	
}

function GetSMbyBM(BM_CodeValue,dataset){
	var filter = new window.DB.Filter.equal("BM_Code", "'" + BM_CodeValue + "'");
	SHData.SelectWithFilter(["SM_Code as code","SM_Name as name"],filter,setSuccessCallBack(dataset),setErrorCallBack(dataset),true);
}

function GetADVbySM(SM_CodeValue,dataset){
	var filter = new window.DB.Filter.equal("SM_Code", "'" + SM_CodeValue + "'");
	SHData.SelectWithFilter(["Adv_Emp_Code as code","Adv_Emp_Name as name"],filter,setSuccessCallBack(dataset),setErrorCallBack(dataset),true);
}

function GetRMbyZM(ZM_CodeValue,dataset){
	var filter = new window.DB.Filter.equal("ZM_Code", "'" + ZM_CodeValue + "'");
	SHData.SelectWithFilter(["RM_Code as code","RM_Name as name"],filter,setSuccessCallBack(dataset),setErrorCallBack(dataset),true);
}

function GetCDAADVbyCDASM(SM_CodeValue,dataset){
	var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
		new window.DB.Filter.equal("SM_Code", SM_CodeValue),
		new window.DB.Filter.equal("Channel", "'CD'")
	]);	
	SHData.SelectWithFilter(["Adv_Emp_Code as code","Adv_Emp_Name as name"],filter,setSuccessCallBack(dataset),setErrorCallBack(dataset),true);
}

function GetSMbyTM(BM_CodeValue,dataset){
	var filter = new window.DB.Filter.equal("BM_Code", "'" + BM_CodeValue + "'");
	SHData.SelectWithFilter(["SM_Code as code","SM_Name as name"],filter,setSuccessCallBack(dataset),setErrorCallBack(dataset),true);
}
function GetAdvisorByTPPAR(TPPAR_CodeValue,dataset){
	var filter = new window.DB.Filter.equal("CHANNEL_PARTNER", "'" + TPPAR_CodeValue + "'");
	shTpdData.SelectWithFilter(["ADVISORNAME as name","ADVISORCODE as code"],filter,setSuccessCallBack(dataset),setErrorCallBack(dataset),true);
}
function GetAdvisorByTPSM(TPSM_CodeValue,dataset){
	var filter = new window.DB.Filter.equal("SM_Code", "'" + TPSM_CodeValue + "'");
	SHData.SelectWithFilter(["Adv_Emp_Code as code","Adv_Emp_Name as name"],filter,setSuccessCallBack(dataset),setErrorCallBack(dataset),true);
}
function GetAdvisorByAGSM(AGSM_CodeValue,dataset){
	var filter = new window.DB.Filter.equal("SM_Code", "'" + AGSM_CodeValue + "'");
	SHData.SelectWithFilter(["Adv_Emp_Code as code","Adv_Emp_Name as name"],filter,setSuccessCallBack(dataset),setErrorCallBack(dataset),true);
}
function GetAdvisorByAGPS(AGPS_CodeValue,dataset){
	var filter = new window.DB.Filter.equal("SM_Code", "'" + AGPS_CodeValue + "'");
	SHData.SelectWithFilter(["Adv_Emp_Code as code","Adv_Emp_Name as name"],filter,setSuccessCallBack(dataset),setErrorCallBack(dataset),true);
}
function GetAdvisorByTPBOM(TPBOM_CodeValue,dataset){
	var filter = new window.DB.Filter.equal("SM_Code", "'" + TPBOM_CodeValue + "'");
	SHData.SelectWithFilter(["Adv_Emp_Code as code","Adv_Emp_Name as name"],filter,setSuccessCallBack(dataset),setErrorCallBack(dataset),true);
}

function GetAdvisorByCNSM(CNSM_CodeValue,dataset){
	var filter = new window.DB.Filter.equal("SM_Code", "'" + CNSM_CodeValue + "'");
	SHData.SelectWithFilter(["Adv_Emp_Code as code","Adv_Emp_Name as name"],filter,setSuccessCallBack(dataset),setErrorCallBack(dataset),true);
}

function GetAdvisorByPRSM(PRSM_CodeValue,dataset){
	var filter = new window.DB.Filter.equal("SM_Code", "'" + PRSM_CodeValue + "'");
	SHData.SelectWithFilter(["Adv_Emp_Code as code","Adv_Emp_Name as name"],filter,setSuccessCallBack(dataset),setErrorCallBack(dataset),true);
}



function setSuccessCallBack(dataset){
	return function(response){
		$m.juci.dataset(dataset,response.rows);
	
	};
}

function setErrorCallBack(dataset){
	return function(response){
	};
}

