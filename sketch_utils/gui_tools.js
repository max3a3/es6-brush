gui_tools = {
  imagePos: {}, // y-pos of backgroundPosition (all tools are in media/GUI/Tools.png
  imageMap: function () { // create image mapping
    var elements = $T('div', $C('tools', 'tools')[0]),
      icons = [
        'Brush',
        'Calligraphy',
        'Crop',
        'Eraser',
        'Fill',
        'Marquee_burst',
        'Marquee_ellipses',
        'Marquee_gear',
        'Marquee_lasso',
        'Marquee_polygon',
        'Marquee_rectangle',
        'Marquee_star',
        'Original',
        'Pencil',
        'Picker',
        'Select',
        'Shape_burst',
        'Shape_ellipses',
        'Shape_gear',
        'Shape_polygon',
        'Shape_rectangle',
        'Shape_star',
        'Stamp',
        'Text',
        'Zoom',
        'Spirograph'
      ];
    for (var n in icons) {
      gui_tools.imagePos[icons[n]] = n * 26 - 5;
    }
    for (var image in elements) {
      image = elements[image];
      if (typeof(image) == 'object') {
        var o = $T('img', image);
        if (o[0]) {
          o = (o[1] && o[1].className != 'plus') ? o[1] : o[0];
          var o = o.className.split(' ')[0];
          var u = o.split('_')[0];
          if (u == 'Marquee' || u == 'Shape') {
            o = u + '_' + vars[u.toLowerCase()];
          } else if (u == 'Brush') {
            o = ucword(vars['draw']);
          }
          image.style.backgroundImage = 'url(media/gui/tools/Tools.png)';
          image.style.backgroundPosition = '5px ' + (-gui_tools.imagePos[o]) + 'px';
          image.title = o.split('_')[0];
          image.onmousedown = function (event) {
            event.preventDefault();
          };
        }
      }
    }
  },
  imageSize: function (v, i, end) { // image animation (switching tools)
    var o = $C(v, 'tools')[0],
      d = o.style;
    d.width = (15 + i) + 'px';
    d.height = (15 + i) + 'px';
    d.top = (-(i / 2)) + 'px';
    d.left = (-(i / 2)) + 'px';
    if (i == end) {
      var d = o.parentNode.style;
      d.backgroundPosition = '5px ' + (-gui_tools.imagePos[v]) + 'px';
      if (i == 25) {
        o.style.display = "block";
        o.src = 'media/gui/tools/' + v + '_2.png';
        d.backgroundImage = '';
      } else if (i == 0) {
        o.src = '';
        o.style.display = "none";
        d.backgroundImage = 'url(media/gui/tools/Tools.png)';
      }
    } else if ((i == 0 && end == 25) || (i == 25 && end == 0)) {
      var o = $T('img', o.parentNode);
      if (o[1]) {
        o[0].style.display = (i == 0) ? 'none' : 'block';
      }
    }
  },
  imageCurrent: function (v) {
    function getRoot(v) {
      return (v.indexOf('_') != -1 ? v.substr(0, v.indexOf('_')) : v).toLowerCase();
    };
    var prev = gui_tools.prev,
      p = getRoot(prev ? prev : vars.type),
      c = getRoot(v);
    vars.type = c;
    vars.typeImg = v;
    if (prev != v) { // tool has switched
      function zoom(o, n) {
        setTimeout("gui_tools.imageSize('" + o + "'," + i + "," + n + ")", (timer++) * 4);
      };
      if (c == 'marquee' || c == 'crop') {
        marquee.reset();
      }
      if (p == 'crop') {
        crop.reset();
      }
      if (prev) {
        var timer = 0,
          img1 = new Image();
        img1.src = 'media/gui/tools/' + prev + '.png';
        for (var i = 25; i >= 0; i--) {
          zoom(prev, 0);
        }
      }
      var timer = 0,
        img2 = new Image();
      img2.src = 'media/gui/tools/' + v + '_2.png';
      for (var i = 0; i <= 25; i++) {
        zoom(v, 25);
      }
      gui_tools.prev = v;
      gui_options.forge(vars.type); // build "OPTIONS" window
      vars.updateTool(); //
      vars.cache(1);
    }
  }
};
