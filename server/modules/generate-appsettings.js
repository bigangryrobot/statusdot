let generateAppSettings = () => {
  if(AppSettings.find().count() < 1){
		var brand = faker.hacker.verb() + " " + faker.hacker.noun() + " " + faker.hacker.ingverb();
          AppSettings.insert({
              applicationname:  brand
          });
  }
};

Modules.server.generateAppSettings = generateAppSettings;
