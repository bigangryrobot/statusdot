ComponentsList = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    let query = {};

    if ( this.props.tag ) {
      Meteor.subscribe( 'tagsIndex', this.props.tag );
      query = { tags: { $in: [ this.props.tag ] } };
    } else {
      Meteor.subscribe( 'componentsPrivate' );
    }
    return {
      components: Components.find( query, { sort: { updated: -1 } } ).fetch()
    };
  },
  renderHeader() {
    if ( this.props.tag ) {
      return <Jumbotron className="tags-header">
        <h4>Components with keyword: { this.props.tag }.</h4>
      </Jumbotron>;
    } else {
      return <div/>;
    }
  },
  handleNewComponent() {
    Meteor.call( 'newComponent', ( error, componentId ) => {
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        FlowRouter.go( `/components/${ componentId }/edit` );
        Bert.alert( 'All set! Get to typin\'', 'success' );
      }
    });
  },  
  renderComponentsTiles() {
    if ( this.data.components.length > 0 ) {
      return <ComponentTile linked={ true } items={ this.data.components } />;
    } else {
      return <WarningAlert>No components found.</WarningAlert>;
    }
  },
  render() {
    return <div className="incidents">
    { this.props.hasUser ? <AuthenticatedBanner user={ this.data.user } /> : <PublicBanner /> }   
    <div className="container">
    <GridRow>
      <GridColumn>       
        { this.renderHeader() }
        { this.renderComponentsTiles() }
      </GridColumn>    
    </GridRow>
    </div>  
    </div>;
  }
});