/**
 * @jsx React.DOM
 */
var React = require('react')

var Node = require('modules/node')

module.exports = React.createClass({
  render() {
    return (
      <div>
        <h3>{this.props.node.get('title')}</h3>
        <p>{this.props.node.get('body')}</p>
      </div>
    )
  }
})
