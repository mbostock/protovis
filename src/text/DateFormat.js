/**
 * Constructs a new date format with the specified string pattern.
 *
 * @class The format string is in the same format expected by the
 * <tt>strftime</tt> function in C. The following conversion specifications are
 * supported:<ul>
 *
 * <li>%a - abbreviated weekday name.</li>
 * <li>%A - full weekday name.</li>
 * <li>%b - abbreviated month names.</li>
 * <li>%B - full month names.</li>
 * <li>%c - locale's appropriate date and time.</li>
 * <li>%C - century number.</li>
 * <li>%d - day of month [01,31] (zero padded).</li>
 * <li>%D - same as %m/%d/%y.</li>
 * <li>%e - day of month [ 1,31] (space padded).</li>
 * <li>%h - same as %b.</li>
 * <li>%H - hour (24-hour clock) [00,23] (zero padded).</li>
 * <li>%I - hour (12-hour clock) [01,12] (zero padded).</li>
 * <li>%m - month number [01,12] (zero padded).</li>
 * <li>%M - minute [0,59] (zero padded).</li>
 * <li>%n - newline character.</li>
 * <li>%p - locale's equivalent of a.m. or p.m.</li>
 * <li>%r - same as %I:%M:%S %p.</li>
 * <li>%R - same as %H:%M.</li>
 * <li>%S - second [00,61] (zero padded).</li>
 * <li>%t - tab character.</li>
 * <li>%T - same as %H:%M:%S.</li>
 * <li>%x - same as %m/%d/%y.</li>
 * <li>%X - same as %I:%M:%S %p.</li>
 * <li>%y - year with century [00,99] (zero padded).</li>
 * <li>%Y - year including century.</li>
 * <li>%% - %.</li>
 *
 * </ul>The following conversion specifications are currently <i>unsupported</i>
 * for formatting:<ul>
 *
 * <li>%j - day number [1,366].</li>
 * <li>%u - weekday number [1,7].</li>
 * <li>%U - week number [00,53].</li>
 * <li>%V - week number [01,53].</li>
 * <li>%w - weekday number [0,6].</li>
 * <li>%W - week number [00,53].</li>
 * <li>%Z - timezone name or abbreviation.</li>
 *
 * </ul>In addition, the following conversion specifications are currently
 * <i>unsupported</i> for parsing:<ul>
 *
 * <li>%a - day of week, either abbreviated or full name.</li>
 * <li>%A - same as %a.</li>
 * <li>%c - locale's appropriate date and time.</li>
 * <li>%C - century number.</li>
 * <li>%D - same as %m/%d/%y.</li>
 * <li>%I - hour (12-hour clock) [1,12].</li>
 * <li>%n - any white space.</li>
 * <li>%p - locale's equivalent of a.m. or p.m.</li>
 * <li>%r - same as %I:%M:%S %p.</li>
 * <li>%R - same as %H:%M.</li>
 * <li>%t - same as %n.</li>
 * <li>%T - same as %H:%M:%S.</li>
 * <li>%x - locale's equivalent to %m/%d/%y.</li>
 * <li>%X - locale's equivalent to %I:%M:%S %p.</li>
 *
 * </ul>
 *
 * @see <a
 * href="http://www.opengroup.org/onlinepubs/007908799/xsh/strftime.html">strftime</a>
 * documentation.
 * @see <a
 * href="http://www.opengroup.org/onlinepubs/007908799/xsh/strptime.html">strptime</a>
 * documentation.
 * @extends pv.Format
 * @param {string} pattern the format pattern.
 */
