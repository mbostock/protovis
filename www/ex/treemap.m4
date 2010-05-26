<html>
  <head>
    <title>Protovis - Treemaps</title>
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
        <a href="tree.html">&laquo; Previous</a> /
        <a href="arc.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Treemaps</h1>

      <iframe style="height:630px;" src="treemap-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="treemap-full.html" target="_blank">View full screen.</a>

      <p>Introduced by <a href="http://www.cs.umd.edu/hcil/treemap-history/">Ben
      Shneiderman</a> in 1991, a treemap recursively subdivides area into
      rectangles. As with adjacency diagrams, the size of any node in the tree
      is quickly revealed. This example uses color to encode different packages
      of the <a href="http://flare.prefuse.org">Flare</a> visualization toolkit,
      and area to encode file size. &ldquo;Squarified&rdquo; treemaps use
      approximately square rectangles, which offer better readability and size
      estimation than naive &ldquo;slice-and-dice&rdquo; subdivision. Fancier
      algorithms such as <a
      href="http://portal.acm.org/citation.cfm?id=1056018.1056041">Voronoi</a>
      and <a
      href="http://www.research.ibm.com/visual/papers/158-wattenberg-final3.pdf">jigsaw</a>
      treemaps also exist but are less common.

      <p>Interact with this example by using the search box to filter classes by
      name.

      <blockquote style="font-size:13px;">
        Next: <a href="arc.html">Arc Diagrams</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`treemap-full.html.html')

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
