var vis = new pv.Panel()
    .width(150)
    .height(150);

var bar = vis.add(pv.Bar)
    .data([1, 1.2, 1.7, 1.5, .7, .2])
    .bottom(0)
    .width(20)
    .height(function(d) d * 80)
    .left(function() this.index * 25);

bar.add(pv.Label)
    .top(function() bar.top())
    .left(function() bar.left() + bar.width() / 2)
    .textAlign("center")
    .textBaseline("top")
    .textStyle("white");

vis.render();
