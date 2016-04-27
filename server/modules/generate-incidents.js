let generateIncidents = () => {
  if(Incidents.find().count() < 36){
        _.each(_.range(36), function(){
          var content = faker.hacker.phrase();
          var tags = [];
          var title = faker.lorem.sentence(20);
          var date = faker.date.recent();
          var content = faker.lorem.paragraph();          
          var slug = faker.helpers.slugify(title);
          _.each(_.range(Math.floor((Math.random() * 10) + 1)), function(){
            tags.push(faker.hacker.noun());
          });
          Incidents.insert({
            isVisible: !!Math.floor(Math.random() * 2),           
            isPublic: !!Math.floor(Math.random() * 2),
            title: title,
            updated: date,
            content: content,
            slug: slug,
            tags: tags
          });
          console.log({
            title: title,
            updated: date,
            slug: slug,
            content: content,
            tags: tags
          });
        });
  }
};

Modules.server.generateIncidents = generateIncidents;
