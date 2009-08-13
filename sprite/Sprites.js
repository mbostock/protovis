pv.Sprites = document.implementation.hasFeature(
    "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")
    ? pv.SvgSprites : pv.VmlSprites;
