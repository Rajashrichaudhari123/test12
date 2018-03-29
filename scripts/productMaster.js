/**
 * productMaster.js
 *
 * @author CloudPact Technologies
 * @description : displating the 3 products based on needs and objective
 */
var productsMaster = [
{"S.no":"1","InvestorProfile":"chidlEducation","Need":"EarlyCareer","Product1":"N/A","Product2":"N/A","VideoId":'rCYLG_2ZT8g',"Product3":"N/A"},
{"S.no":"2","InvestorProfile":"wealthCreation","Need":"EarlyCareer","Product2":"Reliance Nippon Life Increasing Income Insurance Plan","Product1":"Reliance Nippon Life Fixed Savings","VideoId":'rCYLG_2ZT8g',"Product3":"Reliance Nippon Life Increasing Money Back","Product4":"Reliance Nippon Life Lifelong Savings"},
{"S.no":"2","InvestorProfile":"retirement","Need":"EarlyCareer","Product1":"Reliance Nippon Life Pension Builder","Product2":"Reliance Nippon Life Whole Life Income","VideoId":'rCYLG_2ZT8g',"Product3":"Reliance Nippon Life Smart Pension Plan"},

{"S.no":"3","InvestorProfile":"chidlEducation","Need":"Married","Product1":"N/A","Product2":"N/A","VideoId":'rCYLG_2ZT8g',"Product3":"N/A"},
{"S.no":"3","InvestorProfile":"wealthCreation","Need":"Married","Product1":"Reliance Nippon Life Increasing Income Insurance Plan","Product2":"Reliance Nippon Life Increasing Money Back","VideoId":'rCYLG_2ZT8g',"Product3":"Reliance Nippon Life Fixed Savings","Product4":"Reliance Nippon Life Lifelong Savings Plan"},
{"S.no":"4","InvestorProfile":"retirement","Need":"Married","Product1":"Reliance Nippon Life Pension Builder","Product2":"Reliance Nippon Life Whole Life Income","VideoId":'rCYLG_2ZT8g',"Product3":"Reliance Nippon Life Smart Pension Plan"},

{"S.no":"3","InvestorProfile":"chidlEducation","Need":"Child","Product1":"Reliance Nippon Life Education Plan","Product2":"Reliance Nippon Life Fixed Money Back","VideoId":'rCYLG_2ZT8g',"Product3":"Reliance Nippon Life Whole Life Income"},
{"S.no":"3","InvestorProfile":"wealthCreation","Need":"Child","Product1":"Reliance Nippon Life Fixed Savings","Product2":"Reliance Nippon Life Increasing Income Insurance Plan","VideoId":'rCYLG_2ZT8g',"Product3":"Reliance Nippon Life Fixed Money Back","Product4":"Reliance Nippon Life's Guaranteed Money Back Plan"},
{"S.no":"4","InvestorProfile":"retirement","Need":"Child","Product2":"Reliance Nippon Life Smart Pension Plan","Product1":"Reliance Nippon Life Pension Builder","VideoId":'rCYLG_2ZT8g',"Product3":"Reliance Nippon Life Lifelong Savings"},

{"S.no":"3","InvestorProfile":"chidlEducation","Need":"GrownUp","Product1":"Reliance Nippon Life Education Plan","Product2":"Reliance Nippon Life Fixed Money Back","VideoId":'rCYLG_2ZT8g',"Product3":"Reliance Nippon Life Whole Life Income"},
{"S.no":"3","InvestorProfile":"wealthCreation","Need":"GrownUp","Product1":"Reliance Nippon Life Increasing Income Insurance Plan","Product2":"Reliance Nippon Life Super Endowment Plan","VideoId":'rCYLG_2ZT8g',"Product4":"Reliance Nippon Life Fixed Savings","Product3":"Reliance Nippon Life Lifelong Savings"},
{"S.no":"4","InvestorProfile":"retirement","Need":"GrownUp","Product1":"Reliance Nippon Life Pension Builder","Product2":"Reliance Nippon Life Whole Life Income","VideoId":'rCYLG_2ZT8g',"Product3":"Reliance Nippon Life Lifelong Savings"},

{"S.no":"3","InvestorProfile":"chidlEducation","Need":"PreRetirement","Product1":"N/A","Product2":"N/A","VideoId":'rCYLG_2ZT8g',"Product3":"N/A"},
{"S.no":"3","InvestorProfile":"wealthCreation","Need":"PreRetirement","Product1":"Reliance Nippon Life Increasing Income Insurance Plan","Product2":"Reliance Nippon Life Super Endowment Plan","VideoId":'rCYLG_2ZT8g',"Product4":"Reliance Nippon Life Fixed Savings","Product3":"Reliance Nippon Life Lifelong Savings"},
{"S.no":"4","InvestorProfile":"retirement","Need":"PreRetirement","Product1":"Reliance Nippon Life Pension Builder","Product2":"Reliance Nippon Life Immediate Annuity Plan","VideoId":'rCYLG_2ZT8g'}
];

