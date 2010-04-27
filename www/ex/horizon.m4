<html>
  <head>
    <title>Protovis - Sizing the Horizon</title>
    <link type="text/css" rel="stylesheet" href="../style.css?3.1a"/>
    <link type="text/css" rel="stylesheet" href="syntax.css"/>
    <script type="text/javascript" src="../protovis-r3.1.0.js"></script> 
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
        <a href="line.html">&laquo; Previous</a> /
        <a href="./">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Sizing the Horizon</h1>

      <div style="float:left;width:300px;">
      <iframe style="width:300px;height:430px;" src="horizon-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="horizon-full.html" target="_blank">View full screen.</a>
      </div>

      <div style="float:left;padding-left:30px;width:560px;">

      Horizon graphs are a space-saving refinement of <a href="area.html">area
      charts</a>. They work by combining color and position encodings: data is
      sliced into layered bands that are drawn with different colors, reducing
      vertical space and increasing data density. All the charts on the left
      show the same data; the 2-band charts at the bottom require only 25% of
      space as an area chart of the same resolution.

      <p>For more on this type of visualization, read "<a
      href="http://vis.berkeley.edu/papers/horizon/">Sizing the Horizon</a>: The
      Effects of Chart Size and Layering on the Graphical Perception of Time
      Series Visualizations" by Heer et al., published in CHI 2009.

      <blockquote style="font-size:13px;">
        Next: <a href="./">Index</a>
      </blockquote>
      </div>
      <br clear="all">

      <h3>Source</h3>

include(`horizon-full.html.html')

      <h3>Data</h3>

include(`horizon.js.html')

    </div>

    <div class="foot">
      Copyright 2009 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
