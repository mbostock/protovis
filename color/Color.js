pv.Color = function(color, opacity) {
  this.color = color;
  this.opacity = opacity;
};

pv.color = function(style) {
  if (!style || (style == "transparent")) {
    return new pv.Color.Rgb(0, 0, 0, 0);
  }
  if (style instanceof pv.Color) {
    return style;
  }

  /* Handle hsl, rgb. */
  var m1 = /([a-z]+)\((.*)\)/i.exec(style);
  if (m1) {
    var m2 = m1[2].split(","), a = 1;
    switch (m1[1]) {
      case "hsla":
      case "rgba": {
        a = parseFloat(m2[3]);
        break;
      }
    }
    switch (m1[1]) {
      case "hsla":
      case "hsl": {
        var h = parseFloat(m2[0]), // degrees
            s = parseFloat(m2[1]) / 100, // percentage
            l = parseFloat(m2[2]) / 100; // percentage
        return (new pv.Color.Hsl(h, s, l, a)).rgb();
      }
      case "rgba":
      case "rgb": {
        function parse(c) { // either integer or percentage
          var f = parseFloat(c);
          return (c[c.length - 1] == '%') ? Math.round(f * 2.55) : f;
        }
        var r = parse(m2[0]), g = parse(m2[1]), b = parse(m2[2]);
        return new pv.Color.Rgb(r, g, b, a);
      }
    }
  }

  /* Otherwise, assume named colors. TODO allow lazy conversion to RGB. */
  return new pv.Color(style, 1);
};

pv.Color.Rgb = function(r, g, b, a) {
  pv.Color.call(this, a ? ("rgb(" + r + "," + g + "," + b + ")") : "none", a);
  this.r = r; // [0,255], integer
  this.g = g; // [0,255], integer
  this.b = b; // [0,255], integer
  this.a = a; // [0,1]
};

pv.Color.Rgb.prototype = pv.extend(pv.Color);

pv.Color.Rgb.prototype.rgb = function() {
  return this;
};

pv.Color.Hsl = function(h, s, l, a) {
  pv.Color.call(this, "hsl(" + h + "," + (s * 100) + "%," + (l * 100) + "%)", a);
  this.h = h; // [0,360]
  this.s = s; // [0,1]
  this.l = l; // [0,1]
  this.a = a; // [0,1]
};

pv.Color.Hsl.prototype = pv.extend(pv.Color);

/**
 * @return rgb in [0, 1]
 * @param h hue in degrees in [0, 360) (modulo)
 * @param s saturation in [0, 1] (clamp)
 * @param l luminosity in [0, 1] (clamp)
 */
pv.Color.Hsl.prototype.rgb = function() {
  var h = this.h, s = this.s, l = this.l;

  h = h % 360;
  if (h < 0) h += 360;
  s = Math.max(0, Math.min(s, 1));
  l = Math.max(0, Math.min(l, 1));

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
  function vv(h) {
    return Math.round(v(h) * 255);
  }

  return new pv.Color.Rgb(vv(h + 120), vv(h), vv(h - 120), this.a);
};
