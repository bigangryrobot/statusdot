let startup = () => {
  _setEnvironmentVariables();
  _setBrowserPolicies();
  _generateAccounts();
  _generateIncidents();
  _setAdmins();
};

var _setEnvironmentVariables = () => {
  let settings = Meteor.settings.private;
  process.env.MAIL_URL = settings.MAIL_URL;
};

var _setEnvironmentVariables = () => Modules.server.setEnvironmentVariables();
var _setBrowserPolicies = () => {};
var _generateAccounts = () => Modules.server.generateAccounts();
var _generateIncidents = () => Modules.server.generateIncidents();
var _setAdmins = () => Modules.server.setAdmins();

Modules.server.startup = startup;