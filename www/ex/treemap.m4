<html>
  <head>
    <title>Protovis - Treemap Layout</title>
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
        <a href="caltrain.html">&laquo; Previous</a> /
        <a href="sunburst.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Treemap Layout</h1>

      <iframe style="height:730px;" src="treemap-embed.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="treemap-full.html" target="_blank">View full screen.</a>

      <p>Protovis has built-in support for standard layout algorithms, such as
      <a href="http://protovis-js.googlecode.com/svn/trunk/jsdoc/symbols/pv.Layout.treemap.html">squarified
      treemaps</a>, used here to show the various ActionScript classes of
      the <a href="http://flare.prefuse.org">Flare</a> visualization toolkit.
      The color of each cell corresponds to the package, while the area encodes
      the size of the source code in bytes.

      <p>This example is interactive! Using the search box beneath the treemap,
      start typing the name of any class. Classes that do not match the search
      query will fade out, and the totals in the top-right corner will be
      updated. You can also click on any cell to jump directly to the source
      file.

      <blockquote style="font-size:13px;">
        Next: <a href="sunburst.html">Sunburst Layout</a>
      </blockquote>

      <h3>Source</h3>

include(`treemap-full.html.html')

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
