var _ = require('lodash');
var enums = require('utils/enums');
var Account = require('modules/entity/account');
var OAuthClient = require('modules/entity/oauth_client');
var Project = require('modules/entity/project');
var OAuthBearerToken = require('modules/entity/oauth_bearer_token');
var OAuthAuthorizedClient = require('modules/entity/oauth_authorized_client');
var RestApi = require('modules/rest_api');
var Nuclear = require('nuclear-js');
var toImmutable = Nuclear.toImmutable;

/**
 * Gets the account id
 * @return {number}
 */
var id = ['accountInfo', 'accountId'];

/**
 * Gets the account email
 * @return {number}
 */
var email = ['accountInfo', 'email'];

/**
 * Returns boolean whether the user is signed in
 * @return {boolean}
 */
var isSignedIn = ['accountInfo', 'isSignedIn'];

/**
 * Returns boolean whether the user is an admin
 * @return {boolean}
 */
var isAdmin = ['accountInfo', 'isAdmin'];

/**
 * Is the account frozen (over its limit)
 * @return {boolean}
 */
var isFrozen = ['accountInfo', 'isFrozen'];

/**
 * Returns an array of user accounts (for multiple accounts feature)
 */
var userAccounts = ['accountInfo', 'userAccounts'];

/**
 * Returns a complete copy of all account info.
 *
 * Be careful when using this method as it unnecessarily clones the whole thing
 * for dereferencing
 * @return {object}
 */
var accountInfo = ['accountInfo'];

/**
 * Get the maximum number of projects allowed for this plan level
 * @return {number}
 */
var maxProjects = ['accountInfo', 'maxProjects'];

/**
 * Get the current number of projects used in this account
 * @return {number}
 */
var projectCount = ['accountInfo', 'projectCount'];

/**
 * Gets the backend API token for a account
 */
var backendApiToken = ['accountInfo', 'backendApiToken'];

/**
 * Get the current user account
 */
var currentAccount = [userAccounts, function(accounts) {
  return accounts.filter(function(account) {
    return account.get('current_account');
  }).first();
}];

/**
 * Get the role name of the current account
 */
var currentRole = [currentAccount, function (currentAccount) {
  if (currentAccount) {
    return currentAccount.get('role');
  }
}];

/**
 * Gets the admin_account from the REST API Account Store.
 */
var adminAccount = [
  id,
  Account.getters.entityCache,
  function(account_id, accountStore) {
    var allAccounts = accountStore.filter(function(account) {
      return account.get('id') == account_id;
    });
    if (allAccounts.size !== 1) {
      console.warn('Multiple admin accounts present.');
    }
    return allAccounts.first();
  }
];

var ip_anonymization_default = [adminAccount, function(account) {
  return account.get('ip_anonymization_default');
}];

var ip_anonymization_locked = [adminAccount, function(account) {
  return account.get('ip_anonymization_locked');
}];

/**
 * Checks is the current account is SSO enabled and if the user is an admin or not
 * @return {number}
 */
var isAdminOnSsoAccount = [
  ['accountInfo', 'isSsoEnabled'],
  ['accountInfo', 'isUserAdmin'],
  function(isSsoEnabled, isUserAdmin) {
    return isSsoEnabled && isUserAdmin;
  }
];

/**
 * Checks is the current account is SSO enabled or not
 * @return {number}
 */
var isSsoEnabled = ['accountInfo', 'isSsoEnabled'];


var plan_id = [adminAccount, function(account) {
  return account.get('plan_id');
}];

/**
 * Gets all projects for your account
 */
var projects = [
  id,
  Project.getters.entityCache,
  function(accountId, projects) {
    return projects.filter(function (project) {
      return project.get('account_id') === accountId;
    }).toList();
  }
];

/**
 * Get all projects which are active.
 */
var activeProjects = [
  id,
  Project.getters.entityCache,
  function(accountId, projects) {
    return projects.filter(function (project) {
      return project.get('account_id') === accountId && project.get('project_status') == enums.ProjectStatusType.ACTIVE;
    }).toList();
  }
];

var atProjectLimit = [
  projectCount,
  maxProjects,
  function (count, max) {
    return count >= max;
  }
];

var activeAndroidProjects = [
  activeProjects,
  function(activeProjects) {
    return activeProjects.filter(function(proj) {
      return proj.get('project_platforms').contains(enums.ProjectPlatforms.ANDROID);
    });
  },
];


//TODO(ali): Add unit tests for the following 2 getters
var activeOAuthBearerTokens = [
  id,
  OAuthBearerToken.getters.entityCache,
  function(accountId, oauthBearerTokens) {
    return oauthBearerTokens.filter(function(oauthBearerToken) {
      return oauthBearerToken.get('account_id') === accountId && oauthBearerToken.get('is_active');
    });
  }
];

var authorizedOAuthClients = [
  activeOAuthBearerTokens,
  OAuthAuthorizedClient.getters.clientIdToClientMap,
  function(activeBearerTokens, clientIdToClientMap) {
    var clientIdToTokenMap = {};

    // Map client_id to token keeping the token with the latest creation time
    activeBearerTokens.forEach(function(activeBearerToken) {
      var clientId = activeBearerToken.get('client_id');
      if (clientIdToTokenMap[clientId]) {
        if (activeBearerToken.get('created') > clientIdToTokenMap[clientId]) {
          clientIdToTokenMap[clientId] = activeBearerToken;
        }
      } else {
        clientIdToTokenMap[clientId] = activeBearerToken;
      }
    });

    return toImmutable(_.values(clientIdToTokenMap).map(function(token) {
      return {
        masterLabel: clientIdToClientMap.getIn([Number(token.get('client_id')), 'master_label']),
        authorizationDate: token.get('created')
      }
    }));
  }
];

/**
 * Gets all oauth clients for your account
 */
var oauthClients = [
  id,
  OAuthClient.getters.entityCache,
  function(accountId, oauthClients) {
    return oauthClients.filter(function(oauthClient) {
      return oauthClient.get('account_id') === accountId;
    }).toList();
  }
];

/**
 * Getters for account
 */
module.exports = {
  id: id,

  // Via account_info Store
  email: email,
  isSignedIn: isSignedIn,
  isAdmin: isAdmin,
  isFrozen: isFrozen,
  userAccounts: userAccounts,
  accountInfo: accountInfo,
  maxProjects: maxProjects,
  projectCount: projectCount,
  backendApiToken: backendApiToken,
  currentAccount: currentAccount,
  currentRole: currentRole,
  projects: projects,
  activeProjects: activeProjects,
  activeAndroidProjects: activeAndroidProjects,
  atProjectLimit: atProjectLimit,
  authorizedOAuthClients: authorizedOAuthClients,
  oauthClients: oauthClients,

  // Via REST API Account Module
  account: adminAccount,
  ip_anonymization_default: ip_anonymization_default,
  ip_anonymization_locked: ip_anonymization_locked,
  plan_id: plan_id,
  isAdminOnSsoAccount: isAdminOnSsoAccount,
  isSsoEnabled: isSsoEnabled,
};
