<html>
  <head>
    <title>Protovis - Grouped Charts</title>
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
        <a href="stack.html">&laquo; Previous</a> /
        <a href="sparklines.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Grouped Charts</h1>

      <div style="float:left;width:430px;">
      <iframe style="height:275px;" src="group-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="group-full.html" target="_blank">View full screen.</a>
      </div>

      <div style="float:left;padding-left:30px;width:400px;">

      In this multi-series bar chart, we group bars together rather than <a
      href="http://protovis-js.googlecode.com/svn/trunk/examples/bar-stacked.html">stack
      them</a>. A grouped chart allows accurate comparison of individual values
      thanks to an aligned baseline: a position, rather than length, judgment is
      used.

      <p>An ordinal scale positions the groups vertically; the bars are then
      replicated inside a panel, a technique that is also used for <a
      href="hotel.html">small multiples</a>.

      <blockquote style="font-size:13px;">
        Next: <a href="sparklines.html">Sparklines</a>
      </blockquote>
      </div>
      <br clear="all">

      <h3>Source</h3>

include(`group-full.html.html')

      <h3>Data</h3>

include(`group.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
