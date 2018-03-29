/**
 * show.js
 * @author CloudPact Technologies
 * @description : This script is used for showing the details in application
 **/
var show = false;
var showContent = false;
var showdraft = false;
var showdraftContent = false;
var showlogin = false;
var showloginContent = false;
var showissued = false;
var showissuedContent = false;
var showrejected = false;
var showrejectedContent = false;
 
 // Restart
 function restart(e){
 	if(e.data.dataflag == "D"){
		$m.putPref("restart",true);
		$m.savePref();
		$m.open("proposal","/Applications/proposal.html",e.data);	
	} else {
		$m.alert("Application will restart only for draft proposals");
	}
}

//Sort By,Search By, Filters
var searchBy = false;
function searchby(){
	for(var i=0;i<searchxlist.length;i++){
		searchxlist[i].hide();
	}
	if(sortby === true){
		juci.findById("sort").hide();
	}
	if(filterby === true){
		juci.findById("filter").hide();
	}
	if(searchBy === true){
		juci.findById("searchbox").hide();
		searchBy = false;
		
	}
		if(sortby === true && searchBy === true && filterby === true){
		juci.findById("searchbox").show();
		
	}
	else{
		juci.findById("searchbox").show();
		searchBy = true;
	}
}

var sortby = false;
function sort(){
	for(var i=0;i<searchxlist.length;i++){
		searchxlist[i].hide();
	}
	if(filterby === true){
		juci.findById("filter").hide();
	}
	if(searchBy === true){
		juci.findById("searchbox").hide();
	}
	if(sortby === true){
		juci.findById("sort").hide();
		sortby = false;
	
	}
	if(sortby === true && searchBy === true && filterby === true){
		juci.findById("sort").show();
		
	}
	else{
			juci.findById("sort").show();
			sortby = true;
	
	
	}
}

var filterby = false;
function filter(){
	for(var i=0;i<searchxlist.length;i++){
		searchxlist[i].hide();
	}
	if(searchBy === true){
		juci.findById("searchbox").hide();
	}
	if(sortby === true){
		juci.findById("sort").hide();
	}
	if(filterby === true){
		juci.findById("filter").hide();
		filterby = false;
	
	}
		if(sortby === true && searchBy === true && filterby === true){
		juci.findById("filter").show();
		
	}else{
	   	juci.findById("filter").show();
		filterby = true;
	
		
	}	
}


function  getYears(year){
	return year + " Years";
}


//Call , Email ,SMS
function call(e){
	var mobile = e.data.MobileNumber;
	$m.callContact(mobile);
}

function email(e){
	var emailid = e.data.EmailID;
	$m.email([email], '' , '');
}

function sms(e){
	var sendsms = e.data.MobileNumber;
	$m.sms([sendsms], '');
}

function showlistitem(e){
	if(e.target.el.className == "vertical"){
		var currentindex = e.target.el.parentElement.id;
		var menuid = "menuBox"+currentindex;
		if(show === true){
			$m.juci.findById(menuid).hide();
			show = false;
		}
		else{
			$m.juci.findById(menuid).show();
			show = true;
		}
	}else if(e.target.el.className == "showing"){
		var	currentindex = e.target.el.id;
		var contentid = "less"+e.index;
			var menuItem = document.getElementById(contentid);
		if(menuItem.style.display === "none"){
			document.getElementById(contentid).style.display = "block";
			document.getElementById(currentindex).innerHTML = "Show less";
		}else{
			document.getElementById(contentid).style.display = "none";
			document.getElementById(currentindex).innerHTML = "Show more";
		}
	}
}

function showlistitemfordraft(e){
	if(e.target.el.className == "vertical"){
		var currentindex = e.target.el.parentElement.id;
		var menuid = "menuBoxD"+currentindex;
		if(showdraft === true){
			$m.juci.findById(menuid).hide();
			showdraft = false;
		}
		else{
			$m.juci.findById(menuid).show();
			showdraft = true;
		}
	}else if(e.target.el.className == "showing"){
		 if(e.index == -1){
  			index = e.bindingContext.$index._initialValue;
		 }
		 else{
		  index = e.index;
		 }
	 	var	currentindex = "SMD"+index;
		var contentid = "lessD"+ index;
		var menuItem = document.getElementById(contentid);
		if(menuItem.style.display === "none"){
			document.getElementById(contentid).style.display = "block";
			document.getElementById(currentindex).innerHTML = "Show less";
		}else{
			document.getElementById(contentid).style.display = "none";
			document.getElementById(currentindex).innerHTML = "Show more";
		}
	}else if(e.target.el.className == " juci_button resume"){
		$m.open("proposal","Proposals/proposal.html",e.data);
	}
}


