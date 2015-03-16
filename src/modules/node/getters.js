var toImmutable = require('nuclear-js').toImmutable

/**
 * Returns a getter that gets a node by id
 */
exports.byId = function(id) {
  return ['nodes', id];
}

exports.allNodes = [
  ['nodes'],
  /**
   * @param {Immutable.Map} nodeMap
   * @return {Immutable.List}
   */
  nodeMap => nodeMap.toList()
]

/**
 * Mapping of nodes indexed by their workspaceId
 */
exports.nodesIndexedByWorkspaceId = [
  exports.allNodes,
  /**
   * @param {Immutable.Map} nodes
   * @return {Immutable.Map}
   */
  nodes => {
    return toImmutable({}).withMutations(map => {
      nodes.forEach(node => {
        var workspaceId = node.get('workspace_id')
        if (!map.has(workspaceId)) {
          map.set(workspaceId, toImmutable([]))
        }
        map.update(workspaceId, list => {
          return list.push(node)
        })
      })
    })
  }
]
