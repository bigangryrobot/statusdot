const publicRoutes = FlowRouter.group({
  name: 'public'
});

publicRoutes.route( '/invite/:token', {
  name: 'invite',
  action() {
    ReactLayout.render( App, { yield: <Invite /> } );
  }
});

publicRoutes.route( '/', {
  name: 'dashboardPublic',
  action() {
    ReactLayout.render( App, { yield: <DashboardPublic /> } );
  }
});

publicRoutes.route( '/components', {
  name: 'componentsList',
  action() {
    ReactLayout.render( App, { yield: <ComponentsList /> } );
  }
});

publicRoutes.route( '/incidents', {
  name: 'incidentsList',
  action() {
    ReactLayout.render( App, { yield: <IncidentsList /> } );
  }
});

publicRoutes.route( '/components/:slug', {
  name: 'singleComponent',
  action( params ) {
    ReactLayout.render( App, { yield: <SingleComponent slug={ params.slug } /> } );
  }
});

publicRoutes.route( '/incidents/:slug', {
  name: 'singleIncident',
  action( params ) {
    ReactLayout.render( App, { yield: <SingleIncident slug={ params.slug } /> } );
  }
});

publicRoutes.route( '/tags/:tag', {
  name: 'tagList',
  action( params ) {
    ReactLayout.render( App, { yield: <ComponentsList tag={ params.tag } /> } );
  }
});

publicRoutes.route( '/login', {
  name: 'login',
  action() {
    ReactLayout.render( App, { yield: <Login /> } );
  }
});

publicRoutes.route( '/recover-password', {
  name: 'recoverPassword',
  action() {
    ReactLayout.render( App, { yield: <RecoverPassword /> } );
  }
});

publicRoutes.route( '/reset-password/:token', {
  name: 'resetPassword',
  action( params ) {
    ReactLayout.render( App, { yield: <ResetPassword token={ params.token } /> } );
  }
});

