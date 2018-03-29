(function(){
	window.Messages = {
		get: function(id, args){
			if(typeof args == "undefined"){
				args = [];
			}
			var msg = _messages[id];
			var numArgs = args.length;
			for(var i = 0; i < numArgs; i++){
				msg = msg.replace("?"+i, args[i]);
			}
			return msg;
		}
	};
})();
function getUserName(){
	if(__mowbly__.Page.userName){
		var accountObj = __mowbly__.Page.context.userAccount;
		try{
			accountObj = JSON.parse(accountObj);
		}catch(e){}
		return accountObj && accountObj.fname ? (accountObj.fname + " " + (accountObj.lname ? accountObj.lname : "" ) ) : __mowbly__.Page.userName;
	}
	return null;
}