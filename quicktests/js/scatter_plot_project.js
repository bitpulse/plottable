function makeData() {
  "use strict";
  return d3.csv("../../examples/data/hygxyzTruncated.csv");
}

function run(div, data, Plottable) {
  "use strict";
  d3.csv("../../examples/data/hygxyzTruncated.csv", function(d) {
  var svg = div.append("svg").attr("height", 500);
  var xScale = new Plottable.Scale.Linear();
  var yScale = new Plottable.Scale.ModifiedLog();
  var rScale = new Plottable.Scale.Linear();
  var colorScale = new Plottable.Scale.Color();

  var xAxis = new Plottable.Axis.Numeric(xScale, "bottom");
  var yAxis = new Plottable.Axis.Numeric(yScale, "left");
  var scatterRenderer = new Plottable.Plot.Scatter(d, xScale, yScale)
    .project("x", "Distance", xScale)
    .project("y", function(d) {return Math.abs(d.Mag)}, yScale)
    .project("r", function(d) {return Math.abs(d.AbsMag)})
    .project("fill", "ColorIndex", colorScale);

  var titleLabel = new Plottable.Component.TitleLabel("Absolute Value of Absolute Visual Magnitudes of Stars");
  var subtitleLabel = new Plottable.Component.Label("Data from The HYG Database at The Astronomy Nexus");
  var titleTable = new Plottable.Component.Table([
                                                  [titleLabel],
                                                  [subtitleLabel]
                                                  ]).xAlign("center");

  var yAxisLabel = new Plottable.Component.AxisLabel("Absolute Value of Apparent Visual Magnitude", "vertical-left");
  var xAxisLabel = new Plottable.Component.AxisLabel("Distance in parsecs");
  var plotTable = new Plottable.Component.Table([
                                                 [yAxisLabel, yAxis, scatterRenderer],
                                                 [null, null, xAxis],
                                                 [null, null, xAxisLabel]
                                                 ]);

  new Plottable.Component.Table([
                                 [titleTable],
                                 [plotTable]
                                 ]).renderTo(svg);
  });
}