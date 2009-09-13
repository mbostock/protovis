pv.tree = function(array) {
  return new pv.Tree(array);
};

/** @class */
pv.Tree = function(array) {
  this.array = array;
};

pv.Tree.prototype.keys = function(k) {
  this.k = k;
  return this;
};

pv.Tree.prototype.value = function(v) {
  this.v = v;
  return this;
};

pv.Tree.prototype.map = function() {
  var map = {}, o = {};
  for (var i = 0; i < this.array.length; i++) {
    o.index = i;
    var value = this.array[i], keys = this.k.call(o, value), node = map;
    for (var j = 0; j < keys.length - 1; j++) {
      node = node[keys[j]] || (node[keys[j]] = {});
    }
    node[keys[j]] = this.v ? this.v.call(o, value) : value;
  }
  return map;
};
