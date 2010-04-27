<html>
  <head>
    <title>Protovis - Waves</title>
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
        <a href="life.html">&laquo; Previous</a> /
        <a href="countries.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Waves</h1>

      <div style="float:left;width:290px;">
      <iframe style="width:290px;height:290px;" src="waves-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="waves-full.html" target="_blank">View full screen.</a>
      </div>

      <div style="float:left;padding-left:30px;width:500px;">
      In the <a href="life.html">Game of Life</a> example, the visibility of
      bars are toggled to visualize the state of the cellular automata. In this
      example, a grid of bars is similarly used to visualize
      the <a href="http://en.wikipedia.org/wiki/Sinc_function">sinc
      function</a>. The fill style for each bar is computed using HSL color
      space and the distance from the wave origin.

      <p>Click anywhere on the grid to restart the wave.

      <blockquote style="font-size:13px;">
        Next: <a href="countries.html">Choropleth Map</a>
      </blockquote>
      </div>
      <br clear="all">

      <h3>Source</h3>

include(`waves-full.html.html')

      <h3>Data</h3>

      This example has no data, making it a meaningless (though fun) visualization!

    </div>

    <div class="foot">
      Copyright 2009 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
