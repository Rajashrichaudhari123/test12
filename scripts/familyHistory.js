/**
 * familyhistory.js
 * @author CloudPact Technologies
 * @description : This script is used for familyhistory data storing into local db.
 **/
 
 // saving data into local db
function openNext3(){
	 $m.juci.dataset("app_number","") ;
	var ques = juci.getControl("per-ques").value();
	if($m.juci.dataset('familyHistoryForm').illnessConditions == 'Y' && $m.juci.dataset('diseaseDetailsTable').length == 0){
		$m.alert("Add atleast a family member as you have selected the option as 'Yes'");
	}else if(ques == 'N'){
		navigateTo("lifeinsurence");
	}else if($m.juci.dataset('familyHistoryForm').illnessConditions == 'Y'){
		var familyDbArray = [];
		var familyMemberDetails = $m.juci.dataset('diseaseDetailsTable');
		familyMemberDetails.forEach(function(obj,index){
			var currentObject = {};
			currentObject.Application_Number = applicationNumber;
			currentObject.FHID_LA_PRPOSER = " ";
			currentObject.FHID_FAMILEMEMBER = obj.familyMember.LA_CODE;
			currentObject.FHID_CAUSEOFDEATH = obj.aliveOrNot == 'Y' ? obj.diseaseSuffering : obj.causeOfDeath.LA_CODE;
			currentObject.FHID_CURRENTAGEIFALIVE = obj.currentage ? obj.currentage : " ";
			currentObject.FHID_DEATHAGEIFDECEASED = obj.ageatdeath ? obj.ageatdeath : " ";
			currentObject.FH_AGEATDIAGNOSIS = obj.ageOfDiagnosis ? obj.ageOfDiagnosis : null;
			currentObject.IS_FAMILYMEMBERALIVE = obj.aliveOrNot;
			currentObject.Row_No = index+1;
		    currentObject.Txn_Id  = Math.floor(100000 + Math.random() * 900000);
			familyDbArray.push(new PDC_FAMILYHISTORY_Details(currentObject));
		});
		 new window.DB(CONSTANTS.DBName, function(dbHelper) {
             window.dbHelper = dbHelper;
            PDC_FAMILYHISTORY_Details.removeAll(applicationNumber,function(){
            	PDC_FAMILYHISTORY_Details.multipleInsert(familyDbArray, function() {
					//$m.logInfo("Family History Details  inserted successfully");       
						navigateTo("lifeinsurence");
					}, function(res) {
						$m.logError("Failed to insert family details--- " + JSON.stringify(res));
						$m.alert("Error while inserting to database");
					});
	            }, function(){
	            	
	            });
			 }, function(error) {
			        $m.logError("Unable to open database due to -- " + JSON.stringify(error));
			        $m.alert("Error while opening database");
	   		 });
	}
}

function familyHistoryFormDetails(applicationNumber){
	$m.juci.dataset("familyHistoryForm",bindingObject.familyHistory);
    new window.DB(CONSTANTS.DBName, function(dbHelper) {
        window.dbHelper = dbHelper;
        if (applicationNumber) {
			$m.juci.dataset("Application_Number", applicationNumber);
			PDC_LifeStyle_Details.SelectWithFilter(applicationNumber,function(success_response){//Edit 29-10-2015
				var resultObject = success_response.rows[0];//Edit 29-10-2015
				var illnessConditions = resultObject.FHistory_FamilyDied_YN;//Edit 29-10-2015
				$m.juci.dataset('lifeStyleQuestionsForm',resultObject);
	            PDC_FAMILYHISTORY_Details.SelectWithFilter(applicationNumber,function(success_response){
					var resultArray = success_response.rows;
					var familyArray = [];
					resultArray.forEach(function(obj){
						var currentObject = {};
						currentObject.lifetobeassuredorproposer		=	obj.FHID_LA_PRPOSER;
						currentObject.familyMember					=	setValueFromOptions("familyMember",{"LA_CODE":obj.FHID_FAMILEMEMBER}, localLaComparator);
						currentObject.causeOfDeath					=	obj.IS_FAMILYMEMBERALIVE == 'N' ? setValueFromOptions("causeOfDeath",{"LA_CODE":obj.FHID_CAUSEOFDEATH}, localLaComparator) : "";
						currentObject.currentage					=	obj.FHID_CURRENTAGEIFALIVE;
						currentObject.ageatdeath					=	obj.FHID_DEATHAGEIFDECEASED;
						currentObject.diseaseSuffering				=	obj.IS_FAMILYMEMBERALIVE == 'Y' ? obj.FHID_CAUSEOFDEATH : "";
						currentObject.ageOfDiagnosis				=	obj.FH_AGEATDIAGNOSIS;
						currentObject.aliveOrNot					=	obj.IS_FAMILYMEMBERALIVE;
						familyArray.push(currentObject);
					});
					var familyObject = {
						"illnessConditions"		:	illnessConditions, //resultArray.length ? 'Y' : 'N', Edit 29-10-2015
					};
					$m.juci.dataset('familyHistoryForm',familyObject);
					$m.juci.dataset("diseaseDetailsTable",familyArray);
	            },function(failure_response){
					$m.logError("Read failed -- " + JSON.stringify(failure_response));
					$m.alert("Error while fetching from database");
	            });
			},function(failure_response){
				$m.logError("Read failed -- " + JSON.stringify(failure_response));
				$m.alert("Error while fetching from database");
			});
        }else{
        	$m.juci.dataset("diseaseDetailsTable", []);
        }
    }, function(error) {
        $m.logError("Unable to open database due to -- " + JSON.stringify(error));
        $m.alert("Error while opening database");
    });
}