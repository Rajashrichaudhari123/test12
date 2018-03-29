juci.addDataset("date","");
var cdates = [
			{"type":"offday", "date":"Sunday","class":"juci_black","text":"Sunday", "select":"false"},
			{"type":"offday", "date":"Saturday","class":"","text":"Saturday", "select":"false"}
		];
var capInfo = [
			{"type":"capacity", "date":"","class":"juci_blue","text":"","select":"false"},
			{"type":"capacity", "date":"","class":"","text":"","select":"false"},
			{"type":"capacity", "date":"","class":"","text":"","select":"false"}			
		];

var capInfotenkken = [
			{"type":"capacity", "date":"","class":"","text":"","select":"false"},
			{"type":"capacity", "date":"","class":"","text":"","select":"false"},
			{"type":"capacity", "date":"","class":"","text":"1", "select":"false"}
		];
var generalservices = [
			{"type":"capacity", "date":"","class":"juci_orange","text":"","select":"false"},
			{"type":"capacity", "date":"","class":"","text":"","select":"false"},
			{"type":"capacity", "date":"","class":"","text":"", "select":"false"}	
		];
		
var arr = [];
var dummyObj = {
	"holiday":"Sankranthi",
	"Login":new Date(),
	"Logout":1481034802000,
	"Absent":1480689202000,
	"weekof":1481380402000,
	"onDuty":1481639602000
};

arr.push(dummyObj);
			

$m.onReady(function(){
//	var c = juci.getControl("cal");
//	c.setCustomDates(cdates);
//	c.setAnnotations(capInfo);	
//	c.setAnnotations(capInfotenkken);
//	c.setAnnotations(generalservices);
	viewAttendance();
});

function viewAttendance(){
	for(var i=0;i<arr.length;i++){
		//var dateObj = new Date(arr[i].Login);
		dateObj = arr[i].Login;
		var obj = getFormattedDate(dateObj);
		
		var cObj = {"type":"","date":"","class":"","text":"","select":"false"};
		
		if(dateObj.getDayName() == "Sunday"){
			cObj = {"type":"offday","date":"Sunday","class":"","text":"Sunday","select":"false"};
		} 
		else if(arr[i].holiday == "Sank"){
			cObj = {"type":"holiday","date":"","class":"","text":"","select":"false"};
		} else if(arr[i].Login){
			cObj = {"type":"capacity","date":obj,"class":"","text":"20.20","select":"false"};
		}
		capInfotenkken.push(cObj);
	}
	var c = juci.getControl("cal");
	c.setCustomDates(cdates);
	c.setAnnotations(capInfo);	
	c.setAnnotations(capInfotenkken);
	c.setAnnotations(generalservices);	
}


function getFormattedDate(dateObj){
	if(dateObj.getDate() > 9){
		if(dateObj.getMonth() > 9){
			return (dateObj.getMonth()+1)+ "/" +dateObj.getDate()+ "/" +dateObj.getFullYear();
		} else {
			return "0"+(dateObj.getMonth()+1)+ "/" +dateObj.getDate()+ "/" +dateObj.getFullYear();
		}
	} else {
		if(dateObj.getMonth() > 9){
			return (dateObj.getMonth()+1)+ "/0" +dateObj.getDate()+ "/" +dateObj.getFullYear();
		} else {
			return "0"+(dateObj.getMonth()+1)+ "/0" +dateObj.getDate()+ "/" +dateObj.getFullYear();
		}
	}
}