IncidentsList = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    let query = {};

    if ( this.props.tag ) {
      Meteor.subscribe( 'tagsIndex', this.props.tag );
      query = { tags: { $in: [ this.props.tag ] } };
    } else {
      Meteor.subscribe( 'incidentsPublic' );
    }
    return {
      incidents: Incidents.find( query, { sort: { updated: -1 } } ).fetch()
    };
  },
  renderHeader() {
    if ( this.props.tag ) {
      return <Jumbotron className="tags-header">
        <h4>Components tagged with: { this.props.tag }.</h4>
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
  renderIncidents() {
    if ( this.data.incidents.length > 0 ) {
      return this.data.incidents.map( ( incident ) => {
        return <Incident key={ incident._id } incident={ incident } />;
      });
    } else {
      return <WarningAlert>No incidents found.</WarningAlert>;
    }
  },
  render() {
    return <div className="incidents">
        <br/>
        <div className="container">
          <GridRow>
            <GridColumn className="col-lg-12">
              { this.renderIncidents() } 
            </GridColumn>
          </GridRow>
        </div>
    </div>;
  }
});