/*
var productsMaster = [
    {
        "S.no": "1",
        "Life Stage": "Single",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Savings",
        "Product 1": "Super Endowment",
        "Product 2": "Fixed Savings",
        "": ""
    },
    {
        "S.no": "2",
        "Life Stage": "Single",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Savings",
        "Product 1": "Future Income",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "2",
        "Life Stage": "Single",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Savings",
        "Product 1": "Future Income",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "3",
        "Life Stage": "Single",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Savings",
        "Product 1": "Super Endowment",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "3",
        "Life Stage": "Single",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Savings",
        "Product 1": "Increasing Income",
        "Product 2": "Guaranteed Money Back",
        "": ""
    },
    {
        "S.no": "4",
        "Life Stage": "Single",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Savings",
        "Product 1": "Future Income",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "4",
        "Life Stage": "Single",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Savings",
        "Product 1": "Super Endowment",
        "Product 2": "Guaranteed Money Back",
        "": ""
    },
    {
        "S.no": "5",
        "Life Stage": "Single",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Savings",
        "Product 1": "Increasing Income",
        "Product 2": "Super Endowment",
        "": ""
    },
    {
        "S.no": "5",
        "Life Stage": "Single",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Savings",
        "Product 1": "Future Income",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "6",
        "Life Stage": "Single",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Child",
        "Product 1": "NA",
        "Product 2": "NA",
        "": ""
    },
    {
        "S.no": "6",
        "Life Stage": "Single",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Child",
        "Product 1": "NA",
        "Product 2": "NA",
        "": ""
    },
    {
        "S.no": "7",
        "Life Stage": "Single",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Child",
        "Product 1": "NA",
        "Product 2": "NA",
        "": ""
    },
    {
        "S.no": "7",
        "Life Stage": "Single",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Child",
        "Product 1": "NA",
        "Product 2": "NA",
        "": ""
    },
    {
        "S.no": "8",
        "Life Stage": "Single",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Child",
        "Product 1": "NA",
        "Product 2": "NA",
        "": ""
    },
    {
        "S.no": "8",
        "Life Stage": "Single",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Child",
        "Product 1": "NA",
        "Product 2": "NA",
        "": ""
    },
    {
        "S.no": "9",
        "Life Stage": "Single",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Child",
        "Product 1": "NA",
        "Product 2": "NA",
        "": ""
    },
    {
        "S.no": "9",
        "Life Stage": "Single",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Child",
        "Product 1": "NA",
        "Product 2": "NA",
        "": ""
    },
    {
        "S.no": "10",
        "Life Stage": "Single",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Child",
        "Product 1": "NA",
        "Product 2": "NA",
        "": ""
    },
    {
        "S.no": "10",
        "Life Stage": "Single",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "11",
        "Life Stage": "Single",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Fixed Savings",
        "": ""
    },
    {
        "S.no": "11",
        "Life Stage": "Single",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "12",
        "Life Stage": "Single",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "12",
        "Life Stage": "Single",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "13",
        "Life Stage": "Single",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "13",
        "Life Stage": "Single",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Fixed Savings",
        "": ""
    },
    {
        "S.no": "14",
        "Life Stage": "Single",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Super Endowment",
        "": ""
    },
    {
        "S.no": "14",
        "Life Stage": "Single",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "15",
        "Life Stage": "Single",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "15",
        "Life Stage": "Single",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "16",
        "Life Stage": "Single",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "16",
        "Life Stage": "Single",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "17",
        "Life Stage": "Single",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "17",
        "Life Stage": "Single",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "18",
        "Life Stage": "Single",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "18",
        "Life Stage": "Single",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "19",
        "Life Stage": "Single",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "19",
        "Life Stage": "Married",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Savings",
        "Product 1": "Increasing Income",
        "Product 2": "Fixed Savings",
        "": ""
    },
    {
        "S.no": "20",
        "Life Stage": "Married",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Savings",
        "Product 1": "Increasing Income",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "20",
        "Life Stage": "Married",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Savings",
        "Product 1": "Future Income",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "21",
        "Life Stage": "Married",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Savings",
        "Product 1": "Super Endowment",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "21",
        "Life Stage": "Married",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Savings",
        "Product 1": "Future Income",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "22",
        "Life Stage": "Married",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Savings",
        "Product 1": "Lifelong Savings",
        "Product 2": "Future Income",
        "": ""
    },
    {
        "S.no": "22",
        "Life Stage": "Married",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Savings",
        "Product 1": "Super Endowment",
        "Product 2": "Fixed Savings",
        "": ""
    },
    {
        "S.no": "23",
        "Life Stage": "Married",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Savings",
        "Product 1": "Fixed Savings",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "23",
        "Life Stage": "Married",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Savings",
        "Product 1": "Future Income",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "24",
        "Life Stage": "Married",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Child",
        "Product 1": "Super Endowment",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "24",
        "Life Stage": "Married",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Child",
        "Product 1": "Increasing Income",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "25",
        "Life Stage": "Married",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Child",
        "Product 1": "Future Income",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "25",
        "Life Stage": "Married",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Child",
        "Product 1": "Guaranteed Money Back",
        "Product 2": "Super Endowment",
        "": ""
    },
    {
        "S.no": "26",
        "Life Stage": "Married",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Child",
        "Product 1": "Increasing Income",
        "Product 2": "Future Income",
        "": ""
    },
    {
        "S.no": "26",
        "Life Stage": "Married",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Child",
        "Product 1": "Future Income",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "27",
        "Life Stage": "Married",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Child",
        "Product 1": "Guaranteed Money Back",
        "Product 2": "Super Endowment",
        "": ""
    },
    {
        "S.no": "27",
        "Life Stage": "Married",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Child",
        "Product 1": "Increasing Income",
        "Product 2": "Future Income",
        "": ""
    },
    {
        "S.no": "28",
        "Life Stage": "Married",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Child",
        "Product 1": "Increasing Income",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "28",
        "Life Stage": "Married",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "29",
        "Life Stage": "Married",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "29",
        "Life Stage": "Married",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "30",
        "Life Stage": "Married",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Future Income",
        "": ""
    },
    {
        "S.no": "30",
        "Life Stage": "Married",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Fixed Savings",
        "": ""
    },
    {
        "S.no": "31",
        "Life Stage": "Married",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Retirment",
        "Product 1": "Lifelong Savings",
        "Product 2": "Easy Retirement Solution",
        "": ""
    },
    {
        "S.no": "31",
        "Life Stage": "Married",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Fixed Savings",
        "": ""
    },
    {
        "S.no": "32",
        "Life Stage": "Married",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Super Endowment",
        "": ""
    },
    {
        "S.no": "32",
        "Life Stage": "Married",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "33",
        "Life Stage": "Married",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "33",
        "Life Stage": "Married",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "34",
        "Life Stage": "Married",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "34",
        "Life Stage": "Married",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "35",
        "Life Stage": "Married",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "35",
        "Life Stage": "Married",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "36",
        "Life Stage": "Married",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "36",
        "Life Stage": "Married",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "37",
        "Life Stage": "Married",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "37",
        "Life Stage": "Married with Kids",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Savings",
        "Product 1": "Super Endowment",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "38",
        "Life Stage": "Married with Kids",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Savings",
        "Product 1": "Increasing Income",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "38",
        "Life Stage": "Married with Kids",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Savings",
        "Product 1": "Lifelong Savings",
        "Product 2": "Future Income",
        "": ""
    },
    {
        "S.no": "39",
        "Life Stage": "Married with Kids",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Savings",
        "Product 1": "Increasing Income",
        "Product 2": "Fixed Savings",
        "": ""
    },
    {
        "S.no": "39",
        "Life Stage": "Married with Kids",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Savings",
        "Product 1": "Increasing Income",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "40",
        "Life Stage": "Married with Kids",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Savings",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "40",
        "Life Stage": "Married with Kids",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Savings",
        "Product 1": "Super Endowment",
        "Product 2": "Guaranteed Money Back",
        "": ""
    },
    {
        "S.no": "41",
        "Life Stage": "Married with Kids",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Savings",
        "Product 1": "Increasing Income",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "41",
        "Life Stage": "Married with Kids",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Savings",
        "Product 1": "Future Income",
        "Product 2": "Wonder Kid Solution",
        "": ""
    },
    {
        "S.no": "42",
        "Life Stage": "Married with Kids",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Child",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "42",
        "Life Stage": "Married with Kids",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Child",
        "Product 1": "Future Income",
        "Product 2": "Child Lifetime Income Solution",
        "": ""
    },
    {
        "S.no": "43",
        "Life Stage": "Married with Kids",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Child",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "43",
        "Life Stage": "Married with Kids",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Child",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Guaranteed Money Back",
        "": ""
    },
    {
        "S.no": "44",
        "Life Stage": "Married with Kids",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Child",
        "Product 1": "Increasing Income",
        "Product 2": "Wonder Kid Solution",
        "": ""
    },
    {
        "S.no": "44",
        "Life Stage": "Married with Kids",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Child",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Child Lifetime Income Solution",
        "": ""
    },
    {
        "S.no": "45",
        "Life Stage": "Married with Kids",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Child",
        "Product 1": "Guaranteed Money Back",
        "Product 2": "Wonder Kid Solution",
        "": ""
    },
    {
        "S.no": "45",
        "Life Stage": "Married with Kids",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Child",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "46",
        "Life Stage": "Married with Kids",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Child",
        "Product 1": "Increasing Income",
        "Product 2": "Child Lifetime Income Solution",
        "": ""
    },
    {
        "S.no": "46",
        "Life Stage": "Married with Kids",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "47",
        "Life Stage": "Married with Kids",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "47",
        "Life Stage": "Married with Kids",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "48",
        "Life Stage": "Married with Kids",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "48",
        "Life Stage": "Married with Kids",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Fixed Savings",
        "": ""
    },
    {
        "S.no": "49",
        "Life Stage": "Married with Kids",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "49",
        "Life Stage": "Married with Kids",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Fixed Savings",
        "": ""
    },
    {
        "S.no": "50",
        "Life Stage": "Married with Kids",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Super Endowment",
        "": ""
    },
    {
        "S.no": "50",
        "Life Stage": "Married with Kids",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "51",
        "Life Stage": "Married with Kids",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "51",
        "Life Stage": "Married with Kids",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "52",
        "Life Stage": "Married with Kids",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "52",
        "Life Stage": "Married with Kids",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "53",
        "Life Stage": "Married with Kids",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "53",
        "Life Stage": "Married with Kids",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "54",
        "Life Stage": "Married with Kids",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "54",
        "Life Stage": "Married with Kids",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "55",
        "Life Stage": "Married with Kids",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "55",
        "Life Stage": "Near Retirement",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Savings",
        "Product 1": "Increasing Income",
        "Product 2": "Fixed Savings",
        "": ""
    },
    {
        "S.no": "56",
        "Life Stage": "Near Retirement",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Savings",
        "Product 1": "Future Income",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "56",
        "Life Stage": "Near Retirement",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Savings",
        "Product 1": "Super Endowment",
        "Product 2": "Future Income",
        "": ""
    },
    {
        "S.no": "57",
        "Life Stage": "Near Retirement",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Savings",
        "Product 1": "Increasing Income",
        "Product 2": "Fixed Savings",
        "": ""
    },
    {
        "S.no": "57",
        "Life Stage": "Near Retirement",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Savings",
        "Product 1": "Lifelong Savings",
        "Product 2": "Guaranteed Money Back",
        "": ""
    },
    {
        "S.no": "58",
        "Life Stage": "Near Retirement",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Savings",
        "Product 1": "Future Income",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "58",
        "Life Stage": "Near Retirement",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Savings",
        "Product 1": "Super Endowment",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "59",
        "Life Stage": "Near Retirement",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Savings",
        "Product 1": "Increasing Income",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "59",
        "Life Stage": "Near Retirement",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Savings",
        "Product 1": "Future Income",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "60",
        "Life Stage": "Near Retirement",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Child",
        "Product 1": "Fixed Savings",
        "Product 2": "Wonder Kid Solution",
        "": ""
    },
    {
        "S.no": "60",
        "Life Stage": "Near Retirement",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Child",
        "Product 1": "Increasing Income",
        "Product 2": "Wonder Kid Solution",
        "": ""
    },
    {
        "S.no": "61",
        "Life Stage": "Near Retirement",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Child",
        "Product 1": "Increasing Income",
        "Product 2": "Child Lifetime Income Solution",
        "": ""
    },
    {
        "S.no": "61",
        "Life Stage": "Near Retirement",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Child",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "62",
        "Life Stage": "Near Retirement",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Child",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "62",
        "Life Stage": "Near Retirement",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Child",
        "Product 1": "Child Lifetime Income Solution",
        "Product 2": "Future Income",
        "": ""
    },
    {
        "S.no": "63",
        "Life Stage": "Near Retirement",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Child",
        "Product 1": "Guaranteed Money Back",
        "Product 2": "Wonder Kid Solution",
        "": ""
    },
    {
        "S.no": "63",
        "Life Stage": "Near Retirement",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Child",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "64",
        "Life Stage": "Near Retirement",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Child",
        "Product 1": "Increasing Income",
        "Product 2": "Wonder Kid Solution",
        "": ""
    },
    {
        "S.no": "64",
        "Life Stage": "Near Retirement",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "65",
        "Life Stage": "Near Retirement",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Fixed Savings",
        "": ""
    },
    {
        "S.no": "65",
        "Life Stage": "Near Retirement",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "66",
        "Life Stage": "Near Retirement",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "66",
        "Life Stage": "Near Retirement",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Fixed Savings",
        "": ""
    },
    {
        "S.no": "67",
        "Life Stage": "Near Retirement",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "67",
        "Life Stage": "Near Retirement",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Fixed Savings",
        "": ""
    },
    {
        "S.no": "68",
        "Life Stage": "Near Retirement",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Super Endowment",
        "": ""
    },
    {
        "S.no": "68",
        "Life Stage": "Near Retirement",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "69",
        "Life Stage": "Near Retirement",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "69",
        "Life Stage": "Near Retirement",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "70",
        "Life Stage": "Near Retirement",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "70",
        "Life Stage": "Near Retirement",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "71",
        "Life Stage": "Near Retirement",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "71",
        "Life Stage": "Near Retirement",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "72",
        "Life Stage": "Near Retirement",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "72",
        "Life Stage": "Near Retirement",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "73",
        "Life Stage": "Near Retirement",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "73",
        "Life Stage": "Married with young kid/s",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Savings",
        "Product 1": "Super Endowment",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "74",
        "Life Stage": "Married with young kid/s",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Savings",
        "Product 1": "Increasing Income",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "74",
        "Life Stage": "Married with young kid/s",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Savings",
        "Product 1": "Lifelong Savings",
        "Product 2": "Future Income",
        "": ""
    },
    {
        "S.no": "75",
        "Life Stage": "Married with young kid/s",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Savings",
        "Product 1": "Increasing Income",
        "Product 2": "Fixed Savings",
        "": ""
    },
    {
        "S.no": "75",
        "Life Stage": "Married with young kid/s",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Savings",
        "Product 1": "Increasing Income",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "76",
        "Life Stage": "Married with young kid/s",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Savings",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "76",
        "Life Stage": "Married with young kid/s",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Savings",
        "Product 1": "Super Endowment",
        "Product 2": "Guaranteed Money Back",
        "": ""
    },
    {
        "S.no": "77",
        "Life Stage": "Married with young kid/s",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Savings",
        "Product 1": "Increasing Income",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "77",
        "Life Stage": "Married with young kid/s",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Savings",
        "Product 1": "Future Income",
        "Product 2": "Wonder Kid Solution",
        "": ""
    },
    {
        "S.no": "78",
        "Life Stage": "Married with young kid/s",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Child",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "78",
        "Life Stage": "Married with young kid/s",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Child",
        "Product 1": "Future Income",
        "Product 2": "Child Lifetime Income Solution",
        "": ""
    },
    {
        "S.no": "79",
        "Life Stage": "Married with young kid/s",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Child",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "79",
        "Life Stage": "Married with young kid/s",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Child",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Guaranteed Money Back",
        "": ""
    },
    {
        "S.no": "80",
        "Life Stage": "Married with young kid/s",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Child",
        "Product 1": "Increasing Income",
        "Product 2": "Wonder Kid Solution",
        "": ""
    },
    {
        "S.no": "80",
        "Life Stage": "Married with young kid/s",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Child",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Child Lifetime Income Solution",
        "": ""
    },
    {
        "S.no": "81",
        "Life Stage": "Married with young kid/s",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Child",
        "Product 1": "Guaranteed Money Back",
        "Product 2": "Wonder Kid Solution",
        "": ""
    },
    {
        "S.no": "81",
        "Life Stage": "Married with young kid/s",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Child",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "82",
        "Life Stage": "Married with young kid/s",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Child",
        "Product 1": "Increasing Income",
        "Product 2": "Child Lifetime Income Solution",
        "": ""
    },
    {
        "S.no": "82",
        "Life Stage": "Married with young kid/s",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "83",
        "Life Stage": "Married with young kid/s",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "83",
        "Life Stage": "Married with young kid/s",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "84",
        "Life Stage": "Married with young kid/s",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "84",
        "Life Stage": "Married with young kid/s",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Fixed Savings",
        "": ""
    },
    {
        "S.no": "85",
        "Life Stage": "Married with young kid/s",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "85",
        "Life Stage": "Married with young kid/s",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Fixed Savings",
        "": ""
    },
    {
        "S.no": "86",
        "Life Stage": "Married with young kid/s",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Super Endowment",
        "": ""
    },
    {
        "S.no": "86",
        "Life Stage": "Married with young kid/s",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "87",
        "Life Stage": "Married with young kid/s",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "87",
        "Life Stage": "Married with young kid/s",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "88",
        "Life Stage": "Married with young kid/s",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "88",
        "Life Stage": "Married with young kid/s",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "89",
        "Life Stage": "Married with young kid/s",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "89",
        "Life Stage": "Married with young kid/s",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "90",
        "Life Stage": "Married with young kid/s",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "90",
        "Life Stage": "Married with young kid/s",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "91",
        "Life Stage": "Married with young kid/s",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "91",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Savings",
        "Product 1": "Super Endowment",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "92",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Savings",
        "Product 1": "Increasing Income",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "92",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Savings",
        "Product 1": "Lifelong Savings",
        "Product 2": "Future Income",
        "": ""
    },
    {
        "S.no": "93",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Savings",
        "Product 1": "Increasing Income",
        "Product 2": "Fixed Savings",
        "": ""
    },
    {
        "S.no": "93",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Savings",
        "Product 1": "Increasing Income",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "94",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Savings",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "94",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Savings",
        "Product 1": "Super Endowment",
        "Product 2": "Guaranteed Money Back",
        "": ""
    },
    {
        "S.no": "95",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Savings",
        "Product 1": "Increasing Income",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "95",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Savings",
        "Product 1": "Future Income",
        "Product 2": "Wonder Kid Solution",
        "": ""
    },
    {
        "S.no": "96",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Child",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "96",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Child",
        "Product 1": "Future Income",
        "Product 2": "Child Lifetime Income Solution",
        "": ""
    },
    {
        "S.no": "97",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Child",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "97",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Child",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Guaranteed Money Back",
        "": ""
    },
    {
        "S.no": "98",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Child",
        "Product 1": "Increasing Income",
        "Product 2": "Wonder Kid Solution",
        "": ""
    },
    {
        "S.no": "98",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Child",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Child Lifetime Income Solution",
        "": ""
    },
    {
        "S.no": "99",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Child",
        "Product 1": "Guaranteed Money Back",
        "Product 2": "Wonder Kid Solution",
        "": ""
    },
    {
        "S.no": "99",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Child",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "100",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Child",
        "Product 1": "Increasing Income",
        "Product 2": "Child Lifetime Income Solution",
        "": ""
    },
    {
        "S.no": "100",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "101",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "101",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "102",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "102",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Fixed Savings",
        "": ""
    },
    {
        "S.no": "103",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "103",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Fixed Savings",
        "": ""
    },
    {
        "S.no": "104",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Super Endowment",
        "": ""
    },
    {
        "S.no": "104",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "105",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "105",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "106",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "106",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "107",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "107",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "108",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "108",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "109",
        "Life Stage": "Married with growing kid/s",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "109",
        "Life Stage": "Married with grown up child",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Savings",
        "Product 1": "Super Endowment",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "110",
        "Life Stage": "Married with grown up child",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Savings",
        "Product 1": "Increasing Income",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "110",
        "Life Stage": "Married with grown up child",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Savings",
        "Product 1": "Lifelong Savings",
        "Product 2": "Future Income",
        "": ""
    },
    {
        "S.no": "111",
        "Life Stage": "Married with grown up child",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Savings",
        "Product 1": "Increasing Income",
        "Product 2": "Fixed Savings",
        "": ""
    },
    {
        "S.no": "111",
        "Life Stage": "Married with grown up child",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Savings",
        "Product 1": "Increasing Income",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "112",
        "Life Stage": "Married with grown up child",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Savings",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "112",
        "Life Stage": "Married with grown up child",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Savings",
        "Product 1": "Super Endowment",
        "Product 2": "Guaranteed Money Back",
        "": ""
    },
    {
        "S.no": "113",
        "Life Stage": "Married with grown up child",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Savings",
        "Product 1": "Increasing Income",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "113",
        "Life Stage": "Married with grown up child",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Savings",
        "Product 1": "Future Income",
        "Product 2": "Wonder Kid Solution",
        "": ""
    },
    {
        "S.no": "114",
        "Life Stage": "Married with grown up child",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Child",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "114",
        "Life Stage": "Married with grown up child",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Child",
        "Product 1": "Future Income",
        "Product 2": "Child Lifetime Income Solution",
        "": ""
    },
    {
        "S.no": "115",
        "Life Stage": "Married with grown up child",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Child",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "115",
        "Life Stage": "Married with grown up child",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Child",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Guaranteed Money Back",
        "": ""
    },
    {
        "S.no": "116",
        "Life Stage": "Married with grown up child",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Child",
        "Product 1": "Increasing Income",
        "Product 2": "Wonder Kid Solution",
        "": ""
    },
    {
        "S.no": "116",
        "Life Stage": "Married with grown up child",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Child",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Child Lifetime Income Solution",
        "": ""
    },
    {
        "S.no": "117",
        "Life Stage": "Married with grown up child",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Child",
        "Product 1": "Guaranteed Money Back",
        "Product 2": "Wonder Kid Solution",
        "": ""
    },
    {
        "S.no": "117",
        "Life Stage": "Married with grown up child",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Child",
        "Product 1": "Wonder Kid Solution",
        "Product 2": "Increasing Income",
        "": ""
    },
    {
        "S.no": "118",
        "Life Stage": "Married with grown up child",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Child",
        "Product 1": "Increasing Income",
        "Product 2": "Child Lifetime Income Solution",
        "": ""
    },
    {
        "S.no": "118",
        "Life Stage": "Married with grown up child",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "119",
        "Life Stage": "Married with grown up child",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "119",
        "Life Stage": "Married with grown up child",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "120",
        "Life Stage": "Married with grown up child",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "120",
        "Life Stage": "Married with grown up child",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Fixed Savings",
        "": ""
    },
    {
        "S.no": "121",
        "Life Stage": "Married with grown up child",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "121",
        "Life Stage": "Married with grown up child",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Fixed Savings",
        "": ""
    },
    {
        "S.no": "122",
        "Life Stage": "Married with grown up child",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Super Endowment",
        "": ""
    },
    {
        "S.no": "122",
        "Life Stage": "Married with grown up child",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Retirment",
        "Product 1": "Easy Retirement Solution",
        "Product 2": "Lifelong Savings",
        "": ""
    },
    {
        "S.no": "123",
        "Life Stage": "Married with grown up child",
        "City": "Tier I/Metro",
        "Investor Profile": "Conservative",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "123",
        "Life Stage": "Married with grown up child",
        "City": "Tier I/Metro",
        "Investor Profile": "Balanced",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "124",
        "Life Stage": "Married with grown up child",
        "City": "Tier I/Metro",
        "Investor Profile": "Aggressive",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "124",
        "Life Stage": "Married with grown up child",
        "City": "Tier II",
        "Investor Profile": "Conservative",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "125",
        "Life Stage": "Married with grown up child",
        "City": "Tier II",
        "Investor Profile": "Balanced",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "125",
        "Life Stage": "Married with grown up child",
        "City": "Tier II",
        "Investor Profile": "Aggressive",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "126",
        "Life Stage": "Married with grown up child",
        "City": "Tier III",
        "Investor Profile": "Conservative",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "126",
        "Life Stage": "Married with grown up child",
        "City": "Tier III",
        "Investor Profile": "Balanced",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    },
    {
        "S.no": "127",
        "Life Stage": "Married with grown up child",
        "City": "Tier III",
        "Investor Profile": "Aggressive",
        "Need": "Protection",
        "Product 1": "Online Term",
        "Product 2": "Online Income Protect",
        "": ""
    }
];

*/