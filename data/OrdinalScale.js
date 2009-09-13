// NOTE: ordinal scales are not (at least not yet) invertible, since the domain
// and range and discontinuous.

/**
 * Returns an ordinal scale for the specified domain.
 *
 * @class Represents an ordinal scale.
 *
 * @param {...} domain... domain values.
 * @returns {pv.Scale.ordinal} an ordinal scale.
 * @extends pv.Scale
 */
pv.Scale.ordinal = function() {
  var d = [], i = {}, r;

  /** @private */
  function scale(x) {
    if (!(x in i)) i[x] = d.push(x) - 1;
    return r ? r[i[x] % r.length] : (i[x] / d.length);
  }

  /**
   * @function
   * @name pv.Scale.ordinal.prototype.domain
   * @param {...} domain... domain values.
   * @returns {pv.Scale.ordinal} <tt>this</tt>.
   */
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

  /**
   * @function
   * @name pv.Scale.ordinal.prototype.range
   * @param {...} range... range values.
   * @returns {pv.Scale.ordinal} <tt>this</tt>.
   */
  scale.range = function() {
    if (arguments.length) {
      r = Array.prototype.concat.apply([], arguments);
      if (typeof r[0] == "string") r = r.map(pv.color);
      return this;
    }
    return r;
  };

  /**
   * @function
   * @name pv.Scale.ordinal.prototype.by
   * @param {function} f
   * @returns {pv.Scale.ordinal} the new view.
   */
  scale.by = function(f) {
    function by() { return scale(f.apply(this, arguments)); }
    for (var method in scale) by[method] = scale[method];
    return by;
  };

  scale.domain.apply(scale, arguments);
  return scale;
};
