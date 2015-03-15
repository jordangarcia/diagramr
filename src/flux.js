var _ = require('lodash')
var Nuclear = require('nuclear-js')

var reactor = new Nuclear.Reactor({
  debug: __DEV__,
})

module.exports = _.extend(reactor, {
  mixin: {
    getInitialState: function() {
      return getState(reactor, this.getDataBindings())
    },

    componentDidMount: function() {
      var component = this
      var dataBindings = this.getDataBindings()
      component.__unwatchFns = []
      _.each(this.getDataBindings(), function(getter, key) {
        var unwatchFn = reactor.observe(getter, function(val) {
          var newState = {};
          newState[key] = val;
          component.setState(newState)
        })

        component.__unwatchFns.push(unwatchFn)
      })
    },

    componentWillUnmount: function() {
      while (this.__unwatchFns.length) {
        this.__unwatchFns.shift()()
      }
    }
  },
})


// HELPER FUNCTIONS
/**
 * Returns a mapping of the getDataBinding keys to
 * the reactor values
 */
function getState(reactor, data) {
  var state = {}
  for (var key in data) {
    state[key] = reactor.evaluate(data[key])
  }
  return state
}

