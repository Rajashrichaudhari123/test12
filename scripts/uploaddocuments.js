/**
 * uploadDocuments.js
 * @author CloudPact Technologies
 * @description : This script is used for uploading the documents
 **/
 var disableDoc = true;

$m.onReady(function() {
    // Code to execute when the page is ready
    //juci.findById("previous-btn").disable();
    $m.juci.dataset("typeOfDocumentRef","");
    juci.getControl("adressprooflist").addListItemClick(addresslist_Delete, this, ".delete");
    juci.getControl("idprooflist").addListItemClick(uploadId_delete, this, ".delete");
    juci.getControl("incomeprooflist").addListItemClick(income_delete, this, ".delete");
    juci.getControl("ageprooflist").addListItemClick(ageproof_delete, this, ".delete");
    juci.getControl("decprooflist").addListItemClick(declaration_delete, this, ".delete");
    juci.getControl("laphotoprooflist").addListItemClick(laPhoto_delete, this, ".delete");
    juci.getControl("proposerphotolist").addListItemClick(proposerPhoto_delete, this, ".delete");
     juci.getControl("pradressprooflist").addListItemClick(praddresslist_Delete, this, ".delete");
    juci.getControl("pridprooflist").addListItemClick(pruploadId_delete, this, ".delete");
    juci.getControl("princomeprooflist").addListItemClick(princome_delete, this, ".delete");
    juci.getControl("prageprooflist").addListItemClick(prageproof_delete, this, ".delete");
    juci.getControl("chequelist").addListItemClick(cheque_delete, this, ".delete");
    juci.getControl("otherlist").addListItemClick(other_delete, this, ".delete");
    juci.getControl("typeofdoclist").addListItemClick(typeOfDocement_delete, this, ".delete");
   // juci.getControl("prdecprooflist").addListItemClick(prdeclaration_delete, this, ".delete");
   
    
});

$m.onClose(function(){
	if(disableDoc){
		if (disableDoc == true){
			event.preventDefault();	 	
		}	
	}
});

var customerDetails = $m.juci.dataset("personalForm");
var uploadDocuments = {
    "optionsforageproof": getOptions(proofsMaster, "Age Proof"),
    "optionsforidproof": getOptions(proofsMaster, "Identity Proof"),
    "optionsforaddressproof": getOptions(proofsMaster, "Address Proof"),
    "optionsforproposerageproof": getOptions(proofsMaster, "Age Proof"),
    "optionsforproposeridproof": getOptions(proofsMaster, "Identity Proof"),
    "optionsforproposeraddressproof": getOptions(proofsMaster, "Address Proof"),
    "optionsforincomeproof": getOptions(proofsMaster, "Income Proof"),
    "optionsforcustomerdeclaration": getOptions(proofsMaster, "Identity Proof"),
    "optionsforprincomeproof": getOptions(proofsMaster, "Income Proof"),
    "optionsforprcustomerdeclaration": getOptions(proofsMaster, "Identity Proof"),
    "optionsForTypeOfProof":getOptions(proofsMaster, "Type Of Document"),
    
    "optionselectedforageproof": "",
    "optionselectedageproofimage": [],
    "optionselectedforidproof": "",
    "optionselectedidproofimage": [],
    "optionselectedforaddressproof": "",
    "optionselectedaddressproofimage": [],
    "optionselectedforproposerageproof": "",
    "optionselectedproposerageproofimage": [],
    "optionselectedforproposeridproof": "",
    "optionselectedproposeridproofimage": [],
    "optionselectedforproposeraddressproof": "",
    "optionselectedproposeraddressproofimage": [],
    "optionselectedforincomeproofla": "",
    "optionselectedincomeproofimagela": [],
    "optionselectedforincomeproofproposer": "",
    "optionselectedincomeproofimageproposer": [],
    "optionselectedforbankproofimagela": [],
    "optionselectedforbankproofimageproposer": [],
    "optionselectedforcustomerdeclaration": "",
    "applicantphoto": [],
    "proposerphoto": [],
    "customerdeclaration": [],
    "miscellaneousdocs": [],
    "proposerchequeproof": [],
    "lachequeproof": [],
    "bankproof": [],
    "typeOfDocuements":[],
    "optionsSelectedForTypeOfProof":""
};
$m.juci.addDataset("uploaddocuments", uploadDocuments);

function getOptions(master, proofId) {
    var pushArray = [];
    for (var i = 0; i < master.length; i++) {
        if (master[i].Type == proofId) {
            pushArray.push(master[i]);
        }
    }
    return pushArray;
}

function hide() {
    $m.juci.findById("pop").hide();
}

function hidepop() {
    $m.juci.findById("popup").hide();
}

function hidepop2() {
    $m.juci.findById("popup2").hide();
}

function hidepop3() {
    $m.juci.findById("popup3").hide();
}

function onAddresProofClick(e) {
    if (e.value == "Aadhar Card-not provisionl(LR)") {
        var a = juci.findById("capture-proof");
        a.disable();
        var b = juci.findById("gallery-proof");
        b.disable();
        var c = juci.findById("browse-proof");
        c.disable();
        var d = juci.findById("laidproof");
        d.disable();
    }
}

function hidepop4() {
    $m.juci.findById("popup4").hide();
}

function hidepop5() {
    $m.juci.findById("popup5").hide();
}

function changeTitles(event) {
    //TODO
}

