var flux = require('flux')
var Immutable = require('immutable')
var toImmutable = require('nuclear-js').toImmutable
var expect = require('chai').expect
var CurrentWorkspace = require('./index')
var Node = require('modules/node')
var Workspace = require('modules/workspace')

describe("modules/current-workspace", () => {
  afterEach(() => flux.reset())

  describe("actions", () => {
    var workspace
    describe("#setCurrentWorkspaceId", () => {
      beforeEach(() => {
        workspace = Workspace.actions.create({
          name: 'workspace #1'
        })
      })

      it("should return the correct id", () => {
        CurrentWorkspace.actions.setCurrentWorkspaceId(workspace.get('id'))
        var expected = workspace.get('id')
        var result = flux.evaluate(CurrentWorkspace.getters.id)
        expect(result).to.equal(expected)
      })

      it("should return the correct object", () => {
        CurrentWorkspace.actions.setCurrentWorkspaceId(workspace.get('id'))
        var result = flux.evaluate(CurrentWorkspace.getters.workspace)

        expect(Immutable.is(workspace, result)).to.be.true
      })
    })
  })

  describe("getters", () => {
    describe("nodes", () => {
      describe("when there are no nodes", () => {

        beforeEach(() => {
          var workspace1 = Workspace.actions.create({
            name: 'workspace #1'
          })
          CurrentWorkspace.actions.setCurrentWorkspaceId(workspace1.get('id'))
        })

        it("should return an empty list", () => {
          var result = flux.evaluate(CurrentWorkspace.getters.nodes)
          var expected = toImmutable([])
          expect(Immutable.is(result, expected)).to.be.true
        })
      })

      describe("when there are nodes attached to the current workspace", () => {
        var workspace1, workspace2, node1, node2, node3
        beforeEach(() => {
          workspace1 = Workspace.actions.create({
            name: 'workspace #1'
          })
          workspace2 = Workspace.actions.create({
            name: 'workspace #2'
          })

          CurrentWorkspace.actions.setCurrentWorkspaceId(workspace1.get('id'))

          node1 = CurrentWorkspace.actions.addNode({
            title: 'node #1',
          })

          node2 = CurrentWorkspace.actions.addNode({
            title: 'node #2',
          })

          node3 = Node.actions.create({
            title: 'node #3',
            workspace_id: workspace2.get('id'),
          })
        })

        it("should return only the nodes attached to the current workspace", () => {
          var result = flux.evaluate(CurrentWorkspace.getters.nodes)
          var expected = toImmutable([node1, node2])
          expect(Immutable.is(result, expected)).to.be.true
        })
      })
    })
  })
})
