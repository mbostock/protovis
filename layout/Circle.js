pv.Layout.circle = function(map) {
  var nodes;

  /** @private */
  function depth(n) {
    return n.childNodes ? (1 + pv.max(n.childNodes, depth)) : 0;
  }

  /** @private */
  function visit(n, f, i) {
    for (var c = n.firstChild; c; c = c.nextSibling) visit(c, f, i + 1);
    f(n, i);
  }

  /** @private */
  function setTreeAngles(root) {
    var p, leaves = 0, parents = 0;

    /* Count the number of leaves and internal nodes. */
    visit(root, function(n) {
        if (!n.childNodes) {
          if (p != n.parentNode) {
            p = n.parentNode;
            parents++;
          }
          leaves++;
        }
      });

    var inc = -2 * Math.PI / (leaves + parents),
        angle = Math.PI / 2;

    /* Set the angles. */
    p = undefined;
    visit(root, function(n) {
        var a = 0, b;
        if (!n.childNodes) {
          if (p != n.parentNode) {
            p = n.parentNode;
            angle += inc;
          }
          a = angle;
          angle += inc;
        } else if (n.parentNode) {
          a = n.firstChild.midAngle;
          b = n.lastChild.midAngle - a;
          while (b > Math.PI) b -= 2 * Math.PI;
          while (b < -Math.PI) b += 2 * Math.PI;
          a += b / 2;
        }
        n.midAngle = minAngle(n.midAngle, a);
      });
  }

  /** @private */
  function setTreeRadii(root) {
    var d = depth(root);
    visit(root, function(n, i) {
        n.radius = n.childNodes ? (i / d) : 1;
      }, 0);
  }

  /** @private */
  function minAngle(a, b) {
    var k = ((a > b) ? 2 : -2) * Math.PI;
    for (; Math.abs(a - b) > Math.PI; b += k);
    return b;
  }

  /** @private */
  function data() {
    if (nodes) return nodes;
    nodes = pv.dom(map).nodes();

    var root = nodes[0];
    setTreeAngles(root);
    setTreeRadii(root);

    /* Scale the positions. */
    var w = this.parent.width(),
        h = this.parent.height(),
        r = Math.min(w, h) / 2;
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i], d = r * n.radius;
      n.left = w / 2 + d * Math.cos(n.midAngle);
      n.top = h / 2 + d * Math.sin(n.midAngle);
    }

    return nodes;
  }

  var layout = {};

  layout.nodes = data;

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

  /* A dummy mark, like an anchor, which the caller extends. */
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
