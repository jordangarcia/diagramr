var expect = require('chai').expect
var helpers = require('../helpers')
var Node = require('modules/node')

describe("ui tests", () => {
  helpers.setupUITest()

  describe("rendering nodes", () => {
    var node1, node2
    beforeEach(() => {
      node1 = Node.fns.create({
        title: 'node #1'
      })
      node2 = Node.fns.create({
        title: 'node #2'
      })
      Node.actions.updateNodes([node1, node2])
    })

    it("should render the nodes", () => {
      var nodes = helpers.getTestSection('node')

      expect(helpers.containsText(nodes[0], 'node #1')).to.be.true
      expect(helpers.containsText(nodes[1], 'node #2')).to.be.true
    })
  })
})
