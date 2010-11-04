var s = 0, vis = new pv.Panel()
    .width(150)
    .height(150);

vis.add(pv.Wedge)
    .data([1, 1.2, 1.7, 1.5, .7])
    .left(75)
    .bottom(75)
    .startAngle(Math.PI)
    .innerRadius(function() this.index * 10 + 20)
    .outerRadius(function() this.index * 10 + 30)
    .startAngle(function() (s += .001) * (this.index + 1))
    .angle(function(d) d * 2);

setInterval(function() vis.render(), 35);
