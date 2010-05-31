var s = 100,
    p = 5,
    keys = pv.keys(flowers[0]);

var vis = new pv.Panel()
    .width(keys.length * (s + 2 * p))
    .height(keys.length * (s + 2 * p));

var cell = vis.add(pv.Panel)
    .data(keys)
    .width(s)
    .left(function() this.index * (s + 2 * p) + p)
  .add(pv.Panel)
    .data(keys)
    .height(s)
    .top(function() this.index * (s + 2 * p) + p)
    .strokeStyle("#ccc");

cell.add(pv.Dot)
    .def("x", function(k0, k1) pv.Scale.linear(flowers, function(d) d[k0]).range(0, s))
    .def("y", function(k0, k1) pv.Scale.linear(flowers, function(d) d[k1]).range(0, s))
    .data(flowers)
    .left(function(d, k0, k1) this.x()(d[k0]))
    .bottom(function(d, k0, k1) this.y()(d[k1]));

vis.render();
