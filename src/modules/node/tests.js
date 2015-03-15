var flux = require('flux');
var expect = require('chai').expect
var Node = require('./index')

describe("modules/node", () => {
  describe("actions", () => {
    it("should create a node", () => {
      var node = Node.fns.create({
        position: [1, 1],
        title: 'title',
        body: 'body',
      })
      Node.actions.createNode(node)

      var result = flux.evaluateToJS(Node.getters.byId(node.id))
      var expected = {
        id: node.id,
        position: [1, 1],
        title: 'title',
        body: 'body',
        shape: Node.enums.shape.RECT,
      }

      expect(result).to.eql(expected)
    })
  })
})
