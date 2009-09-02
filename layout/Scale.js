// TODO ticks / rule values
// TODO ordinal scale
// TODO date scale

/** TODO */
pv.Scale = function() {};

/** TODO */
pv.Scale.prototype.data = function(data) {
  this.data = data;
};

/** TODO */
pv.Scale.prototype.domain = function(min, max) {
  this.domain = {min: min, max: max};
};

/** TODO */
pv.Scale.prototype.range = function(min, max) {
  this.range = {min: min, max: max};
};

/** TODO */
pv.Scale.prototype.nice = function(nice) {
  this.nice = nice;
};

/** TODO */
pv.Scale.Impl = function() {};
pv.Scale.Impl.prototype.type = pv.Scale;
pv.Scale.Impl.prototype.domain = {};
pv.Scale.Impl.prototype.range = {};

/** TODO */
pv.Scale.Impl.prototype.getData = function(mark) {
  return (this.data == undefined) ? mark.$$data : this.data;
};

/** TODO */
pv.Scale.Impl.prototype.getDomain = function(data, by) {
  var min = this.domain.min, max = this.domain.max;
  if (min == undefined) min = (by == pv.index) ? 0 : pv.min(data, by);
  if (max == undefined) max = (by == pv.index) ? (data.length - 1) : pv.max(data, by);
  if (this.nice) {
    var step = Math.pow(10, Math.round(Math.log(max - min) / Math.log(10)) - 1);
    min = Math.floor(min / step) * step;
    max = Math.ceil(max / step) * step;
  }
  return {min: min, max: max};
};

/** TODO */
pv.Scale.Impl.prototype.getRange = function(mark) {
  var min = (this.range.min == undefined) ? 0 : this.range.min,
      max = (this.range.max == undefined) ? pv.Scale.rangeMax(mark) : this.range.max;
  return {min: min, max: max};
};

/** TODO @method pv.Scale.Impl.prototype.scale */

/** TODO */
pv.Scale.rangeMax = function(mark) {
  switch (property) {
    case "height":
    case "top":
    case "bottom": return mark.parent.height();
    case "width":
    case "left":
    case "right": return mark.parent.width();
  }
};

/** TODO */
pv.Scale.generic = function(impl) {

  /** Wrapper method for public methods. */
  function method(name) {
    return function() {
      if (arguments.length) {
        impl.type.prototype[name].apply(impl, arguments);
        return this;
      }
      return impl[name];
    };
  }

  /** Factory method. */
  function create(by) {
    var domain, range;

    /** Property function. */
    function scale() {
      if (!domain) {
        domain = impl.getDomain(impl.getData(this), by);
        range = impl.getRange(this);
      }
      return impl.scale(by.apply(this, arguments), domain, range);
    }

    /* Bind public setters and getters to the property function. */
    scale.by = function(f) { return create(f); };
    for (var name in impl.type.prototype) scale[name] = method(name);
    return scale;
  }

  return create(pv.identity);
};
