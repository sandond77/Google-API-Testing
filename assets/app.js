//this function creates the map; it needs the css styling to render
  var map, infoWindow;
  var markers = [];
  
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.09024, lng: -95.712891},
      zoom: 4
    });

    infoWindow = new google.maps.InfoWindow;

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
  }
}




function mylocation(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      currentMarker(pos)
      map.setCenter(pos);
      map.setZoom(12);
      infoWindow.setContent("Your Current Location");
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}


$('#submit').click(function(event){
  event.preventDefault();
  console.log("test");
  console.log($('#address').val());
  var location = $('#address').val();
  $('#address').val("");
  mylocation()

  var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+ location + "&key=AIzaSyBpHkoMadHxCiRan1yfwVQ85q2ZxLiLOGI"

  $.ajax({
   url: queryURL,
   method: "GET"
   }).done(function(response) {
    console.log(response);
    var results = response.data;
    var coords = response.results["0"].geometry.location;
    console.log(coords)

    addMarker(coords)
  })
})


function addMarker(location) {
  var marker = new google.maps.Marker({
      position: location,
      title: 'Test',
      map:map
  });

  markers.push(marker);

  var restaurantInfo = new google.maps.InfoWindow({
      content: "Placeholder for Information" //use variable to fill this with restaurant info like the name/address/rating
  });

  marker.addListener('click', function() {
      restaurantInfo.open(map, marker); 
  })
}

function currentMarker(location) {
  var marker = new google.maps.Marker({
      position: location,
      title: 'Test',
      map:map
  });

  markers.push(marker);

  var restaurantInfo = new google.maps.InfoWindow({
      content: "Current Location" //use variable to fill this with restaurant info like the name/address/rating
  });

  restaurantInfo.open(map, marker);
}


//Removing Markers
$('#clear').click(function(event){
  event.preventDefault();
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
    }
})




