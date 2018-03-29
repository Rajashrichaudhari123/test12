/**
 * dropdown.js
 * @author CloudPact Technologies
 * @description : This script is used for select box dropdowns.
 **/

var applicationNumber, isFromBI = true,
    eventData;
var info = {
    "plan": "Reliance Endowment Plan",
    "name": "Neha Nigam",
    "custid": "282937393"
};

$m.juci.addDataset("checkaadharLa", "");
$m.juci.addDataset("checkaadharPR", "");
$m.juci.addDataset("AadharData", "");
$m.juci.addDataset("AadharPr_Data", "");
$m.juci.addDataset("app_number", "info");
$m.juci.addDataset("proposaldetails", info);
$m.juci.dataset("LA_Check_Premium", "");

var obj = {
	languages :[
		"English",
		"Tamil",
		"Hindi",
		"Telugu",
		"Marathi"
		],
    salutation: [{
        "LA_CODE": "DR",
        "Description": "Dr"
    }, {
        "LA_CODE": "M/S",
        "Description": "M/s"
    }, {
        "LA_CODE": "MISS",
        "Description": "Miss"
    }, {
        "LA_CODE": "MR",
        "Description": "Mr"
    }, {
        "LA_CODE": "MRS",
        "Description": "Mrs"
    }, {
        "LA_CODE": "MS",
        "Description": "Ms"
    }, {
        "LA_CODE": "PROF",
        "Description": "Prof"
    }, {
        "LA_CODE": "RT HON",
        "Description": "Rt Hon"
    }, {
        "LA_CODE": "SIR",
        "Description": "Sir"
    }],
    maritalStatus: [{
        "LA_CODE": "D",
        "Description": "Divorced"
    }, {
        "LA_CODE": "M",
        "Description": "Married"
    }, {
        "LA_CODE": "S",
        "Description": "Single"
    }, {
        "LA_CODE": "W",
        "Description": "Widowed"
    },{
        "LA_CODE": "O",
        "Description": "Others"
    }],
    occupationSTypeOptions:[{
        "LA_CODE": "PS",
        "Description": "Private Sector"
    }, {
        "LA_CODE": "PUS",
        "Description": "Public Sector"
    }, {
        "LA_CODE": "GS",
        "Description": "Government Sector"
    }],
    occupationOTypeOptions:[{
        "LA_CODE": "Pro",
        "Description": "Professional"
    }, {
        "LA_CODE": "SE",
        "Description": "Self Employed"
    }, {
        "LA_CODE": "RET",
        "Description": "Retired"
    },{
        "LA_CODE": "STU",
        "Description": "Student"
    }],
    femaleOccupationOTypeOptions:[{
        "LA_CODE": "Pro",
        "Description": "Professional"
    }, {
        "LA_CODE": "SE",
        "Description": "Self Employed"
    }, {
        "LA_CODE": "RET",
        "Description": "Retired"
    },{
        "LA_CODE": "HW",
        "Description": "Housewife"
    },{
        "LA_CODE": "STU",
        "Description": "Student"
    }],
    occupationtype :[{
    	"LA_CODE": "S",
        "Description": "S-Service"
    },{
    	"LA_CODE": "B",
        "Description": "B-Business"
    },{
    	"LA_CODE": "o",
        "Description": "O-Others"
    },{
    	"LA_CODE": "x",
        "Description": "X-Not Categorized"
    }],
    IdProofs:[{
    	"LA_CODE": "PP",
    	"Description": "Passport"
    }, {
        "LA_CODE": "DL",
        "Description": "Driving License"
    }, {
        "LA_CODE": "UID",
        "Description": "UID (Aadhar)"
    }, {
        "LA_CODE": "VI",
        "Description": "Voter ID"
    },{
        "LA_CODE": "PC",
        "Description": "PAN card"
    },{
        "LA_CODE": "JC",
        "Description": "NREGA Job Card"
    },{
        "LA_CODE": "Others",
        "Description": "Others (any document notified by Central Govt)"
    },{
        "LA_CODE": "SMA",
        "Description": "Simplified Measures Account"
    }],
    purposeOfInsurance: ["Financial safety for family","Life Cover ","Tax Savings Savings for Child education / Marriage ","Retirement Planning"],
    sourceofIncome: ["Business","Salaried","Rental / Interest Income","Pension","Agricultural Income","Income from self employment","Property Sales / Other Capital Gain","Savings (FD)"],
    education: [{
        "LA_CODE": "BL10",
        "Description": "Below 10th Standard"
    }, {
        "LA_CODE": "DIPL",
        "Description": "Diploma After 10th Standard"
    }, {
        "LA_CODE": "GRAD",
        "Description": "Graduate"
    }, {
        "LA_CODE": "ILLT",
        "Description": "Illiterate"
    }, {
        "LA_CODE": "OTHR",
        "Description": "Others"
    }, {
        "LA_CODE": "PLS2",
        "Description": "Plus Two 10+2"
    }, {
        "LA_CODE": "PGRA",
        "Description": "Post Graduate"
    }, {
        "LA_CODE": "SSLC",
        "Description": "SSLC 10th Standard"
    }],
    occupation: [{
        "LA_CODE": "AGRI",
        "Description": "Agriculture"
    }, {
        "LA_CODE": "ATQD",
        "Description": "Antique Dealer"
    }, {
        "LA_CODE": "ARMF",
        "Description": "Armed Forces"
    }, {
        "LA_CODE": "BUSI",
        "Description": "Business"
    }, {
        "LA_CODE": "DMDT",
        "Description": "Diamond Trader"
    }, {
        "LA_CODE": "FARM",
        "Description": "Farmer"
    }, {
        "LA_CODE": "JWLD",
        "Description": "Jewellery Dealer"
    }, {
        "LA_CODE": "LABO",
        "Description": "Labour"
    }, {
        "LA_CODE": "LNDL",
        "Description": "Landlord"
    }, {
        "LA_CODE": "MCOP",
        "Description": "Machine Operator"
    }, {
        "LA_CODE": "OTHR",
        "Description": "Other"
    }, {
        "LA_CODE": "PEXP",
        "Description": "Politically Exposed Person"
    }, {
        "LA_CODE": "PROF",
        "Description": "Professional"
    }, {
        "LA_CODE": "SALR",
        "Description": "Salaried"
    }, {
        "LA_CODE": "SELF",
        "Description": "Self Employed"
    }, {
        "LA_CODE": "STUD",
        "Description": "Student"
    }, {
        "LA_CODE": "UNEM",
        "Description": "Unemployed"
    }, {
        "LA_CODE": "WCOM",
        "Description": "Working In Coal Mines"
    }],
    femaleOccupation: [{
        "LA_CODE": "AGRI",
        "Description": "Agriculture"
    }, {
        "LA_CODE": "ATQD",
        "Description": "Antique Dealer"
    }, {
        "LA_CODE": "ARMF",
        "Description": "Armed Forces"
    }, {
        "LA_CODE": "BUSI",
        "Description": "Business"
    }, {
        "LA_CODE": "DMDT",
        "Description": "Diamond Trader"
    }, {
        "LA_CODE": "FARM",
        "Description": "Farmer"
    }, {
        "LA_CODE": "HSWF",
        "Description": "House Wife"
    }, {
        "LA_CODE": "HWHI",
        "Description": "House Wife with High Income"
    }, {
        "LA_CODE": "JWLD",
        "Description": "Jewellery Dealer"
    }, {
        "LA_CODE": "LABO",
        "Description": "Labour"
    }, {
        "LA_CODE": "LNDL",
        "Description": "Landlord"
    }, {
        "LA_CODE": "MCOP",
        "Description": "Machine Operator"
    }, {
        "LA_CODE": "OTHR",
        "Description": "Other"
    }, {
        "LA_CODE": "PEXP",
        "Description": "Politically Exposed Person"
    }, {
        "LA_CODE": "PROF",
        "Description": "Professional"
    }, {
        "LA_CODE": "SALR",
        "Description": "Salaried"
    }, {
        "LA_CODE": "SELF",
        "Description": "Self Employed"
    }, {
        "LA_CODE": "STUD",
        "Description": "Student"
    }, {
        "LA_CODE": "UNEM",
        "Description": "Unemployed"
    }, {
        "LA_CODE": "WCOM",
        "Description": "Working In Coal Mines"
    }],
    state: [
        "ANDAMAN AND NICOBAR ISLANDS",
		"ANDHRA PRADESH",
		"ARUNACHAL PRADESH",
		"ASSAM",
		"BIHAR",
		"CHHATTISGARH",
		"CHANDIGARH",
		"DAMAN AND DIU",
		"DADRA AND NAGAR HAVELI",
		"DELHI",
		"GOA",
		"GUJARAT",
		"HIMACHAL PRADESH",
		"HARYANA",
		"JHARKHAND",
		"JAMMU AND KASHMIR",
		"KARNATAKA",
		"KERALA",
		"LAKSHADWEEP",
		"MAHARASHTRA",
		"MEGHALAYA",
		"MANIPUR",
		"MADHYA PRADESH",
		"MIZORAM",
		"NAGALAND",
		"ODISHA",
		"PUNJAB",
		"PONDICHERRY",
		"RAJASTHAN",
		"SIKKIM",
		"TELANGANA",
		"TAMIL NADU",
		"TRIPURA",
		"UTTARAKHAND",
		"UTTAR PRADESH",
		"UTTARANCHAL",
		"WEST BENGAL"
    ],
    relationOfTheProposer: [{
        "LA_CODE": "AU",
        "Description": "Aunt to L.A"
    }, {
        "LA_CODE": "BR",
        "Description": "Brother to L.A"
    }, {
        "LA_CODE": "DA",
        "Description": "Daughter"
    }, {
        "LA_CODE": "EM",
        "Description": "Employer to L.A"
    }, {
        "LA_CODE": "FA",
        "Description": "Father - to L.A"
    }, {
        "LA_CODE": "GA",
        "Description": "Grand Father"
    }, {
        "LA_CODE": "GM",
        "Description": "Grand mother to L.A"
    }, {
        "LA_CODE": "GU",
        "Description": "Guardian"
    }, {
        "LA_CODE": "HO",
        "Description": "Husband to L.A"
    }, {
        "LA_CODE": "HU",
        "Description": "Hindu undivided family"
    }, {
        "LA_CODE": "MO",
        "Description": "Mother to L.A"
    }, {
        "LA_CODE": "OT",
        "Description": "Others"
    }, {
        "LA_CODE": "SE",
        "Description": "Self"
    }, {
        "LA_CODE": "SO",
        "Description": "Son"
    }, {
        "LA_CODE": "SR",
        "Description": "Sister to L.A"
    }, {
        "LA_CODE": "UN",
        "Description": "Uncle to L.A"
    }, {
        "LA_CODE": "WI",
        "Description": "Wife"
    }],
    
    
    ProposerMale:[
    	

    {
        "LA_CODE": "BR",
        "Description": "Brother to L.A"
    },  {
        "LA_CODE": "EM",
        "Description": "Employer to L.A"
    }, {
        "LA_CODE": "FA",
        "Description": "Father - to L.A"
    }, {
        "LA_CODE": "GA",
        "Description": "Grand Father"
    },
    {
        "LA_CODE": "GU",
        "Description": "Guardian"
    }, {
        "LA_CODE": "HO",
        "Description": "Husband to L.A"
    }, {
        "LA_CODE": "HU",
        "Description": "Hindu undivided family"
    },  {
        "LA_CODE": "OT",
        "Description": "Others"
    }, {
        "LA_CODE": "SE",
        "Description": "Self"
    }, {
        "LA_CODE": "SO",
        "Description": "Son"
    },  {
        "LA_CODE": "UN",
        "Description": "Uncle to L.A"
    }
    	],
    
    ProposerFemale :[
    	{
        "LA_CODE": "AU",
        "Description": "Aunt to L.A"
    },  {
        "LA_CODE": "DA",
        "Description": "Daughter"
    }, {
        "LA_CODE": "EM",
        "Description": "Employer to L.A"
    },  {
        "LA_CODE": "GM",
        "Description": "Grand mother to L.A"
    }, {
        "LA_CODE": "GU",
        "Description": "Guardian"
    },  {
        "LA_CODE": "HU",
        "Description": "Hindu undivided family"
    }, {
        "LA_CODE": "MO",
        "Description": "Mother to L.A"
    }, {
        "LA_CODE": "OT",
        "Description": "Others"
    }, {
        "LA_CODE": "SE",
        "Description": "Self"
    },  
    
    {"LA_CODE": "SR",
        "Description": "Sister to L.A"
    },  {
        "LA_CODE": "WI",
        "Description": "Wife"
    }
    	
    	
    	],
	LifeAnnuityGuaranteedFor : 
	[{
		//"LA_CODE": "5",
		"Description":"5 years"
	},
	{
		//"LA_CODE": "10",
		"Description":"10 years"
	},
	{
		//"LA_CODE": "15",
		"Description":"15 years and payable for life thereafter"
	}
  ],
	AnnuityPayoutMode :		
	[{
		//"LA_CODE": "01",
		"Description":"Annual"
	},
	{
		//"LA_CODE": "02",
		"Description":"Half Yearly"
	},
	{
		//"LA_CODE": "04",
		"Description":"Quarterly"
	},
	{
		//"LA_CODE": "12",
		"Description":"Monthly"
	}],
	AnnuityPaymentsBy :	
	[{
		//"LA_CODE": "Post Dated Cheques",
		"Description":"Post Dated Cheques"
	},
	{
		//"LA_CODE": "Credit to your Saving Bank A/c",
		"Description":"Credit to your Saving Bank A/c"
	}],
	AnnuityPayoutOption : 
	[{
		//"LA_CODE": "Y",
		"Description":"Life Annuity with return of purchase price"
	},
	{
		//"LA_CODE": "Y",
		"Description":"Life Annuity"
	}],

    relationOfTheNominee: [{
        "LA_CODE": "AU",
        "Description": "Aunty"
    }, {
        "LA_CODE": "BF",
        "Description": "Banker/Financier"
    }, {
        "LA_CODE": "BU",
        "Description": "Business"
    }, {
        "LA_CODE": "BR",
        "Description": "Brother"
    }, {
        "LA_CODE": "BL",
        "Description": "Brother-in-law"
    }, {
        "LA_CODE": "CB",
        "Description": "Cousin Brother"
    }, {
        "LA_CODE": "CS",
        "Description": "Cousin Sister"
    }, {
        "LA_CODE": "DA",
        "Description": "Daughter"
    }, {
        "LA_CODE": "DL",
        "Description": "Daughter-in-law"
    }, {
        "LA_CODE": "EX",
        "Description": "Executor"
    }, {
        "LA_CODE": "FI",
        "Description": "Fiancee"
    }, {
        "LA_CODE": "FR",
        "Description": "Friend"
    }, {
        "LA_CODE": "FA",
        "Description": "Father"
    }, {
        "LA_CODE": "FL",
        "Description": "Father-in-law"
    },  {
        "LA_CODE": "GF",
        "Description": "Grand Father"
    }, {
        "LA_CODE": "GM",
        "Description": "Grand Mother"
    }, {
        "LA_CODE": "HU",
        "Description": "Husband"
    }, {
        "LA_CODE": "MO",
        "Description": "Mother"
    }, {
        "LA_CODE": "ML",
        "Description": "Mother-in-law"
    }, {
        "LA_CODE": "NM",
        "Description": "Not Mentioned"
    }, {
        "LA_CODE": "NE",
        "Description": "Nephew"
    }, {
        "LA_CODE": "NI",
        "Description": "Niece"
    }, {
        "LA_CODE": "OT",
        "Description": "Others"
    }, {
        "LA_CODE": "SO",
        "Description": "Son"
    }, {
        "LA_CODE": "SP",
        "Description": "Spouse"
    }, {
        "LA_CODE": "SI",
        "Description": "Sister"
    }, {
        "LA_CODE": "SL",
        "Description": "Sister-in-law"
    }, {
        "LA_CODE": "SW",
        "Description": "Son-in-law"
    }, {
        "LA_CODE": "SM",
        "Description": "Stepmother"
    }, {
        "LA_CODE": "SS",
        "Description": "Stepson"
    }, {
        "LA_CODE": "TR",
        "Description": "Trustee"
    }, {
        "LA_CODE": "UN",
        "Description": "Uncle"
    }, {
        "LA_CODE": "WI",
        "Description": "Wife"
    }],
    appointeeRelationship: [{
        "LA_CODE": "AU",
        "Description": "Aunty"
    }, {
        "LA_CODE": "BF",
        "Description": "Banker/Financier"
    }, {
        "LA_CODE": "BU",
        "Description": "Business"
    }, {
        "LA_CODE": "BR",
        "Description": "Brother"
    }, {
        "LA_CODE": "BL",
        "Description": "Brother-in-law"
    }, {
        "LA_CODE": "CB",
        "Description": "Cousin Brother"
    }, {
        "LA_CODE": "CS",
        "Description": "Cousin Sister"
    }, {
        "LA_CODE": "DA",
        "Description": "Daughter"
    }, {
        "LA_CODE": "DL",
        "Description": "Daughter-in-law"
    }, {
        "LA_CODE": "EX",
        "Description": "Executor"
    }, {
        "LA_CODE": "FI",
        "Description": "Fiancee"
    }, {
        "LA_CODE": "FR",
        "Description": "Friend"
    }, {
        "LA_CODE": "FA",
        "Description": "Father"
    }, {
        "LA_CODE": "FL",
        "Description": "Father-in-law"
    }, {
        "LA_CODE": "GF",
        "Description": "Grand Father"
    }, {
        "LA_CODE": "GM",
        "Description": "Grand Mother"
    }, {
        "LA_CODE": "HU",
        "Description": "Husband"
    }, {
        "LA_CODE": "MO",
        "Description": "Mother"
    }, {
        "LA_CODE": "ML",
        "Description": "Mother-in-law"
    }, {
        "LA_CODE": "NM",
        "Description": "Not Mentioned"
    }, {
        "LA_CODE": "NE",
        "Description": "Nephew"
    }, {
        "LA_CODE": "NI",
        "Description": "Niece"
    }, {
        "LA_CODE": "OT",
        "Description": "Others"
    }, {
        "LA_CODE": "SO",
        "Description": "Son"
    }, {
        "LA_CODE": "SP",
        "Description": "Spouse"
    }, {
        "LA_CODE": "SI",
        "Description": "Sister"
    }, {
        "LA_CODE": "SL",
        "Description": "Sister-in-law"
    }, {
        "LA_CODE": "SW",
        "Description": "Son-in-law"
    }, {
        "LA_CODE": "SM",
        "Description": "Stepmother"
    }, {
        "LA_CODE": "SS",
        "Description": "Stepson"
    }, {
        "LA_CODE": "TR",
        "Description": "Trustee"
    }, {
        "LA_CODE": "UN",
        "Description": "Uncle"
    }, {
        "LA_CODE": "WI",
        "Description": "Wife"
    }],
    companyName: [{
        "LA_CODE": "BSL",
        "Description": "Birla sun life"
    }, {
        "LA_CODE": "HDF",
        "Description": "HDFC standard life"
    }, {
        "LA_CODE": "ICI",
        "Description": "ICICI Prudential Life"
    }, {
        "LA_CODE": "LIC",
        "Description": "Life Ins corp of India"
    }, {
        "LA_CODE": "MNY",
        "Description": "Max new york life"
    }, {
        "LA_CODE": "OTHR",
        "Description": "Others"
    }, {
        "LA_CODE": "RLI",
        "Description": "RLIC"
    }],
    familyMember: [{
        "LA_CODE": "AU",
        "Description": "Aunt"
    }, {
        "LA_CODE": "BR",
        "Description": "Brother"
    }, {
        "LA_CODE": "DA",
        "Description": "Daughter"
    }, {
        "LA_CODE": "FA",
        "Description": "Father"
    }, {
        "LA_CODE": "GM",
        "Description": "Grand mother"
    }, {
        "LA_CODE": "GA",
        "Description": "Grand Father"
    }, {
        "LA_CODE": "GU",
        "Description": "Guardian"
    }, {
        "LA_CODE": "HO",
        "Description": "Husband"
    }, {
        "LA_CODE": "MO",
        "Description": "Mother"
    }, {
        "LA_CODE": "OT",
        "Description": "Others"
    }, {
        "LA_CODE": "SE",
        "Description": "Self"
    }, {
        "LA_CODE": "SR",
        "Description": "Sister"
    }, {
        "LA_CODE": "SO",
        "Description": "Son"
    }, {
        "LA_CODE": "UN",
        "Description": "Uncle"
    }, {
        "LA_CODE": "WI",
        "Description": "Wife"
    }],
    Idproof: [{
        "idvalue": "Pan Card"
    }, {
        "idvalue": "Aadhar Card"
    }, ],
    causeOfDeath: [{
        "LA_CODE": "ACC",
        "Description": "Accident"
    }, {
        "LA_CODE": "BHS",
        "Description": "Brain Hemorage / Stroke"
    }, {
        "LA_CODE": "CNT ",
        "Description": "Cancer / Tumour"
    }, {
        "LA_CODE": "DM",
        "Description": "Diabetes"
    }, {
        "LA_CODE": "HA",
        "Description": "Heart Attack / By Pass Surgery"
    }, {
        "LA_CODE": "HTN",
        "Description": "Hypertension & Blood Pressure"
    }, {
        "LA_CODE": "LIV",
        "Description": "Liver Sirossis"
    }, {
        "LA_CODE": "ND",
        "Description": "Natural Death / Normal death"
    }, {
        "LA_CODE": "OTH",
        "Description": "Other Ailments"
    }, {
        "LA_CODE": "SNB",
        "Description": "Snake Bite"
    }, {
        "LA_CODE": "SUC",
        "Description": "Suicide"
    }],
    presentStatus: [{
        "LA_CODE": "DC",
        "Description": "Decline"
    }, {
        "LA_CODE": "PO",
        "Description": "Postpone"
    }, {
        "LA_CODE": "PR",
        "Description": "Rated Up"
    }, {
        "LA_CODE": "RJ",
        "Description": "Reject"
    }, {
        "LA_CODE": "IF",
        "Description": "In Force"
    }, {
        "LA_CODE": "LA",
        "Description": "Lapsed"
    }, {
        "LA_CODE": "PS",
        "Description": "Applied"
    }],
    hazardousMaster: [
        "Working Of Heights",
        "Working Underground",
        "Working In Mines",
        "Offshore/Oil and natural gas",
        "Using Explosives",
        "Flying other than as a fare-paying passenger",
        "Diving",
        "Mountaineering",
        "Any other hazardous avocation/occuapation"
    ],
    purposeOfVisit: [{
        "LA_CODE": "HS",
        "Description": "Higher Studies"
    }, {
        "LA_CODE": "NA",
        "Description": "No Details"
    }, {
        "LA_CODE": "OFF",
        "Description": "Official"
    }, {
        "LA_CODE": "PRO",
        "Description": "Project Work"
    }, {
        "LA_CODE": "RES",
        "Description": "Resident of the Country"
    }, {
        "LA_CODE": "VAC",
        "Description": "Personal Vacation"
    }],
    durationOfVisit: [{
        "LA_CODE": "ONE",
        "Description": "Less than 1 year"
    }, {
        "LA_CODE": "TH",
        "Description": "More than 2 years"
    }, {
        "LA_CODE": "TW",
        "Description": "1 to 2 years"
    }],
    medicalInvestigation: [
        "Medical or specialized examination",
        "consultation",
        "Hospitalization",
        "Surgery"
    ],

    medicalAilments: [
        "Diabetes",
        "Respiratory disease(including asthma)",
        "Tuberculosis",
        "Cancer",
        "HIV AIDS or a related infection",
        "High blood pressure",
        "Depression",
        "Kidney Disease",
        "Pain or problems in the back, spine, muscles or joint",
        "Liver Disease",
        "Congenital Birth Defects",
        "Stroke",
        "Severe injury",
        "Any blood disorder",
        "Arthritis, gout",
        "Hepatitis B",
        "Any Other physical disability",
        "Heart Problems"
    ],

    bankAccountProof: [{
        "LA_CODE": "CANCHQ",
        "Description": "Cancelled Cheque"
    }, {
        "LA_CODE": "PASSCPY",
        "Description": "Passbook Copy"
    }],

    nationality: [{
        "LA_CODE": "IND",
        "Description": "Indian",
    }, {
        "LA_CODE": "NRI",
        "Description": "NRI",
    }, {
        "LA_CODE": "OTHR",
        "Description": "Others"
    }],
    Dec_nationality : ["Indian","NRI","Others"],
    citizenship:[{
    	"LA_CODE": "IND",
        "Description": "Indian",
    }, {
    	"LA_CODE": "OTHR",
        "Description": "Others"
    }],
    resendentialStatus :[{
    	"LA_CODE": "RI",
        "Description": "Resident Individual",
    },{
    	"LA_CODE": "NRI",
        "Description": "Non Resident Indian",
    },{
    	"LA_CODE": "FN",
        "Description": "Foreign National",
    },{
    	"LA_CODE": "PIO",
        "Description": "Person of Indian Origin",
    }],
    countryList: [{
        "LA_CODE": "A",
        "Description": "Austria"
    }, {
        "LA_CODE": "ADN",
        "Description": "Yemen"
    }, {
        "LA_CODE": "AFG",
        "Description": "Afghanistan"
    }, {
        "LA_CODE": "AL",
        "Description": "Albania"
    }, {
        "LA_CODE": "AND",
        "Description": "Andorra"
    }, {
        "LA_CODE": "AUS",
        "Description": "Australia"
    }, {
        "LA_CODE": "B",
        "Description": "Belgium"
    }, {
        "LA_CODE": "BD",
        "Description": "Bangladesh"
    }, {
        "LA_CODE": "BDS",
        "Description": "Barbados"
    }, {
        "LA_CODE": "BG",
        "Description": "Bulgaria"
    }, {
        "LA_CODE": "BH",
        "Description": "Belize"
    }, {
        "LA_CODE": "BOL",
        "Description": "Bolivia"
    }, {
        "LA_CODE": "BR",
        "Description": "Brazil"
    }, {
        "LA_CODE": "BRN",
        "Description": "Bahrain"
    }, {
        "LA_CODE": "BS",
        "Description": "Bahamas"
    }, {
        "LA_CODE": "BUR",
        "Description": "Myanmar (Burma)"
    }, {
        "LA_CODE": "BY",
        "Description": "Belorussia"
    }, {
        "LA_CODE": "C",
        "Description": "Cuba"
    }, {
        "LA_CODE": "CDN",
        "Description": "Canada"
    }, {
        "LA_CODE": "CH",
        "Description": "Switzerland"
    }, {
        "LA_CODE": "CI",
        "Description": "Ivory Coast"
    }, {
        "LA_CODE": "CL",
        "Description": "Sri Lanka"
    }, {
        "LA_CODE": "CO",
        "Description": "Colombia"
    }, {
        "LA_CODE": "CR",
        "Description": "Costa Rica"
    }, {
        "LA_CODE": "CY",
        "Description": "Cyprus"
    }, {
        "LA_CODE": "CZ",
        "Description": "Czech Republic"
    }, {
        "LA_CODE": "D",
        "Description": "Germany"
    }, {
        "LA_CODE": "DK",
        "Description": "Denmark"
    }, {
        "LA_CODE": "DOM",
        "Description": "Dominican Republic"
    }, {
        "LA_CODE": "DY",
        "Description": "Benin"
    }, {
        "LA_CODE": "DZ",
        "Description": "Algeria"
    }, {
        "LA_CODE": "E",
        "Description": "Spain"
    }, {
        "LA_CODE": "EAK",
        "Description": "Kenya"
    }, {
        "LA_CODE": "EAT",
        "Description": "Tanzania"
    }, {
        "LA_CODE": "EAU",
        "Description": "Uganda"
    }, {
        "LA_CODE": "EC",
        "Description": "Ecuador"
    }, {
        "LA_CODE": "ES",
        "Description": "El Salvador"
    }, {
        "LA_CODE": "ET",
        "Description": "Egypt"
    }, {
        "LA_CODE": "ETH",
        "Description": "Ethiopia"
    }, {
        "LA_CODE": "EW",
        "Description": "Estonia"
    }, {
        "LA_CODE": "F",
        "Description": "France"
    }, {
        "LA_CODE": "FIN",
        "Description": "Finland"
    }, {
        "LA_CODE": "FJI",
        "Description": "Fiji"
    }, {
        "LA_CODE": "FL",
        "Description": "Liechtenstein"
    }, {
        "LA_CODE": "FR",
        "Description": "Faroe Island"
    }, {
        "LA_CODE": "GB",
        "Description": "Great Britain"
    }, {
        "LA_CODE": "GBA",
        "Description": "Alderney (Channel Islands)"
    }, {
        "LA_CODE": "GBG",
        "Description": "Guernsey (Channel Islands)"
    }, {
        "LA_CODE": "GBJ",
        "Description": "Jersey (Channel Islands)"
    }, {
        "LA_CODE": "GBM",
        "Description": "Isle of Man"
    }, {
        "LA_CODE": "GBZ",
        "Description": "Gibraltar"
    }, {
        "LA_CODE": "GCA",
        "Description": "Guatemala"
    }, {
        "LA_CODE": "GH",
        "Description": "Ghana"
    }, {
        "LA_CODE": "GR",
        "Description": "Greece"
    }, {
        "LA_CODE": "GUY",
        "Description": "Guyana"
    }, {
        "LA_CODE": "H",
        "Description": "Hungary"
    }, {
        "LA_CODE": "HK",
        "Description": "Hong Kong"
    }, {
        "LA_CODE": "HR",
        "Description": "Croatia"
    }, {
        "LA_CODE": "I",
        "Description": "Italy"
    }, {
        "LA_CODE": "IL",
        "Description": "Israel"
    }, {
        "LA_CODE": "IND",
        "Description": "India"
    }, {
        "LA_CODE": "IR",
        "Description": "Iran"
    }, {
        "LA_CODE": "IRL",
        "Description": "Ireland"
    }, {
        "LA_CODE": "IRQ",
        "Description": "Iraq"
    }, {
        "LA_CODE": "IS",
        "Description": "Iceland"
    }, {
        "LA_CODE": "J",
        "Description": "Japan"
    }, {
        "LA_CODE": "JA",
        "Description": "Jamaica"
    }, {
        "LA_CODE": "JOR",
        "Description": "Jordan"
    }, {
        "LA_CODE": "K",
        "Description": "Cambodia"
    }, {
        "LA_CODE": "KWT",
        "Description": "Kuwait"
    }, {
        "LA_CODE": "L",
        "Description": "Luxembourg"
    }, {
        "LA_CODE": "LAO",
        "Description": "Laos"
    }, {
        "LA_CODE": "LAR",
        "Description": "Libya"
    }, {
        "LA_CODE": "LS",
        "Description": "Lesotho"
    }, {
        "LA_CODE": "LT",
        "Description": "Lithuania"
    }, {
        "LA_CODE": "LV",
        "Description": "Latvia"
    }, {
        "LA_CODE": "M",
        "Description": "Malta"
    }, {
        "LA_CODE": "MA",
        "Description": "Morocco"
    }, {
        "LA_CODE": "MAL",
        "Description": "Malaysia"
    }, {
        "LA_CODE": "MC",
        "Description": "Monaco"
    }, {
        "LA_CODE": "MEX",
        "Description": "Mexico"
    }, {
        "LA_CODE": "MK",
        "Description": "Macedonia"
    }, {
        "LA_CODE": "MS",
        "Description": "Mauritius"
    }, {
        "LA_CODE": "MW",
        "Description": "Malawi"
    }, {
        "LA_CODE": "N",
        "Description": "Norway"
    }, {
        "LA_CODE": "NA",
        "Description": "Netherlands Antilles"
    }, {
        "LA_CODE": "NEP",
        "Description": "NEPAL"
    }, {
        "LA_CODE": "NIC",
        "Description": "Nicaragua"
    }, {
        "LA_CODE": "NL",
        "Description": "Netherlands"
    }, {
        "LA_CODE": "NRI",
        "Description": "Non Resident India"
    }, {
        "LA_CODE": "NZ",
        "Description": "New Zealand"
    }, {
        "LA_CODE": "P",
        "Description": "Portugal"
    }, {
        "LA_CODE": "PA",
        "Description": "Panama"
    }, {
        "LA_CODE": "PE",
        "Description": "Peru"
    }, {
        "LA_CODE": "PK",
        "Description": "Pakistan"
    }, {
        "LA_CODE": "PL",
        "Description": "Poland"
    }, {
        "LA_CODE": "PY",
        "Description": "Paraguay"
    }, {
        "LA_CODE": "RA",
        "Description": "Argentina"
    }, {
        "LA_CODE": "RB",
        "Description": "Botswana"
    }, {
        "LA_CODE": "RCA",
        "Description": "Central African Republic"
    }, {
        "LA_CODE": "RCB",
        "Description": "Congo"
    }, {
        "LA_CODE": "RCH",
        "Description": "Chile"
    }, {
        "LA_CODE": "RH",
        "Description": "Haiti"
    }, {
        "LA_CODE": "RI",
        "Description": "Indonesia"
    }, {
        "LA_CODE": "RIM",
        "Description": "Mauritania"
    }, {
        "LA_CODE": "RL",
        "Description": "Lebanon"
    }, {
        "LA_CODE": "RM",
        "Description": "Madagascar"
    }, {
        "LA_CODE": "RMM",
        "Description": "Mali"
    }, {
        "LA_CODE": "RN",
        "Description": "Niger"
    }, {
        "LA_CODE": "RO",
        "Description": "Romania"
    }, {
        "LA_CODE": "ROK",
        "Description": "Republic of Korea"
    }, {
        "LA_CODE": "ROU",
        "Description": "Uruguay"
    }, {
        "LA_CODE": "RP",
        "Description": "Philippines"
    }, {
        "LA_CODE": "RSM",
        "Description": "San Marino"
    }, {
        "LA_CODE": "RUS",
        "Description": "Russia"
    }, {
        "LA_CODE": "RWA",
        "Description": "Rwanda"
    }, {
        "LA_CODE": "S",
        "Description": "Sweden"
    }, {
        "LA_CODE": "SD",
        "Description": "Swaziland"
    }, {
        "LA_CODE": "SGP",
        "Description": "Singapore"
    }, {
        "LA_CODE": "SK",
        "Description": "Slovakia"
    }, {
        "LA_CODE": "SME",
        "Description": "Surinam"
    }, {
        "LA_CODE": "SN",
        "Description": "Senegal"
    }, {
        "LA_CODE": "SP",
        "Description": "Somalia"
    }, {
        "LA_CODE": "SY",
        "Description": "Seychelles"
    }, {
        "LA_CODE": "SYR",
        "Description": "Syria"
    }, {
        "LA_CODE": "T",
        "Description": "Thailand"
    }, {
        "LA_CODE": "TAI",
        "Description": "Taiwan"
    }, {
        "LA_CODE": "TBT",
        "Description": "Tibet - ROC"
    }, {
        "LA_CODE": "TG",
        "Description": "Togo"
    }, {
        "LA_CODE": "TMN",
        "Description": "Turkmenistan"
    }, {
        "LA_CODE": "TN",
        "Description": "Tunisia"
    }, {
        "LA_CODE": "TR",
        "Description": "Turkey"
    }, {
        "LA_CODE": "TT",
        "Description": "Trinidad & Tobago"
    }, {
        "LA_CODE": "UA",
        "Description": "Ukraine"
    }, {
        "LA_CODE": "USA",
        "Description": "United States of America"
    }, {
        "LA_CODE": "V",
        "Description": "Vatican City"
    }, {
        "LA_CODE": "VAE",
        "Description": "United Arab Emirates"
    }, {
        "LA_CODE": "VN",
        "Description": "Vietnam"
    }, {
        "LA_CODE": "WAG",
        "Description": "The Gambia"
    }, {
        "LA_CODE": "WAL",
        "Description": "Sierra Leone"
    }, {
        "LA_CODE": "WAN",
        "Description": "Nigeria"
    }, {
        "LA_CODE": "WD",
        "Description": "Dominica"
    }, {
        "LA_CODE": "WG",
        "Description": "Grenada"
    }, {
        "LA_CODE": "WS",
        "Description": "Samoa"
    }, {
        "LA_CODE": "YU",
        "Description": "Yugoslavia"
    }, {
        "LA_CODE": "YV",
        "Description": "Venezuela"
    }, {
        "LA_CODE": "Z",
        "Description": "Zambia"
    }, {
        "LA_CODE": "ZA",
        "Description": "South Africa"
    }, {
        "LA_CODE": "ZRE",
        "Description": "Zaïre"
    }, {
        "LA_CODE": "ZW",
        "Description": "Zimbabwe"
    }],
    heightInCm: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8"
    ],

    heightInInches: [
    	"0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11"
    ],
    typeOfIncomeProof: [{
            "LA_CODE": "INC2YRTN",
            "Description": "Last 2 Assessment years Income Tax Returns"
        }, {
            "LA_CODE": "AUPLBST2",
            "Description": "Audited P & L a/c and Balance sheet for the last 2 years and CA certificate detailing Personal Assets"
        }, {
            "LA_CODE": "LASYF16A",
            "Description": "Last 2 Assessment years SARAL OR Form 16 or Form 16 A"
        }, {
            "LA_CODE": "SALAL3MN",
            "Description": "Salary Slips for last 3 months"
        }, {
            "LA_CODE": "LATAPPLT",
            "Description": "Latest Appointment Letter With One Month Salary Slip"
        }, {
            "LA_CODE": "AUCI2CAB",
            "Description": "Audited Computation of Income for last 2 years and CA certificate substantiating the Business"
        }, {
            "LA_CODE": "AUPLBST2",
            "Description": "Audited Profit and Loss a/c and Balance sheets for the last 2 years"
        }, {
            "LA_CODE": "LASYF16A",
            "Description": "Last 2 Assessment years SARAL OR Form 16 or Form 16 A"
        }, {
            "LA_CODE": "SALAL3MN",
            "Description": "Salary Slips for last 3 months/ Salary certificate/ Appointment Letter declaring Income(if recently joined)"
        }, {
            "LA_CODE": "AUCI2CAB",
            "Description": "Audited Computation of Income for last 2 years and CA certified cash flow statement substantiating his business income"
        },
     

    ],
    insuranceRepositoryValue: [{
        "LA_CODE": "CAMS",
        "Description": "CAMS Insurance Repository Services Ltd",
    }, {
        "LA_CODE": "NIPR",
        "Description": "National Insurance-policy Repository",
    }, {
        "LA_CODE": "KIRL",
        "Description": "KARVY Insurance Repository Limited",
    }, {
        "LA_CODE": "CIRL",
        "Description": "Central Insurance Repository Limited",
    }, ],
    habitTypes: [{
        "LA_CODE": "Cigrettes",
        "Description": "Cigarettes"
    }, {
        "LA_CODE": "Beedi",
        "Description": "Beedi"
    }, {
        "LA_CODE": "Chew",
        "Description": "Chew"
    }, {
        "LA_CODE": "Qutka",
        "Description": "Qutka"
    }],
    alcoholTypes: [{
        "LA_CODE": "Beer",
        "Description": "Beer"
    }, {
        "LA_CODE": "Wine",
        "Description": "Wine"
    }, {
        "LA_CODE": "Hard Liquor",
        "Description": "Hard Liquor"
    }],
    ecsOptions: [{
        "LA_CODE": "E",
        "Description": "ECS"
    }, {
        "LA_CODE": "N",
        "Description": "NACH"
    }, {
        "LA_CODE": "D",
        "Description": "DD"
    }]

};