function toggleAttachment(id, type) {
    var selectBoxIds = {
        "addressproof": "laaddproof",
        "photoproof": "laphotoproof",
        "idproof": "laidproof",
        "incomeproof": "laincomeproof",
        "ageproof": "laageproof",
        "declarationproof": "ladeclaration",
         "praddressproof": "praddproof",
        "prphotoproof": "prphotoproof",
        "pridproof": "pridproof",
        "princomeproof": "princomeproof",
        "prageproof": "prageproof",
        "typeofdocproof":"typeofdocproof"
        
    }
    if (id == "declarationproof" || id == "photoproof" || id == "photoLA" || id == "proposerproof" ||id == "prphotoproof" ||id =="otherproof"|| id =="cheqproof" || id =="typeofdocproof" ) {
        switch (type) {
            case 0:
                opencamera(id);
                break;
            case 1:
                opengallery(id);
                break;
            case 2:
                opengallery(id);
                break;
        }
    } else {
        var documentType = $m.juci.getControl(selectBoxIds[id]).value();
        if (!documentType) {
            $m.alert("Please select document type");
            return;
        }
        switch (type) {
            case 0:
                opencamera(id);
                break;
            case 1:
                opengallery(id);
                break;
            case 2:
                opengallery(id);
                break;
        }
    }
}

function getValueFromProofMaster(master, proofId) {
    var pushArray = [];
    var arr = [];
    var idPref = $m.getPref("idValue");
    var typeOfDoc = juci.dataset("typeOfDocumentRef");
    for (var i = 0; i < master.length; i++) {
        if (idPref == "Pan Card") {
            if (master[i].Type == proofId) {
                if (master[i].LA_CODE == "PAN CARD") {
                    arr.push(master[i]);
                    var uploaddocuments = juci.dataset("uploaddocuments");
                    uploadDocuments.optionselectedforproposeridproof = arr[0];
                    juci.dataset("uploaddocuments", uploadDocuments);
                    //juci.findById("laidproof").disable();
                }
            }
        } else if (idPref == "Aadhar Card") {
            if (master[i].Type == proofId) {
                if (master[i].LA_CODE == "AADHAR") {
                    arr.push(master[i]);
                    var uploaddocuments = juci.dataset("uploaddocuments");
                    uploadDocuments.optionselectedforproposeridproof = arr[0];
                    juci.dataset("uploaddocuments", uploadDocuments);
                    //juci.findById("laidproof").disable();
                }
            }
        } else if(typeOfDoc == "PANCARD") {
        	if (master[i].Type == proofId) {
                if (master[i].LA_CODE == "PAN") {
                    arr.push(master[i]);
                    var uploaddocuments = juci.dataset("uploaddocuments");
                    uploadDocuments.optionsSelectedForTypeOfProof = arr[0];
                    juci.dataset("uploaddocuments", uploadDocuments);
                    //juci.findById("laidproof").disable();
                }
            }
        } else if(typeOfDoc == "FORM60") {
        	if (master[i].Type == proofId) {
                if (master[i].LA_CODE == "FORM60") {
                    arr.push(master[i]);
                    var uploaddocuments = juci.dataset("uploaddocuments");
                    uploadDocuments.optionsSelectedForTypeOfProof = arr[0];
                    juci.dataset("uploaddocuments", uploadDocuments);
                    //juci.findById("laidproof").disable();
                }
            }
        } else {
            if (master[i].Type == proofId) {
                arr.push(master[i]);
            }
        }
    }
    return arr;
}

function getProofMaster(master, proofId) {
    var pushArray = [];
    for (var i = 0; i < master.length; i++) {
        if (master[i].Type == proofId) {
            pushArray.push(master[i]);
        }
    }
    return pushArray;
}

function opencamera(id) {
    $m.capturePic({"width":1000,"height":1000},function(response) {
        if (response.code == 1) {
            // Success
            var imagePath = response.result.path;
            if (id === "addressproof") {
                addAdressproof(imagePath);
            } else if (id === "photoproof") {
                addphotoproof(imagePath);
            } else if (id === "idproof") {
                addidproof(imagePath);
            } else if (id === "incomeproof") {
                addincomeproof(imagePath);
            } else if (id === "ageproof") {
                addageproof(imagePath);
            } else if (id === "declarationproof") {
                adddeclarationproof(imagePath);
            } else if (id === "photoLA") {
                addPhotoLA(imagePath);
            } else if (id === "proposerproof") {
                addPhotoProposer(imagePath);
            }
             if (id === "praddressproof") {
                addPrAdressproof(imagePath);
            }  else if (id === "pridproof") {
                addPridproof(imagePath);
            } else if (id === "princomeproof") {
                addPrincomeproof(imagePath);
            } else if (id === "prageproof") {
                addPrageproof(imagePath);
            } else if (id === "prdeclarationproof") {
                addPrdeclarationproof(imagePath);
            } 
             else if (id === "cheqproof") {
                addchequeproof(imagePath);
            }
             else if (id === "otherproof") {
                addotherdoc(imagePath);
            } else if(id == "typeofdocproof") {
            	addPanandformdocs(imagePath);
            }
        } else {
            // Error
            var errMsg = response.error.message;
        }
    });
}

