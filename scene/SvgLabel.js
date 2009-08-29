pv.SvgScene.label = function(scenes) {
  var g = this.group(scenes);
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];

    /* visible */
    if (!s.visible) continue;
    var fill = pv.color(s.textStyle);
    if (!fill.opacity) continue;

    /* text-baseline, text-align */
    var x = 0, y = 0, dy = 0, anchor = "start";
    switch (s.textBaseline) {
      case "middle": dy = ".35em"; break;
      case "top": dy = ".71em"; y = s.textMargin; break;
      case "bottom": y = "-" + s.textMargin; break;
    }
    switch (s.textAlign) {
      case "right": anchor = "end"; x = "-" + s.textMargin; break;
      case "center": anchor = "middle"; break;
      case "left": x = s.textMargin; break;
    }

    var text = this.cache(s, "text", "text");
    text.setAttribute("pointer-events", "none");
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.setAttribute("dy", dy);
    text.setAttribute("text-anchor", anchor);
    text.setAttribute("transform",
        "translate(" + s.left + "," + s.top + ")"
        + (s.textAngle ? " rotate(" + 180 * s.textAngle / Math.PI + ")" : ""));
    text.setAttribute("fill", fill.color);
    text.setAttribute("fill-opacity", fill.opacity);
    text.style.font = s.font;
    text.style.textShadow = s.textShadow;
    text.appendChild(document.createTextNode(s.text));
    g.appendChild(text);
  }
};
