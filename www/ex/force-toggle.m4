<html>
  <head>
    <title>Protovis - Force Toggle Layout</title>
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
      <h1>Force Toggle Layout</h1>

      <iframe style="height:400px;width:290px" src="force-toggle-embed.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="force-toggle-full.html" target="_blank">View full screen.</a>

      <p>This force directed layout allows the user to dynamically expand and
      collapse nodes by double clicking on them. Use the Alt key to propagate
      the expand/colapse action to the nodes children.

      <blockquote style="font-size:13px;">
        Next: <a href="icicle.html">Icicle Layout</a>
      </blockquote>

      <h3>Source</h3>

include(`force-toggle-full.html.html')

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
