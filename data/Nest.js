pv.Nest = function(array) {
  this.array = array;
  this.keys = [];
};

pv.Nest.prototype.key = function(key) {
  this.keys.push(key);
  return this;
};

pv.Nest.prototype.sortKeys = function(order) {
  this.keys[this.keys.length - 1].order = order || pv.naturalOrder;
  return this;
};

pv.Nest.prototype.sortValues = function(order) {
  this.order = order || pv.naturalOrder;
  return this;
};

pv.Nest.prototype.rollup = function(f) {
  var map = this.map();

  function rollup(map) {
    for (var key in map) {
      var e = map[key];
      if (e instanceof Array) {
        map[key] = f(e);
      } else {
        rollup(e);
      }
    }
  }

  rollup(map);
  return map;
};

pv.Nest.prototype.entries = function() {

  function entries(map) {
    var array = [];
    for (var k in map) {
      var v = map[k];
      array.push({ key: k, values: (v instanceof Array) ? v : entries(v) });
    };
    return array;
  }

  function sort(array, i) {
    var o = this.keys[i].order;
    if (o) {
      array.sort(function(a, b) { return o(a.key, b.key); });
    }
    if (++i < this.keys.length) {
      for (var j = 0; j < array.length; j++) {
        sort.call(this, array[j].values, i);
      }
    }
    return array;
  }

  return sort.call(this, entries(this.map()), 0);
};

pv.Nest.prototype.map = function() {
  if (!this.keys.length) {
    return this.array;
  }

  var map = {}, values = [];
  for (var i, j = 0; j < this.array.length; j++) {
    var x = this.array[j];
    var m = map;
    for (i = 0; i < this.keys.length - 1; i++) {
      var k = this.keys[i](x);
      if (!m[k]) {
        m[k] = {};
      }
      m = m[k];
    }
    k = this.keys[i](x);
    if (!m[k]) {
      var a = [];
      values.push(a);
      m[k] = a;
    }
    m[k].push(x);
  }

  if (this.order) {
    for (var i = 0; i < values.length; i++) {
      values[i].sort(this.order);
    }
  }

  return map;
};
