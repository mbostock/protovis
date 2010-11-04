var data = [1, 1.2, 1.7, 1.5, .7];

var vis = new pv.Panel()
    .width(150)
    .height(150);

vis.add(pv.Wedge)
    .data(data)
    .left(75)
    .bottom(75)
    .innerRadius(50)
    .outerRadius(70)
    .angle(pv.Scale.linear(0, pv.sum(data)).range(0, 2 * Math.PI));

vis.render();
