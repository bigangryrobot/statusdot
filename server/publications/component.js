// Singles

Meteor.publish( 'singleComponent', ( slug ) => {
  check( slug, String );
  var component = Components.find( { slug: slug } );
  return component
});

Meteor.publish( 'singleComponentById', ( id ) => {
  check( id, String );
  var component = Components.find( { _id: id } );
  return component
});


// Multiples

Meteor.publish( 'componentsByIdArray', ( array ) => {
  check( array, [String] );
  var components = Components.find({_id: {$in: array}});
  return components
});

Meteor.publish( 'componentsPrivate', function() {
	var components = Components.find();
	return components
});

Meteor.publish( 'componentsPublic', function() {
  var components = Components.find( { isPublic: true } );
  return components
});

// Helpers

Meteor.publish( 'tagsPrivate', function( tag ) {
  	check( tag, String );
	return Components.find( { tags: { $in: [ tag ] } } );
});

Meteor.publish( 'componentEditor', ( componentId ) => {
  check( componentId, String );
  return [
    Components.find( { _id: componentId } ),
    Meteor.users.find( {}, { fields: { profile: 1 } } )
  ];
});
