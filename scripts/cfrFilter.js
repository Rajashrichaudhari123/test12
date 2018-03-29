/**
 * cfrFilter.js
 * @author CloudPact Technologies
 * @description : This script is used for cfr Filter.
 **/

var optionselectedforsort;
var SortingArray = [];

function getSortBy(e){
	optionselectedforsort = e.target.value;
	if(optionselectedforsort == "Name of Proposer" || optionselectedforsort == "Plan Name" || optionselectedforsort == "Type" || optionselectedforsort == "Status"){
		$m.juci.dataset("options3",["Select","A to Z","Z to A"]);
		$m.juci.dataset("selectcatogory",["Select","A to Z","Z to A"]);
	}else if(optionselectedforsort == "Date" || optionselectedforsort == "Raised On"){
		$m.juci.dataset("options3",["Select","Earliest to Latest","Latest to Earliest"]);
		$m.juci.dataset("selectcatogory",["Select","Earliest to Latest","Latest to Earliest"]);
	}
	getlistBySort();
}

function getlistBySort(e){
	if(toggleid === 0){
		SortingArray = cfrArray;
	}else if(toggleid == 1){
		SortingArray = ftnrarry;
	}else if(toggleid == 2){
		SortingArray = uwarry;
	}
	var optionselcted = document.getElementById("filterList-listsort").value;
	if(optionselectedforsort == "Date" && optionselcted == "Earliest to Latest"){
		SortingArray.sort(function(a,b){
		if(new Date(ChangeFormat(a)).getTime() > new Date(ChangeFormat(b)).getTime())
			return 1;
		else
			return 0;
		});
		AssignToDataset(SortingArray);
	
	}else if(optionselectedforsort == "Date" && optionselcted == "Latest to Earliest"){
		SortingArray.sort(function(a,b){
		if(new Date(ChangeFormat(a)).getTime() < new Date(ChangeFormat(b)).getTime())
			return 1;
		else
			return 0;
		});
		AssignToDataset(SortingArray);
	}
	else if(optionselectedforsort == "Name of Proposer" && optionselcted == "A to Z"){
		SortingArray.sort(function(a,b){
		if(a.CustomerName.toLowerCase() > b.CustomerName.toLowerCase())
			return 1;
		else
			return 0;
		});
		AssignToDataset(SortingArray);

	}else if(optionselectedforsort == "Name of Proposer" && optionselcted == "Z to A"){
		SortingArray.sort(function(a,b){
		if(a.CustomerName.toLowerCase() < b.CustomerName.toLowerCase())
			return 1;
		else
			return 0;
		});
		AssignToDataset(SortingArray);

	}else if(optionselectedforsort == "Plan Name" && optionselcted == "A to Z"){
		SortingArray.sort(function(a,b){
		if(a.ProductName.toLowerCase() > b.ProductName.toLowerCase())
			return 1;
		else
			return 0;
		});
		AssignToDataset(SortingArray);
		
	}else if(optionselectedforsort == "Plan Name" && optionselcted == "Z to A"){
		SortingArray.sort(function(a,b){
		if(a.ProductName.toLowerCase() < b.ProductName.toLowerCase())
			return 1;
		else
			return 0;
		});
		AssignToDataset(SortingArray);
		
	}else if(optionselectedforsort == "Type" && optionselcted == "A to Z"){
		SortingArray.sort(function(a,b){
		if(a.CfrCategory.toLowerCase() > b.CfrCategory.toLowerCase())
			return 1;
		else
			return 0;
		});
		AssignToDataset(SortingArray);
		
	}else if(optionselectedforsort == "Type" && optionselcted == "Z to A"){
		SortingArray.sort(function(a,b){
		if(a.CfrCategory.toLowerCase() < b.CfrCategory.toLowerCase())
			return 1;
		else
			return 0;
		});
		AssignToDataset(SortingArray);
		
	}else if(optionselectedforsort == "Status" && optionselcted == "A to Z"){
		SortingArray.sort(function(a,b){
		if(a.ApplicantCfrStatus.toLowerCase() > b.ApplicantCfrStatus.toLowerCase())
			return 1;
		else
			return 0;
		});
		AssignToDataset(SortingArray);
		
	}else if(optionselectedforsort == "Status" && optionselcted == "Z to A"){
		SortingArray.sort(function(a,b){
		if(a.ApplicantCfrStatus.toLowerCase() < b.ApplicantCfrStatus.toLowerCase())
			return 1;
		else
			return 0;
		});
		AssignToDataset(SortingArray);
		
	}else if(optionselectedforsort == "Raised On" && optionselcted == "Earliest to Latest"){
		SortingArray.sort(function(a,b){
		if(new Date(ChangeFormatofDate(a)).getTime() > new Date(ChangeFormatofDate(b)).getTime())
			return 1;
		else
			return 0;
		});
		AssignToDataset(SortingArray);
		
	}else if(optionselectedforsort == "Raised On" && optionselcted == "Latest to Earliest"){
			SortingArray.sort(function(a,b){
		if(new Date(ChangeFormatofDate(a)).getTime() > new Date(ChangeFormatofDate(b)).getTime())
			return 1;
		else
			return 0;
		});
		AssignToDataset(SortingArray);
		
	}
	
}


