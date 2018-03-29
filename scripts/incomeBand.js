/**
 * incomeBand.js
 * @author CloudPact Technologies
 * @description : This script is used for calculating for income based on income
 **/
var incomeBand_json = {
	"Tier I/Metro":{
		"Single":{
			"High":800000,
			"Medium to High":600000,
			"Medium":450000,
			"Low":300000
		},
		"Married":{
			"High":1050000,
			"Medium to High":800000,
			"Medium":600000,
			"Low":450000
		},
		"Married with young kid/s":{
			"High":1350000,
			"Medium to High":800000,
			"Medium":600000,
			"Low":450000
		},
		"Married with growing kid/s":{
			"High":1600000,			
			"Medium to High":1000000,
			"Medium":800000,
			"Low":600000
		},
		"Married with grown up child":{
			"High":2000000,
			"Medium to High":1200000,
			"Medium":960000,
			"Low":600000
		},
		"Nearing Retirement":{
			"High":2500000,
			"Medium to High":1500000,
			"Medium":1200000,
			"Low":800000
		},
		"Retiree":{
			"High":1500000,
			"Medium to High":1050000,
			"Medium":840000,
			"Low":560000
		}
	},
	"Tier II":{
		"Single":{
			"High":450000,
			"Medium":300000,
			"Low":180000
		},
		"Married":{
			"High":600000,
			"Medium":450000,
			"Low":300000
		},
		"Married with young kid/s":{
			"High":600000,
			"Medium":450000,
			"Low":300000
		},
		"Married with growing kid/s":{
			"High":800000,
			"Medium":600000,
			"Low":450000
		},
		"Married with grown up child":{
			"High":960000,
			"Medium":720000,
			"Low":450000
		},
		"Nearing Retirement":{
			"High":1200000,
			"Medium":900000,
			"Low":600000
		},
		"Retiree":{
			"High":840000,
			"Medium":630000,
			"Low":420000
		}
	},
	"Tier III":{
		"Single":{
			"High":300000,
			"Medium":180000,
			"Low":120000
		},
		"Married":{
			"High":450000,
			"Medium":300000,
			"Low":180000
		},
		"Married with young kid/s":{
			"High":450000,
			"Medium":300000,
			"Low":180000
		},
		"Married with growing kid/s":{
			"High":600000,
			"Medium":450000,
			"Low":300000
		},
		"Married with grown up child":{
			"High":720000,
			"Medium":540000,
			"Low":300000
		},
		"Nearing Retirement":{
			"High":900000,
			"Medium":675000,
			"Low":400000
		},
		"Retiree":{
			"High":630000,
			"Medium":472500,
			"Low":280000
		}
	}
};
	
