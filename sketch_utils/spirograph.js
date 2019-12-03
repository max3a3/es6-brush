(function() {

  var interval,
    o = { };

  draw.spirograph = function (a, b, m) {
    var c = mask_active(m);
    if (m == 'move') {
      o = b;
    } else if (m == 'up') {
      clearTimeout(interval);
      mask_up(c);
    } else if (m == 'down') {
      o = b;
      var	R = vars.inner_radius_spirograph, // Fixed circle
        r = vars.outer_radius_spirograph, // Moving circle
        d = vars.diameter_spirograph, // Distance
        speed = vars.speed_spirograph,
        resolution = vars.resolution_spirograph,
        stroke = 0.5,
        type = vars.type_spirograph,
        theta = 0,
        strokeStyle = vars["stroke" + gui_swatch.L2S[vars["stroke"]]];
      switch(vars["stroke"]) { // compile styles
        case "pattern":
          c.strokeStyle = vars["stroke"+'PT~'];
          break;
        case "gradient":
          var Additive = function(A, B) {
              var C = A + B;
              return (C > 0xFF) ? 0xFF : C;
            },
            gradient = vars["stroke" + "GD"],
            prev,
            cur,
            spectrum = [ ];
          for (var key in gradient) {
            cur = gradient[key][1];
            if (prev) {
              var len = 512 / (gradient.length - 1);
              for (var j = 0; j <= len; j++) {
                var n1 = (j / len),
                  n2 = 1 - n1,
                  color = [
                    cur[0] + (Additive(cur[0], prev[0]) - cur[0]) * prev[3] / 0xFF,
                    cur[1] + (Additive(cur[1], prev[1]) - cur[1]) * prev[3] / 0xFF,
                    cur[2] + (Additive(cur[2], prev[2]) - cur[2]) * prev[3] / 0xFF,
                    Math.min(cur[3] * 0xFF + prev[3] * 0xFF, 0xFF)
                  ];
                spectrum.push(cur.join(","));
              }
            }
            prev = cur;
          }
          break;
        default: // color
          c.strokeStyle = "rgba(" + strokeStyle.join(",") + ")";;
          break;
      }
      interval = setInterval(function() {
        var _x, // previous line
          _y,
          _oX = o.X, // previous mouse position
          _oY = o.Y;
        c.lineWidth = stroke;
        for (var n = 0; n < speed; n++) {
          if (type == 'Hypotrochoid') {
            x = (R - r) * Math.cos(theta) + d * Math.cos((R / r - 1) * theta) + (_oX + (o.X - _oX) * (n / speed)); // Hypotrochoid
            y = (R - r) * Math.sin(theta) - d * Math.sin((R / r - 1) * theta) + (_oY + (o.Y - _oY) * (n / speed));
          } else {
            x = (R + r) * Math.cos(theta) - d * Math.cos((R / r + 1) * theta) + (_oX + (o.X - _oX) * (n / speed)); // Epitrochoid
            y = (R + r) * Math.sin(theta) - d * Math.sin((R / r + 1) * theta) + (_oY + (o.Y - _oY) * (n / speed));
          }
          if (!isNaN(_x)) {
            c.beginPath();
            c.moveTo(_x, _y);
            c.lineTo(x, y);
            if (vars["stroke"] == 'gradient') {
              var current = (((theta * Math.abs(1 - R / r) / Math.PI / 2) % 1) * 512) >> 0;
              c.strokeStyle = 'rgba(' + spectrum[current] + ')';
            }
            c.stroke();
          }
          theta += resolution * Math.PI / 180 * 2;
          _x = x;
          _y = y;
        }
        _oX = o.X;
        _oY = o.Y;
      }, 5);
    }
  };

})();
