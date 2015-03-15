mocha.setup({
  ui: 'bdd',
  reporter: 'html'
});

// wildcard require all test files
var testsContext = require.context('../', true, /tests\.js$/)
testsContext.keys().forEach(testsContext)

mocha.run()