function opengallery(id) {
    $m.choosePic({"width":1000,"height":1000},function(response) {
        if (response.code == 1) {
            // Success
            var imagePath = response.result.path;
            if (id === "addressproof") {
                addAdressproof(imagePath);
            } else if (id === "photoproof") {
                addphotoproof(imagePath);
            } else if (id === "idproof") {
                addidproof(imagePath);
            } else if (id === "incomeproof") {
                addincomeproof(imagePath);
            } else if (id === "ageproof") {
                addageproof(imagePath);
            } else if (id === "declarationproof") {
                adddeclarationproof(imagePath);
            } else if (id === "photoLA") {
                addPhotoLA(imagePath);
            } else if (id === "proposerproof") {
                addPhotoProposer(imagePath);
            }
             if (id === "praddressproof") {
                addPrAdressproof(imagePath);
            }  else if (id === "pridproof") {
                addPridproof(imagePath);
            } else if (id === "princomeproof") {
                addPrincomeproof(imagePath);
            } else if (id === "prageproof") {
                addPrageproof(imagePath);
            } else if (id === "prdeclarationproof") {
                addPrdeclarationproof(imagePath);
            }
            else if (id === "cheqproof") {
                addchequeproof(imagePath);
            }
             else if (id === "otherproof") {
                addotherdoc(imagePath);
            } else if(id == "typeofdocproof") {
            	addPanandformdocs(imagePath);
            }
        } else {
            // Error
            var errMsg = response.error.message;
        }
    });
}
/*Address Proof */
var AddressArray = [];
function addAdressproof(image) {
    var imgname = "Address Proof";
    var imageData = juci.getControl("laaddproof").value();
    imageData = ko.toJS(imageData);
     for (var i = 0; i < AddressArray.length; i++) {
        if (AddressArray[i]["img"] === image) {
            $m.alert("Same Document can't be added twice");
            return;
        }
	}
    var obj = {
        "img": image,
        "name": imgname,
        "catogory": imageData
    };
    AddressArray.push(obj);
    $m.juci.dataset("adress", AddressArray);
}

var PrAddressArray = [];
function addPrAdressproof(image) {
    var imgname = "Address Proof";
    var imageData = juci.getControl("praddproof").value();
   for (var i = 0; i < PrAddressArray.length; i++) {
        if (PrAddressArray[i]["img"] == image) {
            $m.alert("Same Document can't be added twice");
            return;
        }
    }
    imageData = ko.toJS(imageData);
    var obj = {
        "img": image,
        "name": imgname,
        "catogory": imageData
    };
    PrAddressArray.push(obj);
    $m.juci.dataset("pradress", PrAddressArray);
}

/*Photo Proof */
var PhotoArray = [];
function addphotoproof(image) {
    var imgname = "Photo";
    //	var imageData = juci.getControl("laphotoproof").value();
    //	imageData = ko.toJS(imageData);
     imageData = {
        "Description": "",
        "LA_CODE": "LA",
        "Type": "LA"
    };
    for (var i = 0; i < PhotoArray.length; i++) {
        if (PhotoArray[i]["img"] == image) {
            $m.alert("Same Document can't be added twice");
            return;
        }
    }
    var obj = {
        "img": image,
        "name": imgname,
        "catogory": imageData
    };
    PhotoArray.push(obj);
    $m.juci.dataset("photo", PhotoArray);
}
/*ID Proof */
var IdArray = [];
function addidproof(image) {
    var imgname = "Identity Proof";
    var imageData = juci.getControl("laidproof").value();
    imageData = ko.toJS(imageData);
    for (var i = 0; i < IdArray.length; i++) {
        if (IdArray[i]["img"] === image) {
            $m.alert("Same Document can't be added twice");
            return;
        }
	}
    var obj = {
        "img": image,
        "name": imgname,
        "catogory": imageData
    };
    IdArray.push(obj);
    $m.juci.dataset("idprf", IdArray);
}


var PrIdArray = [];
function addPridproof(image) {
    var imgname = "Identity Proof";
    var imageData = juci.getControl("pridproof").value();
    imageData = ko.toJS(imageData);
    for (var i = 0; i < PrIdArray.length; i++) {
        if (PrIdArray[i]["img"] === image) {
            $m.alert("Same Document can't be added twice");
            return;
        }
	}
    var obj = {
        "img": image,
        "name": imgname,
        "catogory": imageData
    };
    PrIdArray.push(obj);
    $m.juci.dataset("pridprf", PrIdArray);
}

/* Income Proof */
var IncomeArray = [];

function addincomeproof(image) {
    var imgname = "Income Proof";
    var imageData = juci.getControl("laincomeproof").value();
    imageData = ko.toJS(imageData);
    for (var i = 0; i < IncomeArray.length; i++) {
        if (IncomeArray[i]["img"] === image) {
            $m.alert("Same Document can't be added twice");
            return;
        }
	}
    var obj = {
        "img": image,
        "name": imgname,
        "catogory": imageData
    };
    IncomeArray.push(obj);
    $m.juci.dataset("income", IncomeArray);
}

var PrIncomeArray = [];

function addPrincomeproof(image) {
    var imgname = "Income Proof";
    var imageData = juci.getControl("princomeproof").value();
    imageData = ko.toJS(imageData);
    for (var i = 0; i < PrIncomeArray.length; i++) {
        if (PrIncomeArray[i]["img"] === image) {
            $m.alert("Same Document can't be added twice");
            return;
        }
	}
    var obj = {
        "img": image,
        "name": imgname,
        "catogory": imageData
    };
    PrIncomeArray.push(obj);
    $m.juci.dataset("princome", PrIncomeArray);
}


/* Age Proof */
var AgeArray = [];
function addageproof(image) {
    var imgname = "Age Proof";
    var imageData = juci.getControl("laageproof").value();
    imageData = ko.toJS(imageData);
    for (var i = 0; i < AgeArray.length; i++) {
        if (AgeArray[i]["img"] === image) {
            $m.alert("Same Document can't be added twice");
            return;
        }
	}
    var obj = {
        "img": image,
        "name": imgname,
        "catogory": imageData
    };
    AgeArray.push(obj);
    $m.juci.dataset("ageproof", AgeArray);
}

var PrAgeArray = [];
function addPrageproof(image) {
    var imgname = "Age Proof";
    var imageData = juci.getControl("prageproof").value();
    imageData = ko.toJS(imageData);
    for (var i = 0; i < PrAgeArray.length; i++) {
        if (PrAgeArray[i]["img"] === image) {
            $m.alert("Same Document can't be added twice");
            return;
        }
	}
    var obj = {
        "img": image,
        "name": imgname,
        "catogory": imageData
    };
    PrAgeArray.push(obj);
    $m.juci.dataset("prageproof", PrAgeArray);
}