function AssignToDataset(SortingArray){
	if(toggleid === 0){
		$m.juci.dataset("cfr",SortingArray);
	}else if(toggleid == 1){
		$m.juci.dataset("cfrftnr",SortingArray);
	}else if(toggleid == 2){
		$m.juci.dataset("cfrUW",SortingArray);
	}
}


var cal = 24*60*60*1000;
filterArray=[];
DueArray = [];
opencfrArray = [];
Filterby = [];

function getfilterlist(e){
	if(toggleid === 0){
		Filterby = cfrArray;
	}else if(toggleid == 1){
		Filterby = ftnrarry;
	}else if(toggleid == 2){
		Filterby = uwarry;
	}
	var val = e.currentTarget.value;
	var Currentdate = new Date().getTime();
	if(val == "Open > 5 Days"){
		for(var i=0;i<Filterby.length;i++){
			myDate=Filterby[i].ApplicantCfrOpenDate;
			myDate=myDate.split("/");
			raisedDate=myDate[1]+"/"+myDate[0]+"/"+myDate[2];
			raisedDate = new Date(raisedDate).getTime();
			if(((Currentdate - raisedDate)/cal) > 5){
				filterArray.push(Filterby[i]);
			}
					
		}
		AssignFilterToDataset(filterArray);
	}else if(val == "Due for cancellation in 7 days"){
		for(var j=0;j<Filterby.length;j++){
			DeadDate=Filterby[j].ApplicantCfrDeadLine;
			DeadDate=DeadDate.split("/");
			DueDate=DeadDate[1]+"/"+DeadDate[0]+"/"+DeadDate[2];
			DueDate = new Date(DueDate).getTime();
			if(((Currentdate - DueDate)/cal) <= 7){
				DueArray.push(Filterby[j]);
			}
					
		}
		AssignFilterToDataset(DueArray);
	}else if (val == "All Open"){
		for(var k=0;k<Filterby.length;k++){
			if(Filterby[k].ApplicantCfrStatus == "Open"){
				opencfrArray.push(Filterby[k]);
			}	
		}
		AssignFilterToDataset(opencfrArray);
	}
}

function AssignFilterToDataset(array){
	if(toggleid === 0){
		$m.juci.dataset("cfr",array);
		filterArray = [];
		opencfrArray = [];
		DueArray = [];
	}else if(toggleid == 1){
		$m.juci.dataset("cfrftnr",array);
		filterArray = [];
		opencfrArray = [];
		DueArray = [];
	}else if(toggleid == 2){
		$m.juci.dataset("cfrUW",array);
		filterArray = [];
		opencfrArray = [];
		DueArray = [];
	}
}


function ChangeFormat(a){
	var date1 = a.ApplicantCfrDeadLine;
		date1 = date1.split("/");
		currdate=date1[1]+"/"+date1[0]+"/"+date1[2];
		return currdate;
}

function ChangeFormatofDate(a){
	var date1 = a.ApplicantCfrOpenDate;
		date1 = date1.split("/");
		currdate=date1[1]+"/"+date1[0]+"/"+date1[2];
		return currdate;
}
