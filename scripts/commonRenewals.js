/**
 * CommonRenewals.js
 * @author CloudPact Technologies
 * @description : This script is used for renewals data storing into local db .
 **/

var currDtl, currDtlIdx;

var show = false;
var breakup = false;
var inforceshow = false;
var inforcebreakup = false;
var tabs = [];

function showDetails(){
$m.juci.find(".tab .juci_thinbar").forEach(function(el, idx){
		tabs.push(false);
  //el.el.addEventListener("click",getToggleHandler(idx));
	el.onClick(getToggleHandler(idx));
	});
}

function getToggleHandler(idx) {
var toggleTab = function(event) {
		tabs[idx] = new juci.elem(event.currentTarget.parentElement).toggleClass("visible");
	};
	return toggleTab;
}

var showforce = false;
function showfulllistforForce(e){
	var contactnumber = e.currentTarget.parentElement.children[2].children[2].innerHTML;
	var index = e.currentTarget.id;
//	var contentid = "lessf"+index;
	var visible = "SMF"+index;
	if(currDtl){
		currDtl.hide();
		juci.findById(lastindex).html("Show more");

	if(currDtlIdx === index){
			currDtlIdx = null;
			currDtl = null;
			return;
		}
	}
	currDtlIdx = index;
	currDtl	= $m.juci.findById('lessf' + currDtlIdx);
	currDtl.show();
	lastindex = visible;
	juci.findById(visible).html("Show less");
	getCustomerInfo(contactnumber);	

}


// Lapsed Section

var lapseshow = false;
function showSideMenuforlapse(e){
	var index = e.currentTarget.id;
	var menuid = "menuBoxlapse"+index;
	if(lapseshow === true){
		$m.juci.findById(menuid).hide();
		lapseshow = false;
	}
	else{
		$m.juci.findById(menuid).show();
		lapseshow = true;
	}
}

var lapsebreakup = false;
function showBreakupforlapse(e){
	var index = e.currentTarget.id;
	var res = index.substring(6, index.length);
	var menuid = "breakupBoxlapse"+res;
	if(lapsebreakup === true){
		$m.juci.findById(menuid).hide();
		juci.findById(index).html("View Break-up");
		lapsebreakup = false;
	}
	else{
		$m.juci.findById(menuid).show();
		juci.findById(index).html("Hide Break-up");
		lapsebreakup = true;
	}
}

var showlapse = false;
function showfulllistforlapse(e){
	var contactnumber = e.currentTarget.parentElement.children[2].children[2].innerHTML;
	var index = e.currentTarget.id;
//	var contentid = "lessl"+index;
	var visible = "SML"+index;
	if(currDtl){
		currDtl.hide();
		juci.findById(lastindex).html("Show more");

	if(currDtlIdx === index){
			currDtlIdx = null;
			currDtl = null;
			return;
		}
	}
	currDtlIdx = index;
	currDtl	= $m.juci.findById('lessl' + currDtlIdx);
	currDtl.show();
	lastindex = visible;
	juci.findById(visible).html("Show less");
	getCustomerInfo(contactnumber);
}

//Surrendered Section

var surrendershow = false;
function showSideMenuforsurrender(e){
	var index = e.currentTarget.id;
	var menuid = "menuBoxsurrender"+index;
	if(surrendershow === true){
		$m.juci.findById(menuid).hide();
		surrendershow = false;
	}
	else{
		$m.juci.findById(menuid).show();
		surrendershow = true;
	}
}

var surrbreakup = false;
function showBreakupforsurrender(e){
	var index = e.currentTarget.id;
	var res = index.substring(6, index.length);
	var menuid = "breakupBoxsurrender"+res;
	if(surrbreakup === true){
		$m.juci.findById(menuid).hide();
		juci.findById(index).html("View Break-up");
		surrbreakup = false;
	}
	else{
		$m.juci.findById(menuid).show();
		juci.findById(index).html("Hide Break-up");
		surrbreakup = true;
	}
}

var showsurrend = false;
function showfulllistforsurrender(e){
	var contactnumber = e.currentTarget.parentElement.children[2].children[2].innerHTML;
	var index = e.currentTarget.id;
//	var contentid = "lesss"+index;
	var visible = "SMS"+index;
	if(currDtl){
		currDtl.hide();
		juci.findById(lastindex).html("Show more");

	if(currDtlIdx === index){
			currDtlIdx = null;
			currDtl = null;
			return;
		}
	}
	currDtlIdx = index;
	currDtl	= $m.juci.findById('lesss' + currDtlIdx);
	currDtl.show();
	lastindex = visible;
	juci.findById(visible).html("Show less");
	getCustomerInfo(contactnumber);
	showDetails();

}