function showlistitemforlogin(e){
	if(e.target.el.className == "vertical"){
		var currentindex = e.target.el.parentElement.id;
		var menuid = "menuBoxL"+currentindex;
		if(showlogin === true){
			$m.juci.findById(menuid).hide();
			showlogin = false;
		}
		else{
			$m.juci.findById(menuid).show();
			showlogin = true;
		}
	}else if(e.target.el.className == "showing"){
		var	currentindex = e.target.el.id;
		var contentid = "lessL"+e.index;
			var menuItem = document.getElementById(contentid);
		if(menuItem.style.display === "none"){
			document.getElementById(contentid).style.display = "block";
			document.getElementById(currentindex).innerHTML = "Show less";
		}else{
			document.getElementById(contentid).style.display = "none";
			document.getElementById(currentindex).innerHTML = "Show more";
		}
	}
}


function showlistitemforissued(e){
	if(e.target.el.className == "vertical"){
		var currentindex = e.target.el.parentElement.id;
		var menuid = "menuBox4"+currentindex;
		if(showissued === true){
			$m.juci.findById(menuid).hide();
			showissued = false;
		}
		else{
			$m.juci.findById(menuid).show();
			showissued = true;
		}
	}else if(e.target.el.className == "showing"){
		var	currentindex = e.target.el.id;
		var contentid = "lessI"+e.index;
			var menuItem = document.getElementById(contentid);
		if(menuItem.style.display === "none"){
			document.getElementById(contentid).style.display = "block";
			document.getElementById(currentindex).innerHTML = "Show less";
		}else{
			document.getElementById(contentid).style.display = "none";
			document.getElementById(currentindex).innerHTML = "Show more";
		}
	}
}

function showlistitemforrejected(e){
	if(e.target.el.className == "vertical"){
		var currentindex = e.target.el.parentElement.id;
		var menuid = "menuBox5"+currentindex;
		if(showrejected === true){
			$m.juci.findById(menuid).hide();
			showrejected = false;
		}
		else{
			$m.juci.findById(menuid).show();
			showrejected = true;
		}
	}else if(e.target.el.className == "showing"){
		var	currentindex = e.target.el.id;
		var contentid = "lessR"+e.index;
			var menuItem = document.getElementById(contentid);
		if(menuItem.style.display === "none"){
			document.getElementById(contentid).style.display = "block";
			document.getElementById(currentindex).innerHTML = "Show less";
		}else{
			document.getElementById(contentid).style.display = "none";
			document.getElementById(currentindex).innerHTML = "Show more";
		}
	}
}

var SortingArray = [];
var optionselectedforsort;

function getSelectedoption(e){
	if(toggleid === 0){
		SortingArray = AllApplications;
	}else if(toggleid == 1){
		//TODO
	}else if(toggleid == 2){
		SortingArray = LoginApplications;
	}else if(toggleid == 3){
		SortingArray = IssuedApplications;
	}else if(toggleid == 4){
		SortingArray = RejectedApplications;
	}
	optionselectedforsort = e.target.value;
	if(e.target.value == "Login Date" || e.target.value == "Issuance Date" || e.target.value == "Draft Date" || e.target.value == "Refund Date"){
		$m.juci.dataset("options3",["Select","Earliest to Latest","Latest to Earliest"]);
	}
}


function getsortedList(e){
	var val = e.target.value;
	if(optionselectedforsort == "Product Name" && val == "Highest to Lowest"){
		SortingArray.sort(sort_by("ProductName", false));
		AssignToDataset(SortingArray);	
	}else if(optionselectedforsort == "Product Name" && val == "Lowest to Highest"){
		SortingArray.sort(sort_by("ProductName", true));
		AssignToDataset(SortingArray);	
	}else if(optionselectedforsort == "Product Type" && val == "Highest to Lowest"){
		SortingArray.sort(sort_by("ProductType", false));
		AssignToDataset(SortingArray);	
	}else if(optionselectedforsort == "Product Type" && val == "Lowest to Highest"){
		SortingArray.sort(sort_by("ProductType", true));
		AssignToDataset(SortingArray);	
	}else if(optionselectedforsort == "Policy Term" && val == "Highest to Lowest"){
		SortingArray.sort(sort_by("PolicyTerm", true, parseInt));
		AssignToDataset(SortingArray);
	}else if(optionselectedforsort == "Policy Term" && val == "Lowest to Highest"){
		SortingArray.sort(sort_by("PolicyTerm", false, parseInt));
		AssignToDataset(SortingArray);
	}else if(optionselectedforsort == "Premium Paying Term" && val == "Highest to Lowest"){
		SortingArray.sort(sort_by("PremiumPayingTerm", true, parseInt));
		AssignToDataset(SortingArray);
	}else if(optionselectedforsort == "Premium Paying Term" && val == "Lowest to Highest"){
		SortingArray.sort(sort_by("PremiumPayingTerm", false, parseInt));
		AssignToDataset(SortingArray);
	}else if(optionselectedforsort == "Premium Amount" && val == "Highest to Lowest"){
		SortingArray.sort(sort_by("Premium", true, parseInt));
		AssignToDataset(SortingArray);
	}else if(optionselectedforsort == "Premium Amount" && val == "Lowest to Highest"){
		SortingArray.sort(sort_by("Premium", false, parseInt));
		AssignToDataset(SortingArray);
	}else if(optionselectedforsort == "Login Date" && val == "Earliest to Latest"){
		SortingArray.sort(function(a,b){
		if(new Date(ChangeFormatofDate(a)).getTime() > new Date(ChangeFormatofDate(b)).getTime())
			return 1;
		else
			return 0;
		});
		AssignToDataset(SortingArray);
		
	}else if(optionselectedforsort == "Login Date" && val == "Latest to Earliest"){
			SortingArray.sort(function(a,b){
		if(new Date(ChangeFormatofDate(a)).getTime() < new Date(ChangeFormatofDate(b)).getTime())
			return 1;
		else
			return 0;
		});
		AssignToDataset(SortingArray);
		
	}
	
}


