<html>
  <head>
    <title>Protovis - Panels</title>
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
      <h1>Panels</h1>

      <p><b>Panels</b> are used to contain and replicate child marks.
      Description forthcoming.

      <blockquote>
        See also:
        <a href="../jsdoc/symbols/pv.Panel.html">pv.Panel API reference</a>
      </blockquote>

      <h2>The Root Panel</h2>

      <p>SVG element creation, etc.

      <h2>Replication</h2>

      <p>The recommended approach for multiple series is to use a panel to
      iterate over each:

      <p><table><tr><td>

m4_include(`panel-1.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`panel-1.js.txt')

      </script></td></tr></table>

      <p>There are actually two panels in this visualization: the <i>root</i>
      panel, which serves as the canvas, and a <i>child</i> panel that serves to
      replicate our bars for each series. The data on the child panel is a
      two-dimensional array: an array of arrays. The data on the bar simply
      dereferences the array, thus iterating over the elements in the array.

      <p>Note that the automatic <tt>index</tt> property is used in two places:
      once on the panel to offset series, and once on the bar to offset
      individual data elements. Also note that because we used panels to iterate
      over our series, we can take advantage of the default fill style, which
      allocates <a href="color.html">categorical colors</a> by parent index.

      <h3>Using the <tt>data</tt> stack</h3>

      <p>When marks are nested inside panels, their properties can declare
      additional arguments. These arguments are the data associated with
      enclosing panels.

      <p>Example forthcoming. See the <a href="../ex/flowers.html"
      >Anderson&rsquo;s Flowers</a> example in the meantime.

      <h2>Inheritance</h2>

      <p>Unlike normal marks, when you <tt>add</tt> a mark to a panel, that mark
      does <i>not</i> inherit the properties of the panel. However, the position
      of the mark will be offset by the panel&rsquo;s margins.

      <p>See the <a href="inheritance.html">inheritance documentation</a> for
      more details.
    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
