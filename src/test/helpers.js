/** @jsx React.DOM */

/**
 * test helpers
 */
var $ = require('jquery')
var React = require('react')
var flux = require('flux')
var AppComponent = require('components/app')
var qsa = document.querySelectorAll.bind(document)
var format = require('util').format
//var simulant = require('simulant')

/**
 * @param {Object} options
 * @param {String?} options.mountNode
 */
exports.setupUITest = function(options) {
  options = options || {}

  var mountNode = document.querySelector(options.mountNode || '#test')

  beforeEach(() => {
    React.render(<AppComponent />, mountNode)
  })

  afterEach(() => {
    React.unmountComponentAtNode(mountNode)
    flux.reset()
  })
}

/**
 * Gets the test section denoted by the `data-test-section` attribute
 * This is the semantic way to tag a test section
 */
exports.getTestSection = function(id) {
  return $(format('[data-test-section="%s"]', id))
}

/**
 * Returns boolean whether element contains text
 */
exports.containsText = function(el, str) {
  var res = $(el).find(format(':visible:contains(%s)', str))
  return res.length > 0
}

/**
 * Simulates a mouse click, use this instead of .click()
 * @param {HTMLElement|jQuery} el
 * @param {Object?} opts
 */
exports.simulateClick = function(el, opts) {
  if (el instanceof jQuery) {
    el = el.get(0)
  }

  simulant.fire(el, 'click', opts || {})
}

/**
 * Changes the value of a given text input and simulates an 'input' event to trigger v-model updates
 * @param {HTMLElement|jQuery} el
 * @param {string} input
 * @param {boolean} pressEnter Whether to simulate an enter keyup after changing the value
 */
exports.simulateInput = function(el, input, pressEnter) {
  if (el instanceof jQuery) {
    el = el.get(0)
  }

  el.value = input
  simulant.fire(el, 'input')

  if (pressEnter) {
    simulant.fire(el, 'keyup', {
      keyCode: 13,
      which: 13,
    })
  }
}
