pv.Colors = function(values) {
  var idToColor = {}; // from type-childIndex to assigned color
  var typeToCount = {}; // from type to number of marks seen (of that type)

  function color() {

    /* TODO Blech. Need a better solution than this... */
    if (!this.root.scene._resetColors) {
      idToColor = {};
      typeToCount = {};
      this.root.scene._resetColors = true;
    }

    var type = this.type.toString();
    var id = type + "-" + this.childIndex;
    var color = idToColor[id];
    if (color == undefined) {
      var count = typeToCount[type] = (typeToCount[type] || 0) + 1;
      idToColor[id] = color = values[(count - 1) % values.length];
    }
    return color;
  }

  color.values = values;
  color.unique = function() { return values[this.index % values.length]; };
  color.parent = function() { return values[this.parent.index % values.length]; };
  return color;
};

/* From Flare. */

pv.Colors.category10 = pv.Colors([
  "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
  "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
]);

pv.Colors.category20 = pv.Colors([
  "#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c",
  "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5",
  "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f",
  "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"
]);

pv.Colors.category19 = pv.Colors([
  "#9c9ede", "#7375b5", "#4a5584", "#cedb9c", "#b5cf6b",
  "#8ca252", "#637939", "#e7cb94", "#e7ba52", "#bd9e39",
  "#8c6d31", "#e7969c", "#d6616b", "#ad494a", "#843c39",
  "#de9ed6", "#ce6dbd", "#a55194", "#7b4173"
]);
