pv.Image = function() {
  pv.Bar.call(this);
};

pv.Image.toString = function() {
  return "image";
};

pv.Image.prototype = pv.Bar.extend();
pv.Image.prototype.type = pv.Image;
pv.Image.prototype.defineProperty("image");
pv.Image.prototype.defineProperty("imageWidth");
pv.Image.prototype.defineProperty("imageHeight");

pv.Image.defaults = new pv.Image().extend(pv.Bar.defaults)
    .fillStyle(null);

pv.Image.prototype.updateInstance = function(s) {
  var v = s.svg;
  if (s.visible && !v) {
    v = s.svg = document.createElementNS(pv.ns.svg, "image");
    s.parent.svg.appendChild(v);
  }

  pv.Mark.prototype.updateInstance.call(this, s);
  if (!s.visible) return;

  /* TODO fill, stroke, dynamic images */
  v.setAttribute("x", s.left);
  v.setAttribute("y", s.top);
  v.setAttribute("width", s.width);
  v.setAttribute("height", s.height);

  v.setAttributeNS(pv.ns.xlink, "href", s.image);
};

// pv.Image.prototype.buildImplied = function(s) {
//   pv.Bar.prototype.buildImplied.call(this, s);
//   if (typeof s.image == "string") {

//     /* Cache the image element to reuse across renders. */
//     if (!pv.Image.cache) pv.Image.cache = {};
//     var i = pv.Image.cache[s.image];

//     if (!i) {
//       i = new Image(), r = this.root;
//       i.src = s.image;
//       if (s.imageWidth) i.width = s.imageWidth;
//       if (s.imageHeight) i.height = s.imageHeight;
//       i.onload = function() { r.update(); }; // redraw on load
//       pv.Image.cache[s.image] = i;
//     }

//     s.image = i;
//   } else if (s.image instanceof Function) {
//     var c = document.createElement("canvas"); // TODO cache?

//     /* Update the canvas dimensions. */
//     var w = s.imageWidth || s.width, h = s.imageHeight || s.height;
//     c.width = w;
//     c.height = h;

//     var g = c.getContext("2d");
//     var image = g.getImageData(0, 0, w, h);
//     var stack = this.root.scene.data;
//     stack.unshift(null, null);
//     for (var x = 0, p = 0; x < w; x++) {
//       stack[0] = x;
//       for (var y = 0; y < h; y++) {
//         stack[1] = y;
//         var color = s.image.apply(this, stack);
//         for (var z = 0; z < 4; z++, p++) {
//           image.data[p] = color[z];
//         }
//       }
//     }
//     g.putImageData(image, 0, 0);
//     stack.splice(0, 2);

//     s.image = c;
//   }
// };

/* For consistency with other property functions, these support constants. */

// pv.Image.prototype.rgba = function(f, g, b, a) {
//   if (!(f instanceof Function)) {
//     return this.fill("rgb(" + f + "," + g + "," + b + "," + a + ")");
//   }
//   return this.image(function() { return f; });
// };

// pv.Image.prototype.rgb = function(f, g, b) {
//   if (!(f instanceof Function)) {
//     return this.fill("rgb(" + f + "," + g + "," + b + ")");
//   }
//   return this.image(function() {
//       return function() {
//           var rgb = f.apply(this, arguments);
//           rgb[3] = 255;
//           return rgb;
//         };
//     });
// };

// pv.Image.prototype.monochrome = function(f) {
//   if (!(f instanceof Function)) {
//     return this.fill("rgb(" + f + "," + f + "," + f + ")");
//   }
//   return this.image(function() {
//       return function() {
//           var v = f.apply(this, arguments);
//           return [v, v, v, 255];
//         };
//     });
// };
