/** @see http://citeseer.ist.psu.edu/buchheim02improving.html */
pv.Layout.Tree = function() {
  pv.Layout.Hierarchy.call(this);
};

pv.Layout.Tree.prototype = pv.extend(pv.Layout.Hierarchy)
    .property("group", Number)
    .property("breadth", Number)
    .property("depth", Number)
    .property("orient", String);

pv.Layout.Tree.prototype.defaults = new pv.Layout.Tree()
    .extend(pv.Layout.Hierarchy.prototype.defaults)
    .group(1)
    .breadth(15)
    .depth(60)
    .orient("top");

pv.Layout.Tree.prototype.init = function() {
  if (pv.Layout.Hierarchy.prototype.init.call(this)) return;
  var nodes = this.nodes(),
      orient = this.orient(),
      depth = this.depth(),
      breadth = this.breadth(),
      group = this.group(),
      w = this.parent.width(),
      h = this.parent.height();

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
    return (siblings ? 1 : (group + 1)) / ((orient == "radial") ? depth : 1);
  }

  /* Initialize temporary layout variables. TODO: store separately. */
  var root = nodes[0];
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

  /** @private Returns the angle of the given node. */
  function angle(n) {
    return (orient == "radial")
        ? n.breadth / depth
        : (n.firstChild ? Math.PI : 0);
  }

  /** @private */
  function x(n) {
    switch (orient) {
      case "left": return n.depth;
      case "right": return w - n.depth;
      case "top":
      case "bottom": return n.breadth + w / 2;
      case "radial": return w / 2 + n.depth * Math.cos(angle(n));
    }
  }

  /** @private */
  function y(n) {
    switch (orient) {
      case "left":
      case "right": return n.breadth + h / 2;
      case "top": return n.depth;
      case "bottom": return h - n.depth;
      case "radial": return h / 2 + n.depth * Math.sin(angle(n));
    }
  }

  /* Clear temporary layout variables; transform depth and breadth. */
  root.visitAfter(function(v) {
      v.breadth *= breadth;
      v.depth *= depth;
      v.angle = angle(v);
      v.x = x(v);
      v.y = y(v);
      delete v.breadth;
      delete v.depth;
      delete v.ancestor;
      delete v.prelim;
      delete v.mod;
      delete v.change;
      delete v.shift;
      delete v.number;
      delete v.thread;
    });
};

/**
 * The orientation. The default orientation is "left", which means that the root
 * node is placed on the left edge, leaf nodes appear on the right edge, and
 * internal nodes are in-between. The following orientations are supported:<ul>
 *
 * <li>left - left-to-right.
 * <li>right - right-to-left.
 * <li>top - top-to-bottom.
 * <li>bottom - bottom-to-top.
 * <li>radial - radially, with the root at the center.</ul>
 *
 * @param {string} v the new orientation.
 * @function
 * @name pv.Layout.Tree.prototype.orient
 * @returns {pv.Layout.Tree} this, or the current orientation.
 */

/**
 * The sibling grouping, i.e., whether differentiating space is placed between
 * sibling groups. The default is 1 (or true), causing sibling leaves to be
 * separated by one breadth offset. Setting this to false (or 0) causes
 * non-siblings to be adjacent.
 *
 * @param {number} x the new group spacing.
 * @function
 * @name pv.Layout.Tree.prototype.group
 * @returns {pv.Layout.Tree} this, or the current group spacing.
 */
