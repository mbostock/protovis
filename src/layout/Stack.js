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
  var orient = "bottom", // default orientation
      size = "height", // default size
      offset = function() { return 0; }; // default offset

  /** @private Find the previous visible parent instance. */
  function layout() {
    var i = this.parent.index, p, c;
    while ((i-- > 0) && !c) {
      p = this.parent.scene[i];
      if (p.visible) c = p.children[this.childIndex][this.index];
    }
    return c
        ? c[orient] + c[size]
        : offset.apply(this, arguments);
  }

  var mark = new pv.Mark()
      .data(pv.identity)
      .bottom(layout);

  /**
   * Sets or gets the orientation. The default orientation is "left", which
   * means that ...<ul>
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
  mark.orient = function(v) {
    if (arguments.length) {
      mark[orient](null); // delete old property definition
      orient = String(v);
      mark[orient](layout);
      size = (orient == "left") || (orient == "right") ? "width" : "height";
      return this;
    }
    return orient;
  };

  /**
   * Sets the offset for this stack layout. The offset can either be specified
   * as a function or as a constant. If a function, the function is invoked in
   * the same context as a normal property function: <tt>this</tt> refers to the
   * mark, and the arguments are the full data stack. By default the offset is
   * zero.
   *
   * @function
   * @name pv.Layout.stack.prototype.offset
   * @param {function} f offset function, or constant value.
   * @returns {pv.Layout.stack} this.
   */
  mark.offset = function(f) {
    if (arguments.length) {
      offset = (typeof f == "function") ? f : function() { return f; };
      return this;
    }
    return offset;
  };

  return mark;
};
