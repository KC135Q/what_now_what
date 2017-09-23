
// Initialize Firebase
    var BrewURl = "http://api.brewerydb.com/v2/locations?locality=";
    var Brewapikey = "&key=ac5930d09beb42c41b1efe71c200663f";
    var config = {
        apiKey: "AIzaSyCeO2pJyC2sMBOWu1XRoYBwvR4c5fa8ZtA",
        authDomain: "nowwhatgp.firebaseapp.com",
        databaseURL: "https://nowwhatgp.firebaseio.com",
        projectId: "nowwhatgp",
        storageBucket: "nowwhatgp.appspot.com",
        messagingSenderId: "949578161398"
    };
    firebase.initializeApp(config);
    var database = firebase.database();







   // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.866, lng: 151.196},
          zoom: 15
        });

        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);

        service.getDetails({
          placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
        }, function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
            });
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                'Place ID: ' + place.place_id + '<br>' +
                place.formatted_address + '</div>');
              infowindow.open(map, this);
            });
          }
        });
      }


      $("#submits").on("click", function() {
        event.preventDefault();

        var City = $("#citySearch").val().trim();
        // the following removes any spaces
        City = City.replace(/\s/g,'');
        console.log(City);
        database.ref().set({
            CityName: City
        });
        var Brewapi = BrewURl + City + Brewapikey;
         console.log(Brewapi);
        $.ajax({
                url: Brewapi,
                method: "GET"
            })
            .done(function(response) {
                console.log(response);
                var results = response.data;
                console.log(results[0]);
                console.log(results[0].streetAddress);
                console.log(results[0].brewery);
                console.log(results[0].brewery.name);
                console.log(results[7].brewery.name);
                namesdd = results[2].brewery.name;
                namesddd = results[7].brewery.name;
                $('#red').append(
        "<p>" + namesddd + "</p>"  +
        "<p>" + namesdd + "</p>"
        // "</td><td id='freqDisplay'>" + theFrequency +
        // "</td><td id='nextDisplay'>" + arrivalTime +
        // "</td><td id='awayDisplay'>" + minutesAway + 
        );
            

            });

    });


    

