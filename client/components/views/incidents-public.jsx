IncidentsPublic = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    let query = {};

    if ( this.props.tag ) {
      Meteor.subscribe( 'tagsPublic', this.props.tag );
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
        <h4>Incidents tagged with: { this.props.tag }.</h4>
      </Jumbotron>;
    } else {
      return ;
    }
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
      <GridRow>
        <GridColumn className="col-lg-12">
          <Components incidents={ this.data.incidents } />
          { this.renderHeader() }
          { this.renderIncidents() }
        </GridColumn>
      </GridRow>
    </div>;
  }
});
