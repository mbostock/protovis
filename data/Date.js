pv.Date = function(date) {
  this.date = date;
};

pv.Date.parse = function(s, format) {
  var date = new Date(1970, 1, 1); // local time

  var fields = [function() null];
  format = format.replace(/[\\\^\$\*\+\?\[\]\(\)\.\{\}]/g, "\\$&");
  format = format.replace(/%[a-zA-Z0-9]/g, function(s) {
      switch (s) {
        case '%S': fields.push(function(s) date.setSeconds(s)); return "([0-9]+)";
        case '%M': fields.push(function(m) date.setMinutes(m)); return "([0-9]+)";
        case '%H': fields.push(function(h) date.setHours(h)); return "([0-9]+)";
        case '%d': fields.push(function(d) date.setDate(d)); return "([0-9]+)";
        case '%m': fields.push(function(m) date.setMonth(m - 1)); return "([0-9]+)";
        case '%Y': fields.push(function(y) date.setYear(y)); return "([0-9]+)";
        case '%%': fields.push(function() null); return "%";
        case '%y': {
          fields.push(function(y) {
              y = Number(y);
              date.setYear(y + (((0 <= y) && (y < 69)) ? 2000
                  : (((y >= 69) && (y < 100) ? 1900 : 0))));
            });
          return "([0-9]+)";
        }
      }
      return s;
    });

  var match = s.match(format);
  if (match) {
    match.forEach(function(m, i) fields[i](m));
  }

  return new pv.Date(date);
};

pv.Date.prototype.format = function(format) {
  return this.date.toLocaleFormat(format);
};
