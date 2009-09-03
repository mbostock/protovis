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

  this.index = pv.numerate(ordinals);
  return ordinals;
};

/** TODO */
pv.Scale.OrdinalImpl.prototype.getRange = function(mark) {
  if (this.range) return this.range;
  var n = this.domain.length, step = this.step = pv.Scale.rangeMax(mark) / n;
  return pv.range(n).map(function(i) { return i * step; });
};

/** TODO */
pv.Scale.OrdinalImpl.prototype.evaluate = function() {

  /*
   * This is a bit of a cludge so that the scale can be plugged into the width
   * property in addition to the left (or right) property (and equivalently with
   * height, top and bottom). This, of course, assumes that it would never make
   * sense to use an ordinal scale for the width or height property, which is
   * probably correct...
   *
   * Note that we can't simply provide an accessor for the step value because
   * (unless special care is taken) the accessor would be called before the
   * scale had been initialized.
   */
  switch (property) {
    case "width":
    case "height": return this.step;
  }

  return pv.Scale.Impl.prototype.evaluate.apply(this, arguments);
};

/** TODO */
pv.Scale.OrdinalImpl.prototype.scale = function(value) {
  return this.range[this.index[value] % this.range.length];
};

/** TODO */
pv.Scale.ordinal = function(data) {
  return this.generic(new pv.Scale.OrdinalImpl()).data(data);
};
