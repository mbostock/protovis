/**
 * Returns a new select behavior to be registered on mousedown events.
 *
 * @class Implements interactive selecting starting with mousedown events.
 * Register this behavior on panels that should be selectable by the user, such
 * for brushing and linking. This behavior can be used in tandom with
 * {@link pv.Behavior.drag} to allow the selected region to be dragged
 * interactively.
 *
 * <p>After the initial mousedown event is triggered, this behavior listens for
 * mousemove and mouseup events on the window. This allows selecting to continue
 * even if the mouse temporarily leaves the assigned panel, or even the root
 * panel.
 *
 * <p>This behavior requires that the data associated with the mark being
 * dragged have <tt>x</tt>, <tt>y</tt>, <tt>dx</tt> and <tt>dy</tt> attributes
 * that correspond to the mark's location and dimensions in pixels. The mark's
 * positional properties are not set directly by this behavior; instead, the
 * positional properties should be defined as:
 *
 * <pre>    .left(function(d) d.x)
 *     .top(function(d) d.y)
 *     .width(function(d) d.dx)
 *     .height(function(d) d.dy)</pre>
 *
 * Thus, the behavior does not resize the mark directly, but instead updates the
 * selection by updating the assigned panel's underlying data. Note that if the
 * positional properties are defined with bottom and right (rather than top and
 * left), the drag behavior will be inverted, which will confuse users!
 *
 * <p>The select behavior is bounded by the assigned panel; the positional
 * attributes are clamped such that the selection does not extend outside the
 * panel's bounds.
 *
 * <p>The panel being selected is automatically re-rendered for each mouse event
 * as part of the drag operation. This behavior may be enhanced in the future to
 * allow more flexible configuration of select behavior. In some cases, such as
 * with parallel coordinates, making a selection may cause related marks to
 * change, in which case additional marks may also need to be rendered. This can
 * be accomplished by listening for the select psuedo-events:<ul>
 *
 * <li>selectstart (on mousedown)
 * <li>select (on mousemove)
 * <li>selectend (on mouseup)
 *
 * </ul>For example, to render the parent panel while selecting, thus
 * re-rendering all sibling marks:
 *
 * <pre>    .event("mousedown", pv.Behavior.drag())
 *     .event("select", function() this.parent)</pre>
 *
 * This behavior may be enhanced in the future to allow more flexible
 * configuration of the selection behavior.
 *
 * @extends pv.Behavior
 * @see pv.Behavior.drag
 */
pv.Behavior.select = function() {
  var scene, // scene context
      index, // scene context
      r, // region being selected
      m1; // initial mouse position

  /** @private */
  function mousedown(d) {
    index = this.index;
    scene = this.scene;
    m1 = this.mouse();
    r = d;
    r.x = m1.x;
    r.y = m1.y;
    r.dx = r.dy = 0;
    pv.Mark.dispatch("selectstart", scene, index);
  }

  /** @private */
  function mousemove() {
    if (!scene) return;
    scene.mark.context(scene, index, function() {
        var m2 = this.mouse();
        r.x = Math.max(0, Math.min(m1.x, m2.x));
        r.y = Math.max(0, Math.min(m1.y, m2.y));
        r.dx = Math.min(this.width(), Math.max(m2.x, m1.x)) - r.x;
        r.dy = Math.min(this.height(), Math.max(m2.y, m1.y)) - r.y;
        this.render();
      });
    pv.Mark.dispatch("select", scene, index);
  }

  /** @private */
  function mouseup() {
    if (!scene) return;
    pv.Mark.dispatch("selectend", scene, index);
    scene = null;
  }

  pv.listen(window, "mousemove", mousemove);
  pv.listen(window, "mouseup", mouseup);
  return mousedown;
};
