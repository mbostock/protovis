/**
 * @class
 */
pv.Scene = document.implementation.hasFeature(
    "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")
    ? pv.SvgScene : pv.VmlScene;

/**
 * Enumerates the different states of scene nodes. If the state is undefined, it
 * is assumed to be <tt>CREATE</tt>. After a scene node is updated, its state is
 * changed to <tt>UPDATE</tt>. To delete a scene node, set the state to
 * <tt>DELETE</tt>; the corresponding array entry will be removed on update.
 */
pv.Scene.State = {
 /** TODO */
 CREATE: 0,
 /** TODO */
 UPDATE: 1,
 /** TODO */
 DELETE: 2
};

/**
 *
 *
 * @method pv.Scene.updateAll
 * @param scenes {array} array of scene nodes to update.
 */
