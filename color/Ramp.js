// TODO support arbitrary color stops

pv.ramp = function(start, end) {
  return pv.Ramp(pv.color(start), pv.color(end));
};

pv.Ramp = function(start, end) {
  var s = start.rgb(), e = end.rgb(), f = pv.identity;

  /* Property function. */
  function ramp() {
    return value(f.apply(this, this.root.scene.data));
  }

  /* Interpolates between start and end at value t in [0,1]. */
  function value(t) {
    var t = Math.max(0, Math.min(1, t));
    var a = s.a * (1 - t) + e.a * t;
    if (a < 1e-5) a = 0; // avoid scientific notation
    return (s.a == 0) ? new pv.Color.Rgb(e.r, e.g, e.b, a)
        : ((e.a == 0) ? new pv.Color.Rgb(s.r, s.g, s.b, a)
        : new pv.Color.Rgb(
            Math.round(s.r * (1 - t) + e.r * t),
            Math.round(s.g * (1 - t) + e.g * t),
            Math.round(s.b * (1 - t) + e.b * t), a));
  }

  ramp.by = function(v) { f = v; return this; };
  ramp.value = value;
  return ramp;
};
