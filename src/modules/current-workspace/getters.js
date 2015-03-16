/**
 * Returns a getter that gets a node by id
 */
var Workspace = require('modules/workspace')
var Node = require('modules/node')
var Immutable = require('immutable')

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

/**
 * All nodes for the workspace id
 */
exports.nodes = [
  exports.id,
  Node.getters.nodesIndexedByWorkspaceId,
  /**
   * @param {String}
   * @param {Immutable.Map}
   */
  (id, nodes) => nodes.get(id) || Immutable.List([]),
]

/**
 * Getter to determine if there is workspace already open
 */
exports.isWorkspaceOpen = [
  exports.id,
  id => !!id
]
