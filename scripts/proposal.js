var applicationNumber, isFromBI = true,
	eventData;
var info = {
	"plan": "Reliance Endowment Plan",
	"name": "Neha Nigam",
	"custid": "282937393"
};
var personalDataAdd;
var englishLang;
var hindiLang;
var tamilLang;

$m.juci.dataset("annuityPlanQues", "");
$m.juci.addDataset("aadharMandatoryFlag",false);
$m.juci.addDataset("LA_Aadhaar_Document",[]);
$m.juci.addDataset("PR_Aadhaar_Document",[]);
$m.juci.addDataset("InstallmentPremium_ST", "");
$m.juci.addDataset("hasinstalPremium", false);
$m.juci.addDataset("hasProposer", false);
$m.juci.addDataset("hasIncome", false);
$m.juci.addDataset("LA_aadharselect", false);
$m.juci.addDataset("PR_aadharselect", false);
$m.juci.addDataset("Annuity", "");
$m.juci.addDataset("hascheque", false);
$m.juci.addDataset("checkaadharLa", "");
$m.juci.addDataset("checkaadharPR", "");
$m.juci.addDataset("AadharData", "");
$m.juci.addDataset("hasNoAadhar", true);
$m.juci.addDataset("hasAadhaar", false);
$m.juci.addDataset("hasLeadAadhar", false);
$m.juci.addDataset("AadharPr_Data", "");
$m.juci.addDataset("app_number", "info");
$m.juci.addDataset("proposaldetails", info);
$m.juci.dataset("LA_Check_Premium", "");
$m.juci.addDataset("genderoption", ["Male", "Female"]);
$m.juci.addDataset("otp", {});
$m.juci.addDataset("aadharotp", {});
$m.juci.addDataset("diseaseDetailsTable", []);
$m.juci.addDataset("genderForParentOrHusband", 'M');
$m.juci.addDataset('genderForPregnant', 'M');
$m.juci.addDataset("lifeInsuranceTable", []);
$m.juci.addDataset("adress", []);
$m.juci.addDataset("photo", []);
$m.juci.addDataset("idprf", []);
$m.juci.addDataset("income", []);
$m.juci.addDataset("ageproof", []);
$m.juci.addDataset("customerdeclaration", []);
$m.juci.addDataset("typeOfDocuments", []);
$m.juci.addDataset("pradress", []);
$m.juci.addDataset("prphoto", []);
$m.juci.addDataset("pridprf", []);
$m.juci.addDataset("princome", []);
$m.juci.addDataset("prageproof", []);
$m.juci.addDataset("prcustomerdeclaration", []);
$m.juci.addDataset("applicantphoto", []);
$m.juci.addDataset("proposerphoto", []);
$m.juci.dataset("cheque", []);
$m.juci.dataset("other", []);
$m.juci.addDataset("opt", "Y");
$m.juci.addDataset("Aadhar", "");
$m.juci.addDataset("Aadhar_Proposer", "");
$m.juci.addDataset("aadharno", "");
$m.juci.addDataset("aadharPrNo", "");
$m.juci.addDataset("aadhar_section", false);
$m.juci.addDataset("aadhar_section2", false);
$m.juci.addDataset("fingerPrint", "");
$m.juci.addDataset("PRPrint", "");
$m.juci.addDataset("hasLead",false);
$m.juci.addDataset("isProductPage",true);
$m.juci.addDataset("passpostIdNo",false);		
$m.juci.addDataset("simplifiedNo",false);		
$m.juci.addDataset("voterId",false);		
$m.juci.addDataset("pancard",false);		
$m.juci.addDataset("others",false);		
$m.juci.addDataset("uid",false);		
$m.juci.addDataset("drivingnumber",false);		
$m.juci.addDataset("expiryDate",false);		
$m.juci.addDataset("PrpasspostIdNo",false);		
$m.juci.addDataset("PrsimplifiedNo",false);		
$m.juci.addDataset("PrvoterId",false);		
$m.juci.addDataset("Prpancard",false);		
$m.juci.addDataset("Prothers",false);		
$m.juci.addDataset("Pruid",false);		
$m.juci.addDataset("Prdrivingnumber",false);		
$m.juci.addDataset("PrexpiryDate",false);
$m.juci.addDataset("checkLAaadhar",false);
$m.juci.addDataset("typeOfDocumentRef","");
$m.juci.addDataset("typeOfDocument",["PANCARD","FORM60"]);
$m.juci.addDataset("partnerBranchDetailsList",[]);
$m.juci.addDataset("isBranchCodeValid",false);


$m.onReady(function() {
	service = new ServiceLibrary();
	documentsupload = juci.findById("docsupload");
	documentsupload.hide();
	proposalFulfilmentView = juci.findById("proposalFulfilment");
	prepaymentreview = juci.findById("prepaymentReview");
	paymentoptions = juci.findById("paymentoptions");
	prepaymentreview.hide();
	selfieVideo = juci.findById("selfie-video");
	selfieVideo.hide();
	paymentoptions.hide();
	currentView = juci.findById("proposalView");
	//currentView.show();
	NextView = juci.findById("AppointeeOrnomineeView");
	NextView.hide();
	FamilyView = juci.findById("familyhistory");
	FamilyView.hide();
	InsuranceView = juci.findById("insuranceDetails");
	InsuranceView.hide();
	LifeStyleView = juci.findById("lifestyledetails");
	LifeStyleView.hide();
	VernacularView = juci.findById("vernacularDetails");
	VernacularView.hide();
	DeclarationView = juci.findById("declarationdetails");
	DeclarationView.hide();
	ConfidentialView = juci.findById("confidentailreport");
	ConfidentialView.hide();
	adharSection1 = juci.findById("adhar-section");
	adharSection1.hide();
	adharsection2 = juci.findById("adhar-section2");
	adharsection2.hide();
	englishLang = juci.findById("english");		
	hindiLang = juci.findById("hindi");		
	tamilLang = juci.findById("tamil");		
	hindiLang.hide();		
	tamilLang.hide();		
	la_occupationSSubOtions = $m.juci.findById("la-s-options");		
	la_occupationSSubOtions.hide();		
	pr_occupationSSubOtions = $m.juci.findById("pr-s-options");		
	pr_occupationSSubOtions.hide();	
	pr_expiry_date = $m.juci.findById("pr-expiry-date");		
	pr_expiry_date.hide();
	langEnglish = juci.findById("lang-eng");
	langTamil = juci.findById("lang-tamil");
	langHindi = juci.findById("lang-hindi");
	langTelugu = juci.findById("lang-telugu");
	langMarathi = juci.findById("lang-marathi");
	tamilContent = juci.findById("tamil-content");
	tamilContent.hide();
	hindiContent = juci.findById("hindi-content");
	hindiContent.hide();
	teluguContent = juci.findById("telugu-content");
	teluguContent.hide();
	marathiContent = juci.findById("marathi-content");
	marathiContent.hide();
//	id_no = $m.juci.findById("identification-no");		
//	expiry_date = $m.juci.findById("expiry-date");		
//	id_no.hide();		
//	expiry_date.hide();
	juci.getControl("familyHistory").addListItemClick(editDetails, this, ".edit");
	juci.getControl("familyHistory").addListItemClick(deleteDetails, this, ".delete");
	juci.getControl("lifeInsuranceDetails").addListItemClick(deleteInsuranceDetails, this, ".delete");
	juci.getControl("lifeInsuranceDetails").addListItemClick(editInsuranceDetails, this, ".insuranceedit");
	$m.juci.findById("insuranceRepository").hide();
	$m.juci.findById("id-proofs").hide();

	englishLang = juci.findById("english");
	hindiLang = juci.findById("hindi");
	tamilLang = juci.findById("tamil");
	hindiLang.hide();
	tamilLang.hide();

	englishLanguage = juci.findById("englishlang");
	hindiLanguage = juci.findById("hindilang");
	tamilLanguage = juci.findById("tamillang");
	hindiLanguage.hide();
	tamilLanguage.hide();
	$m.juci.getControl("togbtn1").disable();
	$m.juci.getControl("Gender_m").disable();
	$m.juci.getControl("Gender_f").disable();
	$m.juci.getControl("Gender_t").disable();
	//juci.getControl("checkLA").value(false);
	//  juci.getControl("checkPR").value(false);
});

$m.onResume(function() {
	// Code to execute when the page is resumed
	$m.juci.dataset("headerName", "Proposal");
	var head = document.getElementsByClassName("juci_panel_title");
	juci.viewModel.applyBinding(head[0]);
	$m.juci.dataset("alertcount", "3");
	readPartnerBranchData();
	//$m.removePref("companydetails")
	
	//var alincome = $m.juci.findById("alincome");
	//alincome.el.childNodes[2].onfocus = delegate(alincome.el.childNodes[2], removeCommas);
	//alincome.el.childNodes[2].onblur = delegate(alincome.el.childNodes[2], addCommas);
});

$m.onData(function(eventObject) {
	//	$m.logInfo("On Data Response : " + JSON.stringify(eventObject.data));
	//__mowbly__.Shell.UEX.resumeRecording(function(res){console.log(JSON.stringify(res))});
	hideDocument();
	popuateLifeAssuredDetails(eventObject);
	openLifeAssured();
	getPlanmaster();
	$m.juci.dataset("Aadhar", "");
	$m.juci.dataset("Aadhar_Proposer", "");
	$m.juci.dataset("AadharData", "");
	$m.juci.dataset("AadharPr_Data", "");
	juci.getControl("checkLA").value(false);
	juci.getControl("checkPR").value(false);
	juci.getControl("togbtn4").disable();
	juci.getControl("togbtn3").disable();
	juci.getControl("togbtn5").disable();
	$m.juci.dataset("hasLead",false);
	$m.juci.dataset("hasLeadAadhar", false);
	$m.removePref("isProductsPage");
	$m.juci.dataset("passpostIdNo",false);		
	$m.juci.dataset("simplifiedNo",false);		
	$m.juci.dataset("voterId",false);		
	$m.juci.dataset("pancard",false);		
	$m.juci.dataset("others",false);		
	$m.juci.dataset("uid",false);		
	$m.juci.dataset("drivingnumber",false);		
	$m.juci.dataset("expiryDate",false);		
	$m.juci.dataset("PrpasspostIdNo",false);		
	$m.juci.dataset("PrsimplifiedNo",false);		
	$m.juci.dataset("PrvoterId",false);		
	$m.juci.dataset("Prpancard",false);		
	$m.juci.dataset("Prothers",false);		
	$m.juci.dataset("Pruid",false);		
	$m.juci.dataset("Prdrivingnumber",false);		
	$m.juci.dataset("PrexpiryDate",false);
	// juci.getControl("otp-aadhar").value(null);
	// juci.getControl("otpNo").value(null);
});

/*$m.onClose(function(){
  utils.RemovePref("AadhaarLead_ID");
  utils.RemovePref("Lead_ID");
});*/

