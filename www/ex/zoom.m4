<html>
  <head>
    <title>Protovis - Focus + Context</title>
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
        <a href="minnesota.html">&laquo; Previous</a> /
        <a href="transform.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Focus + Context</h1>

      <iframe scrolling="no" style="height:420px;" src="zoom-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="zoom-full.html" target="_blank">View full screen.</a>

      <p><i>Focus + context</i> is a technique that allows the viewer to inspect
      an interesting portion of the data in detail (the focus) without losing
      global context&mdash;the global view is preserved at reduced detail,
      highlighting the focused region. In this visualization, a three-year
      window is focused within a time series spanning three decades. The focus
      region can be dynamically resized and repositioned.

      <blockquote style="font-size:13px;">
        Next: <a href="transform.html">Pan + Zoom</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`zoom-full.html.html')

      <h3>Data</h3>

m4_include(`zoom.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
