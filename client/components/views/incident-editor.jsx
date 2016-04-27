IncidentEditor = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    Meteor.subscribe( 'editor', this.props.incident );

    return {
      incident: Incidents.findOne( { _id: this.props.incident } )
    };
  },
  validations() {
    let incident = this;

    return {
      rules: {
        incidentTitle: {
          required: true
        }
      },
      messages: {
        incidentTitle: {
          required: "Hang on there, a incident title is required!"
        }
      },
      submitHandler() {
        let { getValue, isChecked } = ReactHelpers;

        let form = incident.refs.editIncidentForm.refs.form,
            incident = {
              _id: incident.props.incident,
              title: getValue( form, '[name="incidentTitle"]' ),
              slug: getValue( form, '[name="incidentSlug"]' ),
              content: getValue( form, '[name="incidentContent"]' ),
              isVisible: isChecked( form, '[name="isVisible"]' ),
              isActive: isChecked( form, '[name="isActive"]' ),
              tags: getValue( form, '[name="incidentTags"]' ).split( ',' ).map( ( string ) => {
                return string.trim();
              })
            };

        Meteor.call( 'saveIncident', incident, ( error, response ) => {
          if ( error ) {
            Bert.alert( error.reason, 'danger' );
          } else {
            Bert.alert( 'Incident saved!', 'success' );
          }
        });
      }
    };
  },
  generateSlug( event ) {
    let { setValue } = ReactHelpers,
        form         = this.refs.editIncidentForm.refs.form,
        title        = event.target.value;

    setValue( form, '[name="incidentSlug"]', getSlug( title, { custom: { "'": "" } } ) );
  },
  getLastUpdate() {
    if ( this.data ) {
      let { formatLastUpdate } = ReactHelpers,
          incident                 = this.data.incident;

      return `${ formatLastUpdate( incident.updated ) } by ${ incident.author }`;
    }
  },
  getTags() {
    let incident = this.data.incident;

    if ( incident && incident.tags ) {
      return incident.tags.join( ', ' );
    }
  },
  handleSubmit( event ) {
    event.preventDefault();
  },
  render() {
    if ( !this.data.incident ) { return <div />; }

    return <GridRow>
      <GridColumn className="col-lg-12">
          <PageHeader size="h4" label="Edit Incident" />
          <Form ref="editIncidentForm" id="edit-incident" className="edit-incident" validations={ this.validations() } onSubmit={ this.handleSubmit }>
        <div className="panel panel-default">
          <div className="panel-body">
            <p className="updated-date">
              <strong>Last Updated:</strong> { this.getLastUpdate() }
            </p>           
            <FormGroup>
              <FormControl
                style="dropdown"
                name="isActive"
                id="#incident-isActive"
                label="is active"
                defaultValue={ this.data.incident && this.data.incident.isActive }
              />
            </FormGroup>           
            <FormGroup>
              <FormControl
                style="checkbox"
                name="isActive"
                id="#incident-isActive"
                label="is active"
                defaultValue={ this.data.incident && this.data.incident.isActive }
              />
            </FormGroup>          
            <FormGroup>
              <FormControl
                style="checkbox"
                name="isVisible"
                id="#incident-isVisible"
                label="is visible"
                defaultValue={ this.data.incident && this.data.incident.isVisible }
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                showLabel={ false }
                style="input"
                type="text"
                name="incidentTitle"
                label="Title"
                onChange={ this.generateSlug }
                defaultValue={ this.data.incident && this.data.incident.title }
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                disabled={ true }
                showLabel={ false }
                style="input"
                type="text"
                name="incidentSlug"
                label="Slug"
                defaultValue={ this.data.incident && this.data.incident.slug }
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                showLabel={ false }
                style="textarea"
                name="incidentContent"
                label="Content"
                defaultValue={ this.data.incident && this.data.incident.content }
              />
            </FormGroup>
          </div>
          <div className="panel-footer">             
            <FormGroup>
              <FormControl
                showLabel={ false }
                style="input"
                type="text"
                name="incidentTags"
                label="Tags"
                defaultValue={ this.getTags() }
              />
            </FormGroup>
          </div>
        </div>       
          <FormGroup>
            <SuccessButton type="submit" label="Save Incident" />
          </FormGroup>
        </Form>
      </GridColumn>
    </GridRow>;
  }
});
