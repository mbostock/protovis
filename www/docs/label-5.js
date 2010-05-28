var data = [1, 1.2, 1.7, 1.5, .7], sum = pv.sum(data);

var vis = new pv.Panel()
    .width(150)
    .height(150);

var wedge = vis.add(pv.Wedge)
    .data(data)
    .left(75)
    .bottom(75)
    .outerRadius(70)
    .angle(function(d) d / sum * 2 * Math.PI);

wedge.add(pv.Label)
  .left(function() 45 * Math.cos(wedge.midAngle()) + 75)
  .bottom(function() -45 * Math.sin(wedge.midAngle()) + 75)
  .textAlign("center")
  .textBaseline("middle");

vis.render();
