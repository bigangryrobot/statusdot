Meteor.publish( 'invitationsList', () => {
  let isAdmin = Roles.userIsInRole( this.userId, 'admin' );
  if ( isAdmin ) {
      Invitations.find( {}, { fields: { "email": 1, "role": 1, "date": 1 } } )
  } else {
    return null;
  }
});