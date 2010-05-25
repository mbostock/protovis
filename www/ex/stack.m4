<html>
  <head>
    <title>Protovis - Stacked Charts</title>
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
        <a href="line.html">&laquo; Previous</a> /
        <a href="group.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Stacked Charts</h1>

      <div style="float:left;width:430px;">
      <iframe style="height:225px;" src="stack-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="stack-full.html" target="_blank">View full screen.</a>
      </div>

      <div style="float:left;padding-left:30px;width:400px;"> Protovis includes
      flexible layouts that can simplify the implementation of common
      visualization techniques. This example uses <tt>pv.Layout.Stack</tt> to
      stack area marks vertically with a zero baseline. The stack layout can
      also be used to <a
      href="http://protovis-js.googlecode.com/svn/trunk/examples/bar-stacked.html">stack
      bars</a> or <a
      href="http://protovis-js.googlecode.com/svn/trunk/examples/column-stacked.html">columns</a>
      as well as areas, and supports several <a
      href="stream.html">streamgraph</a> algorithms.

      <blockquote style="font-size:13px;">
        Next: <a href="group.html">Grouped Charts</a>
      </blockquote>
      </div>
      <br clear="all">

      <h3>Source</h3>

m4_include(`stack-full.html.html')

      <h3>Data</h3>

m4_include(`stack.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
