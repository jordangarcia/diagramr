var expect = require('chai').expect
var helpers = require('../helpers')
var Workspace = require('modules/workspace')
var CurrentWorkspace = require('modules/current-workspace')

describe("ui tests", () => {
  helpers.setupUITest()

  describe("rendering nodes", () => {
    beforeEach(() => {
      var workspace = Workspace.actions.create({
        name: 'workspace #1'
      })

      CurrentWorkspace.actions.setCurrentWorkspaceId(workspace.get('id'))

      CurrentWorkspace.actions.addNode({
        title: 'node #1',
      })

      CurrentWorkspace.actions.addNode({
        title: 'node #2',
      })
    })

    it("should render the nodes", () => {
      var nodes = helpers.getTestSection('node')

      expect(helpers.containsText(nodes[0], 'node #1')).to.be.true
      expect(helpers.containsText(nodes[1], 'node #2')).to.be.true
    })
  })
})
