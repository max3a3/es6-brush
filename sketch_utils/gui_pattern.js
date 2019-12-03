var gui_pattern = {
  // Mouse
  'slide_y': function (a, b, m) {
    var op = (gui_pattern.op[vars.id] = Math.round((1 - (b.Y + 5) / 91) * 1000) / 1000);
    $('pPos').innerHTML = Math.round(op * 100) + '<span class="small">%</span>';
    vars.opacity_fill = op * 100;
    if($('opacity_fillCur') && vars.id == "fill") {
      $('opacity_fillCur').style.left = parseInt(op * 110) + 'px';
      $('opacity_fillCurV').innerHTML = parseInt(op * 100);
    }
    $S('pOpacity').top = b.Y + 'px';
    infc.info(m, 'cPT2', 'pPos');
    gui_pattern.create(op, m);
    if (m == 'up') gui_palette.create();
    else gui_palette.update('', m);
  },
  // Create
  'mk': function (s) {
    var j = 0,
      r = vars[vars.id + 'GD'],
      o = $C('MM', 'pattern')[0],
      z = '';
    o.innerHTML = '<div class="z" onmousedown="gui_swatch.toType(\'PT\')">' + ' <div onmousedown="core.fu(\'cPT1\',event, {fu:core.Y, oX:0, oY:-41, Y1:-5, Y2:86}, gui_pattern.slide_y); return false;" class="blue_slide"><div id="pOpacity" class="blue_dot" title="Opacity"></div></div>' + ' <div id="pPos"></div>' + ' <canvas id="cPT"></canvas>' + ' <canvas id="cPT1" height="169" width="169"></canvas>' + ' <canvas id="cPT2" height="169" width="169"></canvas>' + '</div>';
    gui_pattern.o[vars.id] = vars[vars.id + 'PT'];
    gui_pattern.fill();
    infc.info_draw('cPT2', 1);
    gui_palette.update();
    if (vars[vars.id] == 'pattern') {
      gui_gradient.cs();
    }
    gui_pattern.cache("fill");
    gui_pattern.cache("stroke");
  },
  // Visualizer
  'cache': function (type) { // cache image w/ createPattern()
    var pattern = vars[type+'PT'];
    dtx2D.width = pattern.width;
    dtx2D.height = pattern.height;
    ctx2D.save();
    ctx2D.globalAlpha = isNaN(pattern.opacity) ? 1 : pattern.opacity;
    ctx2D.drawImage(pattern, 0, 0);
    ctx2D.restore();
    vars[type+'PT~'] = ctx2D.createPattern(dtx2D, "repeat");
  },
  'create': function (opacity, m) {
    var image = vars[vars.id + 'PT'],
      b = { X: image.width, Y: image.height };
    if (!opacity) {
      opacity = gui_pattern.op[vars.id];
    }
    image.opacity = opacity;
    $('cPT').width = b.X;
    $('cPT').height = b.Y;
    gui_pattern.cache(vars.id);
    gui_pattern.o[vars.id] = $('cPT'); // GENERATE
    gui_pattern.fill(opacity, 0, m); // UPDATE
  },
  'fill': function (op, b, m, i) {
    if (!op) op = gui_pattern.op[vars.id];
    var a = {
        'X': 0,
        'Y': 0
      },
      b = b ? b : {
        'X': 169,
        'Y': 169
      },
      c = $2D(i ? i : 'cPT1');
    co.del(c);
    c.globalCompositeOperation = 'source-over';
    c.rect(a.X,a.Y,b.X,b.Y);
    co.style.fill(c, c.createPattern(vars[vars.id + 'PT'], 'repeat'));
    c.globalCompositeOperation = 'destination-in';
    c.rect(a.X,a.Y,b.X,b.Y);
    c.fillStyle = 'rgba(255,255,255,' + op + ')';
    c.fill();
    if (m == 'up') gui_palette.create();
    else gui_palette.update('', m);
  },
  // Data
  'o': {
    'stroke': new Image(),
    'fill': new Image()
  },
  'op': {
    'stroke': 1,
    'fill': 1
  },
  'dir': 'media/patterns/'
};
