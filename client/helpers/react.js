ReactHelpers = {
  getValue( context, selector ) {
    return context.querySelector( selector ).value;
  },
  setValue( context, selector, value ) {
    context.querySelector( selector ).value = value;
  },
  isChecked( context, selector ) {
    return context.querySelector( selector ).checked;
  },
  isCurrentUser( currentUser ) {
    return currentUser === Meteor.userId() ? true : false;
  },
  isCurrentUser( userId ) {
    if ( Meteor.userId() === userId ) {
      return Roles.userIsInRole( userId, 'admin' ) ? "disabled" : "";
    }
  },
  formatLastUpdate( date ) {
    if ( date ) {
      return moment( date ).format( 'MMMM Do, YYYY hh:mm a' );
    }
  }
};
