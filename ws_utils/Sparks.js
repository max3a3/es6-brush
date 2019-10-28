import {__bind} from "./lib_utils";
import $ from 'jquery'

export default function Sparks(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.ctx.globalCompositeOperation = 'lighter';
  this.points = [];
}

Sparks.prototype.frame = function(dt) {
  var ctx, p, points, _i, _len;
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  points = this.points;
  ctx = this.ctx;
  while (points.length > 0 && points[0].age >= points[0].lifespan) {
    points.shift();
  }
  for (_i = 0, _len = points.length; _i < _len; _i++) {
    p = points[_i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.age++;
    if (p.age < p.lifespan) {
      ctx.beginPath();
      ctx.globalAlpha = p.a * (1 - p.age / p.lifespan);
      if (p.invertA) {
        ctx.globalAlpha = 1 - ctx.globalAlpha;
      }
      ctx.fillStyle = p.color;
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();
    }
  }
};

Sparks.prototype.add = function(x, y, params) {
  var p;
  p = $.extend({
    x: x,
    y: y,
    a: 1,
    age: 0,
    lifespan: 75,
    radius: 0.75,
    radiusScale: 1,
    color: '#ffffff',
    vx: 2 * Math.random() - 1,
    vy: Math.random() - 1
  }, params);
  p.radius *= p.radiusScale;
  this.points.push(p);
  return p;
};
