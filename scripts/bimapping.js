/**
 * BiMapping.js
 * @author CloudPact Technologies
 * @description : This script is for Mapping Benifit Illustration xml data.
 **/

function proccessBIData(jsonObject){
	var objData = jsonObject.data;
	var planId = jsonObject.policyId;
	var bi_XML = jsonObject.BI_XML;
	var Product_Code = jsonObject.Product_Code;
	var Advisor_Code = jsonObject.Advisor_Code;
	var CombinationOFProducts = jsonObject.CombinationOFProducts;
	var obj = {};
	if(planId == "142"){
		obj.Application_Number = null;
		obj.Application_Dt = objData.txtDate;
		obj.Advisor_Code = objData.txtAdvisor_Code ? objData.txtAdvisor_Code : objData.txtAdvisor_code;
		obj.Advisor_Name = objData.txtAdvisor;
		obj.ProductCode = Product_Code;
		obj.PLanCode = planId;
		obj.CombinationOFProducts = CombinationOFProducts;
		obj.AGE_Proof = getAgeProof(objData.Flag,objData);
		obj.ECS_NonECS = getEcs(objData.Flag,objData);
		obj.Total_InstPremium = getTotal_InstPremium(objData.TIP, getPreFre(objData.Flag,objData),objData);
		obj.Total_InstPremium_ST = getTotal_InstPremium(objData.TIP1, getPreFre(objData.Flag,objData),objData);
		obj.PremiumPayingTerm = getPPT1(objData.Flag,objData);
		//obj.SumAssured = objData.SA;
		obj.installmentPremium = objData.TIPST1;
		obj.InstallmentPremium_ST = getTotal_InstPremium(objData.TIPST1, getPreFre(objData.Flag,objData));
		obj.RiderName_1 = "ADBR";
		obj.COVERAGECODEFORRIDER_1 = null;
		obj.PolicyTerm_1 = "ADTP";
		obj.PremiumPayingTerm_1 = objData.ADPT;
		obj.SumAssured_1 = objData.SAADR;
		obj.InstallmentPremium_1 = Math.round(objData.ADRAP);
		obj.InstallmentPremium_1_ST = null;
		obj.RiderName_2 = "ADBL";
		obj.COVERAGECODEFORRIDER_2 = null;
		obj.PolicyTerm_2 = objData.TADL;
		obj.PremiumPayingTerm_2 = objData.ADRPT;
		obj.SumAssured_2 = objData.SAADL;
		obj.InstallmentPremium_2  = Math.round(objData.ADLAP);
		obj.InstallmentPremium_2_ST = null;
		obj.RiderName_3 = "MSB";
		obj.COVERAGECODEFORRIDER_3 = null;
		obj.PolicyTerm_3 = objData.TMSB;
		obj.PremiumPayingTerm_3 = objData.TMSB;
		obj.SumAssured_3 = objData.SAMSB;
		obj.InstallmentPremium_3 = Math.round(objData.MAP);
		obj.InstallmentPremium_3_ST = null;
		obj.RiderName_4 = "CCR";
		obj.COVERAGECODEFORRIDER_4 = null;
		obj.PolicyTerm_4 = objData.CPT;
		obj.PremiumPayingTerm_4 = objData.CPT;
		obj.SumAssured_4 = objData.SACC;
		obj.InstallmentPremium_4 = Math.round(objData.CAP);
		obj.InstallmentPremium_4_ST = null;
		obj.RiderName_5 = "TLB";
		obj.COVERAGECODEFORRIDER_5 = null;
		obj.PolicyTerm_5 = objData.TT;
		obj.PremiumPayingTerm_5 = objData.TT;
		obj.SumAssured_5 = objData.SAT;
		obj.InstallmentPremium_5 = Math.round(objData.TAP);
		obj.InstallmentPremium_5_ST = null;
		obj.RiderName_6 = "FIB";
		obj.COVERAGECODEFORRIDER_6 = null;
		obj.PolicyTerm_6 = objData.TFIB;
		obj.PremiumPayingTerm_6 = objData.PPTFIB;
		obj.SumAssured_6 = objData.SAFIB;
		obj.InstallmentPremium_6 = Math.round(objData.FAP);
		obj.InstallmentPremium_6_ST = null;
		obj.RiderName_7 = null;
		obj.COVERAGECODEFORRIDER_7 = null;
		obj.PolicyTerm_7 = null;
		obj.PremiumPayingTerm_7 = null;
		obj.SumAssured_7 = null;
		obj.InstallmentPremium_7 = null;
		obj.InstallmentPremium_7_ST = null;
		obj.LifeCorporateBond_Fund1 = null;
		obj.LifeMoneyMarket_Fund1 = null;
		obj.LifeEquity_Fund3 = null;
		obj.LifeBalanced_Fund1 = null;
		obj.LifePureEquity_Fund2 = null;
		obj.PensionSmart_Fund1 = null;
		obj.Systematic_TransaferPlan = null;
		obj.Premium_Payment_type = null;
		obj.Death_BenifitOption = getdeathBnft(objData.Flag,objData);
		obj.Premium_Frequency =getPreFre(objData.Flag,objData);
		obj.Mode_Deposit = getMode(objData.Flag,objData);
		obj.BI_XML = bi_XML;
		obj.Txn_Date = null; 
		obj.name = objData.txtName; 
		//obj.sex = getSex(objData.Flag,objData);
		//Changed on 15/12/2017
		obj.sex = (objData.SexFA != "0" && objData.SexFA != undefined) ? objData.SexFA :objData.SexFB;
		obj.dob = getdob(objData.Flag,objData);
		obj.Eligible_for_EmpDiscount = null;
		obj.Child_Name=objData.txtChildName;
		obj.Child_DOB=getChildDOB(objData.Flag,objData);
		obj.Child_Proposar_Relation=getChildPR(objData.Flag,objData);
		obj.Premium_Payment_Option = null;
		obj.Rider_Total_InstPrem=objData.RIP;
		obj.Rider_total_InstPrem_ST=objData.RIP1;
		obj.Death_Benefit_Multiple=objData.DBOM;
		obj.BaseAnnualised_Premium=objData.BAP;
		obj.Maturity_Benefit_PayoutOption=getMatBenPO(objData.Flag,objData);
		obj.Child_Gender=getMatChildGender(objData.Flag,objData);
		obj.PolicyTerm = objData.Term;
		obj.NOM_LA_Relationship = objData.Flag === "FlagA" ? objData.CRPA : objData.CRPB;  
		obj.EED = objData.EED;
		obj.RiderName7 = objData.ADP;
		obj.PolicyTerm7 = objData.ADPT;
		obj.PremiumPayingTerm7 = objData.ADPPT;
		obj.SumAssured7 = objData.ADPS;
		obj.InstallmentPremium7 = objData.ADPAP;
		obj.MortalityClass_Rider7 = objData.ADPIP;
	} else {
		obj.Application_Number = null;
		obj.PLanCode = objData.PlanNo;
		//obj.PLanCode = 124;
		obj.Application_Dt = objData.txtDate;
		obj.QN = objData.QN;
		obj.Advisor_Name = objData.txtAdvisor;
		obj.Advisor_Code = objData.txtAdvisor_code ? objData.txtAdvisor_code : objData.txtAdvisor_Code;
		obj.ED = objData.ED;
		obj.name = objData.txtName; 
		obj.sex = getFormattedGender(objData.Sex); 
		obj.dob = objData._x0020_DOB;
		obj.Age = objData.Age;
		obj.Premium_Frequency = objData.Mode;
		obj.ECS_NonECS = objData.ECS;
		obj.AGE_Proof = objData.AgeProof;
		//obj.SumAssured = objData.SA;
		obj.InstallmentPremium_ST = objData.PP;
		obj.InstallmentPremium = objData.IP;
		obj.AP = objData.AP;
		obj.PN1 = objData.PN1;
		obj.PN2 = objData.PN2;
		obj.InstallmentPremium_1_ST = objData.IPST1;
		obj.InstallmentPremium_2_ST = objData.IPST2;
		obj.InstallmentPremium_1 = objData.IP1;
		obj.InstallmentPremium_2  = objData.IP2;
		obj.Child_Name = objData.txtChildName;
		obj.Child_Gender = getMatChildGender(objData.Flag,objData);
		obj.Child_DOB = getChildDOB(objData.Flag,objData);
		obj.Child_Proposar_Relation=getChildPR(objData.Flag,objData);
		obj.PolicyTerm = objData.Term;
		obj.PremiumPayingTerm = objData.PPT ? objData.PPT : objData.Term;
		obj.AF = objData.AF;
		obj.AO = objData.AO;
		obj.PP = objData.PP;
		obj.Frequency = objData.Frequency;
		obj.pfrequency = objData.pfrequency;
		obj.BI_XML = bi_XML;	
		obj.EED = objData.EED;
		obj.RiderName7 = objData.ADP;
		obj.PolicyTerm7 = objData.ADPT;
		obj.PremiumPayingTerm7 = objData.ADPPT;
		obj.SumAssured7 = objData.ADPS;
		obj.InstallmentPremium7 = objData.ADPAP;
		obj.MortalityClass_Rider7 = objData.ADPIP;
	}
	
	var SumAssured = 0;
	if(planId == "132") {
		obj.SumAssured = objData.GSAM;
	} else {
		if(objData.SA != 0 ) {
			obj.SumAssured = objData.SA;
		} else {
			obj.SumAssured = objData.SAD;
		}
	}
	
	if(obj.SumAssured){
		obj.SumAssured = Math.floor(obj.SumAssured);	
	}
	
	var installmentPremium = 0;
	var mode = "";
	var Frequency = "";
	var pfrequency = "";
	switch(planId){
		case "94":
			installmentPremium = objData.TIPST1;
			break;
		case "116":
			installmentPremium = objData.TIPST1; 
			break;
		case "153":
			installmentPremium = objData.TPST1; 
			mode = objData.Frequency;
			break;
		case "154":
			installmentPremium = objData.TPST1;
			mode = objData.Frequency;
			break;
		case "137":
			installmentPremium = objData.TIPST1;
			break;
		case "138":
			installmentPremium = objData.TIPST1; 
			break;
		case "124":
			installmentPremium = objData.TIPST1 + objData.RIPST1; 
			mode = objData.Frequency;
			break;
		case "166":
			installmentPremium = objData.IP; 
			break;
		case "108":
			installmentPremium = objData.IPST1; 
			mode = objData.Frequency;
			break;
		case "143":
			installmentPremium = objData.IPST1; 
			mode = objData.Frequency;
			break;
		case "142":
			installmentPremium = objData.TIPST1;
			mode = getPreFre(objData.Flag,objData);
			mode = objData.Frequency;
			break;
		case "159":
			installmentPremium = objData.TIPST1; 
			mode = objData.Frequency;
			break;
		case "155":
			installmentPremium = objData.IPST1;
			mode = objData.Frequency;
			break;
		case "114":
			installmentPremium = objData.IPST; 
			break;
		case "110":
			installmentPremium = objData.IP; 
			break;
		case "109":
			installmentPremium = objData.IP;  
			break;
		case "164":
			installmentPremium = objData.IP; 
			break;
		case "165":
			installmentPremium = objData.IP; 
			break;
		case "132":
			installmentPremium = objData.TIP2;  
			mode = objData.Frequency;
			break;
		case "149":
			installmentPremium = objData.TIPST1; 
			mode = objData.Frequency;
			break;
		case "152":
			installmentPremium = objData.TIPST1; 
			mode = objData.Frequency;
			break;
		case "107":
			installmentPremium = checkForNull(objData.IPST) + checkForNull(objData.ADLIPST) + checkForNull(objData.MIPST) + checkForNull(objData.CIPST) + checkForNull(objData.TIPST) + checkForNull(objData.FIPST) + checkForNull(objData.ADRIPST); 
			mode = objData.Frequency;
			break;
		case "91":
			installmentPremium = objData.IPST1; 
			break;
		case "156":
			installmentPremium = objData.IP; 
			mode = objData.Frequency;
			break;
		case "93":
			installmentPremium = objData.IP; 
			break;
		case "160":
			installmentPremium = objData.TIPST1; 
			mode = objData.Frequency;
			break;
		case "118":
			installmentPremium = objData.IP; 
			break;
		case "126":
			installmentPremium = objData.IP;
			mode = objData.Frequency;
			break;
		case "117":
			installmentPremium = objData.IP;  
			break;
		case "125":
			installmentPremium = objData.TIPST1; 
			break;
		case "101":
			installmentPremium = objData.TIPST1; 
			break;
		case "121":
			installmentPremium = objData.TIPST1;
			mode = objData.Pfrequency;
			break;
		case "122":
			// Can be changed to IPST only post BI configuratin
			installmentPremium = (checkForNull(objData.IP1) + checkForNull(objData.IP2))*(checkForNull(objData.ST1) + 1);
			obj.PremiumPayingTerm = objData.PPT;
			mode = objData.Pfrequency;
			break;
		case "123":
			installmentPremium = (checkForNull(objData.IP1) + checkForNull(objData.IP2))*(checkForNull(objData.ST1) + 1);
			mode = objData.Pfrequency;
			break;
		case "127":
			installmentPremium = (checkForNull(objData.IP1) + checkForNull(objData.IP2))*(checkForNull(objData.ST1) + 1);
			mode = objData.Pfrequency;
			break;
		case "129":
			installmentPremium = objData.IPST;
			mode = objData.Pfrequency;
			break;
		case "128":
			installmentPremium = objData.IPST;
			mode = objData.Pfrequency;
			break;
		case "134":
			installmentPremium = objData.TIPST1;
			mode = objData.Frequency;
			break;
		case "148":
			installmentPremium = objData.IPEPST;
			mode = objData.SexFA ? objData.ModeFA : objData.ModeFB;
			//obj.sex = getSex(objData.Flag,objData); 
			//Changed on 15/12/2017
			obj.sex = (objData.SexFA != "0" && objData.SexFA != undefined) ? objData.SexFA :objData.SexFB;
			obj.Premium_Frequency = mode;
			obj.Age = objData.SexFA ? objData.AgeFA : objData.AgeFB;
			obj.AGE_Proof = getAgeProof(objData.Flag,objData);
			obj.Death_Benefit_Multiple = objData.SexFA ? objData.DBOFA : objData.DBOFB;
			obj.AO = objData.AOFA ? objData.AOFA : objData.AOFB;
			mode = objData.Pfrequency;
			break;
		case "146":
			installmentPremium = objData.TIPST1; 
			break;
		case "115":
			installmentPremium = objData.TIP; 
			break;
		case "147":
			installmentPremium = objData.TIPST1; 
			break;
		case "139":
			installmentPremium = objData.IPST1; 
			mode = objData.Frequency;
			break;
		case "136":
			installmentPremium = objData.IPST1;
			mode = objData.Frequency;
			break;
		case "113":
			installmentPremium = objData.IPST1;
			break;
		case "119a":
			installmentPremium = objData.IPST1;
			mode = objData.Frequency;
			break;
		case "119b":
			installmentPremium = objData.IPST1;
			mode = objData.Frequency;
			break;
		case "120":
			installmentPremium = objData.IPST1; 
			mode = objData.Frequency;
			break;
		case "163":
			installmentPremium = objData.IP; 
			mode = objData.Frequency;
			break;
		case "162":
			installmentPremium = objData.TIPST1; 
			mode = objData.Frequency;
			break;	
		
	}
	if(!mode){
		mode = objData.Mode;
	}
	obj.InstallmentPremium_ST = getTotal_InstPremium(installmentPremium, mode);
	return obj;
}


