/**
 *
 */
pv.SvgSprite = function() {};
pv.SvgSprite.prototype = pv.extend(pv.Sprite);

/**
 *
 */
pv.SvgSprite.prototype.create = function(type) {
  return document.createElementNS(pv.ns.svg, type);
};

/**
 *
 */
pv.SvgSprite.prototype.insert = function(type) {
  var e = (typeof type == "string") ? this.create(type) : type;
  var s = this.previousSibling; while (s && !s.$dom) s = s.previousSibling;
  this.parent.$dom.g.insertBefore(e, s ? (this.reverse ? s.$dom.root : s.$dom.root.nextSibling) : null);
  return e;
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
