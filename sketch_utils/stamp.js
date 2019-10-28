stamp = { // Mouse Events
  current: function (o) {
    var b = stamp.fileNumber;
    stamp.fileNumber = o.id.substr(5);
    if ($('stamp' + b)) {
      stamp.preview(b);
      $('stamp' + b).className = '';
    }
    $('stamp' + stamp.fileNumber).className = 'cur';
    vars.cache(1);
  },
  uri: function (v) {
    return 'media/glyph/' + vars.stamp + '/' + (stamp.fileNumber - 1) + '-' + v + '.png';
  },
  preview: function (i, m) {
    if ($('stamp' + i) && stamp.src[i].src) {
      function O(n) {
        return (n < 34 ? (34 - n) / 2 : 0);
      }
      function Z(n) {
        o = {
          W: (34 / n) * o.W,
          H: (34 / n) * o.H
        };
      }
      var c = $2D('stamp' + i),
        d = stamp.src[i],
        o = {
          W: d.width,
          H: d.height
        };
      if (o.W >= o.H) Z(o.W);
      else if (o.H > o.W) Z(o.H);
      c.clearRect(0, 0, 34, 34);
      c.drawImage(d, O(o.W), O(o.H), o.W, o.H);
      if (i == stamp.fileNumber) {
        c.globalCompositeOperation = 'source-in';
        c.rect(0, 0, 34, 34);
        co.style[vars[vars.id]]({
            'X': 0,
            'Y': 0
          },
          {
            'X': 34,
            'Y': 34
          },
          c, 'fill', vars.id);
        c.globalCompositeOperation = 'source-over';
        if (!m || m == 'up') {
          co.glyph(stamp.uri('live'));
        }
      }
    }
  },
  reset: function () {
    var o = gui.Y,
      r = o.r.stamp;
    if (!stamp.fileNumber) {
      stamp.fileNumber = 1;
    }
    var a = parseInt(stamp.fileNumber),
      b = stamp.r[vars.stamp],
      i = r.n() - r.display,
      n = (a / b <= 0.5) ? -2 : 2;
    o.prev.stamp = null;
    o.cur.stamp = Math.max(1, Math.min(i, Math.floor(((a + n) / b) * i)));
    o.id = 'stamp';
    o.stamp();
    o.kontrol_update(o.id);
    gui.X.range('rand');
  },
  r: {
    'Default': 1,
    'Butterflies': 27,
    'Doodles': 11,
    'Flowers': 28,
    'Footprints': 18,
    'Leafs': 50,
    'Light': 15,
    'Retro': 30,
    'Simple Smudges': 14,
//		'Splatter': 35,
    'Tizzape': 20,
    'Typogrunge': 24,
    'Water Colors': 17
  },
  src: []
};
