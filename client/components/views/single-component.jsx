SingleComponent = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    let sub = Meteor.subscribe( 'singleComponent', this.props.slug );
    var components = Components.findOne( { slug: this.props.slug } );
    
    return {
      component: Components.findOne( { slug: this.props.slug } ),
      ready: sub.ready()
    };
  },
  render() {
    if ( !this.data ) { return <div />; }
    return <GridRow>
      <GridColumn className="col-lg-12">
        <Component singleComponent={ true } component={ this.data.ready && this.data && this.data.component } />
      </GridColumn>
    </GridRow>;
  }
});
