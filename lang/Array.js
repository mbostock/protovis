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
