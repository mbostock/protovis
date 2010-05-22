<html>
  <head>
    <title>Graduated Symbol Map</title>
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
        <a href="oakland.html">&laquo; Previous</a> /
        <a href="treemap.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Graduated Symbol Map</h1>

      <iframe id="iframe" style="height:400px;" src="symbol-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="symbol-interactive.html" target="_blank">View full screen.</a>
      </p>

      <p>Each state's population is represented as a "target" with the center
      circle representing the number of residents with normal Body Mass Index
      (BMI &lt; 24.9), the middle ring representing the overweight population
      (25.0 &lt; BMI &lt; 29.9), and the outside ring representing the obese
      population (30.0 &lt; BMI).  The area of the entire target corresponds to
      the overall population of the state.</p>

      <p>A more complicated example that includes more interaction can be found
      <a href="symbol-interactive.html">here</a>.</p>

      <blockquote style="font-size:13px;">
        Next: <a href="treemap.html">Treemap</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`symbol-full.html.html')

      <h3>Data</h3>

      Due to size, the data file is omitted from this
      example. See <a href="us_lowres.js" target="_blank">us_lowres.js</a>
      and <a href="us_stats.js" target="_blank">us_stats.js</a>.

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
