/**
 * products.js
 * @author CloudPact Technologies
 * @description : This script is used for defining list of products.
 **/

var appversion;
var uatversion;

$m.juci.addDataset("protect", []);
$m.juci.addDataset("PEsolutions", []);
$m.juci.addDataset("Ptsolutions", []);
$m.juci.addDataset("solutions", []);
$m.juci.addDataset("Psolutions", []);
$m.juci.addDataset("Gsolutions", []);
$m.juci.addDataset("Prodbroucher", []);
$m.juci.addDataset("saving", []);
$m.juci.addDataset("invest", []);
$m.juci.addDataset("showUpdate", false);
$m.juci.dataset("Prodbroucher", [{
    "Title": "Product Broucher"
}, {
    "Title": "Product Leaflets"
}, {
    "Title": "FAB sheets "
}, {
    "Title": "Product Working PPT"
},{
    "Title": "FAQ"
}]);
$m.juci.addDataset("teamLoginData", "");

$m.onData(function(eventObject) {
    // Code to execute when a data is received from parent page
    $m.hideProgress();
    $m.juci.dataset("teamLoginData", "");
    if (eventObject.data) {
        var data = eventObject.data;
        $m.juci.dataset("teamLoginData", data);
    }   
});

/* Protect*/
$m.juci.dataset("protect", [



    {
        "title": "Reliance Nippon Life Term Plan",
        "content": "For tailor-made, comprehensive and affordable coverage that will help you secure your financial future and the future of your family, invest in Reliance Term Plan.",
        "productCode": 107,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "http://www.reliancenipponlife.com/product_images/plans/term_plan.pdf"
        }, {
            "Title": "Product Leaflets",
            "url": ""
        }]
    }
]);

/* Saving*/
$m.juci.dataset("saving", [
	
	{
        "title": "Reliance Nippon Life  Endowment Plan",
        "content": "Choose the Sum Assured amount based on your goals and aspirations as well as your current financial position.",
        "productCode": 94,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "http://www.reliancenipponlife.com/product_images/plans/1363_Reliance Endowment.pdf",
            "P_Title": "1363_Reliance Endowment"
        }, {
            "Title": "Product Leaflets",
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
        "title": "Reliance Nippon Life Super Endowment Plan",
        "content": "Reliance's Super Endowment Plan has been designed to ensure that you can save for your future along with the benefit of life cover and provide protection to your family.",
        "productCode": 116,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "http://www.reliancenipponlife.com/product_images/plans/RNLI_Super Endowment Plan_Brochure.pdf",
            "P_Title": "0429_Super Endowment Plan"
        }, {
            "Title": "Product Leaflets",
            "url": "http://www.reliancenipponlife.com/product_images/plans/RNLI_Super Endowment Plan_Leaflet_Name Change_Web version_Aug 31.pdf"
        }, {
            "Title": "FAQ",
            "url": "http://www.reliancenipponlife.com/product_images/plans/faqs_reliance_nippon_life's_super_endowment_v1.pdf"
        }]
    },
	
	
	{
        "title": "Reliance Nippon Life Fixed Savings",
        "content": "Reliance Fixed Savings helps you to create a corpus for unforeseen expenses, by allowing you to systematically save over a period of time. This plan offers guaranteed benefits, including fixed additions that accrue every year and an additional lump sum at maturity, along with a life cover to protect your family.",
        "productCode": 132,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "http://www.reliancenipponlife.com/product_images/plans/RNLI_Fixed Savings Plan_Name Change_Brochure_web version_Sept 14.pdf"
        }, {
            "Title": "Product Leaflets",
            "url": "http://www.reliancenipponlife.com/product_images/plans/RNLI_Fixed Savings Plan_Name Change_Leaflet_low res_Sept 14.pdf"
        },{
            "Title": "FAQ",
            "url": "http://www.reliancenipponlife.com/product_images/plans/faqs_reliance_nippon_life_fixed_savings_v1.pdf"
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
        "title": "Reliance Nippon Life Future Income",
        "content": "We live in an age of growth: growing income, demands and expectations for yourself and your family. Don't let your savings stay dormant. Let it work for you to give an additional income.",
        "productCode": 153,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "http://www.reliancenipponlife.com/product_images/plans/0150_Reliance Future Income.pdf "
        }, {
            "Title": "Product Leaflets",
            "url": ""
        }]
    
    },

    {
        "title": "Reliance Nippon Life Increasing Income Insurance Plan",
        "content": "With time you would aspire for a bigger house, an expensive car, admission in the best school and a good higher education for your children. Your savings need to power these dreams of tomorrow.",
        "productCode": 137,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "http://www.reliancenipponlife.com/product_images/plans/RNLI_Increasing Income Insurance Plan_Brochure_Name Change_Web version_Sept 01.pdf"
        }, {
            "Title": "Product Leaflets",
            "url": "http://www.reliancenipponlife.com/product_images/plans/1RNLI_Increasing Income Insurance Plan_Leaflet_Name Change_Web version_Aug 30.pdf"
        }, {
            "Title": "FAQ",
            "url": "http://www.reliancenipponlife.com/product_images/plans/faqs_reliance_nippon_life_increasing_income_insurance_plan_upd_16-03-17.pdf"
        }]
    
    },

    {
        "title": "Reliance Nippon Life Whole Life Income",
        "content": "In life, we generally have two main financial needs - how to live a comfortable life and how to take care of our loved ones in case of any unfortunate event. This is a plan which would take care of your regular income needs to lead a comfortable life and would also help you leave behind a legacy for your next generations. In other words, you live through the benefits and also leave enough for the next generation.",
        "productCode": 155,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "http://www.reliancenipponlife.com/product_images/plans/1538_Reliance Whole Life Income.pdf"
        }, {
            "Title": "Product Leaflets",
            "url": ""
        }, {
            "Title": "FAQ",
            "url": "http://www.reliancenipponlife.com/product_images/plans/faqs_reliance_nippon_life_whole_life_income_upd_on_10-03-17.pdf"
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
        "title": "Reliance Nippon Life Lifelong Savings",
        "content": "We all work towards financial milestones like buying a house, securing our children's education, going on a dream vacation and living comfortably after retirement. These are critical milestones, achievable with a sound financial plan.",
        "productCode": 149,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "http://www.reliancenipponlife.com/product_images/plans/4488_Reliance Lifelong Savings.pdf"
        }, {
            "Title": "Product Leaflets",
            "url": ""
        }, {
            "Title": "FAQ",
            "url": "http://www.reliancenipponlife.com/product_images/plans/faqs_reliance_nippon_life_lifelong_savings_upd_10-03-17.pdf"
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
        "title": "Reliance Nippon Life's Guaranteed Money Back Plan",
        "content": "Get an in-built Accidental Death Benefit as well as the Waiver Of Premium benefit to help your family continue to fulfill their goals even in the case of your untimely demise. This non-participating, non-linked money back plan helps you save for the long-term with liquidity at various stages in life.",
        "productCode": 108,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "http://www.reliancenipponlife.com/product_images/plans/6136_web_3 Reliance_Gauranteed Money Back Plan_Brochure_03-12-13.pdf"
        }, {
            "Title": "Product Leaflets",
            "url": "http://www.reliancenipponlife.com/product_images/plans/RNLI_GMB_Leaflet_Name Change_Web version_Aug 25.pdf"
        }, {
            "Title": "FAQ",
            "url": "http://www.reliancenipponlife.com/product_images/plans/faqs_reliance_nippon_life's_guaranteed_money_back_v1.pdf"
        }]
