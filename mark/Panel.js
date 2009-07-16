/**
 * Constructs a new, empty panel with default properties. Panels, with the
 * exception of the root panel, are not typically constructed directly; instead,
 * they are added to an existing panel or mark via {@link pv.Mark#add}.
 *
 * @class Represents a container mark. Panels allow repeated or nested
 * structures, commonly used in small multiple displays where a small
 * visualization is tiled to facilitate comparison across one or more
 * dimensions. Other types of visualizations may benefit from repeated and
 * possibly overlapping structure as well, such as stacked area charts. Panels
 * can also offset the position of marks to provide padding from surrounding
 * content.
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
 * <p>All panels have a <tt>children</tt> array (possibly empty) containing the
 * child marks in the order they were added. Panels also have a <tt>root</tt>
 * field which points to the root (outermost) panel; the root panel's root field
 * points to itself.
 *
 * <p>See also the <a href="../../api/">Protovis guide</a>.
 *
 * @extends pv.Bar
 */
pv.Panel = function() {
  pv.Bar.call(this);

  /**
   * The child marks; zero or more {@link pv.Mark}s in the order they were
   * added.
   *
   * @see #add
   * @type pv.Mark[]
   */
  this.children = [];
  this.root = this;

  /**
   * The internal $dom field is set by the Protovis loader; see lang/init.js. It
   * refers to the script element that contains the Protovis specification, so
   * that the panel knows where in the DOM to insert the generated SVG element.
   *
   * @private
   */
  this.$dom = pv.Panel.$dom;
};
pv.Panel.prototype = pv.extend(pv.Bar);
pv.Panel.prototype.type = pv.Panel;

/**
 * Returns "panel".
 *
 * @returns {string} "panel".
 */
pv.Panel.toString = function() { return "panel"; };

/**
 * The canvas element; either the string ID of the canvas element in the current
 * document, or a reference to the canvas element itself. If null, a canvas
 * element will be created and inserted into the document at the location of the
 * script element containing the current Protovis specification. This property
 * only applies to root panels and is ignored on nested panels.
 *
 * <p>Note: the "canvas" element here refers to a <tt>div</tt> (or other suitable
 * HTML container element), <i>not</i> a <tt>canvas</tt> element. The name of
 * this property is a historical anachronism from the first implementation that
 * used HTML 5 canvas, rather than SVG.
 *
 * @type string
 * @name pv.Panel.prototype.canvas
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
 *
 * @type boolean
 * @name pv.Panel.prototype.reverse
 */
pv.Panel.prototype.defineProperty("reverse");

/**
 * Default properties for panels. By default, the margins are zero, the fill
 * style is transparent, and the reverse property is false.
 *
 * @type pv.Panel
 */
pv.Panel.defaults = new pv.Panel().extend(pv.Bar.defaults)
    .top(0).left(0).bottom(0).right(0)
    .fillStyle(null)
    .reverse(false);

/**
 * Adds a new mark of the specified type to this panel. Unlike the normal
 * {@link Mark#add} behavior, adding a mark to a panel does not cause the mark
 * to inherit from the panel. Since the contained marks are offset by the panel
 * margins already, inheriting properties is generally undesirable; of course,
 * it is always possible to change this behavior by calling {@link Mark#extend}
 * explicitly.
 *
 * @param {function} type the type of the new mark to add.
 * @returns {pv.Mark} the new mark.
 */
pv.Panel.prototype.add = function(type) {
  var child = new type();
  child.parent = this;
  child.root = this.root;
  child.childIndex = this.children.length;
  this.children.push(child);
  return child;
};

/**
 * Creates a new canvas (SVG) element with the specified width and height, and
 * inserts it into the current document. If the <tt>$dom</tt> field is set, as
 * for text/javascript+protovis scripts, the SVG element is inserted into the
 * DOM before the script element. Otherwise, the SVG element is inserted into
 * the last child element of the document, as for text/javascript scripts.
 *
 * @param w the width of the canvas to create, in pixels.
 * @param h the height of the canvas to create, in pixels.
 * @return the new canvas (SVG) element.
 */
