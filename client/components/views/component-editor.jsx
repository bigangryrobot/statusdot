ComponentEditor = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    Meteor.subscribe( 'editor', this.props.component );

    return {
      component: Components.findOne( { _id: this.props.component } )
    };
  },
  validations() {
    let component = this;

    return {
      rules: {
        componentTitle: {
          required: true
        }
      },
      messages: {
        componentTitle: {
          required: "Hang on there, a component title is required!"
        }
      },
      submitHandler() {
        let { getValue, isChecked } = ReactHelpers;

        let form = component.refs.editIncidentForm.refs.form,
            component = {
              _id: component.props.component,
              title: getValue( form, '[name="componentTitle"]' ),
              slug: getValue( form, '[name="componentSlug"]' ),
              content: getValue( form, '[name="componentContent"]' ),
              isVisible: isChecked( form, '[name="isVisible"]' ),
              isActive: isChecked( form, '[name="isActive"]' ),
              tags: getValue( form, '[name="componentTags"]' ).split( ',' ).map( ( string ) => {
                return string.trim();
              })
            };

        Meteor.call( 'saveIncident', component, ( error, response ) => {
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

    setValue( form, '[name="componentSlug"]', getSlug( title, { custom: { "'": "" } } ) );
  },
  getLastUpdate() {
    if ( this.data ) {
      let { formatLastUpdate } = ReactHelpers,
          component                 = this.data.component;

      return `${ formatLastUpdate( component.updated ) } by ${ component.author }`;
    }
  },
  getTags() {
    let component = this.data.component;

    if ( component && component.tags ) {
      return component.tags.join( ', ' );
    }
  },
  handleSubmit( event ) {
    event.preventDefault();
  },
  render() {
    if ( !this.data.component ) { return <div />; }

    return <GridRow>
      <GridColumn className="col-lg-12">
          <PageHeader size="h4" label="Edit Incident" />
          <Form ref="editIncidentForm" id="edit-component" className="edit-component" validations={ this.validations() } onSubmit={ this.handleSubmit }>
        <div className="panel panel-default">
          <div className="panel-body">
            <p className="updated-date">
              <strong>Last Updated:</strong> { this.getLastUpdate() }
            </p>           
            <FormGroup>
              <FormControl
                style="dropdown"
                name="isActive"
                id="#component-isActive"
                label="is active"
                defaultValue={ this.data.component && this.data.component.isActive }
              />
            </FormGroup>           
            <FormGroup>
              <FormControl
                style="checkbox"
                name="isActive"
                id="#component-isActive"
                label="is active"
                defaultValue={ this.data.component && this.data.component.isActive }
              />
            </FormGroup>          
            <FormGroup>
              <FormControl
                style="checkbox"
                name="isVisible"
                id="#component-isVisible"
                label="is visible"
                defaultValue={ this.data.component && this.data.component.isVisible }
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                showLabel={ false }
                style="input"
                type="text"
                name="componentTitle"
                label="Title"
                onChange={ this.generateSlug }
                defaultValue={ this.data.component && this.data.component.title }
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                disabled={ true }
                showLabel={ false }
                style="input"
                type="text"
                name="componentSlug"
                label="Slug"
                defaultValue={ this.data.component && this.data.component.slug }
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                showLabel={ false }
                style="textarea"
                name="componentContent"
                label="Content"
                defaultValue={ this.data.component && this.data.component.content }
              />
            </FormGroup>
          </div>
          <div className="panel-footer">             
            <FormGroup>
              <FormControl
                showLabel={ false }
                style="input"
                type="text"
                name="componentTags"
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
