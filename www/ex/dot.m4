<html>
  <head>
    <title>Protovis - Dot Charts</title>
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
        <a href="bar.html">&laquo; Previous</a> /
        <a href="pie.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Dot Charts</h1>

      <div style="float:left;width:430px;">
      <iframe style="height:425px;" src="dot-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="dot-full.html" target="_blank">View full screen.</a>
      </div>

      <div style="float:left;padding-left:30px;width:400px;">
      Scatterplots can facilitate visual analysis along multiple dimensions,
      though care should be taken to avoid interference. In this example, we
      encode three dimensions: two are encoded using position, while the third
      is redundantly encoded as both area and color. Mouseover any of the dots
      to read the exact values.

      <p>A useful extension of scatterplots is
      the <a href="http://code.google.com/p/protovis-js/wiki/PairsPlot">scatterplot
      matrix</a>, as shown in the <a href="flowers.html">Anderson's Flowers</a>
      example.

      <blockquote style="font-size:13px;">
        Next: <a href="pie.html">Pie &amp; Donut Charts</a>
      </blockquote>
      </div>
      <br clear="all">

      <h3>Source</h3>

include(`dot-full.html.html')

      <h3>Data</h3>

include(`dot.js.html')

    </div>

    <div class="foot">
      Copyright 2009 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
