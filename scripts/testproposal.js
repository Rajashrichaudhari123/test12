var applicationNumber, isFromBI = true,
	eventData;
var info = {
	"plan": "Reliance Endowment Plan",
	"name": "Neha Nigam",
	"custid": "282937393"
};

juci.dataset("annuityPlanQues", "");

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
$m.juci.addDataset("hasAadhar", true);
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

//***Given Same id for all forms to avoid validations for now.
$m.onReady(function() {
	// Code to execute when the page is ready
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
	//juci.getControl("checkLA").value(false);
	//  juci.getControl("checkPR").value(false);


});

$m.onResume(function() {
	// Code to execute when the page is resumed
	juci.dataset("headerName", "Proposal");
	var head = document.getElementsByClassName("juci_panel_title");
	juci.viewModel.applyBinding(head[0]);
	$m.juci.dataset("alertcount", "3");
	//var alincome = $m.juci.findById("alincome");
	//alincome.el.childNodes[2].onfocus = delegate(alincome.el.childNodes[2], removeCommas);
	//alincome.el.childNodes[2].onblur = delegate(alincome.el.childNodes[2], addCommas);
});

$m.onData(function(eventObject) {
	$m.logInfo("On Data Response : " + JSON.stringify(eventObject.data));
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
	// juci.getControl("otp-aadhar").value(null);
	// juci.getControl("otpNo").value(null);
});