function getCustomerInfo(contactnumber){
	service.GetCustomerInfo(function(list){
		$m.juci.dataset("customerinfo",list);
	},contactnumber);
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
		
	}else{
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
		
	}
	else{
		juci.findById("filter").show();
		filterby = true;
	}	
}


function scrollToTop() {
		if(sortby === true && filterby === true &&searchBy==true){
		juci.findById("filter").hide();
			$m.juci.findById("sort").hide();
			juci.findById("searchbox").hide();
	}
    window.scrollTo(0, 0);
}

//Call , Email ,SMS
function call(e){
	var menuid = "menuBox" + e.index;
	$m.juci.findById(menuid).hide();
	var mobile = e.data.MobileNumber;
	$m.callContact(mobile);
}

function email(e){
	var menuid = "menuBox" + e.index;
	$m.juci.findById(menuid).hide();
	var emailid = e.data.EmailID;
	$m.email([emailid], '' , '');
}

function sms(e){
	var menuid = "menuBox" + e.index;
	$m.juci.findById(menuid).hide();
	var sendsms = e.data.MobileNumber;
	$m.sms([sendsms], '');
}


var showContent = false;

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
	}else if(e.target.el.className == "break"){
		var menuid = e.target.el.id;
		var currentindex = "breakupBox"+e.index;
			var menuItem = document.getElementById(currentindex);
		if(menuItem.style.display === "none"){
			document.getElementById(currentindex).style.display = "block";
			document.getElementById(menuid).innerHTML = "Hide Break-up";
		}else{
			document.getElementById(currentindex).style.display = "none";
			document.getElementById(menuid).innerHTML = "View Break-up";
		}
	}else if(e.target.el.className == "showing"){
		var contactnumber = e.data.ContractNumber;
		var	currentindex = e.target.el.id;
		var contentid = "less"+e.index;
			if(currDtl){
		document.getElementById(currDtl).style.display = "none";
		document.getElementById(lastindex).innerHTML = "Show more";

		if(currDtlIdx === e.index){
				currDtlIdx = null;
				currDtl = null;
				return;
			}
		}
		currDtlIdx = e.index;
		currDtl	= "less"+ currDtlIdx;
		document.getElementById(currDtl).style.display = "block";
		lastindex = currentindex;
		document.getElementById(currentindex).innerHTML = "Show less";
		getCustomerInfo(contactnumber);
		
		}
		else if(e.target.el.className == "juci_thinbar"){
			$m.juci.find(".tab .juci_thinbar").forEach(function(el, idx){
			tabs.push(false);
		  	el.el.addEventListener("click",getToggleHandler(idx));
			//el.onClick(getToggleHandler(idx));
			});
	}
}


function showlistitemforforce(e){
	if(e.target.el.className == "vertical"){
		var currentindex = e.target.el.parentElement.id;
		var menuid = "menuBoxinforce"+currentindex;
		if(inforceshow === true){
			$m.juci.findById(menuid).hide();
			inforceshow = false;
		}
		else{
			$m.juci.findById(menuid).show();
			inforceshow = true;
		}
	}else if(e.target.el.className == "break"){
		var menuid = e.target.el.id;
		var currentindex = "breakupBoxinforce"+e.index;
			var menuItem = document.getElementById(currentindex);
		if(menuItem.style.display === "none"){
			document.getElementById(currentindex).style.display = "block";
			document.getElementById(menuid).innerHTML = "Hide Break-up";
		}else{
			document.getElementById(currentindex).style.display = "none";
			document.getElementById(menuid).innerHTML = "View Break-up";
		}
	}else if(e.target.el.className == "showing"){
		var contactnumber = e.data.ContractNumber;
		var	currentindex = e.target.el.id;
		var contentid = "lessf"+e.index;
			if(currDtl){
		document.getElementById(currDtl).style.display = "none";
		document.getElementById(lastindex).innerHTML = "Show more";

		if(currDtlIdx === e.index){
				currDtlIdx = null;
				currDtl = null;
				return;
			}
		}
		currDtlIdx = e.index;
		currDtl	= "lessf"+ currDtlIdx;
		document.getElementById(currDtl).style.display = "block";
		lastindex = currentindex;
		document.getElementById(currentindex).innerHTML = "Show less";
			
		getCustomerInfo(contactnumber);
		
	}
}


