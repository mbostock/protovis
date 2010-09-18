/**
 * Constructs a new, empty circle-packing layout. Layouts are not typically
 * constructed directly; instead, they are added to an existing panel via
 * {@link pv.Mark#add}.
 *
 * @class Implements a hierarchical layout using circle-packing. The meaning of
 * the exported mark prototypes changes slightly in the space-filling
 * implementation:<ul>
 *
 * <li><tt>node</tt> - for rendering nodes; typically a {@link pv.Dot}.
 *
 * <p><li><tt>link</tt> - unsupported; undefined. Links are encoded implicitly
 * in the arrangement of the space-filling nodes.
 *
 * <p><li><tt>label</tt> - for rendering node labels; typically a
 * {@link pv.Label}.
 *
 * </ul>The pack layout support dynamic sizing for leaf nodes, if a
 * {@link #size} psuedo-property is specified. The default size function returns
 * 1, causing all leaf nodes to be sized equally, and all internal nodes to be
 * sized by the number of leaf nodes they have as descendants.
 *
 * <p>The size function can be used in conjunction with the order property,
 * which allows the nodes to the sorted by the computed size. Note: for sorting
 * based on other data attributes, simply use the default <tt>null</tt> for the
 * order property, and sort the nodes beforehand using the {@link pv.Dom}
 * operator.
 *
 * <p>For more details on how to use this layout, see
 * {@link pv.Layout.Hierarchy}.
 *
 * @extends pv.Layout.Hierarchy
 * @see <a href="http://portal.acm.org/citation.cfm?id=1124772.1124851"
 * >"Visualization of large hierarchical data by circle packing"</a> by W. Wang,
 * H. Wang, G. Dai, and H. Wang, ACM CHI 2006.
 */
pv.Layout.Pack = function() {
  pv.Layout.Hierarchy.call(this);

  this.node
      .radius(function(n) { return n.radius; })
      .strokeStyle("rgb(31, 119, 180)")
      .fillStyle("rgba(31, 119, 180, .25)");

  this.label
      .textAlign("center");

  /* Hide unsupported link. */
  delete this.link;
};

pv.Layout.Pack.prototype = pv.extend(pv.Layout.Hierarchy)
    .property("spacing", Number)
    .property("order", String); // ascending, descending, reverse, null

/**
 * Default properties for circle-packing layouts. The default spacing parameter
 * is 1 and the default order is "ascending".
 *
 * @type pv.Layout.Pack
 */
pv.Layout.Pack.prototype.defaults = new pv.Layout.Pack()
    .extend(pv.Layout.Hierarchy.prototype.defaults)
    .spacing(1)
    .order("ascending");

/**
 * The spacing parameter; defaults to 1, which provides a little bit of padding
 * between sibling nodes and the enclosing circle. Larger values increase the
 * spacing, by making the sibling nodes smaller; a value of zero makes the leaf
 * nodes as large as possible, with no padding on enclosing circles.
 *
 * @type number
 * @name pv.Layout.Pack.prototype.spacing
 */

/**
 * The sibling node order. The default order is <tt>null</tt>, which means to
 * use the sibling order specified by the nodes property as-is. A value of
 * "ascending" will sort siblings in ascending order of size, while "descending"
 * will do the reverse. For sorting based on data attributes other than size,
 * use the default <tt>null</tt> for the order property, and sort the nodes
 * beforehand using the {@link pv.Dom} operator.
 *
 * @see pv.Dom.Node#sort
 * @type string
 * @name pv.Layout.Pack.prototype.order
 */

/** @private The default size function. */
pv.Layout.Pack.prototype.$radius = function() { return 1; };

// TODO is it possible for spacing to operate in pixel space?
// Right now it appears to be multiples of the smallest radius.

/**
 * Specifies the sizing function. By default, a sizing function is disabled and
 * all nodes are given constant size. The sizing function is invoked for each
 * leaf node in the tree (passed to the constructor).
 *
 * <p>For example, if the tree data structure represents a file system, with
 * files as leaf nodes, and each file has a <tt>bytes</tt> attribute, you can
 * specify a size function as:
 *
 * <pre>    .size(function(d) d.bytes)</pre>
 *
 * As with other properties, a size function may specify additional arguments to
 * access the data associated with the layout and any enclosing panels.
 *
 * @param {function} f the new sizing function.
 * @returns {pv.Layout.Pack} this.
 */
pv.Layout.Pack.prototype.size = function(f) {
  this.$radius = typeof f == "function"
      ? function() { return Math.sqrt(f.apply(this, arguments)); }
      : (f = Math.sqrt(f), function() { return f; });
  return this;
};

