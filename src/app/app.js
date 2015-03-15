/**
 * @jsx React.DOM
 */
var React = require('react')
var flux = require('flux')
var Node = require('modules/node')

var NodeComponent = require('components/node')

module.exports = React.createClass({
  mixins: [flux.mixin],

  getDataBindings() {
    return {
      nodes: Node.getters.allNodes,
    }
  },

  render() {
    var nodes = this.state.nodes.map(function(node) {
      return <NodeComponent node={node} />
    })

    return <div>{nodes}</div>
  },
})
