var flux = require('flux')
var actionTypes = require('./action-types')
var fns = require('./fns')

/**
 * Updates a node
 *
 * @param {Array.<Object>} node
 * @param {Array?} node.position
 * @param {String} node.title
 * @param {String} node.body
 * @param {Shape} node.shape
 */
exports.updateNodes = function(nodes) {
  if (!Array.isArray(nodes)) {
    nodes = [nodes]
  }
  // TODO: invariant for option validation
  flux.dispatch(actionTypes.UPDATE_NODES, {
    nodes: nodes,
  })
}

/**
 * Creates a node
 *
 * @param {Object} node
 * @param {Array?} node.position
 * @param {String} node.title
 * @param {String} node.body
 * @param {Shape} node.shape
 */
exports.create = function(node) {
  var node = fns.create(node)

  // TODO: invariant for option validation
  flux.dispatch(actionTypes.CREATE_NODE, {
    node: node,
  })

  return node
}
