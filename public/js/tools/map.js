var map;
var markers = [];
var names = [];
var geographic_location = null;
var marker = null;
var infowindow = new google.maps.InfoWindow();
var myCenter = new google.maps.LatLng(10.068248347064115, -69.34201776981354);
var i = 0;

// draws the map receives as pararmetro the elemtento where it will be drawn
function drawMap() {
	var mapProp = {
		center : myCenter,
		zoom : 13,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("googleMapCauses"),mapProp);
	
	setTimeout('setCenter()', 200);
}

// allows the map fits the size where is drawn
function resizeMap() {
	google.maps.event.trigger(map, 'resize');
}

// add a marker to a map receives as a parameter the location (latitude and
// longitude)
function addMarker(location,content,name) {
	marker = new google.maps.Marker({
		position : location,
		map : map,
		animation : google.maps.Animation.DROP,
		icon : '/public/img/icon/favicon-32.png',
		title: name,
		content: content
	});
    createWindow(marker);
	markers.push(marker);
}

// returns a specific point on the map (latitude and longitude) in an array
function getGeographicLocation() {
	return geographic_location;
}

// sets the geographic location to null and clears all map markers
function clearGeographiLocation() {
	geographic_location = null;
	marker = null;
	deleteMarkers();
}

// Sets the map on all markers in the array.
function setAllMap(map) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
	setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
	setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
	clearMarkers();
	markers = [];
}

// add a specific marker for parameters passed
function locationReceived(lat, lng, name, description,url,id_avatar) {
	locationLatLng = new google.maps.LatLng(lat, lng);
	content = '<div class="row">'+
	'<div align="left" class="col-xs-4">'+
	'<img class="img-reponsive" src="http://www.heybees.com:5000/resource/public/view?resource_width=112&resource_height=70&id_resource='+id_avatar+'">'+
	'</div>'+
	'<div class="col-xs-8">'+
	'<h4 class="firstHeading">'+name+'</h4>'+
	'<div> <small>'+description+
	'<p><a href="'+url+'">Ver más</p>'+
	'</small></div>'+
	'</div> </div>';
	
	addMarker(locationLatLng,content, name);

}
function setCenter() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = new google.maps.LatLng(position.coords.latitude,
					position.coords.longitude);

			var infowindow = new google.maps.InfoWindow({
				map : map,
				position : pos,
				content : 'Your location.'
			});

			map.setCenter(pos);
		}, function() {
			handleNoGeolocation(true);
		});
	} else {
		// Browser doesn't support Geolocation
		handleNoGeolocation(false);
	}
}

function handleNoGeolocation(errorFlag) {
	if (errorFlag) {
		var content = 'Error: The Geolocation service failed.';
	} else {
		var content = 'Error: Your browser doesn\'t support geolocation.';
	}
}

function createWindow(marker) {
	  var infowindow = new google.maps.InfoWindow({
	    content: marker.content,
	    maxWidth: 330
	  });
	  
	  google.maps.event.addListener(marker, 'click', function() {
	    infowindow.open(marker.get('map'), marker);
	  });
	}



//function showWindow() {
//	infowindow.open(map, marker);
//}
google.maps.event.addDomListener(window, 'load', drawMap);