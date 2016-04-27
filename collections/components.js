Components = new Mongo.Collection( 'components' );

Components.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Components.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

ComponentsIndex = new EasySearch.Index({
  collection: Components,
  fields: ['name'],
  engine: new EasySearch.Minimongo()
});

let ComponentsSchema = new SimpleSchema({
  "name": {
    type: String,
    label: "Name of the component",
    optional: false
  },
  // "author": {
  //   type: String,
  //   label: "The ID of the author of this incident.",
  //   autoValue() {
  //     let user = Meteor.users.findOne( { _id: this.userId } );
  //     if ( user ) {
  //       return `${ user.profile.name.first } ${ user.profile.name.last }`;
  //     }
  //   }
  // },
  "updated": {
    type: String,
    label: "The date this incident was last updated on.",
    autoValue() {
      return ( new Date() ).toISOString();
    }
  },  
  "description": {
    type: String,
    label: "Short description of the component",
    optional: false
  },
  "about": {
    type: String,
    label: "Short description of the component",
    optional: false
  },
  "tags": {
    type: [ String ],
    label: "The tags for this component.",
    optional: true
  },
  "slug": {
    type: String,
    label: "The slug for this component.",
    autoValue() {
      let slug              = this.value,
          existingSlugCount = Components.find( { _id: { $ne: this.docId }, slug: new RegExp( slug ) } ).count(),
          existingUntitled  = Components.find( { slug: { $regex: /invalidslug-component/i } } ).count();
      return existingSlugCount > 0 ? `${ slug }-${ existingSlugCount + 1 }` : slug;
    }
  },
  "incidentIds": {
    type: [ String ],
    label: "Array of incidentIds",
    optional: true
  },
  "dependentsIds": {
    type: [ String ],
    label: "Array of dependentsIds",
    optional: true
  }, 
  "dependenciesIds": {
    type: [ String ],
    label: "Array of dependenciesIds",
    optional: true
  },
  "releases.$.environmentId": {
    type: String,
    label: "environment to which this release was deployed",
    optional: false
  },
  "releases.$.state": {
    type: String,
    label: "the state of this release",
    optional: true
  } ,
  "releases.$.name": {
    type: String,
    label: "the name of this release",
    optional: true
  }
});

Components.attachSchema( ComponentsSchema );

