import { BrushThin } from "../brushes/BrushThin";
import { BrushStar } from "../brushes/BrushStar";
import { BrushSketchy } from "../brushes/BrushSketchy";
import {StrokeStamp} from "../brushes/StrokeStamp";
import {StrokeSimple} from "../brushes/StrokeSimple";
import invariant from 'invariant'
let _brushThin;

let _strokeStamp,_strokeSimple;

//todo move this function out
export function initBrush(context,paper_ref) {
  _brushThin = new BrushThin(context);
  // _brush = new BrushStar(context);
  // _brush = new BrushSketchy(context);

  _strokeStamp = new StrokeStamp(context,paper_ref)
  _strokeSimple = new StrokeSimple(context,paper_ref)
}

export default function getBrush(brush_type) {

  if (brush_type==='brush:BrushThin')
    return _brushThin;
  if (brush_type==='stroke:StrokeStamp')
    return _strokeStamp;
  if (brush_type==='stroke:StrokeSimple')
    return _strokeSimple;

  invariant(0,`wrong value ${brush_type}`)
}
