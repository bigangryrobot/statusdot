let generateIncidents = () => {
  if(Incidents.find().count() < 35){
        _.each(_.range(35), function(){
          var content = faker.hacker.phrase();
          var randomName = faker.name.findName();
          var tags = [];
          var title = faker.hacker.phrase();
          var content = faker.lorem.paragraph();
          _.each(_.range(Math.floor((Math.random() * 10) + 1)), function(){
            tags.push(faker.hacker.noun());
          });
          Incidents.insert({
            published: true,
            author: randomName,
            title: title,
            content: content,
            tags: tags
          });
        });
  }
};

Modules.server.generateIncidents = generateIncidents;
