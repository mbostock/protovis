/**
 * Represents a container mark. Panels allow repeated or nested structures,
 * commonly used in small multiple displays where a small visualization is tiled
 * to facilitate comparison across one or more dimensions. Other types of
 * visualizations may benefit from repeated and possibly overlapping structure
 * as well, such as stacked area charts. Panels can also offset the position of
 * marks to provide padding from surrounding content.
 *
 * <p>All Protovis displays have at least one panel; this is the root panel to
 * which marks are rendered. The box model properties (four margins, width and
 * height) are used to offset the positions of contained marks. The data
 * property determines the panel count: a panel is generated once per associated
 * datum. When nested panels are used, property functions can declare additional
 * arguments to access the data associated with enclosing panels.
 *
 * <p>Panels can be rendered inline, facilitating the creation of sparklines.
 * This allows designers to reuse browser layout features, such as text flow and
 * tables; designers can also overlay HTML elements such as rich text and
 * images.
 *
 * <p>All panels have a {@code children} array (possibly empty) containing the
 * child marks in the order they were added. Panels also have a {@code root}
 * field which points to the root (outermost) panel; the root panel's root field
 * points to itself.
 */
pv.Panel = function() {
  pv.Bar.call(this);
  this.children = [];
  this.root = this;

  /*
   * The internal $dom field is set by the Protovis loader; see lang/init.js. It
   * refers to the script element that contains the Protovis specification, so
   * that the panel knows where in the DOM to insert the generated SVG element.
   */
  this.$dom = pv.Panel.$dom;
};
pv.Panel.prototype = pv.extend(pv.Bar);
pv.Panel.prototype.type = pv.Panel;
pv.Panel.toString = function() { return "panel"; };

/**
 * The canvas element; either the string ID of the canvas element in the current
 * document, or a reference to the canvas element itself. If null, a canvas
 * element will be created and inserted into the document at the location of the
 * script element containing the current Protovis specification. This property
 * only applies to root panels and is ignored on nested panels.
 *
 * <p>Note: the "canvas" element here refers to a {@code div} (or other suitable
 * HTML container element), <i>not</i> a {@code canvas} element. The name of
 * this property is a historical anachronism from the first implementation that
 * used HTML 5 canvas, rather than SVG.
 */
pv.Panel.prototype.defineProperty("canvas");

/**
 * The reverse property; a boolean determining whether child marks are ordered
 * from front-to-back or back-to-front. SVG does not support explicit
 * z-ordering; shapes are rendered in the order they appear. Thus, by default,
 * child marks are rendered in the order they are added to the panel. Setting
 * the reverse property to false reverses the order in which they are added to
 * the SVG element; however, the properties are still evaluated (i.e., built) in
 * forward order.
 */
pv.Panel.prototype.defineProperty("reverse");

/**
 * Default properties for panels. By default, the margins are zero, the fill
 * style is transparent, and the reverse property is false.
 */
pv.Panel.defaults = new pv.Panel().extend(pv.Bar.defaults)
    .top(0).left(0).bottom(0).right(0)
    .fillStyle(null)
    .reverse(false);

pv.Panel.prototype.add = function(type) {
  var child = new type();
  child.parent = this;
  child.root = this.root;
  child.childIndex = this.children.length;
  this.children.push(child);
  return child;
};

pv.Panel.prototype.createCanvas = function(w, h) {
  function lastChild(node) {
    while (node.lastChild && node.lastChild.tagName) {
      node = node.lastChild;
    }
    return (node == document.body) ? node : node.parentNode;
  }

  /* Cache the canvas element to reuse across renders. */
  if (!this.$canvases) this.$canvases = [];
  var c = this.$canvases[this.index];
  if (!c) {
    this.$canvases[this.index] = c = document.createElementNS(pv.ns.svg, "svg");
    this.$dom // script element for text/javascript+protovis
        ? this.$dom.parentNode.insertBefore(c, this.$dom)
        : lastChild(document.body).appendChild(c);
  }

  c.setAttribute("width", w);
  c.setAttribute("height", h);
  return c;
};

