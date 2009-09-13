// TODO add `by` function for determining size (and children?)

/** @class */
pv.Layout.treemap = function(tree) {
  var keys = [], round, inset, sizeof = Number;

  function rnd(i) {
    return round ? Math.round(i) : i;
  }

  function accumulate(map) {
    var node = {size: 0, children: [], keys: keys.slice()};
    for (var key in map) {
      var child = map[key], size = sizeof(child);
      keys.push(key);
      if (isNaN(size)) {
        child = accumulate(child);
      } else {
        child = {size: size, data: child, keys: keys.slice()};
      }
      node.children.push(child);
      node.size += child.size;
      keys.pop();
    }
    node.children.sort(function(a, b) { return b.size - a.size; });
    return node;
  }

  function scale(node, k) {
    node.size *= k;
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        scale(node.children[i], k);
      }
    }
  }

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

  function squarify(node) {
    var row = [], mink = Infinity;
    var x = node.left + (inset ? inset.left : 0),
        y = node.top + (inset ? inset.top : 0),
        w = node.width - (inset ? inset.left + inset.right : 0),
        h = node.height - (inset ? inset.top + inset.bottom : 0),
        l = Math.min(w, h);

    scale(node, w * h / node.size);

    function position(row) {
      var s = pv.sum(row, function(node) { return node.size; }),
          hh = (l == 0) ? 0 : rnd(s / l);

      for (var i = 0, d = 0; i < row.length; i++) {
        var n = row[i], nw = rnd(n.size / hh);
        if (w == l) {
          n.left = x + d;
          n.top = y;
          n.width = nw;
          n.height = hh;
        } else {
          n.left = x;
          n.top = y + d;
          n.width = hh;
          n.height = nw;
        }
        d += nw;
      }

      if (w == l) {
        if (n) n.width += w - d; // correct rounding error
        y += hh;
        h -= hh;
      } else {
        if (n) n.height += h - d; // correct rounding error
        x += hh;
        w -= hh;
      }
      l = Math.min(w, h);
    }

    var children = node.children.slice(); // copy
    while (children.length > 0) {
      var child = children[children.length - 1];
      if (child.size <= 0) {
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

    if (row.length > 0) {
      position(row);
    }

    /* correct rounding error */
    if (w == l) {
      for (var i = 0; i < row.length; i++) {
        row[i].width += w;
      }
    } else {
      for (var i = 0; i < row.length; i++) {
        row[i].height += h;
      }
    }
  }

  function layout(node) {
    if (node.children) {
      squarify(node);
      for (var i = 0; i < node.children.length; i++) {
        layout(node.children[i]);
      }
    }
  }

  function flatten(node, array) {
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        flatten(node.children[i], array);
      }
    }
    if (inset || !node.children) {
      array.push(node)
    }
    return array;
  }

  function data() {
    var root = accumulate(tree);
    root.left = 0;
    root.top = 0;
    root.width = this.parent.width();
    root.height = this.parent.height();
    layout(root);
    return flatten(root, []).reverse();
  }

  data.round = function(v) {
    round = v;
    return this;
  };

  data.inset = function(top, right, bottom, left) {
    if (arguments.length == 1) right = bottom = left = top;
    inset = {top:top, right:right, bottom:bottom, left:left};
    return this;
  };

  data.root = function(v) {
    keys = [v];
    return this;
  };

  data.size = function(f) {
    sizeof = f;
    return this;
  };

  return data;
};