function popuateLifeAssuredDetails(eventObject) {
	$m.juci.dataset("personalForm", bindingObject.PDC_Customer_Details);
	juci.getControl("nach").value() == "Y";
	juci.getControl("isLaSame").value("Y");
	if (eventObject.data.PLanCode) {
		var planNumber = eventObject.data.PLanCode;
	}
	utils.GetControl("toogle").toggle(1);
	juci.getControl("togbtn2").enable();
	var checkProd = $m.getPref("isProductsPage");
	if(checkProd == true){
		$m.juci.dataset("isProductPage",true);
	}else{
		$m.juci.dataset("isProductPage",false);
	}
	new window.DB(CONSTANTS.DBName, function(dbHelper) {
		window.dbHelper = dbHelper;
		eventData = eventObject.data;
		hideDocument();
		selectAllDeclarations();
		if (eventObject.data.Application_Number) {
			eventObject.data.applicationNumber = eventObject.data.Application_Number;
		}
		if (eventObject.data && eventObject.data.applicationNumber) {
			isFromBI = false;
			var mode = "";
			$m.juci.dataset("app_number", eventObject.data.applicationNumber);
			//juci.getControl("Gender").disable();
			PDC_Plan_Details.SelectWithFilter(eventObject.data.applicationNumber, function(success_response) {
				var resultObject = success_response.rows[0];
				var PLanCode = resultObject.PLanCode;
				$m.juci.dataset("Annuity", resultObject.PLanCode);
				if (PLanCode == 117 || PLanCode == 118) {
					$m.juci.findById("LifeAnnuity").disable();
					$m.juci.findById("AnnuityPayOpt").disable();
					$m.juci.findById("Annuity").show();
				} else if (PLanCode == 114) {
					$m.juci.findById("LifeAnnuity").enable();
					$m.juci.findById("AnnuityPayOpt").enable();
					$m.juci.findById("Annuity").show();
					var isLaSame = juci.findById("isLaSame");
					isLaSame.findByClass("juci_switch2_bar")[0].disable();
				} else {
					$m.juci.findById("Annuity").hide();
					var isLaSame = juci.findById("isLaSame");
					isLaSame.findByClass("juci_switch2_bar")[0].enable();
				}
				mode = resultObject.Premium_Frequency ? resultObject.Premium_Frequency : resultObject.Mode_Deposit;
			}, function(failure_response) {
				$m.logError("Read failed -- " + JSON.stringify(failure_response));
				$m.alert("Error while fetching from database");
			});
			PDC_Customer_Details.SelectWithFilter(eventObject.data.applicationNumber, function(success_response) {
				var resultObject = success_response.rows[0];
				applicationNumber = resultObject.Application_Number;
				changeSalutationPersonal(resultObject.LA_Gender);
				if(resultObject.LA_Gender == "M"){
				 	utils.GetControl("LA_gender").toggle(0);
				 	$m.juci.dataset("occupation", obj.occupation);
				}
				else{
					utils.GetControl("LA_gender").toggle(1);
					$m.juci.dataset("occupation", obj.femaleOccupation);
				}

				resultObject.LA_DOB = new Date(resultObject.LA_DOB);
				if (getAge(new Date(resultObject.LA_DOB)) < 18) {
					resultObject.IS_LA_PR_SAME = 'N';
					var isLaSame = juci.findById("isLaSame");
					isLaSame.findByClass("juci_switch2_bar")[0].disable();
					resultObject.LA_Occupation = {LA_CODE: "OTHR", Description: "Other"};
				}
				resultObject.LA_Salutation = setValueFromOptions("salutation", {
					"LA_CODE": resultObject.LA_Salutation
				}, localLaComparator);
				resultObject.LA_MaritalStatus = setValueFromOptions("maritalStatus", {
					"LA_CODE": resultObject.LA_MaritalStatus
				}, localLaComparator);
				resultObject.LA_Education = setValueFromOptions("education", {
					"LA_CODE": resultObject.LA_Education
				}, localLaComparator);
				resultObject.LA_Occupation = setValueFromOptions("occupation", {
					"LA_CODE": resultObject.LA_Occupation
				}, localLaComparator);
				resultObject.LA_BANKACCPROOF = setValueFromOptions("bankAccountProof", {
					"LA_CODE": resultObject.LA_BANKACCPROOF
				}, localLaComparator);
				resultObject.LA_Nationality = setValueFromOptions("nationality", {
					"LA_CODE": resultObject.LA_Nationality
				}, localLaComparator);

				resultObject.AnnuityPayout_Option = setValueFromOptions("AnnuityPayoutOption", {
					"Description": resultObject.AnnuityPayout_Option
				}, lAComparator);
				resultObject.Life_Annuity_Guarenteed_For = setValueFromOptions("LifeAnnuityGuaranteedFor", {
					"Description": resultObject.Life_Annuity_Guaranteed_For
				}, lAComparator);
				resultObject.Annuity_Payout_Mode = setValueFromOptions("AnnuityPayoutMode", {
					"Description": resultObject.Annuity_Payout_Mode
				}, lAComparator);
				resultObject.Annuity_Payments_By = setValueFromOptions("AnnuityPaymentsBy", {
					"Description": resultObject.Annuity_Payments_By
				}, lAComparator);
				resultObject.LA_OccupationType = setValueFromOptions("occupationtype", {
					"LA_CODE": resultObject.LA_OccupationType
				}, localLaComparator);
				resultObject.LA_ResidentialStatus = setValueFromOptions("resendentialStatus", {
					"LA_CODE": resultObject.LA_ResidentialStatus
				}, localLaComparator);
				resultObject.LA_Citizenship = setValueFromOptions("citizenship", {
					"LA_CODE": resultObject.LA_Citizenship
				}, localLaComparator);
				resultObject.LA_IDProof = setValueFromOptions("IdProofs", {
					"LA_CODE": resultObject.LA_IDProof
				}, localLaComparator);
				if(resultObject.LA_OccupationSubOptions){
					var check_laOccSubType = resultObject.LA_OccupationSubOptions;
					if(check_laOccSubType == "PS" || check_laOccSubType =="PUS" || check_laOccSubType == "GS"){
						$m.juci.dataset("occupationSTypeOptions",obj.occupationSTypeOptions);
					}else{
						var gender = resultObject.LA_Gender;
						if(gender == "M"){
							$m.juci.dataset("occupationSTypeOptions",obj.occupationOTypeOptions);
						}else{
							$m.juci.dataset("occupationSTypeOptions",obj.femaleOccupationOTypeOptions);
						}
					}
					resultObject.LA_OccupationSubOptions = setValueFromOptions("occupationSTypeOptions", {
						"LA_CODE": resultObject.LA_OccupationSubOptions
					}, localLaComparator);
					la_occupationSSubOtions.show();
				}else{
					la_occupationSSubOtions.hide();
				}
				if (resultObject.LEAD_REF_No) {
					$m.juci.dataset("hasLead",true);
				}else{
					$m.juci.dataset("hasLead",false);
				}
				
				if (!resultObject.PR_IsRelianceEmp) {
					resultObject.PR_IsRelianceEmp = "N";
				}
				if (resultObject.IS_LA_PR_SAME == 'N') {
					resultObject.PR_Salutation = setValueFromOptions("salutation", {
						"LA_CODE": resultObject.PR_Salutation
					}, localLaComparator);
					if (resultObject.PR_Gender == "F") {
						utils.GetControl("PR_gender").toggle(1);
						$m.juci.dataset("proposerSalutation", femaleSalutation);
						$m.juci.dataset("relationOfTheProposer", Proposer_Female);
						$m.juci.dataset("occupation", obj.femaleOccupation);
						
					} else {
						utils.GetControl("PR_gender").toggle(0);
						$m.juci.dataset("proposerSalutation", maleSalutation);
						$m.juci.dataset("relationOfTheProposer", Proposer_Male);
						$m.juci.dataset("occupation", obj.occupation);
					}

					resultObject.PR_MaritalStatus = setValueFromOptions("maritalStatus", {
						"LA_CODE": resultObject.PR_MaritalStatus
					}, localLaComparator);
					resultObject.PR_Education = setValueFromOptions("education", {
						"LA_CODE": resultObject.PR_Education
					}, localLaComparator);
					resultObject.PR_Occupation = setValueFromOptions("occupation", {
						"LA_CODE": resultObject.PR_Occupation
					}, localLaComparator);
					resultObject.PR_BANKACCPROOF = setValueFromOptions("bankAccountProof", {
						"LA_CODE": resultObject.PR_BANKACCPROOF
					}, localLaComparator);

					resultObject.PR_Nationality = setValueFromOptions("nationality", {
						"LA_CODE": resultObject.PR_Nationality
					}, localLaComparator);
					resultObject.PR_LA_Relationship = setValueFromOptions("relationOfTheProposer", {
						"LA_CODE": resultObject.PR_LA_Relationship
					}, localLaComparator);
					resultObject.PR_OccupationType = setValueFromOptions("occupationtype", {
						"LA_CODE": resultObject.PR_OccupationType
					}, localLaComparator);
					resultObject.PR_ResidentialStatus = setValueFromOptions("resendentialStatus", {
						"LA_CODE": resultObject.PR_ResidentialStatus
					}, localLaComparator);
					resultObject.PR_Citizenship = setValueFromOptions("citizenship", {
						"LA_CODE": resultObject.PR_Citizenship
					}, localLaComparator);
					resultObject.PR_IDProof = setValueFromOptions("IdProofs", {
						"LA_CODE": resultObject.PR_IDProof
					}, localLaComparator);
					if(resultObject.PR_OccupationSubOptions){
						var check_laOccSubType = resultObject.PR_OccupationSubOptions;
						if(check_laOccSubType == "PS" || check_laOccSubType =="PUS" || check_laOccSubType == "GS"){
							$m.juci.dataset("occupationSTypeOptions",obj.occupationSTypeOptions);
						}else{
							var gender = resultObject.PR_Gender;
							if(gender == "M"){
								$m.juci.dataset("occupationSTypeOptions",obj.occupationOTypeOptions);
							}else{
								$m.juci.dataset("occupationSTypeOptions",obj.femaleOccupationOTypeOptions);
							}
						}
						resultObject.PR_OccupationSubOptions = setValueFromOptions("occupationSTypeOptions", {
							"LA_CODE": resultObject.PR_OccupationSubOptions
						}, localLaComparator);
						pr_occupationSSubOtions.show();
					}else{
						pr_occupationSSubOtions.hide();
					}
					if (resultObject.PR_LA_Relationship == "") {

						if (resultObject.PR_Gender == "M") {

							$m.juci.dataset("relationOfTheProposer", Proposer_Male);
						} else {

							$m.juci.dataset("relationOfTheProposer", Proposer_Female);
						}
					}
				}
				$m.juci.dataset('personalForm', resultObject);
				if ($m.getPref("restart") == true) {
					$m.removePref("restart");
					navigateTo("personal");
				} else {
					var lastKnownStep = $m.getPref(applicationNumber);
					populateDetails();
					if (lastKnownStep) {
						navigateTo(lastKnownStep);
					}
				}
			}, function(failure_response) {
				$m.logError("Read failed -- " + JSON.stringify(failure_response));
				$m.alert("Error while fetching from database");
			});
		} else if (eventObject.data.PLanCode) {
			$m.juci.dataset("Annuity", eventObject.data.PLanCode);
			isFromBI = true;
			//juci.getControl("Gender").disable();
			var isLaSame = juci.findById("isLaSame");
			isLaSame.findByClass("juci_switch2_bar")[0].enable();
			try {
			//	$m.logInfo("BI response : " + JSON.stringify(eventObject.data));
				var dataset2 = $m.juci.dataset('personalForm');
				dataset2.LA_Name = eventData.name.replace(/-/g, " ");
				var fromProducts = utils.GetPref("FromProducts");
				if(fromProducts){
					if(dataset2.LA_Name.length > 30) {
						$m.alert("Proposal Name exceeds more than 30 characters, kindly create fresh case","Alert",function(){
							$m.open("product","/Products/Products.html");
						});
					}	
				}
				
				var re = new RegExp("^[a-z\.? \s\'?A-Z]*$");
				if (re.test(dataset2.LA_Name)) {
				    console.log("Valid");
				} else {
				    $m.alert("Proposal Name exceeds more than 30 characters, kindly create fresh case","Alert",function(){
						$m.open("product","/Products/Products.html");
					});
				}
						
				dataset2.LA_Gender = getFormattedGender(eventData.sex);
				dataset2.LA_DOB = (eventData.dob != null) ? getDOBObj(eventData.dob) : "";
				if (getAge(eventData.dob) < 18) {
					dataset2.IS_LA_PR_SAME = 'N';
				}
				if (dataset2.LA_Gender == "M" || dataset2.LA_Gender == "male" || dataset2.LA_Gender == "Male") {
					$m.juci.dataset("salutation", maleSalutation);
					$m.juci.dataset("personalsalutation", maleSalutation);
                    utils.GetControl("LA_gender").toggle(0);
					dataset2.LA_Salutation = setValueFromOptions("salutation", {
						"LA_CODE": "MR"
					}, localLaComparator);
					$m.juci.dataset("occupation", obj.occupation);
				} else if (dataset2.LA_Gender == "F" || dataset2.LA_Gender == "female" || dataset2.LA_Gender == "Female") {
					$m.juci.dataset("salutation", femaleSalutation);
					$m.juci.dataset("personalsalutation", femaleSalutation);
					utils.GetControl("LA_gender").toggle(1);
					dataset2.LA_Salutation = setValueFromOptions("salutation", {
						"LA_CODE": "MISS"
					}, localLaComparator);
					$m.juci.dataset("occupation", obj.femaleOccupation);
				}
				var premium = eventData.Total_InstPremium_ST == null ? parseInt(eventData.InstallmentPremium_ST, 10) : parseInt(eventData.Total_InstPremium_ST, 10);
				$m.juci.dataset("LA_Check_Premium", premium);
				if (eventData.Mode_Deposit == 'M' || eventData.Mode_Deposit == 'Q') {
					dataset2.PR_ECSFORM_YN = setValueFromOptions("ecsOptions", {
						"LA_CODE": "N"
					}, localLaComparator);
				} else {
					$m.juci.dataset("LA_Check_Mode_M_Q", "N");
				}
				$m.juci.dataset("nomineeSalutation", maleSalutation);
				$m.juci.dataset("relationOfTheNominee", AppointeeMalerelationship);
				$m.juci.dataset("appointeeRelationship", AppointeeMalerelationship);
				$m.juci.dataset("proposerSalutation", maleSalutation);
				$m.juci.dataset("relationOfTheProposer", Proposer_Male);
				var fname = eventObject.data.fname;
				$m.putPref("planDetails", eventObject.data);
				$m.savePref();
				var appldata = {
					"AdvisorCode": $m.getUsername(),
					"PlanNo": planNumber,
					"SessionID": fname
				}
				service.GetApplicationNumber(function(response) {
					//$m.logInfo("application number response : " + JSON.stringify(response));
					delete eventObject.data.fname;
					if (response.Child) {
						var appNo = response;
						if(eventObject.data.PLanCode == "122" || eventObject.data.PLanCode == "128" || eventObject.data.PLanCode == "129"){
							dataset2.Application_Number = appNo.Parent;
							dataset2.Parent_Application_Number = appNo.Child;
							applicationNumber = appNo.Parent;
						}
						else{
							dataset2.Application_Number = appNo.Child;
							dataset2.Parent_Application_Number = appNo.Parent;
							applicationNumber = appNo.Child;
						}
						eventObject.data.Application_Number = dataset2.Application_Number;
						dataset2.BI_REFNUMBER = fname;
						//$m.juci.dataset('personalForm', dataset2);
						$m.juci.dataset("app_number", dataset2.Application_Number);
						var planCodes = $m.getPref("planDetails_" + applicationNumber);
						//create();
						if (!planCodes) {
							planCodes = $m.getPref("planDetails");
							//var a = JSON.stringify(planCodes);
							//$m.alert("BI Data "+ a);
							$m.putPref("planDetails_" + applicationNumber, planCodes);
							$m.savePref();
						}
						$m.putPref("planName_" + applicationNumber, planCodes);
						$m.savePref();
						if(utils.GetPref("FromProducts")){
							dataset2.Super_Track_Login = "N";
//							$m.juci.dataset("isProducts",true);
							utils.PutPref("fromProucts_" +applicationNumber,true);
							utils.RemovePref("FromProducts");
						} else {
//							$m.juci.dataset("isProducts",false);
							dataset2.Super_Track_Login = "Y";
						}
						var company_employee = eventObject.data.EED;
						if(company_employee != undefined){
							$m.putPref("companydetails_"+applicationNumber,company_employee);
							$m.savePref();
							if(company_employee == "Yes"){
								$m.juci.getControl("companyEmployee").value("Y");
								dataset2.LA_IsRelianceEmp = "Y";
								if (dataset2.IS_LA_PR_SAME == "Y") {
									$m.juci.getControl("companyEmpPr").value("N");
									dataset2.PR_IsRelianceEmp = "N";
								}else{
									$m.juci.getControl("companyEmpPr").value("Y");
									dataset2.PR_IsRelianceEmp = "Y";
								}
							}else{
								$m.juci.getControl("companyEmployee").value("N");
								dataset2.LA_IsRelianceEmp = "N";
							}
							var check_groupEmployee = $m.juci.getControl("companyEmployee").value();
							var check_Pr_groupEmp = $m.juci.getControl("companyEmpPr").value();
							if(check_groupEmployee == "Y"){
								var switchEmp = $m.juci.getControl("companyEmployee");
								switchEmp.show();
								switchEmp.j.el.style.pointerEvents = 'none';
								switchEmp.j.disable();
							}else{
								$m.juci.getControl("companyEmployee").hide();
							}
							if(check_Pr_groupEmp == "Y"){
								var switchEmp = $m.juci.getControl("companyEmpPr").show();
								switchEmp.show();
								switchEmp.j.el.style.pointerEvents = 'none';
								switchEmp.j.disable();
							}else{
								$m.juci.getControl("companyEmpPr").hide();
							}
						}else{
							$m.juci.getControl("companyEmployee").hide();
						}
						var age_proof = eventObject.data.AGE_Proof;
						if(age_proof != undefined && age_proof != "Standard" && age_proof != "SAP" && age_proof != ""){
							$m.confirm({
								"title": "Consent",
								"message": "The Customer Consent is Mandatory for Non Standard Age proof, kindly collect the same.",
								"buttons": [{
									"label": "Yes"
								}, {
									"label": "No"
								}]
							}, function(index) {
								var options = ["Yes", "No"];
								if (index == 0) { 
									//Yes
								} else {
									//No
									$m.close();
								}
							});
						}
						if (planNumber == 117 || planNumber == 118) {
							$m.juci.findById("LifeAnnuity").disable();
							$m.juci.findById("AnnuityPayOpt").disable();
							$m.juci.findById("Annuity").show();
						} else if (planNumber == 114) {
							$m.juci.findById("LifeAnnuity").enable();
							$m.juci.findById("AnnuityPayOpt").enable();
							$m.juci.findById("Annuity").show();
							$m.juci.getControl("isLaSame").disable;
						} else {
							$m.juci.findById("Annuity").hide();
							//   juci.getControl("isLaSame").enable();
						}
				
						if (planNumber == "114" || planNumber == "117" || planNumber == "118") {
							dataset2.Annuity_Payments_By = dataset2.Annuity_Payments_By.Description;
							dataset2.Annuity_Payout_Mode = dataset2.Annuity_Payout_Mode.Description;
							dataset2.AnnuityPayout_Option = dataset2.AnnuityPayout_Option.Description;
							dataset2.Life_Annuity_Guaranteed_For = dataset2.Life_Annuity_Guarenteed_For.Description;
						}
						dataset2.user_Role = gettype();
						$m.juci.dataset('personalForm', dataset2);
						//eventObject.data.Parent_Application_Number = appNo.secondAppNo;
						eventObject.data.Txn_Id = Math.floor(100000 + Math.random() * 900000);
						var plan_obj = {
							"Application_Number":dataset2.Application_Number,
							"Advisor_Code": eventObject.data.Advisor_Code,
							"Txn_Id":eventObject.data.Txn_Id,
							"Txn_Date":eventObject.data.Advisor_Code.Txn_Date ? eventObject.data.Advisor_Code.Txn_Date : new Date().getTime(),
							"SID":fname
						};
						var planDetails = new PDC_Plan_Details(plan_obj);
						PDC_Plan_Details.multipleInsert([planDetails], function(success_response) {
							//$m.logInfo("successfully inserted");
						}, function(failure_response) {
							$m.logError("Read failed -- " + JSON.stringify(failure_response));
							$m.alert("Error while inserting into database");
						}, function() {});
						 var Lead_id = utils.GetPref("Lead_ID");
					     if(Lead_id){
					     	setLeadData(Lead_id);
					     }else{
					     	$m.juci.dataset("hasLead",false);
					     }	
					} else {
						// Error
						var errMsg = response.error;
						$m.logError("Request Failed. Please try later. Reason - " + errMsg);
						$m.alert("Request Failed. Please try later");
					}
				}, appldata);
			} catch (e) {
				$m.alert("Error in processing the request!");
			}
		}
	}, function(error) {
		$m.logError("Unable to open database due to -- " + JSON.stringify(error));
		$m.alert("Error while opening databse");
	});
}

// Proposal View

function openLifeAssured(applicationnumber) {
	if (applicationnumber) {
		updatePersonalDataset(applicationnumber, function() {
			hideAll();
			currentView.show();
		});
	} else {
		hideAll();
		currentView.show();
	}
}

