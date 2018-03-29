juci.addDataset("files",[]);

$m.onData(function(res){
	juci.dataset("files",[]);
});
function sendMsg(){
	var options = {
		"text" : "",                                                        
		"senderid":"",                                              
		"filepaths" : []           
	};
	var txtmsg = $m.juci.getControl("txtmsg").value();
	var mobile = $m.juci.getControl("mobile").value();
	options.text = txtmsg;
	options.senderid = "91"+mobile;
	options.filepaths = juci.dataset("files");
	$m.shareWithWhatsapp(options,function(res){console.log(res)})
}


function openFileChoose(){
	$m.getFileChooser(function(res){
		if(res.code){
			juci.dataset("files",res.result);
		}
	});
}

