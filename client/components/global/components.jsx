Components = React.createClass({
  mixins: [ ReactMeteorData ],

  getMeteorData() {
    Meteor.subscribe( 'incidentsPublic' );

    return {
      incidents: Incidents.find().fetch().map( ( incident ) => {
        return { uid: incident._id, tags: incident.tags };
      })
    };
  },

  renderTagSet() {
      return this.data.incidents.map( ( incident ) => {
          return incident.tags.map( ( tag ) => {
            return <a className="btn btn-sm btn-outline status-button btn-success" href={ `/tags/${ tag }` }>{ tag }</a>;
          });
      });
  },

  render() {
    return  <div className="tags">
      <div className="status-button-container">
      { this.renderTagSet() }  
      </div>
    </div>;
  }
});
