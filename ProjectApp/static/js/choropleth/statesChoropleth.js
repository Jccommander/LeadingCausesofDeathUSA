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
  var item2 = choroplethGenerator("2016","Alzheimer's disease").then((result) => {overlayMaps.Alzheimers=result});
  var item3 = choroplethGenerator("2016","Cancer").then((result) => {overlayMaps.Cancer=result});
  var item4 = choroplethGenerator("2016","CLRD").then((result) => {overlayMaps.CLRD=result});
  var item5 = choroplethGenerator("2016","Diabetes").then((result) => {overlayMaps.Diabetes=result});
  var item6 = choroplethGenerator("2016","Heart disease").then((result) => {overlayMaps.Heart_Disease=result});
  var item7 = choroplethGenerator("2016","Influenza and pneumonia").then((result) => {overlayMaps.Influenza_and_Pneumonia=result});
  var item8 = choroplethGenerator("2016","Kidney disease").then((result) => {overlayMaps.Kidney_Disease=result});
  var item9 = choroplethGenerator("2016","Stroke").then((result) => {overlayMaps.Stroke=result});
  var item10 = choroplethGenerator("2016","Suicide").then((result) => {overlayMaps.Suicide=result});
  var item11 = choroplethGenerator("2016","Unintentional injuries").then((result) => {overlayMaps.Accidents=result});

Promise.all([item1,item2,item3,item4,item5,item6,item7,item8,item9,item10,item11]).then(function() {
  var myMap = L.map("map", {
    center: [37.8, -96],
    zoom: 4,
    layers: [mapLayer, overlayMaps.All_Causes]
  });
    // Control is added, with only overlayMaps as its base layer to ensure that only one choropleth
  // can be selected at a time
  L.control.layers(overlayMaps,null,{collapsed:false}).addTo(myMap);

    // Set up the legend
    var legend = L.control({ position: "topleft" });
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
  
      // Add min & max
      var legendInfo = "<form action='/'>" + "<input type=submit class='homeBtn' value='Return to Homepage'>";
  
      div.innerHTML = legendInfo;
      
      return div;
    };
  
    // Adding legend to the map
    legend.addTo(myMap);

}).catch(console.error);