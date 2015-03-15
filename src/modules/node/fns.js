/**
 * Module specific pure functions
 */

var enums = require('./enums')
var uuid = require('node-uuid')

const NODE_DEFAULTS = {
  position: [0, 0],
  title: '',
  body: '',
  shape: enums.shape.RECT,
}

exports.create = function(options) {
  return _.defaults({
    id: uuid(),
  }, options, NODE_DEFAULTS)
}
