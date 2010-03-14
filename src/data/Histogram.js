/** Returns a histogram generator for the specified data. */
pv.histogram = function(data, f) {
  var frequency = true;
  return {
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

    frequency: function(x) {
      if (arguments.length) {
        frequency = Boolean(x);
        return this;
      }
      return frequency;
    }
  };
};
