/**
 * PrePaymentPreview.js
 * @author CloudPact Technologies
 * @description : This script is used showing PrePaymentPreview.
 **/

//var customproperties = JSON.parse(JSON.parse($m.getUserAccount()).customProperties);

$m.juci.addDataset("lifeassuredetails",{"LA_Name": "","LA_DOB":"","LA_Gender":"","LA_EMPLOYEECODE":"","LA_Mobileno":"","LA_EmailId":""});
$m.juci.addDataset("proposerdetails",{"PR_Name": "","PR_DOB":"","PR_Gender":"","PR_EMPLOYEECODE":"","PR_Mobileno":"","PR_EmailId":""});
$m.juci.addDataset("appointeeOrNomineedetails",{"NOM_Name": "","NOM_DOB":"","NOM_Gender":"","LA_EMPLOYEECODE":"","NOM_Mobileno":"","NOM_EmailId":""});
$m.juci.addDataset("plandetails",{"ProductCode":"","PLanCode":"","PolicyTerm":"","PremiumPayingTerm":"","SumAssured":"","PlanName":""});
$m.juci.addDataset("premiumdetails",{"PremiumPayingTerm":"","InstallmentPremium_ST":"","AP":"","ECS_NonECS":""});
$m.juci.addDataset("otherdetails",{"Advisor_Name":"","Advisor_Code":""});

// Functionality for showing pre payment preview
function showDetails(){
	var data = $m.juci.dataset("personalForm");
	data.LA_EMPLOYEECODE = data.LA_EMPLOYEECODE =="" ? '-':	data.LA_EMPLOYEECODE;
	data.PR_EMPLOYEECODE = data.PR_EMPLOYEECODE =="" ? '-':	data.PR_EMPLOYEECODE;
	data.PR_Name = data.PR_Name =="" ? '-':	data.PR_Name;
//	data.PR_DOB = data.PR_DOB =="" ? '-':	data.PR_DOB;


	data.PR_Mobileno = data.PR_Mobileno == "" ? '-':data.PR_Mobileno;
	data.PR_Gender = data.PR_Gender == "" ? '-':	data.PR_Gender;
	data.PR_EmailId = data.PR_EmailId == "" ? '-':	data.PR_EmailId;
    if(data.PR_Name =='-'){
	data.PR_Gender='-';
}
	
	var nomineedata = $m.juci.dataset("nomineeOrAppointeeDetailsForm");
		nomineedata.NOM_Mobileno = nomineedata.NOM_Mobileno =="" ? '-':	nomineedata.NOM_Mobileno;
		nomineedata.NOM_EmailId = nomineedata.NOM_EmailId =="" ? '-':	nomineedata.NOM_EmailId;
		nomineedata.NOM_Name = nomineedata.NOM_Name =="" ? '-':	nomineedata.NOM_Name;
		nomineedata.NOM_DOB = nomineedata.NOM_DOB =="" ? '-':	nomineedata.NOM_DOB;
		
	
	$m.juci.dataset("lifeassuredetails",data);
	$m.putPref("selfieData",data);
	$m.savePref();
	$m.juci.dataset("proposerdetails",data);
	$m.juci.dataset("appointeeOrNomineedetails",nomineedata);
	var plandetails = $m.getPref("planDetails_" + applicationNumber);
	plandetails["PlanName"] = getPlanname(plandetails["PLanCode"]);
	
	plandetails.PolicyTerm = plandetails.PolicyTerm == undefined||""? 'NA':plandetails.PolicyTerm;
	plandetails.PlanName = plandetails.PlanName =="undefined"||"" ? '-':	plandetails.PlanName;
	plandetails.PremiumPayingTerm = plandetails.PremiumPayingTerm == undefined||"" ? 'NA':	plandetails.PremiumPayingTerm;
	plandetails.SumAssured = plandetails.SumAssured ==undefined||""? 'NA':	plandetails.SumAssured;
	plandetails.AP = plandetails.Base_Annualised_Premium == undefined || "" ? 'NA':	plandetails.Base_Annualised_Premium;
	plandetails.ECS_NonECS = plandetails.ECS_NonECS == undefined ||"" ? 'NA':plandetails.ECS_NonECS;
	//plandetails.Premium_FrequencyProductCode = plandetails.ProductCode =="" ? '-':	plandetails.ProductCode;
	
	$m.juci.dataset("plandetails",plandetails);
	utils.PutPref("plandetails",plandetails);
	$m.juci.dataset("premiumdetails",plandetails);
	var company_employee = $m.getPref("companydetails_"+applicationNumber);
	if(company_employee == "Yes"){
		$m.juci.dataset("otherdetails",{"Advisor_Name":"RELIANCE LIFE INSURANCE (STAFF)","Advisor_Code":"29999999"});
	}else{
		$m.juci.dataset("otherdetails",{"Advisor_Name":plandetails.Advisor_Name,"Advisor_Code":plandetails.Advisor_Code});
	}
	var personalDetails = $m.juci.dataset("personalForm");
    $m.juci.dataset("hasProposer", false);
    if(personalDetails.IS_LA_PR_SAME === "N"){
    	$m.juci.dataset("hasProposer", true);
    }
    if(utils.GetPref("fromProucts_"+applicationNumber)){
		$m.juci.dataset("isProducts",true);
		$m.juci.dataset("isNotProducts",false);
	} else {
		$m.juci.dataset("isProducts",false);
		$m.juci.dataset("isNotProducts",true);
	}
}

