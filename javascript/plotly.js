
// PURPOSE:
// 1 function to create a scatterplot with 10 traces (one for each cause of death) over time
// 2 function to handle changes
// 3 this might be in jc's js: function to initialize on load?
// 4 this might be in jc's js: function to resize on window change?

// BACKEND TO-DO
// build route of all causes for dropdown for scatter
// build data/<cause> route for query on dropdown selection


// 1 line graph
function buildLine(sample, boolObjects) {

    var boolArray = boolObjects.map(object => object.bool);

    var alzheimer = sample.filter(item => item.cause === "Alzheimer's disease");
    var cancer = sample.filter(item => item.cause === "Cancer");
    var CLRD = sample.filter(item => item.cause === "CLRD");
    var diabetes = sample.filter(item => item.cause === "Diabetes");
    var heart_disease = sample.filter(item => item.cause === "Heart disease");
    var influenza = sample.filter(item => item.cause === "Influenza and pneumonia");
    var kidney_disease = sample.filter(item => item.cause === "Kidney disease");
    var stroke = sample.filter(item => item.cause === "Stroke");
    var suicide = sample.filter(item => item.cause === "Suicide");
    var accidents = sample.filter(item => item.cause === "Unintentional injuries");

    var all_causes = [alzheimer,cancer,CLRD,diabetes,heart_disease,influenza,
        kidney_disease,stroke,suicide,accidents];

    var used_causes = [];

    for(i = 0; i < all_causes.length; i++) {
        if(boolArray[i] === true) {
            used_causes.push(all_causes[i]);
        }
    };

    // log input data in the console

    var data = [];

    used_causes.forEach(loopdata => {

        var yearList = [];
        var deathList = [];

        loopdata.sort((a, b) => a.year - b.year);

        loopdata.forEach(object => {
            yearList.push(object.year);
            deathList.push(object.deaths);
        });

        var trace = {
        x: yearList,
        y: deathList,
        mode: "lines+markers",
        label: yearList,
        type: "scatter"
        };

        data.push(trace);
    
    });

        var layout = {
            height: 650,
            width: 1250,
            title: 'Cause of Death by Year',
            xaxis: {title: 'Year'},
            yaxis: {title: 'Death Rate'}
        };

    // insert the HTML ID
    Plotly.newPlot('linechart', data, layout);
};

// 2
function optionChanged(newCause) {
  buildLine(newCause);
}

// ************************
// duplicate in JC code?
// ************************

// // 3 to run on page load

// function init() {
//   var selector = d3.select("#ID HERE");
//  // builds the dropdown menu
//   d3.json("/causes").then((causeNames) => {
//     causeNames.forEach((cause) => {
//       selector
//         .append("option")
//         .text(cause)
//         .property("value", cause);
//         });
//     // builds the initial chart with first item in json
//     const firstSample = causeNames[0];
//     buildCharts(firstSample);
//   });
// }
//  // run
// init();

// // 4 resize charts when window size changes
// function resize(){
//   var rCause = d3.select("#selDataset").property("value");
//   console.log("cause",rCause);
//   buildCharts(rCause);
// }
// d3.select(window).on('resize', resize);
