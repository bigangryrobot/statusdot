Meteor.publish( 'environmentsPublic', function() {
	return Environments.find( { isPublic: true } );
});

Meteor.publish( 'environmentsPrivate', function() {
	return Environments.find();
});