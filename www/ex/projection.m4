<html>
  <head>
    <title>Protovis - Map Projections</title>
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
        <a href="cartogram.html">&laquo; Previous</a> /
        <a href="heatmap.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Map Projections</h1>

      <iframe style="width:860px;height:540px;" src="projection-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="projection-full.html" target="_blank">View full screen.</a>

      <p>Although the <i>Mercator</i> projection is perhaps the most familiar,
      many different <a href="http://en.wikipedia.org/wiki/Map_projection">map
      projections</a> exist to map the Earth's spherical surface to a
      two-dimensional image. Each projection introduces some type of distortion;
      for different purposes, some distortions may be more desirable. This
      example is another <a href="choropleth.html">choropleth map</a>, showing
      population density map of the world's countries. Use the drop-down menu to
      compare several projections supported by Protovis.

      <blockquote style="font-size:13px;">
        Next: <a href="heatmap.html">Heatmaps</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`projection-full.html.html')

      <h3>Data</h3>

      Due to size, the data file is omitted from this
      example. See <a href="countries.js" target="_blank">countries.js</a>.

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
