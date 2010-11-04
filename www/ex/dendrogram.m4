<html>
  <head>
    <title>Protovis - Dendrograms</title>
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
        <a href="splines.html">&laquo; Previous</a> /
        <a href="sunburst.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Dendrograms</h1>

      <div style="float:left;width:420px;">
      <iframe style="border:solid 4px #ccc;height:500px;"
      src="dendrogram-full.html"></iframe><p><img src="popout.png" width="16"
      height="16" style="padding:0;vertical-align:top;"> <a
      style="font-size:13px;" href="dendrogram-full.html" target="_blank">View
      full screen.</a> </div>

      <div style="float:left;padding-left:30px;width:450px;">
      A <i><a href="http://en.wikipedia.org/wiki/Dendrogram">dendrogram</a></i>
      (or cluster layout) is a node-link diagram that places leaf nodes of the
      tree at the same depth. In this example, the classes (orange leaf nodes)
      are aligned on the right edge, with the packages (blue internal nodes) to
      the left. As with other <a href="tree.html">tree layouts</a>, dendrograms
      can also be oriented radially.

      <blockquote style="font-size:13px;">
        Next: <a href="sunburst.html">Sunbursts</a>
      </blockquote>
      </div>
      <br clear="all">

      <h3>Source</h3>

m4_include(`dendrogram-full.html.html')

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