pv.Panel.prototype.createCanvas = function(w, h) {

  /**
   * Returns the last element in the current document's body. The canvas element
   * is appended to this last element if another DOM element has not already
   * been specified via the <tt>$dom</tt> field.
   */
  function lastElement() {
    var node = document.body;
    while (node.lastChild && node.lastChild.tagName) {
      node = node.lastChild;
    }
    return (node == document.body) ? node : node.parentNode;
  }

  /* Create the SVG element. */
  var c = document.createElementNS(pv.ns.svg, "svg");
  c.setAttribute("width", w);
  c.setAttribute("height", h);

  /* Insert it into the DOM at the appropriate location. */
  this.$dom // script element for text/javascript+protovis
      ? this.$dom.parentNode.insertBefore(c, this.$dom)
      : lastElement().appendChild(c);

  return c;
};

/**
 * Evaluates all of the properties for this panel for the specified instance
 * <tt>s</tt> in the scene graph, including recursively building the scene graph
 * for child marks.
 *
 * @param s a node in the scene graph; the instance of the panel to build.
 * @see Mark#scene
 */
pv.Panel.prototype.buildInstance = function(s) {
  pv.Bar.prototype.buildInstance.call(this, s);

  /*
   * Build each child, passing in the parent (this panel) scene graph node. The
   * child mark's scene is initialized from the corresponding entry in the
   * existing scene graph, such that properties from the previous build can be
   * reused; this is largely to facilitate the recycling of SVG elements.
   */
  for (var i = 0; i < this.children.length; i++) {
    this.children[i].scene = s.children[i] || [];
    this.children[i].build(s);
  }

  /*
   * Once the child marks have been built, the new scene graph nodes are removed
   * from the child marks and placed into the scene graph. The nodes cannot
   * remain on the child nodes because this panel (or a parent panel) may be
   * instantiated multiple times!
   */
  for (var i = 0; i < this.children.length; i++) {
    s.children[i] = this.children[i].scene;
    delete this.children[i].scene;
  }

  /* Delete any expired child scenes, should child marks have been removed. */
  s.children.length = this.children.length;
};

/**
 * Computes the implied properties for this panel for the specified instance
 * <tt>s</tt> in the scene graph. Panels have two implied properties:<ul>
 *
 * <li>The <tt>canvas</tt> property references the DOM element, typically a DIV,
 * that contains the SVG element that is used to display the visualization. This
 * property may be specified as a string, referring to the unique ID of the
 * element in the DOM. The string is converted to a reference to the DOM
 * element. The width and height of the SVG element is inferred from this DOM
 * element. If no canvas property is specified, a new SVG element is created and
 * inserted into the document, using the panel dimensions; see
 * {@link #createCanvas}.
 *
 * <li>The <tt>children</tt> array, while not a property per se, contains the
 * scene graph for each child mark. This array is initialized to be empty, and
 * is populated above in {@link #buildInstance}.
 *
 * </ul>The current implementation creates the SVG element, if necessary, during
 * the build phase; in the future, it may be preferrable to move this to the
 * update phase, although then the canvas property would be undefined. In
 * addition, DOM inspection is necessary to define the implied width and height
 * properties that may be inferred from the DOM.
 *
 * @param s a node in the scene graph; the instance of the panel to build.
 */
pv.Panel.prototype.buildImplied = function(s) {
  if (!s.children) s.children = [];
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

      /** Returns the computed style for the given element and property. */
      function css(e, p) {
        return parseFloat(self.getComputedStyle(e, null).getPropertyValue(p));
      }

      /* If width and height weren't specified, inspect the container. */
      var w, h;
      if (s.width == null) {
        w = css(d, "width");
        s.width = w - s.left - s.right;
      } else {
        w = s.width + s.left + s.right;
      }
      if (s.height == null) {
        h = css(d, "height");
        s.height = h - s.top - s.bottom;
      } else {
        h = s.height + s.top + s.bottom;
      }

      c.setAttribute("width", w);
      c.setAttribute("height", h);
      s.canvas = c;
    } else if (s.svg) {
      s.canvas = s.svg.parentNode;
    } else {
      s.canvas = this.createCanvas(
          s.width + s.left + s.right,
          s.height + s.top + s.bottom);
    }
  }
  pv.Bar.prototype.buildImplied.call(this, s);
};

