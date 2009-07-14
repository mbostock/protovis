/**
 * Returns the {@link Color} for the specified color format string. Colors may
 * have an associated opacity, or alpha channel. Color formats are specified by
 * CSS Color Modular Level 3, using either in RGB or HSL color space. For
 * example:<ul>
 *
 * <li>#f00 // #rgb
 * <li>#ff0000 // #rrggbb
 * <li>rgb(255, 0, 0)
 * <li>rgb(100%, 0%, 0%)
 * <li>hsl(0, 100%, 50%)
 * <li>rgba(0, 0, 255, 0.5)
 * <li>hsla(120, 100%, 50%, 1)
 *
 * </ul>The SVG 1.0 color keywords names are also supported, such as "aliceblue"
 * and yellowgreen". The "transparent" keyword is also supported for a fully-
 * transparent color.
 *
 * <p>If the {@code format} argument is already an instance of {@code Color},
 * the argument is returned with no further processing.
 *
 * @param format the color specification string, e.g., "#f00".
 * @return the corresponding {@code Color}.
 * @see http://www.w3.org/TR/SVG/types.html#ColorKeywords
 * @see http://www.w3.org/TR/css3-color/
 */
pv.color = function(format) {
  if (!format || (format == "transparent")) {
    return new pv.Color.Rgb(0, 0, 0, 0);
  }
  if (format instanceof pv.Color) {
    return format;
  }

  /* Handle hsl, rgb. */
  var m1 = /([a-z]+)\((.*)\)/i.exec(format);
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
  return new pv.Color(format, 1);
};

/**
 * Represents an abstract (possibly translucent) color. The color is divided
 * into two parts: the {@code color} attribute, an opaque color format string,
 * and the {@code opacity} attribute, a float between 0 and 1. The color space
 * is dependent on the implementing class; all colors should support the {@link
 * #rgb} method to convert to RGB color space for interpolation.
 *
 * @param color an opaque color format string, such as "#f00".
 * @param opacity the opacity, in [0,1].
 */
pv.Color = function(color, opacity) {
  this.color = color;
  this.opacity = opacity;
};

/**
 * Represents a color in RGB space.
 *
 * @param r the red channel, an integer in [0,255].
 * @param g the green channel, an integer in [0,255].
 * @param b the blue channel, an integer in [0,255].
 * @param a the alpha channel, a float in [0,1].
 */
pv.Color.Rgb = function(r, g, b, a) {
  pv.Color.call(this, a ? ("rgb(" + r + "," + g + "," + b + ")") : "none", a);
  this.r = r; // [0,255], integer
  this.g = g; // [0,255], integer
  this.b = b; // [0,255], integer
  this.a = a; // [0,1]
};
pv.Color.Rgb.prototype = pv.extend(pv.Color);
pv.Color.Rgb.prototype.rgb = function() { return this; };

/**
 * Represents a color in HSL space.
 *
 * @param h the hue, an integer in [0,360].
 * @param s the saturation, a float in [0,1].
 * @param l the lightness, a float in [0,1].
 * @param a the opacity, a float in [0,1].
 */
pv.Color.Hsl = function(h, s, l, a) {
  pv.Color.call(this, "hsl(" + h + "," + (s * 100) + "%," + (l * 100) + "%)", a);
  this.h = h; // [0,360]
  this.s = s; // [0,1]
  this.l = l; // [0,1]
  this.a = a; // [0,1]
};
pv.Color.Hsl.prototype = pv.extend(pv.Color);

/**
 * Returns the RGB color equivalent to this HSL color.
 *
 * @see Color.Rgb
 */
pv.Color.Hsl.prototype.rgb = function() {
  var h = this.h, s = this.s, l = this.l;

  /* Some simple corrections for h, s and l. */
  h = h % 360; if (h < 0) h += 360;
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