function popuateLifeAssuredDetails(eventObject) {
	$m.juci.dataset("personalForm", bindingObject.PDC_Customer_Details);
	juci.getControl("nach").value() == "Y";
	juci.getControl("isLaSame").value("Y");
	if (eventObject.data.PLanCode) {
		var planNumber = eventObject.data.PLanCode;
	}
	juci.findById("togbtn5").removeClass("toggled");
	juci.findById("togbtn2").addClass("toggled");
	juci.getControl("togbtn2").enable();
	//            juci.findById("togbtn2").addClass("toggled");
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

				resultObject.LA_DOB = new Date(resultObject.LA_DOB);
				if (getAge(new Date(resultObject.LA_DOB)) < 18) {
					resultObject.IS_LA_PR_SAME = 'N';
					var isLaSame = juci.findById("isLaSame");
					isLaSame.findByClass("juci_switch2_bar")[0].disable();
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
				if (!resultObject.PR_IsRelianceEmp) {
					resultObject.PR_IsRelianceEmp = "N";
				}
				if (resultObject.IS_LA_PR_SAME == 'N') {
					resultObject.PR_Salutation = setValueFromOptions("salutation", {
						"LA_CODE": resultObject.PR_Salutation
					}, localLaComparator);
					if (resultObject.PR_Gender == "F") {
						$m.juci.dataset("proposerSalutation", femaleSalutation);
						$m.juci.dataset("relationOfTheProposer", Proposer_Female);
					} else {
						$m.juci.dataset("proposerSalutation", maleSalutation);
						$m.juci.dataset("relationOfTheProposer", Proposer_Male);
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
				$m.logInfo("BI response : " + JSON.stringify(eventObject.data));
				var dataset2 = $m.juci.dataset('personalForm');
				dataset2.LA_Name = eventData.name.replace(/-/g, " ");
				dataset2.LA_Gender = getFormattedGender(eventData.sex);
				dataset2.LA_DOB = (eventData.dob != null) ? getDOBObj(eventData.dob) : "";
				if (getAge(eventData.dob) < 18) {
					dataset2.IS_LA_PR_SAME = 'N';
				}
				if (dataset2.LA_Gender == "M" || dataset2.LA_Gender == "male" || dataset2.LA_Gender == "Male") {
					$m.juci.dataset("salutation", maleSalutation);
					$m.juci.dataset("personalsalutation", maleSalutation);

					dataset2.LA_Salutation = setValueFromOptions("salutation", {
						"LA_CODE": "MR"
					}, localLaComparator);
				} else if (dataset2.LA_Gender == "F" || dataset2.LA_Gender == "female" || dataset2.LA_Gender == "Female") {
					$m.juci.dataset("salutation", femaleSalutation);
					$m.juci.dataset("personalsalutation", femaleSalutation);

					dataset2.LA_Salutation = setValueFromOptions("salutation", {
						"LA_CODE": "MISS"
					}, localLaComparator);
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
					$m.logInfo("application number response : " + JSON.stringify(response));
					delete eventObject.data.fname;
					if (response.Child) {
						// Success
						//  var resultData = response.result.data;
						$m.logInfo("resultData : " + response);
						// applicationNo = resultData.replace(/\r?\n|\r/g, " ").replace(/\s/g, '');
						var appNo = response;
						if(eventObject.data.PLanCode == "122" || eventObject.data.PLanCode == "128" || eventObject.data.PLanCode == "129" || eventObject.data.PLanCode == "148"){
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
						create();
						if (!planCodes) {
							planCodes = $m.getPref("planDetails");
							$m.putPref("planDetails_" + applicationNumber, planCodes);
							$m.savePref();
						}
						$m.putPref("planName_" + applicationNumber, planCodes);
						$m.savePref();
						if (planNumber == 117 || planNumber == 118) {
							$m.juci.findById("LifeAnnuity").disable();
							$m.juci.findById("AnnuityPayOpt").disable();
							$m.juci.findById("Annuity").show();
						} else if (planNumber == 114) {
							$m.juci.findById("LifeAnnuity").enable();
							$m.juci.findById("AnnuityPayOpt").enable();
							$m.juci.findById("Annuity").show();
							$m.juci.findById("isLaSame").disable();
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
						$m.juci.dataset('personalForm', dataset2);
						//eventObject.data.Parent_Application_Number = appNo.secondAppNo;
						eventObject.data.Txn_Id = Math.floor(100000 + Math.random() * 900000);
						var planDetails = new PDC_Plan_Details(eventObject.data)
						PDC_Plan_Details.multipleInsert([planDetails], function(success_response) {
							$m.logInfo("successfully inserted");
						}, function(failure_response) {
							$m.logError("Read failed -- " + JSON.stringify(failure_response));
							$m.alert("Error while inserting into database");
						}, function() {});
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
		if (!resultObject.PR_IsRelianceEmp) {
			resultObject.PR_IsRelianceEmp = "N";
		}
		if (resultObject.PR_Gender == "") {
			resultObject.PR_Gender = "M";
		}
		if (resultObject.PR_Gender == 'M') {
			juci.findById("prtog").addClass("toggled");
			juci.findById("prtog1").removeClass("toggled");
			$m.juci.dataset("proposerSalutation", maleSalutation);
			$m.juci.dataset("relationOfTheProposer", Proposer_Male);
		} else {
			juci.findById("prtog").removeClass("toggled");
			juci.findById("prtog1").addClass("toggled");
			$m.juci.dataset("proposerSalutation", femaleSalutation);
			$m.juci.dataset("relationOfTheProposer", Proposer_Female);
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
			if (resultObject.PR_LA_Relationship == "") {
				if (resultObject.PR_Gender == "M") {
					$m.juci.dataset("relationOfTheProposer", Proposer_Male);
				} else {

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
	var aadhar;
	if (proposer == 'LA') {
		aadhar = juci.getControl("LA_aadhar").value();
		$m.juci.dataset("aadharno", aadhar);
	} else {
		aadhar = juci.getControl("PR_aadhar").value();
		$m.juci.dataset("aadharPrNo", aadhar);
	}
	if (aadhar) {
		getOtp(proposer,aadhar);
	} else {
		$m.alert("Please enter Aadhar number");
	}
}

function getOtp(proposer,aadhar) {
	var callback = function(response) {
		var result = x2js.xml_str2json(response.data);
		var arr = [];
		var adhar = [];
		arr.push(result.Envelope.Body.Production_GetOTP_KUAResponse.Production_GetOTP_KUAResult.KeyValueOfstringstring);
		var Adhar_data = arr[0];
		if (Adhar_data.Value) {
			if (Adhar_data.Value.__text == "OTP Sent") {
				$m.toast("OTP Sent Sucessfully");
					if (proposer == 'LA') {
				juci.hideDialog("dialog-box2");
	            juci.showDialog("dialog-box2");
         	}     else {
         		juci.hideDialog("dialog-aadhar");
	         	juci.showDialog("dialog-aadhar");
        	}
			} else if (Adhar_data.Value.__text == "Error During Generation Of signature or Console application Not Running" ||
				Adhar_data.Value.__text == "OTP XSD Validation Failed." ||
				Adhar_data.Value.__text == "Audit Logging in DB is failed for request.") {
				$m.hideProgress();
				$m.alert("Error in Request.Please try again");
			} else if (Adhar_data.Value.__text == "Aadhaar number is incorrect. Resident shall use correct Aadhaar" ||
				Adhar_data.Value.__text == "Invalid Aadhaar Number") {
				$m.hideProgress();
				$m.alert("Invalid Aadhaar Number");
			}
		}
	}
	AadharServices.GetOtp(aadhar, callback);
}

function sendOtp(event) {
	var aadharObject = {};
	var aadhar = juci.getControl("LA_aadhar").value();
	var Otp = juci.getControl("otpNo").value();
	if (!Otp) {
		$m.alert("Please enter Otp");
		return false;
	}
	$m.showProgress("Fetching Aadhar Details...");
	juci.findById("adhar-section").show();
	var callback = function(response){
		var aadhar_result = response.data;
		$m.putPref("Aadhar_resultLA_" + applicationNumber,aadhar_result);
		$m.savePref();
		//aadhar_result = aadhar_result.replace(/"/g, '\\"');
		aadhar_result = request;
		var result = x2js.xml_str2json(response.data);
		var Adhar_data = result.Envelope.Body.Production_NSDLEkycThroughOTPResponse.Production_NSDLEkycThroughOTPResult.KeyValueOfstringstring;
		if (Adhar_data.Value) {
			if (Adhar_data.Value.__text == "Invalid OTP value") {
				$m.hideProgress();
				juci.getControl("otpNo").value(null);
				$m.alert("Invalid OTP value");
				return;
			}
			if (Adhar_data.Value.__text == "Some Exception Occured Check Log For More Details") {
				$m.hideProgress();
				juci.getControl("otpNo").value(null);
				$m.alert("Server is not responding.Please try again later");
				return;
			}
		}
		for (var i = 0; i < Adhar_data.length; i++) {
		aadharObject[Adhar_data[i].Key.__text] = Adhar_data[i].Value.__text ? Adhar_data[i].Value.__text :"";
	}
	if (!aadharObject["Landmark"] && !aadharObject["House"] && !aadharObject["Locality"] && !aadharObject["City"] && !aadharObject["Street"] && !aadharObject["State"]) {
		$m.hideProgress();
		$m.juci.getControl("otpNo").value(null);
		$m.juci.hideDialog("dialog-box2");
		$m.alert("Aadhar Address fields are empty.Please fill your application without Aadhar ");
		return;
	}
	    saveimage(adhar[17], 'LA');
		$m.putPref("Adhar_dataLA_" + applicationNumber, aadharObject);
		$m.savePref();
		aadharObject["Gender"] = aadharObject["Gender"] == "M" ? "Male" : (aadharObject["Gender"] == "F" ? "Female" : "");
		var Aadhar_data = {};
		Aadhar_data.Name = aadharObject["Name"],
		Aadhar_data.DateofBirth = aadharObject["DOB"],
		Aadhar_data.Gender = aadharObject["Gender"],
		Aadhar_data.Phone = aadharObject["Contact"],
		Aadhar_data.EmailID = aadharObject["Email"],
		Aadhar_data.Address = aadharObject["House"] + " " + aadharObject["Landmark"] + " " + aadharObject["Locality"] + " " + aadharObject["Street"] + " " + aadharObject["District"] + " " + aadharObject["PinCode"]
		if (aadharObject["Name"]) {
			$m.juci.dataset("Aadhar", Aadhar_data);
			juci.hideDialog("dialog-box2");
			$m.hideProgress();
		} else {
			$m.hideProgress();
			juci.getControl("otpNo").value(null);
			$m.alert("Your Aadhar No is Invalid");
			return;
		}
		juci.getControl("otpNo").value(null);
	} 
	AadharServices.VerifyOtp(Otp, aadhar, callback);
}

function sendAdharOtp(event) {
	var aadhar = juci.getControl("PR_aadhar").value();;
	var Otp = juci.getControl("otp-aadhar").value();
	if (!Otp) {
		$m.alert("Please enter Otp");
		return false;
	}
	//juci.hideDialog("dialog-aadhar");
	$m.showProgress("Fetching Aadhar Details...");
	juci.findById("adhar-section2").show();
	var callback = function(response) {
		var aadhar_result = response.data;
		$m.putPref("Aadhar_resultPR_" + applicationNumber, aadhar_result);
		$m.savePref();
		var result = x2js.xml_str2json(response.data);
		var arr = [];
		var adhar = [];
		arr.push(result.Envelope.Body.Production_NSDLEkycThroughOTPResponse.Production_NSDLEkycThroughOTPResult.KeyValueOfstringstring);
		var Adhar_data = arr[0];
		if (Adhar_data.Value) {
			if (Adhar_data.Value.__text == "Invalid OTP value") {
				$m.hideProgress();
				juci.getControl("otp-aadhar").value(null);
				$m.alert("Invalid OTP value");
				return;
			}
			if (Adhar_data.Value.__text == "Some Exception Occured Check Log For More Details") {
				$m.hideProgress();
				juci.getControl("otp-aadhar").value(null);
				$m.alert("Server is not responding.Please try again later");
				return;
			}
		}
		for (var i = 0; i < Adhar_data.length; i++) {
			adhar.push(Adhar_data[i].Value.__text);
		}
		for (var i = 0; i < adhar.length; i++) {
			adhar[i] = adhar[i] === undefined ? "" : adhar[i];
		}
		if (!adhar[7] && !adhar[8] && !adhar[9] && !adhar[11] && !adhar[12] && !adhar[13]) {
			$m.hideProgress();
			juci.getControl("otp-aadhar").value(null);
			juci.hideDialog("dialog-aadhar");
			$m.alert("Aadhar Address fields are empty.Please fill your application without Aadhar");
			return;
		}
		saveimage(adhar[17], 'PR');
		$m.putPref("Adhar_dataPR_" + applicationNumber, adhar);
		$m.savePref();
		if (adhar[3] == "M") {
			adhar[3] = "Male";
		} else if (adhar[3] == "F") {
			adhar[3] = "Female";
		}
		var Aadhar_data = {
			"Name": adhar[1],
			"DateofBirth": adhar[2],
			"Gender": adhar[3],
			"Phone": adhar[4],
			"EmailID": adhar[5],
			"Address": adhar[8] + " " + adhar[7] + " " + adhar[9] + " " + adhar[11] + " " + adhar[12] + " " + adhar[15]
		};
		if (adhar[1]) {
			$m.juci.dataset("AadharPr_Data", Aadhar_data);
			juci.hideDialog("dialog-aadhar");
			$m.hideProgress();
		} else {
			$m.hideProgress();
			juci.getControl("otp-aadhar").value(null);
			$m.alert("Your OTP  is Invalid");
			return;
		}
		juci.getControl("otp-aadhar").value(null);
		//FetchProposerAadharDetails(adhar);
	}
	AadharServices.VerifyOtp(Otp, aadhar, callback);
}

function backToProposal() {
	scrollToTop();
	var requestdata = $m.juci.dataset('personalForm');
	openLifeAssured(requestdata.Application_Number)
}

function tooglegender(e) {
	switch (e.newToggled) {
		case 0:
			juci.dataset("personalForm").LA_Gender = "M";
			$m.juci.dataset("salutation", maleSalutation);
			$m.juci.dataset("appointeeSalutation", maleSalutation);

			$m.juci.dataset("relationOfTheNominee", AppointeeMalerelationship);
			$m.juci.dataset("appointeeRelationship", AppointeeMalerelationship);
			break;
		case 1:
			juci.dataset("personalForm").LA_Gender = "F";
			$m.juci.dataset("salutation", femaleSalutation);
			$m.juci.dataset("appointeeSalutation", femaleSalutation);
			$m.juci.dataset("relationOfTheNominee", AppointeeFemalerelationship);
			$m.juci.dataset("appointeeRelationship", AppointeeFemalerelationship);
			break;
	}
}

// Proposal View ending

//Family History starting
function openFamilyHistory() {
	debugger;

}

function closebox() {
	juci.hideDialog("dialog-box2");
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
	juci.findById("togbtn3").removeClass("toggled");
	juci.findById("togbtn4").addClass("toggled");
}

function openSelfieVideoPage(){
	//todo
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
			//            juci.findById("togbtn3").removeClass("toggled");
			//            juci.findById("togbtn4").removeClass("toggled");
			//            juci.findById("togbtn2").addClass("toggled");
			break;
		case 2:
			//	prepaymentreview = juci.findById("prepaymentReview");
			//            	juci.findById("togbtn2").removeClass("toggled");
			//			    	juci.findById("togbtn3").addClass("toggled");
			//			    	 juci.findById("togbtn4").removeClass("toggled");
			prepaymentreview.show();
			break;
		case 3:
			//        		juci.findById("togbtn2").removeClass("toggled");
			//        	juci.findById("togbtn3").removeClass("toggled");
			//           juci.findById("togbtn4").addClass("toggled");

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
					resultObject.NOM_Salutation = resultObject.NOM_Salutation ? setValueFromOptions("nomineeSalutation", {
						"LA_CODE": resultObject.NOM_Salutation
					}, localLaComparator) : setValueFromOptions("nomineeSalutation", {
						"LA_CODE": 'MR'
					}, localLaComparator);

				} else if (resultObject.NOM_Gender == "F") {
					$m.juci.dataset("nomineeSalutation", femaleSalutation);
					$m.juci.dataset("relationOfTheNominee", AppointeeFemalerelationship);
					//                 	juci.findById("nomtog").removeClass("toggled");
					//                 juci.findById("nomtog1").addClass("toggled");
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


						$m.juci.dataset("appointeeRelationship", AppointeeFemalerelationship);
					}
				}
				if (resultObject.APP_Gender == "M") {
					$m.juci.dataset("appointeeSalutation", maleSalutation);
					$m.juci.dataset("appointeeRelationship", AppointeeMalerelationship);
					resultObject.APP_Salutation = resultObject.APP_Salutation ? setValueFromOptions("appointeeSalutation", {
						"LA_CODE": resultObject.APP_Salutation
					}, localLaComparator) : setValueFromOptions("appointeeSalutation", {
						"LA_CODE": 'MR'
					}, localLaComparator);
				} else if (resultObject.APP_Gender == "F") {
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
	new window.DB(CONSTANTS.DBName, function(dbHelper) {
		window.dbHelper = dbHelper;
		if (applicationNumber) {
			PDC_LifeStyle_Details.SelectWithFilter(applicationNumber, function(success_response) {
				var resultObject = success_response.rows[0];
				resultObject.Ins_Repository_Type = setValueFromOptions("insuranceRepository", {
					"LA_CODE": resultObject.Ins_Repository_Type
				}, localLaComparator);
				resultObject.Ins_Repository_YN = resultObject.Ins_Repository_YN ? resultObject.Ins_Repository_YN : "N";
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
	juci.findById("togbtn3").removeClass("toggled");
	juci.findById("togbtn4").removeClass("toggled");
	juci.findById("togbtn2").removeClass("toggled");
	juci.findById("togbtn5").addClass("toggled");
	juci.getControl("togbtn4").disable();
	juci.getControl("togbtn3").disable();
	juci.getControl("togbtn2").disable();
	juci.getControl("togbtn5").enable();

	var personalDetails = $m.juci.dataset("personalForm");
	$m.juci.dataset("hasProposer", false);

	var plandetails = $m.getPref("planDetails_" + applicationNumber);
	$m.juci.dataset("InstallmentPremium_ST", plandetails.InstallmentPremium_ST);
	$m.juci.dataset("hasinstalPremium", false);

	if (personalDetails.IS_LA_PR_SAME === "N") {
		$m.juci.dataset("hasProposer", true);
	}
	if ($m.getPref(AdharPref.LA_adharphoto + applicationNumber)) {
		$m.juci.dataset("hasAadhar", false);
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
	var hascheque = $m.juci.dataset("hascheque");
	if ($m.getPref(AdharPref.LA_adharphoto + applicationNumber) && !hasInstall_Pre && hascheque) {
		document.getElementById("tab-customer").className = 'tab';
		document.getElementById("tab-chequedoc").className = 'tab';
		document.getElementById("tab-other").className = 'tab';
	} else if ($m.getPref(AdharPref.LA_adharphoto + applicationNumber) && !hasInstall_Pre) {
		document.getElementById("tab-customer").className = 'tab';
		document.getElementById("tab-other").className = 'tab';
	} else if (!hasInstall_Pre && hascheque) {
		document.getElementById("tab-photoLa").className = 'tab';
		document.getElementById("tab-addressLa").className = 'tab';
		document.getElementById("idproofsec").className = 'tab';
		document.getElementById("ageLa").className = 'tab';
		document.getElementById("tab-chequedoc").className = 'tab';
		document.getElementById("tab-customer").className = 'tab';
		document.getElementById("tab-other").className = 'tab';

	} else if (hascheque && hasInstall_Pre) {
		document.getElementById("tab-photoLa").className = 'tab';
		document.getElementById("tab-addressLa").className = 'tab';
		document.getElementById("idproofsec").className = 'tab';
		document.getElementById("ageLa").className = 'tab';
		document.getElementById("tab-customer").className = 'tab';
		document.getElementById("tab-other").className = 'tab';
		document.getElementById("tab-incomeLa").className = 'tab';
		document.getElementById("tab-chequedoc").className = 'tab';

	} else if (hasInstall_Pre) {
		document.getElementById("tab-photoLa").className = 'tab';
		document.getElementById("tab-addressLa").className = 'tab';
		document.getElementById("idproofsec").className = 'tab';
		document.getElementById("ageLa").className = 'tab';
		document.getElementById("tab-customer").className = 'tab';
		document.getElementById("tab-other").className = 'tab';
		document.getElementById("tab-incomeLa").className = 'tab';
		//	document.getElementById("tab-chequedoc").className = 'tab';
	} else {
		juci.findById("idproofsec").show();
		juci.findById("ageLa").show();
		document.getElementById("tab-photoLa").className = 'tab';
		document.getElementById("tab-addressLa").className = 'tab';
		document.getElementById("idproofsec").className = 'tab';
		//	document.getElementById("tab-incomeLa").className = 'tab';
		document.getElementById("ageLa").className = 'tab';
		document.getElementById("tab-customer").className = 'tab';
		document.getElementById("tab-other").className = 'tab';
	}
	var hasProposer = $m.juci.dataset("hasProposer");
	var Pr_aadhar = $m.getPref("PR_aadharselect" + applicationNumber);

	if (hasProposer && $m.getPref(AdharPref.PR_adharphoto + applicationNumber) && !hasInstall_Pre) {

	} else if (hasProposer && $m.getPref(AdharPref.PR_adharphoto + applicationNumber)) {
		document.getElementById("tab-incomePr").className = 'tab';

	} else if (hasProposer && !hasInstall_Pre) {

		document.getElementById("tab-photoPr").className = 'tab';
		document.getElementById("tab-addressPr").className = 'tab';
		document.getElementById("idPr").className = 'tab';
		document.getElementById("agePr").className = 'tab';

	} else if (hasProposer && hasInstall_Pre) {

		document.getElementById("tab-photoPr").className = 'tab';
		document.getElementById("tab-addressPr").className = 'tab';
		document.getElementById("idPr").className = 'tab';
		document.getElementById("agePr").className = 'tab';
		document.getElementById("tab-incomePr").className = 'tab';

	} else if (hasProposer) {
		juci.findById("idPr").show();
		juci.findById("agePr").show();
		document.getElementById("tab-photoPr").className = 'tab';
		document.getElementById("tab-addressPr").className = 'tab';
		document.getElementById("idPr").className = 'tab';
		document.getElementById("agePr").className = 'tab';
		document.getElementById("tab-incomePr").className = 'tab';
	}
	$m.juci.dataset("uploaddocuments", uploadDocuments);
	uploadDocuments.optionselectedforproposeridproof = getValueFromProofMaster(proofsMaster, "Identity Proof");
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

function alert(e) {
	$m.alert("hi");
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

function FetchAadharDetails(aadhar) {
	var aadhar = juci.getControl("LA_aadhar").value();
	if (aadhar) {
		var PlanDetails = $m.getPref("planDetails");
		var aadhar_details = $m.getPref("Adhar_dataLA_" + applicationNumber);
		var check_option = juci.getControl("checkLA").value();
		var check = juci.dataset("checkaadharLA");
		var Personal_data = juci.dataset("personalForm");
		var bi_dob = new Date(changeFormat(PlanDetails.dob)).getTime();
		var aadhar_dob = new Date(changeFormat(aadhar_details[2])).getTime();
		if (check_option) {
			$m.putPref("aadharLA_value_" + applicationNumber, true);
			$m.savePref();
			if ((bi_dob === aadhar_dob) || (Personal_data.LA_Name == aadhar_details[1].toUpperCase())) {
				readadharimage('LA');

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
						if (aadhar_details[8] || aadhar_details[9]) {
							Personal_data.LA_AddressLine1 = aadhar_details[8] + " " + aadhar_details[9];
							var ad1 = aadhar_details[8] + " " + aadhar_details[9];
							var ad1length = ad1.length;
							if (Personal_data.LA_AddressLine1.length > 30) {
								Personal_data.LA_AddressLine1 = Personal_data.LA_AddressLine1.slice(0, 30);
								var address1 = ad1.slice(30, ad1length);
							}
							Personal_data.LA_AddressLine1 = Personal_data.LA_AddressLine1.trim();
						}
						//                        else if (aadhar_details[8] || aadhar_details[9]) {
						//                            Personal_data.LA_AddressLine1 = aadhar_details[8]  + aadhar_details[9];
						//                        }
						if (aadhar_details[11] || aadhar_details[12] || aadhar_details[13]) {
							var ad2 = address1 + "" + aadhar_details[11] + " " + aadhar_details[12] + " " + aadhar_details[13];
							var ad2length = ad2.length;

							Personal_data.LA_AddressLine2 = address1 + "" + aadhar_details[11] + " " + aadhar_details[12] + " " + aadhar_details[13];
							if (Personal_data.LA_AddressLine2.length > 30) {
								Personal_data.LA_AddressLine2 = Personal_data.LA_AddressLine2.slice(0, 30);
								var AddressLine2 = ad2.slice(30, ad2length);
							}
							Personal_data.LA_AddressLine2 = Personal_data.LA_AddressLine2.trim();
						}
						//                        else if(aadhar_details[11] || aadhar_details[12] || aadhar_details[13]){
						//                            Personal_data.LA_AddressLine2 = aadhar_details[11]  + aadhar_details[12] + aadhar_details[13];
						//                        }
						if (aadhar_details[7]) {
							Personal_data.LA_AddressLine3 = AddressLine2 + " " + aadhar_details[7];
							if (Personal_data.LA_AddressLine3.length > 30) {
								Personal_data.LA_AddressLine3 = Personal_data.LA_AddressLine3.slice(0, 30);
							}
							Personal_data.LA_AddressLine3 = Personal_data.LA_AddressLine3.trim();
						}
						Personal_data.LA_City = aadhar_details[10];
						Personal_data.LA_EmailId = aadhar_details[5];
						Personal_data.LA_Mobileno = aadhar_details[4];
						Personal_data.LA_Pincode = aadhar_details[15];
						Personal_data.LA_State = aadhar_details[14];
						if (!Personal_data.LA_AddressLine3 && aadhar_details[13]) {
							Personal_data.LA_AddressLine3 = aadhar_details[13];
						}
						if (!Personal_data.LA_AddressLine2 && aadhar_details[9]) {
							Personal_data.LA_AddressLine2 = aadhar_details[9];
						}
						if (!Personal_data.LA_AddressLine1 && aadhar_details[13]) {
							Personal_data.LA_AddressLine1 = aadhar_details[13];
						}
						if ((!Personal_data.LA_AddressLine1) && (!Personal_data.LA_AddressLine2) && (aadhar_details[7])) {
							Personal_data.LA_AddressLine2 = aadhar_details[7];
							Personal_data.LA_AddressLine1 = aadhar_details[7];
						}
						if ((!Personal_data.LA_AddressLine2) && (!Personal_data.LA_AddressLine3) && (aadhar_details[9])) {
							Personal_data.LA_AddressLine2 = aadhar_details[9];
							Personal_data.LA_AddressLine3 = aadhar_details[9];
						}
						if ((!Personal_data.LA_AddressLine1) && (!Personal_data.LA_AddressLine3) && (aadhar_details[13])) {
							Personal_data.LA_AddressLine1 = aadhar_details[13];
							Personal_data.LA_AddressLine3 = aadhar_details[12];
						}
						juci.dataset("personalForm", Personal_data);
						if (Personal_data.LA_AddressLine1) {
							$m.juci.getControl("ad1").disable();
						}
						if (Personal_data.LA_AddressLine2) {
							$m.juci.getControl("Address2").disable();
						}
						if (Personal_data.LA_AddressLine3) {
							$m.juci.getControl("Address3").disable();
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
							$m.alert("Regenrerate a BI with Aadhar details and re-apply");
							//callService(PlanDetails);
							$m.open("Products", "/Products/Products.html");
						}
					});
				});
			}
		} else {

			$m.removePref(AdharPref.LA_adharphoto + applicationNumber);
			Personal_data.LA_AddressLine1 = "";
			Personal_data.LA_AddressLine2 = "";
			Personal_data.LA_AddressLine3 = "";
			Personal_data.LA_EmailId = "";
			Personal_data.LA_Mobileno = "";
			Personal_data.LA_Pincode = "";
			Personal_data.LA_City = "";
			Personal_data.LA_State = "";
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
		var PlanDetails = $m.getPref("planDetails");
		var aadhar_details = $m.getPref("Adhar_dataPR_" + applicationNumber);
		var check = juci.dataset("checkaadharPR");
		var check_option = juci.getControl("checkPR").value();
		//aadhar_details[2]="10-08-1992";
		//aadhar_details[1]="keelu bhaskar rao";
		var Personal_data = juci.dataset("personalForm");
		var bi_dob = new Date(changeFormat(PlanDetails.dob)).getTime();
		var aadhar_dob = new Date(changeFormat(aadhar_details[2])).getTime();

		if (check_option) {
			$m.putPref("aadharPR_value_" + applicationNumber, true);
			$m.savePref();
			if (aadhar_details[1] && aadhar_details[2]) {
				readadharimage('PR');
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

						if (aadhar_details[8] || aadhar_details[9]) {
							Personal_data.PR_AddressLine1 = aadhar_details[8] + " " + aadhar_details[9];
							var ad1 = aadhar_details[8] + " " + aadhar_details[9];
							var ad1length = ad1.length;
							if (Personal_data.PR_AddressLine1.length > 30) {
								Personal_data.PR_AddressLine1 = Personal_data.PR_AddressLine1.slice(0, 30);
								var address1 = ad1.slice(30, ad1length);

							}
							Personal_data.PR_AddressLine1 = Personal_data.PR_AddressLine1.trim();
						}
						//                        else if (aadhar_details[8] || aadhar_details[9]) {
						//                            Personal_data.LA_AddressLine1 = aadhar_details[8]  + aadhar_details[9];
						//                        }
						if (aadhar_details[11] || aadhar_details[12] || aadhar_details[13]) {
							var ad2 = address1 + "" + aadhar_details[11] + " " + aadhar_details[12] + " " + aadhar_details[13];
							var ad2length = ad2.length;

							Personal_data.PR_AddressLine2 = address1 + "" + aadhar_details[11] + " " + aadhar_details[12] + " " + aadhar_details[13];


							if (Personal_data.PR_AddressLine2.length > 30) {
								Personal_data.PR_AddressLine2 = Personal_data.PR_AddressLine2.slice(0, 30);
								var AddressLine2 = ad2.slice(30, ad2length);
							}
							Personal_data.PR_AddressLine2 = Personal_data.PR_AddressLine2.trim();
						}
						//                        else if(aadhar_details[11] || aadhar_details[12] || aadhar_details[13]){
						//                            Personal_data.LA_AddressLine2 = aadhar_details[11]  + aadhar_details[12] + aadhar_details[13];
						//                        }

						if (aadhar_details[7]) {
							Personal_data.PR_AddressLine3 = AddressLine2 + " " + aadhar_details[7];
							if (Personal_data.PR_AddressLine3.length > 30) {
								Personal_data.PR_AddressLine3 = Personal_data.PR_AddressLine3.slice(0, 30);
							}
							Personal_data.PR_AddressLine3 = Personal_data.PR_AddressLine3.trim();
						}
						Personal_data.PR_Name = aadhar_details[1];
						Personal_data.PR_DOB = getDOBObj(aadhar_details[2]);
						Personal_data.PR_City = aadhar_details[10];
						Personal_data.PR_EmailId = aadhar_details[5];
						Personal_data.PR_Mobileno = aadhar_details[4];
						Personal_data.PR_Pincode = aadhar_details[15];
						if (!Personal_data.PR_AddressLine3 && aadhar_details[13]) {
							Personal_data.PR_AddressLine3 = aadhar_details[13];
						}
						if (!Personal_data.PR_AddressLine2 && aadhar_details[9]) {
							Personal_data.PR_AddressLine2 = aadhar_details[9];
						}
						if (!Personal_data.PR_AddressLine1 && aadhar_details[13]) {
							Personal_data.PR_AddressLine1 = aadhar_details[13];
						}
						if ((!Personal_data.PR_AddressLine1) && (!Personal_data.PR_AddressLine2) && (aadhar_details[7])) {
							Personal_data.PR_AddressLine2 = aadhar_details[7];
							Personal_data.PR_AddressLine1 = aadhar_details[7];
						}
						if ((!Personal_data.PR_AddressLine2) && (!Personal_data.PR_AddressLine3) && (aadhar_details[9])) {
							Personal_data.PR_AddressLine2 = aadhar_details[9];
							Personal_data.PR_AddressLine3 = aadhar_details[9];
						}
						if ((!Personal_data.PR_AddressLine1) && (!Personal_data.PR_AddressLine3) && (aadhar_details[13])) {
							Personal_data.PR_AddressLine1 = aadhar_details[13];
							Personal_data.PR_AddressLine3 = aadhar_details[12];
						}
						juci.dataset("personalForm", Personal_data);
						if (Personal_data.PR_Name) {
							$m.juci.getControl("PR-name").disable();
						}
						if (Personal_data.PR_DOB) {
							$m.juci.getControl("PR-dob").disable();
						}
						if (Personal_data.PR_AddressLine1) {
							$m.juci.getControl("PR-ad1").disable();
						}
						if (Personal_data.PR_AddressLine2) {
							$m.juci.getControl("PR-Address2").disable();
						}
						if (Personal_data.PR_AddressLine3) {
							$m.juci.getControl("PR-Address3").disable();
						}
						if (Personal_data.PR_Pincode) {
							$m.juci.getControl("PR-Pin").disable();
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
			$m.removePref(AdharPref.PR_adharphoto + applicationNumber);
			Personal_data.PR_Name = "";
			Personal_data.PR_DOB = "";
			Personal_data.PR_AddressLine1 = "";
			Personal_data.PR_AddressLine2 = "";
			Personal_data.PR_AddressLine3 = "";
			Personal_data.PR_Pincode = "";
			Personal_data.PR_EmailId = "";
			Personal_data.PR_Mobileno = "";
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

function create() {
	var fileObj = $m.file("adharLA" + applicationNumber + ".png", {
		"level": $m.APP_LEVEL,
		"storageType": $m.SDCARD
	});
	fileObj.create(function(response) {
		if (response.code == -1) {
			return;
		}
		if (response.code) {
			//	$m.toast("image stored suceesfully");
			createpr();
		} else {
			var errMsg = response.error.message;
		}
	});
}

function createpr() {
	var fileObj = $m.file("adharPR" + applicationNumber + ".png", {
		"level": $m.APP_LEVEL,
		"storageType": $m.SDCARD
	});
	fileObj.create(function(response) {
		if (response.code == -1) {
			return;
		}
		if (response.code) {
			//	$m.toast("image stored suceesfully");
		} else {
			var errMsg = response.error.message;
		}
	});
};

function saveimage(image, Adhar) {
	var fileObj;
	if (Adhar == "LA") {
		fileObj = $m.file("adharLA" + applicationNumber + ".png", {
			"level": $m.APP_LEVEL,
			"storageType": $m.SDCARD
		});
	} else {
		fileObj = $m.file("adharPR" + applicationNumber + ".png", {
			"level": $m.APP_LEVEL,
			"storageType": $m.SDCARD
		});
	}
	$m.writeFile(fileObj, image, function(response) {
		if (response.code == -1) {
			return;
		}
		if (response.code) {
			$m.toast("Image stored suceesfully");
		} else {
			var errMsg = response.error.message;
		}
	});
}



function readadharimage(Adhar) {

	var fileObj;
	if (Adhar == "LA") {
		fileObj = $m.file("adharLA" + applicationNumber + ".png", {
			"level": $m.APP_LEVEL,
			"storageType": $m.SDCARD
		});
	} else {
		fileObj = $m.file("adharPR" + applicationNumber + ".png", {
			"level": $m.APP_LEVEL,
			"storageType": $m.SDCARD
		});
	}
	$m.fileExists(fileObj, function(response) {
		if (response.code == -1) {
			return;
		}
		if (response.result) {
			$m.readFile(fileObj, function(response) {
				if (response.code == -1) {
					return;
				}
				if (response.code) {
					var fileContent = response.result;
					if (fileContent != -1 && fileContent != 0) {
						if (Adhar == "LA") {
							$m.putPref(AdharPref.LA_adharphoto + applicationNumber, fileContent);
							$m.savePref();
						} else {
							$m.putPref(AdharPref.PR_adharphoto + applicationNumber, fileContent);
							$m.savePref();
						}
					} else {
						var errMsg = response.error.message;
					}
				}
			});
		}
	});
}

$m.juci.addDataset("nomineeSalutation", maleSalutation);
function toggleNomineeSalutations(e) {
	var nomGender = juci.dataset("nomineeOrAppointeeDetailsForm");
	switch (e.newToggled) {
		case 0:
			nomGender.NOM_Gender = "M";
			//juci.dataset("nomineeOrAppointeeDetailsForm").NOM_Gender = "M";
			//	juci.getControl("Nomtogg").value("M");
			//	document.getElementById("Nomtogg").value = "M";
			//          	juci.findById("nomtog1").removeClass("toggled");
			//          	juci.findById("nomtog").addClass("toggled");
			//	juci.getControl("nomtog").toggle("0");
			$m.juci.dataset("nomineeSalutation", maleSalutation);
			$m.juci.dataset("relationOfTheNominee", AppointeeMalerelationship);
			$m.juci.dataset("appointeeRelationship", AppointeeMalerelationship);
			juci.dataset("nomineeOrAppointeeDetailsForm", nomGender);
			break;

		case 1:
			nomGender.NOM_Gender = "F";
			//juci.dataset("nomineeOrAppointeeDetailsForm").NOM_Gender = "F";
			//            	juci.findById("nomtog").removeClass("toggled");
			//           		juci.findById("nomtog1").addClass("toggled");
			//juci.getControl("Nomtogg").value("F");
			//	document.getElementById("Nomtogg").value = "F";
			//	juci.getControl("nomtog1").toggle("1");
			$m.juci.dataset("nomineeSalutation", femaleSalutation);
			$m.juci.dataset("relationOfTheNominee", AppointeeFemalerelationship);
			$m.juci.dataset("appointeeRelationship", AppointeeFemalerelationship);
			juci.dataset("nomineeOrAppointeeDetailsForm", nomGender);
			break;
	}

	e.preventDefault();
	e.stopPropagation();
	// juci.dataset("nomineeOrAppointeeDetailsForm",nomGender);
}

function setMale() {

	var nomGender = juci.dataset("nomineeOrAppointeeDetailsForm");
	nomGender.NOM_Gender = "M";
	$m.juci.dataset("nomineeSalutation", maleSalutation);
	$m.juci.dataset("relationOfTheNominee", AppointeeMalerelationship);
	//$m.juci.dataset("appointeeRelationship", AppointeeMalerelationship);
	juci.dataset("nomineeOrAppointeeDetailsForm", nomGender);
	// juci.getControl("nomtog1").disable();
	//  juci.getControl("nomtog").enable();

}


function setFemale() {

	var nomGender = juci.dataset("nomineeOrAppointeeDetailsForm");
	nomGender.NOM_Gender = "F";
	$m.juci.dataset("nomineeSalutation", femaleSalutation);
	$m.juci.dataset("relationOfTheNominee", AppointeeFemalerelationship);
	// $m.juci.dataset("appointeeRelationship", AppointeeFemalerelationship);
	juci.dataset("nomineeOrAppointeeDetailsForm", nomGender);
	//juci.getControl("nomtog").disable();
	// juci.getControl("nomtog1").enable();

}


function setProMale() {
	var proposerGender = juci.dataset("personalForm");
	proposerGender.PR_Gender = "M";
	$m.juci.dataset("proposerSalutation", maleSalutation);
	$m.juci.dataset("relationOfTheProposer", Proposer_Male);
	//  $m.juci.dataset("appointeeRelationship", AppointeeMalerelationship);
	juci.dataset("personalForm", proposerGender);
}

function setProFemale() {
	var proposerGender = juci.dataset("personalForm");
	proposerGender.PR_Gender = "F";
	$m.juci.dataset("proposerSalutation", femaleSalutation);
	$m.juci.dataset("relationOfTheProposer", Proposer_Female);
	juci.dataset("personalForm", proposerGender);
}

function setAppMale() {
	var AppGender = juci.dataset("nomineeOrAppointeeDetailsForm");
	AppGender.APP_Gender = "M";
	$m.juci.dataset("appointeeSalutation", maleSalutation);
	$m.juci.dataset("appointeeRelationship", AppointeeMalerelationship);
	juci.dataset("nomineeOrAppointeeDetailsForm", AppGender);
}

function setAppFemale() {
	var AppGender = juci.dataset("nomineeOrAppointeeDetailsForm");
	AppGender.APP_Gender = "F";
	$m.juci.dataset("appointeeSalutation", femaleSalutation);
	$m.juci.dataset("appointeeRelationship", AppointeeFemalerelationship);
	juci.dataset("nomineeOrAppointeeDetailsForm", AppGender);
}

//function toggleProposerSalutations(e) {
//
//    switch (e.newToggled) {
//        case 0:
//        	var proposerGender = juci.dataset("personalForm");
//            proposerGender.PR_Gender = "M";
//            	juci.findById("prtog1").removeClass("toggled");
//            		juci.findById("prtog").addClass("toggled");
//            juci.dataset("personalForm",proposerGender);
//            $m.juci.dataset("proposerSalutation", maleSalutation);
//            $m.juci.dataset("relationOfTheProposer", Proposer_Male);
//            break;
//        case 1:
////        	var appointeeGender = juci.dataset("personalForm");
////            appointeeGender.PR_Gender = "F";
//
//            	juci.findById("prtog").removeClass("toggled");
//            		juci.findById("prtog1").addClass("toggled");
//            juci.dataset("personalForm",appointeeGender);
//            $m.juci.dataset("proposerSalutation", femaleSalutation);
//            $m.juci.dataset("relationOfTheProposer", Proposer_Female);
//            break;
//    }
//}
//
//function toggleAppointeeSalutations(e) {
//    switch (e.newToggled) {
//        case 0:
//            juci.dataset("nomineeOrAppointeeDetailsForm").APP_Gender = "M";
//            $m.juci.dataset("appointeeSalutation", maleSalutation);
//            $m.juci.dataset("appointeeRelationship", AppointeeMalerelationship);
//            break;
//        case 1:
//            juci.dataset("nomineeOrAppointeeDetailsForm").APP_Gender = "F";
//            $m.juci.dataset("appointeeSalutation", femaleSalutation);
//            $m.juci.dataset("appointeeRelationship", AppointeeFemalerelationship);
//            break;
//    }
//}

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
			juci.findById("togbtn2").removeClass("toggled");
			juci.findById("togbtn3").addClass("toggled");
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

//function backToPayment() {
//    navigateTo("payment");
//}


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
	utils.ShowDialog(id);
}

function openauthentication(proposer) {
	var aadhar;
	if (proposer == 'LA') {
		aadhar = juci.getControl("LA_aadhar").value();
		$m.juci.dataset("aadharno", aadhar);
		if (aadhar) {
			utils.ShowDialog('dialog-authentication');
		} else {
			$m.alert("Please enter Aadhar number");
		}
	} else {
		aadhar = juci.getControl("PR_aadhar").value();
		$m.juci.dataset("aadharPrNo", aadhar);
		if (aadhar) {
			utils.ShowDialog('dialog-authenticationPR');
		} else {
			$m.alert("Please enter Aadhar number");
		}
	}
}
//var agree_check = $m.juci.getControl("checkLA").value;