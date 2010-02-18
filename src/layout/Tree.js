/** @see http://citeseer.ist.psu.edu/buchheim02improving.html */
pv.Layout.tree = function(map) {
  var nodes, // cached pv.dom(map).nodes()
      sort, // optional sort function
      orient = "top", // default orientation
      offset = {depth:60, breadth:15}, // default offsets
      g = 1, // default amount to group siblings
      w, // cached parent panel width
      h; // cached parent panel height

  // TODO support expanded / non-expanded nodes

  /** @private */
  function firstWalk(v) {
    var l, r, a;
    if (!v.firstChild) {
      if (l = v.previousSibling) {
        v.prelim = l.prelim + distance(v.depth, true);
      }
    } else {
      l = v.firstChild;
      r = v.lastChild;
      a = l; // default ancestor
      for (var c = l; c; c = c.nextSibling) {
        firstWalk(c);
        a = apportion(c, a);
      }
      executeShifts(v);
      var midpoint = .5 * (l.prelim + r.prelim);
      if (l = v.previousSibling) {
        v.prelim = l.prelim + distance(v.depth, true);
        v.mod = v.prelim - midpoint;
      } else {
        v.prelim = midpoint;
      }
    }
  }

  /** @private */
  function secondWalk(v, m, depth) {
    v.breadth = v.prelim + m;
    m += v.mod;
    for (var c = v.firstChild; c; c = c.nextSibling) {
      secondWalk(c, m, depth);
    }
  }

  /** @private */
  function apportion(v, a) {
    var w = v.previousSibling;
    if (w) {
      var vip = v,
          vop = v,
          vim = w,
          vom = v.parentNode.firstChild,
          sip = vip.mod,
          sop = vop.mod,
          sim = vim.mod,
          som = vom.mod,
          nr = nextRight(vim),
          nl = nextLeft(vip);
      while (nr && nl) {
        vim = nr;
        vip = nl;
        vom = nextLeft(vom);
        vop = nextRight(vop);
        vop.ancestor = v;
        var shift = (vim.prelim + sim) - (vip.prelim + sip) + distance(vim.depth, false);
        if (shift > 0) {
          moveSubtree(ancestor(vim, v, a), v, shift);
          sip += shift;
          sop += shift;
        }
        sim += vim.mod;
        sip += vip.mod;
        som += vom.mod;
        sop += vop.mod;
        nr = nextRight(vim);
        nl = nextLeft(vip);
      }
      if (nr && !nextRight(vop)) {
        vop.thread = nr;
        vop.mod += sim - sop;
      }
      if (nl && !nextLeft(vom)) {
        vom.thread = nl;
        vom.mod += sip - som;
        a = v;
      }
    }
    return a;
  }

  /** @private */
  function nextLeft(v) {
    return v.firstChild || v.thread;
  }

  /** @private */
  function nextRight(v) {
    return v.lastChild || v.thread;
  }

  /** @private */
  function moveSubtree(wm, wp, shift) {
    var subtrees = wp.number - wm.number;
    wp.change -= shift / subtrees;
    wp.shift += shift;
    wm.change += shift / subtrees;
    wp.prelim += shift;
    wp.mod += shift;
  }

  /** @private */
  function executeShifts(v) {
    var shift = 0, change = 0;
    for (var c = v.lastChild; c; c = c.previousSibling) {
      c.prelim += shift;
      c.mod += shift;
      change += c.change;
      shift += c.shift + change;
    }
  }

  /** @private */
  function ancestor(vim, v, a) {
    return (vim.ancestor.parentNode == v.parentNode) ? vim.ancestor : a;
  }

  /** @private */
  function distance(depth, siblings) {
    return (siblings ? 1 : (g + 1)) / ((orient == "radial") ? depth : 1);
  }

  /** @private */
  function data() {
    /* Cache the parent panel dimensions to avoid repeated lookup. */
    w = this.parent.width();
    h = this.parent.height();

    /* If the layout was previously computed, use that. */
    if (nodes) return nodes;
    nodes = pv.dom(map).nodes();

    /* Sort the tree and initialize temporary layout variables. */
    var root = nodes[0];
    if (sort) root.sort(sort);
    root.visitAfter(function(v, i) {
        v.ancestor = v;
        v.prelim = 0;
        v.mod = 0;
        v.change = 0;
        v.shift = 0;
        v.number = v.previousSibling ? (v.previousSibling.number + 1) : 0;
        v.depth = i;
      });

    /* Compute the layout using Buchheim et al.'s algorithm. */
    firstWalk(root);
    secondWalk(root, -root.prelim, 0);

    /* Clear temporary layout variables; scale depth and breadth. */
    root.visitAfter(function(v) {
        v.breadth *= offset.breadth;
        v.depth *= offset.depth;
        delete v.ancestor;
        delete v.prelim;
        delete v.mod;
        delete v.change;
        delete v.shift;
        delete v.number;
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
   * @name pv.Layout.tree.prototype.orient
   * @returns {pv.Layout.tree} this, or the current orientation.
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
   * Specifies the amount to offset child nodes from their parents and
   * siblings. If only a single argument is specified, this value is used to
   * offset both depth (parent) and breadth (siblings).
   *
   * @param {number} depth the depth offset.
   * @param {number} [breadth] the breadth offset.
   * @function
   * @name pv.Layout.tree.prototype.offset
   * @returns {pv.Layout.tree} this, or the current offsets.
   */
  layout.offset = function(depth, breadth) {
    if (arguments.length) {
      if (arguments.length == 1) breadth = depth;
      offset = {breadth: breadth, depth: depth};
      return this;
    }
    return offset;
  };

  /**
   * Sets or gets whether siblings are grouped, i.e., whether differentiating
   * space is placed between sibling groups. The default is 1 (or true), causing
   * sibling leaves to be separated by one breadth offset. Setting this to false
   * (or 0) causes non-siblings to be adjacent.
   *
   * @param {number} x the new group spacing.
   * @function
   * @name pv.Layout.tree.prototype.groupSiblings
   * @returns {pv.Layout.tree} this, or the current group spacing.
   */
  layout.groupSiblings = function(x) {
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
   * @name pv.Layout.tree.prototype.nodes
   * @returns {array}
   */
  layout.nodes = data;

  /**
   * Returns the links associated with this layout. Each link is represented as
   * a two-element array; the first element is the child node, and the second
   * element is the parent node.
   *
   * @function
   * @name pv.Layout.tree.prototype.links
   * @returns {array}
   */
  layout.links = function() {
    return data.call(this)
        .filter(function(n) { return n.parentNode; })
        .map(function(n) { return [n, n.parentNode]; });
  };

  /** @private Returns the angle of the given node. */
  function angle(n) {
    return n.breadth / offset.depth;
  }

  /**
   * The node prototype. This prototype is intended to be used with a Dot mark
   * in conjunction with the link prototype.
   *
   * @type pv.Mark
   * @name pv.Layout.tree.prototype.node
   */
  layout.node = new pv.Mark()
      .data(data)
      .strokeStyle("#1f77b4")
      .fillStyle("#fff")
      .left(function(n) {
          switch (orient) {
            case "left": return n.depth;
            case "right": return w - n.depth;
            case "top":
            case "bottom": return n.breadth + w / 2;
            case "radial": return w / 2 + n.depth * Math.cos(angle(n));
          }
        })
      .top(function(n) {
          switch (orient) {
            case "left":
            case "right": return n.breadth + h / 2;
            case "top": return n.depth;
            case "bottom": return h - n.depth;
            case "radial": return h / 2 + n.depth * Math.sin(angle(n));
          }
        });

  /**
   * The link prototype, which renders edges between child nodes and their
   * parents. This prototype is intended to be used with a Line mark in
   * conjunction with the node prototype.
   *
   * @type pv.Mark
   * @name pv.Layout.tree.prototype.link
   */
  layout.link = new pv.Mark().extend(layout.node)
      .data(pv.identity)
      .fillStyle(null)
      .strokeStyle("#ccc");

  /**
   * The node label prototype, which renders the node name adjacent to the node.
   * This prototype is provided as an alternative to using the anchor on the
   * node mark; it is primarily intended to be used with radial layouts, since
   * it provides a convenient mechanism to set the text angle.
   *
   * @type pv.Mark
   * @name pv.Layout.tree.prototype.label
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

  return layout;
};
