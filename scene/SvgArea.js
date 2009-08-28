// TODO different stroke behavior for area segment?

pv.SvgScene.area = function(scenes) {
  if (!scenes.length) return;
  var s = scenes[0];

  /* segmented */
  if (s.segmented) {
    this.areaSegment(scenes);
    return;
  }

  /* visible */
  if (!s.visible) return;
  var fill = pv.color(s.fillStyle), stroke = pv.color(s.strokeStyle);
  if (!fill.opacity && !stroke.opacity) return;

  /* points */
  var p1 = "", p2 = "";
  for (var i = 0, j = scenes.length - 1; j >= 0; i++, j--) {
    var si = scenes[i], sj = scenes[j];
    p1 += si.left + "," + si.top + " ";
    p2 += (sj.left + sj.width) + "," + (sj.top + sj.height) + " ";
  }

  var polygon = this.cache(s, "polygon", "area");
  polygon.setAttribute("cursor", s.cursor);
  polygon.setAttribute("points", p1 + p2);
  polygon.setAttribute("fill", fill.color);
  polygon.setAttribute("fill-opacity", fill.opacity);
  polygon.setAttribute("stroke", stroke.color);
  polygon.setAttribute("stroke-opacity", stroke.opacity);
  polygon.setAttribute("stroke-width", s.lineWidth);
  this.parentNode(scenes).appendChild(this.title(polygon, s));

  /* events */
  this.listen(polygon, scenes, 0);
};

pv.SvgScene.areaSegment = function(scenes) {
  var parent = this.parentNode(scenes);
  for (var i = 0, n = scenes.length - 1; i < n; i++) {
    var s1 = scenes[i], s2 = scenes[i + 1];

    /* visible */
    if (!s1.visible || !s2.visible) continue;
    var fill = pv.color(s1.fillStyle), stroke = pv.color(s1.strokeStyle);
    if (!fill.opacity && !stroke.opacity) continue;

    /* points */
    var p = s1.left + "," + s1.top + " "
        + s2.left + "," + s2.top + " "
        + (s2.left + s2.width) + "," + (s2.top + s2.height) + " "
        + (s1.left + s1.width) + "," + (s1.top + s1.height);

    var segment = this.cache(s1, "polygon", "segment");
    segment.setAttribute("cursor", s1.cursor);
    segment.setAttribute("points", p);
    segment.setAttribute("fill", fill.color);
    segment.setAttribute("fill-opacity", fill.opacity);
    segment.setAttribute("stroke", stroke.color);
    segment.setAttribute("stroke-opacity", stroke.opacity);
    segment.setAttribute("stroke-width", s1.lineWidth);
    parent.appendChild(this.title(segment, s1));

    /* events */
    this.listen(segment, scenes, i);
  }
};
