Incidents = new Mongo.Collection( 'incidents' );

Incidents.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Incidents.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let IncidentsSchema = new SimpleSchema({
  "isActive": {
    type: Boolean,
    label: "Is this incident active?",
    autoValue() {
      if ( this.isInsert ) {
        return false;
      }
    }
  },  
  "isPublic": {
    type: Boolean,
    label: "Is this incident publicly visible?",
    autoValue() {
      if ( this.isInsert ) {
        return false;
      }
    }
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
  "title": {
    type: String,
    label: "The title of this incident.",
    defaultValue: "Untitled Incident"
  },
  "slug": {
    type: String,
    label: "The slug for this incident.",
    autoValue() {
      let slug              = this.value,
          existingSlugCount = Incidents.find( { _id: { $ne: this.docId }, slug: new RegExp( slug ) } ).count(),
          existingUntitled  = Incidents.find( { slug: { $regex: /invalidslug-incident/i } } ).count();

      if ( slug ) {
        return existingSlugCount > 0 ? `${ slug }-${ existingSlugCount + 1 }` : slug;
      } else {
        return existingUntitled > 0 ? `invalidslug-incident-${ existingUntitled + 1 }` : 'invalidslug-incident';
      }
    }
  },
  "content": {
    type: String,
    label: "The content of this incident.",
    optional: true
  },
  "componentIds": {
    type: [ String ],
    label: "Array of componentIds",
    optional: true
  }
});

Incidents.attachSchema( IncidentsSchema );

