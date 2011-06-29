var label = new pv.Label()
    .font("bold 14px sans-serif")
    .left(function() this.parent.width() / 2)
    .top(function() this.parent.height() / 2)
    .textAlign("center")
    .textBaseline("middle")
    .text(function() this.parent.width() + "\u00d7" + this.parent.height())
    .textStyle(pv.Colors.category10().by(pv.child));
