/**
 * @ignore
 * @class
 */
pv.Geo = function() {};

pv.Geo.radians = function(degrees) {
  return(Math.PI * degrees / 180);
}

pv.Geo.degrees = function(radians) {
  return(180 * radians / Math.PI);
}