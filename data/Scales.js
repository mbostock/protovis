pv.Scales = {};
pv.Scales.epsilon = 1e-30;
pv.Scales.defaultBase = 10;
pv.Scales.defaultNice = false;

pv.Scales.step = function(min, max, base) {
  if (!base) base = pv.Scales.defaultBase;
  let exp = Math.round(Math.log(max-min)/Math.log(base)) - 1;
  return Math.pow(base, exp);
};

// -- Ordinal Scale ----

pv.Scales.ordinal = function(ordinals) {
  let map = pv.numerate(ordinals);
  let f = function(x) let (i = map[x]) (i == undefined) ? -1 : i;
  f.values = function() ordinals;
  f.interp = function(i) ordinals[i];
  return f;
};

// -- Linear Scale ----

pv.Scales.linear = function(min, max, base) {
  if (base == undefined) base = pv.Scales.defaultBase;
  let range = max - min, eps = pv.Scales.epsilon;
  let f = function(x) range < eps && range > -eps ? 0 : (x - min) / range;
  f.values = function(n) pv.Scales.linear.values(min, max, base, n);
  f.interp = function(f) min + f * range;
  return f;
}

pv.Scales.linear.fromData = function(array, f, base, nice) {
  if (base == undefined) base = pv.Scales.defaultBase;
  if (nice == undefined) nice = pv.Scales.defaultNice;
  let min = pv.min(array, f);
  let max = pv.max(array, f);
  if (!nice) {
    let r = pv.Scales.linear.range(min, max, base);
    min = r.min;
    max = r.max;
  }
  return pv.Scales.linear(min, max, base);
};

pv.Scales.linear.values = function(min, max, base, n) {
  if (base == undefined) base = pv.Scales.defaultBase;
  if (n == undefined) n = -1;
  let range = max - min;  
  if (range == 0) {
    yield min;
  } else {
    let step = pv.Scales.step(min, max, base);
    let stride = n<0 ? 1 : Math.max(1, Math.floor(range/(step*n)));
    for (let x=min; x <= max; x += stride*step)
      yield x;
  }
};

pv.Scales.linear.range = function(min, max, base) {
  let step = pv.Scales.step(min, max, base);
  return {
    min: Math.floor(min / step) * step,
    max: Math.ceil(max / step) * step
  };
};

// -- Root Scale ----

pv.Scales.root = function(min, max, base) {
  if (base == undefined) base = 2;
  let root = function(x) let (s=(x<0?-1:1)) s*Math.pow(s*x, 1/base);
  let rmin = root(min), range = root(max) - rmin, eps = pv.Scales.epsilon;
  var f = function(x) (root(x) - rmin) / range;
  f.values = function(n) pv.Scales.linear.values(min, max, base, 10);
  f.interp = function(f) let (g = rmin + f*range, s = g<0?-1:1) s*Math.pow(s*g, base);
  return f;
};

pv.Scales.root.fromData = function(array, f, base, nice) {
  if (base == undefined) base = 2;
  if (nice == undefined) nice = pv.Scales.defaultNice;
  let min = pv.min(array, f);
  let max = pv.max(array, f);
  if (!nice) {
    let r = pv.Scales.linear.range(min, max, 10);
    min = r.min;
    max = r.max;
  }
  return pv.Scales.root(min, max, base);
};

// -- Log Scale ----

pv.Scales.log = function(min, max, base) {
  if (base == undefined) base = pv.Scales.defaultBase;
  let lg = (min < 0 && max > 0) ? pv.Scales.log.zlog : pv.Scales.log.log;
  let lmin = lg(min, base), lrange = lg(max, base) - lmin, eps = pv.Scales.epsilon;
  let f = function(x)
    (lrange < eps && lrange > -eps) ? 0 : (lg(x, base) - lmin) / lrange;
  f.values = function(n)
     pv.Scales.log.values(min, max, 10, n);
  f.interp = function(f)
     let (g = lmin + f*lrange, s = g<0?-1:1) s*Math.pow(base, s*g);
  return f;
};

pv.Scales.log.fromData = function(array, f, base, nice) {
  if (base == undefined) base = pv.Scales.defaultBase;
  if (nice == undefined) nice = pv.Scales.defaultNice;
  let min = pv.min(array, f);
  let max = pv.max(array, f);
  if (!nice) {
    let r = pv.Scales.log.range(min, max, base);
    min = r.min;
    max = r.max;
  }
  return pv.Scales.log(min, max, base);
};


pv.Scales.log.log = function(x, b) {
  return x==0 ? 0 : x>0 ? Math.log(x)/Math.log(b) : -Math.log(-x)/Math.log(b);
};

pv.Scales.log.zlog = function(x, b) {
  let s = (x < 0 ? -1 : 1);
  x = s*x;
  if (x < b) x += (b-x)/b;
  return s * Math.log(x) / Math.log(b);
};

pv.Scales.log.values = function(min, max, base, n) {
  if (base == undefined) base = pv.Scales.defaultBase;
  if (n == undefined) n = -1;
  let z = (min < 0 && max > 0);
  let lg = z ? pv.Scales.log.zlog : pv.Scales.log.log;
  let beg = Math.round(lg(min, base));
  let end = Math.round(lg(max, base));
  let i, j, b, v = z?-1:1;

  if (beg == end && beg>0 && Math.pow(base,beg) > min) {
  	--beg; // decrement to generate more values
  }
  for (i = beg; i <= end; ++i) {
    if (i==0 && v<=0) { yield v; yield 0; }
    v = z && i<0 ? -Math.pow(base,-i) : Math.pow(base,i);
    b = z && i<0 ? Math.pow(base,-i-1) : v;

    for (j = 1; j < base; ++j, v += b) {
      if (v > max) break;
      yield v;
    }
  }
};

pv.Scales.log.range = function(min, max, base) {
  if (base == undefined) base = pv.Scales.defaultBase;
  let lg = function(x) Math.log(x) / Math.log(base);
  let r = {
    min: (min > 0 ?  Math.pow(base,  Math.floor(lg(min)))
			: -Math.pow(base, -Math.floor(-lg(-min)))),
    max: (max > 0 ?  Math.pow(base,  Math.ceil(lg(max)))
			: -Math.pow(base, -Math.ceil(-lg(-max))))
  };
  if (min < 0 && max > 0) {
    if (Math.abs(min) < base) r.min = Math.floor(min);
    if (Math.abs(max) < base) r.max = Math.ceil(max);	
  }
  return r;
};

// -- Quantile Scale ----

// TODO?

// -- DateTime Scale ----

// TODO
