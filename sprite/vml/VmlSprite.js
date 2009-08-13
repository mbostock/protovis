/**
 *
 */
pv.VmlSprite = function() {};
pv.VmlSprite.prototype = pv.extend(pv.Sprite);

/**
 *
 */
pv.VmlSprite.init = function() {
  document.createStyleSheet().addRule("v\\:*", "behavior:url(#default#VML);");
  document.namespaces.add("v", "urn:schemas-microsoft-com:vml");
  this.init = function() {};
};

/**
 *
 */
pv.VmlSprite.prototype.create = function(type) {
  pv.VmlSprite.init();
  return document.createElement(type);
};

/**
 *
 */
pv.VmlSprite.prototype.insert = function(type) {
  var e = (typeof type == "string") ? this.create(type) : type;
  var s = this.previousSibling; while (s && !s.$dom) s = s.previousSibling;
  this.parent.$dom.root.insertBefore(e, s ? (this.reverse ? s.$dom.root : s.$dom.root.nextSibling) : null);
  return e;
};
