/**
 * version.js
 * @author CloudPact Technologies
 * @description : This script is used for changing the version number when pack update is happening
 **/
$m.juci.dataset("version", "");
$m.onResume(function(){
	//$m.logInfo("Current Version -"+$m.getPref("version"));
	$m.juci.dataset("version", 4.5);
	$m.putPref("version",4.5);
	$m.savePref();
});