function getFormattedGender(gender){
	if(gender == "Male" || gender == "male" || gender == "M"){
		return 'M';
	}
	else if(gender == "Female" || gender == "female" || gender == "F"){
		return 'F';
	}
}

function getModeFromFRE(fre,mode,obj){
	fre = parseInt(fre, 10);
	if(fre == 1){
		return "Y";
	}
	else if(fre == 2){
		return "H";
	}
	else if(fre == 12){
		return "M";
	}
	else if(fre == 4){
		return "Q";
	}
}

function getAgeProof(Flag, obj)
{
	if(Flag=="FlagA")
		return obj.AgeProofFA;
	else
	return obj.AgeProofFB;
		
}

function getPPT1(Flag,obj){
	if ( Flag == "FlagA") {
		if (obj.PPTFA == "Regular" ) {
			return obj.TermFA;
		}else{
			return obj.PPTFA;
		}
		} else if ( Flag == "FlagB") {
			if (obj.PPTFB == "Regular"){
				return obj.TermFB; 
			} else {
				return obj.PPTFB;
			}
		}
}

function getdob(Flag,obj)
{
	if(Flag=="FlagA")
		return obj.DOBFA;
	else
	return obj.DOBFB;
		
}

function getChildDOB(Flag, obj)
{
	if(Flag=="FlagA")
		return obj.DOBCFA;
	else
	return obj.DOBCFB;
		
}

