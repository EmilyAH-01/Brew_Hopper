/** @param  {H.Map} map   A HERE Map instance within the application*/


// Will remove these test cases after global variables are defined elsewhere in the project
// Downtown Royal Oak:
var latLocal = 42.4778;
var lngLocal= -83.1301;

function moveMapToCoord(map){
    map.setCenter({lat: latLocal, lng: lngLocal});
    map.setZoom(12);
}
  

//Boilerplate map initialization code starts below: ////////////////////////////////////////////

//Step 1: initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey
var platform = new H.service.Platform({
    apikey: "WA5zgFYxYEOnCCMo-GZ0kZY3fQYwbCt3VT0Wdmrs_00"
});

// Obtain the default map types from the platform
var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map centered over coordinates defined by latLocal and lngLocal variables
var map = new H.Map(document.getElementById('mapContainer'), defaultLayers.vector.normal.map, {
    center: {lat: latLocal, lng: lngLocal},
    zoom: 10,
    pixelRatio: window.devicePixelRatio || 1
});

// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

//Step 3: make the map interactive
// Enable the event system on the map instance:
var mapEvents = new H.mapevents.MapEvents(map);

// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
new H.mapevents.Behavior(mapEvents);

// Create the default UI components- NOT WORKING
// var ui = H.ui.UI.createDefault(map, defaultLayers);

// Now use the map as required...
window.onload = function () {
moveMapToCoord(map);
}
// End of map initialization code /////////////////////////////////////////////////////////////////

var brewCount = 3;
var distance = 8047; // 5 miles, converted to meters

// // Instantiate a circle object (using the default style): MAY NOT WANT THIS
// var circle = new H.map.Circle({lat: latLocal, lng: lngLocal}, distance);
// // Add the circle to the map:
// map.addObject(circle);

var breweries = {
    0: [42.4843005,-83.1364455], // River Rouge Brewing Co.
    1: [42.4843005,-83.1364455], // ROAK Brewing Co.
    2: [42.4679223,-83.1450194]  // Urbanrest Brewing Co.
};



// TO DO
// 
// Map starts out centered over the US, not zoomed in
// When user opens page, the user either presses a button to get their location or location is retrieved automatically
// Map zooms in to user's location
//
// After user enters brewery search parameters and clicks a button:
// (Brewery API will find the number of breweries specified, within a certain distance, returning their coordinates)
// Map will display markers at locations of breweries
// Calculate a route
// Display route on map
//
// Clear map after user enters new criteria