gui_palette = {

  click: function (v) {
    if(vars.id == v) {
      return;
    }
    gui_palette.zindex(v);
    gui_palette.run(gui_swatch.L2S[vars[vars.id = v]]);
  },
  zindex: function (v) {
    var r = {
      'fill': 'stroke',
      'stroke': 'fill'
    };
    function fu(v, c, i) {
      var o = $(v).parentNode.style;
      o.zIndex = i;
      o.cursor = c;
      $S(v).cursor = c;
    }
    fu(v, 'default', 2);
    fu(r[v], 'pointer', 1);
    $('swap').innerHTML = v.substr(0,1).toUpperCase();
  },
  current: function () {
    var q = gui_swatch.L2S,
      r = {
        'CO': 1,
        'GD': 1,
        'PT': 1
      },
      b;
    for (var i in r) {
      b = gui_swatch.n['fill' + i];
      gui_swatch.n['fill' + i] = gui_swatch.n['stroke' + i];
      gui_swatch.n['stroke' + i] = b;
    }
    var z = (vars.id == 'fill'),
      a = z ? 'stroke' : 'fill',
      b = z ? 'fill' : 'stroke',
      z = '';
    if (vars.fill == 'pattern' || vars.stroke == 'pattern') {
      gui_pattern.o[a] = vars[b + 'PT'];
      gui_pattern.o[b] = vars[a + 'PT'];
      gui_pattern.create();
    }
    z = vars[a];
    vars[a] = vars[b];
    vars[b] = z;
    z = vars[a + 'CO'];
    vars[a + 'CO'] = vars[b + 'CO'];
    vars[b + 'CO'] = z;
    z = vars[a + 'GD'];
    vars[a + 'GD'] = vars[b + 'GD'];
    vars[b + 'GD'] = z;
    z = vars[a + 'PT'];
    vars[a + 'PT'] = vars[b + 'PT'];
    vars[b + 'PT'] = z;
    gui_palette.update(a);
    gui_palette.run(q[vars[vars.id]]);
  },
  // Visualizer
  run: function (n) {
    if (n != 'GD') gui_gradient.mk(1);
    gui_swatch.cur(n);
    co.glyph();
    vars.cache(1);
  },
  create: function (v) {
    if (v) vars[vars.id] = v;
    gui_palette.update();
    co.glyph();
  },
  update: function (b, m) {
    stamp.preview(stamp.fileNumber, m);
    var id = b || vars.id,
      d = $(id),
      c = d.getContext('2d');
    c.clearRect(0, 0, d.width = 34, d.height = 23);
    style(c, "fillStyle", id, { X: 0, Y: 0 }, { X: 34, Y: 23 });
    c.fillRect(0, 0, 34, 23);
  }
};
