let generateComponents = () => {
  if(Components.find().count() < 36){
        // create some fake components        
        _.each(_.range(36), function(){
          var name = "solar" + faker.hacker.noun() + faker.hacker.ingverb();
          var date = faker.date.recent();
          var slug = faker.helpers.slugify(name);
          var description = faker.lorem.sentence();
          var about = "<div><p>"+ faker.lorem.paragraphs() +"<pre><p>"+"if ( "+faker.hacker.noun()+" == "+faker.random.boolean()+" ){"+faker.hacker.ingverb()+"}"+"</pre></p></p></div><div><h4><strong>Example</strong></h4><p>"+ faker.lorem.paragraphs() +"</p></div><div><h4><strong>Getting Started</strong></h4><p> "+ faker.lorem.paragraphs() +"</p></div><div><h4><strong>Authorization</strong></h4><p>"+ faker.lorem.paragraphs() +"</p></div><div><h4><strong>Resources</strong></h4><p>"+ faker.lorem.paragraphs() +"</p></div><div><h4><strong>Debug</strong></h4><p>"+ faker.lorem.paragraphs() +"</p></div><div><h4><strong>Known Issues</strong></h4><p>"+ faker.lorem.paragraphs()+"</p></div>";
          var tags = [];
          _.each(_.range(Math.floor((Math.random() * 10) + 1)), function(){
            tags.push(faker.hacker.noun());
          });
          var releases = [];
          _.each(_.range(Math.floor((Math.random() * 10) + 1)), function(){
            var name = faker.hacker.noun() + Math.floor((Math.random() * 10) + 1) + Math.floor((Math.random() * 10) + 1) + Math.floor((Math.random() * 10) + 1);
            var states = [
                'operational',
                'building',
                'deploying',
                'operational',
                'building',
                'deploying',
            ];
            releases.push({ 
                  environmentId: Environments.find().fetch()[Math.floor(Math.random() * 3 + 1)]._id,
                  state: states[Math.floor(Math.random()*states.length)],
                  name: name
              });
          });

          Components.insert({
              name:  name,
              description: description,
              about: about,
              tags: tags,
              slug: slug,
              updated: date,
              releases: releases
          });
           console.log({
              name:  name,
              description: description,
              about: about,
              tags: tags,
              slug: slug,
              updated: date,
              releases: releases 
          })
        });
  }
};

Modules.server.generateComponents = generateComponents;
