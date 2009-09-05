if (!Array.prototype.map) {
  Array.prototype.map = function(f, o) {
      var n = this.length;
      var result = new Array(n);
      for (var i = 0; i < n; i++) {
        if (i in this) {
          result[i] = f.call(o, this[i], i, this);
        }
      }
      return result;
    };
}

if (!Array.prototype.filter) {
  Array.prototype.filter = function(f, o) {
      var n = this.length;
      var result = new Array();
      for (var i = 0; i < n; i++) {
        if (i in this) {
          var v = this[i];
          if (f.call(o, v, i, this)) result.push(v);
        }
      }
      return result;
    };
}

if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(f, o) {
      var n = this.length >>> 0;
      for (var i = 0; i < n; i++) {
        if (i in this) f.call(o, this[i], i, this);
      }
    };
}

if (!Array.prototype.reduce) {
  Array.prototype.reduce = function(f, v) {
      var len = this.length;
      if (!len && (arguments.length == 2)) {
        throw new Error();
      }

      var i = 0;
      if (arguments.length < 3) {
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
          v = f(v, this[i], i, this);
        }
      }
      return v;
    };
}
