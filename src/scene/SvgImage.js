pv.SvgScene.image = function(scenes) {
  var e = scenes.$g.firstChild;
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];

    /* visible */
    if (!s.visible) continue;

    /* fill */
    e = this.fill(e, scenes, i);

    /* image */
    if (s.image) {
      e = this.expect(e, "foreignObject", {
          "cursor": s.cursor,
          "x": s.left,
          "y": s.top,
          "width": s.width,
          "height": s.height
        });
      var c = e.firstChild || e.appendChild(document.createElementNS(this.xhtml, "canvas"));
      c.$scene = {scenes:scenes, index:i};
      c.style.width = s.width;
      c.style.height = s.height;
      c.width = s.imageWidth;
      c.height = s.imageHeight;
      c.getContext("2d").putImageData(s.image, 0, 0);
    } else {
      e = this.expect(e, "image", {
          "preserveAspectRatio": "none",
          "cursor": s.cursor,
          "x": s.left,
          "y": s.top,
          "width": s.width,
          "height": s.height
        });
      e.setAttributeNS(this.xlink, "href", s.url);
    }
    e = this.append(e, scenes, i);

    /* stroke */
    e = this.stroke(e, scenes, i);
  }
  return e;
};
