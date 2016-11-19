/**
 * @see {@link http://stackoverflow.com/a/6248722/3216812}
 * @return {string}
 */
export function shortId() {
  return ('0000' + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4);
}