//{
//            "Title": "FAB sheets ",
//            "url": ""
//        }, {
//            "Title": "Product Working PPT",
//            "url": ""
//        }]
    
    }, {
        "title": "Reliance  Nippon Life Super Money Back Plan",
        "content": "Reliance Super Money Back Plan helps you provide a regular income and security for your family despite the ups and downs of life. The guaranteed monthly income increases every year while the guaranteed periodic lump sums enable you to invest in your business or fulfill your family's goals.",
        "productCode": 124,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "http://www.reliancenipponlife.com/product_images/plans/0RNLI_Super Money Back Plan_Name Change_Brochure_web version_Sept 13.pdf"
        }, {
            "Title": "Product Leaflets",
            "url": "http://www.reliancenipponlife.com/product_images/plans/RNLI_Super Money Back Plan_Name Change_Leaflet_web version_Sept 13.pdf"
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
        "title": "Reliance Nippon Life Fixed Money Back",
        "content": "To keep up with the growing needs at every stage of life, you need a savings plan that can also safeguard your future.",
        "productCode": 146,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "http://www.reliancenipponlife.com/product_images/plans/RNLI_Fixed Money Back Plan_Name Change_Brochure_web_Sept 19.pdf"
        }, {
            "Title": "Product Leaflets",
            "url": "http://www.reliancenipponlife.com/product_images/plans/RNLI_Fixed Money Back Plan_Name Change_Leaflet_web_Sept 19.pdf"
        }, {
            "Title": "FAQ",
            "url": "http://www.reliancenipponlife.com/product_images/plans/faqs_reliance_nippon_life_fixed_money_back_plan_upd_16-03-17.pdf"
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
        "title": "Reliance Nippon Life Increasing Money Back",
        "content": "With time you would aspire for a bigger house, an expensive car, admission in the best school and a good higher education for your children. Your savings need to power these dreams of tomorrow",
        "productCode": 159,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "http://www.reliancenipponlife.com/product_images/plans/7286_Reliance Smart Cash Plus.pdf"
        }, {
            "Title": "Product Leaflets",
            "url": ""
        }, {
            "Title": "FAQ",
            "url": "http://www.reliancenipponlife.com/product_images/plans/faqs_reliance_nippon_life_increasing_money_back_plan_upd_16-03-17.pdf"
        }]
//{
//            "Title": "FAB sheets ",
//            "url": ""
//        }, {
//            "Title": "Product Working PPT",
//            "url": ""
//        }]
    
    },
