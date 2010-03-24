function testify(text) {
  var table = document.createElement("table"),
      lines = text.split("\n");
  table.className = "testify";
  for (var i = 0; i < lines.length; i++) {
    var tr = table.appendChild(document.createElement("tr")),
        cols = lines[i].split("\t");
    for (var j = 0; j < cols.length; j++) {
      tr.appendChild(document.createElement("td")).innerHTML = cols[j];
    }
    if (i > 1 && cols.length == 3) {
      tr.className = cols[1] == cols[2] ? "pass" : "fail";
    }
  }
  document.body.appendChild(table);
}
