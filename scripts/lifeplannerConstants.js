var chart2Constants = {
	"buyingAHouse"			:	"Buying a House",
	"childsHigherEducation"	:	"Child's Higher Education",
	"childsMarriage"		:	"Child's Marriage",
	"healthFamily"			:	"Health -Family",
	"liquidity"				:	"Liquidity",
	"livingExpenses"		:	"Living Expenses",
	"buyChangeCar"			:	"Buy/Change Car",
	"retirement"			:	"Retirement",
	"secondHouse"			:	"Second house",
	"pureProtectionCover"	:	"Pure Protection Cover",
	"vacationFestivities"	:	"Vacation/Festivities",
	"current"				:	"Current",
	"incomeLevel"			:	"Income Level",
	"cityCategory"			:	"City Category",
	"needExpensesRevised"	:	"Need/Expenses Revised",
	"expensesAppearOrNot"	:	"Expenses appear or not",
	"lifeStage"				:	"Lifestage"
};

var chart3Constants = {
	"buyingAHouse"			:	"Buying a House",
	"childsHigherEducation"	:	"Child's Higher Education",
	"childsMarriage"		:	"Child's Marriage",
	"healthFamily"			:	"Health -Family",
	"liquidity"				:	"Liquidity",
	"livingExpenses"		:	"Living Expenses",
	"buyChangeCar"			:	"Buy/Change Car",
	"retirement"			:	"Retirement",
	"secondHouse"			:	"Second house",
	"pureProtectionCover"	:	"Pure Protection Cover",
	"vacationFestivities"	:	"Vacation/Festivities",
	"houseInflation"		:	"House Inflation",
	"educationInflation"	:	"Education inflation",
	"marriageInflation"		:	"Marriage Inflation",
	"healthInflation"		:	"Health Inflation",
	"cpiInflation"			:	"CPI Inflation",
	"carInflation"			:	"Car Inflation",
	"current"				:	"Current",
	"after15Years"			:	"After 15 years",
	"incomeLevel"			:	"Income Level",
	"cityCategory"			:	"City Category",
	"cityTier"				:	"City Tier",
	"needExpensesRevised"	:	"Need/Expenses Revised",
	"expensesAppearOrNot"	:	"Expenses appear or not",
	"lifeStageForExpenseCalculation"	:	"Lifestage for Expense Calculation",
	"lifeStage"				:	"Lifestage",
	"income"				:	"Income",
	"customIncomeNext"		:	"Custom Income Next",
	"lookup"				:	"Lookup"
};

var chart4Constants = {
	"buyingAHouse"			:	"Buying a House (Downpayment)",
	"childsHigherEducation"	:	"Child's Higher Education",
	"childsMarriage"		:	"Child's Marriage",
	"buyChangeCar"			:	"Buy/Change Car (Downpayment)",
	"retirement"			:	"Retirement Corpus",
	"secondHouse"			:	"Second house( Downpayment)",
	"pureProtectionCover"	:	"Pure Protection Cover",
	"type"					:	"Type",
	"years"					:	"Years"	
};

var chart5Constants = {
	"premiumPerYear"	:	"PremiumPerYear",
	"benefitPayout"		:	"BenefitPayout",
	"currentLifeStage"	:	"Current Life Stage",
	"existingProduct"	:	"Existing Product"
};

var DATASETS = {
	"MaritialStatus"	:	"maritialStatus",
	"NoOfChildren"		:	"noOfChildren",
	"Cities"			:	"cities",
	"States"			:	"states",
	"Inputs"			:	"inputs"
};

var Strings = {
	"Salutation":"Salutation",
	"mainTitle":"mainTitle",
	"title":"title",
   "footer":"footer",
   "careFreeTitle":"careFreeTitle",
   "planningTitle":"planningTitle",
   "responsibleTitle":"responsibleTitle",
   "settlementTitle": "settlementTitle",
   "relaxedTitle": "relaxedTitle",
   "cfyears":"cfyears",
   "rpyears" : "rpyears",
   "rxyears":"rxyears",
   "plyears":"plyears",
   "styears":"styears",
   "goalsTitle":"goalsTitle",
   "goalsFooter":"goalsFooter",
   "createplanTitle":"createplanTitle",
   "createPlanHeader":"createPlanHeader",
   "ageDescription":"ageDescription",
   "pureProtection":"pureProtection",
   "childEducation":"childEducation",
   "firstCar":"firstCar",
   "secondCar":"secondCar",
   "retirementCorpus":"retirementCorpus",
   "childredMarriage":"childredMarriage",
   "firstHouse":"firstHouse",
   "secondHouse":"secondHouse",
   "childEdu":"childEdu",
   "wealthCreation":"wealthCreation",
   "retirement":"retirement",
    "createAPlan":"createAPlan",
   "annualFamilyIncome" :"annualFamilyIncome",
   "investObjective":"investObjective",
   "lifeStageNeed":"lifeStageNeed"
};


