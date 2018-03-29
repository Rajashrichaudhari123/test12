/**
 * calculators.js
 *
 * @author CloudPact Technologies
 * @description : Calcuations for calculator
 */
var ChildCalc = {
	"_childCalc" : function(yearsUntilReturns, currCost, expInflRatePct, currSavings, monthlySavings, invRetPct){
		var rObj = {};
		
		var accumulationPeriod = yearsUntilReturns;
		var annualSavings = monthlySavings * 12;
		
		var inflAdjReturns = (((invRetPct/100)-(expInflRatePct/100))/(1+(expInflRatePct/100)))*100;
		rObj.inflAdjReturns = roundTo2(inflAdjReturns);
		
		var discRateOfInt = ((invRetPct/100)/(1+(invRetPct/100)))*100;
		rObj.discRateOfInt = roundTo2(discRateOfInt);
		
		var pthlyDiscRateOfInt = (12*(1-Math.pow((1-(discRateOfInt/100)),(1/12))))*100;
		rObj.pthlyDiscRateOfInt = roundTo2(pthlyDiscRateOfInt);
		
		var accumValue = (Math.pow((1+(invRetPct/100)),(accumulationPeriod))-1)/(pthlyDiscRateOfInt/100);
		rObj.accumValue = roundTo2(accumValue);
		
		var totalSavings = currSavings*Math.pow((1+(invRetPct/100)),accumulationPeriod)+(annualSavings*accumValue);
		 var fractionValue= (totalSavings % 1).toFixed(1).substring(2);
		if(fractionValue>=5){
			rObj.totalSavings = Math.floor(totalSavings)+1;
		}
		else{
		rObj.totalSavings = Math.floor(totalSavings);
		}
		var reqCorpus = currCost*(Math.pow((1+(expInflRatePct/100)),accumulationPeriod));
		rObj.reqCorpus = roundTo2(reqCorpus);
		
		var shortFall = reqCorpus - totalSavings;
		shortFall = (shortFall>1)? shortFall:0;
		rObj.shortFall = roundTo2(shortFall);
		
		var monthlyReqSavings = shortFall/accumValue/12;
			  var monthly_fraction= (monthlyReqSavings % 1).toFixed(1).substring(2);
			if(monthly_fraction>=5){
			rObj.monthlyReqSavings = Math.floor(monthlyReqSavings)+1;
		}
			else{
		rObj.monthlyReqSavings = Math.floor(monthlyReqSavings);
			}
		return rObj;
	},
	
	"marriage": function(yearsUntilReturns, currCost, expInflRate, currSavings, monthlySavings, invRetPct){
		return ChildCalc._childCalc(yearsUntilReturns, currCost, expInflRate, currSavings, monthlySavings, invRetPct);
	},
	
	"education": function(yearsUntilReturns, currCost, expInflRatePct, currSavings, monthlySavings, invRetPct){
		return ChildCalc._childCalc(yearsUntilReturns, currCost, expInflRatePct, currSavings, monthlySavings, invRetPct);
	}
};

