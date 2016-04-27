FlowRouter.notFound = {
  name: 'notFound',
  action() {
    ReactLayout.render( App, { yield: <NotFound /> } );
  }
};

Accounts.onLogin( () => {
  FlowRouter.go( 'componentsList' );
});
