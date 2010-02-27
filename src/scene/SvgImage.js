pv.SvgScene.image = function(scenes) {
  var e = scenes.$g.firstChild;
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];

    /* visible */
    if (!s.visible) continue;

    /* fill */
    e = this.fill(e, scenes, i);

    /* image */
    e = this.expect(e, "image", {
        "preserveAspectRatio": "none",
        "cursor": s.cursor,
        "x": s.left,
        "y": s.top,
        "width": s.width,
        "height": s.height
      });
    e.setAttributeNS(this.xlink, "href", s.url);
    e = this.append(e, scenes, i);

    /* stroke */
    e = this.stroke(e, scenes, i);
  }
  return e;
};
