/**
 * Returns a default quantitative, linear, scale for the specified domain. The
 * arguments to this constructor are optional, and equivalent to calling
 * {@link #domain}. The default domain and range are [0,1].
 *
 * <p>This constructor is typically not used directly; see one of the
 * quantitative scale implementations instead.
 *
 * @class Represents an abstract quantitative scale; a function that performs a
 * numeric transformation. This class is typically not used directly; see one of
 * the quantitative scale implementations (linear, log, root, etc.)
 * instead. <style type="text/css">sub{line-height:0}</style> A quantitative
 * scale represents a 1-dimensional transformation from a numeric domain of
 * input data [<i>d<sub>0</sub></i>, <i>d<sub>1</sub></i>] to a numeric range of
 * pixels [<i>r<sub>0</sub></i>, <i>r<sub>1</sub></i>]. In addition to
 * readability, scales offer several useful features:
 *
 * <p>1. The range can be expressed in colors, rather than pixels. For example:
 *
 * <pre>    .fillStyle(pv.Scale.linear(0, 100).range("red", "green"))</pre>
 *
 * will fill the marks "red" on an input value of 0, "green" on an input value
 * of 100, and some color in-between for intermediate values.
 *
 * <p>2. The domain and range can be subdivided for a non-uniform
 * transformation. For example, you may want a diverging color scale that is
 * increasingly red for negative values, and increasingly green for positive
 * values:
 *
 * <pre>    .fillStyle(pv.Scale.linear(-1, 0, 1).range("red", "white", "green"))</pre>
 *
 * The domain can be specified as a series of <i>n</i> monotonically-increasing
 * values; the range must also be specified as <i>n</i> values, resulting in
 * <i>n - 1</i> contiguous linear scales.
 *
 * <p>3. Quantitative scales can be inverted for interaction. The
 * {@link #invert} method takes a value in the output range, and returns the
 * corresponding value in the input domain. This is frequently used to convert
 * the mouse location (see {@link pv.Mark#mouse}) to a value in the input
 * domain. Note that inversion is only supported for numeric ranges, and not
 * colors.
 *
 * <p>4. A scale can be queried for reasonable "tick" values. The {@link #ticks}
 * method provides a convenient way to get a series of evenly-spaced rounded
 * values in the input domain. Frequently these are used in conjunction with
 * {@link pv.Rule} to display tick marks or grid lines.
 *
 * <p>5. A scale can be "niced" to extend the domain to suitable rounded
 * numbers. If the minimum and maximum of the domain are messy because they are
 * derived from data, you can use {@link #nice} to round these values down and
 * up to even numbers.
 *
 * @param {number...} domain... optional domain values.
 * @see pv.Scale.linear
 * @see pv.Scale.log
 * @see pv.Scale.root
 * @extends pv.Scale
 */
