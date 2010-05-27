/* Generate an Irwin-Hall distribution. */
var experiment = {
  trials: 10000, // number of trials
  variables: 5 // number of random variables
};
experiment.values = pv.range(experiment.trials).map(function() {
  return pv.sum(pv.range(experiment.variables), Math.random);
});
