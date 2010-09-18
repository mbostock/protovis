/**
 * Constructs a new mark anchor with default properties.
 *
 * @class Represents an anchor on a given mark. An anchor is itself a mark, but
 * without a visual representation. It serves only to provide useful default
 * properties that can be inherited by other marks. Each type of mark can define
 * any number of named anchors for convenience. If the concrete mark type does
 * not define an anchor implementation specifically, one will be inherited from
 * the mark's parent class.
 *
 * <p>For example, the bar mark provides anchors for its four sides: left,
 * right, top and bottom. Adding a label to the top anchor of a bar,
 *
 * <pre>bar.anchor("top").add(pv.Label);</pre>
 *
 * will render a text label on the top edge of the bar; the top anchor defines
 * the appropriate position properties (top and left), as well as text-rendering
 * properties for convenience (textAlign and textBaseline).
 *
 * <p>Note that anchors do not <i>inherit</i> from their targets; the positional
 * properties are copied from the scene graph, which guarantees that the anchors
 * are positioned correctly, even if the positional properties are not defined
 * deterministically. (In addition, it also improves performance by avoiding
 * re-evaluating expensive properties.) If you want the anchor to inherit from
 * the target, use {@link pv.Mark#extend} before adding. For example:
 *
 * <pre>bar.anchor("top").extend(bar).add(pv.Label);</pre>
 *
 * The anchor defines it's own positional properties, but other properties (such
 * as the title property, say) can be inherited using the above idiom. Also note
 * that you can override positional properties in the anchor for custom
 * behavior.
 *
 * @extends pv.Mark
 * @param {pv.Mark} target the anchor target.
 */
pv.Anchor = function(target) {
  pv.Mark.call(this);
  this.target = target;
  this.parent = target.parent;
};

pv.Anchor.prototype = pv.extend(pv.Mark)
    .property("name", String);

/**
 * The anchor name. The set of supported anchor names is dependent on the
 * concrete mark type; see the mark type for details. For example, bars support
 * left, right, top and bottom anchors.
 *
 * <p>While anchor names are typically constants, the anchor name is a true
 * property, which means you can specify a function to compute the anchor name
 * dynamically. For instance, if you wanted to alternate top and bottom anchors,
 * saying
 *
 * <pre>m.anchor(function() (this.index % 2) ? "top" : "bottom").add(pv.Dot);</pre>
 *
 * would have the desired effect.
 *
 * @type string
 * @name pv.Anchor.prototype.name
 */

/**
 * Returns the anchor target of this mark, if it is derived from an anchor;
 * otherwise returns null. For example, if a label is derived from a bar anchor,
 *
 * <pre>bar.anchor("top").add(pv.Label);</pre>
 *
 * then property functions on the label can refer to the bar via the
 * <tt>anchorTarget</tt> method. This method is also useful for mark types
 * defining properties on custom anchors.
 *
 * @returns {pv.Mark} the anchor target of this mark; possibly null.
 */
pv.Anchor.prototype.anchorTarget = function() {
  return this.target;
};