function getMatBenPO(Flag, obj)
{
	if(Flag=="FlagA"){
		if(obj.MBPOFA == "CareerStarter"){
			return "CS"; 
		} else if(obj.MBPOFA == "PostGraduationDegree"){
			return "PG";
		} else if(obj.MBPOFA == "ProfessionalDegree"){
			return "PD";
		} else if(obj.MBPOFA == "SelfStarter"){
			return "SS";
		}
	} else {
		if(obj.MBPOFB == "CareerStarter"){
				return "CS"; 
			} else if(obj.MBPOFB == "PostGraduationDegree"){
				return "PG";
			} else if(obj.MBPOFB == "ProfessionalDegree"){
				return "PD";
			} else if(obj.MBPOFB == "SelfStarter"){
				return "SS";
			}
	}
}

function getMatChildGender(Flag,obj)
{
	if(Flag == "FlagA"){
		if(obj.CRPA == "Grandson" || obj.CRPA == "Son"){
			return "M";
		} else {
			return "F";
		}
	} else{ 
		if(obj.CRPB == "Grandson" || obj.CRPB == "Son"){
			return "M";
		} else {
			return "F";
		}
	}
}

function getMode(Flag, obj)
{
	if(Flag=="FlagA")
		return obj.ModeFA;
	else
	return obj.ModeFB;
		
}

