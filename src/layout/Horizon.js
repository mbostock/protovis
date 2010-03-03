pv.Layout.horizon = function() {
  var bands, // number of bands
      mirror = true, // whether to mirror or offset
      size, // band size
      red, // negative band color
      blue; // positive band color

  /** @private */
  function data() {
    size = Math.round(this.parent.height());
    return pv.range(bands * 2);
  }

  var layout = new pv.Mark()
      .top(function(d, i) { return mirror && (i % 2) ? 0 : null; })
      .bottom(function(d, i) { return mirror && (i % 2) ? null : 0; })
      .fillStyle(function(d, i) { return (i % 2) ? red : blue; });

  layout.band = new pv.Mark()
      .data(data)
      .overflow("hidden")
      .height(function() { return size; })
      .transform(function(i) {
          var y = Math.floor((i + 1) / 2) * size * (!mirror && (i % 2) ? -1 : 1);
          return pv.Transform.identity.translate(0, y);
        });

  layout.bands = function(x) {
    if (arguments.length) {
      bands = Number(x);
      var a = 1 / (bands + 1);
      red = pv.color("red").alpha(a);
      blue = pv.color("blue").alpha(a);
      return this;
    }
    return bands;
  };

  layout.mode = function(x) {
    if (arguments.length) {
      switch (x) {
        case "mirror": mirror = true; break;
        case "offset": mirror = false; break;
      }
      return this;
    }
    return mirror;
  };

  return layout.bands(2);
};
