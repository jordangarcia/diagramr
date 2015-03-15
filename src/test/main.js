mocha.setup({
  ui: 'bdd',
  reporter: 'html'
});

// wildcard require all test files
var testsContext = require.context('../', true, /tests\.js$/)
testsContext.keys().forEach(testsContext)

var uiTestsContext = require.context('./ui_tests', true, /tests\.js$/)
uiTestsContext.keys().forEach(uiTestsContext)

mocha.run()