var maleSalutation = [{
    "LA_CODE": "DR",
    "Description": "DR"
}, {
    "LA_CODE": "MR",
    "Description": "MR"
}
//, {
//    "LA_CODE": "PROF",
//    "Description": "PROF"
//}, {
//    "LA_CODE": "REV",
//    "Description": "REV"
//}, {
//    "LA_CODE": "RT HON",
//    "Description": "RT HON"
//}, {
//    "LA_CODE": "SIR",
//    "Description": "SIR"
//}
];

var femaleSalutation = [ {
    "LA_CODE": "DR",
    "Description": "DR"
}
//, {
//    "LA_CODE": "LADY",
//    "Description": "LADY"
//}, {
//    "LA_CODE": "M/S",
//    "Description": "M/S"
//}
, {
    "LA_CODE": "MISS",
    "Description": "MISS"
}, {
    "LA_CODE": "MRS",
    "Description": "MRS"
}, {
    "LA_CODE": "MS",
    "Description": "MS"
}];

var AppointeeMalerelationship = [{
    "LA_CODE": "BL",
    "Description": "Brother-in-law"
}, {
    "LA_CODE": "CB",
    "Description": "Cousin Brother"
}, {
    "LA_CODE": "BR",
    "Description": "Brother"
}, {
    "LA_CODE": "FA",
    "Description": "Father"
}, {
    "LA_CODE": "FL",
    "Description": "Father-in-law"
}, {
    "LA_CODE": "GF",
    "Description": "Grand Father"
},  {
    "LA_CODE": "HU",
    "Description": "Husband"
}, {
    "LA_CODE": "NE",
    "Description": "Nephew"
}, {
    "LA_CODE": "SO",
    "Description": "Son"
},  {
    "LA_CODE": "SW",
    "Description": "Son-in-law"
}, {
    "LA_CODE": "SS",
    "Description": "Stepson"
}, {
    "LA_CODE": "UN",
    "Description": "Uncle"
}, {
    "LA_CODE": "GS",
    "Description": "Grandson"
}];