function showlistitemforlapse(e){	
	if(e.target.el.className == "vertical"){
		var currentindex = e.target.el.parentElement.id;
		var menuid = "menuBoxlapse"+currentindex;
		if(lapseshow === true){
			$m.juci.findById(menuid).hide();
			lapseshow = false;
		}
		else{
			$m.juci.findById(menuid).show();
			lapseshow = true;
		}
	}else if(e.target.el.className == "break"){
		var menuid = e.target.el.id;
		var currentindex = "breakupBoxlapse"+e.index;
			var menuItem = document.getElementById(currentindex);
		if(menuItem.style.display === "none"){
			document.getElementById(currentindex).style.display = "block";
			document.getElementById(menuid).innerHTML = "Hide Break-up";
		}else{
			document.getElementById(currentindex).style.display = "none";
			document.getElementById(menuid).innerHTML = "View Break-up";
		}
	}else if(e.target.el.className == "showing"){
		var contactnumber = e.data.ContractNumber;
		var	currentindex = e.target.el.id;
		var contentid = "lessl"+e.index;
			if(currDtl){
		document.getElementById(currDtl).style.display = "none";
		document.getElementById(lastindex).innerHTML = "Show more";

		if(currDtlIdx === e.index){
				currDtlIdx = null;
				currDtl = null;
				return;
			}
		}
		currDtlIdx = e.index;
		currDtl	= "lessl"+ currDtlIdx;
		document.getElementById(currDtl).style.display = "block";
		lastindex = currentindex;
		document.getElementById(currentindex).innerHTML = "Show less";
			
	/*	if(currDtl){
		currDtl.hide();
		juci.findById(lastindex).html("Show more");

		if(currDtlIdx === e.index){
				currDtlIdx = null;
				currDtl = null;
				return;
			}
		}
		currDtlIdx = e.index;
		currDtl	= $m.juci.findById('lessl' + currDtlIdx);
		currDtl.show();
		lastindex = currentindex;
		juci.findById(currentindex).html("Show less");*/
		getCustomerInfo(contactnumber);
		
	}

}

function showlistitemforsurrender(e){
	
	if(e.target.el.className == "vertical"){
		var currentindex = e.target.el.parentElement.id;
		var menuid = "menuBoxsurrender"+currentindex;
		if(surrendershow === true){
			$m.juci.findById(menuid).hide();
			surrendershow = false;
		}
		else{
			$m.juci.findById(menuid).show();
			surrendershow = true;
		}
	}else if(e.target.el.className == "break"){
		var menuid = e.target.el.id;
		var currentindex = "breakupBoxsurrender"+e.index;
		var menuItem = document.getElementById(currentindex);
		if(menuItem.style.display === "none"){
			document.getElementById(currentindex).style.display = "block";
			document.getElementById(menuid).innerHTML = "Hide Break-up";
		}else{
			document.getElementById(currentindex).style.display = "none";
			document.getElementById(menuid).innerHTML = "View Break-up";
		}
	}else if(e.target.el.className == "showing"){
		var contactnumber = e.data.ContractNumber;
		var	currentindex = e.target.el.id;
		var contentid = "lesss"+e.index;
			if(currDtl){
		document.getElementById(currDtl).style.display = "none";
		document.getElementById(lastindex).innerHTML = "Show more";

		if(currDtlIdx === e.index){
				currDtlIdx = null;
				currDtl = null;
				return;
			}
		}
		currDtlIdx = e.index;
		currDtl	= "lesss"+ currDtlIdx;
		document.getElementById(currDtl).style.display = "block";
		lastindex = currentindex;
		document.getElementById(currentindex).innerHTML = "Show less";
			
		getCustomerInfo(contactnumber);
			
	}

}

var optionselectedforsort;
var SortingArray = [];

function getselectedoption(e){
	optionselectedforsort = e.target.value;
	if(optionselectedforsort == "Name of Proposer" || optionselectedforsort == "Plan Name"){
		$m.juci.dataset("options3",["Select","A to Z","Z to A"]);
		$m.juci.dataset("selectcatogory",["Select","A to Z","Z to A"]);
	}else if(optionselectedforsort == "Propensity to Pay"){
		$m.juci.dataset("options3",["Select","High to Low","Low to High"]);
		$m.juci.dataset("selectcatogory",["Select","High to Low","Low to High"]);
	}else if(optionselectedforsort == "Grace End Date"){
		$m.juci.addDataset("options3",["Select","Earliest to Latest","Latest to Earliest"]);
		$m.juci.dataset("selectcatogory",["Select","Earliest to Latest","Latest to Earliest"]);
	}else if(optionselectedforsort == "Installment Premium"){
		$m.juci.addDataset("options3",["Select","Max to Min","Min to Max"]);
		$m.juci.dataset("selectcatogory",["Select","Max to Min","Min to Max"]);
	}
}

