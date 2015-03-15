var flux = require('flux');
var expect = require('chai').expect
var Workspace = require('./index')

describe("modules/workspace", () => {
  afterEach(() => flux.reset())

  describe("actions", () => {
    describe("#createWorkspace", () => {
      it("should create and persist to the workspaces store", () => {
        var created = Workspace.actions.create({
          name: 'workspace #1',
          description: 'description',
        })

        var result = flux.evaluate([
          Workspace.getters.workspaceMap,
          workspaceMap => workspaceMap.get(created.get('id'))
        ])

        expect(created.get('name')).to.equal('workspace #1')
        expect(created.get('description')).to.equal('description')

        expect(result.get('name')).to.equal('workspace #1')
        expect(result.get('description')).to.equal('description')
      })
    })
  })
})
