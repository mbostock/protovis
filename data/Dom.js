pv.dom = function(map) {
  return new pv.Dom(map);
};

pv.Dom = function(map) {
  this.$map = map;
};

pv.Dom.prototype.$leaf = function(n) {
  return typeof n != "object";
};

pv.Dom.prototype.leaf = function(f) {
  if (arguments.length) {
    this.$leaf = f;
    return this;
  }
  return this.$leaf;
};

pv.Dom.prototype.root = function() {
  var leaf = this.$leaf;

  /** @private */
  function recurse(map) {
    var node = {}, child, previousChild;
    for (var key in map) {
      var value = map[key];
      child = leaf(value) ? {nodeValue: value} : recurse(value);
      child.nodeName = key;
      child.parentNode = node;
      if (previousChild) {
        child.previousSibling = previousChild;
        previousChild.nextSibling = child;
        node.childNodes.push(child);
      } else {
        node.childNodes = [child];
      }
      previousChild = child;
    }
    node.firstChild = node.childNodes[0];
    node.lastChild = child;
    return node;
  }

  return recurse(this.$map);
};

pv.Dom.prototype.nodes = function() {
  var array = [];

  /** @private */
  function flatten(node) {
    if (node.childNodes) node.childNodes.forEach(flatten);
    array.push(node);
  }

  flatten(this.root(), array);
  return array.reverse();
};
