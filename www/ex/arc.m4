<html>
  <head>
    <title>Protovis - Arc Diagrams</title>
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
        <a href="treemap.html">&laquo; Previous</a> /
        <a href="force.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Arc Diagrams</h1>

      <iframe style="height:400px;" src="arc-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="arc-full.html" target="_blank">View full screen.</a>

      <p>An <i>arc diagram</i> uses a one-dimensional layout of nodes, with
      circular arcs to represent links. Though an arc diagram may not convey the
      overall structure of the graph as effectively as a <a
      href="force.html">two-dimensional layout</a>, with a good ordering of
      nodes it is easy to identify cliques and bridges. Further, as with the <a
      href="indent.html">indented tree</a>, multivariate data can easily be
      displayed alongside nodes.

      <p>This network represents character co-occurrence in the chapters of
      Victor Hugo's classic novel, <i>Les Mis&eacute;rables</i>. Node colors
      depict cluster memberships computed by a community-detection algorithm.
      Source: Knuth, D. E. 1993. <i>The Stanford GraphBase: A Platform for
      Combinatorial Computing</i>, Addison-Wesley.

      <blockquote style="font-size:13px;">
        Next: <a href="force.html">Force-Directed Layouts</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`arc-full.html.html')

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
