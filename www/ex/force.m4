<html>
  <head>
    <title>Protovis - Force-Directed Graphs</title>
    <link type="text/css" rel="stylesheet" href="../style.css?3.1a"/>
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
        <a href="../api/">Documentation</a>
      </div>
      <div class="section">
        <a href="../protovis.pdf">Paper</a>
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
        <a href="arc.html">&laquo; Previous</a> /
        <a href="matrix.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Force-Directed Graphs</h1>

      <div style="float:left;width:450px;">
      <iframe style="height:350px;" src="force-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="force-full.html" target="_blank">View full screen.</a>
      </div>

      <div style="float:left;width:450px;">
      <p>Les Mis&eacute;rables character interaction presented as a
      force-directed graph. Each character is represented by a circle and the
      connecting lines (or springs) represent interaction. The character's size
      indicates the number of interactions they have over the entire play. Drag
      and zoom the graph the get a better view.</p>

      <blockquote style="font-size:13px;">
        Next: <a href="matrix.html">Matrix Diagrams</a>
      </blockquote>
      </div>
      <br clear="all">

      <h3>Source</h3>

m4_include(`force-full.html.html')

      <h3>Data</h3>

      Due to size, the data file is omitted from this
      example. See <a href="miserables.js" target="_blank">miserables.js</a>.

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