function getIncomeBand(income, lifeStage, cityTier){
	var band = "Low";
	var lookup;
	lookup = incomeBand_json[cityTier][lifeStage]; 
	if(income < lookup["High"]+1)
		band = "Medium to High";
	else{
		band = "High";
		return band;
	}
	
	if(lookup["Medium to High"]){
		if(income < lookup["Medium to High"]+1)
			band = "Medium";
		else{
			band = "Medium to High";
			return band;
		}
	}
	
	if(income < lookup["Medium"]+1)
		band = "Low";
	else{
		band = "Medium";
		return band;
	}
	
	return band;
}

function getCityTier(city,state){
	var returnValue = "Tier III";
	if(city){
		cityTier_json.forEach(function(obj){
			if(obj.City == city){
				returnValue = obj.Type;
			}
		});
	}
	return returnValue;
}

function getMaritialStatus(code){
	if(code >= 2)
		return "Married";
	else 
		return "Single";
}

function getNameFromInput(input_json){
	return input_json.FIRST_NAME+ " " + input_json.MIDDLE_NAME + " " + input_json.LAST_NAME;
}

function getCurrentLifeStage(input_json){
	var age = input_json.AGE;
	var lifeStage = "";
	var marital_status_id = input_json.MARITAL_STATUS_ID;
	switch(marital_status_id){
		case 1 : lifeStage = "Single";
				 break;
	 	case 2 : lifeStage = "Married";
				 break;
		default : lifeStage = "Married";
				 break;
	}
	return lifeStage;
}

function getProductParagraph(product){
	switch(product){
		case "Reliance Nippon Life's Guaranteed Money Back Plan" :	returnValue = "A non-linked, non-participating, non-variable money back insurance plan which helps you save for the future but also protects your savings in case of any unforeseen eventuality. All future premiums are waived and your family continues to fulfill their dreams, even in your absence.";
																	break;
		case "Reliance Nippon Life Fixed Savings" 					:	returnValue = "A non-linked, non-participating, non-variable, endowment insurance plan that helps create a corpus by making you to systematically save over a period of time. This plan offers Guaranteed Benefits, including fixed additions that accrue every year and an additional lump sum at maturity.";
																	break;
		case "Reliance Nippon Life Increasing Income Insurance Plan" :	returnValue = "A non-linked, non-participating, life insurance plan with which you can plan for an increasing guaranteed income in future that keeps pace with your growing dreams and ensure protection for your family.";
																	break;
		case "Wonder Kid Solution" 									:returnValue = "A tailor-made solution that helps you to achieve all that you dreamt for your child, irrespective of life's uncertainties. The plan ensures your child receives the guaranteed benefits in the last 10 years, even in your absence, without the worry of paying future premiums.";
																	break;
		case "Reliance Nippon Life Super Endowment Plan" 			:	returnValue = "Secure your savings through guaranteed returns and provide protection to your family, while paying premiums for a limited period.";
																	break;
		case "Reliance Nippon Life Future Income" 					:returnValue = "A non-linked, participating life insurance plan helps you secure an additional income for the future, in addition to life cover. Your annual premiums accumulate and grow to give you annual payouts that support your family's growing needs.";
																	break;
		case "Reliance Nippon Life Lifelong Savings"				:returnValue = "A non-linked, participating endowment assurance plan with savings and whole life cover benefits that ensures your family gets all financial benefits during your lifetime but also when we are not around.";
																	break;
		case "Reliance Easy Retirement Solution" 					:returnValue = "With Easy Retirement Solution, get not only a guaranteed income for your whole life but also payouts in last 4 years before retirement, so that you can fulfill all your dreams and retire stress free.";
																	break;
		case "Reliance Nippon Life  Child Lifetime Income Solution" : returnValue = "A complete child education solution which will ensure you a regular income to fulfill your child's education requirements even if you are not around";
																	break;
		default														:var returnValue = "Helps you provide a regular income and security for your family despite the ups and downs of life. The guaranteed monthly income increases every year while the guaranteed periodic lump sums enable you to invest in your business or fulfill your family's goals.";
																	break;
	}
	return returnValue;
}
