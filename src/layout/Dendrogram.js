pv.Layout.dendrogram = function(map) {
  var nodes, sort, orient = "top", w, h, r;

  /** @private Compute the maximum depth of descendants for each node. */
  function depth(n) {
    var d = 0;
    for (var c = n.firstChild; c; c = c.nextSibling) {
      d = Math.max(d, 1 + depth(c));
    }
    return n.depth = d;
  }

  /** @private */
  function data() {
    if (nodes) return nodes;
    nodes = pv.dom(map).nodes();

    /* Sort the tree and compute the initial depth of each node. */
    var root = nodes[0];
    if (sort) root.sort(sort);
    depth(root);

    /* Count the number of leaf nodes. */
    var leafCount = 0;
    root.visitAfter(function(n) { if (!n.firstChild) leafCount++; });

    /* Compute the unit breadth and depth of each node. */
    var leafIndex = 0, step = 1 / leafCount;
    root.visitAfter(function(n) {
        var d = (n.depth + .5) / (root.depth + 1);
        if (n.firstChild) {
          var b = 0;
          for (var c = n.firstChild; c; c = c.nextSibling) b += c.breadth;
          b /= n.childNodes.length;
        } else {
          b = step * (.5 + leafIndex++);
        }
        n.breadth = b;
        n.depth = 1 - d;
      });

    /* Compute breadth and depth ranges, used for space-filling layouts. */
    root.visitAfter(function(n) {
        n.minBreadth = n.firstChild ? n.firstChild.minBreadth : (n.breadth - step / 2);
        n.maxBreadth = n.firstChild ? n.lastChild.maxBreadth : (n.breadth + step / 2);
      });
    root.visitBefore(function(n) {
        n.minDepth = n.parentNode ? n.parentNode.maxDepth : 0;
        n.maxDepth = n.parentNode ? (n.depth + root.depth) : (n.minDepth + 2 * root.depth);
      });

    /* Scale the breadth and depth to the parent panel size. */
    w = this.parent.width();
    h = this.parent.height();
    r = Math.min(w, h) / 2;
    root.visitAfter(function(n) {
        switch (orient) {
          case "left": {
            n.x = n.depth * w;
            n.y = n.breadth * h;
            n.left = n.minDepth * w;
            n.top = n.minBreadth * h;
            n.width = (n.maxDepth - n.minDepth) * w;
            n.height = (n.maxBreadth - n.minBreadth) * h;
            break;
          }
          case "right": {
            n.x = w - n.depth * w;
            n.y = n.breadth * h;
            n.left = (1 - n.maxDepth) * w;
            n.top = n.minBreadth * h;
            n.width = (n.maxDepth - n.minDepth) * w;
            n.height = (n.maxBreadth - n.minBreadth) * h;
            break;
          }
          case "top": {
            n.x = n.breadth * w;
            n.y = n.depth * h;
            n.left = n.minBreadth * w;
            n.top = n.minDepth * h;
            n.width = (n.maxBreadth - n.minBreadth) * w;
            n.height = (n.maxDepth - n.minDepth) * h;
            break;
          }
          case "bottom": {
            n.x = n.breadth * w;
            n.y = h - n.depth * h;
            n.left = n.minBreadth * w;
            n.top = (1 - n.maxDepth) * h;
            n.width = (n.maxBreadth - n.minBreadth) * w;
            n.height = (n.maxDepth - n.minDepth) * h;
            break;
          }
          case "radial": {
            var nr = n.parentNode ? (n.depth * r) : 0,
                na = (n.breadth - .25) * 2 * Math.PI;
            n.x = w / 2 + nr * Math.cos(na);
            n.y = h / 2 + nr * Math.sin(na);
            break;
          }
        }
      });

    return nodes;
  }

  var layout = {};

  layout.orient = function(v) {
    if (arguments.length) {
      orient = v;
      return this;
    }
    return orient;
  };

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
   * @name pv.Layout.dendrogram.prototype.nodes
   * @returns {array}
   */
  layout.nodes = data;

  /**
   * Returns the links associated with this layout. Each link is represented as
   * a two-element array; the first element is the child node, and the second
   * element is the parent node.
   *
   * @function
   * @name pv.Layout.dendrogram.prototype.links
   * @returns {array}
   */
  layout.links = function() {
    return data.call(this)
        .filter(function(n) { return n.parentNode; })
        .map(function(n) { return [n, n.parentNode]; });
  };

  layout.node = new pv.Mark()
      .data(data)
      .strokeStyle("#1f77b4")
      .fillStyle("white")
      .left(function(n) { return n.x; })
      .top(function(n) { return n.y; });

  layout.link = new pv.Mark().extend(layout.node)
      .data(pv.identity)
      .antialias(function() { return orient == "radial"; })
      .interpolate(function() {
          switch (orient) {
            case "top": case "bottom": return "step-before";
            case "left": case "right": return "step-after";
          }
        })
      .strokeStyle("#ccc")
      .fillStyle(null);

  layout.label = new pv.Mark().extend(layout.node)
      .textMargin(7)
      .textBaseline("middle")
      .text(function(n) { return n.parentNode ? n.nodeName : "root"; })
      .textAngle(function(n) {
          if (orient != "radial") return 0;
          var a = (n.breadth - .25) * 2 * Math.PI;
          return pv.Wedge.upright(a) ? a : (a + Math.PI);
        })
      .textAlign(function(n) {
          if (orient != "radial") return n.firstChild ? "right" : "left";
          var a = (n.breadth - .25) * 2 * Math.PI;
          return pv.Wedge.upright(a) ? "left" : "right";
        });

  /**
   * The fill prototype, used for a space-filling dendrogram. In Cartesian
   * coordinates (i.e., if the orientation is not "radial"), a Bar mark is
   * typically used to fill the space; in polar coordinates ("radial"
   * orientation), a Wedge mark is used.
   *
   * @type pv.Mark
   * @name pv.Layout.dendrogram.prototype.bar
   */
  layout.fill = new pv.Mark()
      .data(data)
      .strokeStyle("#fff")
      .fillStyle("#ccc")
      .left(function(n) { return (orient == "radial") ? (w / 2) : n.left; })
      .top(function(n) { return (orient == "radial") ? (h / 2) : n.top; })
      .width(function(n) { return n.width; })
      .height(function(n) { return n.height; })
      .innerRadius(function(n) { return n.minDepth * r; })
      .outerRadius(function(n) { return n.maxDepth * r; })
      .startAngle(function(n) { return (n.minBreadth - .25) * 2 * Math.PI; })
      .endAngle(function(n) { return (n.maxBreadth - .25) * 2 * Math.PI; });

  return layout;
};
