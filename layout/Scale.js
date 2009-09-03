// TODO ticks / rule values
// TODO date scale
// TODO support for angle ranges, color ranges?
// TODO support this.index for domain computation (not just pv.index)?

/** TODO */
pv.Scale = function() {};

/** TODO */
pv.Scale.prototype.data = function(data) {
  this.data = data;
};

/** TODO */
pv.Scale.prototype.by = function(by) {
  this.by = by;
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
pv.Scale.prototype.round = function(round) {
  this.round = round;
};

/** TODO */
pv.Scale.Impl = function() {};
pv.Scale.Impl.prototype.type = pv.Scale;
pv.Scale.Impl.prototype.by = pv.identity;

/** TODO */
pv.Scale.Impl.prototype.getData = function(mark) {
  return (this.data == undefined) ? mark.$$data : this.data;
};

/** TODO */
pv.Scale.Impl.prototype.getDomain = function(data, by) {
  var domain = this.domain, min = domain && domain.min, max = domain && domain.max;
  if (min == undefined) min = (by == pv.index) ? 0 : pv.Scale.domainMin(data, by);
  if (max == undefined) max = (by == pv.index) ? (data.length - 1) : pv.max(data, by);
  return {min: min, max: max};
};

/** TODO */
pv.Scale.Impl.prototype.getRange = function(mark) {
  var range = this.range, min = range && range.min, max = range && range.max;
  if (min == undefined) min = 0;
  if (max == undefined) max = pv.Scale.rangeMax(mark);
  return {min: min, max: max};
};

/** TODO @method pv.Scale.Impl.prototype.scale */

/** TODO */
pv.Scale.Impl.prototype.evaluate = function(mark, arguments, as) {
  var value = as.apply(mark, arguments), x = this.scale(value);
  return this.round ? Math.round(x) : x;
}

/** TODO */
pv.Scale.domainMin = function(data, by) {
  switch (property) {
    case "height":
    case "width": return 0;
    case "top":
    case "bottom":
    case "left":
    case "right": return pv.min(data, by);
  }
};

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
  var loaded;

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
  function create(as) {

    /** Property function. */
    function scale() {
      if (!loaded) {
        impl.data = impl.getData(this);
        impl.domain = impl.getDomain(impl.data, impl.by);
        impl.range = impl.getRange(this);
        loaded = true;
      }
      return impl.evaluate(this, arguments, as || impl.by);
    }

    /* Bind public setters and getters to the property function. */
    scale.as = create;
    for (var name in impl.type.prototype) {
      scale[name] = method(name);
    }
    return scale;
  }

  return create();
};
