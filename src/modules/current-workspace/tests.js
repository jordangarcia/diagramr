var flux = require('flux')
var Immutable = require('immutable')
var expect = require('chai').expect
var CurrentWorkspace = require('./index')
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
})
