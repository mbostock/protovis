pv.Layout.tree = function(map) {
  var nodes,
      orient = "top",
      size = 10,
      dspace = 50,
      bspace = 5,
      tspace = 25,
      ax,
      ay;

  // TODO support expanded / non-expanded nodes

  /*
   * Private attributes:
   * n.ancestor
   * n.thread
   * n.number - like "n.childIndex"
   * n.prelim
   * n.shift
   * n.change
   * n.mod
   *
   * Public attributes (from pv.Tree):
   * n.top
   * n.left
   *
   * Public attributes (from pv.Dom):
   * n.nodeName - the key
   * n.nodeValue - the data value (for leaf nodes)
   * n.childNodes - undefined for leaf nodes (XXX TODO)
   * n.firstChild
   * n.lastChild
   * n.previousSibling
   * n.nextSibling
   * n.parentNode
   *
   * We currently store these directly on the node, since we know they don't
   * conflict with the DOM attributes. And we don't bother clearing them after
   * the layout algorithm finishes.
   */

  /** @private */
  function firstWalk(n, num) {
    if (!("number" in n)) {
      n.ancestor = n;
      n.prelim = 0
      n.mod = 0;
      n.change = 0;
      n.shift = 0;
    }
    n.number = num;
    if (!n.childNodes) {
      var l = n.previousSibling;
      n.prelim = l ? (l.prelim + spacing(l, n, true)) : 0;
    } else {
      var midpoint,
          l = n.firstChild,
          r = n.lastChild,
          ancestor = l;

      for (var i = 0, c = l; c; i++, c = c.nextSibling) {
        firstWalk(c, i);
        ancestor = apportion(c, ancestor);
      }

      executeShifts(n);
      midpoint = .5 * (l.prelim + r.prelim);

      l = n.previousSibling;
      if (l) {
        n.prelim = l.prelim + spacing(l, n, true);
        n.mod = n.prelim - midpoint;
      } else {
        n.prelim = midpoint;
      }
    }
  }

  /** @private */
  function secondWalk(n, p, m, depth) {
    // console.log(n.prelim + " + " + m);
    setBreadth(n, p, n.prelim + m);
    setDepth(n, p, depth * dspace);
    var b = n.mod + m;
    depth++;
    for (var c = n.firstChild; c; c = c.nextSibling) {
      secondWalk(c, n, b, depth);
    }
  }

  /** @private */
  function setBreadth(n, p, b) {
    switch (orient) {
      case "left":
      case "right": {
        n.top = ay + b;
        break;
      }
      case "top":
      case "bottom": {
        n.left = ax + b;
        break;
      }
    }
  }

  /** @private */
  function setDepth(n, p, d) {
    switch (orient) {
      case "left": n.left = ax + d; break;
      case "right": n.left = ax - d; break;
      case "top": n.top = ay + d; break;
      case "bottom": n.top = ay - d; break;
    }
  }

  /** @private */
  function apportion(v, a) {
    var w = v.previousSibling;
    if (w) {
      var vip = v,
          vim = w,
          vop = v,
          vom = v.parentNode.firstChild,
          sip = vip.mod,
          sim = vim.mod,
          sop = vop.mod,
          som = vom.mod,
          nr = nextRight(vim),
          nl = nextLeft(vip);

      while (nr && nl) {
        vim = nr;
        vip = nl;
        vom = nextLeft(vom);
        vop = nextRight(vop);
        vop.ancestor = v;

        var shift = (vim.prelim + sim) - (vip.prelim + sip) + spacing(vim, vip, false);
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
  function nextLeft(n) {
    return n.firstChild || n.thread;
  }

  /** @private */
  function nextRight(n) {
    return n.lastChild || n.thread;
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
  function executeShifts(n) {
    var shift = 0, change = 0;
    for (var c = n.lastChild; c; c = c.previousSibling) {
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
  function spacing(l, r, siblings) {
    return (siblings ? bspace : tspace) + size;
  }

  /** @private */
  function data() {
    if (nodes) return nodes;
    nodes = pv.dom(map).nodes();
    switch (orient) {
      case "left": {
        ax = dspace + size;
        ay = this.parent.height() / 2;
        break;
      }
      case "right": {
        ax = this.parent.width() - (dspace + size);
        ay = this.parent.height() / 2;
        break;
      }
      case "top": {
        ax = this.parent.width() / 2;
        ay = dspace + size;
        break;
      }
      case "bottom": {
        ax = this.parent.width() / 2;
        ay = this.parent.height() - (dspace + size);
        break;
      }
    }
    var root = nodes[0];
    firstWalk(root, 0, 1);
    secondWalk(root, null, -root.prelim, 0, true);
    return nodes;
  }

  var layout = {};

  layout.nodes = data;

  layout.orient = function(v) {
    orient = v;
    return this;
  };

  layout.spacing = function(depth, breadth, subtree) {
    dspace = depth;
    bspace = breadth;
    tspace = subtree;
    return this;
  };

  /* A dummy mark, like an anchor, which the caller extends. */
  layout.node = new pv.Mark()
      .data(data)
      .strokeStyle("#1f77b4")
      .fillStyle("white")
      .left(function(n) { return n.left; })
      .top(function(n) { return n.top; });

  /* A dummy mark, like an anchor, which the caller extends. */
  layout.link = new pv.Mark().extend(layout.node)
      .data(function(n) { return n.parentNode ? [n, n.parentNode] : []; })
      .fillStyle(null)
      .strokeStyle("#ccc");

  return layout;
};
