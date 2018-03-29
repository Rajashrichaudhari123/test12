/**
 * getblob.js
 * @author CloudPact Technologies
 * @description : HTML to canvas library
 **/
 
function getBlobFromHtml(imageName,callback){
	$m.showProgress("Loading...");
	generatePNG(imageName,callback);
}

function generatePNG(imageName,callback) {
	cache_width = $(".content").width();
	$(".content").width((750 * 1.33333) - 80).css('max-width', 'none');
	html2canvas($(".content")[0], {
		background: "#FFFFFF",
		removeContainer: true,
		onrendered: function(canvas) {
			var img = canvas.toDataURL("image/png");
			$(".content").width(cache_width);
			var file = new $m.file(imageName+".png");
			file.write(img, function(response) {
				if(response.result){
					file.getPath(function(pathResponse) {
						if(pathResponse.result){
							$m.hideProgress();
							callback("file://"+pathResponse.result);	
						}
					});
				}
			});
			$(".content").width(cache_width);
		}
	});
}

 // create canvas object
function getCanvas() {
	return html2canvas($(".content")[0], {
		background: "#FFFFFF",
		removeContainer: true
	});
}


function getBase64Image(img) { var canvas = document.createElement("canvas"); canvas.width = img.width; canvas.height = img.height; var ctx = canvas.getContext("2d"); ctx.drawImage(img, 0, 0); var dataURL = canvas.toDataURL("image/png"); return dataURL.replace(/^data:image\/(png|jpg);base64,/, ""); }