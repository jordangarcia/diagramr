var AdminAccount = require('./index');
var enums = require('utils/enums');
var flux = require('flux2');
var testHelpers = require('modules/rest_api/test_helpers');

var accountInfo = {
  account_id: 1,
  projects: [],
  email: 'test@optimizely.com',
  experiments_total: 123,
  first_name: 'jordan',
  last_name: 'garcia',
  max_projects: 500,
  project_count: 1,
  is_admin: false,
  beta_customer: false,
  is_master_account: false,
  subscriptionPlan: false,
  user_accounts: [{ id: 1 }],
};

var account = {
  id: 1,
  plan_id: 'enterprise-monthly',
  ip_anonymization_default: true,
  ip_anonymization_locked: false,
};

var webProject = {
  id: 1234,
  account_id: 1,
  project_platforms: ['web'],
  project_status: enums.ProjectStatusType.ACTIVE,
};

var webProject2 = {
  id: 4321,
  account_id: 1,
  project_platforms: ['web'],
  project_status: enums.ProjectStatusType.ARCHIVED
};

var iOSProject = {
  id: 4567,
  account_id: 1,
  project_platforms: ['ios'],
  project_status: enums.ProjectStatusType.ACTIVE,
  socket_token: 'abcd1234'
};

var iOSProject2 = {
  id: 7654,
  account_id: 1,
  project_platforms: ['ios'],
  project_status: enums.ProjectStatusType.ARCHIVED,
  socket_token: 'abcd1234'
};

var androidProject = {
  id: 45678,
  account_id: 1,
  project_platforms: ['android'],
  project_status: enums.ProjectStatusType.ACTIVE,
  socket_token: 'abcd12345'
};

describe("modules/admin_account", function() {

  beforeEach(function() {

  });

  afterEach(function() {
    flux.reset()
  });

  describe("actions", function() {
    describe('#loadAccountInfo', function() {
      it('should load account info properly given the data structure from the server', function() {
        var accountInfo = {
          account_id: 1,
          projects: [],
          email: 'test@optimizely.com',
          experiments_total: 123,
          first_name: 'jordan',
          last_name: 'garcia',
          max_projects: 500,
          project_count: 1,
          is_admin: false,
          is_user_admin: true,
          is_sso_enabled: true,
          beta_customer: false,
          is_master_account: false,
          subscriptionPlan: false,
          user_accounts: [{ id: 1 }],
        };

        AdminAccount.actions.loadAccountInfo(accountInfo);

        expect(flux.evaluate(AdminAccount.getters.id)).to.be(1);
        expect(flux.evaluate(AdminAccount.getters.email)).to.be('test@optimizely.com');
        expect(flux.evaluate(AdminAccount.getters.isSignedIn)).to.be(true);
        expect(flux.evaluate(AdminAccount.getters.isAdmin)).to.be(false);
        expect(flux.evaluate(AdminAccount.getters.isAdminOnSsoAccount)).to.be(true);
        expect(flux.evaluate(AdminAccount.getters.isSsoEnabled)).to.be(true);
        expect(flux.evaluate(AdminAccount.getters.maxProjects)).to.be(500);
        expect(flux.evaluate(AdminAccount.getters.userAccounts).toJS()).to.eql([{ id: 1 }]);
      });
    });
  });

  describe("getters", function() {
    describe("#projects", function() {
      var projects =[
        {id: 1, account_id: 1},
        {id: 2, account_id: 2},
        {id: 3, account_id: 1},
      ];
      beforeEach(function () {
        AdminAccount.actions.loadAccountInfo(accountInfo);
        testHelpers.loadEntities('projects', projects)
      });
      it("should filter by account id", function() {
        expect(flux.evaluateToJS(AdminAccount.getters.projects)).to.eql([projects[0], projects[2]]);
      });
    });

    describe('#activeProjects', function () {
      beforeEach(function () {
        AdminAccount.actions.loadAccountInfo(accountInfo);
        testHelpers.loadEntities('projects', [webProject, webProject2, iOSProject, iOSProject2, androidProject]);
      });
      it('should return 3 active projects', function () {
        expect(flux.evaluateToJS(AdminAccount.getters.activeProjects)).to.eql([webProject, iOSProject, androidProject]);
      });
    });

    describe('#adminAccount', function () {
      beforeEach(function () {
        AdminAccount.actions.loadAccountInfo(accountInfo);
        testHelpers.loadEntities('accounts', [account]);
      });

      it('should retrieve the account loaded into the Account module', function () {
        expect(flux.evaluateToJS(AdminAccount.getters.account)).to.eql(account);
      });
      it('should retrieve the plan loaded into the Account module', function () {
        expect(flux.evaluateToJS(AdminAccount.getters.plan_id)).to.eql(account.plan_id);
      });
      it('should retrieve the ip anonymization settings loaded into the Account module', function () {
        expect(flux.evaluateToJS(AdminAccount.getters.ip_anonymization_default)).to.eql(account.ip_anonymization_default);
        expect(flux.evaluateToJS(AdminAccount.getters.ip_anonymization_locked)).to.eql(account.ip_anonymization_locked);
      });
    });

    describe("#oauthClients", function() {
      var oauthClients =[
        {id: 1, account_id: 1},
        {id: 2, account_id: 2},
        {id: 3, account_id: 1},
      ];

      beforeEach(function () {
        AdminAccount.actions.loadAccountInfo(accountInfo);
        testHelpers.loadEntities('oauth_clients', oauthClients);
      });

      it("should filter by account id", function() {
        expect(flux.evaluateToJS(AdminAccount.getters.oauthClients)).to.eql([oauthClients[0], oauthClients[2]]);
      });
    });
  });

  describe("fns", function() {
    it("should test all fns exposed via `account.fns`", function() {
    });
  });
});
