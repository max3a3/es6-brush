import { BrushThin } from "../brushes/BrushThin";

let _brush;
export function initBrush(context) {
  _brush = new BrushThin(context);
}

export default function getBrush() {
  return _brush;
}
