/**
 * Returns a new treemap layout.
 *
 * @class A tree layout in the form of an treemap.
 * <img src="../treemap.png" width="160" height="160" align="right"> Treemaps
 * are a form of space-filling layout that represents nodes as boxes, with child
 * nodes placed within parent boxes. The size of each box is proportional to the
 * size of the node in the tree.
 *
 * <p>This particular algorithm is taken from Bruls, D.M., C. Huizing, and
 * J.J. van Wijk, <a href="http://www.win.tue.nl/~vanwijk/stm.pdf">"Squarified
 * Treemaps"</a> in <i>Data Visualization 2000, Proceedings of the Joint
 * Eurographics and IEEE TCVG Sumposium on Visualization</i>, 2000, pp. 33-42.
 *
 * <p>This tree layout is intended to be used with a {@link pv.Bar} or {@link
 * pv.Panel}. The nodes will be populated with the following attributes:
 *
 * <ul>
 * <li><tt>x</tt> - the cell left position.
 * <li><tt>y</tt> - the cell top position.
 * <li><tt>width</tt> - the cell width.
 * <li><tt>height</tt> - the cell height.
 * <li><tt>depth</tt> - the node depth (tier; the root is 0).
 * </ul>
 *
 * @returns {pv.Layout.Treemap} a treemap layout.
 */
pv.Layout.Treemap = function() {
  pv.Layout.Hierarchy.call(this);

  var node = this.node
      .strokeStyle("#fff")
      .fillStyle("rgba(31, 119, 180, .25)")
      .width(function(n) { return n.dx; })
      .height(function(n) { return n.dy; });

  /** @private Adding to this layout implicitly adds to this node. */
  this.add = function(type) { return this.parent.add(type).extend(node); };

  /* Now hide references to inherited marks. */
  delete this.node;
  delete this.label;
  delete this.link;
};

pv.Layout.Treemap.prototype = pv.extend(pv.Layout.Hierarchy)
    .property("round", Boolean)
    .property("left", Number)
    .property("right", Number)
    .property("top", Number)
    .property("bottom", Number);

pv.Layout.Treemap.prototype.$size = Number;

pv.Layout.Treemap.prototype.size = function(f) {
  this.$size = f;
  return this;
};

pv.Layout.Treemap.prototype.init = function() {
  var that = this,
      nodes = that.nodes(),
      root = nodes[0],
      stack = pv.Mark.stack,
      left = that.left(),
      right = that.right(),
      top = that.top(),
      bottom = that.bottom(),
      round = that.round() ? Math.round : Number;

  /** @private */
  function ratio(row, l) {
    var rmax = -Infinity, rmin = Infinity, s = 0;
    for (var i = 0; i < row.length; i++) {
      var r = row[i].size;
      if (r < rmin) rmin = r;
      if (r > rmax) rmax = r;
      s += r;
    }
    s = s * s;
    l = l * l;
    return Math.max(l * rmax / s, s / (l * rmin));
  }

  /** @private */
  function squarify(n) {
    var row = [],
        mink = Infinity,
        x = n.x + left,
        y = n.y + top,
        w = n.dx - left - right,
        h = n.dy - top - bottom,
        l = Math.min(w, h),
        k = w * h / n.size;

    /* Scale the sizes to fill the current subregion. */
    n.visitBefore(function(n) { n.size *= k; });

    /** @private Position the specified nodes along one dimension. */
    function position(row) {
      var s = pv.sum(row, function(n) { return n.size; }),
          hh = (l == 0) ? 0 : round(s / l);

      for (var i = 0, d = 0; i < row.length; i++) {
        var n = row[i], nw = round(n.size / hh);
        if (w == l) {
          n.x = x + d;
          n.y = y;
          n.dx = nw;
          n.dy = hh;
        } else {
          n.x = x;
          n.y = y + d;
          n.dx = hh;
          n.dy = nw;
        }
        d += nw;
      }

      if (w == l) {
        if (n) n.dx += w - d; // correct rounding error
        y += hh;
        h -= hh;
      } else {
        if (n) n.dy += h - d; // correct rounding error
        x += hh;
        w -= hh;
      }
      l = Math.min(w, h);
    }

    var children = n.childNodes.slice(); // copy
    while (children.length) {
      var child = children[children.length - 1];
      if (!child.size) {
        children.pop();
        continue;
      }
      row.push(child);

      var k = ratio(row, l);
      if (k <= mink) {
        children.pop();
        mink = k;
      } else {
        row.pop();
        position(row);
        row.length = 0;
        mink = Infinity;
      }
    }
    position(row);

    /* correct rounding error */
    if (w == l) for (var i = 0; i < row.length; i++) {
      row[i].dx += w;
    } else for (var i = 0; i < row.length; i++) {
      row[i].dy += h;
    }
  }

  /* Recursively compute the node depth and size. */
  stack.unshift(null);
  root.visitAfter(function(n, i) {
      n.depth = i;
      n.size = n.firstChild
          ? pv.sum(n.childNodes, function(n) { return n.size; })
          : that.$size.apply(that, (stack[0] = n.nodeValue, stack));
    });
  stack.shift();

  /* Sort by ascending size, then recursively compute the layout. */
  root.sort(function(a, b) { return a.size - b.size; });
  root.x = 0;
  root.y = 0;
  root.dx = that.parent.width();
  root.dy = that.parent.height();
  root.visitBefore(squarify);
};
