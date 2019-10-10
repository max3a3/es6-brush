export const _globalLineWidth = 0.2;
export class BrushBase {
  sizeMin = 0;
  sizeMax = 0;
  sizeDraw = 0;

  mouseX = null;
  mouseY = null;

  context = null; //  CanvasRenderingContext2D todo:how to add typehint without crapping on stackblitz?

  lineWidth = null;
  opacity = null;

  points = null;

  symmetry = [];

  constructor(context) {
    this.context = context;

    this.points = new Array();
  }

  beginStroke(color, size, symmetry, mouseX, mouseY, shadow) {
    this.mouseX = mouseX;
    this.mouseY = mouseY;

    this.sizeDraw = this.sizeMin + (size * (this.sizeMax - this.sizeMin)) / 20;

    this.symmetry = symmetry;

    if (shadow) {
      this.context.shadowOffsetX = 5;
      this.context.shadowOffsetY = 5;
      this.context.shadowBlur = 5;
      this.context.shadowColor = "black";
    } else {
      this.context.shadowColor = "transparent";
    }

    this.context.lineWidth = _globalLineWidth;
    this.context.strokeStyle = color;
    this.context.globalCompositeOperation = "source-over";
  }

  doStroke(mouseX, mouseY) {}

  endStroke(mouseX, mouseY) {}

  draw(points) {
    var pointsToDraw = this.applySymmetry(points);

    var length = pointsToDraw.length;

    var from;
    var to;

    this.context.beginPath();
    // console.log("brush length", length);
    for (let i = 0; i < length; i += 2) {
      from = pointsToDraw[i];
      to = pointsToDraw[i + 1];

      this.context.moveTo(from[0], from[1]);
      this.context.lineTo(to[0], to[1]);
    }

    this.context.stroke();
  }

  applySymmetry(points) {
    if (this.symmetry != null && this.symmetry.length != 0) {
      var pointsToDraw = points;

      var length = this.symmetry.length;

      var from;
      var to;

      var newPoints;

      var angleBegin;

      for (let i = 0; i < length; ++i) {
        if (this.symmetry[i].isRotate()) {
          angleBegin = this.symmetry[i].angleBegin;

          this.symmetry[i].angleBegin += this.symmetry[i].angleStep;
        }

        newPoints = this.symmetry[i].transform(pointsToDraw);

        if (this.symmetry[i].isRotate()) {
          this.symmetry[i].angleBegin = angleBegin;
        }

        pointsToDraw = pointsToDraw.concat(newPoints);
      }

      return pointsToDraw;
    } else {
      return points;
    }
  }
}
