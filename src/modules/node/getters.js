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
