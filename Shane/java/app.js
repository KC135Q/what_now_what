$(document).ready(function() {
    $("#red").hide();
    $("#blue").hide();
    $("#green").hide();
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

    $("#submits").on("click", function() {
        event.preventDefault();

        var City = $("#citySearch").val().trim();
        // the following removes any spaces
        City = City.replace(/\s/g, '+');
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
                // for (var i = 0; i < results.length; i++) {
                //     results[i]
                //}
                console.log(results);
                var add1 = results[0].streetAddress;
                var add2 = results[1].streetAddress;
                var add3 = results[2].streetAddress;

                console.log(results[0].name);

                var names1 = results[0].brewery.name;
                var names2 = results[1].brewery.name;
                var names3 = results[2].brewery.name;
                var phone1 = results[0].phone;
                var phone2 = results[1].phone;
                var phone3 = results[2].phone;
                var site1 = results[0].brewery.website;
                var site2 = results[1].brewery.website;
                var site3 = results[2].brewery.website;
                var site3 = results[2].brewery.website;


                $('#red').append(
                    "<p>" + names1 + "</p>" +
                    "<p>" + add1 + "</p>" +
                    "<p>" + phone1 + "</p>" +
                    "<a href=>" + site1 + "</a>"

                );
                $('#blue').append(
                    "<p>" + names2 + "</p>" +
                    "<p>" + add2 + "</p>" +
                    "<p>" + phone2 + "</p>" +
                    "<a href=>" + site2 + "</a>"

                );
                $('#green').append(
                    "<p>" + names3 + "</p>" +
                    "<p>" + add3 + "</p>" +
                    "<p>" + phone3 + "</p>" +
                    "<a href=>" + site3 + "</a>"

                );
                $("#red").show();
                $("#blue").show();
                $("#green").show();
            });

    });


    

});