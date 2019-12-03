import {vars} from "./settings";

export function style(c, style, type, a, b) {
  switch(vars[type]) {  // here determine the fill color of the tools, only solid for now
    case "solid":
      c[style] = "rgba("+vars[type+'CO'].join(",")+")";
      break;
    case "gradient":
      var r = vars[type+'GD'],
        gradient = c.createLinearGradient(a.X, a.Y, b.X, b.Y);
      for (var key in r) {
        gradient.addColorStop(r[key][0], 'rgba(' + r[key][1].join(",") + ')');
      }
      c[style] = gradient;
      break;
    case "pattern":
      if(!vars[type+'PT~']) {
        gui_pattern.cache(type);
      }
      c[style] = vars[type+'PT~'];
      break;
  }
};
