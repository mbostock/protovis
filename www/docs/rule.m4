<html>
  <head>
    <title>Protovis - Rules</title>
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
      <h1>Rule</h1>

      <p>The <b>rule</b> mark type represents a horizontal or vertical line segment
      that can be stroked (via <tt>strokeStyle</tt>). Rules are used most
      frequently for axes and grid lines.

      <blockquote>
        See also:
        <a href="../jsdoc/symbols/pv.Rule.html">pv.Rule API reference</a>

        <br>Examples:
        <a href="../ex/box-and-whisker.html">Box-and-Whisker Plots</a>,
        <a href="../ex/candlestick.html">Candlestick Charts</a>
      </blockquote>

      <h2>Placement</h2>

      <img src="rule-horizontal.png">

      <p>A rule&rsquo;s placement is specified through one or more properties:

      <ul>
      <li><tt>top</tt> - the distance from the top edge of the parent panel to the rule.
      <li><tt>left</tt> - the distance from the left edge of the parent panel to the rule.
      <li><tt>bottom</tt> - the distance from the bottom edge of the parent panel to the rule.
      <li><tt>right</tt> - the distance from the right edge of the parent panel to the rule.
      <li><tt>width</tt> - the width of the rule.
      <li><tt>height</tt> - the height of the rule.
      </ul>

      <p>Note that the properties together over-specify the position of the
      rule. In practice, either one or three properties is used. When one
      property is used, the rule spans the canvas; when three properties are
      used, the start and end point of the rule can be offset from the edge.

      <h3>Horizontal rules</h3>

      <p>For example, to draw a horizontal axis beneath a bar chart, use
      the <tt>bottom</tt> property:

      <p><table><tr><td>

m4_include(`rule-1.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`rule-1.js.txt')

      </script></td></tr></table>

      <p>Note that the rule is added to the visualization (<tt>vis</tt>) rather
      than the bars. This is because we only want to draw a single axis, rather
      than one axis per bar. If we want to draw grid lines in addition to the
      axis, we can use range to instantiate a number of equispaced rules:

      <p><table><tr><td>

m4_include(`rule-2.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`rule-2.js.txt')

      </script></td></tr></table>

      <p>Alternatively we can draw the grid lines first in black, so that they
      appear underneath the bars. This is perhaps the more traditional approach,
      though arguably it suffers from increased visual clutter:

      <p><table><tr><td>

m4_include(`rule-3.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`rule-3.js.txt')

      </script></td></tr></table>

      <p>Use the <tt>left</tt> and <tt>right</tt> in conjunction
      with <tt>bottom</tt> allows the width of the rule to be specified:

      <p><table><tr><td>

m4_include(`rule-4.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`rule-4.js.txt')

      </script></td></tr></table>

      <p>Care should obviously be taken so that the axis and grid lines are
      meaningful, in that they are spaced and positioned consistently with the
      other visual elements that they decorate. <a href="scale.html">Scales</a>
      can help with that. In some cases it may be useful to use a panel to
      offset the bottom margin, rather than offsetting manually.

      <h3>Vertical Rules</h3>

      <p>Using <tt>left</tt> or <tt>right</tt> as the primary specification
      allows the construction of vertical rules. The meaning of the parameters
      is similar to the horizontal configuration:

      <p><img src="rule-vertical.png">

      <p>Repeating the earlier bar chart example, this time vertically:

      <p><table><tr><td>

m4_include(`rule-5.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`rule-5.js.txt')

      </script></td></tr></table>

      <p>In this example, simply by defining <tt>left</tt> instead
      of <tt>bottom</tt>, the rule is rendered vertically instead of
      horizontally, offset from the left edge of the panel. To describe this
      behavior more explicitly, horizontal rules are used when the following
      property combinations are non-null:

      <ul>
      <li><tt>left</tt>, <tt>right</tt>, <tt>bottom</tt>
      <li><tt>left</tt>, <tt>right</tt>, <tt>top</tt>
      <li><tt>bottom</tt>
      <li><tt>top</tt>
      </ul>

      <p>Similarly, vertical rules are used with these combinations:

      <ul>
      <li><tt>bottom</tt>, <tt>top</tt>, <tt>left</tt>
      <li><tt>bottom</tt>, <tt>top</tt>, <tt>right</tt>
      <li><tt>left</tt>
      <li><tt>right</tt>
      </ul>

      <p>Other combinations of properties are not meaningful and should not be used.

      <h3>Using <tt>width</tt> and <tt>height</tt></h3>

      <p>Here&rsquo;s an example using <tt>width</tt> to create horizontal
      ticks:

      <p><table><tr><td>

m4_include(`rule-6.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`rule-6.js.txt')

      </script></td></tr></table>

      <p>Description forthcoming.

      <h2>Style</h2>

      <p>Like a <a href="line.html">line</a>, a rule&rsquo;s visual style is
      specified through two optional attributes:

      <ul>
      <li><tt>strokeStyle</tt> - the stroke color.
      <li><tt>lineWidth</tt> - the stroke thickness.
      </ul>

      <p>By default, the <tt>strokeStyle</tt> color is is black. The
      default <tt>lineWidth</tt> is 1.

      <p>See the <a href="color.html">color documentation</a> for more examples
      of acceptable values for stroke and fill styles.
    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
