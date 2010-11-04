<html>
  <head>
    <title>Protovis - Minnesota Employment</title>
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
        <a href="jobs.html">&laquo; Previous</a> /
        <a href="zoom.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Minnesota Employment</h1>

      <iframe style="border:solid 4px #ccc;height:430px;"
          src="minnesota-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="minnesota-full.html" target="_blank">View full screen.</a>

      <p>Another <a
      href="http://minnesota.publicradio.org/projects/2008/07/16_minnesota_slowdown/">Flare-inspired
      visualization</a>, this one shows employment data for various jobs and job
      categories from Minnesota. Seasonal variations are apparent, such as the
      summer peaks in amusement parks (which coincides with dips in educational
      services!).

      <p>Color saturation is used to encode the population for each job, since
      the small multiples use non-aligned scales. This makes it easy to
      distinguish the one individual that worked in space research from the
      hundreds of thousands in manufacturing. This visualization also
      demonstrates the <a href="../docs/invert.html">scale inversion</a>
      interaction technique, showing the closest data point to the mouse.

      <blockquote style="font-size:13px;">
        Next: <a href="zoom.html">Focus + Context</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`minnesota-full.html.html')

      <h3>Data</h3>

      Due to size, the data file is omitted from this
      example. See <a href="minnesota.js" target="_blank">minnesota.js</a>.

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
