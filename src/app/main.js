/**
 * Main entry point
 */
var React = require('react')
var App = require('./app')
var Node = require('modules/node')

var node1 = Node.fns.create({
  title: 'node #1',
})

var node2 = Node.fns.create({
  title: 'node #2',
})

Node.actions.createNode(node1)
Node.actions.createNode(node2)

var mountNode = document.getElementById('app')
React.render(<App />, mountNode)
