import {vars} from './settings'
export let gui_options = {
  modulesObject: function () {
    gui_options.modules = {
      'marquee': {
        build: ['sides_marquee', 'slope_marquee'],
        vars: {
          'movement_marquee': 'anchored',
          'slope_marquee': 2,
          'sides_marquee': 7
        },
        head: 'marquee',
        size: {
          'ellipses': 15,
          'polygon': 40,
          '': 85
        }
      },
      'crop': {
        build: ['constrain', 'aspect'],
        vars: {
          'constrain': 'false',
          'aspect': 'landscape'
        },
        head: 'crop',
        size: 58
      },
      'text': {
        build: ['fontSize', 'stroke_text'],//'kerning', 'leading',
        vars: {
          'movement_text': 'active',
          'fontSize': 90,
          'kerning': 1,
          'leading': 1.2,
          'stroke_text': 3
        },
        size: 140
      },
      'shape': {
        build: ['movement_' + vars.shape, 'corner', 'sides_shape', 'slope_shape', 'stroke_' + vars.shape],
        vars: {
          'movement_shape': 'anchored',
          'stroke_shape': 7,
          'gradient': 'fixed',
          'slope_shape': 2,
          'sides_shape': 7
        },
        head: 'shape',
        size: {
          'ellipses': 130,
          'polygon': 170,
          '': 210
        }
      },
      'pencil': {
        build: ['diameter_pencil', 'opacity_pencil'],
        vars: {
          'movement_pencil': 'freedraw',
          'lineJoin': 'round',
          'gradient': 'absolute',
          'diameter_pencil': 10,
          'flow_pencil': 100,
          'opacity_pencil': 80
        },
        head: 'draw',
        size: 85,
        glyph: 1
      },
      'brush': {
        build: ['diameter_brush', 'hardness_brush', 'flow_brush', 'opacity_brush'],
        vars: {
          'movement_brush': 'freedraw',
          'diameter_brush': 25,
          'hardness_brush': 60,
          'flow_brush': 92,
          'opacity_brush': 70
        },
        head: 'draw',
        size: 165,
        glyph: 1
      },
      'calligraphy': {
        build: ['diameter_calligraphy', 'opacity_calligraphy'],
        vars: {
          'movement_calligraphy': 'freedraw',
          'lineJoin': 'round',
          'gradient': 'absolute',
          'diameter_calligraphy': 50,
          'flow_calligraphy': 100,
          'opacity_calligraphy': 90
        },
        head: 'draw',
        size: 80,
        glyph: 1
      },
      'spirograph': {
        build: ['inner_radius_spirograph', 'outer_radius_spirograph', 'diameter_spirograph','speed_spirograph','resolution_spirograph'],
        vars: {
          'inner_radius_spirograph': 29,
          'outer_radius_spirograph': 79,
          'diameter_spirograph': 30,
          'speed_spirograph': 100,
          'resolution_spirograph': 364,
          'type_spirograph': 'Hypotrochoid'
        },
        head: 'spirograph',
        size: 205,
        glyph: 1
      },
      'stamp': {
        build: ['rand', 'flow_stamp', 'opacity_stamp'],
        vars: {
          'movement_stamp': 'freedraw',
          'flow_stamp': 10,
          'opacity_stamp': 100,
          'rand_min': 70,
          'rand_max': 25
        },
        size: 275,
        head: 'stamp'
      },
      'fill': {
        build: ['opacity_fill'],
        vars: {
          'movement_fill': 'anchored',
          'opacity_fill': 70
        },
        size: 40,
        head: 'fill'
      },
      'eraser': {
        build: ['diameter_eraser', 'hardness_eraser', 'flow_eraser', 'opacity_eraser'],
        vars: {
          'movement_eraser': 'freedraw',
          'diameter_eraser': 25,
          'flow_eraser': 90,
          'hardness_eraser': 60,
          'opacity_eraser': 30
        },
        size: 165,
        glyph: 1
      },
      'picker': {
        size: 75
      }
    }
  },
  forge: function (v) { // build "OPTIONS" window
    if (!gui_options.modules || v == 'shape') {
      gui_options.modulesObject();
    };
    var r = gui_options.modules[v],
      z = '';
    for (var i in r.vars) { // BUILD CONTENT
      if (!vars[i]) var b = r.vars[i];
      if (i == 'movement_shape') {
        i = 'movement_' + vars.shape;
      } else if (i == 'stroke_shape') {
        i = 'stroke_' + vars.shape;
      }
      if (!vars[i]) {
        vars[i] = b;
      }
    }
    if (v == 'shape' || v == 'marquee') {
      var d = vars[v];
      gui_options.resize(r.size[d] ? r.size[d] : r.size['']);
    } else {
      gui_options.resize(r.size);
    };
    for (var i in r.build) {
      i = r.build[i];
      var o = i.indexOf('_') != -1 ? i.substr(0, i.indexOf('_')) : i,
        title = o.replace('_', ' ').replace('line', '').replace('rand', 'diameter &middot; min, max').replace('font', '').replace('marq', '').replace('shape', '').toLowerCase(),
        fu = (i == 'br') ? '<br>' : gui[cF[i].type].build(title, i, cF[i].val);
      if (v == 'shape') {
        if ((d != 'ellipses' && d != 'polygon') || (d == 'ellipses' && i != 'corner' && i != 'sides_shape' && i != 'slope_shape') || (d == 'polygon' && i != 'slope_shape')) {
          z += (i == 'stroke_ellipses' ? '<br>' : '') + fu;
        }
      } else if (v == 'marquee') {
        if ((d != 'ellipses' && d != 'polygon') || (d == 'polygon' && i != 'slope_marquee')) {
          z += fu;
        }
      } else {
        z += fu;
      }
    }
    if(v == 'fill' || v =='brush' || v == 'pencil' || v == 'calligraphy' || v == 'stamp') { // these tools use only the "fill" property
      gui_palette.click('fill')
    } else if(v == 'spirograph') { // these ones use only the "stroke" property
      gui_palette.click('stroke')
    }
    switch(v) { // extra stuff
      case 'picker':
        z = '<img src="media/gui/loupe.png" onmousedown="return(noMove())" class="loupe" alt="...">'+
          '<canvas id="picker" height="106" width="149" style="height: 106px; width: 149px"></canvas>'+
          '<div class="picker"><div>R<br>G<br>B<br>A</div><div id="picker_hex">0<br>0<br>0<br>0</div></div>'+
          '<canvas id="picker1x1" height="1" width="1"></canvas>';
        break;
      case 'stamp':
        z = '<div id="stamp"></div>' + gui.Y.kontrol('stamp') +
          "<span style=\"position: relative; top: -6px; border: 0\" id=\"brush_author\"></span>" + z;
        break;
      case 'text':
        if(!vars.textMessage) {
          vars.textMessage = "hello!";
        }
        z = '<div id="text" style="padding-bottom: 13px">' +
          ' <span style="font-size: 11px; -moz-user-select: none; -khtml-user-select: none; user-select: none; ">MESSAGE</span><br>' +
          ' <input type="text" onmousedown="preventDefault = false;" onkeydown="vars.textMessage=this.value;" onkeyup="vars.textMessage=this.value;" style="width: 90%; font-size: 16px" value="'+vars.textMessage+'">' +
          '</div>' + z;
        break;
    }
    var d = $('options');
    $C('TML', d)[0].innerHTML = '<span style="-moz-user-select: none; -khtml-user-select: none; user-select: none; ">'+(r.head ? gui.menu.build(r.head, cF[r.head].val) : v)+'</div>';
    $C('MM', d)[0].innerHTML = '<div class="z" style="display: none; margin-top:1px;">' + z + '</div>';
    if (v == 'stamp') {
      stamp.reset();
    } else if (v == 'calligraphy') {
      co.glyph('media/glyph/Calligraphy/0-live.png');
    }
    if (r.glyph) {
      co.glyph();
    }
    if (!$('ioptions').opened) {
      win.tab($('ioptions'), 'options');
    }
    $C('z', d)[0].style.display = 'block';
  },
  resize: function (n) { // resize "OPTIONS" window
    function fu(o) {
      o.style.height = n + "px";
    };
    var o = $('options'),
      l = $C('ML', o)[0],
      m = $C('MM', o)[0],
      r = $C('MR', o)[0];
    fu(l);
    fu(r);
    fu(m);
    $S('options').height = (n + 40) + 'px';
    win.r['options'][3] = n + 40;
  }
};
