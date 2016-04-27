AppHeader = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    return {
      brandLink: !!Meteor.user() ? '/dashboard' : '/',
      user: Meteor.user(),
      brand: "HordBoard"
    };
  },
  render() {
    return <NavBar id="app-header" brandLink={ this.data.brandLink } brand={ this.data.brand } >
      { this.props.hasUser ? <AuthenticatedNavigation user={ this.data.user } /> : <PublicNavigation /> }       
    </NavBar>;
  }
});
