import paper from "paper";
import _ from "lodash";
import Change from "./ChangeFlag.js"; // from paperjs

// props are array of array for now
//  points

let SimpleStrokeCustomPaper = paper.Path.extend(
  {
    _class: "SimplifyPath",
    initialize: function PathCustom(props) {
       // what happened with arg? not important as we don't use it to pass points normally?
      // call  super

      this._smoothFactor = 0 // this is not necessary as we set the default in next line
      PathCustom.base.call(this, {smoothFactor:0,...props}); //StarClass is the function name
      if (props.points) {
        debugger // temporary way to transfer point from mouse points to react paper,
        // instead of relying on pathData if we use tool
        props.points.forEach(p=>this.add(p))
      }
      this._smoothVersion = 0
      this._originalSegments = null
      this._drawSegments = null

    },
    draw: function PathCustomDraw (ctx, param, parentStrokeMatrix) {
      if (this._version!==this._smoothVersion) {
        this._originalSegments = _.clone(this._segments)  // need to create new array with same data pointer
        console.log("cloning original",this._originalSegments.length)

      }
      if (this._smoothFactor && this._version!==this._smoothVersion) {

        this.simplify(this._smoothFactor) // take out the segments with smoothed one
      }

      if (this._version!==this._smoothVersion) {
        this._drawSegments = _.clone(this._segments)// cached it
        console.log("cloning draw", this._drawSegments.length)
      }
      this._segments = this._drawSegments // change array pointer
      PathCustomDraw.base.call(this, ctx, param, parentStrokeMatrix); //StarClass is the function name
      this._segments = this._originalSegments  // change array pointer

      this._smoothVersion = this._version // take note when it is simplified so any change to segments will resimplify
    },
    setSmoothFactor: function (opt) {   //<---   prop change
      // pass down option object
      this._smoothFactor = opt; // cache for getOptions call
      this._smoothVersion = 0
      this._changed(/*#=*/ Change.SEGMENTS);
      // this._changed(/*#=*/ Change.GEOMETRY);
    },
    getSmoothFactor: function () {   //<---   prop getter
      return this._smoothFactor
    },

  }
);

export default SimpleStrokeCustomPaper;
