// Singles

Meteor.publish( 'singleIncident', ( slug ) => {
  check( slug, String );
  var incident = Incidents.find( { slug: slug } );
  return incident
});

Meteor.publish( 'singleIncidentById', ( id ) => {
  check( id, String );
  var incident = Incidents.find( { _id: id } );
  return incident
});


// Multiples

Meteor.publish( 'incidentsByIdArray', ( array ) => {
  check( array, [String] );
  var incidents = Incidents.find({_id: {$in: array}});
  return incidents
});

Meteor.publish( 'incidentsPrivate', function() {
	var incidents = Incidents.find();
	return incidents
});

Meteor.publish( 'incidentsPublic', function() {
	var incidents = Incidents.find();
	return incidents
});

// Helpers

Meteor.publish( 'tagsPrivate', function( tag ) {
  	check( tag, String );
	return Components.find( { tags: { $in: [ tag ] } } );
});

Meteor.publish( 'incidentEditor', ( incidentId ) => {
  check( incidentId, String );
  return [
    Incidents.find( { _id: incidentId } ),
    Meteor.users.find( {}, { fields: { profile: 1 } } )
  ];
});

// PWR

Meteor.publish('publishRelationIncidents', function() {
  return Meteor.publishWithRelations({
    handle: this,
    collection: Incidents,
    mappings: [
    	{collection: Components, key: 'componentIds'},
    ]
  });
});

Meteor.publish('publishRelationSingleIncident', function(slug) {
  return Meteor.publishWithRelations({
    handle: this,
    collection: Incidents,
    filter: {slug: this.slug},
    mappings: [
    	{collection: Components, key: 'componentIds'},
    ]
  });
});