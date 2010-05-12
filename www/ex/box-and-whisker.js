var experiments = "ABCDEFG".split("").map(function(i) {
  var offset = Math.random()*3/4;
  var data = pv.range(0,15).map(function(i) {
    return offset + Math.random()/4;
  }).sort();

  return {
    id:i,
    median:data[7],
    uq:data[11],
    lq:data[3],
    max:data[data.length-1],
    min:data[0]
  };
})