ComponentPill = React.createClass({
  renderListGroup() {
      let { formatLastUpdate } = ReactHelpers;
      return <div className="component-pill">    
        {this.props.items.map( ( item ) => {          
          return <a class="btn btn-xs incident-button btn-default" href={ `/components/${ item.slug }`}>{ item.name }</a>;
          })}
      </div>;
  },
  render() {
    return this.renderListGroup();
  }
});