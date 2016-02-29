Meteor.methods({
  saveIncident( incident ) {
    check( incident, Object );

    let incidentId = incident._id;
    delete incident._id;

    Incidents.upsert( incidentId, { $set: incident } );
  }
});
