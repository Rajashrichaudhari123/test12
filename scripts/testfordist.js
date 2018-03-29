$m.onReady(function(){
	// Code to execute when the page is ready
	//distance(19.1550,72.8529,17.4468044,78.3854113);
	//alert(calcDistance(p1, p2));
	//var address = "9th and 10th flr.,Building No 2 R. Tech Park Western Express Highway,Goregaon,Mumbai 400063";
	initAutocomplete();
});

//function distance(lat1, lon1, lat2, lon2, unit) {
//	debugger;
//	var radlat1 = Math.PI * lat1/180
//	var radlat2 = Math.PI * lat2/180
//	var theta = lon1-lon2
//	var radtheta = Math.PI * theta/180
//	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
//	dist = Math.acos(dist)
//	dist = dist * 180/Math.PI
//	dist = dist * 60 * 1.1515
//	if (unit=="K") { dist = dist * 1.609344 }
//	if (unit=="N") { dist = dist * 0.8684 }
//	console.log(dist);
//	return dist;
//}

/*var p1 = new google.maps.LatLng(19.1574912, 72.8572746);
var p2 = new google.maps.LatLng(19.1556166, 72.8531819);



//calculates distance between two points in km's
function calcDistance(p1, p2) {
  return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
}*/


 function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13,
          mapTypeId: 'roadmap'
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
//        map.addListener('bounds_changed', function() {
//          searchBox.setBounds(map.getBounds());
//        });

//        var markers = [];
//        // Listen for the event fired when the user selects a prediction and retrieve
//        // more details for that place.
//        searchBox.addListener('places_changed', function() {
//          var places = searchBox.getPlaces();
//
//          if (places.length == 0) {
//            return;
//          }
//
//          // Clear out the old markers.
//          markers.forEach(function(marker) {
//            marker.setMap(null);
//          });
//          markers = [];
//
//          // For each place, get the icon, name and location.
//          var bounds = new google.maps.LatLngBounds();
			var places = searchBox.getPlaces();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };
});
            // Create a marker for each place.
//            markers.push(new google.maps.Marker({
//              map: map,
//              icon: icon,
//              title: place.name,
//              position: place.geometry.location
//            }));
//
//            if (place.geometry.viewport) {
//              // Only geocodes have viewport.
//              bounds.union(place.geometry.viewport);
//            } else {
//              bounds.extend(place.geometry.location);
//            }
//          });
//          map.fitBounds(bounds);
      }