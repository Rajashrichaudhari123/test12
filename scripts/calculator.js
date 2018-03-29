/**
 * calculator.js
 * @author CloudPact Technologies
 * @description : This script is used for calculator.
 **/

var Estimate_Value = {
 "inflation_rate": "0",
 "total_savings": "₹ 0.00",
 "total_required": "₹ 0.00",
 "NumberToWord": ""
}

$m.juci.addDataset("Estimate_Value", Estimate_Value);


var Estimate_LifeCover = {

 "total_savings": "₹ 0.00",
 "NumberToWord": ""

}


$m.juci.addDataset("Estimate_LifeCover", Estimate_LifeCover);





$m.juci.addDataset("Retire_Estimate_Value", Estimate_Value);
var HumanValue = {
 calculator_type: "Expense",
 Currerntage: "0",
 Annual_income: "0",
 Annual_expense: "0",


}

$m.juci.addDataset("HumanForm", HumanValue);

var Retirement = {
 calculator_type: "Help Me",
 Currerntage: "0",
 Monthlysavings: "0",
 Monthlyexpense: "0",
 retireage: "0",
 Savings_FromToday: "0",
 expect_inflation: "0",
 invest_return: "0"


}

$m.juci.addDataset("RetirementForm", Retirement);

var childform = {
 calculator_type: "Education",
 expect_inflation: "0",
 Total_Years: "0",
 avgCost: "0",
 invest_return: "0",
 TotalSavings_OnToday: "0",
 MonthlySavings_FromToday: "0",



}

$m.juci.addDataset("childForm", childform);

function getvalue() {

 var humanform = juci.dataset("HumanForm");
 humanform.Current_age = humanform.Currernt_ageRange;
 juci.dataset("HumanForm", humanform);



}

$m.onReady(function() {
 // Code to execute when the page is ready
 juci.dataset("headerName","Calculator");
 $m.juci.dataset("alertcount", "3");

 Human = juci.findById("HumanValue");
 Retirement = juci.findById("Retirement");
 Child = juci.findById("Child");
 Child.hide();
 Retirement.hide();
 
  juci.getControl("human-list").addListItemClick(openTeamLoginPopUp, this, ".quote");
    juci.getControl("retire-list").addListItemClick(openTeamLoginPopUp, this, ".quote");
    juci.getControl("child-list").addListItemClick(openTeamLoginPopUp, this, ".quote");

 var head = document.getElementsByClassName("juci_panel_title");
 juci.viewModel.applyBinding(head[0]);
 $m.juci.dataset("alertcount", "3");

});



function toggleView(e) {
 Human.hide();
 Retirement.hide();
 Child.hide();
 switch (e.newToggled) {
  case 0:

   Human.show();
   break;
  case 1:

   Retirement.show();

   break;
  case 2:

   Child.show();
   break;
   
   case 3:
   	$m.openChildBrowser("needAnalysis", "http://lifeplanner.reliancelife.com/", {"navigation": true, "address": [],"patterns": []});
   	break;

 }
}

function CalculatorType(e) {
 var child_form = juci.dataset("childForm");

 switch (e.newToggled) {

  case 0:
   child_form.calculator_type = "Education";
   break;
  case 1:
   child_form.calculator_type = "Marriage";
   break;
 }
 juci.dataset("childForm", child_form);

}


function CalculatorTypeRe(e) {
 var RetirementForm = juci.dataset("RetirementForm");

 switch (e.newToggled) {

  case 0:
   RetirementForm.calculator_type = "Help Me";
   break;
  case 1:
   RetirementForm.calculator_type = "I Know";
   break;
 }
 juci.dataset("RetirementForm", RetirementForm);

}

function CalculatorTypeHlv(e) {
 var HumanForm = juci.dataset("HumanForm");

 switch (e.newToggled) {

  case 0:
   HumanForm.calculator_type = "Expense";
   break;
  case 1:
   HumanForm.calculator_type = "Income";
   break;
 }
 juci.dataset("HumanForm", HumanForm);

}

function CalculateHLV(e) {
 $m.showProgress("Calculating...");
 var cal_HLV = e.data;

 if (cal_HLV.calculator_type == "Income") {
  var HLV_CalcValues = HLVCalc.income(cal_HLV.Currerntage, cal_HLV.Annual_income);

  var Income_Value = {

   "total_savings":prependRs(HLV_CalcValues.HLV),
   "NumberToWord": webUtility.NumberToWord(HLV_CalcValues.HLV)

  }

  juci.dataset("Estimate_LifeCover", Income_Value);
 } else if (cal_HLV.calculator_type == "Expense") {
  var HLV_CalcValues = HLVCalc.expense(cal_HLV.Currerntage, cal_HLV.Annual_income, cal_HLV.Annual_expense);


  var Expense_Value = {

   "total_savings": prependRs(HLV_CalcValues.HLV),
   "NumberToWord": webUtility.NumberToWord(HLV_CalcValues.HLV)

  }

  juci.dataset("Estimate_LifeCover", Expense_Value);
 }
 $m.hideProgress();
}

