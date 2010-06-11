<html>
  <head>
    <title>Protovis - Polar Coordinates</title>
    <link type="text/css" rel="stylesheet" href="../style.css?3.2"/>
    <link type="text/css" rel="stylesheet" href="../ex/syntax.css?3.2"/>
    <script type="text/javascript" src="../protovis-r3.2.js"></script>
  </head>
  <body>

    <div class="title">
      <div class="subtitle">
        A graphical toolkit for visualization
      </div>
      <a href="../">Protovis</a>
    </div>

    <div class="head">
      <div class="section">
        <a href="../">Overview</a>
      </div>
      <div class="section">
        <a href="../ex/">Examples</a>
      </div>
      <div class="section selected">
        <a href="../docs/">Documentation</a>
      </div>
      <div class="section">
        <a href="http://protovis-js.googlecode.com/files/protovis-3.2.zip">Download</a>
      </div>
    </div>
    <div class="subhead">
      <div class="section">
        <a href="./">Index</a>
      </div>
    </div>

    <div class="body">
      <h1>Polar Coordinates</h1>

      <h2>Overview</h2>

      <i><a href="http://en.wikipedia.org/wiki/Polar_coordinate_system">Polar
      coordinates</a></i> are an alternative to <i><a
      href="http://en.wikipedia.org/wiki/Cartesian_coordinate_system"
      >Cartesian coordinates</a></i>. Rather than laying out <i>x</i> and
      <i>y</i> on a rectangular grid, polar coordinates specify position in
      terms of an angle &theta; and radius &rho;. In Protovis version 3.2 and
      prior, limited support for polar coordinates was available via the wedge
      mark type. In addition, many layout implementations supported
      &ldquo;radial&rdquo; orientations which internally compute positions in
      polar coordinates; however, the layouts had to transform these positions
      to Cartesian coordinates (e.g., for <a href="../ex/tree.html">node-link
      diagrams</a>).

      <p>To make it easier to implement many popular and aesthetically-pleasing
      visualization designs, version 3.3 introduces new radial mark types that
      are positioned in polar coordinates. For example, <a
      href="http://eagereyes.org/applications/itunes-10-billion-song-downloads-visualization"
      >radial line</a> charts and <a href="http://hint.fm/projects/flickr/"
      >radial stacked area</a> charts are now easy to implement, without tedious
      trigonometry!

      <h2>Design</h2>

      Radial mark types are subclasses of normal mark types. To switch to polar
      coordinates, simply replace the given mark type with the corresponding
      polar version:<ul>

      <li><tt>pv.Bar</tt> &rarr; <tt>pv.Bar.Radial</tt> (formerly <tt>pv.Wedge</tt>)</li>
      <li><tt>pv.Dot</tt> &rarr; <tt>pv.Dot.Radial</tt></li>
      <li><tt>pv.Line</tt> &rarr; <tt>pv.Line.Radial</tt></li>
      <li><tt>pv.Area</tt> &rarr; <tt>pv.Area.Radial</tt></li>
      <li><tt>pv.Rule</tt> &rarr; <tt>pv.Rule.Radial</tt></li>

      </ul>

      <p>Note that the wedge type is now an alias for a radial bar
      (<tt>pv.Bar.Radial</tt>). In might be possible to provide radial mark
      types for both panel and image as well, but this is more likely to be more
      confusing than useful, so we have not included it in 3.3.

      <h3>Origin</h3>

      All polar coordinates are relative to an origin. The origin is specified
      via the standard (Cartesian) positional properties <tt>left</tt>,
      <tt>top</tt>, <tt>right</tt> and <tt>bottom</tt>. If not specified, the
      origin is implicitly the center of the enclosing panel. This is equivalent
      to specifying <tt>left(width / 2)</tt> and <tt>top(height / 2)</tt>.

      <h3>Marks</h3>

      A <b>bar</b> is a two-dimensional region in &theta; and &rho;. The
      &theta;-span is specified in terms of <tt>startAngle</tt>,
      <tt>endAngle</tt> and <tt>angle</tt>, while the &rho;-span is specified in
      terms of <tt>innerRadius</tt>, <tt>outerRadius</tt> and <tt>radius</tt>.
      The default <tt>startAngle</tt> and <tt>innerRadius</tt> are 0; the
      default <tt>endAngle</tt> is 2&pi;; the default <tt>outerRadius</tt> is
      the inferred &ldquo;radius&rdquo; of the parent panel: <tt>Math.min(width,
      height) / 2</tt>.

      <p>As with wedges in 3.2 and prior, these properties can be implied:
      <tt>angle</tt> = <tt>endAngle</tt> - <tt>startAngle</tt>, and
      <tt>radius</tt> = <tt>outerRadius</tt> - <tt>innerRadius</tt>. For
      example, if <tt>startAngle</tt> and <tt>angle</tt> are specified, the
      implied value of <tt>endAngle</tt> is <tt>startAngle</tt> +
      <tt>angle</tt>. These implied values also apply consistently to other
      marks, such as lines and dots, even if those marks are represent points in
      &theta; or &rho;, to facilitate inheritance.

      <p>A <b>rule</b> is a one-dimensional region in either constant-&theta; or
      constant-&rho;. A constant-&theta; rule is specified using <tt>angle</tt>.
      Similar to Cartesian rules, the &rho;-span can be optionally specified
      using a combination of <tt>innerRadius</tt>, <tt>outerRadius</tt>,
      <tt>radius</tt>. If the &rho;-span is not specified, it defaults to [0,
      <i>r</i>], where <i>r</i> is the inferred &ldquo;radius&rdquo; of the
      parent panel: <tt>Math.min(width, height) / 2</tt>. A constant-&rho; rule
      is specified using <tt>radius</tt>. The &theta;-span can be optionally
      specified using a combination of <tt>startAngle</tt>, <tt>endAngle</tt>
      and <tt>angle</tt>. If the &rho;-span is not specified, it defaults to [0,
      2&pi;].

      <p>Note that, as with Cartesian rules, the orientation is inferred from
      the set of defined properties. The values <tt>null</tt> and 0 are not
      equivalent: a null value specifies that the property is undefined. This
      can sometimes cause confusion if a rule inherits from another mark (and
      this is true already of Cartesian rules). Thus, if the specified
      <tt>angle</tt> is &pi;, a <tt>startAngle</tt> of 0 is different from a
      <tt>startAngle</tt> of null, since the former implied a &theta;-span of
      [0, &pi;] rather than constant-&theta;.

      <p>A <b>dot</b> or a <b>line</b> segment is a point in &theta; and &rho;.
      Typically, the point is specified using only <tt>angle</tt> and
      <tt>radius</tt>. However, the point is actually determined from the
      <tt>endAngle</tt> and <tt>outerRadius</tt>, while the <tt>startAngle</tt>
      and <tt>innerRadius</tt> default to 0. This allows a line or dot to be
      derived from a radial bar or area. If desired, the position can be
      specified explicitly in terms of <tt>endAngle</tt> and
      <tt>outerRadius</tt>, but this is not required.

      <p>Note that dots in version 3.2 and prior used the <tt>angle</tt> and
      <tt>radius</tt> properties to orient the shape relative to the dot&rsquo;s
      position. These properties have been renamed to <tt>shapeAngle</tt> and
      <tt>shapeRadius</tt> (using a prefix convention similar to
      <tt>textAngle</tt>, <tt>textStyle</tt>, etc.). For consistency, the
      <tt>size</tt> property has also been renamed to <tt>shapeSize</tt>.

      <p>An <b>area</b> segment is a one-dimensional region in &theta; and &rho;.
      An area segment is like a rule; each span is typically constant-&theta; or
      constant-&rho;. While it is technically possible for the span to vary in
      both &theta; and &rho;, this is rarely used. Each span thus specifies two
      points in &#x27e8;&theta;, &rho;&#x27e9;: the start point and the end
      point. The <tt>angle</tt> and <tt>radius</tt> properties default to 0, and
      typically only one of these properties is specified to orient the span in
      constant-&theta; or constant-&rho;.

      <p>A constant-&theta; span is specified using <tt>angle</tt>; the
      &rho;-span is then specified using a combination of <tt>innerRadius</tt>,
      <tt>outerRadius</tt>, <tt>radius</tt>. A constant-&rho; span is specified
      using <tt>angle</tt>; the &theta;-span is then specified using a
      combination of <tt>startAngle</tt>, <tt>endAngle</tt> and <tt>angle</tt>.
      Regardless of orientation, the start point is always
      &#x27e8;<tt>startAngle</tt>, <tt>innerRadius</tt>&#x27e9; and the end
      point is &#x27e8;<tt>endAngle</tt>, <tt>outerRadius</tt>&#x27e9;.

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