/** @private */
pv.Layout.Pack.prototype.buildImplied = function(s) {
  if (pv.Layout.Hierarchy.prototype.buildImplied.call(this, s)) return;

  var that = this,
      nodes = s.nodes,
      root = nodes[0];

  /** @private Compute the radii of the leaf nodes. */
  function radii(nodes) {
    var stack = pv.Mark.stack;
    stack.unshift(null);
    for (var i = 0, n = nodes.length; i < n; i++) {
      var c = nodes[i];
      if (!c.firstChild) {
        c.radius = that.$radius.apply(that, (stack[0] = c, stack));
      }
    }
    stack.shift();
  }

  /** @private */
  function packTree(n) {
    var nodes = [];
    for (var c = n.firstChild; c; c = c.nextSibling) {
      if (c.firstChild) c.radius = packTree(c);
      c.n = c.p = c;
      nodes.push(c);
    }

    /* Sort. */
    switch (s.order) {
      case "ascending": {
        nodes.sort(function(a, b) { return a.radius - b.radius; });
        break;
      }
      case "descending": {
        nodes.sort(function(a, b) { return b.radius - a.radius; });
        break;
      }
      case "reverse": nodes.reverse(); break;
    }

    return packCircle(nodes);
  }

  /** @private */
  function packCircle(nodes) {
    var xMin = Infinity,
        xMax = -Infinity,
        yMin = Infinity,
        yMax = -Infinity,
        a, b, c, j, k;

    /** @private */
    function bound(n) {
      xMin = Math.min(n.x - n.radius, xMin);
      xMax = Math.max(n.x + n.radius, xMax);
      yMin = Math.min(n.y - n.radius, yMin);
      yMax = Math.max(n.y + n.radius, yMax);
    }

    /** @private */
    function insert(a, b) {
      var c = a.n;
      a.n = b;
      b.p = a;
      b.n = c;
      c.p = b;
    }

    /** @private */
    function splice(a, b) {
      a.n = b;
      b.p = a;
    }

    /** @private */
    function intersects(a, b) {
      var dx = b.x - a.x,
          dy = b.y - a.y,
          dr = a.radius + b.radius;
      return (dr * dr - dx * dx - dy * dy) > .001; // within epsilon
    }

    /* Create first node. */
    a = nodes[0];
    a.x = -a.radius;
    a.y = 0;
    bound(a);

    /* Create second node. */
    if (nodes.length > 1) {
      b = nodes[1];
      b.x = b.radius;
      b.y = 0;
      bound(b);

      /* Create third node and build chain. */
      if (nodes.length > 2) {
        c = nodes[2];
        place(a, b, c);
        bound(c);
        insert(a, c);
        a.p = c;
        insert(c, b);
        b = a.n;

        /* Now iterate through the rest. */
        for (var i = 3; i < nodes.length; i++) {
          place(a, b, c = nodes[i]);

          /* Search for the closest intersection. */
          var isect = 0, s1 = 1, s2 = 1;
          for (j = b.n; j != b; j = j.n, s1++) {
            if (intersects(j, c)) {
              isect = 1;
              break;
            }
          }
          if (isect == 1) {
            for (k = a.p; k != j.p; k = k.p, s2++) {
              if (intersects(k, c)) {
                if (s2 < s1) {
                  isect = -1;
                  j = k;
                }
                break;
              }
            }
          }

          /* Update node chain. */
          if (isect == 0) {
            insert(a, c);
            b = c;
            bound(c);
          } else if (isect > 0) {
            splice(a, j);
            b = j;
            i--;
          } else if (isect < 0) {
            splice(j, b);
            a = j;
            i--;
          }
        }
      }
    }

    /* Re-center the circles and return the encompassing radius. */
    var cx = (xMin + xMax) / 2,
        cy = (yMin + yMax) / 2,
        cr = 0;
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.x -= cx;
      n.y -= cy;
      cr = Math.max(cr, n.radius + Math.sqrt(n.x * n.x + n.y * n.y));
    }
    return cr + s.spacing;
  }

  /** @private */
  function place(a, b, c) {
    var da = b.radius + c.radius,
        db = a.radius + c.radius,
        dx = b.x - a.x,
        dy = b.y - a.y,
        dc = Math.sqrt(dx * dx + dy * dy),
        cos = (db * db + dc * dc - da * da) / (2 * db * dc),
        theta = Math.acos(cos),
        x = cos * db,
        h = Math.sin(theta) * db;
    dx /= dc;
    dy /= dc;
    c.x = a.x + x * dx + h * dy;
    c.y = a.y + x * dy - h * dx;
  }

  /** @private */
  function transform(n, x, y, k) {
    for (var c = n.firstChild; c; c = c.nextSibling) {
      c.x += n.x;
      c.y += n.y;
      transform(c, x, y, k);
    }
    n.x = x + k * n.x;
    n.y = y + k * n.y;
    n.radius *= k;
  }

  radii(nodes);

  /* Recursively compute the layout. */
  root.x = 0;
  root.y = 0;
  root.radius = packTree(root);

  var w = this.width(),
      h = this.height(),
      k = 1 / Math.max(2 * root.radius / w, 2 * root.radius / h);
  transform(root, w / 2, h / 2, k);
};
