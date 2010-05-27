var points = pv.range(18).map(function(p) {
  return {
    x:p+Math.random()+.5,
    y:p/2+Math.random()+.5,
    xerr:Math.random()*.9+.1,
    yerr:Math.random()*.8+.1
  };
});