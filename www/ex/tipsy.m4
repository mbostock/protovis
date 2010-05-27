<html>
  <head>
    <title>Protovis - Tooltips</title>
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
        <a href="brush.html">&laquo; Previous</a> /
        <a href="point.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Tooltips</h1>

      <div style="float:left;width:440px;">
      <iframe scrolling="no" style="height:280px;" src="tipsy-full.html" scrolling="no"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="tipsy-full.html" target="_blank">View full screen.</a>
      </div>

      <div style="float:left;padding-left:30px;width:430px;">
      Protovis supports basic tooltips using the <tt title="Hello, tooltip!"
      >title</tt> property. While convenient, some applications may require more
      control over tooltip appearance; consider the <a
      href="http://onehackoranother.com/projects/jquery/tipsy/">Tipsy</a> jQuery
      plugin, which creates flexible tooltips in multiple orientations that can
      fade and contain HTML.

      <p>This example demonstrates how to use Tipsy with Protovis via <tt><a
      href="http://gitorious.org/protovis/protovis/blobs/master/examples/tipsy/tipsy.js"
      >pv.Behavior.tipsy</a></tt>.

      <blockquote style="font-size:13px;">
        Next: <a href="point.html">Pointing</a>
      </blockquote>
      </div>
      <br clear="all">

      <h3>Source</h3>

m4_include(`tipsy-full.html.html')

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