//     {
//        "title": "Reliance Nippon Life Blue Chip Savings Plan",
//        "content": "",
//        "productCode": 136,
//        "broucher": [{
//            "Title": "Product Brochure",
//            "url": "http://www.reliancenipponlife.com/product_images/plans/7286_Reliance Smart Cash Plus.pdf"
//        }, {
//            "Title": "Product Leaflets",
//            "url": ""
//        }, {
//            "Title": "FAB sheets ",
//            "url": ""
//        }, {
//            "Title": "Product Working PPT",
//            "url": ""
//        }]
//    },
        
   {
        "title": "Reliance Nippon Life Smart Cash Plus Plan",
        "content": "Reliance Smart Cash Plus Plan helps you gift yourself guaranteed lump sums at periodic intervals in the future to fulfill your goals at every lifestage, while securing your family from any unforeseen eventuality. A perfect mix of long term savings with the benefit of liquidity.",
        "productCode": 125,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "http://www.reliancenipponlife.com/product_images/plans/RNLI_Smart Cash Plus Plan_Name Change_Brochure_web version_Sept 14.pdf"
        }, {
            "Title": "Product Leaflets",
            "url": "http://www.reliancenipponlife.com/product_images/plans/RNLI_Smart Cash Plus Plan_Name Change_Leaflet_web version_Sept 14.pdf"
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
        "title": "Reliance Nippon Life Money Multiplier Plan",
        "content": "A plan that helps you achieve your goals sooner.",
        "productCode": 91,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "http://www.reliancenipponlife.com/product_images/plans/RNLI_Money Multiplier Plan_Name Change_Brochure_web_Sept 19.pdf"
        }, {
            "Title": "Product Leaflets",
            "url": "http://www.reliancenipponlife.com/product_images/plans/RNLI_Money Multiplier Plan_Name Change_Leaflet_web_Sept 19.pdf"
        }]
//{
//            "Title": "FAB sheets ",
//            "url": ""
//        }, {
//            "Title": "Product Working PPT",
//            "url": ""
//        }]
    
    },
    //{
    //        "title": "Reliance Bluechip Savings Insurance Plan Sum Assured to Premium",
    //        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
    //              "broucher" : [{
    //		    "Title": "Product Brochure",
    //		    "url" : ""
    //		}, {
    //		    "Title": "Product Leaflets",
    //		      "url" : ""
    //		}, {
    //		    "Title": "FAB sheets ",
    //		      "url" : ""
    //		}, {
    //		    "Title": "Product Working PPT",
    //		      "url" : ""
    //		}]
    //    },
    //{
    //        "title": "Reliance Bluechip Savings Insurance Plan Premium to Sum Assured",
    //        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
    //        "productCode":136,
    //              "broucher" : [{
    //		    "Title": "Product Brochure",
    //		    "url" : "http://www.reliancenipponlife.com/product_images/plans/0853_RLI_Bluechip savings brochure_Artwork (web)_April 22.pdf"
    //		}, {
    //		    "Title": "Product Leaflets",
    //		      "url" : ""
    //		}, {
    //		    "Title": "FAB sheets ",
    //		      "url" : ""
    //		}, {
    //		    "Title": "Product Working PPT",
    //		      "url" : ""
    //		}]
    //    }

//{
//        "title": "Reliance Nippon Life Income Booster Plan",
//        "content": "",
//        "productCode": 141,
//        "broucher": [{
//            "Title": "Product Brochure",
//            "url": "http://www.reliancenipponlife.com/product_images/plans/5259_RLI_Premier Wealth Insurance Plan_Web version brcohure_Feb 12.pdf"
//        }, {
//            "Title": "Product Leaflets",
//            "url": ""
//        }, {
//            "Title": "FAB sheets ",
//            "url": ""
//        }, {
//            "Title": "Product Working PPT",
//            "url": ""
//        }]
//    },


]);

/* Invest*/

$m.juci.dataset("invest", [{
        "title": "Reliance Nippon Life Premier Wealth Insurance Plan",
        "content": "Reliance Premier Wealth Insurance Plan can be tailored to individual needs and keep up with the changing priorities over time. The plan allows you the flexibility to balance the protection and investment needs during its tenure, in an active or a systematic manner.",
        "productCode": 156,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "http://www.reliancenipponlife.com/product_images/plans/RNLI_Premiere Wealth Insurance Plan_Name Change_Brochure_Web version_Sept 13.pdf"
        }, {
            "Title": "Product Leaflets",
            "url": "http://www.reliancenipponlife.com/product_images/plans/RNLI_Premiere Wealth Insurance Plan_Name Change_Leaflet_Web version_Sept 13.pdf"
        }]
//{
//            "Title": "FAB sheets ",
//            "url": ""
//        }, {
//            "Title": "Product Working PPT",
//            "url": ""
//        }]
    
    },

