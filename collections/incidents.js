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
    label: "Is this incident published?",
    autoValue() {
      if ( this.isInsert ) {
        return false;
      }
    }
  },  
  "isVisible": {
    type: Boolean,
    label: "Is this incident published?",
    autoValue() {
      if ( this.isInsert ) {
        return false;
      }
    }
  },
 
  "author": {
    type: String,
    label: "The ID of the author of this incident.",
    autoValue() {
      let user = Meteor.users.findOne( { _id: this.userId } );
      if ( user ) {
        return `${ user.profile.name.first } ${ user.profile.name.last }`;
      }
    }
  },
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
          existingUntitled  = Incidents.find( { slug: { $regex: /untitled-incident/i } } ).count();

      if ( slug ) {
        return existingSlugCount > 0 ? `${ slug }-${ existingSlugCount + 1 }` : slug;
      } else {
        return existingUntitled > 0 ? `untitled-incident-${ existingUntitled + 1 }` : 'untitled-incident';
      }
    }
  },
  "content": {
    type: String,
    label: "The content of this incident.",
    optional: true
  },
  "tags": {
    type: [ String ],
    label: "The tags for this incident.",
    optional: true
  }
});

Incidents.attachSchema( IncidentsSchema );

