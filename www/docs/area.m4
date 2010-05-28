<html>
  <head>
    <title>Protovis - Areas</title>
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
      <h1>Areas</h1>

      <p>The <b>area</b> mark type represents the solid area between two
      polylines that can be filled (via <tt>fillStyle</tt>) and stroked (via
      <tt>strokeStyle</tt>). Unsurprisingly, areas are used most frequently for
      area charts.

      <blockquote>
        See also:
        <a href="../jsdoc/symbols/pv.Area.html">pv.Area API reference</a>

        <br>Examples:
        <a href="../ex/area.html">Area Charts</a>,
        <a href="../ex/stack.html">Stacked Charts</a>,
        <a href="../ex/stream.html">Streamgraphs</a>,
        <a href="../ex/horizon.html">Horizon Graphs</a>,
        <a href="../ex/jobs.html">Job Voyager</a>,
        <a href="../ex/minnesota.html">Minnesota Employment</a>
      </blockquote>

      <h2>Placement</h2>

      <img src="area-horizontal.png">

      <p>An area&rsquo;s position and dimensions are specified through some
      combination of properties:

      <ul>
      <li><tt>top</tt> - the distance from the top edge of the parent panel.</li>
      <li><tt>left</tt> - the distance from the left edge of the parent panel.</li>
      <li><tt>bottom</tt> - the distance from the bottom edge of the parent panel.</li>
      <li><tt>right</tt> - the distance from the right edge of the parent panel.</li>
      <li><tt>width</tt> - the width of the bar.</li>
      <li><tt>height</tt> - the height of the bar.</li>
      </ul>

      <p>Either the <tt>width</tt> or the <tt>height</tt> property must be
      specified, but not both. This determines whether the area is horizontally-
      or vertically-oriented. Unlike most other mark types, with an area, a
      single graphical element (the polygon) is generated. In effect the
      placement is specified as a series of discrete vertical or horizontal
      spans:

      <p><script type="text/javascript+protovis">

new pv.Panel()
    .data([.4,.7,1])
    .lineWidth(1)
    .top(.5)
    .left(.5)
    .right(10.5)
    .bottom(.5)
    .strokeStyle("#999")
    .width(150)
    .height(150)
  .add(pv.Area)
    .data([1, 1.2, 1.7, 1.5, .7, .3])
    .height(function(d) d * 80)
    .bottom(0)
    .left(function() this.index * 25 + 1)
    .fillStyle(function(d, o) "rgba(31, 119, 180, " + o + ")")
  .add(pv.Rule)
    .top(function() this.proto.top())
    .lineWidth(2)
    .strokeStyle("rgb(31, 119, 180)")
  .root.render();

      </script>

      <p>Note that these properties together over-specify the placement of the
      area. In practice, in addition to either the width or the height, only two
      (orthogonal) properties should be specified. This section looks at some
      examples.

      <p>To produce a standard area chart encoding a single variable with
      position&mdash;i.e., for <i>univariate</i> data&mdash;use
      constant <tt>bottom</tt>, equispaced <tt>left</tt> and
      variable <tt>height</tt>:

      <p><table><tr><td>

m4_include(`area-1.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`area-1.js.txt')

      </script></td></tr></table>

      <p>The <tt>left</tt> property is calculated using the automatic
      <tt>index</tt> variable. The index starts at 0 for the first datum, and is
      subsequently incremented by 1. Watch what happens if we use the area to
      encode two variables with position:

      <p><table><tr><td>

m4_include(`area-2.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`area-2.js.txt')

      </script></td></tr></table>

      <h3>Using <tt>left</tt> and <tt>bottom</tt> with <tt>width</tt></h3>

      <p>If a vertical area is desired, use <tt>width</tt> instead
      of <tt>height</tt>, and fix the left edge while making the bottom
      equispaced:

      <p><table><tr><td>

m4_include(`area-3.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`area-3.js.txt')

      </script></td></tr></table>

      <p>It is possible to specify <tt>right</tt> instead of <tt>left</tt>,
      which will result in a horizontal flip; similarly <tt>top</tt> instead
      of <tt>bottom</tt> results in a vertical flip. For examples of this
      alternative specification, see the <a href="line.html">line</a>
      and <a href="bar.html">bar</a> documentation.

      <h3>Using <tt>segmented</tt></h3>

      <p><table><tr><td>

m4_include(`area-4.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`area-4.js.txt')

      </script></td></tr></table>

      <p>Description forthcoming.

      <h3>Using <tt>interpolate</tt></h3>

      <p><table><tr><td>

m4_include(`area-5.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`area-5.js.txt')

      </script></td></tr></table>

      <p>Description forthcoming.

      <h2>Style</h2>

      An area&rsquo;s visual style is specified through three optional
      properties:

      <ul>
      <li><tt>fillStyle</tt> - the fill color.</li>
      <li><tt>strokeStyle</tt> - the stroke color.</li>
      <li><tt>lineWidth</tt> - the stroke thickness.</li>
      </ul>

      <p>By default, a <tt>fillStyle</tt> color is allocated from
      the <tt>category20</tt> <a href="colors.html">color palette</a> for each
      mark. The default <tt>strokeStyle</tt> is null, causing the
      related <tt>lineWidth</tt> to be ignored. Unless the area
      is <i>segmented</i>, these properties cannot be specified on a
      per-instance basis.

      <p>Note that <tt>strokeStyle</tt> strokes the entire perimeter of the area:

      <p><table><tr><td>

m4_include(`area-6.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`area-6.js.txt')

      </script></td></tr></table>

      <p>See the <a href="colors.html">color documentation</a> for more examples of
      acceptable values for stroke and fill styles.
    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
