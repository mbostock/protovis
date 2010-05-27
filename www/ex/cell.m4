<html>
  <head>
    <title>Protovis - Automaton Explorer</title>
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
        <a href="life.html">&laquo; Previous</a> /
        <a href="bzr.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Automaton Explorer</h1>

      <iframe scrolling="no" style="height:460px;" src="cell-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="cell-full.html" target="_blank">View full screen.</a>

      <p>From <a
      href="http://mathworld.wolfram.com/CellularAutomaton.html">MathWorld</a>:
      &ldquo;A cellular automaton is a collection of &lsquo;colored&rsquo; cells
      on a grid of specified shape that evolves through a number of discrete
      time steps according to a set of rules based on the states of neighboring
      cells.&rdquo; This example explores binary, nearest-neighbor,
      one-dimensional automata, of which there are 256 (2<sup>8</sup>) possible
      rules. The eight possible outcomes for the current rule are shown across
      the top; click to toggle the selected bit or drag the slider to jump to
      the desired rule.

      <p><i>WARNING:</i> Moving the slider may produce flashing patterns!

      <blockquote style="font-size:13px;">
        Next: <a href="bzr.html">Belousov-Zhabotinsky reaction</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`cell-full.html.html')

      <h3>Data</h3>

m4_include(`cell.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
