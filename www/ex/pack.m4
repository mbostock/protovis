<html>
  <head>
    <title>Protovis - Circle Packing Layout</title>
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
        <a href="indent.html">&laquo; Previous</a> /
        <a href="tree.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Circle Packing</h1>

      <iframe style="height:800px;" src="pack-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="circle-pack-full.html" target="_blank">View full screen.</a>

      <p>The circle packing layout represents teh node leaves of a tree as circles
      whose size is proportional to the value of the node and then recursively packs
      these circles into each other to represent the tree. Here we show the various ActionScript
      classes of the <a href="http://flare.prefuse.org">Flare</a> visualization
      toolkit. The color of each cell corresponds to the package, while the area of the nodes
      encodes the size of the source code in bytes.

      <blockquote style="font-size:13px;">
        Next: <a href="tree.html">Node-Link Tree</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`pack-full.html.html')

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
