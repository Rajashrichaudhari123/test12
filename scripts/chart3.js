/**
 * charts3.js
 *
 * @author CloudPact Technologies
 * @description : Calculation for income value on needs
 */
function Chart3(name,age,maritalStatus,noOfChildren,ageOfChild1,income,city,existingProduct,priorityOrder,expensesMultipleNew,expensesAppearOrNot)
{
	this.name=name;
	this.age=age;
	this.maritalStatus=maritalStatus;
	this.noOfChildren=noOfChildren;
	this.ageOfChild1=ageOfChild1;
	this.income=income;
	this.city=city;
	this.existingProduct=existingProduct;
	this.priorityOrder=priorityOrder;
	this.expensesMultipleNew=expensesMultipleNew;
	this.expensesAppearOrNot=expensesAppearOrNot;
}

//Calculate all
Chart3.prototype.calculateAll=function(){
	var returnObject = {};
	returnObject.buyingAHouse			=	this.buyingAHouse();
	returnObject.childsHigherEducation	=	this.childsHigherEducation();
	returnObject.childsMarriage			=	this.childsMarriage();
	returnObject.secondHouse			=	this.secondHouse();
	returnObject.buyChangeCar			=	this.buyChangeCar();
	returnObject.retirement				=	this.retirement();
	returnObject.pureProtectionCover	=	this.pureProtectionCover();
	returnObject.healthFamily			=	this.healthFamily();
	returnObject.liquidity				=	this.liquidity();
	returnObject.livingExpenses			=	this.livingExpenses();
	returnObject.vacationFestivities	=	this.vacationFestivities();
	return returnObject;
};

//Prototypes for chart3
Chart3.prototype.buyingAHouse=function(){ 
	var needConstant	=	chart3Constants.buyingAHouse;
	var inflationType	=	chart3Constants.houseInflation;
	return calculateChart3(needConstant,inflationType,this);
};

Chart3.prototype.childsHigherEducation=function(){
	var needConstant	=	chart3Constants.childsHigherEducation;
	var inflationType	=	chart3Constants.educationInflation;
	return calculateChart3(needConstant,inflationType,this);
};

Chart3.prototype.childsMarriage=function(){
	var needConstant	=	chart3Constants.childsMarriage;
	var inflationType	=	chart3Constants.marriageInflation;
	return calculateChart3(needConstant,inflationType,this);
};

Chart3.prototype.healthFamily=function(){
	var needConstant	=	chart3Constants.healthFamily;
	var inflationType	=	chart3Constants.healthInflation;
	return calculateChart3(needConstant,inflationType,this);
};

Chart3.prototype.liquidity=function(){
	var needConstant	=	chart3Constants.liquidity;
	var inflationType	=	chart3Constants.cpiInflation;
	return calculateChart3(needConstant,inflationType,this);
};

Chart3.prototype.livingExpenses=function(){
	var needConstant	=	chart3Constants.livingExpenses;
	var inflationType	=	chart3Constants.cpiInflation;
	return calculateChart3(needConstant,inflationType,this);
};

Chart3.prototype.buyChangeCar=function(){
	var needConstant	=	chart3Constants.buyChangeCar;
	var inflationType	=	chart3Constants.carInflation;
	return calculateChart3(needConstant,inflationType,this);
};

Chart3.prototype.retirement=function(){
	var needConstant	=	chart3Constants.retirement;
	var inflationType	=	chart3Constants.cpiInflation;
	return calculateChart3(needConstant,inflationType,this);
};

Chart3.prototype.secondHouse=function(){
	var needConstant	=	chart3Constants.secondHouse;
	var inflationType	=	chart3Constants.cpiInflation;
	return calculateChart3(needConstant,inflationType,this);
};

Chart3.prototype.pureProtectionCover=function(){
	var needConstant	=	chart3Constants.pureProtectionCover;
	var inflationType	=	chart3Constants.cpiInflation;
	return calculateChart3(needConstant,inflationType,this);
};

Chart3.prototype.vacationFestivities=function(){
	var needConstant	=	chart3Constants.vacationFestivities;
	var inflationType	=	chart3Constants.cpiInflation;
	return calculateChart3(needConstant,inflationType,this);
};

