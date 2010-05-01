/**
 * Returns a histogram operator for the specified data, with an optional
 * accessor function. If the data specified is not an array of numbers, an
 * accessor function must be specified to map the data to numeric values.
 *
 * @class Represents a histogram operator.
 *
 * @param {array} data an array of numbers or objects.
 * @param {function} [f] an optional accessor function.
 */
pv.histogram = function(data, f) {
  var frequency = true;
  return {

    /**
     * Returns the computed histogram bins. An optional array of numbers,
     * <tt>ticks</tt>, may be specified as the break points. If the ticks are
     * not specified, default ticks will be computed using a linear scale on the
     * data domain.
     *
     * <p>The returned array contains {@link pv.histogram.Bin}s. The <tt>x</tt>
     * attribute corresponds to the bin's start value (inclusive), while the
     * <tt>dx</tt> attribute stores the bin size (end - start). The <tt>y</tt>
     * attribute stores either the frequency count or probability, depending on
     * how the histogram operator has been configured.
     *
     * <p>The {@link pv.histogram.Bin} objects are themselves arrays, containing
     * the data elements present in each bin, i.e., the elements in the
     * <tt>data</tt> array (prior to invoking the accessor function, if any).
     * For example, if the data represented countries, and the accessor function
     * returned the GDP of each country, the returned bins would be arrays of
     * countries (not GDPs).
     *
     * @function
     * @name pv.histogram.prototype.bins
     * @param {array} [ticks]
     * @returns {array}
     */ /** @private */
    bins: function(ticks) {
      var x = pv.map(data, f), bins = [];

      /* Initialize default ticks. */
      if (!arguments.length) ticks = pv.Scale.linear(x).ticks();

      /* Initialize the bins. */
      for (var i = 0; i < ticks.length - 1; i++) {
        var bin = bins[i] = [];
        bin.x = ticks[i];
        bin.dx = ticks[i + 1] - ticks[i];
        bin.y = 0;
      }

      /* Count the number of samples per bin. */
      for (var i = 0; i < x.length; i++) {
        var j = pv.search.index(ticks, x[i]) - 1,
            bin = bins[Math.max(0, Math.min(bins.length - 1, j))];
        bin.y++;
        bin.push(data[i]);
      }

      /* Convert frequencies to probabilities. */
      if (!frequency) for (var i = 0; i < bins.length; i++) {
        bins[i].y /= x.length;
      }

      return bins;
    },

    /**
     * Sets or gets whether this histogram operator returns frequencies or
     * probabilities.
     *
     * @function
     * @name pv.histogram.prototype.frequency
     * @param {boolean} [x]
     * @returns {pv.histogram} this.
     */ /** @private */
    frequency: function(x) {
      if (arguments.length) {
        frequency = Boolean(x);
        return this;
      }
      return frequency;
    }
  };
};

/**
 * @class Represents a bin returned by the {@link pv.histogram} operator. Bins
 * are themselves arrays containing the data elements present in the given bin
 * (prior to the accessor function being invoked to convert the data object to a
 * numeric value). These bin arrays have additional attributes with meta
 * information about the bin.
 *
 * @name pv.histogram.Bin
 * @extends array
 * @see pv.histogram
 */

/**
 * The start value of the bin's range.
 *
 * @type number
 * @name pv.histogram.Bin.prototype.x
 */

/**
 * The magnitude value of the bin's range; end - start.
 *
 * @type number
 * @name pv.histogram.Bin.prototype.dx
 */

/**
 * The frequency or probability of the bin, depending on how the histogram
 * operator was configured.
 *
 * @type number
 * @name pv.histogram.Bin.prototype.y
 */
