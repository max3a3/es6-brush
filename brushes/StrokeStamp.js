// stamp it
// this is for add stroke paper object callback as opposed to add brush paper object callback
//   type = stroke- xxx
import {_globalLineWidth, BrushBase} from "./BrushBase";
import invariant from 'invariant'
export class StrokeStamp extends BrushBase {

  constructor(context, paper_ref) {  // *** not working yet, see pmain about stamping on top of a curve, for working see StrokeSimple
    super(context, paper_ref);
    this.path = null

    this.paper = paper_ref

    // this.testPath()
  }

  testPath() {
    let points = [[10, 10], [20, 15], [35, 40], [50, 50], [60, 40], [55, 30], [70, 10], [75, 30], [85, 50]]


    this.path = new this.paper.Path();
    this.path.strokeColor = 'black';
    points.forEach(p => this.path.add(new this.paper.Point(p)))
  }

  beginStroke(color, size, symmetry, mouseX, mouseY, shadow = false,options) {
    this.options = {color:'black',...options}  // assign default in the first parts
    this.path = new this.paper.Path();
    this.path.strokeColor = this.options.color;
    this.path.add(new this.paper.Point(mouseX, mouseY))
  }

  doStroke(mouseX, mouseY) {
    invariant(this.path, 'must have path')
    this.path.add(new this.paper.Point(mouseX, mouseY))
  }

  endStroke(mouseX, mouseY) {
  }
}