function CalculateRetirement(e) {
 $m.showProgress("Calculating...");
 var cal_retire = e.data;

 if (cal_retire.calculator_type == "Help Me") {
  var retire_CalcValues = RetirementCalc.planner(cal_retire.Currerntage, cal_retire.retireage, cal_retire.Monthlyexpense, cal_retire.expect_inflation, cal_retire.Monthlysavings, cal_retire.Savings_FromToday, cal_retire.invest_return);

  var planner_Value = {
   "inflation_rate": cal_retire.expect_inflation,
   "total_savings": prependRs(retire_CalcValues.totalSavingsAtRet),
   "total_required": prependRs(retire_CalcValues.monthlyReqSavings),
   "NumberToWord": webUtility.NumberToWord(retire_CalcValues.totalSavingsAtRet)
  }

  juci.dataset("Retire_Estimate_Value", planner_Value);
 } else if (cal_retire.calculator_type == "I Know") {
  var retire_CalcValues = RetirementCalc.corpus(cal_retire.Currerntage, cal_retire.retireage, cal_retire.Monthlyexpense, cal_retire.expect_inflation, cal_retire.Monthlysavings, cal_retire.Savings_FromToday, cal_retire.invest_return);


  var corpus_Value = {
   "inflation_rate": cal_retire.expect_inflation,
   "total_savings": prependRs(retire_CalcValues.totalSavingsAtRet),
   "total_required": prependRs(retire_CalcValues.monthlyReqSavings),
   "NumberToWord": webUtility.NumberToWord(retire_CalcValues.totalSavingsAtRet)
  }

  juci.dataset("Retire_Estimate_Value", corpus_Value);
 }
 $m.hideProgress();
}


function CalculateChild(e) {

 $m.showProgress("Calculating...");

 var cal_child = e.data;
 if (cal_child.calculator_type == "Education") {
  var child_CalcValues = ChildCalc.education(cal_child.Total_Years, cal_child.avgCost, cal_child.expect_inflation, cal_child.TotalSavings_OnToday, cal_child.MonthlySavings_FromToday, cal_child.invest_return);

  var education_Value = {
   "inflation_rate": cal_child.expect_inflation,
   "total_savings": prependRs(child_CalcValues.totalSavings),
   "total_required": prependRs(child_CalcValues.monthlyReqSavings),
   "NumberToWord": webUtility.NumberToWord(child_CalcValues.totalSavings)
  }

  juci.dataset("Estimate_Value", education_Value);
 } else if (cal_child.calculator_type == "Marriage") {
  var child_CalcValues = ChildCalc.marriage(cal_child.Total_Years, cal_child.avgCost, cal_child.expect_inflation, cal_child.TotalSavings_OnToday, cal_child.MonthlySavings_FromToday, cal_child.invest_return);


  var marriage_Value = {
   "inflation_rate": cal_child.expect_inflation,
   "total_savings": prependRs(child_CalcValues.totalSavings),
   "total_required": prependRs(child_CalcValues.monthlyReqSavings),
   "NumberToWord": webUtility.NumberToWord(child_CalcValues.totalSavings)
  }

  juci.dataset("Estimate_Value", marriage_Value);
 }
 $m.hideProgress();
}





function prependRs(x) {
 if (typeof x === "function") {
  x = x();
 }
 if (isNaN(x)) {
  x = x.replace(/,/g, "");
  x = parseInt(x);
 }
 x = roundTo2(x);
 var isNegative = false;
 if (x < 0) {
  x = x * -1;
  isNegative = true;
 }
 var prependAmount = "₹" + (x ? rupeeFormat(x) : '0');
 if (isNegative) {
  prependAmount = "-" + prependAmount
 }
 return prependAmount;
}

function rupeeFormat(nStr) {
 nStr += '';
 var x = nStr.split('.');
 var x1 = x[0];
 var x2 = x.length > 1 ? '.' + x[1] : '';
 var rgx = /(\d+)(\d{3})/;
 var z = 0;
 var len = String(x1).length;
 var num = parseInt((len / 2) - 1, 10);

 while (rgx.test(x1)) {
  if (z > 0) {
   x1 = x1.replace(rgx, '$1' + ',' + '$2');
  } else {
   x1 = x1.replace(rgx, '$1' + ',' + '$2');
   rgx = /(\d+)(\d{2})/;
  }
  z++;
  num--;
  if (num === 0) {
   break;
  }
 }
 return x1 + x2;
}


function roundTo2(v) {
 return Math.round(v * 100) / 100;
}


/* Child*/
$m.juci.dataset("child", [

    {

        "title": "Reliance Nippon Life Child Plan",
        "content": "Save systematically and secure the financial future of your child by investing in the Reliance Child Plan and let your child enjoy today without worrying about tomorrow.",
        "productCode": 101,
      
    },
    
     {

        "title": "Reliance Nippon Life Education Plan",
        "content": "You put all your effort in raising your children and want them to achieve 100% success in every challenge that life throws at them. You need a suitable financial plan that ensures you don’t compromise on your goals for your child’s future and provides you with funds when you need them.",
        "productCode": 142,
      
    },
    
    ]);
    
    $m.juci.dataset("humanlife", [

   {
        "title": "Reliance Nippon Life Term Plan",
        "content": "For tailor-made, comprehensive and affordable coverage that will help you secure your financial future and the future of your family, invest in Reliance Term Plan.",
        "productCode": 107,
      
    }
    
    ]);
    
    
  $m.juci.dataset("retire", [

   {
       "title": "Reliance Nippon Life Smart Pension Plan",
        "content": "Retirement is the most important milestone in your life. The key to successful retirement planning is starting early to build a desired retirement fund. The right retirement kitty will ensure fulfilling your dream of a wonderful retirement life with the independence you deserve.",
        "productCode": 117,
      
    },
    {
    "title": "Reliance Nippon Life Pension Builder",
        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
        "productCode": 160,
    }
    ]);
    
    
 function openTeamLoginPopUp(event){
	$m.putPref("productCode",event.data.productCode);
	$m.savePref();
	currentUser = {"code":$m.getUsername(),"name":$m.getUserAccount().customProperties.Login_Name,"usertype":$m.getUserAccount().customProperties.User_Type};
	if(currentUser.usertype != 'ADV' ){
		if(!window.dbHelper)
			initDB();
		else
			checkData();
			juci.showDialog("dialog-teamlogin");
	} else {
		callService();
	}
}
    