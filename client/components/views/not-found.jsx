NotFound = React.createClass({
  render() {
    return <GridRow>
    <div className="container">
      <GridColumn className="col-lg-12">
      <br/>
      <br/>
    <DangerAlert>
      <strong>Error [404]</strong>: { FlowRouter.current().path } does not exist.
    </DangerAlert>    
      </GridColumn>
      </div>
    </GridRow>;
  }
});
