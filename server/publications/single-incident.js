Meteor.publish( 'singleIncident', ( incidentSlug ) => {
  check( incidentSlug, String );

  return Incidents.find( { slug: incidentSlug } );
});
