/**
 * subdropdowns.js
 *
 * @author CloudPact Technologies
 * @description : Contains sub dropdown list based on activity type,campaign
 */
var exisiting_Advisor = ["Jai","Amit","Navneet"];
var recruitment = ["Goldmine Visit","Recruitment prospect Visit"];
var joint_call =  ["Jai","Amit","Navneet"];
var adv_list = ["Relationship Building","Need Analysis","Proposal","Post Selling visit","Reference Request"];
var gold_mine = ["Reference Request"];
var rec_props_name = ["BOP","ARF Log-in","Reference Request","1st contact without BOP","Training","Exam","New License Celebration Meet"];
var adv_list_joint = ["Relationship Building","Need Analysis","Proposal","Post Selling visit","Reference Request"];
var sub_type_option = ["Relationship Building","Need Analysis","Proposal","Post Selling visit","Reference Request"];
var reg_activity = ["Exisiting Advisor","Recruitment","Joint Call for NB"];
var diwali_milan = ["Need Analysis","Proposal","Closing","Post Selling Visit","Reference","Renewal Collection"];
//var tax_damaka = ["Tax consultation","Need Analysis","Proposal","Closing","Post Selling Visit","Reference","Renewal Collection"];
var lead_disposition = ["Need Analysis/Proposal","Post selling Visit/Reference Request","Not Interested","Irated Customer","Follow up","Renewal collected/Follow up","Service Update"];
var holi_milan = ["Greeting Visit","Need Analysis","Proposal","Closing","Post Selling Visit","Reference","Renewal Collection"];
var exit_adv = ["Follow-up call","Training"];
var recruit = ["Reference Request","BOP","ARF Log-in"];
var with_whom = ["Dinesh","Vinod","Banu"];
var activity_time = ["1","2","3","4","5","6","7","8","9","10","11"];
var NBcampaign = ["Diwali Milan","Tax Dhamaka","Super Tax Dhamaka","Holi Milan","Regular Campaign","Others"];
var reccampaign = ["Campaign 1","Campaign 2","Campaign 3","Campaign 4"];
var existingcampaign = ["Campaign 1","Campaign 2","Campaign 3","Campaign 4"];
var joint_for_call = ["Relationship Building","Need Analysis","Proposal","Policy closed - Application Number","Post Selling visit","Reference Request"];
var newSubActivityOptions = ["Training","Relationship Building"];
var Campaign = ["Children","Health","Family","Financial","Existing customers","Diwali Mela","Tax Child Plan","Tax Retirement Plan"];
var flsActvityOptions = ["Joint Call for NB","NOJC"];
var subDropdowns = ["Contact-Not Interested","Contact- Call back","Contact-Appointment","Contact- Non serviceable location","Contact- Do not call","contact - short hang up" ,"Non contact- wrong/invalid number","Non contact- not reachable/switched off","non contact- ringing/engaged","non contact- fresh leads"];
var lead_dis_notMet = ["To be followed", "Re-scheduled appointment", " Not interested", "Ringing", "Not reachable", "Right person not available", "Non serviceable area","Client straight away denied giving appointment"];
var changeLeadCategoryDropdownForServiceUpdate = [{
			"LA_CODE": "Contact Number change",
			"Description":"Contact Number change"
		},{
			"LA_CODE": "Address change",
			"Description":"Address change"
		},{
			"LA_CODE": "Nominee change",
			"Description":"Nominee change"
		},{
			"LA_CODE": "Bank Detail update",
			"Description":"Bank Detail update"
		},{
			"LA_CODE": "E-mail id update",
			"Description":"E-mail id update"
		}];

 function GetADVbySM(SM_CodeValue,dataset){
 	if(dbHelper){
		var filter = new window.DB.Filter.equal("SM_Code", "'" + SM_CodeValue + "'");
		SHData.SelectWithFilter(["Adv_Emp_Code as code","Adv_Emp_Name as name"],filter,setSuccessCallBack(dataset),setErrorCallBack(dataset),true);
 	}
}

function setSuccessCallBack(dataset){
	return function(response){
		$m.juci.dataset(dataset,response.rows);
	};
}

function setErrorCallBack(dataset){
		return function(response){
	};
}
