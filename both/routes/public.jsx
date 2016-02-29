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
  name: 'incidentsPublic',
  action() {
    ReactLayout.render( App, { yield: <IncidentsPublic /> } );
  }
});

publicRoutes.route( '/incidents/:slug', {
  name: 'singleIncident',
  action( params ) {
    ReactLayout.render( App, { yield: <SingleIncident slug={ params.slug } /> } );
  }
});

publicRoutes.route( '/tags/:tag', {
  name: 'tagIndex',
  action( params ) {
    ReactLayout.render( App, { yield: <IncidentsPublic tag={ params.tag } /> } );
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