/* Customer Declaration */
var DecArray = [];
function adddeclarationproof(image) {
    var imgname = "Customer Declaration";
    //	var imageData = juci.getControl("ladeclaration").value();
    //imageData = ko.toJS(imageData);
    imageData = {
        "Description": "Customer Declaration",
        "LA_CODE": "CUSTOMER_DECLARATION",
        "Type": "LA"
    }
	for (var i = 0; i < DecArray.length; i++) {
        if (DecArray[i]["img"] === image) {
            $m.alert("Same Document can't be added twice");
            return;
        }
	}
    var obj = {
        "img": image,
        "name": imgname,
        "catogory": imageData
    };
    DecArray.push(obj);
    $m.juci.dataset("customerdeclaration", DecArray);
}

var chequeArray=[];
function addchequeproof(image) {
    var imgname = "Bank Proof";
    //	var imageData = juci.getControl("ladeclaration").value();
    //imageData = ko.toJS(imageData);
    imageData = {
        "Description": "Bank Proof",
        "LA_CODE": "Bank Proof",
        "Type": "LA"
    }
    for (var i = 0; i < chequeArray.length; i++) {
        if (chequeArray[i]["img"] === image) {
            $m.alert("Same Document can't be added twice");
            return;
        }
	}
    var obj = {
        "img": image,
        "name": imgname,
        "catogory": imageData
    };
    chequeArray.push(obj);
    $m.juci.dataset("cheque", chequeArray);
}

var otherArray=[];
function addotherdoc(image) {
    var imgname = "Other Docs";
    //	var imageData = juci.getControl("ladeclaration").value();
    //imageData = ko.toJS(imageData);
    imageData = {
        "Description": "Other Docs",
        "LA_CODE": "Other Docs",
        "Type": "LA"
    }
    
    for (var i = 0; i < otherArray.length; i++) {
        if (otherArray[i]["img"] === image) {
            $m.alert("Same Document can't be added twice");
            return;
        }
	}
    var obj = {
        "img": image,
        "name": imgname,
        "catogory": imageData
    };
    otherArray.push(obj);
    $m.juci.dataset("other", otherArray);
}

// type of document
var addPanandformdoc=[];
function addPanandformdocs(image) {
    var imgname = "DocType";
    //	var imageData = juci.getControl("ladeclaration").value();
    //imageData = ko.toJS(imageData);
    imageData = {
        "Description": "DocType",
        "LA_CODE": "PANCARD",
        "Type": "LA"
    }
    
    for (var i = 0; i < addPanandformdoc.length; i++) {
        if (addPanandformdoc[i]["img"] === image) {
            $m.alert("Same Document can't be added twice");
            return;
        }
	}
    var obj = {
        "img": image,
        "name": imgname,
        "catogory": imageData
    };
    addPanandformdoc.push(obj);
    $m.juci.dataset("typeOfDocuments", addPanandformdoc);
}


//var PrDecArray = [];
//
//function addPrdeclarationproof(image) {
//    var imgname = "Customer Declaration";
//    //	var imageData = juci.getControl("ladeclaration").value();
//    //imageData = ko.toJS(imageData);
//    imageData = {
//        "Description": "Customer Declaration",
//        "LA_CODE": "CUSTOMER_DECLARATION",
//        "Type": "LA"
//    }
//    var obj = {
//        "img": image,
//        "name": imgname,
//        "catogory": imageData
//    };
//    PrDecArray.push(obj);
//    $m.juci.dataset("prcustomerdeclaration", PrDecArray);
//}

/* Photo(LA) */
var LAArray = [];
function addPhotoLA(image) {
    var imgname = "Photo";
    imageData = {
        "Description": "Life Assured",
        "LA_CODE": "LA_PR_PHOTO",
        "Type": "LA"
    }
    for (var i = 0; i < LAArray.length; i++) {
        if (LAArray[i]["img"] == image) {
            $m.alert("Same Document can't be added twice");
            return;
        }
	}
    var obj = {
        "img": image,
        "name": imgname,
        "catogory": imageData
    };
    LAArray.push(obj);
    $m.juci.dataset("applicantphoto", LAArray);
}
/* Photo(Proposer) */
var proposerArray = [];
function addPhotoProposer(image) {
    var imgname = "Photo";
    imageData = {
        "Description": "Proposer",
        "LA_CODE": "LA_PR_PHOTO",
        "Type": "PR"
    }
   for (var i = 0; i < proposerArray.length; i++) {
        if (proposerArray[i]["img"] == image) {
            $m.alert("Same Document can't be added twice");
            return;
        }
	}
    var obj = {
        "img": image,
        "name": imgname,
        "catogory": imageData
    };
    proposerArray.push(obj);
    $m.juci.dataset("proposerphoto", proposerArray);
}

