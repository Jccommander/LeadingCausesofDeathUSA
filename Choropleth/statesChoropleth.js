// Add the tile layer
var mapLayer = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });


  // Initialize the overlay maps object, leaving it empty for now; it's there so choropleth layers can be
  // pushed to it

  var overlayMaps = {}

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

  // Link to the JSON object, currently only here for designing and testing the Choropleth
  var jsonLink = "https://data.cdc.gov/api/views/bi63-dtpu/rows.json?accessType=DOWNLOAD";


  // Use a .then method (NOTE: everything must be within the then method or the choropleth won't correctly
  // show up)
  d3.json(jsonLink).then(function(response) {

    // Uncomment this line if one wants to explore the json
    //console.log(response.data);
  
  // For loop that loops through everything returned by the JSON
  for(var i = 0; i < response.data.length; i++) {
      // specify the desired metrics using an if statement
      if(response.data[i][8] == "2016" && response.data[i][10] == "All causes" && response.data[i][11] != "United States") {
        // Once desired objects are found, loop through the geoJSON and compare the state name in response
        // to the state name in the geoJSON
          for(var j = 0; j < statesData.features.length; j++) {
              if(statesData.features[j].properties.name === response.data[i][11]) {
                // Set the desired value to the density property in the geoJSON, be sure to parse string
                // to integer considering that the response JSON returns a string initially
                  statesData.features[j].properties.density = parseInt(response.data[i][13]);
                  break;
              }
          }
      }
  }

  // set the Choropleth map layer
  var allCauses = L.choropleth(statesData, {

    // Use the density property, as it holds the death rate data from above
    valueProperty: "density",

    // Set color scale
    scale: ["#ffffb2", "#b10026"],

    // Use 10 steps, as a good general step count
    steps: 10,

    // Use mode "q"
    mode: "q",
    style: {
      // Set the border color and variables
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },
    // Add the geojson layer to the map object for display
  });

  overlayMaps.All_Causes = allCauses;

  });

  // Create an entirely new json call and choropleth object to add a new layer to the map
 
  d3.json(jsonLink).then(function(response) {
  
  // For loop that loops through everything returned by the JSON
  for(var i = 0; i < response.data.length; i++) {
      // specify the desired metrics using an if statement
      if(response.data[i][8] == "2016" && response.data[i][10] == "Diabetes" && response.data[i][11] != "United States") {
        // Once desired objects are found, loop through the geoJSON and compare the state name in response
        // to the state name in the geoJSON
          for(var j = 0; j < statesData.features.length; j++) {
              if(statesData.features[j].properties.name === response.data[i][11]) {
                // Set the desired value to the density property in the geoJSON, be sure to parse string
                // to integer considering that the response JSON returns a string initially
                  statesData.features[j].properties.density = parseInt(response.data[i][13]);
                  break;
              }
          }
      }
  }

  // set the Choropleth map layer
  var diabetes = L.choropleth(statesData, {

    // Use the density property, as it holds the death rate data from above
    valueProperty: "density",

    // Set color scale
    scale: ["#ffffb2", "#b10026"],

    // Use 10 steps, as a good general step count
    steps: 10,

    // Use mode "q"
    mode: "q",
    style: {
      // Set the border color and variables
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },
    // Add the geojson layer to the map object for display
  });

  overlayMaps.Diabetes = diabetes;

  });

  
  // Final call for the test of layering

  d3.json(jsonLink).then(function(response) {
  
  // For loop that loops through everything returned by the JSON
  for(var i = 0; i < response.data.length; i++) {
      // specify the desired metrics using an if statement
      if(response.data[i][8] == "2016" && response.data[i][10] == "Heart disease" && response.data[i][11] != "United States") {
        // Once desired objects are found, loop through the geoJSON and compare the state name in response
        // to the state name in the geoJSON
          for(var j = 0; j < statesData.features.length; j++) {
              if(statesData.features[j].properties.name === response.data[i][11]) {
                // Set the desired value to the density property in the geoJSON, be sure to parse string
                // to integer considering that the response JSON returns a string initially
                  statesData.features[j].properties.density = parseInt(response.data[i][13]);
                  break;
              }
          }
      }
  }

  // set the Choropleth map layer
  var heartDisease = L.choropleth(statesData, {

    // Use the density property, as it holds the death rate data from above
    valueProperty: "density",

    // Set color scale
    scale: ["#ffffb2", "#b10026"],

    // Use 10 steps, as a good general step count
    steps: 10,

    // Use mode "q"
    mode: "q",
    style: {
      // Set the border color and variables
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },
    // Add the geojson layer to the map object for display
  });

  overlayMaps.Heart_Disease = heartDisease;

  initMap(mapLayer);

  });