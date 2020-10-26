/** @param  {H.Map} map   A HERE Map instance within the application*/

// var latMaps;
// var lonMaps;

// function moveMapToCoord(map, latMaps, lonMaps){
//     map.setCenter({lat: latMaps, lng: lonMaps});
//     map.setZoom(13);
// }

// $("#btnLocation").on("click", moveMapToCoord(map, latMaps, lonMaps));
  
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

// Create the default UI components- NOT WORKING
//var ui = H.ui.UI.createDefault(map, defaultLayers);

// End of map initialization code /////////////////////////////////////////////////////////////////


// // Locate breweries on the map and add markers ////////////////////////////////////////////////////
// var brewCount = 3;
// var distance = 8047; // 5 miles, converted to meters

// var breweryLocations = function() {
//     var brewery0 = { 
//         lat: 42.4872222,
//         lng: -83.1424665 // River Rouge Brewing Co.
//     };

//     var brewery1 = {
//         lat: 42.4843005,
//         lng: -83.1364455 // ROAK Brewing Co.
//     };

//     var brewery2 = {
//         lat: 42.4679223,
//         lng: -83.1450194  // Urbanrest Brewing Co.
//     };

//     breweries = [brewery0, brewery1, brewery2];

//     // Define a variable holding SVG mark-up that defines an icon image:
//     var svgMarkup = '<svg width="24" height="24" ' +
//         'xmlns="http://www.w3.org/2000/svg">' +
//         '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
//         'height="22" /><text x="12" y="18" font-size="12pt" ' +
//         'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
//         'fill="white">B</text></svg>';

//     for (var i = 0; i < breweries.length; i++) {
//         // Create an icon, an object holding the latitude and longitude, and a marker:
//         var icon = new H.map.Icon(svgMarkup),
//             coords = {lat: breweries[i].lat, lng: breweries[i].lng},
//             marker = new H.map.Marker(coords, {icon: icon});

//         // Add the marker to the map and center the map at the location of the marker:
//         map.addObject(marker);
//         map.setCenter(coords);
//     }
//     ///////////////////////////////////////////////////////////////////////////////////////////////


//     // Routing ////////////////////////////////////////////////////////////////////////////////////

//     var routingParamArray = [];

//     // Create the parameters for the routing request:
//     for (var j = 0; j < breweries.length - 1; j++ ) {
//         var routingParameters = {
//             'routingMode': 'fast',
//             'transportMode': 'pedestrian',
//             // The start point of the route:
//             'origin': breweries[j].lat + "," + breweries[j].lng,
//             // The end point of the route:
//             'destination': breweries[j+1].lat + "," + breweries[j+1].lng,
//             // Include the route shape in the response
//             'return': 'polyline'
//         };
//         routingParamArray.push(routingParameters);
//     }
//     console.log(routingParamArray);

//     // Define a callback function to process the routing response:
//     var onResult = function(result) {

//         // ensure that at least one route was found
//         if (result.routes.length) {
//             result.routes[0].sections.forEach((section) => {
//                 // Create a linestring to use as a point source for the route line
//                 let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

//                 // Create a polyline to display the route:
//                 let routeLine = new H.map.Polyline(linestring, {
//                 style: { strokeColor: 'blue', lineWidth: 3 }
//                 });

//                 // Create a marker for the start point:
//                 let startMarker = new H.map.Marker(section.departure.place.location);

//                 // Create a marker for the end point:
//                 let endMarker = new H.map.Marker(section.arrival.place.location);

//                 // Add the route polyline and the two markers to the map:
//                 map.addObjects([routeLine, startMarker, endMarker]);

//                 // Set the map's viewport to make the whole route visible:
//                 map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
//             });
//         }
//     };
    
//     // Get an instance of the routing service version 8:
//     var router = platform.getRoutingService(null, 8);

//     // Call calculateRoute() with the routing parameters,
//     // the callback and an error callback function (called if a
//     // communication error occurs):
//     for (var k = 0; k < breweries.length - 1; k++) {
//         router.calculateRoute(routingParamArray[k], onResult,
//             function(error) {
//                 alert(error.message);
//         });
//     }

// };