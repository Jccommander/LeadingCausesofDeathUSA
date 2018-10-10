    // function treeMap(sample) {
        google.load('visualization', '1.0', {'packages':['treemap']});
    // google.charts.setOnLoadCallback(drawChart);
    function drawChart(sample, callback) {
        console.log(sample);
        var treeData = [['Location','Parent','Deaths'],
                        ['Global',null,0]];

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
        
        var just_causes = [alzheimer,cancer,CLRD,diabetes,heart_disease,influenza,
            kidney_disease,stroke,suicide,accidents];

        just_causes.forEach((cause) => {
            console.log(cause);
            var deaths = cause.map(year => year.deaths);
    
            var average = Math.round(math.mean(deaths));
    
            const add = (a, b) => a + b
            var death_sum = deaths.reduce(add)
    
            treeData.push([
                cause[0].cause,
                'Global',
                death_sum
             ]);
            });




        console.log(treeData);
        var data = google.visualization.arrayToDataTable(treeData);

        tree = new google.visualization.TreeMap(document.getElementById('tree'));

        tree.draw(data, {
          minColor: '#f00',
          midColor: '#ddd',
          maxColor: '#0d0',
          headerHeight: 15,
          fontColor: 'black',
          showScale: true
        });
        callback();
      };
      
    // };