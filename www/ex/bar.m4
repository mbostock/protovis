<html>
  <head>
    <title>Protovis - Bar &amp; Column Charts</title>
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
      <div class="section">
        <a href="area.html">&laquo; Previous</a> /
        <a href="dot.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Bar &amp; Column Charts</h1>

      <div style="float:left;width:430px;">
      <iframe scrolling="no" style="height:275px;" src="bar-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="bar-full.html" target="_blank">View full screen.</a>
      </div>

      <div style="float:left;padding-left:30px;width:440px;">
      This simple bar chart is constructed using a <a
      href="http://code.google.com/p/protovis-js/wiki/PvBar">bar</a> mark. A
      linear scale is used to compute the width of the bar, while an ordinal
      scale sets the top position and height for the categorical dimension.
      Next, <a href="http://code.google.com/p/protovis-js/wiki/PvRule">rules</a>
      and <a href="http://code.google.com/p/protovis-js/wiki/PvLabel">labels</a>
      are added for reference values.

      <p>Bars can be used in a variety of ways. For instance, they can be <a
      href="stack.html">stacked</a> or <a href="group.html">grouped</a> to show
      multiple data series, or arranged as vertical <a
      href="http://protovis-js.googlecode.com/svn/trunk/examples/column.html"
      target="_blank">columns</a> rather than bars.

      <blockquote style="font-size:13px;">
        Next: <a href="dot.html">Scatterplots</a>
      </blockquote>
      </div>
      <br clear="all">

      <h3>Source</h3>

m4_include(`bar-full.html.html')

      <h3>Data</h3>

m4_include(`bar.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
