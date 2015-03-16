/**
 * @jsx React.DOM
 */
var React = require('react')
var flux = require('flux')

module.exports = React.createClass({
  mixins: [flux.mixin],

  getDataBindings() {
    return {
    }
  },

  render() {
    return <nav>Diagram</nav>
  },
})
