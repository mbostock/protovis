<html>
  <head>
    <title>Protovis - Indented Trees</title>
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
        <a href="icicle.html">&laquo; Previous</a> /
        <a href="pack.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Indented Trees</h1>

      <div style="float:left;width:285px;">
      <iframe style="border:solid 4px #ccc;height:400px;"
      src="indent-full.html"></iframe><p><img src="popout.png" width="16"
      height="16" style="padding:0;vertical-align:top;"> <a
      style="font-size:13px;" href="indent-full.html" target="_blank">View full
      screen.</a> </div>

      <div style="float:left;padding-left:30px;width:575px;">
      Indented trees are widely-used to represent file systems, among
      other applications. Although indented trees require much vertical space
      and do not easily facilitate multiscale inference, they do allow efficient
      interactive exploration of the tree to find a specific node.

      <p>In addition, the <i>indent</i> layout allows rapid scanning of node
      labels, and multivariate data such as file size can be displayed adjacent
      to the hierarchy. Click on package nodes to expand and collapse the
      descendants.

      <blockquote style="font-size:13px;">
        Next: <a href="pack.html">Circle Packing</a>
      </blockquote>
      </div>
      <br clear="all">

      <h3>Source</h3>

m4_include(`indent-full.html.html')

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
