Meteor.publish( 'tagsList', function( tag ) {
  check( tag, String );
  return Incidents.find( { tags: { $in: [ tag ] } } );
});