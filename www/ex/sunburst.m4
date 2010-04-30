<html>
  <head>
    <title>Protovis - Sunburst Layout</title>
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
      <h1>Sunburst Layout</h1>

      <iframe style="height:750px;" src="sunburst-embed.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="sunburst-full.html" target="_blank">View full screen.</a>

      <p>Another built-in layout algorithm is the
      <a href="http://protovis-js.googlecode.com/svn/trunk/jsdoc/symbols/pv.Layout.sunburst.html">radial
      sunburst</a>, used here to show the various ActionScript classes of
      the <a href="http://flare.prefuse.org">Flare</a> visualization toolkit.
      The color of each cell corresponds to the package, while the wedge angle
      encodes the size of the source code in bytes.

      <p>The layout algorithms can be customized to show different aspects of
      the data. For instance, you might wish to size wedges by file count rather
      than bytes; experiment with different sizing functions using the drop-down
      menu. Also, while the layout is designed to work with wedges, it can be
      configured to work with alternate marks, such as dots in
      this <a href="sunburst-alt.html" target="_blank">radial layout example</a>.

      <blockquote style="font-size:13px;">
        Next: <a href="icicle.html">Icicle Layout</a>
      </blockquote>

      <h3>Source</h3>

include(`sunburst-full.html.html')

      <h3>Data</h3>

include(`flare.js.html')

    </div>

    <div class="foot">
      Copyright 2009 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
