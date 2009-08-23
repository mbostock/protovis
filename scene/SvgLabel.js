pv.SvgScene.label = function(scenes) {
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i], d = s.scene;
    switch (s.state) {
      case pv.Scene.State.CREATE: {
        // TODO only create text when visible?
        d = s.scene = {};
        d.text = this.create("text");
        d.text.setAttribute("pointer-events", "none");
        d.text.appendChild(document.createTextNode(""));
        s.state = pv.Scene.State.UPDATE;
        // fall-through
      }
      case pv.Scene.State.UPDATE: {
        // TODO only re-append when created or resorted
        // TODO title property

        if (s.visible) {
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

          d.text.firstChild.nodeValue = s.text;
          d.text.setAttribute("x", x);
          d.text.setAttribute("y", y);
          d.text.setAttribute("dy", dy);
          d.text.setAttribute("text-anchor", anchor);
          d.text.setAttribute("transform",
              "translate(" + s.left + "," + s.top + ")"
              + (s.textAngle ? " rotate(" + 180 * s.textAngle / Math.PI + ")" : ""));
          var fill = pv.color(s.textStyle);
          d.text.setAttribute("fill", fill.color);
          d.text.setAttribute("fill-opacity", fill.opacity);
          d.text.style.font = s.font;
          d.text.style.textShadow = s.textShadow;
          d.text.style.display = "";
        } else {
          d.text.style.display = "none";
        }
        scenes.parent.scene.g.appendChild(d.text);
        break;
      }
      case pv.Scene.State.DELETE: {
        // TODO more efficient removal?
        scenes.splice(i--, 1);
        scenes.parent.scene.g.removeChild(d.text);
        break;
      }
    }
  }
};