var AppointeeFemalerelationship = [{
    "LA_CODE": "AU",
    "Description": "Aunty"
}, {
    "LA_CODE": "CS",
    "Description": "Cousin Sister"
}, {
    "LA_CODE": "DA",
    "Description": "Daughter"
}, {
    "LA_CODE": "DL",
    "Description": "Daughter-in-law"
}, {
    "LA_CODE": "FI",
    "Description": "Fiancee"
}, {
    "LA_CODE": "MO",
    "Description": "Mother"
}, {
    "LA_CODE": "GM",
    "Description": "Grand Mother"
}, {
    "LA_CODE": "ML",
    "Description": "Mother-in-law"
}, {
    "LA_CODE": "NI",
    "Description": "Niece"
}, {
    "LA_CODE": "SI",
    "Description": "Sister"
}, {
    "LA_CODE": "SL",
    "Description": "Sister-in-law"
}, {
    "LA_CODE": "SM",
    "Description": "Stepmother"
}, {
    "LA_CODE": "WI",
    "Description": "Wife"
},{
    "LA_CODE": "GD",
    "Description": "Granddaughter"
}];

var inputManagement = {
	LeadType:[{
			"LA_CODE": "REC",
			"Description":"Recruitment"
		},{
			"LA_CODE": "EXCU",
			"Description":"Exisiting Customer"
		},{
			"LA_CODE": "NB",
			"Description":"New Business"
		},{
			"LA_CODE": "RW",
			"Description":"Renewal"
		}],
	LeadSource:[{
			"LA_CODE": "REC",
			"Description":"Recruitment"
		},{
			"LA_CODE": "EXCU",
			"Description":"Exisiting Customer"
		},{
			"LA_CODE": "NB",
			"Description":"New Business"
		},{
			"LA_CODE": "RW",
			"Description":"Renewal"
		}],
	Occupation:[{
		"LA_CODE": "SAL",
		"Description":"Salaried"
		},{
			"LA_CODE": "EMP",
			"Description":"Employed for wages"
		},{
			"LA_CODE": "HM",
			"Description":"Homemaker"
		},{
			"LA_CODE": "STU",
			"Description":"Student"
		},{
			"LA_CODE": "MIL",
			"Description":"Miltary"
		},{
			"LA_CODE": "BUS",
			"Description":"Business"
		},{
			"LA_CODE": "OTHR",
			"Description":"Others"
		}],
	Income:[{
		"LA_CODE": "UPTO3",
		"Description":"Up to 3 Lacs"
		},{
			"LA_CODE": "3T06",
			"Description":"3 Lacs to 6 Lacs"
		},{
			"LA_CODE": "6TO10",
			"Description":"6 Lacs to 10 Lacs"
		},{
			"LA_CODE": "10TO20",
			"Description":"10 Lacs to 20 lacs"
		},{
			"LA_CODE": "20TO50",
			"Description":"20 Lacs to 50 Lacs"
		},{
			"LA_CODE": "10TO20",
			"Description":"Above 50 Lacs"
		}],
	Education:[{
	        "LA_CODE": "BL10",
	        "Description": "Below 10th Standard"
	    }, {
	        "LA_CODE": "DIPL",
	        "Description": "Diploma After 10th Standard"
	    }, {
	        "LA_CODE": "GRAD",
	        "Description": "Graduate"
	    }, {
	        "LA_CODE": "ILLT",
	        "Description": "Illiterate"
	    }, {
	        "LA_CODE": "OTHR",
	        "Description": "Others"
	    }, {
	        "LA_CODE": "PLS2",
	        "Description": "Plus Two 10+2"
	    }, {
	        "LA_CODE": "PGRA",
	        "Description": "Post Graduate"
	    }, {
	        "LA_CODE": "SSLC",
	        "Description": "SSLC 10th Standard"
	    }],
	LeadCategory:[{
			"LA_CODE": "HOT",
			"Description":"Hot"
		},{
			"LA_CODE": "WARM",
			"Description":"Warm"
		},{
			"LA_CODE": "NOTUP",
			"Description":"Not Updated"
		},{
			"LA_CODE": "COLD",
			"Description":"Cold"
		}],
	FlsLeadCategory:[{
			"LA_CODE": "HOT",
			"Description":"Hot"
		},{
			"LA_CODE": "WARM",
			"Description":"Warm"
		},{
			"LA_CODE": "NOTUP",
			"Description":"Not Updated"
		},{
			"LA_CODE": "COLD",
			"Description":"Cold"
		}],
	Dependents:[{
			"LA_CODE": "UPTO2",
			"Description":"Up to 2"
		},{
			"LA_CODE": "3TO5",
			"Description":"3 to 5"
		},{
			"LA_CODE": "MORE5",
			"Description":"More than 5"
	}],
	ActivityType:[{
			"LA_CODE": "EXADV",
			"Description":"Exisiting Advisor"
		},{
			"LA_CODE": "REC",
			"Description":"Recruitment"
		},{
			"LA_CODE": "JOINNB",
			"Description":"Joint Call for NB"
	}],
	activity_data:[{
				"LA_CODE": "JOINNB",
				"Description":"Joint Call for NB"
			},{
				"LA_CODE": "NOJC",
				"Description":"No Joint Call"
		}],
	Meeting:[{
			"LA_CODE": "DONE",
			"Description":"Met"
		},{
			"LA_CODE": "POST",
			"Description":"Not Met"
		}
		],
		Activity_Done:[{
		"LA_CODE": "CON",
			"Description":"Converted"
		},{
			"LA_CODE": "FU",
			"Description":"Follow up"
		},{
			"LA_CODE": "RC",
			"Description":"Renewal Collected"
		},{
			"LA_CODE": "NI",
			"Description":"Not Interested"
	}],
	ActivityDone:[{
		"LA_CODE": "REG",
			"Description":"Regular Activity"
		},{
			"LA_CODE": "DIWALI",
			"Description":"Diwali Milan"
		},{
			"LA_CODE": "TAX",
			"Description":"Tax Dhamaka"
		},{
			"LA_CODE": "HOLI",
			"Description":"Holi Milan"
	},{
			"LA_CODE": "SUPERDAM",
			"Description":"Super Tax Dhamaka"
	}],
	LMSActivityDone:[{
		"LA_CODE": "REG",
		"Description":"Regular Activity"
	}],
//	LeadDisp:[{
//		"LA_CODE": "TOBE",
//		"Description":"To be followed"
//	},{
//		"LA_CODE": "NOT",
//		"Description":"Not Interested"
//	}],
	
	LeadRenewalDisp:[{
		"LA_CODE": "PC",
		"Description":"Payment collected"
	},{
		"LA_CODE": "NOT",
		"Description":"Not Interested"
	},{
		"LA_CODE": "WPL",
		"Description":"Will pay Later"
	},{
		"LA_CODE": "WR",
		"Description":"Wrong Address"
	},{
		"LA_CODE": "CNT",
		"Description":"Customer not available"
	}],
//	LeadDisp:[{
//		"LA_CODE": "PC",
//		"Description":"Payment collected"
//	},{
//		"LA_CODE": "NOT",
//		"Description":"Not Interested"
//	},{
//		"LA_CODE": "WPL",
//		"Description":"Will pay Later"
//	},{
//		"LA_CODE": "WR",
//		"Description":"Wrong Address"
//	},{
//		"LA_CODE": "CNT",
//		"Description":"Customer not available"
//	}],
	renewal_disp : [{
		"LA_CODE": "NC",
		"Description":"Not Contactable"
	},{
		"LA_CODE": "CBL",
		"Description":"Call Back Later"
	}],
	LeadDispForNotInt:[{
		"LA_CODE": "FI",
		"Description":"Financial Issue"
	},
	{
		"LA_CODE": "NCWP",
		"Description":"Not convinced with products"
	},
	{
		"LA_CODE": "OR",
		"Description":"others reasons"
	}],
	LeadDispForConverted:[{
		"LA_CODE": "EAN",
		"Description":"Converted"
	}],
	LeadDispForFollowUp:[{
		"LA_CODE": "FUFC",
		"Description":"Follow up for closures"
	}],
	LeadDispForRenewalCollected:[{
		"LA_CODE": "APP",
		"Description":"Already paid premium"
	},
	{
		"LA_CODE": "ED",
		"Description":"ECS deducted"
	},
	{
		"LA_CODE": "CC",
		"Description":"Cheque collected"
	}],
	Campaign:["Children","Health","Family","Financial","Existing customers","Diwali Mela"],
	MaritalStatus:[
		{"LA_CODE": "D",
        "Description": "Divorced"
    }, {
        "LA_CODE": "M",
        "Description": "Married"
    }, {
        "LA_CODE": "S",
        "Description": "Single"
    }, {
        "LA_CODE": "W",
        "Description": "Widowed"
    },{
        "LA_CODE": "O",
        "Description": "Others"
    }
    ]

};

