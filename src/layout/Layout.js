/**
 * @ignore
 * @class
 */
pv.Layout = function() {
  this.$properties = [];
  this.proto = {$properties: []};
};

/** @private Defines a layout property; not visible to marks. */
pv.Layout.prototype.property = function(name, cast) {
  pv.Mark.cast[name] = cast;
  this[name] = function(v) {
      pv.Mark.prototype.propertyValue.call(this.proto, name, v);
      return this;
    };
  return this;
};

/** @private Defines a mark property for inheritance. */
pv.Layout.prototype.propertyValue = function(name, v) {
  pv.Mark.prototype.propertyValue.call(this, name, v);
  return this;
};
