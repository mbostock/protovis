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
