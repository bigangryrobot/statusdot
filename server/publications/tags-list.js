Meteor.publish( 'tagsList', function( tag ) {
  check( tag, String );
  return Components.find( { tags: { $in: [ tag ] } } );
});