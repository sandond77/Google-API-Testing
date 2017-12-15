//this function creates the map; it needs the css styling to render
  var map, infoWindow;

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.09024, lng: -95.712891},
      zoom: 4
    });

    infoWindow = new google.maps.InfoWindow;

    //HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        // Re-enable the infowindows to display information about restaurant
        // infoWindow.setPosition(pos);
        // infoWindow.setContent('Location found.');
        addMarker(pos,map)
        // infoWindow.open(map);
        map.setCenter(pos);
        map.setZoom(12);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

    $('#submit').click(function(event){
      event.preventDefault();
      console.log("test");
      console.log($('#address').val());
      var location = $('#address').val();
      $('#address').val("");

      queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+ location + "&key=AIzaSyBpHkoMadHxCiRan1yfwVQ85q2ZxLiLOGI"

      $.ajax({
       url: queryURL,
       method: "GET"
       }).done(function(response) {
        console.log(response);
        var results = response.data;
        var coords = response.results["0"].geometry.location;
        console.log(coords)

        addMarker(coords,map)


      })
    })

    function addMarker(location, map) {
      var marker = new google.maps.Marker({
          position: location,
          title: 'Test',
          map:map
      });

      var restaurantInfo = new google.maps.InfoWindow({
          content: "Placeholder for Information" //use variable to fill this with restaurant info like the name/address/rating
      });

      marker.addListener('click', function() {
          restaurantInfo.open(map, marker); 
      })
    }

    $('#clear').click(function(event){
      event.preventDefault();
      clearMarker();
    })

  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

// $('#submit').click(function(event){
//   event.preventDefault();
//   console.log("test");
//   console.log($('#address').val());
//   var location = $('#address').val();
//   $('#address').val("");

//   queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+ location + "&key=AIzaSyBpHkoMadHxCiRan1yfwVQ85q2ZxLiLOGI"

//   $.ajax({
//    url: queryURL,
//    method: "GET"
//    }).done(function(response) {
//     console.log(response);
//     var results = response.data;
//     var coords = response.results["0"].geometry.location;
//     console.log(coords)


//    })
// })



