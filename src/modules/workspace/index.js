var flux = require('flux');

// register stores with Flux system
flux.registerStores({
  workspaces: require('./stores/workspaces-store'),
});

module.exports = {
  actions: require('./actions'),

  enums: require('./enums'),

  fns: require('./fns'),

  getters: require('./getters'),
};
