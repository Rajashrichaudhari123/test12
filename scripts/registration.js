$m.onReady(function(){
juci.findById("Otp_Content").hide();
juci.findById("update_Content").hide();
});


$m.onResume(function(){
	// Code to execute when the page is resumed
	juci.findById("Otp_Content").hide();
    juci.findById("update_Content").hide();
	
});

$m.onData(function(eventObject){
juci.findById("Otp_Content").hide();
juci.findById("update_Content").hide();
});

function show(){
	
	var show_char = juci.getControl("password");
	
	if(show_char.i.el.type =="password"){
		
		show_char.i.el.type="text";
	}
	
	else {
		
      	show_char.i.el.type="password";
	}
}

function close(){
	
  $m.close();
}

show_content=false;
function showContent(){
	
	if(show_content==true)
	{
	juci.findById("update_Content").hide();
	juci.findById("Otp_Content").hide();
		show_content=false;
	}
	else{
			juci.findById("Otp_Content").show();
			show_content=true;
	}
	
}

var update=false;
function Show_Update(){
		if(update==true)
	{
		
	juci.findById("update_Content").hide();
		update=false;
	}
	else{
			juci.findById("update_Content").show();
			update=true;
	}
	
	
	
	
	
}
function submitDetails(){
	
	var USER_ID = juci.getControl("userName").value();
	var PASSWORD = juci.getControl("password").value();
/*	if (USER_ID == null || USER_ID == "") {
	$m.toast("Client ID required");
	return;
	}
	if (PASSWORD == null || PASSWORD == "") {
		$m.toast("Password required");
		return;
	}*/
	var data = {
		"UserID":USER_ID,
		"Password":PASSWORD
		
	};
	data = JSON.stringify(data);
	service = new ServiceLibrary();
	service.PostRegistration(function(list){
		if(list.Status == "1"){
			sendotp(list.UserID);
		$m.putPref("userid", list.UserID);
		$m.savePref();
		}else{
			$m.alert(list.StatusDescription);
		}
	},data);
	
	
}
var userid;

function forgot_password(){
     service = new ServiceLibrary();
	var USER_ID = juci.getControl("userName").value();
	var PASSWORD = juci.getControl("password").value();
	if (USER_ID == null || USER_ID == "") {
	$m.toast("Client ID required");
	return;
	}
	if (PASSWORD == null || PASSWORD == "") {
		$m.toast("Password required");
		return;
	}
		var data = {
		"UserID":USER_ID,
		"Password":PASSWORD
		
	};
	
	data = JSON.stringify(data);
		service.ForgotPassword(function(list){
				if(list.Status == "1"){
		      sendotp(list.UserID);
	
		}else{
			$m.alert(list.StatusDescription);
		}
	},data);
}
function sendotp(userid){
	service.SendRegistrationOtp(function(list){
		if(list.Status == "1"){
		var otpdetails={
			"emailid":list.EmailID,
			"mobile":list.MobileNumber
		};
		$m.juci.addDataset("otpdetails",otpdetails);
		juci.showDialog("dialogotp");
		}else{
			$m.alert(list.StatusDescription);
		}
	},userid);

}


function doClose(){
	juci.getControl("userName").value(null);
	juci.getControl("password").value(null);
	$m.close();
}

function showterms(){
	juci.showDialog("dialog-box");
}

function dialogue_hidebox(){
	juci.hideDialog("dialog-box");
}

function hidebox(){
  juci.getControl("Otp").value(null);
	juci.hideDialog("dialog-box");
}
function resendOtp(){
	var userid = $m.getPref("userid");
		service.SendRegistrationOtp(function(list){
		if(list.Status == "1"){
			$m.alert("OTP sent Sucessfully");
		}else{
			$m.alert(list.StatusDescription);
		}
	},userid);
}

function SubmitOtp(){
	var userid = $m.getPref("userid");
	var Otp = juci.getControl("Otp").value();
				if (Otp == null || Otp == "") {
						$m.toast("Otp is required");
						return;
					}
					var data={
						"UserId":userid,
						"OTP":Otp
					}
						data = JSON.stringify(data);
		service.VerifyRegistrationOtp(function(list){
		if(list.Status == "1"){
			$m.open("Login Page","/system/addaccount.html");
			
		}else{
			$m.alert(list.StatusDescription);
		}
	},userid,Otp);
	
}
function SubmitOtpChange(){
	var userid = $m.getPref("userid");
	var Otp = juci.getControl("Otp").value();
				if (Otp == null || Otp == "") {
						$m.toast("Otp is required");
						return;
					}
					var data={
						"UserId":userid,
						"OTP":Otp
					}
						data = JSON.stringify(data);
		service.VerifyRegistrationOtp(function(list){
		if(list.Status == "1"){
		$m.alert("Password changed successfully");
			$m.open("Login Page","/system/addaccount.html");
			
		}else{
			$m.alert(list.StatusDescription);
		}
	},userid,Otp);
	
}

