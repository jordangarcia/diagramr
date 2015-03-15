/**
 * Stores workspaces
 */
var Nuclear = require('nuclear-js')
var toImmutable = Nuclear.toImmutable
var actionTypes = require('../action-types')

module.exports = new Nuclear.Store({
  getInitialState() {
    return toImmutable({})
  },

  initialize() {
    this.on(actionTypes.CREATE_WORKSPACE, createWorkspace)
  },
})

/**
 * Creates a new node and stores it
 * @param {Immutable.Map} state
 * @param {Object} payload
 * @param {Immutable.Map} payload.workspaceض
 */
function createWorkspace(state, payload) {
  // TODO: invariant
  var id = payload.workspace.get('id')
  return state.set(id, payload.workspace)
}
