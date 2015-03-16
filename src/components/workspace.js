/**
 * @jsx React.DOM
 */
var React = require('react')
var flux = require('flux')

var NodeComponent = require('components/node')

var CurrentWorkspace = require('modules/current-workspace')

module.exports = React.createClass({
  mixins: [flux.mixin],

  getDataBindings() {
    return {
      nodes: CurrentWorkspace.getters.nodes,
    }
  },

  render() {
    var nodes = this.state.nodes.map(function(node) {
      return <NodeComponent node={node} />
    })

    return (
      <div>
        {nodes}
      </div>
    )
  },
})
