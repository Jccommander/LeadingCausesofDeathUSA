// Initialize the map
var myMap = L.map('map').setView([37.8, -96], 4);
  
  // Add the tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);

  var jsonLink = "https://data.cdc.gov/api/views/bi63-dtpu/rows.json?accessType=DOWNLOAD";

  d3.json(jsonLink).then(function(response) {
  
  for(var i = 0; i < response.data.length; i++) {
      if(response.data[i][8] == "2016" && response.data[i][9] == "All Causes" && response.data[i][11] != "United States") {
          for(var j = 0; j < statesData.features.length; j++) {
              if(statesData.features[j].properties.name === response.data[i][11]) {
                  statesData.features[j].properties.density = parseInt(response.data[i][13]);
                  break;
              }
          }
      }
  }

  geojson = L.choropleth(statesData, {

    // Define what  property in the features to use
    valueProperty: "density",

    // Set color scale
    scale: ["#ffffb2", "#b10026"],

    // Number of breaks in step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },
  }).addTo(myMap);

  });
  
  console.log(statesData);