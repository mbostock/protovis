<html>
  <head>
    <title>Protovis - Scales</title>
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
      <h1>Scales</h1>

      <p><b>Scales</b> are functions that map from domain to range.
      <i>Quantitative</i> scales map from a continuous domain to a continuous
      range (e.g., real numbers to pixel positions): <tt>pv.Scale.linear</tt>,
      <tt>pv.Scale.root</tt>, <tt>pv.Scale.log</tt>. <i>Quantile</i> scales map
      from a continuous domain to a discrete range. <i>Ordinal</i> scales map
      from a discrete domain to a discrete range (e.g., names to
      colors): <tt>pv.Scale.ordinal</tt>, <tt>pv.Colors</tt>.

      <blockquote>
        See also:
        <a href="../jsdoc/symbols/pv.Scale.html">pv.Scale API reference</a>
      </blockquote>

      <h2>Quantitative Scales</h2>

      <blockquote>
        See also:
        <a href="../jsdoc/symbols/pv.Scale.quantitative.html">pv.Scale.quantitative</a>,
        <a href="../jsdoc/symbols/pv.Scale.linear.html">linear</a>,
        <a href="../jsdoc/symbols/pv.Scale.log.html">log</a>,
        <a href="../jsdoc/symbols/pv.Scale.root.html">root API reference</a>
      </blockquote>

      <h3>Example with position, color and ticks</h3>

      <p><table><tr><td>

m4_include(`scale-4.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`scale-4.js.txt')

      </script></td></tr></table>

      <h3>Example with <tt>angle</tt></h3>

      <p><table><tr><td>

m4_include(`scale-5.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`scale-5.js.txt')

      </script></td></tr></table>

      <h3>Example with diverging color</h3>

      <p>Replacing the definition of <tt>c</tt> above with a diverging scale:

      <p><table><tr><td>

m4_include(`scale-6.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`scale-6.js.txt')

      </script></td></tr></table>

      <h3>Example with log transform</h3>

      <p><table><tr><td>

m4_include(`scale-7.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`scale-7.js.txt')

      </script></td></tr></table>

      <h2>Quantile Scales</h2>

      Description forthcoming.

      <blockquote>
        See also:
        <a href="../jsdoc/symbols/pv.Scale.quantile.html">pv.Scale.quantile API reference</a>
      </blockquote>

      <h2>Ordinal Scales</h2>

      <h3>Example with position (bands) and color</h3>

      <p><table><tr><td>

m4_include(`scale-8.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`scale-8.js.txt')

      </script></td></tr></table>

      <h3>Example with position (points)</h3>

      <p><table><tr><td>

m4_include(`scale-9.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`scale-9.js.txt')

      </script></td></tr></table>

      <h2>Other Features</h2>

      <p>The <a href="../jsdoc/symbols/pv.Scale.html#by"><tt>by</tt> method</a>
      is a shorthand way of binding an accessor function with the scale. This
      method is provided for convenience, such that scales can be succinctly
      defined inline. For example, given an array of data elements that have a
      score attribute with the domain [0, 1], the <tt>height</tt> property could
      be specified as:

m4_include(`scale-1.js.html')

      <p>This is shorthand for:

m4_include(`scale-2.js.html')

      <p>This method should be used judiciously; it is typically more clear to
      invoke the scale directly, passing in the value to be scaled. Most
      commonly, the <tt>by</tt> method is used in conjunction with categorical
      color scales. There are also several pre-defined accessor functions for
      convenience:

      <ul>
      <li><a href="../jsdoc/symbols/pv.html#.index"><tt>pv.index</tt></a> - <tt>function() this.index</tt>
      <li><a href="../jsdoc/symbols/pv.html#.parent"><tt>pv.parent</tt></a> - <tt>function() this.parent.index</tt>
      <li><a href="../jsdoc/symbols/pv.html#.child"><tt>pv.child</tt></a> - <tt>function() this.childIndex</tt>
      </ul>

      <p>For example, the default fill color for <a href="bar.html">bars</a> is

m4_include(`scale-3.js.html')

      <p>which causes bars to be filled with a unique color according to the
      parent panel index. Since the parent panel data is typically a
      two-dimensional array of each series of data, this causes bars of the same
      series to share a color by default.
    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
