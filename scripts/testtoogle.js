$m.onReady(function(){
	// Code to execute when the page is ready
 
});

function hi(e){
	debugger;
}

function toggleView(e){
	switch(e.newToggled){
		case 0:
			opencamera();
			break;
		case 1:
			opengallery();
			break;
		case 2:
			opengallery();
			break;
	}
}

function opencamera(){
	$m.capturePic(function(response){
		if(response.code == 1){
			// Success
			var imagePath = response.result.path;
		} else{
			// Error
			var errMsg = response.error.message;
		}
	});
}

function opengallery(){
$m.choosePic(function(response){
	if(response.code == 1){
		// Success
		var imagePath = response.result.path;
	} else{
		// Error
		var errMsg = response.error.message;
	}
});

}