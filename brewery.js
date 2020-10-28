/** @param  {H.Map} map   A HERE Map instance within the application*/
  
//Code taken from HERE Maps documentation ////////////////////////////////////////////////////
// Initialize communication with the platform
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
// window.addEventListener('resize', () => map.getViewPort().resize());

// Enable the event system on the map instance:
var mapEvents = new H.mapevents.MapEvents(map);

// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
new H.mapevents.Behavior(mapEvents);
///////////////////////////////////////////////////////////////////////////////////////////////

var x = document.getElementById("locale");
var stateLocale;
var currentLocation;
var radius = 1;

$(document).ready(function() {
    $("#brewlistHeader").hide();
})

$("#btnLocation").on("click", function(event){
    // function to see if browser supports geolocation
    event.preventDefault();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
});

//this will pull city name from longitude and latitude
function success(position) {
    var latMaps = position.coords.latitude;
    var lonMaps = position.coords.longitude;
    currentLocation = [latMaps, lonMaps];

    // From HERE Maps documentation: 
    // Define a variable holding SVG mark-up that defines an icon image:
    var svgMarkup = '<svg width="24" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
        'height="22" /><text x="12" y="18" font-size="12pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">Me</text></svg>';

    // Create an icon, an object holding the latitude and longitude, and a marker:
    var icon = new H.map.Icon(svgMarkup),
    coords = {lat: latMaps, lng: lonMaps},
    marker = new H.map.Marker(coords, {icon: icon});

    // Add the marker to the map and center the map at the location of the marker:
    map.addObject(marker);
    map.setCenter(coords);

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
	.then(function(state) {
        stateLocale = state.address.state;
        console.log(stateLocale);  
    })
}

var locations = [];

function brewery(cityLocale){

    $("#brewlistHeader").show();
    $("#brewlist").empty();

    // will get local brewery information based on the state
    var queryURL1 = "https://api.openbrewerydb.org/breweries?per_page=50&by_state="+stateLocale;
    var queryURL2 = "https://api.openbrewerydb.org/breweries?page=2&per_page=50&by_state="+stateLocale;
    var queryURL3 = "https://api.openbrewerydb.org/breweries?page=3&per_page=50&by_state="+stateLocale;
    var queryURL4 = "https://api.openbrewerydb.org/breweries?page=4&per_page=50&by_state="+stateLocale;
    var queryURL5 = "https://api.openbrewerydb.org/breweries?page=5&per_page=50&by_state="+stateLocale;
    var queryURL6 = "https://api.openbrewerydb.org/breweries?page=6&per_page=50&by_state="+stateLocale;
    var queryURL7 = "https://api.openbrewerydb.org/breweries?page=7&per_page=50&by_state="+stateLocale;

    queryURL = [queryURL1, queryURL2, queryURL3, queryURL4, queryURL5, queryURL6, queryURL7];

    // Perfoming an AJAX GET request to our queryURL
    for (var m = 0; m < 8; m++) {
        $.ajax({
            url: queryURL[m],
            method: "GET"
        })

        // After the data from the AJAX request comes back
        .then(function(response) {
            console.log(queryURL);
            console.log(response);

            for(var i=0; i < response.length; i++) {
                response[i].latitude
                response[i].longitude

                var p1 = new H.geo.Point(response[i].latitude, response[i].longitude);
                var p2 = new H.geo.Point(currentLocation[0], currentLocation[1]);
                var dist = (p1.distance(p2))/1609; 

                if (dist < radius) {
                    var brewNum = i+1;
                    var brewName = response[i].name;
                    var zipCode = response[i].postal_code.substr(0,5);
                    var cityState = " " + response[i].city + ", " + response[i].state + " " + response[i].postal_code;
                    var cityState = " " + response[i].city + ", " + response[i].state + " " + zipCode;
                    var phone = response[i].phone;

                    if (phone === "") {
                        var formatted = "Unlisted";
                    } else {
                        var formatted = "(" + phone.substr(0, 3)+ ") " + phone.substr(3, 3) + '-' + phone.substr(6,4);
                    }

                    var webLinkaddress = response[i].website_url;

                    locations[i] = {
                        brewLat: response[i].latitude,
                        brewLon: response[i].longitude
                    }

                    console.log(webLinkaddress);

                    var startCard = $("<div>");
                    startCard.addClass("brewCard");

                    var indCard = $("<div>");
                    indCard.attr("id", "brewCards" + brewNum);

                    var webLink = $("<A>");
                    webLink.addClass("link");
                    webLink.attr({id: "weblink-" + brewNum});

                    if (webLinkaddress === "") {
                        var webLinktext = "Unknown";
                        console.log(webLinkaddress);
                    } else {
                        webLink.attr("href", webLinkaddress);
                        var webLinktext = webLinkaddress.replace("http://","");
                    }

                    webLink.text(webLinktext);
                
                    var nameHeader = $("<h4>");
                    nameHeader.addClass("header4");
                    nameHeader.attr({id: "name-" + brewNum});
                    nameHeader.css("margin-bottom", "0px");
                    nameHeader.text(brewName);

                    var buttonSpan = $("<span>");
                    var breweryBtn = $("<button>");
                    breweryBtn.addClass("breweryButton");
                    breweryBtn.attr({id: brewNum - 1});
                    breweryBtn.text("Add to Map");

                    buttonSpan.append(breweryBtn);
                    nameHeader.append(buttonSpan);
                    
                    var breweryPar1 = $("<p>");
                    breweryPar1.addClass("type");
                    breweryPar1.attr({id: "typeP-" + brewNum});
                    breweryPar1.text("Type: " + response[i].brewery_type);

                    var breweryPar2 = $("<p>");
                    breweryPar2.addClass("address");
                    breweryPar2.css("margin", "0px");
                    breweryPar2.attr({id: "addressP-" + brewNum});
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
                    breweryPar4.text("Phone: " + formatted);

                    var website = $("<span>");
                    website.addClass("website");
                    website.attr({id:"Website-" + brewNum});
                    website.text("Website:")


                    //This is where the information will be placed in the appropriate
                    //card
                    // startCard.empty();
                    website.append(webLink);
                    indCard.append(nameHeader);
                    indCard.append(breweryPar1);
                    indCard.append(breweryPar2);
                    indCard.append(breweryPar3);
                    indCard.append(breweryPar4);
                    indCard.append(website);
                    startCard.append(indCard);
                    $("#brewlist").append(startCard);
                }
            }
        })
    }
};