function getselectedCategory(e){
	if(toggleid === 0){
		SortingArray = Allrenewals;
	}else if(toggleid == 1){
		SortingArray = Forcerenewals;
	}else if(toggleid == 2){
		SortingArray = Lapserenewals;
	}else if(toggleid == 3){
		SortingArray = surrenderrenewals;
	}
	var optionselcted = e.target.value;
	if(optionselectedforsort == "Grace End Date" && optionselcted == "Earliest to Latest"){
		SortingArray.sort(function(a,b){
		if(new Date(ChangeFormat(a)).getTime() > new Date(ChangeFormat(b)).getTime())
			return 1;
		else
			return 0;
		});
		AssignToDataset(SortingArray);
	}
	if(optionselectedforsort == "Grace End Date" && optionselcted == "Latest to Earliest"){
		SortingArray.sort(function(a,b){
		if(new Date(ChangeFormat(a)).getTime() < new Date(ChangeFormat(b)).getTime())
			return 1;
		else
			return 0;
		});
		AssignToDataset(SortingArray);
	}else if(optionselectedforsort == "Name of Proposer" && optionselcted == "A to Z"){
		SortingArray.sort(sort_by("ClientName", false));
		AssignToDataset(SortingArray);

	}else if(optionselectedforsort == "Name of Proposer" && optionselcted == "Z to A"){
		SortingArray.sort(sort_by("ClientName", true));
		AssignToDataset(SortingArray);
	}else if(optionselectedforsort == "Plan Name" && optionselcted == "A to Z"){
		SortingArray.sort(sort_by("ProductName", false));
		AssignToDataset(SortingArray);
	}else if(optionselectedforsort == "Plan Name" && optionselcted == "Z to A"){
		SortingArray.sort(sort_by("ProductName", true));
		AssignToDataset(SortingArray);
	}else if(optionselectedforsort == "Propensity to Pay" && optionselcted == "High to Low"){
		//TODO
		SortingArray.sort(sort_by("PayPropensity",false));
		AssignToDataset(SortingArray);
	}else if(optionselectedforsort == "Propensity to Pay" && optionselcted == "Low to High"){
		//TODO
		SortingArray.sort(sort_by("PayPropensity",true));
		AssignToDataset(SortingArray);
		
	}else if(optionselectedforsort == "Installment Premium" && optionselcted == "Max to Min"){
		//TODO
		//SortingArray.sort();
		SortingArray.sort(sort_by("Premium", false));
		AssignToDataset(SortingArray);
		
	}else if(optionselectedforsort == "Installment Premium" && optionselcted == "Min to Max"){
		//TODO
		SortingArray.sort(sort_by("Premium", true));
		AssignToDataset(SortingArray);
		
	}
}

function AssignToDataset(array){
	if(toggleid === 0){
		$m.juci.dataset("totalrenewals",array);
		SortingArray = [];
	}else if(toggleid == 1){
		$m.juci.dataset("inforcerenewals",array);
		SortingArray = [];
	}else if(toggleid == 2){
		$m.juci.dataset("lapsedrenewals",array);
		SortingArray = [];
	}else if(toggleid == 3){
		$m.juci.dataset("surrenderedrenewals",array);
		SortingArray = [];
	}
}

var filterArray= [];
var todaysArray = [];