function updatePersonalDataset(applicationnumber, callback) {
	PDC_Customer_Details.SelectWithFilter(applicationnumber, function(success_response) {
		var resultObject = success_response.rows[0];
		applicationNumber = resultObject.Application_Number;
		changeSalutationPersonal(resultObject.LA_Gender);
		  if(resultObject.LA_Gender =="M"){
		  	utils.GetControl("LA_gender").toggle(0);
		  	$m.juci.dataset("occupation", obj.occupation);
		  }
		  else{
		  	utils.GetControl("LA_gender").toggle(1);
		  	$m.juci.dataset("occupation", obj.femaleOccupation);
		  }
		resultObject.LA_DOB = new Date(resultObject.LA_DOB);
		if (getAge(new Date(resultObject.LA_DOB)) < 18) {
			resultObject.IS_LA_PR_SAME = 'N';
			var isLaSame = juci.findById("isLaSame");
			isLaSame.findByClass("juci_switch2_bar")[0].disable();
		}
		var a = $m.juci.dataset("Annuity");
		if (a == 117 || a == 118) {
			$m.juci.findById("LifeAnnuity").disable();
			$m.juci.findById("AnnuityPayOpt").disable();
			$m.juci.findById("Annuity").show();
		} else if (a == 114) {
			$m.juci.findById("LifeAnnuity").enable();
			$m.juci.findById("AnnuityPayOpt").enable();
			$m.juci.findById("Annuity").show();
			var isLaSame = juci.findById("isLaSame");
			//isLaSame.findBylass("juci_switch2_bar")[0].disable();
		} else {
			$m.juci.findById("Annuity").hide();
		}
		if(resultObject.LA_Aadharno){
			var getTableValue = $m.getPref("aadharDataPrefTable_"+applicationNumber);
			if(getTableValue != undefined){
				$m.juci.dataset("hasLeadAadhar", true);
				$m.juci.dataset("aadhar_section", true);
				$m.juci.getControl("checkLA").value(true);
				$m.juci.dataset("checkLAaadhar",true);
				$m.putPref("AadharData",getTableValue);
				$m.savePref();
				$m.juci.dataset("AadharData",getTableValue);
			}
		}else{
			$m.juci.dataset("hasLeadAadhar", false);
		}
		resultObject.AnnuityPayout_Option = setValueFromOptions("AnnuityPayoutOption", {
			"Description": resultObject.AnnuityPayout_Option
		}, lAComparator);
		resultObject.Life_Annuity_Guarenteed_For = setValueFromOptions("LifeAnnuityGuaranteedFor", {
			"Description": resultObject.Life_Annuity_Guaranteed_For
		}, lAComparator);
		resultObject.Annuity_Payout_Mode = setValueFromOptions("AnnuityPayoutMode", {
			"Description": resultObject.Annuity_Payout_Mode
		}, lAComparator);
		resultObject.Annuity_Payments_By = setValueFromOptions("AnnuityPaymentsBy", {
			"Description": resultObject.Annuity_Payments_By
		}, lAComparator);
		resultObject.LA_Salutation = setValueFromOptions("salutation", {
			"LA_CODE": resultObject.LA_Salutation
		}, localLaComparator);
		resultObject.LA_MaritalStatus = setValueFromOptions("maritalStatus", {
			"LA_CODE": resultObject.LA_MaritalStatus
		}, localLaComparator);
		resultObject.LA_Education = setValueFromOptions("education", {
			"LA_CODE": resultObject.LA_Education
		}, localLaComparator);
		resultObject.LA_Occupation = setValueFromOptions("occupation", {
			"LA_CODE": resultObject.LA_Occupation
		}, localLaComparator);
		resultObject.LA_BANKACCPROOF = setValueFromOptions("bankAccountProof", {
			"LA_CODE": resultObject.LA_BANKACCPROOF
		}, localLaComparator);
		resultObject.LA_Nationality = setValueFromOptions("nationality", {
			"LA_CODE": resultObject.LA_Nationality
		}, localLaComparator);
		
		resultObject.LA_OccupationType = setValueFromOptions("occupationtype", {
			"LA_CODE": resultObject.LA_OccupationType
		}, localLaComparator);
		resultObject.LA_ResidentialStatus = setValueFromOptions("resendentialStatus", {
			"LA_CODE": resultObject.LA_ResidentialStatus
		}, localLaComparator);
		resultObject.LA_Citizenship = setValueFromOptions("citizenship", {
			"LA_CODE": resultObject.LA_Citizenship
		}, localLaComparator);
		resultObject.LA_IDProof = setValueFromOptions("IdProofs", {
			"LA_CODE": resultObject.LA_IDProof
		}, localLaComparator);
		if(resultObject.LA_OccupationSubOptions){
			var check_laOccSubType = resultObject.LA_OccupationSubOptions;
			if(check_laOccSubType == "PS" || check_laOccSubType =="PUS" || check_laOccSubType == "GS"){
				$m.juci.dataset("occupationSTypeOptions",obj.occupationSTypeOptions);
			}else{
				var gender = resultObject.LA_Gender;
				if(gender == "M"){
					$m.juci.dataset("occupationSTypeOptions",obj.occupationOTypeOptions);
				}else{
					$m.juci.dataset("occupationSTypeOptions",obj.femaleOccupationOTypeOptions);
				}
			}
			resultObject.LA_OccupationSubOptions = setValueFromOptions("occupationSTypeOptions", {
				"LA_CODE": resultObject.LA_OccupationSubOptions
			}, localLaComparator);
			la_occupationSSubOtions.show();
		}else{
			la_occupationSSubOtions.hide();
		}
		if (!resultObject.PR_IsRelianceEmp) {
			resultObject.PR_IsRelianceEmp = "N";
		}
		if (resultObject.PR_Gender == "") {
			resultObject.PR_Gender = "M";
		}
		if (resultObject.PR_Gender == 'M') {
			utils.GetControl("PR_gender").toggle(0);
			$m.juci.dataset("proposerSalutation", maleSalutation);
			$m.juci.dataset("relationOfTheProposer", Proposer_Male);
			$m.juci.dataset("occupation", obj.occupation);
		} else if (resultObject.PR_Gender == 'F') {
			utils.GetControl("PR_gender").toggle(1);
			$m.juci.dataset("proposerSalutation", femaleSalutation);
			$m.juci.dataset("relationOfTheProposer", Proposer_Female);
			$m.juci.dataset("occupation", obj.femaleOccupation);
		}
		if (resultObject.IS_LA_PR_SAME == 'N') {
			resultObject.PR_Salutation = setValueFromOptions("salutation", {
				"LA_CODE": resultObject.PR_Salutation
			}, localLaComparator);
			resultObject.PR_MaritalStatus = setValueFromOptions("maritalStatus", {
				"LA_CODE": resultObject.PR_MaritalStatus
			}, localLaComparator);
			resultObject.PR_Education = setValueFromOptions("education", {
				"LA_CODE": resultObject.PR_Education
			}, localLaComparator);
			resultObject.PR_Occupation = setValueFromOptions("occupation", {
				"LA_CODE": resultObject.PR_Occupation
			}, localLaComparator);
			resultObject.PR_BANKACCPROOF = setValueFromOptions("bankAccountProof", {
				"LA_CODE": resultObject.PR_BANKACCPROOF
			}, localLaComparator);
			resultObject.PR_Nationality = setValueFromOptions("nationality", {
				"LA_CODE": resultObject.PR_Nationality
			}, localLaComparator);
			resultObject.PR_LA_Relationship = setValueFromOptions("relationOfTheProposer", {
				"LA_CODE": resultObject.PR_LA_Relationship
			}, localLaComparator);
			resultObject.PR_OccupationType = setValueFromOptions("occupationtype", {
				"LA_CODE": resultObject.PR_OccupationType
			}, localLaComparator);
			resultObject.PR_ResidentialStatus = setValueFromOptions("resendentialStatus", {
				"LA_CODE": resultObject.PR_ResidentialStatus
			}, localLaComparator);
			resultObject.PR_Citizenship = setValueFromOptions("citizenship", {
				"LA_CODE": resultObject.PR_Citizenship
			}, localLaComparator);
			resultObject.PR_IDProof = setValueFromOptions("IdProofs", {
				"LA_CODE": resultObject.PR_IDProof
			}, localLaComparator);
			if(resultObject.PR_OccupationSubOptions){
				var check_laOccSubType = resultObject.PR_OccupationSubOptions;
				if(check_laOccSubType == "PS" || check_laOccSubType =="PUS" || check_laOccSubType == "GS"){
					$m.juci.dataset("occupationSTypeOptions",obj.occupationSTypeOptions);
				}else{
					var gender = resultObject.PR_Gender;
					if(gender == "M"){
						$m.juci.dataset("occupationSTypeOptions",obj.occupationOTypeOptions);
					}else{
						$m.juci.dataset("occupationSTypeOptions",obj.femaleOccupationOTypeOptions);
					}
				}
				resultObject.PR_OccupationSubOptions = setValueFromOptions("occupationSTypeOptions", {
					"LA_CODE": resultObject.PR_OccupationSubOptions
				}, localLaComparator);
				pr_occupationSSubOtions.show();
			}else{
				pr_occupationSSubOtions.hide();
			}
			if (resultObject.PR_LA_Relationship == "") {
				if (resultObject.PR_Gender == "M") {
					utils.GetControl("PR_gender").toggle(0);
					$m.juci.dataset("relationOfTheProposer", Proposer_Male);
				} else {
					utils.GetControl("PR_gender").toggle(1);
					$m.juci.dataset("relationOfTheProposer", Proposer_Female);
				}
			}
		}
		$m.juci.dataset('personalForm', resultObject);
		callback();
	}, function(failure_response) {
		$m.logError("Read failed -- " + JSON.stringify(failure_response));
		$m.alert("Error while fetching from database");
		callback();
	});
}

function openNominee() {
	/* Commented for now as validations gets applied
	var pd = $m.juci.getControl("pdForm1");
		pd.submit(); */
	scrollToTop();
	currentView.hide();
	NextView.show();
}

function openOtp(proposer) {
	utils.ShowProgress("Loading OTP...");
	var aadhar;
	var proposer = utils.GetPref("Proposer");
	var callback = function(){
		utils.HideDialog("authentication");
		utils.ShowDialog("dialog-aadhaar");
	};
	if (proposer == 'LA') {
		aadhar = $m.juci.getControl("LA_aadhar").value();
	} else {
		aadhar = $m.juci.getControl("PR_aadhar").value();
	}
	if (aadhar) {
		$m.juci.dataset("aadharno", aadhar);
		getOtp(aadhar,callback);
	} else {
		$m.alert("Please enter Aadhar number");
	}
}

function resendOtp() {
	utils.ShowProgress("Loading OTP...");
	var proposer = utils.GetPref("Proposer");
	var aadhar;
	var Callback = function(){
		utils.HideDialog("dialog-aadhaar");
		utils.ShowDialog("dialog-aadhaar");
	};
	if (proposer == 'LA') {
		aadhar = juci.getControl("LA_aadhar").value();
	} else {
		aadhar = juci.getControl("PR_aadhar").value();
	}
	if (aadhar) {
		$m.juci.dataset("aadharno", aadhar);
		getOtp(aadhar,Callback);
	} else {
		$m.alert("Please enter Aadhar number");
	}
}

function sendOtp(){
	utils.ShowProgress("Fetching Aadhaar Details...");
	var proposer = utils.GetPref("Proposer");
	var aadhar,aadharResultPref,aadharResultPref,aadharDataPref,aadharDataset,dialogAuthenticate;
	var	otpId = "otpNo";
	var	dialogid = "dialog-aadhaar";
	var	Otp = juci.getControl("otpNo").value();
	if (proposer == 'LA') {
		aadhar = juci.getControl("LA_aadhar").value();
		aadharResultPref = "Aadhar_resultLA_";
		aadharDataPref = "Adhar_dataLA_";
		dataset = "AadharData";  
		aadharDataset = "aadhar_section";
	} else {
		aadhar = juci.getControl("PR_aadhar").value();
		aadharResultPref = "Aadhar_resultPR_";
		aadharDataPref = "Adhar_dataPR_";
		dataset = "AadharPr_Data";
		aadharDataset = "aadhar_section2";
	}
   sendAadhaarOtp(aadhar,Otp,dialogid,otpId,aadharResultPref,aadharDataPref,proposer,dataset,aadharDataset,dialogAuthenticate);
}

function sendAadhaarOtp(aadhar,Otp,dialogid,otpId,aadharResultPref,aadharDataPref,proposer,dataset,aadharDataset,dialogAuthenticate) {
	if (!Otp) {
		$m.alert("Please enter Otp");
		return false;
	}
	var callback = function(response) {
		var aadhar_result = response.data;
		utils.PutPref(aadharResultPref + applicationNumber, aadhar_result);
		var result = x2js.xml_str2json(response.data);
		var Adhar_data =result.Envelope.Body.Production_EkycThroughOTP_RDserviceResponse.Production_EkycThroughOTP_RDserviceResult.KeyValueOfstringstring;
		if (Adhar_data.Value) {
			var validation = checkValidation(Adhar_data,otpId);
				if(!validation){
					$m.juci.dataset(aadharDataset, false);
					return;
				}
			}
		aadharObject = setValues(Adhar_data);
		var Address = checkAddress(dialogid,aadharObject,otpId);
		if(!Address){
			$m.juci.dataset(aadharDataset, false);
			return;
		}
		//saveimage(aadharObject.Photo, proposer);
		utils.PutPref(aadharDataPref + applicationNumber, aadharObject);
		var Aadhar_data = setAadharData(aadharObject);
		if (aadharObject.Name) {
			var aadharDate = new Date(changeFormat(aadharObject.DOB));
			if(aadharDate.getDate() == "01" && aadharDate.getMonth() == "0"){
					$m.alert("Invalid Aadhaar Number");
					return;
				}
			$m.juci.dataset(dataset, Aadhar_data);
			$m.putPref("aadharDataPrefTable_"+applicationNumber, Aadhar_data);
			$m.savePref();
			$m.juci.dataset(aadharDataset, true);
			$m.juci.dataset("aadharMandatoryFlag",true);
			$m.juci.getControl("checkLA").value(true);
			$m.juci.dataset("checkLAaadhar",true);
			$m.juci.dataset("hasLeadAadhar", true);
			fetchLAAadharDetails();	
			//utils.HideDialog(dialogAuthenticate);
			utils.HideDialog(dialogid);
			$m.hideProgress();
		} else {
			$m.hideProgress();
			juci.getControl(otpId).value(null);
			$m.alert("Your Aadhar No is Invalid");
			return;
		}
		juci.getControl(otpId).value(null);
	}
	AadharServices.VerifyOtp(Otp, aadhar, callback);
}

function sendfingerPrint(res){
	utils.ShowProgress("Fetching Aadhaar Details");
	var proposer = utils.GetPref("Proposer");
	var aadharResultPref,aadharResultPref,aadharDataPref,aadharDataset;
	var dialogFingerPrint = "dialog-fingerprint";
	var dialogid = "authentication";
	if (proposer == 'LA') {
		aadharResultPref = "Aadhar_resultLA_";
		aadharDataPref = "Adhar_dataLA_";
		dataset = "AadharData";
		aadharDataset = "aadhar_section";
	} else {
		aadharResultPref = "Aadhar_resultPR_";
		aadharDataPref = "Adhar_dataPR_";
		dataset = "AadharPr_Data";
		aadharDataset = "aadhar_section2";
	}
   sendBiometric(dialogid,aadharResultPref,aadharDataPref,proposer,dataset,aadharDataset,dialogFingerPrint,res);
}

function sendBiometric(dialogid,aadharResultPref,aadharDataPref,proposer,dataset,aadharDataset,dialogFingerPrint,res) {
	var pidData = res;
	if(pidData){
	//pidData = pidData.ECSUidaiRequestData;
	//var aadhaarCallback = function(response) {
		var resultData = res.data;
		utils.PutPref(aadharResultPref + applicationNumber, resultData);
		var result = x2js.xml_str2json(resultData);
		var Adhar_data =  result.Envelope.Body.Production_EkycThroughBiometricForRegisteredDeviceResponse.Production_EkycThroughBiometricForRegisteredDeviceResult.KeyValueOfstringstring;
		if (Adhar_data.Value) {
		var validation = checkValidation(Adhar_data,"",dialogFingerPrint);
			if(!validation){
				$m.juci.dataset(aadharDataset, false);
				return;
			}
		}
		aadharObject = setValues(Adhar_data);
		var Address = checkAddress("dialog-fingerprint",aadharObject,"");
	    if(!Address){
	    	$m.juci.dataset(aadharDataset, false);
	    	return;
		}	
		//saveimage(aadharObject.Photo, proposer);
		utils.PutPref(aadharDataPref + applicationNumber, aadharObject);
		var Aadhar_data = setAadharData(aadharObject);
		if (aadharObject["Name"]) {
			var aadharDate = new Date(changeFormat(aadharObject.DOB));
			if(aadharDate.getDate() == "01" && aadharDate.getMonth() == "0"){
					$m.alert("Invalid Aadhaar Number");
					return;
				}
			$m.juci.dataset(dataset, Aadhar_data);
			$m.juci.dataset(aadharDataset, true);
			$m.juci.dataset("aadharMandatoryFlag",true);
			$m.juci.getControl("checkLA").value(true);
			$m.juci.dataset("checkLAaadhar",true);
			$m.juci.dataset("hasLeadAadhar", true);
			fetchLAAadharDetails();	
			utils.HideDialog(dialogFingerPrint);
			utils.HideProgress();
		} 
	  //}
	//AadharServices.ValidateBiometric(pidData, aadhaarCallback);
	}
	else{
		$m.alert("Please do biometric authentication");
		return;
	}
}

function backToProposal() {
	scrollToTop();
	var requestdata = $m.juci.dataset('personalForm');
	openLifeAssured(requestdata.Application_Number)
}

// Proposal View ending

//Family History starting

function closebox() {
	juci.hideDialog("dialog-aadhaar");
	juci.getControl("otpNo").value(null);
}

function closeadhar() {
	juci.hideDialog("dialog-aadhar");
	juci.getControl("otp-aadhar").value(null);

}
var member = {
	"aliveOrNot": "N",
	"familyMember": "",
	"currentage": "",
	"diseaseSuffering": "",
	"ageOfDiagnosis": "",
	"causeOfDeath": "",
	"ageatdeath": ""
};
$m.juci.addDataset("addDiseaseDetailsTable", member);

function addMember() {
	$m.juci.dataset("addDiseaseDetailsTable", member);
	juci.showDialog("dialog-boxFamily");
	//    if ($m.getPref("member")) {
	//        juci.findByClass("juci_selectbox_options_panel")[0].el.style.display = "block";
	//       juci.findByClass("juci_selectbox_options_panel")[1].el.style.display = "block";
	//    }
}

function removeFamily() {
	juci.hideDialog("dialog-boxFamily");
	//     $m.juci.dataset("addDiseaseDetailsTable", member);
	juci.findByClass("juci_selectbox_options_panel")[0].el.style.display = "none";
	juci.findByClass("juci_selectbox_options_panel")[1].el.style.display = "none";
}

var familyindex = "";
var familyarray = [];

function addFamilyMember(e) {
	var data = e.data;
	familyarray = $m.juci.dataset("diseaseDetailsTable");
	for (var i = 0; i < familyarray.length; i++) {
		if (familyarray[i]["familyMember"]["LA_CODE"] === data["familyMember"]["LA_CODE"]) {
			$m.alert("Same relation can't be added twice");
			return;
		}
	}
	if (familyindex !== "") {
		familyarray[familyindex] = data;
		$m.juci.dataset("diseaseDetailsTable", familyarray);
		familyindex = "";
	} else {
		familyarray.push(data);
		$m.juci.dataset("diseaseDetailsTable", familyarray);
	}
	juci.hideDialog("dialog-boxFamily");
	if (juci.findByClass("juci_selectbox_options_panel")[0]) {
		juci.findByClass("juci_selectbox_options_panel")[0].el.style.display = "block";

	}
	if (juci.findByClass("juci_selectbox_options_panel")[1]) {
		juci.findByClass("juci_selectbox_options_panel")[1].el.style.display = "block";

	}
	$m.putPref("member", true);
	$m.savePref();
}


function changeage(age, deathage) {
	if (age() === "") {
		return deathage();
	}
	if (age() === " ") {
		return deathage();
	} else {
		return age();
	}

}

function deleteDetails(event) {
	event.preventDefault();
	$m.confirm({
		"title": "Confirm",
		"message": "Are you sure you want to delete?",
		"buttons": [{
			"label": "Yes"
		}, {
			"label": "No"
		}]
	}, function(index) {
		// Code to execute when the confirm dialog dismisses
		if (index == 0) {
			// Yes

			event.control.removeItemAt(event.index);
			familyarray.splice(event.index, 1)

		} else if (index == 1) {
			// No
		}
	});
}

function changeStatus(live) {
	if (live() == "Y") {
		return "Living";
	} else {
		return "Died";
	}
}

function changeProblem(cause, problem) {
	if (cause() === "") {
		return problem().Description();
	} else {
		return cause;
	}
}

function backToNominee() {
	navigateTo("nominee");
}

function back() {
	//To do
}

//Family History Ending

//Life Insurance details Starting

function openInsuranceDetails() {
	var pd = $m.juci.getControl("fhForm");
	pd.submit();

	//	FamilyView.hide();
	//	InsuranceView.show();
}

function openExistingInsurancaForm() {
	$m.juci.dataset("addExistingInsurance", ExistingInsurance);
	juci.showDialog("dialog-boxExistingInsuranceForm");
}


function editDetails(e) {
	juci.showDialog("dialog-boxFamily");
	$m.juci.dataset("addDiseaseDetailsTable", e.data);
	familyindex = e.index;
	if ($m.getPref("member")) {
		if (juci.findByClass("juci_selectbox_options_panel")[0]) {
			juci.findByClass("juci_selectbox_options_panel")[0].el.style.display = "block";

		}
		if (juci.findByClass("juci_selectbox_options_panel")[1]) {
			juci.findByClass("juci_selectbox_options_panel")[1].el.style.display = "block";

		}
	}
}

