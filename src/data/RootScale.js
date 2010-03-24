pv.Scale.root = function() {
  var scale = pv.Scale.quantitative();

  /**
   * Sets or gets the exponent. Defaults to 2.
   *
   * @function
   * @name pv.Scale.root.prototype.power
   * @param {number} [v] the new exponent.
   * @returns {pv.Scale.root} <tt>this</tt>, or the current base.
   */
  scale.power = function(v) {
    if (arguments.length) {
      var b = Number(v), p = 1 / b;
      scale.transform(
        function(x) { return Math.pow(x, p); },
        function(y) { return Math.pow(y, b); });
      return this;
    }
    return b;
  };

  scale.domain.apply(scale, arguments);
  return scale.power(2);
};
