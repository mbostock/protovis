// TODO don't populate default attributes?

/**
 * @private
 * @namespace
 */
pv.Scene = pv.SvgScene = {};

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
    var reversed = pv.extend(scenes);
    for (var i = 0, j = scenes.length - 1; j >= 0; i++, j--) {
      reversed[i] = scenes[j];
    }
    scenes = reversed;
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
  var a = e.parentNode;
  if (a && (a.tagName != "a")) a = null;
  if (s.title) {
    if (!a) {
      a = this.create("a");
      if (e.parentNode) e.parentNode.replaceChild(a, e);
      a.appendChild(e);
    }
    a.setAttributeNS(pv.ns.xlink, "title", s.title);
  } else if (a) {
    a.removeAttributeNS(pv.ns.xlink, "title");
  } else {
    a = e;
  }
  return a;
};

/** TODO */
pv.SvgScene.parentNode = function(scenes) {
  return scenes.parent[scenes.parentIndex].scene.g;
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

/** TODO */
pv.SvgScene.group = function(scenes) {
  var g = this.cache(scenes, "g", "g");
  if (!g.parentNode) this.parentNode(scenes).appendChild(g);
  return g;
};

/** TODO */
pv.SvgScene.listen = function(e, scenes, index) {
  e.$scene = {scenes:scenes, index:index};
};

var pv_SvgScene_mouseover;

/** TODO */
pv.SvgScene.dispatch = function(e) {
  var t;

  /*
   * Firefox doesn't track the mouseout target very well, so here we do some
   * bookkeeping to ensure that when a mouseover event triggers, the previous
   * mouseover target gets a mouseout event.
   */
  if (pv_SvgScene_mouseover) {
    t = pv_SvgScene_mouseover;
    if (e.type == "mouseover") {
      t.scenes.mark.dispatch("mouseout", t.scenes, t.index);
      t = e.target.$scene;
    } else if (e.type == "mouseout") {
      pv_SvgScene_mouseover = null;
    }
  } else {
    t = e.target.$scene;
  }

  if (t) {
    if (e.type == "mouseover") pv_SvgScene_mouseover = t;
    t.scenes.mark.dispatch(e.type, t.scenes, t.index);
    e.preventDefault();
  }
};
