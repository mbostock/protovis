<html>
  <head>
    <title>Protovis - Inheritance</title>
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
      <h1>Inheritance</h1>

      <p>Protovis uses <b>inheritance</b> to simplify the specification of
      related marks: a new mark can be derived from an existing mark, inheriting
      its properties. The new mark can then override properties to specify new
      behavior, potentially in terms of the old behavior. In this way, the old
      mark serves as the <b>prototype</b> for the new mark. Most mark types
      share the same basic properties for consistency and to facilitate
      inheritance.

      <p>To define a new mark that inherits from an existing mark,
      call <tt>add</tt>. For example, here we derive labels for a rule and a
      bar:

      <p><table><tr><td>

m4_include(`inheritance-1.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`inheritance-1.js.txt')

      </script></td></tr></table>

      <p>The rule's label inherits the <tt>data</tt> and <tt>bottom</tt>
      property, causing it to appear on the rule and render the value (datum) as
      text. The bar's label uses the bottom <a href="anchor.html">anchor</a> to
      tweak positioning, so that the label is centered at the bottom of the bar.

      <p>Inheritance is dynamic, in the sense that property <i>functions</i> are
      inherited, rather than property <i>values</i>. This means that properties
      are evaluated separately for each mark. For example, you can derive a new
      mark, and override the data property; properties on the new mark will be
      evaluated separately from the prototype (potentially generating a
      different number of rendered marks).

      <p>Interleaving multiple data series produces a grouped bar chart:

      <p><table><tr><td>

m4_include(`inheritance-2.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`inheritance-2.js.txt')

      </script></td></tr></table>

      <p>This demonstrates inheritance: the second bar inherits all of the
      properties of the first bar, and then overrides the <tt>data</tt>,
      the <tt>left</tt> margin, and the <tt>fillStyle</tt>. Copying the
      multiply-by-index and offsetting by 10 pixels is probably the most
      explicit method, but copying can sometimes make it difficult for you to
      change a visualization in the future.

      <p>Similarly, for overlapping area charts:

      <p><table><tr><td>

m4_include(`inheritance-3.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`inheritance-3.js.txt')

      </script></td></tr></table>

      <p>For more examples of inheritance, learn about <a href="anchor.html"
      >anchors</a>.

      <h2>Defaults</h2>

      <p>Marks also inherit from type-specific defaults.

      <h2>Off-Screen Inheritance</h2>

      <p>You can use off-screen marks (marks that are not directly part of the
      visualization) to define default properties that are shared by other
      marks. In effect, this is a lightweight way of defining a new class of
      mark. For example, if you needed to create multiple <a href="label.html"
      >labels</a>:

m4_include(`inheritance-4.js.html')

      <p>Then, you can create a new label which extends the above, inheriting
      its properties:

m4_include(`inheritance-5.js.html')

      <p>You can also override specific properties:

m4_include(`inheritance-6.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
