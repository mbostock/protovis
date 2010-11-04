function diamond(b, d1, d2) {
  var k = 1;

  function right(map) {
    var keys = pv.keys(map);
    return keys.length ? right(map[keys[keys.length - 1]]) : map;
  }

  function left(map) {
    var keys = pv.keys(map);
    return keys.length ? left(map[keys[0]]) : map;
  }

  function deep(n, b, d, left) {
    var c = n[k++] = {};
    if (left && (d > 0)) deep(c, b, d - 1, left);
    for (var i = 1; i < b; i++) c = n[k++] = {};
    if (!left && (d > 0)) deep(c, b, d - 1, left);
  }

  function fix(map) {
    for (var key in map) {
      var c = map[key];
      if (pv.keys(c).length) fix(c);
      else map[key] = 1;
    }
  }

  var tree = {},
      l = tree[k++] = {},
      r = tree[k++] = {};
  deep(l, b, d1 - 2, true);
  deep(r, b, d1 - 2, false);
  l = left(l);
  r = right(r);
  deep(l, b, d2 - 1, false);
  deep(r, b, d2 - 1, true);
  fix(tree);
  return tree;
}
