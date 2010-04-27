var data = {
    range: [0, 3500000], //range of values in an array -> first position: min, last position: max
    min: 2100000, //minimum acceptable value
    accpt: 750000, //incremental distance to ok range outer bound
    goal: 3000000, //goal
    prev: 1150000, //last period reported actuals
    actuals: 2300000, //current reported actuals
    runrate: 3010000, //runrate or forecast 
    title: "Revenue Q3 2009", //above the chart
    subtitle: "as of 11/21/09", //below the value label
    vnorm: ["#1e71b8", "#5b93c4"], //define the normal colors for actuals and runrate
    vwarn: ["#c43a34", "#ce7874"] //define the warning colors for actuals and runrate
};

