// import Class from "./class_code";
var Class = require("class.extend");

var BrushBase = Class.extend("BrushBase", {
  sizeMin: 0,
  sizeMax: 0,
  sizeDraw: 0,

  mouseX: null,
  mouseY: null,

  context: null,

  lineWidth: null,
  opacity: null,

  points: null,

  symmetry: null,

  init: function(context) {
    this.context = context;

    this.points = new Array();
  },

  beginStroke: function(color, size, symmetry, mouseX, mouseY, shadow) {
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
  },

  doStroke: function(mouseX, mouseY) {},

  endStroke: function(mouseX, mouseY) {},

  draw: function(points) {
    var pointsToDraw = this.applySymmetry(points);

    var length = pointsToDraw.length;

    var from;
    var to;

    this.context.beginPath();

    for (i = 0; i < length; i += 2) {
      from = pointsToDraw[i];
      to = pointsToDraw[i + 1];

      this.context.moveTo(from[0], from[1]);
      this.context.lineTo(to[0], to[1]);
    }

    this.context.stroke();
  },

  applySymmetry: function(points) {
    if (this.symmetry != null && this.symmetry.length != 0) {
      var pointsToDraw = points;

      var i;

      var length = this.symmetry.length;

      var from;
      var to;

      var newPoints;

      var angleBegin;

      for (i = 0; i < length; ++i) {
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
});

var BrushThin = BrushBase.extend({
  name: "BrushThin",
  maxPoints: 10,

  init: function(context) {
    this.sizeMin = 1000;
    this.sizeMax = 20000;

    this._super(context);
  },

  doStroke: function(mouseX, mouseY) {
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

    var i;

    var length = this.points.length;

    for (i = 0; i < length; i++) {
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
});

let _brush;
export function initBrush(context) {
  debugger;
  _brush = new BrushThin(context);
}

export default _brush;
