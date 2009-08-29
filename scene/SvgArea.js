// TODO different stroke behavior for area segment?

pv.SvgScene.area = function(scenes) {

  /*
   * Rather than using the default group element, since we know areas only
   * contain a single polygon element, use that instead. However, since we won't
   * be appending children to the group element, instead assume it will be
   * invisible by default.
   */
  var area = this.cache(scenes, "polygon", "area");
  area.setAttribute("display", "none");
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

  area.removeAttribute("display");
  area.setAttribute("cursor", s.cursor);
  area.setAttribute("points", p1 + p2);
  area.setAttribute("fill", fill.color);
  area.setAttribute("fill-opacity", fill.opacity);
  area.setAttribute("stroke", stroke.color);
  area.setAttribute("stroke-opacity", stroke.opacity);
  area.setAttribute("stroke-width", s.lineWidth);
  if (!area.parentNode) {
    this.listen(area, scenes, 0);
    this.parentNode(scenes).appendChild(this.title(area, s));
  }
};

pv.SvgScene.areaSegment = function(scenes) {
  var g = this.group(scenes);
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
    this.listen(segment, scenes, i);
    g.appendChild(this.title(segment, s1));
  }
};
