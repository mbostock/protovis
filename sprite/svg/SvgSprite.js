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

// TODO events

/**
 * Removes the specified mark instance from the SVG image. This method depends
 * on the <tt>svg</tt> property of the scene graph node. If the specified mark
 * instance was not present in the SVG image (for example, because it was not
 * visible), this method has no effect.
 *
 * @param s a node in the scene graph; the instance of the mark to clear.
 */
pv.SvgSprite.prototype.dispose = function() {};

/**
 *
 */
pv.SvgSprite.prototype.apply = function(element, map) {
  for (var key in map) {
    switch (key) {
      case "href":
      case "title": {
        element.setAttributeNS(pv.ns.xlink, key, map[key]);
        break;
      }
      case "fill":
      case "stroke": {
        var color = pv.color(map[key]);
        element.setAttribute(key, color.color);
        element.setAttribute(key + "-opacity", color.opacity);
        break;
      }
      default: element.setAttribute(key, map[key]); break;
    }
  }
};