var currentdatetimestamp = 24*60*60*1000;
function getfilteroption(e){
	if(toggleid === 0){
		filterArray = Allrenewals;
	}else if(toggleid == 1){
		filterArray = Forcerenewals;
	}else if(toggleid == 2){
		filterArray = Lapserenewals;
	}else if(toggleid == 3){
		filterArray = surrenderrenewals;
	}
	$m.juci.findById("dateranger").hide();
	$m.juci.dataset("dateranged",[]);
	var val= e.target.value;
	var today = new Date().getTime();
	var days = new Date((currentdatetimestamp) + new Date().getTime());
	if(val == "Today"){
		for(var i=0;i<filterArray.length;i++){
			var graceDate = ChangeFormatofDate(filterArray[i].GraceEndDate);
			if(new Date(graceDate) == new Date() && new Date(graceDate) == days){
				todaysArray.push(filterArray[i]);
			}		
		}
		AddFilterArraytoDataset(todaysArray);
	}else if(val == "Next 7 days"){
		var days = new Date((7*currentdatetimestamp) + new Date().getTime());
		for(var m=0;m<filterArray.length;m++){
			var graceDate = ChangeFormatofDate(filterArray[m].GraceEndDate);
			if(new Date(graceDate) >= new Date() && new Date(graceDate) <= days){
				todaysArray.push(filterArray[m]);
			}
		}
		AddFilterArraytoDataset(todaysArray);
	}else if(val == "Next 15 days"){
		var days = new Date((15*currentdatetimestamp) + new Date().getTime());
		for(var k=0;k<filterArray.length;k++){
			var graceDate = ChangeFormatofDate(filterArray[k].GraceEndDate);
			if(new Date(graceDate) >= new Date() && new Date(graceDate) <= days){
				todaysArray.push(filterArray[k]);
			}
		}
		AddFilterArraytoDataset(todaysArray);
	}else if(val == "Next 30 days"){
		var days = new Date((30*currentdatetimestamp) + new Date().getTime());
		for(var l=0;l<filterArray.length;l++){
			var graceDate = ChangeFormatofDate(filterArray[l].GraceEndDate);
			if(new Date(graceDate) >= new Date() && new Date(graceDate) <= days){
				todaysArray.push(filterArray[l]);
			}
		}
		AddFilterArraytoDataset(todaysArray);
	}else if(val == "Custom Date Range"){
		$m.juci.findById("dateranger").show();
	}else{
		if(val == "All"){
			AddFilterArraytoDataset(filterArray);
		}
	}
}


function getDateRange(e){
	if(toggleid === 0){
		filterArray = Allrenewals;
	}else if(toggleid == 1){
		filterArray = Forcerenewals;
	}else if(toggleid == 2){
		filterArray = Lapserenewals;
	}else if(toggleid == 3){
		filterArray = surrenderrenewals;
	}
	if(e.value[1] === null){
		return;
	}
	var datefirst = e.value[0];
	var datesecond = e.value[1];
	for(var i=0;i<filterArray.length;i++){
		var graceDate = ChangeFormatofDate(filterArray[i].GraceEndDate);
		graceDate = new Date(graceDate);
		if(graceDate >= datefirst && graceDate <= datesecond){
			todaysArray.push(filterArray[i]);
		}
	}
	AddFilterArraytoDataset(todaysArray);
}


function AddFilterArraytoDataset(array){
	if(toggleid === 0){
		$m.juci.dataset("totalrenewals",array);
		todaysArray = [];
	}else if(toggleid == 1){
		$m.juci.dataset("inforcerenewals",array);
		todaysArray = [];
	}else if(toggleid == 2){
		$m.juci.dataset("lapsedrenewals",array);
		todaysArray = [];
	}else if(toggleid == 3){
		$m.juci.dataset("surrenderedrenewals",array);
		todaysArray = [];
	}
}


function searcher(list, searchString){
	var by = juci.dataset("searchbyoption");
	if(by == "App No."){
		//TODO
	}else if(by == "Cust. ID"){
		//TODO
	}else if(by == "Name"){
		return list.ClientName.toLowerCase().search(searchString.toLowerCase()) > -1;
	}else if(by == "Mobile No."){
		return list.MobileNumber.search(searchString) > -1;	
	}
}


function ChangeFormat(a){
	var date1 = a.GraceEndDate;
		date1 = date1.split("/");
		currdate=date1[1]+"/"+date1[0]+"/"+date1[2];
		return currdate;
}

function ChangeFormatofDate(grace){
	var date1 = grace;
		date1 = date1.split("/");
		currdate=date1[1]+"/"+date1[0]+"/"+date1[2];
		return currdate;
}


function showApplications(event){
	var searchbyoption = $m.juci.getControl("search-text").value();
	if(toggleid === 0){
		filterArray = Allrenewals;
	}else if(toggleid == 1){
		filterArray = Forcerenewals;
	}else if(toggleid == 2){
		filterArray = Lapserenewals;
	}else if(toggleid == 3){
		filterArray = surrenderrenewals;
	}
	var searchCategory = document.getElementById("getSelectedoption");
	searchCategory = searchCategory.value;
	var searchOption = "";
	switch(searchCategory){
		case "App No.":
			searchOption = "ContractNumber";
			break;
		case "Mobile No.":
			searchOption = "MobileNumber";
			break;
		case "Name":
			searchOption = "ClientName";
			break;
	}
	var selectedApplications = [];
	for(var i=0;i<filterArray.length;i++){
		var filterOption = filterArray[i][searchOption].toLowerCase();
		searchbyoption = searchbyoption.toLowerCase();
		if(filterOption.indexOf(searchbyoption) != -1){
			selectedApplications.push(filterArray[i]);
		}
	}
	AddFilterArraytoDataset(selectedApplications);
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