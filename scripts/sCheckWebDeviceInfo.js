var html = "<!DOCTYPE html><html><head><style>div#loading{display:none}body{font-size:14px;font-family:'Lucida Grande',Helvetica,Arial,sans-serif;color:#333;text-align:center;margin-top:100px}input#email-id,input#mobile{height:40px;margin-top:20px;width:25%;text-align:center}span{display:block;margin:0 auto}span[class*=l-]{height:4px;width:4px;background:#000;display:inline-block;margin:12px 2px;border-radius:100%;-webkit-border-radius:100%;-moz-border-radius:100%;-webkit-animation:loader 4s infinite;-webkit-animation-timing-function:cubic-bezier(.030,.615,.995,.415);-webkit-animation-fill-mode:both;-moz-animation:loader 4s infinite;-moz-animation-timing-function:cubic-bezier(.030,.615,.995,.415);-moz-animation-fill-mode:both;-ms-animation:loader 4s infinite;-ms-animation-timing-function:cubic-bezier(.030,.615,.995,.415);-ms-animation-fill-mode:both;animation:loader 4s infinite;animation-timing-function:cubic-bezier(.030,.615,.995,.415);animation-fill-mode:both}span.l-1{-webkit-animation-delay:1s;animation-delay:1s;-ms-animation-delay:1s;-moz-animation-delay:1s}span.l-2{-webkit-animation-delay:.8s;animation-delay:.8s;-ms-animation-delay:.8s;-moz-animation-delay:.8s}span.l-3{-webkit-animation-delay:.6s;animation-delay:.6s;-ms-animation-delay:.6s;-moz-animation-delay:.6s}span.l-4{-webkit-animation-delay:.4s;animation-delay:.4s;-ms-animation-delay:.4s;-moz-animation-delay:.4s}span.l-5{-webkit-animation-delay:.2s;animation-delay:.2s;-ms-animation-delay:.2s;-moz-animation-delay:.2s}span.l-6{-webkit-animation-delay:0;animation-delay:0;-ms-animation-delay:0;-moz-animation-delay:0}@-webkit-keyframes loader{0%{-webkit-transform:translateX(-30px);opacity:0}25%{opacity:1}50%{-webkit-transform:translateX(30px);opacity:0}100%{opacity:0}}@-moz-keyframes loader{0%{-moz-transform:translateX(-30px);opacity:0}25%{opacity:1}50%{-moz-transform:translateX(30px);opacity:0}100%{opacity:0}}0%{-transform:translateX(-30px)}25%{opacity:1}50%{-transform:translateX(30px)}0%{-ms-transform:translateX(-30px)}25%{opacity:1}50%{-ms-transform:translateX(30px)}.first_panel{background:#0b4daa;width:100%;height:128px}body{margin:0;background-color:#ebebeb}.parent_div{display:table;width:100%}input.app_no{height:30px;margin-top:39px;width:15%;text-align:center}.input_text{text-align:center}.reliance{text-align:center}.btn_parent{display:table;text-align:center;width:100%}input#title{height:40px;margin-top:39px;width:25%;text-align:center}input#desc{height:30px;margin-top:10px;width:15%;text-align:center}.push_notif{text-align:center;font-size:45px;margin-top:34px}button#submit-btn{display:table-cell;margin:10px;padding:10px;font-size:15px;text-align:center;margin-top:13px!important;font-family:Helvetica-Bold;color:#fff;width:21%;background-color:#0b4daa;border-color:#0b4daa;border:0;border-radius:5px;min-height:50px;}table,td,th{border:1px solid #000;border-collapse:collapse}table{width:32%!important;margin-left:35%}.table_class{padding:15px}td.device_name{text-align:left;height:50px;font-size:17px;font-weight:700}td.device_value{width:43%;font-size:16px}</style><script>function onSubmitClick(){var sapCode = document.getElementById(\"title\").value;var android_version = document.getElementById(\"version-name\").innerHTML;var hardware = document.getElementById(\"os-version\").innerHTML;var location_value= document.getElementById(\"gps-value\").innerHTML;var model_no = document.getElementById(\"version-name\").innerHTML;var camera_check = document.getElementById(\"selfie-value\").innerHTML;var mobile_name = document.getElementById(\"model-name\").innerHTML;var mobile_no = document.getElementById(\"mobile\").innerHTML;var email_id = document.getElementById(\"email-id\").innerHTML;var xhr=new XMLHttpRequest();var url = \"http://124.124.218.136/rlife2/mowblyserver/sSaveWebDeviceData/rellife/prod/RlifeAssist?data={\\\"Aadhar_Number\\\":\\\"\\\",\\\"Added_By\\\":\\\"\"+sapCode+\"\\\",\\\"AlternateNumber\\\":\\\"\"+mobile_no+\"\\\",\\\"Android_Version\\\":\\\"\"+android_version+\"\\\",\\\"Authenticate_By\\\":\\\"\\\",\\\"CPU_Details\\\":\\\"\"+hardware+\"\\\",\\\"Care_Of_Person\\\":\\\"\\\",\\\"CaseID\\\":\\\"\\\",\\\"City\\\":\\\"\\\",\\\"Connectivity_3G4G\\\":\\\"\\\",\\\"Contact_No\\\":\\\"\\\",\\\"Customer_Name\\\":\\\"\\\",\\\"Customer_Photo\\\":\\\"\\\",\\\"DOB\\\":null,\\\"Details_Approved\\\":\\\"\\\",\\\"Device_Date\\\":\\\"\\\",\\\"Device_ModelName\\\":\\\"\"+mobile_name+\"\\\",\\\"Device_ModelNo\\\":\\\"\\\",\\\"Device_PN\\\":\\\"\\\",\\\"Device_SN\\\":\\\"\\\",\\\"District\\\":\\\"\\\",\\\"EKYC_XML\\\":\\\"\\\",\\\"Email_ID\\\":\\\"\"+email_id+\"\\\",\\\"Entry_Stage\\\":\\\"\\\",\\\"Free_Space\\\":\\\"\\\",\\\"GPS_Option\\\":\\\"\"+location_value+\"\\\",\\\"Gender\\\":\\\"\\\",\\\"House_Identifier\\\":\\\"\\\",\\\"Landmark\\\":\\\"\\\",\\\"Latitude\\\":\\\"\\\",\\\"Locality\\\":\\\"\\\",\\\"Longitude\\\":\\\"\\\",\\\"Model_Number\\\":\\\"\"+model_no+\"\\\",\\\"Network_Provider\\\":\\\"\\\",\\\"OTG_Option\\\":\\\"\\\",\\\"PANNumber\\\":\\\"\\\",\\\"Pincode\\\":\\\"\\\",\\\"PostOffice_Name\\\":\\\"\\\",\\\"RAM\\\":\\\"\\\",\\\"Record_status\\\":\\\"\\\",\\\"SAPCode\\\":\\\"\"+sapCode+\"\\\",\\\"Selfie_Camera\\\":\\\"\"+camera_check+\"\\\",\\\"Source_From\\\":\\\"TAB\\\",\\\"State\\\":\\\"\\\",\\\"Street_Name\\\":\\\"\\\",\\\"Sub_District\\\":\\\"\\\"}&action=SaveDeviceInfo\";console.log(url);console.log(data);xhr.open(\"POST\",url,true),xhr.send(),xhr.onreadystatechange=function(){4==xhr.readyState&&200==xhr.status&&(document.getElementById(\"version-name\").innerHTML=\"\",document.getElementById(\"model-name\").innerHTML=\"\",document.getElementById(\"cpu-details\").innerHTML=\"\",document.getElementById(\"selfie-value\").innerHTML=\"\",document.getElementById(\"os-version\").innerHTML=\"\",document.getElementById(\"gps-value\").innerHTML=\"\",document.getElementById(\"title\").value=\"\",document.getElementById(\"email-id\").value=\"\",document.getElementById(\"mobile\").value=\"\",response =JSON.parse(xhr.responseText),data = JSON.parse(response.data),console.log(data),window.alert(data.Message))}}function checkFrontCamera(){return navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,navigator.getUserMedia?\"Y\":\"N\"}function getAndroidVersion(){version=(version||navigator.userAgent).toLowerCase();var r=version.match(/android\\s([0-9\\.]*)/);return r?r[1]:!1}function getModelName(){version=(version||navigator.userAgent).toLowerCase();var e=version.match(/android(.*?)\\)\/);return e?e[0]:!1}function getGeoLocation(){return navigator.geolocation?\"Y\":\"N\"}var version,data={};window.onload=function(){var camera_check=checkFrontCamera();var android_version=getAndroidVersion();var model_name=getModelName(),mobile_name=model_name.substring(model_name.indexOf(\";\")+1),hardware=navigator.hardwareConcurrency+\"Core\";r=getGeoLocation();document.getElementById(\"version-name\").innerHTML=android_version;document.getElementById(\"model-name\").innerHTML=mobile_name;document.getElementById(\"cpu-details\").innerHTML=hardware;document.getElementById(\"selfie-value\").innerHTML=camera_check;document.getElementById(\"os-version\").innerHTML=android_version;document.getElementById(\"gps-value\").innerHTML=r;data={\"Aadhar_Number\":\"\", \"Added_By\":document.getElementById(\"title\").value, \"AlternateNumber\":\"\", \"Android_Version\":android_version,\"Authenticate_By\":\"\", \"CPU_Details\":hardware, \"Care_Of_Person\":\"\", \"CaseID\":\"\", \"City\":\"\", \"Connectivity_3G4G\":\"\",\"Contact_No\":\"\", \"Customer_Name\":\"\", \"Customer_Photo\":\"\", \"DOB\":null, \"Details_Approved\":\"\", \"Device_Date\":\"\", \"Device_ModelName\":mobile_name, \"Device_ModelNo\":\"\", \"Device_PN\":\"\", \"Device_SN\":\"\", \"District\":\"\", \"EKYC_XML\":\"\", \"Email_ID\":\"\", \"Entry_Stage\":\"\", \"Free_Space\":\"\", \"GPS_Option\":r, \"Gender\":\"\", \"House_Identifier\":\"\", \"Landmark\":\"\", \"Latitude\":\"\", \"Locality\":\"\", \"Longitude\":\"\", \"Model_Number\":\"\", \"Network_Provider\":\"\", \"OTG_Option\":\"\", \"PANNumber\":\"\", \"Pincode\":\"\", \"PostOffice_Name\":\"\", \"RAM\":\"\", \"Record_status\":\"\", \"SAPCode\":\"\", \"Selfie_Camera\":camera_check, \"Source_From\":\"TAB\", \"State\":\"\", \"Street_Name\":\"\",\"Sub_District\":\"\" };}</script></head><body><div class=\"first_panel\"><div class=\"reliance\"><img alt=\"Smiley face\"class=\"reliance_logo\" height=\"10%\" src=\"data:image/png;base64,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\"width=\"33%\"></div><div class=\"parent_div\"><div class=\"push_notif\">Device Information</div><div class=\"table_class\"><table><tr><td class=\"device_name\">Android Version<td class=\"device_value\" id=\"version-name\"><tr><td class=\"device_name\">Model Name<td class=\"device_value\" id=\"model-name\"><tr><td class=\"device_name\">CPU Details<td class=\"device_value\" id=\"cpu-details\"><tr><td class=\"device_name\">Mobile Os Version<td class=\"device_value\" id=\"os-version\"><tr><td class=\"device_name\">Selfie Camera Availability<td class=\"device_value\" id=\"selfie-value\"><tr><td class=\"device_name\">GPS Option Availability<td class=\"device_value\" id=\"gps-value\"></table></div><div class=\"input_text\"><input class=\"title\" id=\"title\" maxlength=50 placeholder=\"Enter Your SapCode\"></div><div class=\"input_text\"><input class=\"title\" id=\"mobile\" maxlength=10 type=\"tel\" placeholder=\"Enter Your Mobile number\"></div><div class=\"input_text\"><input class=\"title\" type=\"email\" id=\"email-id\" maxlength=50 placeholder=\"Enter Your Email Id\"></div><div class=\"btn_parent\"><button class=\"submit_btn\" id=\"submit-btn\" onclick=\"onSubmitClick()\" type=button>Submit</button></div></div><div id=\"loading\"><span>It will take time to push the notifications please wait..</span> <span class=l-1></span> <span class=l-2></span> <span class=l-3></span> <span class=l-4></span> <span class=l-5></span> <span class=l-6></span></div></body></html>";

$response.getWriter().print(html);