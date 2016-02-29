SingleIncident = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    let sub = Meteor.subscribe( 'singleIncident', this.props.slug );

    return {
      incident: Incidents.findOne( { slug: this.props.slug } ),
      ready: sub.ready()
    };
  },
  render() {
    if ( !this.data ) { return <div />; }
    return <GridRow>
      <GridColumn className="col-lg-12">
        <Incident singleIncident={ true } incident={ this.data.ready && this.data && this.data.incident } />
      </GridColumn>
    </GridRow>;
  }
});
