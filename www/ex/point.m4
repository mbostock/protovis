<html>
  <head>
    <title>Protovis - Pointing</title>
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
        <a href="tipsy.html">&laquo; Previous</a> /
        <a href="splines.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Pointing</h1>

      <div style="float:left;width:450px;">
      <iframe style="height:425px;" src="point-full.html" scrolling="no"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="point-full.html" target="_blank">View full screen.</a>
      </div>

      <div style="float:left;padding-left:30px;width:380px;">

      Rather than require exact mouseovers, as is traditionally done, the
      <i>point</i> behavior identifies the closest mark to the mouse, allowing
      more rapid target acquisition and more responsive details-on-demand. This
      concept is similar to <a
      href="http://www.dgp.toronto.edu/papers/tgrossman_CHI2005.pdf"
      >&ldquo;bubble&rdquo; cursors</a> by Grossman &amp; Balakrishnan, CHI
      2005.

      <p>In this example, we use pointing to display a detail label on a
      scatterplot. The point behavior can also be used with lines and areas, as
      in the earlier <a href="minnesota.html">Minnesota Employment</a> example.

      <blockquote style="font-size:13px;">
        Next: <a href="splines.html">Spline Editor</a>
      </blockquote>

      </div>
      <br clear="all">

      <h3>Source</h3>

m4_include(`point-full.html.html')

      <h3>Data</h3>

m4_include(`dot.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
