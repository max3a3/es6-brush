import { _globalLineWidth, BrushBase } from "./BrushBase";

export class BrushSketchy extends BrushBase {
  constructor(context) {
    super(context);

    this.sizeMin = 200;
    this.sizeMax = 4000;
  }
  doStroke(mouseX, mouseY) {
    this.points.push([mouseX, mouseY]);

    var points = new Array();
    points.push([mouseX, mouseY]);
    points.push([this.mouseX, this.mouseY]);

    var a;
    var b;
    var g;

    var mul = 0.3;
    var intensity = this.sizeDraw;

    var pointX;
    var pointY;

    var i;

    var length = this.points.length;

    for (i = 0; i < length; i++) {
      pointX = this.points[i][0];
      pointY = this.points[i][1];

      b = pointX - mouseX;
      a = pointY - mouseY;

      g = b * b + a * a;

      if (Math.random() > g / intensity) {
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