function saveDocuments(e) {
    $m.showProgress("Saving Documents...");
    var data = e.data;
    var proofName, proofTitle = "";
    var dbArray = [];
    var imageObj = {
	  "Application_Number": "NA",
	  "LA_AddressProof": "NA",
	  "LA_AgeProof": "NA",
	  "LA_BANKACCPROOF": "NA",
	  "LA_IdentityProof": "NA",
	  "LA_IncomeProof": "NA",
	  "NOM_AddressProof": "NA",
	  "NOM_AddressProof_1": "NA",
	  "NOM_AddressProof_2": "NA",
	  "NOM_AddressProof_3": "NA",
	  "NOM_IdentityProof": "NA",
	  "NOM_IdentityProof_1": "NA",
	  "NOM_IdentityProof_2": "NA",
	  "NOM_IdentityProof_3": "NA",
	  "PR_AddressProof": "NA",
	  "PR_AgeProof": "NA",
	  "PR_BANKACCPROOF": "NA",
	  "PR_IdentityProof": "NA",
	  "PR_IncomeProof": "NA",
	  "ChequeProof": "NA",
	  "Other": "NA",
	  "ChequeProof":"NA"
	};
	var personalDetails = $m.juci.dataset('personalForm');
	imageObj.appno = personalDetails.Application_Number;
    var proof = {
        "addressproof": juci.dataset("adress"),
        "uploadidproof": juci.dataset("idprf"),
        "incomeproof": juci.dataset("income"),
        "ageproof": juci.dataset("ageproof"),
        "custdeclaration": juci.dataset("customerdeclaration"),
         "laphoto": getLA(juci.dataset("applicantphoto")),
        "proposerphoto": getPR(juci.dataset("proposerphoto")),
         "praddressproof": juci.dataset("pradress"),
        "pruploadidproof": juci.dataset("pridprf"),
        "princomeproof": juci.dataset("princome"),
        "prageproof": juci.dataset("prageproof"),
        "chequeproof": juci.dataset("cheque"),
        "otherproof": juci.dataset("other"),
        "typeofdocument":juci.dataset("typeOfDocuments")
    };
    //var hasIncome = $m.juci.dataset("hasIncome");
    var hascheque =  $m.juci.dataset("hascheque");
    var hasInstall_Pre = $m.juci.dataset("hasinstalPremium");
    var hasNoAadhar = $m.juci.dataset("hasNoAadhar");
    if (proof.addressproof.length == "0" && hasNoAadhar) {
        $m.alert("Please select Address Proof Image");
        $m.hideProgress();
        return;
    }else{
    	if(proof.addressproof.length){
    		imageObj.LA_AddressProof = proof.addressproof[0].catogory.LA_CODE;
    	}
    }
    if (proof.uploadidproof.length == "0"  && hasNoAadhar ) {
        $m.alert("Please select Upload ID Proof Image");
        $m.hideProgress();
        return;
    }else{
    	if(proof.uploadidproof.length){
    		imageObj.LA_IdentityProof = proof.uploadidproof[0].catogory.LA_CODE;
    	}
    }
    if (proof.incomeproof.length == "0" && hasInstall_Pre) {
        $m.alert("Please select Income Proof Image");
        $m.hideProgress();
        return;
    }else{
    	if(proof.incomeproof.length){
    		imageObj.LA_IncomeProof = proof.incomeproof[0].catogory.LA_CODE;
    	}
    }
    if (proof.ageproof.length == "0" && hasNoAadhar) {
        $m.alert("Please select Age Proof Image");
        $m.hideProgress();
        return;
    }else{
    	if(proof.ageproof.length){
    		imageObj.LA_AgeProof = proof.ageproof[0].catogory.LA_CODE;
    	}
    }
    if (proof.custdeclaration.length == "0") {
        $m.alert("Please select Customer declaration Proof Image");
        $m.hideProgress();
        return;
    }
    if (proof.laphoto.length == "0") {
        $m.alert("Please select LA Photo Proof Image");
        $m.hideProgress();
        return;
    }
   var insPremium =  $m.juci.dataset("instPremium");
    if(proof.typeofdocument.length == "0" && parseInt(insPremium) > 50000){
    	$m.alert("Please select Type of document Image");
        $m.hideProgress();
        return;
    }
    /*proposer*/
    var hasProposer = $m.juci.dataset("hasProposer");
    var praadhar = $m.getPref(AdharPref.PR_adharphoto + applicationNumber);
    if (proof.proposerphoto.length == "0" && !praadhar && hasProposer) {
        $m.alert("Please select Proposer Photo Proof Image");
        $m.hideProgress();
        return;
    }
//    else{
//    	if(proof.proposerphoto.length){
//    		imageObj.PR_IdentityProof = proof.proposerphoto[0].catogory.LA_CODE;	
//    	}
//    }
     if (proof.praddressproof.length == "0" && !praadhar && hasProposer) {
        $m.alert("Please select Address Proof Image");
        $m.hideProgress();
        return;
    }else{
    	if(proof.praddressproof.length){
    		imageObj.PR_AddressProof = proof.praddressproof[0].catogory.LA_CODE;
    	}
    }
    if (proof.pruploadidproof.length == "0" && !praadhar && hasProposer) {
        $m.alert("Please select Upload ID Proof Image");
        $m.hideProgress();
        return;
    }else{
    	if(proof.pruploadidproof.length){
    		imageObj.PR_IdentityProof = proof.pruploadidproof[0].catogory.LA_CODE;
    	}
    }
    if (proof.princomeproof.length == "0" && hasProposer && hasInstall_Pre) {
        $m.alert("Please select Income Proof Image");
        $m.hideProgress();
        return;
    }else{
    	if(proof.princomeproof.length){
    		imageObj.PR_IncomeProof = proof.princomeproof[0].catogory.LA_CODE;
    	}
    }
    if (proof.prageproof.length == "0" &&!praadhar && hasProposer) {
        $m.alert("Please select Age Proof Image");
        $m.hideProgress();
        return;
    }else{
    	if(proof.prageproof.length){
    		imageObj.PR_AgeProof = proof.prageproof[0].catogory.LA_CODE;
    	}
    }
    if (proof.chequeproof.length == "0" && hascheque) {
        $m.alert("Please select Bank Proof Image");
        $m.hideProgress();
        return;
    }else{
    	if(proof.chequeproof.length){
    		imageObj.ChequeProof = proof.chequeproof[0].catogory.LA_CODE;
    	}
    }
    var imagePDCDetails = $m.getPref("imagePDCDetails");
    if(!imagePDCDetails){
    	imagePDCDetails = [];
    }
    imagePDCDetails.push(imageObj);
    for (var key in proof) {
        for (var i = 0; i < proof[key].length; i++) {
            var proofObj = {};
            proofObj.Row_No = (i + 1);
            proofObj.Txn_Id = Math.floor(100000 + Math.random() * 900000);
            proofObj.AadharImage="";
            if(key =='laphoto'){
            	if($m.getPref(AdharPref.LA_adharphoto + applicationNumber)){
            	   proofObj.AadharImage = $m.getPref(AdharPref.LA_adharphoto + applicationNumber);
            	}
            }
            if(key =='proposerphoto'){
	            if($m.getPref(AdharPref.PR_adharphoto + applicationNumber)){
	            	proofObj.AadharImage = $m.getPref(AdharPref.PR_adharphoto + applicationNumber);
	            }
            }
            proofObj.Application_Number = personalDetails.Application_Number;
            proofObj.UploadDate = getDateFormatted(new Date().getTime());
            proofObj.Status = "1";
            proofObj.issync = "0";
            proofObj.iscompleted = "1";
            proofObj.DocumentTypeCode = "NA";
           // proofObj.AdharImage="";
            if (proof[key][i].catogory) {
                proofObj.DocumentTypeCode = proof[key][i].catogory.LA_CODE;
            }
            proofObj.ImageName = proof[key][i].name;
            proofObj.ImagePath = proof[key][i].img;
            if(key == "proposerphoto"||key =="praddressproof"||key =="pruploadidproof" ||key =="princomeproof"||key =="prageproof"||key =="prcustdeclaration"){
            	proofObj.Extended_Attributes = "PR";
            }else{
            	proofObj.Extended_Attributes = "LA";
            }
            dbArray.push(new PDC_Image_Details(proofObj));
        }
    }
    $m.putPref("imagePDCDetails", imagePDCDetails);
    new window.DB(CONSTANTS.DBName, function(dbHelper) {
        window.dbHelper = dbHelper;
        var filter = new window.DB.Filter.equal("Application_Number", "'" + applicationNumber + "'");
        PDC_Image_Details.multipleInsert(dbArray, function() {
        	PDC_LifeStyle_Details.updateIsCompleted({
                'iscompleted': '1'
            }, filter, function(success_response) {
                PDC_Plan_Details.updateIsCompleted({
                    'iscompleted': '1'
                }, filter, function(success_response) {
                    PDC_Customer_Details.updateIsCompleted({
                        'iscompleted': '1'
                    }, filter, function(success_response) {
                        PDC_EXISITINGPOLICIES_Details.updateIsCompleted({
                            'iscompleted': '1'
                        }, filter, function(success_response) {
                            PDC_FAMILYHISTORY_Details.updateIsCompleted({
                                'iscompleted': '1'
                            }, filter, function(success_response) {
                            	PDC_Payment_Details.updateIsCompleted({
                            	 	'iscompleted': '1'
                            	}, filter, function(success_response) {
                            		},function(res) {
		                                $m.logError("Failed to update paymentdetails iscompleted--- " + JSON.stringify(res));
		                                $m.alert("Error while updating database");
		                            });
                            }, function(res) {
                                $m.logError("Failed to update family details iscompleted--- " + JSON.stringify(res));
                                $m.alert("Error while updating database");
                            });
                        }, function(res) {
                            $m.logError("Failed to update policies iscompleted--- " + JSON.stringify(res));
                            $m.alert("Error while updating database");
                        });
                    }, function(res) {
                        $m.logError("Failed to update customer details iscompleted--- " + JSON.stringify(res));
                        $m.alert("Error while updating database");
                    });
                }, function(res) {
                    $m.logError("Failed to update plan details iscompleted--- " + JSON.stringify(res));
                    $m.alert("Error while updating database");
                });
            }, function(res) {
                $m.logError("Failed to update lifestyle details iscompleted--- " + JSON.stringify(res));
                $m.alert("Error while updating database");
            });
            //$m.logInfo("Image details inserted successfully");
            	$m.removePref("LA_aadharselect"+ applicationNumber);
                $m.removePref("PR_aadharselect"+ applicationNumber);
            PDC_Customer_Details.SelectWithFilter(dbArray[0].Application_Number, function(success_response) {
                var resultObject = success_response.rows[0];
                
               resultObject.DOCS_UPLOADED = "N";
                var PDC_Customer_Details_object = new PDC_Customer_Details(resultObject);
                PDC_Customer_Details_object.update(function(success) {
                   // $m.hideProgress();
                }, function() {
                    $m.logError("Failed to update docs uploaded--- " + JSON.stringify(error));
                });
            }, function(failure_response) {
                $m.logError("Read failed -- " + JSON.stringify(failure_response));
                $m.alert("Error while fetching from database");
            });
            $m.hideProgress();
            if(utils.GetPref("fromProucts_"+applicationNumber)){
            	$m.alert("The required documents have been submitted successfully","Alert",documentsSubmitCallback)
            } else {
            	$m.confirm({
					"title": "Alert",
					"message": "The required documents have been submitted .If you want to record a personliazed video message for your loved ones click ok",
			        "buttons": [
			           {"label": "Yes"},
			           {"label": "No"}
			       ]
			       }, documentsubmitcallback
				);	
            }
        }, function(res) {
            $m.logError("Failed to insert image details--- " + JSON.stringify(res));
            $m.alert("Error while inserting to database");
            $m.hideProgress();
        });
    });
}