function getSex(Flag, obj)
{
	if(Flag=="FlagA")
		return obj.SexFA;
	else
	return obj.SexFB;
		
}

function getEcs(Flag,obj)
{
	if(Flag=="FlagA")
		return obj.ECSFA;
	else
	return obj.ECSFB;	
}

function getChildPR(Flag, obj)
{
	if(Flag=="FlagA")
		return obj.CRPA;
	else
	return obj.CRPB;	
}

function getdeathBnft(Flag, obj)
{
	if(Flag=="FlagA")
		return obj.DBOFA;
	else
	return obj.DBOFB;		
}

function getPreFre(Flag,obj)
{
	if(Flag=="FlagA")
		return obj.ModeFA;
	else
	return obj.ModeFB;
		
}

function getMatChildGender(Flag,obj)
{
	if(Flag == "FlagA"){
		if(obj.CRPA == "Grandson" || obj.CRPA == "Son"){
			return "M";
		} else {
			return "F";
		}
	} else{ 
		if(obj.CRPB == "Grandson" || obj.CRPB == "Son"){
			return "M";
		} else {
			return "F";
		}
	}
}

function getTotal_InstPremium(ip,mode, obj){
	if(!mode){
		return parseInt(ip);
	}
	ip = Math.round(ip);
	if(mode.search("Monthly")>-1 || mode == "Monthly" || mode == "12"|| mode == "Monthly(ECS)"){
		return parseInt(ip) * 2;
	} 
//	else if(Frequency.search("Monthly")>-1 || Frequency == "Monthly" || Frequency == "12"|| Frequency == "Monthly(ECS)"){
//		return parseInt(ip) * 2;	
//	} else if(pfrequency.search("Monthly")>-1 || pfrequency == "Monthly" || pfrequency == "12"|| pfrequency == "Monthly(ECS)"){
//		return parseInt(ip) * 2;	
//	}
	return parseInt(ip);
}

function getChildDOB(Flag, obj)
{
	if(Flag=="FlagA")
		return obj.DOBCFA;
	else
	return obj.DOBCFB;
		
}

function checkForNull(amount){
	if(!amount || amount == "null" || amount == "NULL" || amount == "#N/A"){
		return 0;
	}
	amount = parseFloat(amount);
	return amount;
}