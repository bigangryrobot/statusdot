Incident = React.createClass({ 
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    let incident = this.props.incident;
    Meteor.subscribe( 'componentsPrivate' );
    Meteor.subscribe( 'incidentsPrivate' );
    
    var componentIds = incident.componentIds;
    var components =  []
    if (!(typeof componentIds === 'undefined' || !componentIds.length)) {
      components =  Components.find({_id: {$in: componentIds}}).fetch();
    }
    
    return {
      components: components 
    };    
  },
  getIncidentTitle() {       
    let incident = this.props.incident;
    if ( this.props.singleIncident ) {
      return <h4>{ incident.title }</h4>;
    } else {
      return <h4><a className="text-danger" href={ `/incidents/${ incident.slug }`}>{ incident.title }</a></h4>;
    }
  },

  renderComponentPills( subComponents ) {
    if ( subComponents ) {
      return <div className="subComponents">
        {subComponents.map( ( thisSubComponent ) => {
          return <a className="btn btn-xs incident-button btn-default" href={ `/components/${ thisSubComponent.slug }`}>{ thisSubComponent.name }</a>;
        })}
      </div>;
    }
  },
  renderComponents( components ) {
    if ( components ) {
      return <div className="components">
        {components.map( ( component ) => {
          return <p>{ component.title }</p>;
        })}
      </div>;
    }else{return <p>null</p>}
  },

  renderTags( tags ) {
    if ( tags ) {
      return <div className="tags">
        {tags.map( ( tag ) => {
          return <a className="btn btn-xs incident-button btn-default" href={ `/tags/${ tag }` }>{ tag }</a>;
        })}
      </div>;
    } else {<a className="btn btn-xs incident-button btn-default" href="">NODATA</a>}
  },
  
  render() {
    let { formatLastUpdate } = ReactHelpers,
        incident                 = this.props.incident;

    return <div className="panel panel-default">
      <div className="panel-body">
        <span className="pull-right"><a href={ `/incidents/${ incident._id }/edit` }><i className="fa fa-pencil-square-o text-muted"></i></a></span>
        <b>{ this.getIncidentTitle() }</b>
        <p><strong>Last Updated:</strong> { formatLastUpdate( incident.updated ) } by { incident.author }</p>
        <p>{incident.content}</p>
      </div>
      <div className="panel-footer">
      { this.renderComponentPills( this.data.components ) }</div>
    </div>;
  }
});