var documentsSubmitCallback = function(){
	//$m.open("com.cloudpact.mowbly.home", "/system/home.html", null);
	$m.open("Sync","/Applications/sync.html","autosync");
}

var documentsubmitcallback = function(response){
	if(response == 0){
		$m.open("customerVideo", "/Applications/customerVideo.html")	
	} else {
		hideDocument();
		var alertCallback = function(){
			utils.ClosePage();
			$m.open("Sync","/Applications/sync.html","autosync");
		};
	 	$m.alert("Your proposal form with the following Application Number - "+applicationNumber+" has been saved successfully","Alert",alertCallback);	
	}
}

function convert_case(key) {
    var str = "";
    if (key.match("optionselectedfor"))
        str = key.substring(17, key.indexOf("proof")) + " " + key.substring(key.indexOf("proof"), key.length);
    else
        str = key.substring(14, key.indexOf("proof")) + " " + key.substring(key.indexOf("proof"), key.length);
    var lower = str.toLowerCase();
    return lower.replace(/(^| )(\w)/g, function(x) {
        return x.toUpperCase();
    });
}

function getDoctype(doc) {
    if (doc) {
        return doc.Description();
    }
    return "";
}

function getDateFormatted(dateinput) {
    var date = new Date(dateinput);
    var dateString, month = "",
        dt = "";
    if (date.getMonth() < 9)
        month = '0' + (date.getMonth() + 1);
    else
        month = date.getMonth() + 1;
    if (date.getDate() <= 9)
        dt = '0' + (date.getDate());
    else
        dt = date.getDate();
    dateString = date.getFullYear() + "-" + month + '-' + dt;
    return dateString;
}

