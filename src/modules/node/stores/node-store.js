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
    this.on(actionTypes.CREATE_NODE, createNode)
  },
})

/**
 * Creates a new node and stores it
 */
function createNode(state, payload) {
  var id = payload.node.id
  return state.set(id, toImmutable(payload.node))
}
