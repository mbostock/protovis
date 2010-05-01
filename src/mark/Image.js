/**
 * Constructs a new image with default properties. Images are not typically
 * constructed directly, but by adding to a panel or an existing mark via
 * {@link pv.Mark#add}.
 *
 * @class Represents an image, either a static resource or a dynamically-
 * generated pixel buffer. Images share the same layout and style properties as
 * bars. The external image resource is specified via the {@link #url}
 * property. The optional fill, if specified, appears beneath the image, while
 * the optional stroke appears above the image.
 *
 * <p>Dynamic images such as heatmaps are supported using the {@link #image}
 * psuedo-property. This function is passed the <i>x</i> and <i>y</i> index, in
 * addition to the current data stack. The return value is a {@link pv.Color},
 * or null for transparent. A string can also be returned, which will be parsed
 * into a color; however, it is typically much faster to return an object with
 * <tt>r</tt>, <tt>g</tt>, <tt>b</tt> and <tt>a</tt> attributes, to avoid the
 * cost of parsing and object instantiation.
 *
 * <p>See {@link pv.Bar} for details on positioning properties.
 *
 * @extends pv.Bar
 */
pv.Image = function() {
  pv.Bar.call(this);
};

pv.Image.prototype = pv.extend(pv.Bar)
    .property("url", String)
    .property("imageWidth", Number)
    .property("imageHeight", Number);

pv.Image.prototype.type = "image";

/**
 * The URL of the image to display. The set of supported image types is
 * browser-dependent; PNG and JPEG are recommended.
 *
 * @type string
 * @name pv.Image.prototype.url
 */

/**
 * The width of the image in pixels. For static images, this property is
 * computed implicitly from the loaded image resources. For dynamic images, this
 * property can be used to specify the width of the pixel buffer; otherwise, the
 * value is derived from the <tt>width</tt> property.
 *
 * @type number
 * @name pv.Image.prototype.imageWidth
 */

/**
 * The height of the image in pixels. For static images, this property is
 * computed implicitly from the loaded image resources. For dynamic images, this
 * property can be used to specify the height of the pixel buffer; otherwise, the
 * value is derived from the <tt>height</tt> property.
 *
 * @type number
 * @name pv.Image.prototype.imageHeight
 */

/**
 * Default properties for images. By default, there is no stroke or fill style.
 *
 * @type pv.Image
 */
pv.Image.prototype.defaults = new pv.Image()
    .extend(pv.Bar.prototype.defaults)
    .fillStyle(null);

/**
 * Specifies the dynamic image function. By default, no image function is
 * specified and the <tt>url</tt> property is used to load a static image
 * resource. If an image function is specified, it will be invoked for each
 * pixel in the image, based on the related <tt>imageWidth</tt> and
 * <tt>imageHeight</tt> properties.
 *
 * <p>For example, given a two-dimensional array <tt>heatmap</tt>, containing
 * numbers in the range [0, 1] in row-major order, a simple monochrome heatmap
 * image can be specified as:
 *
 * <pre>vis.add(pv.Image)
 *     .imageWidth(heatmap[0].length)
 *     .imageHeight(heatmap.length)
 *     .image(pv.ramp("white", "black").by(function(x, y) heatmap[y][x]));</pre>
 *
 * For fastest performance, use an ordinal scale which caches the fixed color
 * palette, or return an object literal with <tt>r</tt>, <tt>g</tt>, <tt>b</tt>
 * and <tt>a</tt> attributes. A {@link pv.Color} or string can also be returned,
 * though this typically results in slower performance.
 *
 * @param {function} f the new sizing function.
 * @returns {pv.Layout.Pack} this.
 */
pv.Image.prototype.image = function(f) {
  /** @private */
  this.$image = function() {
      var c = f.apply(this, arguments);
      return c == null ? pv.Color.transparent
          : typeof c == "string" ? pv.color(c)
          : c;
    };
  return this;
};

/** @private Scan the proto chain for an image function. */
pv.Image.prototype.bind = function() {
  pv.Bar.prototype.bind.call(this);
  var binds = this.binds, mark = this;
  do {
    binds.image = mark.$image;
  } while (!binds.image && (mark = mark.proto));
};

/** @private */
pv.Image.prototype.buildImplied = function(s) {
  pv.Bar.prototype.buildImplied.call(this, s);
  if (!s.visible) return;

  /* Compute the implied image dimensions. */
  if (s.imageWidth == null) s.imageWidth = s.width;
  if (s.imageHeight == null) s.imageHeight = s.height;

  /* Compute the pixel values. */
  if ((s.url == null) && this.binds.image) {

    /* Cache the canvas element to reuse across renders. */
    var canvas = this.$canvas || (this.$canvas = document.createElement("canvas")),
        context = canvas.getContext("2d"),
        w = s.imageWidth,
        h = s.imageHeight,
        stack = pv.Mark.stack,
        data;

    /* Evaluate the image function, storing into a CanvasPixelArray. */
    canvas.width = w;
    canvas.height = h;
    data = (s.image = context.createImageData(w, h)).data;
    stack.unshift(null, null);
    for (var y = 0, p = 0; y < h; y++) {
      stack[1] = y;
      for (var x = 0; x < w; x++) {
        stack[0] = x;
        var color = this.binds.image.apply(this, stack);
        data[p++] = color.r;
        data[p++] = color.g;
        data[p++] = color.b;
        data[p++] = 255 * color.a;
      }
    }
    stack.splice(0, 2);
  }
};
