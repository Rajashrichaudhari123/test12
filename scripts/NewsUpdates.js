/**
 * NewsUpdates.js
 * @author CloudPact Technologies
 * @description : This script is used for storing news and updates data into local db.
 **/
var years = ["2017","2016","2015","2014"]
var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var newsTypes = ["All","In the News","Press Release"];
var newsObj = {
  "DownloadUrl": "",
  "ImageLink": "",
  "ImagePreviewLink": "",
  "Location": "",
  "NewsDate": "",
  "PressDetailsUrl": "",
  "PressID": "",
  "TextPreview": "",
  "Title": ""
}
$m.juci.addDataset("newsyears",years);
$m.juci.addDataset("newsmonths",months);
$m.juci.addDataset("newstypes",newsTypes);
$m.juci.addDataset("newslist", []);

$m.juci.addDataset("filterYear","2017");
$m.juci.addDataset("filterType","All");
$m.juci.addDataset("filterMonth","Jan");

 
function formateDate(newsdate){
	var dateOfCreation = newsdate();
	dateOfCreation = dateOfCreation.split("/");
	var formatedDate = new Date(dateOfCreation[1] + "/" + dateOfCreation[0] + "/" + dateOfCreation[2]).toString("dd MMM, yyyy |");
	return formatedDate;
}


function getPreview(textPreview){
	textPreview = textPreview();
	if(textPreview && textPreview.length){
		textPreview = textPreview.substring(0,60);
		textPreview = textPreview + "...";
	}
	return textPreview;
}


function filterNewsResults(year,type){
	
}

function checkYear(filterYear,newsDate){
	filterYear = filterYear();
	newsDate = newsDate();
	newsDate = newsDate.split("/");
	return (filterYear === newsDate[2]);
}

function filterByYear(year){
	$m.juci.dataset("filterYear",year);
}

function checkType(filterType, Type){
	filterType = filterType();
	Type = Type();
	if(filterType === "All"){
		return true;
	}
	if(filterType === Type){
		return true;
	}
	return false;
}

function filterByType(filterType){
	$m.juci.dataset("filterType",filterType);
}

function checkMonth(filterMonth, newsDate){
	var dateOfCreation = newsDate();
	dateOfCreation = dateOfCreation.split("/");
	var formatedDate = new Date(dateOfCreation[1] + "/" + dateOfCreation[0] + "/" + dateOfCreation[2]).toString("MMM");
	if(filterMonth() === formatedDate){
		return true;
	}
	return false;
}

function filterByMonth(filterMonth){
	$m.juci.dataset("filterMonth",filterMonth);
}

function openNewsDetails(newsDetails){
	newsDetails = ko.toJS(newsDetails);
	var getNewsDetailsResponse = function(newsFullDetails){
		for(var key in newsFullDetails){
			newsDetails[key + "_details"] = newsFullDetails[key];
		}
		$m.open("NewsDetails", "/News and Updates/NewsDetails.html",newsDetails);
	}
	NewsUpdatesServices.GetNewsDetails(newsDetails.PressID, getNewsDetailsResponse);
}


$m.onData(function(eventObject){
	juci.dataset("headerName","News Updates");
	getNewsUpdateList();
});

function getNewsUpdateList(){
	var getNewsUpdatesResponse = function(newsList){
		for(var i=0;i<newsList.length;i++){
			if(newsList[i]["Type"] === "Press Release"){
				newsList[i]["Type"] = "";
			}else{
				newsList[i]["Type"] = "In the News";
			}
		}		
		$m.juci.dataset("newslist",newsList);
	}
	NewsUpdatesServices.GetNewsUpdates(getNewsUpdatesResponse);
}