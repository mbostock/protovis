<html>
  <head>
    <title>Protovis - Grid Intensity</title>
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
        <a href="zoom.html">&laquo; Previous</a> /
        <a href="clock.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Grid Intensity</h1>

      <iframe id="iframe" style="height:540px;" src="grid-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="grid-full.html" target="_blank">View full screen.</a>

      <p>Here we create an interface for testing the intensity of grid lines on
      a scatterplot. The interface is modeled after Stone &amp;
      Bartram's <a href="http://www.stonesc.com/pubs/CIC16%20Stone-Bartram.pdf">alpha
      contrast experiment</a>. Using a slider would introduce a learning bias,
      so instead we allow the subject to drag the gray dot to the left (for a
      lighter grid) or the right (for a darker grid). Dragging the dot farther
      causes the intensity change to accelerate.

      <p>At what intensity does the grid become invisible for you? When does it
      become visually obtrusive? Experiment with different intensities to find
      out.

      <blockquote style="font-size:13px;">
        Next: <a href="clock.html">PolarClock</a>
      </blockquote>

      <h3>Source</h3>

include(`grid-full.html.html')

      <h3>Data</h3>

include(`grid.js.html')

    </div>

    <div class="foot">
      Copyright 2009 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