function AssignToDataset(sortedarray){
	if(toggleid === 0){
		$m.juci.dataset("allapplications",sortedarray);
	}else if(toggleid == 1){
		
	}else if(toggleid == 2){
		$m.juci.dataset("loginsapplications",sortedarray);
	}else if(toggleid == 3){
		$m.juci.dataset("issuedapplications",sortedarray);
	}else if(toggleid == 4){
		$m.juci.dataset("rejectedapplications",sortedarray);
	}
	
}


function searcher(list,searchString){
	var val = juci.dataset("optionselected");
	if(val == "Policy Term"){
		return list.PolicyTerm.search(searchString) > -1;	
	}else if(val == "Premium Paying Term"){
		return list.PremiumPayingTerm.search(searchString) > -1;	
	}else if(val == "Premium Amount"){
		return list.Premium.search(searchString) > -1;
	}else if(val == "Cust ID"){
		return list.ClientID.search(searchString) > -1;	
	}else if(val == "Cust Name"){
		return list.ClientName.toLowerCase().search(searchString.toLowerCase()) > -1;
	}else if(val == "Product Name"){
		return list.ProductName.toLowerCase().search(searchString.toLowerCase()) > -1;
	}else if(val == "Product Type"){
		return list.ProductType.toLowerCase().search(searchString.toLowerCase()) > -1;
	}else if(val == "App No."){
		return list.ApplicationNumber.toLowerCase().search(searchString.toLowerCase()) > -1;
	}else if(val == "Login Date"){
		return list.LoginDate.search(searchString) > -1;	
	}else if(val == "Pending Since Date"){
		return list.IssuancePendingSince.search(searchString) > -1;	
	}else if(val == "Issuance Date"){
		return list.IssueDate.search(searchString) > -1;	
	}else if(val == "Refund Date"){
		return list.RefundDate.search(searchString) > -1;	
	}

}

FilteringArray = [];
FilteredArray = [];
function getFilteroption(e){
	if(toggleid === 0){
		FilteringArray = AllApplications;
	}else if(toggleid == 1){
		//TODO
	}else if(toggleid == 2){
		FilteringArray = LoginApplications;
	}else if(toggleid == 3){
		FilteringArray = IssuedApplications;
	}else if(toggleid == 4){
		FilteringArray = RejectedApplications;
	}
	var val = e.target.value;
	$m.juci.findById("dateranger").hide();
	if(val == "Month to Date"){
		var beginingofmonth = new Date().getMonth() + 1;
		currentmonth = new Date(beginingofmonth + "/01/"+ new Date().getFullYear());
		for(var i=0;i<FilteringArray.length;i++){
			var logindate = ChangeFormatforDate(FilteringArray[i].LoginDate);
			logindate = new Date(logindate);
			var currentmonthdate = new Date();
			if(logindate >= currentmonth && logindate <=currentmonthdate ){
				FilteredArray.push(FilteringArray[i]);
			}
		}
		AssignFilteredArray(FilteredArray);
		return;
	}else if(val == "Year to Date"){
		var beginingofyear = new Date().getFullYear();
		currentyear = new Date("01" + "/01/"+ beginingofyear);
		for(var j=0;j<FilteringArray.length;j++){
			var logindate = ChangeFormatforDate(FilteringArray[j].LoginDate);
			logindate = new Date(logindate);
			var currentyeardate = new Date();
			if(logindate >= currentyear && logindate <=currentyeardate ){
				FilteredArray.push(FilteringArray[j]);
			}
		}
		AssignFilteredArray(FilteredArray);
		return;
	}else if(val == "Custom date range"){
		$m.juci.findById("dateranger").show();
	}
	AssignFilteredArray(FilteringArray);
}

