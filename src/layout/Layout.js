/**
 * @ignore
 * @class
 */
pv.Layout = function() {
  pv.Mark.call(this);
};

pv.Layout.prototype = pv.extend(pv.Mark);

/** @private Defines a local property with the specified name and cast. */
pv.Layout.prototype.property = function(name, cast) {
  this.propertyMethod(name, true, cast);
  return this;
};

/** @private Wrap the data property with an initialization hook. */
pv.Layout.prototype.bind = function() {
  pv.Mark.prototype.bind.call(this);
  var binds = this.binds, data = binds.data, value = data.value;
  binds.data = {
    id: data.id,
    type: data.type | 1,
    value: data.type & 1
        ? function() { var x = value.apply(this, arguments); this.init(x); return x; }
        : function() { this.init(value); return value; }
  };
};

/** @private Initialization hook after data and defs have been evaluated. */
pv.Layout.prototype.init = function() {};
