var pv = {};

pv.extend = function(f) {
  function g() {}
  g.prototype = f.prototype;
  return new g();
};

/* Function expression support. */
try {
  eval("pv.parse = function(x) x;"); // native support
} catch (e) {
  pv.parse = function(js) { // hacky regex support
    var re = new RegExp("function(\\s+\\w+)?\\([^)]*\\)\\s*", "mg"), m, i = 0;
    var s = "";
    while (m = re.exec(js)) {
      var j = m.index + m[0].length;
      if (js[j--] != '{') {
        s += js.substring(i, j) + "{return ";
        i = j;
        for (var p = 0; p >= 0 && j < js.length; j++) {
          switch (js[j]) {
            case '[': case '(': p++; break;
            case ']': case ')': p--; break;
            case ';':
            case ',': if (p == 0) p--; break;
          }
        }
        s += pv.parse(js.substring(i, --j)) + ";}";
        i = j;
      }
      re.lastIndex = j;
    }
    s += js.substring(i);
    return s;
  };
}

pv.identity = function(x) { return x; };

pv.range = function(start, end, step) {
  if (arguments.length == 1) {
    end = start;
    start = 0;
  }
  if (step == undefined) {
    step = 1;
  }
  var array = [], i = 0, j;
  while ((j = start + step * i++) < end) {
    array.push(j);
  }
  return array;
};

pv.cross = function(a, b) {
  var array = [];
  for (var i = 0, n = a.length, m = b.length; i < n; i++) {
    for (var j = 0, x = a[i]; j < m; j++) {
      array.push([x, b[j]]);
    }
  }
  return array;
};

pv.nest = function(array) {
  return new pv.Nest(array);
};

pv.blend = function(arrays) {
  return Array.prototype.concat.apply([], arrays);
};

pv.keys = function(map) {
  var array = [];
  for (var key in map) {
    array.push(key);
  }
  return array;
};

pv.entries = function(map) {
  var array = [];
  for (var key in map) {
    array.push({ key: key, value: map[key] });
  }
  return array;
};

pv.values = function(map) {
  var array = [];
  for (var key in map) {
    array.push(map[key]);
  }
  return array;
};

pv.normalize = function(array, f) {
  if (!f) {
    f = pv.identity;
  }
  var sum = pv.reduce(array, function(p, d) { return p + f(d); }, 0);
  return array.map(function(d) { return f(d) / sum; });
};

pv.count = function(array) {
  return array.length;
};

pv.sum = function(array, f) {
  if (!f) {
    f = pv.identity;
  }
  return pv.reduce(array, function(p, d) { return p + f(d); }, 0);
};

pv.max = function(array, f) {
  if (!f) {
    f = pv.identity;
  }
  return pv.reduce(array, function(p, d) { return Math.max(p, f(d)); }, -Infinity);
};

pv.max.index = function(array, f) {
  if (!f) {
    f = pv.identity;
  }
  var maxi = -1, maxx = -Infinity;
  for (var i = 0; i < array.length; i++) {
    var x = f(array[i]);
    if (x > maxx) {
      maxx = x;
      maxi = i;
    }
  }
  return maxi;
}

pv.min = function(array, f) {
  if (!f) {
    f = pv.identity;
  }
  return pv.reduce(array, function(p, d) { return Math.min(p, f(d)); }, Infinity);
};

pv.min.index = function(array, f) {
  if (!f) {
    f = pv.identity;
  }
  var mini = -1, minx = Infinity;
  for (var i = 0; i < array.length; i++) {
    var x = f(array[i]);
    if (x < minx) {
      minx = x;
      mini = i;
    }
  }
  return mini;
}

pv.mean = function(array, f) {
  return pv.sum(array, f) / array.length;
};

pv.median = function(array, f) {
  if (!f) {
    f = pv.identity;
  }
  array = array.map(f).sort(function(a, b) { return a - b; });
  if (array.length % 2) {
    return array[Math.floor(array.length / 2)];
  }
  var i = array.length / 2;
  return (array[i - 1] + array[i]) / 2;
};

/**
 * Array reduce was added in JavaScript 1.8. This implementation uses the native
 * method if provided; otherwise we use our own implementation derived from the
 * JavaScript documentation. Note that we don't want to add it to the Array
 * prototype directly because this breaks certain (bad) for loop idioms.
 */
if (/\[native code\]/.test(Array.prototype.reduce)) {
  pv.reduce = function(array, f, v) {
    var p = Array.prototype;
    return p.reduce.apply(array, p.slice.call(arguments, 1));
  };
} else {
  pv.reduce = function(array, f, v) {
    var len = array.length;
    if (!len && (arguments.length == 2)) {
      throw new Error();
    }

    var i = 0;
    if (arguments.length < 3) {
      while (true) {
        if (i in array) {
          v = array[i++];
          break;
        }
        if (++i >= len) {
          throw new Error();
        }
      }
    }

    for (; i < len; i++) {
      if (i in array) {
        v = f.call(null, v, array[i], i, array);
      }
    }
    return v;
  };
};

pv.dict = function(array, f) {
  var m = {};
  for (var i = 0; i < array.length; i++) {
    if (i in array) {
      var k = array[i];
      m[k] = f.call(null, k, i, array);
    }
  }
  return m;
};

pv.permute = function(array, permutation, f) {
  if (!f) {
    f = pv.identity;
  }
  var p = new Array(array.length);
  permutation.forEach(function(j, i) { p[i] = f(array[j]); });
  return p;
};

pv.numerate = function(array, f) {
  if (!f) {
    f = pv.identity;
  }
  var map = {};
  array.forEach(function(x, i) { map[f(x)] = i; });
  return map;
};

pv.reverseOrder = function(b, a) {
  return (a < b) ? -1 : ((a > b) ? 1 : 0);
};

pv.naturalOrder = function(a, b) {
  return (a < b) ? -1 : ((a > b) ? 1 : 0);
};

pv.gradient = function() {
  if (arguments.length < 2) {
    return arguments[0];
  }
  var g = new pv.Gradient();
  for (var i = 0, n = arguments.length - 1; i <= n; i++) {
    g.color(i / n, arguments[i]);
  }
  return g;
};

pv.css = function(e, p) {
  return parseFloat(self.getComputedStyle(e, null).getPropertyValue(p));
};

pv.ns = {
 svg: "http://www.w3.org/2000/svg",
 xmlns: "http://www.w3.org/2000/xmlns",
 xlink: "http://www.w3.org/1999/xlink",
};

pv.version = { major: 2, minor: 4 };
