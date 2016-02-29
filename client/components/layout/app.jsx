App = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    return {
      loggingIn: Meteor.loggingIn(),
      hasUser: !!Meteor.user(),
      isPublic( route ) {
        return [
          'incidentsPublic',
          'singleIncident',
          'tagsPublic',
          'login',
          'recoverPassword',
          'resetPassword',
          'notFound'
        ].indexOf( route ) > -1;
      },
      canView() {
        return this.isPublic( FlowRouter.getRouteName() ) || !!Meteor.user();
      }
    };
  },
  getView() {
    return this.data.canView() ? this.props.yield : <Login />;
  },
  render() {
    return <div className=""><AppHeader hasUser={ this.data.hasUser } />
    <div className="main-container container">
      { this.data.loggingIn ? <Loading /> : this.getView() }
    </div>
  </div>;
  }
});
