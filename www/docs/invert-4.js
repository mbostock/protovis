vis.add(pv.Bar)
    .fillStyle("rgba(0,0,0,.001)")
    .event("mouseout", function() {
        i = -1;
        return vis;
      })
    .event("mousemove", function() {
        var mx = x.invert(vis.mouse().x);
        i = pv.search(data.map(function(d) d.x), mx);
        i = i < 0 ? (-i - 2) : i;
        return vis;
      });
