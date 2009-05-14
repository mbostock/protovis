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
