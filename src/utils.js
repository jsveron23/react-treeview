/**
 * @see {@link http://stackoverflow.com/a/6248722/3216812}
 * @return {string}
 */
function shortId() {
  return ('0000' + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4);
}
export { shortId };

/**
 * Generate node id, parent node
 * @param  {array}  nodes
 * @param  {object} parent
 * @return {array}
 */
export function generateNodeProps(nodes, parent) {
  return nodes.map((node) => {
    node.id     = shortId();
    node.parent = parent && parent;

    if (Array.isArray(node.children)) {
      generateNodeProps(node.children, node);
    }

    return node;
  });
}
