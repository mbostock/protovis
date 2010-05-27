<html>
  <head>
    <title>Protovis - Mean &amp; Deviation</title>
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
        <a href="error.html">&laquo; Previous</a> /
        <a href="life.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Mean &amp; Deviation</h1>

      <div style="float:left;width:580px;">
      <iframe style="height:740px;" src="nba-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="nba-full.html" target="_blank">View full screen.</a>
      </div>

      <div style="float:left;padding-left:30px;width:290px;"> This example uses
      a <a href="heatmap.html">heatmap</a> to visualize the performance of the
      top 50 scorers in the NBA according to various per-game performance
      statistics. The heatmap is generated using colored bars rather than a
      <a href="heatmap.html">dynamic image</a>.

      <p>One challenge with this dataset is that the ranges for each dimension
      vary wildly; to facilitate comparison of players across dimensions, we
      define a color scale based on the <i>deviation</i> from the mean for each
      dimension.

      <blockquote style="font-size:13px;">
        Next: <a href="life.html">Conway&rsquo;s Game of Life</a>
      </blockquote>
      </div>
      <br clear="all">

      <h3>Source</h3>

m4_include(`nba-full.html.html')

      <h3>Data</h3>

m4_include(`nba.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
