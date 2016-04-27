let startup = () => {
console.log(`
██╗  ██╗ ██████╗ ██████╗ ██████╗ ██████╗  ██████╗  █████╗ ██████╗ ██████╗ 
██║  ██║██╔═══██╗██╔══██╗██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██╔══██╗██╔══██╗
███████║██║   ██║██████╔╝██║  ██║██████╔╝██║   ██║███████║██████╔╝██║  ██║
██╔══██║██║   ██║██╔══██╗██║  ██║██╔══██╗██║   ██║██╔══██║██╔══██╗██║  ██║
██║  ██║╚██████╔╝██║  ██║██████╔╝██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝
╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  
`) 
  _generateEnvironments();
  _setEnvironmentVariables();
  _setBrowserPolicies();
  _generateAccounts();
  _generateComponents();
  _generateIncidents();
  _generateComponents();
  _setAdmins();
  _linkComponentsToIncidents();  
  _generateAppSettings();
};

var _setEnvironmentVariables = () => {
  let settings = Meteor.settings.private;
  process.env.MAIL_URL = settings.MAIL_URL;
};

var _setEnvironmentVariables = () => Modules.server.setEnvironmentVariables();
var _setBrowserPolicies = () => {};
var _generateAccounts = () => Modules.server.generateAccounts();
var _generateAppSettings = () => Modules.server.generateAppSettings();
var _generateComponents = () => Modules.server.generateComponents();
var _setAdmins = () => Modules.server.setAdmins();
var _generateIncidents = () => Modules.server.generateIncidents();
var _generateEnvironments = () => Modules.server.generateEnvironments();
var _linkComponentsToIncidents = () => Modules.server.linkComponentsToIncidents();


Modules.server.startup = startup;  