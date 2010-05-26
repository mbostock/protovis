<html>
  <head>
    <title>Protovis - Matrix Diagrams</title>
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
        <a href="force.html">&laquo; Previous</a> /
        <a href="napoleon.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Matrix Diagrams</h1>

      <iframe style="height:800px;" src="matrix-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="matrix-full.html" target="_blank">View full screen.</a>

      <p>A graph can be represented by an <i>adjacency matrix</i>, where each
      value in row <i>i</i> and column <i>j</i> corresponds to the link from
      node <i>i</i> to node <i>j</i>. Given this representation, an obvious
      visualization then is: show the matrix! Using color or saturation instead
      of text allows patterns to be perceived rapidly. The seriation problem
      applies just as much to the matrix view as to the <a href="arc.html">arc
      diagram</a>, so the order of rows and columns is important: here we use a
      community-detection algorithm to order and color the display.

      <p>While path following is harder in a matrix view than in a <a
      href="force.html">node-link diagram</a>, matrices have a number of
      compensating advantages. As networks get large and highly connected,
      node-link diagrams often devolve into giant hairballs of line
      crossings. In matrix views, however, line crossings are impossible, and
      with an effective sorting one quickly can spot clusters and
      bridges. Allowing interactive grouping and reordering of the matrix
      facilitates deeper exploration of network structure.

      <p>This network represents character co-occurrence in the chapters of
      Victor Hugo's classic novel, <i>Les Mis&eacute;rables</i>. Node colors
      depict cluster memberships computed by a community-detection algorithm.
      Source: Knuth, D. E. 1993. <i>The Stanford GraphBase: A Platform for
      Combinatorial Computing</i>, Addison-Wesley.

      <blockquote style="font-size:13px;">
        Next: <a href="napoleon.html">Minard's Napoleon</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`matrix-full.html.html')

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
