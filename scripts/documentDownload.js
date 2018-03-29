/**
 * documentDownload.js
 * @author CloudPact Technologies
 * @description : This script is used downloading the leafflets,brouchers and faq
 **/
function openBroucher(event) {
	openDocument(event.bindingContext.$parent.title(), event.data.url, event.data.Title);
}

function openDocument(filename, url, Title) {
	//	url = "http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf";
	url = encodeURI(url);
	var fileObj;
	$m.showProgress("Opening product brochure");
	if (Title == "Product Brochure") {
		fileObj = $m.file(filename + "broucher.pdf", {
			"level": $m.APP_LEVEL,
			"storageType": $m.SDCARD
		});
	} else if(Title == "Product Leaflets") {
		fileObj = $m.file(filename + "leaflet.pdf", {
			"level": $m.APP_LEVEL,
			"storageType": $m.SDCARD
		});
	}
	else if(Title == "FAQ") {
		fileObj = $m.file(filename + "FAQ.pdf", {
			"level": $m.APP_LEVEL,
			"storageType": $m.SDCARD
		});
	}
	var intentObj = {
		"action": "android.intent.action.VIEW"
	};
	fileObj.getPath(function(x) {
		fileObj.exists(function(y) {
			if (y.result) {
				$m.hideProgress();
				//$m.logInfo("LAF exists - " + y.result);
				//$m.logInfo("LAF Path - " + x.result);
				if ($m.isAndroid()) {
					intentObj.scheme = "file://" + x.result;
					intentObj.mimeType = "application/pdf";
					$m.open("LAF", intentObj.scheme, null, {
						"type": "application/pdf"
					});
				} else {
					$m.open("LAF", url);
				}
				$m.hideProgress();
			} else {
				$m.showProgress("Please wait while downloading " +Title+"...");
				$m.download(url, fileObj, function(r) {
					if (r.code == "200") {
						$m.hideProgress();
						if ($m.isAndroid()) {
							intentObj.scheme = "file://" + x.result;
							intentObj.mimeType = "application/pdf";

							$m.open("LAF", intentObj.scheme, null, {
								"type": "application/pdf"
							});
						} else {
							$m.open("LAF", url);
						}
					} else {
						$m.hideProgress();
						$m.alert("Incorrect PDF format");
					}
				});
			}
		});
	});
}