<html>
  <head>
    <title>Protovis - Belousov&ndash;Zhabotinsky reaction</title>
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
        <a href="cell.html">&laquo; Previous</a> /
        <a href="nbody.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Belousov&ndash;Zhabotinsky reaction</h1>

      <div style="float:left;width:300px;">
      <iframe style="border:solid 4px #ccc;height:300px;" src="bzr-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="bzr-full.html" target="_blank">View full screen.</a>
      </div>

      <div style="float:left;padding-left:30px;width:570px;">
      A <a href="http://en.wikipedia.org/wiki/Belousov-Zhabotinsky_reaction"
      >Belousov&ndash;Zhabotinsky reaction</a> is a nonlinear chemical
      oscillator: a fascinating phenomenon where a chemical reaction does not
      achieve equilibrium but instead oscillates between different states.
      These reactions can be simulated using a two-dimensional cellular
      automaton similar to the <a href="life.html">Game of Life</a>.

      <p>This implementation is based on the work of <a
      href="http://www.nitorijournal.org/?p=2109">Nitori Kawashiro</a>, and uses
      a <a href="heatmap.html">dynamic image</a> to visualize the state of the
      simulation.

      <blockquote style="font-size:13px;">
        Next: <a href="nbody.html"><i>N</i>-Body Problem</a>
      </blockquote>
      </div>
      <br clear="all">

      <h3>Source</h3>

m4_include(`bzr-full.html.html')

      <h3>Data</h3>

m4_include(`bzr.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