var dmChannel = {		
	lead_type:[{		
		"LA_CODE": "NM",		
		"Description":"NATURAL MARKETING"		
	},{		
		"LA_CODE": "AF001",		
		"Description":"AFFILIATES"		
	},{		
		"LA_CODE": "AP001",		
		"Description":"APPOINTMENT"		
	},{		
		"LA_CODE": "B001",		
		"Description":"BIU AGENCY UPSELL"		
	},{		
		"LA_CODE": "BR001",		
		"Description":"BRANCH"		
	},{		
		"LA_CODE": "CA001",		
		"Description":"CALL CENTER"		
	},{		
		"LA_CODE": "CLP01",		
		"Description":"CLP"		
	},{		
		"LA_CODE": "CU001",		
		"Description":"CUSTOMER SERVICE"		
	},{		
		"LA_CODE": "HO001",		
		"Description":"HO DATA"		
	},{		
		"LA_CODE": "IV001",		
		"Description":"IVR-CS"		
	},{		
		"LA_CODE": "IVR",		
		"Description":"IVR - CS"		
	},{		
		"LA_CODE": "NA001",		
		"Description":"NATURAL MARKET"		
	},{		
		"LA_CODE": "RF001",		
		"Description":"REFERENCE"		
	},{		
		"LA_CODE": "S001",		
		"Description":"LEAD_REFERRAL"		
	},{		
		"LA_CODE": "S002",		
		"Description":"SELF SOURCED"		
	},{		
		"LA_CODE": "S003",		
		"Description":"LOYALTY CALL CENTER"		
	},{		
		"LA_CODE": "S004",		
		"Description":"CC INBOUND"		
	},{		
		"LA_CODE": "SR001",		
		"Description":"ONLINE ENTRY"		
	},{		
		"LA_CODE": "EDB01",		
		"Description":"Employee discount"		
	},{		
		"LA_CODE": "WEBT01",		
		"Description":"WEBTOKEN"		
	}],	
	IncomeFls:[{
		"LA_CODE": "1",
		"Description":"Less than 2 Lacs"
	},{
		"LA_CODE": "2",
		"Description":"2 to 5 Lacs"
	},{
		"LA_CODE": "3",
		"Description":"5 to 8 Lacs"
	},{
		"LA_CODE": "4",
		"Description":"8 to 10 Lacs"
	},{
		"LA_CODE": "5",
		"Description":"10 to 15 Lacs"
	},{
		"LA_CODE": "6",
		"Description":"15 Lacs or Greater"
	},{
		"LA_CODE": "7",
		"Description":"Not Provided/Captured"
	}],
	OccupationFls:[{
		"LA_CODE": "BUS",
		"Description":"Business"
	},{
		"LA_CODE": "EMP",
		"Description":"Employed for wages"
	},{
		"LA_CODE": "HW",
		"Description":"HOUSE WIFE"
	},{
		"LA_CODE": "MIL",
		"Description":"Miltary"
	},{
		"LA_CODE": "OTH",
		"Description":"OTHER"
	},{
		"LA_CODE": "RET",
		"Description":"Retired"
	},{
		"LA_CODE": "SAL",
		"Description":"SALARIED"
	},{
		"LA_CODE": "STD",
		"Description":"STUDENT"
	}],
	MaritalFls:[{
		"LA_CODE": "S",
		"Description":"SINGLE"
	},{
		"LA_CODE": "M",
		"Description":"MARRIED"
	},{
		"LA_CODE": "X",
		"Description":"SEPERATED"
	},{
		"LA_CODE": "W",
		"Description":"WIDOW/WIDOWER"
	},{
		"LA_CODE": "D",
		"Description":"Divorced"
	},{
		"LA_CODE": "O",
		"Description":"OTHERS"
	}],
	EducationFls:[{
	        "LA_CODE": "BL10",
	        "Description": "Below 10th Standard"
	    }, {
	        "LA_CODE": "DIPL",
	        "Description": "Diploma after 10th standard"
	    }, {
	        "LA_CODE": "GRAD",
	        "Description": "graduate"
	    }, {
	        "LA_CODE": "ILLT",
	        "Description": "illiterate"
	    }, {
	        "LA_CODE": "OTHR",
	        "Description": "others"
	    }, {
	        "LA_CODE": "PLS2",
	        "Description": "plus two 10+2"
	    }, {
	        "LA_CODE": "PGRA",
	        "Description": "Post graduate"
	    }, {
	        "LA_CODE": "SSLC",
	        "Description": "SSLC 10th Standard"
	    }]
}

