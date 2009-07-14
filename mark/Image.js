/**
 * TODO
 */
pv.Image = function() {
  pv.Bar.call(this);
};
pv.Image.prototype = pv.extend(pv.Bar);
pv.Image.prototype.type = pv.Image;
pv.Image.toString = function() { return "image"; };

/**
 * TODO
 */
pv.Image.prototype.defineProperty("image");

/**
 * TODO
 */
pv.Image.defaults = new pv.Image().extend(pv.Bar.defaults)
    .fillStyle(null);

/**
 * TODO
 */
pv.Image.prototype.updateInstance = function(s) {
  var v = s.svg;
  if (s.visible && !v) {
    v = s.svg = document.createElementNS(pv.ns.svg, "image");
    v.setAttribute("preserveAspectRatio", "none");
    s.parent.svg.appendChild(v);
  }

  if (!s.strokeStyle) {

    /* XXX Blech ... */
    if (v.$stroke) {
      v.parentNode.removeChild(v.$stroke.$title || v.$stroke);
      delete v.$stroke;
    }

    pv.Mark.prototype.updateInstance.call(this, s);
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

  /* fill */
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

  /* stroke */
  if (s.strokeStyle) {
    var f = v.$stroke;

    /* XXX Blech ... */
    if (v.$title) {
      var p = v.$title.parentNode;
      p.insertBefore(v, v.$title);
      p.removeChild(v.$title);
      delete v.$title;
    }

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

    try {
      s.svg = f;
      pv.Mark.prototype.updateInstance.call(this, s);
    } finally {
      s.svg = v;
    }
  }

  /* image */
  v.setAttributeNS(pv.ns.xlink, "href", s.image);
};
