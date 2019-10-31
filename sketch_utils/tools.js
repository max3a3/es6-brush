import { get_cXY,set_oXY,canvas} from './movement'
import {$,$2D} from './generic'
import {vars,co} from "./settings";
import {marquee} from "./marquee";

// helper functions

function createFlow(b, type, callback) {
  var oX = b.X - get_cXY().X,
    oY = b.Y - get_cXY().Y,
    flow = Math.max(1, 100 - vars['flow_' + type]);

  function run(a, b, n) {
    var i = n / flow;
    if (n > 0) {
      for (; i > 0; i--) {
        callback(a * i, b * i);
      }
    } else {
      for (; i < 0; i++) {
        callback(a * i, b * i);
      }
    }
  };
  if (Math.abs(oX) > Math.abs(oY)) {
    run(flow, flow * (oY / oX), oX);
  } else {
    run(flow * (oX / oY), flow, oY);
  }
};

function mask_active(m) {
  var c = $2D('ctx_temp'),
    type = vars.type == 'shape' ? vars.shape : vars.type;
  c.globalCompositeOperation = canvas.mode;
  if (vars['movement_' + type] == 'anchored') {
    c.clearRect(0, 0, canvas.W, canvas.H);
  }
  if (m == 'down' && marquee.on) {
    c.save();
    c.beginPath();
    marquee.draw(c);
    c.clip();
    marquee.on = 0;
    window.clearInterval(marqueeID);
  }
  return c;
};

function mask_up(c) {
  var ctx_temp = document.getElementById('ctx_temp').getContext('2d');
  co.copy('ctx_temp', 'ctx_box');
  ctx_temp.clearRect(0, 0, canvas.W, canvas.H);
//  canvas.history_set();  wng no history_set
  if (marquee.ghost) {
    marquee.run();
    c.restore();
  }
  moved = false;
};

var moved = false;
export let draw
draw = {
  shape: function (a, b, m) {
    var c = mask_active(m);
    if (vars['movement_' + vars.shape] == 'freedraw') {
      set_oXY( b);
    }
    if (Math.abs(a.X - b.X) > 0 && Math.abs(a.Y - b.Y) > 0) {
      moved = true;
      c.beginPath();
      co[vars.shape](a, b, c);
      c.lineJoin = vars.lineJoin;
      c.lineWidth = vars['stroke_' + vars.shape];
      style(c, "fillStyle", "fill", a, b);
      style(c, "strokeStyle", "stroke", a, b);
      c.fill();
      c.stroke();
    }
    if (m == 'up' && moved) {
      mask_up(c);
    }
  },
  text: function (a, b, m) {
    var c = mask_active(m);
    // NOTES: Check into scale.
    if (m == "down" || m == "move") {
      c.beginPath();
      if (c.setFont) c.setFont(vars.fontSize + "px Liberation Sans");
      c.font = vars.fontSize + "px Liberation Sans, sans-serif";
      c.lineWidth = vars.stroke_text;
      style(c, "strokeStyle", "stroke", a, b);
      style(c, "fillStyle", "fill", a, b);
      c.fillText(vars.textMessage, b.X, b.Y);
      c.strokeText(vars.textMessage, b.X, b.Y);
    }
    if (m == "up") {
      mask_up(c);
    }
  },
  pencil: function (a, b, m) {
    var c = mask_active(m),
      d = $('ctx_brush'),
      D = vars.diameter_pencil,
      D2 = D * 2;

    function z(x, y) {
      c.drawImage(d, 0, 0, D2, D2, b.X - D - x, b.Y - D - y, D2, D2);
    };
    if (m == 'down') {
      z(0, 0);
    } else if (m == 'move') {
      createFlow(b, 'pencil', z);
    }
    if (m == "up") {
      mask_up(c);
    }
  },
  brush: function (a, b, m) {
    var c = mask_active(m),
      d = $('ctx_brush'),
      D = vars.diameter_brush,
      D2 = D * 2;

    function z(x, y) { // draw to ctx_temp from brush
      c.drawImage(d, 0, 0, D2, D2, b.X - D - x, b.Y - D - y, D2, D2);
    };
    if (m == 'down') {
      z(0, 0);
    } else if (m == 'move') {
      createFlow(b, 'brush', z);
    }
    if (m == "up") {
      mask_up(c);
    }
  },
  calligraphy: function (a, b, m) {
    var c = mask_active(m),
      d = $('ctx_stamp'),
      r = co.stamp.r,
      D = vars.diameter_calligraphy / 100,
      D2 = D * 2;

    function z(x, y) {
      c.drawImage(d, 0, 0, r.W, r.H, b.X - ((r.W * D) / 2) - x, b.Y - ((r.H * D) / 2) - y, r.W * D, r.H * D);
    };
    if (m == 'down') {
      z(0, 0);
    } else if (m == 'move') {
      createFlow(b, 'calligraphy', z);
    }
    if (m == "up") {
      mask_up(c);
    }
  },
  stamp: function (a, b, m) {
    var c = mask_active(m),
      d = $('ctx_stamp'),
      r = co.stamp.r,
      D = vars.diameter_stamp,
      D2 = D * 2;

    function z(x, y) {
      var n = Math.random(),
        zoom = Math.max(vars.rand_max / 100, Math.min(vars.rand_min / 100, n));
      c.drawImage(d, 0, 0, r.W, r.H, b.X - ((r.W * zoom) / 2) - x, b.Y - ((r.H * zoom) / 2) - y, r.W * zoom, r.H * zoom);
    };
    if (m == 'down') {
      z(0, 0);
    } else if (m == 'move') {
      createFlow(b, 'stamp', z);
    }
    if (m == "up") {
      mask_up(c);
    }
  },
  eraser: function (a, b, m) {
    if (m == "down") {
      co.copy('ctx_box', 'ctx_temp');
      co.del('ctx_box');
    }
    var c = mask_active(m),
      D = vars.diameter_eraser,
      D2 = D * 2;

    function z(x, y) {
      c.drawImage($('ctx_brush'), 0, 0, D2, D2, b.X - D - x, b.Y - D - y, D2, D2);
    };
    if (m == 'down') {
      c.globalCompositeOperation = 'destination-out';
      z(0, 0);
    } else {
      c.globalCompositeOperation = 'destination-out';
      createFlow(b, 'eraser', z);
    }
    c.globalCompositeOperation = 'source-over';
    if (m == "up") {
      mask_up(c);
    }
  },
  fill: function (a, b, m) {
    var c = mask_active(m),
      type = vars.fill;
    if (type == 'gradient') {
      c.beginPath();
      c.lineWidth = 0.5;
      c.lineCap = 'round';
      c.moveTo(a.X, a.Y);
      c.lineTo(b.X, b.Y);
      c.strokeStyle = 'rgba(127,127,127,1)';
      c.stroke();
      c.drawImage(path['point'], 0, 0, 7, 7, a.X - 4, a.Y - 4, 7, 7);
      c.drawImage(path['node_select'], 0, 0, 7, 7, b.X - 4, b.Y - 4, 7, 7);
      if (m == "up") {
        co.del('ctx_temp');
        style(c, "fillStyle", "fill", a, b);
        c.rect(0, 0, canvas.W, canvas.H);
        c.fill();
        mask_up(c);
      }
    } else if (m == "down") {
      style(c, "fillStyle", "fill", a, b);
      c.rect(0, 0, canvas.W, canvas.H);
      c.fill();
      mask_up(c);
    }
  }
};

