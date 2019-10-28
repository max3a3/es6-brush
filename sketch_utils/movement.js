import {zero} from "./math";

var aXY = {},
  bXY = {},
  oXY = {},
  cXY = {},
  mXY = '',
  moXY = {},
  mcXY = {},
  stop = 1;
core = {
  'X': function (o, m, a, x) {
    a.X = Math.max(x.X1, x.X2 ? Math.min(x.X2, a.X + x.X1) : a.X + x.X1);
    return (a);
  },
  'Y': function (o, m, a, x) {
    a.Y = Math.max(x.Y1, x.Y2 ? Math.min(x.Y2, a.Y + x.Y1) : a.Y + x.Y1);
    return (a);
  },
  'XY': function (o, m, a, x) {
    a.X = x.X2 ? Math.min(a.X + x.X1, x.X2 - x.X1) : a.X + x.X1;
    a.Y = x.Y2 ? Math.min(a.Y + x.Y1, x.Y2 - x.Y1) : a.Y + x.Y1;
    return (a);
  },
  'fu': function (o, e, C, F) {  // set the function for mouse drag
    if (stop) {
      var oX = abPos($(o)).X,
        oY = abPos($(o)).Y,
        r = XY(e);
      function c(e, m) {
        r = XY(e);
        if (C) r = C.fu(o, m, {
            'X': r.X - oX,
            'Y': r.Y - oY
          },
          C);
        return (r);
      }
      function f(e, m) {
        c(e, m);
        if (F) F(oXY, r, m, e);
        return (r);
      }
      function p(e, m) {
        r = XY(e);
        return ((m == 'down' ? 'P' : ' ') + (r.X - oX) + ' ' + (r.Y - oY) + (m == 'up' ? 'z' : ''));
      }
      if (isNaN(C.oX)) {
        oX = r.X - oX;
      } else {
        oX = oX - C.oX - zero($S(o).left);
      }
      if (isNaN(C.oY)) {
        oY = r.Y - oY;
      } else {
        oY = oY - C.oY - zero($S(o).top);
      }
      stop = 0;
      oXY = c(e);
      cXY = f(e, mXY = 'down');
      core.time = getTime();
      var tool = 'T' + vars.type + ' rgba(' + vars['fillCO'].join(",") + ') rgba(' + vars['strokeCO'].join(",") + ')';
      var i = '',
        t = [],
        v = {};
      if ((vars.type in gui_options.modules) && ('vars' in gui_options.modules[vars.type])) {
        v = gui_options.modules[vars.type].vars;
        for (i in v) if (i in vars) t.push(i + '(' + vars[i] + ')');
        if (t.length) tool += ' ' + t.join(' ');
      }
      document.onmousemove = function (e) {
        if(typeof(e) == 'undefined') var e = event;
        if (!stop) {
          cXY = f(e, 'move');
        }
      }
      document.onmouseup = function (e) {
        if(typeof(e) == 'undefined') var e = event;
        stop = 1;
        document.onmousemove = '';
        document.onmouseup = '';
        cXY = f(e, mXY = 'up');
      };
      document.onselectstart = function () {
        return false;
      }
    }
  },
  'win': function (o, m, a, x) {
    a.X = (!isNaN(x.X1) ? Math.max(a.X, x.X1) : a.X);
    a.Y = (!isNaN(x.Y1) ? Math.max(a.Y, x.Y1) : a.Y);
    var d = $S(o);
    if (m == 'down') {
      if (x.z) {
        zindex($(o));
      }
      core.win.stop = 0;
      setTimeout("if(!core.win.stop) { core.win_visible('" + o + "','hidden'); }", 500);
    } else if (m == 'move') {
      if (!core.win.stop) core.win_visible(o, 'hidden');
      core.win.stop = 1;
    }
    if (E.sh && oXY) { // SNAP TO XY
      if (Math.abs(a.X - oXY.X) < Math.abs(a.Y - oXY.Y)) {
        d.top = a.Y + 'px';
        d.left = oXY.X + 'px';
      } else {
        d.left = a.X + 'px';
        d.top = oXY.Y + 'px';
      }
    } else {
      d.left = a.X + 'px';
      d.top = a.Y + 'px';
    }
    if (m == 'up') {
      if (win.r[o]) {
        win.cp(o, ['block', zero(d.left), zero(d.top), parseInt(win.r[o][3])]);
      }
      core.win.stop = 1;
      core.win_visible(o, 'visible');
    }
    return (a);
  },
  'win_visible': function (o, s) {
    var op = (s == 'visible') ? 1 : 0.5;
    if ($C('TMM', o)[0]) {
      $C('TMM', o)[0].style.opacity = op;
    } else if ($C('west', $C('TM', o)[0])[0]) {
      $C('west', o)[0].style.opacity = op;
      $C('east', o)[0].style.opacity = op;
    } else if ($C('TRx', o)[0]) {
      $C('TRx', o)[0].style.opacity = op;
      $C('TML', o)[0].style.opacity = op;
    } //		$S(o).overflow=s;
  }
};
