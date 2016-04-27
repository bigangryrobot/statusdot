ComponentTile = React.createClass({
  renderListGroup() {
      let { formatLastUpdate } = ReactHelpers;
      return <div className="component-tiles">    
        {this.props.items.map( ( item ) => {          
          return <div key={ item._id } className="col-lg-4 component-tile">

                    <h3><i className="fa fa-cube"></i><a href={ `/components/${ item.slug }`}>{ item.name }</a></h3>
                    <p className="text-muted truncate">{ item.description }</p>
                    <p>{ formatLastUpdate( item.updated ) } by <a href={ `/components/${ item.slug }`}>bob</a></p>             
                </div>;
          })}
      </div>;
  },
  render() {
    return this.renderListGroup();
  }
});