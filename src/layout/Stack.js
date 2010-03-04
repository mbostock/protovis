/**
 * Returns a new stack layout.
 *
 * @class A layout for stacking marks vertically or horizontally, using the
 * <i>cousin</i> instance. This layout is designed to be used for one of the
 * four positional properties in the box model, and changes behavior depending
 * on the property being evaluated:<ul>
 *
 * <li>bottom: cousin.bottom + cousin.height
 * <li>top: cousin.top + cousin.height
 * <li>left: cousin.left + cousin.width
 * <li>right: cousin.right + cousin.width
 *
 * </ul>If no cousin instance is available (for example, for first instance),
 * the specified offset is used. If no offset is specified, zero is used. For
 * example,
 *
 * <pre>vis.add(pv.Panel)
 *     .data([[1, 1.2, 1.7, 1.5, 1.7],
 *            [.5, 1, .8, 1.1, 1.3],
 *            [.2, .5, .8, .9, 1]])
 *   .add(pv.Area)
 *     .extend(pv.Layout.stack())
 *     .height(function(d) d * 40)
 *     .left(function() this.index * 35);</pre>
 *
 * specifies a vertically-stacked area chart.
 *
 * @returns {pv.Layout.stack} a stack property function.
 * @see pv.Mark#cousin
 */
pv.Layout.stack = function() {
  return new pv.Layout.Stack();
};

/** @ignore */
pv.Layout.Stack = function() {
  pv.Layout.call(this);
  var size = {left: "width", right: "width", top: "height", bottom: "height"};

  /** @private */
  function orient(side) {
    return function() {
        var s = this.scene[this.index], parent = this.parent, c, p;
        if (s.orient != side) return null;
        for (var i = parent.index - 1; i >= 0; i--) {
          p = parent.scene[i];
          if (p.visible) {
            c = p.children[this.childIndex][this.index];
            break;
          }
        }
        return c ? c[s.orient] + c[size[s.orient]] : s.offset;
      };
  }

  this.orient("bottom")
      .offset(0)
      .propertyValue("data", pv.identity)
      .propertyValue("bottom", orient("bottom"))
      .propertyValue("top", orient("top"))
      .propertyValue("left", orient("left"))
      .propertyValue("right", orient("right"));
};

pv.Layout.Stack.prototype = pv.extend(pv.Layout)
    .property("orient", String)
    .property("offset", Number);

/**
 * Sets or gets the orientation. The default orientation is "left", which means
 * that ...<ul>
 *
 * <li>left - left-to-right.
 * <li>right - right-to-left.
 * <li>top - top-to-bottom.
 * <li>bottom - bottom-to-top.
 * <li>radial - radially, with the root at the center.</ul>
 *
 * @param {string} v the new orientation.
 * @function
 * @name pv.Layout.stack.prototype.orient
 * @returns {pv.Layout.stack} this, or the current orientation.
 */

/**
 * Sets the offset for this stack layout. The offset can either be specified as
 * a function or as a constant. If a function, the function is invoked in the
 * same context as a normal property function: <tt>this</tt> refers to the mark,
 * and the arguments are the full data stack. By default the offset is zero.
 *
 * @function
 * @name pv.Layout.stack.prototype.offset
 * @param {function} f offset function, or constant value.
 * @returns {pv.Layout.stack} this.
 */
