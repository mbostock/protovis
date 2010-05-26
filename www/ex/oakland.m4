<html>
  <head>
    <title>Protovis - Oakland Crimespotting</title>
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
        <a href="napoleon.html">&laquo; Previous</a> /
        <a href="choropleth.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Oakland Crimespotting</h1>

      <iframe style="border:solid 1px #aaa;height:465px;"
      src="oakland-full.html"></iframe> <p><img src="popout.png" width="16"
      height="16" style="padding:0;vertical-align:top;"> <a
      style="font-size:13px;" href="oakland-big.html" target="_blank">View full
      screen.</a>

      <p>This is a simplified recreation of <a
      href="http://oakland.crimespotting.org">Oakland Crimespotting</a> using
      the <a href="http://code.google.com/apis/maps/">Google Maps API</a>. The
      original was designed and built by <a href="http://stamen.com/">Stamen
      Design</a>&rsquo;s Michal Migurski, Tom Carden, and Eric Rodenbeck. Each
      colored circle corresponds to a crime; the color encodes the category of
      crime (such as <i>violent</i> or <i>quality of life</i>).

      <blockquote style="font-size:13px;">
        Next: <a href="choropleth.html">Choropleth Maps</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`oakland-full.html.html')

      <h3>Data</h3>

m4_include(`oakland.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
