pv.Scale = {};

pv.Scale.linear = function() {
  var min, max, nice = false, s, f = pv.identity;

  /* Property function. */
  function scale() {
    if (s == undefined) {
      if (min == undefined) min = pv.min(this.$$data, f);
      if (max == undefined) max = pv.max(this.$$data, f);
      if (nice) { // TODO Only "nice" bounds set automatically.
        var step = Math.pow(10, Math.round(Math.log(max - min) / Math.log(10)) - 1);
        min = Math.floor(min / step) * step;
        max = Math.ceil(max / step) * step;
      }
      s = range.call(this) / (max - min);
    }
    return (f.apply(this, arguments) - min) * s;
  }

  function range() {
    switch (property) {
      case "height":
      case "top":
      case "bottom": return this.parent.height();
      case "width":
      case "left":
      case "right": return this.parent.width();
      default: return 1;
    }
  }

  scale.by = function(v) { f = v; return this; };
  scale.min = function(v) { min = v; return this; };
  scale.max = function(v) { max = v; return this; };

  scale.nice = function(v) {
    nice = (arguments.length == 0) ? true : v;
    return this;
  };

  scale.range = function() {
    if (arguments.length == 1) {
      o = 0;
      s = arguments[0];
    } else {
      o = arguments[0];
      s = arguments[1] - arguments[0];
    }
    return this;
  };

  return scale;
};
