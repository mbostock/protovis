var pv = {};

pv.identity = function(x) { return x; };

pv.range = function(start, end, step) {
  if (arguments.length == 1) {
    end = start;
    start = 0;
  }
  if (step == undefined) {
    step = 1;
  }
  var array = []
  while (start < end) {
    array.push(start);
    start += step;
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
  var sum = array.reduce(function(p, d) { return p + f(d); }, 0);
  return array.map(function(d) { return f(d) / sum; });
};

pv.count = function(array) {
  return array.length;
};

pv.sum = function(array, f) {
  if (!f) {
    f = pv.identity;
  }
  return array.reduce(function(p, d) { return p + f(d); }, 0);
};

pv.max = function(array, f) {
  if (!f) {
    f = pv.identity;
  }
  return array.reduce(function(p, d) { return Math.max(p, f(d)); }, -Infinity);
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
  return array.reduce(function(p, d) { return Math.min(p, f(d)); }, Infinity);
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
