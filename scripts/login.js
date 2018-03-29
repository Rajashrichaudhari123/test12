function back (){
		juci.getControl("userName").value(null);
		juci.getControl("password").value(null);
	
      $m.open("Login", "/system/addaccount.html");

}

function changepwd (){
		juci.getControl("userName").value(null);
		juci.getControl("password").value(null);
	$m.open("Forgot Password","/system/changepwd.html");
}

$m.onClose(function(){
	juci.getControl("userName").value(null);
		juci.getControl("password").value(null);
});