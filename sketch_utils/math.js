let N = {
  'format': function (n) {
    n = String(n);
    var x = n.split('.'),
      x1 = x[0],
      x2 = x.length > 1 ? '.' + x[1] : '',
      rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return (x1 + x2);
  },
  'between': function (n, a, z) {
    return ((n >= a && n <= z) ? true : false);
  },
  'rand': function (n) {
    return (Math.floor(Math.random() * n));
  }
};
function exp(a, z, n, d) {
  if (n <= 1) n *= 100;
  if (d == 'low') var y = Math.pow(2, n / 15.019);
  else var y = -105.78 * Math.pow(2, -1 * n / 15) + 102;
  return ((y / 100) * (z - a) + a - (.01 * z))
};
export function zero(n) {
  return (!isNaN(n = parseFloat(n)) ? n : 0);
}
