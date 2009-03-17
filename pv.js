var undefined;

var pv = {};

pv.identity = function(x) x;

pv.singleton = function(value) {
  yield value;
};

pv.range = function(start, end, step) {
  if (step == undefined) {
    step = 1;
  }
  while (start <= end) {
    yield start;
    start += step;
  }
};

pv.cross = function(a, b) {
  for each (var x in a) {
    for each (var y in b) {
      yield [x, y];
    }
  }
};

pv.nest = function(array) {
  return new pv.Nest(array);
};

pv.blend = function() {
  for (let i = 0; i < arguments.length; ++i) {
    let a = arguments[i];
    for each (var x in a) {
      yield x;
    }
  }
};

pv.keys = function(map) {
  for (var key in map) {
    yield key;
  }
};

pv.entries = function(map) {
  for (var key in map) {
    yield { key: key, value: map[key] };
  }
};

pv.values = function(map) {
  for each (var value in map) {
    yield value;
  }
};

pv.normalize = function(array, f) {
  if (!f) {
    f = pv.identity;
  }
  var sum = array.reduce(function(p, d) p + f(d), 0);
  return array.map(function(d) f(d) / sum);
};

pv.count = function(array) {
  if (array instanceof Array) {
    return array.length;
  }
  var n = 0;
  for each (var x in array) {
    n++;
  }
  return n;
};

pv.sum = function(array, f) {
  if (!f) {
    f = pv.identity;
  }
  return array.reduce(function(p, d) p + f(d), 0);
};

pv.max = function(array, f) {
  if (!f) {
    f = pv.identity;
  }
  return array.reduce(function(p, d) Math.max(p, f(d)), -Infinity);
};

pv.max.index = function(array, f) {
  if (!f) {
    f = pv.identity;
  }
  var i = 0, maxi = -1, maxx = -Infinity;
  for each (let x in array) {
    x = f(x);
    if (x > maxx) {
      maxx = x;
      maxi = i;
    }
    i++;
  }
  return maxi;
}

pv.min = function(array, f) {
  if (!f) {
    f = pv.identity;
  }
  return array.reduce(function(p, d) Math.min(p, f(d)), Infinity);
};

pv.min.index = function(array, f) {
  if (!f) {
    f = pv.identity;
  }
  var i = 0, mini = -1, minx = Infinity;
  for each (let x in array) {
    x = f(x);
    if (x < minx) {
      minx = x;
      mini = i;
    }
    i++;
  }
  return mini;
}

pv.mean = function(array, f) {
  return pv.sum(array, f) / pv.count(array);
};

pv.median = function(array, f) {
  if (!f) {
    f = pv.identity;
  }
  array = [f(x) for each (x in array)].sort(function(a, b) a - b);
  return (array.length % 2)
      ? array[Math.floor(array.length / 2)]
      : let (i = array.length / 2) (array[i - 1] + array[i]) / 2
};

pv.function = function(x) {
  return (x instanceof Function) ? x : function() x;
};

pv.date = function(s, format) {
  return pv.Date.parse(s, format);
};

pv.permute = function(array, permutation, f) {
  if (!f) {
    f = pv.identity;
  }
  var p = new Array(array.length);
  permutation.forEach(function(j, i) p[i] = f(array[j]));
  return p;
};

pv.numerate = function(array, f) {
  if (!f) {
    f = pv.identity;
  }
  var map = {};
  array.forEach(function(x, i) map[f(x)] = i);
  return map;
};

pv.reverseOrder = function(b, a) {
  return (a < b) ? -1 : ((a > b) ? 1 : 0);
};

pv.naturalOrder = function(a, b) {
  return (a < b) ? -1 : ((a > b) ? 1 : 0);
};
