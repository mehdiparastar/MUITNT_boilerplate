export function strToBool(string?: string | null | undefined | boolean) {
  if (string === null || string === undefined || string === false) {
    return false;
  } else if (string === true) {
    return true;
  } else {
    switch (string.toLowerCase()) {
      case 'null':
      case 'undefined':
      case 'false':
      case 'no':
      case '0':
      case '':
        return false;
      default:
        return true;
    }
  }
}