pv.Scale.quantitative = function() {
  var d = [0, 1], // default domain
      l = [0, 1], // default transformed domain
      r = [0, 1], // default range
      i = [pv.identity], // default interpolators
      type = Number, // default type
      n = false, // whether the domain is negative
      f = pv.identity, // default forward transform
      g = pv.identity, // default inverse transform
      tickFormat = String; // default tick formatting function

  /** @private */
  function newDate(x) {
    return new Date(x);
  }

  /** @private */
  function scale(x) {
    var j = pv.search(d, x);
    if (j < 0) j = -j - 2;
    j = Math.max(0, Math.min(i.length - 1, j));
    return i[j]((f(x) - l[j]) / (l[j + 1] - l[j]));
  }

  /** @private */
  scale.transform = function(forward, inverse) {
    /** @ignore */ f = function(x) { return n ? -forward(-x) : forward(x); };
    /** @ignore */ g = function(y) { return n ? -inverse(-y) : inverse(y); };
    l = d.map(f);
    return this;
  };

  /**
   * Sets or gets the input domain. This method can be invoked several ways:
   *
   * <p>1. <tt>domain(min, ..., max)</tt>
   *
   * <p>Specifying the domain as a series of numbers is the most explicit and
   * recommended approach. Most commonly, two numbers are specified: the minimum
   * and maximum value. However, for a diverging scale, or other subdivided
   * non-uniform scales, multiple values can be specified. Values can be derived
   * from data using {@link pv.min} and {@link pv.max}. For example:
   *
   * <pre>    .domain(0, pv.max(array))</pre>
   *
   * An alternative method for deriving minimum and maximum values from data
   * follows.
   *
   * <p>2. <tt>domain(array, minf, maxf)</tt>
   *
   * <p>When both the minimum and maximum value are derived from data, the
   * arguments to the <tt>domain</tt> method can be specified as the array of
   * data, followed by zero, one or two accessor functions. For example, if the
   * array of data is just an array of numbers:
   *
   * <pre>    .domain(array)</pre>
   *
   * On the other hand, if the array elements are objects representing stock
   * values per day, and the domain should consider the stock's daily low and
   * daily high:
   *
   * <pre>    .domain(array, function(d) d.low, function(d) d.high)</pre>
   *
   * The first method of setting the domain is preferred because it is more
   * explicit; setting the domain using this second method should be used only
   * if brevity is required.
   *
   * <p>3. <tt>domain()</tt>
   *
   * <p>Invoking the <tt>domain</tt> method with no arguments returns the
   * current domain as an array of numbers.
   *
   * @function
   * @name pv.Scale.quantitative.prototype.domain
   * @param {number...} domain... domain values.
   * @returns {pv.Scale.quantitative} <tt>this</tt>, or the current domain.
   */
  scale.domain = function(array, min, max) {
    if (arguments.length) {
      var o; // the object we use to infer the domain type
      if (array instanceof Array) {
        if (arguments.length < 2) min = pv.identity;
        if (arguments.length < 3) max = min;
        o = array.length && min(array[0]);
        d = array.length ? [pv.min(array, min), pv.max(array, max)] : [];
      } else {
        o = array;
        d = Array.prototype.slice.call(arguments).map(Number);
      }
      if (!d.length) d = [-Infinity, Infinity];
      else if (d.length == 1) d = [d[0], d[0]];
      n = (d[0] || d[d.length - 1]) < 0;
      l = d.map(f);
      type = (o instanceof Date) ? newDate : Number;
      return this;
    }
    return d.map(type);
  };

  /**
   * Sets or gets the output range. This method can be invoked several ways:
   *
   * <p>1. <tt>range(min, ..., max)</tt>
   *
   * <p>The range may be specified as a series of numbers or colors. Most
   * commonly, two numbers are specified: the minimum and maximum pixel values.
   * For a color scale, values may be specified as {@link pv.Color}s or
   * equivalent strings. For a diverging scale, or other subdivided non-uniform
   * scales, multiple values can be specified. For example:
   *
   * <pre>    .range("red", "white", "green")</pre>
   *
   * <p>Currently, only numbers and colors are supported as range values. The
   * number of range values must exactly match the number of domain values, or
   * the behavior of the scale is undefined.
   *
   * <p>2. <tt>range()</tt>
   *
   * <p>Invoking the <tt>range</tt> method with no arguments returns the current
   * range as an array of numbers or colors.
   *
   * @function
   * @name pv.Scale.quantitative.prototype.range
   * @param {...} range... range values.
   * @returns {pv.Scale.quantitative} <tt>this</tt>, or the current range.
   */
  scale.range = function() {
    if (arguments.length) {
      r = Array.prototype.slice.call(arguments);
      if (!r.length) r = [-Infinity, Infinity];
      else if (r.length == 1) r = [r[0], r[0]];
      i = [];
      for (var j = 0; j < r.length - 1; j++) {
        i.push(pv.Scale.interpolator(r[j], r[j + 1]));
      }
      return this;
    }
    return r;
  };

  /**
   * Inverts the specified value in the output range, returning the
   * corresponding value in the input domain. This is frequently used to convert
   * the mouse location (see {@link pv.Mark#mouse}) to a value in the input
   * domain. Inversion is only supported for numeric ranges, and not colors.
   *
   * <p>Note that this method does not do any rounding or bounds checking. If
   * the input domain is discrete (e.g., an array index), the returned value
   * should be rounded. If the specified <tt>y</tt> value is outside the range,
   * the returned value may be equivalently outside the input domain.
   *
   * @function
   * @name pv.Scale.quantitative.prototype.invert
   * @param {number} y a value in the output range (a pixel location).
   * @returns {number} a value in the input domain.
   */
  scale.invert = function(y) {
    var j = pv.search(r, y);
    if (j < 0) j = -j - 2;
    j = Math.max(0, Math.min(i.length - 1, j));
    return type(g(l[j] + (y - r[j]) / (r[j + 1] - r[j]) * (l[j + 1] - l[j])));
  };

  /**
   * Returns an array of evenly-spaced, suitably-rounded values in the input
   * domain. This method attempts to return between 5 and 10 tick values. These
   * values are frequently used in conjunction with {@link pv.Rule} to display
   * tick marks or grid lines.
   *
   * @function
   * @name pv.Scale.quantitative.prototype.ticks
   * @param {number} [m] optional number of desired ticks.
   * @returns {number[]} an array input domain values to use as ticks.
   */
  scale.ticks = function(m) {
    var start = d[0],
        end = d[d.length - 1],
        reverse = end < start,
        min = reverse ? end : start,
        max = reverse ? start : end,
        span = max - min;

    /* Special case: empty, invalid or infinite span. */
    if (!span || !isFinite(span)) {
      if (type == newDate) tickFormat = pv.Format.date("%x");
      return [type(min)];
    }

    /* Special case: dates. */
    if (type == newDate) {
      /* Floor the date d given the precision p. */
      function floor(d, p) {
        switch (p) {
          case 31536e6: d.setMonth(0);
          case 2592e6: d.setDate(1);
          case 6048e5: if (p == 6048e5) d.setDate(d.getDate() - d.getDay());
          case 864e5: d.setHours(0);
          case 36e5: d.setMinutes(0);
          case 6e4: d.setSeconds(0);
          case 1e3: d.setMilliseconds(0);
        }
      }

      var precision, format, increment, step = 1;
      if (span >= 3 * 31536e6) {
        precision = 31536e6;
        format = "%Y";
        /** @ignore */ increment = function(d) { d.setFullYear(d.getFullYear() + step); };
      } else if (span >= 3 * 2592e6) {
        precision = 2592e6;
        format = "%m/%Y";
        /** @ignore */ increment = function(d) { d.setMonth(d.getMonth() + step); };
      } else if (span >= 3 * 6048e5) {
        precision = 6048e5;
        format = "%m/%d";
        /** @ignore */ increment = function(d) { d.setDate(d.getDate() + 7 * step); };
      } else if (span >= 3 * 864e5) {
        precision = 864e5;
        format = "%m/%d";
        /** @ignore */ increment = function(d) { d.setDate(d.getDate() + step); };
      } else if (span >= 3 * 36e5) {
        precision = 36e5;
        format = "%I:%M %p";
        /** @ignore */ increment = function(d) { d.setHours(d.getHours() + step); };
      } else if (span >= 3 * 6e4) {
        precision = 6e4;
        format = "%I:%M %p";
        /** @ignore */ increment = function(d) { d.setMinutes(d.getMinutes() + step); };
      } else if (span >= 3 * 1e3) {
        precision = 1e3;
        format = "%I:%M:%S";
        /** @ignore */ increment = function(d) { d.setSeconds(d.getSeconds() + step); };
      } else {
        precision = 1;
        format = "%S.%Qs";
        /** @ignore */ increment = function(d) { d.setTime(d.getTime() + step); };
      }
      tickFormat = pv.Format.date(format);

      var date = new Date(min), dates = [];
      floor(date, precision);

      /* If we'd generate too many ticks, skip some!. */
      var n = span / precision;
      if (n > 10) {
        switch (precision) {
          case 36e5: {
            step = (n > 20) ? 6 : 3;
            date.setHours(Math.floor(date.getHours() / step) * step);
            break;
          }
          case 2592e6: {
            step = 3; // seasons
            date.setMonth(Math.floor(date.getMonth() / step) * step);
            break;
          }
          case 6e4: {
            step = (n > 30) ? 15 : ((n > 15) ? 10 : 5);
            date.setMinutes(Math.floor(date.getMinutes() / step) * step);
            break;
          }
          case 1e3: {
            step = (n > 90) ? 15 : ((n > 60) ? 10 : 5);
            date.setSeconds(Math.floor(date.getSeconds() / step) * step);
            break;
          }
          case 1: {
            step = (n > 1000) ? 250 : ((n > 200) ? 100 : ((n > 100) ? 50 : ((n > 50) ? 25 : 5)));
            date.setMilliseconds(Math.floor(date.getMilliseconds() / step) * step);
            break;
          }
          default: {
            step = pv.logCeil(n / 15, 10);
            if (n / step < 2) step /= 5;
            else if (n / step < 5) step /= 2;
            date.setFullYear(Math.floor(date.getFullYear() / step) * step);
            break;
          }
        }
      }

      while (true) {
        increment(date);
        if (date > max) break;
        dates.push(new Date(date));
      }
      return reverse ? dates.reverse() : dates;
    }

    /* Normal case: numbers. */
    if (!arguments.length) m = 10;
    var step = pv.logFloor(span / m, 10),
        err = m / (span / step);
    if (err <= .15) step *= 10;
    else if (err <= .35) step *= 5;
    else if (err <= .75) step *= 2;
    var start = Math.ceil(min / step) * step,
        end = Math.floor(max / step) * step;
    tickFormat = pv.Format.number()
        .fractionDigits(Math.max(0, -Math.floor(pv.log(step, 10) + .01)));
    var ticks = pv.range(start, end + step, step);
    return reverse ? ticks.reverse() : ticks;
  };

  /**
   * Formats the specified tick value using the appropriate precision, based on
   * the step interval between tick marks. If {@link #ticks} has not been called,
   * the argument is converted to a string, but no formatting is applied.
   *
   * @function
   * @name pv.Scale.quantitative.prototype.tickFormat
   * @param {number} t a tick value.
   * @returns {string} a formatted tick value.
   */
  scale.tickFormat = function (t) { return tickFormat(t); };

  /**
   * "Nices" this scale, extending the bounds of the input domain to
   * evenly-rounded values. Nicing is useful if the domain is computed
   * dynamically from data, and may be irregular. For example, given a domain of
   * [0.20147987687960267, 0.996679553296417], a call to <tt>nice()</tt> might
   * extend the domain to [0.2, 1].
   *
   * <p>This method must be invoked each time after setting the domain.
   *
   * @function
   * @name pv.Scale.quantitative.prototype.nice
   * @returns {pv.Scale.quantitative} <tt>this</tt>.
   */
  scale.nice = function() {
    if (d.length != 2) return this; // TODO support non-uniform domains
    var start = d[0],
        end = d[d.length - 1],
        reverse = end < start,
        min = reverse ? end : start,
        max = reverse ? start : end,
        span = max - min;

    /* Special case: empty, invalid or infinite span. */
    if (!span || !isFinite(span)) return this;

    var step = Math.pow(10, Math.round(Math.log(span) / Math.log(10)) - 1);
    d = [Math.floor(min / step) * step, Math.ceil(max / step) * step];
    if (reverse) d.reverse();
    l = d.map(f);
    return this;
  };

  /**
   * Returns a view of this scale by the specified accessor function <tt>f</tt>.
   * Given a scale <tt>y</tt>, <tt>y.by(function(d) d.foo)</tt> is equivalent to
   * <tt>function(d) y(d.foo)</tt>.
   *
   * <p>This method is provided for convenience, such that scales can be
   * succinctly defined inline. For example, given an array of data elements
   * that have a <tt>score</tt> attribute with the domain [0, 1], the height
   * property could be specified as:
   *
   * <pre>    .height(pv.Scale.linear().range(0, 480).by(function(d) d.score))</pre>
   *
   * This is equivalent to:
   *
   * <pre>    .height(function(d) d.score * 480)</pre>
   *
   * This method should be used judiciously; it is typically more clear to
   * invoke the scale directly, passing in the value to be scaled.
   *
   * @function
   * @name pv.Scale.quantitative.prototype.by
   * @param {function} f an accessor function.
   * @returns {pv.Scale.quantitative} a view of this scale by the specified
   * accessor function.
   */
  scale.by = function(f) {
    function by() { return scale(f.apply(this, arguments)); }
    for (var method in scale) by[method] = scale[method];
    return by;
  };

  scale.domain.apply(scale, arguments);
  return scale;
};
