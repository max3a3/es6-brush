import paper from "paper";
import _ from "lodash";
import { BrushThin } from "../brushes/BrushThin";

// props are array of array for now
//  points

let BrushCustomPaper = paper.Item.extend(
  /** @lends Shape# */ {
    _class: "BrushCustom",
    _applyMatrix: false,
    _canApplyMatrix: false,
    _canScaleStroke: true,

    // copy of Shape
    initialize: function Shape(props = {}, points = []) {
      this._initialize(props, points);
      this.brush = new BrushThin();
      this._points = points;
    },

    setPoints: function(opt) {
      //<---   prop change
      // pass down option object
      this._points = opt; // cache for getOptions call

      this.cachedStyle();

      this._callCreate(this._paper, opt); // recreate the custom
    },
    getPoints: function() {
      //<---   prop getter
      return this._points;
    },

    _draw: function(ctx, param, viewMatrix, strokeMatrix) {
      let s = this._points; // the point array
      let brushColor = "green";
      let brushSize = 2; // todo get from style
      let transforms = []; // mirror
      this.brush.setContext(ctx);
      this.brush.beginStroke(
        this.brushColor,
        this.brushSize,
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
