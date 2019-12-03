export let  stop = 1;
export function set_stop(s) {stop=s}
export  function $(v, o) {
  if (!v) return;
  return ((typeof (o) == 'object' ? o : document).getElementById(v));
}

export function $2D(o) {
  return ($(o).getContext('2d'));
}

export function $S(o) {
  return ($(o).style);
}

export function $SS(n) {
  var o = document.styleSheets[0];
  if (o.cssRules) o = o.cssRules;
  else o = o.rules;
  return (o[n].style);
}

function $T(v, o) {
  return ((typeof (o) == 'object' ? o : $(o)).getElementsByTagName(v));
}

export function abPos(o) {
  var o = (typeof (o) == 'object' ? o : $(o)),
    i = {
      X: 0,
      Y: 0
    };
  while (o != null) {
    i.X += o.offsetLeft;
    i.Y += o.offsetTop;
    o = o.offsetParent;
  }
  ;
  return (i);
}

function agent(v) {
  return (Math.max(navigator.userAgent.toLowerCase().indexOf(v), 0));
}

export function cookieStab(f, v) {
  document.cookie = f + "=" + v + "; path=/";
}

function cookieGrab(f) {
  var b = f + "=",
    d = document.cookie.split(';');
  for (var i = 0; i < d.length; i++) {
    var c = d[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(b) == 0) return (c.substring(b.length, c.length));
  }
}

export function getTime() {
  return ((new Date()).getTime());
}

function isset(v) {
  return ((typeof (v) == 'undefined' || v.length == 0) ? v : '');
}

export function noMove() {
  if (stop) {
    stop = 0;
    document.onmouseup = function () {
      document.onmouseup = '';
      stop = 1;
    };
  }
  return false;
}

export function trim(s) {
  return (s.replace(/^\s+|\s+$/g, ''));
}

function ucletter(v) {
  return (v.substr(0, 1).toUpperCase());
}

function ucword(v) {
  return (v.substr(0, 1).toUpperCase() + v.substr(1));
}

function XYwin(v) {
  var o = agent('msie') ? {
    'X': document.body.clientWidth,
    'Y': document.body.clientHeight
  } : {
    'X': window.innerWidth,
    'Y': window.innerHeight
  };
  return (v ? o[v] : o);
}

export function XY(e, v) {
  var o = agent('msie') ? {
    'X': event.clientX + document.body.scrollLeft,
    'Y': event.clientY + document.body.scrollTop
  } : {
    'X': e.pageX,
    'Y': e.pageY
  };
  return (v ? o[v] : o);
}

function zindex(d) {
  d.style.zIndex = win.zindex++;
}

/* CLASSNAME */
export function $C(v, o) { // GET CLASS
  var o = (typeof (o) == 'object' ? o : $(o)).getElementsByTagName("*"),
    rx = new RegExp('\\b' + v + '\\b'),
    z = [];
  for (var i = 0; i < o.length; i++) {
    if (rx.test(o[i].className)) z.push(o[i]);
  }
  return (z);
};

export function C$(v, o) { // SET CLASS
  if (!$(v)) {
    return false;
  }
  var d = $(v),
    c = d.className;
  if (o['+']) {
    d.className = c + ' ' + o['+'];
  }
  if (o['-']) {
    var ob = o['-'].split(' '),
      r = {};
    for (var i in ob) {
      r[ob[i]] = 1;
    }
    var c = c.split(' '),
      z = '';
    for (var i in c) {
      i = c[i];
      if (!r[i]) z += i + ' ';
    }
    ;
    d.className = z;
  }
};
/* EVENT */
Event = {
  'add': function (o, v, fu) {
    if (typeof (v) != 'object') v = {
      el: v,
      e: v
    };
    if (o.addEventListener) o.addEventListener(v.el, fu, false);
    else if (o.attachEvent) {
      v = v.e;
      o["e" + v + fu] = fu;
      o[v + fu] = function () {
        o["e" + v + fu](window.event);
      };
      o.attachEvent("on" + v, o[v + fu]);
    }
  },
  'rm': function (o, v, fu) {
    if (typeof (v) != 'object') v = {
      el: v,
      e: v
    };
    if (o.removeEventListener) o.removeEventListener(v.el, fu, false);
    else if (o.detachEvent) {
      v = v.e;
      o.detachEvent("on" + v, o[v + fu]);
      o[v + fu] = null;
      o["e" + v + fu] = null;
    }
  }
};
