import {zero} from "./math";
import {abPos, getTime, set_stop, XY,stop} from "./generic";
import {$,$S} from "./generic"
import {vars} from "./settings"
import {Q} from './gradients'

import {gui_options} from "./gui_options"


export let aXY = {}
export let bXY = {}
export let oXY = {}
export const set_oXY = (o) => oXY = o  //wng add setter for settting in other file
let cXY = {}
export function get_cXY() {return cXY} // wng have to have a getter as cXY gets replaced
export let mXY = ''
export let moXY = {}
export let mcXY = {}


let g_F  // wng expose variable set in 'fu'
export let core = {
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
    g_F = F
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

      function f(e, m) {  // called by mousemove  m is 'move'
        c(e, m); // coordinate  set r
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
      set_stop(  0);
      oXY = c(e)
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

      document.onmousemoveTemp = function (e) {
        if (typeof (e) == 'undefined') var e = event;
        if (!stop) {
          cXY = f(e, 'move');
        }
      }
      document.onmouseup = function (e) {
        if (typeof (e) == 'undefined') var e = event;
        set_stop(1);
        document.onmousemove = '';
        document.onmouseup = '';
        cXY = f(e, mXY = 'up');
      };
      document.onselectstartTemp = function () {
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
//--- moved code from :866
vars.CO=Q.CO['Oxygen']; // wng moved to settings vars init
vars.GD=Q.GD['Web v2.0'];
vars.PT=Q.PT['Squidfingers'];
export let canvas = {}
canvas = {
  'history_n': 25,

}
//----------
export function canvas_init(w,h) { // some code from :6211
  canvas.W = w
  canvas.H = h
}

let local_mouse_down
function local_f(e, m,local_pt) { // copy of function f(e, m)

  // oXY is down, r is current
  if (g_F) {
    cXY = g_F(local_mouse_down, local_pt, 'move', e);
  }
  return local_pt
}

export function doc_mousedown(local_pt) {
  local_mouse_down=local_pt
}

export function doc_mousemove(e,local_pt) { // copy of document.onmousemove

  if (!stop) {
    cXY = local_f(e, 'move',local_pt);  //oXY start? and r is local coordinate?
  }

}


export function doc_mouseup (e,local_pt) { // copy of document.onmouseup
  set_stop(1);
  cXY = local_f(e, mXY = 'up',local_pt);

}