//    {
//        "title": "Reliance Nippon Life Pay Five Plan",
//        "content": "Reliance Pay Five Plan allows you to create a long term saving with just five yearly premium payments. The plan offers you the flexibility of managing your investments based on your risk appetite and the security of a life cover. That’s not all; only five yearly premium payments make it more attractive and highly suitable for your investments need.",
//        "productCode": 93,
//        "broucher": [{
//            "Title": "Product Brochure",
//            "url": "http://www.reliancenipponlife.com/product_images/plans/RNLI_Pay Five Plan_Name Change_Brochure_Web version_Sept 07.pdf"
//        }, {
//            "Title": "Product Leaflets",
//            "url": "http://www.reliancenipponlife.com/product_images/plans/RNLI_Pay Five Plan_Name Change_Leaflet_Web version_Sept 07.pdf"
//        }]
////{
////            "Title": "FAB sheets ",
////            "url": ""
////        }, {
////            "Title": "Product Working PPT",
////            "url": ""
////        }]
//    
//    },

 {
        "title": "Reliance Nippon Life Classic Plan II",
        "content": "After decades of working hard to take care of your responsibilities, you deserve to put your feet up and enjoy your golden years - pursue your hobbies that you never had time for, make up for lost holidays, share memories with family or take pride in remaining independent. Reliance Pension Builder helps you to save regularly to build your nest-egg for retirement that you can look forward to.",
        "productCode": 109,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "http://www.reliancenipponlife.com/product_images/plans/RNLI_Classic Plan II_Name Change_Brochure_Web version_Sept 13.pdf"
        }, {
            "Title": "Product Leaflets",
            "url": "http://www.reliancenipponlife.com/product_images/plans/RNLI_Classic Plan II_Name Change_Leaflet_web version_Sept 13.pdf"
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
            "Title": "Product Leaflets",
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
            "title": "Reliance Nippon Life Smart Savings Insurance Plan",
            "content": "A Plan that automatically changes your investment profile with changing life-stage",
            "productCode": 163,
                  "broucher" : [{
    		    "Title": "Product Brochure",
    		    "url" : ""
    		}, {
    		    "Title": "Product Leaflets",
    		      "url" : ""
    		}]
//{
//            "Title": "FAB sheets ",
//            "url": ""
//        }, {
//            "Title": "Product Working PPT",
//            "url": ""
//        }]
    
        },

    //    {
    //        "title": "Reliance Fixed Money Back Premium to Sum Assured",
    //        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
    //              "broucher" : [{
    //		    "Title": "Product Brochure",
    //		    "url" : "http://www.reliancenipponlife.com/product_images/plans/9995_0043_Reliance Fixed Money Back Plan.pdf"
    //		}, {
    //		    "Title": "Product Leaflets",
    //		      "url" : ""
    //		}, {
    //		    "Title": "FAB sheets ",
    //		      "url" : ""
    //		}, {
    //		    "Title": "Product Working PPT",
    //		      "url" : ""
    //		}]
    //    },

    //    {
    //        "title": "Reliance Easy Care Fixed Benefit Plan",
    //        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
    //              "broucher" : [{
    //		    "Title": "Product Brochure",
    //		    "url" : "http://www.reliancenipponlife.com/product_images/plans/4093_0013_Easy_Care_Fixed_Benefit_Web.pdf"
    //		}, {
    //		    "Title": "Product Leaflets",
    //		      "url" : ""
    //		}, {
    //		    "Title": "FAB sheets ",
    //		      "url" : ""
    //		}, {
    //		    "Title": "Product Working PPT",
    //		      "url" : ""
    //		}]
    //    },

    //    {
    //        "title": "Reliance Care For You Advantage Plan",
    //        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
    //              "broucher" : [{
    //		    "Title": "Product Brochure",
    //		    "url" : ""
    //		}, {
    //		    "Title": "Product Leaflets",
    //		      "url" : ""
    //		}, {
    //		    "Title": "FAB sheets ",
    //		      "url" : ""
    //		}, {
    //		    "Title": "Product Working PPT",
    //		      "url" : ""
    //		}]
    //    },

 
   

    //    {
    //        "title": "Premium Calculator For Reliance LifePlus Solutions",
    //        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
    //              "broucher" : [{
    //		    "Title": "Product Brochure",
    //		    "url" : ""
    //		}, {
    //		    "Title": "Product Leaflets",
    //		      "url" : ""
    //		}, {
    //		    "Title": "FAB sheets ",
    //		      "url" : ""
    //		}, {
    //		    "Title": "Product Working PPT",
    //		      "url" : ""
    //		}]
    //    }
]);


/* Health*/

$m.juci.dataset("health", [

    {
        "title": "Reliance Nippon Life Easy Care Fixed Benefit Plan",
        "content": "With Reliance Easy Care Fixed Benefit Plan you can now sleep peacefully at night while we take care of your worries.",
        "productCode": 115,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "http://www.reliancenipponlife.com/product_images/plans/4093_0013_Easy_Care_Fixed_Benefit_Web.pdf"
        }, {
            "Title": "Product Leaflets",
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
        "title": "Reliance Nippon Life Care For You Advantage Plan",
        "content": "A very innovative plan for the entire family including children, dependant parents and parents-in-law.",
        "productCode": 113,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "http://www.reliancenipponlife.com/product_images/plans/5003_CFYAdvntgplan.pdf"
        }, {
            "Title": "Product Leaflets",
            "url": ""
        }]
//{
//            "Title": "FAB sheets ",
//            "url": ""
//        }, {
//            "Title": "Product Working PPT",
//            "url": ""
//        }]
    
    }

]);


