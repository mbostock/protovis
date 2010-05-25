<html>
  <head>
    <title>Protovis - Line &amp; Step Charts</title>
    <link type="text/css" rel="stylesheet" href="../style.css?3.2"/>
    <link type="text/css" rel="stylesheet" href="syntax.css"/>
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
      <div class="section selected">
        <a href="./">Examples</a>
      </div>
      <div class="section">
        <a href="../api/">Documentation</a>
      </div>
      <div class="section">
        <a href="../protovis.pdf">Paper</a>
      </div>
      <div class="section">
        <a href="http://protovis-js.googlecode.com/files/protovis-3.1.zip">Download</a>
      </div>
    </div>
    <div class="subhead">
      <div class="section">
        <a href="./">Index</a>
      </div>
      <div class="section">
        <a href="pie.html">&laquo; Previous</a> /
        <a href="stack.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Line &amp; Step Charts</h1>

      <div style="float:left;width:430px;">
      <iframe style="height:225px;" src="line-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="line-full.html" target="_blank">View full screen.</a>
      </div>

      <div style="float:left;padding-left:30px;width:400px;">
      <a href="http://protovis-js.googlecode.com/svn/trunk/examples/line.html"
      target="_blank">Line charts</a> are often used to visualize time series
      data, encoding the value of a variable over time using position.
      Typically, linear interpolation is used between samples. However, in some
      cases, the data does <i>not</i> vary smoothly, but instead changes in
      response to discrete events.

      <p>Using the <a
      href="http://protovis-js.googlecode.com/svn/trunk/jsdoc/symbols/pv.Line.html#interpolate"><tt>interpolate</tt></a>
      property, it is easy to change this behavior for lines and areas.
      Protovis also supports various nonlinear interpolation methods, including
      cardinal spline, Catmull-Rom spline, B-spline, and monotone cubic!

      <blockquote style="font-size:13px;">
        Next: <a href="stack.html">Stacked Charts</a>
      </blockquote>
      </div>
      <br clear="all">

      <h3>Source</h3>

m4_include(`line-full.html.html')

      <h3>Data</h3>

m4_include(`line.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
