/**
 * Constructs a new image with default properties. Images are not typically
 * constructed directly, but by adding to a panel or an existing mark via {@link
 * pv.Mark#add}.
 *
 * @class Represents an image. Images share the same layout and style properties
 * as bars, in conjunction with an external image such as PNG or JPEG. The image
 * is specified via the {@link #url} property. The fill, if specified, appears
 * beneath the image, while the optional stroke appears above the image.
 *
 * <p>Dynamic images such as heatmaps are supported using the {@link #image}
 * function. This function is passed the <i>x</i> and <i>y</i> index, in
 * addition to the current data stack. The return value is a {@link pv.Color}.
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
 * Default properties for images. By default, there is no stroke or fill style.
 *
 * @type pv.Image
 */
pv.Image.prototype.defaults = new pv.Image()
    .extend(pv.Bar.prototype.defaults)
    .fillStyle(null);

pv.Image.prototype.image = function(f) {
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
