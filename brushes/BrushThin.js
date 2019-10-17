import { _globalLineWidth, BrushBase } from "./BrushBase";
export class BrushThin extends BrushBase {
  maxPoints = 10;

  constructor(context=null) {
    super(context);
    this.sizeMin = 1000;
    this.sizeMax = 20000;
  }

  doStroke(mouseX, mouseY) {
    if (this.points.length > this.maxPoints) {
      this.points = this.points.slice(this.points.length - this.maxPoints);
    }

    this.points.push([mouseX, mouseY]);

    var points = new Array();
    points.push([mouseX, mouseY]);
    points.push([this.mouseX, this.mouseY]);

    var a;
    var b;
    var g;

    var mul = 0.3;
    var intensity = this.sizeDraw;

    this.context.lineWidth =
      _globalLineWidth + 2 * (this.sizeDraw / this.sizeMax);

    var pointX;
    var pointY;

    var length = this.points.length;

    for (let i = 0; i < length; i++) {
      pointX = this.points[i][0];
      pointY = this.points[i][1];

      b = pointX - mouseX;
      a = pointY - mouseY;

      g = b * b + a * a;

      //console.log(g);

      if (g > 1000) {
        continue;
      }

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
