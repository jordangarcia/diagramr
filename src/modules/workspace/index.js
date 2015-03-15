var flux = require('flux2');
var getters = require('./getters');

// register stores with Flux system
flux.registerStores({
  accountInfo: require('./stores/account_info_store'),
});

module.exports = {
  actions: require('./actions'),

  fns: require('./fns'),

  getters: getters,
};
