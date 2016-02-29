Meteor.methods({
  newIncident() {
    return Incidents.insert( {} );
  }
});
