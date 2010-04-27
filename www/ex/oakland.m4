<html>
  <head>
    <title>Protovis - Oakland Crimespotting</title>
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
        <a href="weather.html">&laquo; Previous</a> /
        <a href="caltrain.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Oakland Crimespotting</h1>

      <iframe style="border:solid 1px #aaa;height:465px;" src="oakland-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="oakland-big.html" target="_blank">View full screen.</a>

      <p>This is a simplified recreation
      of <a href="http://oakland.crimespotting.org">Oakland Crimespotting</a> in
      Protovis using the Google Maps API. The original was designed and built by
      Stamen Design's Michal Migurski, Tom Carden, and Eric Rodenbeck. Each
      colored circle corresponds to a crime; the color encodes the category of
      crime (such as <i>violent</i> or <i>quality of life</i>).

      <blockquote style="font-size:13px;">
        Next: <a href="caltrain.html">CalTrain Timetable</a>
      </blockquote>

      <h3>Source</h3>

include(`oakland-full.html.html')

      <h3>Data</h3>

include(`oakland.js.html')

    </div>

    <div class="foot">
      Copyright 2009 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
