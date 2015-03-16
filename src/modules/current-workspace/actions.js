var flux = require('flux')
var actionTypes = require('./action-types')
var getters = require('./getters')
var Node = require('modules/node')

/**
 * Updates a node
 *
 * @param {Array.<Object>} node
 * @param {Array?} node.position
 * @param {String} node.title
 * @param {String} node.body
 * @param {Shape} node.shape
 */
exports.setCurrentWorkspaceId = function(id) {
  flux.dispatch(actionTypes.SET_CURRENT_WORKSPACE_ID, {
    id: id,
  })
}

/**
 * @param {Object} nodeData
 * @param {String} nodeData.title
 * @param {String} nodeData.body
 * @param {Array} nodeData.position
 * 
 * @return {Immutable.Map}
 */
exports.addNode = function(nodeData) {
  var node = Node.fns.create(_.extend({}, nodeData, {
    workspace_id: flux.evaluate(getters.id)
  }))

  Node.actions.updateNodes(node)

  return node
}
