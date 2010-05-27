var points = pv.range(28).map(function(p) {
  return {
    x: p + Math.random() + .5,
    y: 8 * Math.sqrt(p / 30) + Math.random() + .5,
    xerr: Math.random() * .5 + .1,
    yerr: Math.random() + .1
  };
});
