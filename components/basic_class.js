export function Point(x, y) {
  this.init(x, y);
}

Point.prototype = {
  x: 0,
  y: 0,

  init: function(x, y) {
    this.x = x;
    this.y = y;
  }
};

/////////////////////////////////////////////////////////////////
//
/////////////////////////////////////////////////////////////////

export function Line(fromX, fromY, toX, toY) {
  this.init(fromX, fromY, toX, toY);
}

Line.prototype = {
  from: null,
  to: null,

  data: null,

  init: function(fromX, fromY, toX, toY) {
    this.from = new Point(fromX, fromY);
    this.to = new Point(toX, toY);
  }
};

/////////////////////////////////////////////////////////////////
//
/////////////////////////////////////////////////////////////////

const Transform = {
  rotate: function(cx, cy, angle, x, y) {
    var s = Math.sin(angle);
    var c = Math.cos(angle);

    x -= cx;
    y -= cy;

    var xnew = x * c - y * s;
    var ynew = x * s + y * c;

    x = xnew + cx;
    y = ynew + cy;

    return { x: x, y: y };
  },

  rotatePoints: function(cx, cy, angle, points) {
    var length = points.length;

    var result = new Array(length);

    var s = Math.sin(angle);
    var c = Math.cos(angle);

    var pointX;
    var pointY;

    var xnew;
    var ynew;

    for (i = 0; i < length; i++) {
      pointX = points[i][0] - cx;
      pointY = points[i][1] - cy;

      xnew = pointX * c - pointY * s;
      ynew = pointX * s + pointY * c;

      xnew += cx;
      ynew += cy;

      result[i] = [xnew, ynew];
    }

    return result;
  },

  mirror: function(x1, y1, x2, y2, points) {
    var result = new Array();

    var vectorLengthX = x2 - x1;
    var vectorLengthY = y2 - y1;

    var pointX;
    var pointY;

    var crossX;
    var crossY;

    var mirroredX;
    var mirroredY;

    var k2;
    var i;

    var length = points.length;

    for (i = 0; i < length; i++) {
      pointX = points[i][0];
      pointY = points[i][1];

      crossX = pointX - vectorLengthY;
      crossY = pointY + vectorLengthX;

      k2 =
        ((pointX - x1) * vectorLengthY - vectorLengthX * (pointY - y1)) /
        (vectorLengthX * (crossY - pointY) - (crossX - pointX) * vectorLengthY);

      mirroredX = (crossX - pointX) * k2 + pointX;
      mirroredY = (crossY - pointY) * k2 + pointY;

      mirroredX = mirroredX + (mirroredX - pointX);
      mirroredY = mirroredY + (mirroredY - pointY);

      result.push([mirroredX, mirroredY]);
    }

    return result;
  }
};

/////////////////////////////////////////////////////////////////
//
/////////////////////////////////////////////////////////////////

export function TransformMode() {
  this.init();
}

TransformMode.prototype = {
  modeName: "none",
  modeId: null,

  vectorBegin: new Line(),
  vectorEnd: new Line(),
  vectorLength: new Line(),

  center: new Point(),

  angleBegin: 0,
  angleEnd: 0,
  angleStep: 0,

  init: function() {},

  setMirror: function(begin, end) {
    this.vectorBegin = begin;
    this.vectorEnd = end;

    this.vectorLength = new Point(end.x - begin.x, end.y - begin.y);

    this.modeName = "mirror";
  },

  setRotate: function(center, begin, end, step) {
    this.center = center;
    this.angleBegin = begin;
    this.angleEnd = end;
    this.angleStep = step;

    this.modeName = "rotate";
  },

  isMirror: function() {
    return this.modeName == "mirror";
  },

  isRotate: function() {
    return this.modeName == "rotate";
  },

  mirror: function(points) {
    return Transform.mirror(
      this.vectorBegin.x,
      this.vectorBegin.y,
      this.vectorEnd.x,
      this.vectorEnd.y,
      points
    );
  },

  rotate: function(points) {
    var result = new Array();

    for (var i = this.angleBegin; i < this.angleEnd; i += this.angleStep) {
      var angleInRad = (i * Math.PI) / 180.0;

      var newPoints = Transform.rotatePoints(
        this.center.x,
        this.center.y,
        angleInRad,
        points
      );

      result = result.concat(newPoints);
    }

    return result;
  },

  transform: function(points) {
    if (this.isRotate()) {
      return this.rotate(points);
    } else if (this.isMirror()) {
      return this.mirror(points);
    }

    return points;
  }
};
