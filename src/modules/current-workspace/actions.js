var flux = require('flux')
var actionTypes = require('./action-types')

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