/*	
	[
       {
           "Lifestage": "Single",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "SingleTier I/MetroHigh",
           "Income": "800000"
       },
       {
           "Lifestage": "Married",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "MarriedTier I/MetroHigh",
           "Income": "1050000"
       },
       {
           "Lifestage": "Married with young kid/s",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "Married with young kid/sTier I/MetroHigh",
           "Income": "1350000"
       },
       {
           "Lifestage": "Married with growing kid/s",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "Married with growing kid/sTier I/MetroHigh",
           "Income": "1600000"
       },
       {
           "Lifestage": "Married with grown up child",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "Married with grown up childTier I/MetroHigh",
           "Income": "2000000"
       },
       {
           "Lifestage": "Nearing Retirement",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "Nearing RetirementTier I/MetroHigh",
           "Income": "2500000"
       },
       {
           "Lifestage": "Single",
           "City Tier": "Tier II",
           "Level": "",
           "Lookup": "SingleTier IIHigh",
           "Income": "450000"
       },
       {
           "Lifestage": "Married",
           "City Tier": "Tier II",
           "Level": "",
           "Lookup": "MarriedTier IIHigh",
           "Income": "600000"
       },
       {
           "Lifestage": "Married with young kid/s",
           "City Tier": "Tier II",
           "Level": "",
           "Lookup": "Married with young kid/sTier IIHigh",
           "Income": "600000"
       },
       {
           "Lifestage": "Married with growing kid/s",
           "City Tier": "Tier II",
           "Level": "",
           "Lookup": "Married with growing kid/sTier IIHigh",
           "Income": "800000"
       },
       {
           "Lifestage": "Married with grown up child",
           "City Tier": "Tier II",
           "Level": "",
           "Lookup": "Married with grown up childTier IIHigh",
           "Income": "960000"
       },
       {
           "Lifestage": "Nearing Retirement",
           "City Tier": "Tier II",
           "Level": "",
           "Lookup": "Nearing RetirementTier IIHigh",
           "Income": "1200000"
       },
       {
           "Lifestage": "Single",
           "City Tier": "Tier III",
           "Level": "",
           "Lookup": "SingleTier IIIHigh",
           "Income": "300000"
       },
       {
           "Lifestage": "Married",
           "City Tier": "Tier III",
           "Level": "",
           "Lookup": "MarriedTier IIIHigh",
           "Income": "450000"
       },
       {
           "Lifestage": "Married with young kid/s",
           "City Tier": "Tier III",
           "Level": "",
           "Lookup": "Married with young kid/sTier IIIHigh",
           "Income": "450000"
       },
       {
           "Lifestage": "Married with growing kid/s",
           "City Tier": "Tier III",
           "Level": "",
           "Lookup": "Married with growing kid/sTier IIIHigh",
           "Income": "600000"
       },
       {
           "Lifestage": "Married with grown up child",
           "City Tier": "Tier III",
           "Level": "",
           "Lookup": "Married with grown up childTier IIIHigh",
           "Income": "720000"
       },
       {
           "Lifestage": "Nearing Retirement",
           "City Tier": "Tier III",
           "Level": "",
           "Lookup": "Nearing RetirementTier IIIHigh",
           "Income": "900000"
       },
       {
           "Lifestage": "Single",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "SingleTier I/MetroMedium to High",
           "Income": "600000"
       },
       {
           "Lifestage": "Married",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "MarriedTier I/MetroMedium to High",
           "Income": "800000"
       },
       {
           "Lifestage": "Married with young kid/s",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "Married with young kid/sTier I/MetroMedium to High",
           "Income": "800000"
       },
       {
           "Lifestage": "Married with growing kid/s",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "Married with growing kid/sTier I/MetroMedium to High",
           "Income": "1000000"
       },
       {
           "Lifestage": "Married with grown up child",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "Married with grown up childTier I/MetroMedium to High",
           "Income": "1200000"
       },
       {
           "Lifestage": "Nearing Retirement",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "Nearing RetirementTier I/MetroMedium to High",
           "Income": "1500000"
       },
       {
           "Lifestage": "Single",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "SingleTier I/MetroMedium",
           "Income": "450000"
       },
       {
           "Lifestage": "Married",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "MarriedTier I/MetroMedium",
           "Income": "600000"
       },
       {
           "Lifestage": "Married with young kid/s",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "Married with young kid/sTier I/MetroMedium",
           "Income": "600000"
       },
       {
           "Lifestage": "Married with growing kid/s",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "Married with growing kid/sTier I/MetroMedium",
           "Income": "800000"
       },
       {
           "Lifestage": "Married with grown up child",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "Married with grown up childTier I/MetroMedium",
           "Income": "960000"
       },
       {
           "Lifestage": "Nearing Retirement",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "Nearing RetirementTier I/MetroMedium",
           "Income": "1200000"
       },
       {
           "Lifestage": "Single",
           "City Tier": "Tier II",
           "Level": "",
           "Lookup": "SingleTier IIMedium",
           "Income": "300000"
       },
       {
           "Lifestage": "Married",
           "City Tier": "Tier II",
           "Level": "",
           "Lookup": "MarriedTier IIMedium",
           "Income": "450000"
       },
       {
           "Lifestage": "Married with young kid/s",
           "City Tier": "Tier II",
           "Level": "",
           "Lookup": "Married with young kid/sTier IIMedium",
           "Income": "450000"
       },
       {
           "Lifestage": "Married with growing kid/s",
           "City Tier": "Tier II",
           "Level": "",
           "Lookup": "Married with growing kid/sTier IIMedium",
           "Income": "600000"
       },
       {
           "Lifestage": "Married with grown up child",
           "City Tier": "Tier II",
           "Level": "",
           "Lookup": "Married with grown up childTier IIMedium",
           "Income": "720000"
       },
       {
           "Lifestage": "Nearing Retirement",
           "City Tier": "Tier II",
           "Level": "",
           "Lookup": "Nearing RetirementTier IIMedium",
           "Income": "900000"
       },
       {
           "Lifestage": "Single",
           "City Tier": "Tier III",
           "Level": "",
           "Lookup": "SingleTier IIIMedium",
           "Income": "180000"
       },
       {
           "Lifestage": "Married",
           "City Tier": "Tier III",
           "Level": "",
           "Lookup": "MarriedTier IIIMedium",
           "Income": "300000"
       },
       {
           "Lifestage": "Married with young kid/s",
           "City Tier": "Tier III",
           "Level": "",
           "Lookup": "Married with young kid/sTier IIIMedium",
           "Income": "300000"
       },
       {
           "Lifestage": "Married with growing kid/s",
           "City Tier": "Tier III",
           "Level": "",
           "Lookup": "Married with growing kid/sTier IIIMedium",
           "Income": "450000"
       },
       {
           "Lifestage": "Married with grown up child",
           "City Tier": "Tier III",
           "Level": "",
           "Lookup": "Married with grown up childTier IIIMedium",
           "Income": "540000"
       },
       {
           "Lifestage": "Nearing Retirement",
           "City Tier": "Tier III",
           "Level": "",
           "Lookup": "Nearing RetirementTier IIIMedium",
           "Income": "675000"
       },
       {
           "Lifestage": "Single",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "SingleTier I/MetroLow",
           "Income": "300000"
       },
       {
           "Lifestage": "Married",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "MarriedTier I/MetroLow",
           "Income": "450000"
       },
       {
           "Lifestage": "Married with young kid/s",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "Married with young kid/sTier I/MetroLow",
           "Income": "450000"
       },
       {
           "Lifestage": "Married with growing kid/s",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "Married with growing kid/sTier I/MetroLow",
           "Income": "600000"
       },
       {
           "Lifestage": "Married with grown up child",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "Married with grown up childTier I/MetroLow",
           "Income": "600000"
       },
       {
           "Lifestage": "Nearing Retirement",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "Nearing RetirementTier I/MetroLow",
           "Income": "800000"
       },
       {
           "Lifestage": "Single",
           "City Tier": "Tier II",
           "Level": "",
           "Lookup": "SingleTier IILow",
           "Income": "180000"
       },
       {
           "Lifestage": "Married",
           "City Tier": "Tier II",
           "Level": "",
           "Lookup": "MarriedTier IILow",
           "Income": "300000"
       },
       {
           "Lifestage": "Married with young kid/s",
           "City Tier": "Tier II",
           "Level": "",
           "Lookup": "Married with young kid/sTier IILow",
           "Income": "300000"
       },
       {
           "Lifestage": "Married with growing kid/s",
           "City Tier": "Tier II",
           "Level": "",
           "Lookup": "Married with growing kid/sTier IILow",
           "Income": "450000"
       },
       {
           "Lifestage": "Married with grown up child",
           "City Tier": "Tier II",
           "Level": "",
           "Lookup": "Married with grown up childTier IILow",
           "Income": "450000"
       },
       {
           "Lifestage": "Nearing Retirement",
           "City Tier": "Tier II",
           "Level": "",
           "Lookup": "Nearing RetirementTier IILow",
           "Income": "600000"
       },
       {
           "Lifestage": "Single",
           "City Tier": "Tier III",
           "Level": "",
           "Lookup": "SingleTier IIILow",
           "Income": "120000"
       },
       {
           "Lifestage": "Married",
           "City Tier": "Tier III",
           "Level": "",
           "Lookup": "MarriedTier IIILow",
           "Income": "180000"
       },
       {
           "Lifestage": "Married with young kid/s",
           "City Tier": "Tier III",
           "Level": "",
           "Lookup": "Married with young kid/sTier IIILow",
           "Income": "180000"
       },
       {
           "Lifestage": "Married with growing kid/s",
           "City Tier": "Tier III",
           "Level": "",
           "Lookup": "Married with growing kid/sTier IIILow",
           "Income": "300000"
       },
       {
           "Lifestage": "Married with grown up child",
           "City Tier": "Tier III",
           "Level": "",
           "Lookup": "Married with grown up childTier IIILow",
           "Income": "300000"
       },
       {
           "Lifestage": "Nearing Retirement",
           "City Tier": "Tier III",
           "Level": "",
           "Lookup": "Nearing RetirementTier IIILow",
           "Income": "400000"
       },
       {
           "Lifestage": "Retiree",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "RetireeTier I/MetroHigh",
           "Income": "1500000"
       },
       {
           "Lifestage": "Retiree",
           "City Tier": "Tier II",
           "Level": "",
           "Lookup": "RetireeTier IIHigh",
           "Income": "840000"
       },
       {
           "Lifestage": "Retiree",
           "City Tier": "Tier III",
           "Level": "",
           "Lookup": "RetireeTier IIIHigh",
           "Income": "630000"
       },
       {
           "Lifestage": "Retiree",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "RetireeTier I/MetroMedium to High",
           "Income": "1050000"
       },
       {
           "Lifestage": "Retiree",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "RetireeTier I/MetroMedium",
           "Income": "840000"
       },
       {
           "Lifestage": "Retiree",
           "City Tier": "Tier II",
           "Level": "",
           "Lookup": "RetireeTier IIMedium",
           "Income": "630000"
       },
       {
           "Lifestage": "Retiree",
           "City Tier": "Tier III",
           "Level": "",
           "Lookup": "RetireeTier IIIMedium",
           "Income": "472500"
       },
       {
           "Lifestage": "Retiree",
           "City Tier": "Tier I/Metro",
           "Level": "",
           "Lookup": "RetireeTier I/MetroLow",
           "Income": "560000"
       },
       {
           "Lifestage": "Retiree",
           "City Tier": "Tier II",
           "Level": "",
           "Lookup": "RetireeTier IILow",
           "Income": "420000"
       },
       {
           "Lifestage": "Retiree",
           "City Tier": "Tier III",
           "Level": "",
           "Lookup": "RetireeTier IIILow",
           "Income": "280000"
       }
   ];*/