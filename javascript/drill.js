
// This here is for cleaning up numbers to display better in the metadata panel, it adds commas
// to the resulting numbers to make them easier to read
var nf = new Intl.NumberFormat();

// Set function to populate the metadata section with relevant information

function buildMeta(sample, startYear, endYear, state) {

    console.log(sample);

    var metaPanel = d3.select("#sample-metadata");

    metaPanel.html("");

    // Variables to hold each individual cause of death category so that it can be averaged for
    // display in the metadata table
    var all_causes = sample.filter(item => item.cause === "All causes");
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

    // Array containing all of the above so it can be quickly appended in the HTML
    var all_causes = [all_causes,alzheimer,cancer,CLRD,diabetes,heart_disease,influenza,
    kidney_disease,stroke,suicide,accidents];

    // Append paragraph items that display the state, start year and end year of the data; unless
    // there is only one year, in which case it displays the single year

    metaPanel.append("p")
        .text(`State: ${state}`)
        
    if (startYear === endYear) {
        metaPanel.append("p")
        .text(`Year: ${endYear}`)
    }
    else {
        metaPanel.append("p")
        .text(`Year Range: ${startYear} - ${endYear}`)
    }

    // Loop through the array, average the number of deaths and then append a paragraph tag to
    // the metadata panel

    all_causes.forEach((cause) => {

        var deaths = cause.map(year => year.deaths);

        var average = Math.round(math.mean(deaths));

        var clean_avg = nf.format(average);

        metaPanel.append("p")
            .text(`${cause[0].cause}: ${clean_avg}`);

    });

};

// Create a function that dynamically adds all years and states to the three dropdown selectors so that 
// users can filter between start dates, end dates and states

function drillOptionSelector() {

    // Select all three selector elements so they can be referenced
    var startSelector = d3.select("#selStartYear");
    var endSelector = d3.select("#selEndYear");
    var stateSelector = d3.select("#selState");

    // Populate both year selectors with the full range of available dates
    var yearArray = [];
    for (var i = 1999; i <= 2016; i++) {
        yearArray.push(i);
    }

    yearArray.forEach(year => {
        startSelector.append("option")
            .attr("value",`${year}`)
            .text(`${year}`);

        endSelector.append("option")
            .attr("value",`${year}`)
            .text(`${year}`);
    });

    // Use array of states as strings to loop through and populate the state selector dropdown

    var stateArray = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

    stateArray.forEach(state => {
        stateSelector.append("option")
            .attr("value",`${state}`)
            .text(`${state}`);
    });

}

// Create a function that takes in the year range and appends a number of option tags to the selector
// element to ensure that only relevant years are available for selection in the Tree Map year selector
function treeMapOptionSelector(startYear = "1999", endYear = "2016") {

    var selector = d3.select("#selDataset");

    var numericStart = +startYear;
    var numericEnd = +endYear;

    var yearArray = [];
    for (var i = numericStart; i <= numericEnd; i++) {
        yearArray.push(i);
    }

    yearArray.forEach(year => {
        selector.append("option")
            .attr("value",`${year}`)
            .text(`${year}`)
    });

};

// Create a predifined boolean array for detecting which traces in the line plotly should be generated
var boolArray = [
    {bool: true, cause:"alzheimer"},
    {bool: true, cause:"cancer"},
    {bool: true, cause:"CLRD"},
    {bool: true, cause:"diabetes"},
    {bool: true, cause:"heart_disease"},
    {bool: true, cause:"influenza"},
    {bool: true, cause:"kidney_disease"},
    {bool: true, cause:"stroke"},
    {bool: true, cause:"suicide"},
    {bool: true, cause:"accidents"},];

var sampleHolder;

// Create initializer function that takes the previous functions and the plotly functions and inputs
// the desired Flask route call to retrieve all data to be injected into the functions
function initializer(startYear = "1999", endYear = "2016", state = "Alabama") {

    d3.json(`data/${startYear}/${endYear}/${state}`).then(sample => {

        // Populate the selectors for the drill page with the years and states
        drillOptionSelector();

        // Build the metadata table here
        buildMeta(sample, startYear, endYear, state);

        // Add Plotly function that takes in above sample data and generates a scatterplot chart
        buildLine(sample, boolArray);

        // @TODO:
        // Add the Tree Map function, using whatever library we intend to that generates the tree map

        // Populate the tree map selector with all years returned
        treeMapOptionSelector(startYear,endYear);

        // Save sample outside of the json call

        sampleHolder = sample;

    });
};

function onCheckboxer(object) {
    console.log(object);
    boolArray.forEach(item => {
        if(item.cause === object.value) {
            item.bool = object.checked;
        }
    })
    buildLine(sampleHolder, boolArray);
};

initializer();