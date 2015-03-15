var flux = require('flux');
var expect = require('chai').expect
var Node = require('./index')

describe("modules/node", () => {
  afterEach(() => flux.reset())

  describe("actions", () => {
    it("#createNode", () => {
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

    describe("#updateNodes", () => {
      it("should update an array of nodes", () => {
        var node1 = Node.fns.create({
          title: 'node #1'
        })
        var node2 = Node.fns.create({
          title: 'node #2'
        })
        Node.actions.updateNodes([node1, node2]);

        var node1Result = flux.evaluateToJS(Node.getters.byId(node1.id))
        var node2Result = flux.evaluateToJS(Node.getters.byId(node2.id))
        expect(node1Result.title).to.equal('node #1')
        expect(node2Result.title).to.equal('node #2')
      })
    })
  })
})
