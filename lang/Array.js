if (!Array.prototype.reduce) {
  Array.prototype.reduce = function(f /*, initial*/) {
    var len = this.length;
    if (!len && (arguments.length == 1)) {
      throw new Error();
    }

    var i = 0;
    if (arguments.length >= 2) {
      var rv = arguments[1];
    } else {
      do {
        if (i in this) {
          rv = this[i++];
          break;
        }

        // if array contains no values, no initial value to return
        if (++i >= len) {
          throw new Error();
        }
      } while (true);
    }

    for (; i < len; i++) {
      if (i in this) {
        rv = f.call(null, rv, this[i], i, this);
      }
    }

    return rv;
  };
}
