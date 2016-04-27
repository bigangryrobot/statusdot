Component = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    let component = this.props.component;
    Meteor.subscribe( 'componentsPrivate' );
    Meteor.subscribe( 'incidentsPrivate' );
    
    var dependentsIds = component.dependentsIds;
    var dependents =  []
    if (!(typeof dependentsIds === 'undefined' || !dependentsIds.length)) {
      dependents =  Components.find({_id: {$in: dependentsIds}}).fetch();
    }

    var dependenciesIds = component.dependenciesIds;
    var dependencies =  []
    if (!(typeof dependenciesIds === 'undefined' || !dependenciesIds.length)) {
      dependencies =  Components.find({_id: {$in: dependenciesIds}}).fetch();
    }

    var incidentIds = component.incidentIds;
    var incidents = []
    if (!(typeof incidentIds === 'undefined' || !incidentIds.length)) {
      incidents =  Incidents.find({_id: {$in: incidentIds}}).fetch();
    }
    return {
      dependents: dependents,
      dependencies: dependencies,
      incidents: incidents
    };    
  },  
  getComponentTitle() {
    let component = this.props.component;
    
    if ( this.props.singleComponent ) {
      return <h1 className="page-header">{ component.name }</h1>; 
    } else {
      return <h1 className="page-header"><a href={ `/components/${ component.slug }`}>{ component.name }</a></h1>;
    }
  },
  getHTML( markdown ) {
    if ( markdown ) {
      return { __html: markdown };
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
  renderTags( tags ) {
    if ( tags ) {
      return <div className="tags">
        {tags.map( ( tag ) => {
          return <a className="btn btn-xs incident-button btn-default" href={ `/tags/${ tag }` }>{ tag }</a>;
        })}
      </div>;
    }
  },
  getIncidentTitle() {
    let incident = this.props.incident;    
    if ( this.props.singleIncident ) {
      return <h4>{ incident.title }</h4>;
    } else {
      return <h4><a className="text-danger" href={ `/incidents/${ incident.slug }`}>{ incident.title }</a></h4>;
    }
  },
  renderReleases()  {
    let releases = this.props.component.releases;
    if (!(typeof releases  === 'undefined' || !releases.length )) {
      return releases.map( ( release ) => {
        return <p>{release.name}</p>;
      });
    } else {
      return <WarningAlert><strong>Hmm!</strong> No versions recorded for this component.</WarningAlert>;
    }    
  },
  renderIncidents() {
    if ( this.data.incidents.length > 0 ) {
      return this.data.incidents.map( ( incident ) => {
        return <Incident key={ incident._id } incident={ incident } />;
      });
    } else {
      return <WarningAlert><strong>Awesome!</strong> No incidents found for this component.</WarningAlert>;
    }
  },
  render() {
    let { formatLastUpdate } = ReactHelpers,
        component                 = this.props.component;

    return <div className="container">
      <div className="row">
        <div key={ component._id } className="col-md-12">
          { this.getComponentTitle() }
          <a href={ `/components/${ component._id }/edit` }><i className="fa fa-pencil-square-o text-muted"></i></a>
          <div key={ component._id } className="col-md-8">
            <h4 className="text-muted"><strong>{ component.description }</strong></h4>
            <div className="component-body" dangerouslySetInnerHTML={ this.getHTML( component.about ) } />
            <div className="clearfix"/>
            <div><h4><strong>Incidents</strong></h4>{ this.renderIncidents(this.data.incidents) }</div>
          </div>
          <div className="col-md-4">
            <h4><strong>Tags:</strong></h4><p> {this.renderTags( component.tags)}</p>
            <h4><strong>Dependents:</strong></h4><p> {this.renderComponentPills( this.data.dependents)}</p>
            <h4><strong>Dependencies:</strong></h4><p> {this.renderComponentPills( this.data.dependencies)}</p>
            <h4><strong>Releases:</strong></h4><p> {this.renderReleases( component.releases )}</p>
          </div>
        </div>
      </div>
    </div>;
  }
});