/**
 * Updates the display, propagating property values computed in the build phase
 * to the SVG image. In addition to the SVG element that serves as the canvas,
 * each panel instance has a corresponding <tt>g</tt> (container) element. The
 * <tt>g</tt> element uses the <tt>transform</tt> attribute to offset the location
 * of contained graphical elements.
 */
pv.Panel.prototype.update = function() {
  var appends = [];
  for (var i = 0; i < this.scene.length; i++) {
    var s = this.scene[i];

    /* Create the <svg:g> element, if necessary. */
    var v = s.svg;
    if (!v) {
      v = s.svg = document.createElementNS(pv.ns.svg, "g");
      appends.push(s);
    }

    /* Update this instance, recursively including child marks. */
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
   * WebKit appears has a bug where images are not rendered if the <g> element
   * is appended before it contained any elements. Creating the child elements
   * first and then appending them solves the problem and is likely more
   * efficient. Also, it means we can reverse the order easily.
   *
   * TODO It would be nice to support arbitrary z-order here, at least within
   * panel. Of course, the order of children may need to be updated not just on
   * append.
   */
  if (appends.length) {
    if (appends[0].reverse) appends.reverse();
    for (var i = 0; i < appends.length; i++) {
      var s = appends[i];
      (s.parent ? s.parent.svg : s.canvas).appendChild(s.svg);
    }
  }
};

/**
 * Updates the display for the specified panel instance <tt>s</tt> in the scene
 * graph. This implementation handles the fill and stroke style for the panel,
 * as well as any necessary transform to offset the location of contained marks.
 *
 * <p>TODO As a performance optimization, it may also be possible to assign
 * constant property values (or even the most common value for each property) as
 * attributes on the <g> element so they can be inherited.
 *
 * @param s a node in the scene graph; the instance of the panel to update.
 */
pv.Panel.prototype.updateInstance = function(s) {
  var v = s.svg;

  /* visible */
  if (!s.visible) {
    if (v) v.setAttribute("display", "none");
    return;
  }
  v.removeAttribute("display");

  /* fillStyle, strokeStyle */
  var r = v.$rect;
  if (s.fillStyle || s.strokeStyle) {
    if (!r) {
      r = v.$rect = document.createElementNS(pv.ns.svg, "rect");
      v.insertBefore(r, v.firstChild);
    }

    /* If width and height are exactly zero, the rect is not stroked! */
    r.setAttribute("width", Math.max(1E-10, s.width));
    r.setAttribute("height", Math.max(1E-10, s.height));

    /* fill, stroke TODO gradient, patterns */
    var fill = pv.color(s.fillStyle);
    r.setAttribute("fill", fill.color);
    r.setAttribute("fill-opacity", fill.opacity);
    var stroke = pv.color(s.strokeStyle);
    r.setAttribute("stroke", stroke.color);
    r.setAttribute("stroke-opacity", stroke.opacity);
    r.setAttribute("stroke-width", s.lineWidth);
  } else if (r) {
    v.removeChild(r);
    delete v.$rect;
    r = null;
  }

  /* cursor, title, event, etc. */
  if (r) {
    try {
      s.svg = r;
      pv.Mark.prototype.updateInstance.call(this, s);
    } finally {
      s.svg = v;
    }
  }

  /* left, top */
  if (s.left || s.top) {
    v.setAttribute("transform", "translate(" + s.left + "," + s.top +")");
  } else {
    v.removeAttribute("transform");
  }
};
