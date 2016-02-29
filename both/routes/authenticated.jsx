const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated'
});

authenticatedRoutes.route( '/users', {
  name: 'users',
  action() {
    ReactLayout.render(  App, { yield: <Users /> } );
  }
});

authenticatedRoutes.route( '/', {
  name: 'incidentsPrivate',
  action() {
    ReactLayout.render( App, { yield: <IncidentsPrivate /> } );
  }
});

authenticatedRoutes.route( '/incidents/:_id/edit', {
  name: 'editor',
  action( params ) {
    ReactLayout.render( App, { yield: <Editor incident={ params._id } /> } );
  }
});
