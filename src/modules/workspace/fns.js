/**
 * Module specific pure functions
 */
var toImmutable = require('nuclear-js').toImmutable
var uuid = require('node-uuid')

const WORKSPACE_DEFAULTS = {
  name: '',
  description: '',
}

/**
 * Creates a workspace immmutable object
 *
 * @param {Object} options
 * @param {String} options.name
 * @param {String} options.description
 *
 * @return {Immutable.Map}
 */
exports.create = function(options) {
  return toImmutable(_.defaults({
    id: uuid(),
  }, options, WORKSPACE_DEFAULTS))
}