function getDateRange(e){
	if(toggleid === 0){
		FilteringArray = AllApplications;
	}else if(toggleid == 1){
		//TODO
	}else if(toggleid == 2){
		FilteringArray = LoginApplications;
	}else if(toggleid == 3){
		FilteringArray = IssuedApplications;
	}else if(toggleid == 4){
		FilteringArray = RejectedApplications;
	}
	if(e.value[1] === null){
		return;
	}
	var datefirst = e.value[0];
	var datesecond = e.value[1];
	for(var i=0;i<FilteringArray.length;i++){
		var logindate = ChangeFormatforDate(FilteringArray[i].LoginDate);
		logindate = new Date(logindate);
		if(logindate >= datefirst && logindate <= datesecond){
			FilteredArray.push(FilteringArray[i]);
		}
	}
	AssignFilteredArray(FilteredArray);
}

function AssignFilteredArray(filterarray){
	if(toggleid === 0){
		$m.juci.dataset("allapplications",filterarray);
		FilteredArray = [];
	}else if(toggleid == 1){
		
	}else if(toggleid == 2){
		$m.juci.dataset("loginsapplications",filterarray);
		FilteredArray = [];
	}else if(toggleid == 3){
		$m.juci.dataset("issuedapplications",filterarray);
		FilteredArray = [];
	}else if(toggleid == 4){
		$m.juci.dataset("rejectedapplications",filterarray);
		FilteredArray = [];
	}
}





function ChangeFormatofDate(a){
	var date1 = a.LoginDate;
		date1 = date1.split("/");
		currdate=date1[1]+"/"+date1[0]+"/"+date1[2];
		return currdate;
}

function ChangeFormat(a){
	var date1 = a.IssueDate;
		date1 = date1.split("/");
		currdate=date1[1]+"/"+date1[0]+"/"+date1[2];
		return currdate;
}

function ChangeFormatforDate(grace){
	var date1 = grace;
		date1 = date1.split("/");
		currdate=date1[1]+"/"+date1[0]+"/"+date1[2];
		return currdate;
}

var sort_by = function(field, reverse, primer){

   var key = primer ? 
       function(x) {return primer(x[field])} : 
       function(x) {return x[field]};

   reverse = !reverse ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     } 
}
//call plan master
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

