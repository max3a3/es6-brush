

export default class BezierDraw {
  constructor(cvs) {
 this.ctx = cvs.getContext("2d");
}
getCtx() {
  let ctx = this.ctx // class conversion
  ctx.strokeStyle = "black";
  ctx.fillStyle = "none";
  return ctx
}
   drawCurve (curve, offset) {
     let ctx = this.getCtx() // class conversion

    offset = offset || { x:0, y:0 };
    var ox = offset.x;
    var oy = offset.y;
    ctx.beginPath();
    var p = curve.points, i;
    ctx.moveTo(p[0].x + ox, p[0].y + oy);
    if(p.length === 3) {
      ctx.quadraticCurveTo(
        p[1].x + ox, p[1].y + oy,
        p[2].x + ox, p[2].y + oy
      );
    }
    if(p.length === 4) {
      ctx.bezierCurveTo(
        p[1].x + ox, p[1].y + oy,
        p[2].x + ox, p[2].y + oy,
        p[3].x + ox, p[3].y + oy
      );
    }
    ctx.stroke();
    ctx.closePath();
  }

   drawSkeleton(curve, offset, nocoords) {
     let ctx = this.getCtx() // class conversion

     offset = offset || { x:0, y:0 };
    var pts = curve.points;
    ctx.strokeStyle = "lightgrey";
    this.drawLine(pts[0], pts[1], offset);
    if(pts.length === 3) { this.drawLine(pts[1], pts[2], offset); }
    else {this.drawLine(pts[2], pts[3], offset); }
    ctx.strokeStyle = "black";
    if(!nocoords) this.drawPoints(pts, offset);
  }

  drawLine(p1, p2, offset) {
    let ctx = this.getCtx() // class conversion

    offset = offset || { x:0, y:0 };
    var ox = offset.x;
    var oy = offset.y;
    ctx.beginPath();
    ctx.moveTo(p1.x + ox,p1.y + oy);
    ctx.lineTo(p2.x + ox,p2.y + oy);
    ctx.stroke();
  }

  drawPoint(p, offset) {
    let ctx = this.getCtx() // class conversion

    offset = offset || { x:0, y:0 };
    var ox = offset.x;
    var oy = offset.y;
    ctx.beginPath();
    ctx.arc(p.x + ox, p.y + oy, 5, 0, 2*Math.PI);
    ctx.stroke();
  }
  drawPoints(points, offset) {
    offset = offset || { x:0, y:0 };
    points.forEach(function(p) {
      this.drawCircle(p, 3, offset);
    }.bind(this));
  }
  drawArc(p, offset) {
    let ctx = this.getCtx() // class conversion
    offset = offset || { x:0, y:0 };
    var ox = offset.x;
    var oy = offset.y;
    ctx.beginPath();
    ctx.moveTo(p.x + ox, p.y + oy);
    ctx.arc(p.x + ox, p.y + oy, p.r, p.s, p.e);
    ctx.lineTo(p.x + ox, p.y + oy);
    ctx.fill();
    ctx.stroke();
  }

  drawCircle(p, r, offset) {
    let ctx = this.getCtx() // class conversion
    offset = offset || { x:0, y:0 };
    var ox = offset.x;
    var oy = offset.y;
    ctx.beginPath();
    ctx.arc(p.x + ox, p.y + oy, r, 0, 2*Math.PI);
    ctx.stroke();
  }

  drawbbox(bbox, offset) {
    let ctx = this.getCtx() // class conversion
    offset = offset || { x:0, y:0 };
    var ox = offset.x;
    var oy = offset.y;
    ctx.beginPath();
    ctx.moveTo(bbox.x.min + ox, bbox.y.min + oy);
    ctx.lineTo(bbox.x.min + ox, bbox.y.max + oy);
    ctx.lineTo(bbox.x.max + ox, bbox.y.max + oy);
    ctx.lineTo(bbox.x.max + ox, bbox.y.min + oy);
    ctx.closePath();
    ctx.stroke();
  }

}
