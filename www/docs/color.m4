<html>
  <head>
    <title>Protovis - Colors</title>
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
      <h1>Colors</h1>

      <p>Color scales in Protovis are implemented using <a
      href="scale.html">scales</a>. Quantitative scales (such as linear or log)
      produce quantitative color encodings, and ordinal scales produc
      categorical color encodings. There are also two shorthand expressions
      (<tt>pv.colors</tt> and <tt>pv.ramp</tt>) for constructing color scales. Additionally,
      there are several built-in color palettes for categorical encoding
      (<tt>pv.Colors</tt>).

      <blockquote>
        See also:
        <a href="../jsdoc/symbols/pv.html#.colors">pv.colors</a>,
        <a href="../jsdoc/symbols/pv.html#.color">pv.color</a>,
        <a href="../jsdoc/symbols/pv.html#.ramp">pv.ramp</a> API reference
      </blockquote>

      <h2>Quantitative (Linear, Log)</h2>

      <p>You can define a quantitative color scale&mdash;i.e., encode a
      quantitative dimension of your data using color&mdash;using a standard
      linear scale. The only difference is that the output range is specified in
      colors. For example, here is a diverging scale that blends from red to
      yellow in the domain [0, .5], and from yellow to green in the domain [.5,
      1]:


m4_include(`color-1.js.html')

      <p><script type="text/javascript+protovis">

m4_include(`color-1.js.txt')

      </script>

      <p>Colors are interpolated
      in <a href="http://en.wikipedia.org/wiki/RGB_color_space">RGB color
      space</a>, even if specified as HSL. Colors can be specified as strings,
      according to the <a href="http://www.w3.org/TR/css3-color/">CSS Color
      Module Level 3</a>. The following formats are supported:

      <ul>
      <li>#f00 // #rgb
      <li>#ff0000 // #rrggbb
      <li>rgb(255, 0, 0)
      <li>rgb(100%, 0%, 0%)
      <li>hsl(0, 100%, 50%)
      <li>rgba(0, 0, 255, 0.5)
      <li>hsla(120, 100%, 50%, 1)
      <li>a <a href="http://www.w3.org/TR/SVG/types.html#ColorKeywords">color keyword</a>
      </ul>

      <p>Additionally, you can directly pass in an instance
      of <a href="../jsdoc/symbols/pv.Color.html">pv.Color</a>. This is useful
      if you use a built-in color operator, such as masking the
      <a href="../jsdoc/symbols/pv.Color.Rgb.html#alpha">alpha</a> channel, or
      deriving a <a href="../jsdoc/symbols/pv.Color.html#brighter">brighter</a>
      or <a href="../jsdoc/symbols/pv.Color.html#darker">darker</a> color.

      <p>As shorthand, you can define a linear scale with the default domain [0,
      1] using <tt>pv.ramp</tt>. For example, to create a color gradient from
      black to white:

m4_include(`color-2.js.html')

      <p><script type="text/javascript+protovis">

m4_include(`color-2.js.txt')

      </script>

      <p>Note that while linear scales are the most common, you can also use log scales for color:

m4_include(`color-3.js.html')

      <p><script type="text/javascript+protovis">

m4_include(`color-3.js.txt')

      </script>

      <h2>Categorical (Ordinal)</h2>

      <p>When your data is nominal or ordinal, such as the names of categories,
      you can use an ordinal scale for categorical color encoding. As with other
      ordinal scales, the scale is a mapping from a set of discrete domain
      values (such as names or indexes) to a set of discrete range values
      (colors). One nicety of ordinal scales&mdash;particularly for color
      encoding&mdash;is that you do not have to specify the domain
      explicitly. Instead, Protovis will allocate a new color from the range
      whenever it sees a unique value. If it sees more unique domain values than
      there exist in the range, it will start recycling colors.

      <p>The primary method of defining a categorical color encoding is
      using <a href="../jsdoc/symbols/pv.html#.colors">pv.colors</a>, which is
      simply shorthand for constructing an ordinal scale with the given range:

m4_include(`color-4.js.html')

      <p><script type="text/javascript+protovis">

m4_include(`color-4.js.txt')

      </script>

      <h3>Built-in Color Palettes</h3>

      <p>Protovis has several built-in color palettes that can serve as standard
      categorical encodings.

m4_include(`color-5.js.html')

      <p><script type="text/javascript+protovis">

m4_include(`color-5.js.txt')

      </script>

      <p>"#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b",
      "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"

m4_include(`color-6.js.html')

      <p><script type="text/javascript+protovis">

m4_include(`color-6.js.txt')

      </script>

      <p>"#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a",
      "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94",
      "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d",
      "#17becf", "#9edae5"

m4_include(`color-7.js.html')

      <p><script type="text/javascript+protovis">

m4_include(`color-7.js.txt')

      </script>

      <p>"#9c9ede", "#7375b5", "#4a5584", "#cedb9c", "#b5cf6b", "#8ca252",
      "#637939", "#e7cb94", "#e7ba52", "#bd9e39", "#8c6d31", "#e7969c",
      "#d6616b", "#ad494a", "#843c39", "#de9ed6", "#ce6dbd", "#a55194",
      "#7b4173"
    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
