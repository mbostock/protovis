pv.SvgScene.area = function(scenes) {
  if (!scenes.length) return;
  var s = scenes[0];

  /* visible */
  if (!s.visible) return;

  /* fill, stroke */
  var fill = pv.color(s.fillStyle), stroke = pv.color(s.strokeStyle);
  if (!fill.opacity && !stroke.opacity) return;

  /* points */
  var p1 = "", p2 = "";
  for (var i = 0, j = scenes.length - 1; j >= 0; i++, j--) {
    var si = scenes[i], sj = scenes[j];
    p1 += si.left + "," + si.top + " ";
    p2 += (sj.left + sj.width) + "," + (sj.top + sj.height) + " ";
  }

  var polygon = this.create("polygon");
  polygon.setAttribute("cursor", s.cursor);
  polygon.setAttribute("points", p1 + p2);
  polygon.setAttribute("fill", fill.color);
  polygon.setAttribute("fill-opacity", fill.opacity);
  polygon.setAttribute("stroke", stroke.color);
  polygon.setAttribute("stroke-opacity", stroke.opacity);
  polygon.setAttribute("stroke-width", s.lineWidth);
  this.parentNode(scenes).appendChild(this.title(polygon, s));
};
