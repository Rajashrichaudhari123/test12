$m.juci.addDataset("nomineeSalutation", maleSalutation);
function toggleNomineeSalutations(e){
	switch (e.newToggled) {
        case 0:
            juci.dataset("nomineeOrAppointeeDetailsForm").NOM_Gender = "M";
            $m.juci.dataset("nomineeSalutation", maleSalutation);
			$m.juci.dataset("relationOfTheNominee", AppointeeMalerelationship);
            break;
        case 1:
            juci.dataset("nomineeOrAppointeeDetailsForm").NOM_Gender = "F";
            $m.juci.dataset("nomineeSalutation", femaleSalutation);
            $m.juci.dataset("relationOfTheNominee", AppointeeFemalerelationship);
            break;
    }
}


function toggleAppointeeSalutations(e){
	switch (e.newToggled) {
        case 0:
            juci.dataset("nomineeOrAppointeeDetailsForm").APP_Gender = "M";
            $m.juci.dataset("appointeeSalutation", maleSalutation);
            $m.juci.dataset("appointeeRelationship", AppointeeMalerelationship);
            break;
        case 1:
            juci.dataset("nomineeOrAppointeeDetailsForm").APP_Gender = "F";
            $m.juci.dataset("appointeeSalutation", femaleSalutation);
            $m.juci.dataset("appointeeRelationship", AppointeeFemalerelationship);
            break;
    }
}


function formateDatePanel(){
	var datePanel = $m.juci.getPanel("juci_calendar_panel");
	datePanel.j.el.style.height  = '100%';
	datePanel.j.el.style.background  = rgba(221, 221, 221, 0.792157);
}

function validateMobileNo(mobileno){
	if(!mobileno){
		return "";
	}
	if(mobileno[0] == "0"){
		$m.alert("Invalid mobile numbers");
		return "";
	}
	return mobileno;
}

function getPlanmaster(){
	var planMap = {};
	var plans = [];
	var protect = $m.juci.dataset("protect");
	plans = plans.concat(protect);
	var saving	= $m.juci.dataset("saving");
	plans = plans.concat(saving);
	var invest = $m.juci.dataset("invest");
	plans = plans.concat(invest);
	var health = $m.juci.dataset("health");
	plans = plans.concat(health);
	var retirement = $m.juci.dataset("retirement");
	plans = plans.concat(retirement);
	var child = $m.juci.dataset("child");
	plans = plans.concat(child);
	var solutions = $m.juci.dataset("solutions");
	plans = plans.concat(solutions);
	for(var i=0;i<plans.length;i++){
		if(plans[i].productCode){
			planMap[plans[i].productCode] = plans[i].title;
		}	
	}
	return planMap;
}