/* Retirement*/
$m.juci.dataset("retirement", [

    //	{
    //        "title": "Reliance Traditional Group Employee Benfit Plan (MBR-Par",
    //        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
    //              "broucher" : [{
    //		    "Title": "Product Brochure",
    //		    "url" : "http://www.reliancenipponlife.com/product_images/plans/8500_Traditional Group Employee Benefits.pdf"
    //		}, {
    //		    "Title": "Product Leaflets",
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
        "title": "Reliance Nippon Life Pension Builder",
        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
        "productCode": 160,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "http://www.reliancenipponlife.com/product_images/plans/3298_Reliance Pension Builder.pdf"
        }, {
            "Title": "Product Leaflets",
            "url": ""
        },{
            "Title": "FAQ",
            "url": "http://www.reliancenipponlife.com/product_images/plans/faqs_reliance_nippon_life_pension_builder_upd_on_10-03-17.pdf"
        }]
       // {
//            "Title": "Product Working PPT",
//            "url": ""
//        }]
    
    }, {
        "title": "Reliance Nippon Life Immediate Annuity Plan",
        "content": "Worried about how to invest your hard earned money post retirement?    Convert your lump sum/corpus in to regular income for life. It’s like gifting yourself a regular income in the future.",
        "productCode": 114,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "http://www.reliancenipponlife.com/product_images/plans/3316_6614_Immediate_Annuity_Plan_Web.pdf"
        }, {
            "Title": "Product Leaflets",
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
        "title": "Reliance Nippon Life Smart Pension Plan",
        "content": "Retirement is the most important milestone in your life. The key to successful retirement planning is starting early to build a desired retirement fund. The right retirement kitty will ensure fulfilling your dream of a wonderful retirement life with the independence you deserve.",
        "productCode": 117,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "http://www.reliancenipponlife.com/product_images/plans/9365_Smart Pension Plan.pdf"
        }, {
            "Title": "Product Leaflets",
            "url": ""
        }]
//{
//            "Title": "FAB sheets ",
//            "url": ""
//        }, {
//            "Title": "Product Working PPT",
//            "url": ""
//        }]
    
    }


]);


