pv.SvgScene = {};

pv.SvgScene.updateAll = function(scenes) {
  if (scenes.length) this[scenes.mark.type](scenes);
};

pv.SvgScene.create = function(type) {
  return document.createElementNS(pv.ns.svg, type);
};
