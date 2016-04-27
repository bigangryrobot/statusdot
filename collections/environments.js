Environments = new Mongo.Collection( 'environments' );

Environments.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Environments.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let EnvironmentsSchema = new SimpleSchema({
  "name": {
    type: String,
    label: "Name of the environment"
  },
  "isPublic": {
    type: Boolean,
    label: "Is this incident publicly visible?",
    autoValue() {
      let bool              = this.value
      if ( !bool ) {
        return false;
      }
    }
  }
});

Environments.attachSchema( EnvironmentsSchema );