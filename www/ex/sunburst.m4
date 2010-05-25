<html>
  <head>
    <title>Protovis - Sunbursts</title>
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
        <a href="dendrogram.html">&laquo; Previous</a> /
        <a href="icicle.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Sunbursts</h1>

      <iframe style="height:860px;" src="sunburst-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="sunburst-full.html" target="_blank">View full screen.</a>

      <p>A sunburst is an <i>adjacency diagram</i>: a space-filling variant of
      the node-link diagram. Rather than drawing a link between parent and child
      in the hierarchy, nodes are drawn as solid areas (either wedges or bars),
      and their placement relative to adjacent nodes reveals their position in
      the hierarchy. Because the nodes are now space-filling, we can use an
      angle encoding for the size of software classes and packages. This reveals
      an additional dimension that would be difficult to show in a node-link
      diagram.

      <blockquote style="font-size:13px;">
        Next: <a href="icicle.html">Icicles</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`sunburst-full.html.html')

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
