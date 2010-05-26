<html>
  <head>
    <title>Protovis - Node-Link Trees</title>
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
        <a href="pack.html">&laquo; Previous</a> /
        <a href="treemap.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Node-Link Trees</h1>

      <iframe style="height:700px;" src="tree-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="tree-full.html" target="_blank">View full screen.</a>

      <p>The <i>tree</i> layout implements the <a
      href="http://www.springerlink.com/content/u73fyc4tlxp3uwt8/">Reingold-Tilford</a>
      algorithm for efficient, tidy arrangement of layered nodes. This node-link
      diagram is similar to the <a href="dendrogram.html">dendrogram</a>, except
      the depth of nodes is computed by distance from the root, leading to a
      ragged appearance. Cartesian orientations are also supported.

      <blockquote style="font-size:13px;">
        Next: <a href="treemap.html">Treemaps</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`tree-full.html.html')

      <h3>Data</h3>

m4_include(`flare.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
