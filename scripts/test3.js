var myCallback = function(data) {
      console.log(data);
    };

var surl = "http://124.124.218.136/rlife2/mowblyserver/getExpertCallBlobImages/rellife/prod/RlifeAssist?activity_id=91"
$.ajax({
    type: 'GET',
    url: surl,
    contentType: "application/json; charset=utf-8",
    dataType: "jsonp",
	jsonp: 'callback',
  jsonpCallback: myCallback,
    success: function(msg) {
debugger
        console.log(msg);
    },
    error: function(xhr, ajaxOptions, thrownError) { 
debugger
        alert(xhr.statusText);
        alert(xhr.responseText);
        alert(xhr.status);
        alert(thrownError); 
    },
    async: false,
    cache: false
});