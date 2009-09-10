// TODO share code with Treemap
// TODO inspect parent panel dimensions to set inner and outer radii

pv.sunburst = function(tree) {
  var keys = [], sizeof = Number;

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

  function layout(node) {
    if (node.children) {
      wedgify(node);
      for (var i = 0; i < node.children.length; i++) {
        layout(node.children[i]);
      }
    }
  }

  function wedgify(node) {
    var startAngle = node.startAngle;
    for (var i = 0; i < node.children.length; i++) {
      var child = node.children[i], angle = (child.size / node.size) * node.angle;
      child.startAngle = startAngle;
      child.angle = angle;
      child.depth = node.depth + 1;
      startAngle += angle;
      if (child.children) {
        wedgify(child);
      }
    }
  }

  function flatten(node, array) {
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        flatten(node.children[i], array);
      }
    }
    array.push(node)
    return array;
  }

  function data() {
    var root = accumulate(tree);
    root.startAngle = 0;
    root.angle = 2 * Math.PI;
    root.depth = 0;
    layout(root);
    return flatten(root, []).reverse();
  }

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