var ExistingInsurance = {
	"companyName": "",
	"contractproposalno": "",
	"basicsumassured": "",
	"sumassuredunderrisk": "",
	"riskcommencementdate": "",
	"presentStatus": ""
};
$m.juci.addDataset("addExistingInsurance", ExistingInsurance);

var insuranceindex = "";
var insurancearray = [];

function saveInsurance(e) {
	var data = e.data;
	insurancearray = $m.juci.dataset("lifeInsuranceTable");
	if (insuranceindex !== "") {
		insurancearray[insuranceindex] = data;
		$m.juci.dataset("lifeInsuranceTable", insurancearray);
		insuranceindex = "";
	} else {
		insurancearray.push(data);
		$m.juci.dataset("lifeInsuranceTable", insurancearray);
	}
	juci.hideDialog("dialog-boxExistingInsuranceForm");
}

function closeInsuranceform() {
	juci.hideDialog("dialog-boxExistingInsuranceForm");
}

function editInsuranceDetails(e) {
	juci.showDialog("dialog-boxExistingInsuranceForm");
	$m.juci.dataset("addExistingInsurance", e.data);
	insuranceindex = e.index;
}

function deleteInsuranceDetails(event) {
	event.preventDefault();
	$m.confirm({
		"title": "Confirm",
		"message": "Are you sure you want to delete?",
		"buttons": [{
			"label": "Yes"
		}, {
			"label": "No"
		}]
	}, function(index) {
		// Code to execute when the confirm dialog dismisses
		if (index == 0) {
			// Yes
			event.control.removeItemAt(event.index);
			insurancearray.splice(event.index, 1);
		} else if (index == 1) {
			// No
		}
	});
}

function openLifeStyle() {
	//	InsuranceView.hide();
	//	LifeStyleView.show();
}

function backToFamilyhistory() {
	navigateTo("family");
}

function backToLifeinsurance() {
	navigateTo("lifeinsurence");
}

//Vernacular Details starting

function openVernacularDetails() {
	navigateTo("declaration");
}

function openDeclarations() {
	navigateTo("declaration");
}

function backToConfidential() {
	navigateTo("confidentail");
}

function backToLifestyle() {
	var planCode = $m.getPref("planDetails");
	if (planCode.PLanCode == 114) {
		navigateTo("lifeinsurence");
	} else {
		navigateTo("lifestyle");
	}
}

//Declaration Details


function clickHere() {
	$m.juci.findById("insuranceRepository").show();
	$m.juci.findById("id-proofs").show();
}

function insuranceRepositoryChange(event) {
	var x = $m.juci.findById("insuranceDropDown");
	x.html(event.value.Description());
}

function eInsuranceAccountQues(event) {
	var account = event.value;
	if (account === "Y") {
		$m.juci.findById("eInsuranceAccountNumber").show();
		$m.juci.findById("insuranceAccount").hide();
	} else {
		$m.juci.findById("eInsuranceAccountNumber").hide();
		$m.juci.findById("insuranceAccount").show();
	}
}

function openConfidentialDetails() {
	var pd = $m.juci.getControl("pdForm7");
	pd.submit();
}

function backToVernacular() {
	navigateTo("vernacular");
}

function backToConfidential() {

	navigateTo("confidentail");
}

//Confidential Details

function openPrepayment() {
	var pd = $m.juci.getControl("pdForm8");
	pd.submit();
}

function backToDeclaration() {
	navigateTo("declaration");
}

function backToProposolFulfilment() {
	navigateTo("personal");
}

function openPaymentOption() {
	prepaymentreview.hide();
	navigateTo("payment");
	$m.juci.addDataset("offlinePayment", []);
	utils.GetControl("toogle").toggle(3);
}

function toggleView(e) {
	proposalFulfilmentView.hide();
	prepaymentreview.hide();
	paymentoptions.hide();
	selfieVideo.hide();
	documentsupload.hide();
	switch (e.newToggled) {
		case 0:
			break;
		case 1:
			//	proposalFulfilmentView = juci.findById("proposalFulfilment");
			proposalFulfilmentView.show();
			backToProposal();
			break;
		case 2:
			prepaymentreview.show();
			break;
		case 3:
			paymentoptions.show();
			break;
		case 4:
			documentsupload.show();
			break;
	}
}

function toggleLangView(e) {
	englishLang.hide();
	hindiLang.hide();
	tamilLang.hide();
	switch (e.newToggled) {
		case 0:
			englishLang.show();
			break;
		case 1:
			hindiLang.show();
			break;
		case 2:
			tamilLang.show();
			break;
	}
}


function toggleLanguageView(e) {
	englishLanguage.hide();
	hindiLanguage.hide();
	tamilLanguage.hide();
	switch (e.newToggled) {
		case 0:
			englishLanguage.show();
			break;
		case 1:
			hindiLanguage.show();
			break;
		case 2:
			tamilLanguage.show();
			break;
	}
}

function getFormattedGender(gender) {
	if (gender == "Male" || gender == "male" || gender == "M") {
		return 'M';
	} else if (gender == "Female" || gender == "female" || gender == "F") {
		return 'F';
	}
}

function getAge(dateString) {
	var today = new Date();
	var birthDate = new Date(dateString);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}



