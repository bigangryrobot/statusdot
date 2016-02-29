Meteor.publish( 'incidentsPublic', function() {
	return Incidents.find();
});

Meteor.publish( 'tagsIndex', function( tag ) {
  	check( tag, String );
	return Incidents.find( { tags: { $in: [ tag ] } } );
});
