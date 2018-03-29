/**
 * charts2.js
 *
 * @author CloudPact Technologies
 * @description : Calculation for income value on needs
 */
function Chart2(name,age,maritalStatus,noofChildren,ageofChild1,income,city,existingProduct,priorityOrder,expensesMultipleNew,expensesAppearorNot,lifeStage,incomeValue)
{
	this.name=name;
	this.age=age;
	this.maritalStatus=maritalStatus;
	this.noofChildren=noofChildren;
	this.ageofChild1=ageofChild1;
	this.income=income;
	this.city=city;
	this.existingProduct=existingProduct;
	this.priorityOrder=priorityOrder;
	this.expensesMultipleNew=expensesMultipleNew;
	this.expensesAppearorNot=expensesAppearorNot;
	this.lifeStage=lifeStage;
	this.incomeValue=incomeValue;
}

//Calculate all
Chart2.prototype.calculateAll=function(){
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

//Prototypes for Chart2
Chart2.prototype.buyingAHouse=function(){ 
	var needConstant	=	chart2Constants.buyingAHouse;
	return calculateChart2(needConstant,this);
};

Chart2.prototype.childsHigherEducation=function(){
	var needConstant	=	chart2Constants.childsHigherEducation;
	return calculateChart2(needConstant,this);
};

Chart2.prototype.childsMarriage=function(){
	var needConstant	=	chart2Constants.childsMarriage;
	return calculateChart2(needConstant,this);
};

Chart2.prototype.healthFamily=function(){
	var needConstant	=	chart2Constants.healthFamily;
	return calculateChart2(needConstant,this);
};

Chart2.prototype.liquidity=function(){
	var needConstant	=	chart2Constants.liquidity;
	return calculateChart2(needConstant,this);
};

Chart2.prototype.livingExpenses=function(){
	var needConstant	=	chart2Constants.livingExpenses;
	return calculateChart2(needConstant,this);
};

Chart2.prototype.buyChangeCar=function(){
	var needConstant	=	chart2Constants.buyChangeCar;
	return calculateChart2(needConstant,this);
};

Chart2.prototype.retirement=function(){
	var needConstant	=	chart2Constants.retirement;
	return calculateChart2(needConstant,this);
};

Chart2.prototype.secondHouse=function(){
	var needConstant	=	chart2Constants.secondHouse;
	return calculateChart2(needConstant,this);
};

Chart2.prototype.pureProtectionCover=function(){
	var needConstant	=	chart2Constants.pureProtectionCover;
	return calculateChart2(needConstant,this);
};

Chart2.prototype.vacationFestivities=function(){
	var needConstant	=	chart2Constants.vacationFestivities;
	return calculateChart2(needConstant,this);
};


//Caluculation logic for graph value
//Returns graph value
function calculateChart2(constant,that)
{

	var age,
		returnValue,
		incomeValue,
		priorityOrder,
		expensesAppearOrNot,
		expensesMultipleNew;
		age= that.age;
		lifeStage=that.lifeStage;
	
	//Calculate value for Income
	if(!that.incomeValue){
		incomeValue = incomeBand_json[cityTier][lifeStage][that.income];
		/*
		for(var y=0;y<incomeBand_json.length;y++){
			var lookup = incomeBand_json[y];
			if(lookup.key == lifeStage+that.city && lookup.band == that.income){
				incomeValue = lookup["income-high"];
				break;
			}
		}*/		
	}else{
		incomeValue = that.incomeValue;
	}
		
	//Calculate Priority order
	if(!that.priorityOrder){
		for (var i=0;i<priorityOrder_json.length;i++)
		{	
			if ((priorityOrder_json[i][chart2Constants.incomeLevel]			==	that.income)&&
				(priorityOrder_json[i][chart2Constants.cityCategory]		==	that.city)&&
				(priorityOrder_json[i][chart2Constants.needExpensesRevised] ==	constant)){	
					priorityOrder = priorityOrder_json[i][lifeStage];
					break;
			}
		}
	}else{
		priorityOrder = that.priorityOrder;
	}		
	
	//Calculate Expense Multiple New
	if(!that.expensesMultipleNew){
		for (var j=0;j<expenseMatrix_json.length;j++)
		{	
			if ((expenseMatrix_json[j][chart3Constants.incomeLevel]			==	that.income)&&
				(expenseMatrix_json[j][chart3Constants.cityCategory]		==	that.city)&&
				(expenseMatrix_json[j][chart3Constants.needExpensesRevised] ==	constant)){		
					expensesMultipleNew	= expenseMatrix_json[j][lifeStage];
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
	
	//Calculate Expenses appear or not
	if(!that.expensesAppearOrNot){
		for (var k=0;k<finalSheet_json.length;k++)
		{	
			if ((finalSheet_json[k][chart2Constants.incomeLevel]			==	that.income)&&
				(finalSheet_json[k][chart2Constants.cityCategory]			==	that.city)&&
				(finalSheet_json[k][chart2Constants.lifeStage]			==	that.lifeStage)&&
				(finalSheet_json[k][chart2Constants.needExpensesRevised]	==	constant)){		
					expensesAppearOrNot = finalSheet_json[k][chart2Constants.expensesAppearOrNot];
					break;
			}
		}
	}else{
		expensesAppearOrNot = that.expensesAppearOrNot;
	}

	
	//Calculation Logic	
	if(constant != chart2Constants.childsHigherEducation){
		if(priorityOrder === 0){
			returnValue = 0.0;
		}else if(expensesAppearOrNot == 'N'){
			returnValue = 0.0;
		}else{
			returnValue = Math.ceil((incomeValue*expensesMultipleNew/100000)*10)/10;
		}		
	}else{
		if(priorityOrder === 0){
			returnValue = "";
		}else if(expensesAppearOrNot == 'N'){
			returnValue = "";
		}else{
			returnValue = expensesMultipleNew/100000;
		}
	}
	return returnValue;
}