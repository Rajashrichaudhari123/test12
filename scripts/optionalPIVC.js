var customerForms={
	"customerName":"",
	"DOB":"",
	"LA_AddressLine1":"",
	"mobile":"",
	"emailID":"",
	"Occupation":"",
	"medicine":"N",
	"medical_ailments":"N",
	"surgery":"N",
	"sumassured":"",
	"policyterm":"",
	"ProductName":"",
	"PremiumPayingTerm":"",
	"InstallmentPremium_W_ST":"",
	"PremiumFrequency":"",
	"sapCode":"",
	"ApplicationNo":"",
	"LA_AddressLine2":"",
	"LA_AddressLine3":"",
	"LA_City":"",
	"LA_Pincode":"",
	"LA_State":""
};
var planes=["RNL Classic Plan","RNL Classic Plan II","RNL Classic Plan"];
var Occupation= [{
        "LA_CODE": "AGRI",
        "Description": "Agriculture"
    }, {
        "LA_CODE": "ATQD",
        "Description": "Antique Dealer"
    }, {
        "LA_CODE": "ARMF",
        "Description": "Armed Forces"
    }, {
        "LA_CODE": "BUSI",
        "Description": "Business"
    }, {
        "LA_CODE": "DMDT",
        "Description": "Diamond Trader"
    }, {
        "LA_CODE": "FARM",
        "Description": "Farmer"
    }, {
        "LA_CODE": "JWLD",
        "Description": "Jewellery Dealer"
    }, {
        "LA_CODE": "LABO",
        "Description": "Labour"
    }, {
        "LA_CODE": "LNDL",
        "Description": "Landlord"
    }, {
        "LA_CODE": "MCOP",
        "Description": "Machine Operator"
    }, {
        "LA_CODE": "OTHR",
        "Description": "Other"
    }, {
        "LA_CODE": "PEXP",
        "Description": "Politically Exposed Person"
    }, {
        "LA_CODE": "PROF",
        "Description": "Professional"
    }, {
        "LA_CODE": "SALR",
        "Description": "Salaried"
    }, {
        "LA_CODE": "SELF",
        "Description": "Self Employed"
    }, {
        "LA_CODE": "STUD",
        "Description": "Student"
    }, {
        "LA_CODE": "UNEM",
        "Description": "Unemployed"
    }, {
        "LA_CODE": "WCOM",
        "Description": "Working In Coal Mines"
    }];
var policyTerm=["10","15","20","25"];
$m.juci.addDataset("IS_LA_PR_SAME","N");
$m.juci.addDataset("headerName","OptionalPIVC");
$m.juci.addDataset("policyTerm",policyTerm);
$m.juci.addDataset("Occupation",Occupation);
$m.juci.addDataset("planeName",planes);
$m.juci.addDataset("customerForm",customerForms);
$m.juci.addDataset("isformSubmit",false);
function getInputs(item){ return item.Description; }

$m.onResume(function(eventObject) {
	$m.juci.dataset("customerForm",customerForms);
//	$m.juci.addDataset("isformSubmit",false);
		 $m.juci.getControl("Initiate_PIVC").disable();
});

/** Enable the Initiate PIVC button and save that data to local database**/
function checkAllFields(){
	var customerForm =  $m.juci.dataset("customerForm");
	var InstallmentPremium = $m.juci.getControl("InstallmentPremium").value();
	if(InstallmentPremium.length > 2){
		if(customerForm.customerName.length != 0 &&customerForm.ApplicationNo.length != 0 && customerForm.sapCode.length != 0 &&customerForm.PremiumFrequency.length != 0 && customerForm.PremiumPayingTerm.length != 0 &&customerForm.ProductName.length != 0 &&customerForm.policyterm.length != 0 && customerForm.sumassured.length != 0 &&customerForm.emailID.length != 0 &&customerForm.mobile.length != 0 && customerForm.LA_AddressLine1.length != 0  &&customerForm.Occupation.length != 0 && customerForm.ProductName.length != 0&&customerForm.LA_AddressLine2.length != 0 && customerForm.LA_AddressLine3.length != 0  &&customerForm.LA_City.length != 0 && customerForm.LA_Pincode.length != 0 && customerForm.LA_State.length != 0 && customerForm.DOB.length != 0){
		//	$m.juci.dataset("isformSubmit",true);
			 $m.juci.getControl("Initiate_PIVC").enable();
		}
		else{
			$m.alert("please enter all the fields");
		}
	}
}
/** Checking the leadd DOB with current date or below 18 years**/
function checkTodayDate(){
	var dob = $m.juci.dataset("customerForm").DOB;
	var newdob = new Date(dob).toDateString();
	var currentDate =  new Date().toDateString();
	if(dob > new Date()){
		$m.juci.getDataset("customerForm")().DOB('');
		$m.alert("Date of birth should not be greater than Today's Date");
	}
	else if(newdob == currentDate){
		$m.juci.getDataset("customerForm")().DOB('');
		$m.alert("Date of birth cannot be current date");	
	}
}

//open the next page
function nextPIVCPage(){
	var selfieobj=$m.juci.dataset("customerForm");
		var customerForm =  $m.juci.dataset("customerForm");
	if(customerForm.customerName.length != 0 &&customerForm.ApplicationNo.length != 0 && customerForm.sapCode.length != 0 &&customerForm.PremiumFrequency.length != 0 && customerForm.PremiumPayingTerm.length != 0 &&customerForm.ProductName.length != 0 &&customerForm.policyterm.length != 0 && customerForm.sumassured.length != 0 &&customerForm.emailID.length != 0 &&customerForm.mobile.length != 0 && customerForm.LA_AddressLine1.length != 0  &&customerForm.Occupation.length != 0 && customerForm.ProductName.length != 0&&customerForm.LA_AddressLine2.length != 0 && customerForm.LA_AddressLine3.length != 0  &&customerForm.LA_City.length != 0 && customerForm.LA_Pincode.length != 0 && customerForm.LA_State.length != 0 && customerForm.DOB.length != 0){
	$m.open("openPIVC", "/Optional PIVC/openPIVC.html",selfieobj);
	}
	else{
		$m.alert("please enter all the fields");
	}
 
}

function getValidationMessageforPIVC(event,attribute){
	if(event.message === "Required"){
		event.message = attribute+' '+'is required';
	}	
	else{
		event.message = validationFailedMessage[attribute];
	}
	
}
function doLogoutPIVC(){
	var accountName = __mowbly__.Page.userName;
	$m.confirm(
		{
			"title":accountName,
			"message": "On Logout, if pending cases are not completed & synced, details entered will be deleted. Would you like to logout?",
			"buttons": [
				{"label": "YES"},
				{"label": "No"}
			]
		}, function(index) {
			if(index === 0){
				$m.showProgress(Messages.get("LogoutAccountProgress"));
				__mowbly__.Shell.AccountManager.deleteAccount(accountName);
			}
		}
	);
}

function doLogoutfromPIVC(){
	var accountName = __mowbly__.Page.userName;
	$m.confirm(
		{
			"title":"Logout",
			"message": "On Logout, if pending cases are not completed & synced, details entered will be deleted. Would you like to logout of"+' "'+accountName+'" ?',
			"buttons": [
				{"label": "YES"},
				{"label": "No"}
			]
		}, function(index) {
			if(index === 0){
				$m.showProgress("Please wait..");
				setTimeout(function(){ $m.hideProgress(); }, 4000);
				__mowbly__.Shell.AccountManager.deleteAccount(accountName);
			}
		}
	);

}