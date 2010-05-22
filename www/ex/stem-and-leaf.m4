<html>
  <head>
    <title>Protovis - Stem and Leaf CalTrain timetable</title>
    <link type="text/css" rel="stylesheet" href="../style.css?3.2"/>
    <link type="text/css" rel="stylesheet" href="syntax.css"/>
    <style type="text/css">
      iframe {
        border: none;
        width: 100%;
      }
      .highlight {
        padding-left: 20px;
        border-left: solid 4px #ccc;
      }
    </style>
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
        <a href="treemap.html">&laquo; Previous</a> /
        <a href="icicle.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Stem-and-Leaf</h1>

      <iframe style="height:420px;" src="stem-and-leaf-embed.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="stem-and-leaf-full.html" target="_blank">View full screen.</a>

      <p>Arrival times of CalTrain trains to station. The minutes of each northbound and
      southbound arrival are placed to the left and right, respectively, of their corresponding
      hour. Each arrival is colored to indicate whether the train is
      <span style="color: rgba(34,34,34,1);">Normal</span>, <span style="color: rgba(183,116,9,1);">
      Limited Service</span> or <span style="color: rgba(196,62,29,1);">Bullet Express</span>.
      Times of morning and evening rush hour can be easily seen by the increased activity at the
      station.

      <blockquote style="font-size:13px;">
        Next: <a href="icicle.html">Icicle Layout</a>
      </blockquote>

      <h3>Source</h3>

include(`stem-and-leaf-full.html.html')

      <h3>Data</h3>

i      Due to size, the data file is omitted from this
      example. See <a href="caltrain.js" target="_blank">caltrain.js</a>.

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
