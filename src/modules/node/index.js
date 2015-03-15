var flux = require('flux');

// register stores with Flux system
flux.registerStores({
  nodes: require('./stores/node-store'),
});

module.exports = {
  actions: require('./actions'),

  enums: require('./enums'),

  fns: require('./fns'),

  getters: require('./getters'),
};