$m.juci.dataset("protect", [



    {
        "title": "Reliance Nippon Life Term Plan",
        "content": "For tailor-made, comprehensive and affordable coverage that will help you secure your financial future and the future of your family, invest in Reliance Term Plan.",
        "productCode": 107,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/4860_Term Plan Brochure.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
    //    {
    //        "title": "Reliance Future Income Plan Premium to Sum Assured",
    //        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
    //              "broucher" : [{
    //		    "Title": "Product Broucher",
    //		    "url" : "http://www.reliancenipponlife.com/product_images/plans/0150_Reliance Future Income.pdf"
    //		}, {
    //		    "Title": "Product Leafletss",
    //		      "url" : ""
    //		}, {
    //		    "Title": "FAB sheets ",
    //		      "url" : ""
    //		}, {
    //		    "Title": "Product Working PPT",
    //		      "url" : ""
    //		}]
    //    },

		{
        "title": "Reliance Nippon Life Bal Nivesh - One Time",
        "content": "",
        "productCode": 166,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "",
            "P_Title": "0429_Super Endowment Plan"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }]
//{
//            "Title": "FAB sheets ",
//            "url": ""
//        }, {
//            "Title": "Product Working PPT",
//            "url": ""
//        }]
    

    },
	

    {
        "title": "Reliance Nippon Life Online Term",
        "content": "Reliance Online Term is an online life insurance plan that offers you a large life insurance cover at affordable premiums in just a few clicks. It is easy to buy and even your medical tests can happen at the comfort of your own home.",
        "productCode": "",
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    }, {
        "title": "Reliance Nippon Life Online Income Protect",
        "content": "You have worked hard to create a lifestyle for your family, ensuring that they get the best in life. They depend on you to meet their daily needs and to take care of repayment of all liabilities i.e. EMIs, school fee, household expenses, etc. But the key question is who will take care of your family's needs in case you are not around?",
        "productCode": "",
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
    //    {
    //        "title": "Reliance Increasing Income Insurance Plan Premium to Sum Assured",
    //        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
    //              "broucher" : [{
    //		    "Title": "Product Broucher",
    //		    "url" : "http://www.reliancenipponlife.com/product_images/plans/5984_Reliance Increasing Income Insurance Plan Brochure.pdf"
    //		}, {
    //		    "Title": "Product Leafletss",
    //		      "url" : ""
    //		}, {
    //		    "Title": "FAB sheets ",
    //		      "url" : ""
    //		}, {
    //		    "Title": "Product Working PPT",
    //		      "url" : ""
    //		}]
    //    },




    {
        "title": "Reliance Nippon Life Classic Plan II",
        "content": "After decades of working hard to take care of your responsibilities, you deserve to put your feet up and enjoy your golden years - pursue your hobbies that you never had time for, make up for lost holidays, share memories with family or take pride in remaining independent. Reliance Pension Builder helps you to save regularly to build your nest-egg for retirement that you can look forward to.",
        "productCode": 109,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/1409_Reliance_Classic_Plan_II.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
    
    {
        "title": "Reliance Nippon Life Classic Plan II New",
        "content": "After decades of working hard to take care of your responsibilities, you deserve to put your feet up and enjoy your golden years - pursue your hobbies that you never had time for, make up for lost holidays, share memories with family or take pride in remaining independent. Reliance Pension Builder helps you to save regularly to build your nest-egg for retirement that you can look forward to.",
        "productCode": 165,
        "broucher": [{
            "Title": "Product Brochure",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }]
//{
//            "Title": "FAB sheets ",
//            "url": ""
//        }, {
//            "Title": "Product Working PPT",
//            "url": ""
//        }]
    
    },

   {
        "title": "Reliance Nippon Life Classic Plan II",
        "content": "After decades of working hard to take care of your responsibilities, you deserve to put your feet up and enjoy your golden years - pursue your hobbies that you never had time for, make up for lost holidays, share memories with family or take pride in remaining independent. Reliance Pension Builder helps you to save regularly to build your nest-egg for retirement that you can look forward to.",
        "productCode": 110,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/1409_Reliance_Classic_Plan_II.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    }
    
]);

/* Saving*/
$m.juci.dataset("saving", [{
        "title": "Reliance Nippon Life Fixed Savings",
        "content": "Reliance Fixed Savings helps you to create a corpus for unforeseen expenses, by allowing you to systematically save over a period of time. This plan offers guaranteed benefits, including fixed additions that accrue every year and an additional lump sum at maturity, along with a life cover to protect your family.",
        "productCode": 132,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/9278_Fixed Savings Plan.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life Future Income Plan",
        "content": "We live in an age of growth: growing income, demands and expectations for yourself and your family. Don't let your savings stay dormant. Let it work for you to give an additional income.",
        "productCode": 153,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/0150_Reliance Future Income.pdf "
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
    
       {
        "title": "Reliance Nippon Life Future Income Plan",
        "content": "We live in an age of growth: growing income, demands and expectations for yourself and your family. Don't let your savings stay dormant. Let it work for you to give an additional income.",
        "productCode": 154,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/0150_Reliance Future Income.pdf "
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life Increasing Income Insurance Plan",
        "content": "With time you would aspire for a bigger house, an expensive car, admission in the best school and a good higher education for your children. Your savings need to power these dreams of tomorrow.",
        "productCode": 137,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

 {
        "title": "Reliance Nippon Life Increasing Income Insurance Plan",
        "content": "With time you would aspire for a bigger house, an expensive car, admission in the best school and a good higher education for your children. Your savings need to power these dreams of tomorrow.",
        "productCode": 138,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
    {
        "title": "Reliance Nippon Life Whole Life Income Plan",
        "content": "In life, we generally have two main financial needs - how to live a comfortable life and how to take care of our loved ones in case of any unfortunate event. This is a plan which would take care of your regular income needs to lead a comfortable life and would also help you leave behind a legacy for your next generations. In other words, you live through the benefits and also leave enough for the next generation.",
        "productCode": 155,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/1538_Reliance Whole Life Income.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },


    {
        "title": "Reliance Nippon Life Lifelong Savings Plan",
        "content": "We all work towards financial milestones like buying a house, securing our children's education, going on a dream vacation and living comfortably after retirement. These are critical milestones, achievable with a sound financial plan.",
        "productCode": 149,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/4488_Reliance Lifelong Savings.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

  {
        "title": "Reliance Nippon Life Lifelong Savings Plan",
        "content": "We all work towards financial milestones like buying a house, securing our children's education, going on a dream vacation and living comfortably after retirement. These are critical milestones, achievable with a sound financial plan.",
        "productCode": 152,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/4488_Reliance Lifelong Savings.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
    {
        "title": "Reliance Nippon Life Guaranteed Money Back Plan Sum Assured to Premium",
        "content": "Get an in-built Accidental Death Benefit as well as the Waiver Of Premium benefit to help your family continue to fulfill their goals even in the case of your untimely demise. This non-participating, non-linked money back plan helps you save for the long-term with liquidity at various stages in life.",
        "productCode": 108,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/6136_web_3 Reliance_Gauranteed Money Back Plan_Brochure_03-12-13.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    }, 
    
     {
        "title": "Reliance Nippon Life Guaranteed Money Back Plan Premium to Sum Assured ",
        "content": "Get an in-built Accidental Death Benefit as well as the Waiver Of Premium benefit to help your family continue to fulfill their goals even in the case of your untimely demise. This non-participating, non-linked money back plan helps you save for the long-term with liquidity at various stages in life.",
        "productCode": 143,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/6136_web_3 Reliance_Gauranteed Money Back Plan_Brochure_03-12-13.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
    
    {
        "title": "Reliance Nippon Life Super Money Back Plan",
        "content": "Reliance Super Money Back Plan helps you provide a regular income and security for your family despite the ups and downs of life. The guaranteed monthly income increases every year while the guaranteed periodic lump sums enable you to invest in your business or fulfill your family's goals.",
        "productCode": 124,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/0106_Reliance Super Money Back.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life Increasing Money Back",
        "content": "",
        "productCode": 159,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/7286_Reliance Smart Cash Plus.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
    
     {
        "title": "Reliance Nippon Life Blue Chip Savings Plan",
        "content": "",
        "productCode": 136,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/7286_Reliance Smart Cash Plus.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
  {
        "title": "Reliance Nippon Life Blue Chip Savings Plan",
        "content": "",
        "productCode": 139,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/7286_Reliance Smart Cash Plus.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },


    //    {
    //        "title": "Reliance Lifelong Savings Plan Premium to Sum Assured",
    //        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
    //              "broucher" : [{
    //		    "Title": "Product Broucher",
    //		    "url" : ""
    //		}, {
    //		    "Title": "Product Leafletss",
    //		      "url" : ""
    //		}, {
    //		    "Title": "FAB sheets ",
    //		      "url" : ""
    //		}, {
    //		    "Title": "Product Working PPT",
    //		      "url" : ""
    //		}]
    //    },


    {
        "title": "Reliance Nippon Life Money Multiplier Plan",
        "content": "A plan that helps you achieve your goals sooner.",
        "productCode": 91,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/1702_Web_2 Money Multiplier plan - Version 3.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
    //{
    //        "title": "Reliance Bluechip Savings Insurance Plan Sum Assured to Premium",
    //        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
    //              "broucher" : [{
    //		    "Title": "Product Broucher",
    //		    "url" : ""
    //		}, {
    //		    "Title": "Product Leafletss",
    //		      "url" : ""
    //		}, {
    //		    "Title": "FAB sheets ",
    //		      "url" : ""
    //		}, {
    //		    "Title": "Product Working PPT",
    //		      "url" : ""
    //		}]
    //    },
    //{
    //        "title": "Reliance Bluechip Savings Insurance Plan Premium to Sum Assured",
    //        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
    //        "productCode":136,
    //              "broucher" : [{
    //		    "Title": "Product Broucher",
    //		    "url" : "http://www.reliancenipponlife.com/product_images/plans/0853_RLI_Bluechip savings brochure_Artwork (web)_April 22.pdf"
    //		}, {
    //		    "Title": "Product Leafletss",
    //		      "url" : ""
    //		}, {
    //		    "Title": "FAB sheets ",
    //		      "url" : ""
    //		}, {
    //		    "Title": "Product Working PPT",
    //		      "url" : ""
    //		}]
    //    }

{
        "title": "Reliance Nippon Life Income Booster Plan",
        "content": "",
        "productCode": 141,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/5259_RLI_Premier Wealth Insurance Plan_Web version brcohure_Feb 12.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },



]);

/* Invest*/

$m.juci.dataset("invest", [{
        "title": "Reliance Nippon Life Premier Wealth Insurance Plan",
        "content": "Reliance Premier Wealth Insurance Plan can be tailored to individual needs and keep up with the changing priorities over time. The plan allows you the flexibility to balance the protection and investment needs during its tenure, in an active or a systematic manner.",
        "productCode": 156,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/5259_RLI_Premier Wealth Insurance Plan_Web version brcohure_Feb 12.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life Pay Five Plan",
        "content": "Reliance Pay Five Plan allows you to create a long term saving with just five yearly premium payments. The plan offers you the flexibility of managing your investments based on your risk appetite and the security of a life cover. That’s not all; only five yearly premium payments make it more attractive and highly suitable for your investments need.",
        "productCode": 93,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/9842_Pay Five Plan.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life Super Endowment Plan",
        "content": "Reliance's Super Endowment Plan has been designed to ensure that you can save for your future along with the benefit of life cover and provide protection to your family.",
        "productCode": 116,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/0429_Super Endowment Plan.pdf",
            "P_Title": "0429_Super Endowment Plan"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]

    }, {
        "title": "Reliance Nippon Life Endowment Plan",
        "content": "Choose the Sum Assured amount based on your goals and aspirations as well as your current financial position.",
        "productCode": 94,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/1363_Reliance Endowment.pdf",
            "P_Title": "1363_Reliance Endowment"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    }, {
        "title": "Reliance Nippon Life Fixed Money Back",
        "content": "To keep up with the growing needs at every stage of life, you need a savings plan that can also safeguard your future.",
        "productCode": 146,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/9995_0043_Reliance Fixed Money Back Plan.pdf "
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
    
    {
        "title": "Reliance Nippon Life Fixed Money Back",
        "content": "To keep up with the growing needs at every stage of life, you need a savings plan that can also safeguard your future.",
        "productCode": 147,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/9995_0043_Reliance Fixed Money Back Plan.pdf "
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
    
    //    {
    //        "title": "Reliance Fixed Money Back Premium to Sum Assured",
    //        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
    //              "broucher" : [{
    //		    "Title": "Product Broucher",
    //		    "url" : "http://www.reliancenipponlife.com/product_images/plans/9995_0043_Reliance Fixed Money Back Plan.pdf"
    //		}, {
    //		    "Title": "Product Leafletss",
    //		      "url" : ""
    //		}, {
    //		    "Title": "FAB sheets ",
    //		      "url" : ""
    //		}, {
    //		    "Title": "Product Working PPT",
    //		      "url" : ""
    //		}]
    //    },

    //    {
    //        "title": "Reliance Easy Care Fixed Benefit Plan",
    //        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
    //              "broucher" : [{
    //		    "Title": "Product Broucher",
    //		    "url" : "http://www.reliancenipponlife.com/product_images/plans/4093_0013_Easy_Care_Fixed_Benefit_Web.pdf"
    //		}, {
    //		    "Title": "Product Leafletss",
    //		      "url" : ""
    //		}, {
    //		    "Title": "FAB sheets ",
    //		      "url" : ""
    //		}, {
    //		    "Title": "Product Working PPT",
    //		      "url" : ""
    //		}]
    //    },

    //    {
    //        "title": "Reliance Care For You Advantage Plan",
    //        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
    //              "broucher" : [{
    //		    "Title": "Product Broucher",
    //		    "url" : ""
    //		}, {
    //		    "Title": "Product Leafletss",
    //		      "url" : ""
    //		}, {
    //		    "Title": "FAB sheets ",
    //		      "url" : ""
    //		}, {
    //		    "Title": "Product Working PPT",
    //		      "url" : ""
    //		}]
    //    },

    {
        "title": "Reliance Nippon Life Smart Cash Plus Plan",
        "content": "Reliance Smart Cash Plus Plan helps you gift yourself guaranteed lump sums at periodic intervals in the future to fulfill your goals at every lifestage, while securing your family from any unforeseen eventuality. A perfect mix of long term savings with the benefit of liquidity.",
        "productCode": 125,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/7286_Reliance Smart Cash Plus.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life Increasing Money Back",
        "content": "With time you would aspire for a bigger house, an expensive car, admission in the best school and a good higher education for your children. Your savings need to power these dreams of tomorrow",
        "productCode": 159,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/7286_Reliance Smart Cash Plus.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    //    {
    //        "title": "Premium Calculator For Reliance LifePlus Solutions",
    //        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
    //              "broucher" : [{
    //		    "Title": "Product Broucher",
    //		    "url" : ""
    //		}, {
    //		    "Title": "Product Leafletss",
    //		      "url" : ""
    //		}, {
    //		    "Title": "FAB sheets ",
    //		      "url" : ""
    //		}, {
    //		    "Title": "Product Working PPT",
    //		      "url" : ""
    //		}]
    //    }
]);


/* Health*/

$m.juci.dataset("health", [

    {
        "title": "Reliance Nippon Life Easy Care Fixed Benefit Plan",
        "content": "With Reliance Easy Care Fixed Benefit Plan you can now sleep peacefully at night while we take care of your worries.",
        "productCode": 115,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/4093_0013_Easy_Care_Fixed_Benefit_Web.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    }, {
        "title": "Reliance Nippon Life Care For You Advantage Plan",
        "content": "A very innovative plan for the entire family including children, dependant parents and parents-in-law.",
        "productCode": 113,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/5003_CFYAdvntgplan.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    }

]);


/* Retirement*/
$m.juci.dataset("retirement", [

    //	{
    //        "title": "Reliance Traditional Group Employee Benfit Plan (MBR-Par",
    //        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
    //              "broucher" : [{
    //		    "Title": "Product Broucher",
    //		    "url" : "http://www.reliancenipponlife.com/product_images/plans/8500_Traditional Group Employee Benefits.pdf"
    //		}, {
    //		    "Title": "Product Leafletss",
    //		      "url" : ""
    //		}, {
    //		    "Title": "FAB sheets ",
    //		      "url" : ""
    //		}, {
    //		    "Title": "Product Working PPT",
    //		      "url" : ""
    //		}]
    //    }, 

    {
        "title": "Reliance Nippon Life Pension Builder",
        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
        "productCode": 160,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/3298_Reliance Pension Builder.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    }, {
        "title": "Reliance Nippon Life Immediate Annuity Plan",
        "content": "Worried about how to invest your hard earned money post retirement?    Convert your lump sum/corpus in to regular income for life. It’s like gifting yourself a regular income in the future.",
        "productCode": 114,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/3316_6614_Immediate_Annuity_Plan_Web.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    }, {
        "title": "Reliance Nippon Life Smart Pension Plan",
        "content": "Retirement is the most important milestone in your life. The key to successful retirement planning is starting early to build a desired retirement fund. The right retirement kitty will ensure fulfilling your dream of a wonderful retirement life with the independence you deserve.",
        "productCode": 117,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/9365_Smart Pension Plan.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
    
    {
        "title": "Reliance Nippon Life Smart Pension Plan",
        "content": "Retirement is the most important milestone in your life. The key to successful retirement planning is starting early to build a desired retirement fund. The right retirement kitty will ensure fulfilling your dream of a wonderful retirement life with the independence you deserve.",
        "productCode": 118,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/9365_Smart Pension Plan.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    }


]);


/* Child*/
$m.juci.dataset("child", [

    {

        "title": "Reliance Nippon Life Child Plan",
        "content": "Save systematically and secure the financial future of your child by investing in the Reliance Child Plan and let your child enjoy today without worrying about tomorrow.",
        "productCode": 101,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/9584_8415_ChildPlan_Web.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life Education Plan",
        "content": "You put all your effort in raising your children and want them to achieve 100% success in every challenge that life throws at them. You need a suitable financial plan that ensures you don’t compromise on your goals for your child’s future and provides you with funds when you need them.",
        "productCode": 142,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/0525_Reliance_Education_Plan.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
    //	{
    //        "title": "Reliance Traditional Group Employee Benfit Plan (MBR-Par)",
    //        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
    //              "broucher" : [{
    //		    "Title": "Product Broucher",
    //		    "url" : "http://www.reliancenipponlife.com/product_images/plans/8500_Traditional Group Employee Benefits.pdf"
    //		}, {
    //		    "Title": "Product Leafletss",
    //		      "url" : ""
    //		}, {
    //		    "Title": "FAB sheets ",
    //		      "url" : ""
    //		}, {
    //		    "Title": "Product Working PPT",
    //		      "url" : ""
    //		}]
    //    }, 
    // {
    //        "title": "Reliance Traditional Group Superannuation Plan (MBR-Par)",
    //        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
    //              "broucher" : [{
    //		    "Title": "Product Broucher",
    //		    "url" : "http://www.reliancenipponlife.com/product_images/plans/5795_Traditional Group Superannuation Plan.pdf"
    //		}, {
    //		    "Title": "Product Leafletss",
    //		      "url" : ""
    //		}, {
    //		    "Title": "FAB sheets ",
    //		      "url" : ""
    //		}, {
    //		    "Title": "Product Working PPT",
    //		      "url" : ""
    //		}]
    //    }

]);

/* Solutions*/
$m.juci.dataset("solutions", [{
        "title": "Reliance Nippon Life Easy Retirement Solution",
        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
        "productCode": 121,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    }, {
        "title": "Reliance Nippon Life Easy Retirement Solution Plus",
        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
        "productCode": 164,
        "broucher": [{
            "Title": "Product Brochure",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }]
//{
//            "Title": "FAB sheets ",
//            "url": ""
//        }, {
//            "Title": "Product Working PPT",
//            "url": ""
//        }]
    
    },{
        "title": "Reliance Nippon LifeWonder Kid Solution",
        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
        "productCode": 122,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life Income Advantage Solution",
        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
        "productCode": 123,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life Retirement Growth Solution",
        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
        "productCode": 126,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    }, {
        "title": "Reliance Nippon Life Double Easy Retirement Solution",
        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
        "productCode": 127,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life LifeTime Retirement Solution",
        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
        "productCode": 129,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life Super Kid Solutions",
        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
        "productCode": 128,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life Secured Retirement Solution",
        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
        "productCode": 134,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life Reliance Child Lifetime Income Solution",
        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
        "productCode": 148,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },


    {
        "title": "Reliance Nippon Life Assured Retirement Solution",
        "content": "",
        "productCode": 119,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },


    {
        "title": "Reliance Nippon Life Assured Retirement Solution II",
        "content": "",
        "productCode": 120,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    //    
    //    {
    //    	 "title": "Health Term Renewal - Premium Calculator (Reliance Care For You Advantage Plan)",
    //        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
    //              "broucher" : [{
    //		    "Title": "Product Broucher",
    //		    "url" : "http://www.reliancenipponlife.com/product_images/plans/5003_CFYAdvntgplan.pdf"
    //		}, {
    //		    "Title": "Product Leafletss",
    //		      "url" : ""
    //		}, {
    //		    "Title": "FAB sheets ",
    //		      "url" : ""
    //		}, {
    //		    "Title": "Product Working PPT",
    //		      "url" : ""
    //		}]
    //    }


]);