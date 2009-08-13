pv.SvgSprite = function() {};

pv.SvgSprite.prototype.create = function(type) {
  return document.createElementNS(pv.ns.svg, type);
};

pv.SvgSprite.prototype.updateAll = function(siblings) {
  for (var i = 0; i < siblings.length; i++) {
    siblings[i].update();
  }
};

/**
 * Updates the display for the specified mark instance <tt>s</tt> in the scene
 * graph. This implementation handles basic properties for all mark types, such
 * as visibility, cursor and title tooltip. Concrete mark types should override
 * this method to specify how marks are rendered.
 *
 * @param s a node in the scene graph; the instance of the mark to update.
 */
pv.SvgSprite.prototype.update = function() {};

/**
 * Creates and inserts a new SVG element of the specified type. The element is
 * inserted after the last SVG element for this mark, if any.
 *
 * @param {string} type the SVG element type, such as "line".
 * @returns the new SVG element.
 */
pv.SvgSprite.prototype.insert = function(type) {
  var e = (typeof type == "string") ? this.create(type) : type;
  this.parent.$svg.g.appendChild(e); // TODO cursor
  return e;
};

/**
 * Removes the specified mark instance from the SVG image. This method depends
 * on the <tt>svg</tt> property of the scene graph node. If the specified mark
 * instance was not present in the SVG image (for example, because it was not
 * visible), this method has no effect.
 *
 * @param s a node in the scene graph; the instance of the mark to clear.
 */
pv.SvgSprite.prototype.dispose = function() {
  var svg = this.$svg;
  if (svg) {
    var root = svg.root.$title || svg.root;
    root.parentNode.removeChild(root);
    delete this.$svg;
  }
};

/**
 *
 */
pv.SvgSprite.prototype.apply = function(e, map) {
  function set(e, key, value, ns) {
    if (!ns) ns = null;
    value ? e.setAttributeNS(ns, key, value) : e.removeAttributeNS(ns, key);
  }
  for (var key in map) {
    var value = map[key];
    switch (key) {
      case "href": set(e, key, value, pv.ns.xlink); break;
      case "title": {
        if (!e.$title && value) {
          e.$title = this.create("a");
          e.parentNode.replaceChild(e.$title, e);
          e.$title.appendChild(e);
        }
        if (e.$title) set(e.$title, key, value, pv.ns.xlink);
        break;
      }
      case "fill":
      case "stroke": {
        var color = pv.color(value);
        e.setAttribute(key, color.color);
        ((0 < color.opacity) && (color.opacity < 1))
            ? e.setAttribute(key + "-opacity", color.opacity)
            : e.removeAttribute(key + "-opacity");
        break;
      }
      default: set(e, key, value); break;
    }
  }
};

pv.SvgSprite.prototype.listen = function(e) {
  // TODO clear event listeners
  for (var type in this.event) e["on" + type] = this.event[type];
};