var RetirementCalc = {
	"LIFE_EXPECTANCY": 85,
	"POST_RET_EXP_RET_PCT": 6,
	"RET_PLAN" : 1,
	"RET_CORPUS" : 2,
	
	"_retCalc": function(age, retAge, currMonthlyExp, expInflRatePct, currRetSavings, monthlySavings, invRetPct, calcType){
		var rObj = {};
		
		var accumulationPeriod = retAge - age;
		rObj.accumulationPeriod = roundTo2(accumulationPeriod);
		
		var annuityPayoutPeriod = RetirementCalc.LIFE_EXPECTANCY - retAge;
		rObj.annuityPayoutPeriod = annuityPayoutPeriod;
		
		var discRateOfIntForAccumValue = ((invRetPct/100)/(1+(invRetPct/100)))*100;
		rObj.discRateOfIntForAccumValue = roundTo2(discRateOfIntForAccumValue);
		
		var pthlyDiscRateOfIntForAccumValue = (12*(1-Math.pow((1-(discRateOfIntForAccumValue/100)),(1/12))))*100;
		rObj.pthlyDiscRateOfIntForAccumValue = roundTo2(pthlyDiscRateOfIntForAccumValue);
		
		var accumValue = (Math.pow((1+(invRetPct/100)),accumulationPeriod)-1)/(pthlyDiscRateOfIntForAccumValue/100);
		rObj.accumValue =roundTo2(accumValue);
		
		var inflAdjPostRetInvRetPct = (((RetirementCalc.POST_RET_EXP_RET_PCT/100)-(expInflRatePct/100))/(1+(expInflRatePct/100)))*100;
		rObj.inflAdjPostRetInvRetPct = roundTo2(inflAdjPostRetInvRetPct);
		
		var discRateOfIntForPresValue = ((inflAdjPostRetInvRetPct/100)/(1+(inflAdjPostRetInvRetPct/100)))*100;
		rObj.discRateOfIntForPresValue = roundTo2(discRateOfIntForPresValue);
		
		var pthlyDiscRateOfIntForPresValue = (12*(1-Math.pow((1-(discRateOfIntForPresValue/100)),(1/12))))*100;
		rObj.pthlyDiscRateOfIntForPresValue = roundTo2(pthlyDiscRateOfIntForPresValue);
		
		var presValue = (expInflRatePct == RetirementCalc.POST_RET_EXP_RET_PCT)? annuityPayoutPeriod : (1-Math.pow((1/(1+(inflAdjPostRetInvRetPct/100))),annuityPayoutPeriod))/(pthlyDiscRateOfIntForPresValue/100);
		rObj.presValue = presValue;
		
		var annualSavings = monthlySavings * 12;
		rObj.annualSavings = roundTo2(annualSavings);
		
		var totalSavingsAtRet = currRetSavings*Math.pow((1+(invRetPct/100)),accumulationPeriod)+annualSavings*accumValue;
          var fractionValue= (totalSavingsAtRet % 1).toFixed(1).substring(2);
		if(fractionValue>=5){
			rObj.totalSavingsAtRet = Math.floor(totalSavingsAtRet)+1;
		}
			else{
		rObj.totalSavingsAtRet = Math.floor(totalSavingsAtRet);
			}
		var annualExpenses = currMonthlyExp * 12;
		if(calcType == RetirementCalc.RET_PLAN)
			rObj.annualExpenses = annualExpenses;
		
		var annualAnnuityPayout = currMonthlyExp * 12;
		if(calcType == RetirementCalc.RET_CORPUS)
			rObj.annualAnnuityPayout = roundTo2(annualAnnuityPayout);
		
		var retCorpus;
		if(calcType == RetirementCalc.RET_PLAN)
			retCorpus = annualExpenses*(Math.pow((1+(expInflRatePct/100)),accumulationPeriod))*presValue;
		else
			retCorpus = annualAnnuityPayout*presValue;
		rObj.retCorpus = roundTo2(retCorpus);
		
		var shortFall = retCorpus - totalSavingsAtRet;
		shortFall = (shortFall>1)? shortFall:0;
		rObj.shortFall = roundTo2(shortFall);
		
		var monthlyReqSavings = shortFall/accumValue/12;
		  var monthly_fraction= (monthlyReqSavings % 1).toFixed(1).substring(2);
			if(monthly_fraction>=5){
			rObj.monthlyReqSavings = Math.floor(monthlyReqSavings)+1;
		}
			else{
		rObj.monthlyReqSavings = Math.floor(monthlyReqSavings);
			}
		return rObj;
	},
	
	"planner": function(age, retAge, currMonthlyExp, expInflRatePct, currRetSavings, monthlySavings, invRetPct){
		return RetirementCalc._retCalc(age, retAge, currMonthlyExp, expInflRatePct, currRetSavings, monthlySavings, invRetPct, 1);
	},
	
	"corpus": function(age, retAge, currMonthlyExp, expInflRatePct, currRetSavings, monthlySavings, invRetPct){
		return RetirementCalc._retCalc(age, retAge, currMonthlyExp, expInflRatePct, currRetSavings, monthlySavings, invRetPct, 2);
	}
};

var HLVCalc = {
	"DISCOUNT_FACTOR_PCT": 4,
	"ANNUAL_EXP_INCREASE_PCT": 8,
	"INFLATION_FACTOR_PCT": 8,
	"RETIREMENT_AGE": 60,
	"HOUSEHOLD_SAVINGS_PCT": 23,
	"PV" : 1,
	
	"_genPVFactorTable" : function(age, ageAtDeath){
		var pvTable = [];
		var pvObj = {
			"age": age,
			"year": 0,
			"factor": (age >= ageAtDeath)? 1 : 0,
			"pv" : 1
		};
		pvTable.push(pvObj);
		
		for(var i=1;i<50;i++){
			pvObj = {
				"age": parseInt(age) + i,
				"year": (Math.max(HLVCalc.RETIREMENT_AGE-age,10) > i)? i : 0,
				"factor": ((parseInt(age)+i) >= ageAtDeath)? 1 : 0
			};
			pvObj.pv = (HLVCalc.PV*Math.pow((1+(this.INFLATION_FACTOR_PCT/100)),pvObj.year))/(Math.pow((1+(HLVCalc.DISCOUNT_FACTOR_PCT/100)),pvObj.year))*((pvObj.year===0)?0:1);
			pvTable.push(pvObj);
		}
		
		return pvTable;
	},
	
	"_hlvCalc": function(age, annualIncome, annualExpense){
		var rObj = {};
		
		var inflFactor = HLVCalc.ANNUAL_EXP_INCREASE_PCT;
		var deathOccursAfter = (age < 50)? Math.floor((HLVCalc.RETIREMENT_AGE - age)/2+0.5) : 0;
		rObj.deathOccursAfter = deathOccursAfter;
		
		var ageAtDeath = (age < 50)? Math.min(parseInt(age) + deathOccursAfter, HLVCalc.RETIREMENT_AGE-10) : age;
		rObj.ageAtDeath = ageAtDeath;
		
		var pvTable = HLVCalc._genPVFactorTable(age, ageAtDeath);
		var timesLifeCoverNeeded = 0;
		for(var i=0;i<pvTable.length;i++){
			if(pvTable[i].factor == 1)
				timesLifeCoverNeeded += pvTable[i].pv;
		}
		rObj.timesLifeCoverNeeded = Math.floor(timesLifeCoverNeeded);
		
		var HLV = annualExpense * timesLifeCoverNeeded;
		 var fractionValue= (HLV % 1).toFixed(1).substring(2);
		if(fractionValue>=5){
			rObj.HLV = Math.floor(HLV)+1;
		}
			else{
		rObj.HLV = Math.floor(HLV);
			}
		return rObj;
	},
	
	"expense": function(age, annualIncome, annualExpense){
		return HLVCalc._hlvCalc(age, annualIncome, annualExpense);
	},
	
	"income": function(age, annualIncome){
		return HLVCalc._hlvCalc(age, annualIncome, annualIncome*0.77);
	}
};