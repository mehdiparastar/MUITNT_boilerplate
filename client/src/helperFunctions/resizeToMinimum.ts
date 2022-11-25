export function resizeToMinimum() {
  const minimum = [640, 480];
  var current = [window.innerWidth, window.innerHeight];
  var restricted = [];
  var i = 2;

  while (i-- > 0) {
    restricted[i] = minimum[i] > current[i] ? minimum[i] : current[i];
  }

  window.resizeTo(restricted[0], restricted[1]);
}
