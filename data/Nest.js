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
  function array(map) {
    return [{
        key: k,
        values: let (v = map[k]) (v instanceof Array) ? v : array(v)
      } for (k in map)];
  }
  return array(this.map());
};

pv.Nest.prototype.map = function() {
  if (!this.keys.length) {
    return this.array;
  }

  var keys = new Array(this.keys.length);
  for (var i = 0; i < this.keys.length; i++) {
    keys[i] = {};
  }

  function KeyIterator(keys) {
    this.keys = keys;
    this.i = 0;
  }

  KeyIterator.prototype.next = function() {
    if (this.i >= this.keys.length) {
      throw StopIteration;
    }
    return this.keys[this.i++];
  };

  function EntryIterator(keys, map) {
    KeyIterator.call(this, keys);
    this.map = map;
  }

  EntryIterator.prototype.next = function() {
    return this.map[KeyIterator.prototype.next.call(this)];
  };

  var values = [];
  function map(i) {
    if (i == keys.length) {
      var a = [];
      values.push(a);
      return a;
    }
    return {
        __iterator__: function(keysOnly) {
            return keysOnly
                ? new KeyIterator(keys[i])
                : new EntryIterator(keys[i], this);
          }
      };
  }

  var entries = map(0);
  for each (var x in this.array) {
    var entry = entries;
    for (var i = 0; i < this.keys.length; i++) {
      var k = this.keys[i](x);
      keys[i][k] = true;
      if (!entry[k]) {
        entry[k] = map(i + 1);
      }
      entry = entry[k];
    }
    entry.push(x);
  }

  for (var i = 0; i < this.keys.length; i++) {
    keys[i] = [v for (v in keys[i])];
    if (this.keys[i].order) {
      keys[i].sort(this.keys[i].order);
    }
  }

  if (this.order) {
    for each (var a in values) {
      a.sort(this.order);
    }
  }

  return entries;
};
