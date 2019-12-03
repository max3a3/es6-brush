gui_gradient = {
  // Mouse
  'slide_x': function (a, b, m) {
    var g = vars[vars.id + 'GD'],
      r = g[gui_gradient.o.id.substr(2)];
    if (N.between(b.Y, 0, 40)) {
      if (gui_gradient.del) {
        gui_gradient.o.style.display = 'block';
        gui_gradient.del = '';
        r[2] = 0;
      }
      r[0] = Math.round(Math.min(1, Math.max(0, b.X / 169)) * 1000) / 1000;
      $('gPos').innerHTML = Math.round(r[0] * 100) + '<span class="small">%</span>';
      gui_gradient.o.style.left = (Math.max(0, b.X) - 5) + 'px';
    } else if (g.length > 2) {
      gui_gradient.o.style.display = 'none';
      gui_gradient.del = gui_gradient.o;
      r[2] = 1;
    }
    if (m == 'up' && gui_gradient.del && g.length > 2) gui_gradient.remove();
    infc.info(m, 'cGD2', 'gPos');
    gui_gradient.fill(m);
  },
  'slide_y': function (a, b, m) {
    var g = vars[vars.id + 'GD'],
      op = Math.round((1 - (b.Y + 5) / 91) * 1000) / 1000;
    $S('gOpacity').top = b.Y + 'px';
    $('gPos').innerHTML = Math.round(op * 100) + '<span class="small">%</span>';
    vars.opacity_fill = op * 100;
    if($('opacity_fillCur') && vars.id == "fill") {
      $('opacity_fillCur').style.left = parseInt(op * 110) + 'px';
      $('opacity_fillCurV').innerHTML = parseInt(op * 100);
    }
    for (var i in g) {
      g[i][1][3] = op;
    }
    infc.info(m, 'cGD2', 'gPos');
    gui_gradient.run('false', m);
    gui_gradient.cs();
  },
  'slide_o': function (o, m, a, x) {
    a.X += x.oX;
    a.Y += x.oY;
    var o = $S('gAngle'),
      W = 132,
      W2 = W / 2,
      R = Math.atan2(a.X - W2 - 3, W - a.Y - W2 - 6);
    gui_gradient.rotate = R;
    o.left = (Math.abs((Math.sin(R) * W2) + W2) + 30) + 'px';
    o.top = (Math.abs((Math.cos(R) * W2) - W2) + 40) + 'px';
    $('gPos').innerHTML = Math.round((gui_gradient.rotate + (Math.PI * 2.5)) * (180 / Math.PI) % 360) + '&deg;';
    infc.info(m, 'cGD2', 'gPos');
    gui_gradient.fill(m);
  },
  'cur': function (o) {
    if (gui_gradient.o) gui_gradient.o.className = '';
    o.className = 'cur';
    gui_gradient.o = o;
  },
  'add': function (e) {
    if (stop) {
      var g = vars[vars.id + 'GD'],
        n = g.length;
      g[n] = [0, deObject(vars[vars.id + 'GD'][gui_gradient.o.id.substr(2)][1])];
      gui_gradient.mk_x('gd' + n);
      core.fu('gd' + n, e, {
          fu: core.X,
          oX: 0,
          oY: 15,
          X1: 0,
          X2: 169
        },
        gui_gradient.slide_x);
    }
  },
  'remove': function (o) {
    vars[vars.id + 'GD'].splice(gui_gradient.del.id.substr(2), 1);
    gui_gradient.mk_x();
  },
  // Create
  'mk': function () {
    var o = $C('MM', 'gradient')[0];
    o.innerHTML = '<div class="z" onmousedown="gui_swatch.toType(\'GD\')">' + ' <div onmousedown="core.fu(\'cGD1\',event, {fu:gui_gradient.slide_o, oX:-7, oY:-13}); return false;" id="gAngle" class="blue_dot" title="Angle"></div>' + ' <div onmousedown="core.fu(\'cGD1\',event, {fu:core.Y, oX:0, oY:-41, Y1:-5, Y2:86}, gui_gradient.slide_y); return false;" class="blue_slide"><div id="gOpacity" class="blue_dot" title="Opacity"></div></div>' + ' <div id="gPos"></div>' + ' <canvas id="cGD1" height="169" width="169"></canvas>' + ' <canvas id="cGD2" onmousedown="core.fu(\'cGD1\',event, {fu:gui_gradient.slide_o, oX:-7, oY:-13})" height="169" width="169"></canvas>' + ' <div class="slide_x" onmousedown="gui_gradient.add(event)"></div>' + '</div>';
    gui_gradient.mk_x();
    infc.info_draw('cGD2');
    if (vars[vars.id] == 'gradient') gui_gradient.cs();
  },
  'mk_x': function (o) {
    var g = vars[vars.id + 'GD'],
      z = '';
    for (var i in g) z += '<div onmousedown="gui_gradient.cur(this); gui_gradient.cs(); core.fu(\'gd' + i + '\',event,{fu:core.X, oX:0, oY:15, X1:0, X2:169}, gui_gradient.slide_x)" id="gd' + i + '" style="left: ' + ((g[i][0] * 169) - 5) + 'px"><canvas height="7" width="7"></canvas></div>';
    $C('slide_x', 'gradient')[0].innerHTML = z;
    gui_gradient.cur($(o ? o : 'gd' + i));
    gui_gradient.run('false', 'move');
  },
  // Visualizer
  'run': function (v, m) {
    var g = vars[vars.id + 'GD'];
    function z(i) {
      var c = $T('canvas', 'gd' + i)[0].getContext('2d');
      c.clearRect(0, 0, 7, 7);
      c.rect(0,0,7,7);
      co.style.fill(c, 'rgba(' + g[i][1].join(',') + ')');
    }
    if (isNaN(v)) {
      for (var i in g) {
        z(i);
      }
    } else {
      z(v);
    }
    gui_gradient.fill(m);
  },
  'fill': function (m) {
    var c = $2D('cGD1'),
      g = vars[vars.id + 'GD'];
    co.gradient({
        'X': 0,
        'Y': 0
      },
      {
        'X': 169,
        'Y': 169
      },
      c, g, 'fill');
    c.clearRect(0, 0, 169, 169);
    c.fillRect(0, 0, 169, 169);
    if (m == 'up') gui_palette.create();
    else gui_palette.update('', m);
  },
  // Data
  'cs': function (v) {
    v = vars[vars.id + 'GD'][gui_gradient.o.id.substr(2)][1];
    gui_color.run('set', v);
  },
  'rotate': (Math.PI / 2) + Math.PI
};