var breweriesClicked = [];
console.log(breweriesClicked);

// Add a marker to the map when a brewery button is clicked:
$(document).on("click", ".breweryButton", function() {

    // Define a variable holding SVG mark-up that defines an icon image:
    var svgMarkup = '<svg width="24" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
        'height="22" /><text x="12" y="18" font-size="12pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">B</text></svg>';

    // Create an icon, an object holding the latitude and longitude, and a marker:
    var icon = new H.map.Icon(svgMarkup),
        coords = {lat: locations[this.id].brewLat, lng: locations[this.id].brewLon},
        marker = new H.map.Marker(coords, {icon: icon});

    // Add the marker to the map and center the map at the location of the marker:
    map.addObject(marker);
    map.setCenter(coords);

    breweriesClicked.push({lat: locations[this.id].brewLat, lng: locations[this.id].brewLon});

    // if two breweries have been clicked, add Calculate Route button
    if (breweriesClicked.length === 2) {
        var newBtn = $("<button>");
        var newSpan = $("<span>");

        newBtn.addClass("routeButton");
        newBtn.attr({id: "route"});
        newBtn.text("Calculate Route");

        newSpan.append(newBtn);
        $("#brewlistHeader").append(newSpan);
    }

});

$(".btnSubmit").on("click", function(event) {
    event.preventDefault();

    radius = $("#userDistance").val();
    console.log(radius);

    brewery(stateLocale);
});

// Routing ////////////////////////////////////////////////////////////////////////////////////

var routingParamArray = [];

$(document).on("click", ".routeButton", function() {

    breweriesClicked.push({lat: currentLocation[0], lng: currentLocation[1]});
    breweriesClicked.unshift({lat: currentLocation[0], lng: currentLocation[1]});

    // Create the parameters for the routing request:
    for (var j = 0; j < breweriesClicked.length - 1; j++ ) {
        var routingParameters = {
            'routingMode': 'fast',
            'transportMode': 'pedestrian',
            // The start point of the route:
            'origin': breweriesClicked[j].lat + "," + breweriesClicked[j].lng,
            // The end point of the route:
            'destination': breweriesClicked[j+1].lat + "," + breweriesClicked[j+1].lng,
            // Include the route shape in the response
            'return': 'polyline'
        };
        routingParamArray.push(routingParameters);
    }
    console.log(routingParamArray);

    // Define a callback function to process the routing response:
    var onResult = function(result) {

        // ensure that at least one route was found
        if (result.routes.length) {
            result.routes[0].sections.forEach((section) => {
                // Create a linestring to use as a point source for the route line
                let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

                // Create a polyline to display the route:
                let routeLine = new H.map.Polyline(linestring, {
                style: { strokeColor: 'blue', lineWidth: 3 }
                });

                // Create a marker for the start point:
                let startMarker = new H.map.Marker(section.departure.place.location);

                // Create a marker for the end point:
                let endMarker = new H.map.Marker(section.arrival.place.location);

                // Add the route polyline and the two markers to the map:
                map.addObjects([routeLine, startMarker, endMarker]);

                // Set the map's viewport to make the whole route visible:
                map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
            });
        }
    };

    // Get an instance of the routing service version 8:
    var router = platform.getRoutingService(null, 8);

    // Call calculateRoute() with the routing parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):
    for (var k = 0; k < breweriesClicked.length - 1; k++) {
        router.calculateRoute(routingParamArray[k], onResult,
            function(error) {
                alert(error.message);
        });
    }
    
});