<html>
  <head>
    <title>Protovis - Grid Layout</title>
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
        <a href="icicle.html">&laquo; Previous</a> /
        <a href="jobs.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Grid Layout</h1>

      <div style="float:left;width:530px;">
      <iframe style="border:solid 4px #ccc;width:522px;height:366px;"
      src="heatmap-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="heatmap-full.html" target="_blank">View full screen.</a>
      </div>

      <div style="float:left;padding-left:30px;width:300px;">
      <p>The R <tt>volcano</tt> data set gives topographic information for
      Auckland's Maungawhau volcano, also known
      as <a href="http://en.wikipedia.org/wiki/Mt_Eden">Mt. Eden</a>. Here we
      reproduce a heatmap encoding elevation with a partitioned linear color
      scale.

      <p>The <a href="http://protovis-js.googlecode.com/svn/trunk/jsdoc/symbols/pv.Layout.grid.html">grid
      layout</a> provides a convenient mechanism for positioning a
      two-dimensional grid of bars based on a two-dimensional array of data.
      Note, however, that when pixel manipulation support is added to Protovis
      heatmap visualizations will be more efficiently rendered as images.

      <blockquote style="font-size:13px;">
        Next: <a href="jobs.html">Job Voyager</a>
      </blockquote>
      </div>
      <br clear="all">

      <h3>Source</h3>

m4_include(`heatmap-full.html.html')

      <h3>Data</h3>

      Due to size, the data file is omitted from this
      example. See <a href="heatmap.js" target="_blank">heatmap.js</a>.

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
