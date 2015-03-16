/**
 * Module specific pure functions
 */
var toImmutable = require('nuclear-js').toImmutable
var enums = require('./enums')
var uuid = require('node-uuid')

const NODE_DEFAULTS = {
  position: [0, 0],
  title: '',
  body: '',
  shape: enums.shape.RECT,
  workspace_id: null,
}

exports.create = function(options) {
  return toImmutable(_.defaults({
    id: uuid(),
  }, options, NODE_DEFAULTS))
}

exports.validate = function(options) {
  // TODO
}
