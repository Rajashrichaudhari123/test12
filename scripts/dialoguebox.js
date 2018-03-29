$m.juci.addDataset("manager", ["Zonal Manager","Regional Manager"]);
 var lead = {
	"fname":"",
	"lname":"",
	"email":"",
	"number":"",
	"managertype":""
 };
 $m.juci.addDataset("lead",lead);
 
 function addLead(e){
 var data = e.data;
 }
 
function removeBox(){
	juci.hideDialog("dialog-box");
}
 
function openLead(){
	juci.showDialog("dialog-box");
}

