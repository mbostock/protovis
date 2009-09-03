/** TODO */
pv.Scale.Ordinal = function() {};
pv.Scale.Ordinal.prototype = pv.extend(pv.Scale);

/** TODO */
pv.Scale.Ordinal.prototype.domain = function(array) {
  this.domain = array;
};

/** TODO */
pv.Scale.Ordinal.prototype.range = function(array) {
  this.range = array;
};

/** TODO */
pv.Scale.OrdinalImpl = function() {};
pv.Scale.OrdinalImpl.prototype = pv.extend(pv.Scale.Impl);
pv.Scale.OrdinalImpl.prototype.type = pv.Scale.Ordinal;
pv.Scale.OrdinalImpl.prototype.domain = null;
pv.Scale.OrdinalImpl.prototype.range = null;

/** TODO */
pv.Scale.OrdinalImpl.prototype.getDomain = function(data, by) {
  var domain = this.domain || data.map(by);

  /* Filter the specified ordinals to their unique values. */
  var seen = {}, ordinals = [];
  for (var i = 0; i < domain.length; i++) {
    var o = domain[i];
    if (!(o in seen)) {
      seen[o] = true;
      ordinals.push(o);
    }
  }

  return {length: ordinals.length, index: pv.numerate(ordinals)};
};

/** TODO */
pv.Scale.OrdinalImpl.prototype.getRange = function(mark, domain) {
  if (this.range) return this.range;
  var max = pv.Scale.rangeMax(mark),
      step = max / domain.length;
      range = pv.range(0, max, step);
  range.step = step;
  return range;
};

/** TODO */
pv.Scale.OrdinalImpl.prototype.scale = function(value, domain, range) {
  switch (property) {
    case "width":
    case "height": return range.step;
  }
  return range[domain.index[value] % range.length];
};

/** TODO */
pv.Scale.ordinal = function() {
  return this.generic(new pv.Scale.OrdinalImpl());
};
