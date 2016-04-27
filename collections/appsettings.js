AppSettings = new Mongo.Collection( 'appsettings' );

AppSettings.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

AppSettings.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let AppSettingsSchema = new SimpleSchema({
  "applicationname": {
    type: String,
    label: "Name of the application",
    optional: true
  }
});

AppSettings.attachSchema( AppSettingsSchema );