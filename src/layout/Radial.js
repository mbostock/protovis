pv.Layout.radial = function(map) {
  var nodes, sort, sizeof = function(n) { return 1; };

  /** @private */
  function size(n) {
    return n.size = n.firstChild
        ? pv.sum(n.childNodes, size)
        : sizeof(n.nodeValue);
  }

  /** @private */
  function depth(n) {
    return n.firstChild ? (1 + pv.max(n.childNodes, depth)) : 0;
  }

  /** @private */
  function divide(n) {
    var startAngle = n.startAngle;
    for (var c = n.firstChild; c; c = c.nextSibling) {
      var angle = (c.size / n.size) * n.angle;
      c.startAngle = startAngle;
      c.angle = angle;
      c.midAngle = startAngle + angle / 2;
      startAngle += angle;
      divide(c);
    }
  }

  /** @private */
  function data() {
    if (nodes) return nodes;
    nodes = pv.dom(map).nodes();

    var root = nodes[0];
    root.startAngle = -Math.PI / 2;
    root.midAngle = 0;
    root.angle = 2 * Math.PI;
    size(root);
    if (sort) root.sort(sort);
    divide(root);

    /* Compute the radius and position. */
    var w = this.parent.width() / 2,
        h = this.parent.height() / 2,
        r = Math.min(w, h) / (depth(root) + .5);
    root.visitAfter(function(n, i) {
        n.x = w + r * i * Math.cos(n.midAngle);
        n.y = h + r * i * Math.sin(n.midAngle);
        n.innerRadius = Math.max(0, i - .5) * r;
        n.outerRadius = (i + .5) * r;
      });

    return nodes;
  }

  var layout = {};

  layout.nodes = data;

  layout.links = function() {
    return data.call(this)
        .filter(function(n) { return n.parentNode; })
        .map(function(n) { return [n, n.parentNode]; });
  };

  layout.sort = function(f) {
    sort = f;
    return this;
  };

  /**
   * Specifies the sizing function. By default, the sizing function is
   * <tt>Number</tt>. The sizing function is invoked for leaf nodes. The
   * aggregate sizes of internal nodes will be automatically computed by the
   * layout.
   *
   * <p>For example, if the tree data structure represents a file system, with
   * files as leaf nodes, and each file has a <tt>bytes</tt> attribute, you can
   * specify a size function as:
   *
   * <pre>.size(function(d) d.bytes)</pre>
   *
   * This function will return <tt>undefined</tt> for internal nodes (since
   * these do not have a <tt>bytes</tt> attribute), and a number for leaf nodes.
   *
   * <p>Note that the built-in <tt>Math.sqrt</tt> and <tt>Math.log</tt> methods
   * can be used as sizing functions. These function similarly to
   * <tt>Number</tt>, except perform a root and log scale, respectively.
   *
   * @param {function} f the new sizing function.
   * @function
   * @name pv.Layout.sunburst.prototype.size
   * @returns {pv.Layout.sunburst} this.
   */
  layout.size = function(f) {
    sizeof = f;
    return this;
  };

  layout.node = new pv.Mark()
      .data(data)
      .strokeStyle("#1f77b4")
      .fillStyle("white")
      .left(function(n) { return n.x; })
      .top(function(n) { return n.y; });

  layout.link = new pv.Mark().extend(layout.node)
      .data(pv.identity)
      .fillStyle(null)
      .strokeStyle("#ccc");

  layout.wedge = new pv.Mark()
      .data(data)
      .strokeStyle("white")
      .fillStyle("#ccc")
      .left(function(n) { return this.parent.width() / 2; })
      .top(function(n) { return this.parent.height() / 2; })
      .startAngle(function(n) { return n.startAngle; })
      .angle(function(n) { return n.angle; })
      .innerRadius(function(n) { return n.innerRadius; })
      .outerRadius(function(n) { return n.outerRadius; });

  layout.label = new pv.Mark().extend(layout.node)
      .textAngle(function(n) {
          var a = n.midAngle;
          return pv.Wedge.upright(a) ? a : (a + Math.PI);
        })
      .textMargin(7)
      .textBaseline("middle")
      .textAlign(function(n) {
          return pv.Wedge.upright(n.midAngle) ? "left" : "right";
        })
      .text(function(n) { return n.parentNode ? n.nodeName : "root"; });

  return layout;
};
