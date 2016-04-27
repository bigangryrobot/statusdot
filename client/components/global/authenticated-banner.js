AuthenticatedBanner = React.createClass({
  render() {
    return <div className="header-image">
        <div className="headline">
            <div className="container col-lg-4">
                <h1>HordBoard</h1>
                <h3>Application life cycle management made easy</h3>
            </div>
            <div className="container col-lg-8">
                <DefaultButton type="button" additionalclass="main-button" label="New Component" onClick={ this.handleNewComponent } />
                <WarningButton type="button" additionalclass="main-button" label="New Incident" onClick={ this.handleNewComponent } />
                <SuccessButton type="button" additionalclass="main-button" label="New Build" onClick={ this.handleNewComponent } />
                <DangerButton type="button" additionalclass="main-button" label="New Deploy" onClick={ this.handleNewComponent } />
                <div className="header-search-container">
                  <div className="input-group">
                    <input className="form-control input-lg" type="text" id="inputLarge" placeholder="find components"/>
                    <span className="input-group-btn">
                      <button className="btn btn-default" type="button">Submit</button>
                    </span>
                  </div>            
                </div>
            </div>            
        </div>
    </div>;
  }
});
