/**
 * Stores workspaces
 */
var Nuclear = require('nuclear-js')
var toImmutable = Nuclear.toImmutable
var actionTypes = require('../action-types')

module.exports = new Nuclear.Store({
  getInitialState() {
    return null;
  },

  initialize() {
    this.on(actionTypes.SET_CURRENT_WORKSPACE_ID, setId)
  },
})

/**
 * Creates a new node and stores it
 * @param {String|null} state
 * @param {Object} payload
 * @param {String} payload.id
 */
function setId(state, payload) {
  return payload.id
}
