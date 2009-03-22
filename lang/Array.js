Array.prototype.dict = function(f, o) {
  var m = {};
  for (var i = 0; i < this.length; i++) {
    if (i in this) {
      var k = this[i];
      m[k] = f.call(o, k, i, this);
    }
  }
  return m;
};

if (!Array.prototype.reduce) {
  Array.prototype.reduce = function(f, v) {
    var len = this.length;
    if (!len && (arguments.length == 1)) {
      throw new Error();
    }

    var i = 0;
    if (arguments.length < 2) {
      while (true) {
        if (i in this) {
          v = this[i++];
          break;
        }
        if (++i >= len) {
          throw new Error();
        }
      }
    }

    for (; i < len; i++) {
      if (i in this) {
        v = f.call(null, v, this[i], i, this);
      }
    }
    return v;
  };
}
