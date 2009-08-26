// TODO don't populate default attributes?
// TODO events

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
  if (!scenes.length) return;
  if ((scenes[0].reverse)
      && (scenes.type != "line")
      && (scenes.type != "area")) {
    scenes.reverse();
  }
  this[scenes.type](scenes);
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

/** TODO */
pv.SvgScene.parentNode = function(scenes) {
  return scenes.parent ? scenes.parent[scenes.parentIndex].scene.g : null;
};

/** TODO */
pv.SvgScene.cache = function(s, type, name) {
  if (!s.scene) return (s.scene = {})[name] = this.create(type);
  var e = s.scene[name];
  if (e) {
    while (e.lastChild) e.removeChild(e.lastChild);
    return e;
  }
  return s.scene[name] = this.create(type);
};
