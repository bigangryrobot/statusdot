Meteor.publish( 'incidentsPrivate', function() {
	return Incidents.find( { isVisible: true } );
});

Meteor.publish( 'tagsPrivate', function( tag ) {
  	check( tag, String );
	return Incidents.find( { isVisible: true, tags: { $in: [ tag ] } } );
});
