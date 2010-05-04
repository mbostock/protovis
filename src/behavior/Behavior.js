/**
 * Abstract; see an implementing class for details.
 *
 * @class Represents a reusable interaction; applies an interactive behavior to
 * a given mark. Behaviors are themselves functions designed to be used as event
 * handlers. For example, to add pan and zoom support to any panel, say:
 *
 * <pre>    .event("mousedown", pv.Behavior.pan())
 *     .event("mousewheel", pv.Behavior.zoom())</pre>
 *
 * The behavior should be registered on the event that triggers the start of the
 * behavior. Typically, the behavior will take care of registering for any
 * additional events that are necessary. For example, dragging starts on
 * mousedown, while the drag behavior automatically listens for mousemove and
 * mouseup events on the window. By listening to the window, the behavior can
 * continue to receive mouse events even if the mouse briefly leaves the mark
 * being dragged, or even the root panel.
 *
 * <p>Each behavior implementation has specific requirements as to which events
 * it supports, and how it should be used. For example, the drag behavior
 * requires that the data associated with the mark be an object with <tt>x</tt>
 * and <tt>y</tt> attributes, such as a {@link pv.Vector}, storing the mark's
 * position. See an implementing class for details.
 *
 * @see pv.Behavior.drag
 * @see pv.Behavior.pan
 * @see pv.Behavior.point
 * @see pv.Behavior.select
 * @see pv.Behavior.zoom
 * @extends function
 */
pv.Behavior = {};
