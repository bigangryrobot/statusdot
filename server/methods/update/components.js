Meteor.methods({
  saveComponent( component ) {
    check( component, Object );

    let componentId = component._id;
    delete component._id;

    Component.upsert( componentId, { $set: component } );
  }
});
