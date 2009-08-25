pv.SvgScene.line = function(scenes) {
  if (!scenes.length) return;
  var s = scenes[0];

  /* visible */
  if (!s.visible) return;

  /* fill, stroke */
  var fill = pv.color(s.fillStyle), stroke = pv.color(s.strokeStyle);
  if (!fill.opacity && !stroke.opacity) return;

  /* points */
  var p = "";
  for (var i = 0; i < scenes.length; i++) {
    var si = scenes[i];
    p += si.left + "," + si.top + " ";
  }

  var polyline = this.create("polyline");
  polyline.setAttribute("cursor", s.cursor);
  polyline.setAttribute("points", p);
  polyline.setAttribute("fill", fill.color);
  polyline.setAttribute("fill-opacity", fill.opacity);
  polyline.setAttribute("stroke", stroke.color);
  polyline.setAttribute("stroke-opacity", stroke.opacity);
  polyline.setAttribute("stroke-width", s.lineWidth);
  this.parentNode(scenes).appendChild(this.title(polyline, s));
};
