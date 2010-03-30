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
 * <li><tt>dx</tt> - the cell width.
 * <li><tt>dy</tt> - the cell height.
 * <li><tt>depth</tt> - the node depth (tier; the root is 0).
 * </ul>
 *
 * @returns {pv.Layout.Treemap} a treemap layout.
 */
pv.Layout.Treemap = function() {
  pv.Layout.Hierarchy.call(this);

  this.node
      .strokeStyle("#fff")
      .fillStyle("rgba(31, 119, 180, .25)")
      .width(function(n) { return n.dx; })
      .height(function(n) { return n.dy; });

  this.label
      .visible(function(n) { return !n.firstChild; })
      .left(function(n) { return n.x + (n.dx / 2); })
      .top(function(n) { return n.y + (n.dy / 2); })
      .textAlign("center")
      .textAngle(function(n) { return n.dx > n.dy ? 0 : -Math.PI / 2; });

  (this.leaf = new pv.Mark()
      .extend(this.node)
      .fillStyle(null)
      .strokeStyle(null)
      .visible(function(n) { return !n.firstChild; })).parent = this;

  /* Hide unsupported link. */
  delete this.link;
};

pv.Layout.Treemap.prototype = pv.extend(pv.Layout.Hierarchy)
    .property("round", Boolean)
    .property("paddingLeft", Number)
    .property("paddingRight", Number)
    .property("paddingTop", Number)
    .property("paddingBottom", Number)
    .property("mode", String)
    .property("order", String);

pv.Layout.Treemap.prototype.defaults = new pv.Layout.Treemap()
    .extend(pv.Layout.Hierarchy.prototype.defaults)
    .mode("squarify") // squarify, slice-and-dice, slice, dice
    .order("ascending"); // ascending, descending, reverse, null

/**
 * Alias for setting the left, right, top and bottom padding properties
 * simultaneously.
 *
 * @returns {pv.Layout.Treemap} this.
 */
pv.Layout.Treemap.prototype.padding = function(n) {
  return this.paddingLeft(n).paddingRight(n).paddingTop(n).paddingBottom(n);
};

pv.Layout.Treemap.prototype.$size = Number;

pv.Layout.Treemap.prototype.size = function(f) {
  this.$size = typeof f == "function" ? f : function() { return f; };
  return this;
};

pv.Layout.Treemap.prototype.init = function() {
  if (pv.Layout.Hierarchy.prototype.init.call(this)) return;
  var that = this,
      nodes = that.nodes(),
      root = nodes[0],
      stack = pv.Mark.stack,
      left = that.paddingLeft(),
      right = that.paddingRight(),
      top = that.paddingTop(),
      bottom = that.paddingBottom(),
      size = function(n) { return n.size; },
      round = that.round() ? Math.round : Number,
      mode = that.mode();

  /** @private */
  function slice(row, sum, horizontal, x, y, w, h) {
    for (var i = 0, d = 0; i < row.length; i++) {
      var n = row[i];
      if (horizontal) {
        n.x = x + d;
        n.y = y;
        d += n.dx = round(w * n.size / sum);
        n.dy = h;
      } else {
        n.x = x;
        n.y = y + d;
        n.dx = w;
        d += n.dy = round(h * n.size / sum);
      }
    }
    if (n) { // correct on-axis rounding error
      if (horizontal) {
        n.dx += w - d;
      } else {
        n.dy += h - d;
      }
    }
  }

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
  function layout(n, i) {
    var x = n.x + left,
        y = n.y + top,
        w = n.dx - left - right,
        h = n.dy - top - bottom;

    /* Assume squarify by default. */
    if (mode != "squarify") {
      slice(n.childNodes, n.size,
          mode == "slice" ? true
          : mode == "dice" ? false
          : i & 1, x, y, w, h);
      return;
    }

    var row = [],
        mink = Infinity,
        l = Math.min(w, h),
        k = w * h / n.size;

    /* Abort if the size is nonpositive. */
    if (n.size <= 0) return;

    /* Scale the sizes to fill the current subregion. */
    n.visitBefore(function(n) { n.size *= k; });

    /** @private Position the specified nodes along one dimension. */
    function position(row) {
      var horizontal = w == l,
          sum = pv.sum(row, size),
          r = l ? round(sum / l) : 0;
      slice(row, sum, horizontal, x, y, horizontal ? w : r, horizontal ? r : h);
      if (horizontal) {
        y += r;
        h -= r;
      } else {
        x += r;
        w -= r;
      }
      l = Math.min(w, h);
      return horizontal;
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

    /* correct off-axis rounding error */
    if (position(row)) for (var i = 0; i < row.length; i++) {
      row[i].dy += h;
    } else for (var i = 0; i < row.length; i++) {
      row[i].dx += w;
    }
  }

  /* Recursively compute the node depth and size. */
  stack.unshift(null);
  root.visitAfter(function(n, i) {
      n.depth = i;
      n.x = n.y = n.dx = n.dy = 0;
      n.size = n.firstChild
          ? pv.sum(n.childNodes, function(n) { return n.size; })
          : that.$size.apply(that, (stack[0] = n.nodeValue, stack));
    });
  stack.shift();

  /* Sort. */
  switch (that.order()) {
    case "ascending": {
      root.sort(function(a, b) { return a.size - b.size; });
      break;
    }
    case "descending": {
      root.sort(function(a, b) { return b.size - a.size; });
      break;
    }
    case "reverse": root.reverse(); break;
  }

  /* Recursively compute the layout. */
  root.x = 0;
  root.y = 0;
  root.dx = that.parent.width();
  root.dy = that.parent.height();
  root.visitBefore(layout);
};
