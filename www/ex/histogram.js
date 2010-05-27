/* Generate an Irwin-Hall distribution. */
var experiment = {};

experiment.trials = 10000, // number of trials
experiment.rv = 10; // number of random variables
experiment.values = pv.range(experiment.trials).map(function() {
  return pv.sum(pv.range(experiment.rv), Math.random);
});

