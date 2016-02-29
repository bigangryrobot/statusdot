Incident = React.createClass({
  getIncidentTitle() {
    let incident = this.props.incident;
    
    if ( this.props.singleIncident ) {
      return <h4>{ incident.title }</h4>;
    } else {
      return <h4><a className="text-danger" href={ `/incidents/${ incident.slug }`}>{ incident.title }</a></h4>;
    }
  },

  renderTags( tags ) {
    if ( tags ) {
      return <div className="tags">
        {tags.map( ( tag ) => {
          return <a className="btn btn-xs incident-button btn-default" href={ `/tags/${ tag }` }>{ tag }</a>;
        })}
      </div>;
    }
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
      <div className="panel-footer">{ this.renderTags( incident.tags ) }</div>
    </div>;
  }
});
