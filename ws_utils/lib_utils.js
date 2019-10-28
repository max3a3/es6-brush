export let __bind = function (fn, me) {
  return function () {
    return fn.apply(me, arguments);
  };
}
export let __hasProp = {}.hasOwnProperty

export let __extends = function (child, parent) {
  for (var key in parent) {
    if (__hasProp.call(parent, key)) child[key] = parent[key];
  }

  function ctor() {
    this.constructor = child;
  }

  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
  child.__super__ = parent.prototype;
  return child;
}

export let __slice = [].slice;

