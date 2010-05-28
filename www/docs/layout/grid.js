vis.add(pv.Layout.Grid)
    .rows(heatmap)
  .cell.add(pv.Bar)
    .fillStyle(pv.Scale.linear()
        .domain(95, 115, 135, 155, 175, 195)
        .range("#0a0", "#6c0", "#ee0", "#eb4", "#eb9", "#fff"));
