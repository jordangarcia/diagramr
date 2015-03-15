var Nuclear = require('nuclear-js');
var toImmutable = Nuclear.toImmutable;
var actionTypes = require('../action_types');
var _ = require('lodash');


var DEFAULT_ACCOUNT_INFO = {
  accountId: null,
  activeProjects: [],
  backendApiToken: null,
  email: null,
  experimentsTotal: 0,
  firstName: null,
  lastName: null,
  maxProjects: -1,
  projectCount: 0,
  isSignedIn: false,
  isAdmin: false,
  isBetaCustomer: false,
  userAccounts: null
};

/**
 * accountStore
 * Responsible for the following state management:
 * TODO: fill in
 */
module.exports = Nuclear.Store({
  /**
   * Initial state of store when registered with NuclearJS Flux system
   * default returns an Immutable.Map
   * Note: must return an immutable value
   */
  getInitialState: function() {
    return toImmutable(DEFAULT_ACCOUNT_INFO);
  },

  initialize: function() {
    this.on(actionTypes.ACCOUNT_INFO_LOADED, loadAccountInfo);
  },
});



/**
 * Caches the request
 *
 * @param {ImmutableMap} state
 * @param {object} payload
 */
function loadAccountInfo (state, payload) {
  return state.withMutations(function (currentState) {
    return currentState.set('accountId', payload.accountInfo.account_id)             // Account - Admin Account Id
      .set('activeProjects', toImmutable(payload.accountInfo.projects))        // Hacky (to be removed)
      .set('backendApiToken', payload.accountInfo.backend_api_token)           // Account level
      .set('email', payload.accountInfo.email)                                 // User (current user's email)
      .set('experimentsTotal', payload.accountInfo.experiments_total)          // Marketo
      .set('frozen', payload.accountInfo.frozen)                               // Account level
      .set('firstName', payload.accountInfo.first_name)                        // User (current user's first name)
      .set('lastName', payload.accountInfo.last_name)                          // User (current user's last name)
      .set('maxProjects', payload.accountInfo.max_projects)                    // Account level
      .set('projectCount', payload.accountInfo.project_count)                  // Account level (refactor to flux)
      .set('isAdmin', payload.accountInfo.is_admin)                            // User level (GAE Admin)
      .set('isBetaCustomer', payload.accountInfo.beta_customer)                // ?
      .set('isMasterAccount', payload.accountInfo.is_master_account)           // ?
      .set('isSsoEnabled', payload.accountInfo.is_sso_enabled)                 // Is the account SSO enabled
      .set('isUserAdmin', payload.accountInfo.is_user_admin)                   // Is user an admin on current account
      .set('planId', payload.accountInfo.plan_id)                              // Account level
      .set('userAccounts', toImmutable(payload.accountInfo.user_accounts))     // User level (used for account switcher)
      .set('isSignedIn', !!payload.accountInfo.account_id)                     // User/Session (unnecessary)
      .set('permissions', payload.accountInfo.permissions)                     // Not needed
    })
}