//Caluculation logic for graph value
//Returns graph value
function calculateChart3(constant,inflationType,that)
{
	
	var	lifeStage,
		inflation,
		returnValue,
		incomeValue,
		priorityOrder,
		expensesAppearOrNot,
		expensesMultipleNew,
		lifeStageAfter15Years,
		incomeBandAfter15Years,
		lifeStageForExpenseCalculation,
		age=parseInt(that.age,10);
	
	
	lifeStage = getCurrentLifeStage(dataObj);
	switch(lifeStage){
	case "Single":
	case "Married":
		lifeStageAfter15Years = "Married with growing kid/s";
		break;
	case "Married with young kid/s":
		lifeStageAfter15Years = "Married with grown up child";
		break;
	case "Married with growing kid/s":
		lifeStageAfter15Years = "Married with grown up child";
		break;
	case "Married with grown up child":
		lifeStageAfter15Years = "Nearing Retirement";
		break;
	case "Nearing Retirement":
		lifeStageAfter15Years = "Retiree";
		break;
	case "Seperated":
		lifeStageAfter15Years = "Married with grown up child";
		break;
	}
	
	/*
	var fnextLifeStage="";
	flifeStage = lifeStageAfter15Years;
	for(var s=0;s<lifeStage_json.length;s++)
	{
		if(flifeStage == lifeStage_json[s][chart3Constants.current]){
			fnextLifeStage	=  lifeStage_json[s][chart3Constants.after15Years];
			break;
		}
	}*/
	
	//Calculate Priority order
	if(!that.priorityOrder){
		for (var i=0;i<priorityOrder_json.length;i++)
		{	
			if ((priorityOrder_json[i][chart3Constants.incomeLevel]			==	that.income)&&
				(priorityOrder_json[i][chart3Constants.cityCategory]		==	that.city)&&
				(priorityOrder_json[i][chart3Constants.needExpensesRevised]	==	constant)){	
					priorityOrder = priorityOrder_json[i][lifeStageAfter15Years];
					if(priorityOrder.length == 0)
						priorityOrder = 0;
					else
						priorityOrder = parseFloat(priorityOrder, 10);
					break;
			}
		}
	}else{
		priorityOrder = that.priorityOrder;
	}
	
	//Calculate Expense Multiple New
	if(!that.expensesMultipleNew){
		for (var j = 0; j < expenseMatrix_json.length; j++)
		{	
			if ((expenseMatrix_json[j][chart3Constants.incomeLevel]			==	that.income)&&
				(expenseMatrix_json[j][chart3Constants.cityCategory]		==	that.city)&&
				(expenseMatrix_json[j][chart3Constants.needExpensesRevised] ==	constant)){		
					expensesMultipleNew	= expenseMatrix_json[j][lifeStageAfter15Years];
					if(expensesMultipleNew.length == 0)
						expensesMultipleNew = 0;
					else
						expensesMultipleNew = parseFloat(expensesMultipleNew, 10);
					break;
			}
		}
	}else{
		expensesMultipleNew = that.expensesMultipleNew;
	}
	
	//Calculate Inflation
	if(!that.inflationType){
		for(var k=0;k<inflation_json.length;k++)
		{
			if(inflation_json[k].Type == inflationType){
				inflation = inflation_json[k].Inflation;
				break;
			}
		}
	}else{
		inflation = that.inflationType;
	}
	
	var lsIncome, customLsIncome, nlsIncome, customNlsIncome;
	//Calculate value for Income
	if(!that.currentIncomeBand){
		incomeValue = lsIncome = incomeBand_json[that.city][lifeStage][that.income];
		/*
		for(var y=0;y<incomeBand_json.length;y++){
			var lookup = incomeBand_json[y];
			if(lookup.Lookup == lifeStage+that.city+that.income){
				incomeValue = lookup[chart3Constants.income];
				lsIncome = incomeValue;
				break;
			}
		}*/	
	}else{
		incomeValue = that.currentIncomeBand;
	}
	
	customLsIncome = dataObj.INCOME;
	
	//Calculate incomeBand after 15 yrs
	if(!that.incomeBandAfter15Years){
		incomeBandAfter15Years = nlsIncome = incomeBand_json[that.city][lifeStageAfter15Years][that.income]
		/*
		for(var l=0;l<incomeBand_json.length;l++)
		{
			var lookup = lifeStageAfter15Years + that.city + that.income;
			if (incomeBand_json[l][chart3Constants.lookup]	==	lookup){
					incomeBandAfter15Years = incomeBand_json[l][chart3Constants.income];
					nlsIncome = incomeBandAfter15Years;
					break;
			}
		}
		*/
	}else{
		incomeBandAfter15Years = that.incomeBandAfter15Years;		
	}
	
	customNlsIncome = (nlsIncome/lsIncome) * customLsIncome;
	
	//Calculate Expenses appear or not
	if(!that.expensesAppearorNot){
		for (var m=0;m<finalSheetnl_json.length;m++)
		{	
			if ((finalSheetnl_json[m][chart3Constants.incomeLevel]			==	that.income)&&
				(finalSheetnl_json[m][chart3Constants.cityCategory]			==	that.city)&&
				(finalSheetnl_json[m][chart3Constants.lifeStage]			==	lifeStage)&&
				(finalSheetnl_json[m][chart3Constants.needExpensesRevised]	==	constant)){		
					expensesAppearOrNot = finalSheetnl_json[m][chart3Constants.expensesAppearOrNot];
					break;
			}
		}
	}else{
		expensesAppearOrNot = that.expensesAppearorNot;
	}
	
	//Calculate Lifestage for expense calculation
	if(!that.lifeStageForExpenseCalculation){
		for (var n=0;n<finalSheetnl_json.length;n++)
		{	
			if ((finalSheetnl_json[n][chart3Constants.incomeLevel]			==	that.income)&&
				(finalSheetnl_json[n][chart3Constants.cityCategory]			==	that.city)&&
				(finalSheetnl_json[n][chart3Constants.lifeStage]			==	lifeStageAfter15Years)&&
				(finalSheetnl_json[n][chart3Constants.needExpensesRevised]	==	constant)){		
					lifeStageForExpenseCalculation = finalSheetnl_json[n][chart3Constants.lifeStageForExpenseCalculation];
					break;
			}
		}
	}else{
		lifeStageForExpenseCalculation = that.lifeStageForExpenseCalculation;
	}
	
	
	if(constant == "Retirement"){
		var yearsForRetirement;
		if((55-dataObj.AGE)<5){
			yearsForRetirement = 60-dataObj.AGE;
		}else{
			yearsForRetirement = getYearsValue(constant,that.ageOfChild1,that.age);
		}
		if(priorityOrder === 0){
			returnValue = 0.0;
		}else{			
			if(expensesAppearOrNot == 'N'){
				returnValue = 0.0;
			}
			else{
				returnValue = ((customNlsIncome * expensesMultipleNew) * Math.pow((1+inflation),yearsForRetirement)) / 100000;
			}			
		}
	}else if(constant == "Second house"){
		var yearsForSecondhouse;
		if((Math.min(50,dataObj.AGE+20)-dataObj.AGE)<0){
			yearsForSecondhouse = getYearsValue(constant,that.ageOfChild1,50) + 5;
		}else{
			yearsForSecondhouse = getYearsValue(constant,that.ageOfChild1,that.age);
		}
		
		if(priorityOrder === 0){
			returnValue = 0.0;
		}else{
			if(lifeStageForExpenseCalculation == 'C'){
				if(expensesAppearOrNot == 'N'){
					returnValue = 0.0;
				}
				else{
					returnValue = ((customNlsIncome * expensesMultipleNew) * Math.pow((1+inflation),yearsForSecondhouse)) / 100000;
				}
			}else{ 
				if(lifeStageForExpenseCalculation == 'L'){ 
					returnValue = ((customNlsIncome * expensesMultipleNew) * Math.pow((1+inflation),yearsForSecondhouse)) / 100000;
				}
				else{
					returnValue = 0.0;
				}
			}
		}
	}
	else if(constant == "Buy/Change Car"){
		var yearsForChangecar;
		if((Math.min(50,dataObj.AGE+15)-dataObj.AGE)<0){
			yearsForChangecar = getYearsValue(constant,that.ageOfChild1,50) + 5;
		}else{
			yearsForChangecar = getYearsValue(constant,that.ageOfChild1,that.age);
		}
		if(priorityOrder === 0){
			returnValue = 0.0;
		}else{
			if(lifeStageForExpenseCalculation == 'C'){
				if(expensesAppearOrNot == 'N'){
					returnValue = 0.0;
				}
				else{
					returnValue = ((customNlsIncome * expensesMultipleNew) * Math.pow((1+inflation),yearsForChangecar)) / 100000;
				}
			}else{ 
				if(lifeStageForExpenseCalculation == 'L'){ 
					returnValue = ((customNlsIncome * expensesMultipleNew) * Math.pow((1+inflation),yearsForChangecar)) / 100000;
				}
				else{
					returnValue = 0.0;
				}
			}
		}
	}
	else if(constant == "Pure Protection Cover"){
		if(priorityOrder === 0){
			returnValue = 0.0;
		}else{
			if(lifeStageForExpenseCalculation == 'C'){
				if(expensesAppearOrNot == 'N'){
					returnValue = 0.0;
				}
				else{
					returnValue = (customNlsIncome * expensesMultipleNew) / 100000;
				}
			}else{ 
				if(lifeStageForExpenseCalculation == 'L'){ 
					returnValue = (nlsIncome * expensesMultipleNew) / 100000;
				}
				else{
					returnValue = 0.0;
				}
			}
		}
	}else if(constant == "Child's Higher Education"){	
		var eduYears = getYearsValue(constant,that.ageOfChild1,that.age);
		if(priorityOrder === 0){
			returnValue = 0.0;
		}else{
			if(lifeStageForExpenseCalculation == 'C'){
				if(expensesAppearOrNot == 'N'){
					returnValue = 0.0;
				}
				else{
					returnValue = (expensesMultipleNew * Math.pow((1+inflation),eduYears)) / 100000;
				}
			}else{ 
				if(lifeStageForExpenseCalculation == 'L'){ 
					returnValue = ((customNlsIncome * expensesMultipleNew) * Math.pow((1+inflation),eduYears)) / 100000;
				}
				else{
					returnValue = 0.0;
				}
			}
		}
	}else{	
		var years = getYearsValue(constant,that.ageOfChild1,that.age);
		if(priorityOrder === 0){
			returnValue = 0.0;
		}else{
			if(lifeStageForExpenseCalculation == 'C'){
				if(expensesAppearOrNot == 'N'){
					returnValue = 0.0;
				}
				else{
					returnValue = ((customNlsIncome * expensesMultipleNew) * Math.pow((1+inflation),years)) / 100000;
				}
			}else{ 
				if(lifeStageForExpenseCalculation == 'L'){ 
					returnValue = ((customNlsIncome * expensesMultipleNew) * Math.pow((1+inflation),years)) / 100000;
				}
				else{
					returnValue = 0.0;
				}
			}
		}
	}
	return returnValue;
}
	
function getYearsValue(constant,ageOfChild,age){
	age = parseInt(age,10);
	var returnValue = 0;
	switch(constant){
		
		case chart3Constants.buyingAHouse : 
			returnValue = 7;
			break;
		case chart3Constants.childsHigherEducation : 
			returnValue = 20 - ageOfChild;
			break;			
		case chart3Constants.childsMarriage	:
			returnValue = 26 - ageOfChild;
			break;
		case chart3Constants.healthFamily	:
			returnValue = 15;
			break;
		case chart3Constants.liquidity	:
			returnValue = 15;
			break;
		case chart3Constants.livingExpenses	:
			returnValue = 15;
			break;
		case chart3Constants.buyChangeCar	:
			if( age + 15 < 50)
				returnValue = 15;
			else
				returnValue = 50 - age;
			break;
		case chart3Constants.retirement	:
			returnValue = 55 - age;
			break;
		case chart3Constants.secondHouse	:
			if( age + 20 < 50)
				returnValue = 20;
			else
				returnValue = 50 - age;
			break;
		case chart3Constants.vacationFestivities	:
			returnValue = 15;
			break;
	}
	return returnValue;
}