function PhotoId_Delete(event) {
    event.preventDefault();
    $m.confirm({
        "title": "Confirm",
        "message": "Are you sure you want to delete?",
        "buttons": [{
            "label": "Yes"
        }, {
            "label": "No"
        }]
    }, function(index) {
        // Code to execute when the confirm dialog dismisses
        if (index == 0) {
            // Yes
            event.control.removeItemAt(event.index);
            PhotoArray.splice(event.index, 1);
        } else if (index == 1) {
            // No
        }
    });
}

function addresslist_Delete(event) {
    event.preventDefault();
    $m.confirm({
        "title": "Confirm",
        "message": "Are you sure you want to delete?",
        "buttons": [{
            "label": "Yes"
        }, {
            "label": "No"
        }]
    }, function(index) {
        // Code to execute when the confirm dialog dismisses
        if (index == 0) {
            // Yes
            event.control.removeItemAt(event.index);
            AddressArray.splice(event.index, 1);
        } else if (index == 1) {
            // No
        }
    });
}

function uploadId_delete(event) {
    event.preventDefault();
    $m.confirm({
        "title": "Confirm",
        "message": "Are you sure you want to delete?",
        "buttons": [{
            "label": "Yes"
        }, {
            "label": "No"
        }]
    }, function(index) {
        // Code to execute when the confirm dialog dismisses
        if (index == 0) {
            // Yes
            event.control.removeItemAt(event.index);
            IdArray.splice(event.index, 1);
        } else if (index == 1) {
            // No
        }
    });
}

function declaration_delete(event) {
    event.preventDefault();
    $m.confirm({
        "title": "Confirm",
        "message": "Are you sure you want to delete?",
        "buttons": [{
            "label": "Yes"
        }, {
            "label": "No"
        }]
    }, function(index) {
        // Code to execute when the confirm dialog dismisses
        if (index == 0) {
            // Yes
            event.control.removeItemAt(event.index);
            DecArray.splice(event.index, 1);
        } else if (index == 1) {
            // No
        }
    });
}

function laPhoto_delete(event) {
    event.preventDefault();
    $m.confirm({
        "title": "Confirm",
        "message": "Are you sure you want to delete?",
        "buttons": [{
            "label": "Yes"
        }, {
            "label": "No"
        }]
    }, function(index) {
        // Code to execute when the confirm dialog dismisses
        if (index == 0) {
            // Yes
            event.control.removeItemAt(event.index);
            LAArray.splice(event.index, 1);
        } else if (index == 1) {
            // No
        }
    });
}

function proposerPhoto_delete(event) {
    event.preventDefault();
    $m.confirm({
        "title": "Confirm",
        "message": "Are you sure you want to delete?",
        "buttons": [{
            "label": "Yes"
        }, {
            "label": "No"
        }]
    }, function(index) {
        // Code to execute when the confirm dialog dismisses
        if (index == 0) {
            // Yes
            event.control.removeItemAt(event.index);
            proposerArray.splice(event.index, 1);
        } else if (index == 1) {
            // No
        }
    });
}

function ageproof_delete(event) {
    event.preventDefault();
    $m.confirm({
        "title": "Confirm",
        "message": "Are you sure you want to delete?",
        "buttons": [{
            "label": "Yes"
        }, {
            "label": "No"
        }]
    }, function(index) {
        // Code to execute when the confirm dialog dismisses
        if (index == 0) {
            // Yes
            event.control.removeItemAt(event.index);
            AgeArray.splice(event.index, 1);
        } else if (index == 1) {
            // No
        }
    });
}

function income_delete(event) {
    event.preventDefault();
    $m.confirm({
        "title": "Confirm",
        "message": "Are you sure you want to delete?",
        "buttons": [{
            "label": "Yes"
        }, {
            "label": "No"
        }]
    }, function(index) {
        // Code to execute when the confirm dialog dismisses
        if (index == 0) {
            // Yes
            event.control.removeItemAt(event.index);
            IncomeArray.splice(event.index, 1);
        } else if (index == 1) {
            // No
        }
    });
}

