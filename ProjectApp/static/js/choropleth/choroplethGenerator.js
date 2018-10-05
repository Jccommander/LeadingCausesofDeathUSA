var jsonLink = "https://data.cdc.gov/api/views/bi63-dtpu/rows.json?accessType=DOWNLOAD";

var mapObject;

async function choroplethGenerator(year,cause) {

// Execute the above dataUpdater function

var result = await d3.json(jsonLink).then(function(response) {

    // Log the data key of the response so that it can be examined if desired
    console.log(response.data);
  
    // For loop that loops through everything returned by the JSON
    for(var i = 0; i < response.data.length; i++) {
          // specify the desired metrics using an if statement
          if(response.data[i][8] == year && response.data[i][10] == cause && response.data[i][11] != "United States") {
            // Once desired objects are found, loop through the geoJSON and compare the state name in
            // response to the state name in the geoJSON
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
mapObject = L.choropleth(statesData, {

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
    });
    console.log("I should run first")
  });
  
    console.log("I should run second");
    console.log(mapObject);
    return mapObject;

};