function editLifeAssure(){
	//TODO edit option	
}


function openSelfieVideoPage(){
	var yesCallback = function(r) {
		$m.open("selfiePIVC", "/Applications/selfieVideo.html");
	};
	
	var noCallback = function(r) {
		var appno = utils.GetPref("plandetails");
		var appfilter = new DB.Filter.equal("Application_Number", "'" + appno.Application_Number + "'");
		var data = {
			"PIVC_Video_YN" : "N"
		};
		PDC_Customer_Details.updateSync(data, appfilter, function(){
			utils.HideProgress();
			$m.setResult("payment");	
			utils.PutPref("payment",true);
			$m.close();
		});
		
		navigateTo("payment");
		utils.GetControl("toogle").toggle(3);
		showPaymentDetails();
	};
	
	utils.ConfirmBox("Would you like to proceed ahead with Selfie PIVC screen ?",yesCallback,noCallback);
}

function openPaymentPage(){
	navigateTo("payment");
	utils.GetControl("toogle").toggle(3);
	showPaymentDetails();
}

$m.onResult(function(eventObject){
	var result = eventObject.result;
	if(result){
		navigateTo("payment");
		utils.GetControl("toogle").toggle(3);
		showPaymentDetails();	
	}
});

/* Protect*/
$m.juci.dataset("protect", [

    {
        "title": "Reliance Nippon Life Term Plan",
        "content": "For tailor-made, comprehensive and affordable coverage that will help you secure your financial future and the future of your family, invest in Reliance Term Plan.",
        "productCode": 107,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/4860_Term Plan Brochure.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
    //    {
    //        "title": "Reliance Future Income Plan Premium to Sum Assured",
    //        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
    //              "broucher" : [{
    //		    "Title": "Product Broucher",
    //		    "url" : "http://www.reliancenipponlife.com/product_images/plans/0150_Reliance Future Income.pdf"
    //		}, {
    //		    "Title": "Product Leafletss",
    //		      "url" : ""
    //		}, {
    //		    "Title": "FAB sheets ",
    //		      "url" : ""
    //		}, {
    //		    "Title": "Product Working PPT",
    //		      "url" : ""
    //		}]
    //    },


    {
        "title": "Reliance Nippon Life Online Term",
        "content": "Reliance Online Term is an online life insurance plan that offers you a large life insurance cover at affordable premiums in just a few clicks. It is easy to buy and even your medical tests can happen at the comfort of your own home.",
        "productCode": "",
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    }, {
        "title": "Reliance Nippon Life Online Income Protect",
        "content": "You have worked hard to create a lifestyle for your family, ensuring that they get the best in life. They depend on you to meet their daily needs and to take care of repayment of all liabilities i.e. EMIs, school fee, household expenses, etc. But the key question is who will take care of your family's needs in case you are not around?",
        "productCode": "",
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
    //    {
    //        "title": "Reliance Increasing Income Insurance Plan Premium to Sum Assured",
    //        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
    //              "broucher" : [{
    //		    "Title": "Product Broucher",
    //		    "url" : "http://www.reliancenipponlife.com/product_images/plans/5984_Reliance Increasing Income Insurance Plan Brochure.pdf"
    //		}, {
    //		    "Title": "Product Leafletss",
    //		      "url" : ""
    //		}, {
    //		    "Title": "FAB sheets ",
    //		      "url" : ""
    //		}, {
    //		    "Title": "Product Working PPT",
    //		      "url" : ""
    //		}]
    //    },




    {
        "title": "Reliance Nippon Life Classic Plan II",
        "content": "After decades of working hard to take care of your responsibilities, you deserve to put your feet up and enjoy your golden years - pursue your hobbies that you never had time for, make up for lost holidays, share memories with family or take pride in remaining independent. Reliance Pension Builder helps you to save regularly to build your nest-egg for retirement that you can look forward to.",
        "productCode": 109,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/1409_Reliance_Classic_Plan_II.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
    
    	{
        "title": "Reliance Nippon Life Bal Bivesh - One Time",
        "content": "",
        "productCode": 166,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "",
            "P_Title": "0429_Super Endowment Plan"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }]
//{
//            "Title": "FAB sheets ",
//            "url": ""
//        }, {
//            "Title": "Product Working PPT",
//            "url": ""
//        }]
    

    },
	
    
    {
        "title": "Reliance Nippon Life Classic Plan II New",
        "content": "After decades of working hard to take care of your responsibilities, you deserve to put your feet up and enjoy your golden years - pursue your hobbies that you never had time for, make up for lost holidays, share memories with family or take pride in remaining independent. Reliance Pension Builder helps you to save regularly to build your nest-egg for retirement that you can look forward to.",
        "productCode": 165,
        "broucher": [{
            "Title": "Product Brochure",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }]
//{
//            "Title": "FAB sheets ",
//            "url": ""
//        }, {
//            "Title": "Product Working PPT",
//            "url": ""
//        }]
    
    },

   {
        "title": "Reliance Nippon Life Classic Plan II",
        "content": "After decades of working hard to take care of your responsibilities, you deserve to put your feet up and enjoy your golden years - pursue your hobbies that you never had time for, make up for lost holidays, share memories with family or take pride in remaining independent. Reliance Pension Builder helps you to save regularly to build your nest-egg for retirement that you can look forward to.",
        "productCode": 110,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/1409_Reliance_Classic_Plan_II.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    }
    
]);

/* Saving*/
$m.juci.dataset("saving", [{
        "title": "Reliance Nippon Life Fixed Savings",
        "content": "Reliance Fixed Savings helps you to create a corpus for unforeseen expenses, by allowing you to systematically save over a period of time. This plan offers guaranteed benefits, including fixed additions that accrue every year and an additional lump sum at maturity, along with a life cover to protect your family.",
        "productCode": 132,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/9278_Fixed Savings Plan.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life Future Income Plan",
        "content": "We live in an age of growth: growing income, demands and expectations for yourself and your family. Don't let your savings stay dormant. Let it work for you to give an additional income.",
        "productCode": 153,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/0150_Reliance Future Income.pdf "
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
    
       {
        "title": "Reliance Nippon Life Future Income Plan",
        "content": "We live in an age of growth: growing income, demands and expectations for yourself and your family. Don't let your savings stay dormant. Let it work for you to give an additional income.",
        "productCode": 154,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/0150_Reliance Future Income.pdf "
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life Increasing Income Insurance Plan",
        "content": "With time you would aspire for a bigger house, an expensive car, admission in the best school and a good higher education for your children. Your savings need to power these dreams of tomorrow.",
        "productCode": 137,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

 {
        "title": "Reliance Nippon Life Increasing Income Insurance Plan",
        "content": "With time you would aspire for a bigger house, an expensive car, admission in the best school and a good higher education for your children. Your savings need to power these dreams of tomorrow.",
        "productCode": 138,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
    {
            "title": "Reliance Nippon Life Smart Savings Insurance Plan",
            "content": "A Plan that automatically changes your investment profile with changing life-stage",
            "productCode": 163,
                  "broucher" : [{
    		    "Title": "Product Broucher",
    		    "url" : ""
    		}, {
    		    "Title": "Product Leafletss",
    		      "url" : ""
    		}, {
    		    "Title": "FAB sheets ",
    		      "url" : ""
    		}, {
    		    "Title": "Product Working PPT",
    		      "url" : ""
    		}]
        },
    {
        "title": "Reliance Nippon Life Whole Life Income Plan",
        "content": "In life, we generally have two main financial needs - how to live a comfortable life and how to take care of our loved ones in case of any unfortunate event. This is a plan which would take care of your regular income needs to lead a comfortable life and would also help you leave behind a legacy for your next generations. In other words, you live through the benefits and also leave enough for the next generation.",
        "productCode": 155,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/1538_Reliance Whole Life Income.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },


    {
        "title": "Reliance Nippon Life Lifelong Savings Plan",
        "content": "We all work towards financial milestones like buying a house, securing our children's education, going on a dream vacation and living comfortably after retirement. These are critical milestones, achievable with a sound financial plan.",
        "productCode": 149,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/4488_Reliance Lifelong Savings.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

  {
        "title": "Reliance Nippon Life Lifelong Savings Plan",
        "content": "We all work towards financial milestones like buying a house, securing our children's education, going on a dream vacation and living comfortably after retirement. These are critical milestones, achievable with a sound financial plan.",
        "productCode": 152,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/4488_Reliance Lifelong Savings.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
    {
        "title": "Reliance Nippon Life Guaranteed Money Back Plan Sum Assured to Premium",
        "content": "Get an in-built Accidental Death Benefit as well as the Waiver Of Premium benefit to help your family continue to fulfill their goals even in the case of your untimely demise. This non-participating, non-linked money back plan helps you save for the long-term with liquidity at various stages in life.",
        "productCode": 108,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/6136_web_3 Reliance_Gauranteed Money Back Plan_Brochure_03-12-13.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    }, 
    
     {
        "title": "Reliance Nippon Life Guaranteed Money Back Plan Premium to Sum Assured ",
        "content": "Get an in-built Accidental Death Benefit as well as the Waiver Of Premium benefit to help your family continue to fulfill their goals even in the case of your untimely demise. This non-participating, non-linked money back plan helps you save for the long-term with liquidity at various stages in life.",
        "productCode": 143,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/6136_web_3 Reliance_Gauranteed Money Back Plan_Brochure_03-12-13.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
    
    {
        "title": "Reliance Nippon Life Super Money Back Plan",
        "content": "Reliance Super Money Back Plan helps you provide a regular income and security for your family despite the ups and downs of life. The guaranteed monthly income increases every year while the guaranteed periodic lump sums enable you to invest in your business or fulfill your family's goals.",
        "productCode": 124,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/0106_Reliance Super Money Back.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life Increasing Money Back",
        "content": "",
        "productCode": 159,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/7286_Reliance Smart Cash Plus.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
    {
        "title": "Reliance Nippon Life Increasing Money Back",
        "content": "With time you would aspire for a bigger house, an expensive car, admission in the best school and a good higher education for your children. Your savings need to power these dreams of tomorrow",
        "productCode": 162,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/7286_Reliance Smart Cash Plus.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
    
     {
        "title": "Reliance Nippon Life Blue Chip Savings Plan",
        "content": "",
        "productCode": 136,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/7286_Reliance Smart Cash Plus.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
  {
        "title": "Reliance Nippon Life Blue Chip Savings Plan",
        "content": "",
        "productCode": 139,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/7286_Reliance Smart Cash Plus.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },


    //    {
    //        "title": "Reliance Lifelong Savings Plan Premium to Sum Assured",
    //        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
    //              "broucher" : [{
    //		    "Title": "Product Broucher",
    //		    "url" : ""
    //		}, {
    //		    "Title": "Product Leafletss",
    //		      "url" : ""
    //		}, {
    //		    "Title": "FAB sheets ",
    //		      "url" : ""
    //		}, {
    //		    "Title": "Product Working PPT",
    //		      "url" : ""
    //		}]
    //    },


    {
        "title": "Reliance Nippon Life Money Multiplier Plan",
        "content": "A plan that helps you achieve your goals sooner.",
        "productCode": 91,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/1702_Web_2 Money Multiplier plan - Version 3.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

{
        "title": "Reliance Nippon Life Income Booster Plan",
        "content": "",
        "productCode": 141,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/5259_RLI_Premier Wealth Insurance Plan_Web version brcohure_Feb 12.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },



]);

/* Invest*/

$m.juci.dataset("invest", [{
        "title": "Reliance Nippon Life Premier Wealth Insurance Plan",
        "content": "Reliance Premier Wealth Insurance Plan can be tailored to individual needs and keep up with the changing priorities over time. The plan allows you the flexibility to balance the protection and investment needs during its tenure, in an active or a systematic manner.",
        "productCode": 156,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/5259_RLI_Premier Wealth Insurance Plan_Web version brcohure_Feb 12.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life Super Endowment Plan",
        "content": "Reliance's Super Endowment Plan has been designed to ensure that you can save for your future along with the benefit of life cover and provide protection to your family.",
        "productCode": 116,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/0429_Super Endowment Plan.pdf",
            "P_Title": "0429_Super Endowment Plan"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]

    }, {
        "title": "Reliance Nippon Life Endowment Plan",
        "content": "Choose the Sum Assured amount based on your goals and aspirations as well as your current financial position.",
        "productCode": 94,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/1363_Reliance Endowment.pdf",
            "P_Title": "1363_Reliance Endowment"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    }, {
        "title": "Reliance Nippon Life Fixed Money Back",
        "content": "To keep up with the growing needs at every stage of life, you need a savings plan that can also safeguard your future.",
        "productCode": 146,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/9995_0043_Reliance Fixed Money Back Plan.pdf "
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
    
    {
        "title": "Reliance Nippon Life Fixed Money Back",
        "content": "To keep up with the growing needs at every stage of life, you need a savings plan that can also safeguard your future.",
        "productCode": 147,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/9995_0043_Reliance Fixed Money Back Plan.pdf "
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life Smart Cash Plus Plan",
        "content": "Reliance Smart Cash Plus Plan helps you gift yourself guaranteed lump sums at periodic intervals in the future to fulfill your goals at every lifestage, while securing your family from any unforeseen eventuality. A perfect mix of long term savings with the benefit of liquidity.",
        "productCode": 125,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/7286_Reliance Smart Cash Plus.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life Increasing Money Back",
        "content": "With time you would aspire for a bigger house, an expensive car, admission in the best school and a good higher education for your children. Your savings need to power these dreams of tomorrow",
        "productCode": 159,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/7286_Reliance Smart Cash Plus.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

]);


/* Health*/

$m.juci.dataset("health", [

    {
        "title": "Reliance Nippon Life Easy Care Fixed Benefit Plan",
        "content": "With Reliance Easy Care Fixed Benefit Plan you can now sleep peacefully at night while we take care of your worries.",
        "productCode": 115,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/4093_0013_Easy_Care_Fixed_Benefit_Web.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    }, {
        "title": "Reliance Nippon Life Care For You Advantage Plan",
        "content": "A very innovative plan for the entire family including children, dependant parents and parents-in-law.",
        "productCode": 113,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/5003_CFYAdvntgplan.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    }

]);


/* Retirement*/
$m.juci.dataset("retirement", [
    {
        "title": "Reliance Nippon Life Pension Builder",
        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
        "productCode": 160,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/3298_Reliance Pension Builder.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    }, {
        "title": "Reliance Nippon Life Immediate Annuity Plan",
        "content": "Worried about how to invest your hard earned money post retirement?    Convert your lump sum/corpus in to regular income for life. It’s like gifting yourself a regular income in the future.",
        "productCode": 114,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/3316_6614_Immediate_Annuity_Plan_Web.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    }, {
        "title": "Reliance Nippon Life Smart Pension Plan",
        "content": "Retirement is the most important milestone in your life. The key to successful retirement planning is starting early to build a desired retirement fund. The right retirement kitty will ensure fulfilling your dream of a wonderful retirement life with the independence you deserve.",
        "productCode": 117,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/9365_Smart Pension Plan.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },
    
    {
        "title": "Reliance Nippon Life Smart Pension Plan",
        "content": "Retirement is the most important milestone in your life. The key to successful retirement planning is starting early to build a desired retirement fund. The right retirement kitty will ensure fulfilling your dream of a wonderful retirement life with the independence you deserve.",
        "productCode": 118,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/9365_Smart Pension Plan.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    }


]);


/* Child*/
$m.juci.dataset("child", [

    {

        "title": "Reliance Nippon Life Child Plan",
        "content": "Save systematically and secure the financial future of your child by investing in the Reliance Child Plan and let your child enjoy today without worrying about tomorrow.",
        "productCode": 101,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/9584_8415_ChildPlan_Web.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life Education Plan",
        "content": "You put all your effort in raising your children and want them to achieve 100% success in every challenge that life throws at them. You need a suitable financial plan that ensures you don’t compromise on your goals for your child’s future and provides you with funds when you need them.",
        "productCode": 142,
        "broucher": [{
            "Title": "Product Broucher",
            "url": "http://www.reliancenipponlife.com/product_images/plans/0525_Reliance_Education_Plan.pdf"
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

]);

/* Solutions*/
$m.juci.dataset("solutions", [{
        "title": "Reliance Nippon Life Easy Retirement Solution",
        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
        "productCode": 121,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },{
        "title": "Reliance Nippon Life Easy Retirement Solution Plus",
        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
        "productCode": 164,
        "broucher": [{
            "Title": "Product Brochure",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }]
//{
//            "Title": "FAB sheets ",
//            "url": ""
//        }, {
//            "Title": "Product Working PPT",
//            "url": ""
//        }]
    
    }, {
        "title": "Reliance Nippon LifeWonder Kid Solution",
        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
        "productCode": 122,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life Income Advantage Solution",
        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
        "productCode": 123,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life Retirement Growth Solution",
        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
        "productCode": 126,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    }, {
        "title": "Reliance Nippon Life Double Easy Retirement Solution",
        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
        "productCode": 127,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life LifeTime Retirement Solution",
        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
        "productCode": 129,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life Super Kid Solutions",
        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
        "productCode": 128,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life Secured Retirement Solution",
        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
        "productCode": 134,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

    {
        "title": "Reliance Nippon Life Reliance Child Lifetime Income Solution",
        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
        "productCode": 148,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },


    {
        "title": "Reliance Nippon Life Assured Retirement Solution",
        "content": "",
        "productCode": 119,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },


    {
        "title": "Reliance Nippon Life Assured Retirement Solution II",
        "content": "",
        "productCode": 120,
        "broucher": [{
            "Title": "Product Broucher",
            "url": ""
        }, {
            "Title": "Product Leafletss",
            "url": ""
        }, {
            "Title": "FAB sheets ",
            "url": ""
        }, {
            "Title": "Product Working PPT",
            "url": ""
        }]
    },

]);