pv.Scale.ordinal = function() {
  var d = [], i = {}, r;

  function scale(x) {
    if (!(x in i)) i[x] = d.push(x) - 1;
    return r ? r[i[x] % r.length] : (i[x] / d.length);
  }

  scale.domain = function(array, f) {
    if (arguments.length) {
      if (array instanceof Array) {
        if (arguments.length > 1) array = array.map(f);
      } else {
        array = Array.prototype.slice.call(arguments);
      }

      /* Filter the specified ordinals to their unique values. */
      d = [];
      var seen = {};
      for (var j = 0; j < array.length; j++) {
        var o = array[j];
        if (!(o in seen)) {
          seen[o] = true;
          d.push(o);
        }
      }

      i = pv.numerate(d);
      return this;
    }
    return d;
  };

  scale.range = function() {
    if (arguments.length) {
      r = Array.prototype.concat.apply([], arguments);
      if (typeof r[0] == "string") r = r.map(pv.color);
      return this;
    }
    return r;
  };

  scale.by = function(f) {
    function by() { return scale(f.apply(this, arguments)); }
    for (var method in scale) by[method] = scale[method];
    return by;
  };

  scale.domain.apply(scale, arguments);
  return scale;
};
