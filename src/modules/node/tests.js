var flux = require('flux')
var toImmutable = require('nuclear-js').toImmutable
var Immutable = require('immutable')
var expect = require('chai').expect
var Node = require('./index')

describe("modules/node", () => {
  afterEach(() => flux.reset())

  describe("actions", () => {
    it("#create", () => {
      var node = Node.actions.create({
        workspace_id: 'abc',
        position: [1, 1],
        title: 'title',
        body: 'body',
      })

      var result = flux.evaluate(Node.getters.byId(node.get('id')))
      var expected = toImmutable({
        id: node.get('id'),
        workspace_id: 'abc',
        position: [1, 1],
        title: 'title',
        body: 'body',
        shape: Node.enums.shape.RECT,
      })

      expect(Immutable.is(result, expected)).to.be.true
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

        var node1Result = flux.evaluateToJS(Node.getters.byId(node1.get('id')))
        var node2Result = flux.evaluateToJS(Node.getters.byId(node2.get('id')))
        expect(node1Result.title).to.equal('node #1')
        expect(node2Result.title).to.equal('node #2')
      })
    })
  })
})