pv.Panel.prototype.buildInstance = function(s) {
  pv.Bar.prototype.buildInstance.call(this, s);
  if (!s.children) s.children = [];
  for (var i = 0; i < this.children.length; i++) {
    this.children[i].scene = s.children[i] || [];
    this.children[i].build(s);
  }
  for (var i = 0; i < this.children.length; i++) {
    s.children[i] = this.children[i].scene;
    delete this.children[i].scene;
  }
  s.children.length = this.children.length;
};

pv.Panel.prototype.buildImplied = function(s) {
  if (!s.parent) {
    var c = s.canvas;
    if (c) {
      var d = (typeof c == "string") ? document.getElementById(c) : c;

      /* Clear the container if it's not already associated with this panel. */
      if (d.$panel != this) {
        d.$panel = this;
        delete d.$canvas;
        d.innerHTML = "";
      }

      /* Construct the canvas if not already present. */
      if (!(c = d.$canvas)) {
        d.$canvas = c = document.createElementNS(pv.ns.svg, "svg");
        d.appendChild(c);
      }

      /* If width and height weren't specified, inspect the container. */
      var w, h;
      if (s.width == null) {
        w = pv.css(d, "width");
        s.width = w - s.left - s.right;
      } else {
        w = s.width + s.left + s.right;
      }
      if (s.height == null) {
        h = pv.css(d, "height");
        s.height = h - s.top - s.bottom;
      } else {
        h = s.height + s.top + s.bottom;
      }

      c.setAttribute("width", w);
      c.setAttribute("height", h);
      s.canvas = c;
    } else {
      s.canvas = this.createCanvas(
          s.width + s.left + s.right,
          s.height + s.top + s.bottom);
    }
  }
  pv.Bar.prototype.buildImplied.call(this, s);
};

pv.Panel.prototype.update = function() {
  var appends = [];
  for (var i = 0; i < this.scene.length; i++) {
    var s = this.scene[i];

    var v = s.svg;
    if (!v) {
      v = s.svg = document.createElementNS(pv.ns.svg, "g");
      appends.push(s);
    }

    this.updateInstance(s);
    if (s.children) { // check visibility
      for (var j = 0; j < this.children.length; j++) {
        var c = this.children[j];
        c.scene = s.children[j];
        c.update();
        delete c.scene;
      }
    }
  }

  /*
   * WebKit appears to have a bug where images were not rendered if the <g>
   * element was appended before it contained any elements. Creating the child
   * elements first and then appending them solves the problem and is likely
   * more efficient. Also, it means we can reverse the order easily.
   */
  if (appends.length) {
    if (appends[0].reverse) appends.reverse();
    for (var i = 0; i < appends.length; i++) {
      var s = appends[i];
      (s.parent ? s.parent.svg : s.canvas).appendChild(s.svg);
    }
  }
};

/*
 * TODO fill and stroke on the <g> element does not render a box, but are
 * instead inherited by child elements. In order to render any fill and
 * stroke associated with the panel itself, we must create another <rect>
 * element.
 *
 * TODO As a performance optimization, it may also be possible to assign
 * constant property values (or even the most common value for each
 * property) as attributes on the <g> element so they can be inherited.
 */

pv.Panel.prototype.updateInstance = function(s) {
  // TODO visibility?

  /* fillStyle, strokeStyle */
  var r = s.svg.$rect;
  if (s.fillStyle || s.strokeStyle) {
    if (!r) {
      r = s.svg.$rect = document.createElementNS(pv.ns.svg, "rect");
      r.setAttribute("width", "100%");
      r.setAttribute("height", "100%");
      s.svg.insertBefore(r, s.svg.firstChild);
    }

    /* TODO gradient, patterns */
    var fill = pv.color(s.fillStyle);
    r.setAttribute("fill", fill.color);
    r.setAttribute("fill-opacity", fill.opacity);
    var stroke = pv.color(s.strokeStyle);
    r.setAttribute("stroke", stroke.color);
    r.setAttribute("stroke-opacity", stroke.opacity);
    r.setAttribute("stroke-width", s.lineWidth);
  } else if (r) {
    s.svg.removeChild(r);
    delete s.svg.$rect;
  }

  if (s.left || s.top) {
    s.svg.setAttribute("transform", "translate(" + s.left + "," + s.top +")");
  }
};
