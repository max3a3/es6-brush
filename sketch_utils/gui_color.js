gui_color = {
  // Mouse
  'core': function (o, e, fu) {
    if (gui_swatch.id == 'PT') gui_swatch.cur('CO');
    core.fu(o, e, {
        fu: core.X,
        oX: -13.5,
        X1: 0,
        X2: 121,
        oY: 0
      },
      fu);
  },
  'cur': function (n, v, i, m) {
    var b = gui_color[v+"_"][i],
      n = Math.max(0, n) / 121;
    gui_color[v][i[0]] = (i == 'Alpha') ? n : Math.round((1 - n) * b);
    gui_color.run(i);
    if (m == 'up') gui_palette.create();
    else gui_palette.update('', m);
  },
  'pos': function (r, v, i) {
    var s = (i == 'Alpha'),
      n = r[i[0]];
    n = s ? (1 - n) * 100 : n;
    $S(i + 'Cur').left = parseInt((121 - (n / gui_color[v+"_"][i]) * 121) + 10) + 'px';
    $(i + 'Me').innerHTML = Math.round(s ? 100 - n : n);
  },
  // Create
  'mk': function () {
    var z = '',
      o = $C('MM', 'solid')[0];
    var R = {
      'Hue': 'HSV',
      'Saturation': 'HSV',
      'Value': 'HSV',
      'Red': 'RGB',
      'Green': 'RGB',
      'Blue': 'RGB',
      'Alpha': 'RGB'
    };
    for (var i in R) {
      var v = 'gui_color.core(\'' + i + 'Cur\',event,function(a,b,m) { gui_color.cur(b.X,\'' + R[i] + '\',\'' + i + '\',m); })';
      z += '<div title="' + i.substr(0,1).toUpperCase() + i.substr(1) + '">' + ' <div class="west" id="' + i + 'T">' + i.substr(0,1).toUpperCase() + '</div>' +
        ' <span class="east" id="' + i + 'Me"></span>' + ' <div onmousedown="' + v + '; return false;" id="' + i + 'Cur" class="cur"></div>' +
        ' <canvas id="' + i + '" onmousedown="' + v + '" height="18" width="120"></canvas><br>' +
        '</div>';
    }
    o.innerHTML = '<div class="z">' + z + '</div>';
  },
  // Visualizer
  'run': function (m, r) {
    if (m == 'set') {
      m = 'Red';
    }
    if (r) {
      var r = gui_color.RGB = {
          R: r[0],
          G: r[1],
          B: r[2],
          A: r[3]
        },
        h = gui_color.HSV = Color.RGB_HSV(gui_color.RGB);
    } else {
      var r = gui_color.RGB,
        h = gui_color.HSV;
    }
    if (gui_color.HSV_[m]) {
      var t = Color.HSV_RGB(h);
      t.A = r.A;
      r = gui_color.RGB = t;
    } else if (gui_color.RGB_[m]) {
      h = gui_color.HSV = Color.RGB_HSV(r);
    }
    var R = {
      'Hue': [
        [0, { H: 0, S: h.S, V: h.V }],
        [0.15, { H: 300, S: h.S, V: h.V}],
        [0.30, { H: 240, S: h.S, V: h.V}],
        [0.50, { H: 180, S: h.S, V: h.V}],
        [0.65, { H: 120, S: h.S, V: h.V}],
        [0.85, { H: 60, S: h.S, V: h.V}],
        [1, { H: 0, S: h.S, V: h.V}]],
      'Saturation': [
        [0, { H: h.H, S: 100, V: h.V}],
        [1, { H: h.H, S: 0, V: h.V}]],
      'Value': [
        [0, { H: h.H, S: h.S, V: 100}],
        [1, { H: h.H, S: h.S, V: 0}]],
      'Red': [
        [0, { R: 255, G: r.G, B: r.B, A: r.A }],
        [1, { R: 0, G: r.G, B: r.B, A: r.A }]],
      'Green': [
        [0, { R: r.R, G: 255, B: r.B, A: r.A }],
        [1, { R: r.R, G: 0, B: r.B, A: r.A }]],
      'Blue': [
        [0, { R: r.R, G: r.G, B: 255, A: r.A }],
        [1, { R: r.R, G: r.G, B: 0, A: r.A }]],
      'Alpha': [
        [0, { R: r.R, G: r.G, B: r.B, A: 0 }],
        [1, { R: r.R, G: r.G, B: r.B, A: 1 }]]
    };
    for (var i in R) {
      var c = $2D(i),
        g = c.createLinearGradient(0, 0, 120, 18);
      c.globalCompositeOperation = 'copy';
      for (var j in R[i]) {
        var j = R[i][j],
          k = j[1];
        if (gui_color.HSV_[i]) {
          k = Color.HSV_RGB(k);
          k.A = r.A;
        }
        var rgb = gui_color.mode(k, isNaN(k.A) ? 1 : 0);
        rgb = rgb.R + ',' + rgb.G + ',' + rgb.B + ',' + rgb.A;
        g.addColorStop(j[0], 'rgba(' + rgb + ')');
      }
      c.rect(0,0,120,18);
      co.style.fill(c, g);
      if (gui_color.HSV_[i]) {
        gui_color.pos(h, 'HSV', i);
      } else {
        gui_color.pos(r, 'RGB', i);
      }
    }
    var r = gui_color.mode(r);
    $('HEX').innerHTML = Color.HEX_STRING(r.R << 16 | r.G << 8 | r.B);
    if (vars[vars.id] == 'solid') {
      vars[vars.id + 'CO'] = [ r.R, r.G, r.B, r.A ];
      vars.opacity_fill = r.A * 100;
      if($('opacity_fillCur') && vars.id == "fill") {
        $('opacity_fillCur').style.left = parseInt(r.A * 110) + 'px';
        $('opacity_fillCurV').innerHTML = parseInt(r.A * 100);
      }
    } else if (vars[vars.id] == 'gradient') {
      var b = gui_gradient.o.id.substr(2);
      vars[vars.id + 'GD'][b][1] = [ r.R, r.G, r.B, r.A ];
      gui_gradient.run(b, 'move');
    }
  },
  // Data
  'mode': function (r, s) {
    return (s ? r : { R: r.R, G: r.G, B: r.B, A: r.A });
  },
  'RGB_': {
    'Red': 255,
    'Green': 255,
    'Blue': 255,
    'Alpha': 100
  },
  'HSV_': {
    'Hue': 360,
    'Saturation': 100,
    'Value': 100
  },
  'RGB': {
    'R': 255,
    'G': 0,
    'B': 0,
    'A': 1
  },
  'HSV': {
    'H': 0,
    'S': 100,
    'V': 100
  }
};
