pv.Layout.partition = function(map) {
  var nodes, // cached pv.dom(map).nodes()
      sort, // optional sort function
      sizeof = function(n) { return 1; }, // default size function
      orient = "top", // default orientation
      w, // cached parent panel width
      h, // cached parent panel height
      r, // cached Math.min(w, h) / 2
      ds; // cached depth step (inverse depth of tree)

  /** @private */
  function size(n) {
    return n.size = n.firstChild
        ? pv.sum(n.childNodes, size)
        : sizeof(n.nodeValue);
  }

  /** @private Compute the maximum depth of descendants for each node. */
  function depth(n) {
    return n.firstChild ? (1 + pv.max(n.childNodes, depth)) : 0;
  }

  /** @private */
  function data() {
    /* Cache the parent panel dimensions to avoid repeated lookup. */
    w = this.parent.width();
    h = this.parent.height();
    r = Math.min(w, h) / 2;

    /* If the layout was previously computed, use that. */
    if (nodes) return nodes;
    nodes = pv.dom(map).nodes();

    /* Sort the tree and compute the initial depth of each node. */
    var root = nodes[0];
    size(root);
    if (sort) root.sort(sort);
    ds = 1 / depth(root);

    /* Compute the unit breadth and depth of each node. */
    root.minBreadth = 0;
    root.breadth = .5;
    root.maxBreadth = 1;
    root.visitBefore(function(n) {
        var b = n.minBreadth, s = n.maxBreadth - b;
        for (var c = n.firstChild; c; c = c.nextSibling) {
          c.minBreadth = b;
          c.maxBreadth = b += (c.size / n.size) * s;
          c.breadth = (b + c.minBreadth) / 2;
        }
      });
    root.visitAfter(function(n, i) {
        n.minDepth = (i - 1) * ds;
        n.maxDepth = n.depth = i * ds;
      });

    return nodes;
  }

  /** @private The layout, on which all public methods are registered. */
  var layout = {};

  /**
   * Sets or gets the orientation. The default orientation is "left", which
   * means that the root node is placed on the left edge, leaf nodes appear on
   * the right edge, and internal nodes are in-between. The following
   * orientations are supported:<ul>
   *
   * <li>left - left-to-right.
   * <li>right - right-to-left.
   * <li>top - top-to-bottom.
   * <li>bottom - bottom-to-top.
   * <li>radial - radially, with the root at the center.</ul>
   *
   * @param {string} v the new orientation.
   * @function
   * @name pv.Layout.partition.prototype.orient
   * @returns {pv.Layout.partition} this, or the current orientation.
   */
  layout.orient = function(v) {
    if (arguments.length) {
      orient = v;
      return this;
    }
    return orient;
  };

  /**
   * Sets or gets the sort function. The sort function is applied to the tree
   * before the layout is computed; it is a comparator function which takes two
   * arguments and returns a negative number, a positive number, or zero as
   * appropriate. For example, to sort on the node names:
   *
   * <pre>  .sort(function(a, b) pv.naturalOrder(a.nodeName, b.nodeName))</pre>
   *
   * @param {funtion} f the new sort function.
   * @function
   * @name pv.Layout.partition.prototype.sort
   * @returns {pv.Layout.partition} this, or the current sort function.
   * @see pv.naturalOrder
   * @see pv.Dom.Node.prototype.sort
   */
  layout.sort = function(f) {
    if (arguments.length) {
      sort = f;
      return this;
    }
    return sort;
  };

  /**
   * Returns the nodes associated with this layout.
   *
   * @function
   * @name pv.Layout.partition.prototype.nodes
   * @returns {array}
   */
  layout.nodes = data;

  /**
   * Returns the links associated with this layout. Each link is represented as
   * a two-element array; the first element is the child node, and the second
   * element is the parent node.
   *
   * @function
   * @name pv.Layout.partition.prototype.links
   * @returns {array}
   */
  layout.links = function() {
    return data.call(this)
        .filter(function(n) { return n.parentNode; })
        .map(function(n) { return [n, n.parentNode]; });
  };

  /**
   * Sets or gets the sizing function. By default, the size of all leaf nodes is
   * constant. The aggregate sizes of internal (non-leaf) nodes is computed
   * automatically by the layout.
   *
   * <p>For example, if the tree data structure represents a file system, with
   * files as leaf nodes, and each file has a <tt>bytes</tt> attribute, you can
   * specify a size function as:
   *
   * <pre>.size(function(d) d.bytes)</pre>
   *
   * <p>Note that the built-in <tt>Number</tt>, <tt>Math.sqrt</tt> and
   * <tt>Math.log</tt> methods can be used as sizing functions, provided the
   * node values are numbers.
   *
   * @param {function} f the new sizing function.
   * @function
   * @name pv.Layout.partition.prototype.size
   * @returns {pv.Layout.partition} this.
   */
  layout.size = function(f) {
    if (arguments.length) {
      sizeof = f;
      return this;
    }
    return sizeof;
  };

  /** @private Returns the radius of the given node. */
  function radius(n) {
    return n.parentNode ? (n.depth * r) : 0;
  }

  /** @private Returns the angle of the given node. */
  function angle(n) {
    return n.parentNode ? (n.breadth - .25) * 2 * Math.PI : 0;
  }

  /** @private Scales the specified depth for a space-filling layout. */
  function scale(d) {
    return (d + ds) / (1 + ds);
  }

  /**
   * The node prototype. This prototype is intended to be used with a Dot mark
   * in conjunction with the link prototype.
   *
   * @type pv.Mark
   * @name pv.Layout.partition.prototype.node
   */
  layout.node = new pv.Mark()
      .data(data)
      .strokeStyle("#1f77b4")
      .fillStyle("#fff")
      .left(function(n) {
          switch (orient) {
            case "left": return n.depth * w;
            case "right": return w - n.depth * w;
            case "top": return n.breadth * w;
            case "bottom": return w - n.breadth * w;
            case "radial": return w / 2 + radius(n) * Math.cos(angle(n));
          }
        })
      .top(function(n) {
          switch (orient) {
            case "left": return n.breadth * h;
            case "right": return h - n.breadth * h;
            case "top": return n.depth * h;
            case "bottom": return h - n.depth * h;
            case "radial": return h / 2 + radius(n) * Math.sin(angle(n));
          }
        });

  /**
   * The link prototype, which renders edges between child nodes and their
   * parents. This prototype is intended to be used with a Line mark in
   * conjunction with the node prototype.
   *
   * @type pv.Mark
   * @name pv.Layout.partition.prototype.link
   */
  layout.link = new pv.Mark()
      .extend(layout.node)
      .data(pv.identity)
      .strokeStyle("#ccc")
      .fillStyle(null);

  /**
   * The node label prototype, which renders the node name adjacent to the node.
   * This prototype is provided as an alternative to using the anchor on the
   * node or fill mark; it is primarily intended to be used with radial
   * node-link layouts, since it provides a convenient mechanism to set the text
   * angle.
   *
   * @type pv.Mark
   * @name pv.Layout.partition.prototype.label
   */
  layout.label = new pv.Mark()
      .extend(layout.node)
      .textMargin(7)
      .textBaseline("middle")
      .text(function(n) { return n.parentNode ? n.nodeName : "root"; })
      .textAngle(function(n) {
          if (orient != "radial") return 0;
          var a = angle(n);
          return pv.Wedge.upright(a) ? a : (a + Math.PI);
        })
      .textAlign(function(n) {
          if (orient != "radial") return n.firstChild ? "right" : "left";
          return pv.Wedge.upright(angle(n)) ? "left" : "right";
        });

  /**
   * The fill prototype, used for a space-filling partition. In Cartesian
   * coordinates (i.e., if the orientation is not "radial"), a Bar mark is
   * typically used to fill the space; in polar coordinates ("radial"
   * orientation), a Wedge mark is used instead.
   *
   * @type pv.Mark
   * @name pv.Layout.partition.prototype.bar
   */
  layout.fill = new pv.Mark()
      .data(data)
      .strokeStyle("#fff")
      .fillStyle("#ccc")
      .left(function(n) {
          switch (orient) {
            case "left": return scale(n.minDepth) * w;
            case "right": return (1 - scale(n.maxDepth)) * w;
            case "top": return n.minBreadth * w;
            case "bottom": return (1 - n.maxBreadth) * w;
            case "radial": return w / 2;
          }
        })
      .top(function(n) {
          switch (orient) {
            case "left": return n.minBreadth * h;
            case "right": return (1 - n.maxBreadth) * h;
            case "top": return scale(n.minDepth) * h;
            case "bottom": return (1 - scale(n.maxDepth)) * h;
            case "radial": return h / 2;
          }
        })
      .width(function(n) {
          switch (orient) {
            case "left":
            case "right": return (n.maxDepth - n.minDepth) / (1 + ds) * w;
            case "top":
            case "bottom": return (n.maxBreadth - n.minBreadth) * w;
          }
        })
      .height(function(n) {
          switch (orient) {
            case "left":
            case "right": return (n.maxBreadth - n.minBreadth) * h;
            case "top":
            case "bottom": return (n.maxDepth - n.minDepth) / (1 + ds) * h;
          }
        })
      .innerRadius(function(n) { return scale(n.minDepth) * r; })
      .outerRadius(function(n) { return scale(n.maxDepth) * r; })
      .startAngle(function(n) { return (n.minBreadth - .25) * 2 * Math.PI; })
      .endAngle(function(n) { return (n.maxBreadth - .25) * 2 * Math.PI; });

  return layout;
};