var candidateList = {
	Candidate_Type:["Sales","Non Sales"],
	SU_Code:[	"0509SU01ADCN", 
				"0509SU01DMDB", 
				"0510SU01DMDB", 
				"K0000368CDCD", 
				"0474SU01AGAG", 
				"0474SU01DMDB", 
				"0477SU01AGAG", 
				"0477SU01DMDB", 
				"0478SU01AGAG", 
				"0478SU01DMDB", 
				"0479SU01AGAG", 
				"0479SU01DMDB", 
				"0479SU01TPTP", 
				"K0000620CDCD", 
				"0671SU01AGAG", 
				"0671SU01DMDB", 
				"0671SU01TPTP", 
				"0672SU01AGAG", 
				"0672SU01DMDB", 
				"0672SU01TPTP", 
				"0674SU01AGAG", 
				"0674SU01DMDB", 
				"0674SU01TPTP", 
				"0678SU01AGAG", 
				"0678SU01DMDB", 
				"0678SU01TPTP", 
				"0678SU02DMDB", 
				"K0001071CDCD", 
				"0739SU01AGAG", 
				"0739SU01DMDB", 
				"0739SU01TPTP", 
				"0740SU01ADCN", 
				"0741SU01AGAG", 
				"0741SU01DMDB", 
				"0741SU01TPTP", 
				"0859SU01ADCN", 
				"0859SU01DMDL", 
				"0866SU01AGAG", 
				"0866SU01DMDB", 
				"0866SU01TPTP", 
				"0866SU02DMDB", 
				"0867SU01ADCN", 
				"0867SU01DMDB", 
				"0868SU01AGAG", 
				"0868SU01TPTP", 
				"0870SU01AGAG", 
				"0870SU01TPTP", 
				"K0000286CDCD", 
				"0871SU01ADCN", 
				"0875SU01ADCN", 
				"0877SU01ADCN", 
				"0879SU01AGAG", 
				"0879SU01TPTP", 
				"0881SU01AGAG", 
				"0881SU01DMDB", 
				"0881SU01DMDL", 
				"0881SU01TPTP", 
				"0882SU01ADCN", 
				"N2300485AGAG", 
				"N2300485TPTP", 
				"K0000364CDCD", 
				"N1300873AGAG", 
				"N1300873PRPR", 
				"N1300868AGAG", 
				"N1300504AGAG", 
				"N1300504DMDB", 
				"N1300504TPTP", 
				"K0001718CDCD", 
				"N1300863DMDB", 
				"N2300504AGAG", 
				"N2300504DMDB", 
				"N2300504TPTP", 
				"N1300478AGAG", 
				"N1300478DMDB", 
				"N1300478DMDL", 
				"N1300478TPTP", 
				"0488SU07DMPC", 
				"0493SU01DMDB", 
				"0493SU01DMDP", 
				"0493SU01DMPC", 
				"0493SU02DMDP", 
				"0493SU02DMPC", 
				"0493SU03DMDP", 
				"0493SU03DMPC", 
				"0493SU04DMDP", 
				"0493SU04DMPC", 
				"K0001055CDCD", 
				"0482SU01AGAG", 
				"0482SU01DMDB", 
				"0482SU01DMDL", 
				"0482SU01TPTP", 
				"K0000358CDCD", 
				"0506SU01AGAG", 
				"0506SU01DMDB", 
				"0506SU01TPTP", 
				"0497SU01AGAG", 
				"0497SU01DMDB", 
				"0497SU01TPTP", 
				"0497SU02DMDB", 
				"K0000367CDCD", 
				"N1300497ADFF", 
				"N3300479AGAG", 
				"N3300479DMDB", 
				"N3300479TPTP", 
				"0488SU01AGAG", 
				"0488SU01DMDB", 
				"0488SU01DMDL", 
				"0488SU01DMDP", 
				"0488SU01DMPC", 
				"0488SU01PRPR", 
				"0488SU01TPTP", 
				"0488SU02DMPC", 
				"0488SU03DMDP", 
				"0488SU03DMPC", 
				"0488SU04DMDP", 
				"0488SU04DMPC", 
				"0488SU05DMDL", 
				"0488SU05DMDP", 
				"0488SU05DMPC", 
				"0488SU06DMDL", 
				"0488SU06DMDP", 
				"0862SU01AGAG", 
				"0862SU01PRPR", 
				"0475SU01AGAG", 
				"0475SU01PRPR", 
				"0476SU01ADFF", 
				"0476SU01AGAG", 
				"0476SU01DMDB", 
				"0476SU01PRPR", 
				"K0000277CDCD", 
				"0489SU01ADFF", 
				"3098SU01ADFF", 
				"N2300493ADCN", 
				"0507SU01AGAG", 
				"0507SU01DMDB", 
				"0507SU01TPTP", 
				"K0000379CDCD", 
				"0483SU01AGAG", 
				"0483SU01DMDB", 
				"0483SU01DMDL", 
				"0483SU01TPTP", 
				"K0000278CDCD", 
				"N3300483ADCN", 
				"N4300483AGAG", 
				"N4300483TPTP", 
				"N1300483AGAG", 
				"0484SU01AGAG", 
				"0484SU01DMDB", 
				"0484SU01DMDL", 
				"0484SU01TPTP", 
				"K0000361CDCD", 
				"0501SU01AGAG", 
				"0501SU01DMDB", 
				"0501SU01TPTP", 
				"0487SU01AGAG", 
				"0487SU01DMDB", 
				"0487SU01TPTP", 
				"K0000612CDCD", 
				"0495SU01AGAG", 
				"0495SU01DMDB", 
				"0495SU01DMDL", 
				"0495SU01TPTP", 
				"0495SU02DMDL", 
				"0500SU01AGAG", 
				"0500SU01DMDB", 
				"0500SU01TPTP", 
				"0505SU01AGAG", 
				"0505SU01DMDB", 
				"0505SU01DMDL", 
				"0505SU01TPTP", 
				"K0001075CDCD", 
				"0485SU01AGAG", 
				"0485SU01DMDB", 
				"0485SU01DMDL", 
				"0485SU01TPTP", 
				"0485SU02DMDL", 
				"K0000284CDCD", 
				"0458SU01ENEN", 
				"0458SU01AGAG", 
				"0458SU01DMDB", 
				"0458SU01DMDL", 
				"0458SU01DMDP", 
				"0458SU01DMPC", 
				"0458SU01PRPR", 
				"0458SU01TPTP", 
				"0458SU02DMDP", 
				"0458SU03DMDP", 
				"0503SU02DMDB", 
				"K0000287CDCD", 
				"K0000730CDCD", 
				"0496SU01ADFF", 
				"0496SU01AGAG", 
				"0496SU01DMDB", 
				"0496SU01DMDL", 
				"0496SU01TPTP", 
				"K0000369CDCD", 
				"0494SU01AGAG", 
				"0494SU01DMDB", 
				"0494SU01DMDL", 
				"0494SU01DMPC", 
				"0494SU01PRPR", 
				"0494SU01TPTP", 
				"0494SU03DMDL", 
				"0494SU04DMDL", 
				"K0000371CDCD", 
				"0498SU01AGAG", 
				"0498SU01DMDB", 
				"0498SU01DMDL", 
				"0498SU01TPTP", 
				"K0000279CDCD", 
				"K0000281CDCD", 
				"K0000365CDCD", 
				"0498SU02DMDL", 
				"0499SU01AGAG", 
				"0499SU01DMDB", 
				"0499SU01TPTP", 
				"K0000621CDCD", 
				"0884SU01ADFF", 
				"N2300494ADCN", 
				"0508SU01AGAG", 
				"0508SU01DMDB", 
				"0508SU01DMDL", 
				"0508SU01TPTP", 
				"0508SU02DMDB", 
				"0508SU03DMDB", 
				"0504SU01AGAG", 
				"0504SU01DMDB", 
				"0504SU01TPTP", 
				"0502SU01DMDB", 
				"0502SU01DMDL", 
				"0502SU01DMDP", 
				"0502SU01DMPC", 
				"0502SU03DMDL", 
				"0502SU04DMDL", 
				"0502SU05DMDL", 
				"0502SU06DMDL", 
				"K0000381CDCD", 
				"N2300502ADCN", 
				"N1300502AGAG", 
				"0480SU01AGAG", 
				"0480SU01DMDB", 
				"0480SU01TPTP", 
				"K0000382CDCD", 
				"0486SU01DMDB", 
				"K0000283CDCD", 
				"K0000288CDCD", 
				"k0001716CDCD", 
				"K0001717CDCD", 
				"0886SU01AGAG", 
				"N3300498AGAG", 
				"N3300498DMDB", 
				"N3300498TPTP", 
				"N1300498ADCN", 
				"N1300879ADCN", 
				"0679SU01AGAG", 
				"0679SU01DMDB", 
				"0679SU01TPTP", 
				"K0000053CDCD", 
				"0680SU01AGAG", 
				"0680SU01DMDB", 
				"0680SU01TPTP", 
				"K0000061CDCD", 
				"K0001225CDCD", 
				"0681SU01AGAG", 
				"0681SU01DMDB", 
				"0681SU01TPTP", 
				"0681SU02AGAG", 
				"0681SU02TPTP", 
				"0682SU01AGAG", 
				"0682SU01TPTP", 
				"0749SU01DMDB", 
				"0755SU01AGAG", 
				"0755SU01TPTP", 
				"K0000068CDCD", 
				"0757SU01AGAG", 
				"0757SU01DMDB", 
				"0757SU01TPTP", 
				"0757SU02DMDB", 
				"K0000069CDCD", 
				"K0001208CDCD", 
				"0744SU01AGAG", 
				"0744SU01DMDB", 
				"0744SU01ENEN", 
				"0744SU01TPTP", 
				"0744SU02AGAG", 
				"0744SU02TPTP", 
				"K0000054CDCD", 
				"0746SU01AGAG", 
				"0746SU01TPTP", 
				"0747SU01AGAG", 
				"0747SU01DMDB", 
				"0747SU01TPTP", 
				"0748SU01AGAG", 
				"0748SU01DMDB", 
				"0748SU01TPTP", 
				"0750SU01AGAG", 
				"0750SU01DMDB", 
				"0750SU01TPTP", 
				"K0000058CDCD", 
				"0752SU01ADCN", 
				"0753SU01AGAG", 
				"0753SU01DMDB", 
				"0753SU01TPTP", 
				"K0000027CDCD", 
				"0754SU01AGAG", 
				"0754SU01DMDB", 
				"0754SU01ENEN", 
				"0754SU01TPTP", 
				"K0000010CDCD", 
				"0756SU01AGAG", 
				"0756SU01DMDB", 
				"0756SU01TPTP", 
				"0745SU01AGAG", 
				"0745SU01DMDB", 
				"0745SU01ENEN", 
				"0745SU01TPTP", 
				"0745SU02AGAG", 
				"0745SU02TPTP", 
				"K0001169CDCD", 
				"0899SU01AGAG", 
				"0899SU01DMDB", 
				"0899SU01TPTP", 
				"K0000055CDCD", 
				"0900SU01AGAG", 
				"0900SU01DMDB", 
				"0900SU01TPTP", 
				"0901SU01AGAG", 
				"0901SU01DMDB", 
				"0901SU01TPTP", 
				"0904SU01AGAG", 
				"0904SU01DMDB", 
				"0904SU01TPTP", 
				"K0000021CDCD", 
				"0906SU01AGAG", 
				"0906SU01DMDB", 
				"0906SU01TPTP", 
				"K0000045CDCD", 
				"0909SU01AGAG", 
				"0909SU01TPTP", 
				"0910SU01AGAG", 
				"0910SU01DMDB", 
				"0910SU01TPTP", 
				"K0000026CDCD", 
				"K0001708CDCD", 
				"N3300233DMDB", 
				"0911SU01AGAG", 
				"0911SU01DMDB", 
				"0911SU01TPTP", 
				"K0000028CDCD", 
				"0913SU01AGAG", 
				"0913SU01DMDB", 
				"0913SU01TPTP", 
				"0914SU01AGAG", 
				"0914SU01DMDB", 
				"0914SU01TPTP", 
				"0914SU02DMDB", 
				"K0001162CDCD", 
				"0749SU01ENEN", 
				"0916SU01AGAG", 
				"0916SU01DMDB", 
				"0916SU01TPTP", 
				"0916SU02AGAG", 
				"0916SU02TPTP", 
				"K0000071CDCD", 
				"0897SU01AGAG", 
				"0897SU01DMDB", 
				"0897SU01ENEN", 
				"0897SU01TPTP", 
				"N2300903AGAG", 
				"N2300903TPTP", 
				"N1300744AGAG", 
				"N1300744TPTP", 
				"N2300231AGAG", 
				"N2300231TPTP", 
				"N1300914AGAG", 
				"N1300914TPTP", 
				"N2300756AGAG", 
				"N2300756TPTP", 
				"N1300756AGAG", 
				"N1300756TPTP", 
				"N1300745ADCN", 
				"N3300227AGAG", 
				"N3300227TPTP", 
				"N1300903AGAG", 
				"N1300903TPTP", 
				"N1300681AGAG", 
				"N1300681DMDB", 
				"N1300681DMDL", 
				"N1300681TPTP", 
				"0227SU01ADFF", 
				"0227SU01AGAG", 
				"0227SU01DMDB", 
				"0227SU01TPTP", 
				"K0000016CDCD", 
				"K0001707CDCD", 
				"N2300227AGAG", 
				"0228SU01ADFF", 
				"0228SU01AGAG", 
				"0228SU01DMDB", 
				"0228SU01TPTP", 
				"0228SU02DMDB", 
				"K0000059CDCD", 
				"N1300228AGAG", 
				"0229SU01AGAG", 
				"0229SU01DMDB", 
				"0229SU01DMDL", 
				"0229SU01TPTP", 
				"K0000060CDCD", 
				"0231SU01AGAG", 
				"0231SU01DMDB", 
				"0231SU01DMDL", 
				"0231SU01ENEN", 
				"0231SU01TPTP", 
				"K0000064CDCD", 
				"N4300231ADFF", 
				"N4300231AGAG", 
				"N4300231DMDB", 
				"0232SU02AGAG", 
				"0232SU02DMDB", 
				"0918SU01ADFF", 
				"0232SU01AGAG", 
				"0232SU01DMDB", 
				"0232SU01DMDL", 
				"0232SU01DMPC", 
				"0232SU01ENEN", 
				"0232SU01TPTP", 
				"0232SU02TPTP", 
				"K0000063CDCD", 
				"K0000066CDCD", 
				"K0001200CDCD", 
				"0917SU01ADFF", 
				"N3300232AGAG", 
				"N3300232TPTP", 
				"N3300233TPTP", 
				"0351SU01AGAG", 
				"0351SU01DMDB", 
				"0351SU01TPTP", 
				"0353SU01AGAG", 
				"0353SU01DMDB", 
				"0353SU01TPTP", 
				"K0000443CDCD", 
				"0683SU01AGAG", 
				"0683SU01DMDB", 
				"0683SU01TPTP", 
				"K0000438CDCD", 
				"0352SU01AGAG", 
				"0352SU01TPTP", 
				"K0000439CDCD", 
				"N1300399TPTP", 
				"0350SU01DMDB", 
				"0350SU02AGAG", 
				"0350SU02DMDB", 
				"0350SU02TPTP", 
				"K0000447CDCD", 
				"K0001703CDCD", 
				"0045SU03DMDB", 
				"0072SU03DMDL", 
				"0063SU02AGAG", 
				"0063SU02DMDB", 
				"0063SU02DMDL", 
				"0063SU02PRPR", 
				"0063SU05DMDB", 
				"N3300045DMDB", 
				"0062SU01AGAG", 
				"0062SU01DMDB", 
				"0062SU01DMDL", 
				"0062SU01DMDP", 
				"0062SU01DMPC", 
				"0062SU01PRPR", 
				"0062SU01TPTP", 
				"0923SU01AGAG", 
				"N1300062AGAG", 
				"0062SU02DMDL", 
				"0062SU02DMDP", 
				"0062SU03DMDL", 
				"0068SU01AGAG", 
				"0064SU02PRPR", 
				"0068SU01DMDB", 
				"0068SU01DMDL", 
				"0068SU01DMDP", 
				"0068SU01DMPC", 
				"0068SU01ENEN", 
				"0068SU01PRPR", 
				"0068SU01TPTP", 
				"K0000146CDCD", 
				"K0000510CDCD", 
				"K0001026CDCD", 
				"0065SU01AGAG", 
				"0065SU01DMDB", 
				"0065SU01DMDL", 
				"0065SU01DMDP", 
				"0065SU01DMPC", 
				"0065SU01PRPR", 
				"0065SU01TPTP", 
				"0071SU02DMDP", 
				"K0000245CDCD", 
				"N8300063DMDB", 
				"N8300063PRPR", 
				"0066SU01AGAG", 
				"0066SU01DMDB", 
				"0066SU01DMDL", 
				"0066SU01DMDP", 
				"0066SU01DMPC", 
				"0066SU03DMDP", 
				"K0000507CDCD", 
				"N1300065DMDB", 
				"N1300066AGAG", 
				"0067SU02ADFF", 
				"K0000239CDCD", 
				"0684SU01AGAG", 
				"0684SU01PRPR", 
				"0684SU01TPTP", 
				"0758SU01DMDB", 
				"0064SU01AGAG", 
				"0064SU02AGAG", 
				"0064SU02DMDB", 
				"0919SU01DMDB", 
				"N1300067AGAG", 
				"N1300067DMDB", 
				"N1300067DMDP", 
				"N1300067PRPR", 
				"N1300067TPTP", 
				"0072SU01DMDB", 
				"0072SU02ADFF", 
				"0072SU02DMDB", 
				"0920SU01AGAG", 
				"0920SU01DMDB", 
				"0920SU01TPTP", 
				"N3300388AGAG", 
				"0388SU02ADFF", 
				"0388SU02AGAG", 
				"0388SU02PRPR", 
				"0388SU01AGAG", 
				"0388SU01PRPR", 
				"0388SU01TPTP", 
				"K0000481CDCD", 
				"N3300388PRPR", 
				"N5300388PRPR", 
				"N1300388AGAG", 
				"0322SU01AGAG", 
				"0322SU01DMDB", 
				"0322SU01DMDL", 
				"0322SU01PRPR", 
				"0322SU01TPTP", 
				"K0000407CDCD", 
				"0323SU01AGAG", 
				"0323SU01DMDB", 
				"0323SU01PRPR", 
				"0323SU01TPTP", 
				"0327SU01AGAG", 
				"0327SU01DMDB", 
				"0327SU01PRPR", 
				"0327SU01TPTP", 
				"0330SU01ADCN", 
				"0330SU01DMDB", 
				"K0000413CDCD", 
				"0759SU01ADCN", 
				"0759SU01DMDB", 
				"0762SU01AGAG", 
				"0762SU01TPTP", 
				"0956SU01AGAG", 
				"0956SU01DMDB", 
				"0956SU01PRPR", 
				"0956SU01TPTP", 
				"0929SU01AGAG", 
				"0929SU01DMDB", 
				"0929SU01PRPR", 
				"0929SU01TPTP", 
				"K0001730CDCD", 
				"0930SU01AGAG", 
				"0930SU01DMDB", 
				"0930SU01PRPR", 
				"0930SU01TPTP", 
				"0934SU01AGAG", 
				"0934SU01DMDB", 
				"0934SU01PRPR", 
				"0934SU01TPTP", 
				"0936SU01AGAG", 
				"0936SU01DMDB", 
				"0936SU01PRPR", 
				"0936SU01TPTP", 
				"0937SU01AGAG", 
				"0937SU01TPTP", 
				"0939SU01AGAG", 
				"0939SU01TPTP", 
				"0941SU01AGAG", 
				"0941SU01DMDB", 
				"0941SU01TPTP", 
				"0942SU01AGAG", 
				"0942SU01DMDB", 
				"0942SU01DMPC", 
				"0942SU01PRPR", 
				"0942SU01TPTP", 
				"K0000550CDCD", 
				"N1300310AGAG", 
				"N1300310DMDB", 
				"0943SU01ADCN", 
				"0944SU01AGAG", 
				"0944SU01DMDB", 
				"0944SU01TPTP", 
				"0947SU01AGAG", 
				"0947SU01TPTP", 
				"0949SU01AGAG", 
				"0949SU01TPTP", 
				"0950SU01AGAG", 
				"0950SU01DMDB", 
				"0950SU01DMDL", 
				"0950SU01TPTP", 
				"0952SU01AGAG", 
				"0952SU01DMDB", 
				"0952SU01TPTP", 
				"K0001411CDCD", 
				"0954SU01AGAG", 
				"0954SU01DMDB", 
				"0954SU01TPTP", 
				"0318SU01AGAG", 
				"0318SU01DMDB", 
				"0318SU01DMDL", 
				"0318SU01PRPR", 
				"0318SU01TPTP", 
				"0318SU02DMDL", 
				"0306SU01AGAG", 
				"0306SU01DMDB", 
				"0306SU01DMDP", 
				"0306SU01DMPC", 
				"0306SU01PRPR", 
				"0306SU01TPTP", 
				"0306SU02DMPC", 
				"0306SU03DMPC", 
				"0306SU04DMPC", 
				"K0000405CDCD", 
				"0319SU01AGAG", 
				"0319SU01DMDB", 
				"0319SU01DMDL", 
				"0319SU01PRPR", 
				"0319SU01TPTP", 
				"0319SU02DMDB", 
				"0321SU01AGAG", 
				"N1300309ADCN", 
				"N3300289AGAG", 
				"N3300289DMDB", 
				"N3300289DMDL", 
				"N3300289PRPR", 
				"N3300289TPTP", 
				"N3300290DMDL", 
				"N4300289ADFF", 
				"N1600289ADCN", 
				"N9300289ADCN", 
				"N9300289DMDB", 
				"N1200289ADCN", 
				"N1400289ADFF", 
				"0308SU01AGAG", 
				"0308SU01DMDB", 
				"0308SU01DMDL", 
				"0308SU01TPTP", 
				"0325SU01AGAG", 
				"0325SU01DMDB", 
				"0325SU01TPTP", 
				"K0000402CDCD", 
				"0317SU01AGAG", 
				"0317SU01DMDB", 
				"0317SU01DMDL", 
				"0317SU01DMPC", 
				"0317SU01TPTP", 
				"K0000539CDCD", 
				"N2300328AGAG", 
				"N2300328TPTP", 
				"N3300317AGAG", 
				"N3300317TPTP", 
				"0326SU01ADFF", 
				"0314SU01ADFF", 
				"0314SU01AGAG", 
				"0314SU01DMDB", 
				"0314SU01DMDL", 
				"0314SU01TPTP", 
				"0309SU01AGAG", 
				"0309SU01DMDB", 
				"0309SU01DMDL", 
				"0309SU01PRPR", 
				"0309SU01TPTP", 
				"0309SU02DMDB", 
				"0331SU01AGAG", 
				"0331SU01DMDL", 
				"0331SU01TPTP", 
				"K0000397CDCD", 
				"0312SU01AGAG", 
				"0312SU01DMDB", 
				"0312SU01DMDL", 
				"0312SU01DMPC", 
				"0312SU01TPTP", 
				"K0000395CDCD", 
				"0945SU01ADFF", 
				"0311SU01ADFF", 
				"0311SU01AGAG", 
				"0311SU01DMDB", 
				"0311SU01DMDL", 
				"0311SU01DMDP", 
				"0311SU01DMPC", 
				"0311SU01ENEN", 
				"0311SU01PRPR", 
				"0311SU01TPTP", 
				"0311SU02DMDL", 
				"K0000390CDCD", 
				"K0000391CDCD", 
				"N1300311AGAG", 
				"N1300311DMDB", 
				"N1300311DMPC", 
				"N1300311PRPR", 
				"0926SU01DMDB", 
				"1193SU01AGAG", 
				"1193SU01DMDB", 
				"1193SU01DMDL", 
				"1193SU01PRPR", 
				"1193SU01TPTP", 
				"1193SU02DMDL", 
				"0310SU01DMDL", 
				"0310SU01TPTP", 
				"0310SU02DMDL", 
				"0310SU02TPTP", 
				"0310SU04DMDL", 
				"N1300320ADFF", 
				"0332SU01AGAG", 
				"0332SU01DMDB", 
				"0332SU01PRPR", 
				"0332SU01TPTP", 
				"K0001349CDCD", 
				"0316SU01ADFF", 
				"0316SU01AGAG", 
				"0316SU01DMDB", 
				"0316SU01PRPR", 
				"0316SU01TPTP", 
				"K0000389CDCD", 
				"K0001345CDCD", 
				"K0001731CDCD", 
				"0767SU01AGAG", 
				"0767SU01PRPR", 
				"0767SU01TPTP", 
				"E1300765ADCN", 
				"0173SU01ADFF", 
				"0173SU01AGAG", 
				"0173SU01DMDB", 
				"0173SU01DMDL", 
				"0173SU01PRPR", 
				"0173SU01TPTP", 
				"N3300173ADCN", 
				"N1300173AGAG", 
				"N1300173TPTP", 
				"0157SU01AGAG", 
				"0157SU01DMDB", 
				"0157SU01PRPR", 
				"0157SU01TPTP", 
				"0071SU02AGAG", 
				"0071SU02DMDB", 
				"0071SU02DMDL", 
				"0071SU02DMPC", 
				"0071SU02PRPR", 
				"0071SU02TPTP", 
				"0071SU03PRPR", 
				"0176SU01AGAG", 
				"0176SU01DMDB", 
				"0176SU01TPTP", 
				"0764SU01AGAG", 
				"0764SU01TPTP", 
				"0156SU01AGAG", 
				"0156SU01DMDB", 
				"0156SU01PRPR", 
				"0156SU02DMDB", 
				"E1300156ADCN", 
				"0766SU01AGAG", 
				"0766SU01DMDB", 
				"0174SU01AGAG", 
				"0174SU01DMDB", 
				"0174SU01DMDL", 
				"0174SU01PRPR", 
				"0174SU01TPTP", 
				"0175SU01AGAG", 
				"0175SU01DMDB", 
				"0175SU01PRPR", 
				"0175SU01TPTP", 
				"K0000127CDCD", 
				"E1300175ADCN", 
				"0172SU02AGAG", 
				"0172SU02DMDP", 
				"0172SU02PRPR", 
				"0172SU02TPTP", 
				"K0000249CDCD", 
				"0979SU01AGAG", 
				"0979SU01TPTP", 
				"K0000440CDCD", 
				"N1300159AGAG", 
				"N1300159TPTP", 
				"0158SU01ADCN", 
				"0158SU01DMDB", 
				"K0001735CDCD", 
				"0159SU01ADCN", 
				"0159SU01DMDB", 
				"K0000140CDCD", 
				"0687SU01AGAG", 
				"0687SU01DMDB", 
				"0687SU01TPTP", 
				"0997SU01DMDB", 
				"K0001361CDCD", 
				"0149SU01AGAG", 
				"0149SU01DMDB", 
				"0149SU01TPTP", 
				"0149SU02DMDB", 
				"K0000143CDCD", 
				"N1300688AGAG", 
				"N1300688DMDB", 
				"N1300688TPTP", 
				"N2300688AGAG", 
				"N2300688DMDB", 
				"N2300688TPTP", 
				"N2300769AGAG", 
				"N2300769TPTP", 
				"N1300158AGAG", 
				"N2300159TPTP", 
				"N7300996AGAG", 
				"N7300996TPTP", 
				"N6300147AGAG", 
				"N6300147TPTP", 
				"N9300996AGAG", 
				"N9300996TPTP", 
				"0147SU01DMDB", 
				"K0001044CDCD", 
				"K0001714CDCD", 
				"N2300147AGAG", 
				"N2300147DMDB", 
				"N5300147AGAG", 
				"N5300147TPTP", 
				"N1100996AGAG", 
				"N1100996TPTP", 
				"K0000153CDCD", 
				"N4300996AGAG", 
				"N4300996DMDB", 
				"N4300996TPTP", 
				"0235SU01AGAG", 
				"0235SU01TPTP", 
				"K0001540CDCD", 
				"K0000019CDCD", 
				"N2300233AGAG", 
				"N2300233DMDB", 
				"N2300235AGAG", 
				"N4300233AGAG", 
				"N4300233DMDB", 
				"N4300233TPTP", 
				"N1300236AGAG", 
				"N1300236DMDB", 
				"N1300236TPTP", 
				"0903SU01AGAG", 
				"0903SU01DMDB", 
				"0903SU01TPTP", 
				"K0000017CDCD", 
				"0230SU01ADFF", 
				"0230SU01AGAG", 
				"0230SU01DMDB", 
				"0230SU01DMDL", 
				"0230SU01TPTP", 
				"E1300230AGAG", 
				"N4300230AGAG", 
				"N4300230TPTP", 
				"0236SU01ADFF", 
				"0236SU01AGAG", 
				"0236SU01DMDB", 
				"0236SU01TPTP", 
				"N1300230AGAG", 
				"0234SU01ADFF", 
				"0234SU01AGAG", 
				"0234SU01DMDB", 
				"0234SU01DMPC", 
				"0234SU01TPTP", 
				"K0000023CDCD", 
				"K0001175CDCD", 
				"N6300234AGAG", 
				"N6300234DMDB", 
				"N6300234TPTP", 
				"0233SU01AGAG", 
				"0233SU01DMDB", 
				"0233SU01ENEN", 
				"0233SU02AGAG", 
				"K0000660CDCD", 
				"N8300234AGAG", 
				"N8300234TPTP", 
				"0543SU01AGAG", 
				"0543SU01DMDB", 
				"0543SU01TPTP", 
				"0543SU03DMDB", 
				"K0000530CDCD", 
				"0549SU01ADFF", 
				"0549SU01AGAG", 
				"0549SU01DMDB", 
				"K0000255CDCD", 
				"K0000302CDCD", 
				"0540SU01ADFF", 
				"0540SU01DMDB", 
				"0540SU01DMDL", 
				"0540SU02DMDB", 
				"0689SU01ADFF", 
				"0689SU01AGAG", 
				"0689SU01DMDB", 
				"0689SU01TPTP", 
				"0957SU01AGAG", 
				"0957SU01DMDB", 
				"0957SU01TPTP", 
				"0779SU01AGAG", 
				"0779SU01DMDB", 
				"0779SU01TPTP", 
				"0786SU01AGAG", 
				"0786SU01DMDB", 
				"0786SU01TPTP", 
				"K0000311CDCD", 
				"0961SU01AGAG", 
				"0961SU01DMDB", 
				"0961SU01TPTP", 
				"N1300770AGAG", 
				"N1300770DMDB", 
				"N1300541AGAG", 
				"N1300541DMDB", 
				"N1300541TPTP", 
				"0512SU03DMPC", 
				"0512SU05DMPC", 
				"0512SU08DMPC", 
				"0533SU01AGAG", 
				"0533SU01DMDB", 
				"0533SU01DMDP", 
				"0533SU01DMPC", 
				"0533SU01PRPR", 
				"0533SU03DMDB", 
				"0533SU03DMDP", 
				"K0000263CDCD", 
				"N5300531AGAG", 
				"0532SU01AGAG", 
				"0532SU01DMDB", 
				"0532SU01PRPR", 
				"K0000520CDCD", 
				"0512SU02ENEN", 
				"0512SU02AGAG", 
				"0512SU02DMDB", 
				"0512SU02DMDL", 
				"0512SU02DMDP", 
				"0512SU02DMPC", 
				"0512SU02PRPR", 
				"0512SU03DMDL", 
				"0512SU04DMPC", 
				"0512SU05DMDL", 
				"0512SU06DMPC", 
				"0529SU01PRPR", 
				"0539SU01DMDB", 
				"0529SU01AGAG", 
				"0531SU01ADFF", 
				"0531SU01AGAG", 
				"0531SU01DMDB", 
				"0531SU01DMPC", 
				"0531SU01PRPR", 
				"K0000251CDCD", 
				"K0000529CDCD", 
				"N5300512DMDB", 
				"N5300513DMDB", 
				"N2300512ADFF", 
				"N5300531TPTP", 
				"0546SU01ADFF", 
				"0547SU01ADCN", 
				"0544SU01ADFF", 
				"0544SU01AGAG", 
				"0544SU01DMDB", 
				"0544SU01DMDL", 
				"0544SU01ENEN", 
				"0544SU01TPTP", 
				"K0000307CDCD", 
				"K0000303CDCD", 
				"0550SU01AGAG", 
				"0550SU01DMDB", 
				"0541SU01DMDB", 
				"0541SU01DMDL", 
				"0541SU02AGAG", 
				"0541SU02TPTP", 
				"K0000309CDCD", 
				"N3300541ADFF", 
				"0548SU01ADFF", 
				"0548SU01AGAG", 
				"0548SU01DMDB", 
				"N7300539ADFF", 
				"N1300538ADFF", 
				"0538SU01DMDB", 
				"0538SU01TPTP", 
				"K0000260CDCD", 
				"0551SU01ADFF", 
				"0551SU01AGAG", 
				"0551SU01DMDB", 
				"0551SU01DMDL", 
				"N1300548AGAG", 
				"N1300548DMDB", 
				"N1300548TPTP", 
				"0651SU01AGAG", 
				"0651SU01DMDB", 
				"0651SU01TPTP", 
				"0652SU01AGAG", 
				"0652SU01DMDB", 
				"0652SU01TPTP", 
				"0653SU01AGAG"],
		Department:[{
			"LA_CODE": "D0001",
			"Description":"Agency"
		},{
			"LA_CODE": "D0002",
			"Description":"Finance"
		},{
			"LA_CODE": "D0003",
			"Description":"Branch Operatn."
		},{
			"LA_CODE": "D0004",
			"Description":"Face to Face"
		},{
			"LA_CODE": "D0005",
			"Description":"Actuary"
		},{
			"LA_CODE": "D0006",
			"Description":"Premier Distrib"
		},{
			"LA_CODE": "D0007",
			"Description":"Emp. Benefit"
		},{
			"LA_CODE": "D0008",
			"Description":"DM - Online"
		},{
			"LA_CODE": "D0009",
			"Description":"DM - Loyality"
		},{
			"LA_CODE": "D0010",
			"Description":"Bus. Retention"
		},{
			"LA_CODE": "D0011",
			"Description":"DM - Br. Sales"
		},{
			"LA_CODE": "D0012",
			"Description":"CDA"
		},{
			"LA_CODE": "D0013",
			"Description":"DM - Life Plaza"
		},{
			"LA_CODE": "D0014",
			"Description":"Underwriting"
		},{
			"LA_CODE": "D0015",
			"Description":"TPD"
		},{
			"LA_CODE": "D0016",
			"Description":"Sales Training"
		},{
			"LA_CODE": "D0017",
			"Description":"Marketing"
		},{
			"LA_CODE": "D0018",
			"Description":"Claims"
		},{
			"LA_CODE": "D0019",
			"Description":"DM - Preferred"
		},{
			"LA_CODE": "D0020",
			"Description":"Metro Distrib."
		},{
			"LA_CODE": "D0021",
			"Description":"HR"
		},{
			"LA_CODE": "D0022",
			"Description":"Strategic Intv"
		},{
			"LA_CODE": "D0023",
			"Description":"UAT"
		},{
			"LA_CODE": "D0024",
			"Description":"Career Distrib."
		}]
}

