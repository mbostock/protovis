// TODO share code with Treemap
// TODO vertical / horizontal orientation?

/**
 * @class
 *
 * Supported node attributes:
 *
 * <ul>
 * <li>left
 * <li>top
 * <li>width
 * <li>height
 * <li>depth
 * <li>keys
 * <li>size
 * <li>children
 * <li>data
 * </ul>
 *
 * @param tree
 */
pv.Layout.icicle = function(tree) {
  var keys = [], sizeof = Number;

  /** @private */
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

  /** @private */
  function scale(node, k) {
    node.size *= k;
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        scale(node.children[i], k);
      }
    }
  }

  /** @private */
  function depth(node, i) {
    i = i ? (i + 1) : 1;
    return node.children
        ? pv.max(node.children, function(n) { return depth(n, i); })
        : i;
  }

  /** @private */
  function layout(node) {
    if (node.children) {
      icify(node);
      for (var i = 0; i < node.children.length; i++) {
        layout(node.children[i]);
      }
    }
  }

  /** @private */
  function icify(node) {
    var left = node.left;
    for (var i = 0; i < node.children.length; i++) {
      var child = node.children[i], width = (child.size / node.size) * node.width;
      child.left = left;
      child.top = node.top + node.height;
      child.width = width;
      child.height = node.height;
      child.depth = node.depth + 1;
      left += width;
      if (child.children) {
        icify(child);
      }
    }
  }

  /** @private */
  function flatten(node, array) {
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        flatten(node.children[i], array);
      }
    }
    array.push(node)
    return array;
  }

  /** @private */
  function data() {
    var root = accumulate(tree);
    root.top = 0;
    root.left = 0;
    root.width = this.parent.width();
    root.height = this.parent.height() / depth(root);
    root.depth = 0;
    layout(root);
    return flatten(root, []).reverse();
  }

  /**
   * @param {string} v
   * @function
   * @name pv.Layout.icicle.prototype.root
   * @returns {pv.Layout.icicle} this.
   */
  data.root = function(v) {
    keys = [v];
    return this;
  };

  /**
   * @param {function} f
   * @function
   * @name pv.Layout.icicle.prototype.size
   * @returns {pv.Layout.icicle} this.
   */
  data.size = function(f) {
    sizeof = f;
    return this;
  };

  return data;
};
