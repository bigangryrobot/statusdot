Tags = React.createClass({
  mixins: [ ReactMeteorData ],

  getMeteorData() {
    Meteor.subscribe( 'tagsPublic' );

    return {
      tags: Components.find().fetch().map( ( component ) => {
        return { uid: component._id, tags: component.tags };
      })
    };
  },

  renderTagSet() {
      return this.data.tags.map( ( component ) => {
          return component.tags.map( ( tag ) => {
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
