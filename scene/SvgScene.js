// TODO don't populate default attributes?
// TODO reverse property
// TODO events

// TODO If I store firstChild and lastChild for every mark scenes array, will it
// be possible to find the right insertion point to create new nodes on update?

/**
 * @namespace
 */
pv.SvgScene = {};

/**
 * Updates the display for the specified array of scene nodes.
 *
 * @param scenes {array} an array of scene nodes.
 */
pv.SvgScene.updateAll = function(scenes) {
  if (scenes.length) this[scenes.mark.type](scenes);
};

/**
 * Creates a new SVG element of the specified type.
 *
 * @param type {string} an SVG element type, such as "rect".
 * @return a new SVG element.
 */
pv.SvgScene.create = function(type) {
  return document.createElementNS(pv.ns.svg, type);
};

/**
 * Applies a title tooltip to the specified element <tt>e</tt>, using the
 * <tt>title</tt> property of the specified scene node <tt>s</tt>. Note that
 * this implementation does not create an SVG <tt>title</tt> element as a child
 * of <tt>e</tt>; although this is the recommended standard, it is only
 * supported in Opera. Instead, an anchor element is created around the element
 * <tt>e</tt>, and the <tt>xlink:title</tt> attribute is set accordingly.
 *
 * @param e an SVG element.
 * @param s a scene node.
 */
pv.SvgScene.title = function(e, s) {
  if (!s.title) return e;
  var a = this.create("a");
  a.setAttributeNS(pv.ns.xlink, "title", s.title);
  a.appendChild(e);
  return a;
};
