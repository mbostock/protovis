/**
 * Returns a new drag behavior to be registered on mousedown events.
 *
 * @class Implements interactive dragging starting with mousedown events.
 * Register this behavior on marks that should be draggable by the user, such as
 * the selected region for brushing and linking. This behavior can be used in
 * tandom with {@link pv.Behavior.select} to allow the selected region to be
 * dragged interactively.
 *
 * <p>After the initial mousedown event is triggered, this behavior listens for
 * mousemove and mouseup events on the window. This allows dragging to continue
 * even if the mouse temporarily leaves the mark that is being dragged, or even
 * the root panel.
 *
 * <p>This behavior requires that the data associated with the mark being
 * dragged have <tt>x</tt> and <tt>y</tt> attributes that correspond to the
 * mark's location in pixels. The mark's positional properties are not set
 * directly by this behavior; instead, the positional properties should be
 * defined as:
 *
 * <pre>    .left(function(d) d.x)
 *     .top(function(d) d.y)</pre>
 *
 * Thus, the behavior does not move the mark directly, but instead updates the
 * mark position by updating the underlying data. Note that if the positional
 * properties are defined with bottom and right (rather than top and left), the
 * drag behavior will be inverted, which will confuse users!
 *
 * <p>The drag behavior is bounded by the parent panel; the <tt>x</tt> and
 * <tt>y</tt> attributes are clamped such that the mark being dragged does not
 * extend outside the enclosing panel's bounds. To facilitate this, the drag
 * behavior also queries for <tt>dx</tt> and <tt>dy</tt> attributes on the
 * underlying data, to determine the dimensions of the bar being dragged. For
 * non-rectangular marks, the drag behavior simply treats the mark as a point,
 * which means that only the mark's center is bounded.
 *
 * <p>The mark being dragged is automatically re-rendered for each mouse event
 * as part of the drag operation. In addition, a <tt>fix</tt> attribute is
 * populated on the mark, which allows visual feedback for dragging. For
 * example, to change the mark fill color while dragging:
 *
 * <pre>    .fillStyle(function(d) d.fix ? "#ff7f0e" : "#aec7e8")</pre>
 *
 * In some cases, such as with network layouts, dragging the mark may cause
 * related marks to change, in which case additional marks may also need to be
 * rendered. This can be accomplished by listening for the drag
 * psuedo-events:<ul>
 *
 * <li>dragstart (on mousedown)
 * <li>drag (on mousemove)
 * <li>dragend (on mouseup)
 *
 * </ul>For example, to render the parent panel while dragging, thus
 * re-rendering all sibling marks:
 *
 * <pre>    .event("mousedown", pv.Behavior.drag())
 *     .event("drag", function() this.parent)</pre>
 *
 * This behavior may be enhanced in the future to allow more flexible
 * configuration of drag behavior.
 *
 * @extends pv.Behavior
 * @see pv.Behavior
 * @see pv.Behavior.select
 * @see pv.Layout.force
 */
pv.Behavior.drag = function() {
  var scene, // scene context
      index, // scene context
      p, // particle being dragged
      v1, // initial mouse-particle offset
      max;

  /** @private */
  function mousedown(d) {
    index = this.index;
    scene = this.scene;
    var m = this.mouse();
    v1 = ((p = d).fix = pv.vector(d.x, d.y)).minus(m);
    max = {
      x: this.parent.width() - (d.dx || 0),
      y: this.parent.height() - (d.dy || 0)
    };
    scene.mark.context(scene, index, function() { this.render(); });
    pv.Mark.dispatch("dragstart", scene, index);
  }

  /** @private */
  function mousemove() {
    if (!scene) return;
    scene.mark.context(scene, index, function() {
        var m = this.mouse();
        p.x = p.fix.x = Math.max(0, Math.min(v1.x + m.x, max.x));
        p.y = p.fix.y = Math.max(0, Math.min(v1.y + m.y, max.y));
        this.render();
      });
    pv.Mark.dispatch("drag", scene, index);
  }

  /** @private */
  function mouseup() {
    if (!scene) return;
    p.fix = null;
    scene.mark.context(scene, index, function() { this.render(); });
    pv.Mark.dispatch("dragend", scene, index);
    scene = null;
  }

  pv.listen(window, "mousemove", mousemove);
  pv.listen(window, "mouseup", mouseup);
  return mousedown;
};
