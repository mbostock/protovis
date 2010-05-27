<html>
  <head>
    <title>Protovis - Conway&rsquo;s Game of Life</title>
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
        <a href="error.html">&laquo; Previous</a> /
        <a href="cell.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Conway&rsquo;s Game of Life</h1>

      <div style="float:left;width:300px;">
      <iframe scrolling="no" style="border:solid 4px #ccc;height:300px;" src="life-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="life-full.html" target="_blank">View full screen.</a>
      </div>

      <div style="float:left;padding-left:30px;width:570px;">
      <i><a href="http://en.wikipedia.org/wiki/Conway's_Game_of_Life">Life</a
      ></i> is a two-dimensional <a href="cell.html">cellular automaton</a>
      devised by John Conway in 1970. Each cell is either alive or dead. At
      each step, each cell can change states dependant on its eight immediate
      neighbors: &ldquo;Any live cell with fewer than two live neighbors dies,
      as if by underpopulation. Any live cell with more than three live
      neighbors dies, as if by overcrowding. Any dead cell with exactly three
      live neighbors becomes a live cell.&rdquo;

      <p>Here we initialize the system with an unusual <i><a
      href="http://en.wikipedia.org/wiki/Breeder_(CA)">breeder</a></i>: a
      configuration of cells that generate secondary and tertiary patterns in
      its wake. Click on the simulation to reset to a random state.

      <blockquote style="font-size:13px;">
        Next: <a href="cell.html">Automaton Explorer</a>
      </blockquote>
      </div>
      <br clear="all">

      <h3>Source</h3>

m4_include(`life-full.html.html')

      <h3>Data</h3>

m4_include(`life.js.html')

      <p>See also <a href="breeder.js" target="_blank">breeder.js</a>.

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
