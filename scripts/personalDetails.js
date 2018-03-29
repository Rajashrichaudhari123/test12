/**
 * personalDetails.js
 * @author CloudPact Technologies
 * @description : This script is used for storing personal data into local db.
 **/
var datasetData = {};
$m.juci.addDataset("passpostIdNo",false);
$m.juci.addDataset("simplifiedNo",false);
$m.juci.addDataset("PrpasspostIdNo",false);
$m.juci.addDataset("PrsimplifiedNo",false);
function openNext(e) {
	if(gettype()  == "TPBOM" || gettype() == "TPADV" || gettype() == "ENADV"){
		var isBranchCodeValid =	$m.juci.dataset("isBranchCodeValid");	
		if(!(isBranchCodeValid)){
			$m.alert("Plese Enter the valid Branch code");
			return ;
		}
	}
	$m.getDeviceId(function(response) {
		var deviceId = response.result;
		datasetData = $m.juci.dataset('personalForm');
		if (datasetData.IS_LA_PR_SAME == 'Y') {
			datasetData.PR_Nationality = "";
		}
		$m.juci.dataset('personalForm', datasetData);
		datasetData.LA_DOB = datasetData.LA_DOB instanceof Date ? datasetData.LA_DOB.getTime() : datasetData.LA_DOB;
		datasetData.LA_Education = datasetData.LA_Education.LA_CODE;
		datasetData.Txn_Id = Math.floor(100000 + Math.random() * 900000);
		datasetData.LA_Occupation = datasetData.LA_Occupation.LA_CODE;
		datasetData.LA_Salutation = datasetData.LA_Salutation.LA_CODE;
		datasetData.LA_MaritalStatus = datasetData.LA_MaritalStatus.LA_CODE;
		datasetData.LA_BANKACCPROOF = datasetData.LA_BANKACCPROOF.LA_CODE;
		datasetData.LA_AnnualIncome = datasetData.LA_AnnualIncome;
		datasetData.LA_Nationality = datasetData.LA_Nationality.LA_CODE;
		datasetData.PR_ECSFORM_YN = datasetData.PR_ECSFORM_YN;
		datasetData.Data_Source = 'PDC';
		datasetData.LA_Citizenship = datasetData.LA_Citizenship.LA_CODE;
		datasetData.LA_IDProof = datasetData.LA_IDProof.LA_CODE;
		datasetData.LA_ResidentialStatus = datasetData.LA_ResidentialStatus.LA_CODE;
		datasetData.LA_OccupationType = datasetData.LA_OccupationType ? datasetData.LA_OccupationType.LA_CODE : "";
		if(datasetData.LA_OccupationSubOptions == "") {
			datasetData.LA_OccupationSubOptions = datasetData.LA_OccupationSubOptions;
		} else {
			datasetData.LA_OccupationSubOptions = datasetData.LA_OccupationSubOptions.LA_CODE ? datasetData.LA_OccupationSubOptions.LA_CODE : "";	
		}
		datasetData.LA_ExpiryDate = datasetData.LA_ExpiryDate ? new Date(datasetData.LA_ExpiryDate).getTime() : "";
		datasetData.Device_Id = deviceId;
		var planCode = $m.getPref("planDetails_" + datasetData.Application_Number).PLanCode;
		var plandetails = $m.getPref("planDetails_" + datasetData.Application_Number);
		if (planCode == "114" || planCode == "117" || planCode == "118") {
			datasetData.AnnuityPayout_Option = datasetData.AnnuityPayout_Option ? datasetData.AnnuityPayout_Option.Description : "";
			datasetData.Annuity_Payments_By = datasetData.Annuity_Payments_By ? datasetData.Annuity_Payments_By.Description : "";
			datasetData.Annuity_Payout_Mode = datasetData.Annuity_Payout_Mode ? datasetData.Annuity_Payout_Mode.Description : "";
			datasetData.Life_Annuity_Guaranteed_For = datasetData.Life_Annuity_Guarenteed_For ? datasetData.Life_Annuity_Guarenteed_For.Description : "";
		} else {
			datasetData.AnnuityPayout_Option = datasetData.AnnuityPayout_Option ? datasetData.AnnuityPayout_Option.Description : "";
			datasetData.Annuity_Payments_By = datasetData.Annuity_Payments_By ? datasetData.Annuity_Payments_By.Description : "";
			datasetData.Annuity_Payout_Mode = datasetData.Annuity_Payout_Mode ? datasetData.Annuity_Payout_Mode.Description : "";
			datasetData.Life_Annuity_Guaranteed_For = datasetData.Life_Annuity_Guarenteed_For ? datasetData.Life_Annuity_Guarenteed_For.Description : "";
		}
		datasetData.Application_Date = new Date().getTime();
		var company_employee = $m.getPref("companydetails_"+applicationNumber);
//		var relationGroup = $m.juci.dataset("personalForm");
		if(company_employee == "Yes"){
			datasetData.Advisor_Code = "29999999";
			datasetData.Advisor_Name = "RELIANCE LIFE INSURANCE (STAFF)";
		}else{
			datasetData.Advisor_Code = plandetails.Advisor_Code;
			datasetData.Advisor_Name = formateAdvisorName(plandetails.Advisor_Name);
		}
		//datasetData.Advisor_Name = formateAdvisorName(plandetails.Advisor_Name);
//		datasetData.Advisor_Name  = datasetData.Advisor_Name;
		datasetData.Login_By = $m.getUsername();
		if (datasetData.IS_LA_PR_SAME == 'N') {
			datasetData.PR_Salutation = datasetData.PR_Salutation.LA_CODE;
			datasetData.PR_MaritalStatus = datasetData.PR_MaritalStatus.LA_CODE;
			datasetData.PR_BANKACCPROOF = datasetData.PR_BANKACCPROOF.LA_CODE;
			datasetData.PR_Nationality = datasetData.PR_Nationality.LA_CODE;
			datasetData.PR_Education = datasetData.PR_Education.LA_CODE;
			datasetData.PR_Occupation = datasetData.PR_Occupation.LA_CODE;
			datasetData.PR_LA_Relationship = datasetData.PR_LA_Relationship.LA_CODE;
			datasetData.PR_Citizenship = datasetData.PR_Citizenship.LA_CODE;
			datasetData.PR_IDProof = datasetData.PR_IDProof.LA_CODE;
			datasetData.PR_ResidentialStatus = datasetData.PR_ResidentialStatus.LA_CODE;
			datasetData.PR_OccupationType = datasetData.PR_OccupationType.LA_CODE ? datasetData.PR_OccupationType.LA_CODE : "";
			datasetData.PR_OccupationSubOptions = datasetData.PR_OccupationSubOptions.LA_CODE ? datasetData.PR_OccupationSubOptions.LA_CODE : "";
			datasetData.PR_ExpiryDate = datasetData.PR_ExpiryDate ? new Date(datasetData.PR_ExpiryDate).getTime() : "";
			datasetData.PR_DOB = datasetData.PR_DOB instanceof Date ? datasetData.PR_DOB.getTime() : datasetData.PR_DOB;
		} else {
			datasetData.PR_Salutation = "";
			datasetData.PR_MaritalStatus = "";
			datasetData.PR_BANKACCPROOF = "";
			datasetData.PR_Nationality = "";
			datasetData.PR_Education = "";
			datasetData.PR_Occupation = "";
			datasetData.PR_LA_Relationship = "";
		}
		var company_employee = $m.getPref("companydetails_"+applicationNumber);
		var checkAadhar = $m.juci.getControl("checkLA").value();
		var isProductPage = $m.juci.dataset("isProductPage");
		var checkUserType = (gettype() == 'AGSM' || gettype() == 'AGPS' || gettype() == 'FLS' || gettype() == "AGADV");
//		var relationGroup = $m.juci.dataset("personalForm");
		if(company_employee == "Yes"){
			if((!datasetData.LA_Aadharno) && checkUserType == true  && isProductPage == false && checkAadhar == false && datasetData.Super_Track_Login == "Y"){
				$m.alert("Please enter the Aadhar number","Alert",function(){
					scrollToTop();
					return;
				})
			}else{
				$m.alert("You have tagged this policy as staff policy. Note that only RCAP employee is eligible for staff discount and policy will be logged under no commission code 29999999","Alert",function(){
					scrollToTop();
				savePersonalDetails();
			});
			}
		}else if(checkUserType == true  && isProductPage == false && checkAadhar == false && datasetData.Super_Track_Login == "Y"){
			var authenticateAadhaar = $m.juci.dataset("aadharMandatoryFlag");
			if(authenticateAadhaar == false) {
				if(gettype() == "AGSM" || gettype() == "AGPS" || gettype() == "AGADV" || gettype() == 'FLS') {
					var authenticateAadhaar = $m.juci.dataset("aadharMandatoryFlag");
					$m.alert("Please do aadhaar authentication..","Alert",function () {
						scrollToTop(); 
						return;
					});
				}else{
					savePersonalDetails();
				}	
			}else{
				savePersonalDetails();
			}
		}else{
			savePersonalDetails();
		}
		//$m.removePref("Adhar_dataPR");
		//$m.removePref("Adhar_dataLA");
	});
}


