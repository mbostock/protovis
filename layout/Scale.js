// TODO allow override of log base
// TODO zlog, etc.
// TODO ticks / rule values
// TODO ordinal scale
// TODO date scale

pv.Scale = {};

pv.Scale.generic = function(impl) {
  var p = impl.prototype;

  /* Property function. */
  function scale() {
    var s = this.scene[0].$scale;
    if (!s) s = this.scene[0].$scale = {};
    if (!s[property]) s[property] = new impl(this);
    var d = s[property].by.apply(this, arguments);
    return s[property].scale(d);
  }

  // XXX by returns a view, while other methods modify

  scale.by = function(v) {
    function i(mark) { impl.call(this, mark); }
    i.prototype = pv.extend(impl);
    i.prototype.by = v;
    return pv.Scale.generic(i);
  };

  scale.min = function(v) {
    p.min = v;
    return this;
  };

  scale.max = function(v) {
    p.max = v;
    return this;
  };

  scale.nice = function(v) {
    p.nice = (arguments.length == 0) ? true : v;
    return this;
  };

  scale.range = function() {
    if (arguments.length == 1) {
      p.start = 0;
      p.end = arguments[0];
    } else {
      p.start = arguments[0];
      p.end = arguments[1] - arguments[0];
    }
    return this;
  };

  return scale;
};

pv.Scale.Impl = function(mark) {
  function range() {
    switch (property) {
      case "height":
      case "top":
      case "bottom": return this.parent.height();
      case "width":
      case "left":
      case "right": return this.parent.width();
      default: return 1;
    }
  }

  var data = mark.$$data;
  if (this.min == undefined) this.min = pv.min(data, this.by);
  if (this.max == undefined) this.max = pv.max(data, this.by);
  if (this.end == undefined) this.end = range.call(mark);
  if (this.nice) { // TODO Only "nice" bounds set automatically.
    var step = Math.pow(10, Math.round(Math.log(this.max - this.min) / Math.log(10)) - 1);
    this.min = Math.floor(this.min / step) * step;
    this.max = Math.ceil(this.max / step) * step;
  }
};

pv.Scale.Impl.prototype.start = 0;

pv.Scale.Impl.prototype.by = pv.identity;
