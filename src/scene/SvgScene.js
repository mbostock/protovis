/**
 * @private
 * @namespace
 */
pv.Scene = pv.SvgScene = {
  /* Various namespaces. */
  svg: "http://www.w3.org/2000/svg",
  xmlns: "http://www.w3.org/2000/xmlns",
  xlink: "http://www.w3.org/1999/xlink",
  xhtml: "http://www.w3.org/1999/xhtml",

  /** The pre-multipled scale, based on any enclosing transforms. */
  scale: 1,

  /** The set of supported events. */
  events: [
    "DOMMouseScroll", // for Firefox
    "mousewheel",
    "mousedown",
    "mouseup",
    "mouseover",
    "mouseout",
    "mousemove",
    "click",
    "dblclick"
  ],

  /** Implicit values for SVG and CSS properties. */
  implicit: {
    svg: {
      "shape-rendering": "auto",
      "pointer-events": "painted",
      "x": 0,
      "y": 0,
      "dy": 0,
      "text-anchor": "start",
      "transform": "translate(0,0)",
      "fill": "none",
      "fill-opacity": 1,
      "stroke": "none",
      "stroke-opacity": 1,
      "stroke-width": 1.5,
      "stroke-linejoin": "miter"
    },
    css: {
      "font": "10px sans-serif"
    }
  }
};

/**
 * Updates the display for the specified array of scene nodes.
 *
 * @param scenes {array} an array of scene nodes.
 */
pv.SvgScene.updateAll = function(scenes) {
  if (scenes.length
      && scenes[0].reverse
      && (scenes.type != "line")
      && (scenes.type != "area")) {
    var reversed = pv.extend(scenes);
    for (var i = 0, j = scenes.length - 1; j >= 0; i++, j--) {
      reversed[i] = scenes[j];
    }
    scenes = reversed;
  }
  this.removeSiblings(this[scenes.type](scenes));
};

/**
 * Creates a new SVG element of the specified type.
 *
 * @param type {string} an SVG element type, such as "rect".
 * @returns a new SVG element.
 */
pv.SvgScene.create = function(type) {
  return document.createElementNS(this.svg, type);
};

/**
 * Expects the element <i>e</i> to be the specified type. If the element does
 * not exist, a new one is created. If the element does exist but is the wrong
 * type, it is replaced with the specified element.
 *
 * @param e the current SVG element.
 * @param type {string} an SVG element type, such as "rect".
 * @param attributes an optional attribute map.
 * @param style an optional style map.
 * @returns a new SVG element.
 */
pv.SvgScene.expect = function(e, type, attributes, style) {
  if (e) {
    if (e.tagName == "a") e = e.firstChild;
    if (e.tagName != type) {
      var n = this.create(type);
      e.parentNode.replaceChild(n, e);
      e = n;
    }
  } else {
    e = this.create(type);
  }
  for (var name in attributes) {
    var value = attributes[name];
    if (value == this.implicit.svg[name]) value = null;
    if (value == null) e.removeAttribute(name);
    else e.setAttribute(name, value);
  }
  for (var name in style) {
    var value = style[name];
    if (value == this.implicit.css[name]) value = null;
    if (value == null) e.style.removeProperty(name);
    else e.style[name] = value;
  }
  return e;
};

/** TODO */
pv.SvgScene.append = function(e, scenes, index) {
  e.$scene = {scenes:scenes, index:index};
  e = this.title(e, scenes[index]);
  if (!e.parentNode) scenes.$g.appendChild(e);
  return e.nextSibling;
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
    a.setAttributeNS(this.xlink, "title", s.title);
    return a;
  }
  if (a) a.parentNode.replaceChild(e, a);
  return e;
};

/** TODO */
pv.SvgScene.dispatch = pv.listener(function(e) {
  var t = e.target.$scene;
  if (t) {
    var type = e.type;

    /* Fixes for mousewheel support on Firefox & Opera. */
    switch (type) {
      case "DOMMouseScroll": {
        type = "mousewheel";
        e.wheel = -480 * e.detail;
        break;
      }
      case "mousewheel": {
        e.wheel = (window.opera ? 12 : 1) * e.wheelDelta;
        break;
      }
    }

    if (pv.Mark.dispatch(type, t.scenes, t.index)) e.preventDefault();
  }
});

/** @private Remove siblings following element <i>e</i>. */
pv.SvgScene.removeSiblings = function(e) {
  while (e) {
    var n = e.nextSibling;
    e.parentNode.removeChild(e);
    e = n;
  }
};

/** @private Do nothing when rendering undefined mark types. */
pv.SvgScene.undefined = function() {};
