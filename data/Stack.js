// pv.stack = function(array) {
//   return new pv.Stack(array);
// }

// pv.Stack = function(array) {
//   this.array = array;
// };

// pv.Stack.prototype.$key = pv.index;

// pv.Stack.prototype.$value = pv.identity;

// pv.Stack.prototype.key = function(key) {
//   if (arguments.length) {
//     this.$key = key;
//     return this;
//   }
//   return this.$key;
// };

// pv.Stack.prototype.value = function(value) {
//   if (arguments.length) {
//     this.$value = value;
//     return this;
//   }
//   return this.$value;
// };

// pv.Stack.prototype.array = function() {
//   var entries = {}, offsets = {}, o = {};
//   for (var i = 0; i < this.array.length; i++) {
//     for (var j = 0; j < this.array[i].length; j++) {
//       o.index = j;
//       var d = this.array[i][j],
//           k = this.$key.call(o, d),
//           v = this.$value.call(o, d);
//       if (!entries[k]) {
//         entries[k] = [{offset:0, value:v}];
//         offsets[k] = v;
//       } else {
//         entries[k].push({offset:offsets[k], value:v});
//         offsets[k] += v;
//       }
//     }
//   }
//   return

pv.stack = function(arrays, f) {
  if (arguments.length < 2) f = pv.identity;
  var n = arrays.length;
  if (n) {
    var m = arrays[0].length, stack = new Array(n), o = {};
    for (var i = 0; i < n; i++) {
      stack[i] = new Array(m);
    }
    for (var j = 0; j < m; j++) {
      var sum = 0;
      for (var i = 0; i < n; i++) {
        o.index = i;
        var d = arrays[i][j], v = f.call(o, d);
        stack[i][j] = {offset:sum, value:v, data:d};
        sum += v;
      }
      for (var i = 0; i < n; i++) {
        stack[i][j].total = sum;
      }
    }
  }
  return stack;
};

// pv.stack = function(arrays, f) {
//   var n = arrays.length;
//   if (n) {
//     var m = arrays[0].length;
//     for (var j = 0; j < m; j++) {
//       var sum = 0;
//       for (var i = 0; i < n; i++) {
//         sum += f(arrays[i][j], sum, j);
//       }
//     }
//   }
// };

pv.reduceTranspose = function(arrays, f, v) {
  var n = arrays.length, r = [];
  if (n) {
    var m = arrays[0].length;
    if (!m && (arguments.length == 2)) {
      throw new Error("reduceTranspose: empty array, no initial value");
    }
    for (var j = 0; j < m; j++) {
      var vv = v, i = 0;

      /* If no initial value is specified, find the default. */
      if (arguments.length < 3) {
        while (true) {
          if ((i in arrays) && (j in arrays[i])) {
            vv = arrays[i++][j];
            break;
          }
        }
        if (++i >= n) {
          throw new Error("reduceTranspose: no values, no initial value");
        }
      }

      for (; i < n; i++) {
        if ((i in arrays) && (j in arrays[i])) {
          vv = f(vv, arrays[i][j], j, arrays[i]);
        }
      }
      r[j] = vv;
    }
  }
  return r;
};
