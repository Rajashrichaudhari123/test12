/**
 * cityTier.js
 * @author CloudPact Technologies
 * @description : This script is used for taking city list and tier value based on state
 **/
var cityTier_json = [
  {
    "State": "ANDHRA PRADESH",
    "City": "Vijayawada",
    "Type": "Tier II"
  },
  {
    "State": "ASSAM",
    "City": "Guwahati",
    "Type": "Tier II"
  },
  {
    "State": "BIHAR",
    "City": "Patna",
    "Type": "Tier II"
  },
  {
    "State": "CHANDIGARH",
    "City": "Chandigarh",
    "Type": "Tier II"
  },
  {
    "State": "Chhattisgarh",
    "City": "Durg-Bhilai",
    "Type": "Tier II"
  },
  {
    "State": "Chhattisgarh",
    "City": "Raipur",
    "Type": "Tier II"
  },
  {
    "State": "DELHI",
    "City": "Delhi",
    "Type": "Tier I/Metro"
  },
  {
    "State": "KARNATAKA",
    "City": "Hubli-Dharwad",
    "Type": "Tier II"
  },
  {
    "State": "KARNATAKA",
    "City": "Mangalore",
    "Type": "Tier II"
  },
  {
    "State": "KERALA",
    "City": "Kochi",
    "Type": "Tier II"
  },
  {
    "State": "KERALA",
    "City": "Thiruvanathpuram",
    "Type": "Tier II"
  },
  {
    "State": "MADHYA PRADESH",
    "City": "Bhopal",
    "Type": "Tier II"
  },
  {
    "State": "MADHYA PRADESH",
    "City": "Gwalior",
    "Type": "Tier II"
  },
  {
    "State": "MADHYA PRADESH",
    "City": "Indore",
    "Type": "Tier II"
  },
  {
    "State": "MADHYA PRADESH",
    "City": "Jabalpur",
    "Type": "Tier II"
  },
  {
    "State": "MAHARASHTRA",
    "City": "Mumbai",
    "Type": "Tier I/Metro"
  },
  {
    "State": "MAHARASHTRA",
    "City": "Amravati",
    "Type": "Tier II"
  },
  {
    "State": "MAHARASHTRA",
    "City": "Aurangabad",
    "Type": "Tier II"
  },
  {
    "State": "MAHARASHTRA",
    "City": "Bhiwandi",
    "Type": "Tier II"
  },
  {
    "State": "MAHARASHTRA",
    "City": "Kolhapur",
    "Type": "Tier II"
  },
  {
    "State": "MAHARASHTRA",
    "City": "Nagpur",
    "Type": "Tier II"
  },
  {
    "State": "MAHARASHTRA",
    "City": "Nashik",
    "Type": "Tier II"
  },
  {
    "State": "MAHARASHTRA",
    "City": "Pune",
    "Type": "Tier II"
  },
  {
    "State": "MAHARASHTRA",
    "City": "Solapur",
    "Type": "Tier II"
  },
  {
    "State": "Orissa",
    "City": "Bhubaneswar",
    "Type": "Tier II"
  },
  {
    "State": "Orissa",
    "City": "Cuttack",
    "Type": "Tier II"
  },
  {
    "State": "PUNJAB",
    "City": "Amritsar",
    "Type": "Tier II"
  },
  {
    "State": "PUNJAB",
    "City": "Jalandhar",
    "Type": "Tier II"
  },
  {
    "State": "PUNJAB",
    "City": "Ludhiana",
    "Type": "Tier II"
  },
  {
    "State": "RAJASTHAN",
    "City": "Bikaner",
    "Type": "Tier II"
  },
  {
    "State": "RAJASTHAN",
    "City": "Jaipur",
    "Type": "Tier II"
  },
  {
    "State": "RAJASTHAN",
    "City": "Jodhpur",
    "Type": "Tier II"
  },
  {
    "State": "RAJASTHAN",
    "City": "Kota",
    "Type": "Tier II"
  },
  {
    "State": "TAMIL NADU",
    "City": "Chennai",
    "Type": "Tier I/Metro"
  },
  {
    "State": "TAMIL NADU",
    "City": "Coimbatore",
    "Type": "Tier II"
  },
  {
    "State": "TAMIL NADU",
    "City": "Madurai",
    "Type": "Tier II"
  },
  {
    "State": "TAMIL NADU",
    "City": "Salem",
    "Type": "Tier II"
  },
  {
    "State": "TAMIL NADU",
    "City": "Tiruchirappalli",
    "Type": "Tier II"
  },
  {
    "State": "TAMIL NADU",
    "City": "Tiruppur",
    "Type": "Tier II"
  },
  {
    "State": "UTTAR PRADESH",
    "City": "Agra",
    "Type": "Tier II"
  },
  {
    "State": "UTTAR PRADESH",
    "City": "Aligarh",
    "Type": "Tier II"
  },
  {
    "State": "UTTAR PRADESH",
    "City": "Allahabad",
    "Type": "Tier II"
  },
  {
    "State": "UTTAR PRADESH",
    "City": "Bareilly",
    "Type": "Tier II"
  },
  {
    "State": "UTTAR PRADESH",
    "City": "Ghaziabad",
    "Type": "Tier II"
  },
  {
    "State": "UTTAR PRADESH",
    "City": "Gorakhpur",
    "Type": "Tier II"
  },
  {
    "State": "UTTAR PRADESH",
    "City": "Kanpur",
    "Type": "Tier II"
  },
  {
    "State": "UTTAR PRADESH",
    "City": "Lucknow",
    "Type": "Tier II"
  },
  {
    "State": "UTTAR PRADESH",
    "City": "Meerut",
    "Type": "Tier II"
  },
  {
    "State": "UTTAR PRADESH",
    "City": "Moradabad",
    "Type": "Tier II"
  },
  {
    "State": "UTTAR PRADESH",
    "City": "Varanasi",
    "Type": "Tier II"
  },
  {
    "State": "UTTARAKHAND",
    "City": "Dehradun",
    "Type": "Tier II"
  },
  {
    "State": "WEST BENGAL",
    "City": "Kolkata",
    "Type": "Tier I/Metro"
  },
  {
    "State": "WEST BENGAL",
    "City": "Asansol",
    "Type": "Tier II"
  },
  {
    "State": "ARUNACHAL PRADESH",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "GOA",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "MANIPUR",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "MEGHALAYA",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "MIZORAM",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "NAGALAND",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "SIKKIM",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "TRIPURA",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "ANDAMAN AND NICOBAR ISLANDS",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "City": "Ananthapur",
    "State": "ANDHRA PRADESH",
    "Type": "Tier III",  
  },
  {
    "City": "Chittoor",
    "State": "ANDHRA PRADESH",
    "Type": "Tier III",  
  },
  {
    "City": "Cuddapah",
    "State": "ANDHRA PRADESH",
    "Type": "Tier III",  
  },
  {
    "City": "East Godavari",
    "State": "ANDHRA PRADESH",
    "Type": "Tier III",  
  },
  {
    "City": "Guntur",
    "State": "ANDHRA PRADESH",
    "Type": "Tier III",   
  },
  {
    "City": "Krishna",
    "State": "ANDHRA PRADESH",
    "Type": "Tier III",  
  },
  {
    "City": "Kurnool",
    "State": "ANDHRA PRADESH",
    "Type": "Tier III",  
  },
  {
    "City": "Nellore",
    "State": "ANDHRA PRADESH",
    "Type": "Tier III",  
  },
  {
    "City": "Prakasam",
    "State": "ANDHRA PRADESH",
    "Type": "Tier III",   
  },
  {
    "City": "Srikakulam",
    "State": "ANDHRA PRADESH",
    "Type": "Tier III",  
  },
  {
    "City": "Visakhapatnam",
    "State": "ANDHRA PRADESH",
    "Type": "Tier III",  
  },
  {
    "City": "Vizianagaram",
    "State": "ANDHRA PRADESH",
    "Type": "Tier III", 
  },
  {
    "City": "West Godavari",
    "State": "ANDHRA PRADESH",
    "Type": "Tier III",  
  },
  {
    "City": "Barpeta",
    "State": "ASSAM",
    "Type": "Tier III",  
  },
  {
    "City": "Bongaigaon",
    "State": "ASSAM",
    "Type": "Tier III",  
  },
  {
    "City": "Cachar",
    "State": "ASSAM",
    "Type": "Tier III", 
  },
  {
    "City": "Darrang",
    "State": "ASSAM",
    "Type": "Tier III", 
  },
  {
    "City": "Dhemaji",
    "State": "ASSAM",
    "Type": "Tier III", 
  },
  {
    "City": "Dhubri",
    "State": "ASSAM",
    "Type": "Tier III",  
  },
  {
    "City": "Dibrugarh",
    "State": "ASSAM",
    "Type": "Tier III",   
  },
  {
    "City": "Goalpara",
    "State": "ASSAM",
    "Type": "Tier III", 
  },
  {
    "City": "Golaghat",
    "State": "ASSAM",
    "Type": "Tier III",  
  },
  {
    "City": "Hailakandi",
    "State": "ASSAM",
    "Type": "Tier III",  
  },
  {
    "City": "Jorhat",
    "State": "ASSAM",
    "Type": "Tier III",
    
  },
  {
    "City": "Kamrup",
    "State": "ASSAM",
    "Type": "Tier III",
    
  },
  {
    "City": "Karbi Anglong",
    "State": "ASSAM",
    "Type": "Tier III",
    
  },
  {
    "City": "Karimganj",
    "State": "ASSAM",
    "Type": "Tier III",
    
  },
  {
    "City": "Kokrajhar",
    "State": "ASSAM",
    "Type": "Tier III",
    
  },
  {
    "City": "Lakhimpur",
    "State": "ASSAM",
    "Type": "Tier III",
    
  },
  {
    "City": "Marigaon",
    "State": "ASSAM",
    "Type": "Tier III",
    
  },
  {
    "City": "Nagaon",
    "State": "ASSAM",
    "Type": "Tier III",
    
  },
  {
    "City": "Nalbari",
    "State": "ASSAM",
    "Type": "Tier III",
    
  },
  {
    "City": "North Cachar Hills",
    "State": "ASSAM",
    "Type": "Tier III",
    
  },
  {
    "City": "Sibsagar",
    "State": "ASSAM",
    "Type": "Tier III",
    
  },
  {
    "City": "Sonitpur",
    "State": "ASSAM",
    "Type": "Tier III",
    
  },
  {
    "City": "Tinsukia",
    "State": "ASSAM",
    "Type": "Tier III",
    
  },
  {
    "City": "Araria",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Arwal",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Aurangabad(BH)",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Banka",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Begusarai",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Bhagalpur",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Bhojpur",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Buxar",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Darbhanga",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "East Champaran",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Gaya",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Gopalganj",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Jamui",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Jehanabad",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Kaimur (Bhabua)",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Katihar",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Khagaria",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Kishanganj",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Lakhisarai",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Madhepura",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Madhubani",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Munger",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Muzaffarpur",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Nalanda",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Nawada",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Patna",
    "State": "BIHAR",
    "Type": "Tier II",
    
  },
  {
    "City": "Purnia",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Rohtas",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Saharsa",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Samastipur",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Saran",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Sheikhpura",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Sheohar",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Sitamarhi",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Siwan",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Supaul",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Vaishali",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "West Champaran",
    "State": "BIHAR",
    "Type": "Tier III",
    
  },
  {
    "City": "Bastar",
    "State": "CHHATTISGARH",
    "Type": "Tier III",
    
  },
  {
    "City": "Bijapur(CGH)",
    "State": "CHHATTISGARH",
    "Type": "Tier III",
    
  },
  {
    "City": "Bilaspur(CGH)",
    "State": "CHHATTISGARH",
    "Type": "Tier III",
    
  },
  {
    "City": "Dantewada",
    "State": "CHHATTISGARH",
    "Type": "Tier III",
    
  },
  {
    "City": "Dhamtari",
    "State": "CHHATTISGARH",
    "Type": "Tier III",
    
  },
  {
    "City": "Gariaband",
    "State": "CHHATTISGARH",
    "Type": "Tier III",
    
  },
  {
    "City": "Janjgir-champa",
    "State": "CHHATTISGARH",
    "Type": "Tier III",
    
  },
  {
    "City": "Jashpur",
    "State": "CHHATTISGARH",
    "Type": "Tier III",
    
  },
  {
    "City": "Kanker",
    "State": "CHHATTISGARH",
    "Type": "Tier III",
    
  },
  {
    "City": "Kawardha",
    "State": "CHHATTISGARH",
    "Type": "Tier III",
    
  },
  {
    "City": "Korba",
    "State": "CHHATTISGARH",
    "Type": "Tier III",
    
  },
  {
    "City": "Koriya",
    "State": "CHHATTISGARH",
    "Type": "Tier III",
    
  },
  {
    "City": "Mahasamund",
    "State": "CHHATTISGARH",
    "Type": "Tier III",
    
  },
  {
    "City": "Narayanpur",
    "State": "CHHATTISGARH",
    "Type": "Tier III",
    
  },
  {
    "City": "Raigarh",
    "State": "CHHATTISGARH",
    "Type": "Tier III",
    
  },
  {
    "City": "Raipur",
    "State": "CHHATTISGARH",
    "Type": "Tier II",
    
  },
  {
    "City": "Rajnandgaon",
    "State": "CHHATTISGARH",
    "Type": "Tier III",
    
  },
  {
    "City": "Surguja",
    "State": "CHHATTISGARH",
    "Type": "Tier III",
    
  },
  {
    "State": "DADRA AND NAGAR HAVELI",
    "City": "DADRA AND NAGAR HAVELI",
    "Type": "Tier III",
    
  },
  {
    "City": "Daman",
    "State": "DAMAN AND DIU",
    "Type": "Tier III",
    
  },
  {
    "City": "Diu",
    "State": "DAMAN AND DIU",
    "Type": "Tier III",
    
  },
  {
    "City": "Central Delhi",
    "State": "DELHI",
    "Type": "Tier III",
    
  },
  {
    "City": "East Delhi",
    "State": "DELHI",
    "Type": "Tier III",
    
  },
  {
    "City": "New Delhi",
    "State": "DELHI",
    "Type": "Tier III",
    
  },
  {
    "City": "North Delhi",
    "State": "DELHI",
    "Type": "Tier III",
    
  },
  {
    "City": "North East Delhi",
    "State": "DELHI",
    "Type": "Tier III",
    
  },
  {
    "City": "North West Delhi",
    "State": "DELHI",
    "Type": "Tier III",
    
  },
  {
    "City": "South Delhi",
    "State": "DELHI",
    "Type": "Tier III",
    
  },
  {
    "City": "South West Delhi",
    "State": "DELHI",
    "Type": "Tier III",
    
  },
  {
    "City": "West Delhi",
    "State": "DELHI",
    "Type": "Tier III",
    
  },
  {
    "City": "Ahmedabad",
    "State": "GUJARAT",
    "Type": "Tier II",
    
  },
  {
    "City": "Amreli",
    "State": "GUJARAT",
    "Type": "Tier III",
    
  },
  {
    "City": "Anand",
    "State": "GUJARAT",
    "Type": "Tier III",
    
  },
  {
    "City": "Banaskantha",
    "State": "GUJARAT",
    "Type": "Tier III",
    
  },
  {
    "City": "Bharuch",
    "State": "GUJARAT",
    "Type": "Tier III",
    
  },
  {
    "City": "Bhavnagar",
    "State": "GUJARAT",
    "Type": "Tier III",
    
  },
  {
    "City": "Dahod",
    "State": "GUJARAT",
    "Type": "Tier III",
    
  },
  {
    "City": "Gandhi Nagar",
    "State": "GUJARAT",
    "Type": "Tier III",
    
  },
  {
    "City": "Jamnagar",
    "State": "GUJARAT",
    "Type": "Tier II",
    
  },
  {
    "City": "Junagadh",
    "State": "GUJARAT",
    "Type": "Tier III",
    
  },
  {
    "City": "Kachchh",
    "State": "GUJARAT",
    "Type": "Tier III",
    
  },
  {
    "City": "Kheda",
    "State": "GUJARAT",
    "Type": "Tier III",
    
  },
  {
    "City": "Mahesana",
    "State": "GUJARAT",
    "Type": "Tier III",
    
  },
  {
    "City": "Narmada",
    "State": "GUJARAT",
    "Type": "Tier III",
    
  },
  {
    "City": "Navsari",
    "State": "GUJARAT",
    "Type": "Tier III",
    
  },
  {
    "City": "Panch Mahals",
    "State": "GUJARAT",
    "Type": "Tier III",
    
  },
  {
    "City": "Patan",
    "State": "GUJARAT",
    "Type": "Tier III",
    
  },
  {
    "City": "Porbandar",
    "State": "GUJARAT",
    "Type": "Tier III",
    
  },
  {
    "City": "Rajkot",
    "State": "GUJARAT",
    "Type": "Tier II",
    
  },
  {
    "City": "Sabarkantha",
    "State": "GUJARAT",
    "Type": "Tier III",
    
  },
  {
    "City": "Surat",
    "State": "GUJARAT",
    "Type": "Tier II",
    
  },
  {
    "City": "Surendra Nagar",
    "State": "GUJARAT",
    "Type": "Tier III",
    
  },
  {
    "City": "Tapi",
    "State": "GUJARAT",
    "Type": "Tier III",
    
  },
  {
    "City": "The Dangs",
    "State": "GUJARAT",
    "Type": "Tier III",
    
  },
  {
    "City": "Vadodara",
    "State": "GUJARAT",
    "Type": "Tier II",
    
  },
  {
    "City": "Valsad",
    "State": "GUJARAT",
    "Type": "Tier III",
    
  },
  {
    "City": "Ambala",
    "State": "HARYANA",
    "Type": "Tier III",
    
  },
  {
    "City": "Bhiwani",
    "State": "HARYANA",
    "Type": "Tier III",
    
  },
  {
    "City": "Faridabad",
    "State": "HARYANA",
    "Type": "Tier II",
    
  },
  {
    "City": "Fatehabad",
    "State": "HARYANA",
    "Type": "Tier III",
    
  },
  {
    "City": "Gurgaon",
    "State": "HARYANA",
    "Type": "Tier III",
    
  },
  {
    "City": "Hisar",
    "State": "HARYANA",
    "Type": "Tier III",
    
  },
  {
    "City": "Jhajjar",
    "State": "HARYANA",
    "Type": "Tier III",
    
  },
  {
    "City": "Jind",
    "State": "HARYANA",
    "Type": "Tier III",
    
  },
  {
    "City": "Kaithal",
    "State": "HARYANA",
    "Type": "Tier III",
    
  },
  {
    "City": "Karnal",
    "State": "HARYANA",
    "Type": "Tier III",
    
  },
  {
    "City": "Kurukshetra",
    "State": "HARYANA",
    "Type": "Tier III",
    
  },
  {
    "City": "Mahendragarh",
    "State": "HARYANA",
    "Type": "Tier III",
    
  },
  {
    "City": "Panchkula",
    "State": "HARYANA",
    "Type": "Tier III",
    
  },
  {
    "City": "Panipat",
    "State": "HARYANA",
    "Type": "Tier III",
    
  },
  {
    "City": "Rewari",
    "State": "HARYANA",
    "Type": "Tier III",
    
  },
  {
    "City": "Rohtak",
    "State": "HARYANA",
    "Type": "Tier III",
    
  },
  {
    "City": "Sirsa",
    "State": "HARYANA",
    "Type": "Tier III",
    
  },
  {
    "City": "Sonipat",
    "State": "HARYANA",
    "Type": "Tier III",
    
  },
  {
    "City": "Yamuna Nagar",
    "State": "HARYANA",
    "Type": "Tier III",
    
  },
  {
    "City": "Bilaspur (HP)",
    "State": "HIMACHAL PRADESH",
    "Type": "Tier III",
    
  },
  {
    "City": "Chamba",
    "State": "HIMACHAL PRADESH",
    "Type": "Tier III",
    
  },
  {
    "City": "Hamirpur(HP)",
    "State": "HIMACHAL PRADESH",
    "Type": "Tier III",
    
  },
  {
    "City": "Kangra",
    "State": "HIMACHAL PRADESH",
    "Type": "Tier III",
    
  },
  {
    "City": "Kinnaur",
    "State": "HIMACHAL PRADESH",
    "Type": "Tier III",
    
  },
  {
    "City": "Kullu",
    "State": "HIMACHAL PRADESH",
    "Type": "Tier III",
    
  },
  {
    "City": "Lahul AND Spiti",
    "State": "HIMACHAL PRADESH",
    "Type": "Tier III",
    
  },
  {
    "City": "Mandi",
    "State": "HIMACHAL PRADESH",
    "Type": "Tier III",
    
  },
  {
    "City": "Shimla",
    "State": "HIMACHAL PRADESH",
    "Type": "Tier III",
    
  },
  {
    "City": "Sirmaur",
    "State": "HIMACHAL PRADESH",
    "Type": "Tier III",
    
  },
  {
    "City": "Solan",
    "State": "HIMACHAL PRADESH",
    "Type": "Tier III",
    
  },
  {
    "City": "Una",
    "State": "HIMACHAL PRADESH",
    "Type": "Tier III",
    
  },
  {
    "City": "Ananthnag",
    "State": "JAMMU AND KASHMIR",
    "Type": "Tier III",
    
  },
  {
    "City": "Bandipur",
    "State": "JAMMU AND KASHMIR",
    "Type": "Tier III",
    
  },
  {
    "City": "Baramulla",
    "State": "JAMMU AND KASHMIR",
    "Type": "Tier III",
    
  },
  {
    "City": "Budgam",
    "State": "JAMMU AND KASHMIR",
    "Type": "Tier III",
    
  },
  {
    "City": "Doda",
    "State": "JAMMU AND KASHMIR",
    "Type": "Tier III",
    
  },
  {
    "City": "Jammu",
    "State": "JAMMU AND KASHMIR",
    "Type": "Tier II",
    
  },
  {
    "City": "Kargil",
    "State": "JAMMU AND KASHMIR",
    "Type": "",
    
  },
  {
    "City": "Kathua",
    "State": "JAMMU AND KASHMIR",
    "Type": "Tier III",
    
  },
  {
    "City": "Kulgam",
    "State": "JAMMU AND KASHMIR",
    "Type": "Tier III",
    
  },
  {
    "City": "Kupwara",
    "State": "JAMMU AND KASHMIR",
    "Type": "Tier III",
    
  },
  {
    "City": "Leh",
    "State": "JAMMU AND KASHMIR",
    "Type": "Tier III",
    
  },
  {
    "City": "Poonch",
    "State": "JAMMU AND KASHMIR",
    "Type": "Tier III",
    
  },
  {
    "City": "Pulwama",
    "State": "JAMMU AND KASHMIR",
    "Type": "Tier III",
    
  },
  {
    "City": "Rajauri",
    "State": "JAMMU AND KASHMIR",
    "Type": "Tier III",
    
  },
  {
    "City": "Reasi",
    "State": "JAMMU AND KASHMIR",
    "Type": "Tier III",
    
  },
  {
    "City": "Shopian",
    "State": "JAMMU AND KASHMIR",
    "Type": "Tier III",
    
  },
  {
    "City": "Srinagar",
    "State": "JAMMU AND KASHMIR",
    "Type": "Tier II",
    
  },
  {
    "City": "Udhampur",
    "State": "JAMMU AND KASHMIR",
    "Type": "Tier III",
    
  },
  {
    "City": "Bokaro",
    "State": "JHARKHAND",
    "Type": "Tier III",
    
  },
  {
    "City": "Chatra",
    "State": "JHARKHAND",
    "Type": "Tier III",
    
  },
  {
    "City": "Deoghar",
    "State": "JHARKHAND",
    "Type": "Tier III",
    
  },
  {
    "City": "Dhanbad",
    "State": "JHARKHAND",
    "Type": "Tier II",
    
  },
  {
    "City": "Dumka",
    "State": "JHARKHAND",
    "Type": "Tier III",
    
  },
  {
    "City": "East Singhbhum",
    "State": "JHARKHAND",
    "Type": "Tier III",
    
  },
  {
    "City": "Garhwa",
    "State": "JHARKHAND",
    "Type": "Tier III",
    
  },
  {
    "City": "Giridh",
    "State": "JHARKHAND",
    "Type": "Tier III",
    
  },
  {
    "City": "Godda",
    "State": "JHARKHAND",
    "Type": "Tier III",
    
  },
  {
    "City": "Gumla",
    "State": "JHARKHAND",
    "Type": "Tier III",
    
  },
  {
    "City": "Hazaribag",
    "State": "JHARKHAND",
    "Type": "Tier III",
    
  },
  {
    "City": "Jamtara",
    "State": "JHARKHAND",
    "Type": "Tier III",
    
  },
  {
    "City": "Khunti",
    "State": "JHARKHAND",
    "Type": "Tier III",
    
  },
  {
    "City": "Koderma",
    "State": "JHARKHAND",
    "Type": "Tier III",
    
  },
  {
    "City": "Latehar",
    "State": "JHARKHAND",
    "Type": "Tier III",
    
  },
  {
    "City": "Lohardaga",
    "State": "JHARKHAND",
    "Type": "Tier III",
    
  },
  {
    "City": "Pakur",
    "State": "JHARKHAND",
    "Type": "Tier III",
    
  },
  {
    "City": "Palamau",
    "State": "JHARKHAND",
    "Type": "Tier III",
    
  },
  {
    "City": "Ramgarh",
    "State": "JHARKHAND",
    "Type": "Tier III",
    
  },
  {
    "City": "Ranchi",
    "State": "JHARKHAND",
    "Type": "Tier II",
    
  },
  {
    "City": "Sahibganj",
    "State": "JHARKHAND",
    "Type": "Tier III",
    
  },
  {
    "City": "Seraikela-kharsawan",
    "State": "JHARKHAND",
    "Type": "Tier III",
    
  },
  {
    "City": "Simdega",
    "State": "JHARKHAND",
    "Type": "Tier III",
    
  },
  {
    "City": "West Singhbhum",
    "State": "JHARKHAND",
    "Type": "Tier III",
    
  },
  {
    "City": "Bagalkot",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Bangalore",
    "State": "KARNATAKA",
    "Type": "Tier I/Metro",
    
  },
  {
    "City": "Bangalore Rural",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Belgaum",
    "State": "KARNATAKA",
    "Type": "Tier II",
    
  },
  {
    "City": "Bellary",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Bidar",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Bijapur(KAR)",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Chamrajnagar",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Chickmagalur",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Chikkaballapur",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Chitradurga",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Dakshina Kannada",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Davangere",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Dharwad",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Gadag",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Gulbarga",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Hassan",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Haveri",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Kodagu",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Kolar",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Koppal",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Mandya",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Mysore",
    "State": "KARNATAKA",
    "Type": "Tier II",
    
  },
  {
    "City": "Raichur",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Ramanagar",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Shimoga",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Tumkur",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Udupi",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Uttara Kannada",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Yadgir",
    "State": "KARNATAKA",
    "Type": "Tier III",
    
  },
  {
    "City": "Alappuzha",
    "State": "KERALA",
    "Type": "Tier III",
    
  },
  {
    "City": "Ernakulam",
    "State": "KERALA",
    "Type": "Tier III",
    
  },
  {
    "City": "Idukki",
    "State": "KERALA",
    "Type": "Tier III",
    
  },
  {
    "City": "Kannur",
    "State": "KERALA",
    "Type": "Tier III",
    
  },
  {
    "City": "Kasargod",
    "State": "KERALA",
    "Type": "Tier III",
    
  },
  {
    "City": "Kottayam",
    "State": "KERALA",
    "Type": "Tier III",
    
  },
  {
    "City": "Kozhikode",
    "State": "KERALA",
    "Type": "Tier II",
    
  },
  {
    "City": "Malappuram",
    "State": "KERALA",
    "Type": "Tier III",
    
  },
  {
    "City": "Palakkad",
    "State": "KERALA",
    "Type": "Tier III",
    
  },
  {
    "City": "Pathanamthitta",
    "State": "KERALA",
    "Type": "Tier III",
    
  },
  {
    "City": "Thrissur",
    "State": "KERALA",
    "Type": "Tier III",
    
  },
  {
    "City": "Wayanad",
    "State": "KERALA",
    "Type": "Tier III",
    
  },
  {
    "City": "Lakshadweep",
    "State": "LAKSHADWEEP",
    "Type": "Tier III",
    
  },
  {
    "City": "Mahe",
    "State": "PONDICHERRY",
    "Type": "Tier III",
    
  },
  {
    "City": "PONDICHERRY",
    "State": "PONDICHERRY",
    "Type": "Tier III",
    
  },
  {
    "City": "Adilabad",
    "State": "TELANGANA",
    "Type": "Tier II",
    
  },
  {
    "City": "Hyderabad",
    "State": "TELANGANA",
    "Type": "Tier I/Metro",
    
  },
  {
    "City": "K.V.Rangareddy",
    "State": "TELANGANA",
    "Type": "Tier III",
    
  },
  {
    "City": "Karim Nagar",
    "State": "TELANGANA",
    "Type": "Tier III",
    
  },
  {
    "City": "Khammam",
    "State": "TELANGANA",
    "Type": "Tier III",
    
  },
  {
    "City": "Mahabub Nagar",
    "State": "TELANGANA",
    "Type": "Tier III",
    
  },
  {
    "City": "Medak",
    "State": "TELANGANA",
    "Type": "Tier III",
    
  },
  {
    "City": "Nalgonda",
    "State": "TELANGANA",
    "Type": "Tier III",
    
  },
  {
    "City": "Nizamabad",
    "State": "TELANGANA",
    "Type": "Tier III",
    
  },
  {
    "City": "Durg",
    "State": "CHHATTISGARH",
    "Type": "Tier III",
    
  },
  {
    "City": "Warangal",
    "State": "TELANGANA",
    "Type": "Tier II",
    
  },
  {
    "State": "ANDHRA PRADESH",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "ASSAM",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "BIHAR",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "CHHATTISGARH",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State":"DADRA AND NAGAR HAVELI",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "DAMAN AND DIU",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "DELHI",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "GUJARAT",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "HARYANA",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "HIMACHAL PRADESH",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "JAMMU AND KASHMIR",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "JHARKHAND",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "KARNATAKA",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "KERALA",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "LAKSHADWEEP",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "PONDICHERRY",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "TELANGANA",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "CHANDIGARH",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "WEST BENGAL",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "UTTARAKHAND",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "UTTAR PRADESH",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "TAMIL NADU",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "RAJASTHAN",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "PUNJAB",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "Orissa",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "MAHARASHTRA",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "MADHYA PRADESH",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "ODISHA",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "UTTARAKHAND",
    "City": "Other",
    "Type": "Tier III"
  },
  {
    "State": "UTTARANCHAL",
    "City": "Other",
    "Type": "Tier III"
  },
];