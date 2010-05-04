/**
 * Returns a new point behavior to be registered on mousemove events.
 *
 * @class Implements interactive fuzzy pointing, identifying marks that are in
 * close proximity to the mouse cursor. This behavior is an alternative to the
 * native mouseover and mouseout events, improving usability. Rather than
 * requiring the user to mouseover a mark exactly, the mouse simply needs to
 * move near the given mark and a "point" event is triggered. In addition, if
 * multiple marks overlap, the point behavior can be used to identify the mark
 * instance closest to the cursor, as opposed to the one that is rendered on
 * top.
 *
 * <p>The point behavior can also identify the closest mark instance for marks
 * that produce a continuous graphic primitive. The point behavior can thus be
 * used to provide details-on-demand for both discrete marks (such as dots and
 * bars), as well as continuous marks (such as lines and areas).
 *
 * <p>This behavior is implemented by finding the closest mark instance to the
 * mouse cursor on every mousemove event. If this closest mark is within the
 * given radius threshold, which defaults to 30 pixels, a "point" psuedo-event
 * is dispatched to the given mark instance. If any mark were previously
 * pointed, it would receive a corresponding "unpoint" event. These two
 * psuedo-event types correspond to the native "mouseover" and "mouseout"
 * events, respectively. To increase the radius at which the point behavior can
 * be applied, specify an appropriate threshold to the constructor, up to
 * <tt>Infinity</tt>.
 *
 * <p>By default, the standard Cartesian distance is computed. However, with
 * some visualizations it is desirable to consider only a single dimension, such
 * as the <i>x</i>-dimension for an independent variable. In this case, the
 * collapse parameter can be set to collapse the <i>y</i> dimension:
 *
 * <pre>    .event("mousemove", pv.Behavior.point(Infinity).collapse("y"))</pre>
 *
 * <p>This behavior only listens to mousemove events on the assigned panel,
 * which is typically the root panel. The behavior will search recursively for
 * descendant marks to point. If the mouse leaves the assigned panel, the
 * behavior no longer receives mousemove events; an unpoint psuedo-event is
 * automatically dispatched to unpoint any pointed mark. Marks may be re-pointed
 * when the mouse reenters the panel.
 *
 * <p>Panels have transparent fill styles by default; this means that panels may
 * not receive the initial mousemove event to start pointing. To fix this
 * problem, either given the panel a visible fill style (such as "white"), or
 * set the <tt>events</tt> property to "all" such that the panel receives events
 * despite its transparent fill.
 *
 * <p>Note: this behavior does not currently wedge marks.
 *
 * @extends pv.Behavior
 *
 * @param {number} [r] the fuzzy radius threshold in pixels
 * @see <a href="http://www.tovigrossman.com/papers/chi2005bubblecursor.pdf"
 * >"The Bubble Cursor: Enhancing Target Acquisition by Dynamic Resizing of the
 * Cursor's Activation Area"</a> by T. Grossman &amp; R. Balakrishnan, CHI 2005.
 */
pv.Behavior.point = function(r) {
  var unpoint, // the current pointer target
      collapse = null, // dimensions to collapse
      kx = 1, // x-dimension cost scale
      ky = 1, // y-dimension cost scale
      r2 = arguments.length ? r * r : 900; // fuzzy radius

  /** @private Search for the mark closest to the mouse. */
  function search(scene, index) {
    var s = scene[index],
        point = {cost: Infinity};
    for (var i = 0, n = s.visible && s.children.length; i < n; i++) {
      var child = s.children[i], mark = child.mark, p;
      if (mark.type == "panel") {
        mark.scene = child;
        for (var j = 0, m = child.length; j < m; j++) {
          mark.index = j;
          p = search(child, j);
          if (p.cost < point.cost) point = p;
        }
        delete mark.scene;
        delete mark.index;
      } else if (mark.$handlers.point) {
        var v = mark.mouse();
        for (var j = 0, m = child.length; j < m; j++) {
          var c = child[j],
              dx = v.x - c.left - (c.width || 0) / 2,
              dy = v.y - c.top - (c.height || 0) / 2,
              dd = kx * dx * dx + ky * dy * dy;
          if (dd < point.cost) {
            point.distance = dx * dx + dy * dy;
            point.cost = dd;
            point.scene = child;
            point.index = j;
          }
        }
      }
    }
    return point;
  }

  /** @private */
  function mousemove() {
    /* If the closest mark is far away, clear the current target. */
    var point = search(this.scene, this.index);
    if ((point.cost == Infinity) || (point.distance > r2)) point = null;

    /* Unpoint the old target, if it's not the new target. */
    if (unpoint) {
      if (point
          && (unpoint.scene == point.scene)
          && (unpoint.index == point.index)) return;
      pv.Mark.dispatch("unpoint", unpoint.scene, unpoint.index);
    }

    /* Point the new target, if there is one. */
    if (unpoint = point) {
      pv.Mark.dispatch("point", point.scene, point.index);

      /* Unpoint when the mouse leaves the root panel. */
      pv.listen(this.root.canvas(), "mouseout", mouseout);
    }
  }

  /** @private */
  function mouseout(e) {
    if (unpoint && !pv.ancestor(this, e.relatedTarget)) {
      pv.Mark.dispatch("unpoint", unpoint.scene, unpoint.index);
      unpoint = null;
    }
  }

  /**
   * Sets or gets the collapse parameter. By default, the standard Cartesian
   * distance is computed. However, with some visualizations it is desirable to
   * consider only a single dimension, such as the <i>x</i>-dimension for an
   * independent variable. In this case, the collapse parameter can be set to
   * collapse the <i>y</i> dimension:
   *
   * <pre>    .event("mousemove", pv.Behavior.point(Infinity).collapse("y"))</pre>
   *
   * @function
   * @returns {pv.Behavior.point} this, or the current collapse parameter.
   * @name pv.Behavior.point.prototype.collapse
   * @param {string} [x] the new collapse parameter
   */
  mousemove.collapse = function(x) {
    if (arguments.length) {
      collapse = String(x);
      switch (collapse) {
        case "y": kx = 1; ky = 0; break;
        case "x": kx = 0; ky = 1; break;
        default: kx = 1; ky = 1; break;
      }
      return mousemove;
    }
    return collapse;
  };

  return mousemove;
};
