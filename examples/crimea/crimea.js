var causes = ["wounds", "other", "disease"];

var crimea = [
  { date: "4/1854", wounds: 0, other: 5, disease: 1, total: 8571 },
  { date: "5/1854", wounds: 0, other: 9, disease: 12, total: 23333 },
  { date: "6/1854", wounds: 0, other: 6, disease: 11, total: 28333 },
  { date: "7/1854", wounds: 0, other: 23, disease: 359, total: 28772 },
  { date: "8/1854", wounds: 1, other: 30, disease: 828, total: 30246 },
  { date: "9/1854", wounds: 81, other: 70, disease: 788, total: 30290 },
  { date: "10/1854", wounds: 132, other: 128, disease: 503, total: 30643 },
  { date: "11/1854", wounds: 287, other: 106, disease: 844, total: 29736 },
  { date: "12/1854", wounds: 114, other: 131, disease: 1725, total: 32779 },
  { date: "1/1855", wounds: 83, other: 324, disease: 2761, total: 32393 },
  { date: "2/1855", wounds: 43, other: 361, disease: 2120, total: 30919 },
  { date: "3/1855", wounds: 32, other: 172, disease: 1205, total: 30107 },
  { date: "4/1855", wounds: 48, other: 57, disease: 477, total: 32252 },
  { date: "5/1855", wounds: 49, other: 37, disease: 508, total: 35473 },
  { date: "6/1855", wounds: 209, other: 31, disease: 802, total: 38863 },
  { date: "7/1855", wounds: 134, other: 33, disease: 382, total: 42647 },
  { date: "8/1855", wounds: 164, other: 25, disease: 483, total: 44614 },
  { date: "9/1855", wounds: 276, other: 20, disease: 189, total: 47751 },
  { date: "10/1855", wounds: 53, other: 18, disease: 128, total: 46852 },
  { date: "11/1855", wounds: 33, other: 32, disease: 178, total: 37853 },
  { date: "12/1855", wounds: 18, other: 28, disease: 91, total: 43217 },
  { date: "1/1856", wounds: 2, other: 48, disease: 42, total: 44212 },
  { date: "2/1856", wounds: 0, other: 19, disease: 24, total: 43485 },
  { date: "3/1856", wounds: 0, other: 35, disease: 15, total: 46140 }
];

(function() {
  var format = pv.Format.date("%m/%y");
  crimea.forEach(function(d) { d.date = format.parse(d.date); });
})();
