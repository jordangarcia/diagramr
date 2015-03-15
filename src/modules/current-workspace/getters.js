/**
 * Returns a getter that gets a node by id
 */
var Workspace = require('modules/workspace')

exports.id = ['currentWorkspaceId']

exports.workspace = [
  exports.id,
  Workspace.getters.workspaceMap,
  /**
   * @param {String} id
   * @param {Immutable.Map} workspaceMap
   */
  (id, workspaceMap) => workspaceMap.get(id)
]
