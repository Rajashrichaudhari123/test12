function openTeamLogin() {
	if(!window.dbHelper)
		initDB();
	else
		checkData();
		juci.showDialog("dialog-teamlogin");
	
}


function hidebox(){
		sm_list= juci.findById("sm");
	bm_list= juci.findById("bm");
	rm_list= juci.findById("rm");
	ad_list= juci.findById("ad");
	am_list= juci.findById("am");
	tpsm_list= juci.findById("tpsm");
	tppar_list= juci.findById("tppar");
	tpadv_list= juci.findById("tpadv");
	tpbom_list= juci.findById("tpbom");
	
  juci.getControl("bm").value(null);
   juci.getControl("sm").value(null);
  juci.getControl("ad").value(null);
   juci.getControl("rm").value(null);
  juci.getControl("zm").value(null);
  juci.getControl("am").value(null);
  juci.getControl("tpsm").value(null);
  juci.getControl("tppar").value(null);
  juci.getControl("tpadv").value(null);
  juci.getControl("tpbom").value(null);
  
	sm_list.hide();
	bm_list.hide();
	am_list.hide();
	rm_list.hide();
	ad_list.hide();
	tpsm_list.hide();
//	document.getElementById("sm").style.display = "none";
//	document.getElementById("bm").style.display = "none";
//	document.getElementById("rm").style.display = "none";
//	document.getElementById("ad").style.display = "none";
//	document.getElementById("am").style.display = "none";
//	document.getElementById("zm").style.display = "none";
//	
//	document.getElementById("sm").value = "";
//	document.getElementById("bm").value = "";
//	document.getElementById("rm").value = "";
//	document.getElementById("am").value = "";
//	document.getElementById("ad").value = "";
//	document.getElementById("zm").value = "";
	
	juci.hideDialog("dialog-teamlogin");
}