/*
 * For now, just support {rgba, hsla} conversion to {rgb, hsl} with separate
 * opacity. In the future, it would be nice to support gradients and patterns,
 * and to include stroke-width with the style definition (e.g., "solid 10px
 * red").
 */

pv.Style = function(style) {
  this.opacity = 1;
  if (!style || (style == "transparent")) {
    this.color = "none";
  } else {
    var m1 = /([a-z]+)\((.*)\)/i.exec(style);
    if (m1) {
      var m2 = m1[2].split(",");
      switch (m1[1]) {
        case "hsla":
        case "hsl": {
          var h = parseFloat(m2[0]),
              s = parseFloat(m2[1]) / 100,
              l = parseFloat(m2[2]) / 100;
          this.color = pv.Style.hslToRgb(h, s, l).toString();
          break;
        }
        case "rgba":
        case "rgb": {
          this.color = "rgb(" + m2.slice(0, 3).join(",") + ")";
          break;
        }
      }
      switch (m1[1]) {
        case "hsla":
        case "rgba": {
          this.opacity = parseFloat(m2[3]);
          break;
        }
      }
    } else {
      this.color = style;
    }
  }
};

/**
 * @return rgb in [0, 1]
 * @param h hue in degrees in [0, 360) (modulo)
 * @param s saturation in [0, 1] (clamp)
 * @param l luminosity in [0, 1] (clamp)
 */
pv.Style.hslToRgb = function(h, s, l) {
  h = h % 360;
  if (h < 0) h += 360;
  s = Math.max(0, Math.min(s, 1));
  l = Math.max(0, Math.min(l, 1));

  function rgb(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
  rgb.prototype.toString = function() {
    return "rgb(" + Math.round(this.r * 255) + ","
        + Math.round(this.g * 255) + ","
        + Math.round(this.b * 255) + ")";
  };

  /* From FvD 13.37 */
  var m2 = (l < .5) ? (l * (l + s)) : (l + s - l * s);
  var m1 = 2 * l - m2;
  if (s == 0) {
    return new rgb(l, l, l);
  }
  function v(h) {
    if (h > 360) h -= 360;
    else if (h < 0) h += 360;
    if (h < 60) return m1 + (m2 - m1) * h / 60;
    else if (h < 180) return m2;
    else if (h < 240) return m1 + (m2 - m1) * (240 - h) / 60;
    return m1;
  }
  return new rgb(v(h + 120), v(h), v(h - 120));
};
