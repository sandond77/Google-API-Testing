
//this function creates the map; it needs the css styling to render
  var map, infoWindow;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.09024, lng: -95.712891},
      zoom: 4
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
        map.setZoom(12);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

    var tester = {
      lat: 37.845185, 
      lng: -122.296548
    }

    var marker = new google.maps.Marker({
      position: tester,
      map: map
    });

    function addMarker(location, map) {
      var marker = new google.maps.Marker({
          position: location,
          title: 'Test',
          map:map
      });
    }

    addMarker(blah,map);
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }



// $("#submit").on("click", function(event) {
//     event.preventDefault();
// 	location = $("#address").val().trim();
// 	// location = location.split("");

// 	queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address"+ location + "&key=AIzaSyBpHkoMadHxCiRan1yfwVQ85q2ZxLiLOGI"

// 	$.ajax({
// 	url: queryURL,
// 	method: "GET"
// 	}).done(function(response) {
// 		console.log(response);
// 		var results = response.data;
// 	})
// })

var blah = {
  lat: 37.726564, 
  lng:-122.139903
}

