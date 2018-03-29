

function formateDatePanel() {
    var datePanel = $m.juci.getPanel("juci_calendar_panel");
    datePanel.j.el.style.height = '100%';
    datePanel.j.el.style.background = rgba(221, 221, 221, 0.792157);
}

function openNext4(){
	var datasetData = $m.juci.dataset('lifeStyleQuestionsForm');
	datasetData.Application_Number = applicationNumber;
	datasetData.ParentInsuranceDetails_SA = $m.juci.dataset('lifeInsuranceForm').parentsInsurance;
	datasetData.NameoftheHusbandParent = $m.juci.dataset('lifeInsuranceForm').nameOfTheHusbandOrParent;
	datasetData.TotalSAontheHusband = $m.juci.dataset('lifeInsuranceForm').totalSAOnLifeOfHusbandOrParent;
	var check_value = /^[0-9]*$/.test(datasetData.TotalSAontheHusband);
	if(check_value == false){
		$m.toast("Please enter all the fields");
		return;
	}
	datasetData.Existing_LifeInsurance_Cover_YN = $m.juci.dataset('lifeInsuranceForm').insurancePolicyHeld ? $m.juci.dataset('lifeInsuranceForm').insurancePolicyHeld : 'N';
    var PDC_LifeStyle_Details_object = new PDC_LifeStyle_Details(datasetData);
	new window.DB(CONSTANTS.DBName, function(dbHelper) {
         window.dbHelper = dbHelper;
    PDC_LifeStyle_Details_object.update(function() {
    	if($m.juci.dataset('lifeInsuranceForm').insurancePolicyHeld == 'Y' && $m.juci.dataset("lifeInsuranceTable").length === 0){
			$m.alert("Add atleast one policy as you have selected the option as 'Yes'");
			
		}else if($m.juci.dataset('lifeInsuranceForm').insurancePolicyHeld == 'Y'){
			var lifeInsuranceDbArray = [];
			var lifeInsuranceDetails = $m.juci.dataset('lifeInsuranceTable');
			lifeInsuranceDetails.forEach(function(obj,index){
				var currentObject = {};
				currentObject.DETAILS_LA_PROPOSER = " ";
				currentObject.COMPANYNAME = obj.companyName.LA_CODE;
				currentObject.CONTRACT_PROPOSALNO = obj.contractproposalno ? obj.contractproposalno : " ";
				currentObject.BASIC_SUM_ASSURED = obj.basicsumassured ? obj.basicsumassured : " ";
				currentObject.SUM_ASSURED_URIDER = obj.sumassuredunderrisk ? obj.sumassuredunderrisk : " ";
				currentObject.RISK_COMMENCE_DATE = obj.riskcommencementdate ? obj.riskcommencementdate.getTime() : " ";
				currentObject.Present_Status = obj.presentStatus ? obj.presentStatus.LA_CODE : " ";
				currentObject.Row_No = index+1;
				currentObject.Application_Number = applicationNumber;
				 currentObject.Txn_Id  = Math.floor(100000 + Math.random() * 900000);
				lifeInsuranceDbArray.push(new PDC_EXISITINGPOLICIES_Details(currentObject));
			});
		        PDC_EXISITINGPOLICIES_Details.removeAll(applicationNumber,function(){
				PDC_EXISITINGPOLICIES_Details.multipleInsert(lifeInsuranceDbArray, function() {
					//$m.logInfo("life insurance Details  inserted successfully");       
					var data = {"applicationNumber":applicationNumber};
						var planCode = $m.getPref("planDetails_" + applicationNumber);
						if(planCode.PLanCode == 114){
							navigateTo("vernacular"); 
						} else {
							navigateTo("lifestyle");
						}
				}, function(res) {
					$m.logError("Failed to insert life insurance details--- " + JSON.stringify(res));
					$m.alert("Error while inserting to database");
				});
		        }, function(){
	            	
	            });
			}else{
				var planCode = $m.getPref("planDetails_"+applicationNumber);
				if(planCode.PLanCode == 114){
					navigateTo("vernacular");
				} else {
					navigateTo("lifestyle");
				}
			}
			},function(res) {
      		  	$m.logError("Failed to insert Life Style Medical details--- " + JSON.stringify(res));
     		    $m.alert("Error while inserting to database");
   		 });
		},function(error) {
	        $m.logError("Unable to open database due to -- " + JSON.stringify(error));
	        $m.alert("Error while opening database");
    	});
}


function lifeInsurance(applicationNumber){
	$m.juci.dataset("lifeInsuranceForm",bindingObject.lifeInsurance);
	$m.juci.dataset("lifeStyleQuestionsForm",bindingObject.PDC_LifeStyle_Details);
    new window.DB(CONSTANTS.DBName, function(dbHelper) {
        window.dbHelper = dbHelper;
        if (applicationNumber) {
        	$m.savePref();
			var data = $m.getPref("customerDetails");
			$m.juci.dataset("PersonalDetails", data);
			$m.juci.dataset("Application_Number", applicationNumber);
			PDC_LifeStyle_Details.SelectWithFilter(applicationNumber,function(success_response){
				var lifeResultObject = success_response.rows[0];
				$m.juci.dataset('lifeStyleQuestionsForm',lifeResultObject);
				PDC_EXISITINGPOLICIES_Details.SelectWithFilter(applicationNumber,function(success_response){
					var resultArray = success_response.rows;
					var lifeInsuranceArray = [];
					resultArray.forEach(function(obj){
						var currentObject = {};
						currentObject.lifetobeassuredorproposer		=	obj.DETAILS_LA_PROPOSER;
						currentObject.companyName					=	setValueFromOptions("companyName",{"LA_CODE":obj.COMPANYNAME}, localLaComparator);
						currentObject.contractproposalno			=	obj.CONTRACT_PROPOSALNO;
						currentObject.basicsumassured				=	obj.BASIC_SUM_ASSURED;
						currentObject.sumassuredunderrisk			=	obj.SUM_ASSURED_URIDER;
						currentObject.riskcommencementdate			=	obj.RISK_COMMENCE_DATE ? new Date(obj.RISK_COMMENCE_DATE) :obj.RISK_COMMENCE_DATE ;
						currentObject.presentStatus					=	setValueFromOptions("presentStatus",{"LA_CODE":obj.Present_Status},localLaComparator);
						lifeInsuranceArray.push(currentObject);
					});
					var lifeInsuranceObject = {
						"insurancePolicyHeld"	:	resultArray.length ? 'Y' : 'N',
						"parentsInsurance"					: lifeResultObject.ParentInsuranceDetails_SA,
						"nameOfTheHusbandOrParent"			: lifeResultObject.NameoftheHusbandParent,
						"totalSAOnLifeOfHusbandOrParent"	: lifeResultObject.TotalSAontheHusband
					};
					$m.juci.dataset('lifeInsuranceForm',lifeInsuranceObject);
					$m.juci.dataset("lifeInsuranceTable",lifeInsuranceArray)
				},function(failure_response){
					$m.logError("Read failed -- " + JSON.stringify(failure_response));
					$m.alert("Error while fetching from database");
				});
			},function(failure_response){
				$m.logError("Read failed -- " + JSON.stringify(failure_response));
				$m.alert("Error while fetching from database");
			});
			$m.juci.dataset("genderForParentOrHusband",$m.getPref("customerDetails").LA_Gender);
        }
    }, function(error) {
        $m.logError("Unable to open database due to -- " + JSON.stringify(error));
        $m.alert("Error while opening database");
    });
}
