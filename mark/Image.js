/**
 * Constructs a new dot mark with default properties. Images are not typically
 * constructed directly, but by adding to a panel or an existing mark via
 * {@link pv.Mark#add}.
 *
 * @class Represents an image. Images share the same layout and style properties as
 * bars, in conjunction with an external image such as PNG or JPEG. The image is
 * specified via the {@link #url} property. The fill, if specified, appears
 * beneath the image, while the optional stroke appears above the image.
 *
 * <p>TODO Restore support for dynamic images (such as heatmaps). These were
 * supported in the canvas implementation using the pixel buffer API; although
 * SVG does not support pixel manipulation, it is possible to embed a canvas
 * element in SVG using foreign objects.
 *
 * <p>TODO Allow different modes of image placement: "scale" -- scale and
 * preserve aspect ratio, "tile" -- repeat the image, "center" -- center the
 * image, "fill" -- scale without preserving aspect ratio.
 *
 * <p>See {@link pv.Bar} for details on positioning properties.
 *
 * @extends pv.Bar
 */
pv.Image = function() {
  pv.Bar.call(this);
};
pv.Image.prototype = pv.extend(pv.Bar);
pv.Image.prototype.type = pv.Image;

/**
 * Returns "image".
 *
 * @returns {string} "image".
 */
pv.Image.toString = function() { return "image"; };

/**
 * The URL of the image to display. The set of supported image types is
 * browser-dependent; PNG and JPEG are recommended.
 *
 * @type string
 * @name pv.Image.prototype.url
 */
pv.Image.prototype.defineProperty("url");

/**
 * Default properties for images. By default, there is no stroke or fill style.
 *
 * @type pv.Image
 */
pv.Image.defaults = new pv.Image().extend(pv.Bar.defaults)
    .fillStyle(null);

/**
 * Updates the display for the specified image instance <tt>s</tt> in the scene
 * graph. This implementation handles the fill and stroke style for the image,
 * as well as positional properties.
 *
 * <p>Image rendering is a bit more complicated than most marks because it can
 * entail up to four SVG elements: three for the fill, image and stroke, and the
 * fourth an anchor element for the title tooltip. The anchor element is placed
 * around the stroke rect element, if present, and otherwise the image element.
 * Similarly the event handlers and cursor style is placed on the stroke
 * element, if present, and otherwise the image element. Note that since the
 * stroke element is transparent, the <tt>pointer-events</tt> attribute is used
 * to capture events.
 *
 * @param s a node in the scene graph; the instance of the image to update.
 */
pv.Image.prototype.updateInstance = function(s) {
  var v = s.svg;

  /* Create the svg:image element, if necessary. */
  if (s.visible && !v) {
    v = s.svg = document.createElementNS(pv.ns.svg, "image");
    v.setAttribute("preserveAspectRatio", "none");
    s.parent.svg.appendChild(v);
  }

  /*
   * If no stroke is specified, then the event handlers and title anchor element
   * can be placed on the image element. However, if there was previously a
   * title anchor element around the stroke element, we must be careful to
   * remove it. This logic could likely be simplified.
   */
  if (!s.strokeStyle) {
    if (v.$stroke) {
      v.parentNode.removeChild(v.$stroke.$title || v.$stroke);
      delete v.$stroke;
    }

    /* cursor, title, events, etc. */
    pv.Mark.prototype.updateInstance.call(this, s);
  }

  /* visible */
  function display(v) {
    s.visible ? v.removeAttribute("display") : v.setAttribute("display", "none");
  }
  if (v) {
    display(v);
    if (v.$stroke) display(v.$stroke);
    if (v.$fill) display(v.$fill);
  }
  if (!s.visible) return;

  /* left, top, width, height */
  function position(v) {
    v.setAttribute("x", s.left);
    v.setAttribute("y", s.top);
    v.setAttribute("width", s.width);
    v.setAttribute("height", s.height);
  }
  position(v);

  /* fill (via an underlaid svg:rect element) */
  if (s.fillStyle) {
    var f = v.$fill;
    if (!f) {
      f = v.$fill = document.createElementNS(pv.ns.svg, "rect");
      (v.$title || v).parentNode.insertBefore(f, (v.$title || v));
    }
    position(f);
    var fill = pv.color(s.fillStyle);
    f.setAttribute("fill", fill.color);
    f.setAttribute("fill-opacity", fill.opacity);
  } else if (v.$fill) {
    v.$fill.parentNode.removeChild(v.$fill);
    delete v.$fill;
  }

  /* stroke (via an overlaid svg:rect element) */
  if (s.strokeStyle) {
    var f = v.$stroke;

    /*
     * If the $title attribute is set, that means the title anchor element was
     * previously on the image element; now that the stroke style is set, we
     * must delete the old title element to make room for the new one.
     */
    if (v.$title) {
      var p = v.$title.parentNode;
      p.insertBefore(v, v.$title);
      p.removeChild(v.$title);
      delete v.$title;
    }

    /* Create the stroke svg:rect element, if necessary. */
    if (!f) {
      f = v.$stroke = document.createElementNS(pv.ns.svg, "rect");
      f.setAttribute("fill", "none");
      f.setAttribute("pointer-events", "all");
      v.parentNode.insertBefore(f, v.nextSibling);
    }
    position(f);
    var stroke = pv.color(s.strokeStyle);
    f.setAttribute("stroke", stroke.color);
    f.setAttribute("stroke-opacity", stroke.opacity);
    f.setAttribute("stroke-width", s.lineWidth);

    /* cursor, title, events, etc. */
    try {
      s.svg = f;
      pv.Mark.prototype.updateInstance.call(this, s);
    } finally {
      s.svg = v;
    }
  }

  /* url */
  v.setAttributeNS(pv.ns.xlink, "href", s.url);
};