function formatValue(value) {
	return formatMoney(value);
}

function formatMoney(num) {
	if (num == "") {
		return "";
	} else {
		var n1, n2;
		if (typeof num == 'string')
			num = num.replace(/,/g, "");
		num = (Math.round(num * 100) / 100) + '' || '';
		// works for integer and floating as well
		n1 = num.split('.');
		n2 = n1[1];
		n1 = n1[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
		num = n2 ? n1 + '.' + n2 : n1;
		num = num;
		return num;
	}
}

function ecsval(event) {
	var check = juci.getControl('nach').value();
	var val = event.value;
	if (check == "E") {
		var ecs = {
			"Application": "",
			"MICRCode": val,
			"Option": 0
		};
		ecs = JSON.stringify(ecs);
		$m.post("http://lifelineuat.reliancelife.com/ContractStatus/wsMICRValidation.svc/ValidateMICR", ecs, {
			"headers": {
				"Content-Type": "application/json"
			}
		}, function(response) {
			if (response.code == 200) {
				// Success
				var result = response.result;
				var test = result.data;
				test = JSON.parse(test);
				if (test.Flag == "False") {
					$m.alert("Please enter valid MICR code");
					juci.getControl("MICR").value("");
				}
			} else {
				// Error
				var errMsg = response.error.message;
			}
		});
	}
	if (check == "Y") {
		var nachPat = /437|579|526|438|065|030|345|117|575|876|403|820|229|118|269|432|812|860|116|364|805|014|330|322|803|010|490|822|066|333|340|011|259|656|143|810|703|806|142|420|832|448|098|802|903|823|449|909|849|699|466|238|830|809|807|487|012|658|156|818|421|150|112|101|225|813|815|331|413|827|704|459|134|538|631|593|355|018|801|013|733|879|093|034|272|032|033|153|647|606|808|454|804|502|068|831|630|016|209|639|092|314|091|816|512|521|500|845|800|351|199|037|054|660|545|138|318|464|015|082|115|017|164|151|491|840|047|006|471|297|240|511|641|072|837|299|619|196|582|200|185|707|519|048|071|235|094|836|108|644|572|452|049|192|419|852|404|095|821|113|846|833|635|376|197|415|360|124|234|458|416|144|696|828|475|311|039|346|114|278|751|019|020|280|279|255|814|456|329|051|373|410|257|361|857|189|296|479|308|507|503|476|514|740|073|406|105|074|510|735|522|884|443|819|850|386|605|052|528|076|126|304|305|486|367|485|303|480|075|363|401|077|841|226|177|488|398|434|053|483|612|056|497|379|103|604|493|661|227|851|159|834|598|811|096|306|348|620|084|417|694|267|389|341|175|561|829|826|281|614|079|320|205|313|596|110|418|165|618|372|139|621|275|409|377|470|183|085|600|653|381|371|086|856|369|302|128|532|239|374|611|283|450|496|184|729|866|706|210|022|218|599|701|028|638|149|622|242|632|174|423|588|697|312|328|518|250|530|167|168|141|284|843|202|350|023|847|817|337|024|307|725|506|473|211|576|445|176|513|584|359|026|739|474|217|424|190|353|191|494|662|349|087|256|003|004|002|285|615|291|009|036|624|130|315|446|848|244|589|310|659|365|375|182|508|059|258|648|587|319|583|465|201|916|603|261|455|215|135|556|608|586|251|402|396|088|326|442|607|107|358|207|590|597|564|007|332|390|426|325|245|246|248|352|412|089|249|160|397|025|274|525|213|154|441|408|198|524|271|131|574|109|060|180|411|637|286|547|838|260|384|344|581|136|220|824|221|542|709|323|610|422|027|544|554|577|289|208|504|407|195|901|602|468|029|132|591|222|335|171|853|495|592|064|839|874|642|387|693|756/;
		if (val.substring(3, 6).search(nachPat) == -1) {
			$m.alert("please enter valid MICR Code");
			juci.getControl("MICR").value("");
		}
	}
	if (check == "D") {
		var ddPat = /211|229|240|002|037|026|259|012|049|010|013|485|052|027/;
		if (val.substring(3, 6).search(ddPat) == -1) {
			$m.alert("please enter valid MICR Code");
			juci.getControl("MICR").value("");
		}
	}
}

function getValidate(value) {
	if (value() != "") {
		if (value() == 'N') {
			return true;
		} else {
			return false;
		}
	}
}

function doNoValidate(value) {
	if (value() != "") {
		if (value() == "N") {
			var clearValid = juci.getControl("MICR");
			clearValid.clearValidation();
			return true;
		} else {
			return false;
		}
	}
}

function isLAProposerSame(event) {
	if (event.value == "N") {
		var pr_occupationSSubOptions = $m.juci.findById("pr-s-options");
		pr_occupationSSubOptions.hide();
		var pr_expiry_date = $m.juci.findById("pr-expiry-date");
		pr_expiry_date.hide();
		var pr_identification_no = $m.juci.findById("pr-identification-no");
		pr_identification_no.hide();
		$m.alert("As per AML guidelines you can login a LA - Proposer case for minor life and housewife. For Other  cases  please take relevant approval & upload in miscellaneous docs. Please speak to your Manager.");
	var company_employee = $m.getPref("companydetails_"+applicationNumber);
		if(company_employee != undefined){
			var relationGroup = $m.juci.dataset("personalForm");
			if(company_employee == "Yes"){
				$m.juci.getControl("companyEmpPr").value('Y');
				relationGroup.PR_IsRelianceEmp = "Y";
			}else{
				$m.juci.getControl("companyEmpPr").value('N');
				relationGroup.PR_IsRelianceEmp = "N";
			}
			$m.juci.dataset("personalForm",relationGroup);
		}
	}else{
		var relationGroup = $m.juci.dataset("personalForm");
		$m.juci.getControl("companyEmpPr").value('N');
		relationGroup.PR_IsRelianceEmp = "N";
		$m.juci.dataset("personalForm",relationGroup);
	}
	var check_Pr_groupEmp = $m.juci.getControl("companyEmpPr").value();
	if(check_Pr_groupEmp == "Y"){
		$m.juci.getControl("companyEmpPr").show();
	}else{
		$m.juci.getControl("companyEmpPr").hide();
	}
}

function onoptclick(event) {
	if (event.value == "N") {
		//juci.findById("MICR").hide();
		$m.juci.dataset("opt", "F");
	} else {
		//juci.findById("MICR").show();
		$m.juci.dataset("opt", "Y");
	}
}

function validateAddress(address) {
	if (!address) {
		return "";
	}
	if (address.search(/[a-zA-Z]/) == -1) {
		$m.alert("Enter valid address");
		return "";
	}
	return address;
}

var annutiyProducts = ["137", "138", "107", "94", "101", "91", "108", "143", "133", "116", "115", "122", "123", "129", "128", "132", "134", "124", "125", "149", "152", "153", "154", "121", "127", "119", "120", "109", "93", "155", "156", "110", "142", "160", "159", "146", "141", "113", "126", "148", "147", "136", "139", "163", "162", "119a", "119b", "164", "165", "166","120b","167"];

function getAnnuity(value) {
	if (annutiyProducts.indexOf(value) != -1) {
		return true;
	} else {
		return false;
	}
}

var smartPlanProducts = ["137", "138", "107", "94", "101", "91", "108", "143", "133", "116", "115", "122", "123", "129", "128", "132", "134", "124", "125", "149", "152", "153", "154", "121", "127", "119", "120", "109", "93", "155", "156", "110", "142", "160", "159", "146", "141", "113", "126", "148", "147", "117", "136", "139", "118", "163", "162", "119a", "119b", "164", "165", "166","120b","167"];

function getAnnuityforSmartPlan(value) {
	if (smartPlanProducts.indexOf(value) != -1) {
		return true;
	} else {
		return false;
	}
}

function getValidateincome(value) {
	if (value() != "") {
		if (value().Description() == "House Wife" || value().Description() == "Student" || value().Description() == "House Wife with High Income") {
			var clearValid = juci.getControl("alincome");
			clearValid.clearValidation();
			return true;
		} else {
			return false;
		}
	}
}

function getValidateincomepr(value) {
	if (value() != "") {
		if (value().Description() == "House Wife" || value().Description() == "Student" || value().Description() == "House Wife with High Income") {
			var clearValid = juci.getControl("alincomepr");
			clearValid.clearValidation();
			return true;
		} else {
			return false;
		}
	}
}

function getValidateSpousePr(value) {
	if (value() != "") {
		if (value().Description() == "Divorced" || value().Description() == "Single" || value().Description() == "Widowed") {
			var clearValid = juci.getControl("pr-spouse");
			clearValid.clearValidation();
			return true;
		} else {
			return false;
		}
	}
}

function getValidateSpouse(value) {
	if (value() != "") {
		if (value().Description() == "Divorced" || value().Description() == "Single" || value().Description() == "Widowed") {
			var clearValid = juci.getControl("spouse-name");
			clearValid.clearValidation();
			return true;
		} else {
			return false;
		}
	}
}

function getValidateSourceOfIncome(value) {
	if (value() != "") {
		if (value().Description() == "Student") {
			var clearValid = juci.getControl("source-income");
			clearValid.clearValidation();
			return true;
		} else {
			return false;
		}
	}
}

function validatePassportProofs(value) {
	if (value() != "") {
		var laCode = value().LA_CODE();
		if (laCode != "PP") {
			return true;
		} else {
			return false;
		}
	}
}

function validatePRPassportProofs(value) {
	if (value() != "") {
		var laCode = value().LA_CODE();
		if (laCode != "PP") {
			return true;
		} else {
			return false;
		}
	}
}

function validateAadharProofs(value) {
	if (value() != "") {
		var laCode = value().LA_CODE();
		if (laCode != "UID") {
			return true;
		} else {
			return false;
		}
	}
}

function validatePRAadharProofs(value) {
	if (value() != "") {
		var laCode = value().LA_CODE();
		if (laCode != "UID") {
			return true;
		} else {
			return false;
		}
	}
}

function validateDrivingProofs(value) {
	if (value() != "") {
		var laCode = value().LA_CODE();
		if (laCode != "DL") {
			return true;
		} else {
			return false;
		}
	}
}

function validatePrDrivingProofs(value) {
	if (value() != "") {
		var laCode = value().LA_CODE();
		if (laCode != "DL") {
			return true;
		} else {
			return false;
		}
	}
}

function validateSmplifiedProofs(value) {
	if (value() != "") {
		var laCode = value().LA_CODE();
		if (laCode != "SMA") {
			return true;
		} else {
			return false;
		}
	}
}

function validatePRSmplifiedProofs(value) {
	if (value() != "") {
		var laCode = value().LA_CODE();
		if (laCode != "SMA") {
			return true;
		} else {
			return false;
		}
	}
}

function validateOtherProofs(value) {
	if (value() != "") {
		var laCode = value().LA_CODE();
		if (laCode != "JC") {
			return true;
		} else if(laCode != "Others"){
			return true;
		}else {
			return false;
		}
	}
}

function validatePROtherProofs(value) {
	if (value() != "") {
		var laCode = value().LA_CODE();
		if (laCode != "JC") {
			return true;
		} else if(laCode != "Others"){
			return true;
		}else {
			return false;
		}
	}
}

function validatePanProofs(value) {
	if (value() != "") {
		var laCode = value().LA_CODE();
		if (laCode != "PC") {
			return true;
		} else {
			return false;
		}
	}	
}

function validatePRPanProofs(value) {
	if (value() != "") {
		var laCode = value().LA_CODE();
		if (laCode != "PC") {
			return true;
		} else {
			return false;
		}
	}	
}

function validateVoterProofs(value) {
	if (value() != "") {
		console.log(value().LA_CODE())
		var laCode = value().LA_CODE();
		if (laCode != "VI") {
			return true;
		} else {
			return false;
		}
	}
}

function validatePRVoterProofs(value) {
	if (value() != "") {
		var laCode = value().LA_CODE();
		if (laCode != "VI") {
			return true;
		} else {
			return false;
		}
	}
}

/*function delegate(obj, handler) {
  return function () {
    handler.call(obj);
  };
}

function removeCommas() {
	if(this.value === "" || this.value === null){
		this.maxLength = 9;
	 	return this.value;
	}else {
		this.value = this.value.replace(/,/g,"");
		this.maxLength = 9;
		return this.value;
	}
}

function addCommas(){
	this.value = formatMoney(this.value);
	this.maxLength = 12;
	return this.value;
}*/

function getProposerValidate(val) {
	var aadhaarPR = $m.getPref(AdharPref.PR_adharphoto + applicationNumber);
	if (!val && !aadhaarPR) {
		return false;
	} else if(val && aadhaarPR){
		return true;
	}
}

function onValidateChange(e) {
	var a = juci.getControl("father-name").value();
	if (a.length == 20) {
		//a = a.substring(0, 20);
		a = a.slice(0, 20);
		juci.getControl("father-name").innerHTML = a;
		$m.alert("Maxlength is 20");
	} else {
		a = a.slice(0, 20);
		juci.getControl("father-name").innerHTML = a;
	}
}

function onSpouseValidateChange(e){
	var a = juci.getControl("spouse-name").value();
	if (a.length == 20) {
		//a = a.substring(0, 20);
		a = a.slice(0, 20);
		juci.getControl("spouse-name").innerHTML = a;
		$m.alert("Maxlength is 20");
	} else {
		a = a.slice(0, 20);
		juci.getControl("spouse-name").innerHTML = a;
	}
}

function onMotherValidateChange(e){
	var a = juci.getControl("mother-name").value();
	if (a.length == 20) {
		//a = a.substring(0, 20);
		a = a.slice(0, 20);
		juci.getControl("mother-name").innerHTML = a;
		$m.alert("Maxlength is 20");
	} else {
		a = a.slice(0, 20);
		juci.getControl("mother-name").innerHTML = a;
	}
}

function getvalidate(value) {
	if ($m.getPref(AdharPref.LA_adharphoto + applicationNumber)) {
		return true;
	}
	if ((!$m.getPref(AdharPref.LA_adharphoto + applicationNumber))) {
		return false;
	}

}

function getadharvalidate(value) {
	if ($m.getPref(AdharPref.PR_adharphoto + applicationNumber)) {
		return false;
	}
	if ((!$m.getPref(AdharPref.PR_adharphoto + applicationNumber))) {
		return value;
	} else {
		return false;
	}
}

function getPRvalidate(value) {
	if (value && $m.getPref(AdharPref.PR_adharphoto + applicationNumber)) {
		return true;
	}
	else if (!$m.getPref(AdharPref.PR_adharphoto + applicationNumber)) {
		if (!value) {
			return true;
		} else {
			return false;
		}
	}
}

function checkWithCurrentDate(event) {
	var dob = $m.juci.dataset("personalForm").PR_DOB;
	var newdob = new Date(dob).toDateString();
	var currentDate = new Date().toDateString();
	if (dob > new Date()) {
		$m.juci.getDataset("personalForm")().PR_DOB('');
		$m.alert("Date of birth should not be greater than Today's Date");
	} else if (newdob == currentDate) {
		$m.juci.getDataset("personalForm")().PR_DOB('');
		$m.alert("Date of birth should not be current date");
	} else {
		var age = getAge(dob);
		if (age < 18) {
			$m.juci.getDataset("personalForm")().PR_DOB('');
			$m.alert("Proposer should be greater than 18 years");
		}
	}
}

function addressCheck(str){
	var checkstatus = /^[A-Za-z0-9][A-Za-z0-9\'-( )&#,%./\-]*$/.test(str);
	personalDataAdd = str;
	if(checkstatus == false){
		personalDataAdd = str.substring(1);
		addressCheck(personalDataAdd);
	}
	return personalDataAdd;
}

function savePersonalDetails(){
	if (isFromBI) {
			datasetData.Application_Number = applicationNumber;
	}
	$m.putPref("customerDetails", datasetData);
	$m.savePref();
//	$m.putPref("customerDetailsNew_"+datasetData.Application_Number, datasetData);
//	$m.savePref();
	if (isFromBI) {
			var planDetailsPref = $m.getPref("planDetails_" + applicationNumber);
			planDetailsPref.Application_Number = applicationNumber;
			datasetData.Child_DOB = planDetailsPref.Child_DOB;
			datasetData.Child_Name = planDetailsPref.Child_Name;
			datasetData.Child_Proposar_Relation = planDetailsPref.Child_Proposar_Relation;
			datasetData.Child_Gender = planDetailsPref.Child_Gender;
			var PDC_Customer_Details_object_Data = new PDC_Customer_Details(datasetData);
			planDetailsPref.Application_Dt = getDateFormatted(planDetailsPref.Application_Dt);
			$m.putPref("planDetails_" + applicationNumber, planDetailsPref);
			$m.savePref();
			new window.DB(CONSTANTS.DBName, function(dbHelper) {
				window.dbHelper = dbHelper;
				PDC_Customer_Details_object_Data.update(function() {
				//	$m.logInfo("Personal Details  inserted successfully");
					var data = {
						"applicationNumber": applicationNumber
					};
					navigateTo("nominee");
				}, function(res) {
					$m.alert("Error while inserting to database");
					$m.logError("Failed to insert personal details--- " + JSON.stringify(res));
				});
			}, function(error) {
				$m.logError("Unable to open database due to -- " + JSON.stringify(error));
				$m.alert("Error while opening database");
			});
		} else {
			new window.DB(CONSTANTS.DBName, function(dbHelper) {
				window.dbHelper = dbHelper;
				if (datasetData.Application_Number) {
					PDC_Customer_Details.SelectWithFilter(applicationNumber, function(success_response) {
						var resultObject = success_response.rows[0];
						var PDC_Customer_Details_object = new PDC_Customer_Details(datasetData);
						PDC_Customer_Details_object.update(function() {
						//	$m.logInfo("Personal Details  inserted successfully");
							var data = {
								"applicationNumber": applicationNumber
							};
							navigateTo("nominee");
						}, function(res) {
							$m.alert("Error while inserting to database");
							$m.logError("Failed to insert personal details--- " + JSON.stringify(res));
						});
					}, function(failure_response) {
						$m.logError("Read failed -- " + JSON.stringify(failure_response));
						$m.alert("Error while fetching from database");
					});
				}
			}, function(error) {
				$m.logError("Unable to open database due to -- " + JSON.stringify(error));
				$m.alert("Error while opening database");
			});
		}
}

function onMaritalOthersClick(event){
	var maritalStatus = event.value.Description();
	var updateMaritalStatus = $m.juci.dataset("personalForm");
	if(maritalStatus == "Others"){
		updateMaritalStatus.marital_others = "true";
		$m.juci.dataset("personalForm",updateMaritalStatus);
	} else {
		updateMaritalStatus.marital_others = "false";
		$m.juci.dataset("personalForm",updateMaritalStatus);
	}
}

function onOccupationTypeClick(event){
	var occupationType = event.value.Description();
	var la_occupationSSubOtions = $m.juci.findById("la-s-options");
	var datasetData = $m.juci.dataset('personalForm');
	if(occupationType == "S-Service"){
		la_occupationSSubOtions.show();
		$m.juci.dataset("occupationSTypeOptions",obj.occupationSTypeOptions);
	} else if(occupationType == "O-Others"){
		la_occupationSSubOtions.show();
		var gender = datasetData.LA_Gender;
		if(gender == "M"){
			$m.juci.dataset("occupationSTypeOptions",obj.occupationOTypeOptions);
		}else{
			$m.juci.dataset("occupationSTypeOptions",obj.femaleOccupationOTypeOptions);
		}
	} else {
		la_occupationSSubOtions.hide();
		datasetData.LA_OccupationSubOptions = "";
		$m.juci.dataset("occupationSTypeOptions",[]);
	}
	$m.juci.dataset('personalForm',datasetData);
}

function onOccupationPRTypeClick(event){
	var occupationType = event.value.Description();
	var pr_occupationSSubOptions = $m.juci.findById("pr-s-options");
	var datasetData = $m.juci.dataset('personalForm');
	datasetData.PR_OccupationSubOptions = "";
	if(occupationType == "S-Service"){
		pr_occupationSSubOptions.show();
		$m.juci.dataset("occupationSTypeOptions",obj.occupationSTypeOptions);
	} else if(occupationType == "O-Others"){
		pr_occupationSSubOptions.show();
		var gender = datasetData.PR_Gender;
		if(gender == "M"){
			$m.juci.dataset("occupationSTypeOptions",obj.occupationOTypeOptions);
		}else{
			$m.juci.dataset("occupationSTypeOptions",obj.femaleOccupationOTypeOptions);
		}
	} else {
		setTimeout(function(){
			$m.juci.getControl("pr-s-options").value([]);
			$m.juci.getControl("pr-s-options").hide();
		},300);
	}
	$m.juci.dataset('personalForm',datasetData);
}


function onSOtionsSubTypeClick(event){
	var sOtions = event.value.Description();
	var pr_occupationOSubOptions = $m.juci.findById("pr-o-options");
	pr_occupationOSubOptions.hide();
}

function onOOtionsSubTypeClick(event){
	var pr_occupationSSubOptions = $m.juci.findById("pr-s-options");
	pr_occupationSSubOptions.hide();
}

function onIdProofsClick(event){ 
	var idProofType = event.value.Description();
	var id_no = $m.juci.findById("identification-no");
	var id_text = $m.juci.findById("identification-text");
	var idother_text = $m.juci.findById("identificationothers-text");
	var idaadhar_text = $m.juci.findById("identificationaadhar-text");
	//var expiry_date = $m.juci.findById("expiry-date");
	var getIdNo = $m.juci.getControl("identification-no");
	var getIdText = $m.juci.getControl("identification-text");
	var getIdOther = $m.juci.getControl("identificationothers-text");
	var getIdAadhar = $m.juci.getControl("identificationaadhar-text");
	var getPassportId = $m.juci.getControl("identificationpassport-text");
	var getSimplifiedId = $m.juci.getControl("identificationsimplified-text");
	var getdervingId = $m.juci.getControl("identificationdriving-text");
	getPassportId.clearValidation();
	getdervingId.clearValidation();
	getIdText.clearValidation();
	getIdOther.clearValidation();
	getIdAadhar.clearValidation();
	getSimplifiedId.clearValidation();
	getIdNo.clearValidation();
	getIdOther.clearValidation();
	switch(idProofType){
			case "Passport" : 
								$m.juci.dataset("passpostIdNo",true);
								$m.juci.dataset("simplifiedNo",false);
								$m.juci.dataset("voterId",false);
								$m.juci.dataset("pancard",false);
								$m.juci.dataset("others",false);
								$m.juci.dataset("uid",false);
								$m.juci.dataset("expiryDate",true);
								$m.juci.dataset("drivingnumber",false);
								getPassportId.value(null);
								getPassportId.clearValidation();
								break;
							
		case "Driving License" : 
									$m.juci.dataset("passpostIdNo",false);
									$m.juci.dataset("simplifiedNo",false);
									$m.juci.dataset("voterId",false);
									$m.juci.dataset("pancard",false);
									$m.juci.dataset("others",false);
									$m.juci.dataset("uid",false);
									$m.juci.dataset("expiryDate",true);
									$m.juci.dataset("drivingnumber",true);
									getdervingId.value(null);
									getdervingId.clearValidation();
									break;
		case "PAN card" :
							$m.juci.dataset("passpostIdNo",false);
							$m.juci.dataset("simplifiedNo",false);
							$m.juci.dataset("voterId",false);
							$m.juci.dataset("pancard",true);
							$m.juci.dataset("others",false);
							$m.juci.dataset("uid",false);
							$m.juci.dataset("expiryDate",false);
							$m.juci.dataset("drivingnumber",false);
							getIdText.value(null);
							getIdText.clearValidation();
							break;
		case "Others (any document notified by Central Govt)" : 
							$m.juci.dataset("passpostIdNo",false);
							$m.juci.dataset("simplifiedNo",false);
							$m.juci.dataset("voterId",false);
							$m.juci.dataset("pancard",false);
							$m.juci.dataset("others",true);
							$m.juci.dataset("uid",false);
							$m.juci.dataset("expiryDate",false);
							$m.juci.dataset("drivingnumber",false);
							getIdOther.value(null);
							getIdOther.clearValidation();
							break;
		case "UID (Aadhar)" : 
							$m.juci.dataset("passpostIdNo",false);
							$m.juci.dataset("simplifiedNo",false);
							$m.juci.dataset("voterId",false);
							$m.juci.dataset("pancard",false);
							$m.juci.dataset("others",false);
							$m.juci.dataset("uid",true);
							$m.juci.dataset("expiryDate",false);
							$m.juci.dataset("drivingnumber",false);
							getIdAadhar.value(null);
							getIdAadhar.clearValidation();
							break;
		case "Simplified Measures Account" : 
							$m.juci.dataset("passpostIdNo",false);
							$m.juci.dataset("simplifiedNo",true);
							$m.juci.dataset("voterId",false);
							$m.juci.dataset("pancard",false);
							$m.juci.dataset("others",false);
							$m.juci.dataset("uid",false);
							$m.juci.dataset("expiryDate",false);
							$m.juci.dataset("drivingnumber",false);
							getSimplifiedId.value(null);
							getSimplifiedId.clearValidation();
							break;
		case "Voter ID" : 
							$m.juci.dataset("passpostIdNo",false);
							$m.juci.dataset("simplifiedNo",false);
							$m.juci.dataset("voterId",true);
							$m.juci.dataset("pancard",false);
							$m.juci.dataset("others",false);
							$m.juci.dataset("uid",false);
							$m.juci.dataset("expiryDate",false);
							$m.juci.dataset("drivingnumber",false);
							getIdNo.value(null);
							getIdNo.clearValidation();
							break;
		case "NREGA Job Card" : 
							$m.juci.dataset("passpostIdNo",false);
							$m.juci.dataset("simplifiedNo",false);
							$m.juci.dataset("voterId",false);
							$m.juci.dataset("pancard",false);
							$m.juci.dataset("others",true);
							$m.juci.dataset("uid",false);
							$m.juci.dataset("expiryDate",false);
							$m.juci.dataset("drivingnumber",false);
							getIdOther.value(null);
							getIdOther.clearValidation();
							break;
	}
}

function onPRIdProofsClick(event){
	var prIdProofType = event.value.Description();
	var id_no = $m.juci.findById("pr-identification-no");
	var id_text = $m.juci.findById("pr-identification-text");
	var idother_text = $m.juci.findById("pr-identificationothers-text");
	var idaadhar_text = $m.juci.findById("pr-identificationaadhar-text");
	var expiry_date = $m.juci.findById("pr-expiry-date");
	var getIdNo = $m.juci.getControl("pr-identification-no");
	var getIdText = $m.juci.getControl("pr-identification-text");
	var getIdOther = $m.juci.getControl("pr-identificationothers-text");
	var getIdAadhar = $m.juci.getControl("pr-identificationaadhar-text");
	var getPassportId = $m.juci.getControl("pr-identificationpassport-text");
	var getSimplifiedId = $m.juci.getControl("pr-identificationsimplified-text");
	var getdervingId = $m.juci.getControl("pr-identificationdriving-text");
	getPassportId.clearValidation();
	getdervingId.clearValidation();
	getIdText.clearValidation();
	getIdOther.clearValidation();
	getIdAadhar.clearValidation();
	getSimplifiedId.clearValidation();
	getIdNo.clearValidation();
	getIdOther.clearValidation();
	switch(prIdProofType){
			case "Passport" : 
								$m.juci.dataset("PrpasspostIdNo",true);
								$m.juci.dataset("PrsimplifiedNo",false);
								$m.juci.dataset("PrvoterId",false);
								$m.juci.dataset("Prpancard",false);
								$m.juci.dataset("Prothers",false);
								$m.juci.dataset("Pruid",false);
								$m.juci.dataset("PrexpiryDate",true);
								$m.juci.dataset("Prdrivingnumber",false);
								getPassportId.value(null);
								break;
							
		case "Driving License" : 
									$m.juci.dataset("PrpasspostIdNo",false);
									$m.juci.dataset("PrsimplifiedNo",false);
									$m.juci.dataset("PrvoterId",false);
									$m.juci.dataset("Prpancard",false);
									$m.juci.dataset("Prothers",false);
									$m.juci.dataset("Pruid",false);
									$m.juci.dataset("PrexpiryDate",true);
									$m.juci.dataset("Prdrivingnumber",true);
									getdervingId.value(null);
									break;
		case "PAN card" :
							$m.juci.dataset("PrpasspostIdNo",false);
							$m.juci.dataset("PrsimplifiedNo",false);
							$m.juci.dataset("PrvoterId",false);
							$m.juci.dataset("Prpancard",true);
							$m.juci.dataset("Prothers",false);
							$m.juci.dataset("Pruid",false);
							$m.juci.dataset("PrexpiryDate",false);
							$m.juci.dataset("Prdrivingnumber",false);
							getIdText.value(null);
							break;
		case "Others (any document notified by Central Govt)" : 
							$m.juci.dataset("PrpasspostIdNo",false);
							$m.juci.dataset("PrsimplifiedNo",false);
							$m.juci.dataset("PrvoterId",false);
							$m.juci.dataset("Prpancard",false);
							$m.juci.dataset("Prothers",true);
							$m.juci.dataset("Pruid",false);
							$m.juci.dataset("PrexpiryDate",false);
							$m.juci.dataset("Prdrivingnumber",false);
							getIdOther.value(null);
							break;
		case "UID (Aadhar)" : 
							$m.juci.dataset("PrpasspostIdNo",false);
							$m.juci.dataset("PrsimplifiedNo",false);
							$m.juci.dataset("PrvoterId",false);
							$m.juci.dataset("Prpancard",false);
							$m.juci.dataset("Prothers",false);
							$m.juci.dataset("Pruid",true);
							$m.juci.dataset("PrexpiryDate",false);
							$m.juci.dataset("Prdrivingnumber",false);
							getIdAadhar.value(null);
							break;
		case "Simplified Measures Account" : 
							$m.juci.dataset("PrpasspostIdNo",false);
							$m.juci.dataset("PrsimplifiedNo",true);
							$m.juci.dataset("PrvoterId",false);
							$m.juci.dataset("Prpancard",false);
							$m.juci.dataset("Prothers",false);
							$m.juci.dataset("Pruid",false);
							$m.juci.dataset("PrexpiryDate",false);
							$m.juci.dataset("Prdrivingnumber",false);
							getSimplifiedId.value(null);
							break;
		case "Voter ID" : 
							$m.juci.dataset("PrpasspostIdNo",false);
							$m.juci.dataset("PrsimplifiedNo",false);
							$m.juci.dataset("PrvoterId",true);
							$m.juci.dataset("Prpancard",false);
							$m.juci.dataset("Prothers",false);
							$m.juci.dataset("Pruid",false);
							$m.juci.dataset("PrexpiryDate",false);
							$m.juci.dataset("Prdrivingnumber",false);
							getIdNo.value(null);
							break;
		case "NREGA Job Card" : 
							$m.juci.dataset("PrpasspostIdNo",false);
							$m.juci.dataset("PrsimplifiedNo",false);
							$m.juci.dataset("PrvoterId",false);
							$m.juci.dataset("Prpancard",false);
							$m.juci.dataset("Prothers",true);
							$m.juci.dataset("Pruid",false);
							$m.juci.dataset("PrexpiryDate",false);
							$m.juci.dataset("Prdrivingnumber",false);
							getIdOther.value(null);
							break;
	}
}

function formateAdvisorName(advisorName){
	advisorName = advisorName.replace(/-/g," ");
	advisorName = advisorName.replace(/_/g," ");
	var firstChar = advisorName.match('[a-zA-Z]');
	advisorName
	advisorName = advisorName.substring(advisorName.indexOf(firstChar), advisorName.length);
	return advisorName;
}

function onPanIdentificationChange(e){
	var a = juci.getControl("identification-text").value();
	var id_no = juci.dataset("personalForm").LA_IDProof.Description;
	if(id_no == "Voter ID"){
		if (a.length == 16 || a.length > 16) {
			//a = a.substring(0, 20);
			a = a.slice(0, 16);
			juci.getControl("identification-text").innerHTML = a;
			$m.alert("Enter valid Voter Id should not exceed greater than 16");
		} else {
			a = a.slice(0, 16);
			juci.getControl("identification-text").innerHTML = a;
		}	
	} else if(id_no == "PAN card"){
		if (a.length == 10 || a.length > 10) {
			//a = a.substring(0, 20);
			a = a.slice(0, 10);
			juci.getControl("identification-text").innerHTML = a;
			$m.alert("Enter valid Pan Card Id should not exceed greater than 10");
		} else {
			a = a.slice(0, 10);
			juci.getControl("identification-text").innerHTML = a;
		}	
	} 
}

function onIdentificationChange(event){
	var a = juci.getControl("identification-no").value();
	var id_no = juci.dataset("personalForm").LA_IDProof.Description;
	if(id_no == "UID (Aadhar)"){
		if (a.length == 12 || a.length > 12) {
			//a = a.substring(0, 20);
			a = a.slice(0, 12);
			juci.getControl("identification-no").innerHTML = a;
			$m.alert("Enter valid Aadhar number should not exceed greater than 12");
		} else {
			a = a.slice(0, 12);
			juci.getControl("identification-no").innerHTML = a;
		}	
	} 
}

function clearVoterId(event){
	$m.juci.getControl("identification-no").clearValidation();
}
function clearPanCard(event){
	$m.juci.getControl("identification-text").clearValidation();
}
function clearOtherId(event){
	$m.juci.getControl("identificationothers-text").clearValidation();
}
function clearAadharId(event){
	$m.juci.getControl("identificationaadhar-text").clearValidation();
}
function clearPassport(event){
	$m.juci.getControl("identificationpassport-text").clearValidation();
}
function clearDrivingNumber(event){
	$m.juci.getControl("identificationdriving-text").clearValidation();
}
function clearSimplifiedId(event){
	$m.juci.getControl("identificationsimplified-text").clearValidation();
}

function fireRequestEkycXml(action, sapcode,lead_id, callback){
	var url = "http://124.124.218.136/supertrack/mowblyserver/sGetEKYCXml/rellife/prod/RlifeAssist";
	if ($m.networkConnected()) {
		$m.post(url, {"action":action,"sapCode":sapcode,"lead_id":lead_id,"headers": {
			"Content-Type": "application/json"
			}}, function(callback) {
			return function(response) {
				if (response.code == 200) {
					var result = JSON.parse(response.result.data);
					if(result.length != 0){
						$m.hideProgress();
						callback.call(this, result);
					} else {
						$m.hideProgress();
						callback.call(this, result);
						$m.logError(JSON.stringify(response));
					}	
				}  else {
					$m.alert(messages.ServerMessage,"Server Message",function(){
					$m.hideProgress();
					$m.close();
					});
					var errMsg = response;
					$m.logError(JSON.stringify(response));
				}
			};
		}(callback));
	} else {
		$m.alert(messages.NoNetworkConnectivity,"Network Error",function(){
		$m.hideProgress();
		});
	}
}
