import { BrushThin } from "../brushes/BrushThin";
import { BrushStar } from "../brushes/BrushStar";
import { BrushSketchy } from "../brushes/BrushSketchy";

let _brush;
export function initBrush(context) {
  // _brush = new BrushThin(context);
  // _brush = new BrushStar(context);
  _brush = new BrushSketchy(context);
}

export default function getBrush() {
  return _brush;
}