var LeadDisp = ["Need Analysis/Proposal","Post selling Visit/Reference Request","Not Interested","Irated Customer","Follow up","Renewal collected/Follow up","Service Update"];
var premium_bucket = ["Upto 49,999","50,000 - 99,999","100,000 - 199,999","Above 2 Lacs"];

$m.juci.addDataset("su_code",candidateList.SU_Code);
$m.juci.addDataset("candidate_type",candidateList.Candidate_Type);
$m.juci.addDataset("department",candidateList.Department);
$m.juci.addDataset("leadType",dmChannel.lead_type);
$m.juci.addDataset("IncomeFls", dmChannel.IncomeFls);
$m.juci.addDataset("MaritalFls", dmChannel.MaritalFls);
$m.juci.addDataset("OccupationFls", dmChannel.OccupationFls);
$m.juci.addDataset("educationFls", dmChannel.EducationFls);
$m.juci.addDataset("languagesArray",obj.languages);
$m.juci.addDataset("personalsalutation",maleSalutation);
$m.juci.addDataset("idProofs", obj.Idproof);
$m.juci.addDataset("IdProofs", obj.IdProofs);
$m.juci.addDataset("countryList", obj.countryList);
$m.juci.addDataset("citizenship",obj.citizenship);
$m.juci.addDataset("resendentialStatus",obj.resendentialStatus);
$m.juci.addDataset("occupationtype",obj.occupationtype);
$m.juci.addDataset("occupationSTypeOptions",[]);
$m.juci.addDataset("alcoholTypes", obj.alcoholTypes);
$m.juci.addDataset("habitTypes", obj.habitTypes);
$m.juci.addDataset("insuranceRepository", obj.insuranceRepositoryValue);
$m.juci.addDataset("typeOfIncomeProof", obj.typeOfIncomeProof);
$m.juci.addDataset("heightInCm", obj.heightInCm);
$m.juci.addDataset("heightInInches", obj.heightInInches);
$m.juci.addDataset("nationality", obj.nationality);
$m.juci.addDataset("bankAccountProof", obj.bankAccountProof);
$m.juci.addDataset("salutation", obj.salutation);
$m.juci.addDataset("appointeeSalutation", obj.salutation);
$m.juci.addDataset("nomineesalutation2", obj.salutation);
$m.juci.addDataset("proposerSalutation", obj.salutation);
$m.juci.addDataset("maritalStatus", obj.maritalStatus);
$m.juci.addDataset("education", obj.education);
$m.juci.addDataset("occupation", []);
$m.juci.addDataset("state", obj.state);
$m.juci.addDataset("perState", obj.state);
$m.juci.addDataset("relationOfTheNominee", obj.relationOfTheNominee);
$m.juci.addDataset("relationOfTheProposer", obj.relationOfTheProposer);
$m.juci.addDataset("appointeeRelationship", obj.appointeeRelationship);
$m.juci.addDataset("companyName", obj.companyName);
$m.juci.addDataset("familyMember", obj.familyMember);
$m.juci.addDataset("causeOfDeath", obj.causeOfDeath);
$m.juci.addDataset("presentStatus", obj.presentStatus);
$m.juci.addDataset("hazardousMaster", obj.hazardousMaster);
$m.juci.addDataset("purposeOfVisit", obj.purposeOfVisit);
$m.juci.addDataset("durationOfVisit", obj.durationOfVisit);
$m.juci.addDataset("medicalInvestigation", obj.medicalInvestigation);
$m.juci.addDataset("medicalAilments", obj.medicalAilments);
$m.juci.addDataset("ecsOptions", obj.ecsOptions);
$m.juci.addDataset("genderoption", ["Male", "Female"]);
$m.juci.addDataset("otp", {});
$m.juci.addDataset("aadharotp", {});
$m.juci.addDataset("diseaseDetailsTable", []);
$m.juci.addDataset("genderForParentOrHusband", 'M');
$m.juci.addDataset('genderForPregnant', 'M');
$m.juci.addDataset("lifeInsuranceTable", []);
$m.juci.addDataset("adress", []);
$m.juci.addDataset("photo", []);
$m.juci.addDataset("idprf", []);
$m.juci.addDataset("income", []);
$m.juci.addDataset("ageproof", []);
$m.juci.addDataset("customerdeclaration", []);
$m.juci.addDataset("opt", "Y");
$m.juci.addDataset("Aadhar", "");
$m.juci.addDataset("Aadhar_Proposer", "");
$m.juci.addDataset("aadharno", "");
$m.juci.addDataset("aadharPrNo", "");
$m.juci.addDataset("AnnuityPayoutOption", obj.AnnuityPayoutOption);
$m.juci.addDataset("sourceOfIncome", obj.sourceofIncome);
$m.juci.addDataset("purposeOfInsurance", obj.purposeOfInsurance);
$m.juci.addDataset("LifeAnnuityGuaranteedFor", obj.LifeAnnuityGuaranteedFor);
$m.juci.addDataset("AnnuityPayoutMode", obj.AnnuityPayoutMode);
$m.juci.addDataset("AnnuityPaymentsBy", obj.AnnuityPaymentsBy);
$m.juci.addDataset("lead_type", inputManagement.LeadType);
$m.juci.addDataset("lead_source", inputManagement.LeadSource);
$m.juci.addDataset("Occupation", inputManagement.Occupation);
$m.juci.addDataset("Income", inputManagement.Income);
$m.juci.addDataset("education", inputManagement.Education);
$m.juci.addDataset("leadCategory", inputManagement.LeadCategory);
$m.juci.addDataset("dependents", inputManagement.Dependents);
$m.juci.addDataset("activity", inputManagement.ActivityType);
$m.juci.addDataset("with_whom", inputManagement.ActivityType);
$m.juci.addDataset("meeting", inputManagement.Meeting);
$m.juci.addDataset("activity_done", inputManagement.ActivityDone);
$m.juci.addDataset("ActivityDone",inputManagement.Activity_Done);
$m.juci.addDataset("lead_disp", LeadDisp);
$m.juci.addDataset("campaign_drop", inputManagement.Campaign);
$m.juci.addDataset("marital_stat", inputManagement.MaritalStatus);
$m.juci.addDataset("advisors_list",[]);
$m.juci.addDataset("activity_data",inputManagement.activity_data);
$m.juci.addDataset("lead_disp_fls",[]);
$m.juci.addDataset("dec_nationality",obj.Dec_nationality);
$m.juci.addDataset("leadRenewalDisp", inputManagement.LeadRenewalDisp);
$m.juci.addDataset("permium_bucket",premium_bucket);

