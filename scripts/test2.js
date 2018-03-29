$m.onReady(function(){
	// Code to execute when the page is ready
});

function getAddress(){
	var location_code = juci.getControl("location_code").value();
	var data = {
		"location_code":location_code
	};
	testConnector.getAddress(data,function(serverResponse){
		var response = JSON.parse(serverResponse.data);
		var result = response.code;
			if(result == 103){
				getServerAddress(response);
			}else{
				$m.alert("Error while updating Database");
			}
	});	
}

function getServerAddress(res){
  	var destAddress = [];
  	if(res.code == 103){
  		//for(var i=0;i< res.entities[0].length;i++){
  			var address = res.entities[0].Address_Line1;
//  			var add = address.lastIndexOf(" ");
//			var date_checkedIn = date_string.substring(0,date_checked);
  			/*if(latitude !== "null"){
  				var lat1 = latitude;
  			}
  			if(longitude !== "null"){
  				var long1 = longitude;
  			}*/
  			
  	//	}
  		getDestinationLatLong(address);
  	}
  }
  
   function getDestinationLatLong(destAddress){
  	var geocoder = new google.maps.Geocoder();
  	infowindow = new google.maps.InfoWindow();
  	if(destAddress.length != null){
  	//	for(var j=0;j<destAddress.length;j++){
  			//getDistanceMatrix(destAddress[j]);
  		/*	geocoder.geocode({'address': destAddress}, function(results, status) {
	          if (status === 'OK') {
	            /*var destMarker = new google.maps.Marker({
	              map: map,
	              position: results[0].geometry.location
	            });
	            
				var cityCircle = new google.maps.Circle({
					strokeColor: '#326BAD',
					strokeOpacity: 0.8,
					strokeWeight: 2,
					fillColor: '#oD9E4F1',
					fillOpacity: 0.15,
					map: map,
					center: results[0].geometry.location,
					radius: 500
				});*/
				
	            /*google.maps.event.addListener(destMarker, 'click', function() {
		            infowindow.setContent(results[0].formatted_address);
		            //console.log(results[0].formatted_address);
					//infowindow.open(map, destMarker);
	            });*/
	           /* getDestinationLatLong(results[0].geometry.location);
	             
	          } else {
	            alert('Geocode was not successful for the following reason: ' + status);
	          }
        	});	*/
  	//	} 
  	var searchBox = new google.maps.places.SearchBox(destAddress);
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(destAddress);
  	} 
  }
  
  
 function getDestinationLatLong(){
  	//var check = juci.dataset("checktimeObj");
  	var geocoder = new google.maps.Geocoder();
  	infowindow = new google.maps.InfoWindow();
//  	var latit = parseFloat(latitude);
//  	var longi = parseFloat(longitude);
//  	var latlng = {lat :latit,lng : longi};
//  	var p1 = new google.maps.LatLng(lat, long);
//	var p2 = new google.maps.LatLng(latit, longi);
//  	var destMarker = new google.maps.Marker({
//      map: map,
//      position: latlng,
//      icon:('images/Location.png')
//    });
//	var cityCircle = new google.maps.Circle({
//			strokeColor: '#BFC9CA',
//			strokeOpacity: 0.8,
//			strokeWeight: 3,
//			fillColor: '#21618C',
//			fillOpacity: 0.25,
//			map: map,
//			center: latlng,
//			radius: check.radius
//		});
  	geocoder.geocode({ 'latLng': latlng }, function (results, status) {
  		if (status == google.maps.GeocoderStatus.OK) {
			if(results[1]){
		 		 google.maps.event.addListener(destMarker, 'click', function() {
		            infowindow.setContent(results[1].formatted_address);
		            //console.log(results[0].formatted_address);
					infowindow.open(map, destMarker);
	            });
	            getDistanceMatrix(results[1].formatted_address,p1,p2);
			 	}
	        }
	  }); 
  }