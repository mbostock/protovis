pv.Panel = function() {
  pv.Bar.call(this);
  this.children = [];
  this.root = this;
  this.$dom = pv.Panel.$dom;
};

pv.Panel.toString = function() {
  return "panel";
};

pv.Panel.prototype = pv.extend(pv.Bar);
pv.Panel.prototype.type = pv.Panel;
pv.Panel.prototype.defineProperty("canvas");

pv.Panel.defaults = new pv.Panel().extend(pv.Bar.defaults)
    .top(0).left(0).bottom(0).right(0)
    .fillStyle(null);

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
        s.height = w - s.top - s.bottom;
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
  for (var i = 0; i < this.scene.length; i++) {
    var s = this.scene[i];

    var v = s.svg, append = false;
    if (!v) {
      v = s.svg = document.createElementNS(pv.ns.svg, "g");
      append = true;
    }

    this.updateInstance(s);
    for (var j = 0; j < this.children.length; j++) {
      var c = this.children[j];
      c.scene = s.children[j];
      c.update();
      delete c.scene;
    }

    /*
     * WebKit appears to have a bug where images were not rendered if the <g>
     * element was appended before it contained any elements. Creating the child
     * elements first and then appending them solves the problem and is likely
     * more efficient.
     */
    if (append) {
      (s.parent ? s.parent.svg : s.canvas).appendChild(v);
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
  if (s.left || s.top) {
    s.svg.setAttribute("transform", "translate(" + s.left + "," + s.top +")");
  }
};
