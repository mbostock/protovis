<html>
  <head>
    <title>Protovis - Property Chaining</title>
    <link type="text/css" rel="stylesheet" href="../style.css?3.2"/>
    <link type="text/css" rel="stylesheet" href="../ex/syntax.css?3.2"/>
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
    </div>

    <div class="body">
      <h1>Property Chaining</h1>

      <h2>Absolute References</h2>

      <p>A stacked area chart can be produced using property chaining, where a
      new mark's properties are defined in terms of an existing one:

      <p><table><tr><td>

m4_include(`chaining-1.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`chaining-1.js.txt')

      </script></td></tr></table>

      <p>This example actually combines inheritance with property chaining. Another example:

      <p><table><tr><td>

m4_include(`chaining-2.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`chaining-2.js.txt')

      </script></td></tr></table>

      <p>Although straightforward, property chaining can be verbose.

      <h2>Relative References</h2>

      <h3>Using <tt>parent</tt></h3>

      <p>The most common way marks may refer to previously-computed properties
      is by looking at their parent.

      <h3>Using <tt>proto</tt></h3>

      <p>Description forthcoming. Note: requires that <tt>proto</tt> is visible
      and rendered. Also, if a property function that references
      <tt>this.proto</tt> is inherited, the reference changes!

      <p>Stacked area charts can also be specified using panels. As above, the
      panel data is a two-dimensional array, each element an array of values for
      the area. To offset the bottom of the area, we refer to the <i>cousin</i>,
      which is the corresponding area instance in the previous instance of the
      parent panel:

      <p><table><tr><td>

m4_include(`chaining-3.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`chaining-3.js.txt')

      </script></td></tr></table>

      <p>Of course, this is a bit convoluted. The convenient <a
      href="../ex/stack.html">stack layout</a> presents an automatic
      alternative, but it would be nice to design something a bit more robust
      (for instance, that calculates the offset in data space rather than pixel
      space). The technique of using the cousin can break if some of the panel
      instances are invisible, or in conjunction with inheritance.
    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
