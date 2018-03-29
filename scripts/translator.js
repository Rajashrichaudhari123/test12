/**
 * translator.js
 *
 * @author Sajid Halai
 * @description : check cookies and set language
 */


//(function(){
//    var cookies;
//
//    function readCookie(name,c,C,i){
//        if(cookies){ return cookies[name]; }
//
//        c = document.cookie.split('; ');
//        cookies = {};
//
//        for(i=c.length-1; i>=0; i--){
//           C = c[i].split('=');
//           cookies[C[0]] = C[1];
//        }
//
//        return cookies[name];
//    }
//
//    window.readCookie = readCookie; // or expose it however you want
//})();

$m.onResume(function(event){
	//$m.putPref("lang", "JAPANESE");
	//$m.savePref();
	//var preference = $m.getPref("lang");
	var preference = "EN";
	if(preference == "EN"){
		preference = "English";
	}else{
		
		preference = "TAMIL";
	}
	preference = "TAMIL";
	juci.dataset("juci_language", preference ? preference : "TAMIL");
});


$m.onReady(function(event){
	//$m.putPref("lang", "JAPANESE");
	//$m.savePref();
	//var preference = $m.getPref("lang");
	var preference = "EN";
	if(preference == "EN"){
		preference = "English";
	}else{
		preference = "JAPANESE";
	}
	preference = "JAPANESE";
	juci.dataset("juci_language", preference ? preference : "JAPANESE");
});

