var x2js = new X2JS(); 
var policyId = "";
var advisorId = "";
var advisorCode = "";
var advisorName = "";


function generateUUID(){
	var d = new Date().getTime();
	// xxxx-xxx-4xxx-yxx-xxxxxx
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x7|0x8)).toString(16);
	});
	return advisorCode + "-" + uuid;
}

function callService(event){
       var Plan_Code = event.data.productCode;
         
	if($m.juci.dataset("teamLoginData")){
		advisorCode = $m.juci.dataset("teamLoginData").LA_Business_LoginCode;
		advisorName = $m.juci.dataset("teamLoginData").Adv_Emp_Name;
	}else{
		advisorCode = JSON.parse(JSON.parse($m.getUserAccount()).customProperties).LA_Business_LoginCode;
		advisorName = JSON.parse(JSON.parse($m.getUserAccount()).customProperties).Login_Name;	
	}
	//"http://lifelineuat.reliancelife.com/mobilebi?UniqueID="+ generateUUID() +"&DeviceID=TAB&AdvisorCode="+ advisorCode +"&AdvisorName=" + advisorName
    //http://124.124.218.141/mobilebi/Plan"+ 94 + ".html?UniqueID="+ generateUUID() +"&DeviceID=TAB&AdvisorCode="+ advisorCode +"&AdvisorName=" + advisorName +"&Planno=" + 94
    //http://124.124.218.141/mobilebi/Plan124.html?UniqueID=hgj&DeviceID=tab&AdvisorCode=12345&AdvisorName=uyiy&Planno=124
    //http://124.124.218.141/mobilebi/Plan101.html?UniqueID=sas&DeviceID=tab&AdvisorCode=12&AdvisorName=asd&Planno=101

	$m.openChildBrowser("Proposal BI",	"http://124.124.218.141/mobilebi/Plan"+ Plan_Code + ".html?UniqueID=sas&DeviceID=tab&AdvisorCode="+ advisorCode +"&AdvisorName=" + advisorName +"&Planno=" + Plan_Code, {"navigation": true, "address": [],"patterns": [
		{
			"pattern":"mobilebi/Plan"+Plan_Code+".html?fname",
			"callback": function(match){
				var fname = "";
				var fromRegenerate = false;
				if(match.url.indexOf("&") == -1){
					fname = match.url.substring(match.url.indexOf("fname") + 6, match.url.length);
				}else{
					fname = match.url.substring(match.url.indexOf("fname") + 6, match.url.indexOf("&"));
				}
				//var historylength = match.historylength;
				//var dataObj = JSON.parse('{"' + decodeURI(match.history[historylength - 2].replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
				//alert("Session Id:" + fname);
				if(fname == "" || fromRegenerate){
					$m.alert("Unexpected Response from BI");
				}
				else {
					try{
						$m.get(Constants.publicIP+"/mowblyserver/smbiintegrateservice/rellife/prod/RlifeAssist?fname="+fname, function(response){
							if(response.code == 200){
								var result = response.result;
								policyId = result.data;
								policyId = policyId.trim();
								$m.get(Constants.publicIP+"/mowblyserver/smbiproductcode/rellife/prod/RlifeAssist?policyId="+policyId+"&appversion="+$m.getPref("version"), function(response){
									if(response.code == 200){
										if(response.result.data.trim()){
											var result = response.result;
											var data = JSON.parse(result.data);
											var Product_Code = data.ProductCode;
											var CombinationOFProducts = data.CombinationOFProducts;
											//alert("Product Code:"+Product_Code+"Combi:"+CombinationOFProducts);
											$m.get("http://124.124.218.141/ul/html/"+fname+"demo.xml", function(response){
												if(response.code === 200){
													var result = response.result;
													if(result.data){
														var obj = x2js.xml_str2json( result.data );
														var passingData = proccessBIData({"data":obj.DocumentElement.Table, "policyId": policyId, "BI_XML": result.data, "Product_Code": Product_Code, "CombinationOFProducts": CombinationOFProducts, "Advisor_Code": advisorCode});
														//alert(JSON.stringify(passingData));
														passingData.fname = fname;
														if(passingData.name && passingData.dob){
															$m.open("NeedAnalysis", "/Need Analysis/solutions.html", passingData);
														}else{
															$m.logError("Kindly check your network connectivity!! - " + JSON.stringify(response));
															$m.logDebug("Kindly check your network connectivity!! - " + JSON.stringify(passingData));
															$m.alert("Kindly check your network connectivity!!");
														}
													}else{
														$m.logError("Request Failed. Please try later" + JSON.stringify(response));
														$m.alert("Request Failed. Please try later");
													}
												}
												else {
													$m.logError("Request Failed. Please try later" + JSON.stringify(response));
													$m.alert("Request Failed. Please try later");
												}
											});
										}else{
											$m.alert("Kindly upgrade to latest version from force update option for application no generation!!");
										}
									}
									else {
										$m.logError("Request Failed. Please try later" + JSON.stringify(response));
										$m.alert("Request Failed. Please try later");
									}
								});
							}
							else{
								$m.logError("Request Failed. Please try later" + JSON.stringify(response));
								$m.alert("Request Failed. Please try later");
							}
						});
					}catch(e){
						$m.alert("Kindly upgrade to latest version from force update option for application no generation!!");
						$m.logError("Request Failed. Please try later. Reason - " + e);
					}
				}
			}
		},
		{
			"pattern":"/biwebservice/pdf.aspx",
			"callback": function(match){
				var fname = "";
				var fromRegenerate = false;
				if(match.url.indexOf("url1") != -1){
					match.url = match.url.substring(match.url.indexOf("url1") + 5, match.url.indexOf("&"));
					fromRegenerate = false;
				}else{
					fromRegenerate = true;
				}
				if(match.url.indexOf("&") == -1){
					fname = match.url.substring(match.url.indexOf("fname") + 6, match.url.length);
				}else{
					fname = match.url.substring(match.url.indexOf("fname") + 6, match.url.indexOf("&"));
				}
				//var fname = url.slice(url.indexOf("=")+1);
				//var historylength = match.history.length;
				//var dataObj = JSON.parse('{"' + decodeURI(match.history[historylength - 2].replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
				//alert("Session Id:" + fname);
				if(fname == "" || fromRegenerate){
					$m.alert("Unexpected Response from BI");
				}
				else {
					try{
						$m.get(Constants.publicIP+"/mowblyserver/smbiintegrateservice/rellife/prod/RlifeAssist?fname="+fname, function(response){
							if(response.code == 200){
								var result = response.result;
								policyId = result.data;
								policyId = policyId.trim();
								$m.get(Constants.publicIP+"/mowblyserver/smbiproductcode/rellife/prod/RlifeAssist?policyId="+policyId+"&appversion="+$m.getPref("version"), function(response){
									if(response.code == 200){
										if(response.result.data.trim()){
											var result = response.result;
											var data = JSON.parse(result.data);
											var Product_Code = data.ProductCode;
											var CombinationOFProducts = data.CombinationOFProducts;
											//alert("Product Code:"+Product_Code+"Combi:"+CombinationOFProducts);
											$m.get("http://lifelineuat.reliancelife.com/BIwebservice/UL/HTML/"+fname+"demo.xml", function(response){
												if(response.code === 200){
													var result = response.result;
													if(result.data){
														var obj = x2js.xml_str2json( result.data );
														var passingData = proccessBIData({"data":obj.DocumentElement.Table, "policyId": policyId, "BI_XML": result.data, "Product_Code": Product_Code, "CombinationOFProducts": CombinationOFProducts, "Advisor_Code": advisorCode});
														passingData.fname = fname;
														//alert(JSON.stringify(passingData));
														if(passingData.name && passingData.dob){
															$m.open("NeedAnalysis", "/Need Analysis/solutions.html", passingData);
														}else{
															$m.logError("Kindly check your network connectivity!! - " + JSON.stringify(response));
															$m.logDebug("Kindly check your network connectivity!! - " + JSON.stringify(passingData));
															$m.alert("Kindly check your network connectivity!!");
														}
													}else{
														$m.logError("Request Failed. Please try later" + JSON.stringify(response));
														$m.alert("Request Failed. Please try later");
													}
												}
												else {
													$m.logError("Request Failed. Please try later" + JSON.stringify(response));
													$m.alert("Request Failed. Please try later");
												}
											});
										}else{
											$m.alert("Kindly upgrade to latest version from force update option for application no generation!!");
										}
									}
									else {
										$m.logError("Request Failed. Please try later" + JSON.stringify(response));
										$m.alert("Request Failed. Please try later");
									}
								});
							}
							else{
								$m.logError("Request Failed. Please try later" + JSON.stringify(response));
								$m.alert("Request Failed. Please try later");
							}
						});
					}catch(e){
						$m.alert("Kindly upgrade to latest version from force update option for application no generation!!");
						$m.logError("Request Failed. Please try later. Reason - " + e);
					}
				}
			}
		}
	]});
}


function jsonObject(x){
	var jsonString = "";
	var objectData = {};
	var xmlString = [ "_x0020_DOB", "Age", "Term", "PPT", "SA", "Mode", "Sex", "txtName", "QuotationNo", "txtDate", "txtAdvisor", "txtAdvisor_Code", "AgeProof", "IP", "IPST1", "IPST2", "AP", "Frequency", "IXP", "IXPST", "IXPST2", "BIP", "BIPST1", "BIPST2", "QNO", "PlanNo", "DATETIMENOW" ];
	for(var i=0; i<xmlString.length; i++){
		var index = x.indexOf(xmlString[i]);
		console.log("index"+index);
		x = x.slice(index,x.length);
		index2 = xmlString[i].length;
		name = xmlString[i];
		value = x.substring(index2+1,x.search("</"));
objectData[name] = value;
		jsonString += "\""+name+"\":\""+value+"\",";
	}
	return objectData;
}
