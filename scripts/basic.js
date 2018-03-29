function validateIFSC(value){
	if (value != "") {
		var ifscPat = /^[A-Z|a-z]{4}[0][a-z|A-Z|0-9]{6}\s*$/;
		if (value.search(ifscPat) == -1) {
		    return false;
		} else {
			return true;
		}
	} else{
		return true;
	}
}

function validateBankName(value){
	if (value != "") {
		var bankPat = /^[a-zA-Z0-9 ]*$/;
		if (value.search(bankPat) == -1) {
		    return false;
		} else {
			return true;
		}
	} else{
		return true;
	}
}

function validateBranchName(value){
	if (value != "") {
		var branchPat = /^[a-zA-Z0-9 ]*$/;
		if (value.search(branchPat) == -1) {
		    return false;
		} else {
			return true;
		}
	} else{
		return true;
	}
}

function getNationality(nationaliy){
	var nat = nationaliy.Description;
	if(typeof nationaliy.Description === "function"){
		nat = nationaliy.Description();
	}
	return nat;
}

function onNationalityChange(event){
var a = $m.juci.dataset("personalForm");
	if(event.value != 'Indian'){
		a.PR_State = "";
	$m.juci.dataset("personalForm",a);
	}
	
}

function doCheckBankAcntNum(event){
	if(!(event.value > 0)){
		event.context.getBindingContext().$data.PR_BankAccountNumber("");
		$m.alert("Enter valid Account Number");
	}
}

function validatePAN(value){
	if (value != "") {
		var panPat = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
		if (value.search(panPat) == -1) {
		    return false;
		} else {
			return true;
		}
	} else{
		return true;
	}
}

function removeExsistingMembers(event){
	var policyDataset = $m.juci.dataset("familyHistoryForm");
	var existingPolicyDetails = policyDataset.diseaseDetailsTable;
	if(event.value == 'N'){
		for(var i=0; i<existingPolicyDetails.length; i++){
			existingPolicyDetails = [];
		}
	}
	policyDataset.diseaseDetailsTable = existingPolicyDetails;
	$m.juci.dataset("lifeInsuranceForm", policyDataset);
}

function checkMemberAlreadySelected(event){
	var familyMemberDetails = $m.juci.dataset("familyHistoryForm").diseaseDetailsTable;
	if(familyMemberDetails.length > 0){
		for(var i=0; i<familyMemberDetails.length; i++){
			if(event.value.LA_CODE() === familyMemberDetails[i].familyMember.LA_CODE){
				$m.alert(familyMemberDetails[i].familyMember.Description+" is already selected as family member. Please add another family member");
				event.control.value("");
			}
		}
	}
}

function checkAgeOfDiagnosis(event){
	var ageOfDiagnosis = event.value;
	var currentAge = juci.getControl("memberCurrentAge").value();
	if(ageOfDiagnosis > currentAge){
		$m.alert("Age of Diagnosis should be less than current age");
		event.control.value("");
	}
}

function removeExsistingDetails(event){
	var policyDataset = $m.juci.dataset("lifeInsuranceForm");
	var existingPolicyDetails = policyDataset.lifeInsuranceTable;
	if(event.value == 'N'){
		for(var i=0; i<existingPolicyDetails.length; i++){
			existingPolicyDetails = [];
		}
	}
	policyDataset.lifeInsuranceTable = existingPolicyDetails;
	$m.juci.dataset("lifeInsuranceForm", policyDataset);
}

function checkIfLessThanBaseSA(event){
	var baseSA = juci.getControl("basicsa").value();
	if(event.value > baseSA){
		event.context.getBindingContext().$data.sumassuredunderrisk("");
		$m.alert("Sum Assured Under Rider cannot be greater than Base Sum Assured");
		//event.control.value = "";
	}
}

function markSubQuestions(event){
	var bindingContext = event.context._dataBind;
	if(event.value == "N"){
		var parentBind = bindingContext.slice(bindingContext.search("ref:")+4, bindingContext.lastIndexOf("_"));
		if(parentBind === "QsLS_28b_Alcohol_Consume"){
			parentBind = "QsLS_28b_Alcohol";
		}
		console.log(parentBind);
		var bindings = $m.juci.dataset("lifeStyleQuestionsForm");
		for(var key in bindings){
			if(key.search(parentBind) > -1 && key != bindingContext.slice(bindingContext.search("ref:")+4)){
				if(bindings[key] == "Y"){
					bindings[key] = "N";
				}
			}
		}
		$m.juci.dataset("lifeStyleQuestionsForm", bindings);
	}
}

function checkHeightorWeight(event){
	if(event.value === 0){
		if(event.control.j.attr("data-juci") == "tel"){
			var name = event.control.j.attr("placeholder");
		}
		else{
			var name = event.control.placeholder;
		}
		name = name.slice(name.charAt(0) , name.indexOf(" In"));
		$m.alert(name + " cannot be zero");
		event.control.value("");
	}
}

function changeSalutation(event){
	var dataset = $m.juci.dataset("nomineeOrAppointeeDetailsForm");
	if(event.value == "F"){
		$m.juci.dataset("appointeeSalutation", femaleSalutation);
		dataset.APP_Salutation =  setValueFromOptions("appointeeSalutation",{"LA_CODE":"MS"}, localLaComparator);
	}
	else if(event.value == "M"){
		$m.juci.dataset("appointeeSalutation", maleSalutation);
		dataset.APP_Salutation =  setValueFromOptions("appointeeSalutation",{"LA_CODE":"MR"}, localLaComparator);
	}
	$m.juci.dataset("nomineeOrAppointeeDetailsForm", dataset);
}

function assigndate(){
	var dob = $m.juci.dataset("nomineeOrAppointeeDetailsForm").NOM_DOB;
	if(dob > new Date()){
		$m.juci.getDataset("nomineeOrAppointeeDetailsForm")().NOM_DOB('');
		$m.alert("Date of birth should not be greater than Today's Date");
	}
}

function assigndatep2(){
	var dob = $m.juci.dataset("nomineeOrAppointeeDetailsForm").NOM_DOB_P2;
	if(dob > new Date()){
		$m.juci.getDataset("nomineeOrAppointeeDetailsForm")().NOM_DOB_P2('');
		$m.alert("Date of birth should not be greater than Today's Date");
	}
}


function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}

function checkAppointeeAge(event){
	if(getAge(event.value) < 18){
		$m.alert("The Appointee should be atleast 18 years old");
		event.control.value("");
	}
}

function dateValidation(event){
	var valuedate = new Date(event);
	var date = new Date();
	var laDetails  = $m.juci.dataset("personalForm");
	laDob = new Date(laDetails.LA_DOB);
	if(valuedate > date){
		$m.alert("Risk Commencement Date cannot be greater than current date");
		return "";
	}
	if(laDob > valuedate){
		$m.alert("Risk Commencement Date should be greater than date of birth");
		return "";
	}
	return valuedate.getDate() + " " + valuedate.getMonthName().substring(0,3) + " " + valuedate.getFullYear();
}