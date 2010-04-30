/**
 * Constructs a new, empty layout with default properties. Layouts are not
 * typically constructed directly; instead, a concrete subclass is added to an
 * existing panel via {@link pv.Mark#add}.
 *
 * @class Represents an abstract layout, encapsulating a visualization technique
 * such as a streamgraph or treemap. Layouts are themselves containers,
 * extending from {@link pv.Panel}, and defining a set of mark prototypes as
 * children. These mark prototypes provide default properties that together
 * implement the given visualization technique.
 *
 * <p>Layouts do not initially contain any marks; any exported marks (such as a
 * network layout's <tt>link</tt> and <tt>node</tt>) are intended to be used as
 * prototypes. By adding a concrete mark, such as a {@link pv.Bar}, to the
 * appropriate mark prototype, the mark is added to the layout and inherits the
 * given properties. This approach allows further customization of the layout,
 * either by choosing a different mark type to add, or more simply by overriding
 * some of the layout's defined properties.
 *
 * <p>Each concrete layout, such as treemap or circle-packing, has different
 * behavior and may export different mark prototypes, depending on what marks
 * are typically needed to render the desired visualization. Therefore it is
 * important to understand how each layout is structured, such that the provided
 * mark prototypes are used appropriately.
 *
 * <p>In addition to the mark prototypes, layouts may define custom properties
 * that affect the overall behavior of the layout. For example, a treemap layout
 * might use a property to specify which layout algorithm to use. These
 * properties are just like other mark properties, and can be defined as
 * constants or as functions. As with panels, the data property can be used to
 * replicate layouts, and properties can be defined to in terms of layout data.
 *
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
 *
 * @param {string} name the property name.
 * @param {function} [cast] the cast function for this property.
 */
pv.Layout.prototype.property = function(name, cast) {
  if (!this.hasOwnProperty("properties")) {
    this.properties = pv.extend(this.properties);
  }
  this.properties[name] = true;
  this.propertyMethod(name, false, pv.Mark.cast[name] = cast);
  return this;
};
