// Add the tile layer
var mapLayer = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

// Create an initiator function for the map, so that the map can be initialized after all json calls
// are completed.
function initMap(mapLayer) {

  // The initializing map layer is then added, along with base layers
  var myMap = L.map("map", {
    center: [37.8, -96],
    zoom: 4,
    layers: [mapLayer, overlayMaps.All_Causes]
  });
  
  // Lastly the control is added, with only overlayMaps as its base layer to ensure that only one choropleth
  // can be selected at a time
  L.control.layers(overlayMaps,null,{collapsed:false}).addTo(myMap);

};

var overlayMaps = {}

var item1 = choroplethGenerator("2016","All causes").then((result) => {overlayMaps.All_Causes=result});
var item2 = choroplethGenerator("2016","Diabetes").then((result) => {overlayMaps.Diabetes=result});

Promise.all([item1,item2]).then(function() {
var myMap = L.map("map", {
  center: [37.8, -96],
  zoom: 4,
  layers: [mapLayer, overlayMaps.All_Causes]
});
  // Lastly the control is added, with only overlayMaps as its base layer to ensure that only one choropleth
// can be selected at a time
L.control.layers(overlayMaps,null,{collapsed:false}).addTo(myMap);
}).catch(console.error);