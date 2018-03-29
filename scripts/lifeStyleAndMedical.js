/**
 * LifeStyleAndMedical.js
 * @author CloudPact Technologies
 * @description : This script is used for storing life style and medical data into local db.
 **/

$m.juci.addDataset("annuityMap", "");

/** storing life style and medical data into local db **/
function openNext5() {
    var datasetData = $m.juci.dataset('lifeStyleQuestionsForm');
    var plancode = $m.getPref("planDetails_" + applicationNumber);
    if (plancode) {
        juci.dataset("annuityMap", plancode.PLanCode);
    }
    datasetData.Txn_Date = new Date(plancode.Application_Dt).getTime();

    if (isNaN(datasetData.CFReport_4_FinancialStanding_Income)) {
        datasetData.CFReport_4_FinancialStanding_Income = datasetData.CFReport_4_FinancialStanding_Income.replace(/,/g, "");
    }
    if (datasetData.QsLS_28a_Smoke_YN == "Y" && datasetData.QsLS_28a_Smoke_Cigarettes_YN != "Y" && datasetData.QsLS_28a_Smoke_ECigarettes_YN != "Y" && datasetData.QsLS_28a_Smoke_Beedi_YN != "Y" && datasetData.QsLS_28a_Smoke_Chew_YN != "Y" && datasetData.QsLS_28a_Smoke_Gutka_YN != "Y" && datasetData.QsLS_28a_Smoke_OTH_YN != "Y") {
        $m.alert("Add atleast one option for smoke habit");
    } else if (datasetData.QsLS_28b_Alcohol_Consume_YN == "Y" && datasetData.QsLS_28b_Alcohol_Beer_YN != "Y" && datasetData.QsLS_28b_Alcohol_Wine_YN != "Y" && datasetData.QsLS_28b_Alcohol_HardLiquor_YN != "Y" && datasetData.QsLS_28b_Alcohol_OTH_YN != "Y") {
        $m.alert("Add atleast one option for alcohol/liquor habit");
    } else {
        if (datasetData.QsLS_27_TravelOutsideIndia_YN == 'Y'){
        	datasetData.QsLS_27_TravelOutsideIndia_Purpose = datasetData.QsLS_27_TravelOutsideIndia_Purpose.LA_CODE;
        	datasetData.QsLS_27_TravelOutsideIndia_Country = datasetData.QsLS_27_TravelOutsideIndia_Country.LA_CODE;	
        }else{
        	datasetData.QsLS_27_TravelOutsideIndia_Purpose = "";
        	datasetData.QsLS_27_TravelOutsideIndia_Country = "";	
        }
        if (datasetData.QsLS_35_Pregnant_YN == 'Y') {
            datasetData.QsLS_35_Pregnant_ExpDeliveryDT = datasetData.QsLS_35_Pregnant_ExpDeliveryDT.getTime();
        } else {
            datasetData.QsLS_35_Pregnant_ExpDeliveryDT = "";
        }
        datasetData.Application_Number = applicationNumber;
        if (datasetData.QsLS_28a_Smoke_YN == 'N') {
            datasetData.QsLS_28a_Smoke_Cigarettes_YN = "";
            datasetData.QsLS_28a_Smoke_ECigarettes_YN = "";
            datasetData.QsLS_28a_Smoke_Beedi_YN = "";
            datasetData.QsLS_28a_Smoke_Chew_YN = "";
            datasetData.QsLS_28a_Smoke_Gutka_YN = "";
            datasetData.QsLS_28a_Smoke_OTH_YN = "";
        }

        if (datasetData.QsLS_28b_Alcohol_Consume_YN == 'N') {
            datasetData.QsLS_28b_Alcohol_Beer_YN = "";
            datasetData.QsLS_28b_Alcohol_Wine_YN = "";
            datasetData.QsLS_28b_Alcohol_HardLiquor_YN = "";
            datasetData.QsLS_28b_Alcohol_OTH_YN = "";
        }
        datasetData.Txn_Id = Math.floor(100000 + Math.random() * 900000);
        utils.PutPref("Questionaries",datasetData);
        new window.DB(CONSTANTS.DBName, function(dbHelper) {
            window.dbHelper = dbHelper;
            var PDC_LifeStyle_Details_object = new PDC_LifeStyle_Details(datasetData);
            PDC_LifeStyle_Details_object.update(function() {
              //  $m.logInfo("Life Style Medical Details  inserted successfully");
                var data = {
                    "applicationNumber": applicationNumber
                };
                navigateTo("vernacular");
            }, function(res) {
                $m.logError("Failed to insert Life Style Medical details--- " + JSON.stringify(res));
                $m.alert("Error while inserting to database");
            });
        }, function(error) {
            $m.logError("Unable to open database due to -- " + JSON.stringify(error));
            $m.alert("Error while opening database");
        });
    }
}

function onPregnantYesOrNo(event) {
    if (event.value == 'N') {
        event.context.getBindingContext().$data.QsLS_35_Pregnant_ExpDeliveryDT("");
        event.context.getBindingContext().$data.QsLS_35_Pregnant_Duration("");
        $m.juci.getControl("pregnant-months").clearValidation();
        $m.juci.getControl("delivery-date").clearValidation();
    }
}

function onDeliveryDateChanged(event) {
    if (event.context.getBindingContext().$data.QsLS_35_Pregnant_ExpDeliveryDT().setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
        event.context.getBindingContext().$data.QsLS_35_Pregnant_ExpDeliveryDT("");
        $m.alert("Delivery date cannot be lesser than Today's Date");
    }
}

function getAnnuityValidate() {
    juci.dataset("annuityMap");
    var annuityId = juci.dataset("annuityMap");
    if (annuityId != "") {
        if (annuityId == '114') {
            return true;
        } else {
            return false;
        }
    }
}

function checkHeightorWeight(event){
	if(event.value == 0){
		var a = juci.dataset('lifeStyleQuestionsForm');
		a.QsLS_29_Weight_Kg = "";
		juci.dataset('lifeStyleQuestionsForm',a);
		$m.alert("weigth cannot be zero");
	}
}