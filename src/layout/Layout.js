/**
 * @class
 * @extends pv.Panel
 */
pv.Layout = function() {
  pv.Panel.call(this);
};

pv.Layout.prototype = pv.extend(pv.Panel);

/**
 * @private Defines a local property with the specified name and cast. Note that
 * although the property method is only defined locally, the cast function is
 * global, which is necessary since properties are inherited!
 */
pv.Layout.prototype.property = function(name, cast) {
  if (!this.hasOwnProperty("properties")) {
    this.properties = pv.extend(this.properties);
  }
  this.properties[name] = true;
  this.propertyMethod(name, false, pv.Mark.cast[name] = cast);
  return this;
};
