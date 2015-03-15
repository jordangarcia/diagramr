var flux = require('flux')
var actionTypes = require('./action-types')
var fns = require('./fns')


/**
 * Creates and returns a new workspace
 *
 * @param {Object} options
 * @param {String} options.name
 * @param {String} options.description
 *
 * @return {Immutable.Map}
 */
exports.create = function(options) {
  var workspace = fns.create(options)

  flux.dispatch(actionTypes.CREATE_WORKSPACE, {
    workspace: workspace,
  })

  return workspace
}
