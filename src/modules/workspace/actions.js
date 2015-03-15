var _ = require('lodash');
var flux = require('flux2');
var actionTypes = require('./action_types');
var RestApi = require('modules/rest_api');

/**
 * Dispatch to the proper stores to load the account data structure
 * @param {object} accountInfo
 */
function loadAccountInfo(accountInfo) {
  flux.dispatch(actionTypes.ACCOUNT_INFO_LOADED, {
    accountInfo: accountInfo,
  });
}

/**
 * Async fetch the account info
 */
function fetchAccountInfo() {
  return $.ajax({
    url: '/account/info',
    type: 'GET',
  }).then(loadAccountInfo);
}

module.exports = {
  fetchAccountInfo: fetchAccountInfo,
  loadAccountInfo: loadAccountInfo,
};
