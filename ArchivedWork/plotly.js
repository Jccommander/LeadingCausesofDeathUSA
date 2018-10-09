
// PURPOSE:
// 1 function to create a scatterplot with 10 traces (one for each cause of death) over time
// 2 function to handle changes
// 3 this might be in jc's js: function to initialize on load?
// 4 this might be in jc's js: function to resize on window change?

// BACKEND TO-DO
// build route of all causes for dropdown for scatter
// build data/<cause> route for query on dropdown selection


// 1 line graph
function buildLine(cause) {
    // log input data in the console
    console.log(cause);

    var url = `data/${cause}`;

    d3.json(url).then(function(response) {
        var trace = [{
        x: response.years,
        y: response.death_rate,
        mode: "line+markers",
        label: response.death_rate,
        type: "scatter"
    }];

        var layout = {
            height: 650,
            width: 1250,
            title: 'Cause of Death by Year',
            xaxis: {title: 'Year'},
            yaxis: {title: 'Death Rate'}
        };

    // insert the HTLM ID
    var plot = document.getElementById('INSERT HTML ID HERE');
    Plotly.newPlot(plot, trace, layout) 

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
