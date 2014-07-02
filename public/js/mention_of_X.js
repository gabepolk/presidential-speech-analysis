
//Dynamic, random dataset
var dataset = [];
var numDataPoints = 50;
var xRange = Math.random() * 1000;
var yRange = Math.random() * 1000;
for (var i = 0; i < numDataPoints; i++) {
  var newNumber1 = Math.round(Math.random() * xRange);
  var newNumber2 = Math.round(Math.random() * yRange);
  dataset.push([newNumber1, newNumber2]);
}

//Width and height
var svgWidth = 600;
var svgHeight = 300;
var padding = 30;

//Set scale for x axis
var xScale = d3.scale.linear()
                .domain([0, d3.max(dataset, function(d) { return d[0]; })])
                .range([padding, svgWidth - padding * 2])

//Set scale for y axis
var yScale = d3.scale.linear()
                .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                .range([svgHeight - padding, padding]);

var rScale = d3.scale.linear()
                      .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                      .range([2, 5]);

//Create x axis
var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient("bottom")
                  .ticks(5); //Set rough # of ticks

var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .ticks(5);

//Create SVG element
var svg = d3.select("body")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d){
      return xScale(d[0]);
    })
    .attr("cy", function(d){
      return yScale(d[1]);
    })
    .attr("r", function(d){
      return rScale(d[1])
    });

// svg.selectAll("text")
//   .data(dataset)
//   .enter()
//   .append("text")
//   .text(function(d){
//     return d[0] + "," + d[1];
//   })
//   .attr("x", function(d){
//     return xScale(d[0]);
//   })
//   .attr("y", function(d){
//     return yScale(d[1]);
//   })
//   .attr("font-family", "sans-serif")
//   .attr("font-size", "11px")
//   .attr("fill", "red");

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (svgHeight - padding) + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);
