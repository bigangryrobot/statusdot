Meteor.publish( 'appsettings', function() {
	var handle = AppSettings.find();
	if (handle.ready()){
		return handle;
	}
});