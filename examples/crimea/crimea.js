var causes = ["wounds", "other", "disease"];

var crimea = [
  {date:  "4/1854", total:  8571, disease:    1, wounds:   0, other:   5},
  {date:  "5/1854", total: 23333, disease:   12, wounds:   0, other:   9},
  {date:  "6/1854", total: 28333, disease:   11, wounds:   0, other:   6},
  {date:  "7/1854", total: 28772, disease:  359, wounds:   0, other:  23},
  {date:  "8/1854", total: 30246, disease:  828, wounds:   1, other:  30},
  {date:  "9/1854", total: 30290, disease:  788, wounds:  81, other:  70},
  {date: "10/1854", total: 30643, disease:  503, wounds: 132, other: 128},
  {date: "11/1854", total: 29736, disease:  844, wounds: 287, other: 106},
  {date: "12/1854", total: 32779, disease: 1725, wounds: 114, other: 131},
  {date:  "1/1855", total: 32393, disease: 2761, wounds:  83, other: 324},
  {date:  "2/1855", total: 30919, disease: 2120, wounds:  42, other: 361},
  {date:  "3/1855", total: 30107, disease: 1205, wounds:  32, other: 172},
  {date:  "4/1855", total: 32252, disease:  477, wounds:  48, other:  57},
  {date:  "5/1855", total: 35473, disease:  508, wounds:  49, other:  37},
  {date:  "6/1855", total: 38863, disease:  802, wounds: 209, other:  31},
  {date:  "7/1855", total: 42647, disease:  382, wounds: 134, other:  33},
  {date:  "8/1855", total: 44614, disease:  483, wounds: 164, other:  25},
  {date:  "9/1855", total: 47751, disease:  189, wounds: 276, other:  20},
  {date: "10/1855", total: 46852, disease:  128, wounds:  53, other:  18},
  {date: "11/1855", total: 37853, disease:  178, wounds:  33, other:  32},
  {date: "12/1855", total: 43217, disease:   91, wounds:  18, other:  28},
  {date:  "1/1856", total: 44212, disease:   42, wounds:   2, other:  48},
  {date:  "2/1856", total: 43485, disease:   24, wounds:   0, other:  19},
  {date:  "3/1856", total: 46140, disease:   15, wounds:   0, other:  35}
];

(function() {
  var format = pv.Format.date("%m/%y");
  crimea.forEach(function(d) { d.date = format.parse(d.date); });
})();
