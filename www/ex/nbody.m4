<html>
  <head>
    <title>Protovis - N-Body Problem</title>
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
        <a href="bzr.html">&laquo; Previous</a> /
        <a href="clock.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1><i>N</i>-Body Problem</h1>

      <iframe scrolling="no" style="border:solid 4px #ccc;height:600px;"
      src="nbody-full.html"></iframe> <p><img src="popout.png" width="16"
      height="16" style="padding:0;vertical-align:top;"> <a
      style="font-size:13px;" href="nbody-full.html" target="_blank">View full
      screen.</a>

      <p>The <a
      href="http://en.wikipedia.org/wiki/N-body_simulation"><i>n</i>-body
      problem</a> involves predicting the motion of celestial objects under
      mutual gravitation. With many objects, this simulation can be
      computationally taxing due to <i>n</i><sup>2</sup> force
      calculations. Here we simulate two hundred massive objects, using the <a
      href="http://en.wikipedia.org/wiki/Barnes-Hut_simulation">Barnes&ndash;Hut
      algorithm</a> to approximate forces in O(<i>n</i> log <i>n</i>). Using
      dynamic properties, we can easily encode speed using color, and velocity
      with a white arrow. Watch as worlds collide, undergo planetary accretion,
      and spin out of control!

      <blockquote style="font-size:13px;">
        Next: <a href="clock.html">PolarClock</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`nbody-full.html.html')

      <h3>Data</h3>

      This example has no data.

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
