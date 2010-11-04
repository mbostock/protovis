<html>
  <head>
    <title>Protovis - Local Variables</title>
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
      <h1>Local Variables</h1>

      <h2>Description</h2>

      <p>From the API reference for <tt><a
      href="../jsdoc/symbols/pv.Mark.html#def">def</a></tt>:

      <p><tt>def(name, value)</tt>: Defines a local variable on this mark. Local
      variables are initialized once per mark (i.e., per parent panel instance),
      and can be used to store local state for the mark. Here are a few reasons
      you might want to use <tt>def</tt>:

      <p>1. To store local state. For example, say you were visualizing
      <a href="../ex/minnesota.html">employment statistics</a>, and your root
      panel had an array of occupations. In a child panel, you might want to
      initialize a local scale, and reference it from a property function:

m4_include(`local-1.js.html')

      <p>In this example, <tt>this.y()</tt> returns the defined local scale. We
      then invoke the scale function, passing in the datum, to compute the
      height. Note that defs are similar to fixed properties: they are only
      evaluated once per parent panel, and <tt>this.y()</tt> returns a function,
      rather than automatically evaluating this function as a property.

      <p>2. To store temporary state for interaction. Say you have an array of
      bars, and you want to color the bar differently if the mouse is over
      it. Use <tt>def</tt> to define a local variable, and event handlers to
      override this variable interactively:

m4_include(`local-2.js.html')

      <p>Notice that <tt>this.i()</tt> can be used both to set the value
      of <tt>i</tt> (when an argument is specified), and to get the value
      of <tt>i</tt> (when no arguments are specified). In this way, it's like
      other property methods.

      <p>3. To specify fixed properties efficiently. Sometimes, the value of a
      property may be locally a constant, but dependent on parent panel data
      which is variable. In this scenario, you can use <tt>def</tt> to define a
      property; it will only get computed once per mark, rather than once per
      datum.

      <h2>Example: Interaction</h2>

      <p><table><tr><td>

m4_include(`local-3.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`local-3.js.txt')

      </script></td></tr></table>

      <p>In this example, the local variable, or &ldquo;def&rdquo;, is
      named <tt>i</tt>. It stores the index of the mark under the
      mouse. Breaking it down:<ol>

      <li>The local <tt>i</tt> is declared with an initial constant value of
      -1: <tt>def("i", -1)</tt>. The value of -1 indicates that the mouse is not
      over any of the bars. The second argument to <tt>def</tt> is optional; it
      specifies an initializer, which can either be a function or a constant. If
      a function, it is passed data arguments like other property functions.

      <li>The local <tt>i</tt> is dereferenced for the <tt>fillStyle</tt>
      property: if its value matches the index, the bar is colored red, and if
      not, black.

      <li>Two events are handled: &ldquo;mouseover&rdquo;, which sets <tt>i</tt>
      to the current index, and &ldquo;mouseout&rdquo;, which clears the value
      of <tt>i</tt>.

      <li>The return value of the event handlers is <tt>this</tt>, which is a
      reference to the bar. That causes the bar to be re-rendered (and
      recolored!) after the event is handled.

      </ol><p>When you declare a <tt>def</tt>, a method gets added to the mark,
      much like a property. It behaves similarly to property methods: calling
      the method with no arguments (in this example, <tt>this.i()</tt>) _gets_
      its value, while calling the method with an argument _sets_ the value.

      <p>For the purpose of comparison, what would happen without a <tt>def</tt>?

      <p><table><tr><td>

m4_include(`local-4.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`local-4.js.txt')

      </script></td></tr></table>

      <h3>What To Avoid: Partial Redraw</h3>

      <p>There&rsquo;s another trick you can use to achieve this recoloring
      effect. But, it is <b>strongly discouraged</b> because it takes advantage
      of how the rendering system currently detects which part of the tree to
      rebuild. It is included for explanatory purposes but <i>this is an
      anti-pattern not to be copied</i>.

      <p>The trick is make the bar a singleton, and replicate a new parent panel
      instead:

      <p><table><tr><td>

m4_include(`local-5.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`local-5.js.txt')

      </script></td></tr></table>

      <p>It works because the event handler returns a reference to the bar whose
      fill style was changed (but not the parent panel). That bar is then
      redrawn, but&mdash;importantly&mdash;the other copies of that bar in other
      panels are <i>not</i> redrawn. If the rendering engine knew all of the
      dependencies between properties, and could be smarter about which part of
      the tree to re-evaluate, this hack would break. So don't do it.

      <p>Yet another reason to avoid this strategy is that it&rsquo;s more
      <i>stateful</i> and less <i>declarative</i>. For example, if you wanted to
      use this hack to change multiple properties on mouseover, you have to be
      careful to exactly undo those changes on mouseout. On the other hand, if
      you use a local variable (such as <tt>i</tt>, above) to store the index of
      the active mark, you can define all the properties declaratively, and
      there's never an issue of crufty state.

      <h3>The Right Way: Local Changes</h3>

      <p><table><tr><td>

m4_include(`local-6.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`local-6.js.txt')

      </script></td></tr></table>

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