/* Child*/
$m.juci.dataset("child", [

    {

        "title": "Reliance Nippon Life Child Plan",
        "content": "Save systematically and secure the financial future of your child by investing in the Reliance Child Plan and let your child enjoy today without worrying about tomorrow.",
        "productCode": 101,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "http://www.reliancenipponlife.com/product_images/plans/child_plan.pdf"
        }, {
            "Title": "Product Leaflets",
            "url":"http://www.reliancenipponlife.com/product_images/plans/RNLI_Child Plan_Leaflet_Artwork_Web Version_Sep 6.pdf"
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
        "title": "Reliance Nippon Life Education Plan",
        "content": "You put all your effort in raising your children and want them to achieve 100% success in every challenge that life throws at them. You need a suitable financial plan that ensures you don’t compromise on your goals for your child’s future and provides you with funds when you need them.",
        "productCode": 142,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "http://www.reliancenipponlife.com/product_images/plans/RNLI_Education Plan_Name Change_Brochure_Web version_Sept 08.pdf"
        }, {
            "Title": "Product Leaflets",
            "url": "http://www.reliancenipponlife.com/product_images/plans/RNLI_Education Plan_Name Change_Leaflet_Web version_Sept 08.pdf"
        },{
            "Title": "FAQ",
            "url": "http://www.reliancenipponlife.com/product_images/plans/faqs_reliance_nippon_life_education_plan_upd_10-03-17.pdf"
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
        "title": "Reliance Nippon Life Bal Nivesh - One Time",
        "content": "",
        "productCode": 166,
        "broucher": [{
            "Title": "Product Brochure",
            "url": "",
            "P_Title": "0429_Super Endowment Plan"
        }, {
            "Title": "Product Leaflets",
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
	
    //	{
    //        "title": "Reliance Traditional Group Employee Benfit Plan (MBR-Par)",
    //        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
    //              "broucher" : [{
    //		    "Title": "Product Brochure",
    //		    "url" : "http://www.reliancenipponlife.com/product_images/plans/8500_Traditional Group Employee Benefits.pdf"
    //		}, {
    //		    "Title": "Product Leaflets",
    //		      "url" : ""
    //		}, {
    //		    "Title": "FAB sheets ",
    //		      "url" : ""
    //		}, {
    //		    "Title": "Product Working PPT",
    //		      "url" : ""
    //		}]
    //    }, 
    // {
    //        "title": "Reliance Traditional Group Superannuation Plan (MBR-Par)",
    //        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
    //              "broucher" : [{
    //		    "Title": "Product BrochBrochureure",
    //		    "url" : "http://www.reliancenipponlife.com/product_images/plans/5795_Traditional Group Superannuation Plan.pdf"
    //		}, {
    //		    "Title": "Product Leaflets",
    //		      "url" : ""
    //		}, {
    //		    "Title": "FAB sheets ",
    //		      "url" : ""
    //		}, {
    //		    "Title": "Product Working PPT",
    //		      "url" : ""
    //		}]
    //    }

]);

/* Solutions*/
$m.juci.dataset("solutions", [{
        "title": "Reliance Easy Retirement Solution",
        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
        "productCode": 121,
        "broucher": [{
            "Title": "Product Brochure",
            "url": ""
        }, {
            "Title": "Product Leaflets",
            "url": ""
        }]
//{
//            "Title": "FAB sheets ",
//            "url": ""
//        }, {
//            "Title": "Product Working PPT",
//            "url": ""
//        }]
    
    },{
        "title": "Reliance Nippon Life Easy Retirement Solution Plus",
        "content": "Offers dual benefit of a guaranteed income for your whole life along with payouts before your retirement so that you can live your life stress free.",
        "productCode": 164,
        "broucher": [{
            "Title": "Product Brochure",
            "url": ""
        }, {
            "Title": "Product Leaflets",
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
        "title": "Wonder Kid",
        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
        "productCode": 122,
        "broucher": [{
            "Title": "Product Brochure",
            "url": ""
        }, {
            "Title": "Product Leaflets",
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
        "title": "Income Advantage",
        "content": "A yearly renewable fund based group product which enables employers to outsource fund management and related administration to reliance life insurance company limited for their superannuation scheme.",
        "productCode": 123,
        "broucher": [{
            "Title": "Product Brochure",
            "url": ""
        }, {
            "Title": "Product Leaflets",
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

//    {
//        "title": "Retirement Growth Solution",
//        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
//        "productCode": 126,
//        "broucher": [{
//            "Title": "Product Brochure",
//            "url": ""
//        }, {
//            "Title": "Product Leaflets",
//            "url": ""
//        }]
////{
////            "Title": "FAB sheets ",
////            "url": ""
////        }, {
////            "Title": "Product Working PPT",
////            "url": ""
////        }]
//    
//    },
	{
        "title": "Double Easy Retirement Solution",
        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
        "productCode": 127,
        "broucher": [{
            "Title": "Product Brochure",
            "url": ""
        }, {
            "Title": "Product Leaflets",
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
        "title": "LifeTime Retirement Solution",
        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
        "productCode": 129,
        "broucher": [{
            "Title": "Product Brochure",
            "url": ""
        }, {
            "Title": "Product Leaflets",
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
        "title": "Super Kid Solution",
        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
        "productCode": 128,
        "broucher": [{
            "Title": "Product Brochure",
            "url": ""
        }, {
            "Title": "Product Leaflets",
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
        "title": "Secured Retirement Solution",
        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
        "productCode": 134,
        "broucher": [{
            "Title": "Product Brochure",
            "url": ""
        }, {
            "Title": "Product Leaflets",
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
        "title": "Reliance Nippon Life  Child Lifetime Income Solution",
        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
        "productCode": 148,
        "broucher": [{
            "Title": "Product Brochure",
            "url": ""
        }, {
            "Title": "Product Leaflets",
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
        "title": "Premium Calculator For Reliance LifePlus Solutions(Assured Retirement Solution -I)",
        "content": "Allows you to save systematically towards building a corpus to get guaranteed income for whole life to maintain your lifestyle even after retirement.",
        "productCode": 119,
        "broucher": [{
            "Title": "Product Brochure",
            "url": ""
        }, {
            "Title": "Product Leaflets",
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
        "title": "Premium Calculator For Reliance LifePlus Solutions(Assured Retirement Solution -II)",
        "content": "Get regular income for life to maintain your lifestyle even after retirement.",
        "productCode": 120,
        "broucher": [{
            "Title": "Product Brochure",
            "url": ""
        }, {
            "Title": "Product Leaflets",
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
    	"title": "Reliance Nippon Life Smart Shield Solution",
    	"content":"Get regular income for life to maintain your lifestyle even after retirement.",
    	"productCode": 167,
        "broucher": [{
            "Title": "Product Brochure",
            "url": ""
        }, {
            "Title": "Product Leaflets",
            "url": ""
         }]
    }

    //    
    //    {
    //    	 "title": "Health Term Renewal - Premium Calculator (Reliance Care For You Advantage Plan)",
    //        "content": "Reliance Nippon Life Insurance is here with Solutions for Individuals, a series of plans that will help you make wise investments, protect your family, secure your child’s future and even chalk out a plan for your retirement.",
    //              "broucher" : [{
    //		    "Title": "Product Broucher",
    //		    "url" : "http://www.reliancenipponlife.com/product_images/plans/5003_CFYAdvntgplan.pdf"
    //		}, {
    //		    "Title": "Product Leaflets",
    //		      "url" : ""
    //		}, {
    //		    "Title": "FAB sheets ",
    //		      "url" : ""
    //		}, {
    //		    "Title": "Product Working PPT",
    //		      "url" : ""
    //		}]
    //    }


]);


$m.onResume(function(){
	// Code to execute when the page is resumed
	getSystemVersion();
});

$m.onForeground(function(eventObject){
	// Code to execute when a app comes to foreground
	getSystemVersion();
});

$m.onReady(function() {
    // Code to execute when the page is ready
    juci.dataset("headerName","Products");
    Protection = juci.findById("protection");
    Saving = juci.findById("saving");
    Invest = juci.findById("invest");
  //  Health = juci.findById("health");
    Retirement = juci.findById("retirement");
    Child = juci.findById("child");
    Solutions = juci.findById("solutions");


    //Protection.hide();
    Saving.hide();
    Invest.hide();
   // Health.hide();
    Retirement.hide();
    Child.hide();
    Solutions.hide();


    var head = document.getElementsByClassName("juci_panel_title");
    juci.viewModel.applyBinding(head[0]);
    $m.juci.dataset("alertcount", "3");


    //Benefit IIlustration Button
    juci.getControl("products-list").addListItemClick(openTeamLoginPopUp, this, ".listbutton");
    juci.getControl("savings-list").addListItemClick(openTeamLoginPopUp, this, ".listbutton");
    juci.getControl("invest-list").addListItemClick(openTeamLoginPopUp, this, ".listbutton");
   // juci.getControl("health-list").addListItemClick(openTeamLoginPopUp, this, ".listbutton");
    juci.getControl("retirement-list").addListItemClick(openTeamLoginPopUp, this, ".listbutton");
    juci.getControl("child-list").addListItemClick(openTeamLoginPopUp, this, ".listbutton");
    juci.getControl("solutions-list").addListItemClick(openTeamLoginPopUp, this, ".listbutton");

    //Product Broucher
    juci.getControl("products-list").addListItemClick(openBroucher, this, "#broucherlist .listname");
    juci.getControl("savings-list").addListItemClick(openBroucher, this, "#broucherlist .listname");
    juci.getControl("invest-list").addListItemClick(openBroucher, this, "#broucherlist .listname");
   // juci.getControl("health-list").addListItemClick(openBroucher, this, "#broucherlist .listname");
   // juci.getControl("retirement-list").addListItemClick(openBroucher, this, "#broucherlist .listname");
    juci.getControl("retirement-list").addListItemClick(openBroucher, this, "#broucherlist .listname");
    juci.getControl("child-list").addListItemClick(openBroucher, this, "#broucherlist .listname");
    juci.getControl("solutions-list").addListItemClick(openBroucher, this, "#broucherlist .listname");

});


function toggleView(e) {
    Protection.hide();
    Saving.hide();
    Invest.hide();
    Retirement.hide();
    Child.hide();
    //Health.hide();
    Solutions.hide();


    switch (e.newToggled) {
        case 0:
            Protection.show();

            break;
        case 1:

            Saving.show();

            break;
        case 2:

            Invest.show();
            break;

//        case 3:
//
//            Health.show();
//            break;

        case 3:

            Retirement.show();
            break;

        case 4:

            Child.show();
            break;

        case 5:

            Solutions.show();

            break;

    }
}

function showdialog() {
    $m.alert("hi");
    juci.showDialog("dialog-box");
}

function onListClick(event) {
    if (event.index == 0) {
        juci.dataset("protect", 94);

    }
}

function hidebox() {
    juci.hideDialog("dialog-box");
}

var showContent = false;

function showfulllist(e) {
    if (e.target.el.className == "showing") {
        var currentindex = e.target.el.id;
        var contentid = "less" + e.index;

        if (showContent === true) {
            $m.juci.findById(contentid).hide();
            juci.findById(currentindex).html("Show more");
            showContent = false;
        } else {
            $m.juci.findById(contentid).show();
            juci.findById(currentindex).html("Show less");
            showContent = true;
        }
    }
}
var showContent_Saving = false;

function showlist(e) {
    if (e.target.el.className == "showing") {
        var currentindex = e.target.el.id;
        var contentid = "lessS" + e.index;

        if (showContent_Saving === true) {
            $m.juci.findById(contentid).hide();
            juci.findById(currentindex).html("Show more");
            showContent_Saving = false;
        } else {
            $m.juci.findById(contentid).show();
            juci.findById(currentindex).html("Show less");
            showContent_Saving = true;
        }
    }
}
var showContent_Invest = false;

function showdata(e) {
    if (e.target.el.className == "showing") {
        var currentindex = e.target.el.id;
        var contentid = "lessi" + e.index;

        if (showContent_Invest === true) {
            $m.juci.findById(contentid).hide();
            juci.findById(currentindex).html("Show more");
            showContent_Invest = false;
        } else {
            $m.juci.findById(contentid).show();
            juci.findById(currentindex).html("Show less");
            showContent_Invest = true;
        }
    }
}
var showContent_Health = false;

function showHealth(e) {
    if (e.target.el.className == "showing") {
        var currentindex = e.target.el.id;
        var contentid = "lessh" + e.index;

        if (showContent_Health === true) {
            $m.juci.findById(contentid).hide();
            juci.findById(currentindex).html("Show more");
            showContent_Health = false;
        } else {
            $m.juci.findById(contentid).show();
            juci.findById(currentindex).html("Show less");
            showContent_Health = true;
        }
    }
}
var showContent_Retirement = false;

function showretire(e) {
    if (e.target.el.className == "showing") {
        var currentindex = e.target.el.id;
        var contentid = "lessr" + e.index;

        if (showContent_Retirement === true) {
            $m.juci.findById(contentid).hide();
            juci.findById(currentindex).html("Show more");
            showContent_Retirement = false;
        } else {
            $m.juci.findById(contentid).show();
            juci.findById(currentindex).html("Show less");
            showContent_Retirement = true;
        }
    }
}
var showContent_Child = false;

function showchild(e) {
    if (e.target.el.className == "showing") {
        var currentindex = e.target.el.id;
        var contentid = "lessc" + e.index;

        if (showContent_Child === true) {
            $m.juci.findById(contentid).hide();
            juci.findById(currentindex).html("Show more");
            showContent_Child = false;
        } else {
            $m.juci.findById(contentid).show();
            juci.findById(currentindex).html("Show less");
            showContent_Child = true;
        }
    }
}
var showContent_Solutions = false;

function showsolutions(e) {
    if (e.target.el.className == "showing") {
        var currentindex = e.target.el.id;
        var contentid = "lessg" + e.index;

        if (showContent_Solutions === true) {
            $m.juci.findById(contentid).hide();
            juci.findById(currentindex).html("Show more");
            showContent_Solutions = false;
        } else {
            $m.juci.findById(contentid).show();
            juci.findById(currentindex).html("Show less");
            showContent_Solutions = true;
        }
    }
}
var showContent_PSolutions = false;

function showPsolutions(e) {
    if (e.target.el.className == "showing") {
        var currentindex = e.target.el.id;
        var contentid = "lessp" + e.index;

        if (showContent_PSolutions === true) {
            $m.juci.findById(contentid).hide();
            juci.findById(currentindex).html("Show more");
            showContent_PSolutions = false;
        } else {
            $m.juci.findById(contentid).show();
            juci.findById(currentindex).html("Show less");
            showContent_PSolutions = true;
        }
    }
}
var showContent_GSolutions = false;

function showGsolutions(e) {
    if (e.target.el.className == "showing") {
        var currentindex = e.target.el.id;
        var contentid = "lessg" + e.index;

        if (showContent_GSolutions === true) {
            $m.juci.findById(contentid).hide();
            juci.findById(currentindex).html("Show more");
            showContent_GSolutions = false;
        } else {
            $m.juci.findById(contentid).show();
            juci.findById(currentindex).html("Show less");
            showContent_GSolutions = true;
        }
    }
}
var showContent_PtSolutions = false;

function showPtsolutions(e) {
    if (e.target.el.className == "showing") {
        var currentindex = e.target.el.id;
        var contentid = "lesst" + e.index;

        if (showContent_PtSolutions === true) {
            $m.juci.findById(contentid).hide();
            juci.findById(currentindex).html("Show more");
            showContent_PtSolutions = false;
        } else {
            $m.juci.findById(contentid).show();
            juci.findById(currentindex).html("Show less");
            showContent_PtSolutions = true;
        }
    }
}
var showContent_PESolutions = false;

function showPEsolutions(e) {
    if (e.target.el.className == "showing") {
        var currentindex = e.target.el.id;
        var contentid = "lessE" + e.index;

        if (showContent_PESolutions === true) {
            $m.juci.findById(contentid).hide();
            juci.findById(currentindex).html("Show more");
            showContent_PESolutions = false;
        } else {
            $m.juci.findById(contentid).show();
            juci.findById(currentindex).html("Show less");
            showContent_PESolutions = true;
        }
    }
}


function openTeamLoginPopUp(event){
	$m.putPref("productCode",event.data.productCode);
	$m.savePref();
	currentUser = {"code":$m.getUsername(),"name":$m.getUserAccount().customProperties.Login_Name,"usertype":$m.getUserAccount().customProperties.User_Type};
	if(currentUser.usertype != 'ADV' && currentUser.usertype != 'TPPR' && currentUser.usertype != 'TPADV' && currentUser.usertype != 'AGADV'&& currentUser.usertype != 'FLS' && currentUser.usertype !=='CNADV' && currentUser.usertype !=='PRADV' && currentUser.usertype !=='ENADV'){
		if(!window.dbHelper)
			initDB();
		else
			checkData();
//			$m.juci.dataset("name","");
			juci.showDialog("dialog-teamlogin");
	} else if(currentUser.usertype == 'TPPR'){
		if(!window.dbHelper)
			initDB();
		else
			checkData();
			initNav();
//			$m.juci.dataset("name","");
			juci.showDialog("dialog-teamlogin");	
	}else {
		callService();
	}
}

function getSystemVersion(){
	$m.getVersionInfo(function(res){
		appversion = res.result.appVersion;
		$m.get(Constants.publicIP+"/mowblyserver/getupdateinfo/rellife/prod/RlifeAssist", function(response){
			if(response.code === 200){
				// Success
				var result = response.result.data;
				var resData = JSON.parse(result);
				uatversion = resData.App.version;
				if(appversion != uatversion){
					$m.alert("Your app version is not updated. To update click ok.","Update", function(){
						$m.open("SalesAssist", "market://details?id=com.snapwork.reliancelifesalesportal");
					});	
				}
			} else{
				// Error
				var errMsg = response.error.message;
			}
		});
	});
}