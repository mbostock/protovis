<html>
  <head>
    <title>Protovis - Conway's Game of Life</title>
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
        <a href="segmented.html">&laquo; Previous</a> /
        <a href="waves.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Conway's Game of Life</h1>

      <div style="float:left;width:610px;">
      <iframe style="border:solid 4px #ccc;width:600px;height:600px;" src="life-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="life-full.html" target="_blank">View full screen.</a>
      </div>

      <div style="float:left;padding-left:30px;width:500px;">
      John Conway devised this life-like cellular automaton in 1970. Here we
      visualize the cells by directly specifying the pixel colors of an image.

      <blockquote style="font-size:13px;">
        Next: <a href="waves.html">Waves</a>
      </blockquote>
      </div>
      <br clear="all">

      <h3>Source</h3>

m4_include(`life-full.html.html')

      <h3>Data</h3>

      Due to size, the data file is omitted from this
      example. See <a href="life.js" target="_blank">life.js</a>.

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
