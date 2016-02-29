Meteor.publish( 'editor', ( incidentId ) => {
  check( incidentId, String );

  return [
    Incidents.find( { _id: incidentId } ),
    Meteor.users.find( {}, { fields: { profile: 1 } } )
  ];
});
