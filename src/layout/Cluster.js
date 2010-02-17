pv.Layout.cluster = function(map) {
  var nodes, // cached pv.dom(map).nodes()
      sort, // optional sort function
      orient = "top", // default orientation
      g = 0, // amount to group leaves
      w, // cached parent panel width
      h, // cached parent panel height
      r, // cached Math.min(w, h) / 2
      ds; // cached depth step (inverse depth of tree)

  /** @private Compute the maximum depth of descendants for each node. */
  function depth(n) {
    var d = 0;
    for (var c = n.firstChild; c; c = c.nextSibling) {
      d = Math.max(d, 1 + depth(c));
    }
    return n.depth = d;
  }

  /** @private The layout is computed as a side-effect of the data property. */
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
    if (sort) root.sort(sort);
    ds = 1 / depth(root);

    /* Count the number of leaf nodes. */
    var leafCount = 0, p;
    root.visitAfter(function(n) {
        if (!n.firstChild) {
          if (g && (p != n.parentNode)) {
            p = n.parentNode;
            leafCount += g;
          }
          leafCount++;
        }
      });

    /* Compute the unit breadth and depth of each node. */
    var leafIndex = 0, step = 1 / leafCount, p = undefined;
    root.visitAfter(function(n) {
        if (n.firstChild) {
          var b = 0;
          for (var c = n.firstChild; c; c = c.nextSibling) b += c.breadth;
          b /= n.childNodes.length;
        } else {
          if (g && (p != n.parentNode)) {
            p = n.parentNode;
            leafIndex += g;
          }
          b = step * (.5 + leafIndex++);
        }
        n.breadth = b;
        n.depth = 1 - n.depth / root.depth;
      });

    /* Compute breadth and depth ranges for space-filling layouts. */
    root.visitAfter(function(n) {
        n.minBreadth = n.firstChild ? n.firstChild.minBreadth : (n.breadth - step / 2);
        n.maxBreadth = n.firstChild ? n.lastChild.maxBreadth : (n.breadth + step / 2);
      });
    root.visitBefore(function(n) {
        n.minDepth = n.parentNode ? n.parentNode.maxDepth : 0;
        n.maxDepth = n.parentNode ? (n.depth + root.depth) : (n.minDepth + 2 * root.depth);
      });
    root.minDepth = -ds;
    root.minBreadth = 0;

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
   * @name pv.Layout.cluster.prototype.orient
   * @returns {pv.Layout.cluster} this, or the current orientation.
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
   * @param {function} f the new sort function.
   * @function
   * @name pv.Layout.cluster.prototype.sort
   * @returns {pv.Layout.cluster} this, or the current sort function.
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
   * Sets or gets whether leaves of a given parent are grouped, i.e., whether
   * differentiating space is placed between sibling leaf groups. The default is
   * 0 (or false), causing non-sibling leaves to be adjacent. Setting this to
   * true (or 1) uses one leaf's worth of spacing between groups.
   *
   * @param {number} x the new group spacing.
   * @function
   * @name pv.Layout.cluster.prototype.groupLeaves
   * @returns {pv.Layout.cluster} this, or the current group spacing.
   */
  layout.groupLeaves = function(x) {
    if (arguments.length) {
      g = Number(x);
      return this;
    }
    return g;
  };

  /**
   * Returns the nodes associated with this layout.
   *
   * @function
   * @name pv.Layout.cluster.prototype.nodes
   * @returns {array}
   */
  layout.nodes = data;

  /**
   * Returns the links associated with this layout. Each link is represented as
   * a two-element array; the first element is the child node, and the second
   * element is the parent node.
   *
   * @function
   * @name pv.Layout.cluster.prototype.links
   * @returns {array}
   */
  layout.links = function() {
    return data.call(this)
        .filter(function(n) { return n.parentNode; })
        .map(function(n) { return [n, n.parentNode]; });
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
  function scale(d, ds) {
    return (d + ds) / (1 + ds);
  }

  /**
   * The node prototype. This prototype is intended to be used with a Dot mark
   * in conjunction with the link prototype.
   *
   * @type pv.Mark
   * @name pv.Layout.cluster.prototype.node
   */
  layout.node = new pv.Mark()
      .data(data)
      .strokeStyle("#1f77b4")
      .fillStyle("white")
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
   * @name pv.Layout.cluster.prototype.link
   */
  layout.link = new pv.Mark()
      .extend(layout.node)
      .data(pv.identity)
      .antialias(function() { return orient == "radial"; })
      .interpolate(function() {
          switch (orient) {
            case "top":
            case "bottom": return "step-before";
            case "left":
            case "right": return "step-after";
          }
        })
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
   * @name pv.Layout.cluster.prototype.label
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
   * The fill prototype, used for a space-filling dendrogram. In Cartesian
   * coordinates (i.e., if the orientation is not "radial"), a Bar mark is
   * typically used to fill the space; in polar coordinates ("radial"
   * orientation), a Wedge mark is used instead.
   *
   * @type pv.Mark
   * @name pv.Layout.cluster.prototype.bar
   */
  layout.fill = new pv.Mark()
      .data(data)
      .strokeStyle("#fff")
      .fillStyle("#ccc")
      .left(function(n) {
          switch (orient) {
            case "left": return scale(n.minDepth, ds) * w;
            case "right": return (1 - scale(n.maxDepth, ds)) * w;
            case "top": return n.minBreadth * w;
            case "bottom": return (1 - n.maxBreadth) * w;
            case "radial": return w / 2;
          }
        })
      .top(function(n) {
          switch (orient) {
            case "left": return n.minBreadth * h;
            case "right": return (1 - n.maxBreadth) * h;
            case "top": return scale(n.minDepth, ds) * h;
            case "bottom": return (1 - scale(n.maxDepth, ds)) * h;
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
      .innerRadius(function(n) { return Math.max(0, scale(n.minDepth, ds / 2)) * r; })
      .outerRadius(function(n) { return scale(n.maxDepth, ds / 2) * r; })
      .startAngle(function(n) { return (n.minBreadth - .25) * 2 * Math.PI; })
      .endAngle(function(n) { return (n.maxBreadth - .25) * 2 * Math.PI; });

  return layout;
};
