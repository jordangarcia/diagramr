var flux = require('flux');

// register stores with Flux system
flux.registerStores({
  currentWorkspaceId: require('./stores/current-workspace-id-store'),
});

module.exports = {
  actions: require('./actions'),

  fns: require('./fns'),

  getters: require('./getters'),
};
