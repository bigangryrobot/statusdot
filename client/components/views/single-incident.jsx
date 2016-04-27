SingleIncident = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    let subSingleIncident = Meteor.subscribe( 'singleIncident', this.props.slug );
    var incident = Incidents.findOne( { slug: this.props.slug } );
    
    return {
      incident: incident,
      ready: subSingleIncident.ready()
    };
  },

  render() {
    if ( !this.data ) { return <div />; }
    return <GridRow>
    <br/>
    <div className="container">
      <GridColumn className="col-lg-12">
        <Incident singleIncident={ true } incident={ this.data.ready && this.data && this.data.incident } />
      </GridColumn>
      </div>
    </GridRow>;
  }
});