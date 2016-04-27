const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated'
});

authenticatedRoutes.route( '/users', {
  name: 'users',
  action() {
    ReactLayout.render(  App, { yield: <Users /> } );
  }
});

authenticatedRoutes.route( '/dashboard', {
  name: 'dashboardPrivate',
  action() {
    ReactLayout.render( App, { yield: <DashboardPrivate /> } );
  }
});

// authenticatedRoutes.route( '/components', {
//   name: 'components',
//   action() {
//     ReactLayout.render( App, { yield: <ComponentsList /> } );
//   }
// });

authenticatedRoutes.route( '/components/:_id/edit', {
  name: 'componentsEditor',
  action( params ) {
    ReactLayout.render( App, { yield: <ComponentEditor components={ params._id } /> } );
  }
});

authenticatedRoutes.route( '/incidents/:_id/edit', {
  name: 'incidentEditor',
  action( params ) {
    ReactLayout.render( App, { yield: <IncidentEditor incidents={ params._id } /> } );
  }
});
