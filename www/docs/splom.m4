<html>
  <head>
    <title>Protovis - How-To: Scatterplot Matrix</title>
    <link type="text/css" rel="stylesheet" href="../style.css?3.2"/>
    <link type="text/css" rel="stylesheet" href="../ex/syntax.css?3.2"/>
    <script type="text/javascript" src="../protovis-r3.2.js"></script>
    <script type="text/javascript" src="../ex/flowers.js"></script>
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
      <div class="section">
        <a href="../ex/">Examples</a>
      </div>
      <div class="section selected">
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
        <a href="start.html">&laquo; Previous</a> /
        <a href="invert.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>How-To: Scatterplot Matrix</h1>

      <p>You&rsquo;ve probably seen the simple <a href="../ex/dot.html"
      >scatterplot example</a> already. We will now extend this simple example
      to do something a bit more interesting: a scatterplot matrix! That is, a
      grid of little scatterplots, each displaying the relationship between two
      dimensions <i>i</i> and <i>j</i>.

      <p>For example, given tabular data on <a
      href="http://en.wikipedia.org/wiki/Iris_flower_data_set">Iris flowers</a>,
      how might we explore the relationships between sepal and petal dimensions
      and species?

m4_include(`splom-1.js.html')

      <p>Here&rsquo;s a rudimentary scatterplot matrix:

m4_include(`splom-2.js.html')

      <p>Breaking it down:

      <p>1. A root [PvPanel panel], <tt>vis</tt>, to contain the visualization.
      Its dimensions are a multiple of the size <tt>s</tt> and some padding
      <tt>p</tt> between cells.

      <p>2. Another panel, <tt>cell</tt>, to contain the scatterplot. But note
      that <tt>cell</tt> is not directly a child of the root: we use one panel
      to make columns, and another panel to make rows. These panels share the
      same data: the array of dimensions (&ldquo;sepalLength&rdquo;,
      &ldquo;sepalWidth&rdquo;, etc.), <tt>keys</tt>.

      <p>3. A <a href="dot.html">dot</a>, to produce the scatterplot. We use two
      <a href="local.html">local variables</a> <tt>x</tt> and <tt>y</tt> to
      store linear scales for each dimensions. Note: it would be more efficient
      to cache these scales for each dimension, rather than constructing them on
      the fly. (Exercise: Try it!)

      <p>The result is a good start:

      <p><script type="text/javascript+protovis">

m4_include(`splom-2.js.txt')

      </script>

      <p>Of course, one of the problems with the rudimentary approach is that a
      linear scale isn&rsquo;t appropriate for all dimensions: the species name
      is ordinal, not quantitative. It might be useful in Protovis generated a
      suitable default scale for you, but it&rsquo;s easy enough to write your
      own scale factory:

m4_include(`splom-3.js.html')

      <p>Then, replace the defs for <tt>x</tt> and <tt>y</tt> to use the new
      scale factory:

m4_include(`splom-4.js.html')

      <p>You could employ another <a href="scale.html">ordinal scale</a> to
      color the dots by species. This is left as an exercise for the reader.

      <p><script type="text/javascript+protovis">

m4_include(`splom-5.js.txt')

      </script>

      <p>Lastly, you may want to add appropriate labels, ticks, or even a legend!

      <blockquote style="font-size:13px;">
        Next: <a href="invert.html">Scale Interaction</a>
      </blockquote>
    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
