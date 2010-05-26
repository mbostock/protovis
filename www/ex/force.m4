<html>
  <head>
    <title>Protovis - Force-Directed Layouts</title>
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
        <a href="arc.html">&laquo; Previous</a> /
        <a href="matrix.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Force-Directed Layouts</h1>

      <iframe style="border:solid 4px #ccc;height:450px;"
      src="force-full.html"></iframe> <p><img src="popout.png" width="16"
      height="16" style="padding:0;vertical-align:top;"> <a
      style="font-size:13px;" href="force-full.html" target="_blank">View full
      screen.</a>

      <p>An intuitive approach to network layout is to model the graph as a
      physical system: nodes are charged particles that repel each other, and
      links are dampened springs that pull related nodes together. A physical
      simulation of these forces then determines node positions; approximation
      techniques that avoid computing all pairwise forces enable the layout of
      large numbers of nodes. In addition, interactivity allows the user to
      direct the layout and jiggle nodes to disambiguate links. Such a <i><a
      href="http://en.wikipedia.org/wiki/Force-based_algorithms_(graph_drawing)">force-directed
      layout</a></i> is a good starting point for understanding the structure of
      a general undirected graph.

      <p>This network represents character co-occurrence in the chapters of
      Victor Hugo's classic novel, <i>Les Mis&eacute;rables</i>. Node colors
      depict cluster memberships computed by a community-detection algorithm.
      Source: Knuth, D. E. 1993. <i>The Stanford GraphBase: A Platform for
      Combinatorial Computing</i>, Addison-Wesley.

      <blockquote style="font-size:13px;">
        Next: <a href="matrix.html">Matrix Diagrams</a>
      </blockquote>

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