pv.Format.date = function(pattern) {
  var pad = pv.Format.pad;

  /** @private */
  function format(d) {
    return pattern.replace(/%[a-zA-Z0-9]/g, function(s) {
        switch (s) {
          case '%a': return [
              "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
            ][d.getDay()];
          case '%A': return [
              "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
              "Saturday"
            ][d.getDay()];
          case '%h':
          case '%b': return [
              "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
              "Oct", "Nov", "Dec"
            ][d.getMonth()];
          case '%B': return [
              "January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"
            ][d.getMonth()];
          case '%c': return d.toLocaleString();
          case '%C': return pad("0", 2, Math.floor(d.getFullYear() / 100) % 100);
          case '%d': return pad("0", 2, d.getDate());
          case '%x':
          case '%D': return pad("0", 2, d.getMonth() + 1)
                    + "/" + pad("0", 2, d.getDate())
                    + "/" + pad("0", 2, d.getFullYear() % 100);
          case '%e': return pad(" ", 2, d.getDate());
          case '%H': return pad("0", 2, d.getHours());
          case '%I': {
            var h = d.getHours() % 12;
            return h ? pad("0", 2, h) : 12;
          }
          // TODO %j: day of year as a decimal number [001,366]
          case '%m': return pad("0", 2, d.getMonth() + 1);
          case '%M': return pad("0", 2, d.getMinutes());
          case '%n': return "\n";
          case '%p': return d.getHours() < 12 ? "AM" : "PM";
          case '%T':
          case '%X':
          case '%r': {
            var h = d.getHours() % 12;
            return (h ? pad("0", 2, h) : 12)
                    + ":" + pad("0", 2, d.getMinutes())
                    + ":" + pad("0", 2, d.getSeconds())
                    + " " + (d.getHours() < 12 ? "AM" : "PM");
          }
          case '%R': return pad("0", 2, d.getHours()) + ":" + pad("0", 2, d.getMinutes());
          case '%S': return pad("0", 2, d.getSeconds());
          case '%Q': return pad("0", 3, d.getMilliseconds());
          case '%t': return "\t";
          case '%u': {
            var w = d.getDay();
            return w ? w : 1;
          }
          // TODO %U: week number (sunday first day) [00,53]
          // TODO %V: week number (monday first day) [01,53] ... with weirdness
          case '%w': return d.getDay();
          // TODO %W: week number (monday first day) [00,53] ... with weirdness
          case '%y': return pad("0", 2, d.getFullYear() % 100);
          case '%Y': return d.getFullYear();
          // TODO %Z: timezone name or abbreviation
          case '%%': return "%";
        }
        return s;
      });
  }

  /**
   * Converts a date to a string using the associated formatting pattern.
   *
   * @function
   * @name pv.Format.date.prototype.format
   * @param {Date} date a date to format.
   * @returns {string} the formatted date as a string.
   */
  format.format = format;

  /**
   * Parses a date from a string using the associated formatting pattern.
   *
   * @function
   * @name pv.Format.date.prototype.parse
   * @param {string} s the string to parse as a date.
   * @returns {Date} the parsed date.
   */
  format.parse = function(s) {
    var year = 1970, month = 0, date = 1, hour = 0, minute = 0, second = 0;
    var fields = [function() {}];

    /* Register callbacks for each field in the format pattern. */
    var re = pv.Format.re(pattern).replace(/%[a-zA-Z0-9]/g, function(s) {
        switch (s) {
          // TODO %a: day of week, either abbreviated or full name
          // TODO %A: same as %a
          case '%b': {
            fields.push(function(x) { month = {
                  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7,
                  Sep: 8, Oct: 9, Nov: 10, Dec: 11
                }[x]; });
            return "([A-Za-z]+)";
          }
          case '%h':
          case '%B': {
            fields.push(function(x) { month = {
                  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
                  July: 6, August: 7, September: 8, October: 9, November: 10,
                  December: 11
                }[x]; });
            return "([A-Za-z]+)";
          }
          // TODO %c: locale's appropriate date and time
          // TODO %C: century number[0,99]
          case '%e':
          case '%d': {
            fields.push(function(x) { date = x; });
            return "([0-9]+)";
          }
          // TODO %D: same as %m/%d/%y
          case '%I':
          case '%H': {
            fields.push(function(x) { hour = x; });
            return "([0-9]+)";
          }
          // TODO %j: day number [1,366]
          case '%m': {
            fields.push(function(x) { month = x - 1; });
            return "([0-9]+)";
          }
          case '%M': {
            fields.push(function(x) { minute = x; });
            return "([0-9]+)";
          }
          // TODO %n: any white space
          // TODO %p: locale's equivalent of a.m. or p.m.
          case '%p': { // TODO this is a hack
            fields.push(function(x) {
              if (hour == 12) {
                if (x == "am") hour = 0;
              } else if (x == "pm") {
                hour = Number(hour) + 12;
              }
            });
            return "(am|pm)";
          }
          // TODO %r: %I:%M:%S %p
          // TODO %R: %H:%M
          case '%S': {
            fields.push(function(x) { second = x; });
            return "([0-9]+)";
          }
          // TODO %t: any white space
          // TODO %T: %H:%M:%S
          // TODO %U: week number [00,53]
          // TODO %w: weekday [0,6]
          // TODO %W: week number [00, 53]
          // TODO %x: locale date (%m/%d/%y)
          // TODO %X: locale time (%I:%M:%S %p)
          case '%y': {
            fields.push(function(x) {
                x = Number(x);
                year = x + (((0 <= x) && (x < 69)) ? 2000
                    : (((x >= 69) && (x < 100) ? 1900 : 0)));
              });
            return "([0-9]+)";
          }
          case '%Y': {
            fields.push(function(x) { year = x; });
            return "([0-9]+)";
          }
          case '%%': {
            fields.push(function() {});
            return "%";
          }
        }
        return s;
      });

    var match = s.match(re);
    if (match) match.forEach(function(m, i) { fields[i](m); });
    return new Date(year, month, date, hour, minute, second);
  };

  return format;
};
