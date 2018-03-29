$m.juci.addDataset("newsDetails",{"DownloadUrl":"","DownloadUrl_details":"","ImageLink":"","ImageLink_details":"","ImagePreviewLink":"","ImagePreviewLink_details":"","Location":"","Location_details":"","NewsDate":"","NewsDate_details":"","PressDetailsUrl":"","PressID":"8","Publication":"","TextPreview":"","TextPreview_details":"","Text_details":"","Title":"","Title_details":"","Type":""});

$m.onData(function(eventObject){
	juci.dataset("headerName","News Details");
	var data = eventObject.data;
	$m.juci.dataset("newsDetails",data);
});

function downloadPdf(data){
	
	
}



function formateDate(newsdate){
	var dateOfCreation = newsdate();
	dateOfCreation = dateOfCreation.split("/");
	var formatedDate = new Date(dateOfCreation[1] + "/" + dateOfCreation[0] + "/" + dateOfCreation[2]).toString("dd MMM, yyyy |");
	return formatedDate;
}