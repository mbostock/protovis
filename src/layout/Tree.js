/**
 * Constructs a new, empty tree layout. Layouts are not typically constructed
 * directly; instead, they are added to an existing panel via
 * {@link pv.Mark#add}.
 *
 * @class Implements a node-link tree diagram using the Reingold-Tilford "tidy"
 * tree layout algorithm. The specific algorithm used by this layout is based on
 * <a href="http://citeseer.ist.psu.edu/buchheim02improving.html">"Improving
 * Walker's Algorithm to Run in Linear Time"</A> by C. Buchheim, M. J&uuml;nger
 * &amp; S. Leipert, Graph Drawing 2002. This layout supports both cartesian and
 * radial orientations orientations for node-link diagrams.
 *
 * <p>The tree layout supports a "group" property, which if true causes siblings
 * to be positioned closer together than unrelated nodes at the same depth. The
 * layout can be configured using the <tt>depth</tt> and <tt>breadth</tt>
 * properties, which control the increments in pixel space between nodes in both
 * dimensions, similar to the indent layout.
 *
 * <p>For more details on how to use this layout, see
 * {@link pv.Layout.Hierarchy}.
 *
 * @extends pv.Layout.Hierarchy
 */
pv.Layout.Tree = function() {
  pv.Layout.Hierarchy.call(this);
};

pv.Layout.Tree.prototype = pv.extend(pv.Layout.Hierarchy)
    .property("group", Number)
    .property("breadth", Number)
    .property("depth", Number)
    .property("orient", String);

/**
 * Default properties for tree layouts. The default orientation is "top", the
 * default group parameter is 1, and the default breadth and depth offsets are
 * 15 and 60 respectively.
 *
 * @type pv.Layout.Tree
 */
pv.Layout.Tree.prototype.defaults = new pv.Layout.Tree()
    .extend(pv.Layout.Hierarchy.prototype.defaults)
    .group(1)
    .breadth(15)
    .depth(60)
    .orient("top");

/** @private */
pv.Layout.Tree.prototype.buildImplied = function(s) {
  if (pv.Layout.Hierarchy.prototype.buildImplied.call(this, s)) return;

  var nodes = s.nodes,
      orient = s.orient,
      depth = s.depth,
      breadth = s.breadth,
      group = s.group,
      w = s.width,
      h = s.height;

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
  function midAngle(n) {
    return (orient == "radial") ? n.breadth / depth : 0;
  }

  /** @private */
  function x(n) {
    switch (orient) {
      case "left": return n.depth;
      case "right": return w - n.depth;
      case "top":
      case "bottom": return n.breadth + w / 2;
      case "radial": return w / 2 + n.depth * Math.cos(midAngle(n));
    }
  }

  /** @private */
  function y(n) {
    switch (orient) {
      case "left":
      case "right": return n.breadth + h / 2;
      case "top": return n.depth;
      case "bottom": return h - n.depth;
      case "radial": return h / 2 + n.depth * Math.sin(midAngle(n));
    }
  }

  /* Clear temporary layout variables; transform depth and breadth. */
  root.visitAfter(function(v) {
      v.breadth *= breadth;
      v.depth *= depth;
      v.midAngle = midAngle(v);
      v.x = x(v);
      v.y = y(v);
      if (v.firstChild) v.midAngle += Math.PI;
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
 * The offset between siblings nodes; defaults to 15.
 *
 * @type number
 * @name pv.Layout.Tree.prototype.breadth
 */

/**
 * The offset between parent and child nodes; defaults to 60.
 *
 * @type number
 * @name pv.Layout.Tree.prototype.depth
 */

/**
 * The orientation. The default orientation is "top", which means that the root
 * node is placed on the top edge, leaf nodes appear at the bottom, and internal
 * nodes are in-between. The following orientations are supported:<ul>
 *
 * <li>left - left-to-right.
 * <li>right - right-to-left.
 * <li>top - top-to-bottom.
 * <li>bottom - bottom-to-top.
 * <li>radial - radially, with the root at the center.</ul>
 *
 * @type string
 * @name pv.Layout.Tree.prototype.orient
 */

/**
 * The sibling grouping, i.e., whether differentiating space is placed between
 * sibling groups. The default is 1 (or true), causing sibling leaves to be
 * separated by one breadth offset. Setting this to false (or 0) causes
 * non-siblings to be adjacent.
 *
 * @type number
 * @name pv.Layout.Tree.prototype.group
 */
