$m.onData(function(eventObject){
	// Code to execute when a data is received from parent page
	var data = eventObject.data;
	hideAll()
	switch(data){
		case "diclaimer":
			showTerms(true, false, false);
			break;
		case "termsandconditions":
			showTerms(false, true, false);
			break;
		case "privacypolicy":
			showTerms(false, false, true);
			break;
		default :
			showTerms(true, false, false);
		
	}
	
});


function hideAll(){
	var disclaimer = $m.juci.findByClass("disclaimer");
	var terms_conditions = $m.juci.findByClass("terms_conditions");
	var privacy_policy = $m.juci.findByClass("privacy_policy");
	disclaimer[0].hide();
	terms_conditions[0].hide();
	privacy_policy[0].hide();
}

function showTerms(showDisclaimer, showTerms, showPolicy){
	var disclaimer = $m.juci.findByClass("disclaimer");
	var terms_conditions = $m.juci.findByClass("terms_conditions");
	var privacy_policy = $m.juci.findByClass("privacy_policy");
	if(showDisclaimer){
		disclaimer[0].show();	
	}
	if(showTerms){
		terms_conditions[0].show();	
	}
	if(showPolicy){
		privacy_policy[0].show();	
	}
}