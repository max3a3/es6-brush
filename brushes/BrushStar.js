import { _globalLineWidth, BrushBase } from "./BrushBase";

export class BrushStar extends BrushBase {
  constructor(context) {
    super(context);
    this.sizeMin = 100;
    this.sizeMax = 8000;

  }

  beginStroke(color, size, symmetry, mouseX, mouseY) {
    super.beginStroke(color, size, symmetry, mouseX, mouseY);

    this.points = new Array();
  }

  doStroke(mouseX, mouseY) {
    this.points.push([mouseX, mouseY]);

    var points = new Array();

    var a;
    var b;
    var g;

    var mul = 0.3;
    var intensity = this.sizeDraw;

    var pointX;
    var pointY;

    var i;
    var length = this.points.length;
    console.log(mouseX, mouseY, length);

    for (i = 0; i < length; i++) {
      pointX = this.points[i][0];
      pointY = this.points[i][1];

      b = pointX - this.points[0][0];
      a = pointY - this.points[0][1];

      g = b * b + a * a;

      if (g < intensity && Math.random() > g / intensity) {
        b *= mul;
        a *= mul;

        points.push([mouseX + b, mouseY + a]);
        points.push([pointX - b, pointY - a]);
      }
    }

    this.draw(points);

    this.mouseX = mouseX;
    this.mouseY = mouseY;
  }
}
