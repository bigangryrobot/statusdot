let environments = [
  {
    name: "prod",
    public: true
  },
  {
    name: "test",
    public: false
  },
  {
    name: "dev",
    public: false
  },
  {
    name: "int",
    public: false
  }
];

let generateEnvironments = () => { 
  if(Environments.find().count() < 1){
    _.each(environments, function(environment){
          Environments.insert({
              name:  environment.name,
              isPublic: environment.public
          });
    });
    Environments.find( { name: "prod" } ).fetch()

    console.log({
      name: "prod",
      public: true
    },
    {
      name: "test",
      public: false
    },
    {
      name: "dev",
      public: false
    },
    {
      name: "int",
      public: false
    });
  }
};

Modules.server.generateEnvironments = generateEnvironments;