function prageproof_delete(event) {
    event.preventDefault();
    $m.confirm({
        "title": "Confirm",
        "message": "Are you sure you want to delete?",
        "buttons": [{
            "label": "Yes"
        }, {
            "label": "No"
        }]
    }, function(index) {
        // Code to execute when the confirm dialog dismisses
        if (index == 0) {
            // Yes
            event.control.removeItemAt(event.index);
            PrAgeArray.splice(event.index, 1);
        } else if (index == 1) {
            // No
        }
    });
}

function princome_delete(event) {
    event.preventDefault();
    $m.confirm({
        "title": "Confirm",
        "message": "Are you sure you want to delete?",
        "buttons": [{
            "label": "Yes"
        }, {
            "label": "No"
        }]
    }, function(index) {
        // Code to execute when the confirm dialog dismisses
        if (index == 0) {
            // Yes
            event.control.removeItemAt(event.index);
            PrIncomeArray.splice(event.index, 1);
        } else if (index == 1) {
            // No
        }
    });
}

function praddresslist_Delete(event) {
    event.preventDefault();
    $m.confirm({
        "title": "Confirm",
        "message": "Are you sure you want to delete?",
        "buttons": [{
            "label": "Yes"
        }, {
            "label": "No"
        }]
    }, function(index) {
        // Code to execute when the confirm dialog dismisses
        if (index == 0) {
            // Yes
            event.control.removeItemAt(event.index);
            PrAddressArray.splice(event.index, 1);
        } else if (index == 1) {
            // No
        }
    });
}

function pruploadId_delete(event) {
    event.preventDefault();
    $m.confirm({
        "title": "Confirm",
        "message": "Are you sure you want to delete?",
        "buttons": [{
            "label": "Yes"
        }, {
            "label": "No"
        }]
    }, function(index) {
        // Code to execute when the confirm dialog dismisses
        if (index == 0) {
            // Yes
            event.control.removeItemAt(event.index);
            PrIdArray.splice(event.index, 1);
        } else if (index == 1) {
            // No
        }
    });
}

function prdeclaration_delete(event) {
    event.preventDefault();
    $m.confirm({
        "title": "Confirm",
        "message": "Are you sure you want to delete?",
        "buttons": [{
            "label": "Yes"
        }, {
            "label": "No"
        }]
    }, function(index) {
        // Code to execute when the confirm dialog dismisses
        if (index == 0) {
            // Yes
            event.control.removeItemAt(event.index);
            DecArray.splice(event.index, 1);
        } else if (index == 1) {
            // No
        }
    });
}

function cheque_delete(event) {
    event.preventDefault();
    $m.confirm({
        "title": "Confirm",
        "message": "Are you sure you want to delete?",
        "buttons": [{
            "label": "Yes"
        }, {
            "label": "No"
        }]
    }, function(index) {
        // Code to execute when the confirm dialog dismisses
        if (index == 0) {
            // Yes
            event.control.removeItemAt(event.index);
            chequeArray.splice(event.index, 1);
        } else if (index == 1) {
            // No
        }
    });
}
function other_delete(event) {
    event.preventDefault();
    $m.confirm({
        "title": "Confirm",
        "message": "Are you sure you want to delete?",
        "buttons": [{
            "label": "Yes"
        }, {
            "label": "No"
        }]
    }, function(index) {
        if (index == 0) {
            // Yes
            event.control.removeItemAt(event.index);
            otherArray.splice(event.index, 1);
        } else if (index == 1) {
            // No
        }
    });
}

function typeOfDocement_delete(event) {
    event.preventDefault();
    $m.confirm({
        "title": "Confirm",
        "message": "Are you sure you want to delete?",
        "buttons": [{
            "label": "Yes"
        }, {
            "label": "No"
        }]
    }, function(index) {
        if (index == 0) {
            // Yes
            event.control.removeItemAt(event.index);
            otherArray.splice(event.index, 1);
        } else if (index == 1) {
            // No
        }
    });
}

function getLA(dataset){
	var arr=[];
	var obj;
	var image;
	var imgname = "Photo";
    imageData = {
        "Description": "Life Assured",
        "LA_CODE": "LA_PR_PHOTO",
        "Type": "LA"
    }
	if($m.getPref(AdharPref.LA_adharphoto + applicationNumber)){
		image ="";
		obj = {
	        "img": image,
	        "name": imgname,
	        "catogory": imageData
    	};
		arr.push(obj);
        return arr;
	}
	else{
	   return dataset;
	}	
}

function getPR(dataset){
	var arr=[];
	var obj;
	var image;
	var imgname = "Photo";
    imageData = {
        "Description": "Proposer",
        "LA_CODE": "LA_PR_PHOTO",
        "Type": "PR"
    }
	if($m.getPref(AdharPref.PR_adharphoto + applicationNumber))	{
		image = "";
		obj = {
	        "img": image,
	        "name": imgname,
	        "catogory": imageData
    	};
		arr.push(obj);
        return arr;
	}
	else{
   		return dataset;
	}		
}

function getIncomeValidate(value) {
    if (value() != "") {
        if (value().Description() == "Aadhar Card-not provisionl(LR)") {
            var clearValid = juci.getControl("laidproof");
            clearValid.clearValidation();
            return true;
        } else {
            return false;
        }
    }
}

	
function getvalid(val){
	if (val == true) {
	     var hasInstall_Pre = $m.juci.dataset("hasinstalPremium");
		 if (hasInstall_Pre) {
		  	return true;
		 } else {
		  	return false;
		 }
	} else {
		 return val;
		}
	}
	
function getinc(val){
	if(val == true){
		return true;
	}
	else{
		return true;
	}
	
}