function loadNomineeDetails(applicationNumber) {
	$m.juci.dataset("nomineeOrAppointeeDetailsForm", bindingObject.PDC_Customer_Details);
	var nomineeQues = juci.findById("nominee-data");

	nomineeQues.findByClass("juci_switch2_bar")[0].disable();
	var planData = $m.getPref("planDetails_" + applicationNumber);
	if (planData.PLanCode == "122" || planData.PLanCode == "128" || planData.PLanCode == "129" || planData.PLanCode == "123" || planData.PLanCode == "127" || planData.PLanCode == "141") {
		nomineeQues.findByClass("juci_switch2_bar")[0].enable();
	}
	new window.DB(CONSTANTS.DBName, function(dbHelper) {
		window.dbHelper = dbHelper;
		if (applicationNumber) {
			PDC_Customer_Details.SelectWithFilter(applicationNumber, function(success_response) {
				var resultObject = success_response.rows[0];

				if (resultObject.Child_Proposar_Relation && !resultObject.NOM_LA_Relationship) {
					resultObject.NOM_LA_Relationship = getLACODEfromChildLARelation(resultObject.Child_Proposar_Relation);
				}
				resultObject.NOM_DOB = resultObject.NOM_DOB ? new Date(resultObject.NOM_DOB) : resultObject.Child_DOB ? new Date(resultObject.Child_DOB) : "";
				showAppointee(resultObject.NOM_DOB);
				resultObject.Child_DOB = resultObject.Child_DOB ? new Date(resultObject.Child_DOB) : "";
				resultObject.NOM_Name = resultObject.NOM_Name ? resultObject.NOM_Name : resultObject.Child_Name ? resultObject.Child_Name : "";
				resultObject.NOM_Name = resultObject.NOM_Name.replace(/-/g, " ");
				resultObject.NOM_Gender = resultObject.NOM_LA_Relationship ? (resultObject.Child_Proposar_Relation ? getGender(resultObject.Child_Proposar_Relation) : resultObject.NOM_Gender) : resultObject.NOM_Gender;
				if (resultObject.NOM_Gender == "M") {
					//	$m.juci.dataset("nomineeSalutation", maleSalutation);
					//	$m.juci.dataset("relationOfTheNominee", AppointeeMalerelationship);
					utils.GetControl("Nom_gender").toggle(0);
					resultObject.NOM_Salutation = resultObject.NOM_Salutation ? setValueFromOptions("nomineeSalutation", {
						"LA_CODE": resultObject.NOM_Salutation
					}, localLaComparator) : setValueFromOptions("nomineeSalutation", {
						"LA_CODE": 'MR'
					}, localLaComparator);

				} else if (resultObject.NOM_Gender == "F") {
					utils.GetControl("Nom_gender").toggle(1);
					$m.juci.dataset("nomineeSalutation", femaleSalutation);
					$m.juci.dataset("relationOfTheNominee", AppointeeFemalerelationship);
					resultObject.NOM_Salutation = resultObject.NOM_Salutation ? setValueFromOptions("nomineeSalutation", {
						"LA_CODE": resultObject.NOM_Salutation
					}, localLaComparator) : setValueFromOptions("nomineeSalutation", {
						"LA_CODE": 'MISS'
					}, localLaComparator);
				}
				if (resultObject.Child_Proposar_Relation) {
					juci.getControl("nomtog").disable();
				} else {
					juci.getControl("nomtog").enable();
				}
				if (resultObject.Child_Proposar_Relation) {
					juci.getControl("nomtog1").disable();
				} else {
					juci.getControl("nomtog1").enable();
				}
				if (resultObject.Child_Proposar_Relation) {
					juci.getControl("uneditablenn").disable();
				} else {
					juci.getControl("uneditablenn").enable();
				}
				if (resultObject.Child_Proposar_Relation) {
					juci.getControl("uneditabledob").disable();
				} else {
					juci.getControl("uneditabledob").enable();
				}
				if (resultObject.Child_Proposar_Relation) {
					juci.getControl("uneditablerel").disable();
				} else {
					juci.getControl("uneditablerel").enable();
				}
				resultObject.NOM_LA_Relationship = resultObject.NOM_LA_Relationship ? setValueFromOptions("relationOfTheNominee", {
					"LA_CODE": resultObject.NOM_LA_Relationship
				}, localLaComparator) : resultObject.Child_Proposar_Relation ? setValueFromOptions("relationOfTheNominee", {
					"LA_CODE": getLACODEfromChildLARelation(resultObject.Child_Proposar_Relation)
				}, localLaComparator) : resultObject.NOM_LA_Relationship;
				if (resultObject.NOM_LA_Relationship == "") {

					if (resultObject.NOM_Gender == "M") {
						$m.juci.dataset("nomineeSalutation", maleSalutation);
						$m.juci.dataset("relationOfTheNominee", AppointeeMalerelationship);

					} else {
						$m.juci.dataset("nomineeSalutation", femaleSalutation);
						$m.juci.dataset("relationOfTheNominee", AppointeeFemalerelationship);
					}
				}
				if (resultObject.Child_Proposar_Relation) {
					juci.findById("uneditablerel").disable();
				}

				resultObject.APP_Gender = resultObject.APP_Gender ? resultObject.APP_Gender : "M";
				resultObject.APP_NOM_Relationship = resultObject.APP_NOM_Relationship ? setValueFromOptions("appointeeRelationship", {
					"LA_CODE": resultObject.APP_NOM_Relationship
				}, localLaComparator) : resultObject.APP_NOM_Relationship;
				if (resultObject.APP_NOM_Relationship == "") {
					if (resultObject.APP_Gender == "M") {
						$m.juci.dataset("appointeeRelationship", AppointeeMalerelationship);
					} else {
                        utils.GetControl("App_gender").toggle(1);
						$m.juci.dataset("appointeeRelationship", AppointeeFemalerelationship);
					}
				}
				if (resultObject.APP_Gender == "M") {
					utils.GetControl("App_gender").toggle(0);
					$m.juci.dataset("appointeeSalutation", maleSalutation);
					$m.juci.dataset("appointeeRelationship", AppointeeMalerelationship);
					resultObject.APP_Salutation = resultObject.APP_Salutation ? setValueFromOptions("appointeeSalutation", {
						"LA_CODE": resultObject.APP_Salutation
					}, localLaComparator) : setValueFromOptions("appointeeSalutation", {
						"LA_CODE": 'MR'
					}, localLaComparator);
				} else if (resultObject.APP_Gender == "F") {
					utils.GetControl("App_gender").toggle(1);
					$m.juci.dataset("appointeeSalutation", femaleSalutation);
					$m.juci.dataset("appointeeRelationship", AppointeeFemalerelationship);
					resultObject.APP_Salutation = resultObject.APP_Salutation ? setValueFromOptions("appointeeSalutation", {
						"LA_CODE": resultObject.APP_Salutation
					}, localLaComparator) : setValueFromOptions("appointeeSalutation", {
						"LA_CODE": 'MISS'
					}, localLaComparator);
				}
				if (resultObject.APP_DOB) {
					resultObject.APP_DOB = new Date(resultObject.APP_DOB);
				}
				resultObject.APP_NOM_AddressSame = resultObject.APP_NOM_AddressSame ? resultObject.APP_NOM_AddressSame : "Y";
				$m.juci.dataset('nomineeOrAppointeeDetailsForm', resultObject);
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

function familyHistory(applicationNumber) {
	$m.juci.dataset("familyHistoryForm", bindingObject.familyHistory);
	$m.juci.dataset("diseaseDetailsTable", []);
	new window.DB(CONSTANTS.DBName, function(dbHelper) {
		window.dbHelper = dbHelper;
		if (applicationNumber) {
			$m.juci.dataset("Application_Number", applicationNumber);
			PDC_LifeStyle_Details.SelectWithFilter(applicationNumber, function(success_response) { //Edit 29-10-2015
				var resultObject = success_response.rows[0]; //Edit 29-10-2015
				if (resultObject) {
					var illnessConditions = resultObject.FHistory_FamilyDied_YN; //Edit 29-10-2015
				}
				$m.juci.dataset('lifeStyleQuestionsForm', resultObject);
				PDC_FAMILYHISTORY_Details.SelectWithFilter(applicationNumber, function(success_response) {
					var resultArray = success_response.rows;
					var familyArray = [];
					resultArray.forEach(function(obj) {
						var currentObject = {};
						currentObject.lifetobeassuredorproposer = obj.FHID_LA_PRPOSER;
						currentObject.familyMember = setValueFromOptions("familyMember", {
							"LA_CODE": obj.FHID_FAMILEMEMBER
						}, localLaComparator);
						currentObject.causeOfDeath = obj.IS_FAMILYMEMBERALIVE == 'N' ? setValueFromOptions("causeOfDeath", {
							"LA_CODE": obj.FHID_CAUSEOFDEATH
						}, localLaComparator) : "";
						currentObject.currentage = obj.FHID_CURRENTAGEIFALIVE;
						currentObject.ageatdeath = obj.FHID_DEATHAGEIFDECEASED;
						currentObject.diseaseSuffering = obj.IS_FAMILYMEMBERALIVE == 'Y' ? obj.FHID_CAUSEOFDEATH : "";
						currentObject.ageOfDiagnosis = obj.FH_AGEATDIAGNOSIS;
						currentObject.aliveOrNot = obj.IS_FAMILYMEMBERALIVE;
						familyArray.push(currentObject);
					});
					var familyObject = {
						"illnessConditions": illnessConditions, //resultArray.length ? 'Y' : 'N', Edit 29-10-2015
					};
					if (familyArray.length) {
						familyObject.illnessConditions = "Y";
					}
					$m.juci.dataset('familyHistoryForm', familyObject);
					$m.juci.dataset("diseaseDetailsTable", familyArray);
				}, function(failure_response) {
					$m.logError("Read failed -- " + JSON.stringify(failure_response));
					$m.alert("Error while fetching from database");
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

function loadInsurenceDetails(applicationNumber) {
	$m.juci.dataset("lifeInsuranceTable", []);
	$m.juci.dataset("lifeInsuranceForm", bindingObject.lifeInsurance);
	$m.juci.dataset("lifeStyleQuestionsForm", bindingObject.PDC_LifeStyle_Details);
	new window.DB(CONSTANTS.DBName, function(dbHelper) {
		window.dbHelper = dbHelper;
		if (applicationNumber) {
			$m.savePref();
			var data = $m.getPref("customerDetails");
			$m.juci.dataset("PersonalDetails", data);
			PDC_LifeStyle_Details.SelectWithFilter(applicationNumber, function(success_response) {
				var lifeResultObject = success_response.rows[0];
				$m.juci.dataset('lifeStyleQuestionsForm', lifeResultObject);
				PDC_EXISITINGPOLICIES_Details.SelectWithFilter(applicationNumber, function(success_response) {
					var resultArray = success_response.rows;
					var lifeInsuranceArray = [];
					resultArray.forEach(function(obj) {
						var currentObject = {};
						currentObject.lifetobeassuredorproposer = obj.DETAILS_LA_PROPOSER;
						currentObject.companyName = setValueFromOptions("companyName", {
							"LA_CODE": obj.COMPANYNAME
						}, localLaComparator);
						currentObject.contractproposalno = obj.CONTRACT_PROPOSALNO;
						currentObject.basicsumassured = obj.BASIC_SUM_ASSURED;
						currentObject.sumassuredunderrisk = obj.SUM_ASSURED_URIDER;
						currentObject.riskcommencementdate = obj.RISK_COMMENCE_DATE ? new Date(obj.RISK_COMMENCE_DATE) : obj.RISK_COMMENCE_DATE;
						currentObject.presentStatus = setValueFromOptions("presentStatus", {
							"LA_CODE": obj.Present_Status
						}, localLaComparator);
						lifeInsuranceArray.push(currentObject);
					});
					var lifeInsuranceObject = {
						"insurancePolicyHeld": resultArray.length ? 'Y' : 'N',
						"parentsInsurance": lifeResultObject.ParentInsuranceDetails_SA,
						"nameOfTheHusbandOrParent": lifeResultObject.NameoftheHusbandParent,
						"totalSAOnLifeOfHusbandOrParent": lifeResultObject.TotalSAontheHusband
					};
					$m.juci.dataset('lifeInsuranceForm', lifeInsuranceObject);
					$m.juci.dataset("lifeInsuranceTable", lifeInsuranceArray)
				}, function(failure_response) {
					$m.logError("Read failed -- " + JSON.stringify(failure_response));
					$m.alert("Error while fetching from database");
				});
			}, function(failure_response) {
				$m.logError("Read failed -- " + JSON.stringify(failure_response));
				$m.alert("Error while fetching from database");
			});
			$m.juci.dataset("genderForParentOrHusband", $m.getPref("customerDetails").LA_Gender);
		}
	}, function(error) {
		$m.logError("Unable to open database due to -- " + JSON.stringify(error));
		$m.alert("Error while opening database");
	});
}

function loadLifeStyle(applicationNumber) {
	$m.juci.dataset("lifeStyleQuestionsForm", bindingObject.PDC_LifeStyle_Details);
	new window.DB(CONSTANTS.DBName, function(dbHelper) {
		window.dbHelper = dbHelper;
		if (applicationNumber) {
			PDC_LifeStyle_Details.SelectWithFilter(applicationNumber, function(success_response) {
				if (success_response.rows.length) {
					var resultObject = success_response.rows[0];
					if (resultObject.QsLS_27_TravelOutsideIndia_YN == 'Y')
						resultObject.QsLS_27_TravelOutsideIndia_Purpose = setValueFromOptions("purposeOfVisit", {
							"LA_CODE": resultObject.QsLS_27_TravelOutsideIndia_Purpose
						}, localLaComparator);
					resultObject.QsLS_27_TravelOutsideIndia_Country = setValueFromOptions("countryList", {
						"LA_CODE": resultObject.QsLS_27_TravelOutsideIndia_Country
					}, localLaComparator);
					if (resultObject.QsLS_35_Pregnant_YN == 'Y')
						resultObject.QsLS_35_Pregnant_ExpDeliveryDT = new Date(resultObject.QsLS_35_Pregnant_ExpDeliveryDT);
					try {
						resultObject.QsLS_28a_Smoke_Cigarettes_YN = resultObject.QsLS_28a_Smoke_Cigarettes_YN ? resultObject.QsLS_28a_Smoke_Cigarettes_YN : "N"
						resultObject.QsLS_28a_Smoke_ECigarettes_YN = resultObject.QsLS_28a_Smoke_ECigarettes_YN ? resultObject.QsLS_28a_Smoke_ECigarettes_YN : "N";
						resultObject.QsLS_28a_Smoke_Beedi_YN = resultObject.QsLS_28a_Smoke_Beedi_YN ? resultObject.QsLS_28a_Smoke_Beedi_YN : "N";
						resultObject.QsLS_28a_Smoke_Chew_YN = resultObject.QsLS_28a_Smoke_Chew_YN ? resultObject.QsLS_28a_Smoke_Chew_YN : "N";
						resultObject.QsLS_28a_Smoke_Gutka_YN = resultObject.QsLS_28a_Smoke_Gutka_YN ? resultObject.QsLS_28a_Smoke_Gutka_YN : "N";
						resultObject.QsLS_28a_Smoke_OTH_YN = resultObject.QsLS_28a_Smoke_OTH_YN ? resultObject.QsLS_28a_Smoke_OTH_YN : "N";
						resultObject.QsLS_28b_Alcohol_Beer_YN = resultObject.QsLS_28b_Alcohol_Beer_YN ? resultObject.QsLS_28b_Alcohol_Beer_YN : "N";
						resultObject.QsLS_28b_Alcohol_Wine_YN = resultObject.QsLS_28b_Alcohol_Wine_YN ? resultObject.QsLS_28b_Alcohol_Wine_YN : "N";
						resultObject.QsLS_28b_Alcohol_HardLiquor_YN = resultObject.QsLS_28b_Alcohol_HardLiquor_YN ? resultObject.QsLS_28b_Alcohol_HardLiquor_YN : "N";
						resultObject.QsLS_28b_Alcohol_OTH_YN = resultObject.QsLS_28b_Alcohol_OTH_YN ? resultObject.QsLS_28b_Alcohol_OTH_YN : "N";
						resultObject.QsLS_35_Pregnant_YN = resultObject.QsLS_35_Pregnant_YN ? resultObject.QsLS_35_Pregnant_YN : "N";

						$m.juci.dataset('lifeStyleQuestionsForm', resultObject);
						utils.PutPref("Questionaries",resultObject);
					} catch (e) {
						console.log(e);
					}
				}
			}, function(failure_response) {
				$m.logError("Read failed -- " + JSON.stringify(failure_response));
				$m.alert("Error while fetching from database");
			});
			$m.juci.dataset("genderForPregnant", $m.getPref("customerDetails").LA_Gender);
			if ($m.getPref("customerDetails").LA_Gender == 'F') {
				$m.juci.getControl("pregnant-months").clearValidation();
				$m.juci.getControl("delivery-date").clearValidation();
			}
		}
	}, function(error) {
		$m.logError("Unable to open database due to -- " + JSON.stringify(error));
		$m.alert("Error while opening database");
	});
}

function loadVernacular(applicationNumber) {
	$m.juci.dataset("vernacularOrUneducatedForm", bindingObject.PDC_LifeStyle_Details);
	new window.DB(CONSTANTS.DBName, function(dbHelper) {
		window.dbHelper = dbHelper;
		if (applicationNumber) {
			var declarant_Name = $m.getPref("customerDetails").LA_Name;
			PDC_LifeStyle_Details.SelectWithFilter(applicationNumber, function(success_response) {
				var resultObject = success_response.rows[0];
				resultObject.Declarant_Name = declarant_Name ? declarant_Name : "";
				resultObject.Witness_Date = resultObject.Witness_Date ? new Date(resultObject.Witness_Date) : new Date();
				resultObject.Declarant_Date = resultObject.Declarant_Date ? new Date(resultObject.Declarant_Date) : new Date();
				$m.juci.dataset('vernacularOrUneducatedForm', resultObject);
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

function loadDecalration(applicationNumber) {
	juci.getControl("insurence").value(null);
	$m.juci.dataset("signatureForm", bindingObject.PDC_LifeStyle_Details);
	var signForm = juci.dataset('signatureForm');
	if (signForm.EInsurance_Free == "Y") {
		if ($m.getPref("idValue")) {
			signForm.idvalue = {
				idvalue: $m.getPref("idValue")
			};
		} else {
			signForm.idvalue = juci.dataset("idProofs")[0];
		}
		juci.dataset("signatureForm", signForm);
	}
	var declarant_Name = $m.getPref("customerDetails").LA_Name;
	new window.DB(CONSTANTS.DBName, function(dbHelper) {
		window.dbHelper = dbHelper;
		if (applicationNumber) {
			PDC_LifeStyle_Details.SelectWithFilter(applicationNumber, function(success_response) {
				var resultObject = success_response.rows[0];
				resultObject.Ins_Repository_Type = setValueFromOptions("insuranceRepository", {
					"LA_CODE": resultObject.Ins_Repository_Type
				}, localLaComparator);
				resultObject.Ins_Repository_YN = resultObject.Ins_Repository_YN ? resultObject.Ins_Repository_YN : "N";
//				resultObject.LA_PR_NAME = declarant_Name ? declarant_Name : "";
//				resultObject.PDC_Completion_Date = resultObject.PDC_Completion_Date ? parseInt(resultObject.PDC_Completion_Date):"";
//				resultObject.PDC_Completion_Date = resultObject.PDC_Completion_Date ? new Date(resultObject.PDC_Completion_Date) : "";
				$m.juci.dataset('signatureForm', resultObject);
			}, function(failure_response) {
				$m.logError("Read failed -- " + JSON.stringify(failure_response));
				$m.alert("Error while fetching database");
			});
		}
	}, function(error) {
		$m.logError("Unable to open database due to -- " + JSON.stringify(error));
		$m.alert("Error while opening database");
	});
}

function loadConfidential(applicationNumber, callback) {
	$m.juci.dataset("cfrSectionForm", bindingObject.PDC_LifeStyle_Details);
	var annuityPlancode = $m.getPref("planDetails_" + applicationNumber);
	juci.dataset("annuityPlanQues", annuityPlancode.PLanCode);
	juci.findById("annuityPlanQues").hide();
	if (annuityPlancode.PLanCode == 114) {
		juci.findById("cfr-section").hide();
		juci.findById("annuityPlanQues").show();
	} else {
		juci.findById("cfr-section").show();
		juci.findById("annuityPlanQues").hide();
		$m.removePref("plancode");
	}
	new window.DB(CONSTANTS.DBName, function(dbHelper) {
		window.dbHelper = dbHelper;
		if (applicationNumber) {
			PDC_LifeStyle_Details.SelectWithFilter(applicationNumber, function(success_response) {
				if (success_response.rows.length) {
					var resultObject = success_response.rows[0];
					resultObject.CFReport_2_Relatedto_LARelationship = setValueFromOptions("familyMember", {
						"LA_CODE": resultObject.CFReport_2_Relatedto_LARelationship
					}, localLaComparator);
					resultObject.CFReport_5_IncomeVerified_Type = setValueFromOptions("typeOfIncomeProof", {
						"LA_CODE": resultObject.CFReport_5_IncomeVerified_Type
					}, localLaComparator);
					$m.juci.dataset('cfrSectionForm', resultObject);
				}
			}, function(failure_response) {
				$m.logError("Read failed -- " + JSON.stringify(failure_response));
				$m.alert("Error while fetching from database");
			});
			if (callback) {
				callback();
			}
		}
	}, function(error) {
		$m.logError("Unable to open database due to -- " + JSON.stringify(error));
		$m.alert("Error while opening database");
	});
}

function loadUploadDocuments() {
	$m.juci.dataset("adress", []);
	$m.juci.dataset("idprf", []);
	$m.juci.dataset("income", []);
	$m.juci.dataset("ageproof", []);
	$m.juci.dataset("photo", []);
	$m.juci.dataset("customerdeclaration", []);
	$m.juci.dataset("applicantphoto", []);
	$m.juci.dataset("proposerphoto", []);
	$m.juci.dataset("pradress", []);
	$m.juci.dataset("prphoto", []);
	$m.juci.dataset("pridprf", []);
	$m.juci.dataset("princome", []);
	$m.juci.dataset("prageproof", []);
	$m.juci.dataset("prcustomerdeclaration", []);
	$m.juci.dataset("cheque", []);
	$m.juci.dataset("other", []);
	$m.juci.dataset("typeOfDocuments", []);
	PhotoArray = [];
	DecArray = [];
	AgeArray = [];
	IncomeArray = [];
	IdArray = [];
	AddressArray = [];
	chequeArray = [];
	otherArray = [];
	PrAgeArray = [];
	PrIncomeArray = [];
	PrIdArray = [];
	PrAddressArray = [];
	LAArray = [];
	proposerArray = [];
	addPanandformdoc = [];
	
	utils.GetControl("toogle").toggle(4);
	$m.juci.getControl("togbtn4").disable();
	$m.juci.getControl("togbtn3").disable();
	$m.juci.getControl("togbtn2").disable();
	$m.juci.getControl("togbtn5").enable(); 
	var personalDetails = $m.juci.dataset("personalForm");
	$m.juci.dataset("hasProposer", false);
	$m.juci.dataset("hasNoAadhar", true);
	$m.juci.dataset("hasAadhaar", false);
	var plandetails = $m.getPref("planDetails_" + applicationNumber);
	$m.juci.dataset("InstallmentPremium_ST", plandetails.InstallmentPremium_ST);
	$m.juci.dataset("hasinstalPremium", false);

	if (personalDetails.IS_LA_PR_SAME === "N") {
		$m.juci.dataset("hasProposer", true);
	}
	if ($m.getPref(AdharPref.LA_adharphoto + applicationNumber)) {
		$m.juci.dataset("hasNoAadhar", false);
		$m.juci.dataset("hasAadhaar", true);
		showAadhaarTable("LA");
		document.getElementById("tab-AadhaarLA").className = 'tab';	
	}
	/* 	var typeofincome = juci.dataset("cfrSectionForm");

           $m.juci.dataset("hasIncome", false);
    if(typeofincome.CFReport_5_IncomeVerified_Type.LA_CODE =="NA")
	{
		$m.juci.dataset("hasIncome", true);
	}
	*/
	if (plandetails.InstallmentPremium_ST >= 100000) {
		$m.juci.dataset("hasinstalPremium", true);
	}
	var hasInstall_Pre = $m.juci.dataset("hasinstalPremium");
	// var hasIncome = $m.juci.dataset("hasIncome");
	var la_aadhar = $m.getPref("LA_aadharselect" + applicationNumber);

	var payment = $m.getPref("paymentdata_" + applicationNumber);
	$m.juci.dataset("hascheque", false);
	if (payment) {
		for (i = 0; i < payment.length; i++) {
			if (payment[i]["Payment_Type"] == "Cheque" || payment[i]["Payment_Type"] == "DD") {
				$m.juci.dataset("hascheque", true);
			}
		}
	}
	var DocumentTabArray;
	var hascheque = $m.juci.dataset("hascheque");
	if ($m.getPref(AdharPref.LA_adharphoto + applicationNumber) && !hasInstall_Pre && hascheque) {
		DocumentTabArray = ["tab-customer","tab-chequedoc","tab-other" ,"type-of-docs"];
		setCollapse(DocumentTabArray);
	} else if ($m.getPref(AdharPref.LA_adharphoto + applicationNumber) && !hasInstall_Pre) {
		DocumentTabArray = ["tab-customer","tab-other","type-of-docs"];
		setCollapse(DocumentTabArray);
	} else if (!hasInstall_Pre && hascheque) {
		DocumentTabArray = ["tab-photoLa","tab-addressLa","idproofsec","tab-chequedoc","tab-customer","ageLa","tab-other","type-of-docs"];
		setCollapse(DocumentTabArray);
	} else if (hascheque && hasInstall_Pre) {
		DocumentTabArray = ["tab-photoLa","tab-addressLa","idproofsec","tab-chequedoc","tab-customer","ageLa","tab-other","tab-incomeLa","type-of-docs"];
		setCollapse(DocumentTabArray);
	} else if (hasInstall_Pre) {
		DocumentTabArray = ["tab-photoLa","tab-addressLa","idproofsec","tab-customer","ageLa","tab-other","tab-incomeLa","type-of-docs"];
		setCollapse(DocumentTabArray);
	} else {
		juci.findById("idproofsec").show();
		juci.findById("ageLa").show();
		DocumentTabArray = ["tab-photoLa","tab-addressLa","idproofsec","tab-customer","ageLa","tab-other","type-of-docs"];
		setCollapse(DocumentTabArray);
	}
	var hasProposer = $m.juci.dataset("hasProposer");
	var Pr_aadhar = $m.getPref("PR_aadharselect" + applicationNumber);
	if (hasProposer && $m.getPref(AdharPref.PR_adharphoto + applicationNumber) && !hasInstall_Pre) {
		document.getElementById("tab-AadhaarPR").className = 'tab';
		showAadhaarTable("PR");
	} else if (hasProposer && $m.getPref(AdharPref.PR_adharphoto + applicationNumber)) {
		showAadhaarTable("PR");
		DocumentTabArray = ["tab-incomePr","tab-AadhaarPR"];
		setCollapse(DocumentTabArray);
	} else if (hasProposer && !hasInstall_Pre) {
		DocumentTabArray = ["tab-photoPr","tab-addressPr","idPr","agePr"];
		setCollapse(DocumentTabArray);
	} else if (hasProposer && hasInstall_Pre) {
		DocumentTabArray = ["tab-photoPr","tab-addressPr","idPr","agePr","tab-incomePr"];
		setCollapse(DocumentTabArray);
	} else if (hasProposer) {
		juci.findById("idPr").show();
		juci.findById("agePr").show();
		DocumentTabArray = ["tab-photoPr","tab-addressPr","idPr","agePr","tab-incomePr"];
		setCollapse(DocumentTabArray);
	}
	$m.juci.dataset("uploaddocuments", uploadDocuments);
	uploadDocuments.optionselectedforproposeridproof = getValueFromProofMaster(proofsMaster, "Identity Proof");
//	$m.juci.dataset("typeOfDocumentRef","");
	var populatePan = $m.juci.dataset("typeOfDocumentRef");
	if(populatePan) {
		uploadDocuments.optionsSelectedForTypeOfProof[0] = getValueFromProofMaster(proofsMaster, "Type Of Document");
	}
}

function hideDocument() {
	var docsupload = juci.findById("docsupload");
	var paymentoptions = juci.findById("paymentoptions");
	paymentoptions.hide();
	docsupload.hide();
	$m.juci.dataset("adress", []);
	$m.juci.dataset("photo", []);
	$m.juci.dataset("idprf", []);
	$m.juci.dataset("income", []);
	$m.juci.dataset("ageproof", []);
	$m.juci.dataset("pradress", []);
	$m.juci.dataset("pridprf", []);
	$m.juci.dataset("princome", []);
	$m.juci.dataset("prageproof", []);
	$m.juci.dataset("customerdeclaration", []);
	$m.juci.dataset("typeOfDocuments", []);
}

function hideAll() {
	proposalFulfilmentView = juci.findById("proposalFulfilment");
	currentView = juci.findById("proposalView");
	NextView = juci.findById("AppointeeOrnomineeView");
	FamilyView = juci.findById("familyhistory");
	InsuranceView = juci.findById("insuranceDetails");
	LifeStyleView = juci.findById("lifestyledetails");
	VernacularView = juci.findById("vernacularDetails");
	DeclarationView = juci.findById("declarationdetails");
	ConfidentialView = juci.findById("confidentailreport");
	PrepaymentReview = juci.findById("prepaymentReview");
	selfieVideo = juci.findById("selfie-video");
	tamilContent = juci.findById("tamil-content");
	hindiContent = juci.findById("hindi-content");
	teluguContent = juci.findById("telugu-content");
	marathiContent = juci.findById("marathi-content");
	proposalFulfilmentView.show();
	PrepaymentReview.hide();
	currentView.hide();
	NextView.hide();
	FamilyView.hide();
	InsuranceView.hide();
	LifeStyleView.hide();
	VernacularView.hide();
	DeclarationView.hide();
	ConfidentialView.hide();
	selfieVideo.hide();
	tamilContent.hide();
	hindiContent.hide();
	teluguContent.hide();
	marathiContent.hide();
}

function editLifeAssure() {
	hideAll();
	currentView.show();
}

function editproposer() {
	utils.GetControl("toogle").toggle(1);
	var requestdata = $m.juci.dataset('personalForm');
	openLifeAssured(requestdata.Application_Number);
}

function editnominee() {
	hideAll();
	NextView.show();
}

function editplan() {
	hideAll();
	currentView.show();
}

function editpremium() {
	hideAll();
	currentView.show();
}

function editotherdetails() {
	hideAll();
	currentView.show();
}

function changeSalutationofNOM(event) {

	if (event.value == "F") {
		$m.juci.dataset("relationOfTheNominee", AppointeeFemalerelationship);
	} else if (event.value == "M") {
		$m.juci.dataset("relationOfTheNominee", AppointeeMalerelationship);
	}

}


function scrollToTop() {
	window.scrollTo(0, 0);
}

function getDOBObj(dobString) {
	dobString = dobString.split("-");
	var monthMap = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
	var dob = new Date(dobString[2], monthMap.indexOf(dobString[1].toLowerCase()), dobString[0]);
	return dob;
}

function fetchLAAadharDetails() {
	var aadhar = juci.getControl("LA_aadhar").value();
	var haslead = $m.juci.dataset("hasLead");
	if(haslead){
		aadhar = true;
	}
	if (aadhar) {
		var PlanDetails = $m.getPref("planDetails_" + applicationNumber);
		var aadhar_details = $m.getPref("Adhar_dataLA_" + applicationNumber);
		var check_option = juci.getControl("checkLA").value();
		var check = juci.dataset("checkaadharLA");
		var Personal_data = juci.dataset("personalForm");
		var bi_dob = new Date(changeFormat(PlanDetails.dob)).getTime();
		var aadhar_dob = new Date(changeFormat(aadhar_details.DOB)).getTime();
		if (check_option) {
			$m.putPref("aadharLA_value_" + applicationNumber, true);
			$m.savePref();
			if ((bi_dob === aadhar_dob) || (Personal_data.LA_Name == aadhar_details.Name.toUpperCase())) {
				Personal_data.LA_IDProof = {LA_CODE: "UID", Description: "UID (Aadhar)"};
				$m.juci.dataset("simplifiedNo",false);
				$m.juci.dataset("voterId",false);
				$m.juci.dataset("pancard",false);
				$m.juci.dataset("others",false);
				$m.juci.dataset("uid",true);
				$m.juci.dataset("expiryDate",false);
				$m.juci.dataset("drivingnumber",false);
				Personal_data.LA_IdentificationNumber = aadhar_details.AadhaarNumber;
				utils.PutPref(AdharPref.LA_adharphoto + applicationNumber,aadhar_details.Photo);
				if (aadhar_details.House || aadhar_details.Locality) {
					Personal_data.LA_AddressLine1 = aadhar_details.House + " " + aadhar_details.Locality;
					var ad1 = aadhar_details.House + " " + aadhar_details.Locality;
					var ad1length = ad1.length;
					var address1 = "";
					if (Personal_data.LA_AddressLine1.length > 30) {
						Personal_data.LA_AddressLine1 = Personal_data.LA_AddressLine1.slice(0, 30);
						address1 = ad1.slice(30, ad1length);
					}
					Personal_data.LA_AddressLine1 = Personal_data.LA_AddressLine1.trim();
				}
				//                        else if (aadhar_details[8] || aadhar_details[9]) {
				//                            Personal_data.LA_AddressLine1 = aadhar_details[8]  + aadhar_details[9];
				//                        }
				if (aadhar_details.Street || aadhar_details.District || aadhar_details.SubDistrict) {
					var ad2 = "";
					if(address1){
						ad2 = address1 + "" + aadhar_details.Street + " " + aadhar_details.District + " " + aadhar_details.SubDistrict;
					}else{
						ad2 = aadhar_details.Street + " " + aadhar_details.District + " " + aadhar_details.SubDistrict;
						address1 = "";
					}
					var ad2length = ad2.length;

					Personal_data.LA_AddressLine2 = address1 + "" + aadhar_details.Street + " " + aadhar_details.District + " " + aadhar_details.SubDistrict;
					var AddressLine2;
					if (Personal_data.LA_AddressLine2.length > 30) {
						Personal_data.LA_AddressLine2 = Personal_data.LA_AddressLine2.slice(0, 30);
					    AddressLine2 = ad2.slice(30, ad2length);
					}
					Personal_data.LA_AddressLine2 = Personal_data.LA_AddressLine2.trim();
				}
				//                        else if(aadhar_details[11] || aadhar_details[12] || aadhar_details[13]){
				//                            Personal_data.LA_AddressLine2 = aadhar_details[11]  + aadhar_details[12] + aadhar_details[13];
				//                        }
				
				if(Personal_data.LA_AddressLine1 && Personal_data.LA_AddressLine2) {
					Personal_data.LA_EKYC_Aadhar_YN = "Y";							
				} else {
					Personal_data.LA_EKYC_Aadhar_YN = "N";		
				}
						
				if (aadhar_details.Landmark) {
					Personal_data.LA_AddressLine3 = aadhar_details.Landmark;
					if (Personal_data.LA_AddressLine3.length > 30) {
						Personal_data.LA_AddressLine3 = Personal_data.LA_AddressLine3.slice(0, 30);
					}
					Personal_data.LA_AddressLine3 = Personal_data.LA_AddressLine3.trim();
				}
				//Personal_data.LA_EKYC_Aadhar_YN = "Y";
				Personal_data.LA_City = aadhar_details.city;
				Personal_data.LA_EmailId = aadhar_details.Email;
				Personal_data.LA_Mobileno = aadhar_details.Phone;
				Personal_data.LA_Pincode = aadhar_details.PinCode;
				Personal_data.LA_State = aadhar_details.State;
				Personal_data.LA_State = Personal_data.LA_State.toUpperCase();
				if (!Personal_data.LA_AddressLine3 && aadhar_details.SubDistrict) {
					Personal_data.LA_AddressLine3 = aadhar_details.SubDistrict;
				}
				if (!Personal_data.LA_AddressLine2 && aadhar_details.Locality) {
					Personal_data.LA_AddressLine2 = aadhar_details.Locality;
				}
				if (!Personal_data.LA_AddressLine1 && aadhar_details.SubDistrict) {
					Personal_data.LA_AddressLine1 = aadhar_details.SubDistrict;
				}
				if ((!Personal_data.LA_AddressLine1) && (!Personal_data.LA_AddressLine2) && (aadhar_details.Landmark)) {
					Personal_data.LA_AddressLine2 = aadhar_details.Landmark;
					Personal_data.LA_AddressLine1 = aadhar_details.Landmark;
				}
				if ((!Personal_data.LA_AddressLine2) && (!Personal_data.LA_AddressLine3) && (aadhar_details.Locality)) {
					Personal_data.LA_AddressLine2 = aadhar_details.Locality;
					Personal_data.LA_AddressLine3 = aadhar_details.Locality;
				}
				if ((!Personal_data.LA_AddressLine1) && (!Personal_data.LA_AddressLine3) && (aadhar_details.SubDistrict)) {
					Personal_data.LA_AddressLine1 = aadhar_details.SubDistrict;
					Personal_data.LA_AddressLine3 = aadhar_details.District;
				}
				// Added on 10th Jan 2017 By Sajid Halai to resolve adderss1 issue.
				if (!Personal_data.LA_AddressLine1 && !aadhar_details.SubDistrict) {
					Personal_data.LA_AddressLine1 = Personal_data.LA_AddressLine2;
					Personal_data.LA_AddressLine2 = Personal_data.LA_AddressLine3;
					Personal_data.LA_AddressLine3 = "";
				}
				
				var AddressLine1 = addressCheck(Personal_data.LA_AddressLine1);
				var AddressLine2 = addressCheck(Personal_data.LA_AddressLine2);
				var AddressLine3 = Personal_data.LA_AddressLine3 == ""? "" :addressCheck(Personal_data.LA_AddressLine3);
				
				Personal_data.LA_AddressLine1 = AddressLine1;
				Personal_data.LA_AddressLine2 = AddressLine2;
				Personal_data.LA_AddressLine3 = AddressLine3;
				
				var isLaLdSame = utils.GetPref("isLaLdSame");
     			if(isLaLdSame == true){
     				Personal_data.PR_AddressLine1 = AddressLine1;
					Personal_data.PR_AddressLine2 = AddressLine2;
					Personal_data.PR_AddressLine3 = AddressLine3;
					Personal_data.PR_City = aadhar_details.city;
					Personal_data.PR_EmailId = aadhar_details.Email;
					Personal_data.PR_Mobileno = aadhar_details.Phone;
					Personal_data.PR_Pincode = aadhar_details.PinCode;
					Personal_data.PR_State = aadhar_details.State;
					if(Personal_data.PR_AddressLine1){
						$m.juci.getControl("PR-ad1").disable();
					} else {
						$m.juci.getControl("PR-ad1").enable()
					}
					if(Personal_data.PR_AddressLine2){
						$m.juci.getControl("PR-Address2").disable();	
					}
					if(Personal_data.PR_AddressLine3){
						$m.juci.getControl("PR-Address3").disable();	
					} else {
						$m.juci.getControl("PR-Address3").enable();
					}
     			} else {
     				$m.juci.getControl("PR-ad1").enable();
					$m.juci.getControl("PR-Address2").enable();
					$m.juci.getControl("PR-Address3").enable();
     			}
				
				juci.dataset("personalForm", Personal_data);
				if (Personal_data.LA_AddressLine1) {
					$m.juci.getControl("ad1").disable();
				}else{
					$m.juci.getControl("ad1").enable();
				}
				if (Personal_data.LA_AddressLine2) {
					$m.juci.getControl("Address2").disable();
				}else{
					$m.juci.getControl("Address2").enable();
				}
//				if (Personal_data.LA_AddressLine3) {
//					$m.juci.getControl("Address3").disable();
//				}else{
//					$m.juci.getControl("Address3").enable();	
//				}
				if (Personal_data.LA_Pincode) {
					$m.juci.getControl("Pin").disable();
				}

			} else {
				$m.putPref("aadharLA_value_" + applicationNumber, false);
				$m.savePref();
				$m.juci.dataset("AadharData", "");
				var isProductPage = $m.juci.dataset("isProductPage");
				if(isProductPage == true){
					$m.alert("Your Aadhaar Name or Date of Birth doesn't match with BI data", "Aadhaar Mismatch", function() {
						$m.confirm({
							"title": "Confirmation",
							"message": " Would you like to resume your application from filling without your Aadhaar",
							"buttons": [{
								"label": "Yes"
							}, {
								"label": "No"
							}]
						}, function(index) {
							var options = ["Yes", "No"];
							// $m.toast("You tapped on " + options[index]);
							if (index == 0) {
								// Yes
							} else if (index == 1) {
								$m.alert("Regenrerate a BI with Aadhaar details and re-apply");
								//callService(PlanDetails);
								$m.open("Products", "/Products/Products.html");
							}
						});
					});
				}else{
					$m.alert("Your Aadhaar Name or Date of Birth doesn't match with BI data", "Aadhaar Mismatch", function() {
						$m.juci.dataset("aadharMandatoryFlag",false);
						$m.juci.getControl("checkLA").value(true);
						$m.juci.dataset("checkLAaadhar",true);
						utils.OpenPage("Input Management","/Input Management/inputManagement.html");
					});
				}
			}
		} else {
			utils.RemovePref(AdharPref.LA_adharphoto + applicationNumber);
			Personal_data.LA_AddressLine1 = "";
			Personal_data.LA_AddressLine2 = "";
			Personal_data.LA_AddressLine3 = "";
			Personal_data.LA_EmailId = "";
			Personal_data.LA_Mobileno = "";
			Personal_data.LA_Pincode = "";
			Personal_data.LA_City = "";
			Personal_data.LA_State = "";
			Personal_data.LA_EKYC_Aadhar_YN = "N";
			if(Personal_data.LA_EKYC_Aadhar_YN) {
				$m.alert("EKYC done successfully but alternate address proof will be required for proposal log in due to incomplete address in Aadhar");
			}
			juci.dataset("personalForm", Personal_data);
			$m.juci.getControl("ad1").enable();
			$m.juci.getControl("Address2").enable();
			$m.juci.getControl("Address3").enable();
			$m.juci.getControl("Pin").enable();
		}
	}
}

function FetchAadharDetails(aadhar) {
	var aadharFlag = $m.juci.dataset("aadharMandatoryFlag");
	if(aadharFlag == false ) {
		$m.alert("Please do aadhaar authentication..");
		$m.juci.getControl("checkLA").value(false);
		return;
	}
	var aadhar = juci.getControl("LA_aadhar").value();
	var haslead = $m.juci.dataset("hasLead");
	if(haslead){
		aadhar = true;
	}
	if (aadhar) {
		var PlanDetails = $m.getPref("planDetails_" + applicationNumber);
		var aadhar_details = $m.getPref("Adhar_dataLA_" + applicationNumber);
		var check_option = juci.getControl("checkLA").value();
		var check = juci.dataset("checkaadharLA");
		var Personal_data = juci.dataset("personalForm");
		var bi_dob = new Date(changeFormat(PlanDetails.dob)).getTime();
		var aadhar_dob = new Date(changeFormat(aadhar_details.DOB)).getTime();
		if(check_option == false) {
			$m.confirm({
				"title": "Confirmation",
				"message": "Do you want to unauthorised aadhar authentication for this case?",
				"buttons": [{
					"label": "Yes"
				}, {
					"label": "No"
				}]
			}, function(index) {
				var options = ["Yes", "No"];
				if (index == 0) { 
					//todo
				} else {
					$m.juci.getControl("checkLA").value(true);
				}
			});
		}
		if (check_option) {
			$m.putPref("aadharLA_value_" + applicationNumber, true);
			$m.savePref();
			if ((bi_dob === aadhar_dob) || (Personal_data.LA_Name == aadhar_details.Name.toUpperCase())) {
				//readadharimage('LA');
				utils.PutPref(AdharPref.LA_adharphoto + applicationNumber,aadhar_details.Photo);
				$m.confirm({
					"title": "Confirmation",
					"message": " Would you like to proceed application with  Aadhar Details",
					"buttons": [{
						"label": "Yes"
					}, {
						"label": "No"
					}]
				}, function(index) {
					var options = ["Yes", "No"];
					// $m.toast("You tapped on " + options[index]);
					if (index == 0) {
						if (aadhar_details.House || aadhar_details.Locality) {
							Personal_data.LA_AddressLine1 = aadhar_details.House + " " + aadhar_details.Locality;
							var ad1 = aadhar_details.House + " " + aadhar_details.Locality;
							var ad1length = ad1.length;
							var address1 = "";
							if (Personal_data.LA_AddressLine1.length > 30) {
								Personal_data.LA_AddressLine1 = Personal_data.LA_AddressLine1.slice(0, 30);
								address1 = ad1.slice(30, ad1length);
							}
							Personal_data.LA_AddressLine1 = Personal_data.LA_AddressLine1.trim();
						}
						if (aadhar_details.Street || aadhar_details.District || aadhar_details.SubDistrict) {
							var ad2 = address1 + "" + aadhar_details.Street + " " + aadhar_details.District + " " + aadhar_details.SubDistrict;
							var ad2length = ad2.length;

							Personal_data.LA_AddressLine2 = address1 + "" + aadhar_details.Street + " " + aadhar_details.District + " " + aadhar_details.SubDistrict;
							var AddressLine2;
							if (Personal_data.LA_AddressLine2.length > 30) {
								Personal_data.LA_AddressLine2 = Personal_data.LA_AddressLine2.slice(0, 30);
							    AddressLine2 = ad2.slice(30, ad2length);
							}
							Personal_data.LA_AddressLine2 = Personal_data.LA_AddressLine2.trim();
						}
						if(Personal_data.LA_AddressLine1 && Personal_data.LA_AddressLine2) {
							Personal_data.LA_EKYC_Aadhar_YN = "Y";							
						} else {
							Personal_data.LA_EKYC_Aadhar_YN = "N";		
						}
						
						if (aadhar_details.Landmark) {
							Personal_data.LA_AddressLine3 = aadhar_details.Landmark;
							if (Personal_data.LA_AddressLine3.length > 30) {
								Personal_data.LA_AddressLine3 = Personal_data.LA_AddressLine3.slice(0, 30);
							}
							Personal_data.LA_AddressLine3 = Personal_data.LA_AddressLine3.trim();
						}

						Personal_data.LA_City = aadhar_details.city;
						Personal_data.LA_EmailId = aadhar_details.Email;
						Personal_data.LA_Mobileno = aadhar_details.Phone;
						Personal_data.LA_Pincode = aadhar_details.PinCode;
						Personal_data.LA_State = aadhar_details.State;
						Personal_data.LA_State = Personal_data.LA_State.toUpperCase();
						if (!Personal_data.LA_AddressLine3 && aadhar_details.SubDistrict) {
							Personal_data.LA_AddressLine3 = aadhar_details.SubDistrict;
						}
						if (!Personal_data.LA_AddressLine2 && aadhar_details.Locality) {
							Personal_data.LA_AddressLine2 = aadhar_details.Locality;
						}
						if (!Personal_data.LA_AddressLine1 && aadhar_details.SubDistrict) {
							Personal_data.LA_AddressLine1 = aadhar_details.SubDistrict;
						}
						if ((!Personal_data.LA_AddressLine1) && (!Personal_data.LA_AddressLine2) && (aadhar_details.Landmark)) {
							Personal_data.LA_AddressLine2 = aadhar_details.Landmark;
							Personal_data.LA_AddressLine1 = aadhar_details.Landmark;
						}
						if ((!Personal_data.LA_AddressLine2) && (!Personal_data.LA_AddressLine3) && (aadhar_details.Locality)) {
							Personal_data.LA_AddressLine2 = aadhar_details.Locality;
							Personal_data.LA_AddressLine3 = aadhar_details.Locality;
						}
						if ((!Personal_data.LA_AddressLine1) && (!Personal_data.LA_AddressLine3) && (aadhar_details.SubDistrict)) {
							Personal_data.LA_AddressLine1 = aadhar_details.SubDistrict;
							Personal_data.LA_AddressLine3 = aadhar_details.District;
						}
						var AddressLine1 = addressCheck(Personal_data.LA_AddressLine1);
						var AddressLine2 = addressCheck(Personal_data.LA_AddressLine2);
						var AddressLine3 = Personal_data.LA_AddressLine3 == ""? "" :addressCheck(Personal_data.LA_AddressLine3);
						Personal_data.LA_AddressLine1 = AddressLine1;
						Personal_data.LA_AddressLine2 = AddressLine2;
						Personal_data.LA_AddressLine3 = AddressLine3;
						
						var isLaLdSame = utils.GetPref("isLaLdSame");
		     			if(isLaLdSame == true){
		     				Personal_data.PR_AddressLine1 = AddressLine1;
							Personal_data.PR_AddressLine2 = AddressLine2;
							Personal_data.PR_AddressLine3 = AddressLine3;
							Personal_data.PR_City = aadhar_details.city;
							Personal_data.PR_EmailId = aadhar_details.Email;
							Personal_data.PR_Mobileno = aadhar_details.Phone;
							Personal_data.PR_Pincode = aadhar_details.PinCode;
							Personal_data.PR_State = aadhar_details.State;
							if(Personal_data.PR_AddressLine1){
								$m.juci.getControl("PR-ad1").disable();
							} else {
								$m.juci.getControl("PR-ad1").enable()
							}
							if(Personal_data.PR_AddressLine2){
								$m.juci.getControl("PR-Address2").disable();	
							}
							if(Personal_data.PR_AddressLine3){
								$m.juci.getControl("PR-Address3").disable();	
							} else {
								$m.juci.getControl("PR-Address3").enable();
							}
		     			} else {
		     				$m.juci.getControl("PR-ad1").enable();
							$m.juci.getControl("PR-Address2").enable();
							$m.juci.getControl("PR-Address3").enable();
		     			}
						
						$m.juci.dataset("personalForm", Personal_data);
						if (Personal_data.LA_AddressLine1) {
							$m.juci.getControl("ad1").disable();
						}else{
							$m.juci.getControl("ad1").enable();
						}
						if (Personal_data.LA_AddressLine2) {
							$m.juci.getControl("Address2").disable();
						}else{
							$m.juci.getControl("Address2").enable();
						}
						if (Personal_data.LA_AddressLine3) {
							$m.juci.getControl("Address3").disable();
						}else{
							$m.juci.getControl("Address3").enable();	
						}
						if (Personal_data.LA_Pincode) {
							$m.juci.getControl("Pin").disable();
						}
						// Yes
					} else if (index == 1) {
					}
				});

			} else {
				$m.putPref("aadharLA_value_" + applicationNumber, false);
				$m.savePref();
				$m.juci.dataset("AadharData", "");
				var isProductPage = $m.juci.dataset("isProductPage");
				if(isProductPage == true){
					$m.alert("Your Aadhaar Name or Date of Birth doesn't match with BI data", "Aadhaar Mismatch", function() {
						$m.confirm({
							"title": "Confirmation",
							"message": " Would you like to resume your application from filling without your Aadhaar",
							"buttons": [{
								"label": "Yes"
							}, {
								"label": "No"
							}]
						}, function(index) {
							var options = ["Yes", "No"];
							// $m.toast("You tapped on " + options[index]);
							if (index == 0) {
								// Yes
							} else if (index == 1) {
								$m.alert("Regenrerate a BI with Aadhaar details and re-apply");
								//callService(PlanDetails);
								$m.open("Products", "/Products/Products.html");
							}
						});
					});
				}else{
					$m.alert("Your Aadhaar Name or Date of Birth doesn't match with BI data", "Aadhaar Mismatch", function() {
						$m.juci.dataset("aadharMandatoryFlag",false);
						$m.juci.getControl("checkLA").value(true);
						$m.juci.dataset("checkLAaadhar",true);
						utils.OpenPage("Input Management","/Input Management/inputManagement.html");
					});
				}
			}
		} else {
			utils.RemovePref(AdharPref.LA_adharphoto + applicationNumber);
			Personal_data.LA_AddressLine1 = "";
			Personal_data.LA_AddressLine2 = "";
			Personal_data.LA_AddressLine3 = "";
			Personal_data.LA_EmailId = "";
			Personal_data.LA_Mobileno = "";
			Personal_data.LA_Pincode = "";
			Personal_data.LA_City = "";
			Personal_data.LA_State = "";
			Personal_data.LA_EKYC_Aadhar_YN = "N";
			if(Personal_data.LA_EKYC_Aadhar_YN) {
				$m.alert("EKYC done successfully but alternate address proof will be required for proposal log in due to incomplete address in Aadhar");
			}
			juci.dataset("personalForm", Personal_data);
			$m.juci.getControl("ad1").enable();
			$m.juci.getControl("Address2").enable();
			$m.juci.getControl("Address3").enable();
			$m.juci.getControl("Pin").enable();
		}
	}
}

function changeFormat(date) {
	var A_date = date.split("-");
	A_date = A_date[1] + "-" + A_date[0] + "-" + A_date[2];
	return A_date;
}

function FetchProposerAadharDetails(aadhar) {
	var aadhar = juci.getControl("PR_aadhar").value();
	if (aadhar) {
		var PlanDetails = $m.getPref("planDetails_" + applicationNumber);
		var aadhar_details = $m.getPref("Adhar_dataPR_" + applicationNumber);
		var check = juci.dataset("checkaadharPR");
		var check_option = juci.getControl("checkPR").value();
		var Personal_data = juci.dataset("personalForm");
		var bi_dob = new Date(changeFormat(PlanDetails.dob)).getTime();
		var aadhar_dob = new Date(changeFormat(aadhar_details.DOB)).getTime();
		if (check_option) {
			$m.putPref("aadharPR_value_" + applicationNumber, true);
			$m.savePref();
			if (aadhar_details.Name && aadhar_details.DOB) {
				//readadharimage('PR');
				utils.PutPref(AdharPref.PR_adharphoto + applicationNumber,aadhar_details.Photo);
				$m.confirm({
					"title": "Confirmation",
					"message": " Would you like to proceed application with  Aadhar Details",
					"buttons": [{
						"label": "Yes"
					}, {
						"label": "No"
					}]
				}, function(index) {
					var options = ["Yes", "No"];
					// $m.toast("You tapped on " + options[index]);
					if (index == 0) {

						if (aadhar_details.House || aadhar_details.Locality) {
							Personal_data.PR_AddressLine1 = aadhar_details.House + " " + aadhar_details.Locality;
							var ad1 = aadhar_details.House + " " + aadhar_details.Locality;
							var ad1length = ad1.length;
							var address1 = "";
							if (Personal_data.PR_AddressLine1.length > 30) {
								Personal_data.PR_AddressLine1 = Personal_data.PR_AddressLine1.slice(0, 30);
							    address1 = ad1.slice(30, ad1length);
							}
							Personal_data.PR_AddressLine1 = Personal_data.PR_AddressLine1.trim();
						}
						//                        else if (aadhar_details.[8] || aadhar_details.[9]) {
						//                            Personal_data.LA_AddressLine1 = aadhar_details.[8]  + aadhar_details.[9];
						//                        }
						if (aadhar_details.Street || aadhar_details.District || aadhar_details.SubDistrict) {
							var ad2 = address1 + "" + aadhar_details.Street + " " + aadhar_details.District + " " + aadhar_details.SubDistrict;
							var ad2length = ad2.length;

							Personal_data.PR_AddressLine2 = address1 + "" + aadhar_details.Street + " " + aadhar_details.District + " " + aadhar_details.SubDistrict;
                            var AddressLine2 = "";
							if (Personal_data.PR_AddressLine2.length > 30) {
								Personal_data.PR_AddressLine2 = Personal_data.PR_AddressLine2.slice(0, 30);
							    AddressLine2 = ad2.slice(30, ad2length);
							}
							Personal_data.PR_AddressLine2 = Personal_data.PR_AddressLine2.trim();
						}
						//                        else if(aadhar_details.[11] || aadhar_details.[12] || aadhar_details.[13]){
						//                            Personal_data.LA_AddressLine2 = aadhar_details.[11]  + aadhar_details.[12] + aadhar_details.[13];
						//                        }

						if (aadhar_details.Landmark) {
							Personal_data.PR_AddressLine3 = AddressLine2 + " " + aadhar_details.Landmark;
							if (Personal_data.PR_AddressLine3.length > 30) {
								Personal_data.PR_AddressLine3 = Personal_data.PR_AddressLine3.slice(0, 30);
							}
							Personal_data.PR_AddressLine3 = Personal_data.PR_AddressLine3.trim();
						}
						Personal_data.PR_EKYC_Aadhar_YN = "Y";
						Personal_data.PR_Name = aadhar_details.Name;
						Personal_data.PR_DOB = getDOBObj(aadhar_details.DOB);
						Personal_data.PR_City = aadhar_details.city;
						Personal_data.PR_State = aadhar_details.State;
						Personal_data.PR_State = Personal_data.PR_State.toUpperCase();
						Personal_data.PR_EmailId = aadhar_details.Email;
						Personal_data.PR_Mobileno = aadhar_details.Phone;
						Personal_data.PR_Pincode = aadhar_details.PinCode;
						if (!Personal_data.PR_AddressLine3 && aadhar_details.SubDistrict) {
							Personal_data.PR_AddressLine3 = aadhar_details.SubDistrict;
						}
						if (!Personal_data.PR_AddressLine2 && aadhar_details.Locality) {
							Personal_data.PR_AddressLine2 = aadhar_details.Locality;
						}
						if (!Personal_data.PR_AddressLine1 && aadhar_details.SubDistrict) {
							Personal_data.PR_AddressLine1 = aadhar_details.SubDistrict;
						}
						if ((!Personal_data.PR_AddressLine1) && (!Personal_data.PR_AddressLine2) && (aadhar_details.Landmark)) {
							Personal_data.PR_AddressLine2 = aadhar_details.Landmark;
							Personal_data.PR_AddressLine1 = aadhar_details.Landmark;
						}
						if ((!Personal_data.PR_AddressLine2) && (!Personal_data.PR_AddressLine3) && (aadhar_details.Locality)) {
							Personal_data.PR_AddressLine2 = aadhar_details.Locality;
							Personal_data.PR_AddressLine3 = aadhar_details.Locality;
						}
						if ((!Personal_data.PR_AddressLine1) && (!Personal_data.PR_AddressLine3) && (aadhar_details.SubDistrict)) {
							Personal_data.PR_AddressLine1 = aadhar_details.SubDistrict;
							Personal_data.PR_AddressLine3 = aadhar_details.District;
						}
						Personal_data.PR_AddressLine1 = addressCheck(Personal_data.PR_AddressLine1);
						Personal_data.PR_AddressLine2 = addressCheck(Personal_data.PR_AddressLine2);
						Personal_data.PR_AddressLine3 = Personal_data.PR_AddressLine3 == ""? "" :addressCheck(Personal_data.PR_AddressLine3);
						juci.dataset("personalForm", Personal_data);
						if (Personal_data.PR_Name) {
							$m.juci.getControl("PR-name").disable();
						}else{
							$m.juci.getControl("PR-name").enable();
						}
						if (Personal_data.PR_DOB) {
							$m.juci.getControl("PR-dob").disable();
						}else{
							$m.juci.getControl("PR-dob").enable();
						}
						if (Personal_data.PR_AddressLine1) {
							$m.juci.getControl("PR-ad1").disable();
						}else{
							$m.juci.getControl("PR-ad1").enable();
						}
						if (Personal_data.PR_AddressLine2) {
							$m.juci.getControl("PR-Address2").disable();
						}else{
							$m.juci.getControl("PR-Address2").enable();
						}
						if (Personal_data.PR_AddressLine3) {
							$m.juci.getControl("PR-Address3").disable();
						}else{
							$m.juci.getControl("PR-Address3").enable();
						}
						if (Personal_data.PR_Pincode) {
							$m.juci.getControl("PR-Pin").disable();
						}else{
							$m.juci.getControl("PR-Pin").enable();
						}
						// Yes
					} else if (index == 1) {
					}
				});
			} else {
				$m.putPref("aadharPR_value_" + applicationNumber, false);
				$m.savePref();
				$m.juci.dataset("AadharData", "");
				$m.alert("Your Aadhar Name or Date of Birth doesn't match with BI data", "Aadhar Mismatch", function() {
					$m.confirm({
						"title": "Confirmation",
						"message": " Would you like to resume your application from filling without your Aadhar",
						"buttons": [{
							"label": "Yes"
						}, {
							"label": "No"
						}]
					}, function(index) {
						var options = ["Yes", "No"];
						// $m.toast("You tapped on " + options[index]);
						if (index == 0) {
							// Yes
						} else if (index == 1) {
						}
					});
				});
			}
		} else {
			utils.RemovePref(AdharPref.PR_adharphoto + applicationNumber);
			Personal_data.PR_Name = "";
			Personal_data.PR_DOB = "";
			Personal_data.PR_AddressLine1 = "";
			Personal_data.PR_AddressLine2 = "";
			Personal_data.PR_AddressLine3 = "";
			Personal_data.PR_Pincode = "";
			Personal_data.PR_EmailId = "";
			Personal_data.PR_Mobileno = "";
			Personal_data.PR_EKYC_Aadhar_YN = "N";
			juci.dataset("personalForm", Personal_data);
			$m.juci.getControl("PR-name").enable();
			$m.juci.getControl("PR-ad1").enable();
			$m.juci.getControl("PR-dob").enable();
			$m.juci.getControl("PR-Address2").enable();
			$m.juci.getControl("PR-Address3").enable();
			$m.juci.getControl("PR-Pin").enable();
		}
	}
}

$m.juci.addDataset("nomineeSalutation", maleSalutation);

function toggleLAGender(e) {
	var personalform = $m.juci.dataset("personalForm");
	switch (e.newToggled) {
		case 0:
			personalform.LA_Gender = "M";
			$m.juci.dataset("nomineeSalutation", maleSalutation);
			break;
		case 1:
			personalform.LA_Gender = "F";
			$m.juci.dataset("nomineeSalutation", femaleSalutation);
			break;
		case 2:
			personalform.LA_Gender = "T";
			break;
	}
	 $m.juci.dataset("personalForm",personalform);
}

function setNomGender(e) {
	var nomGender = juci.dataset("nomineeOrAppointeeDetailsForm");
	switch (e.newToggled) {
		case 0:
			nomGender.NOM_Gender = "M";
			$m.juci.dataset("nomineeSalutation", maleSalutation);
			$m.juci.dataset("relationOfTheNominee", AppointeeMalerelationship);
			break;
		case 1:
			nomGender.NOM_Gender = "F";
		 	$m.juci.dataset("nomineeSalutation", femaleSalutation);
			$m.juci.dataset("relationOfTheNominee", AppointeeFemalerelationship);
			break;
		case 2:		
			nomGender.NOM_Gender = "T";		
			//$m.juci.dataset("proposerSalutation", femaleSalutation);		
			//$m.juci.dataset("relationOfTheProposer", Proposer_Female);		
			break;
	}
	//$m.juci.dataset("appointeeRelationship", AppointeeMalerelationship);
	juci.dataset("nomineeOrAppointeeDetailsForm", nomGender);
}

function setProGender(e) {
	var proposerGender = juci.dataset("personalForm");
	switch (e.newToggled) {
		case 0:
			proposerGender.PR_Gender = "M";
			$m.juci.dataset("proposerSalutation", maleSalutation);
			$m.juci.dataset("relationOfTheProposer", Proposer_Male);
			$m.juci.dataset("occupation", obj.occupation);
	    	break;
	    case 1:
			proposerGender.PR_Gender = "F";
			$m.juci.dataset("proposerSalutation", femaleSalutation);
			$m.juci.dataset("relationOfTheProposer", Proposer_Female);
			$m.juci.dataset("occupation", obj.femaleOccupation);
			break;
		case 2:
			proposerGender.PR_Gender = "T";
			//$m.juci.dataset("proposerSalutation", femaleSalutation);
			//$m.juci.dataset("relationOfTheProposer", Proposer_Female);
			break;
	}
	//  $m.juci.dataset("appointeeRelationship", AppointeeMalerelationship);
	$m.juci.dataset("personalForm", proposerGender);
}

function setAppGender(e) {
	var AppGender = juci.dataset("nomineeOrAppointeeDetailsForm");
	switch (e.newToggled) {
		case 0:
			AppGender.APP_Gender = "M";
			$m.juci.dataset("appointeeSalutation", maleSalutation);
			$m.juci.dataset("appointeeRelationship", AppointeeMalerelationship);
			break;
		case 1:
			AppGender.APP_Gender = "F";
			$m.juci.dataset("appointeeSalutation", femaleSalutation);
			$m.juci.dataset("appointeeRelationship", AppointeeFemalerelationship);
			break;
	}
	$m.juci.dataset("nomineeOrAppointeeDetailsForm", AppGender);
}

function showAppointee(dob) {
	dob = new Date(dob);
	var age = getAge(dob);
	if (age < 18) {
		juci.findById("appointee-section").show();
		$m.juci.dataset("appAge", false);
	} else {
		juci.findById("appointee-section").hide();
		$m.juci.dataset("appAge", true);
	}
}

function backToPrePayment() {
	navigateTo("prepayment");
}

var applicationSteps = {
	"PrePayment": "prepayment",
	"Payment": "payment",
	"DocUpload": "docupload",
	"Personal": "personal",
	"Nominee": "nominee",
	"Family": "family",
	"LifeInsurence": "lifeinsurence",
	"LifeStyle": "lifestyle",
	"Vernacular": "vernacular",
	"Declaration": "declaration",
	"Confidentail": "confidentail",
	"SelfieVideoPage":"selfieVideoPage"
}

function populateDetails() {
	$m.showProgress("Populating data....");
	loadNomineeDetails(applicationNumber);
	familyHistory(applicationNumber);
	loadInsurenceDetails(applicationNumber);
	loadLifeStyle(applicationNumber);
	loadVernacular(applicationNumber);
	loadDecalration(applicationNumber);
	loadConfidential(applicationNumber, function() {
		$m.hideProgress();
	});
}

function navigateTo(step) {
	scrollToTop();
	//populateDetails();
	hideAll();
	hideDocument();
	$m.putPref(applicationNumber, step);
	$m.savePref();
	switch (step) {
		case applicationSteps.Personal:
			showSections("proposalFulfilment")
			id = "proposalView";
			break;
		case applicationSteps.Nominee:
			loadNomineeDetails(applicationNumber);
			showSections("proposalFulfilment")
			id = "AppointeeOrnomineeView";
			break;
		case applicationSteps.Family:
			familyHistory(applicationNumber);
			showSections("proposalFulfilment")
			id = "familyhistory";
			break;
		case applicationSteps.LifeInsurence:
			loadInsurenceDetails(applicationNumber);
			showSections("proposalFulfilment")
			id = "insuranceDetails";
			break;
		case applicationSteps.LifeStyle:
			loadLifeStyle(applicationNumber);
			showSections("proposalFulfilment")
			id = "lifestyledetails";
			break;
		case applicationSteps.Vernacular:
			loadVernacular(applicationNumber);
			showSections("proposalFulfilment")
			id = "vernacularDetails";
			break;
		case applicationSteps.Declaration:
			loadDecalration(applicationNumber);
			showSections("proposalFulfilment")
			id = "declarationdetails";
			break;
		case applicationSteps.Confidentail:
			loadConfidential(applicationNumber);
			showSections("proposalFulfilment")
			id = "confidentailreport";
			break;
		case applicationSteps.PrePayment:
			juci.getControl("togbtn3").enable();
			utils.GetControl("toogle").toggle(2);
			showDetails();
			populateDetails();
			id = "prepaymentReview";
			break;
		case applicationSteps.SelfieVideoPage:
			juci.getControl("togbtn4").enable();
			id = "selfie-video";
			break;
		case applicationSteps.Payment:
			juci.getControl("togbtn4").enable();
			populateDetails();
			showPaymentDetails();
			id = "paymentoptions";
			break;
		case applicationSteps.DocUpload:
			juci.getControl("togbtn4").enable();
			populateDetails();
			loadUploadDocuments();
			id = "docsupload";
			break;
	}
	showSections(id);
}

function showSections(id) {
	var sectionContainer = juci.findById(id);
	sectionContainer.show();
}


/* Planning mapping */


var planMap = {};

function getPlanmaster() {
	var protect = $m.juci.dataset("protect");
	var plans = [];
	plans = plans.concat(protect);
	var saving = $m.juci.dataset("saving");
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
	for (var i = 0; i < plans.length; i++) {
		if (plans[i].productCode) {
			planMap[plans[i].productCode] = plans[i].title;
		}
	}
	return planMap;
}

function getPlanname(plancode) {
	if (plancode) {
		return planMap[plancode];
	}
	return "Not Found";
}

function validateMobileNo(mobileno) {
	if (!mobileno) {
		return "";
	}
	if (mobileno[0] == "0") {
		$m.alert("Invalid mobile number");
		return "";
	}
	return mobileno;
}


function validateEmail(emailText) {
	if (!emailText) {
		return "";
	}
	if (emailText[emailText.length - 1].search(/[a-zA-Z]/) == -1) {
		$m.alert("Enter valid Email Id");
		//return emailText.substring(0,emailText.length-1);
		return "";
	}
	return emailText;
}

function validateRemarks(remarks) {
	if (!remarks) {
		return "";
	}
	if (remarks.search(/[a-zA-Z]/) == -1) {
		$m.alert("Enter valid text");
		return "";
	}
	return remarks;
}


function validateMonths(months) {
	if (!months) {
		return "";
	}
	months = parseInt(months);
	if (isNaN(months) || months > 11 || months < 0) {
		$m.alert("Enter valid month");
		return "";
	}
	return months;
}

function backToPayment() {
    navigateTo("payment");
}


function showCustomer() {
	var personalform = juci.dataset("personalForm");
	if (getAge(personalform.LA_DOB) > 18) {
		return true;
	}
	return false;

}

function getlength(event) {
	var mobile = event.value;
	if (mobile.length < 10) {
		$m.alert("Enter valid Number ");
	}
}

function myfunction(e) {
	//todo
}

function closedialog(id){
	utils.HideDialog(id);
}

function openauthentication(proposer) {
	var aadhar;
	utils.PutPref("Proposer",proposer);
	if (proposer == 'LA') {
		aadhar = juci.getControl("LA_aadhar").value();
	} else {
		aadhar = juci.getControl("PR_aadhar").value();
	}
	
	if (aadhar) {
	 	if(aadhar.length < 12){
		$m.alert("Please enter valid Aadhaar number");
		return;
	   }
		$m.juci.dataset("aadharno", aadhar);
		utils.ShowDialog("authentication");
	} else {
		$m.alert("Please enter Aadhar number");
	}
}

function openBiometric(){
	var aadharNo;
	var proposer = utils.GetPref("Proposer");
	var dialogid = "dialog-fingerprint";
	var dialogAuthenticate = "authentication";
	var datasetFingerPrint = "fingerPrint";
	if(proposer == 'LA'){
		aadharNo = $m.juci.getControl("LA_aadhar").value();
	}
	else{
		aadharNo = $m.juci.getControl("PR_aadhar").value();
	}
	$m.juci.dataset("fingerPrint","");
//	var fingerPrintCallback = function(res){
//			if (res.code == 1) {
//				$m.hideProgress();
//				utils.HideDialog(dialogAuthenticate);
//				utils.ShowDialog(dialogid);
//				console.log(res);
//			}
//			if (res.code === 0) {
//				$m.hideProgress();
//				$m.alert(res.error.message, "Finger Print Scan Error", function() {});
//			}
//	};
//	var scanCallback = function(res){
//		if (res.data.status === 0) {
//			utils.HideDialog(dialogid);
//			$m.hideProgress();
//			$m.juci.dataset(datasetFingerPrint,null);
//			$m.alert(res.data.error, "Finger Print Scan Error", function() {});
//		} else if (res.data.status == 1) {
//			var result = res.data.result;
//			var pidblock = x2js.xml_str2json(result);
//			//console.log(JSON.stringify(pidblock));
//			utils.PutPref("PIDData", pidblock);
//		} else if (res.data.status == 2) {
//			$m.hideProgress();
//			var img = "data:image/png;base64,"+res.data.result;
//			$m.juci.dataset("fingerPrint", img);
//		}
//	};
//	AadharServices.CaptureBiometric(aadharNo,fingerPrintCallback,scanCallback);

var ValidateBiometricCallback = function(res) {
		sendfingerPrint(res);
		
	};
	var fingerPrintCallback = function(res) {
		if(res.code == 1){
			var finalData = x2js.xml_str2json(res.result.PID_DATA);
			utils.PutPref("FingerprintData",finalData);
			var morphoInfo = utils.GetPref("MorphoDeviceInfo");
			utils.ShowProgress("Fetching Aadhaar Data..");
			AadharServices.ValidateBiometric(morphoInfo,finalData,ValidateBiometricCallback);
		} else {
			$m.alert(res.result);
			$m.logError("finger print callback failed due to : "+res);
		}	
	};
	var getMorphoDeviceCallback = function(res) {
		if(res.code == 1){
			utils.HideProgress();
			var finalRes = x2js.xml_str2json(res.result.DeviceInfo);
			utils.PutPref("MorphoDeviceInfo",finalRes);
			$m.initFingerCaptureInput(fingerPrintCallback);
		} else {
			utils.HideProgress();
			$m.alert(res.result);
			$m.logError("morpho device callback failed due to : "+res);
		}
	};
	var registerMorphoCallback = function () {
		utils.HideProgress();
		utils.ShowProgress("Capturing device data..");
		$m.getMorphoDeviceInfo(getMorphoDeviceCallback);
	};
	AadharServices.RegisterMorphoDevice(aadharNo,registerMorphoCallback);
}

	function setAadharData(aadharObject){
		var Aadhar_data = {
			"Name": aadharObject.Name,
			"DateofBirth": aadharObject.DOB,
			"Gender": aadharObject.Gender,
			"Phone": aadharObject.Phone,
			"EmailID": aadharObject.Email,
			"Address": aadharObject.House + " " + aadharObject.Landmark+ " " + aadharObject.Locality + " " + aadharObject.Street + " " + aadharObject.District + " " + aadharObject.PinCode
		};
		return Aadhar_data;
	}
			
	function  assignObjectData(objects){
		var customer_photo = $m.getPref("customer_photo_"+ applicationNumber);
		var aadharObj = {}
			aadharObj.AadhaarNumber = objects.Aadhar_Number;
			aadharObj.Name = objects.Customer_Name;
			aadharObj.DOB = utils.GetDateByHyphen(utils.GetDateByTimeStamp(objects.DOB));
			aadharObj.Gender = objects.Gender;
			aadharObj.Phone = objects.Contact_No;
			aadharObj.Email = objects.Email_ID;
			aadharObj.House = objects.House_Identifier;
			aadharObj.Street = objects.Street_Name;
			aadharObj.Landmark = objects.Landmark;
			aadharObj.Photo = customer_photo;
			aadharObj.Locality = objects.Locality;
			aadharObj.city = objects.City;
			aadharObj.SubDistrict = objects.Sub_District;
			aadharObj.District = objects.District;
			aadharObj.State = objects.State;
			aadharObj.PinCode = objects.Pincode;
			return aadharObj;	
		}
		
	function getAadhaar(Lead_Id){
		var aadharCallback = function(res){
			var aadharrows = res.rows[0];
			sapcode = aadharrows.Added_By
			 var aadharCallback = function(resp){
					utils.PutPref("Aadhar_resultLA_" + applicationNumber, resp[0].ekycXml);
					utils.PutPref("customer_photo_" + applicationNumber, resp[0].customer);
					var aadharObject =  assignObjectData(aadharrows);
					utils.PutPref("Adhar_dataLA_" + applicationNumber, aadharObject);
					var aadharData = setAadharData(aadharObject);
					$m.juci.dataset("AadharData",aadharData);
					$m.juci.dataset("aadhar_section", true);
					$m.juci.dataset("hasLeadAadhar", true);
					var personalForm = $m.juci.dataset('personalForm');
					personalForm.LA_Aadharno = aadharObject.AadhaarNumber;
					$m.juci.dataset('personalForm',personalForm);
					var checkAadhar = utils.GetPref("checkAadhar");
					if(checkAadhar == true) {
						$m.juci.getControl("checkLA").value(true);
						$m.juci.dataset("checkLAaadhar",true);
						fetchLAAadharDetails();	
					}
		   		};
			 fireRequestEkycXml("getEkycBySapCode",sapcode,Lead_Id,aadharCallback);
		};
		utils.PojoSelectWithFilter("Customer_Aadhar_Details",aadharCallback,Lead_Id);		
	}
	
	function setLeadData(Lead_Id){
		var leadCallback = function(res){
	    	var leadData = res.rows[0];
	    	var occupationArr = $m.juci.dataset("occupation");
			var maritalStatusArr = $m.juci.dataset("maritalStatus");
			var educationArr = $m.juci.dataset("education")
	    	var personalData = $m.juci.dataset('personalForm');	
	    	personalData.LA_Education = setValueFromOptions("education", {
				"Description": leadData.Educational_Background
			}, lAComparator);
			personalData.LA_MaritalStatus = setValueFromOptions("maritalStatus", {
				"Description": leadData.Marital_Status
			}, lAComparator);
			personalData.LA_Occupation = setValueFromOptions("occupation", {
				"Description": leadData.Occupation
			}, lAComparator);
			personalData.LA_City = leadData.City;
			personalData.LA_Pincode = leadData.Pin_Code;
			personalData.LA_State = leadData.State;
			personalData.LEAD_REF_No = leadData.Lead_Id;
			personalData.LA_AddressLine1 = leadData.Address_1;
			personalData.LA_AddressLine2 = leadData.Address_2;
			personalData.LA_AddressLine3 = leadData.Address_3;
			personalData.LA_Mobileno = leadData.Mobile;
			personalData.LA_Nationality = {"LA_CODE":"IND","Decription":"Indian"}
			personalData.LA_EmailId = leadData.Email_ID ? leadData.Email_ID : ""
			personalData.LA_LandLineno = leadData.Landline ? leadData.Landline : "";
			for(var i=0;i<occupationArr.length;i++){
				if(occupationArr[i].Description == leadData.Occupation){
					personalData.LA_Occupation = setValueFromOptions("occupation", {
						"LA_CODE": occupationArr[i].LA_CODE
					}, localLaComparator);
				}
			}
			for(var j=0;j<maritalStatusArr.length;j++){
				if(maritalStatusArr[j].Description == leadData.Marital_Status){
					personalData.LA_MaritalStatus = setValueFromOptions("maritalStatus", {
						"LA_CODE": maritalStatusArr[j].LA_CODE
					}, localLaComparator);
				}
			}
			for(var j=0;j<educationArr.length;j++){
				if(educationArr[j].Description == leadData.Educational_Background){
					personalData.LA_Education = setValueFromOptions("education", {
						"LA_CODE": educationArr[j].LA_CODE
					}, localLaComparator);
				}
			}
			 var isLaLdSame = utils.GetPref("isLaLdSame");
		     if(isLaLdSame == true){
		     	personalData.IS_LA_PR_SAME = "N";
				personalData.PR_City = leadData.City;
				personalData.PR_Pincode = leadData.Pin_Code;
				personalData.PR_State = leadData.State;
				personalData.PR_AddressLine1 = leadData.Address_1;
				personalData.PR_AddressLine2 = leadData.Address_2;
				personalData.PR_AddressLine3 = leadData.Address_3;
				personalData.PR_Mobileno = leadData.Mobile;
				if(leadData.PR_Gender == "M"){
					utils.GetControl("PR_gender").toggle(1);
					$m.juci.dataset("proposerSalutation", maleSalutation);
					$m.juci.dataset("relationOfTheProposer", Proposer_Male);
					personalData.PR_Salutation = setValueFromOptions("salutation", {
						"LA_CODE": "MR"
					}, localLaComparator);
				} else {
					utils.GetControl("PR_gender").toggle(0);
					$m.juci.dataset("proposerSalutation", femaleSalutation);
					$m.juci.dataset("relationOfTheProposer", Proposer_Female);
					personalData.PR_Salutation = setValueFromOptions("salutation", {
						"LA_CODE": "MISS"
					}, localLaComparator);
				}
				personalData.PR_Name = leadData.Name;
				personalData.PR_DOB = new Date(leadData.DOB);
				personalData.PR_Nationality = {"LA_CODE":"IND","Decription":"Indian"}
				personalData.PR_EmailId = leadData.Email_ID ? leadData.Email_ID : "";
				personalData.PR_LandLineno = leadData.Landline ? leadData.Landline : "";
				for(var i=0;i<occupationArr.length;i++){
					if(occupationArr[i].Description == leadData.Occupation){
						personalData.PR_Occupation = setValueFromOptions("occupation", {
							"LA_CODE": occupationArr[i].LA_CODE
						}, localLaComparator);
					}
				}
				for(var j=0;j<maritalStatusArr.length;j++){
					if(maritalStatusArr[j].Description == leadData.Marital_Status){
						personalData.PR_MaritalStatus = setValueFromOptions("maritalStatus", {
							"LA_CODE": maritalStatusArr[j].LA_CODE
						}, localLaComparator);
					}
				}
				for(var j=0;j<educationArr.length;j++){
					if(educationArr[j].Description == leadData.Educational_Background){
						personalData.PR_Education = setValueFromOptions("education", {
							"LA_CODE": educationArr[j].LA_CODE
						}, localLaComparator);
					}
				}
				personalData.PR_EmailId = personalData.PR_EmailId ? leadData.PR_EmailId : ""	
		     }
			$m.juci.dataset('personalForm',personalData);
			$m.juci.dataset("hasLead",true);
			//utils.RemovePref("Lead_ID");
			var Aadhaar_Lead_Id = utils.GetPref("AadhaarLead_ID");
			if(Aadhaar_Lead_Id){
				getAadhaar(Aadhaar_Lead_Id);
			}
	    	};
    	utils.PojoSelectwithLead_Id("inputPojo",leadCallback,Lead_Id);	
	}
	
	function setCollapse(tabArray){
		for(var i=0 ;i<tabArray.length;i++){
			document.getElementById(tabArray[i]).className = 'tab';
		}
	}
	
	function showAadhaarTable(proposer){
      var aadharData;
      var documentArray;
      var imageArray =[];
	  if(proposer == "LA"){
	  	  var aadharObject = utils.GetPref("Adhar_dataLA_" + applicationNumber);
	  	  aadharData = assignAadhaarImage(aadharObject);
	  	  imageArray.push(aadharData);
	  	  documentArray = "LA_Aadhaar_Document";
	  }
	  else{
		  var aadharObject = utils.GetPref("Adhar_dataPR_" + applicationNumber);
		  aadharData = assignAadhaarImage(aadharObject);
		  imageArray.push(aadharData);
		  documentArray = "PR_Aadhaar_Document";
	  }
	  $m.juci.dataset(documentArray,imageArray);
	}
	
	function assignAadhaarImage(aadharObject){
		var obj = {};
			obj.img = "data:image/png;base64,"+aadharObject.Photo;
			obj.name = aadharObject.Name;
			obj.dob = aadharObject.DOB;
			obj.address = aadharObject.House + " " + aadharObject.Landmark+ " " + aadharObject.Locality + " " + aadharObject.Street + " " + aadharObject.District + " " + aadharObject.PinCode;
			return obj;
		}
		
function addressCheck(str){
	if(!str || str == ""){
		return "";
	}
	var checkstatus = /^[A-Za-z0-9][A-Za-z0-9\'-( )&#,%./\-]*$/.test(str);
	personalDataAdd = str;
	if(checkstatus == false){
		personalDataAdd = str.substring(1);
		addressCheck(personalDataAdd);
	}
	return personalDataAdd;
}

function onBrachCodeSelect(event){
	var count = 0;
	var eventValue = event.value;
	var partnerList = $m.juci.dataset("partnerBranchDetailsList");
	var updateBranchName = $m.juci.dataset("personalForm");
	for(var i=0;i<partnerList.length;i++) {
		if(eventValue == partnerList[i].Branch_Code) {
			count++;
			updateBranchName.Branch_Name = partnerList[i].Branch_Name;
			$m.juci.dataset("isBranchCodeValid",true);
			$m.juci.getControl("brach-name").disable();
		}
	}
	if(count == 0){
		$m.alert("Plese Enter the valid Branch code");
		$m.juci.dataset("isBranchCodeValid",false);	
		return;
	}
	$m.juci.dataset("personalForm",updateBranchName);
}

function readPartnerBranchData(){
	var fileObj = $m.file("partnerBranchdata.txt",{"level": $m.APP_LEVEL, "storageType": $m.SDCARD});
	$m.fileExists(fileObj, function(response){
		if(response.code == -1) {
			return;
		}
		if(response.result){
			$m.readFile(fileObj, function(response){
				if(response.code == -1) {
					return;
				}
				if(response.code){
					var entitiesData = JSON.parse(response.result);
					var fileContent = entitiesData.entities;
					$m.juci.dataset("partnerBranchDetailsList",fileContent);
					console.log(fileContent);
				} else{
					var errMsg = response.error.message;
				}
			});
		}else {
			var errMsg = response.error.message;
		}
	});
}
	
		