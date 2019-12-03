gui_swatch = {
  // Mouse
  'click': function (o) {
    var n = parseInt(o.id.replace(/[a-zA-Z]*/, ''));
    if (gui_swatch.n[vars.id + gui_swatch.id] != n) {
      if (gui_swatch.id == 'PT') {
        vars[vars.id + gui_swatch.id] = new Image();
        vars[vars.id + gui_swatch.id].src = vars[gui_swatch.id][n - 1].src;
      } else {
        vars[vars.id + gui_swatch.id] = deObject(vars[gui_swatch.id][n - 1]);
      }
      gui_swatch.cur_switch(n);
      co.glyph();
    }
  },
  'cur': function (type, s) {
    gui.Y.id = type = type || "CO";
    vars[vars.id] = gui_swatch.r[type][0];
    function z(a, b, c) {
      $C(a, 'swatch')[0].style[b] = c;
    }
    if(gui_swatch.id) {
      z(gui_swatch.id, 'display', 'none');
      z(gui_swatch.id + 'menu', 'cursor', 'pointer');
    }
    z(type, 'display', 'block');
    z(type + 'menu', 'cursor', 'default');
    gui_swatch.pos(gui_swatch.n[vars.id + (gui_swatch.id = type)]);
    gui_swatch.cur_switch(gui_swatch.n[vars.id + gui_swatch.id], s);
    co.glyph();
  },
  'cur_switch': function (n, s) {
    var b = gui_swatch.n[vars.id + gui_swatch.id];
    gui_swatch.n[vars.id + gui_swatch.id] = n;
    if (!s) {
      gui_swatch.run();
    }
    if ($(gui_swatch.o)) {
      $(gui_swatch.o).className = '';
      gui_swatch.update(b);
    }
    $(gui_swatch.o = vars.id + gui_swatch.id + n).className = 'cur';
    gui_swatch.update(n);
  },
  'pos': function (n) {
    var o = gui.Y,
      a = Math.ceil(n / 7) * 7,
      b = (a - 7) - (o.cur[gui_swatch.id] - 1);
    if (b > 21 || b < 0) o.cur[gui_swatch.id] = (a - (b < 0 ? 7 : 28));
    o.prev[gui_swatch.id] = 0;
    o.cord(0);
    o.sw(gui_swatch.n[vars.id + gui_swatch.id] = n);
  },
  'add': function () {
    var r = vars[gui_swatch.id],
      n = gui_swatch.n[vars.id + gui_swatch.id];
    var fu = {
      'CO': function (r) {
        r = deObject(vars[vars.id + gui_swatch.id]);
        return (r);
      },
      'GD': function (r) {
        r = deObject(vars[vars.id + gui_swatch.id]);
        return (r);
      },
      'PT': function (r) {
        r = new Image();
        r[r.length - 1].src = vars[vars.id + gui_swatch.id].src;
        return (r);
      }
    };
    r.splice(n, 0, fu[gui_swatch.id](r));
    vars[vars.id + gui_swatch.id] = r[n];
    gui.Y.kontrol_update(gui_swatch.id);
    gui_swatch.pos(n + 1);
  },
  'remove': function () {
    if (vars[gui_swatch.id].length > 1) {
      var r = vars[gui_swatch.id],
        n = gui_swatch.n[vars.id + gui_swatch.id];
      r.splice(n - 1, 1);
      vars[vars.id + gui_swatch.id] = r[(n = Math.min(n, r.length)) - 1];
      gui_swatch.pos(n);
      gui_swatch.run();
      gui.Y.kontrol_update(gui_swatch.id);
    }
  },
  // Create
  author: function(id) {
    var id = id || gui_swatch.id,
      res = Resources[id][vars[id+'*']] || "";
    if(res) { // resource
      return '<i>by:&nbsp; <a href="'+res.url+'" target="_blank">'+res.name+'</a></i>';
    } else {
      return '';
    }
  },
  'mk': function () {
    var z = '';
    gui_swatch.set = {};
    for (var i in gui_swatch.r) {
      var k = 0;
      gui_swatch.set[i] = {};
      for (var j in Q[i]) gui_swatch.set[i][k++] = j;
    }
    for (var i in gui_swatch.r) {
      var res = '<div id="author_'+i+'" class="author">'+gui_swatch.author(i)+'</div>';
      z += '<div class="menu ' + i + 'menu" onmousedown="gui_swatch.cur(\'' + i + '\'); vars.cache(1);">' + ' <div>' + gui_swatch.r[i][0].toUpperCase() + 'S</div>' +
        ' <span class="east">' +
        ' <div style="padding: 2px 0 0; font-size: 12px" id="'+i+'_author"></div>' +
        //				 '  <img src="media/gui/sw_remove.png" onmousedown="if(this.parentNode.parentNode.style.cursor==\'default\') gui_swatch.remove(); return false;" alt="..." class="remove">' +
        //				 '  <img src="media/gui/sw_add.png" onmousedown="if(this.parentNode.parentNode.style.cursor==\'default\') gui_swatch.add(); return false;" alt="...">' +
        ' </span>' +
        '</div>' +
        '<div class="' + i + '" style="display: none">' +
        ' <div style="position: absolute; left: 19px; top: ' + (42 + gui_swatch.r[i][2]) + 'px;">' + gui.menu.build(i + '*', gui_swatch.set[i]) + '</div>' +
        ' <div id="' + i + '" class="squares"></div>' + gui.Y.kontrol(i, gui_swatch.r[i][2] + 49) + '<br>' +res+
        '</div>';
    }
    $C('MM', 'swatch')[0].innerHTML = '<div class="z">' + z + '</div>';
    gui_swatch.cur(gui_swatch.id = gui_swatch.L2S[vars[vars.id]]);
  },
  // Visualizer
  'run': function () {
    ({
      'CO': function () {
        gui_color.run('set', vars[vars.id + gui_swatch.id]);
        gui_palette.update();
      },
      'GD': function () {
        gui_gradient.mk_x();
        gui_gradient.cs();
        $S('gOpacity').top = '-5px';
      },
      'PT': function () {
        gui_pattern.o[vars.id] = vars[vars.id + 'PT'];
        gui_pattern.create();
      }
    })[gui_swatch.id]();
  },
  'update': function (i, s) {
    var r = vars[gui_swatch.id];
    var fu = {
      'CO': function (r, c) {
        c.fillStyle = 'rgba(' + r[i - 1].join(',') + ')';
        c.fill();
      },
      'GD': function (r, c) {
        co.gradient({
            'X': 3,
            'Y': 3
          },
          {
            'X': 13,
            'Y': 13
          },
          c, r[i - 1], 'fill', 1);
      },
      'PT': function (r, c) {
        c.fillStyle = c.createPattern(r[i - 1], 'repeat');
        c.fill();
      }
    };
    function z(i) {
      var d = $(vars.id + gui_swatch.id + i);
      if (d) {
        var c = $2D(vars.id + gui_swatch.id + i);
        c.clearRect(0, 0, 16, 16);
        if (gui_swatch.n[vars.id + gui_swatch.id] == i && !s) {
          var a = {
              'X': 3,
              'Y': 3
            },
            b = {
              'X': 13,
              'Y': 13
            };
          c.beginPath();
          co.circle(a, b, c);
          c.strokeStyle = 'rgba(255,255,255,1)';
          c.lineWidth = 1.5;
          c.stroke();
          fu[gui_swatch.id](r, c);
          c.beginPath();
        } else {
          c.rect(0, 0, 16,16);
          fu[gui_swatch.id](r, c);
        }
      }
    }
    if (isNaN(i)) for (var i = gui.Y.cur[gui_swatch.id], ii = 1; i <= r.length && ii <= 28; i++, ii++) z(i);
    else z(i);
  },
  toType: function (type) {
    if (gui_swatch.id != type) {
      gui_swatch.cur(type, 1);
      gui_palette.create();
    }
  },
  // Data
  'L2S': {
    'solid': 'CO',
    'gradient': 'GD',
    'pattern': 'PT'
  },
  'S2L': {
    'CO': 'solid',
    'GD': 'gradient',
    'PT': 'pattern'
  },
  'S2N': {
    'CO': 1,
    'GD': 2,
    'PT': 3
  },
  'r': {
    'CO': ['solid', -13, 6],
    'GD': ['gradient', 6, 25],
    'PT': ['pattern', 25, 44]
  },
  'n': {
    'fillCO': 1,
    'fillGD': 1,
    'fillPT': 1,
    'strokeCO': 2,
    'strokeGD': 2,
    'strokePT': 2
  },
  'o': ''
};
