pv.treemap = function(tree) {
  return new pv.Treemap(tree);
};

pv.Treemap = function(tree) {
  this.tree = tree;
};

pv.Treemap.prototype.nodes = function() {
  var keys = [];

  function accumulate(map) {
    var node = {size: 0, children: []};
    for (var key in map) {
      var child = map[key];
      keys.push(key);
      if (typeof child == "object") {
        child = accumulate(child);
      } else {
        child = {size: child, data: child, keys: keys.slice()};
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
    var x = node.x, y = node.y, w = node.width, h = node.height, l = Math.min(w, h);

    function position(row) {
      var s = pv.sum(row, function(node) { return node.size; }),
          hh = (l == 0) ? 0 : (s / l);

      for (var i = 0, d = 0; i < row.length; i++) {
        var n = row[i], nw = n.size / hh;
        if (w == l) {
          n.x = x + d;
          n.y = y;
          n.width = nw;
          n.height = hh;
        } else {
          n.x = x;
          n.y = y + d;
          n.width = hh;
          n.height = nw;
        }
        d += nw;
      }

      if (w == l) {
        y += hh;
        h -= hh;
      } else {
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
    array.push(node);
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        flatten(node.children[i], array);
      }
    }
    return array;
  }

  var root = accumulate(this.tree);
  root.x = 0;
  root.y = 0;
  root.width = 1;
  root.height = 1;
  scale(root, 1 / root.size);
  layout(root);

  return flatten(root, []);
};

pv.Treemap.prototype.x = function(node) {
  return node.x * pv.Scale.rangeMax(this);
};

pv.Treemap.prototype.y = function(node) {
  return node.y * pv.Scale.rangeMax(this);
};

pv.Treemap.prototype.width = function(node) {
  return node.width * pv.Scale.rangeMax(this);
};

pv.Treemap.prototype.height = function(node) {
  return node.height * pv.Scale.rangeMax(this);
};
