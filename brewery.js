/** @param  {H.Map} map   A HERE Map instance within the application*/
  
//Boilerplate map initialization code starts below: ////////////////////////////////////////////

//Step 1: initialize communication with the platform
var platform = new H.service.Platform({
    apikey: "WA5zgFYxYEOnCCMo-GZ0kZY3fQYwbCt3VT0Wdmrs_00"
});

// Obtain the default map types from the platform
var defaultLayers = platform.createDefaultLayers();

// Initialize a map centered over coordinates defined by latLocal and lngLocal variables
var map = new H.Map(document.getElementById("mapContainer"), defaultLayers.vector.normal.map, {
    center: {lat: 38.0000, lng: -97.0000}, // Geographic center or contiguous US
    zoom: 4,
    pixelRatio: window.devicePixelRatio || 1
});

// Add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

// Enable the event system on the map instance:
var mapEvents = new H.mapevents.MapEvents(map);

// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
new H.mapevents.Behavior(mapEvents);
///////////////////////////////////////////////////////////////////////////////////////////////

var x = document.getElementById("locale");

//this will pull city name from longitude and latitude
function success(position) {
    var latMaps = position.coords.latitude;
    var lonMaps = position.coords.longitude;
    map.setCenter({lat: latMaps, lng: lonMaps});
    map.setZoom(13);

    var latLocal = "&lat=" + position.coords.latitude;
    var lngLocal = "&lon=" + position.coords.longitude;
    var myAPI = "pk.e571425f77b016689b9002ca2f527825";

    var cityURL = "https://us1.locationiq.com/v1/reverse.php?key=";
    var queryURL =  cityURL + myAPI + latLocal + lngLocal + "&format=json";
    console.log("Latitude: " + latLocal);
    console.log("Longitude: " + lngLocal);
    console.log(queryURL);

    $.ajax({
		url: queryURL,
		method: "GET"

	})

	.then(function(city) {

    console.log(city);
    var cityLocale = city.address.city;

    //brewery(cityLocale);
    })
}

// function to see if browser supports geolocation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

$("#btnLocation").on("click", getLocation());


function brewery(cityLocale){
// will get local brewery information based on the city
// need to fiqure out how to pull other breweries from a radius
var queryURL = "https://api.openbrewerydb.org/breweries?by_city="+cityLocale;

    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
    url: queryURL,
    method: "GET"
    })

    // After the data from the AJAX request comes back
    .then(function(response) {
        console.log(queryURL);
        console.log(response);

        // x.innerHTML = "Latitude: " + latLocal+ 
        // "<br>Longitude: " + lngLocal+
        // "<br>City: " + cityLocale;

        for(var i=0; i < response.length; i++) {

                var brewNum = i+1;
                var brewName = response[i].name;
                var cityState = " " + response[i].city + ", " + response[i].state + " " + response[i].postal_code;
    
                var webLinkaddress = response[i].website_url;

                // if (webLinkaddress == "");
                //     webLinkaddress = "Unknown";


                console.log(webLinkaddress);

                var startCard = $("<div>");
                startCard.attr("id", "brewCards" + brewNum);

                var indCard = $("<div>");
                indCard.addClass("brewCard");

                var webLink = $("<A>");
                webLink.addClass("link");
                webLink.attr({id: "weblink-" + brewNum});
                webLink.attr("href", webLinkaddress);
                webLink.text(webLinkaddress);
                
            
                var nameHeader = $("<h4>");
                nameHeader.addClass("header4");
                nameHeader.attr({id: "name-"+ brewNum});
                nameHeader.css("margin-bottom", "0px");
                nameHeader.text(brewName);

                var breweryPar1 = $("<p>");
                breweryPar1.addClass("type");
                breweryPar1.attr({id: "typeP-" + brewNum
                });
                breweryPar1.text("Type: " + response[i].brewery_type);

                var breweryPar2 = $("<p>");
                breweryPar2.addClass("address");
                breweryPar2.css("margin", "0px");
                breweryPar2.attr({id: "addressP-" + brewNum
                });
                breweryPar2.text(response[i].street);
                
                var breweryPar3 = $("<span>");
                breweryPar3.addClass("city_state");
                breweryPar3.attr({id:"city_state-" + brewNum});
                breweryPar3.text(cityState);

                console.log(cityState);

                //this is for the phone number - Need to format phone number
                var breweryPar4 = $("<p>");
                breweryPar4.addClass("Phone");
                breweryPar4.attr({id:"Phone-" + brewNum});
                breweryPar4.text("Phone: " + response[i].phone);

                var website = $("<span>");
                website.addClass("website");
                website.attr({id:"Website-" + brewNum});
                website.text("Website:")


                //This is where the information will be placed in the appropriate
                //card
                startCard.empty();
                website.append(webLink);
                indCard.append(nameHeader);
                indCard.append(breweryPar1);
                indCard.append(breweryPar2);
                indCard.append(breweryPar3);
                indCard.append(breweryPar4);
                indCard.append(website)
                startCard.append(indCard);
                $("#brewlist").append(startCard);
        }    
        


    })


}