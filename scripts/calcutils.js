function ChangeSliderValue(e) {

 var humanform = juci.dataset("HumanForm");

 if (e.key == "Backspace") {
  humanform.Currerntage = e.currentTarget.children[2].value;

  if (e.currentTarget.children[2].value == "") {
   humanform.Currerntage = "0";
  }
 } else {
  humanform.Currerntage = e.currentTarget.children[2].value;
 }
 juci.dataset("HumanForm", humanform);

}

function ChangeIncomeValue(e) {

 var humanform = juci.dataset("HumanForm");

 if (e.key == "Backspace") {
  humanform.Annual_income = e.currentTarget.children[2].value;
  if (e.currentTarget.children[2].value == "") {
   humanform.Annual_income = "0";
  }
 } else {
  humanform.Annual_income = e.currentTarget.children[2].value;
 }
 juci.dataset("HumanForm", humanform);

}


function ChangeExpenseValue(e) {

 var humanform = juci.dataset("HumanForm");

 if (e.key == "Backspace") {
  humanform.Annual_expense = e.currentTarget.children[2].value;
  if (e.currentTarget.children[2].value == "") {
   humanform.Annual_expense = "0";
  }
 } else {
  humanform.Annual_expense = e.currentTarget.children[2].value;
 }
 juci.dataset("HumanForm", humanform);

}

//Retirement

function ChangeAgeValue(e) {

 var Retirement = juci.dataset("RetirementForm");

 if (e.key == "Backspace") {
  Retirement.Currerntage = e.currentTarget.children[2].value;
  if (e.currentTarget.children[2].value == "") {
   Retirement.Currerntage = "0";
  }
 } else {
  Retirement.Currerntage = e.currentTarget.children[2].value;
 }
 juci.dataset("RetirementForm", Retirement);

}

function ChangeretireValue(e) {

 var Retirement = juci.dataset("RetirementForm");

 if (e.key == "Backspace") {
  Retirement.retireage = e.currentTarget.children[2].value;
  if (e.currentTarget.children[2].value == "") {
   Retirement.retireage = "0";
  }
 } else {
  Retirement.retireage = e.currentTarget.children[2].value;
 }
 juci.dataset("RetirementForm", Retirement);

}


function ChangeInfValue(e) {

 var Retirement = juci.dataset("RetirementForm");

 if (e.key == "Backspace") {
  Retirement.expect_inflation = e.currentTarget.children[2].value;
  if (e.currentTarget.children[2].value == "") {
   Retirement.expect_inflation = "0";
  }
 } else {
  Retirement.expect_inflation = e.currentTarget.children[2].value;
 }
 juci.dataset("RetirementForm", Retirement);

}

function ChangeMonthlyValue(e) {

 var Retirement = juci.dataset("RetirementForm");

 if (e.key == "Backspace") {
  Retirement.Monthlyexpense = e.currentTarget.children[2].value;
  if (e.currentTarget.children[2].value == "") {
   Retirement.Monthlyexpense = "0";
  }
 } else {
  Retirement.Monthlyexpense = e.currentTarget.children[2].value;
 }
 juci.dataset("RetirementForm", Retirement);

}

function ChangeinvestValue(e) {

 var Retirement = juci.dataset("RetirementForm");

 if (e.key == "Backspace") {
  Retirement.invest_return = e.currentTarget.children[2].value;
  if (e.currentTarget.children[2].value == "") {
   Retirement.invest_return = "0";
  }
 } else {
  Retirement.invest_return = e.currentTarget.children[2].value;
 }
 juci.dataset("RetirementForm", Retirement);

}

function ChangeTodayValue(e) {

 var Retirement = juci.dataset("RetirementForm");

 if (e.key == "Backspace") {
  Retirement.Monthlysavings = e.currentTarget.children[2].value;
  if (e.currentTarget.children[2].value == "") {
   Retirement.Monthlysavings = "0";
  }
 } else {
  Retirement.Monthlysavings = e.currentTarget.children[2].value;
 }
 juci.dataset("RetirementForm", Retirement);

}

function ChangeFromValue(e) {

 var Retirement = juci.dataset("RetirementForm");

 if (e.key == "Backspace") {
  Retirement.Savings_FromToday = e.currentTarget.children[2].value;
  if (e.currentTarget.children[2].value == "") {
   Retirement.Savings_FromToday = "0";
  }
 } else {
  Retirement.Savings_FromToday = e.currentTarget.children[2].value;
 }
 juci.dataset("RetirementForm", Retirement);

}


//child

function yearsValue(e) {

 var childform = juci.dataset("childForm");

 if (e.key == "Backspace") {
  childform.Total_Years = e.currentTarget.children[2].value;
  if (e.currentTarget.children[2].value == "") {
   childform.Total_Years = "0";
  }
 } else {
  childform.Total_Years = e.currentTarget.children[2].value;
 }
 juci.dataset("childForm", childform);

}

function ChangeexpectValue(e) {

 var childform = juci.dataset("childForm");

 if (e.key == "Backspace") {
  childform.expect_inflation = e.currentTarget.children[2].value;
  if (e.currentTarget.children[2].value == "") {
   childform.expect_inflation = "0";
  }
 } else {
  childform.expect_inflation = e.currentTarget.children[2].value;
 }
 juci.dataset("childForm", childform);

}

function CurrcostValue(e) {

 var childform = juci.dataset("childForm");

 if (e.key == "Backspace") {
  childform.avgCost = e.currentTarget.children[2].value;
  if (e.currentTarget.children[2].value == "") {
   childform.avgCost = "0";
  }
 } else {
  childform.avgCost = e.currentTarget.children[2].value;
 }
 juci.dataset("childForm", childform);

}

function CurrSavingsValue(e) {

 var childform = juci.dataset("childForm");

 if (e.key == "Backspace") {
  childform.TotalSavings_OnToday = e.currentTarget.children[2].value;
  if (e.currentTarget.children[2].value == "") {
   childform.TotalSavings_OnToday = "0";
  }
 } else {
  childform.TotalSavings_OnToday = e.currentTarget.children[2].value;
 }
 juci.dataset("childForm", childform);

}

function ChangeReturnValue(e) {

 var childform = juci.dataset("childForm");

 if (e.key == "Backspace") {
  childform.invest_return = e.currentTarget.children[2].value;
  if (e.currentTarget.children[2].value == "") {
   childform.invest_return = "0";
  }
 } else {
  childform.invest_return = e.currentTarget.children[2].value;
 }
 juci.dataset("childForm", childform);

}

function savingFromValue(e) {

 var childform = juci.dataset("childForm");

 if (e.key == "Backspace") {
  childform.MonthlySavings_FromToday = e.currentTarget.children[2].value;
  if (e.currentTarget.children[2].value == "") {
   childform.MonthlySavings_FromToday = "0";
  }
 } else {
  childform.MonthlySavings_FromToday = e.currentTarget.children[2].value;
 }
 juci.dataset("childForm", childform);

}