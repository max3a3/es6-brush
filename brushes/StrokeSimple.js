// stamp it
// this is for add stroke paper object callback as opposed to add brush paper object callback
//   type = stroke- xxx
import {_globalLineWidth, BrushBase} from "./BrushBase";
import invariant from 'invariant'
import SimpleStrokeCustomPaper from "../paper-object/SimpleStrokeCustom";
export class StrokeSimple extends BrushBase {

  constructor(context, paper_ref) {
    super(context, paper_ref);
    this.path = null

    this.paper = paper_ref

    // this.testPath()
  }


  beginStroke(color, size, symmetry, mouseX, mouseY, shadow = false,options) {
    this.options = {color:'black',simplify:10,...options}  // assign default in the first parts
    this.path = new SimpleStrokeCustomPaper({project:this.paper.project});  // how to set the paper project for this?  it is part of the props?
    this.path.strokeColor = this.options.color;
    this.path.add(new this.paper.Point(mouseX, mouseY))
    this.path.smoothFactor = 10
  }

  doStroke(mouseX, mouseY) {
    invariant(this.path, 'must have path')
    this.path.add(new this.paper.Point(mouseX, mouseY))

  }

  endStroke(mouseX, mouseY) {
    debugger
    // todo remove the preview path, i think we want to use tool component so it is more comnformat wiht other project
    //  can use tool api for brushthin as we have separate canvas anyway
  }
}
