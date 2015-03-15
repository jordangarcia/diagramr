var flux = require('flux')
var actionTypes = require('./action-types')

/**
 * Creates a node
 *
 * @param {Object} node
 * @param {Array?} node.position
 * @param {String} node.title
 * @param {String} node.body
 * @param {Shape} node.shape
 */
exports.createNode = function(node) {
  // TODO: invariant for option validation
  flux.dispatch(actionTypes.CREATE_NODE, {
    node: node,
  })
}
