/**
 * Supports CSV parsing and formatting.
 */
pv.Format.csv = function() {
  return new pv.CsvFormat();
};

pv.CsvFormat = function() {};

/**
 * Gets or sets whether this CSV format uses a header line. When parsing and
 * formatting, the first line is the header line which specifies the field names
 * for each column. Note that enabling a header line changes the input and
 * output format: when headers are disabled, a two-dimensional array is used;
 * when headers are enabled, a one-dimensional array of objects is used.
 *
 * @param {boolean} x whether to enable the header line.
 */
pv.CsvFormat.prototype.header = function(x) {
  if (arguments.length) {
    this.$header = x;
    return this;
  }
  return this.$header;
};

/**
 * Parses the specified CSV string. If this formatter is configured to treat the
 * first line as the header line, then the return value will be an array of
 * objects. The attributes of these objects are determined by the field names
 * from the header line. Otherwise, the return value will be an array of arrays.
 *
 * @param {string} s the CSV string.
 * @param {array} an array of elements parsed from CSV.
 */
pv.CsvFormat.prototype.parse = function(s) {
  var EOL = {}, // sentinel value for end-of-line
      EOF = {}, // sentinel value for end-of-file
      rows = [], // output rows
      re = /[,\n]/g, // field separator regex
      t, // the current token
      eol; // is the current token followed by EOL?

  /* Returns the next token. */
  function token() {
    if (re.lastIndex == s.length) return EOF; // special case: end of file
    if (eol) { eol = false; return EOL; } // special case: end of line

    // special case: quotes
    var j = re.lastIndex;
    if (s.charAt(j) == "\"") {
      var i = j;
      out: while (i++ < s.length) {
        switch (s.charAt(i)) {
          case "\"": {
            if (s.charAt(i + 1) == "\"") {
              i++;
              break;
            }
            break out;
          }
        }
      }
      if (s.charAt(i + 1) == "\n") eol = true;
      re.lastIndex = i + 2;
      return s.substring(j + 1, i).replace(/""/g, "\"");
    }

    // common case
    var m = re.exec(s);
    if (m) {
      if (m[0] == "\n") eol = true;
      return s.substring(j, m.index);
    }
    re.lastIndex = s.length;
    return s.substring(j);
  }

  if (this.$header) {
    var keys = [];
    while (((t = token()) !== EOL) && (t !== EOF)) keys.push(t);
    var k = 0;
    while ((t = token()) !== EOF) {
      var o = {}, j = 0;
      rows.push(o);
      while ((t !== EOL) && (t !== EOF)) {
        o[keys[j++]] = t;
        t = token();
      }
    }
  } else {
    while ((t = token()) !== EOF) {
      var a = [];
      rows.push(a);
      while ((t !== EOL) && (t !== EOF)) {
        a.push(t);
        t = token();
      }
    }
  }

  return rows;
};

/**
 * Formats the specified array to a CSV string. If this formatter is configured
 * to output the header line as the first line, then <i>a</i> should be an array
 * of objects. The attributes of the first element will be used to determine the
 * field names. Otherwise, <i>a</i> should be an array of arrays.
 *
 * @param {array} a the array of elements to output as CSV.
 * @returns {string} a CSV string.
 */
pv.CsvFormat.prototype.format = function(a) {
  if (!a.length) return "";
  var lines = [];
  if (this.$header) {
    var keys = pv.keys(a[0]);
    lines.push(keys.map(pv.CsvFormat.quote).join(","));
    for (var i = 0; i < a.length; i++) {
      lines.push(keys.map(function(key) {
          return pv.CsvFormat.quote(a[i][key]);
        }).join(","));
    }
  } else {
    for (var i = 0; i < a.length; i++) {
      lines.push(a[i].map(pv.CsvFormat.quote).join(","));
    }
  }
  return lines.join("\n");
};

/**
 * Quotes the specified string <i>s</i>, but only if necessary. Quoting is
 * necessary for special characters: double quotes, commas, and newlines.
 *
 * @param {string} s a string to quote.
 * @returns {string} the quoted string, or <i>s</i> is quoting is not needed.
 */
pv.CsvFormat.quote = function(s) {
  return /[",\n]/.test(s) ? ("\"" + s.replace(/\"/g, "\"\"") + "\"") : s;
};
