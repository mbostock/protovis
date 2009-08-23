/**
 * @class
 */
pv.Scene = document.implementation.hasFeature(
    "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")
    ? pv.SvgScene : pv.VmlScene;

/**
 *
 *
 * @method pv.Scene.updateAll
 * @param scenes {array} array of scene nodes to update.
 */
