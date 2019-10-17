import paper from "paper";
import _ from "lodash";
import { BrushThin } from "../brushes/BrushThin";
import Change from "./ChangeFlag"; // from paperjs

// props are array of array for now
//  points

let BrushCustomPaper = paper.Item.extend(
  /** @lends Shape# */ {
    _class: "BrushCustom",
    _applyMatrix: false,
    _canApplyMatrix: false,
    _canScaleStroke: true,

    // copy of Shape
    initialize: function BrushCustom(props = {}, points, point = null) {
      //point is for initial value for translate,
      //  or pass in props.position
      this._initialize(props, point);
      this.brush = new BrushThin();
      this.setPoints(points);
    },

    setPoints: function(opt) {
      //<---   prop change
      // pass down option object
      this._points = opt; // cache for getOptions call

      this._changed(/*#=*/ Change.GEOMETRY);
    },
    getPoints: function() {
      //<---   prop getter
      return this._points;
    },

    _draw: function(ctx, param, viewMatrix, strokeMatrix) {
      let s = this._points; // the point array
      let brushColor = this.strokeColor;
      let brushSize = this.strokeWidth; // todo get from style
      let transforms = []; // mirror
      this.brush.setContext(ctx);
      this.brush.beginStroke(
        brushColor.toCSS(),
        brushSize,
        transforms,
        s[0][0],
        s[0][1]
      );
      for (let i = 1; i < s.length; i++) {
        this.brush.doStroke(s[i][0], s[i][1]);
      }
      this.brush.endStroke();
    }
  }
);

export default BrushCustomPaper;
