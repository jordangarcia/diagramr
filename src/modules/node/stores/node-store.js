/**
 * Stores node information
 */

var Nuclear = require('nuclear-js')
var toImmutable = Nuclear.toImmutable
var actionTypes = require('../action-types')

module.exports = new Nuclear.Store({
  getInitialState() {
    return toImmutable({})
  },

  initialize() {
    this.on(actionTypes.CREATE_NODE, updateNode)
    this.on(actionTypes.UPDATE_NODES, updateNodes)
  },
})

/**
 * Creates a new node and stores it
 */
function updateNode(state, payload) {
  var id = payload.node.id
  return state.set(id, toImmutable(payload.node))
}

/**
 * Creates a new node and stores it
 * @param {Immutable.Map} state
 * @param {Object} payload
 * @param {Array.<Object>} payload.nodes
 */
function updateNodes(state, payload) {
  return state.withMutations(state => {
    payload.nodes.forEach(node => {
      state.set(node.id, toImmutable(node))
    })
  })
}
